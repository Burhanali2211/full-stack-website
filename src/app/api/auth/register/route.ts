import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { z } from "zod";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Define schema for input validation
const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate input
    const validation = userSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, password } = validation.data;

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create user
    const { data: user, error } = await supabase
      .from('users')
      .insert([
        {
          name,
          email,
          password: hashedPassword,
          role: "user",
        }
      ])
      .select('id, name, email, role')
      .single();

    if (error) {
      throw error;
    }

    // Create progress record for the new user
    const { error: progressError } = await supabase
      .from('progress')
      .insert([
        {
          user_id: user.id,
          points: 0,
          streak: 0,
        }
      ]);

    if (progressError) {
      // If progress creation fails, we should probably delete the user
      await supabase
        .from('users')
        .delete()
        .eq('id', user.id);
      throw progressError;
    }

    return NextResponse.json({ 
      success: true, 
      message: "User created successfully", 
      user 
    }, { status: 201 });

  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An error occurred during registration" },
      { status: 500 }
    );
  }
} 
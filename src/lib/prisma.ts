// This file is kept for compatibility with existing imports
// but it now uses Supabase instead of Prisma

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Use interface to simulate Prisma client structure
export interface PrismaCompatClient {
  user: {
    findUnique: (args: any) => Promise<any>;
    findMany: (args: any) => Promise<any>;
    create: (args: any) => Promise<any>;
    update: (args: any) => Promise<any>;
    delete: (args: any) => Promise<any>;
  };
  // Add other models as needed
}

// Create a wrapper that mimics Prisma client methods but uses Supabase
class SupabasePrismaWrapper implements PrismaCompatClient {
  private supabase;

  constructor() {
    this.supabase = createClient(supabaseUrl, supabaseAnonKey);
  }

  // User model methods
  user = {
    findUnique: async ({ where }: any) => {
      const { data, error } = await this.supabase
        .from('users')
        .select('*')
        .match(where)
        .single();
      
      return data;
    },
    findMany: async ({ where }: any) => {
      const { data } = await this.supabase
        .from('users')
        .select('*')
        .match(where || {});
      
      return data || [];
    },
    create: async ({ data }: any) => {
      const { data: createdData, error } = await this.supabase
        .from('users')
        .insert(data)
        .select()
        .single();
      
      return createdData;
    },
    update: async ({ where, data }: any) => {
      const { data: updatedData } = await this.supabase
        .from('users')
        .update(data)
        .match(where)
        .select()
        .single();
      
      return updatedData;
    },
    delete: async ({ where }: any) => {
      const { data: deletedData } = await this.supabase
        .from('users')
        .delete()
        .match(where)
        .select()
        .single();
      
      return deletedData;
    }
  };
  
  // Add other models as needed
}

// Create singleton instance
const globalForPrisma = globalThis as unknown as {
  prisma: SupabasePrismaWrapper | undefined;
};

export const prisma = globalForPrisma.prisma ?? new SupabasePrismaWrapper();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
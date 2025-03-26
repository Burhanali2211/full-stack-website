import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";

export const metadata: Metadata = {
  title: "About - Educational Platform",
  description: "Learn about our mission to make programming education accessible to everyone",
};

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    bio: "10+ years of experience in education technology",
    image: "/avatars/alex.jpg",
  },
  {
    name: "Sarah Chen",
    role: "Head of Content",
    bio: "Former university professor with PhD in Computer Science",
    image: "/avatars/sarah.jpg",
  },
  {
    name: "Miguel Rodriguez",
    role: "Lead Developer",
    bio: "Full-stack engineer with focus on interactive learning tools",
    image: "/avatars/miguel.jpg",
  },
  {
    name: "Aisha Patel",
    role: "Community Manager",
    bio: "Building inclusive spaces for learners of all backgrounds",
    image: "/avatars/aisha.jpg",
  },
];

export default function AboutPage() {
  return (
    <>
      <ScrollIndicator />
      <div className="container mx-auto py-12 space-y-16">
        {/* Hero Section */}
        <section className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent mb-6">
            Our Mission
          </h1>
          <p className="text-xl text-muted-foreground">
            We're building the most accessible and effective coding education platform for everyone, regardless of their background or prior experience.
          </p>
        </section>

        {/* Vision Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
            <p className="text-lg text-muted-foreground mb-6">
              We believe that understanding how to code is becoming as important as basic literacy in the modern world. Our platform is designed to empower learners through:
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">✓</div>
                <p>Interactive tutorials that teach practical skills</p>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">✓</div>
                <p>Real-world projects that reinforce learning</p>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">✓</div>
                <p>A supportive community of fellow learners</p>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">✓</div>
                <p>Accessible content for various learning styles</p>
              </li>
            </ul>
          </div>
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
            <Image 
              src="/images/classroom.jpg" 
              alt="Students learning to code" 
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </section>

        {/* Team Section */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-muted-foreground">
              Meet the passionate educators, engineers, and designers working to create the best learning experience for you.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="rounded-lg p-6 bg-card border shadow-sm hover:shadow-md transition-shadow">
                <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <h3 className="font-bold text-lg text-center">{member.name}</h3>
                <p className="text-primary text-sm text-center mb-2">{member.role}</p>
                <p className="text-muted-foreground text-center text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8">
          <div className="flex flex-col items-center">
            <p className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">100+</p>
            <p className="text-muted-foreground">Tutorials</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">50K+</p>
            <p className="text-muted-foreground">Learners</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">15+</p>
            <p className="text-muted-foreground">Technologies</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">24/7</p>
            <p className="text-muted-foreground">Support</p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-12 px-6 rounded-2xl bg-muted max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you're just starting out or looking to advance your skills, our platform has something for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/tutorials">Explore Tutorials</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
} 
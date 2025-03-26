export interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Frontend Developer",
    company: "Tech Corp",
    image: "/testimonials/sarah.svg",
    content: "This platform transformed my learning journey. The project-based approach helped me land my dream job!"
  },
  {
    name: "Michael Chen",
    role: "Full Stack Developer",
    company: "StartUp Inc",
    image: "/testimonials/michael.svg",
    content: "The structured learning path and hands-on projects gave me the confidence to build complex applications."
  },
  {
    name: "Emily Rodriguez",
    role: "Software Engineer",
    company: "Innovation Labs",
    image: "/testimonials/emily.svg",
    content: "The community support is amazing. I always got help when stuck, and now I help others grow!"
  }
]; 
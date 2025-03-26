import { Book, Code, Users, LucideIcon } from 'lucide-react';

export interface Feature {
  Icon: LucideIcon;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    Icon: Book,
    title: "Structured Learning Path",
    description: "Follow our carefully designed curriculum that takes you from basics to advanced concepts systematically."
  },
  {
    Icon: Code,
    title: "Hands-on Experience",
    description: "Build real-world projects that you can add to your portfolio while learning practical skills."
  },
  {
    Icon: Users,
    title: "Community Support",
    description: "Join our active community of developers to get help, share knowledge, and grow together."
  }
]; 
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 mb-3">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={`${
            i < rating
              ? "text-yellow-500 fill-yellow-500"
              : "text-gray-300 dark:text-gray-600"
          }`}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection({ testimonials }: TestimonialsProps) {
  return (
    <section className="w-full py-24 bg-white dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            What our students say
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Join thousands of satisfied learners who have transformed their skills with our platform
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <RatingStars rating={testimonial.rating} />
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
              
              {/* Decorative quote mark */}
              <svg
                className="absolute top-6 right-6 w-10 h-10 text-indigo-100 dark:text-indigo-900/30"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14.0172 7.01724V0H20.9999V7.01724C20.9999 10.5517 19.9137 13.4483 17.7413 15.7069C15.5689 17.9655 12.8965 19.5172 9.72406 20.3621L8.01724 14.931C10.0689 14.3793 11.7241 13.5172 12.9827 12.3448C14.2413 11.1724 14.8965 9.41379 14.8965 7.01724H14.0172ZM0 7.01724V0H6.98276V7.01724C6.98276 10.5517 5.89655 13.4483 3.72414 15.7069C1.55172 17.9655 -1.12069 19.5172 -4.29312 20.3621L-6 14.931C-3.94828 14.3793 -2.29312 13.5172 -1.03448 12.3448C0.224138 11.1724 0.879311 9.41379 0.879311 7.01724H0Z" />
              </svg>
            </motion.div>
          ))}
        </div>
        
        <div className="flex justify-center mt-10">
          <Button asChild variant="outline" className="group">
            <Link href="/testimonials" className="inline-flex items-center">
              View all testimonials
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
} 
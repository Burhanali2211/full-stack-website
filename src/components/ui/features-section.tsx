"use client";

import { motion } from "framer-motion";
import { CheckCircle, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
  link?: string;
}

interface FeaturesProps {
  features: Feature[];
}

export function FeaturesSection({ features }: FeaturesProps) {
  return (
    <section className="w-full py-24 bg-gray-50 dark:bg-gray-900/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-[5%] w-64 h-64 bg-indigo-300/10 dark:bg-indigo-800/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-[10%] w-72 h-72 bg-purple-300/10 dark:bg-purple-800/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex mb-4 items-center rounded-full bg-indigo-100 dark:bg-indigo-900/30 px-3 py-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
            <CheckCircle size={16} className="mr-1" />
            Why Choose Us
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            A better way to learn programming
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Our platform is designed with the latest teaching methodologies
            and industry best practices to ensure effective learning
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative bg-white dark:bg-gray-800 rounded-xl shadow-sm group"
            >
              <div className="absolute -inset-px bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
              <div className="relative h-full bg-white dark:bg-gray-800 rounded-xl p-6 flex flex-col">
                <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-5 w-fit">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 flex-1">{feature.description}</p>
                {feature.link && (
                  <Link 
                    href={feature.link} 
                    className="mt-4 flex items-center text-indigo-600 dark:text-indigo-400 font-medium group-hover:underline"
                  >
                    Learn more <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 
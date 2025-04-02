"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FloatingElementProps {
  children?: ReactNode;
  className?: string;
  bgClassName?: string;
  delay?: number;
  icon?: LucideIcon;
  iconClassName?: string;
}

export const FloatingElement = ({
  children,
  className,
  bgClassName,
  delay = 0,
  icon: Icon,
  iconClassName,
}: FloatingElementProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut",
      }}
      className={cn("absolute pointer-events-none z-10", className)}
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 1, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {children ? (
          children
        ) : Icon ? (
          <div className={cn("backdrop-blur-sm p-3 rounded-lg", bgClassName)}>
            <Icon size={24} className={iconClassName} />
          </div>
        ) : null}
      </motion.div>
    </motion.div>
  );
}; 
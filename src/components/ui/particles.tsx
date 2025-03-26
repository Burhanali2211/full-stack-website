"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface ParticlesProps extends React.HTMLAttributes<HTMLDivElement> {
  quantity?: number;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
  className?: string;
  particleColor?: string;
}

export function Particles({
  className,
  quantity = 50,
  staticity = 50,
  ease = 50,
  refresh = false,
  particleColor,
  ...props
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const { theme } = useTheme();
  const [particles, setParticles] = useState<Array<Particle>>([]);
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mouseOutside = useRef<boolean>(true);
  const dimensions = useRef<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const animationFrame = useRef<number>();

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d", {
        willReadFrequently: true,
      });
    }

    function onMouseMove(e: MouseEvent) {
      if (!canvasContainerRef.current) return;
      const rect = canvasContainerRef.current.getBoundingClientRect();
      const isMouseInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (isMouseInside) {
        mouse.current.x = e.clientX - rect.left;
        mouse.current.y = e.clientY - rect.top;
        mouseOutside.current = false;
      } else {
        mouseOutside.current = true;
      }
    }

    function onResize() {
      if (!canvasContainerRef.current || !canvasRef.current || !context.current)
        return;

      dimensions.current.width = canvasContainerRef.current.offsetWidth;
      dimensions.current.height = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = dimensions.current.width;
      canvasRef.current.height = dimensions.current.height;

      setParticles(
        Array.from({ length: quantity }, () =>
          new Particle(
            dimensions.current.width,
            dimensions.current.height,
            theme === "dark",
            particleColor
          )
        )
      );
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
    };
  }, [quantity, theme, particleColor]);

  useEffect(() => {
    function animate() {
      if (!context.current || !dimensions.current.width || !dimensions.current.height)
        return;

      context.current.clearRect(
        0,
        0,
        dimensions.current.width,
        dimensions.current.height
      );

      particles.forEach((particle) => {
        particle.move(mouse.current, mouseOutside.current, ease);
        particle.draw(context.current!);
      });

      animationFrame.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [particles, ease]);

  useEffect(() => {
    if (!refresh) return;

    if (canvasContainerRef.current && canvasRef.current && context.current) {
      dimensions.current.width = canvasContainerRef.current.offsetWidth;
      dimensions.current.height = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = dimensions.current.width;
      canvasRef.current.height = dimensions.current.height;

      setParticles(
        Array.from({ length: quantity }, () =>
          new Particle(
            dimensions.current.width,
            dimensions.current.height,
            theme === "dark",
            particleColor
          )
        )
      );
    }
  }, [refresh, quantity, theme, particleColor]);

  return (
    <div
      className={cn("fixed inset-0 -z-10", className)}
      ref={canvasContainerRef}
      aria-hidden="true"
      {...props}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}

class Particle {
  private originX: number;
  private originY: number;
  private x: number;
  private y: number;
  private size: number;
  private vx: number;
  private vy: number;
  private force: number;
  private angle: number;
  private friction: number;
  private ease: number;
  private dx: number;
  private dy: number;
  private distX: number;
  private distY: number;
  private distMouse: number;
  private color: string;

  constructor(
    width: number,
    height: number,
    isDarkMode: boolean,
    particleColor?: string
  ) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.originX = Math.floor(this.x);
    this.originY = Math.floor(this.y);
    this.size = Math.random() * 2 + 1;
    this.vx = 0;
    this.vy = 0;
    this.force = 0;
    this.angle = 0;
    this.friction = Math.random() * 0.6 + 0.15;
    this.ease = Math.random() * 0.1 + 0.005;
    this.distX = 0;
    this.distY = 0;
    this.distMouse = 0;
    this.dx = 0;
    this.dy = 0;

    if (particleColor) {
      this.color = particleColor;
    } else {
      this.color = isDarkMode
        ? `rgba(255, 255, 255, ${Math.random() * 0.25 + 0.25})`
        : `rgba(0, 0, 0, ${Math.random() * 0.25 + 0.25})`;
    }
  }

  public draw(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fill();
  }

  public move(mouse: { x: number; y: number }, mouseOutside: boolean, ease: number) {
    this.dx = mouse.x - this.x;
    this.dy = mouse.y - this.y;
    this.distMouse = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    this.distX = this.originX - this.x;
    this.distY = this.originY - this.y;
    this.force = (this.distMouse * ease) / 800;

    if (this.distMouse < 150 && !mouseOutside) {
      this.angle = Math.atan2(this.dy, this.dx);
      this.vx += -this.force * Math.cos(this.angle);
      this.vy += -this.force * Math.sin(this.angle);
    }

    this.vx += this.distX * this.ease;
    this.vy += this.distY * this.ease;
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.x += this.vx;
    this.y += this.vy;
  }
} 
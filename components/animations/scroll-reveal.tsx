"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAnimations } from "@/providers/animation-provider";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Animation variant */
  variant?: "fade-up" | "fade-left" | "fade-right" | "scale" | "stagger-children";
  /** Delay in seconds */
  delay?: number;
  /** Duration in seconds */
  duration?: number;
  /** Stagger delay between children (for stagger-children variant) */
  stagger?: number;
}

const ScrollReveal = ({
  children,
  className,
  variant = "fade-up",
  delay = 0,
  duration = 0.8,
  stagger = 0.12,
}: Readonly<ScrollRevealProps>) => {
  const ref = useRef<HTMLDivElement>(null);
  const { animationsEnabled } = useAnimations();

  useEffect(() => {
    if (!animationsEnabled || !ref.current) return;

    const el = ref.current;

    const getFromVars = () => {
      switch (variant) {
        case "fade-up":
          return { opacity: 0, y: 50 };
        case "fade-left":
          return { opacity: 0, x: -50 };
        case "fade-right":
          return { opacity: 0, x: 50 };
        case "scale":
          return { opacity: 0, scale: 0.85 };
        case "stagger-children":
          return { opacity: 0, y: 30 };
        default:
          return { opacity: 0, y: 50 };
      }
    };

    const getToVars = () => {
      switch (variant) {
        case "fade-up":
          return { opacity: 1, y: 0 };
        case "fade-left":
          return { opacity: 1, x: 0 };
        case "fade-right":
          return { opacity: 1, x: 0 };
        case "scale":
          return { opacity: 1, scale: 1 };
        case "stagger-children":
          return { opacity: 1, y: 0 };
        default:
          return { opacity: 1, y: 0 };
      }
    };

    const ctx = gsap.context(() => {
      if (variant === "stagger-children") {
        gsap.fromTo(
          el.children,
          getFromVars(),
          {
            ...getToVars(),
            duration,
            delay,
            stagger,
            ease: "expo.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      } else {
        gsap.fromTo(
          el,
          getFromVars(),
          {
            ...getToVars(),
            duration,
            delay,
            ease: "expo.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, el);

    return () => ctx.revert();
  }, [animationsEnabled, variant, delay, duration, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;

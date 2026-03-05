"use client";

import type { ReactNode } from "react";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useAnimations } from "@/providers/animation-provider";

interface LayoutTransitionProps {
  header: ReactNode;
  main: ReactNode;
  footer: ReactNode;
}

const LayoutTransition = ({
  header,
  main,
  footer,
}: Readonly<LayoutTransitionProps>) => {
  const { animationsEnabled } = useAnimations();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animationsEnabled || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
      });

      // 1. Header — opacity only (no transform, header is position: fixed)
      tl.fromTo(
        "[data-gsap-header]",
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
      );

      // 2. Hero image — scale up with slight bounce
      tl.fromTo(
        "[data-gsap='hero-image']",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.4)" },
        "-=0.3",
      );

      // 3. Hero text — staggered slide up
      tl.fromTo(
        "[data-gsap='hero-greeting'], [data-gsap='hero-name'], [data-gsap='hero-tagline'], [data-gsap='hero-description']",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 },
        "-=0.4",
      );

      // 4. Hero CTAs — slide up
      tl.fromTo(
        "[data-gsap='hero-cta']",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.2",
      );

      // 5. Page sections — staggered reveal
      tl.fromTo(
        "[data-gsap='section']",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.7 },
        "-=0.2",
      );

      // 6. Footer — fade in last
      tl.fromTo(
        "[data-gsap-footer]",
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        "-=0.3",
      );
    }, containerRef);

    return () => ctx.revert();
  }, [animationsEnabled]);

  if (!animationsEnabled) {
    return (
      <>
        {header}
        {main}
        {footer}
      </>
    );
  }

  return (
    <div ref={containerRef}>
      <div data-gsap-header="">{header}</div>
      {main}
      <div data-gsap-footer="">{footer}</div>
    </div>
  );
};

export default LayoutTransition;

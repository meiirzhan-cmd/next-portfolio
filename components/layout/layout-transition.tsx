"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useAnimations } from "@/providers/animation-provider";

const smooth = [0.22, 1, 0.36, 1] as const;

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
    <>
      {/* Header is position:fixed — only fade, no transform (breaks containing block) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: smooth }}
      >
        {header}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: smooth, delay: 0.15 }}
      >
        {main}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: smooth, delay: 0.3 }}
      >
        {footer}
      </motion.div>
    </>
  );
};

export default LayoutTransition;

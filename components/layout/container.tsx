import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  /** "narrow" for reading content (768px), "wide" for grids (1280px) */
  size?: "narrow" | "wide";
  className?: string;
  as?: "div" | "section" | "article" | "main";
}

const Container = ({
  children,
  size = "wide",
  className,
  as: Tag = "div",
}: Readonly<ContainerProps>) => {
  return (
    <Tag
      className={cn(
        size === "narrow" ? "container-narrow" : "container-wide",
        className,
      )}
    >
      {children}
    </Tag>
  );
};

export default Container;

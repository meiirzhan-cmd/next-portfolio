import { CommonTranslations } from "@/types";
import { cn } from "@/utils/cn";

interface FooterProps {
  translations: CommonTranslations;
  className?: string;
}

const Footer = ({ translations, className }: FooterProps) => {
  const { footer } = translations;

  return (
    <footer
      className={cn("border-t border-(--color-border)", "py-8", className)}
      role="contentinfo"
    >
      <div className="container-wide flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-(--color-foreground-subtle)">
          {footer.copyright}
        </p>
        <p className="text-sm text-(--color-foreground-subtle)">
          {footer.builtWith}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

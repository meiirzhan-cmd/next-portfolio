interface SkipLinkProps {
  label: string;
}

/**
 * Accessibility skip link — first focusable element on the page.
 * Hidden until focused via keyboard Tab.
 * Styled via `skip-link` utility class in globals.css.
 */
const SkipLink = ({ label }: SkipLinkProps) => {
  return (
    <a href="#main-content" className="skip-link">
      {label}
    </a>
  );
};

export default SkipLink;

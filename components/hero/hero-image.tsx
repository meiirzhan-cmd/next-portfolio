import Image from "next/image";

interface HeroImageProps {
  src: string;
  alt: string;
  size?: number;
  hireLabel?: string;
}

const HeroImage = ({
  src,
  alt,
  size = 280,
  hireLabel = "Hire Me",
}: Readonly<HeroImageProps>) => {
  const ringGap = 10;
  const ringSize = size + ringGap * 2 + 6;

  return (
    <div
      className="hero-image-wrapper"
      style={{ width: ringSize, height: ringSize }}
    >
      {/* Outer dashed orbit ring */}
      <div className="hero-image-ring-outer" />

      {/* Inner rotating gradient ring */}
      <div className="hero-image-ring" />

      {/* Profile image */}
      <div className="hero-image-circle" style={{ width: size, height: size }}>
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="object-cover w-full h-full"
          priority
        />
      </div>

      {/* Hover overlay — outside overflow:hidden circle so it renders */}
      <div
        className="hero-image-hover"
        style={{ width: size, height: size }}
      >
        <button type="button" className="hero-image-overlay-btn">
          {hireLabel}
        </button>
      </div>
    </div>
  );
};

export default HeroImage;

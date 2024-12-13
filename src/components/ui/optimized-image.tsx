import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  lowQualityUrl?: string;
}

export const OptimizedImage = ({
  src,
  alt,
  className,
  fallback = "https://via.placeholder.com/400",
  lowQualityUrl,
  ...props
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(lowQualityUrl || src);

  useEffect(() => {
    if (!lowQualityUrl) return;

    const img = new Image();
    img.src = src || "";
    
    img.onload = () => {
      setCurrentSrc(src || "");
      setIsLoading(false);
    };
    
    img.onerror = () => {
      console.error(`Failed to load image: ${src}`);
      setError(true);
      setIsLoading(false);
    };
  }, [src, lowQualityUrl]);

  if (error) {
    return (
      <img
        src={fallback}
        alt={alt}
        className={className}
        {...props}
      />
    );
  }

  if (isLoading && !currentSrc) {
    return <Skeleton className={className} />;
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={`transition-opacity duration-300 ${className}`}
      loading="lazy"
      onError={() => setError(true)}
      {...props}
    />
  );
};
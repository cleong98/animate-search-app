import { useState, useRef, useEffect } from "react";

interface UseCardHoverProps {
  isMobile: boolean;
}

export function useCardHover({ isMobile }: UseCardHoverProps) {
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (!isMobile) {
      // Clear any existing timeout first
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      // Add a very small delay before showing hover state to prevent accidental hovers
      hoverTimeoutRef.current = setTimeout(() => {
        setIsHovered(true);
        hoverTimeoutRef.current = null;
      }, 50);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      // Clear the timeout if user leaves before delay completes
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
      // Immediately hide hover state
      setIsHovered(false);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return {
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
  };
}

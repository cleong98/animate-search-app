import { useState } from "react";

interface UseCardHoverProps {
  isMobile: boolean;
}

export function useCardHover({ isMobile }: UseCardHoverProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovered(false);
    }
  };

  return {
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
  };
}

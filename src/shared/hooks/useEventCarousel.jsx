import { useState } from "react";

export function useEventCarousel(images) {
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return { current, handlePrev, handleNext };
}
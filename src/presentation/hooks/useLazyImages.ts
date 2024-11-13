import { useEffect, useRef, useState } from "react";

export const useLazyImages = () => {

  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Dejar de observar una vez que la imagen está visible
        }
      },
      { threshold: 0.1 } // Se puede ajustar el umbral para determinar cuándo la imagen se considera visible
    );

    const currentRef = cardRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.disconnect();
      }
    };
  }, []);

  return { isVisible, cardRef };
}
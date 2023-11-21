import React, { useEffect, useState } from 'react';

export const useIntersectionObserver = (targetRef: React.RefObject<HTMLElement>): boolean => {
  const [intersecting, setIntersecting] = useState<boolean>(false);

  useEffect(() => {
    if (!targetRef.current) return;

    const observer = new IntersectionObserver(([entry]: IntersectionObserverEntry[]) => {
      setIntersecting(entry.isIntersecting);
    });

    observer.observe(targetRef.current);
  }, [targetRef]);

  return intersecting;
};
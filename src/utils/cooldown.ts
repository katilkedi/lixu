import { useRef, useCallback } from 'react';

export const useCooldown = (delay: number = 500) => {
  const lastCallRef = useRef<number>(0);
  
  const withCooldown = useCallback(
    <T extends (...args: any[]) => any>(fn: T): T => {
      return ((...args: any[]) => {
        const now = Date.now();
        if (now - lastCallRef.current < delay) {
          return;
        }
        lastCallRef.current = now;
        return fn(...args);
      }) as T;
    },
    [delay]
  );
  
  return withCooldown;
};



import { useEffect, useState } from 'react';

export const useMobileScrollLock = () => {
  const [isScrollLocked, setIsScrollLocked] = useState(false);

  const lockScroll = () => {
    if (typeof window !== 'undefined') {
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.width = '100%';
      setIsScrollLocked(true);
    }
  };

  const unlockScroll = () => {
    if (typeof window !== 'undefined') {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
      setIsScrollLocked(false);
    }
  };

  const toggleScrollLock = () => {
    if (isScrollLocked) {
      unlockScroll();
    } else {
      lockScroll();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isScrollLocked) {
        unlockScroll();
      }
    };
  }, [isScrollLocked]);

  return {
    isScrollLocked,
    lockScroll,
    unlockScroll,
    toggleScrollLock
  };
};
import React, { useEffect } from "react";
//AI
export default function useLockScroll(
  conditions = [],
  lockOnlyOnMobile = false
) {
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    const anyConditionTrue = conditions.some(Boolean);

    const shouldLock = lockOnlyOnMobile
      ? isMobile && anyConditionTrue
      : anyConditionTrue;

    if (shouldLock) {
      document.body.style.overflow = "hidden"; 
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [lockOnlyOnMobile, ...conditions]);
}

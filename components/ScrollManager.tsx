"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      // Temporarily remove snap scroll to prevent the browser from getting stuck,
      // scroll to the top instantly, then re-enable snap scrolling
      document.documentElement.classList.remove("snap-y", "snap-mandatory");
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      
      const timer = setTimeout(() => {
        document.documentElement.classList.add("snap-y", "snap-mandatory");
      }, 50);
      
      return () => clearTimeout(timer);
    } else {
      document.documentElement.classList.remove("snap-y", "snap-mandatory");
    }
  }, [pathname]);

  return null;
}

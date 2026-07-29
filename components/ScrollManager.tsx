"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      document.documentElement.classList.add("snap-y", "snap-mandatory");
    } else {
      document.documentElement.classList.remove("snap-y", "snap-mandatory");
    }
  }, [pathname]);

  return null;
}

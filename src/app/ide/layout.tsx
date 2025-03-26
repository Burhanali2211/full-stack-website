"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function IDELayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    // Prevent accidental navigation away from the IDE
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="h-screen flex flex-col">
      {children}
    </div>
  );
} 
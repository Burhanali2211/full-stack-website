"use client";

import { forwardRef } from "react";

export const Preview = forwardRef<HTMLIFrameElement>((props, ref) => {
  return (
    <iframe
      ref={ref}
      title="Code Preview"
      className="w-full h-full bg-white dark:bg-zinc-900"
      sandbox="allow-scripts allow-same-origin"
    />
  );
}); 
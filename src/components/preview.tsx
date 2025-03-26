import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface PreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Preview = forwardRef<HTMLIFrameElement, PreviewProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className={cn("relative w-full h-full", className)} {...props}>
        <iframe
          ref={ref}
          title="preview"
          sandbox="allow-scripts allow-same-origin"
          className="w-full h-full bg-white dark:bg-zinc-900 rounded-md"
        />
      </div>
    );
  }
);

Preview.displayName = "Preview";

export { Preview }; 
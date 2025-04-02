import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: {
    image?: string;
    name: string;
  }[];
  limit?: number;
  children?: React.ReactNode;
}

export function AvatarGroup({
  items,
  limit = 4,
  className,
  children,
  ...props
}: AvatarGroupProps) {
  const itemsToShow = items?.slice(0, limit);
  const remaining = items ? items.length - limit : 0;

  return (
    <div
      className={cn("flex -space-x-2 overflow-hidden", className)}
      {...props}
    >
      {children ? children : (
        <>
          {itemsToShow?.map((item, i) => (
            <Avatar
              key={i}
              className="inline-block border-2 border-background"
            >
              {item.image ? (
                <AvatarImage src={item.image} alt={item.name} />
              ) : null}
              <AvatarFallback>
                {item.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ))}
          
          {remaining > 0 ? (
            <Avatar className="inline-block border-2 border-background bg-muted">
              <AvatarFallback>+{remaining}</AvatarFallback>
            </Avatar>
          ) : null}
        </>
      )}
    </div>
  );
} 
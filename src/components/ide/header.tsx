import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Settings, Home } from "lucide-react";

export function IDEHeader() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>
    </header>
  );
}
 
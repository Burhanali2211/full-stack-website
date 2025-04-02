"use client";

import { FC, useState, useMemo, useEffect } from "react";
import TutorialGrid from "@/components/tutorials/TutorialGrid";
import { Tutorial } from "@/components/tutorials/TutorialCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce"; // Assuming a debounce hook exists
import { Button } from "@/components/ui/button";

interface TutorialsClientProps {
  tutorials: Tutorial[];
}

// Extract unique categories and levels for filters
const getUniqueValues = (tutorials: Tutorial[], key: keyof Tutorial) => {
  const values = tutorials.map(t => t[key]);
  // Ensure values are strings before creating Set
  return [...new Set(values.filter(v => typeof v === 'string'))] as string[];
};

const TutorialsClient: FC<TutorialsClientProps> = ({ tutorials }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 300); // Debounce search input by 300ms

  // Get unique values for filter dropdowns
  const levels = useMemo(() => ["beginner", "intermediate", "advanced"], []);
  const categories = useMemo(() => getUniqueValues(tutorials, 'category').sort(), [tutorials]);

  const filteredTutorials = useMemo(() => {
    return tutorials.filter(tutorial => {
      // Filter by Level
      if (selectedLevel && tutorial.level !== selectedLevel) {
        return false;
      }
      // Filter by Category
      if (selectedCategory && tutorial.category !== selectedCategory) {
        return false;
      }
      // Filter by Search Term (case-insensitive check in title, description, tags)
      if (debouncedSearchTerm) {
        const lowerSearchTerm = debouncedSearchTerm.toLowerCase();
        const inTitle = tutorial.title.toLowerCase().includes(lowerSearchTerm);
        const inDescription = tutorial.description.toLowerCase().includes(lowerSearchTerm);
        const inTags = tutorial.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm));
        if (!inTitle && !inDescription && !inTags) {
          return false;
        }
      }
      return true; // Include tutorial if it passes all filters
    });
  }, [tutorials, debouncedSearchTerm, selectedLevel, selectedCategory]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedLevel(null);
    setSelectedCategory(null);
  };
  
  const hasActiveFilters = searchTerm || selectedLevel || selectedCategory;

  // Effect to potentially scroll to top when filters change? (Optional)
  // useEffect(() => { window.scrollTo(0, 0); }, [filteredTutorials]);

  return (
    <div className="space-y-8">
      {/* Filter and Search Bar Section */}
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-card/50 border border-border rounded-lg sticky top-[65px] z-40 backdrop-blur-md">
        <Input
          type="text"
          placeholder="Search tutorials (e.g., React, Python, hooks)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow bg-background"
        />
        <div className="flex gap-2 flex-wrap sm:flex-nowrap">
          <Select value={selectedLevel || "all"} onValueChange={(value) => setSelectedLevel(value === "all" ? null : value)}>
            <SelectTrigger className="w-full sm:w-[180px] bg-background">
              <SelectValue placeholder="Filter by Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              {levels.map(level => (
                <SelectItem key={level} value={level} className="capitalize">{level}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedCategory || "all"} onValueChange={(value) => setSelectedCategory(value === "all" ? null : value)}>
            <SelectTrigger className="w-full sm:w-[180px] bg-background">
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
           {hasActiveFilters && (
            <Badge 
              variant="secondary"
              onClick={clearFilters} 
              className="cursor-pointer h-10 px-3 flex items-center justify-center gap-1 hover:bg-muted/80"
            >
              Clear <X className="h-3 w-3"/>
            </Badge>
          )}
        </div>
      </div>

      {/* Display filtered tutorials */}
      {filteredTutorials.length > 0 ? (
        <TutorialGrid tutorials={filteredTutorials} />
      ) : (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold mb-2">No Tutorials Found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search or filters.</p>
          <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
        </div>
      )}
    </div>
  );
};

export default TutorialsClient;
"use client";

import { FC, useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import TutorialGrid from "@/components/tutorials/TutorialGrid";
import { Tutorial } from "@/components/tutorials/TutorialCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Search, Filter, SlidersHorizontal, ArrowUpDown, ChevronDown } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce"; // Assuming a debounce hook exists
import { Button } from "@/components/ui/button";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";

interface TutorialsClientProps {
  tutorials: Tutorial[];
}

// Define sorting options
type SortOption = {
  label: string;
  value: string;
  sortFn: (a: Tutorial, b: Tutorial) => number;
};

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
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("popular");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300); // Debounce search input by 300ms

  // Get unique values for filter dropdowns
  const levels = useMemo(() => ["beginner", "intermediate", "advanced"], []);
  const categories = useMemo(() => getUniqueValues(tutorials, 'category').sort(), [tutorials]);
  
  // Get all unique tags across all tutorials
  const tags = useMemo(() => {
    const allTags = tutorials.flatMap(tutorial => tutorial.tags);
    return [...new Set(allTags)].sort();
  }, [tutorials]);
  
  // Define sorting options
  const sortOptions: SortOption[] = useMemo(() => [
    { 
      label: "Most Popular", 
      value: "popular", 
      sortFn: (a, b) => b.popularity - a.popularity 
    },
    { 
      label: "Highest Rated", 
      value: "rating", 
      sortFn: (a, b) => b.rating - a.rating 
    },
    { 
      label: "Most Recent", 
      value: "recent", 
      sortFn: (a, b) => b.id.localeCompare(a.id) // Using ID as a proxy for recency in this demo
    },
    { 
      label: "Title (A-Z)", 
      value: "az", 
      sortFn: (a, b) => a.title.localeCompare(b.title) 
    },
    { 
      label: "Title (Z-A)", 
      value: "za", 
      sortFn: (a, b) => b.title.localeCompare(a.title) 
    },
  ], []);

  // Get current sort function
  const currentSortFn = useMemo(() => {
    return sortOptions.find(option => option.value === sortBy)?.sortFn || sortOptions[0].sortFn;
  }, [sortBy, sortOptions]);
  
  // Get current sort label
  const currentSortLabel = useMemo(() => {
    return sortOptions.find(option => option.value === sortBy)?.label || sortOptions[0].label;
  }, [sortBy, sortOptions]);

  const filteredTutorials = useMemo(() => {
    // First filter
    const filtered = tutorials.filter(tutorial => {
      // Filter by Level
      if (selectedLevel && tutorial.level !== selectedLevel) {
        return false;
      }
      
      // Filter by Category
      if (selectedCategory && tutorial.category !== selectedCategory) {
        return false;
      }
      
      // Filter by Tag
      if (selectedTag && !tutorial.tags.includes(selectedTag)) {
        return false;
      }
      
      // Filter by Search Term (case-insensitive check in title, description, tags)
      if (debouncedSearchTerm) {
        const lowerSearchTerm = debouncedSearchTerm.toLowerCase();
        const inTitle = tutorial.title.toLowerCase().includes(lowerSearchTerm);
        const inDescription = tutorial.description.toLowerCase().includes(lowerSearchTerm);
        const inTags = tutorial.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm));
        const inCategory = tutorial.category.toLowerCase().includes(lowerSearchTerm);
        const inAuthor = tutorial.author.name.toLowerCase().includes(lowerSearchTerm);
        
        if (!inTitle && !inDescription && !inTags && !inCategory && !inAuthor) {
          return false;
        }
      }
      
      return true; // Include tutorial if it passes all filters
    });
    
    // Then sort
    return [...filtered].sort(currentSortFn);
  }, [
    tutorials, 
    debouncedSearchTerm, 
    selectedLevel, 
    selectedCategory, 
    selectedTag, 
    currentSortFn
  ]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedLevel(null);
    setSelectedCategory(null);
    setSelectedTag(null);
    setSortBy("popular");
  };
  
  const hasActiveFilters = searchTerm || selectedLevel || selectedCategory || selectedTag || sortBy !== "popular";

  // Animation variants for the filters badge count
  const badgeVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 500, damping: 30 } }
  };
  
  // Count active filters for the mobile badge
  const activeFilterCount = [
    Boolean(selectedLevel),
    Boolean(selectedCategory),
    Boolean(selectedTag),
    sortBy !== "popular"
  ].filter(Boolean).length;

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Desktop - Filter and Search Bar Section */}
      <div className="hidden md:flex flex-col lg:flex-row gap-3 lg:gap-4 p-4 lg:p-5 bg-card/70 dark:bg-gray-800/50 border border-border dark:border-gray-700/50 rounded-lg sticky top-[65px] z-40 backdrop-blur-md shadow-sm">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground dark:text-gray-400" />
          <Input
            type="text"
            placeholder="Search tutorials (React, Python, hooks, etc.)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-background dark:bg-gray-900/70 pr-8 border-border dark:border-gray-700"
          />
          {searchTerm && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 opacity-70 hover:opacity-100 transition-opacity"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select value={selectedLevel || "all"} onValueChange={(value) => setSelectedLevel(value === "all" ? null : value)}>
            <SelectTrigger className="w-[130px] lg:w-[150px] bg-background dark:bg-gray-900/70 h-10 truncate border-border dark:border-gray-700">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-900 dark:border-gray-700">
              <SelectItem value="all">All Levels</SelectItem>
              {levels.map(level => (
                <SelectItem key={level} value={level} className="capitalize">{level}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedCategory || "all"} onValueChange={(value) => setSelectedCategory(value === "all" ? null : value)}>
            <SelectTrigger className="w-[130px] lg:w-[150px] bg-background dark:bg-gray-900/70 h-10 truncate border-border dark:border-gray-700">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-900 dark:border-gray-700">
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedTag || "all"} onValueChange={(value) => setSelectedTag(value === "all" ? null : value)}>
            <SelectTrigger className="w-[130px] lg:w-[150px] bg-background dark:bg-gray-900/70 h-10 truncate border-border dark:border-gray-700">
              <SelectValue placeholder="Tag" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-900 dark:border-gray-700">
              <SelectItem value="all">All Tags</SelectItem>
              {tags.map(tag => (
                <SelectItem key={tag} value={tag}>{tag}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-background dark:bg-gray-900/70 h-10 gap-1 border-border dark:border-gray-700">
                <ArrowUpDown className="h-3.5 w-3.5 mr-1" />
                <span className="hidden sm:inline">Sort: </span>
                <span className="font-medium truncate">{currentSortLabel}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px] dark:bg-gray-900 dark:border-gray-700">
              <DropdownMenuLabel>Sort Tutorials</DropdownMenuLabel>
              <DropdownMenuSeparator className="dark:border-gray-700/50" />
              {sortOptions.map(option => (
                <DropdownMenuItem 
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className={sortBy === option.value ? "bg-muted dark:bg-gray-800/60 font-medium" : ""}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {hasActiveFilters && (
            <Button 
              variant="ghost"
              onClick={clearFilters} 
              className="h-10 gap-1 hover:bg-destructive/10 hover:text-destructive dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
              Clear Filters
            </Button>
          )}
        </div>
      </div>
      
      {/* Mobile - Search and Filter Bar */}
      <div className="flex md:hidden flex-wrap gap-2 p-3 sticky top-[65px] z-40 bg-background/95 dark:bg-gray-900/95 backdrop-blur-lg border-b dark:border-gray-800 pb-3 shadow-sm">
        <div className="relative flex-grow min-w-[150px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground dark:text-gray-400" />
          <Input
            type="text"
            placeholder="Search tutorials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-8 dark:bg-gray-800/70 dark:border-gray-700"
          />
          {searchTerm && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 opacity-70 hover:opacity-100 transition-opacity"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
        
        {/* Mobile filter sheet */}
        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="relative h-10 w-10 dark:bg-gray-800/70 dark:border-gray-700">
              <SlidersHorizontal className="h-4 w-4" />
              {activeFilterCount > 0 && (
                <motion.span
                  variants={badgeVariants}
                  initial="hidden"
                  animate="visible"
                  className="absolute -top-1.5 -right-1.5 bg-primary text-[10px] text-primary-foreground h-4 min-w-4 rounded-full flex items-center justify-center px-1"
                >
                  {activeFilterCount}
                </motion.span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh] flex flex-col dark:bg-gray-900 dark:border-gray-800">
            <SheetHeader className="text-left pb-2">
              <SheetTitle className="dark:text-gray-100">Filter & Sort</SheetTitle>
              <SheetDescription className="dark:text-gray-400">
                Refine tutorials based on your preferences
              </SheetDescription>
            </SheetHeader>
            
            <div className="flex-1 overflow-y-auto py-4">
              <Accordion type="single" collapsible className="w-full" defaultValue="level">
                <AccordionItem value="level" className="dark:border-gray-800">
                  <AccordionTrigger className="dark:text-gray-200">Difficulty Level</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      <Button 
                        variant={selectedLevel === null ? "default" : "outline"}
                        className="h-9"
                        onClick={() => setSelectedLevel(null)}
                      >
                        All
                      </Button>
                      {levels.map(level => (
                        <Button 
                          key={level}
                          variant={selectedLevel === level ? "default" : "outline"}
                          className="h-9 capitalize"
                          onClick={() => setSelectedLevel(level)}
                        >
                          {level}
                        </Button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="category" className="dark:border-gray-800">
                  <AccordionTrigger className="dark:text-gray-200">Category</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <Button 
                        variant={selectedCategory === null ? "default" : "outline"}
                        className="h-9"
                        onClick={() => setSelectedCategory(null)}
                      >
                        All
                      </Button>
                      {categories.slice(0, 7).map(category => (
                        <Button 
                          key={category}
                          variant={selectedCategory === category ? "default" : "outline"}
                          className="h-9"
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="tag" className="dark:border-gray-800">
                  <AccordionTrigger className="dark:text-gray-200">Tags</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Button 
                        variant={selectedTag === null ? "default" : "outline"}
                        className="h-8"
                        onClick={() => setSelectedTag(null)}
                      >
                        All Tags
                      </Button>
                      {tags.slice(0, 12).map(tag => (
                        <Button 
                          key={tag}
                          variant={selectedTag === tag ? "default" : "outline"}
                          className="h-8"
                          onClick={() => setSelectedTag(tag)}
                        >
                          {tag}
                        </Button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="sort" className="dark:border-gray-800">
                  <AccordionTrigger className="dark:text-gray-200">Sort By</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-2">
                      {sortOptions.map(option => (
                        <Button 
                          key={option.value}
                          variant={sortBy === option.value ? "default" : "outline"}
                          className="h-9 w-full justify-start"
                          onClick={() => setSortBy(option.value)}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            <SheetFooter className="flex-shrink-0 flex sm:justify-between gap-3 border-t pt-4 dark:border-gray-800">
              <Button 
                variant="outline" 
                className="w-full sm:w-auto dark:border-gray-700" 
                onClick={clearFilters}
              >
                Reset All
              </Button>
              <SheetClose asChild>
                <Button className="w-full sm:w-auto bg-primary">
                  Apply Filters ({filteredTutorials.length})
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        
        {/* Quick sort dropdown for mobile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-10 gap-1 dark:bg-gray-800/70 dark:border-gray-700">
              <ArrowUpDown className="h-3.5 w-3.5 mr-1" />
              <span className="truncate">Sort</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px] dark:bg-gray-900 dark:border-gray-700">
            {sortOptions.map(option => (
              <DropdownMenuItem 
                key={option.value}
                onClick={() => setSortBy(option.value)}
                className={sortBy === option.value ? "bg-muted dark:bg-gray-800 font-medium" : ""}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Active filters display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 px-3 py-2 mt-2 mb-0 bg-muted/30 dark:bg-gray-800/30 rounded-lg border border-border/20 dark:border-gray-700/20">
          {selectedLevel && (
            <Badge variant="secondary" className="rounded-full flex items-center gap-1 px-3 py-1 dark:bg-gray-700/60 dark:text-gray-200 border dark:border-gray-600/50">
              Level: {selectedLevel}
              <Button variant="ghost" size="icon" className="h-4 w-4 p-0 hover:bg-transparent" onClick={() => setSelectedLevel(null)}>
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {selectedCategory && (
            <Badge variant="secondary" className="rounded-full flex items-center gap-1 px-3 py-1 dark:bg-gray-700/60 dark:text-gray-200 border dark:border-gray-600/50">
              Category: {selectedCategory}
              <Button variant="ghost" size="icon" className="h-4 w-4 p-0 hover:bg-transparent" onClick={() => setSelectedCategory(null)}>
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {selectedTag && (
            <Badge variant="secondary" className="rounded-full flex items-center gap-1 px-3 py-1 dark:bg-gray-700/60 dark:text-gray-200 border dark:border-gray-600/50">
              Tag: {selectedTag}
              <Button variant="ghost" size="icon" className="h-4 w-4 p-0 hover:bg-transparent" onClick={() => setSelectedTag(null)}>
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {sortBy !== "popular" && (
            <Badge variant="secondary" className="rounded-full flex items-center gap-1 px-3 py-1 dark:bg-gray-700/60 dark:text-gray-200 border dark:border-gray-600/50">
              Sort: {currentSortLabel}
              <Button variant="ghost" size="icon" className="h-4 w-4 p-0 hover:bg-transparent" onClick={() => setSortBy("popular")}>
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs h-6 hover:bg-destructive/10 hover:text-destructive dark:hover:bg-red-900/20 dark:hover:text-red-400 ml-auto transition-colors"
            onClick={clearFilters}
          >
            Clear All
          </Button>
        </div>
      )}

      {/* Display filtered tutorials count */}
      <div className="px-3 flex items-center justify-between">
        <h2 className="text-xl font-semibold dark:text-gray-100">
          {filteredTutorials.length} {filteredTutorials.length === 1 ? 'Tutorial' : 'Tutorials'} 
          {hasActiveFilters && ' Found'}
        </h2>
      </div>

      {/* Display filtered tutorials */}
      {filteredTutorials.length > 0 ? (
        <TutorialGrid tutorials={filteredTutorials} />
      ) : (
        <div className="text-center py-12 md:py-16 rounded-lg border border-dashed bg-muted/5 dark:border-gray-700/50 dark:bg-gray-800/20">
          <div className="max-w-md mx-auto px-4">
            <h3 className="text-xl font-semibold mb-2 dark:text-gray-200">No Tutorials Found</h3>
            <p className="text-muted-foreground dark:text-gray-400 mb-6">
              We couldn't find any tutorials matching your search criteria. Try adjusting your filters or search terms.
            </p>
            <Button onClick={clearFilters} className="gap-2">
              <Filter className="h-4 w-4" />
              Clear All Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorialsClient;
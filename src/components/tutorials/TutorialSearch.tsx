"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X, Laptop, Server, Database, ChevronDown, Globe, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

interface TutorialSearchProps {
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onLevelChange: (level: string | null) => void;
  onDurationChange: (duration: number[]) => void;
  selectedCategory: string;
  selectedLevel: string | null;
}

/**
 * Advanced search and filter component for tutorials with animations
 */
const TutorialSearch = ({
  onSearch,
  onCategoryChange,
  onLevelChange,
  onDurationChange,
  selectedCategory,
  selectedLevel,
}: TutorialSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [duration, setDuration] = useState([4]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleDurationChange = (values: number[]) => {
    setDuration(values);
    onDurationChange(values);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    onSearch("");
    onCategoryChange("all");
    onLevelChange(null);
    setDuration([4]);
    onDurationChange([4]);
    setSelectedTags([]);
    setIsFilterOpen(false);
  };

  const categories = [
    { id: "all", name: "All", icon: <Globe className="h-4 w-4" /> },
    { id: "frontend", name: "Frontend", icon: <Laptop className="h-4 w-4" /> },
    { id: "backend", name: "Backend", icon: <Server className="h-4 w-4" /> },
    { id: "database", name: "Database", icon: <Database className="h-4 w-4" /> },
  ];

  const levels = [
    { id: "beginner", name: "Beginner" },
    { id: "intermediate", name: "Intermediate" },
    { id: "advanced", name: "Advanced" },
  ];

  const popularTags = [
    "React", "TypeScript", "Next.js", "Node.js", "GraphQL", 
    "Python", "DevOps", "CSS", "Tailwind", "Database"
  ];

  return (
    <div className="w-full space-y-4 mb-10">
      <div className="flex gap-3 flex-col sm:flex-row">
        {/* Search Bar with animation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative flex-1"
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search for tutorials, topics, or technologies..."
            className="pl-10 h-12 border-muted-foreground/20 bg-background/50 backdrop-blur-sm"
            value={searchQuery}
            onChange={handleSearch}
          />
          {searchQuery && (
            <Button 
              variant="ghost" 
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
              onClick={() => {
                setSearchQuery("");
                onSearch("");
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </motion.div>

        {/* Filter Toggle Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Button 
            variant={isFilterOpen ? "default" : "outline"} 
            className="h-12 gap-2 px-4"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="h-4 w-4" />
            Filters
            <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
          </Button>
        </motion.div>
      </div>

      {/* Category Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Tabs defaultValue={selectedCategory} onValueChange={onCategoryChange} className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto flex-nowrap py-2 h-auto bg-transparent space-x-2">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary gap-2 px-4 py-2 rounded-lg flex items-center"
              >
                {category.icon}
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Advanced Filters Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 border rounded-lg bg-card/30 backdrop-blur-sm space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Advanced Filters</h3>
                <Button variant="ghost" size="sm" onClick={clearFilters}>Clear all</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Experience Level */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Experience Level</h4>
                  <div className="space-y-2">
                    {levels.map((level) => (
                      <div key={level.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={level.id} 
                          checked={selectedLevel === level.id}
                          onCheckedChange={() => onLevelChange(selectedLevel === level.id ? null : level.id)}
                        />
                        <label 
                          htmlFor={level.id}
                          className="text-sm cursor-pointer"
                        >
                          {level.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium">Duration (hours)</h4>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>Max {duration[0]}h</span>
                    </div>
                  </div>
                  <Slider
                    min={1}
                    max={10}
                    step={1}
                    value={duration}
                    onValueChange={handleDurationChange}
                    className="py-2"
                  />
                </div>

                {/* Popular Tags */}
                <div>
                  <Accordion type="single" collapsible defaultValue="tags">
                    <AccordionItem value="tags" className="border-none">
                      <AccordionTrigger className="py-0 mb-3 text-sm font-medium">
                        Popular Tags
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {popularTags.map((tag) => (
                            <Badge
                              key={tag}
                              variant={selectedTags.includes(tag) ? "default" : "outline"}
                              className="cursor-pointer"
                              onClick={() => toggleTag(tag)}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filters Display */}
      {(searchQuery || selectedLevel || selectedTags.length > 0 || selectedCategory !== "all" || duration[0] !== 4) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-wrap gap-2 pt-2"
        >
          <div className="text-sm text-muted-foreground mr-2 py-1">Active filters:</div>
          
          {searchQuery && (
            <Badge variant="outline" className="pl-2 pr-1 py-1 flex items-center gap-1">
              <span>"{searchQuery}"</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1"
                onClick={() => {
                  setSearchQuery("");
                  onSearch("");
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {selectedCategory !== "all" && (
            <Badge variant="outline" className="pl-2 pr-1 py-1 flex items-center gap-1">
              <span>{categories.find(c => c.id === selectedCategory)?.name}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1"
                onClick={() => onCategoryChange("all")}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {selectedLevel && (
            <Badge variant="outline" className="pl-2 pr-1 py-1 flex items-center gap-1">
              <span>{levels.find(l => l.id === selectedLevel)?.name}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1"
                onClick={() => onLevelChange(null)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {duration[0] !== 4 && (
            <Badge variant="outline" className="pl-2 pr-1 py-1 flex items-center gap-1">
              <span>Max {duration[0]}h</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1"
                onClick={() => {
                  setDuration([4]);
                  onDurationChange([4]);
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {selectedTags.map(tag => (
            <Badge key={tag} variant="outline" className="pl-2 pr-1 py-1 flex items-center gap-1">
              <span>{tag}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1"
                onClick={() => toggleTag(tag)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default TutorialSearch; 
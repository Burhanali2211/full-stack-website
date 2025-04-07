"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface FilterOption {
  label: string;
  value: string;
}

interface TutorialFiltersProps {
  categories: FilterOption[];
  levels: FilterOption[];
  selectedCategories: string[];
  selectedLevels: string[];
  onCategoryChange: (category: string) => void;
  onLevelChange: (level: string) => void;
  onClearFilters: () => void;
}

export function TutorialFilters({
  categories,
  levels,
  selectedCategories,
  selectedLevels,
  onCategoryChange,
  onLevelChange,
  onClearFilters,
}: TutorialFiltersProps) {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [levelOpen, setLevelOpen] = useState(false);

  const hasFilters = selectedCategories.length > 0 || selectedLevels.length > 0;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <DropdownMenu open={categoryOpen} onOpenChange={setCategoryOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-1">
            Category
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuLabel>Select Categories</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {categories.map((category) => (
            <DropdownMenuCheckboxItem
              key={category.value}
              checked={selectedCategories.includes(category.value)}
              onCheckedChange={() => onCategoryChange(category.value)}
            >
              {category.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu open={levelOpen} onOpenChange={setLevelOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-1">
            Level
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuLabel>Select Levels</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {levels.map((level) => (
            <DropdownMenuCheckboxItem
              key={level.value}
              checked={selectedLevels.includes(level.value)}
              onCheckedChange={() => onLevelChange(level.value)}
            >
              {level.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="text-muted-foreground hover:text-primary"
        >
          Clear filters
        </Button>
      )}

      <div className="flex flex-wrap gap-2 ml-2">
        {selectedCategories.map((category) => (
          <Badge
            key={category}
            variant="secondary"
            className="gap-1 cursor-pointer hover:bg-secondary/80"
            onClick={() => onCategoryChange(category)}
          >
            {categories.find((c) => c.value === category)?.label}
            <Check className="h-3 w-3" />
          </Badge>
        ))}
        {selectedLevels.map((level) => (
          <Badge
            key={level}
            variant="secondary"
            className="gap-1 cursor-pointer hover:bg-secondary/80"
            onClick={() => onLevelChange(level)}
          >
            {levels.find((l) => l.value === level)?.label}
            <Check className="h-3 w-3" />
          </Badge>
        ))}
      </div>
    </div>
  );
} 
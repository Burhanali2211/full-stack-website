import { motion } from 'framer-motion';
import { Badge } from './badge';
import { Button } from './button';
import { Check, X } from 'lucide-react';

interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

interface ProjectFiltersProps {
  techFilters: FilterOption[];
  selectedTechFilters: string[];
  difficultyFilters: FilterOption[];
  selectedDifficultyFilters: string[];
  onTechFilterChange: (value: string) => void;
  onDifficultyFilterChange: (value: string) => void;
  onClearFilters: () => void;
  sortOption: string;
  onSortChange: (value: string) => void;
}

const sortOptions = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Oldest First', value: 'oldest' },
  { label: 'A-Z', value: 'alphabetical' },
  { label: 'Difficulty (Beginner First)', value: 'difficulty-asc' },
  { label: 'Difficulty (Advanced First)', value: 'difficulty-desc' },
];

export function ProjectFilters({
  techFilters,
  selectedTechFilters,
  difficultyFilters,
  selectedDifficultyFilters,
  onTechFilterChange,
  onDifficultyFilterChange,
  onClearFilters,
  sortOption,
  onSortChange,
}: ProjectFiltersProps) {
  const hasActiveFilters = selectedTechFilters.length > 0 || selectedDifficultyFilters.length > 0;

  return (
    <div className="mb-8 space-y-6">
      {/* Sort Options */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
        <div className="flex flex-wrap gap-2">
          {sortOptions.map((option) => (
            <Button
              key={option.value}
              variant={sortOption === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => onSortChange(option.value)}
              className="transition-all hover:scale-105"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Tech Stack Filters */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">Tech Stack:</h3>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="h-auto px-2 py-1 text-xs"
            >
              <X size={14} className="mr-1" />
              Clear filters
            </Button>
          )}
        </div>
        <motion.div layout className="flex flex-wrap gap-2">
          {techFilters.map((filter) => (
            <motion.div
              key={filter.value}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Badge
                variant={selectedTechFilters.includes(filter.value) ? "default" : "outline"}
                className={`cursor-pointer transition-all hover:scale-105 ${
                  selectedTechFilters.includes(filter.value)
                    ? ""
                    : "hover:bg-primary/10"
                }`}
                onClick={() => onTechFilterChange(filter.value)}
              >
                <span className="flex items-center gap-1">
                  {selectedTechFilters.includes(filter.value) && (
                    <Check size={12} className="shrink-0" />
                  )}
                  {filter.label}
                  {filter.count !== undefined && (
                    <span className="ml-1 text-xs opacity-50">({filter.count})</span>
                  )}
                </span>
              </Badge>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Difficulty Filters */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">Difficulty:</h3>
        <motion.div layout className="flex flex-wrap gap-2">
          {difficultyFilters.map((filter) => (
            <motion.div
              key={filter.value}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Badge
                variant={selectedDifficultyFilters.includes(filter.value) ? "default" : "outline"}
                className={`cursor-pointer transition-all hover:scale-105 ${
                  selectedDifficultyFilters.includes(filter.value)
                    ? ""
                    : "hover:bg-primary/10"
                }`}
                onClick={() => onDifficultyFilterChange(filter.value)}
              >
                <span className="flex items-center gap-1">
                  {selectedDifficultyFilters.includes(filter.value) && (
                    <Check size={12} className="shrink-0" />
                  )}
                  {filter.label}
                  {filter.count !== undefined && (
                    <span className="ml-1 text-xs opacity-50">({filter.count})</span>
                  )}
                </span>
              </Badge>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
} 
"use client";

import { useState, useMemo } from "react";
import TutorialHero from "@/components/tutorials/TutorialHero";
import { TutorialFilters } from "@/components/tutorials/TutorialFilters";
import { TutorialCard, Tutorial } from "@/components/tutorials/TutorialCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const categories = [
  { label: "Python", value: "Python" },
  { label: "React", value: "React" },
  { label: "JavaScript", value: "JavaScript" },
  { label: "Web Development", value: "Web Development" },
  { label: "TypeScript", value: "TypeScript" },
];

const levels = [
  { label: "Beginner", value: "beginner" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Advanced", value: "advanced" },
];

interface TutorialsContentProps {
  tutorials: Tutorial[];
}

export default function TutorialsContent({ tutorials }: TutorialsContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [savedTutorials, setSavedTutorials] = useState<string[]>([]);
  const [likedTutorials, setLikedTutorials] = useState<string[]>([]);

  const filteredTutorials = useMemo(() => {
    return tutorials.filter((tutorial) => {
      const matchesSearch = searchQuery === "" || 
        tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutorial.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.includes(tutorial.category);

      const matchesLevel = selectedLevels.length === 0 || 
        selectedLevels.includes(tutorial.level);

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchQuery, selectedCategories, selectedLevels, tutorials]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleLevelChange = (level: string) => {
    setSelectedLevels(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedLevels([]);
  };

  const handleSave = (id: string) => {
    setSavedTutorials(prev => 
      prev.includes(id) 
        ? prev.filter(t => t !== id)
        : [...prev, id]
    );
  };

  const handleLike = (id: string) => {
    setLikedTutorials(prev => 
      prev.includes(id) 
        ? prev.filter(t => t !== id)
        : [...prev, id]
    );
  };

  const handleShare = (id: string) => {
    // Implement share functionality
    console.log("Share tutorial:", id);
  };

  return (
    <div className="container py-8 space-y-8">
      <TutorialHero />
      
      <div className="flex flex-col space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tutorials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <TutorialFilters
          categories={categories}
          levels={levels}
          selectedCategories={selectedCategories}
          selectedLevels={selectedLevels}
          onCategoryChange={handleCategoryChange}
          onLevelChange={handleLevelChange}
          onClearFilters={handleClearFilters}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutorials.map((tutorial, index) => (
            <TutorialCard
              key={tutorial.id}
              tutorial={tutorial}
              index={index}
              onSave={handleSave}
              onShare={handleShare}
              onLike={handleLike}
              isSaved={savedTutorials.includes(tutorial.id)}
              isLiked={likedTutorials.includes(tutorial.id)}
            />
          ))}
          {filteredTutorials.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-muted-foreground">
                No tutorials found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
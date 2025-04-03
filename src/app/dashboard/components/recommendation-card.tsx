import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { BookOpen, Code2, Clock, Star, FileText, Bookmark } from "lucide-react";

interface BaseRecommendationProps {
  id: string;
  type: "tutorial" | "project" | "article";
  title: string;
  description: string;
  thumbnail?: string;
  rating: number;
  reviews: number;
  matchScore: string;
  onSave: (id: string) => void;
  onStart: (id: string) => void;
}

interface TutorialRecommendationProps extends BaseRecommendationProps {
  type: "tutorial";
  duration: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  instructor: string;
}

interface ProjectRecommendationProps extends BaseRecommendationProps {
  type: "project";
  estimatedTime: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  technologies: string[];
}

interface ArticleRecommendationProps extends BaseRecommendationProps {
  type: "article";
  readTime: string;
  author: string;
}

type RecommendationCardProps = 
  | TutorialRecommendationProps 
  | ProjectRecommendationProps 
  | ArticleRecommendationProps;

/**
 * A card displaying a recommended learning resource with relevant metadata
 */
export function RecommendationCard(props: RecommendationCardProps) {
  const { id, type, title, description, thumbnail, rating, reviews, matchScore, onSave, onStart } = props;

  // Helper function to render type-specific details
  const renderDetails = () => {
    switch (type) {
      case "tutorial":
        return (
          <>
            <Badge variant="outline" className="text-xs">
              {props.difficulty}
            </Badge>
            <span className="flex items-center text-sm">
              <Clock className="h-3.5 w-3.5 mr-1" />
              {props.duration}
            </span>
          </>
        );
      case "project":
        return (
          <>
            <div className="flex flex-wrap gap-1">
              {props.technologies.map((tech, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
            <span className="flex items-center text-sm">
              <Clock className="h-3.5 w-3.5 mr-1" />
              {props.estimatedTime}
            </span>
          </>
        );
      case "article":
        return (
          <>
            <Badge variant="outline" className="text-xs">
              {props.readTime} read
            </Badge>
            <span className="text-sm text-muted-foreground">
              By {props.author}
            </span>
          </>
        );
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-lg border overflow-hidden flex flex-col"
    >
      <div className="relative h-40 bg-muted">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40" 
          style={{ backgroundImage: thumbnail ? `url(${thumbnail})` : undefined, backgroundSize: 'cover' }}
        />
        <div className="absolute top-2 right-2">
          <Badge className="bg-black/60 text-white hover:bg-black/70">
            {matchScore}
          </Badge>
        </div>
        <div className="absolute bottom-2 left-2">
          <Badge 
            className={cn(
              "text-primary-foreground",
              type === "tutorial" && "bg-blue-600",
              type === "project" && "bg-purple-600",
              type === "article" && "bg-pink-600",
            )}
          >
            {type === "tutorial" && <BookOpen className="mr-1 h-3.5 w-3.5" />}
            {type === "project" && <Code2 className="mr-1 h-3.5 w-3.5" />}
            {type === "article" && <FileText className="mr-1 h-3.5 w-3.5" />}
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
        </div>
      </div>
      <div className="flex-1 p-4 space-y-3">
        <div>
          <h3 className="font-semibold">{title}</h3>
          <div className="flex items-center mt-1">
            {Array(5).fill(0).map((_, i) => (
              <Star 
                key={i} 
                className={cn(
                  "h-4 w-4", 
                  i < Math.floor(rating) 
                    ? "text-yellow-500 fill-yellow-500" 
                    : "text-muted-foreground"
                )} 
              />
            ))}
            <span className="ml-1 text-sm text-muted-foreground">
              {rating} ({reviews})
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {description}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          {renderDetails()}
        </div>
        <div className="pt-2 flex justify-between items-center">
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8" 
              onClick={() => onSave(id)}
            >
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              className="h-8"
              onClick={() => onStart(id)}
            >
              Start
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 
import { Project } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, ExternalLink, Bookmark, Share2, Code, Users, Star } from "lucide-react";
import Image from "next/image";

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const {
    title,
    description,
    category,
    technologies,
    author,
    githubUrl,
    demoUrl,
    about,
    image,
  } = project;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{category}</Badge>
            {technologies.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
          <p className="text-lg text-muted-foreground">{description}</p>

          <div className="flex flex-wrap gap-4">
            {githubUrl && (
              <Button asChild variant="outline" size="lg" className="flex-1 sm:flex-none">
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View Source
                </a>
              </Button>
            )}
            {demoUrl && (
              <Button asChild size="lg" className="flex-1 sm:flex-none">
                <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Code className="h-4 w-4" />
              <span>{technologies.length} technologies</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>500+ views</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              <span>4.8 rating</span>
            </div>
          </div>
        </div>

        <Card className="relative aspect-video overflow-hidden">
          {image && (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="technical">Technical Details</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="p-6">
            <div className="prose dark:prose-invert max-w-none">
              <h3>About This Project</h3>
              <p>{about}</p>

              <h4>Key Features</h4>
              <ul>
                <li>Modern and responsive design</li>
                <li>Built with {technologies.join(", ")}</li>
                <li>Clean and maintainable codebase</li>
                <li>Performance optimized</li>
              </ul>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <Card className="p-6">
            <div className="prose dark:prose-invert max-w-none">
              <h3>Feature Highlights</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <h4>User Experience</h4>
                  <ul>
                    <li>Intuitive navigation</li>
                    <li>Fast page loads</li>
                    <li>Mobile-first design</li>
                    <li>Accessibility features</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4>Technical Features</h4>
                  <ul>
                    <li>Modern tech stack</li>
                    <li>API integration</li>
                    <li>Secure authentication</li>
                    <li>Real-time updates</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="technical" className="space-y-4">
          <Card className="p-6">
            <div className="prose dark:prose-invert max-w-none">
              <h3>Technical Stack</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4>Frontend Technologies</h4>
                  <ul>
                    {technologies
                      .filter(tech => 
                        ["React", "Next.js", "TypeScript", "Tailwind"].some(t => 
                          tech.toLowerCase().includes(t.toLowerCase())
                        )
                      )
                      .map(tech => (
                        <li key={tech}>{tech}</li>
                      ))}
                  </ul>
                </div>
                <div>
                  <h4>Backend & Infrastructure</h4>
                  <ul>
                    {technologies
                      .filter(tech => 
                        ["Node", "Express", "MongoDB", "PostgreSQL", "AWS", "Docker"].some(t => 
                          tech.toLowerCase().includes(t.toLowerCase())
                        )
                      )
                      .map(tech => (
                        <li key={tech}>{tech}</li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Project Author</h2>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="space-y-1">
              <h3 className="font-medium">{author.name}</h3>
              <p className="text-sm text-muted-foreground">
                {author.title}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 
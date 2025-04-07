import { Metadata } from "next";
import { notFound } from "next/navigation";
import TutorialDetail from "@/components/tutorials/TutorialDetail";
import TutorialRecommendations from "@/components/tutorials/TutorialRecommendations";
import { tutorials } from "../page";
import { defaultViewport } from "@/app/metadata";

interface TutorialPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: TutorialPageProps): Promise<Metadata> {
  const tutorial = tutorials.find((t) => t.slug === params.slug);
  
  if (!tutorial) {
    return {
      title: "Tutorial Not Found",
      description: "The requested tutorial could not be found.",
    };
  }

  return {
    title: `${tutorial.title} | Programming Tutorial`,
    description: tutorial.description,
  };
}

export const viewport = defaultViewport;

export default function TutorialPage({ params }: TutorialPageProps) {
  const tutorial = tutorials.find((t) => t.slug === params.slug);
  
  if (!tutorial) {
    notFound();
  }

  return (
    <main className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <TutorialDetail tutorial={tutorial} />
      <div className="mt-12">
        <TutorialRecommendations currentTutorialId={tutorial.id} tutorials={tutorials} />
      </div>
    </main>
  );
} 
import { Tutorial } from '@/types/tutorial';
import { tutorials as tutorialData } from '@/data/tutorials';

export async function getTutorials(): Promise<Tutorial[]> {
  return Promise.resolve(tutorialData);
}

export async function getTutorialBySlug(slug: string): Promise<Tutorial | undefined> {
  const allTutorials = await getTutorials();
  return allTutorials.find((tutorial) => tutorial.slug === slug);
}

export async function getFeaturedTutorials(): Promise<Tutorial[]> {
  const allTutorials = await getTutorials();
  return allTutorials.filter((tutorial) => tutorial.featured);
} 
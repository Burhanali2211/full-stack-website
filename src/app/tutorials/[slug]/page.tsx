import { getTutorialBySlug, getTutorials } from '@/lib/tutorials';
import { notFound } from 'next/navigation';
import TutorialContent from '@/components/tutorial-content';
import { Suspense } from 'react';

export async function generateStaticParams() {
  const tutorials = await getTutorials();
  return tutorials.map((tutorial) => ({
    slug: tutorial.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const slug = await Promise.resolve(params.slug);
  try {
    const tutorial = await getTutorialBySlug(slug);
    if (!tutorial) return {};

    return {
      title: `${tutorial.title} | Developer's Mindset`,
      description: tutorial.description,
    };
  } catch (error) {
    return {};
  }
}

export default async function TutorialPage({ params }: { params: { slug: string } }) {
  const slug = await Promise.resolve(params.slug);
  try {
    const tutorial = await getTutorialBySlug(slug);
    if (!tutorial) notFound();

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <TutorialContent tutorial={tutorial} />
      </Suspense>
    );
  } catch (error) {
    notFound();
  }
}

export const dynamic = 'force-static'; 
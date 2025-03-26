import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BlogPost, BlogSeries } from '@/types/blog';
import { Button } from '@/components/ui/button';

interface SeriesNavigationProps {
  currentPost: BlogPost;
  series: BlogSeries;
}

export function SeriesNavigation({ currentPost, series }: SeriesNavigationProps) {
  const currentIndex = series.posts.findIndex(
    (post) => post.slug === currentPost.slug
  );

  const previousPost = currentIndex > 0 ? series.posts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < series.posts.length - 1
      ? series.posts[currentIndex + 1]
      : null;

  return (
    <div className="mt-8 space-y-4">
      <div className="rounded-lg bg-muted p-4">
        <h3 className="mb-2 text-lg font-semibold">{series.name}</h3>
        <p className="text-sm text-muted-foreground">{series.description}</p>
        <div className="mt-4 space-y-2">
          {series.posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`block rounded-md p-2 text-sm ${
                post.slug === currentPost.slug
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted-foreground/10'
              }`}
            >
              {index + 1}. {post.title}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex justify-between gap-4">
        {previousPost ? (
          <Button
            variant="outline"
            className="flex-1"
            asChild
          >
            <Link href={`/blog/${previousPost.slug}`}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              {previousPost.title}
            </Link>
          </Button>
        ) : (
          <div className="flex-1" />
        )}

        {nextPost ? (
          <Button
            variant="outline"
            className="flex-1"
            asChild
          >
            <Link href={`/blog/${nextPost.slug}`}>
              {nextPost.title}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </div>
  );
} 
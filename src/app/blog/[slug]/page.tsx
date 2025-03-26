import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPosts, getBlogSeries, getRelatedPosts } from '@/lib/blog';
import { MetaTags } from '@/components/seo/meta-tags';
import { BlogPost } from '@/components/blog-post';
import { Badge } from '@/components/ui/badge';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import rehypePrismPlus from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';
import { SeriesNavigation } from '@/components/blog/series-navigation';
import { formatDate } from '@/lib/utils';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The blog post you\'re looking for doesn\'t exist.',
    };
  }

  return {
    title: post.seo.title,
    description: post.seo.description,
    keywords: post.seo.keywords,
    openGraph: {
      title: post.seo.title,
      description: post.seo.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      images: [
        {
          url: post.seo.ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo.title,
      description: post.seo.description,
      images: [post.seo.ogImage],
    },
  };
}

// Static page generation
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const [series, relatedPosts] = await Promise.all([
    post.series ? getBlogSeries().then(series => 
      series.find(s => s.name === post.series?.name)
    ) : null,
    getRelatedPosts(post),
  ]);

  return (
    <>
      <MetaTags
        title={post.title}
        description={post.description}
        canonical={`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.slug}`}
        ogImage={post.seo.ogImage}
        author={post.author.name}
        publishedTime={post.date}
        modifiedTime={post.updatedAt}
        type="article"
        tags={post.tags}
      />

      <article className="container max-w-3xl py-10">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{post.category}</Badge>
              <span className="text-sm text-muted-foreground">
                {formatDate(post.date)}
              </span>
            </div>
            <h1 className="text-4xl font-bold">{post.title}</h1>
            <p className="text-xl text-muted-foreground">{post.description}</p>
          </div>

          <div className="flex items-center gap-4">
            {post.author.avatar && (
              <Image
                src={post.author.avatar}
                alt={`${post.author.name}'s avatar`}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <div>
              <p className="font-semibold">{post.author.name}</p>
              <p className="text-sm text-muted-foreground">{post.author.title}</p>
            </div>
          </div>

          {post.image && (
            <div className="relative aspect-[2/1] w-full overflow-hidden rounded-lg">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <MDXRemote source={post.content} />
          </div>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          {series && <SeriesNavigation currentPost={post} series={series} />}

          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-4 text-2xl font-bold">Related Posts</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {relatedPosts.map((relatedPost) => (
                  <div
                    key={relatedPost.slug}
                    className="group rounded-lg border p-4 transition-colors hover:bg-muted"
                  >
                    <p className="text-sm text-muted-foreground">
                      {formatDate(relatedPost.date)}
                    </p>
                    <h3 className="mt-2 font-semibold group-hover:text-primary">
                      {relatedPost.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {relatedPost.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
} 

export const dynamic = 'force-static'; 
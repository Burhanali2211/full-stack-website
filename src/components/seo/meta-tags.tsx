import Head from 'next/head';

interface MetaTagsProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  type?: 'website' | 'article';
}

export function MetaTags({
  title,
  description,
  canonical,
  ogImage,
  author,
  publishedTime,
  modifiedTime,
  tags,
  type = 'website',
}: MetaTagsProps) {
  const siteName = 'Educational Platform';
  const twitterHandle = '@eduplatform';
  const defaultImage = '/images/og-default.jpg';

  // Structured data for blog posts
  const structuredData = type === 'article' ? {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: ogImage || defaultImage,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: {
        '@type': 'ImageObject',
        url: '/images/logo.png',
      },
    },
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    keywords: tags?.join(', '),
  } : null;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{`${title} | ${siteName}`}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage || defaultImage} />
      {canonical && <meta property="og:url" content={canonical} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage || defaultImage} />

      {/* Article Specific Meta Tags */}
      {type === 'article' && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {author && <meta property="article:author" content={author} />}
          {tags?.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}
    </Head>
  );
} 
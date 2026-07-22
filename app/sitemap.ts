import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/lib/blog';

const BASE_URL = 'https://gsu.cl';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '', '/nosotros', '/sectores', '/tienda', '/blog', '/faq',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));

  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...staticRoutes, ...blogRoutes];
}

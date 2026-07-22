import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/checkout', '/admin'],
    },
    sitemap: 'https://gsu.cl/sitemap.xml',
  };
}

import { MetadataRoute } from 'next'
import { getAllMarketSlugs, getMarketWithDay } from '@/lib/market-utils'
import { markets } from '@/data'
import { dayNames } from '@/data/days'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://feriasenmontevideo.vercel.app'
  
  // Get all market slugs
  const marketSlugs = getAllMarketSlugs()
  
  // Generate market pages with images
  const marketPages: MetadataRoute.Sitemap = marketSlugs.map((slug) => {
    const market = getMarketWithDay(slug);
    return {
      url: `${baseUrl}/feria/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      images: market?.imageUrl ? [market.imageUrl] : undefined,
    };
  })

  // Generate neighborhood pages
  const neighborhoods = Array.from(new Set(
    Object.values(markets).flat().map(market => market.neighborhood)
  ))
  
  const neighborhoodPages: MetadataRoute.Sitemap = neighborhoods.map((neighborhood) => ({
    url: `${baseUrl}/barrio/${neighborhood}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Generate day pages
  const dayPages: MetadataRoute.Sitemap = Object.keys(dayNames).map((day) => ({
    url: `${baseUrl}/dia/${day}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/acerca-de`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    ...marketPages,
    ...neighborhoodPages,
    ...dayPages,
  ]
}

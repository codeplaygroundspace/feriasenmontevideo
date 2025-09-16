import { MetadataRoute } from 'next'
import { getAllMarketSlugs } from '@/lib/market-utils'
import { markets } from '@/data'
import { dayNames } from '@/data/days'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://feriasdemontevideo.com'
  
  // Get all market slugs
  const marketSlugs = getAllMarketSlugs()
  
  // Generate market pages
  const marketPages: MetadataRoute.Sitemap = marketSlugs.map((slug) => ({
    url: `${baseUrl}/feria/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // Generate neighborhood pages
  const neighborhoods = Array.from(new Set(
    Object.values(markets).flat().map(market => market.neighborhood)
  ))
  
  const neighborhoodPages: MetadataRoute.Sitemap = neighborhoods.map((neighborhood) => ({
    url: `${baseUrl}/barrio/${neighborhood}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  // Generate day pages
  const dayPages: MetadataRoute.Sitemap = Object.keys(dayNames).map((day) => ({
    url: `${baseUrl}/dia/${day}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...marketPages,
    ...neighborhoodPages,
    ...dayPages,
  ]
}

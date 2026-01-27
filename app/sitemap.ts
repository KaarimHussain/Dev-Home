import { MetadataRoute } from 'next'
import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://my-home-rho-one.vercel.app'

    const routes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
    ]

    try {
        const projectsSnapshot = await getDocs(collection(db, "projects"));
        const projectRoutes: MetadataRoute.Sitemap = projectsSnapshot.docs.map(doc => ({
            url: `${baseUrl}/project-details/${doc.id}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        }));
        return [...routes, ...projectRoutes];
    } catch (error) {
        console.error("Error generating sitemap for projects:", error);
        return routes;
    }
}

import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Kaarim Hussain Portfolio',
        short_name: 'Kaarim Portfolio',
        description: 'Expert Full Stack Developer specializing in Next.js, .NET, and modern web solutions.',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#000000',
        icons: [
            {
                src: '/images/Logo-White.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/images/Logo-White.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}

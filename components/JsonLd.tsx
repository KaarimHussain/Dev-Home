import React from 'react';

const JsonLd = () => {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Kaarim Hussain',
        url: 'https://my-home-rho-one.vercel.app/',
        jobTitle: 'Full Stack Developer',
        description: 'Expert Full Stack Developer specializing in Next.js, .NET, and modern web solutions.',
        image: 'https://my-home-rho-one.vercel.app/images/Logo-White.png',
        sameAs: [
            'https://github.com/KaarimHussain',
            'https://linkedin.com/in/KaarimHussain'
        ],
        knowsAbout: [
            'Next.js',
            'React',
            'TypeScript',
            '.NET Core',
            'Flutter',
            'Cloud Computing'
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
};

export default JsonLd;

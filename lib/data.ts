
export interface Project {
    id: number;
    title: string;
    description: string;
    // category was previously 'type' in page.tsx (e.g. "Fullstack", "E-Commerce")
    category: string;
    // type was previously 'type' in home/projects.tsx (e.g. "desktop", "mobile")
    type: "desktop" | "mobile";
    tags: string[];
    tech: string[];
    favourite: boolean;
    image: string;
    image2: string;
}

export const projects: Project[] = [
    {
        id: 1,
        title: "Skill-Ustad",
        description:
            "Skillistan is an AI-driven learning platform built with ASP.NET Core, FastAPI, and a modern frontend stack, offering personalized skill mastery through models like Gemini and Ollama. More than an LMS, it's an adaptive, interactive experience tailored to each learner.",
        category: "Fullstack",
        type: "desktop",
        tags: ["AI/ML", "Education", "Real-time"],
        tech: [
            ".NET Core API",
            "FastAPI",
            "React",
            "Tailwind CSS",
            "Ollama",
            "Gemini",
            "PostgreSQL",
            "Firebase",
            "Shadcn/ui",
        ],
        favourite: true,
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
        image2: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    },
    {
        id: 2,
        title: "Jobistan",
        description:
            "Jobistan: A modern PHP/MySQL job platform connecting seekers and employers. Features secure authentication, advanced search, encrypted messaging, and AI-powered security. Responsive design with analytics for all users. Join us to streamline your job search or recruitment process!",
        category: "Fullstack",
        type: "desktop",
        tags: ["Job Marketplace", "Security", "Real-time"],
        tech: ["PHP", "MySQL", "HTML/CSS", "Bootstrap", "AJAX", "jQuery", "JavaScript"],
        favourite: false,
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
        image2: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    },
    {
        id: 3,
        title: "Watch Hub",
        description:
            "WatchHub is a premium watch shopping app built with Flutter. It lets users browse, filter, and purchase watches with ease. Features include secure login, cart, wishlist, reviews, and an admin panel. Designed for speed, usability, and real-world eCommerce experience on mobile.",
        category: "E-Commerce",
        type: "mobile",
        tags: ["Mobile", "Shopping", "Payment"],
        tech: ["Flutter", "Firebase", "Dart", "Material UI"],
        favourite: false,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        image2: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    },
    {
        id: 4,
        title: "Artify",
        description:
            "Artify, a full-stack Art Selling Website designed to connect talented artists with passionate buyers. This platform supports artwork discovery, secure purchases, artist commissions, and more — all wrapped in a modern, mobile-responsive UI with a powerful backend.",
        category: "E-Commerce",
        type: "desktop",
        tags: ["Marketplace", "Creative", "Social"],
        tech: ["Angular", ".NET Core API", "SQL Server", "Tailwind CSS"],
        favourite: false,
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
        image2: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80",
    },
]

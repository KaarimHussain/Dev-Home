import { NextResponse } from 'next/server';
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, limit, query, setDoc, doc, writeBatch } from "firebase/firestore";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const results = {
            tech_stack: 'skipped',
            projects: 'skipped',
            contact_details: 'skipped',
            resume: 'skipped',
            admins: 'skipped',
            experiences: 'skipped'
        };

        // --- SEED TECH STACK ---
        const techStackRef = collection(db, 'tech_stack');
        // Check emptiness
        const techStackSnapshot = await getDocs(query(techStackRef, limit(1)));

        if (techStackSnapshot.empty) {
            const techStack = [
                // Languages
                { name: "JavaScript", icon: "JavaScript", color: "#F7DF1E", category: "languages" },
                { name: "TypeScript", icon: "TypeScript", color: "#3178C6", category: "languages" },
                { name: "C#", icon: "Csharp", color: "#239120", category: "languages" },
                { name: "Dart", icon: "Dart", color: "#0175C2", category: "languages" },
                { name: "PHP", icon: "PHP", color: "#777BB4", category: "languages" },
                { name: "SQL Server", icon: "SqlServer", color: "#336791", category: "languages" },
                { name: "MySQL", icon: "MySQL", color: "#336791", category: "languages" },
                { name: "PostgreSQL", icon: "PostgreSQL", color: "#336791", category: "languages" },
                { name: "MongoDB", icon: "MongoDb", color: "#47A248", category: "languages" },
                { name: "Firebase", icon: "Firebase", color: "#FFCA28", category: "languages" },

                // Frameworks
                { name: "React", icon: "React", color: "#61DAFB", category: "frameworks" },
                { name: "Next.js", icon: "NextJs", color: "#000000", category: "frameworks" },
                { name: "Node.js", icon: "NodeJs", color: "#339933", category: "frameworks" },
                { name: "Express", icon: "Express", color: "#000000", category: "frameworks" },
                { name: ".NET Core", icon: "DotNet", color: "#512BD4", category: "frameworks" },
                { name: "Angular", icon: "Angular", color: "#DD0031", category: "frameworks" },
                { name: "Flutter", icon: "Flutter", color: "#02569B", category: "frameworks" },
                { name: "JQuery", icon: "Jquery", color: "#3178C6", category: "frameworks" },
                { name: "JWT", icon: "JWT", color: "#3178C6", category: "frameworks" },
                { name: "Wordpress", icon: "Wordpress", color: "#3178C6", category: "frameworks" },
                { name: "Elementor", icon: "Elementor", color: "#3178C6", category: "frameworks" },
                { name: "Bootstrap", icon: "Bootstrap", color: "#336791", category: "frameworks" },
                { name: "TailwindCss", icon: "TailwindCss", color: "#336791", category: "frameworks" },
                { name: "Shadcn/ui", icon: "Shadncn", color: "#336791", category: "frameworks" },
                { name: "Motion", icon: "Motion", color: "#336791", category: "frameworks" },

                // AI Tools
                { name: "OpenAI", icon: "OpenAI", color: "#10A37F", category: "ai" },
                { name: "Claude", icon: "Claude", color: "#8B5CF6", category: "ai" },
                { name: "Gemini", icon: "Gemini", color: "#4285F4", category: "ai" },
                { name: "Ollama", icon: "Ollama", color: "#111827", category: "ai" },
                { name: "GitHub Copilot", icon: "GitHubCopilot", color: "#3B82F6", category: "ai" },
                { name: "Github", icon: "Github", color: "#3B82F6", category: "ai" },
                { name: "Git", icon: "Git", color: "#3B82F6", category: "ai" },
                { name: "Qwen", icon: "Qwen", color: "#3B82F6", category: "ai" },
                { name: "Perplexity", icon: "Perplexity", color: "#3B82F6", category: "ai" },
                { name: "Kimi", icon: "Kimi", color: "#3B82F6", category: "ai" },
                { name: "Grok", icon: "Grok", color: "#3B82F6", category: "ai" },
                { name: "Windsurf", icon: "Windsurf", color: "#3B82F6", category: "ai" },

                // Design Tools
                { name: "Figma", icon: "Figma", color: "#F24E1E", category: "design" },
                { name: "Canva", icon: "Canva", color: "#00C4CC", category: "design" }
            ];

            for (const item of techStack) {
                await addDoc(techStackRef, item);
            }
            results.tech_stack = 'seeded';
        }


        // --- SEED PROJECTS ---
        const projectsRef = collection(db, 'projects');
        const projectsSnapshot = await getDocs(query(projectsRef, limit(1)));
        if (projectsSnapshot.empty) {
            const projects = [
                {
                    title: "Skill-Ustad",
                    type: "desktop",
                    description: "Skillistan is an AI-driven learning platform built with ASP.NET Core, FastAPI, and a modern frontend stack, offering personalized skill mastery through models like Gemini and Ollama. More than an LMS, it's an adaptive, interactive experience tailored to each learner.",
                    category: "Fullstack",
                    tags: ["AI/ML", "Education", "Real-time"],
                    tech: [".NET Core API", "FastAPI", "React", "Tailwind CSS", "Ollama", "Gemini", "PostgreSQL", "Firebase", "Shadcn/ui"],
                    favourite: true,
                    images: [
                        "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
                        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80"
                    ]
                },
                {
                    title: "Jobistan",
                    type: "desktop",
                    description: "Jobistan: A modern PHP/MySQL job platform connecting seekers and employers. Features secure authentication, advanced search, encrypted messaging, and AI-powered security. Responsive design with analytics for all users. Join us to streamline your job search or recruitment process!",
                    category: "Fullstack",
                    tags: ["Job Marketplace", "Security", "Real-time"],
                    tech: ["PHP", "MySQL", "HTML/CSS", "Bootstrap", "AJAX", "jQuery", "JavaScript"],
                    favourite: false,
                    images: [
                        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
                        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80"
                    ]
                },
                {
                    title: "Watch Hub",
                    type: "mobile",
                    description: "WatchHub is a premium watch shopping app built with Flutter. It lets users browse, filter, and purchase watches with ease. Features include secure login, cart, wishlist, reviews, and an admin panel. Designed for speed, usability, and real-world eCommerce experience on mobile.",
                    category: "E-Commerce",
                    tags: ["Mobile", "Shopping", "Payment"],
                    tech: ["Flutter", "Firebase", "Dart", "Material UI"],
                    favourite: false,
                    images: [
                        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
                        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
                    ]
                },
                {
                    title: "Artify",
                    type: "desktop",
                    description: "Artify, a full-stack Art Selling Website designed to connect talented artists with passionate buyers. This platform supports artwork discovery, secure purchases, artist commissions, and more — all wrapped in a modern, mobile-responsive UI with a powerful backend.",
                    category: "E-Commerce",
                    tags: ["Marketplace", "Creative", "Social"],
                    tech: ["Angular", ".NET Core API", "SQL Server", "Tailwind CSS"],
                    favourite: false,
                    images: [
                        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
                        "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80"
                    ]
                }
            ];
            for (const item of projects) {
                await addDoc(projectsRef, item);
            }
            results.projects = 'seeded';
        }

        // --- SEED EXPERIENCES ---
        const expRef = collection(db, 'experiences');
        const expSnapshot = await getDocs(query(expRef, limit(1)));
        if (expSnapshot.empty) {
            const experiences = [
                {
                    company: "Syntrix System",
                    position: "Fullstack Developer",
                    location: "Pakistan, Karachi",
                    duration: "Sep 2025 - Present",
                    type: "Full-time",
                    description: "Design, develop, and maintain custom and WordPress websites for international clients, while contributing to custom software solutions and internal systems.",
                    achievements: [
                        "Built a custom CRM that increased company efficiency by 48%",
                        "Developed a custom email template designer using the Gemini API for management workflows",
                        "Adopted and implemented NestJS while developing the CRM"
                    ],
                    technologies: [
                        "React",
                        "Next-Js",
                        "Tailwind CSS",
                        "Shadcn/UI",
                        "Node-Js",
                        "Express-Js",
                        "PHP",
                        "MySQL",
                        ".NET"
                    ],
                    current: true
                },
                {
                    company: "Mind Vibes Solutions",
                    position: "Junior Fullstack Developer",
                    location: "Remote",
                    duration: "Jan 2024 - Sep 2024",
                    type: "Part-time",
                    description: "Developed and maintained scalable web applications using PHP, MySQL, JavaScript, and AJAX; integrated frontend with backend services; conducted testing and shipped feature updates.",
                    achievements: [
                        "Gained hands-on experience building and deploying production-ready software, following best practices for scalability, security, and maintainability"
                    ],
                    technologies: [
                        "HTML",
                        "CSS",
                        "JavaScript",
                        "PHP",
                        "MySQL"
                    ],
                    current: false
                }
            ];
            for (const item of experiences) {
                await addDoc(expRef, item);
            }
            results.experiences = 'seeded';
        }

        // --- SEED CONTACT (Preserved) ---
        const contactsRef = collection(db, 'contact_details');
        const contactsSnapshot = await getDocs(query(contactsRef, limit(1)));
        if (contactsSnapshot.empty) {
            const contacts = [
                { icon: "MailIcon", label: "Email", value: "kaariminnocent@gmail.com" },
                { icon: "PhoneIcon", label: "Phone", value: "+92 317 3009130" },
                { icon: "MapPinIcon", label: "Address", value: "Karachi, Pakistan" }
            ];
            for (const item of contacts) {
                await addDoc(contactsRef, item);
            }
            results.contact_details = 'seeded';
        }

        // --- SEED RESUME (Preserved) ---
        const resumeRef = doc(db, 'resume', 'current_resume');
        await setDoc(resumeRef, {
            url: "/resume.pdf",
            label: "Resume"
        }, { merge: true });
        results.resume = 'seeded';

        // --- SEED ADMIN (Preserved) ---
        const adminsRef = collection(db, 'admins');
        const adminsSnapshot = await getDocs(query(adminsRef, limit(1)));
        if (adminsSnapshot.empty) {
            const username = process.env.ADMIN_USERNAME || 'admin';
            const password = process.env.ADMIN_PASSWORD || 'admin';
            await addDoc(adminsRef, {
                username,
                password
            });
            results.admins = 'seeded';
        }

        return NextResponse.json({ success: true, results });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

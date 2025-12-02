"use client"

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../ui/button";

gsap.registerPlugin(ScrollTrigger);

const dummyProjects = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "Modern shopping experience with real-time inventory tracking",
        type: "desktop",
        tech: ["React", "Node.js", "Stripe"],
        color: "from-blue-500 to-cyan-500",
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80"
    },
    {
        id: 2,
        title: "Fitness Tracker App",
        description: "Track workouts and nutrition with AI coaching",
        type: "mobile",
        tech: ["React Native", "Firebase"],
        color: "from-purple-500 to-pink-500",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80"
    },
    {
        id: 3,
        title: "Analytics Dashboard",
        description: "Real-time data visualization with predictive insights",
        type: "desktop",
        tech: ["TypeScript", "Python", "D3.js"],
        color: "from-emerald-500 to-teal-500",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
    },
    {
        id: 4,
        title: "Social Media App",
        description: "Connect and share moments with friends instantly",
        type: "mobile",
        tech: ["Flutter", "GraphQL"],
        color: "from-orange-500 to-red-500",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80"
    },
    {
        id: 5,
        title: "Project Manager",
        description: "Collaborate and manage tasks with your team efficiently",
        type: "desktop",
        tech: ["Next.js", "PostgreSQL"],
        color: "from-violet-500 to-purple-500",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80"
    }
];

export default function Projects() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        const ctx = gsap.context(() => {
            const panels = track.querySelectorAll(".project-item");
            if (!panels.length) return;

            gsap.to(track, {
                x: () => -(track.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "center center",
                    end: () => `+=${track.scrollWidth - window.innerWidth + window.innerHeight}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true
                }
            });
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={sectionRef}
            className="min-h-screen w-full bg-black px-5 md:px-10 lg:px-20 xl:px-32 py-20 overflow-hidden flex items-center"
        >
            <div className="w-full">
                {/* Section Header */}
                <div className="mb-16">
                    <h5 className="text-md text-black/70 font-inter mb-5 flex items-center gap-5">
                        <span className="font-fira text-primary font-bold lg:text-7xl md:text-6xl sm:text-5xl text-4xl">02</span>
                        <div className="lg:h-15 md:h-10 h-7 bg-primary w-1"></div>
                        <div className="border border-primary bg-transparent rounded-full px-3 text-xs w-fit text-primary font-fira">
                            My Projects
                        </div>
                    </h5>
                </div>

                {/* Horizontal Scroll Track */}
                <div ref={trackRef} className="flex gap-5 items-center">
                    {dummyProjects.map((project, idx) => (
                        <div
                            key={project.id}
                            className="project-item shrink-0 w-[85vw] sm:w-[70vw] md:w-[55vw] lg:w-[45vw] xl:w-[38vw]"
                            onMouseEnter={() => setHoveredId(project.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            onTouchStart={() => setHoveredId(project.id)}
                        >
                            <div className="space-y-6">
                                {/* Device Mockup */}
                                <div className="relative group">
                                    {project.type === "desktop" ? (
                                        // Desktop Mockup
                                        <div className="relative">
                                            {/* Monitor Stand */}
                                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-24 h-8 bg-linear-to-b from-zinc-700 to-zinc-800 rounded-b-lg" />
                                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-2 bg-zinc-800 rounded-full" />

                                            {/* Monitor Frame */}
                                            <div className="relative bg-linear-to-br from-zinc-800 to-zinc-900 rounded-2xl p-3 shadow-2xl">
                                                {/* Screen with Image */}
                                                <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                                                    {/* Project Image */}
                                                    <img
                                                        src={project.image}
                                                        alt={project.title}
                                                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${hoveredId === project.id ? 'blur-0 scale-100' : 'blur-xl scale-110'
                                                            }`}
                                                    />

                                                    {/* Gradient Overlay */}
                                                    <div className={`absolute inset-0 bg-linear-to-br ${project.color} transition-opacity duration-700 ${hoveredId === project.id ? 'opacity-0' : 'opacity-60'
                                                        }`} />

                                                    {/* Browser Chrome */}
                                                    <div className="absolute top-0 left-0 right-0 h-10 bg-zinc-900/80 backdrop-blur-md border-b border-white/10 flex items-center px-4 gap-2">
                                                        <div className="flex gap-1.5">
                                                            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer transition-colors" />
                                                            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 cursor-pointer transition-colors" />
                                                            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 cursor-pointer transition-colors" />
                                                        </div>
                                                        <div className="flex-1 h-6 bg-white/5 rounded-md ml-4 px-3 flex items-center">
                                                            <div className="w-3 h-3 rounded-full bg-white/20" />
                                                            <div className="ml-2 h-2 bg-white/10 rounded flex-1 max-w-xs" />
                                                        </div>
                                                    </div>

                                                    {/* Hover Instruction */}
                                                    <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${hoveredId === project.id ? 'opacity-0 pointer-events-none' : 'opacity-100'
                                                        }`}>
                                                        <div className="bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                                                            <p className="text-white text-sm font-medium">Hover to preview</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Bottom Notch */}
                                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-zinc-700 rounded-t-full" />
                                            </div>
                                        </div>
                                    ) : (
                                        // Mobile Mockup
                                        <div className="relative mx-auto w-64">
                                            {/* Phone Frame */}
                                            <div className="relative bg-linear-to-br from-zinc-800 to-zinc-900 rounded-[3rem] p-3 shadow-2xl">
                                                {/* Screen with Image */}
                                                <div className="relative aspect-[9/19.5] rounded-[2.5rem] overflow-hidden bg-black">
                                                    {/* Notch */}
                                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-20 flex items-center justify-center gap-2">
                                                        <div className="w-12 h-1 bg-zinc-700 rounded-full" />
                                                        <div className="w-2 h-2 bg-zinc-700 rounded-full" />
                                                    </div>

                                                    {/* Project Image */}
                                                    <img
                                                        src={project.image}
                                                        alt={project.title}
                                                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${hoveredId === project.id ? 'blur-0 scale-100' : 'blur-xl scale-110'
                                                            }`}
                                                    />

                                                    {/* Gradient Overlay */}
                                                    <div className={`absolute inset-0 bg-linear-to-br ${project.color} transition-opacity duration-700 ${hoveredId === project.id ? 'opacity-0' : 'opacity-60'
                                                        }`} />

                                                    {/* Status Bar */}
                                                    <div className="absolute top-0 left-0 right-0 pt-2 px-6 z-10">
                                                        <div className="flex justify-between items-center text-white text-xs font-medium pt-2 drop-shadow-lg">
                                                            <span>9:41</span>
                                                            <div className="flex gap-1 items-center">
                                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                                                                </svg>
                                                                <span>100%</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Hover Instruction */}
                                                    <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 z-10 ${hoveredId === project.id ? 'opacity-0 pointer-events-none' : 'opacity-100'
                                                        }`}>
                                                        <div className="bg-black/50 backdrop-blur-sm px-5 py-2 rounded-full border border-white/20">
                                                            <p className="text-white text-xs font-medium">Tap to preview</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Side Buttons */}
                                            <div className="absolute right-0 top-20 w-1 h-12 bg-zinc-700 rounded-l-full" />
                                            <div className="absolute right-0 top-36 w-1 h-16 bg-zinc-700 rounded-l-full" />
                                            <div className="absolute left-0 top-24 w-1 h-8 bg-zinc-700 rounded-r-full" />
                                        </div>
                                    )}
                                </div>

                                {/* Project Info */}
                                <div className="space-y-4 text-center">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-center gap-3">
                                            <span className="text-xs font-mono text-white/30">
                                                {String(idx + 1).padStart(2, '0')}
                                            </span>
                                            <h3 className="text-2xl md:text-3xl font-bold text-white">
                                                {project.title}
                                            </h3>
                                        </div>
                                        <p className="text-sm text-white/60 max-w-md mx-auto">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="flex gap-2 flex-wrap justify-center">
                                        {project.tech.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70 backdrop-blur-sm"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* View More Button */}
                                    <Button>
                                        View More
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
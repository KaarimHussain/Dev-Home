"use client"

import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Badge from "@/public/svgs/Badge.svg";

const dummyProjects = [
    {
        id: 1,
        title: "Skill-Ustad",
        description: "Skillistan is an AI-driven learning platform built with ASP.NET Core, FastAPI, and a modern frontend stack, offering personalized skill mastery through models like Gemini and Ollama. More than an LMS, it’s an adaptive, interactive experience tailored to each learner.",
        type: "desktop",
        tech: [".NET Core API", "FastAPI", "React", "Tailwind CSS", "Ollama", "Gemini", "PostgreSQL", "Firebase", "Shadcn/ui"],
        favourite: true,
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
        image2: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80"
    },
    {
        id: 2,
        title: "Jobistan",
        description: "Jobistan: A modern PHP/MySQL job platform connecting seekers and employers. Features secure authentication, advanced search, encrypted messaging, and AI-powered security. Responsive design with analytics for all users. Join us to streamline your job search or recruitment process!",
        type: "desktop",
        tech: ["PHP", "MySQL", "HTML/CSS", "Bootstrap", "AJAX", "jQuery", "JavaScript"],
        favourite: false,
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
        image2: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80"
    },
    {
        id: 3,
        title: "Watch Hub",
        description: "WatchHub is a premium watch shopping app built with Flutter. It lets users browse, filter, and purchase watches with ease. Features include secure login, cart, wishlist, reviews, and an admin panel. Designed for speed, usability, and real-world eCommerce experience on mobile.",
        type: "mobile",
        tech: ["Flutter", "Firebase", "Dart", "Material UI"],
        favourite: false,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        image2: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
    },
    {
        id: 4,
        title: "Artify",
        description: "Artify, a full-stack Art Selling Website designed to connect talented artists with passionate buyers. This platform supports artwork discovery, secure purchases, artist commissions, and more — all wrapped in a modern, mobile-responsive UI with a powerful backend.",
        type: "desktop",
        tech: ["Angular", ".NET Core API", "SQL Server", "Tailwind CSS"],
        favourite: false,
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
        image2: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80"
    },
];

export default function Projects() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1.5], [0, -200]);
    const y2 = useTransform(scrollYProgress, [0, 1.5], [0, 200]);

    return (
        <div className="min-h-screen bg-white relative">
            <div
                className="min-h-screen w-full bg-linear-to-b from-black to-black/95  px-5 md:px-10 lg:px-20 xl:px-32 py-20 relative overflow-hidden rounded-[50px]"
            >
                <div className="mb-16">
                    <h5 className="text-lg text-white/70 font-inter mb-5 flex items-center gap-5">
                        <span className="font-fira text-primary font-bold lg:text-7xl md:text-6xl sm:text-5xl text-4xl">02</span>
                        <div className="lg:h-15 md:h-10 h-7 bg-primary w-1"></div>
                        <div className="border border-primary bg-transparent rounded-full px-3 text-xs w-fit text-primary font-fira">
                            My Projects
                        </div>
                    </h5>
                </div>
                <div className="mb-5 mt-50 container mx-auto max-w-7xl px-5" ref={containerRef}>
                    {dummyProjects.map((project, index) => (
                        <div key={project.id}>
                            <div className="flex items-center justify-center flex-col lg:gap-10 md:gap-8 sm:gap-5 mb-30">
                                <div className="flex gap-2 flex-col items-center">
                                    <span className="text-md font-light font-inter text-white/80 uppercase">
                                        {project.type === 'desktop' ? 'Web Application' : 'Mobile Application'}
                                    </span>
                                    {/* divider */}
                                    <div className="w-60 h-px bg-white/20"></div>
                                </div>
                                <div className="relative">
                                    <motion.img
                                        style={{ y: y1 }}
                                        src={project.image}
                                        className="aspect-video hidden md:block lg:w-[300px] md:w-[200px] w-[150px] absolute lg:top-0 lg:-left-50 md:top-10 md:-left-30 top-5 -left-10 z-1 object-center object-cover"
                                        alt=""
                                    />
                                    <div className="flex flex-col items-center justify-center gap-5">
                                        {/* title */}
                                        <h2 className="z-2 lg:text-[170px] md:text-[100px] sm:text-[80px] text-[60px] font-semibold font-inter bg-linear-to-r from-white to-primary bg-clip-text text-transparent relative leading-[150px] text-center overflow-visible mix-blend-difference">
                                            {project.title}
                                        </h2>
                                    </div>

                                    <motion.img
                                        style={{ y: y2 }}
                                        src={project.image2}
                                        className="aspect-video hidden md:block lg:w-[300px] md:w-[200px] w-[150px] absolute lg:top-30 lg:-right-50 md:top-20 md:-right-30 top-10 -right-10 z-0 object-center object-cover"
                                        alt=""
                                    />
                                </div>
                                <div className="flex flex-col items-center justify-between gap-5 max-w-xl">
                                    <p className="lg:text-2xl md:text-xl text-lg text-white font-light text-center italic z-5 mix-blend-difference">
                                        "{project.description}"
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-2 mb-2 mt-2">
                                        {project.tech.map((techItem, techIndex) => (
                                            <span
                                                key={techIndex}
                                                className="bg-transparent border border-white/50 text-white text-xs px-3 py-1 rounded-full font-fira"
                                            >
                                                {techItem}
                                            </span>
                                        ))}
                                    </div>
                                    <Button size={"lg"} className="rounded-full cursor-pointer">
                                        View Details <ArrowRight />
                                    </Button>
                                </div>
                            </div>
                            {index < dummyProjects.length - 1 && (
                                <div className="bg-linear-to-r from-transparent via-white to-tranparent h-1 w-full my-50" ></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
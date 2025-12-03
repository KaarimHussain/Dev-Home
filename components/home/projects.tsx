"use client"

import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const dummyProjects = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "A comprehensive modern shopping experience featuring real-time inventory tracking, seamless payment processing, and personalized product recommendations powered by machine learning algorithms to enhance your online retail operations.",
        type: "desktop",
        tech: ["React", "Node.js", "Stripe"],
        color: "from-blue-500 to-cyan-500",
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
        image2: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80"
    },
    {
        id: 2,
        title: "Fitness Tracker App",
        description: "Advanced fitness tracking application that monitors your workouts, nutrition intake, and provides AI-powered coaching recommendations to help you achieve your health and wellness goals faster with personalized insights.",
        type: "mobile",
        tech: ["React Native", "Firebase", "TensorFlow"],
        color: "from-purple-500 to-pink-500",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
        image2: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80"
    },
    {
        id: 3,
        title: "Analytics Dashboard",
        description: "Comprehensive real-time data visualization platform with predictive insights, interactive charts, and customizable reports to help businesses make data-driven decisions efficiently and stay ahead of market trends.",
        type: "desktop",
        tech: ["TypeScript", "Python", "D3.js"],
        color: "from-emerald-500 to-teal-500",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        image2: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
    },
    {
        id: 4,
        title: "Social Media App",
        description: "Innovative social networking platform that enables users to connect, share moments, and engage with friends instantly through stories, posts, and real-time messaging features with end-to-end encryption for privacy.",
        type: "mobile",
        tech: ["Flutter", "GraphQL", "Redis"],
        color: "from-orange-500 to-red-500",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
        image2: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80"
    },
    {
        id: 5,
        title: "Project Manager",
        description: "Powerful project management tool that helps teams collaborate seamlessly, track progress in real-time, manage tasks efficiently, and maintain clear communication throughout the entire project lifecycle with integrated tools.",
        type: "desktop",
        tech: ["Next.js", "PostgreSQL", "Docker"],
        color: "from-violet-500 to-purple-500",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
        image2: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&q=80"
    }
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
        <div
            className="min-h-screen w-full bg-linear-to-b from-black to-black/95  px-5 md:px-10 lg:px-20 xl:px-32 py-20 relative overflow-hidden"
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
                        <div className="flex items-center justify-center flex-col gap-10 mb-30">
                            <div className="relative">
                                <motion.img
                                    style={{ y: y1 }}
                                    src={project.image}
                                    className="aspect-video w-[300px] absolute top-0 -left-50 z-1"
                                    alt=""
                                />
                                <div className="flex flex-col items-center justify-center gap-5">
                                    <div className="flex gap-2 flex-col items-center">
                                        <span className="text-md font-light font-inter text-white/80 uppercase">
                                            {project.type === 'desktop' ? 'Web Application' : 'Mobile Application'}
                                        </span>
                                        {/* divider */}
                                        <div className="w-60 h-px bg-white/20"></div>
                                    </div>
                                    {/* title */}
                                    <h2 className="z-2 text-[170px] font-semibold font-inter bg-linear-to-r from-white to-primary bg-clip-text text-transparent relative leading-[150px] text-center overflow-visible">
                                        {project.title}
                                    </h2>
                                </div>
                                <motion.img
                                    style={{ y: y2 }}
                                    src={project.image2}
                                    className="aspect-video w-[300px] absolute top-30 -right-50 z-0"
                                    alt=""
                                />
                            </div>
                            <div className="flex flex-col items-center justify-between gap-5 max-w-xl">
                                <p className="text-2xl text-white font-light text-center italic">
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
    );
}
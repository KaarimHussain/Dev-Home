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


    return (
        <div
            className="min-h-screen w-full bg-linear-to-b from-black to-black/95  px-5 md:px-10 lg:px-20 xl:px-32 py-20 relative overflow-hidden"
        >
            {/* Section Header */}
            <div className="mb-16">
                <h5 className="text-md text-black/70 font-inter mb-5 flex items-center gap-5">
                    <span className="font-fira text-primary font-bold lg:text-7xl md:text-6xl sm:text-5xl text-4xl">02</span>
                    <div className="lg:h-15 md:h-10 h-7 bg-primary w-1"></div>
                    <div className="border border-primary bg-transparent rounded-full px-3 text-xs w-fit text-primary font-fira">
                        My Projects
                    </div>
                </h5>

                <div className="mb-5 ">

                </div>
            </div>
        </div>
    );
}
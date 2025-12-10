"use client"

import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

import { projects } from "@/lib/data";

export default function Projects() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 300]);

    return (
        <div className="min-h-screen bg-white relative">
            <div
                className="min-h-screen w-full bg-linear-to-b from-black to-black/95 px-5 md:px-10 lg:px-20 xl:px-32 py-20 relative overflow-hidden rounded-[50px]"
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
                    {projects.map((project, index) => (
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
                                        className={
                                            project.type === 'mobile'
                                                ? "aspect-9/16 hidden md:block lg:w-[150px] md:w-[100px] w-[75px] absolute lg:top-10 lg:-left-30 md:top-20 md:-left-15 top-10 -left-5 z-1 object-center object-cover rounded-2xl"
                                                : "aspect-video hidden md:block lg:w-[300px] md:w-[200px] w-[150px] absolute lg:top-0 lg:-left-50 md:top-10 md:-left-30 top-5 -left-10 z-1 object-center object-cover rounded-2xl"
                                        }
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
                                        className={
                                            project.type === 'mobile' ?
                                                "aspect-9/16 hidden md:block lg:w-[150px] md:w-[100px] w-[75px] absolute lg:top-30 lg:-right-50 md:top-20 md:-right-30 top-10 -right-10 z-0 object-center object-cover rounded-2xl" :
                                                "aspect-video hidden md:block lg:w-[300px] md:w-[200px] w-[150px] absolute lg:top-30 lg:-right-50 md:top-20 md:-right-30 top-10 -right-10 z-0 object-center object-cover rounded-2xl"}
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
                            {index < projects.length - 1 && (
                                <div className="bg-linear-to-r from-transparent via-white to-tranparent h-1 w-full my-50" ></div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="w-full flex items-center justify-center">
                    <Link href={""} className="mx-auto">
                        <Button size={"lg"}>
                            View All Projects
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
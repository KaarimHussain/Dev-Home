"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Award, Calendar, ExternalLink, Trophy, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "../ui/button";

// Interface for Achievement
interface Achievement {
    id: string;
    title: string;
    organization: string;
    date: string;
    description: string;
    image: string;
    credentialLink: string;
    stats: string;
    featured: boolean;
}

export default function Achievements() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
    const [achievements, setAchievements] = useState<Achievement[]>([]);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const response = await fetch('/api/achievements');
                const data = await response.json();
                setAchievements(data);
            } catch (error) {
                console.error("Failed to fetch achievements:", error);
            }
        };

        fetchAchievements();
    }, []);


    return (
        <section ref={containerRef} className="min-h-screen w-full bg-white relative py-20 px-5 md:px-10 lg:px-20 overflow-hidden">
            {/* Background Decoration (Light Theme) */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Standard Header (Restored) */}
                <motion.div
                    style={{ opacity }}
                    className="mb-20"
                >
                    <div className="flex items-center gap-5 mb-8">
                        <span className="font-fira text-primary font-bold lg:text-7xl md:text-6xl sm:text-5xl text-4xl">
                            06
                        </span>
                        <div className="lg:h-15 md:h-10 h-7 bg-primary w-1"></div>
                        <div className="border border-primary/50 bg-primary/5 rounded-full px-3 text-xs w-fit text-primary font-fira">
                            Achievements
                        </div>
                    </div>

                    <h2 className="lg:text-6xl md:text-5xl text-4xl font-bold text-gray-900 leading-tight max-w-4xl">
                        Recognitions & <span className="text-primary italic">Milestones</span>
                    </h2>
                </motion.div>

                {/* Bento Grid (Light Theme Adaptation) */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                    {/* Featured / Main Card */}
                    {achievements.filter(a => a.featured).map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="md:col-span-8 row-span-2"
                        >
                            <div className="group relative rounded-3xl h-full min-h-[500px] flex flex-col overflow-hidden bg-white border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent"></div>
                                </div>

                                <div className="relative z-10 p-10 flex flex-col h-full justify-end items-start mt-auto">
                                    <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold">
                                        <Trophy className="w-4 h-4 text-amber-400" />
                                        {item.stats}
                                    </div>

                                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                                        {item.title}
                                    </h3>

                                    <p className="text-gray-200 text-lg mb-8 max-w-2xl line-clamp-3">
                                        {item.description}
                                    </p>

                                    <div className="flex items-center gap-6 text-sm font-mono text-gray-300">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            {item.date}
                                        </div>
                                        <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                                        <div>{item.organization}</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Secondary Cards */}
                    {achievements.filter(a => !a.featured).map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="md:col-span-4"
                        >
                            <div className="rounded-3xl h-full min-h-[280px] p-8 flex flex-col justify-between bg-white border border-gray-100 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300 group">
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-primary/10 transition-colors">
                                            {index === 0 ? (
                                                <ShieldCheck className="w-6 h-6 text-emerald-500" />
                                            ) : (
                                                <Sparkles className="w-6 h-6 text-purple-500" />
                                            )}
                                        </div>
                                        <span className="text-xs font-mono text-gray-500 bg-gray-50 border border-gray-200 px-2 py-1 rounded-md">
                                            {item.date}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h3>

                                    <p className="text-sm text-gray-500 line-clamp-3">
                                        {item.description}
                                    </p>
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                                        <TrendingUp className="w-3 h-3 text-primary" />
                                        {item.stats}
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* CTA Block (Light Theme) */}
                    <div className="md:col-span-4 bg-primary rounded-3xl p-8 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-white/10 opacity-30"></div>
                        <div className="relative z-10 flex flex-col h-full justify-center text-center items-center">
                            <h3 className="text-2xl font-bold text-white mb-2">View Credentials</h3>
                            <p className="text-white/80 text-sm mb-6">Verify all certifications on LinkedIn</p>
                            <Button className="bg-white text-primary hover:bg-white/90 rounded-full w-full font-semibold">
                                Visit LinkedIn
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
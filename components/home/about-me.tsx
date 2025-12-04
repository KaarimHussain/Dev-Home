"use client"

import { Dot } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

    const stats = [
        { number: "3+", label: "Years of Operation" },
        { number: "20+", label: "Projects Completed" },
        { number: "15+", label: "Technologies" }
    ];

    return (
        <>
            <div
                ref={sectionRef}
                className="min-h-[50vh] w-full bg-linear-to-b from-white to-gray-50 px-5 md:px-10 lg:px-20 xl:px-32 py-20 relative overflow-hidden"
            >
                {/* Decorative Background Elements */}
                <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-5 mb-8">
                        <span className="font-mono text-primary font-bold lg:text-7xl md:text-6xl sm:text-5xl text-4xl">
                            01
                        </span>
                        <div className="lg:h-15 md:h-10 h-7 bg-primary w-1 rounded-full"></div>
                        <div className="border border-primary/50 bg-primary/5 rounded-full px-4 py-1.5 text-xs text-primary font-mono backdrop-blur-sm">
                            About Me
                        </div>
                    </div>

                    {/* Main Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute -left-4 top-0 w-1 h-full bg-linear-to-b from-primary via-primary/50 to-transparent rounded-full" />
                        <h2 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-semibold text-black/90 leading-tight pl-6">
                            I'm a passionate{" "}
                            <span className="text-primary font-bold relative inline-block">
                                software engineer
                                <motion.span
                                    className="absolute bottom-0 left-0 h-1 bg-primary/30 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={isInView ? { width: "100%" } : {}}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                />
                            </span>{" "}
                            dedicated to crafting innovative digital solutions. With expertise in full-stack development, I transform complex problems into elegant, user-friendly applications that make a real impact.
                        </h2>
                    </motion.div>
                </motion.div>

                {/* Decorative Divider */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="my-12 h-px bg-linear-to-r from-transparent via-primary to-transparent origin-center"
                />

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                            className="group relative bg-white rounded-2xl p-6 shadow-lg shadow-black/5 border border-gray-100 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2"
                        >
                            {/* Gradient Background on Hover */}
                            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Content */}
                            <div className="relative flex flex-col items-center justify-center gap-3 text-center">
                                <div className="flex items-center gap-1">
                                    <Dot size={40} className="text-primary animate-pulse" />
                                    <motion.h3
                                        className="text-4xl lg:text-5xl font-bold text-black"
                                        initial={{ opacity: 0 }}
                                        animate={isInView ? { opacity: 1 } : {}}
                                        transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                                    >
                                        {stat.number}
                                    </motion.h3>
                                </div>
                                <p className="text-sm text-black/60 font-medium group-hover:text-black/80 transition-colors">
                                    {stat.label}
                                </p>
                            </div>

                            {/* Corner Accent */}
                            <div className="absolute top-2 right-2 w-2 h-2 bg-primary/20 rounded-full group-hover:bg-primary/40 transition-colors" />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom Decorative Element */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="flex justify-center mt-16"
                >
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary/40 rounded-full animate-pulse" />
                        <div className="w-16 h-px bg-linear-to-r from-primary/40 to-transparent" />
                        <div className="w-2 h-2 bg-primary/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                    </div>
                </motion.div>
            </div>
        </>
    )
}
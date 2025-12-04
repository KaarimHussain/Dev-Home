"use client"

// SVGS
import React from "@/public/svgs/React.svg";
import NodeJs from "@/public/svgs/NodeJs.svg";
import Express from "@/public/svgs/Express-Dark.svg";
import DotNet from "@/public/svgs/Dotnet.svg";
import MongoDb from "@/public/svgs/MongoDb.svg";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useState } from "react";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"


export default function Hero() {
    const [isHovering, setIsHovering] = useState(false);

    const TechStackIcons = [
        { icon: React, name: "React" },
        { icon: NodeJs, name: "Node.js" },
        { icon: Express, name: "Express" },
        { icon: MongoDb, name: "MongoDB" },
        { icon: DotNet, name: ".NET" }
    ]

    // Animation variants
    const backgroundVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut" as const
            }
        }
    };

    const contentVariants: Variants = {
        hidden: { opacity: 0, y: -30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut" as const,
                delay: 0.4
            }
        }
    };

    const headingVariants: Variants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut" as const,
                delay: 0.7
            }
        }
    };

    const subtitleVariants: Variants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut" as const,
                delay: 0.9
            }
        }
    };

    const iconsContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delay: 1.1,
                staggerChildren: 0.1
            }
        }
    };

    const iconVariants: Variants = {
        hidden: { opacity: 0, y: -10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut" as const
            }
        }
    };

    return (
        <>
            <motion.div
                className="min-h-screen w-full bg-black flex items-center justify-start px-5 md:px-10 lg:px-20 xl:px-32 py-20 relative overflow-hidden"
                style={{
                    background: `linear-gradient(180deg, rgb(99, 102, 241), rgb(67, 56, 202), rgb(0, 0, 0), black)`
                }}
                variants={backgroundVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Floating Grid Background */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                                         linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }} />
                </div>

                {/* Animated Gradient Orbs */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl"
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
                    animate={{
                        x: [0, -50, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.3, 1]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                <motion.div
                    className="flex flex-col gap-4 items-start justify-center relative z-10"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Decorative Line */}
                    <motion.div
                        className="w-20 h-1 bg-primary rounded-full mb-2"
                        initial={{ width: 0 }}
                        animate={{ width: 80 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    />

                    <motion.h1
                        className="xl:text-8xl lg:text-7xl text-5xl font-bold text-white relative"
                        variants={headingVariants}
                        onHoverStart={() => setIsHovering(true)}
                        onHoverEnd={() => setIsHovering(false)}
                    >
                        Hi! I'am <br />
                        <span className="font-light transition-all duration-200 hover:font-bold relative inline-block group cursor-default">
                            Kaarim Hussain.
                            <motion.span
                                className="absolute -bottom-2 left-0 h-1 bg-primary rounded-full"
                                initial={{ width: 0 }}
                                whileHover={{ width: "100%" }}
                                transition={{ duration: 0.3 }}
                            />
                        </span>
                    </motion.h1>

                    <motion.p
                        className="text-white/80 text-sm md:text-xl font-medium flex items-center gap-2"
                        variants={subtitleVariants}
                    >
                        <motion.span
                            className="inline-block w-2 h-2 bg-primary rounded-full"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [1, 0.5, 1]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        Passionate Software Engineer & Computer Science Student
                    </motion.p>

                    {/* Tech Stack with Individual Tooltips */}
                    <motion.div
                        className="mt-3 flex items-center gap-4"
                        variants={iconsContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {TechStackIcons.map((data, index) => (
                            <Tooltip key={index}>
                                <TooltipTrigger>
                                    <motion.div
                                        variants={iconVariants}
                                        className="w-12 h-12 bg-white/5 hover:bg-primary/10 border border-white/10 hover:border-primary/30 rounded-xl flex items-center justify-center backdrop-blur-sm transition-all duration-300 cursor-pointer group relative overflow-hidden"
                                        whileHover={{
                                            scale: 1.15,
                                            rotate: [0, -5, 5, 0],
                                            y: -5
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {/* Shine effect on hover */}
                                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                        <Image
                                            src={data.icon}
                                            alt={data.name}
                                            className="w-7 h-7 relative z-10 transition-transform duration-300 group-hover:scale-110"
                                        />
                                    </motion.div>
                                </TooltipTrigger>
                                <TooltipContent side="bottom" className="bg-black/90 border-primary/30">
                                    <p className="text-primary-foreground font-medium">{data.name}</p>
                                </TooltipContent>
                            </Tooltip>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Floating Code Symbols */}
                <motion.div
                    className="absolute top-20 right-20 text-primary/20 text-6xl font-mono"
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    {"</>"}
                </motion.div>
                <motion.div
                    className="absolute bottom-40 right-40 text-primary/20 text-4xl font-mono"
                    animate={{
                        y: [0, 20, 0],
                        opacity: [0.2, 0.3, 0.2]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                >
                    {"{}"}
                </motion.div>
            </motion.div>
        </>
    )
}
"use client"

// SVGS
import React from "@/public/svgs/React.svg";
import NodeJs from "@/public/svgs/NodeJs.svg";
import Express from "@/public/svgs/Express.svg";
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
                    background: `linear-gradient(180deg, var(--primary), var(--background), var(--background))`
                }}
                variants={backgroundVariants}
                initial="hidden"
                animate="visible"
            >

                <motion.div
                    className="flex flex-col gap-4 items-start justify-center relative z-10"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Decorative Line */}
                    <motion.div
                        className="w-20 h-1 bg-secondary-foreground rounded-full mb-2"
                        initial={{ width: 0 }}
                        animate={{ width: 80 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    />

                    <motion.h1
                        className="xl:text-8xl lg:text-7xl text-5xl font-bold text-secondary-foreground relative"
                        variants={headingVariants}
                        onHoverStart={() => setIsHovering(true)}
                        onHoverEnd={() => setIsHovering(false)}
                    >
                        Hi! I'am <br />
                        <span className="font-light transition-all duration-200 hover:font-bold relative inline-block group cursor-default text-primary">
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
                        className="text-secondary-foreground/80 text-sm md:text-xl font-medium flex items-center gap-2"
                        variants={subtitleVariants}
                    >
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
                                        className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-gray-100 hover:border-gray-300 cursor-pointer"
                                    >
                                        <Image
                                            src={data.icon}
                                            alt={data.name}
                                            className="w-7 h-7 relative z-10"
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
            </motion.div>
        </>
    )
}
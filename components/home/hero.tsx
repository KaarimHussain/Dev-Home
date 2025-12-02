"use client"

// SVGS
import React from "@/public/svgs/React.svg";
import NodeJs from "@/public/svgs/NodeJs.svg";
import Express from "@/public/svgs/Express.svg";
import DotNet from "@/public/svgs/Dotnet.svg";
import MongoDb from "@/public/svgs/MongoDb.svg";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"


export default function Hero() {

    const TechStackIcons = [
        React, NodeJs, Express, MongoDb, DotNet
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
                delay: 0.4 // Starts after background animation
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
                delay: 0.2,
                ease: "easeOut" as const
            }
        }
    };

    return (
        <>
            <motion.div
                className="min-h-screen w-full bg-black flex items-center justify-start px-5 md:px-10 lg:px-20 xl:px-32 py-20 relative"
                style={{
                    background: `linear-gradient(180deg, rgb(99, 102, 241), rgb(67, 56, 202), rgb(0, 0, 0), black)`
                }}
                variants={backgroundVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    className="flex flex-col gap-4 items-start justify-center"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1
                        className="xl:text-8xl lg:text-7xl text-5xl font-bold text-white"
                        variants={headingVariants}
                    >
                        Hi! I'am <br />
                        <span className="font-light transition-all duration-200 hover:font-bold">
                            Kaarim Hussain.
                        </span>
                    </motion.h1>

                    <motion.p
                        className="text-white/80 text-sm md:text-xl font-medium"
                        variants={subtitleVariants}
                    >
                        Passionate Software Engineer & Computer Science Student
                    </motion.p>

                    <Tooltip>
                        <TooltipTrigger>
                            <motion.div
                                className="mt-3 flex items-center gap-4"
                                variants={iconsContainerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {TechStackIcons.map((data, index) => (
                                    <motion.div
                                        key={index}
                                        variants={iconVariants}
                                        className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center"
                                    >
                                        <Image src={data} key={index} alt="Tech Stack" className="w-8 h-8 bg-black" />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>My Tech Stack 😎</p>
                        </TooltipContent>
                    </Tooltip>

                </motion.div>
            </motion.div>
        </>
    )
}
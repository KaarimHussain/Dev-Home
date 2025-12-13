"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Code2, Paintbrush, Layers, Sparkles } from "lucide-react";

// Import available SVGs
import React from "@/public/svgs/React.svg";
import NodeJs from "@/public/svgs/NodeJs.svg";
import Express from "@/public/svgs/Express.svg";
import DotNet from "@/public/svgs/Dotnet.svg";
import MongoDb from "@/public/svgs/MongoDb.svg";
import NextJs from "@/public/svgs/NextJs.svg";
import JavaScript from "@/public/svgs/JavaScript.svg";
import TypeScript from "@/public/svgs/Typescript.svg";
import Csharp from "@/public/svgs/Csharp.svg";
import Dart from "@/public/svgs/Dart.svg";
import PHP from "@/public/svgs/PHP.svg";
import SqlServer from "@/public/svgs/SQL-Server.svg";
import MySQL from "@/public/svgs/MySQL.svg";
import PostgreSQL from "@/public/svgs/PostgreSQL.svg";
import Firebase from "@/public/svgs/Firebase.svg";
import Angular from "@/public/svgs/Angular.svg";
import Flutter from "@/public/svgs/Flutter.svg";
import Jquery from "@/public/svgs/Jquery.svg"
import JWT from "@/public/svgs/JWT.svg"
import Wordpress from "@/public/svgs/Wordpress.svg"
import Elementor from "@/public/svgs/Elementor.svg"
import Bootstrap from "@/public/svgs/Bootstrap.svg"
import TailwindCss from "@/public/svgs/TailwindCss.svg"
import Shadncn from "@/public/svgs/Shadncn.svg"
import Motion from "@/public/svgs/Motion.svg"
import OpenAI from "@/public/svgs/OpenAI.svg";
import Claude from "@/public/svgs/Claude.svg";
import Gemini from "@/public/svgs/Gemini.svg";
import Ollama from "@/public/svgs/Ollama.svg";
import GitHubCopilot from "@/public/svgs/Copilot.svg";
import Github from "@/public/svgs/Github.svg";
import Git from "@/public/svgs/Git.svg";
import Qwen from "@/public/svgs/Qwen.svg";
import Perplexity from "@/public/svgs/Perplexity.svg";
import Kimi from "@/public/svgs/Kimi.svg";
import Grok from "@/public/svgs/Grok.svg";
import Windsurf from "@/public/svgs/Windsurf.svg"
import Powerpoint from "@/public/svgs/Power-Point.svg"
import Word from "@/public/svgs/Word.svg"
import Excel from "@/public/svgs/Excel.svg"
import Figma from "@/public/svgs/Figma.svg"
import Canva from "@/public/svgs/Canva.svg"
import Discord from "@/public/svgs/Discord.svg"
import Cursor from "@/public/svgs/Cursor.svg"
import VisualStudioCode from "@/public/svgs/Visual-Studio-Code.svg"
import VisualStudio from "@/public/svgs/Visual-Studio.svg"
import Notion from "@/public/svgs/Notion.svg"

const techStack = {
    languages: [
        { name: "JavaScript", icon: JavaScript, color: "#F7DF1E" },
        { name: "TypeScript", icon: TypeScript, color: "#3178C6" },
        { name: "C#", icon: Csharp, color: "#239120" },
        { name: "Dart", icon: Dart, color: "#0175C2" },
        { name: "PHP", icon: PHP, color: "#777BB4" },
        { name: "SQL Server", icon: SqlServer, color: "#336791" },
        { name: "MySQL", icon: MySQL, color: "#336791" },
        { name: "PostgreSQL", icon: PostgreSQL, color: "#336791" },
        { name: "MongoDB", icon: MongoDb, color: "#47A248" },
        { name: "Firebase", icon: Firebase, color: "#FFCA28" },
    ],
    frameworks: [
        { name: "React", icon: React, color: "#61DAFB" },
        { name: "Next.js", icon: NextJs, color: "#000000" },
        { name: "Node.js", icon: NodeJs, color: "#339933" },
        { name: "Express", icon: Express, color: "#000000" },
        { name: ".NET Core", icon: DotNet, color: "#512BD4" },
        { name: "Angular", icon: Angular, color: "#DD0031" },
        { name: "Flutter", icon: Flutter, color: "#02569B" },
        { name: "JQuery", icon: Jquery, color: "#3178C6" },
        { name: "JWT", icon: JWT, color: "#3178C6" },
        { name: "Wordpress", icon: Wordpress, color: "#3178C6" },
        { name: "Elementor", icon: Elementor, color: "#3178C6" },
        { name: "Bootstrap", icon: Bootstrap, color: "#336791" },
        { name: "TailwindCss", icon: TailwindCss, color: "#336791" },
        { name: "Shadcn/ui", icon: Shadncn, color: "#336791" },
        { name: "Motion", icon: Motion, color: "#336791" },

    ],
    designTools: [
        { name: "Figma", icon: Figma, color: "#F24E1E" },
        { name: "Canva", icon: Canva, color: "#00C4CC" },
    ],
    aiTools: [
        { name: "OpenAI", icon: OpenAI, color: "#10A37F" },
        { name: "Claude", icon: Claude, color: "#8B5CF6" },
        { name: "Gemini", icon: Gemini, color: "#4285F4" },
        { name: "Ollama", icon: Ollama, color: "#111827" },
        { name: "GitHub Copilot", icon: GitHubCopilot, color: "#3B82F6" },
        { name: "Github", icon: Github, color: "#3B82F6" },
        { name: "Git", icon: Git, color: "#3B82F6" },
        { name: "Qwen", icon: Qwen, color: "#3B82F6" },
        { name: "Perplexity", icon: Perplexity, color: "#3B82F6" },
        { name: "Kimi", icon: Kimi, color: "#3B82F6" },
        { name: "Grok", icon: Grok, color: "#3B82F6" },
        { name: "Windsurf", icon: Windsurf, color: "#3B82F6" },
        { name: "PowerPoint", icon: Powerpoint, color: "#3B82F6" },
        { name: "Word", icon: Word, color: "#3B82F6" },
        { name: "Excel", icon: Excel, color: "#3B82F6" },
        { name: "Discord", icon: Discord, color: "#3178C6" },
        { name: "Cursor", icon: Cursor, color: "#336791" },
        { name: "Visual Studio", icon: VisualStudio, color: "#336791" },
        { name: "Visual Studio Code", icon: VisualStudioCode, color: "#336791" },
        { name: "Notion", icon: Notion, color: "#336791" },
    ],
};

type TechItemType = {
    name: string;
    color: string;
    icon?: any;
};

interface TechItemProps {
    item: TechItemType;
    index: number;
    category: string;
    isInView: boolean;
}

function TechItem({ item, index }: TechItemProps) {
    const hasIcon = "icon" in item && item.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04, duration: 0.3 }}
        >
            <div className="group flex items-center gap-3 rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 transition-all duration-200 hover:border-primary/50 hover:bg-white hover:shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 overflow-hidden">
                    {hasIcon ? (
                        <Image
                            src={item.icon}
                            alt={item.name}
                            width={32}
                            height={32}
                            className="h-6 w-6 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-200"
                        />
                    ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-200 text-xs font-semibold text-gray-600">
                            {item.name.charAt(0)}
                        </div>
                    )}
                </div>
                <span className="text-sm font-medium text-gray-900">{item.name}</span>
            </div>
        </motion.div>
    );
}

export default function Techstack() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    return (
        <>
            <div
                ref={sectionRef}
                className="min-h-screen w-full bg-white px-5 md:px-10 lg:px-20 xl:px-32 py-20 relative overflow-hidden"
            >
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-5 mb-8">
                        <span className="font-fira text-primary font-bold lg:text-7xl md:text-6xl sm:text-5xl text-4xl">
                            04
                        </span>
                        <div className="lg:h-15 md:h-10 h-7 bg-primary w-1"></div>
                        <div className="border border-primary/50 bg-primary/5 rounded-full px-3 text-xs w-fit text-primary font-fira">
                            Tech Stack
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <h2 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-semibold text-black leading-tight">
                            Technologies I use to{" "}
                            <span className="text-primary font-bold relative inline-block">
                                build amazing things
                                <motion.span
                                    className="absolute bottom-0 left-0 h-1 bg-primary/50 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={isInView ? { width: "100%" } : {}}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                />
                            </span>
                            {" "}and bring ideas to life.
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

                {/* Tech Stack Categories */}
                <div className="space-y-16">
                    {/* Languages */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Code2 className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold text-black">Languages & Databases</h3>
                            <div className="flex-1 h-px bg-linear-to-r from-primary/40 to-transparent"></div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                            {techStack.languages.map((item, index) => (
                                <TechItem
                                    key={item.name}
                                    item={item}
                                    index={index}
                                    category="languages"
                                    isInView={isInView}
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Frameworks & Libraries */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Layers className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold text-black">Frameworks & Libraries</h3>
                            <div className="flex-1 h-px bg-linear-to-r from-primary/40 to-transparent"></div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                            {techStack.frameworks.map((item, index) => (
                                <TechItem
                                    key={item.name}
                                    item={item}
                                    index={index}
                                    category="frameworks"
                                    isInView={isInView}
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* AI Tools */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Sparkles className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold text-black">AI & Dev Tools</h3>
                            <div className="flex-1 h-px bg-linear-to-r from-primary/40 to-transparent"></div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {techStack.aiTools.map((item, index) => (
                                <TechItem
                                    key={item.name}
                                    item={item}
                                    index={index}
                                    category="ai"
                                    isInView={isInView}
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Design Tools */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Paintbrush className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold text-black">Design Tools</h3>
                            <div className="flex-1 h-px bg-linear-to-r from-primary/40 to-transparent"></div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {techStack.designTools.map((item, index) => (
                                <TechItem
                                    key={item.name}
                                    item={item}
                                    index={index}
                                    category="design"
                                    isInView={isInView}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    )
}
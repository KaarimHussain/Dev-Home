"use client";

import { ArrowRight, ArrowUpRightSquare, Paperclip } from "lucide-react";
import { Button } from "../ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  type: "desktop" | "mobile";
  tags: string[];
  tech: string[];
  favourite: boolean;
  images: string[];
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Reduced parallax distance slightly to keep images closer to their "grid" homes
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-white relative">
      <div
        ref={containerRef}
        className="min-h-screen w-full bg-linear-to-b from-black to-black/95 px-5 md:px-10 py-20 relative overflow-hidden rounded-[50px]"
      >
        {/* Header */}
        <div className="mb-16 lg:px-20">
          <h5 className="text-lg text-white/70 font-inter mb-5 flex items-center gap-5">
            <span className="font-fira text-primary font-bold lg:text-7xl md:text-6xl sm:text-5xl text-4xl">
              02
            </span>
            <div className="lg:h-15 md:h-10 h-7 bg-primary w-1"></div>
            <div className="border border-primary bg-transparent rounded-full px-3 text-xs w-fit text-primary font-fira">
              My Projects
            </div>
          </h5>
        </div>

        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 px-6 text-center bg-zinc-900 rounded-3xl border-2 border-dashed border-gray-700 mx-auto max-w-2xl"
          >
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-full" />
              <div className="relative p-5 bg-zinc-800 rounded-2xl border border-gray-600 shadow-sm">
                <Paperclip className="w-12 h-12 text-primary/90" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-300 mb-2">
              No Projects Found
            </h3>
            <p className="text-gray-400 max-w-sm mx-auto">
              It looks like there aren't any projects listed here yet.
            </p>
          </motion.div>
        ) : (
          <>
            <div className="mb-5 mt-20 container mx-auto max-w-[1600px]">
              {projects.map((project, index) => (
                <div key={project.id} className="mb-32 md:mb-40">
                  {/* Grid Layout: 3 cols (Image) - 6 cols (Text) - 3 cols (Image) */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center w-full relative">
                    {/* LEFT IMAGE COLUMN */}
                    <div className="hidden md:flex md:col-span-3 justify-center md:justify-end relative h-full items-center">
                      <motion.div style={{ y: y1 }} className="relative z-0">
                        <img
                          src={project.images[0]}
                          className={
                            project.type === "mobile"
                              ? "aspect-[9/16] w-[100px] lg:w-[140px] object-cover rounded-2xl shadow-2xl opacity-80"
                              : "aspect-video w-[200px] lg:w-[280px] object-cover rounded-2xl shadow-2xl opacity-80"
                          }
                          alt=""
                        />
                      </motion.div>
                    </div>

                    {/* CENTER CONTENT COLUMN */}
                    <div className="col-span-1 md:col-span-6 flex flex-col items-center justify-center z-10 relative px-4">
                      {/* Category Label */}
                      <div className="flex gap-4 flex-col items-center mb-4">
                        <span className="text-sm font-light font-inter text-white/60 uppercase tracking-widest">
                          {project.type === "desktop"
                            ? "Web Application"
                            : "Mobile Application"}
                        </span>
                        <div className="w-20 h-px bg-white/10"></div>
                      </div>

                      {/* Title */}
                      <h2 className="text-[50px] sm:text-[70px] md:text-[80px] lg:text-[100px] font-bold font-inter bg-linear-to-r from-white to-primary bg-clip-text text-transparent leading-[0.9] text-center mb-6 mix-blend-overlay">
                        {project.title}
                      </h2>

                      {/* Description */}
                      <p className="text-md md:text-lg text-white/80 font-light text-center max-w-lg italic mb-6">
                        {project.description}
                      </p>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {project.tech.map((techItem, techIndex) => (
                          <span
                            key={techIndex}
                            className="bg-white/5 border border-white/10 text-white/70 hover:bg-primary hover:text-white text-xs px-4 py-1.5 rounded-full font-fira backdrop-blur-sm"
                          >
                            {techItem}
                          </span>
                        ))}
                      </div>

                      {/* Button */}
                      <Link href={"/project-details/" + project.id}>
                        <Button
                          size={"lg"}
                          variant={"default"}
                          className="rounded-full cursor-pointer"
                        >
                          View Details <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>

                    {/* RIGHT IMAGE COLUMN */}
                    <div className="hidden md:flex md:col-span-3 justify-center md:justify-start relative h-full items-center">
                      {project.images[1] && (
                        <motion.div style={{ y: y2 }} className="relative z-0">
                          <img
                            src={project.images[1]}
                            className={
                              project.type === "mobile"
                                ? "aspect-[9/16] w-[100px] lg:w-[140px] object-cover rounded-2xl shadow-2xl opacity-80"
                                : "aspect-video w-[200px] lg:w-[280px] object-cover rounded-2xl shadow-2xl opacity-80"
                            }
                            alt=""
                          />
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Separator Line */}
                  {index < projects.length - 1 && (
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-32"></div>
                  )}
                </div>
              ))}
            </div>

            <div className="w-full flex items-center justify-center pb-10">
              <Link href={"/projects"} className="mx-auto">
                <Button
                  size={"lg"}
                  variant="default"
                  className="rounded-full cursor-pointer text-white"
                >
                  <ArrowUpRightSquare className="mr-2 h-4 w-4" /> View All
                  Projects
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

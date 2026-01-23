"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import * as React from "react"
import { Briefcase, Calendar, MapPin, Code2, Award, ArrowRight } from "lucide-react"

interface ExperienceItem {
    id: number;
    company: string;
    position: string;
    location: string;
    duration: string;
    type: string;
    description: string;
    achievements: string[];
    technologies: string[];
    current: boolean;
}

interface ExperienceCardProps {
    exp: ExperienceItem
    index: number
    isInView: boolean
}

function ExperienceCard({ exp, index, isInView }: ExperienceCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="group relative"
        >
            {/* Main Card */}
            <div className="relative bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-300 overflow-hidden">
                {/* Current Badge */}
                {exp.current && (
                    <div className="absolute top-4 right-4 z-10">
                        <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-200">
                            Current
                        </span>
                    </div>
                )}

                {/* Content */}
                <div className="relative z-10">
                    {/* Company & Position */}
                    <div className="flex items-start gap-3 mb-4">
                        <div className="p-3 bg-blue-50 rounded-lg shrink-0">
                            <Briefcase className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{exp.position}</h3>
                            <p className="text-base font-semibold text-primary">{exp.company}</p>
                        </div>
                    </div>

                    {/* Duration & Location */}
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>{exp.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span>{exp.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Code2 className="w-4 h-4 text-gray-400" />
                            <span>{exp.type}</span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 mb-5 leading-relaxed">{exp.description}</p>

                    {/* Achievements */}
                    <div className="mb-5">
                        <div className="flex items-center gap-2 mb-3">
                            <Award className="w-5 h-5 text-primary" />
                            <span className="font-semibold text-gray-900">Key Achievements</span>
                        </div>
                        <ul className="space-y-2 ml-7">
                            {exp.achievements.map((achievement, achIndex) => (
                                <motion.li
                                    key={achIndex}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: index * 0.15 + achIndex * 0.08, duration: 0.4 }}
                                    className="flex items-start gap-2 text-sm text-gray-600"
                                >
                                    <ArrowRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                    <span>{achievement}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                        {exp.technologies.map((tech, techIndex) => (
                            <motion.span
                                key={techIndex}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{
                                    delay: index * 0.15 + techIndex * 0.05,
                                    duration: 0.3,
                                }}
                                className="bg-gray-50 text-gray-700 text-xs px-3 py-1.5 rounded-lg font-medium border border-gray-200 hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default function Experience() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
    const [experiences, setExperiences] = React.useState<ExperienceItem[]>([])

    React.useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const response = await fetch('/api/experience');
                const data = await response.json();
                if (Array.isArray(data)) {
                    setExperiences(data);
                }
            } catch (error) {
                console.error("Failed to fetch experiences:", error);
            }
        };

        fetchExperiences();
    }, []);

    return (
        <div
            ref={sectionRef}
            className="w-full bg-linear-to-b from-gray-50 to-white px-5 md:px-10 lg:px-20 xl:px-32 py-20 relative"
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
                        05
                    </span>
                    <div className="lg:h-15 md:h-10 h-7 bg-primary w-1"></div>
                    <div className="border border-primary/50 bg-primary/5 rounded-full px-3 text-xs w-fit text-primary font-fira">
                        Experience
                    </div>
                </div>
            </motion.div>

            {/* Experience Cards */}
            <div className="space-y-6 mx-auto max-w-7xl">
                {experiences.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-24 px-6 text-center bg-white/50 rounded-3xl border-2 border-dashed border-gray-200"
                    >
                        <div className="relative mb-6">
                            <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-full" />
                            <div className="relative p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                <Briefcase className="w-12 h-12 text-primary/30" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No Experience Found</h3>
                        <p className="text-gray-600 max-w-sm mx-auto">
                            It looks like there aren't any professional experiences listed here yet.
                        </p>
                    </motion.div>
                ) : (
                    experiences.map((exp, index) => (
                        <ExperienceCard key={exp.id} exp={exp} index={index} isInView={isInView} />
                    ))
                )}
            </div>
        </div>
    )
}

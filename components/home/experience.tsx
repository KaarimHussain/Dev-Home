"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Briefcase, Calendar, MapPin, Code2, Award, ArrowRight } from "lucide-react";

const experiences = [
    {
        id: 1,
        company: "Tech Solutions Inc.",
        position: "Senior Full-Stack Developer",
        location: "Remote",
        duration: "Jan 2023 - Present",
        type: "Full-time",
        description: "Leading development of scalable web applications using modern technologies. Collaborating with cross-functional teams to deliver high-quality software solutions.",
        achievements: [
            "Architected and developed 5+ production applications serving 10K+ users",
            "Reduced application load time by 40% through optimization techniques",
            "Mentored 3 junior developers and established coding best practices"
        ],
        technologies: ["React", "Node.js", ".NET Core", "PostgreSQL", "AWS", "Docker"],
        current: true
    },
    {
        id: 2,
        company: "StartupXYZ",
        position: "Full-Stack Developer",
        location: "San Francisco, CA",
        duration: "Jun 2021 - Dec 2022",
        type: "Full-time",
        description: "Developed and maintained multiple client-facing applications. Implemented new features and optimized existing codebase for better performance.",
        achievements: [
            "Built 3 major features that increased user engagement by 25%",
            "Improved code quality by implementing TypeScript across the codebase",
            "Collaborated with designers to implement pixel-perfect UIs"
        ],
        technologies: ["React", "TypeScript", "Express", "MongoDB", "Redux"],
        current: false
    },
    {
        id: 3,
        company: "Freelance",
        position: "Software Developer",
        location: "Remote",
        duration: "Jan 2020 - May 2021",
        type: "Contract",
        description: "Worked with various clients to build custom web applications and mobile apps. Delivered projects on time while maintaining high code quality standards.",
        achievements: [
            "Delivered 15+ successful projects for various clients",
            "Maintained 100% client satisfaction rate",
            "Developed expertise in multiple tech stacks"
        ],
        technologies: ["Flutter", "React", "PHP", "MySQL", "Firebase"],
        current: false
    }
];

interface ExperienceCardProps {
    exp: typeof experiences[0];
    index: number;
    isInView: boolean;
}

function ExperienceCard({ exp, index, isInView }: ExperienceCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    // Mouse position tracking for dynamic effects
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animations for mouse tracking
    const springConfig = { damping: 25, stiffness: 150 };
    const x = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
    const y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-8, 8]), springConfig);

    // Rotate based on mouse position
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), springConfig);

    // Glow effect position
    const glowX = useTransform(mouseX, [0, 1], [0, 100]);
    const glowY = useTransform(mouseY, [0, 1], [0, 100]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Normalize mouse position to -0.5 to 0.5
        const normalizedX = (e.clientX - centerX) / rect.width;
        const normalizedY = (e.clientY - centerY) / rect.height;

        mouseX.set(normalizedX);
        mouseY.set(normalizedY);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                x,
                y,
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="group relative cursor-pointer"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            {/* Animated Glow Effect */}
            <motion.div
                className="absolute -inset-1 bg-linear-to-r from-primary/20 via-primary/30 to-primary/20 rounded-2xl opacity-0 blur-xl"
                animate={{
                    opacity: isHovered ? [0, 0.6, 0.4] : 0,
                    scale: isHovered ? [1, 1.05, 1] : 1,
                }}
                transition={{ duration: 0.6 }}
                style={{
                    background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(97, 95, 255, 0.3), transparent 70%)`,
                }}
            />

            {/* Main Card */}
            <motion.div
                className="relative bg-white rounded-2xl p-6 md:p-8 shadow-lg shadow-black/5 border border-gray-100 overflow-hidden"
                animate={{
                    scale: isHovered ? 1.02 : 1,
                    boxShadow: isHovered
                        ? "0 20px 40px rgba(97, 95, 255, 0.15), 0 0 0 1px rgba(97, 95, 255, 0.1)"
                        : "0 10px 20px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.05)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
                {/* Animated Background Gradient */}
                <motion.div
                    className="absolute inset-0 bg-linear-to-br from-primary/8 via-primary/3 to-transparent rounded-2xl"
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                />

                {/* Shimmer Effect */}
                <motion.div
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{
                        x: isHovered ? "100%" : "-100%",
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: isHovered ? Infinity : 0,
                        ease: "linear",
                    }}
                    style={{
                        transform: "skewX(-20deg)",
                    }}
                />

                {/* Current Badge with Animation */}
                {exp.current && (
                    <motion.div
                        className="absolute top-4 right-4 z-10"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={isInView ? { scale: 1, rotate: 0 } : {}}
                        transition={{ delay: 0.8 + index * 0.2, type: "spring", stiffness: 200 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                        <motion.span
                            className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full border border-primary/20 backdrop-blur-sm"
                            animate={{
                                boxShadow: isHovered
                                    ? "0 0 15px rgba(97, 95, 255, 0.4)"
                                    : "0 0 0px rgba(97, 95, 255, 0)",
                            }}
                        >
                            Current
                        </motion.span>
                    </motion.div>
                )}

                {/* Content */}
                <div className="relative z-10">
                    {/* Company & Position */}
                    <motion.div
                        className="flex items-start gap-3 mb-4"
                        animate={{
                            y: isHovered ? -2 : 0,
                        }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <motion.div
                            className="p-3 bg-primary/10 rounded-xl relative overflow-hidden"
                            animate={{
                                backgroundColor: isHovered ? "rgba(97, 95, 255, 0.2)" : "rgba(97, 95, 255, 0.1)",
                                scale: isHovered ? 1.1 : 1,
                                rotate: isHovered ? [0, -5, 5, 0] : 0,
                            }}
                            transition={{
                                backgroundColor: { duration: 0.3 },
                                scale: { type: "spring", stiffness: 300 },
                                rotate: { duration: 0.6, repeat: isHovered ? Infinity : 0, repeatType: "reverse" },
                            }}
                        >
                            <Briefcase className="w-6 h-6 text-primary relative z-10" />
                            <motion.div
                                className="absolute inset-0 bg-primary/20"
                                initial={{ scale: 0 }}
                                animate={{ scale: isHovered ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                                style={{ borderRadius: "0.75rem" }}
                            />
                        </motion.div>
                        <div className="flex-1">
                            <motion.h3
                                className="text-2xl font-bold text-black mb-1"
                                animate={{
                                    color: isHovered ? "rgb(97, 95, 255)" : "rgb(0, 0, 0)",
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                {exp.position}
                            </motion.h3>
                            <motion.p
                                className="text-lg font-semibold text-primary"
                                animate={{
                                    x: isHovered ? 2 : 0,
                                }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                {exp.company}
                            </motion.p>
                        </div>
                    </motion.div>

                    {/* Duration & Location */}
                    <motion.div
                        className="flex flex-wrap items-center gap-4 mb-4 text-sm text-black/60"
                        animate={{
                            opacity: isHovered ? 1 : 0.7,
                        }}
                    >
                        <motion.div
                            className="flex items-center gap-2"
                            whileHover={{ scale: 1.05, x: 2 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <Calendar className="w-4 h-4" />
                            <span>{exp.duration}</span>
                        </motion.div>
                        <motion.div
                            className="flex items-center gap-2"
                            whileHover={{ scale: 1.05, x: 2 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <MapPin className="w-4 h-4" />
                            <span>{exp.location}</span>
                        </motion.div>
                        <motion.div
                            className="flex items-center gap-2"
                            whileHover={{ scale: 1.05, x: 2 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <Code2 className="w-4 h-4" />
                            <span>{exp.type}</span>
                        </motion.div>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        className="text-black/70 mb-5 leading-relaxed"
                        animate={{
                            opacity: isHovered ? 0.9 : 0.7,
                        }}
                    >
                        {exp.description}
                    </motion.p>

                    {/* Achievements */}
                    <div className="mb-5">
                        <motion.div
                            className="flex items-center gap-2 mb-3"
                            animate={{
                                x: isHovered ? 3 : 0,
                            }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <motion.div
                                animate={{
                                    rotate: isHovered ? [0, 15, -15, 0] : 0,
                                    scale: isHovered ? 1.15 : 1,
                                }}
                                transition={{ duration: 0.6 }}
                            >
                                <Award className="w-5 h-5 text-primary" />
                            </motion.div>
                            <span className="font-semibold text-black">Key Achievements</span>
                        </motion.div>
                        <ul className="space-y-2 ml-7">
                            {exp.achievements.map((achievement, achIndex) => (
                                <motion.li
                                    key={achIndex}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.8 + index * 0.2 + achIndex * 0.1 }}
                                    className="flex items-start gap-2 text-sm text-black/70"
                                    whileHover={{ x: 4, opacity: 1 }}
                                >
                                    <motion.div
                                        animate={{
                                            x: isHovered ? [0, 3, 0] : 0,
                                            rotate: isHovered ? [0, 15, 0] : 0,
                                        }}
                                        transition={{
                                            duration: 0.6,
                                            delay: achIndex * 0.1,
                                            repeat: isHovered ? Infinity : 0,
                                            repeatType: "reverse",
                                        }}
                                    >
                                        <ArrowRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                    </motion.div>
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
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{
                                    delay: 1 + index * 0.2 + techIndex * 0.05,
                                    type: "spring",
                                    stiffness: 400
                                }}
                                className="bg-primary/5 text-primary text-xs px-3 py-1.5 rounded-full font-medium border border-primary/10 cursor-default relative overflow-hidden"
                                whileHover={{
                                    scale: 1.1,
                                    backgroundColor: "rgba(97, 95, 255, 0.15)",
                                    borderColor: "rgba(97, 95, 255, 0.4)",
                                    y: -2,
                                }}
                            >
                                <motion.span
                                    className="absolute inset-0 bg-primary/10"
                                    initial={{ x: "-100%" }}
                                    whileHover={{ x: "100%" }}
                                    transition={{ duration: 0.5 }}
                                    style={{ transform: "skewX(-20deg)" }}
                                />
                                <span className="relative z-10">{tech}</span>
                            </motion.span>
                        ))}
                    </div>
                </div>

                {/* Corner Accent with Animation */}
                <motion.div
                    className="absolute top-3 right-3 w-3 h-3 bg-primary/20 rounded-full"
                    animate={{
                        scale: isHovered ? [1, 1.5, 1] : 1,
                        opacity: isHovered ? [0.2, 0.6, 0.2] : 0.2,
                    }}
                    transition={{
                        duration: 2,
                        repeat: isHovered ? Infinity : 0,
                    }}
                />

                {/* Bottom Border Accent */}
                <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-linear-to-r from-primary to-primary/50 rounded-b-2xl"
                    initial={{ width: 0 }}
                    animate={{ width: isHovered ? "100%" : "0%" }}
                    transition={{ duration: 0.5 }}
                />
            </motion.div>
        </motion.div>
    );
}

export default function Experience() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    return (
        <>
            <div
                ref={sectionRef}
                className="min-h-screen w-full bg-linear-to-b from-gray-50 to-white px-5 md:px-10 lg:px-20 xl:px-32 py-20 relative overflow-hidden"
            >
                {/* Decorative Background Elements */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-5 mb-8">
                        <span className="font-fira text-primary font-bold lg:text-7xl md:text-6xl sm:text-5xl text-4xl">
                            03
                        </span>
                        <div className="lg:h-15 md:h-10 h-7 bg-primary w-1"></div>
                        <div className="border border-primary/50 bg-primary/5 rounded-full px-3 text-xs w-fit text-primary font-fira">
                            Experiences
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute -left-4 top-0 w-1 h-full bg-linear-to-b from-primary via-primary/50 to-transparent rounded-full" />
                        <h2 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-semibold text-black/90 leading-tight pl-6">
                            Building{" "}
                            <span className="text-primary font-bold relative inline-block">
                                impactful solutions
                                <motion.span
                                    className="absolute bottom-0 left-0 h-1 bg-primary/30 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={isInView ? { width: "100%" } : {}}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                />
                            </span>{" "}
                            through years of hands-on experience and continuous learning.
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

                {/* Experience Timeline */}
                <div className="relative max-w-6xl mx-auto">
                    {/* Vertical Timeline Line */}
                    <motion.div
                        initial={{ scaleY: 0 }}
                        animate={isInView ? { scaleY: 1 } : {}}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-primary via-primary/50 to-transparent hidden md:block"
                        style={{ transform: 'translateX(-50%)' }}
                    />

                    {/* Experience Cards */}
                    <div className="space-y-12 md:space-y-20">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                                className={`relative flex flex-col md:flex-row items-start gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-8 md:left-1/2 top-6 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg z-10 hidden md:block"
                                    style={{ transform: 'translateX(-50%)' }}
                                >
                                    {exp.current && (
                                        <motion.div
                                            className="absolute inset-0 bg-primary rounded-full"
                                            animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                    )}
                                </div>

                                {/* Experience Card */}
                                <div className={`w-full md:w-[45%] ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'} ml-0`}>
                                    <ExperienceCard exp={exp} index={index} isInView={isInView} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom Decorative Element */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="flex justify-center mt-20"
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
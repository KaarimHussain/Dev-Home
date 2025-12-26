"use client"
import { Briefcase, History, Layers } from "lucide-react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";

// Counter Component for the "Pop" effect
const Counter = ({ value, duration = 2 }: { value: string; duration?: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    // Extract the number from strings like "20+" or "3+"
    const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
    const suffix = value.replace(/[0-9]/g, "");

    const spring = useSpring(0, {
        mass: 1,
        stiffness: 100,
        damping: 30,
    });

    const display = useTransform(spring, (current) =>
        Math.round(current).toLocaleString() + suffix
    );

    useEffect(() => {
        if (isInView) {
            spring.set(numericValue);
        }
    }, [isInView, spring, numericValue]);

    return <motion.span ref={ref}>{display}</motion.span>;
};

export default function About() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

    const stats = [
        {
            number: "3+",
            label: "Years of Operation",
            icon: <History size={20} className="text-primary" />,
            description: "Developing robust digital solutions."
        },
        {
            number: "20+",
            label: "Projects Completed",
            icon: <Briefcase size={20} className="text-primary" />,
            description: "Successful deliveries across industries."
        },
        {
            number: "15+",
            label: "Technologies",
            icon: <Layers size={20} className="text-primary" />,
            description: "Expertise in modern tech stacks."
        }
    ];

    return (
        <>
            <div
                ref={sectionRef}
                className="min-h-[50vh] w-full bg-background px-5 md:px-10 lg:px-20 xl:px-32 py-20 relative overflow-hidden"
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
                        <span className="font-fira text-primary font-bold lg:text-7xl md:text-6xl sm:text-5xl text-4xl">
                            01
                        </span>
                        <div className="lg:h-15 md:h-10 h-7 bg-primary w-1"></div>
                        <div className="border border-primary/50 bg-primary/5 rounded-full px-3 text-xs w-fit text-primary font-fira">
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
                            A{" "}
                            <span className="text-primary font-light italic relative inline-block">
                                Software Engineer
                                <motion.span
                                    className="absolute bottom-1 left-0 h-1 bg-primary/30 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={isInView ? { width: "100%" } : {}}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                />
                            </span>{" "}
                            who loves building clean, scalable apps and making sure everything runs smoothly behind the scenes.
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                            className="group relative"
                        >
                            {/* Card Container */}
                            <div className="relative z-10 bg-white/50 backdrop-blur-sm border border-gray-100 rounded-3xl p-8 h-full transition-all duration-500 group-hover:border-primary/20 group-hover:shadow-2xl group-hover:shadow-primary/5">

                                {/* Icon & Small Label */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2.5 bg-primary/5 rounded-xl group-hover:scale-110 transition-transform duration-500">
                                        {stat.icon}
                                    </div>
                                    <div className="h-px flex-1 bg-linear-to-r from-primary/20 to-transparent" />
                                </div>

                                {/* Stat Number */}
                                <div className="flex items-baseline gap-1 mb-2">
                                    <h3 className="text-5xl font-bold tracking-tight text-black/90">
                                        <Counter value={stat.number} />
                                    </h3>
                                </div>

                                {/* Label & Description */}
                                <div>
                                    <h4 className="text-lg font-semibold text-black/80 mb-1 group-hover:text-primary transition-colors duration-300">
                                        {stat.label}
                                    </h4>
                                    <p className="text-sm text-black/50 leading-relaxed">
                                        {stat.description}
                                    </p>
                                </div>

                                {/* Animated Background Gradient */}
                                <div className="absolute inset-0 bg-linear-to-br from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                            </div>

                            {/* Decorative Background Shape */}
                            <div className="absolute -bottom-2 -right-2 w-full h-full bg-primary/5 rounded-3xl z-0 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    )
}
"use client";

import { motion, useInView, Variants } from "motion/react";
import { useRef } from "react";
import { Code2, Gamepad2, Rocket, Terminal, Cpu, Globe, User, Heart } from "lucide-react";

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <main ref={containerRef} className="relative w-full min-h-screen bg-background overflow-hidden">
            <HeroSection />
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
                <AboutMeSection />
                <JourneySection />
                <LookingAheadSection />
            </div>
        </main>
    );
}

function HeroSection() {

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
    return (
        <section
            className="min-h-[60vh] w-full flex flex-col justify-center items-center relative overflow-hidden pt-32 pb-16 px-4 mb-24"
            style={{
                background: `linear-gradient(180deg, var(--primary) 0%,var(--background) 50% ,var(--background) 100%)`
            }}
        >
            <motion.div
                variants={backgroundVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 max-w-4xl text-center"
            >
                <span className="text-secondary-foreground/50 font-mono text-lg mb-4 block">@kaariim / about</span>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-black">
                    More Than Just <br />
                    <span className="font-light transition-all duration-200 hover:font-bold relative inline-block group cursor-default text-primary">Syntactic Sugar.</span>
                </h1>
                <p className="text-xl text-black/60 max-w-2xl mx-auto leading-relaxed">
                    I build digital experiences that live on the internet. Part engineer, part creative, and fully obsessed with how things work.
                </p>
            </motion.div>
        </section>
    );
}

function AboutMeSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-24 relative">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative group"
                >
                    <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-transparent rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative border border-border bg-card/50 backdrop-blur-sm p-8 rounded-2xl overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <User size={120} />
                        </div>
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <span className="bg-primary/10 p-2 rounded-lg text-primary">
                                <Terminal size={24} />
                            </span>
                            About Me
                        </h2>
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                            <p>
                                I’m Kaarim, a software engineering student who genuinely enjoys building things — not just for assignments or work, but because I’ve always been curious about how stuff works behind the scenes.
                            </p>
                            <p>
                                I didn’t get into tech just to “be a developer.” I like the process of turning ideas into something real, breaking things, fixing them, and slowly making them better. I enjoy learning, experimenting, and pushing myself beyond what I already know.
                            </p>
                            <p>
                                Outside of code, I’m someone who values growth, consistency, and showing up every day to improve — even when things get difficult.
                            </p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.8 }}
                    className="relative h-full min-h-[400px] flex items-center justify-center"
                >
                    {/* Decorative Grid or Abstract Shape */}
                    <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-2 opacity-20">
                        {Array.from({ length: 36 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="bg-primary/20 rounded-sm"
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: Math.random() } : { opacity: 0 }}
                                transition={{ delay: Math.random() * 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
                            />
                        ))}
                    </div>
                    <div className="relative z-10 text-center">
                        <div className="text-8xl font-black text-foreground/5 tracking-tighter">HELLO</div>
                        <div className="text-8xl font-black text-foreground/5 tracking-tighter absolute top-10 left-10">WORLD</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function JourneySection() {
    const steps = [
        {
            title: "The Beginning",
            icon: <Code2 className="w-6 h-6" />,
            content: "My path into software hasn’t been about shortcuts. It’s been about learning step by step — understanding how systems work, how the frontend talks to the backend, and how small decisions affect the bigger picture."
        },
        {
            title: "Full Stack Exploration",
            icon: <Globe className="w-6 h-6" />,
            content: "Along the way, I’ve explored different areas of development and realized I enjoy working across the full stack. I like having a broad view — from how something looks and feels to how it works behind the scenes."
        },
        {
            title: "Gaming Roots",
            icon: <Gamepad2 className="w-6 h-6" />,
            content: "Since childhood, I’ve been obsessed with games. That curiosity never left. Today, I’m actively learning game development, with the long-term goal of creating my own games someday."
        }
    ];

    return (
        <section className="py-24">
            <h2 className="text-3xl font-bold mb-16 text-center">My Journey So Far</h2>
            <div className="relative max-w-3xl mx-auto">
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

                {steps.map((step, index) => (
                    <JourneyItem key={index} step={step} index={index} />
                ))}
            </div>
        </section>
    );
}

function JourneyItem({ step, index }: { step: any, index: number }) {
    const isEven = index % 2 === 0;
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`relative flex items-center gap-8 mb-12 md:mb-24 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
        >
            {/* Timeline Dot */}
            <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10" />

            {/* Content */}
            <div className={`w-full pl-20 md:pl-0 md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                <div className={`bg-card border border-border p-6 rounded-xl hover:shadow-lg transition-shadow duration-300 group`}>
                    <div className={`mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-secondary text-primary group-hover:scale-110 transition-transform duration-300 ${isEven ? 'md:ml-auto' : ''}`}>
                        {step.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground sm:text-sm md:text-base">{step.content}</p>
                </div>
            </div>
            <div className="hidden md:block md:w-1/2" />
        </motion.div>
    );
}

function LookingAheadSection() {
    const goals = [
        {
            title: "Meaningful Software",
            description: "Creating software that people actually use and relying on stable, scalable architectures.",
            icon: <Heart className="w-5 h-5" />
        },
        {
            title: "Creative Logic",
            description: "Combining creativity and logic — especially through game development.",
            icon: <Cpu className="w-5 h-5" />
        },
        {
            title: "Holistic Growth",
            description: "Growing into someone who understands both the technical and human side of technology.",
            icon: <User className="w-5 h-5" />
        },
        {
            title: "Career & Family",
            description: "Building a stable career to support my family and give back to the community.",
            icon: <Rocket className="w-5 h-5" />
        }
    ];

    return (
        <section className="py-24">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Looking Ahead</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    I don’t have everything figured out — and that’s okay. What matters to me is staying curious, staying disciplined.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {goals.map((goal, index) => (
                    <GoalCard key={index} goal={goal} index={index} />
                ))}
            </div>
        </section>
    );
}

function GoalCard({ goal, index }: { goal: any, index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-20px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group relative overflow-hidden bg-card border border-border p-8 rounded-2xl hover:border-primary/50 transition-colors"
        >
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4 transition-all group-hover:bg-primary/10" />

            <div className="relative z-10 flex items-start gap-4">
                <div className="p-3 bg-secondary rounded-lg text-primary group-hover:text-primary group-hover:bg-background transition-colors border border-transparent group-hover:border-border">
                    {goal.icon}
                </div>
                <div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{goal.title}</h3>
                    <p className="text-muted-foreground">{goal.description}</p>
                </div>
            </div>
        </motion.div>
    )
}
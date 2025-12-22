"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                toast.success("Message sent successfully!");
                setFormData({
                    name: "",
                    email: "",
                    subject: "",
                    message: ""
                });
            } else {
                toast.error(data.error || "Failed to send message. Please try again.");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again later.");
            console.error("Error sending email:", error);
        } finally {
            setLoading(false);
        }
    };

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

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    return (
        <motion.div
            className="min-h-screen w-full bg-black flex items-center justify-start px-5 md:px-10 lg:px-20 xl:px-32 py-20 relative overflow-hidden"
            style={{
                background: `linear-gradient(180deg, var(--primary), var(--background), var(--background))`
            }}
            initial={{ backgroundPosition: "0% 0%" }}
            animate={{ backgroundPosition: "100% 100%" }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        >

            <motion.div
                className="container mx-auto z-10 w-full max-w-6xl"
                variants={backgroundVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* Left Column: Content & Info */}
                    <div className="flex flex-col gap-8">
                        <motion.div variants={itemVariants}>
                            <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight mb-6">
                                Let's <span className="font-light transition-all duration-200 hover:font-bold relative inline-block group cursor-default text-secondary">Talk.</span>
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                                Have a project in mind or just want to chat? I'm always open to discussing new ideas,
                                creative opportunities, and how we can build something amazing together.
                            </p>
                        </motion.div>

                        <motion.div
                            className="space-y-6 mt-4"
                            variants={itemVariants}
                        >
                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground font-medium">Email Me</p>
                                    <a href="mailto:kaariminnocent@gmail.com" className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">kaariminnocent@gmail.com</a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground font-medium">Location</p>
                                    <p className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">PK, Karachi</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <motion.div
                        className="bg-card/50 backdrop-blur-md border border-border/50 p-8 rounded-2xl shadow-2xl"
                        variants={itemVariants}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-foreground/80">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Enter your name"
                                        className="bg-secondary border-border focus:border-primary transition-colors"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-foreground/80">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        className="bg-secondary border-border focus:border-primary transition-colors"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="subject" className="text-foreground/80">Subject</Label>
                                <Input
                                    id="subject"
                                    name="subject"
                                    placeholder="Enter your subject"
                                    className="bg-secondary border-border focus:border-primary transition-colors"
                                    value={formData.subject}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message" className="text-foreground/80">Message</Label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder="Enter your message"
                                    className="min-h-[150px] bg-secondary border-border focus:border-primary transition-colors resize-none"
                                    value={formData.message}
                                    onChange={handleChange}
                                />
                            </div>

                            <Button
                                type="submit"
                                size="lg"
                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold group"
                            >
                                Send Message
                                <Send size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </form>
                    </motion.div>

                </div>
            </motion.div>
        </motion.div>
    );
}

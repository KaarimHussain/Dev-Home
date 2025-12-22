"use client";

import { useEffect, useState } from "react";
import { FolderKanban, Layers, Mail, ArrowUpRight, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardHome() {
    const [stats, setStats] = useState({
        projects: 0,
        techStack: 0,
        contacts: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [projectsRes, techRes, contactRes] = await Promise.all([
                    fetch('/api/projects'),
                    fetch('/api/techstack'),
                    fetch('/api/contact')
                ]);

                const projects = await projectsRes.json();
                const tech = await techRes.json();
                const contact = await contactRes.json();

                setStats({
                    projects: Array.isArray(projects) ? projects.length : 0,
                    techStack: Array.isArray(tech) ? tech.length : 0,
                    contacts: Array.isArray(contact) ? contact.length : 0
                });
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            }
        };

        fetchStats();
    }, []);

    const cards = [
        {
            label: "Total Projects",
            value: stats.projects,
            icon: FolderKanban,
            color: "text-blue-600",
            bg: "bg-blue-50/50",
            href: "/admin/projects",
            action: "Manage Projects"
        },
        {
            label: "Tech Stack Items",
            value: stats.techStack,
            icon: Layers,
            color: "text-purple-600",
            bg: "bg-purple-50/50",
            href: "/admin/techstack",
            action: "Manage Skills"
        },
        {
            label: "Contact Details",
            value: stats.contacts,
            icon: Mail,
            color: "text-emerald-600",
            bg: "bg-emerald-50/50",
            href: "/admin/contact",
            action: "Manage Info"
        },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Overview</h1>
                    <p className="text-gray-500 mt-1">Welcome back to your portfolio command center.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/admin/projects" passHref>
                        <Button className="gap-2">
                            <PlusCircle size={16} />
                            New Project
                        </Button>
                    </Link>

                    <Button variant="outline" className="gap-2" onClick={() => window.open('/', '_blank')}>
                        View Live Site
                        <ArrowUpRight size={16} />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <div key={index} className="group relative bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-200">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-4 rounded-xl ${card.bg} group-hover:scale-110 transition-transform duration-200`}>
                                    <Icon className={`w-8 h-8 ${card.color}`} />
                                </div>
                                <span className="text-4xl font-bold text-gray-900">{card.value}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700">{card.label}</h3>
                            <Link href={card.href} className={`mt-4 inline-flex items-center text-sm font-medium ${card.color} hover:underline`}>
                                {card.action} <ArrowUpRight className="ml-1 w-4 h-4" />
                            </Link>
                        </div>
                    );
                })}
            </div>

            <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold mb-2">Quick Tip</h2>
                    <p className="text-gray-300 max-w-2xl text-lg">
                        Keep your project portfolio up-to-date. Detailed descriptions and high-quality images significantly increase engagement.
                    </p>
                </div>
            </div>
        </div>
    );
}

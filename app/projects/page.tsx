"use client"

import { useState, useMemo } from "react"
import { ArrowRight, X, Filter, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"

const allProjects = [
    {
        id: 1,
        title: "Skill-Ustad",
        description:
            "Skillistan is an AI-driven learning platform built with ASP.NET Core, FastAPI, and a modern frontend stack, offering personalized skill mastery through models like Gemini and Ollama. More than an LMS, it's an adaptive, interactive experience tailored to each learner.",
        type: "Fullstack",
        tags: ["AI/ML", "Education", "Real-time"],
        tech: [
            ".NET Core API",
            "FastAPI",
            "React",
            "Tailwind CSS",
            "Ollama",
            "Gemini",
            "PostgreSQL",
            "Firebase",
            "Shadcn/ui",
        ],
        favourite: true,
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
        image2: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    },
    {
        id: 2,
        title: "Jobistan",
        description:
            "Jobistan: A modern PHP/MySQL job platform connecting seekers and employers. Features secure authentication, advanced search, encrypted messaging, and AI-powered security. Responsive design with analytics for all users. Join us to streamline your job search or recruitment process!",
        type: "Fullstack",
        tags: ["Job Marketplace", "Security", "Real-time"],
        tech: ["PHP", "MySQL", "HTML/CSS", "Bootstrap", "AJAX", "jQuery", "JavaScript"],
        favourite: false,
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
        image2: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    },
    {
        id: 3,
        title: "Watch Hub",
        description:
            "WatchHub is a premium watch shopping app built with Flutter. It lets users browse, filter, and purchase watches with ease. Features include secure login, cart, wishlist, reviews, and an admin panel. Designed for speed, usability, and real-world eCommerce experience on mobile.",
        type: "E-Commerce",
        tags: ["Mobile", "Shopping", "Payment"],
        tech: ["Flutter", "Firebase", "Dart", "Material UI"],
        favourite: false,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        image2: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    },
    {
        id: 4,
        title: "Artify",
        description:
            "Artify, a full-stack Art Selling Website designed to connect talented artists with passionate buyers. This platform supports artwork discovery, secure purchases, artist commissions, and more — all wrapped in a modern, mobile-responsive UI with a powerful backend.",
        type: "E-Commerce",
        tags: ["Marketplace", "Creative", "Social"],
        tech: ["Angular", ".NET Core API", "SQL Server", "Tailwind CSS"],
        favourite: false,
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
        image2: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80",
    },
]

const getUniqueTypes = (projects: typeof allProjects) => {
    return Array.from(new Set(projects.map((p) => p.type))).sort()
}

const getUniqueTags = (projects: typeof allProjects) => {
    const tags = new Set<string>()
    projects.forEach((p) => p.tags.forEach((tag) => tags.add(tag)))
    return Array.from(tags).sort()
}

export default function ProjectsPage() {
    const [selectedTypes, setSelectedTypes] = useState<string[]>([])
    const [selectedTags, setSelectedTags] = useState<string[]>([])

    const filteredProjects = useMemo(() => {
        return allProjects.filter((project) => {
            const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(project.type)
            const tagsMatch = selectedTags.length === 0 || selectedTags.some((tag) => project.tags.includes(tag))
            return typeMatch && tagsMatch
        })
    }, [selectedTypes, selectedTags])

    const types = getUniqueTypes(allProjects)
    const tags = getUniqueTags(allProjects)

    const toggleType = (type: string) => {
        setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
    }

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
    }

    const resetFilters = () => {
        setSelectedTypes([])
        setSelectedTags([])
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="min-h-[20vh] w-full bg-black flex items-center justify-start px-5 md:px-10 lg:px-20 xl:px-32 py-20 relative overflow-hidden"
                style={{
                    background: `linear-gradient(180deg, rgb(99, 102, 241), rgb(67, 56, 202), rgb(0, 0, 0), black)`
                }}>

                {/* Header Section */}
                <div className="pt-20">
                    <div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-4 text-balance">
                            All Projects
                        </h1>
                        <p className="text-md md:text-lg text-primary-foreground/70 max-w-2xl">
                            Explore my complete collection of work across different categories and technologies
                        </p>
                    </div>

                    <div className="inline-block mt-6 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full">
                        <span className="text-sm font-medium text-primary">{filteredProjects.length} Projects</span>
                    </div>
                </div>
            </div>
            <div className="min-h-screen w-full bg-white px-5 md:px-10 lg:px-16 xl:px-24 py-20">
                {/* Filter Section */}
                <div className="mb-12 max-w-7xl mx-auto">
                    <div className="bg-gradient-to-br from-secondary/50 to-secondary/30 border border-border rounded-xl p-4 md:p-5 backdrop-blur-sm">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                            {/* Type Filters - Compact */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                    <Filter className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                        Type
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {types.map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => toggleType(type)}
                                            aria-pressed={selectedTypes.includes(type)}
                                            aria-label={`Filter by ${type} type`}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                                                selectedTypes.includes(type)
                                                    ? "bg-primary text-primary-foreground shadow-md scale-105"
                                                    : "bg-background border border-border text-foreground hover:bg-accent hover:border-primary/50 hover:scale-105"
                                            }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="hidden lg:block w-px h-12 bg-border" />

                            {/* Tag Filters - Compact */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                    <Tag className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                        Tags
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {tags.map((tag) => (
                                        <button
                                            key={tag}
                                            onClick={() => toggleTag(tag)}
                                            aria-pressed={selectedTags.includes(tag)}
                                            aria-label={`Filter by ${tag} tag`}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                                                selectedTags.includes(tag)
                                                    ? "bg-primary text-primary-foreground shadow-md scale-105"
                                                    : "bg-background border border-border text-foreground hover:bg-accent hover:border-primary/50 hover:scale-105"
                                            }`}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Reset Button - Compact */}
                            {(selectedTypes.length > 0 || selectedTags.length > 0) && (
                                <>
                                    <div className="hidden lg:block w-px h-12 bg-border" />
                                    <div className="flex items-center lg:flex-col lg:justify-center gap-2 lg:gap-1">
                                        <button
                                            onClick={resetFilters}
                                            aria-label="Reset all filters"
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                            <span className="hidden sm:inline">Reset</span>
                                        </button>
                                        <span className="text-[10px] text-muted-foreground/60 lg:text-center">
                                            {selectedTypes.length + selectedTags.length} active
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="max-w-7xl mx-auto">
                    {filteredProjects.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24">
                            <p className="text-muted-foreground text-lg mb-6">No projects match your filters</p>
                            <button
                                onClick={resetFilters}
                                className="text-primary hover:text-primary/80 font-medium transition-colors duration-200 underline underline-offset-4"
                            >
                                Clear all filters
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-16">
                            {filteredProjects.map((project, index) => (
                                <div key={project.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    {/* Project Card */}
                                    <div className="group bg-white border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                        {/* Preview Images Section */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 p-3 md:p-4 bg-gradient-to-br from-secondary/20 to-secondary/5">
                                            <div className="relative aspect-video overflow-hidden rounded-lg border border-border/50 group-hover:border-primary/30 transition-colors duration-300">
                                                <img
                                                    src={project.image}
                                                    alt={`${project.title} preview 1`}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </div>
                                            <div className="relative aspect-video overflow-hidden rounded-lg border border-border/50 group-hover:border-primary/30 transition-colors duration-300">
                                                <img
                                                    src={project.image2}
                                                    alt={`${project.title} preview 2`}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="p-8 md:p-10">
                                            {/* Header with Type Badge */}
                                            <div className="flex flex-col gap-4 mb-6">
                                                <div className="inline-flex w-fit">
                                                    <span className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-xs font-semibold text-primary uppercase tracking-wide">
                                                        {project.type}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Title */}
                                            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                                                {project.title}
                                            </h2>

                                            {/* Description */}
                                            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-3xl">
                                                {project.description}
                                            </p>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 mb-8">
                                                {project.tags.map((tag, tagIndex) => (
                                                    <span
                                                        key={tagIndex}
                                                        className="px-3 py-1 bg-primary/10 border border-primary/30 text-primary text-xs font-medium rounded-full"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Tech Stack */}
                                            <div className="mb-8">
                                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 opacity-60">
                                                    Built With
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.tech.map((techItem, techIndex) => (
                                                        <span
                                                            key={techIndex}
                                                            className="px-3 py-2 bg-secondary border border-border text-foreground text-xs font-medium rounded-lg hover:border-primary/50 transition-colors duration-200"
                                                        >
                                                            {techItem}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* CTA Button */}
                                            <div className="flex items-center">
                                                <Button size="lg" className="rounded-lg group/btn">
                                                    Details
                                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    {index < filteredProjects.length - 1 && <div className="border-b border-border my-8 md:my-12"></div>}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

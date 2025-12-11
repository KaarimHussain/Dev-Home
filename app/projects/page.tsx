"use client"

import { useState, useMemo } from "react"
import { ArrowRight, X, Filter, Tag } from "lucide-react"
import Link from "next/link"
import { projects } from "@/lib/data"
import Image from "next/image"

const getUniqueTypes = (projectsList: typeof projects) => {
    return Array.from(new Set(projectsList.map((p) => p.category))).sort()
}

const getUniqueTags = (projectsList: typeof projects) => {
    const tags = new Set<string>()
    projectsList.forEach((p) => p.tags.forEach((tag) => tags.add(tag)))
    return Array.from(tags).sort()
}

export default function ProjectsPage() {
    const [selectedTypes, setSelectedTypes] = useState<string[]>([])
    const [selectedTags, setSelectedTags] = useState<string[]>([])

    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(project.category)
            const tagsMatch = selectedTags.length === 0 || selectedTags.some((tag) => project.tags.includes(tag))
            return typeMatch && tagsMatch
        })
    }, [selectedTypes, selectedTags])

    const types = getUniqueTypes(projects)
    const tags = getUniqueTags(projects)

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
                    <div className="bg-linear-to-br from-secondary/50 to-secondary/30 border border-border rounded-xl p-4 md:p-5 backdrop-blur-sm">
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
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${selectedTypes.includes(type)
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
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${selectedTags.includes(tag)
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
                                <div key={index} className="group w-full bg-background rounded-lg border border-border hover:border-primary/50 p-5 overflow-hidden transition-all duration-200 cursor-pointer">
                                    {/* Header */}
                                    <div className="flex items-center justify-end gap-5 relative">
                                        <Link className="relative z-1" href={"/projects/" + project.id}>
                                            <ArrowRight className="cursor-pointer" size={30} />
                                        </Link>
                                        {/* Decoration */}
                                        <div className="absolute -top-15 -right-15 w-50 h-50 duration-300 transition-all ease-in-out group-hover:bg-primary/60 filter blur-3xl rounded-full"></div>
                                    </div>
                                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-10 gap-8 md:gap-10">
                                        <div className={`flex flex-col items-start justify-center gap-3 shrink-0 ${project.type === "desktop" ? "md:w-2/5 lg:w-1/3" : "w-full md:w-2/5 lg:w-2/3"}`}>
                                            <h2 className="text-4xl md:text-5xl font-semibold leading-tight">{project.title}</h2>
                                            <p className="text-muted-foreground text-sm md:text-base">{project.description}</p>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {project.tags.map((tag) => (
                                                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium text-primary bg-primary/10 border border-primary">{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className={`grow flex justify-center ${project.type === "desktop" ? "md:w-3/5 lg:w-2/3 md:justify-end" : "w-full md:w-3/5 lg:w-3/5 md:justify-end"}`}>
                                            {project.type === "desktop" ? (
                                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full">
                                                    <img src={project.image} alt={`${project.title} screenshot 1`} width={400} height={225} className="aspect-video w-full sm:w-1/2 object-cover object-center rounded-lg shadow-lg -rotate-12 left-7 top-20 group-hover:top-0 group-hover:left-0 duration-200 transition-all relative" />
                                                    <img src={project.image2} alt={`${project.title} screenshot 2`} width={600} height={337} className="aspect-video w-full sm:w-1/2 object-cover object-center rounded-lg shadow-lg rotate-12 right-7 top-20 group-hover:top-0 group-hover:right-0 duration-200 transition-all relative" />
                                                </div>
                                            ) : (
                                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full">
                                                    <img src={project.image} alt={`${project.title} main image`} className="object-cover rounded-lg shadow-lg aspect-9/16 -rotate-12 left-7 top-20 group-hover:top-0 group-hover:left-0 duration-200 transition-all relative" width={200} />
                                                    <img src={project.image2} alt={`${project.title} main image`} className="object-cover rounded-lg shadow-lg aspect-9/16 rotate-12 right-7 top-20 group-hover:top-0 group-hover:right-0 duration-200 transition-all relative" width={200} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

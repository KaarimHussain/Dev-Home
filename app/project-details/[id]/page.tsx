import { projects } from "@/lib/data"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Layers, Star, Code2, ExternalLink, Hash, Sparkles } from "lucide-react"

export default async function ProjectDetails({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const project = projects.find((p) => p.id === Number(id))

    if (!project) {
        notFound()
    }

    return (
        <main className="min-h-screen bg-white text-gray-900 font-sans">
            <div
                className="min-h-[20vh] w-full bg-black flex items-center justify-start px-5 md:px-10 lg:px-20 xl:px-32 py-20 relative overflow-hidden"
                style={{
                    background: `linear-gradient(180deg, rgb(99, 102, 241), rgb(67, 56, 202), rgb(0, 0, 0), black)`,
                }}
            >
                {/* Header Section */}
                <div className="pt-20">
                    <div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-4 text-balance">
                            {project.title}
                        </h1>
                        <div className="flex items-center gap-3 flex-wrap">
                            <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground border border-primary-foreground uppercase tracking-wide">
                                {project.category}
                            </span>
                            <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-300 uppercase tracking-wide">
                                {project.type}
                            </span>
                            {project.favourite && (
                                <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 uppercase tracking-wide inline-flex items-center gap-1.5">
                                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                                    Featured
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-5 md:px-10 lg:px-20 xl:px-32 py-20">
                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
                    {/* Left Column: Info - Takes 2 columns */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100">
                                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                                <span className="text-xs font-medium text-indigo-700 uppercase tracking-wide">Overview</span>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900">About this Project</h2>
                        </div>

                        {/* Description */}
                        <p className="text-lg text-gray-600 leading-relaxed">{project.description}</p>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4 pt-4">
                            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
                                <ExternalLink className="w-4 h-4" />
                                View Live
                            </button>
                            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gray-200 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors">
                                <Code2 className="w-4 h-4" />
                                Source Code
                            </button>
                        </div>

                        {/* Tech Stack */}
                        <div className="space-y-4 pt-8 border-t border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                                    <Layers className="w-5 h-5 text-indigo-600" />
                                </div>
                                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Technologies</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 text-sm font-medium hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 transition-all cursor-default"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="space-y-4 pt-6 border-t border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                                    <Hash className="w-5 h-5 text-emerald-600" />
                                </div>
                                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Tags</h3>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-sm text-gray-500 hover:text-indigo-600 transition-colors font-medium cursor-pointer"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Images - Takes 3 columns */}
                    <div
                        className={`gap-6 lg:col-span-3 ${project.type !== "desktop" ? "flex justify-center lg:justify-center" : "grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1"}`}
                    >
                        {/* Main Image */}
                        <div
                            className={`relative ${project.type !== "desktop"
                                ? "aspect-9/16 w-[190px] lg:w-[300px] shrink-0"
                                : "aspect-video max-w-[500px]"
                                } rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 shadow-2xl shadow-gray-200/60 group`}
                        >
                            <Image
                                src={project.image || "/placeholder.svg"}
                                alt={`${project.title} preview`}
                                fill
                                className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                                priority
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>

                        {/* Secondary Image (if exists) */}
                        {project.image2 && (
                            <div
                                className={`relative ${project.type !== "desktop"
                                    ? "aspect-9/16 w-[190px] lg:w-[300px] shrink-0"
                                    : "aspect-video max-w-[500px]"
                                    } rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 shadow-xl shadow-gray-200/50 group`}
                            >
                                <Image
                                    src={project.image2 || "/placeholder.svg"}
                                    alt={`${project.title} additional preview`}
                                    fill
                                    className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-gray-100 bg-gray-50/50">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-gray-500 text-sm">
                        Want to discuss this project?{" "}
                        <Link href="#" className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
                            {"Let's connect"}
                        </Link>
                    </p>
                    <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">Back to Projects</span>
                    </Link>
                </div>
            </footer>
        </main>
    )
}

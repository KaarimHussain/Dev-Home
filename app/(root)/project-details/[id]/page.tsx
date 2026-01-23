import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Layers, Star, Code2, ExternalLink, Hash, Sparkles, Monitor, Smartphone, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Project {
    id: string;
    title: string;
    description: string;
    category: string;
    type: "desktop" | "mobile";
    tags: string[];
    tech: string[];
    favourite: boolean;
    images: string[];
}

async function getProject(id: string): Promise<Project | undefined> {
    try {
        const docRef = doc(db, "projects", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                id: docSnap.id,
                title: data.title,
                description: data.description,
                category: data.category,
                type: data.type,
                tags: data.tags,
                tech: data.tech,
                favourite: data.favourite,
                images: data.images
            } as Project;
        }
        return undefined;
    } catch (e) {
        console.error("Error fetching project:", e);
        return undefined;
    }
}

export default async function ProjectDetails({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const project = await getProject(id);

    if (!project) {
        notFound()
    }

    return (
        <main className="min-h-screen bg-white text-gray-900 font-sans">
            <div
                className="min-h-[20vh] w-full bg-black flex items-center justify-start px-5 md:px-10 lg:px-20 xl:px-32 py-20 relative overflow-hidden"
                style={{
                    background: `linear-gradient(180deg, var(--primary) 0%,var(--background) 50% ,var(--background) 100%)`,
                }}
            >
                {/* Header Section (Kept exactly as requested) */}
                <div className="pt-20">
                    <div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-secondary-foreground mb-4 text-balance">
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

            {/* IMPROVED MAIN CONTENT SECTION */}
            <div className="px-5 md:px-10 lg:px-20 xl:px-32 py-20 bg-background border-t border-gray-100/50">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                    {/* LEFT COLUMN: Sticky Details Panel */}
                    <div className="lg:col-span-5 relative order-2 lg:order-1">
                        <div className="lg:sticky lg:top-32 space-y-10">

                            {/* Navigation */}
                            <Link href="/projects" className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors group mb-4">
                                <div className="p-2 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors">
                                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                </div>
                                <span className="text-sm font-medium">Back to Projects</span>
                            </Link>

                            {/* Project Story */}
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-indigo-600">
                                        <Sparkles className="w-4 h-4" />
                                        <span className="text-xs font-bold uppercase tracking-widest">The Challenge & Solution</span>
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900">About the Project</h2>
                                </div>
                                <p className="text-lg text-gray-600 leading-relaxed font-light">
                                    {project.description}
                                </p>
                            </div>

                            {/* CTAs */}
                            <div className="flex flex-wrap gap-4 py-2">
                                <Button className="h-12 px-8 rounded-xl shadow-lg shadow-indigo-200/50 hover:shadow-indigo-200/80 transition-all text-base">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    View Live Project
                                </Button>
                                <Button variant="outline" className="h-12 px-8 rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 text-base">
                                    <Code2 className="w-4 h-4 mr-2" />
                                    Source Code
                                </Button>
                            </div>

                            {/* Detailed Metadata Grid */}
                            <div className="grid grid-cols-1 gap-8 pt-8 border-t border-gray-100">

                                {/* Tech Stack */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-gray-900">
                                        <Layers className="w-5 h-5 text-gray-400" />
                                        <h3 className="font-semibold text-sm uppercase tracking-wide">Tech Stack</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1.5 rounded-md bg-white border border-gray-200 text-gray-600 text-sm font-medium shadow-sm hover:border-indigo-200 hover:text-indigo-600 transition-colors cursor-default"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-gray-900">
                                        <Hash className="w-5 h-5 text-gray-400" />
                                        <h3 className="font-semibold text-sm uppercase tracking-wide">Key Topics</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-sm text-gray-500 hover:text-gray-900 transition-colors cursor-pointer underline decoration-gray-200 hover:decoration-indigo-500 underline-offset-4"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Visual Showcase */}
                    <div className="lg:col-span-7 space-y-16 order-1 lg:order-2">
                        {project.images.map((img, index) => {
                            // Helper to handle local images by converting to relative path
                            // This prevents "upstream image resolved to private ip" errors in Next.js
                            const getImageSrc = (src: string) => {
                                if (src.startsWith('http://localhost') || src.startsWith('http://127.0.0.1')) {
                                    try {
                                        const url = new URL(src);
                                        return url.pathname + url.search;
                                    } catch (e) {
                                        return src;
                                    }
                                }
                                return src;
                            };
                            const sanitizedSrc = getImageSrc(img);

                            return (
                                <div key={index} className="group perspective-1000">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="h-px bg-gray-200 flex-1"></div>
                                        <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">
                                            {index === 0 ? "Main View" : "Detail View"}
                                        </span>
                                        <div className="h-px bg-gray-200 flex-1"></div>
                                    </div>

                                    {/* Conditional Wrapper based on Type */}
                                    <div
                                        className={`relative mx-auto transition-transform duration-700 ease-out group-hover:scale-[1.01] ${project.type === "mobile" ? "max-w-[320px]" : "w-full"
                                            }`}
                                    >
                                        {project.type === "desktop" ? (
                                            // DESKTOP BROWSER FRAME
                                            <div className="rounded-xl overflow-hidden bg-white border border-gray-200 shadow-2xl shadow-gray-200/50">
                                                {/* Browser Bar */}
                                                <div className="h-8 bg-gray-50 border-b border-gray-100 flex items-center px-4 gap-2">
                                                    <div className="flex gap-1.5">
                                                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
                                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80"></div>
                                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80"></div>
                                                    </div>
                                                    <div className="ml-4 flex-1 max-w-[400px] h-4 bg-white rounded-sm border border-gray-100"></div>
                                                </div>
                                                {/* Image */}
                                                <div className="relative aspect-video w-full bg-gray-100">
                                                    <Image
                                                        src={sanitizedSrc || "/placeholder.svg"}
                                                        alt={`${project.title} screenshot ${index + 1}`}
                                                        fill
                                                        className="object-cover object-top"
                                                        priority={index === 0}
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            // MOBILE PHONE FRAME
                                            <div className="rounded-[2.5rem] overflow-hidden bg-gray-900 border-8 border-gray-900 shadow-2xl shadow-gray-300">
                                                <div className="relative aspect-9/19 w-full bg-gray-800 rounded-4xl overflow-hidden">
                                                    {/* Notch Indicator */}
                                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-gray-900 rounded-b-xl z-10"></div>
                                                    <Image
                                                        src={sanitizedSrc || "/placeholder.svg"}
                                                        alt={`${project.title} mobile screenshot ${index + 1}`}
                                                        fill
                                                        className="object-cover"
                                                        priority={index === 0}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                        {/* Visual Footer */}
                        <div className="pt-10 flex justify-center text-gray-300">
                            <div className="flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-current"></div>
                                <div className="w-1 h-1 rounded-full bg-current"></div>
                                <div className="w-1 h-1 rounded-full bg-current"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}
"use client";

import { useState, useEffect } from "react";
import { Upload, Trash2, Copy, Eye, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface MediaFile {
    name: string;
    url: string;
}

export default function MediaPage() {
    const [files, setFiles] = useState<MediaFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchMedia();
    }, []);

    const fetchMedia = async () => {
        try {
            const res = await fetch("/api/media");
            if (!res.ok) throw new Error("Failed to fetch media");
            const data = await res.json();
            setFiles(data);
        } catch (error) {
            toast.error("Failed to load images");
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;

        setUploading(true);
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/media", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Upload failed");

            const newFile = await res.json();
            setFiles((prev) => [newFile, ...prev]);
            toast.success("Image uploaded successfully");
            // refresh list to get correct order/data if needed, but manual update is faster
            fetchMedia();
        } catch (error) {
            toast.error("Failed to upload image");
        } finally {
            setUploading(false);
            e.target.value = ""; // Reset input
        }
    };

    const handleDelete = async (filename: string) => {
        if (!confirm("Are you sure you want to delete this image?")) return;

        try {
            const res = await fetch(`/api/media/${filename}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Delete failed");

            setFiles((prev) => prev.filter((f) => f.name !== filename));
            toast.success("Image deleted");
        } catch (error) {
            toast.error("Failed to delete image");
        }
    };

    const copyToClipboard = (url: string) => {
        // Get full URL
        const fullUrl = window.location.origin + url;
        navigator.clipboard.writeText(fullUrl);
        toast.success("URL copied to clipboard");
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight">Media Manager</h1>
                    <p className="text-sm text-gray-500">Manage your local image assets</p>
                </div>
                <div>
                    <Button disabled={uploading} className="relative cursor-pointer">
                        {uploading ? "Uploading..." : "Upload Image"}
                        <input
                            type="file"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            accept="image/*"
                            onChange={handleUpload}
                            disabled={uploading}
                        />
                    </Button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center p-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {files.map((file) => (
                        <div
                            key={file.name}
                            className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200"
                        >
                            <img
                                src={file.url}
                                alt={file.name}
                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                loading="lazy"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                                <p className="text-xs text-white truncate mb-2">{file.name}</p>
                                <div className="flex items-center gap-2 justify-end">
                                    <button
                                        onClick={() => copyToClipboard(file.url)}
                                        className="p-1.5 bg-white/20 hover:bg-white/30 rounded text-white backdrop-blur-sm transition-colors"
                                        title="Copy URL"
                                    >
                                        <Copy className="w-4 h-4" />
                                    </button>
                                    <a
                                        href={file.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="p-1.5 bg-white/20 hover:bg-white/30 rounded text-white backdrop-blur-sm transition-colors"
                                        title="View Full"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </a>
                                    <button
                                        onClick={() => handleDelete(file.name)}
                                        className="p-1.5 bg-red-500/80 hover:bg-red-500 rounded text-white backdrop-blur-sm transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {files.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center p-12 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                            <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                            <p>No images found</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

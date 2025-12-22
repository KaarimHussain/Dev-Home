"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Search, Smartphone, Monitor, Star } from "lucide-react";

interface ProjectItem {
    id: number;
    title: string;
    description: string;
    category: string;
    type: string;
    tags: string[];
    tech: string[];
    favourite: boolean;
    images: string[];
}

export default function ProjectsManager() {
    const [items, setItems] = useState<ProjectItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<ProjectItem | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "Fullstack",
        type: "desktop",
        tags: "",
        tech: "",
        favourite: false,
        images: ""
    });

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await fetch('/api/projects');
            const data = await response.json();
            setItems(data);
        } catch (error) {
            toast.error("Failed to fetch projects");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = '/api/projects';
            const method = editingItem ? 'PUT' : 'POST';

            const tagsArray = formData.tags.split(',').map(s => s.trim()).filter(Boolean);
            const techArray = formData.tech.split(',').map(s => s.trim()).filter(Boolean);
            const imagesArray = formData.images.split(',').map(s => s.trim()).filter(Boolean);

            const body = {
                ...formData,
                tags: tagsArray,
                tech: techArray,
                images: imagesArray,
                id: editingItem ? editingItem.id : undefined
            };

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                toast.success(editingItem ? "Project updated" : "Project created");
                setIsDialogOpen(false);
                setEditingItem(null);
                resetForm();
                fetchItems();
            } else {
                toast.error("Operation failed");
            }
        } catch (error) {
            toast.error("Error occurred");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this project?")) return;
        try {
            const response = await fetch('/api/projects', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            if (response.ok) {
                toast.success("Project deleted");
                fetchItems();
            } else {
                toast.error("Delete failed");
            }
        } catch (error) {
            toast.error("Error occurred");
        }
    };

    const openEdit = (item: ProjectItem) => {
        setEditingItem(item);
        setFormData({
            title: item.title,
            description: item.description,
            category: item.category,
            type: item.type,
            tags: item.tags.join(', '),
            tech: item.tech.join(', '),
            favourite: item.favourite,
            images: item.images.join(', ')
        });
        setIsDialogOpen(true);
    };

    const openCreate = () => {
        setEditingItem(null);
        resetForm();
        setIsDialogOpen(true);
    };

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            category: "Fullstack",
            type: "desktop",
            tags: "",
            tech: "",
            favourite: false,
            images: ""
        });
    };

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
                    <p className="text-sm text-gray-500">Showcase your best work.</p>
                </div>
                <Button onClick={openCreate} className="gap-2 shadow-lg hover:shadow-xl transition-all">
                    <Plus size={18} /> Add Project
                </Button>
            </div>

            <div className="flex items-center gap-4 bg-white p-2 rounded-xl border border-gray-100 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <Search size={20} className="text-gray-400 ml-2" />
                <Input
                    placeholder="Search projects..."
                    className="border-none shadow-none focus-visible:ring-0 text-base"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-gray-50/50">
                            <TableRow>
                                <TableHead className="w-[30%]">Title</TableHead>
                                <TableHead className="w-[20%]">Category</TableHead>
                                <TableHead className="w-[15%]">Type</TableHead>
                                <TableHead className="w-[10%] text-center">Featured</TableHead>
                                <TableHead className="w-[25%] text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center h-32 text-gray-400">Loading projects...</TableCell>
                                </TableRow>
                            ) : filteredItems.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center h-32 text-gray-500">No projects found</TableCell>
                                </TableRow>
                            ) : (
                                filteredItems.map((item) => (
                                    <TableRow key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <TableCell>
                                            <div className="font-semibold text-gray-900">{item.title}</div>
                                            <div className="text-xs text-gray-500 truncate max-w-[200px]">{item.description}</div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                {item.category}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-sm text-gray-600 capitalize">
                                                {item.type === 'mobile' ? <Smartphone size={16} /> : <Monitor size={16} />}
                                                {item.type}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {item.favourite && <Star size={16} className="text-yellow-400 fill-yellow-400 mx-auto" />}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Button variant="ghost" size="icon" className="hover:bg-blue-50 hover:text-blue-600" onClick={() => openEdit(item)}>
                                                    <Pencil size={16} />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="hover:bg-red-50 hover:text-red-600" onClick={() => handleDelete(item.id)}>
                                                    <Trash2 size={16} />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingItem ? 'Edit Project' : 'Create New Project'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Project Title</Label>
                                <Input
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                    className="h-11"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Category</Label>
                                <Input
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    required
                                    placeholder="e.g. Fullstack, Mobile App"
                                    className="h-11"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                required
                                className="min-h-[100px] resize-y"
                                placeholder="Describe the project..."
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Platform Type</Label>
                                <select
                                    className="w-full h-11 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                >
                                    <option value="desktop">Desktop / Web</option>
                                    <option value="mobile">Mobile App</option>
                                </select>
                            </div>
                            <div className="space-y-2 flex items-center pt-8 gap-3">
                                <input
                                    type="checkbox"
                                    id="favourite"
                                    checked={formData.favourite}
                                    onChange={(e) => setFormData({ ...formData, favourite: e.target.checked })}
                                    className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <Label htmlFor="favourite" className="text-base cursor-pointer">Mark as Favourite (Featured)</Label>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Tags</Label>
                            <Input
                                value={formData.tags}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                placeholder="AI/ML, Education, Real-time (comma separated)"
                                className="h-11 font-mono text-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Tech Stack</Label>
                            <Input
                                value={formData.tech}
                                onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
                                placeholder="React, Next.js, Tailwind (comma separated)"
                                className="h-11 font-mono text-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Image URLs</Label>
                            <Textarea
                                value={formData.images}
                                onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                                placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                                className="min-h-[80px] font-mono text-xs"
                            />
                        </div>

                        <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
                            <Button type="button" variant="outline" className="h-11" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button type="submit" className="h-11 px-8">Save Project</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

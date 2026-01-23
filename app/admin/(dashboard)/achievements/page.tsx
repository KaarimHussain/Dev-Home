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
import { Plus, Pencil, Trash2, Search, Trophy, Calendar, Star } from "lucide-react";

interface AchievementItem {
    id: string;
    title: string;
    organization: string;
    date: string;
    description: string;
    image: string;
    credentialLink: string;
    stats: string;
    featured: boolean;
}

export default function AchievementsManager() {
    const [items, setItems] = useState<AchievementItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<AchievementItem | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        organization: "",
        date: "",
        description: "",
        image: "",
        credentialLink: "https://",
        stats: "",
        featured: false
    });

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await fetch('/api/achievements');
            const data = await response.json();
            setItems(data);
        } catch (error) {
            toast.error("Failed to fetch achievements");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = '/api/achievements';
            const method = editingItem ? 'PUT' : 'POST';

            const body = {
                ...formData,
                id: editingItem ? editingItem.id : undefined
            };

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                toast.success(editingItem ? "Achievement updated" : "Achievement created");
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

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this achievement?")) return;
        try {
            const response = await fetch('/api/achievements', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            if (response.ok) {
                toast.success("Achievement deleted");
                fetchItems();
            } else {
                toast.error("Delete failed");
            }
        } catch (error) {
            toast.error("Error occurred");
        }
    };

    const openEdit = (item: AchievementItem) => {
        setEditingItem(item);
        setFormData({
            title: item.title,
            organization: item.organization,
            date: item.date,
            description: item.description,
            image: item.image,
            credentialLink: item.credentialLink || "",
            stats: item.stats || "",
            featured: item.featured
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
            organization: "",
            date: "",
            description: "",
            image: "",
            credentialLink: "",
            stats: "",
            featured: false
        });
    };

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Achievements</h1>
                    <p className="text-sm text-gray-500">Manage your awards and certifications.</p>
                </div>
                <Button onClick={openCreate} className="gap-2 shadow-lg hover:shadow-xl transition-all">
                    <Plus size={18} /> Add Achievement
                </Button>
            </div>

            <div className="flex items-center gap-4 bg-white p-2 rounded-xl border border-gray-100 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <Search size={20} className="text-gray-400 ml-2" />
                <Input
                    placeholder="Search achievements..."
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
                                <TableHead className="w-[20%]">Organization</TableHead>
                                <TableHead className="w-[15%]">Date</TableHead>
                                <TableHead className="w-[10%] text-center">Featured</TableHead>
                                <TableHead className="w-[25%] text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center h-32 text-gray-400">Loading achievements...</TableCell>
                                </TableRow>
                            ) : filteredItems.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center h-32 text-gray-500">No achievements found</TableCell>
                                </TableRow>
                            ) : (
                                filteredItems.map((item) => (
                                    <TableRow key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <TableCell>
                                            <div className="font-semibold text-gray-900">{item.title}</div>
                                            <div className="text-xs text-gray-500 truncate max-w-[200px]">{item.description}</div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                                {item.organization}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Calendar size={14} />
                                                {item.date}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {item.featured && <Trophy size={16} className="text-amber-500 fill-amber-500 mx-auto" />}
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
                        <DialogTitle>{editingItem ? 'Edit Achievement' : 'Add New Achievement'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Title</Label>
                                <Input
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                    className="h-11"
                                    placeholder="e.g. AWS Certified Solutions Architect"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Organization</Label>
                                <Input
                                    value={formData.organization}
                                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                    required
                                    placeholder="e.g. Amazon Web Services"
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
                                placeholder="Describe the achievement..."
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Date / Period</Label>
                                <Input
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    required
                                    placeholder="e.g. Dec 2025"
                                    className="h-11"
                                />
                            </div>
                            <div className="space-y-2 flex items-center pt-8 gap-3">
                                <input
                                    type="checkbox"
                                    id="featured"
                                    checked={formData.featured}
                                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                    className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <Label htmlFor="featured" className="text-base cursor-pointer">Mark as Featured (Big Card)</Label>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Stats / Badge Text (Optional)</Label>
                                <Input
                                    value={formData.stats}
                                    onChange={(e) => setFormData({ ...formData, stats: e.target.value })}
                                    placeholder="e.g. Top 1%, 1st Place"
                                    className="h-11"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Credential Link (Optional)</Label>
                                <Input
                                    value={formData.credentialLink}
                                    onChange={(e) => setFormData({ ...formData, credentialLink: e.target.value })}
                                    placeholder="https://..."
                                    className="h-11"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Image URL</Label>
                            <Input
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                placeholder="https://example.com/certificate.jpg"
                                className="h-11"
                            />
                            <p className="text-xs text-gray-500">Provide a direct link to the image (local path or external URL).</p>
                        </div>

                        <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
                            <Button type="button" variant="outline" className="h-11" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button type="submit" className="h-11 px-8">Save Achievement</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

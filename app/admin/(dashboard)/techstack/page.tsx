"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Plus, Pencil, Trash2, Search, Code2, Palette, Database, Cpu } from "lucide-react";

interface TechItem {
    id: number;
    name: string;
    icon: string;
    color: string;
    category: string;
}

export default function TechStackManager() {
    const [items, setItems] = useState<TechItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<TechItem | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        icon: "",
        color: "",
        category: "languages"
    });

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await fetch('/api/techstack');
            const data = await response.json();
            setItems(data);
        } catch (error) {
            toast.error("Failed to fetch tech stack");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = '/api/techstack';
            const method = editingItem ? 'PUT' : 'POST';
            const body = editingItem ? { ...formData, id: editingItem.id } : formData;

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                toast.success(editingItem ? "Item updated" : "Item created");
                setIsDialogOpen(false);
                setEditingItem(null);
                setFormData({ name: "", icon: "", color: "", category: "languages" });
                fetchItems();
            } else {
                toast.error("Operation failed");
            }
        } catch (error) {
            toast.error("Error occurred");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this item?")) return;
        try {
            const response = await fetch('/api/techstack', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            if (response.ok) {
                toast.success("Item deleted");
                fetchItems();
            } else {
                toast.error("Delete failed");
            }
        } catch (error) {
            toast.error("Error occurred");
        }
    };

    const openEdit = (item: TechItem) => {
        setEditingItem(item);
        setFormData({
            name: item.name,
            icon: item.icon,
            color: item.color,
            category: item.category
        });
        setIsDialogOpen(true);
    };

    const openCreate = () => {
        setEditingItem(null);
        setFormData({ name: "", icon: "", color: "", category: "languages" });
        setIsDialogOpen(true);
    };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'languages': return <Code2 size={14} />;
            case 'frameworks': return <Cpu size={14} />;
            case 'design': return <Palette size={14} />;
            case 'ai': return <Database size={14} />; // Using Database for AI/Tools metaphor
            default: return <Code2 size={14} />;
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Tech Stack</h1>
                    <p className="text-sm text-gray-500">Manage your skills and tools.</p>
                </div>
                <Button onClick={openCreate} className="gap-2 shadow-lg hover:shadow-xl transition-all">
                    <Plus size={18} /> Add New Skill
                </Button>
            </div>

            <div className="flex items-center gap-4 bg-white p-2 rounded-xl border border-gray-100 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <Search size={20} className="text-gray-400 ml-2" />
                <Input
                    placeholder="Search by name or category..."
                    className="border-none shadow-none focus-visible:ring-0 text-base"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <Table>
                    <TableHeader className="bg-gray-50/50">
                        <TableRow>
                            <TableHead className="w-[30%]">Name</TableHead>
                            <TableHead className="w-[30%]">Category</TableHead>
                            <TableHead className="w-[20%]">Icon Preview</TableHead>
                            <TableHead className="text-right w-[20%]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center h-32 text-gray-400">Loading skills...</TableCell>
                            </TableRow>
                        ) : filteredItems.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center h-32 text-gray-500">No items found</TableCell>
                            </TableRow>
                        ) : (
                            filteredItems.map((item) => (
                                <TableRow key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <TableCell className="font-semibold text-gray-900">{item.name}</TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${item.category === 'languages' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                                                item.category === 'frameworks' ? 'bg-purple-50 text-purple-700 border border-purple-100' :
                                                    item.category === 'design' ? 'bg-pink-50 text-pink-700 border border-pink-100' :
                                                        'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                            }`}>
                                            {getCategoryIcon(item.category)}
                                            {item.category}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100 text-xs font-mono text-gray-600 border border-gray-200" style={{ color: item.color, backgroundColor: item.color + '15' }}>
                                                {/* In a real app we'd render the actual icon component here */}
                                                {item.icon.substring(0, 2)}
                                            </div>
                                            <span className="text-xs text-gray-400 font-mono">{item.icon}</span>
                                        </div>
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

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>{editingItem ? 'Edit Skill' : 'Add New Skill'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-6 py-4">
                        <div className="space-y-2">
                            <Label>Skill Name</Label>
                            <Input
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g. React.js"
                                required
                                className="h-11"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <select
                                className="w-full h-11 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="languages">Languages</option>
                                <option value="frameworks">Frameworks</option>
                                <option value="design">Design Tools</option>
                                <option value="ai">AI Tools</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Icon ID</Label>
                                <Input
                                    value={formData.icon}
                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                    placeholder="e.g. React, NextJs"
                                    className="h-11"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Color Hex</Label>
                                <div className="flex gap-2">
                                    <div className="w-11 h-11 rounded-md border border-gray-200" style={{ backgroundColor: formData.color || '#000000' }}></div>
                                    <Input
                                        value={formData.color}
                                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                        placeholder="#000000"
                                        className="h-11"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <Button type="button" variant="outline" className="h-11" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button type="submit" className="h-11 px-8">Save</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

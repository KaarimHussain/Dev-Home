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
import { Plus, Pencil, Trash2, Mail, Phone, MapPin } from "lucide-react";

interface ContactItem {
    id: number;
    icon: string;
    label: string;
    value: string;
}

export default function ContactManager() {
    const [items, setItems] = useState<ContactItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<ContactItem | null>(null);
    const [formData, setFormData] = useState({
        icon: "MailIcon",
        label: "",
        value: ""
    });

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await fetch('/api/contact');
            const data = await response.json();
            setItems(data);
        } catch (error) {
            toast.error("Failed to fetch contact details");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = '/api/contact';
            const method = editingItem ? 'PUT' : 'POST';
            const body = editingItem ? { ...formData, id: editingItem.id } : formData;

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                toast.success(editingItem ? "Contact updated" : "Contact added");
                setIsDialogOpen(false);
                setEditingItem(null);
                setFormData({ icon: "MailIcon", label: "", value: "" });
                fetchItems();
            } else {
                toast.error("Operation failed");
            }
        } catch (error) {
            toast.error("Error occurred");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this contact?")) return;
        try {
            const response = await fetch('/api/contact', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            if (response.ok) {
                toast.success("Contact deleted");
                fetchItems();
            } else {
                toast.error("Delete failed");
            }
        } catch (error) {
            toast.error("Error occurred");
        }
    };

    const openEdit = (item: ContactItem) => {
        setEditingItem(item);
        setFormData({
            icon: item.icon,
            label: item.label,
            value: item.value
        });
        setIsDialogOpen(true);
    };

    const openCreate = () => {
        setEditingItem(null);
        setFormData({ icon: "MailIcon", label: "", value: "" });
        setIsDialogOpen(true);
    };

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'MailIcon': return <Mail size={18} className="text-blue-500" />;
            case 'PhoneIcon': return <Phone size={18} className="text-emerald-500" />;
            case 'MapPinIcon': return <MapPin size={18} className="text-red-500" />;
            default: return <Mail size={18} />;
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Contact Details</h1>
                    <p className="text-sm text-gray-500">How people can reach you.</p>
                </div>
                <Button onClick={openCreate} className="gap-2 shadow-lg hover:shadow-xl transition-all">
                    <Plus size={18} /> Add Contact
                </Button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <Table>
                    <TableHeader className="bg-gray-50/50">
                        <TableRow>
                            <TableHead className="w-[10%]">Icon</TableHead>
                            <TableHead className="w-[30%]">Label</TableHead>
                            <TableHead className="w-[40%]">Value</TableHead>
                            <TableHead className="text-right w-[20%]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center h-32 text-gray-400">Loading contacts...</TableCell>
                            </TableRow>
                        ) : items.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center h-32 text-gray-500">No contact details found</TableCell>
                            </TableRow>
                        ) : (
                            items.map((item) => (
                                <TableRow key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <TableCell>
                                        <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100">
                                            {getIcon(item.icon)}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium text-gray-900">{item.label}</TableCell>
                                    <TableCell className="text-gray-600 font-mono text-sm">{item.value}</TableCell>
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
                        <DialogTitle>{editingItem ? 'Edit Contact' : 'Add Contact'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-6 py-4">
                        <div className="space-y-2">
                            <Label>Icon Type</Label>
                            <select
                                className="w-full h-11 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                value={formData.icon}
                                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                            >
                                <option value="MailIcon">MailIcon (Email)</option>
                                <option value="PhoneIcon">PhoneIcon (Phone)</option>
                                <option value="MapPinIcon">MapPinIcon (Address)</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label>Label</Label>
                            <Input
                                value={formData.label}
                                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                                placeholder="e.g. Email Address"
                                required
                                className="h-11"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Value</Label>
                            <Input
                                value={formData.value}
                                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                                placeholder="e.g. hello@example.com"
                                required
                                className="h-11"
                            />
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

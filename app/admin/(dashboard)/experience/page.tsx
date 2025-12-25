"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface Experience {
    id: number;
    company: string;
    position: string;
    location: string;
    duration: string;
    type: string;
    description: string;
    achievements: string[];
    technologies: string[];
    current: boolean;
}

export default function ExperiencePage() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        company: "",
        position: "",
        location: "",
        duration: "",
        type: "",
        description: "",
        achievements: "", // Comma separated for editing
        technologies: "", // Comma separated for editing
        current: false,
    });

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        try {
            const response = await fetch("/api/experience");
            const data = await response.json();
            if (Array.isArray(data)) {
                setExperiences(data);
            }
        } catch (error) {
            toast.error("Failed to fetch experiences");
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            company: "",
            position: "",
            location: "",
            duration: "",
            type: "",
            description: "",
            achievements: "",
            technologies: "",
            current: false,
        });
        setEditingId(null);
    };

    const handleOpenDialog = (experience?: Experience) => {
        if (experience) {
            setEditingId(experience.id);
            setFormData({
                company: experience.company,
                position: experience.position,
                location: experience.location,
                duration: experience.duration,
                type: experience.type,
                description: experience.description,
                achievements: experience.achievements.join(" | "), // Using pipe separator for clarity
                technologies: experience.technologies.join(", "),
                current: experience.current,
            });
        } else {
            resetForm();
        }
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Prepare payload
            const payload = {
                ...formData,
                achievements: formData.achievements.split("|").map((s) => s.trim()).filter(Boolean),
                technologies: formData.technologies.split(",").map((s) => s.trim()).filter(Boolean),
            };

            const url = "/api/experience";
            const method = editingId ? "PUT" : "POST";
            const body = editingId ? JSON.stringify({ ...payload, id: editingId }) : JSON.stringify(payload);

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body,
            });

            if (!response.ok) throw new Error("Failed to save");

            toast.success(editingId ? "Experience updated" : "Experience created");
            setIsDialogOpen(false);
            fetchExperiences();
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this experience?")) return;

        try {
            const response = await fetch("/api/experience", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) throw new Error("Failed to delete");

            toast.success("Experience deleted");
            fetchExperiences();
        } catch (error) {
            toast.error("Failed to delete experience");
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Experience</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage your work experience and history.
                    </p>
                </div>
                <Button onClick={() => handleOpenDialog()}>
                    <Plus className="mr-2 h-4 w-4" /> Add Experience
                </Button>
            </div>

            <div className="bg-white rounded-lg border shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Company</TableHead>
                            <TableHead>Position</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                                </TableCell>
                            </TableRow>
                        ) : experiences.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                    No experience entries found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            experiences.map((exp) => (
                                <TableRow key={exp.id}>
                                    <TableCell className="font-medium">
                                        {exp.company}
                                        {exp.current && (
                                            <span className="ml-2 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                                                Current
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell>{exp.position}</TableCell>
                                    <TableCell>{exp.duration}</TableCell>
                                    <TableCell>{exp.type}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleOpenDialog(exp)}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                            onClick={() => handleDelete(exp.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingId ? "Edit Experience" : "Add Experience"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="company">Company</Label>
                                <Input
                                    id="company"
                                    required
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="position">Position</Label>
                                <Input
                                    id="position"
                                    required
                                    value={formData.position}
                                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    required
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="type">Type (e.g. Full-time)</Label>
                                <Input
                                    id="type"
                                    required
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="duration">Duration</Label>
                                <Input
                                    id="duration"
                                    required
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                    placeholder="e.g. Jan 2023 - Present"
                                />
                            </div>
                            <div className="flex items-center space-x-2 pt-8">
                                <input
                                    type="checkbox"
                                    id="current"
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                    checked={formData.current}
                                    onChange={(e) => setFormData({ ...formData, current: e.target.checked })}
                                />
                                <Label htmlFor="current" className="font-normal cursor-pointer">
                                    Currently working here?
                                </Label>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                required
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={3}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="achievements">
                                Achievements <span className="text-xs text-muted-foreground">(Separate with | pipe symbol)</span>
                            </Label>
                            <Textarea
                                id="achievements"
                                value={formData.achievements}
                                onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                                placeholder="Built feature X | Improved Y by 50% | Managed team"
                                rows={3}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="technologies">
                                Technologies <span className="text-xs text-muted-foreground">(Comma separated)</span>
                            </Label>
                            <Input
                                id="technologies"
                                value={formData.technologies}
                                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                                placeholder="React, Node.js, TypeScript"
                            />
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {editingId ? "Update" : "Create"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

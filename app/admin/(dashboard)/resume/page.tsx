"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Save, Loader2, ExternalLink, FileText } from "lucide-react";

export default function ResumeManager() {
    const [resumeUrl, setResumeUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchResume();
    }, []);

    const fetchResume = async () => {
        try {
            const response = await fetch('/api/resume');
            const data = await response.json();
            if (data && data.url) {
                setResumeUrl(data.url);
            }
        } catch (error) {
            toast.error("Failed to fetch resume settings");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const response = await fetch('/api/resume', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: resumeUrl })
            });

            if (response.ok) {
                toast.success("Resume URL updated successfully");
            } else {
                toast.error("Failed to update resume URL");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading settings...</div>;

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900">Resume Configuration</h1>
                <p className="text-gray-500 mt-2">Manage the file linked to the "Get Resume" button.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
                <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
                    <div className="p-4 bg-primary/5 rounded-2xl">
                        <FileText className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-gray-900">Current File Config</h3>
                        <p className="text-sm text-gray-500">Update where the resume button redirects to.</p>
                    </div>
                </div>

                <form onSubmit={handleSave} className="space-y-8">
                    <div className="space-y-3">
                        <Label htmlFor="url" className="text-base">Resume URL / Path</Label>
                        <div className="flex gap-3">
                            <Input
                                id="url"
                                value={resumeUrl}
                                onChange={(e) => setResumeUrl(e.target.value)}
                                placeholder="/resume.pdf or https://..."
                                className="flex-1 h-12 text-base"
                            />
                            {resumeUrl && (
                                <Button
                                    type="button"
                                    variant="secondary"
                                    className="h-12 w-12 shrink-0"
                                    onClick={() => window.open(resumeUrl, '_blank')}
                                    title="Test Link"
                                >
                                    <ExternalLink size={20} />
                                </Button>
                            )}
                        </div>
                        <p className="text-sm text-gray-400">
                            Use a local path like <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-600">/resume.pdf</code> if the file is in your public folder, or a full URL for external hosting.
                        </p>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit" disabled={saving} className="h-12 px-8 gap-2 shadow-lg shadow-primary/20 hover:shadow-xl transition-all">
                            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save size={20} />}
                            Save Configuration
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

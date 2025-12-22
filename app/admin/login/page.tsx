"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Lock } from "lucide-react";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'login', username, password })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                toast.success("Login successful!");
                router.push("/admin/dashboard");
            } else {
                toast.error(data.error || "Login failed");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                        <Lock className="w-6 h-6 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
                    <p className="text-sm text-gray-500">Sign in to manage your portfolio</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="Entet your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="bg-gray-50"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="bg-gray-50"
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Sign In"}
                    </Button>
                </form>
            </div>
        </div>
    );
}

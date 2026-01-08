"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Layers,
    FolderKanban,
    Contact,
    FileText,
    LogOut,
    UserCircle,
    Briefcase,
    Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const navItems = [
        { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { label: "Media", href: "/admin/media", icon: ImageIcon },
        { label: "Tech Stack", href: "/admin/techstack", icon: Layers },
        { label: "Projects", href: "/admin/projects", icon: FolderKanban },
        { label: "Contact", href: "/admin/contact", icon: Contact },
        { label: "Resume", href: "/admin/resume", icon: FileText },
        { label: "Experience", href: "/admin/experience", icon: Briefcase },
    ];

    const handleLogout = async () => {
        try {
            await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'logout' })
            });
            toast.success("Logged out successfully");
            router.push("/admin/login");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Admin Top Navbar */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                                            isActive
                                                ? "bg-gray-100 text-gray-900 shadow-sm"
                                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                        )}
                                    >
                                        <item.icon size={16} />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                            <UserCircle size={16} />
                            <span>admin</span>
                        </div>
                        <Button
                            variant="destructive"
                            size="sm"
                            className="gap-2"
                            onClick={handleLogout}
                        >
                            <LogOut size={16} />
                            <span className="hidden sm:inline">Logout</span>
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation (Horizontal Scroll) */}
                <div className="md:hidden overflow-x-auto border-t border-gray-100 bg-gray-50/50">
                    <nav className="flex items-center gap-2 p-2 min-w-max">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-all",
                                        isActive
                                            ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                                            : "text-gray-500 hover:text-gray-900"
                                    )}
                                >
                                    <item.icon size={16} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8">
                {children}
            </main>
        </div>
    );
}

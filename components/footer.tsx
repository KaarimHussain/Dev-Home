import Logo from "@/public/images/Logo-White.png";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    const links = [
        {
            label: "Home",
            href: "/"
        },
        {
            label: "About",
            href: "/about"
        },
        {
            label: "Projects",
            href: "/projects"
        },
        {
            label: "Skills",
            href: "/skills"
        },
        {
            label: "Contact",
            href: "/contact"
        }
    ]

    return (
        <footer className="relative min-h-[50vh] w-full bg-linear-to-b from-black via-black to-indigo-950 px-5 md:px-10 lg:px-20 xl:px-32 py-16">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(var(--primary)) 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            <div className="container mx-auto relative z-10">
                {/* Logo Section with glow effect */}
                <div className="flex flex-col items-center justify-center mb-12">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-primary/20 blur-3xl group-hover:bg-primary/40 transition-all duration-500 rounded-full"></div>
                        <img
                            src={Logo.src}
                            className="relative object-center object-contain w-[250px] md:w-[300px] aspect-square opacity-20 group-hover:opacity-100 transition-all duration-500 ease-in-out hover:scale-105"
                            alt="Logo"
                        />
                    </div>
                    <p className="text-white/40 text-sm mt-6 text-center max-w-md">
                        Building digital experiences with passion and precision
                    </p>
                </div>

                {/* Gradient Divider */}
                <div className="relative h-px w-full my-12">
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/50 to-transparent"></div>
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent blur-sm"></div>
                </div>

                {/* Navigation Links */}
                <div className="flex items-center justify-center mb-12">
                    <nav className="flex flex-wrap items-center gap-6 md:gap-8 justify-center">
                        {links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                className="relative text-white/60 hover:text-primary transition-all duration-300 ease-in-out text-sm md:text-base font-medium group"
                            >
                                <span className="relative z-10">{link.label}</span>
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 ease-out"></span>
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
                    <p className="text-white/40 text-xs md:text-sm">
                        © {new Date().getFullYear()} All rights reserved
                    </p>

                    {/* Social Links Placeholder */}
                    <div className="flex items-center gap-4">
                        <a href="#" className="text-white/40 hover:text-primary transition-colors duration-300">
                            <Github />
                        </a>
                        <a href="#" className="text-white/40 hover:text-primary transition-colors duration-300">
                            <Linkedin />
                        </a>
                        <a href="#" className="text-white/40 hover:text-primary transition-colors duration-300">
                            <Twitter />
                        </a>
                        <a href="#" className="text-white/40 hover:text-primary transition-colors duration-300">
                            <Instagram />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
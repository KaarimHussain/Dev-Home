import { Github, Instagram, Linkedin, Twitter } from "lucide-react";

export default function FloatingSocials() {
    const socials = [
        {
            icon: Github,
            href: "https://github.com/yourusername",
            label: "GitHub",
            color: "hover:text-[#333]"
        },
        {
            icon: Twitter,
            href: "https://twitter.com/yourusername",
            label: "Twitter",
            color: "hover:text-[#1DA1F2]"
        },
        {
            icon: Instagram,
            href: "https://instagram.com/yourusername",
            label: "Instagram",
            color: "hover:text-[#E4405F]"
        },
        {
            icon: Linkedin,
            href: "https://linkedin.com/in/yourusername",
            label: "LinkedIn",
            color: "hover:text-[#0A66C2]"
        }
    ];

    return (
        <div className="md:block hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            {/* Backdrop blur container */}
            <div className="relative group">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Main container */}
                <div className="relative backdrop-blur-md bg-black/80 border border-white/10 rounded-full px-1 py-1 shadow-2xl">
                    {/* Gradient border effect */}
                    <div className="absolute inset-0 rounded-full bg-linear-to-r from-primary/20 via-primary/40 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>

                    <div className="flex items-center gap-2">
                        {socials.map((social, index) => {
                            const Icon = social.icon;
                            return (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="relative group/item p-2.5 rounded-full transition-all duration-300 "
                                >
                                    {/* Icon background on hover */}
                                    <div className="absolute inset-0 bg-primary/20 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>

                                    {/* Icon glow */}
                                    <div className="absolute inset-0 bg-primary/40 rounded-full blur-md opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>

                                    {/* Icon */}
                                    <Icon
                                        size={20}
                                        className="relative text-white/70 group-hover/item:text-primary transition-colors duration-300"
                                    />

                                    {/* Tooltip */}
                                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/90 text-white text-xs rounded-lg opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none border border-white/10">
                                        {social.label}
                                        <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-black/90"></span>
                                    </span>
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* Separator lines */}
                <div className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2 -z-10">
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/30 to-transparent opacity-50"></div>
                </div>
            </div>
        </div>
    );
}
"use client";
import Logo from "@/public/images/Logo-White.png";
import Image from "next/image";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <header
        className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-black/80 backdrop-blur-lg border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-transparent"
          }`}
      >
        <div
          className={`container mx-auto px-5 md:px-10 lg:px-20 xl:px-32 transition-all duration-300 ${isScrolled ? "py-3" : "py-5"
            }`}
        >
          <div className="flex items-center justify-between lg:grid lg:grid-cols-3 lg:gap-4">
            {/* Logo - Left Side */}
            <div className="flex items-center">
              <a
                href="/"
                className="transition-transform hover:scale-105 duration-200"
              >
                <Image
                  src={Logo}
                  alt="Kaarim Hussain Logo"
                  className={`aspect-square object-contain transition-all duration-300 ${isScrolled ? "w-10" : "w-13"
                    }`}
                />
              </a>
            </div>

            {/* Links - Center (Desktop Only) */}
            <nav className="hidden lg:flex gap-6 items-center justify-center">
              {links.map((data, index) => (
                <a
                  className="text-white/70 hover:text-white font-light transition-all duration-200 whitespace-nowrap text-sm relative group"
                  href={data.href}
                  key={index}
                >
                  {data.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </nav>

            {/* Buttons - Right Side (Desktop Only) */}
            <div className="hidden lg:flex gap-3 items-center justify-end">
              <Button variant="secondary">Contact Me</Button>
              <Button variant={"outline"}>Resume</Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Side Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={toggleMobileMenu}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Side Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-64 bg-zinc-900 border-l border-zinc-100/20 z-50 lg:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Menu Header */}
                <div className="flex items-center justify-between p-5 border-b border-zinc-100/20">
                  <Image
                    src={Logo}
                    alt="Kaarim Hussain Logo"
                    className="aspect-square w-13 object-contain"
                  />
                  <button
                    onClick={toggleMobileMenu}
                    className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Menu Links */}
                <nav className="flex flex-col p-5 space-y-1">
                  {links.map((data, index) => (
                    <motion.a
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      href={data.href}
                      onClick={toggleMobileMenu}
                      className="text-white/70 hover:text-white hover:bg-white/10 font-light transition-all duration-200 px-4 py-3 rounded-lg"
                    >
                      {data.label}
                    </motion.a>
                  ))}
                </nav>

                {/* Menu Buttons */}
                <div className="flex flex-col mt-auto p-5 space-y-3 border-t border-zinc-100/20">
                  <Button variant="secondary">Contact Me</Button>
                  <Button>Resume</Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

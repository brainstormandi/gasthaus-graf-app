"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Utensils, BookOpen, Newspaper, PlusCircle, Phone, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navItems = [
    { name: "Start", icon: Home, path: "/" },
    { name: "Menüs", icon: Utensils, path: "/menus" },
    { name: "Speisen", icon: BookOpen, path: "/speisen" },
    { name: "News", icon: Newspaper, path: "/news" },
    { name: "Mehr", icon: PlusCircle, path: "/mehr" },
];

export default function Navigation() {
    const pathname = usePathname();

    return (
        <>
            {/* Mobile Bottom Nav - Refined Luxury */}
            <nav className="fixed bottom-0 left-0 right-0 z-[60] glass-effect px-4 pb-safe pt-4 md:hidden" role="navigation" aria-label="Mobile Navigation">
                <div className="flex justify-around items-center max-w-lg mx-auto relative h-16">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className="flex flex-col items-center gap-1.5 min-w-[64px] relative py-2"
                                aria-current={isActive ? "page" : undefined}
                            >
                                <motion.div
                                    animate={isActive ? { scale: 1.15, y: -2 } : { scale: 1, y: 0 }}
                                    className={`${isActive ? "text-[#8D0046]" : "text-zinc-400"}`}
                                >
                                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} aria-hidden="true" />
                                </motion.div>
                                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isActive ? "text-[#8D0046]" : "text-zinc-400"}`}>
                                    {item.name}
                                </span>
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-indicator-bar"
                                        className="absolute -top-1 w-8 h-[3px] bg-[#8D0046] rounded-full"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Desktop Header - Harmonic Floating */}
            <nav className="hidden md:flex fixed top-0 left-0 right-0 z-[60] px-12 py-6 items-center h-28" role="navigation" aria-label="Desktop Navigation">
                <div className="max-w-7xl mx-auto w-full glass-effect rounded-full px-12 h-20 flex justify-between items-center shadow-md">
                    <Link href="/" className="flex items-center gap-6 group">
                        <div className="w-12 h-12 relative flex-shrink-0 group-hover:rotate-12 transition-transform duration-700">
                            <Image
                                src="/bilder/gasthaus-graf-winklarn-mostviertel-essen-regional-kulinarik-logo.webp"
                                alt="Startseite"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="font-serif italic text-2xl text-[#1a1a1a] font-bold group-hover:text-[#8D0046] transition-colors leading-none tracking-tighter">Gasthaus Graf</div>
                    </Link>

                    <div className="flex gap-16">
                        {navItems.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`text-[10px] font-black uppercase tracking-[0.5em] transition-all relative py-2 ${isActive ? "text-[#8D0046]" : "text-zinc-400 hover:text-[#1a1a1a]"
                                        }`}
                                    aria-current={isActive ? "page" : undefined}
                                >
                                    {item.name}
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-indicator-desktop"
                                                className="absolute -bottom-1 left-0 right-1 h-[2px] bg-[#8D0046] rounded-full"
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: 1 }}
                                                exit={{ scaleX: 0 }}
                                            />
                                        )}
                                    </AnimatePresence>
                                </Link>
                            );
                        })}
                    </div>

                    <div>
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="tel:+43747263281"
                            className="bg-[#1a1a1a] text-white px-10 h-12 rounded-full font-black text-[10px] uppercase tracking-[0.4em] shadow-xl hover:bg-[#8D0046] transition-all inline-flex items-center gap-3"
                        >
                            <Phone size={14} />
                            <span>Jetzt Anrufen</span>
                            <ArrowUpRight size={14} className="opacity-40" />
                        </motion.a>
                    </div>
                </div>
            </nav>
        </>
    );
}

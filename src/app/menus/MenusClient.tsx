"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Utensils, Clock, AlertCircle, Quote, Sparkles } from "lucide-react";
import { fullMenuPlan as initialMenuPlan } from "@/data/menus";

export default function MenusClient() {
    const [menus, setMenus] = useState(initialMenuPlan);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchAndSync = async () => {
            const lastSync = localStorage.getItem('lastMenuSync');
            const today = new Date().toDateString();

            if (lastSync !== today) {
                setIsLoading(true);
                try {
                    const response = await fetch('/api/sync-menus');
                    if (response.ok) {
                        const data = await response.json();
                        // If the API returns the menus, update state
                        if (data.menus) {
                            setMenus(data.menus);
                        }
                    }
                } catch (error) {
                    console.error('Auto-sync failed:', error);
                } finally {
                    localStorage.setItem('lastMenuSync', today);
                    setIsLoading(false);
                }
            }
        };

        fetchAndSync();
    }, []);

    return (
        <div className="min-h-screen bg-[#fdfcfb] pt-24 pb-48 px-6 font-sans overflow-hidden">

            {/* HERO: Harmonic Typography */}
            <header className="max-w-7xl mx-auto mb-40 relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 0.03, scale: 1 }}
                    transition={{ duration: 3, ease: "easeOut" }}
                    className="absolute -top-32 -left-20 text-[20rem] font-serif font-black pointer-events-none select-none text-[#8D0046] italic"
                >
                    Menu
                </motion.div>

                <div className="relative z-10 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="flex items-center gap-4"
                    >
                        <div className="h-px w-12 bg-[#8D0046]/30" />
                        <span className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-600">Genuss-Fahrplan</span>
                    </motion.div>
                    <h1 className="text-5xl md:text-[10rem] font-serif font-bold text-[#1a1a1a] leading-[0.85] tracking-tighter">
                        Was <span className="text-[#8D0046]">servieren</span> <br /> wir heute?
                    </h1>
                </div>
            </header>

            <div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-12 gap-16 lg:gap-32">

                {/* SIDEBAR: Refined Highlight */}
                <aside className="w-full md:w-auto md:col-span-5 lg:col-span-4 space-y-12 md:sticky md:top-32 h-fit">
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-magenta-gradient p-8 md:p-12 lg:p-16 btn-rounded text-white shadow-3xl shadow-[#8D0046]/20 relative overflow-visible group"
                    >
                        <Quote size={120} className="absolute -top-10 -right-10 opacity-10 group-hover:rotate-12 transition-transform duration-700" />
                        <h2 className="text-4xl md:text-4xl lg:text-5xl font-serif font-bold italic mb-6 md:mb-8 leading-tight">Buffet- <br /> Erlebnis.</h2>
                        <p className="text-white/90 text-base md:text-base font-medium leading-relaxed mb-8 md:mb-12 pr-2">
                            Der perfekte Start: Genießen Sie unser vielfältiges Suppen- und Nachspeisenbuffet zu jedem Hauptgericht.
                        </p>

                        <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
                            <div className="text-6xl md:text-6xl lg:text-7xl font-serif font-black italic tracking-tighter">12,–</div>
                            <div className="space-y-1">
                                <p className="text-xs font-black uppercase tracking-widest opacity-90">Inklusive</p>
                                <p className="text-sm font-bold uppercase tracking-widest text-white">Hauptgericht</p>
                            </div>
                        </div>

                        <div className="pt-6 md:pt-8 border-t border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-2 md:gap-3">
                                <Clock size={16} className="text-white/40" />
                                <span className="text-xs md:text-xs font-bold uppercase tracking-widest opacity-90">Mo, Do-Sa | 11:00</span>
                            </div>
                            <Sparkles size={16} className="text-white/40" />
                        </div>
                    </motion.div>

                    <div className="p-12 glass-effect btn-rounded flex flex-col items-center text-center gap-6">
                        <AlertCircle className="text-[#8D0046] opacity-30" size={32} strokeWidth={1.5} />
                        <div className="space-y-4">
                            <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Hinweis</p>
                            <p className="text-base font-bold text-zinc-600 italic font-serif leading-relaxed">
                                Dienstag & Mittwoch Ruhetag. <br /> Wir freuen uns auf Ihren Besuch am Donnerstag!
                            </p>
                        </div>
                    </div>
                </aside>

                {/* MENU FEED: Premium Flow */}
                <main className="col-span-12 md:col-span-7 lg:col-span-8 space-y-4">
                    {menus.map((item, index) => (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: index * 0.05 }}
                            key={item.date}
                            className="group flex flex-col md:flex-row items-baseline justify-between py-12 px-8 border-b border-zinc-50 hover:bg-white hover:shadow-xl hover:shadow-zinc-500/5 transition-all duration-700 btn-rounded relative overflow-hidden"
                        >
                            {/* Accent line on hover */}
                            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#8D0046] scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-top" />

                            <div className="flex flex-col gap-4 relative z-10 w-full md:w-auto">
                                <span className="text-2xl md:text-3xl font-black uppercase tracking-[0.1em] text-[#8D0046] group-hover:text-[#A60052] transition-colors leading-none">
                                    {item.date}
                                </span>
                                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1a1a1a] tracking-tight group-hover:italic group-hover:translate-x-2 transition-all duration-500 leading-tight">
                                    {item.dish}
                                </h3>
                            </div>

                            <div className="md:text-right mt-4 md:mt-0 relative z-10">
                                <p className="text-base md:text-lg font-bold text-zinc-600 uppercase tracking-widest group-hover:text-zinc-800 transition-colors">
                                    {item.side}
                                </p>
                            </div>
                        </motion.div>
                    ))}

                    {/* Closing Stamp */}
                    <div className="pt-32 text-center opacity-5 select-none pointer-events-none pb-20">
                        <h4 className="text-[12rem] font-serif font-black tracking-tighter italic">Appetit.</h4>
                    </div>
                </main>
            </div>
        </div>
    );
}

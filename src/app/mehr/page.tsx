"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Info, Coffee, RefreshCw, ExternalLink, ShieldCheck, FileText, Clock, ChevronRight, Sparkles } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function MehrPage() {
    const [lastUpdate, setLastUpdate] = useState<string>("Gerade eben");
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleManualRefresh = async () => {
        setIsRefreshing(true);
        try {
            const response = await fetch('/api/sync-menus', { method: 'POST' });
            if (response.ok) {
                const now = new Date();
                setLastUpdate(`${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`);
            } else {
                console.error('Failed to sync menus');
            }
        } catch (error) {
            console.error('Error during manually refreshing menus:', error);
        } finally {
            setIsRefreshing(false);
        }
    };

    const sections = [
        {
            title: "Direktkontakt",
            items: [
                { icon: MapPin, label: "Brücklerweg 1, 3300 Winklarn", sub: "Route planen", href: "https://maps.google.com/?q=Brücklerweg+1,+3300+Winklarn" },
                { icon: Phone, label: "07472 / 63 281", sub: "Tippen zum Anrufen", href: "tel:+43747263281" },
                { icon: Mail, label: "office@gasthausgraf.at", sub: "Schreiben Sie uns", href: "mailto:office@gasthausgraf.at" },
            ]
        },
        {
            title: "Geschäftszeiten",
            items: [
                { icon: Clock, label: "Montag", sub: "11:00 – 14:30 Uhr" },
                { icon: Clock, label: "Dienstag & Mittwoch", sub: "Ruhetag", isClosed: true },
                { icon: Clock, label: "Donnerstag – Samstag", sub: "11:00 – 14:30 & ab 17:30" },
                { icon: Clock, label: "Sonntag & Feiertage", sub: "Geöffnet ab 09:00 Uhr" },
            ]
        },
        {
            title: "App & Recht",
            items: [
                { icon: FileText, label: "Impressum", sub: "Gesetzliche Angaben", href: "https://gasthausgraf.at/kontakt-hofladen-bauernladen-wochenmarkt-steyr-mostviertel/" },
                { icon: ShieldCheck, label: "Datenschutz", sub: "Ihre Privatsphäre", href: "https://gasthausgraf.at/datenschutz/" },
                { icon: Info, label: "Software", sub: "Release 2026.1" },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-[#fdfcfb] pb-48 font-sans overflow-hidden">

            {/* HEADER: Technical Zen */}
            <header className="pt-32 pb-24 px-6 md:px-24 text-center relative overflow-hidden" role="banner">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                    className="w-24 h-24 relative mx-auto mb-10 z-10 group"
                >
                    <div className="absolute inset-0 bg-[#8D0046]/5 rounded-full blur-2xl group-hover:bg-[#8D0046]/10 transition-colors duration-1000" />
                    <Image
                        src="/bilder/gasthaus-graf-winklarn-mostviertel-essen-regional-kulinarik-logo.webp"
                        alt="Logo"
                        fill
                        className="object-contain grayscale hover:grayscale-0 transition-all duration-1000 relative z-20"
                        priority
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 1 }}
                >
                    <p className="text-sm font-bold uppercase tracking-[0.3em] text-zinc-500 mb-6">Plattform & Service</p>
                    <h1 className="text-5xl md:text-7xl font-serif font-black text-[#1a1a1a] tracking-tighter z-10 relative leading-[0.9]">
                        Information & <br /> <span className="text-[#8D0046] italic">Service.</span>
                    </h1>
                </motion.div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8D0046]/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
            </header>

            <main className="max-w-6xl mx-auto p-6 md:p-16">

                {/* SYNC: Dark-Mode Technical Card */}
                <section className="grid grid-cols-12 mb-40">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="col-span-12 md:col-span-8 lg:col-span-6 bg-[#1a1a1a] p-12 lg:p-16 btn-rounded text-white shadow-3xl shadow-black/20 group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-12 text-[#8D0046]/10 scale-[6] rotate-12 transition-transform duration-[5s] group-hover:rotate-45">
                            <RefreshCw />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-8">
                                <Sparkles size={20} className="text-[#8D0046]" />
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8D0046]">Live-Infrastruktur</p>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold italic mb-8 leading-[1.1]">Immer aktuell <br /> informiert.</h2>
                            <p className="text-zinc-400 text-lg font-medium mb-12 leading-relaxed max-w-sm">
                                Speisepläne und Angebote werden automatisch synchronisiert. <br /> Stand: <span className="text-white font-bold">{lastUpdate}</span>
                            </p>
                            <button
                                onClick={handleManualRefresh}
                                disabled={isRefreshing}
                                className="bg-white text-[#1a1a1a] px-12 py-6 btn-rounded font-black text-xs uppercase tracking-[0.2em] flex items-center gap-6 transition-all hover:bg-[#8D0046] hover:text-white shadow-2xl active:scale-95 group/btn"
                            >
                                <RefreshCw size={20} className={`${isRefreshing ? "animate-spin" : "group-hover/btn:rotate-180 transition-transform duration-700"}`} />
                                <span>{isRefreshing ? "Synchronisation..." : "Jetzt aktualisieren"}</span>
                            </button>
                        </div>
                    </motion.div>
                </section>

                {/* INFO GRID: Harmonic Layout */}
                <div className="grid grid-cols-12 gap-y-32">
                    {sections.map((section, sIdx) => (
                        <div key={section.title} className={`col-span-12 md:col-span-10 group ${sIdx % 2 === 0 ? '' : 'md:col-start-3 md:text-right'}`}>
                            <motion.div
                                initial={{ opacity: 0, x: sIdx % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1 }}
                            >
                                <h3 className={`text-sm font-bold uppercase tracking-[0.3em] text-zinc-500 mb-12 flex items-center gap-6 ${sIdx % 2 === 0 ? '' : 'justify-end'}`}>
                                    {sIdx % 2 === 0 && <div className="h-[1px] w-16 bg-[#8D0046]/30 rounded-full" />}
                                    {section.title}
                                    {sIdx % 2 !== 0 && <div className="h-[1px] w-16 bg-[#8D0046]/30 rounded-full" />}
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-100 border border-zinc-100 btn-rounded overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-1000">
                                    {section.items.map((item) => {
                                        const href = 'href' in item ? item.href : undefined;
                                        const isClosed = 'isClosed' in item ? item.isClosed : false;
                                        const Tag = href ? 'a' : 'div';
                                        return (
                                            <Tag
                                                key={item.label}
                                                {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
                                                className={`bg-white p-12 flex flex-col justify-between gap-12 group/item transition-all duration-700 hover:bg-[#fdfcfb] ${href ? 'cursor-pointer' : ''}`}
                                            >
                                                <div className={`w-14 h-14 bg-zinc-50 rounded-2xl flex items-center justify-center transition-all duration-700 group-hover/item:bg-white group-hover/item:shadow-lg ${isClosed ? 'text-zinc-200' : 'text-[#8D0046]'}`}>
                                                    <item.icon size={28} strokeWidth={1} />
                                                </div>
                                                <div className="space-y-3">
                                                    <p className={`font-black text-2xl leading-[0.9] uppercase tracking-tighter ${isClosed ? 'text-zinc-300' : 'text-[#1a1a1a]'}`}>{item.label}</p>
                                                    <p className={`text-sm md:text-base font-bold uppercase tracking-[0.1em] ${isClosed ? 'text-zinc-200' : 'text-zinc-500'}`}>{item.sub}</p>
                                                </div>
                                                {href && (
                                                    <div className="h-0 group-hover/item:h-6 overflow-hidden transition-all duration-500 opacity-0 group-hover/item:opacity-100">
                                                        <div className="flex items-center gap-3 text-[#8D0046] text-[10px] font-black uppercase tracking-widest">
                                                            <span>Details anzeigen</span>
                                                            <ArrowUpRight size={14} className="group-hover/item:translate-x-1 group-hover/item:-translate-y-1 transition-transform" />
                                                        </div>
                                                    </div>
                                                )}
                                            </Tag>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </main>

            {/* SIGNATURE: Ethereal Goodbye */}
            <div className="mt-80 px-12 text-center opacity-[0.03]">
                <p className="text-8xl md:text-[20rem] font-serif font-black tracking-tighter text-[#1a1a1a] select-none pointer-events-none italic">
                    Servus.
                </p>
            </div>
        </div>
    );
}

// Added ArrowUpRight for the detail button
import { ArrowUpRight } from "lucide-react";

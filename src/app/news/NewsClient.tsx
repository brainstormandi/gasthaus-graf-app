"use client";

import { motion } from "framer-motion";
import { Newspaper, Bell, ArrowRight, Sparkles, Quote } from "lucide-react";
import Image from "next/image";
import { newsItems } from "@/data/news";
import { useState, useEffect } from "react";

export default function NewsClient() {
    const [news, setNews] = useState<any[]>(newsItems);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('/api/news');
                if (response.ok) {
                    const data = await response.json();
                    if (data.news && Array.isArray(data.news)) {
                        setNews(data.news);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch news:', error);
            }
        };
        fetchNews();
    }, []);

    return (
        <div className="min-h-screen bg-[#fdfcfb] pt-24 pb-48 px-6 font-sans overflow-hidden">

            {/* HEADER: Editorial Impact */}
            <header className="max-w-7xl mx-auto mb-48 relative">
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 0.05, x: 0 }}
                    transition={{ duration: 2, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute -top-40 right-0 text-[15rem] md:text-[25rem] font-serif font-black italic select-none pointer-events-none text-[#8D0046]/20"
                >
                    News
                </motion.div>

                <div className="relative z-10 space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="flex items-center gap-6"
                    >
                        <div className="w-12 h-[2px] bg-[#8D0046]" />
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-600">Aktuelles vom Gasthaus Graf</p>
                    </motion.div>

                    <h1 className="text-5xl md:text-[11rem] font-serif font-black text-[#1a1a1a] leading-[0.85] tracking-tighter">
                        Geschichten <br /> <span className="text-[#8D0046] italic">am Teller.</span>
                    </h1>
                </div>
            </header>

            <div className="max-w-7xl mx-auto space-y-64">
                {news.map((item, index) => (
                    <motion.article
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                        key={item.id}
                        className={`flex flex-col md:flex-row items-center gap-20 lg:gap-32 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                    >
                        {/* Massive Editorial Image */}
                        <div className="relative w-full md:w-[55%] aspect-[16/10] group">
                            <div className={`absolute -top-12 -left-12 w-full h-full border border-zinc-100 container-rounded shadow-sm z-0 transition-transform duration-1000 group-hover:scale-95 group-hover:-translate-x-2 group-hover:-translate-y-2`} />
                            <div className="relative w-full h-full overflow-hidden container-rounded shadow-2xl z-10">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover hover:scale-110 transition-transform duration-[3s] grayscale-[0.3] hover:grayscale-0"
                                    priority={index === 0}
                                />
                                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                            </div>

                            <div className={`absolute -bottom-10 md:bottom-20 z-20 ${index % 2 === 0 ? '-right-10 md:-right-20' : '-left-10 md:-left-20'}`}>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-white p-8 md:p-12 btn-rounded shadow-xl flex items-center gap-6"
                                >
                                    <div className="text-center border-r border-zinc-100 pr-6">
                                        <p className="text-sm font-black text-[#8D0046]">
                                            {item.date.includes('.') ? item.date.split('.')[0] : "Info"}
                                        </p>
                                        <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                                            {item.date.includes('.') ? item.date.split('.')[1] : item.date}
                                        </p>
                                    </div>
                                    <Sparkles size={20} className="text-[#f4e8e1]" />
                                </motion.div>
                            </div>
                        </div>

                        {/* Editorial Content */}
                        <div className="w-full md:w-[45%] space-y-10 group">
                            <h2 className="text-4xl md:text-7xl lg:text-8xl font-serif font-bold text-[#1a1a1a] tracking-tighter leading-[0.95] group-hover:italic transition-all duration-700">
                                {item.title}
                            </h2>
                            <p className="text-zinc-500 text-lg md:text-xl leading-relaxed font-medium max-w-lg italic font-serif">
                                "{item.excerpt}"
                            </p>


                            <div className="pt-8">
                                <a
                                    href="https://gasthausgraf.at/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-6 text-[#1a1a1a] group-hover:text-[#8D0046] transition-colors"
                                >
                                    <div className="w-16 h-16 rounded-full border border-zinc-100 flex items-center justify-center group-hover:bg-[#8D0046] group-hover:text-white group-hover:border-[#8D0046] transition-all duration-500">
                                        <ArrowRight size={24} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-black uppercase tracking-[0.2em] leading-none text-zinc-500">Journal</p>
                                        <p className="text-base font-bold font-serif italic text-zinc-900">Geschichte lesen</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </motion.article>
                ))}

                {/* PUSH CTA: High-End Interactive Section */}
                <section className="relative pt-40">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8D0046]/10 rounded-full blur-[150px] opacity-20" />
                    <div className="bg-[#1a1a1a] p-16 md:p-32 container-rounded text-white shadow-3xl shadow-black/30 flex flex-col md:flex-row items-center gap-24 overflow-hidden relative group">

                        <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#8D0046]/20 rounded-full blur-[100px]" />
                        <div className="absolute top-0 right-0 p-12 text-white/5 scale-[10] group-hover:rotate-12 transition-transform duration-[5s]">
                            <Bell />
                        </div>

                        <div className="max-w-2xl relative z-10 space-y-12 text-center md:text-left">
                            <div className="flex items-center gap-4 justify-center md:justify-start">
                                <div className="w-10 h-[1px] bg-[#8D0046]" />
                                <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#8D0046]">Live-Update</span>
                            </div>
                            <h3 className="text-4xl md:text-8xl font-serif font-bold italic leading-[0.9] tracking-tighter">Immer am <br /> neuesten Stand.</h3>
                            <p className="text-zinc-400 text-xl leading-relaxed font-medium max-w-md">
                                Aktivieren Sie Push-Benachrichtigungen für exklusive Angebote und den täglichen Blick in den Kochtopf.
                            </p>
                        </div>

                        <div className="relative z-10 shrink-0">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-[#1a1a1a] px-16 py-8 btn-rounded font-black text-xs uppercase tracking-[0.4em] shadow-2xl hover:bg-[#8D0046] hover:text-white transition-all duration-500"
                            >
                                Aktivieren
                            </motion.button>
                        </div>
                    </div>
                </section>
            </div>

            {/* FINAL SIGNATURE */}
            <footer className="mt-80 text-center opacity-5 select-none pointer-events-none pb-40">
                <p className="text-[12rem] font-serif font-black tracking-tighter text-zinc-300 italic">Journal.</p>
            </footer>
        </div>
    );
}

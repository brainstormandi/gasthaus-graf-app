"use client";

import { motion, Variants } from "framer-motion";
import { ChefHat, Info, Utensils, Leaf, Cake, ArrowRight, Sparkles } from "lucide-react";
import { categories } from "@/data/speisen";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] } }
};

export default function SpeisenClient() {
    return (
        <div className="min-h-screen bg-[#fdfcfb] pt-24 pb-48 px-6 font-sans">

            {/* INTRO: Harmonic Atmosphere */}
            <header className="max-w-7xl mx-auto mb-40 relative">
                <motion.div
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 0.02, scale: 1 }}
                    transition={{ duration: 4 }}
                    className="absolute -top-40 -left-10 text-[25rem] font-serif font-black italic pointer-events-none select-none text-[#8D0046]/30 leading-none"
                >
                    Karte
                </motion.div>

                <div className="relative z-10 max-w-4xl space-y-10 pr-4 md:pr-0">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2 }}
                        className="flex items-center gap-6"
                    >
                        <div className="h-[2px] w-16 bg-[#8D0046]" />
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-600 leading-none">Meisterhaft zubereitet</p>
                    </motion.div>

                    <h1 className="text-5xl md:text-[11rem] font-serif font-black text-[#1a1a1a] leading-[0.8] tracking-tighter">
                        Kulinarik <br /> <span className="text-[#8D0046] italic">am Punkt.</span>
                    </h1>

                    <div className="flex flex-wrap gap-12 pt-10">
                        <div className="space-y-4">
                            <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Philosophie</p>
                            <p className="text-base font-bold italic font-serif text-zinc-600 max-w-[280px] leading-relaxed">Handverlesene Zutaten aus der Region, veredelt mit technischer Präzision.</p>
                        </div>
                        <div className="space-y-4">
                            <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Frische</p>
                            <p className="text-base font-bold italic font-serif text-zinc-600 max-w-[280px] leading-relaxed">Täglich frisch bezogen vom Bauern unseres Vertrauens.</p>
                        </div>
                    </div>
                </div>
            </header>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="max-w-7xl mx-auto space-y-56"
            >
                {categories.map((cat, idx) => (
                    <section key={cat.title} className="relative group">
                        {/* Huge background text for rhythm */}
                        <div className={`absolute -top-20 hidden md:block opacity-[0.02] text-[15rem] font-black font-serif italic select-none pointer-events-none transition-all duration-1000 group-hover:opacity-[0.05] ${idx % 2 === 0 ? '-right-20' : '-left-20'}`}>
                            {cat.title}
                        </div>

                        <div className={`flex flex-col md:grid md:grid-cols-12 gap-16 lg:gap-32 items-start ${idx % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                            {/* Sticky Info Block */}
                            <div className={`w-full md:col-span-5 lg:col-span-4 p-8 md:p-12 lg:p-16 btn-rounded bg-white border border-zinc-100 shadow-2xl shadow-zinc-200/50 mb-12 md:mb-0 ${idx % 2 === 0 ? 'md:sticky md:top-32' : 'md:col-start-9 md:sticky md:top-32'}`}>
                                <div className="w-20 h-20 bg-accent rounded-3xl flex items-center justify-center text-[#8D0046] mb-12 group-hover:scale-110 transition-transform duration-700">
                                    <cat.icon size={36} strokeWidth={1} />
                                </div>
                                <h3 className="text-4xl md:text-5xl font-serif font-bold italic leading-tight text-[#1a1a1a] mb-8">{cat.title}</h3>
                                <div className="h-[2px] w-12 bg-[#8D0046] rounded-full mb-8" />
                                <p className="text-zinc-600 text-sm font-bold leading-relaxed uppercase tracking-widest">Die Essenz unserer Küche.</p>
                            </div>

                            {/* Item List */}
                            <div className={`w-full md:col-span-7 lg:col-span-7 space-y-16 pr-2 md:pr-0 ${idx % 2 === 0 ? 'md:col-start-6' : 'md:col-start-1 md:row-start-1'}`}>
                                {cat.items.map((item) => (
                                    <motion.div
                                        variants={itemVariants}
                                        key={item.name}
                                        className="group/item relative flex flex-col gap-4"
                                    >
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-4 md:gap-8 w-full max-w-[85vw] md:max-w-none">
                                            <h4 className="font-extrabold text-[#1a1a1a] text-2xl md:text-3xl leading-snug tracking-tighter uppercase group-hover/item:text-[#8D0046] transition-colors duration-500 whitespace-normal break-words w-full pr-2">{item.name}</h4>
                                            <div className="hidden md:block flex-1 border-b-[2px] border-dotted border-zinc-100 mx-4 opacity-50 group-hover/item:border-[#8D0046]/20 transition-colors" />
                                            <span className="font-serif italic font-bold text-[#8D0046] text-3xl md:text-4xl whitespace-nowrap self-start md:self-auto shrink-0">{item.price}</span>
                                        </div>
                                        <div className="flex flex-col gap-2 w-full">
                                            <p className="text-zinc-600 text-base md:text-lg italic font-medium leading-relaxed w-full whitespace-normal break-words">
                                                {item.desc || "Klassisch zubereitet mit regionaler Herkunft."}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                ))}
            </motion.div>

            {/* CLOSING: Harmonic Footer Card */}
            <footer className="max-w-5xl mx-auto mt-60 relative">
                <div className="bg-[#1a1a1a] p-16 md:p-24 btn-rounded text-white shadow-3xl shadow-black/20 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-12 text-[#8D0046]/10 scale-[8] -translate-x-12 translate-y-12">
                        <Sparkles />
                    </div>

                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8 text-center md:text-left">
                            <h4 className="text-4xl md:text-6xl font-serif font-bold italic leading-tight">Besondere <br /> Wünsche?</h4>
                            <p className="text-zinc-400 text-lg font-medium leading-relaxed">
                                Unsere Küche geht gerne auf Ihre individuellen Bedürfnisse und Allergien ein. Sprechen Sie uns einfach an.
                            </p>
                        </div>
                        <div className="flex flex-col items-center md:items-end gap-8">
                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Portionen</p>
                                    <p className="text-sm font-bold italic font-serif">Kleinere Portion möglich</p>
                                </div>
                                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-[#8D0046]">
                                    <span className="text-xl font-black">−2€</span>
                                </div>
                            </div>
                            <a href="tel:+43747263281" className="bg-white text-[#1a1a1a] px-12 py-5 btn-rounded font-black text-xs uppercase tracking-[0.4em] hover:bg-[#8D0046] hover:text-white transition-all active:scale-95 group flex items-center gap-4 cursor-pointer">
                                Jetzt Reservieren <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Utensils, Phone, Clock, MapPin, ChevronRight, Info, Coffee, ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { newsItems } from "@/data/news";
import { fullMenuPlan } from "@/data/menus";

export default function Home() {
  const [today, setToday] = useState<string>("");
  const [lunchMenu, setLunchMenu] = useState<{ text: string, isClosed: boolean }>({ text: "", isClosed: false });
  const [isOpenNow, setIsOpenNow] = useState<boolean>(false);

  const heroImages = [
    "/bilder/steak-fisch-gasthaus-amstetten-winklarn.webp",
    "/bilder/grillen-gasthaus-graf-essen-gastgarten-wirtshaus-restaurant-amstetten-mostviertel-11.webp",
    "/bilder/backhendlsalat-gasthaus-graf.webp"
  ];
  const [currentHeroIdx, setCurrentHeroIdx] = useState(0);

  const calculateStatus = () => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const min = now.getMinutes();
    const time = hour + min / 60;
    const days = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    setToday(days[day]);

    const isRuhetag = day === 2 || day === 3;

    // Find today's menu in the fullMenuPlan
    const dateNum = now.getDate();
    const monthNum = now.getMonth() + 1;
    const dateSearch = `${dateNum}. ${monthNum}.`; // Format: "28. 1."
    const todayMenu = fullMenuPlan.find(m => m.date.includes(dateSearch));

    if (isRuhetag) {
      setLunchMenu({ text: "Heute kein Mittagsmenü - Ruhetag", isClosed: true });
    } else if (todayMenu) {
      setLunchMenu({
        text: `${todayMenu.dish}${todayMenu.side ? ' ' + todayMenu.side : ''}`,
        isClosed: false
      });
    } else {
      setLunchMenu({
        text: "Heute abwechslungsreiches Mittagsbuffet",
        isClosed: false
      });
    }

    let open = false;
    if (day === 1) {
      if (time >= 11 && time < 14.5) open = true;
    } else if (day >= 4 && day <= 6) {
      if ((time >= 11 && time < 14.5) || (time >= 17.5 && time < 22)) open = true;
    } else if (day === 0) {
      if (time >= 9 && time < 15) open = true;
    }
    setIsOpenNow(open && !isRuhetag);
  };

  useEffect(() => {
    calculateStatus();
    const interval = setInterval(calculateStatus, 60000);
    const sliderInterval = setInterval(() => setCurrentHeroIdx((prev) => (prev + 1) % heroImages.length), 6000);
    return () => { clearInterval(interval); clearInterval(sliderInterval); };
  }, []);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#fdfcfb] text-[#1a1a1a] font-sans pb-40">

      {/* HEADER: Fluid Floating */}
      <header className="py-20 px-6 flex flex-col items-center relative z-20" role="banner">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          className="w-24 h-24 relative mb-10 group"
        >
          <div className="absolute inset-0 bg-[#8D0046]/5 rounded-full blur-2xl group-hover:bg-[#8D0046]/10 transition-colors duration-700" />
          <Image src="/bilder/gasthaus-graf-winklarn-mostviertel-essen-regional-kulinarik-logo.webp" alt="Logo Gasthaus Graf" fill className="object-contain relative z-10" priority />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 2 }}
          className="space-y-4 text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Herzlich willkommen bei Familie Graf</p>
          <h1 className="text-4xl md:text-7xl font-serif font-bold tracking-tighter text-[#1a1a1a]">
            Tradition, <span className="text-[#8D0046] italic">die man schmeckt.</span>
          </h1>
        </motion.div>
      </header>

      {/* HERO: Parallax Journey with Harmonic Curves */}
      <section className="relative px-6 mb-32">
        <div className="max-w-7xl mx-auto relative h-[70vh] md:h-[80vh]">

          <motion.div style={{ y: heroY }} className="absolute inset-0 overflow-hidden container-rounded shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentHeroIdx}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image src={heroImages[currentHeroIdx]} alt="Kulinarik Impressionen" fill className="object-cover" priority />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
            className="absolute bottom-12 left-6 right-6 md:left-20 md:right-auto md:bottom-20 glass-effect p-12 md:p-16 btn-rounded shadow-xl z-10 max-w-xl"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className={`w-2 h-2 rounded-full ${isOpenNow ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 'bg-red-500'}`} />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8D0046]">
                {isOpenNow ? 'Jetzt für Sie geöffnet' : (lunchMenu.isClosed ? 'Heute Ruhetag' : 'Derzeit geschlossen')}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1a1a1a] leading-[1.1] mb-8">
              Regional. Saisonal. <br /> <span className="italic">Aus Leidenschaft.</span>
            </h2>
            <div className="flex flex-wrap gap-8 items-center pt-4 border-t border-zinc-100">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Heute ist</p>
                <p className="text-sm font-bold capitalize">{today}</p>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-1">Kategorie</p>
                <p className="text-base font-bold italic font-serif text-[#8D0046]">Mostviertler Wirtshaus</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CORE EXPERIENCE: Fluid Narrative */}
      <main className="max-w-6xl mx-auto px-6 space-y-40">

        {/* LUNCH: Dynamic Glass Card */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          <div className="flex flex-col md:flex-row items-stretch btn-rounded overflow-hidden shadow-2xl">
            <div className={`flex-1 p-12 md:p-24 ${lunchMenu.isClosed ? 'bg-zinc-100 text-zinc-400' : 'bg-magenta-gradient text-white'}`}>
              <div className="flex items-center gap-4 mb-10">
                <Sparkles size={20} className={lunchMenu.isClosed ? 'text-zinc-200' : 'text-white/40'} />
                <span className="text-[11px] font-black uppercase tracking-[0.4em]">{lunchMenu.isClosed ? 'Atempause' : 'Unsere Empfehlung Heute'}</span>
              </div>
              <h3 className="text-4xl md:text-6xl font-serif font-bold italic mb-10 leading-tight">
                {lunchMenu.isClosed ? 'Wir haben heute Ruhetag' : lunchMenu.text}
              </h3>
              {!lunchMenu.isClosed && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-4 bg-white/10 hover:bg-white/20 backdrop-blur-md px-10 py-5 btn-rounded transition-all cursor-pointer border border-white/10"
                >
                  <span className="text-xs font-black uppercase tracking-widest">Inkl. Buffet-Erlebnis</span>
                  <span className="h-4 w-[1px] bg-white/30" />
                  <span className="text-xl font-serif font-black italic">12,–</span>
                </motion.div>
              )}
            </div>
            <div className="w-full md:w-[350px] bg-white p-16 flex flex-col justify-center gap-8 border-l border-zinc-50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-zinc-50 scale-[3] group-hover:text-zinc-100 transition-colors duration-1000">
                <Clock />
              </div>
              <div className="relative z-10">
                <Clock size={40} className="text-[#8D0046] mb-6" />
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[#1a1a1a] mb-2">Servierzeiten</h4>
                <p className="text-3xl font-serif font-bold italic text-[#1a1a1a]">11:00 – 14:30</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#8D0046] mt-4 opacity-50">Laufender Nachschub</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* NAVIGATION TILES: Elegant Asymmetry */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <Link href="/speisen" className="group">
            <div className="aspect-[3/4] relative overflow-hidden container-rounded shadow-xl">
              <Image src="/bilder/backhendlsalat-gasthaus-graf.webp" alt="Speisekarte" fill className="object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-700" />

              <div className="absolute inset-0 flex flex-col justify-end p-12">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white p-10 btn-rounded shadow-2xl relative"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#8D0046] block mb-2">Die Klassiker</span>
                  <div className="flex justify-between items-center">
                    <h4 className="text-3xl font-serif font-bold text-[#1a1a1a]">Speisekarte</h4>
                    <div className="w-12 h-12 rounded-full border border-zinc-100 flex items-center justify-center group-hover:bg-[#8D0046] group-hover:text-white transition-all">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </Link>

          <Link href="/news" className="group md:mt-24">
            <div className="aspect-[3/4] relative overflow-hidden container-rounded shadow-xl">
              <Image src="/bilder/steak-fisch-gasthaus-amstetten-winklarn.webp" alt="Aktuelles" fill className="object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-700" />

              <div className="absolute inset-0 flex flex-col justify-end p-12">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white p-10 btn-rounded shadow-2xl relative border-t-4 border-[#8D0046]"
                >
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 block mb-2">Das Neueste</span>
                  <div className="flex justify-between items-center">
                    <h4 className="text-3xl font-serif font-bold text-[#1a1a1a]">Journal & News</h4>
                    <div className="w-12 h-12 rounded-full border border-zinc-100 flex items-center justify-center group-hover:bg-[#8D0046] group-hover:text-white transition-all">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </Link>
        </section>

        {/* TRUST STRIP: Harmonic Details */}
        <section className="py-24 border-t border-zinc-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#8D0046]/5 rounded-full blur-[100px]" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
            <div className="flex flex-col items-center md:items-start space-y-4">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-[#8D0046]">
                <MapPin size={24} />
              </div>
              <p className="text-2xl font-bold text-[#1a1a1a] font-serif italic">Besuchen Sie uns</p>
              <p className="text-base text-zinc-600 font-medium leading-relaxed">Brücklerweg 1, 3300 Winklarn.<br />Parkplätze direkt vor dem Haus.</p>
            </div>

            <div className="flex flex-col items-center space-y-6">
              <a href="tel:+43747263281" className="group relative">
                <div className="absolute inset-0 bg-[#8D0046] rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="bg-[#8D0046] text-white px-16 py-6 btn-rounded font-black text-xs uppercase tracking-[0.5em] shadow-2xl relative z-10 hover:scale-105 active:scale-95 transition-all">
                  Anrufen
                </div>
              </a>
              <p className="text-sm font-black uppercase tracking-widest text-[#8D0046] animate-pulse">Platz reservieren</p>
            </div>

            <div className="flex flex-col items-center md:items-end space-y-4">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-[#8D0046]">
                <Clock size={24} />
              </div>
              <p className="text-2xl font-bold text-[#1a1a1a] font-serif italic text-right">Öffnungszeiten</p>
              <p className="text-base text-zinc-600 font-bold uppercase tracking-widest text-right leading-loose">
                Mo, Do-Sa: 11:00–14:30 & 17:30+<br />
                So & Feiertag: ab 09:00 Uhr
              </p>
            </div>
          </div>
        </section>

        {/* FOOTER SIGNATURE: Minimal Zen */}
        <footer className="pt-20 pb-10 text-center space-y-12">
          <div className="h-px w-20 bg-zinc-100 mx-auto" />
          <Coffee size={40} strokeWidth={1} className="mx-auto text-zinc-200" />
          <div className="space-y-4">
            <p className="text-base text-zinc-500 font-bold uppercase tracking-[0.6em] transition-all hover:tracking-[0.8em]">Gasthaus Graf</p>
            <p className="text-sm text-zinc-500 font-medium">
              © 2026 • Gasthaus Graf • Umsetzung:{" "}
              <Link href="https://ki-marketingagentur.jetzt/" target="_blank" rel="noopener noreferrer" className="hover:text-[#8D0046] transition-colors">
                Brainstorm KI Werbeagentur
              </Link>
            </p>
          </div>
        </footer>

      </main>
    </div>
  );
}

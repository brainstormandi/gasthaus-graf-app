"use client";

import { useEffect, useState } from "react";
import { Download, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InstallPrompt() {
    const [showPrompt, setShowPrompt] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

    useEffect(() => {
        const isStandalone = typeof window !== 'undefined' && window.matchMedia('(display-mode: standalone)').matches;
        if (isStandalone) return;

        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);

            // Show prompt after 3s only if not dismissed recently
            const lastDismissed = localStorage.getItem("pwa-prompt-dismissed-at");
            const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;

            if (!lastDismissed || (Date.now() - parseInt(lastDismissed) > threeDaysInMs)) {
                setTimeout(() => setShowPrompt(true), 3000);
            }
        };

        window.addEventListener("beforeinstallprompt", handler);

        // iOS detection
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const lastDismissedAt = localStorage.getItem("pwa-prompt-dismissed-at");
        if (isIOS && !isStandalone && (!lastDismissedAt || (Date.now() - parseInt(lastDismissedAt) > 259200000))) {
            setTimeout(() => setShowPrompt(true), 4000);
        }

        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) {
            alert("iOS Installation: Tippen Sie auf das 'Teilen'-Symbol und wählen Sie 'Zum Home-Bildschirm hinzufügen'.");
            handleDismiss();
            return;
        }

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === "accepted") {
            setDeferredPrompt(null);
            setShowPrompt(false);
        }
    };

    const handleDismiss = () => {
        setShowPrompt(false);
        localStorage.setItem("pwa-prompt-dismissed-at", Date.now().toString());
    };

    if (!showPrompt) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: -20, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed bottom-24 left-4 right-4 z-[75] md:hidden"
            >
                <div className="bg-[#1a1a1a] shadow-3xl flex flex-col gap-6 p-8 btn-rounded border-t-2 border-[#8D0046] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-[0.03] scale-[4] translate-x-4 -translate-y-4">
                        <Download />
                    </div>

                    <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-[#8D0046] relative">
                                <Download size={24} />
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-0 bg-[#8D0046]/10 rounded-2xl"
                                />
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#8D0046]">App installieren</span>
                                    <Sparkles size={12} className="text-[#8D0046]/40" />
                                </div>
                                <h4 className="text-white text-lg font-serif font-bold italic leading-none">Gasthaus Graf</h4>
                            </div>
                        </div>
                        <button
                            onClick={handleDismiss}
                            className="w-10 h-10 flex items-center justify-center text-zinc-600 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex flex-col gap-6 relative z-10">
                        <p className="text-zinc-400 text-xs font-medium leading-relaxed">
                            Holen Sie sich den Mittagsplan und exklusive News direkt auf Ihren Startbildschirm.
                        </p>
                        <button
                            onClick={handleInstall}
                            className="bg-white text-[#1a1a1a] w-full py-5 btn-rounded font-black text-[10px] uppercase tracking-[0.5em] shadow-xl hover:bg-[#8D0046] hover:text-white transition-all active:scale-[0.98]"
                        >
                            Jetzt hinzufügen
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

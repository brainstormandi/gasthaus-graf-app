import type { Metadata, Viewport } from "next";
import { Barlow, Lora } from "next/font/google";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Gasthaus Graf - Tradition & Kulinarik in Winklarn",
    template: "%s | Gasthaus Graf"
  },
  description: "Erleben Sie regionale Spezialitäten und traditionelle Hausmannschaft im Gasthaus Graf in Winklarn. Täglich wechselnde Mittagsmenüs, saisonale Speisen und gemütliches Ambiente.",
  keywords: ["Gasthaus Graf", "Winklarn", "Mostviertel", "Mittagsmenü Winklarn", "Restaurant Amstetten", "Regionale Küche", "Essen gehen Amstetten", "Wirtshaus Niederösterreich"],
  manifest: "/manifest.json",
  metadataBase: new URL("https://gasthausgraf.at"),
  alternates: {
    canonical: "/",
  },
  icons: {
    apple: "/bilder/gasthaus-graf-winklarn-mostviertel-essen-regional-kulinarik-logo.webp",
  },
  openGraph: {
    title: "Gasthaus Graf - Tradition & Kulinarik in Winklarn",
    description: "Regional genießen im Herzen des Mostviertels. Entdecken Sie unsere aktuelle Speisekarte und Mittagsmenüs.",
    url: "https://gasthausgraf.at",
    siteName: "Gasthaus Graf",
    locale: "de_AT",
    type: "website",
    images: [
      {
        url: "/bilder/gasthaus-graf-winklarn-mostviertel-essen-regional-kulinarik-logo.webp",
        width: 1200,
        height: 630,
        alt: "Gasthaus Graf Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gasthaus Graf - Tradition & Kulinarik",
    description: "Regional genießen im Herzen des Mostviertels.",
    images: ["/bilder/gasthaus-graf-winklarn-mostviertel-essen-regional-kulinarik-logo.webp"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Gasthaus Graf",
  },
};

export const viewport: Viewport = {
  themeColor: "#8D0046",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

import Navigation from "@/components/Navigation";
import InstallPrompt from "@/components/InstallPrompt";
import JsonLd from "@/components/JsonLd";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${barlow.variable} ${lora.variable}`} suppressHydrationWarning>
      <body className="antialiased pb-24 md:pb-0 md:pt-20 font-sans" suppressHydrationWarning>
        <JsonLd />
        <Navigation />
        <InstallPrompt />
        {children}
      </body>
    </html>
  );
}

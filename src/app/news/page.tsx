import { Metadata } from "next";
import NewsClient from "./NewsClient";

export const metadata: Metadata = {
    title: "News & Aktuelles",
    description: "Bleiben Sie informiert über Events, saisonale Köstlichkeiten und Neuigkeiten aus dem Gasthaus Graf.",
};

export default function NewsPage() {
    return <NewsClient />;
}

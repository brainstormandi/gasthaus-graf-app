import { Metadata } from "next";
import SpeisenClient from "./SpeisenClient";

export const metadata: Metadata = {
    title: "Speisekarte",
    description: "Unsere aktuelle Speisekarte: Regionale Schmankerl, Steaks, Fisch und vegetarische Gerichte im Gasthaus Graf.",
};

export default function SpeisenPage() {
    return <SpeisenClient />;
}

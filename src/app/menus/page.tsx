import { Metadata } from "next";
import MenusClient from "./MenusClient";

export const metadata: Metadata = {
    title: "Mittagsmenü & Wochenplan",
    description: "Der aktuelle Mittagsmenü-Plan im Gasthaus Graf Winklarn. Frisch, regional und preiswert genießen.",
};

export default function MenusPage() {
    return <MenusClient />;
}

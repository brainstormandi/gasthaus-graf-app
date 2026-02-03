import { ChefHat, Utensils, Leaf, Cake, Baby } from "lucide-react";

export const categories = [
    {
        title: "Heisse Suppen",
        icon: Utensils,
        items: [
            { name: "Kräftige Rindsuppe mit Fritatten und Schnittlauch", price: "4,50" },
            { name: "Kräftige Rindsuppe mit hausgemachtem Leberknödel", price: "5,00" },
            { name: "Mostschaumsuppe mit Zimtcroutons", price: "5,00" },
            { name: "Herzhafte Kürbiscremesuppe mit Obershäubchen und Kernöl", price: "5,50" },
        ]
    },
    {
        title: "Vorspeisen & Salate",
        icon: Leaf,
        items: [
            { name: "Zarter Wildschwein Rohschinken", price: "12,50", desc: "aus der Toskana mit Waldorfsalat, Orangen – Mangochutney und frischem Toastbrot" },
            { name: "Geräuchertes Forellenfilet", price: "9,50", desc: "auf Blattsalaten mit Krenobers und frischem Toastbrot" },
            { name: "Mostviertler Schafkäse", price: "7,50", desc: "mit Tomate und Schnittlauch auf kleinem Salatbouquet" },
            { name: "Backhenderlsalat", price: "13,00", desc: "oder gebratene Putenbruststreifen auf Blattsalaten" },
            { name: "Backhenderlsalat auf gemischtem Salat", price: "14,00" },
        ]
    },
    {
        title: "Für unsere Kleinen",
        icon: Baby,
        items: [
            { name: "Kinderschnitzel", price: "7,50", desc: "vom Schweinerücken oder Putenbrust, dazu Pommes frites und Ketchup" },
            { name: "6 Stück Chicken Nuggets", price: "7,00", desc: "serviert mit Pommes frites und Ketchup" },
            { name: "Kleines Putensteak vom Grill", price: "8,50", desc: "mit Reis, buntem Gemüse und Ketchup" },
            { name: "6 Stück Fischstäbchen", price: "7,00", desc: "mit Reis und Sauce Tatare" },
            { name: "Bunte Nudeln", price: "6,00", desc: "mit Tomatensauce" },
        ]
    },
    {
        title: "Wirtshausklassiker",
        icon: ChefHat,
        items: [
            { name: "Gemischter Grillteller", price: "17,50", desc: "dazu Pommes frites, buntes Gemüse und Kräuterbutter" },
            { name: "Klassisches Putencordon bleu", price: "16,00", desc: "serviert mit Pommes frites und Preiselbeeren" },
            { name: "Wiener Schnitzel", price: "14,00", desc: "vom Schweinerücken oder Putenbrust serviert mit Petersilienkartoffeln" },
            { name: "Bauerncordon bleu", price: "17,50", desc: "vom Schweinerücken, gefüllt mit Speck, Zwiebel und Bergkäse, dazu hausgemachte Rosmarin Wedges und Preiselbeeren" },
            { name: "„Holzhackersteak“", price: "26,50", desc: "Rumpsteak vom Jungstier mit Speck und Spiegelei, dazu hausgemachte Rosmarin Wedges, Gemüse und BBQ Dip" },
            { name: "Winklarner Mostbraten", price: "17,00", desc: "mit Serviettenknödel und warmem Speckkrautsalat" },
        ]
    },
    {
        title: "Vegetarisch & Fisch",
        icon: Leaf,
        items: [
            { name: "Bunte Woknudeln (leicht scharf)", price: "14,50", desc: "mit vegetarischem grünen Curry und Gemüse" },
            { name: "Hausgemachte Dinkel – Gemüselaibchen", price: "14,50", desc: "auf Rahmschwammerl, dazu Reis und buntes Gemüse" },
            { name: "Knusprige Vegane Quinoa-Gemüsefrühlingsrollen", price: "15,00", desc: "serviert mit Reis, buntem Gemüse und Chillidip" },
            { name: "Graf´s Gemüseplatte", price: "15,50", desc: "mit hausgemachten Rosmarin Wedges, Spiegelei, gebackenen Champignons, Gemüselaibchen und Kräuterdip" },
            { name: "Buntbarschfilets im Körndlmantel gebacken", price: "17,50", desc: "dazu Reis, buntes Gemüse und Sauce Tatare" },
            { name: "Dazu ein Salatschüsserl vom Buffet", price: "4,00" },
        ]
    },
    {
        title: "Mehlspeisen",
        icon: Cake,
        items: [
            { name: "Hausgemachtes Schokosoufflé", price: "8,00", desc: "mit Vanilleeis" },
            { name: "Gebackene Topfentorte", price: "5,00", desc: "mit Vanillesauce, fein garniert" },
            { name: "Dubai Tiramisu im Glas", price: "8,00", desc: "fruchtig garniert" },
            { name: "Schoko – Waffelherzen am Stiel", price: "8,50", desc: "mit Mangosorbet" },
            { name: "Lauwarme Mohn – Nusstorte", price: "5,00", desc: "mit Schokosauce" },
            { name: "Eispalatschinke", price: "8,00", desc: "mit Schokosauce und Schlagobers" },
            { name: "Eiskaffee", price: "7,00" },
        ]
    }
];

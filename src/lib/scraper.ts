import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

const MENU_URL = 'https://gasthausgraf.at/mittagsmenue-mittagessen-gasthaus-wirtshaus-graf-amstetten-mostsviertel/';
const DATA_PATH = path.join(process.cwd(), 'src/data/menus.json');

export interface MenuItem {
    date: string;
    dish: string;
    side: string;
}

export async function scrapeMenus(): Promise<MenuItem[]> {
    try {
        const response = await fetch(MENU_URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            next: { revalidate: 0 } // Always fetch fresh from source when scraping
        });
        const html = await response.text();
        const $ = cheerio.load(html);

        const menus: MenuItem[] = [];
        const seen = new Set<string>();
        const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];

        $('.wpb_wrapper').each((_, wrapper) => {
            const contentText = $(wrapper).text();
            const lines = contentText.split('\n');

            lines.forEach(line => {
                const trimmedLine = line.trim();
                if (!trimmedLine) return;

                const dayMatch = days.find(day => trimmedLine.startsWith(day));
                if (dayMatch) {
                    const datePartMatch = trimmedLine.match(/^([A-Za-z]+(?:,|\.)?\s*\d+\.\s*\d+\.?)/);
                    if (datePartMatch) {
                        const datePart = datePartMatch[0];
                        let rest = trimmedLine.replace(datePart, '').trim();
                        if (rest.startsWith(':')) rest = rest.substring(1).trim();

                        const shortDay = dayMatch.substring(0, 2).toUpperCase();
                        const dateNums = datePart.split(',')[1]?.trim() || "";

                        let dish = rest;
                        let side = "";

                        if (rest === "Energieferien" || rest === "Betriebsurlaub" || rest === "Ruhetag") {
                            dish = rest;
                            side = "Geschlossen";
                        } else {
                            const splitters = [' mit ', ' und ', ' , ', ', '];
                            for (const splitter of splitters) {
                                const index = rest.toLowerCase().indexOf(splitter);
                                if (index !== -1) {
                                    dish = rest.substring(0, index).trim();
                                    side = rest.substring(index).trim();
                                    if (side.startsWith(',') || side.startsWith(' mit') || side.startsWith(' und')) {
                                        side = side.replace(/^[, ]+/, '').trim();
                                    }
                                    break;
                                }
                            }
                        }

                        // Fallback logic if no splitter found but length is reasonable
                        if (side === "" && dish.length > 50 && dish.includes(',')) {
                            // Try to split by last comma
                            const lastComma = dish.lastIndexOf(',');
                            if (lastComma > 10) {
                                const potentialDish = dish.substring(0, lastComma).trim();
                                const potentialSide = dish.substring(lastComma + 1).trim();
                                dish = potentialDish;
                                side = potentialSide;
                            }
                        }


                        const menuKey = `${shortDay}-${dateNums}-${dish}`;
                        if (!seen.has(menuKey)) {
                            menus.push({
                                date: `${shortDay}, ${dateNums}`,
                                dish: dish,
                                side: side
                            });
                            seen.add(menuKey);
                        }
                    }
                }
            });
        });

        // Only write to file in development mode
        if (process.env.NODE_ENV === 'development' && menus.length > 0) {
            try {
                const dir = path.dirname(DATA_PATH);
                if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
                fs.writeFileSync(DATA_PATH, JSON.stringify(menus, null, 2));
                const tsContent = `export const fullMenuPlan = ${JSON.stringify(menus, null, 4)};\n`;
                fs.writeFileSync(path.join(process.cwd(), 'src/data/menus.ts'), tsContent);
            } catch (err) {
                console.warn('Could not write local menu files:', err);
            }
        }

        return menus;
    } catch (error) {
        console.error('Scraping error:', error);
        throw error;
    }
}

export interface NewsItem {
    id: string; // Changed to string to generate unique IDs
    title: string;
    date: string;
    excerpt: string;
    image: string;
}

export async function scrapeNews(): Promise<NewsItem[]> {
    try {
        const response = await fetch('https://gasthausgraf.at/', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            next: { revalidate: 0 }
        });
        const html = await response.text();
        const $ = cheerio.load(html);

        const news: NewsItem[] = [];
        const seenIds = new Set<string>();

        // 1. HERO SECTION: "Wir sind auf der Suche..." / "Gasthaus Graf" intro text
        // Usually in a wpb_text_column that contains "Wir wünschen" or "Suche"
        $('.wpb_text_column').each((_, elem) => {
            let text = $(elem).text();
            if (text.includes("Wir sind auf der Suche") || text.includes("Service – Mitarbeiter") || text.includes("Wir wünschen Ihnen viel Spaß")) {
                // Determine a title
                let title = "Job-Angebot";
                const $h1 = $(elem).find('h1');
                if ($h1.length > 0) title = $h1.text().trim();
                if (title === "Gasthaus Graf") title = "Allgemeines & Jobs"; // Rename for better context

                // Clean text: Remove everything before "Wir sind auf der Suche" if present
                const searchPhrase = "Wir sind auf der Suche";
                const index = text.indexOf(searchPhrase);
                if (index !== -1) {
                    text = text.substring(index);
                } else {
                    text = text.replace("Gasthaus Graf", "").trim();
                }

                let excerpt = text.trim();
                excerpt = excerpt.substring(0, 400) + (excerpt.length > 400 ? "..." : "");

                const id = "hero-news-job";
                if (!seenIds.has(id)) {
                    news.push({
                        id,
                        title,
                        date: "Wichtig",
                        excerpt,
                        image: "/bilder/gasthaus-graf-winklarn-mostviertel-essen-regional-kulinarik-logo.webp" // Default logo
                    });
                    seenIds.add(id);
                }
            }
        });

        // 2. FOOTER CARDS: H2 headings in wpb_wrapper
        $('.wpb_wrapper').each((_, wrapper) => {
            const $wrapper = $(wrapper);
            const $h2s = $wrapper.find('h2');

            // Iterate EACH H2 individually to prevent merging multiple items in one wrapper
            $h2s.each((_, h2) => {
                const $h2 = $(h2);
                const title = $h2.text().trim();

                // Exclude truly irrelevant or static sections
                const exclusionKeywords = [
                    "Kontakt", "Öffnungszeiten", "Impressum", "Datenschutz", "Sitemap",
                    "Suche", "Navigation", "Weihnachten", "Silvester", "Wildwochen",
                    "Urlaub", "Betriebsurlaub", "Ruhetag", "Speisekarte", "Mittagsmenü",
                    "Sensalation", "Grillabend", "Baustelle", "Trotz Baustelle"
                ];

                // Skip if exact title is "Gasthaus Graf" (unless it wasn't caught above, but usually that's the main header)
                if (title === "Gasthaus Graf") return;

                if (exclusionKeywords.some(keyword => title.includes(keyword))) return;

                // Find content text and image: Siblings after THIS h2 until the next h2
                let excerpt = "";
                let image = "";

                // Get all next siblings until the next h2
                $h2.nextUntil('h2').each((_, nextElem) => {
                    const $elem = $(nextElem);

                    // Get Text
                    const t = $elem.text().trim();
                    if (t && t !== title && !excerpt.includes(t.substring(0, 15))) {
                        excerpt += t + " ";
                    }

                    // Get Image (if not already found for this section)
                    if (!image) {
                        const img = $elem.find('img');
                        if (img.length > 0) image = img.attr('src') || "";
                        else if ($elem.is('img')) image = $elem.attr('src') || "";
                    }
                });

                // Fallback if nextUntil didn't return good text (e.g. text is inside a div immediately after)
                if (!excerpt || excerpt.length < 5) {
                    const nextText = $h2.next().text().trim();
                    if (nextText && nextText !== title) excerpt = nextText;
                }

                excerpt = excerpt.trim().substring(0, 300) + (excerpt.length > 300 ? "..." : "");
                if (excerpt.length < 10) return; // Skip if no real content found


                // Fallback images based on title keywords only if really no image found
                if (!image) {
                    if (title.toLowerCase().includes("steak") || title.toLowerCase().includes("fisch")) image = "/bilder/steak-fisch-gasthaus-amstetten-winklarn.webp";
                    else if (title.toLowerCase().includes("garten") || title.toLowerCase().includes("grill")) image = "/bilder/grillen-gasthaus-graf-essen-gastgarten-wirtshaus-restaurant-amstetten-mostviertel-11.webp";
                    else if (title.toLowerCase().includes("landesausstellung")) image = "/bilder/gasthaus-graf-winklarn-mostviertel-essen-regional-kulinarik-logo.webp"; // Or placeholder
                    else image = "/bilder/gasthaus-graf-winklarn-mostviertel-essen-regional-kulinarik-logo.webp";
                }

                if (title && excerpt) {
                    const id = title.toLowerCase().replace(/[^a-z0-9]/g, '-');

                    if (!seenIds.has(id)) {
                        news.push({
                            id,
                            title,
                            date: "Aktuell",
                            excerpt,
                            image
                        });
                        seenIds.add(id);
                    }
                }
            });
        });

        // Dedup and sort? 
        // Logic aims to put Hero first if pushed first.
        return news;

    } catch (error) {
        console.error('News scraping error:', error);
        return [];
    }
}

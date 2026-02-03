import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

const MENU_URL = 'https://gasthausgraf.at/mittagsmenue-mittagessen-gasthaus-wirtshaus-graf-amstetten-mostsviertel/';
const DATA_PATH = path.join(process.cwd(), 'src/data/menus.json');
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';

export interface MenuItem {
    date: string;
    dish: string;
    side: string;
}

export async function scrapeMenus(): Promise<MenuItem[]> {
    try {
        const response = await fetch(MENU_URL, {
            headers: {
                'User-Agent': USER_AGENT
            },
            next: { revalidate: 0 }
        } as any);
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
    id: string;
    title: string;
    date: string;
    excerpt: string;
    image: string;
}

export async function scrapeNews(): Promise<NewsItem[]> {
    const news: NewsItem[] = [];
    const seenIds = new Set<string>();



    // 1. HERO NEWS (from Homepage)
    try {
        const res = await fetch('https://gasthausgraf.at/', {
            headers: { 'User-Agent': USER_AGENT },
            next: { revalidate: 0 }
        } as any);
        const html = await res.text();
        const $ = cheerio.load(html);

        $('.wpb_text_column').each((_, elem) => {
            let text = $(elem).text();
            if (text.includes("Wir sind auf der Suche") || text.includes("Service – Mitarbeiter")) {
                const searchPhrase = "Wir sind auf der Suche";
                const index = text.indexOf(searchPhrase);
                if (index !== -1) {
                    text = text.substring(index);
                } else {
                    text = text.replace("Gasthaus Graf", "").trim();
                }

                let excerpt = text.trim();
                excerpt = excerpt.substring(0, 400);

                let image = "";
                const $row = $(elem).closest('.vc_row, .row');
                if ($row.length > 0) {
                    const img = $row.find('img');
                    if (img.length > 0) image = img.attr('src') || img.attr('data-src') || "";
                }
                if (image && image.startsWith('/')) image = `https://gasthausgraf.at${image}`;
                if (!image) image = "/bilder/gasthaus-graf-winklarn-mostviertel-essen-regional-kulinarik-logo.webp";

                if (!seenIds.has("hero-news-job")) {
                    news.push({
                        id: "hero-news-job",
                        title: "Job-Angebot",
                        date: "Wichtig",
                        excerpt,
                        image
                    });
                    seenIds.add("hero-news-job");
                }
            }
        });
    } catch (e) {
        console.error("Hero scrape error:", e);
    }

    // 2. EVENT NEWS (from Events Page)
    try {
        const res = await fetch('https://gasthausgraf.at/events/', {
            headers: { 'User-Agent': USER_AGENT },
            next: { revalidate: 0 }
        } as any);
        const html = await res.text();
        const $ = cheerio.load(html);

        $('.wpb_wrapper').each((_, wrapper) => {
            const $wrapper = $(wrapper);
            const $h2s = $wrapper.find('h2');

            $h2s.each((_, h2) => {
                const $h2 = $(h2);
                const title = $h2.text().trim();
                if (!title || title === "Events" || title === "Gasthaus Graf") return;

                let excerpt = "";
                let image = "";

                // Get content around this H2
                $h2.prevUntil('h2').each((_, el) => {
                    const $el = $(el);
                    if (!image) {
                        const img = $el.find('img');
                        if (img.length > 0) image = img.attr('src') || img.attr('data-src') || "";
                        else if ($el.is('img')) image = $el.attr('src') || $el.attr('data-src') || "";
                    }
                });

                $h2.nextUntil('h2').each((_, el) => {
                    const $el = $(el);
                    const t = $el.text().trim();
                    if (t && t !== title && !excerpt.includes(t.substring(0, 15))) excerpt += t + " ";
                    if (!image) {
                        const img = $el.find('img');
                        if (img.length > 0) image = img.attr('src') || img.attr('data-src') || "";
                        else if ($el.is('img')) image = $el.attr('src') || $el.attr('data-src') || "";
                    }
                });

                if (!excerpt) excerpt = $h2.next().text().trim();
                excerpt = excerpt.trim().substring(0, 400);
                if (excerpt.length < 10) return;

                if (image && image.startsWith('/')) image = `https://gasthausgraf.at${image}`;
                if (!image) {
                    if (title.toLowerCase().includes("steak") || title.toLowerCase().includes("fisch")) image = "/bilder/steak-fisch-gasthaus-amstetten-winklarn.webp";
                    else image = "/bilder/gasthaus-graf-winklarn-mostviertel-essen-regional-kulinarik-logo.webp";
                }

                const id = title.toLowerCase().replace(/[^a-z0-9]/g, '-');
                if (!seenIds.has(id)) {
                    news.push({ id, title, date: "Aktuell", excerpt, image });
                    seenIds.add(id);
                }
            });
        });
    } catch (e) {
        console.error("Events scrape error:", e);
    }

    return news;
}

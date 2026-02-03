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
                    const datePartMatch = trimmedLine.match(/^([A-Za-z]+, \d+\. \d+\.|\w+, \d+\.\d+\.)/);
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

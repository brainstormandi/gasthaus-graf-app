import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

const TARGET_URL = 'https://gasthofgraf.at/';
const OUTPUT_FILE = path.join(process.cwd(), '.tmp', 'data.json');

async function scrapeData() {
    try {
        const { data } = await axios.get(TARGET_URL);
        const $ = cheerio.load(data);

        const result = {
            lastUpdated: new Date().toISOString(),
            openingHours: [],
            menuHighlights: [],
            events: []
        };

        // Scrape Opening Hours (Example logic based on content found earlier)
        // This will need adjustment once we see the actual HTML structure
        $('.opening-hours, .oeffnungszeiten').each((_, el) => {
            result.openingHours.push($(el).text().trim());
        });

        // Scrape Menu Highlights
        $('.menu, .speisekarte, .highlights').each((_, el) => {
            result.menuHighlights.push($(el).text().trim());
        });

        // Ensure .tmp directory exists
        if (!fs.existsSync(path.dirname(OUTPUT_FILE))) {
            fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
        }

        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2));
        console.log('Successfully scraped and saved data to .tmp/data.json');

    } catch (error) {
        console.error('Error during scraping:', error);
    }
}

scrapeData();

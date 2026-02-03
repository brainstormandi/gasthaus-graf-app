import * as cheerio from 'cheerio';

async function testScrape() {
    const res = await fetch('https://gasthausgraf.at/events/', {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    });
    const html = await res.text();
    const $ = cheerio.load(html);

    console.log('--- Page Title:', $('title').text());

    console.log('--- Searching for H2s ---');
    $('h2').each((i, el) => {
        console.log(`Found H2: "${$(el).text().trim()}"`);
    });

    console.log('--- Searching for .wpb_wrapper H2s ---');
    $('.wpb_wrapper h2').each((i, el) => {
        console.log(`Found .wpb_wrapper H2: "${$(el).text().trim()}"`);
    });

    if (html.includes('Steaks & Fisch')) {
        console.log('SUCCESS: found "Steaks & Fisch" in raw HTML');
    } else {
        console.log('FAILURE: "Steaks & Fisch" not found in raw HTML');
    }
}

testScrape();

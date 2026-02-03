const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function debug() {
    const res = await fetch('https://gasthausgraf.at/events/', {
        headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const html = await res.text();
    const $ = cheerio.load(html);

    console.log('--- H2 Elements ---');
    $('h2').each((i, el) => {
        console.log(`H2: ${$(el).text().trim()}`);
    });

    console.log('--- Checking for specific text ---');
    if (html.includes('Steaks & Fisch')) {
        console.log('Found "Steaks & Fisch" in HTML');
    } else {
        console.log('NOT Found "Steaks & Fisch" in HTML');
    }
}

debug();

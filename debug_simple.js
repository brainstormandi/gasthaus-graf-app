async function debug() {
    const res = await fetch('https://gasthausgraf.at/events/', {
        headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const html = await res.text();
    console.log('--- HTML Length:', html.length);
    console.log('--- Includes Steaks & Fisch?', html.includes('Steaks & Fisch'));
    console.log('--- Includes Landesausstellung?', html.includes('Landesausstellung'));

    // Extract H2s with regex since I can't easily use cheerio in a quick script
    const h2s = html.match(/<h2[^>]*>(.*?)<\/h2>/g);
    if (h2s) {
        console.log('--- H2s found:', h2s.length);
        h2s.slice(0, 10).forEach(h2 => console.log('H2:', h2.replace(/<[^>]*>/g, '').trim()));
    } else {
        console.log('--- No H2s found');
    }
}
debug();

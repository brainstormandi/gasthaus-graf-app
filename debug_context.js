async function debug() {
    const res = await fetch('https://gasthausgraf.at/events/', {
        headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const html = await res.text();

    // Find context of 'Steaks'
    const index = html.indexOf('Steaks');
    if (index !== -1) {
        console.log('--- Context around Steaks ---');
        console.log(html.substring(index - 200, index + 400));
    }
}
debug();

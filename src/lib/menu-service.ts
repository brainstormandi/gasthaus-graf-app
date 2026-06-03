import { scrapeMenus, scrapeNews, scrapeSpeisen } from './scraper';

// export const getMenus = unstable_cache(
//     async () => {
//         console.log('Fetching fresh menus from source...');
//         return await scrapeMenus();
//     },
//     ['menus-cache'],
//     {
//         tags: ['menus'],
//         revalidate: 86400 // Fallback revalidation every 24 hours
//     }
// );

export const getMenus = async () => {
    return await scrapeMenus();
};

export const getSpeisen = async () => {
    return await scrapeSpeisen();
};

export const getNews = async () => {
    return await scrapeNews();
};

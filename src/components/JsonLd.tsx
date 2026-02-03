"use client";

export default function JsonLd() {
    const businessData = {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "name": "Gasthaus Graf",
        "image": "https://gasthausgraf.at/bilder/gasthaus-graf-winklarn-mostviertel-essen-regional-kulinarik-logo.webp",
        "@id": "https://gasthausgraf.at",
        "url": "https://gasthausgraf.at",
        "telephone": "+43747263281",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Brücklerweg 1",
            "addressLocality": "Winklarn",
            "postalCode": "3300",
            "addressCountry": "AT"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 48.1167,
            "longitude": 14.85
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Monday",
                "opens": "11:00",
                "closes": "14:30"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Thursday", "Friday", "Saturday"],
                "opens": "11:00",
                "closes": "22:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Sunday",
                "opens": "09:00",
                "closes": "15:00"
            }
        ],
        "servesCuisine": ["Austrian", "Regional", "Traditional"],
        "priceRange": "$$",
        "menu": "https://gasthausgraf.at/speisen",
        "acceptsReservations": "true"
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(businessData) }}
        />
    );
}

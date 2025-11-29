// app/routes/sitemap.xml.tsx
import { LoaderFunction } from "@remix-run/node";
import { config, getBusinessByCategoryAndCity, getBusinessCategoryAndCity, sanitizeWord } from "~/lib/lib";

export const loader: LoaderFunction = async ({ params }) => {

    const baseUrl = config.BASE_URL

    const { category } = params;
    const { city } = params;

    const items = await getBusinessCategoryAndCity();

    const homeUrl = `<url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`

    const urls = items?.map((item: any, index: number) =>
        `<url>
        <loc>${baseUrl}/web/${item.category}/${sanitizeWord(item.city)}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>`
    )
        .join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${homeUrl}  
    ${urls}
  </urlset>`;

    return new Response(sitemap, {
        headers: { "Content-Type": "application/xml" },
    });
};

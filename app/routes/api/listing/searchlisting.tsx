import { LoaderFunction } from "@remix-run/node"
import { DoResponse } from "~/lib/lib"
import { query } from "../DB"

export const loader: LoaderFunction = async ({ request, params }) => {
    const ITEMS_PER_PAGE = 20;

    try {
        const url = new URL(request.url);
        const searchParams = {
            criteria: url.searchParams.get("q") || "",
            category: url.searchParams.get("category") || "",
            city: url.searchParams.get("city") || "",
            state: url.searchParams.get("state") || "",
            country: url.searchParams.get("country") || "",
            page: Math.max(1, Number(url.searchParams.get("page")) || 1)
        };

        const offset = (searchParams.page - 1) * ITEMS_PER_PAGE;

        // Build query dynamically
        const { baseQuery, countQuery, params: queryParams } = buildSearchQuery(searchParams);

        // Get total count
        const countResult = await query(countQuery, queryParams);
        const totalItems = countResult[0]?.total || 0;

        // Get paginated results
        const dataQuery = `${baseQuery} ORDER BY d.date_created DESC LIMIT ? OFFSET ?`;
        const rows = await query(dataQuery, [...queryParams, ITEMS_PER_PAGE, offset]);

        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

        return DoResponse({
            items: rows,
            pagination: {
                currentPage: searchParams.page,
                totalPages,
                totalItems,
                itemsPerPage: ITEMS_PER_PAGE,
                hasNext: searchParams.page < totalPages,
                hasPrev: searchParams.page > 1,
            }
        }, 200);

    } catch (error: any) {
        console.error("Search error:", error.message);
        return DoResponse({ error: "Internal server error" }, 500);
    }
};

// Helper function to build queries safely
function buildSearchQuery(params: any) {
    const conditions: string[] = ["d.active_status = true"];
    const queryParams: any[] = [];

    if (params.criteria) {
        conditions.push(`(
            d.title LIKE ? OR d.short_description LIKE ? OR 
            d.address_one LIKE ? OR d.address_two LIKE ? OR
            d.category LIKE ? OR co.iso2 LIKE ? OR
            st.iso2 LIKE ? OR ci.name LIKE ?
        )`);
        const likePattern = `%${params.criteria}%`;
        queryParams.push(...Array(8).fill(likePattern));
    }

    if (params.category) {
        conditions.push("d.category LIKE ?");
        queryParams.push(`%${params.category}%`);
    }

    if (params.country) {
        conditions.push("co.iso2 LIKE ?");
        queryParams.push(`%${params.country}%`);
    }

    if (params.state) {
        conditions.push("st.iso2 LIKE ?");
        queryParams.push(`%${params.state}%`);
    }

    if (params.city) {
        conditions.push("ci.name LIKE ?");
        queryParams.push(`%${params.city}%`);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    /* const baseQuery = `
        SELECT
            d.id, d.username, d.gid, d.title, d.short_description, d.phone,
            d.category, d.established, d.address_one, d.address_two, d.website,
            d.date_created, co.name AS country_name, co.iso2 AS country_code,
            st.name AS state_name, st.iso2 AS state_code, ci.name AS city_name,
            b.image_url, bg.image_url AS bg_image_url,
            r.average_rating, r.total_reviews, d.currency, d.minimum_amount,
            (
                SELECT GROUP_CONCAT(
                    CONCAT(sm.media_id, '$', sm.user_description, '$', sysm.base_url) 
                    SEPARATOR ', '
                )
                FROM tbl_selected_social_media sm
                JOIN tbl_sys_social_media sysm ON sm.media_id = sysm.media_id
                WHERE d.gid = sm.business_guid
            ) AS social_media
        FROM tbl_dir d
        LEFT JOIN tbl_country co ON co.iso2 = d.country_code
        LEFT JOIN tbl_state st ON st.iso2 = d.state_code AND st.country_code = d.country_code
        LEFT JOIN tbl_city ci ON ci.id = d.city_id
        LEFT JOIN tbl_business_profile_image b ON d.gid = b.business_guid
        LEFT JOIN tbl_business_profile_bg bg ON d.gid = bg.business_guid
        LEFT JOIN (
            SELECT business_guid, 
                   ROUND(AVG(rating), 1) AS average_rating,
                   COUNT(*) AS total_reviews
            FROM tbl_rating
            GROUP BY business_guid
        ) r ON d.gid = r.business_guid
        ${whereClause}
    `; */

    const baseQuery = `
        SELECT
            d.id, d.username, d.gid, d.title, d.short_description, d.phone,
            d.category, d.established, d.address_one, d.address_two, d.website,
            d.date_created, co.name AS country_name, co.iso2 AS country_code,
            st.name AS state_name, st.iso2 AS state_code, ci.name AS city_name,
            b.image_url, bg.image_url AS bg_image_url, bg.image_url AS bg_image_url_ext, b.image_url AS profile_image_url_ext,
            r.avg_rating, r.count_of_rating, d.currency, d.minimum_amount,
            (
                SELECT GROUP_CONCAT(
                    CONCAT(sm.media_id, '$', sm.user_description, '$', sysm.base_url) 
                    SEPARATOR ', '
                )
                FROM tbl_selected_social_media sm
                JOIN tbl_sys_social_media sysm ON sm.media_id = sysm.media_id
                WHERE d.gid = sm.business_guid
            ) AS social_media
        FROM tbl_dir d
        LEFT JOIN tbl_country co ON co.iso2 = d.country_code
        LEFT JOIN tbl_state st ON st.iso2 = d.state_code AND st.country_code = d.country_code
        LEFT JOIN tbl_city ci ON ci.id = d.city_id
        LEFT JOIN tbl_business_profile_image b ON d.gid = b.business_guid
        LEFT JOIN tbl_business_profile_bg bg ON d.gid = bg.business_guid
        LEFT JOIN tbl_business_rating_summary r ON d.gid = r.business_guid
        ${whereClause}
    `;

    console.log(baseQuery)

    const countQuery = `
        SELECT COUNT(*) as total
        FROM tbl_dir d
        LEFT JOIN tbl_country co ON co.iso2 = d.country_code
        LEFT JOIN tbl_state st ON st.iso2 = d.state_code AND st.country_code = d.country_code
        LEFT JOIN tbl_city ci ON ci.id = d.city_id
        ${whereClause}
    `;



    return { baseQuery, countQuery, params: queryParams };
}
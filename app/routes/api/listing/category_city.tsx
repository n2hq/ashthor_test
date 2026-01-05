import { LoaderFunction } from "@remix-run/node"
import { convertDashToSpace, DoResponse } from "~/lib/lib"
import { query } from "../DB"

export const loader: LoaderFunction = async ({ request, params }) => {
    const ITEMS_PER_PAGE = 20;
    const contentType = request.headers.get("Content-Type")

    try {
        const url = new URL(request.url);
        const searchParams = {
            criteria: url.searchParams.get("q") || "",
            page: Math.max(1, Number(url.searchParams.get("page")) || 1)
        };

        const offset = (searchParams.page - 1) * ITEMS_PER_PAGE;

        const category = params.category
        const city_param = params.city || ""
        const city = convertDashToSpace(city_param)

        // 1. FIRST: Get TOTAL COUNT
        const countResult: any = await query(`
            SELECT COUNT(DISTINCT d.id) as total_count
            FROM tbl_dir d
            LEFT JOIN tbl_city ci ON d.city_id = ci.id
            WHERE d.category = ?  
            AND ci.name = ?
            ${searchParams.criteria ? `AND (d.title LIKE ? OR d.short_description LIKE ?)` : ''}
        `, [
            category,
            city,
            ...(searchParams.criteria ? [`%${searchParams.criteria}%`, `%${searchParams.criteria}%`] : [])
        ]);

        const totalCount = countResult[0]?.total_count || 0;
        const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

        // 2. SECOND: Get PAGINATED DATA
        const rawdata: any = await query(`
            SELECT
                d.id,
                d.rating_total,
                d.established,
                d.rating_count,
                d.rating_average,
                d.username,
                d.gid,
                d.title,
                d.address_one,
                d.address_two,
                c.latitude,
                c.longitude,
                d.phone,
                d.email_address AS email_address,
                d.website,
                d.short_description AS short_description,
                d.category,
                d.country_code,
                d.state_code,
                d.city_id,
                d.date_created AS created_at,
                d.last_updated AS updated_at,
                ci.name AS city_name,
                s.name AS state_name,
                c.name AS country_name,
                (
                    SELECT bpi2.image_url
                    FROM tbl_business_profile_image bpi2
                    WHERE bpi2.business_guid = d.gid
                    ORDER BY bpi2.date_created DESC
                    LIMIT 1
                ) AS image_url,
                (
                    SELECT GROUP_CONCAT(
                    CONCAT(sm.media_id, '$', sm.user_description, '$', sysm.base_url)
                    SEPARATOR ', '
                    )
                    FROM tbl_selected_social_media sm
                    JOIN tbl_sys_social_media sysm ON sm.media_id = sysm.media_id
                    WHERE d.gid = sm.business_guid
                ) AS social_media,
                -- Use subquery for operating hours instead of JOIN
                (
                    SELECT open_status FROM tbl_operating_hours
                    WHERE business_guid = d.gid ORDER BY id DESC LIMIT 1
                ) as open_status,
                (
                    SELECT no_hours_available FROM tbl_operating_hours
                    WHERE business_guid = d.gid ORDER BY id DESC LIMIT 1
                ) as no_hours_available,
                -- ADDED: Profile image
                (
                    SELECT bpi3.image_url 
                    FROM tbl_business_profile_image bpi3
                    WHERE bpi3.business_guid = d.gid 
                    ORDER BY bpi3.date_created DESC 
                    LIMIT 1
                ) AS profile_image_url_ext,
                -- ADDED: Background image
                (
                    SELECT bbg.image_url 
                    FROM tbl_business_profile_bg bbg
                    WHERE bbg.business_guid = d.gid 
                    ORDER BY bbg.date_created DESC 
                    LIMIT 1
                ) AS bg_image_url_ext,
                -- ADDED: More operating hours fields
                (
                    SELECT always_open FROM tbl_operating_hours
                    WHERE business_guid = d.gid ORDER BY id DESC LIMIT 1
                ) as always_open,
                (
                    SELECT permanently_closed FROM tbl_operating_hours
                    WHERE business_guid = d.gid ORDER BY id DESC LIMIT 1
                ) as permanently_closed,
                (
                    SELECT temporarily_closed FROM tbl_operating_hours
                    WHERE business_guid = d.gid ORDER BY id DESC LIMIT 1
                ) as temporarily_closed,
                (
                    SELECT open_selected_hours FROM tbl_operating_hours
                    WHERE business_guid = d.gid ORDER BY id DESC LIMIT 1
                ) as open_selected_hours
            FROM tbl_dir d
            LEFT JOIN tbl_country c ON d.country_code = c.iso2
            LEFT JOIN tbl_state s ON d.state_code = s.iso2 AND d.country_code = s.country_code
            LEFT JOIN tbl_city ci ON d.city_id = ci.id
            WHERE d.category = ?
            AND ci.name = ?
            ${searchParams.criteria ? `AND (d.title LIKE ? OR d.short_description LIKE ?)` : ''}
            AND d.active_status = true
            ORDER BY d.date_created DESC
            LIMIT ? OFFSET ?
        `, [
            category,
            city,
            ...(searchParams.criteria ? [`%${searchParams.criteria}%`, `%${searchParams.criteria}%`] : []),
            ITEMS_PER_PAGE,
            offset
        ]);

        // 3. Get complete operating hours separately for businesses that have them
        const businessIds = rawdata.map((b: any) => b.gid);
        let operatingHours: any = {};

        if (businessIds.length > 0) {
            const ohResult: any = await query(`
                SELECT 
                    business_guid,
                    MAX(monday_from) as monday_from,
                    MAX(monday_to) as monday_to,
                    MAX(tuesday_from) as tuesday_from,
                    MAX(tuesday_to) as tuesday_to,
                    MAX(wednesday_from) as wednesday_from,
                    MAX(wednesday_to) as wednesday_to,
                    MAX(thursday_from) as thursday_from,
                    MAX(thursday_to) as thursday_to,
                    MAX(friday_from) as friday_from,
                    MAX(friday_to) as friday_to,
                    MAX(saturday_from) as saturday_from,
                    MAX(saturday_to) as saturday_to,
                    MAX(sunday_from) as sunday_from,
                    MAX(sunday_to) as sunday_to
                FROM tbl_operating_hours
                WHERE business_guid IN (?)
                GROUP BY business_guid
            `, [businessIds]);

            // Convert to map for easy lookup
            operatingHours = ohResult.reduce((acc: any, oh: any) => {
                acc[oh.business_guid] = oh;
                return acc;
            }, {});
        }

        // 4. Combine business data with operating hours
        const combinedData = rawdata.map((business: any) => ({
            ...business,
            ...(operatingHours[business.gid] || {})
        }));

        // 5. RETURN PAGINATED RESPONSE
        return DoResponse({
            success: true,
            data: combinedData,
            pagination: {
                current_page: searchParams.page,
                items_per_page: ITEMS_PER_PAGE,
                total_items: totalCount,
                total_pages: totalPages,
                has_next_page: searchParams.page < totalPages,
                has_prev_page: searchParams.page > 1,
                next_page: searchParams.page < totalPages ? searchParams.page + 1 : null,
                prev_page: searchParams.page > 1 ? searchParams.page - 1 : null
            },
            filters: {
                category: category,
                city: city,
                search_criteria: searchParams.criteria || null
            }
        }, 200);

    } catch (error: any) {
        console.error("Search error:", error.message);
        return DoResponse({
            success: false,
            error: "Internal server error",
            message: process.env.NODE_ENV === 'development' ? error.message : undefined
        }, 500);
    }
}
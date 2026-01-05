import { LoaderFunction } from "@remix-run/node"
import { convertDashToSpace, DoResponse } from "~/lib/lib"
import { query } from "../DB"

export const loader: LoaderFunction = async ({ request, params }) => {
    const ITEMS_PER_PAGE = 20;

    try {
        const category = params.category

        const url = new URL(request.url);
        const searchParams = {
            criteria: url.searchParams.get("q") || "",
            page: Math.max(1, Number(url.searchParams.get("page")) || 1),
            sort: url.searchParams.get("sort") || "date_created",
            order: url.searchParams.get("order") || "desc"
        };

        const offset = (searchParams.page - 1) * ITEMS_PER_PAGE;

        // Validate sort column to prevent SQL injection
        const validSortColumns = ["date_created", "title", "rating_average", "rating_count"];
        const sortColumn = validSortColumns.includes(searchParams.sort)
            ? searchParams.sort
            : "date_created";
        const sortOrder = searchParams.order.toLowerCase() === "asc" ? "ASC" : "DESC";

        // 1. Get TOTAL COUNT
        const countResult: any = await query(`
            SELECT COUNT(DISTINCT d.id) as total_count
            FROM tbl_dir d
            WHERE d.category = ?
            ${searchParams.criteria ? `AND (d.title LIKE ? OR d.short_description LIKE ?)` : ''}
        `, [
            category,
            ...(searchParams.criteria ? [`%${searchParams.criteria}%`, `%${searchParams.criteria}%`] : [])
        ]);

        const totalCount = countResult[0]?.total_count || 0;
        const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);


        // 2. Get PAGINATED DATA (separate query for efficiency)
        const rawdata: any = await query(`
            SELECT DISTINCT
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
                (
                    SELECT bpi3.image_url 
                    FROM tbl_business_profile_image bpi3
                    WHERE bpi3.business_guid = d.gid 
                    ORDER BY bpi3.date_created DESC 
                    LIMIT 1
                ) AS profile_image_url_ext,
                (
                    SELECT bbg.image_url 
                    FROM tbl_business_profile_bg bbg
                    WHERE bbg.business_guid = d.gid 
                    ORDER BY bbg.date_created DESC 
                    LIMIT 1
                ) AS bg_image_url_ext
                
            FROM tbl_dir d
            LEFT JOIN tbl_country c ON d.country_code = c.iso2
            LEFT JOIN tbl_state s ON d.state_code = s.iso2 AND d.country_code = s.country_code
            LEFT JOIN tbl_city ci ON d.city_id = ci.id
            WHERE d.category = ?
            ${searchParams.criteria ? `AND (d.title LIKE ? OR d.short_description LIKE ?)` : ''}
            AND d.active_status = true
            ORDER BY ${sortColumn} ${sortOrder}
            LIMIT ? OFFSET ?
        `, [
            category,
            ...(searchParams.criteria ? [`%${searchParams.criteria}%`, `%${searchParams.criteria}%`] : []),
            ITEMS_PER_PAGE,
            offset
        ]);

        // If you still want to use LEFT JOIN approach instead of subqueries, use this:
        /*
        const rawdata: any = await query(`
            SELECT DISTINCT
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
                bpi.image_url AS profile_image,
                bbg.image_url AS background_image,
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
            LEFT JOIN tbl_country c ON d.country_code = c.iso2
            LEFT JOIN tbl_state s ON d.state_code = s.iso2 AND d.country_code = s.country_code
            LEFT JOIN tbl_city ci ON d.city_id = ci.id
            LEFT JOIN (
                SELECT DISTINCT ON (business_guid) business_guid, image_url
                FROM tbl_business_profile_image
                ORDER BY business_guid, date_created DESC
            ) bpi ON d.gid = bpi.business_guid
            LEFT JOIN (
                SELECT DISTINCT ON (business_guid) business_guid, image_url
                FROM tbl_business_profile_bg
                ORDER BY business_guid, date_created DESC
            ) bbg ON d.gid = bbg.business_guid
            WHERE d.category = ?
            ${searchParams.criteria ? `AND (d.title LIKE ? OR d.short_description LIKE ?)` : ''}
            AND d.active_status = true
            ORDER BY ${sortColumn} ${sortOrder}
            LIMIT ? OFFSET ?
        `, [
            category,
            ...(searchParams.criteria ? [`%${searchParams.criteria}%`, `%${searchParams.criteria}%`] : []),
            ITEMS_PER_PAGE,
            offset
        ]);
        */

        // 3. Get operating hours separately (prevents duplicates from JOIN)
        const businessIds = rawdata.map((b: any) => b.gid);
        let operatingHours: any = {};

        if (businessIds.length > 0) {
            const ohResult: any = await query(`
               SELECT 
                    business_guid,
                    MAX(open_status) as open_status,
                    MAX(no_hours_available) as no_hours_available,
                    MAX(always_open) as always_open,
                    MAX(permanently_closed) as permanently_closed,
                    MAX(temporarily_closed) as temporarily_closed,
                    MAX(open_selected_hours) as open_selected_hours,
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
                search_criteria: searchParams.criteria || null,
                sort_by: sortColumn,
                sort_order: searchParams.order
            }
        }, 200);

    } catch (error: any) {
        console.error("Category search error:", error.message);
        return DoResponse({
            success: false,
            error: "Internal server error",
            message: process.env.NODE_ENV === 'development' ? error.message : undefined
        }, 500);
    }
}
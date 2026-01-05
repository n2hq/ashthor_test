import { LoaderFunction } from "@remix-run/node";
import { query } from "../DB";
import { DoResponse } from "~/lib/lib";

export const loader: LoaderFunction = async ({ params }) => {
    try {
        const cityId = params.city_id || '32'; //use new york if id is not supplied
        const limitRaw = params.limit;

        // Sanitize and validate limit
        const limit = Math.max(parseInt(limitRaw ?? "5", 10), 1);

        const rows: any = await query(`
                SELECT 
                d.*, 
               bg.image_url as bg_image_url_ext, bpi.image_url as profile_image_url_ext,
                COALESCE(b.avg_rating, 0) as avg_rating,
                COALESCE(b.count_of_rating, 0) as count_of_rating,
                COALESCE(b.sum_of_rating, 0) as sum_of_rating,
                b.*
            FROM tbl_dir d
            LEFT JOIN tbl_business_rating_summary b 
                ON d.gid = b.business_guid
            LEFT JOIN tbl_business_profile_bg bg 
            	ON d.gid = bg.business_guid
            LEFT JOIN tbl_business_profile_image bpi
            	ON d.gid = bpi.business_guid
            WHERE d.city_id RLIKE ?
            ORDER BY d.title
            LIMIT ?;
    `, [cityId, limit]);

        //console.log(rows)
        console.log('me')
        if (rows.length === 0) {
            return DoResponse(rows, 200);
        }



        return DoResponse(rows, 200);

    } catch (error: any) {
        return DoResponse({ error: error.message }, 500);
    }
};

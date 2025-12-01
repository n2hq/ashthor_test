import { LoaderFunction } from "@remix-run/node"
import { convertDashToSpace, DoResponse } from "~/lib/lib"
import { query } from "../DB"



export const loader: LoaderFunction = async ({ request, params }) => {
    const contentType = request.headers.get("Content-Type")



    const category = params.category
    const city_param = params.city || ""
    const city = convertDashToSpace(city_param)

    console.log(category)
    console.log(city)


    try {
        const rawdata: any = await query(`SELECT 
                d.*,
                ci.name AS city_name,
                s.name AS state_name,
                c.name AS country_name,
                MAX(bpi.image_url) AS image_url,  -- pick first image
                oh.open_status,
                oh.no_hours_available,
                oh.always_open,
                oh.permanently_closed,
                oh.temporarily_closed,
                oh.open_selected_hours,
                oh.monday_from, oh.monday_to,
                oh.tuesday_from, oh.tuesday_to,
                oh.wednesday_from, oh.wednesday_to,
                oh.thursday_from, oh.thursday_to,
                oh.friday_from, oh.friday_to,
                oh.saturday_from, oh.saturday_to,
                oh.sunday_from, oh.sunday_to
            FROM tbl_dir d
            LEFT JOIN tbl_country c 
                ON d.country_code = c.iso2
            LEFT JOIN tbl_state s 
                ON d.state_code = s.iso2 
                AND d.country_code = s.country_code
            LEFT JOIN tbl_city ci 
                ON d.city_id = ci.id
            LEFT JOIN tbl_business_profile_image bpi
                ON bpi.business_guid = d.gid
            LEFT JOIN tbl_operating_hours oh
                ON oh.business_guid = d.gid
            WHERE d.category = ?     
            AND ci.name = ?
            GROUP BY d.gid
            `,
            [
                category, city
            ])

        return DoResponse(rawdata, 200)

    } catch (error: any) {
        return DoResponse({ "error": error.message }, 500)
    }

}
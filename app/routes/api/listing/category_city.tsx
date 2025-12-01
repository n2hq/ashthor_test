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
        const rawdata: any = await query(`SELECT DISTINCT
                    d.id,
                    d.rating_total,
                    d.rating_count,
                    d.rating_average,
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
                LEFT JOIN tbl_country c ON d.country_code = c.iso2
                LEFT JOIN tbl_state s ON d.state_code = s.iso2 AND d.country_code = s.country_code
                LEFT JOIN tbl_city ci ON d.city_id = ci.id
                LEFT JOIN tbl_operating_hours oh ON oh.business_guid = d.gid
                WHERE d.category = ?  
                AND ci.name = ?;
            `,
            [
                category, city
            ])

        return DoResponse(rawdata, 200)

    } catch (error: any) {
        return DoResponse({ "error": error.message }, 500)
    }

}
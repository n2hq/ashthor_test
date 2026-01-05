import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node"

import { ListingType } from "~/lib/types"
import { DoResponse, GenerateRandomHash } from "~/lib/lib"
import { query } from "../DB"




export const loader: LoaderFunction = async ({ request, params }) => {
    const contentType = request.headers.get("Content-Type")

    /* if (contentType !== "application/json") {
        return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }))
    } */

    const businessGuid = params.business_guid

    const selectedFeatureQuery = `SELECT
        a.feature_id, a.user_description, a.business_guid
        FROM 
        tbl_selected_facility_features a 
        WHERE 
        a.business_guid = ?`

    const facilitiesQuery = `SELECT 
        f.*,  
        sf.name AS facility_name,
        sf.description AS facility_definition,
        sf.active AS facility_active_status
        FROM 
            tbl_facilities f 
        INNER JOIN 
            tbl_sys_facilities sf 
            ON f.facility_id = sf.facility_id
        WHERE 
            f.business_guid = 'bc28e31d-f128-4f7e-84ab-44c74bef86bb'
        ORDER BY 
            f.created_at DESC;`

    try {
        const rawdata: any = await query(facilitiesQuery,
            [
                businessGuid
            ])

        console.log(rawdata)

        return DoResponse(rawdata, 200)

    } catch (error: any) {
        return DoResponse({ "error": error.message }, 500)
    }

}
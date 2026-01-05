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


    try {
        const rawdata: any = await query(`SELECT 
            a.social_media_guid, 
            a.social_media_code,
            a.social_media_identifier, 
            a.business_guid,
            b.base_url, 
            b.name as social_media_name, 
            b.base_url
            FROM 
            tbl_social_media a 
            INNER JOIN 
                tbl_sys_social_media b ON a.social_media_code = b.media_id 
            WHERE
            a.business_guid = ?`,
            [
                businessGuid
            ])

        return DoResponse(rawdata, 200)

    } catch (error: any) {
        return DoResponse({ "error": error.message }, 500)
    }

}
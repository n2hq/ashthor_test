import { LoaderFunction } from "@remix-run/node"
import { query } from "../DB"
import { DoResponse } from "~/lib/lib"

export const loader: LoaderFunction = async ({ request, params }) => {

    try {
        const businessGuid = params?.business_guid
        console.log(`business guid: ${businessGuid}`)

        if (!businessGuid || businessGuid.trim() === "") {
            // Better: Throw a proper HTTP response
            throw new Response("Business GUID is required", { status: 400 })
        }


        const rows: any = await query(`SELECT * FROM tbl_business_rating_summary bs 
            WHERE
            bs.business_guid = ?`,
            [businessGuid])


        if ((rows as any[]).length > 0) {
            return DoResponse(rows[0], 200)
        }

        return DoResponse(null, 200)

    } catch (error: any) {
        console.log(error.message)
        return DoResponse({ "error": error.message }, 500)
    }
}
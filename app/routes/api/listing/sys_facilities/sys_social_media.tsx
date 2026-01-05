import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node"
import { query } from "../../DB"
import { ListingType } from "~/lib/types"
import { DoResponse, GenerateRandomHash } from "~/lib/lib"


export const loader: LoaderFunction = async ({ request, params }) => {
    const contentType = request.headers.get("Content-Type")

    /* if (contentType !== "application/json") {
        return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }))
    } */

    const buid = params.buid
    const user_guid = params.user_guid

    try {
        const rawdata: any = await query(`SELECT * FROM tbl_sys_social_media`)
        //console.log(rawdata)
        return DoResponse(rawdata, 200)

    } catch (error: any) {
        return DoResponse({ "error": error.message }, 500)
    }

}
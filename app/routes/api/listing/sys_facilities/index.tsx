import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node"
import { query } from "../../DB"
import { ListingType, SysFacilityType, SysSocialMediaType } from "~/lib/types"
import { DoResponse, GenerateRandomHash } from "~/lib/lib"


export const loader: LoaderFunction = async ({ request, params }) => {
    const contentType = request.headers.get("Content-Type")

    /* if (contentType !== "application/json") {
        return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }))
    } */


    try {
        const rawdata: any = await query(`SELECT * FROM tbl_sys_facilities`)

        const data: SysFacilityType[] = rawdata?.map((item: any, i: number) => {
            return {
                name: item.name,
                id: item.facility_id,
                description: item.description
            }
        })

        return DoResponse(data, 200)

    } catch (error: any) {
        return DoResponse({ "error": error.message }, 500)
    }

}
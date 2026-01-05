import { LoaderFunction } from "@remix-run/node";
import { DoResponse } from "~/lib/lib";
import { query } from "../DB";

export const loader: LoaderFunction = async ({ request, params }) => {

    if (request.method === "GET") {
        const guid = params.guid

        const rows: any = await query(`SELECT * FROM tbl_business_profile_image 
            WHERE
            business_guid = ?`,
            [guid]
        )
        if ((rows as any[]).length <= 0) {
            return DoResponse(null, 200)
        }

        return DoResponse(rows[0], 200)
    }
}

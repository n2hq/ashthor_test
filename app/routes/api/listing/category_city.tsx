import { LoaderFunction } from "@remix-run/node"
import { DoResponse } from "~/lib/lib"
import { query } from "../DB"

export const loader: LoaderFunction = async ({ request, params }) => {
    const contentType = request.headers.get("Content-Type")



    const category = params.category
    const city = params.city




    try {
        const rawdata: any = await query(`SELECT d.* 
            FROM tbl_dir d
            JOIN tbl_city c on d.city_id = c.id
            WHERE
            d.category = ?
            AND
            c.name = ?`,
            [
                category, city
            ])

        return DoResponse(rawdata, 200)

    } catch (error: any) {
        return DoResponse({ "error": error.message }, 500)
    }

}
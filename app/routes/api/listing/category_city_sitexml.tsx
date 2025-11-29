import { LoaderFunction } from "@remix-run/node"
import { DoResponse } from "~/lib/lib"
import { query } from "../DB"

export const loader: LoaderFunction = async ({ }) => {


    try {
        const rawdata: any = await query(`SELECT DISTINCT 
            d.category,
            c.id AS city_id,
            c.name AS city 
            FROM tbl_dir d
            JOIN tbl_city c ON d.city_id = c.id;`)

        return DoResponse(rawdata, 200)

    } catch (error: any) {
        return DoResponse({ "error": error.message }, 500)
    }

}
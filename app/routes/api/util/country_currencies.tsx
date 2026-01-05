import { LoaderFunction } from "@remix-run/node";
import { DoResponse } from "~/lib/lib";
import { query } from "../DB";

export const loader: LoaderFunction = async ({ request, params }) => {
    const contentType = request.headers.get("Content-Type")


    if (request.method === "GET") {



        const rows: any = await query(`SELECT 
            name AS country_name, 
            currency, 
            currency_name AS name, 
            currency_symbol, 
            phonecode AS phone_code,
            id AS sn,
            numeric_code AS id,
            iso2 AS country_code, 
            emoji,
            latitude AS lat,
            longitude AS lng 
            FROM tbl_country
           `, [])

        if ((rows as any[]).length <= 0) {
            return DoResponse([{}], 200)
        }

        const countries: any = rows.map((country: any, index: number) => {
            const item = country
            return ({
                id: item.numeric_code,
                ...item
            })
        })

        return DoResponse(countries, 200)
    }
}
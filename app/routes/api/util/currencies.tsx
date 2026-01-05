import { LoaderFunction } from "@remix-run/node";
import { DoResponse } from "~/lib/lib";
import { query } from "../DB";

export const loader: LoaderFunction = async ({ request, params }) => {
    const contentType = request.headers.get("Content-Type")


    if (request.method === "GET") {



        const rows: any = await query(`SELECT name, currency, currency_name, currency_symbol, id, iso2, emoji FROM tbl_country
           `, [])

        if ((rows as any[]).length <= 0) {
            return DoResponse([{}], 200)
        }

        const countries: any = rows.map((country: any, index: number) => {
            return ({
                id: country.id,
                country: country.name,
                currency: country.currency,
                currency_name: country.currency_name,
                currency_symbol: country.currency_symbol,
                currency_code: country.iso2,
                emoji: country.emoji
            })
        })

        return DoResponse(countries, 200)
    }
}
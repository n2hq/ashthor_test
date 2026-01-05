import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node"
import { query } from "../DB"
import { DoResponse } from "~/lib/lib"
import { ListingType } from "~/lib/types"
import { pageType } from "~/lib/json/page_type"



export const loader: LoaderFunction = async ({ request, params }) => {

    try {
        const id = params.guid_or_username

        const rows: any = await query(`SELECT 
            d.*,
            c.name AS country_name,
            s.name AS state_name,
            s.latitude AS lat,
            s.longitude as lng,
            ci.name AS city_name
            FROM tbl_dir d
            LEFT JOIN tbl_country c ON d.country_code = c.iso2 AND d.country_code IS NOT NULL AND d.country_code != ''
            LEFT JOIN tbl_state s ON d.state_code = s.iso2 AND d.state_code IS NOT NULL AND d.state_code != '' AND d.country_code = s.country_code
            LEFT JOIN tbl_city ci ON d.city_id = ci.id AND d.city_id IS NOT NULL AND d.city_id != ''
            WHERE (d.gid = ? OR d.username = ?)
            `, [id, id])

        if ((rows as any[]).length <= 0) { return DoResponse({}, 200) }

        const listings: any[] = rows.map((listing: any) => { return (listing) })

        return DoResponse(listings[0], 200)

    } catch (error: any) {
        return DoResponse({ "error": error.message }, 500)
    }

}

export const action = async ({ request, params }: ActionFunctionArgs) => {

    const contentType = request.headers.get("Content-Type")

    if (contentType !== "application/json") {
        return DoResponse(
            { error: "Invalid content type. Expected JSON." }
        )
    }

    if (request.method === "PUT") {
        try {
            {/**get param and post body */ }
            const body: ListingType = await request.json()
            let guid = params.guid_or_username

            {/** get listing */ }
            const rawlisting: any = await query(`SELECT * FROM tbl_dir WHERE gid = ?`, [guid])
            const listing: ListingType = rawlisting[0]

            if ((rawlisting as any[]).length <= 0) {
                return new Response(
                    JSON.stringify({
                        success: false,
                        error: "Listing does not exist"
                    }),
                    { status: 400 }
                )
            }




            {/** assign values for update */ }
            let email_address = body.email_address as string === undefined ? listing.email_address : body.email_address
            let title: string = body.title === undefined ? (listing.title) as string : body.title as string
            let branch: boolean = body.branch === undefined ? Boolean(listing.branch) as boolean : Boolean(body.branch)
            let branch_location: string = body.branch_location === undefined ? (listing.branch_location) as string : (body.branch_location)
            let category = body.category as string === undefined ? listing.category : body.category

            let pagetype = body.pagetype as string === undefined ? listing.pagetype : body.pagetype

            let short_description = body.short_description as string === undefined ? listing.short_description : body.short_description
            let long_description = body.long_description as string === undefined ? listing.long_description : body.long_description

            let phone = body.phone as string === undefined ? listing.phone : body.phone
            let address_one = body.address_one as string === undefined ? listing.address_one : body.address_one
            let address_two = body.address_two as string === undefined ? listing.address_two : body.address_two
            let img = body.img as string === undefined ? listing.img : body.img
            let owner = body.owner as string === undefined ? listing.owner : body.owner
            let username = body.username as string === undefined ? listing.username : body.username

            let zipcode = body.zipcode as string === undefined ? listing.zipcode : body.zipcode

            let products = body.products as string === undefined ? listing.products : body.products
            let services = body.services as string === undefined ? listing.services : body.services
            let business_phrases = body.business_phrases as string === undefined ? listing.business_phrases : body.business_phrases
            let established = body.established as string === undefined ? listing.established : body.established

            let xsocial = body.xsocial as string === undefined ? listing.xsocial : body.xsocial
            let fbsocial = body.fbsocial as string === undefined ? listing.fbsocial : body.fbsocial
            let linksocial = body.linksocial as string === undefined ? listing.linksocial : body.linksocial

            let country_code = body.country_code as string === undefined ? listing.country_code : body.country_code
            let state_code = body.state_code as string === undefined ? listing.state_code : body.state_code

            let city_id = body.city_id as string === undefined ? listing.city_id : body.city_id
            let website = body.website as string === undefined ? listing.website : body.website

            let minimum_amount_currency_code = body.minimum_amount_currency_code as string === undefined ? listing.minimum_amount_currency_code : body.minimum_amount_currency_code

            let minimum_amount = body.minimum_amount as string === undefined ? listing.minimum_amount : body.minimum_amount

            {/** check if username has not been taken */ }
            if (username !== "" && username !== null) {
                if (username === listing?.username) {
                    // do nothing
                }

                {/** a new username is being submitted */ }
                if (username !== listing?.username) {
                    {/** check if some other user has the username */ }
                    let checkSql = `SELECT * FROM tbl_dir d 
                        WHERE d.username = '${username}'
                        AND
                        d.gid != '${listing?.gid}'`

                    const checkUsernameResult = await query(checkSql)
                    if ((checkUsernameResult as any[]).length > 0) {

                        return DoResponse({
                            success: false,
                            error: "Username is unavailable"
                        }, 500)

                    }
                }
            }

            let sql = `UPDATE tbl_dir SET
                title = '${title}',
                branch = '${branch}',
                branch_location = '${branch_location}',
                category = '${category}',
                short_description = '${short_description}',
                phone = '${phone}',
                email_address = '${email_address}',
                address_one = '${address_one}',
                address_two = '${address_two}',
                owner = '${owner}',
                username = '${username}',
                pagetype = '${pagetype}',
                img = '${img}',
                zipcode = '${zipcode}',
                products = '${products}',
                services = '${services}',
                business_phrases = '${business_phrases}',
                established = '${established}',
                xsocial = '${xsocial}',
                fbsocial = '${fbsocial}',
                linksocial = '${linksocial}',
                country_code = '${country_code}',
                state_code = '${state_code}',
                city_id = '${city_id}',
                website = '${website}'
                WHERE
                gid = '${guid}'`

            //console.log(sql)
            //return DoResponse(sql, 200)

            const result = await query(
                `UPDATE tbl_dir SET
                title = ?,
                branch = ?,
                branch_location = ?,
                category = ?,
                short_description = ?,
                long_description = ?,
                phone = ?,
                email_address = ?,
                address_one = ?,
                address_two = ?,
                owner = ?,
                username = ?,
                pagetype = ?,
                img = ?,
                zipcode = ?,
                products = ?,
                services = ?,
                business_phrases = ?,
                established = ?,
                xsocial = ?,
                fbsocial = ?,
                linksocial = ?,
                country_code = ?,
                state_code = ?,
                city_id = ?,
                website = ?,
                minimum_amount_currency_code = ?,
                minimum_amount = ? 
                WHERE
                gid = ?`,
                [
                    title,
                    branch,
                    branch_location,
                    category,
                    short_description,
                    long_description,
                    phone,
                    email_address,
                    address_one,
                    address_two,
                    owner,
                    username,
                    pagetype,
                    img,
                    zipcode,
                    products,
                    services,
                    business_phrases,
                    established,
                    xsocial,
                    fbsocial,
                    linksocial,
                    country_code,
                    state_code,
                    city_id,
                    website,
                    minimum_amount_currency_code,
                    minimum_amount,
                    guid
                ])




            {/** get the listing again after update */ }
            {/** get user */ }
            const updatedrawlisting: any = await query(`SELECT * FROM tbl_dir WHERE gid = ?`, [guid])
            const updatedlisting: ListingType = updatedrawlisting[0]

            const data = {
                success: true,
                message: 'Listing updated successfully',
                data: updatedlisting
            }

            return DoResponse(data, 200)
        }
        catch (error: any) {
            console.log(error.message)
            return DoResponse({ error: error.message }, 500)
        }
    }

    if (request.method === "DELETE") {
        try {

            {/**get param and post body */ }
            let guid = params.guid

            {/** get listing */ }
            const rawlisting: any = await query(`SELECT * FROM tbl_dir WHERE gid = ?`, [guid])
            const listing: ListingType = rawlisting[0]

            if ((rawlisting as any[]).length <= 0) {
                return new Response(
                    JSON.stringify({ error: "Listing does not exist" }),
                    { status: 400 }
                )
            }

            {/** delete the business */ }
            const result = await query(
                `DELETE FROM tbl_dir
                WHERE gid = ?`,
                [guid])

            const data = {
                success: true,
                message: `Listing ${guid} deleted successfully`
            }

            return DoResponse(data, 200)

        } catch (error: any) {
            return DoResponse({ error: error.message }, 500)
        }
    }

    return DoResponse({
        success: false,
        message: "method not allowed"
    }, 405)
}
import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node"
import { query } from "../DB"
import { ListingType } from "~/lib/types"
import { DoResponse, GenerateRandomHash } from "~/lib/lib"

export const loader: LoaderFunction = async ({ request, params }) => {
    const contentType = request.headers.get("Content-Type")

    if (contentType !== "application/json") {
        return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }))
    }

    try {
        const rawdata: any = await query(`SELECT * FROM tbl_dir ORDER BY date_created DESC`)

        const listings = rawdata.map((listing: any) => {
            delete (listing.date_created)
            delete (listing.last_updated)
            return (listing)
        })

        return DoResponse(listings, 200)

    } catch (error: any) {
        return DoResponse({ "error": error.message }, 500)
    }

}

export async function action({ request, params }: ActionFunctionArgs) {

    if (request.method === "POST") {

        try {
            const contentType = request.headers.get("Content-Type")

            if (contentType !== "application/json") {
                return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }))
            }

            const body: ListingType = await request.json()


            // check if name exists
            const rows: any = await query(`SELECT * FROM tbl_dir 
                WHERE
                SOUNDEX(title) = SOUNDEX(?)
                AND
                owner = ?`, [body.title, body.owner])


            let title: string = ""

            if (body.branch === false || body.branch === undefined) {
                {/** if not branch */ }
                if ((rows as any[]).length > 0) {
                    return new Response(
                        JSON.stringify({ exists: true, message: "A similar business or branch name exists. If this is a branch, add a comma and additional phrase to identify the branch e.g. Business Inc., New York!" }),
                        { status: 409 }
                    )
                }
            } else {
                if ((rows as any[]).length > 0) {
                    return new Response(
                        JSON.stringify({ exists: true, message: "A similar branch name exists. If this is a branch, add a comma and additional phrase to identify the branch e.g. Business Inc., New York!" }),
                        { status: 409 }
                    )
                }
            }




            if (!body.title) {
                return new Response(JSON.stringify({ message: "Missing Title" }), { status: 400 })
            }
            if (!body.category) {
                return new Response(JSON.stringify({ message: "Missing Category" }), { status: 400 })
            }
            if (!body.short_description) {
                return new Response(JSON.stringify({ message: "Missing Short Description" }), { status: 400 })
            }
            /*  if (!body.phone) {
                 return new Response(JSON.stringify({ message: "Missing Phone" }), { status: 400 })
             } */
            if (!body.email_address) {
                return new Response(JSON.stringify({ message: "Missing Email Address" }), { status: 400 })
            }
            if (!body.address_one) {
                return new Response(JSON.stringify({ message: "Missing Address" }), { status: 400 })
            }

            /* if (!body.zipcode) {
                return new Response(JSON.stringify({ message: "Missing Zipcode" }), { status: 400 })
            } */
            if (!body.owner) {
                return new Response(JSON.stringify({ message: "Missing Owner" }), { status: 400 })
            }

            if (!body.pagetype) {
                return new Response(JSON.stringify({ message: "Missing Pagetype" }), { status: 400 })
            }

            /*  if (!body.established) {
                 return new Response(JSON.stringify({ message: "Missing Year Established" }), { status: 400 })
             } */

            let branch: boolean = false
            let branch_location: string = ""

            if (body.branch !== undefined) {
                branch = body.branch
            }
            if (body.branch_location !== undefined) {
                branch_location = body.branch_location
            }

            const gid = crypto.randomUUID()

            const listingHash = GenerateRandomHash()

            //console.log(body)

            const result = await query(`INSERT INTO tbl_dir SET 
                title = ?, 
                pagetype = ?,
                branch = ?,
                branch_location = ?, 
                category = ?, 
                short_description = ?, 
                long_description = ?, 
                phone = ?, 
                email_address = ?, 
                address_one = ?, 
                address_two = ?,
                country_code = ?,
                state_code = ?, 
                city_id = ?,
                zipcode = ?, 
                gid = ?, 
                owner = ?,
                established = ?,
                listing_hash = ?`,
                [
                    body.title || null,
                    body.pagetype,
                    branch,
                    branch_location,
                    body.category || null,
                    body.short_description || null,
                    body.long_description || null,
                    body.phone || null,
                    body.email_address || null,
                    body.address_one || null,
                    body.address_two || null,
                    body.country_code || null,
                    body.state_code || null,
                    body.city_id || null,
                    body.zipcode || null,
                    gid,
                    body.owner || null,
                    body.established || null,
                    listingHash || null
                ])

            const rating = 3
            const ratingGuid = crypto.randomUUID()
            const comment = 'Default'
            const fullname = `${body.first_name}, ${body.last_name}`
            const userGuid = body.owner
            const businessGuid = gid

            /* const result2 = await query(`INSERT INTO tbl_rating SET
                rating = ?,
                comment = ?,
                fullname = ?,
                user_guid = ?,
                business_guid = ?,
                rating_guid = ?
                `, [
                rating,
                comment,
                fullname,
                userGuid,
                businessGuid,
                ratingGuid
            ]) */




            const data = {
                message: 'Listing created successfully',
                data: body,
                guid: gid,
                listing_hash: listingHash
            }

            return new Response(JSON.stringify(data), { status: 201 })
        } catch (error: any) {
            console.log(error.message)
            return new Response(JSON.stringify({ message: error.message }), { status: 500 })
        }
    }
}
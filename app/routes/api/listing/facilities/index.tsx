import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node"
import { FacilityType, ListingType, ProductType, ServiceType } from "~/lib/types"
import { DoResponse, GenerateRandomHash } from "~/lib/lib"
import { query } from "../../DB"

export const loader: LoaderFunction = async ({ request, params }) => {
    try {
        const services: FacilityType[] = await query(`SELECT * FROM tbl_facilities 
                `, [])

        return DoResponse(services, 200)

    } catch (error: any) {
        return DoResponse({ "error": error.message }, 500)
    }
}

export async function action({ request, params }: ActionFunctionArgs) {

    if (request.method === "POST") {

        const body: FacilityType = await request.json()

        try {
            if (!body.facility_id) {
                return new Response(JSON.stringify({ message: "Missing Facility ID" }), { status: 400 })
            }
            if (!body.facility_description) {
                return new Response(JSON.stringify({ message: "Missing Facility Description" }), { status: 400 })
            }


            const facility_guid = crypto.randomUUID()

            const facility_hash = GenerateRandomHash()



            const result = await query(`INSERT INTO tbl_facilities SET 
                        facility_id = ?, 
                        facility_description = ?,
                        facility_guid = ?, 
                        user_guid = ?, 
                        business_guid = ?, 
                        facility_hash = ?
                        `,
                [
                    body.facility_id,
                    body.facility_description,
                    facility_guid,
                    body.user_guid,
                    body.business_guid,
                    facility_hash
                ])



            const data = {
                message: 'Facility created successfully',
                data: body,
                facility_guid: facility_guid,
                facility_hash: facility_hash
            }

            return new Response(JSON.stringify(data), { status: 201 })
        } catch (error: any) {
            console.log(error.message)
            return new Response(JSON.stringify({ message: error.message }), { status: 500 })
        }
    }

}
import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node"
import { ListingType, ProductType, ServiceType } from "~/lib/types"
import { DoResponse, GenerateRandomHash } from "~/lib/lib"
import { query } from "../../DB"

export const loader: LoaderFunction = async ({ request, params }) => {
    try {
        const services: ServiceType[] = await query(`SELECT * FROM tbl_services 
                `, [])

        return DoResponse(services, 200)

    } catch (error: any) {
        return DoResponse({ "error": error.message }, 500)
    }
}

export async function action({ request, params }: ActionFunctionArgs) {

    if (request.method === "POST") {

        const body: ServiceType = await request.json()

        try {
            if (!body.service_name) {
                return new Response(JSON.stringify({ message: "Missing Service Name" }), { status: 400 })
            }
            if (!body.service_description) {
                return new Response(JSON.stringify({ message: "Missing Service Description" }), { status: 400 })
            }


            const service_guid = crypto.randomUUID()

            const hash = GenerateRandomHash()

            console.log(body.service_url)

            const result = await query(`INSERT INTO tbl_services SET 
                        service_name = ?, 
                        service_description = ?,
                        service_url = ?,
                        service_guid = ?, 
                        user_guid = ?, 
                        business_guid = ?, 
                        service_hash = ?
                        `,
                [
                    body.service_name,
                    body.service_description,
                    body.service_url,
                    service_guid,
                    body.user_guid,
                    body.business_guid,
                    hash
                ])



            const data = {
                message: 'Service created successfully',
                data: body,
                service_guid: service_guid,
                service_hash: hash
            }

            return new Response(JSON.stringify(data), { status: 201 })
        } catch (error: any) {
            console.log(error.message)
            return new Response(JSON.stringify({ message: error.message }), { status: 500 })
        }
    }

}
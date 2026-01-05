import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node"
import { ListingType, ProductType, ServiceType, SocialMediaType } from "~/lib/types"
import { DoResponse, GenerateRandomHash } from "~/lib/lib"
import { query } from "../../DB"



export const loader: LoaderFunction = async ({ request, params }) => {
    try {
        const services: SocialMediaType[] = await query(`SELECT * FROM tbl_social_media 
                `, [])

        return DoResponse(services, 200)

    } catch (error: any) {
        return DoResponse({ "error": error.message }, 500)
    }
}

export async function action({ request, params }: ActionFunctionArgs) {

    if (request.method === "POST") {

        const body: SocialMediaType = await request.json()

        try {
            if (!body.social_media_code) {
                return new Response(JSON.stringify({ message: "Missing Social Media Code" }), { status: 400 })
            }
            if (!body.social_media_identifier) {
                return new Response(JSON.stringify({ message: "Missing Social Media Identifier" }), { status: 400 })
            }


            const social_media_guid = crypto.randomUUID()

            const hash = GenerateRandomHash()



            const result = await query(`INSERT INTO tbl_social_media SET 
                        social_media_code = ?, 
                        social_media_identifier = ?,
                        social_media_guid = ?, 
                        user_guid = ?, 
                        business_guid = ?, 
                        social_media_hash = ?
                        `,
                [
                    body.social_media_code,
                    body.social_media_identifier,
                    social_media_guid,
                    body.user_guid,
                    body.business_guid,
                    hash
                ])



            const data = {
                message: 'Service created successfully',
                data: body,
                social_media_guid: social_media_guid,
                service_hash: hash
            }

            return new Response(JSON.stringify(data), { status: 201 })
        } catch (error: any) {
            console.log(error.message)
            return new Response(JSON.stringify({ message: error.message }), { status: 500 })
        }
    }

}
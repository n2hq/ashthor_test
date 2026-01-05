import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node"
import { DoResponse } from "~/lib/lib"
import { ProductType, ServiceType, SocialMediaType } from "~/lib/types"
import { query } from "../../DB"

export const loader: LoaderFunction = async ({ request, params }) => {

    try {
        let social_media_guid = params.social_media_guid
        const rawlisting: any = await query(`SELECT * FROM tbl_social_media WHERE 
            social_media_guid = ?`, [social_media_guid])

        const social_medium: SocialMediaType = rawlisting[0]

        return DoResponse(social_medium, 200)
    } catch (error: any) {
        console.log(error.message)
        return DoResponse({ error: error.message }, 500)
    }

}

export async function action({ request, params }: ActionFunctionArgs) {


    if (request.method === "PUT") {
        try {
            {/**get param and post body */ }
            const body: SocialMediaType = await request.json()
            let social_media_guid = params.social_media_guid

            {/** get listing */ }
            const rawlisting: any = await query(`SELECT * FROM tbl_social_media WHERE social_media_guid = ?`, [social_media_guid])

            const social_medium: SocialMediaType = rawlisting[0]

            if ((rawlisting as any[]).length <= 0) {
                return DoResponse({
                    success: false,
                    error: "Social media entry does not exist"
                }, 400)
            }


            {/** assign values for update */ }
            let social_media_code =
                body.social_media_code as string === undefined ? social_medium.social_media_code : body.social_media_code

            let social_media_identifier: string =
                body.social_media_identifier === undefined ? (social_medium.social_media_identifier) as string : body.social_media_identifier as string



            let sql = `UPDATE tbl_social_media SET
                social_media_code = '${social_media_code}',
                social_media_identifier = '${social_media_identifier}',
                WHERE
                social_media_guid = '${social_media_guid}'`

            //console.log(sql)
            //return DoResponse(sql, 200)

            const result = await query(
                `UPDATE tbl_social_media SET
                social_media_code = ?,
                social_media_identifier = ?
                WHERE
                social_media_guid = ?`,
                [
                    social_media_code,
                    social_media_identifier,
                    social_media_guid
                ])


            {/** get the service again after update */ }
            {/** get user */ }
            const _updatedSocialMedium: any = await query(`SELECT * FROM tbl_social_media WHERE social_media_guid = ?`, [social_media_guid])

            const updatedSocialMedium: SocialMediaType = _updatedSocialMedium[0]

            const data = {
                success: true,
                message: 'Service updated successfully',
                data: updatedSocialMedium
            }

            return DoResponse(data, 200)
        }
        catch (error: any) {
            console.log(error.message)
            return DoResponse({ error: error.message }, 500)
        }
    }


    if (request.method === "DELETE") {
        let social_media_guid = params.social_media_guid

        await query(`DELETE FROM tbl_social_media WHERE social_media_guid = ?`, [social_media_guid])


        const data = {
            success: true,
            message: 'Social Media DELETED successfully',
            id: social_media_guid
        }

        return DoResponse(data, 200)
    }


}
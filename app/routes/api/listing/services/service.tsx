import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node"
import { DoResponse } from "~/lib/lib"
import { ProductType, ServiceType } from "~/lib/types"
import { query } from "../../DB"

export const loader: LoaderFunction = async ({ request, params }) => {

    try {
        let service_guid = params.service_guid
        const rawlisting: any = await query(`SELECT * FROM tbl_services WHERE service_guid = ?`, [service_guid])

        const service: ServiceType = rawlisting[0]

        return DoResponse(service, 200)
    } catch (error: any) {
        console.log(error.message)
        return DoResponse({ error: error.message }, 500)
    }

}

export async function action({ request, params }: ActionFunctionArgs) {


    if (request.method === "PUT") {
        try {
            {/**get param and post body */ }
            const body: ServiceType = await request.json()
            let service_guid = params.service_guid

            console.log(service_guid)

            {/** get listing */ }
            const rawlisting: any = await query(`SELECT * FROM tbl_services WHERE service_guid = ?`, [service_guid])

            const service: ServiceType = rawlisting[0]

            if ((rawlisting as any[]).length <= 0) {
                return new Response(
                    JSON.stringify({
                        success: false,
                        error: "Service does not exist"
                    }),
                    { status: 400 }
                )
            }


            {/** assign values for update */ }
            let service_name =
                body.service_name as string === undefined ? service.service_name : body.service_name

            let service_description: string =
                body.service_description === undefined ? (service.service_description) as string : body.service_description as string

            let service_url: string =
                body.service_url === undefined ? (service.service_url) as string : (body.service_url)


            let sql = `UPDATE tbl_services SET
                service_name = '${service_name}',
                service_description = '${service_description}',
                service_url = '${service_url}',
                WHERE
                service_guid = '${service_guid}'`

            //console.log(sql)
            //return DoResponse(sql, 200)

            const result = await query(
                `UPDATE tbl_services SET
                service_name = ?,
                service_description = ?,
                service_url = ?
                WHERE
                service_guid = ?`,
                [
                    service_name,
                    service_description,
                    service_url,
                    service_guid
                ])


            {/** get the service again after update */ }
            {/** get user */ }
            const _updatedService: any = await query(`SELECT * FROM tbl_services WHERE service_guid = ?`, [service_guid])
            const updatedService: ServiceType = _updatedService[0]

            const data = {
                success: true,
                message: 'Service updated successfully',
                data: updatedService
            }

            return DoResponse(data, 200)
        }
        catch (error: any) {
            console.log(error.message)
            return DoResponse({ error: error.message }, 500)
        }
    }


    if (request.method === "DELETE") {
        let service_guid = params.service_guid

        await query(`DELETE FROM tbl_services WHERE service_guid = ?`, [service_guid])


        const data = {
            success: true,
            message: 'Service DELETED successfully',
            id: service_guid
        }

        return DoResponse(data, 200)
    }


}
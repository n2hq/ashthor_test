import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node"
import { DoResponse } from "~/lib/lib"
import { FacilityType, ProductType, ServiceType } from "~/lib/types"
import { query } from "../../DB"

export const loader: LoaderFunction = async ({ request, params }) => {

    try {
        let facility_guid = params.facility_guid
        const rawlisting: any = await query(`SELECT * FROM tbl_facilities WHERE facility_guid = ?`, [facility_guid])

        const facility: FacilityType = rawlisting[0]

        return DoResponse(facility, 200)
    } catch (error: any) {
        console.log(error.message)
        return DoResponse({ error: error.message }, 500)
    }

}

export async function action({ request, params }: ActionFunctionArgs) {


    if (request.method === "PUT") {
        try {
            {/**get param and post body */ }
            const body: FacilityType = await request.json()
            let facility_guid = params.facility_guid

            console.log(facility_guid)

            {/** get listing */ }
            const rawlisting: any = await query(`SELECT * FROM tbl_facilities WHERE facility_guid = ?`, [facility_guid])

            const facility: FacilityType = rawlisting[0]

            if ((rawlisting as any[]).length <= 0) {
                return DoResponse({
                    success: false,
                    error: "Facility does not exist"
                }, 400)
            }


            {/** assign values for update */ }
            let facility_id =
                body.facility_id as string === undefined ? facility.facility_id : body.facility_id

            let facility_description: string =
                body.facility_description === undefined ? (facility.facility_description) as string : body.facility_description as string


            let sql = `UPDATE tbl_facilities SET
                facility_id = '${facility_id}',
                facility_description = '${facility_description}'
                WHERE
                facility_guid = '${facility_guid}'`

            //console.log(sql)
            //return DoResponse(sql, 200)

            const result = await query(
                `UPDATE tbl_facilities SET
                facility_id = ?,
                facility_description = ?
                WHERE
                facility_guid = ?`,
                [
                    facility_id,
                    facility_description,
                    facility_guid
                ])


            {/** get the service again after update */ }
            {/** get user */ }
            const _updatedFacility: any = await query(`SELECT * FROM tbl_facilities WHERE facility_guid = ?`, [facility_guid])
            const updatedFacility: FacilityType = _updatedFacility[0]

            const data = {
                success: true,
                message: 'Facility updated successfully',
                data: updatedFacility
            }

            return DoResponse(data, 200)
        }
        catch (error: any) {
            console.log(error.message)
            return DoResponse({ error: error.message }, 500)
        }
    }


    if (request.method === "DELETE") {
        let facility_guid = params.facility_guid

        await query(`DELETE FROM tbl_facilities WHERE facility_guid = ?`, [facility_guid])


        const data = {
            success: true,
            message: 'Facility DELETED successfully',
            id: facility_guid
        }

        return DoResponse(data, 200)
    }


}
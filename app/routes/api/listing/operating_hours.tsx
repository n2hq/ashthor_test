import { LoaderFunction } from "@remix-run/node"
import { query } from "../DB"
import { DoResponse } from "~/lib/lib"
import { ActionFunctionArgs } from "react-router"
import { EditUserType } from "~/lib/types"

export const loader: LoaderFunction = async ({ request, params }) => {
    const contentType = request.headers.get("Content-Type")

    if (contentType !== "application/json") {
        return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }))
    }

    try {
        const url = new URL(request.url)
        let userGuid = url.searchParams.get("user_guid") as string
        let businessGuid = url.searchParams.get("business_guid") as string


        let rows: any = await query(`SELECT * FROM tbl_operating_hours 
            WHERE 
            user_guid = ? 
            AND 
            business_guid = ?
            `, [userGuid, businessGuid])

        if ((rows as any[]).length <= 0) {
            {/** create record for operating hours if it doesn't exist */ }
            await query(`INSERT INTO tbl_operating_hours 
            SET 
            user_guid = ?,  
            business_guid = ?
            `, [userGuid, businessGuid])

            rows = await query(`SELECT * FROM tbl_operating_hours 
            WHERE 
            user_guid = ? 
            AND 
            business_guid = ?
            `, [userGuid, businessGuid])
        }

        //const listings: any = rows.map((listing: any) => { return (listing) })
        //console.log(rows[0])

        return DoResponse(rows[0], 200)

    } catch (error: any) {
        console.log(error.message)
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
            const url = new URL(request.url)
            let userGuid = url.searchParams.get("user_guid") as string
            let businessGuid = url.searchParams.get("business_guid") as string

            const body: any = await request.json()
            const workingHours = body.workingHours




            {/** get user */ }
            const ophours: any = await query(`SELECT * FROM 
                tbl_operating_hours WHERE
                user_guid = ?
                AND
                business_guid = ?`, [userGuid, businessGuid])



            if ((ophours as any[]).length <= 0) {
                return DoResponse({ error: "Operating hours not yet created" }, 400)
            }

            {/** assign values for update */ }
            const ophour = ophours[0]

            const open_status = body.openStatus as string === undefined ? ophour.open_status : body.openStatus
            const monday_from = workingHours.Monday.start as string === undefined ? ophour.monday_from : workingHours.Monday.start
            const monday_to = workingHours.Monday.end as string === undefined ? ophour.monday_to : workingHours.Monday.end
            const tuesday_from = workingHours.Tuesday.start as string === undefined ?
                ophour.tuesday_from : workingHours.Tuesday.start
            const tuesday_to = workingHours.Tuesday.end as string === undefined ?
                ophour.tuesday_to : workingHours.Tuesday.end
            const wednesday_from = workingHours.Wednesday.start as string === undefined ?
                ophour.wednesday_from : workingHours.Wednesday.start
            const wednesday_to = workingHours.Wednesday.end as string === undefined ?
                ophour.wednesday_to : workingHours.Wednesday.end
            const thursday_from = workingHours.Thursday.start as string === undefined ?
                ophour.thursday_from : workingHours.Thursday.start
            const thursday_to = workingHours.Thursday.end as string === undefined ?
                ophour.thursday_to : workingHours.Thursday.end
            const friday_from = workingHours.Friday.start as string === undefined ?
                ophour.friday_from : workingHours.Friday.start
            const friday_to = workingHours.Friday.end as string === undefined ?
                ophour.friday_to : workingHours.Friday.end
            const saturday_from = workingHours.Saturday.start as string === undefined ?
                ophour.saturday_from : workingHours.Saturday.start
            const saturday_to = workingHours.Saturday.end as string === undefined ?
                ophour.saturday_to : workingHours.Saturday.end
            const sunday_from = workingHours.Sunday.start as string === undefined ?
                ophour.sunday_from : workingHours.Sunday.start
            const sunday_to = workingHours.Sunday.end as string === undefined ?
                ophour.sunday_to : workingHours.Sunday.end



            if (saturday_from === "" && saturday_to !== "") {
                return DoResponse({
                    success: false,
                    message: "Please check Saturday Start and End times."
                }, 500)
            }

            if (sunday_from === "" && sunday_to !== "") {
                return DoResponse({
                    success: false,
                    message: "Please check Sunday Start and End times."
                }, 500)
            }

            const update = await query(
                `UPDATE tbl_operating_hours SET
                open_status = ?,
                monday_from = ?,
                monday_to = ?,
                tuesday_from = ?,
                tuesday_to = ?,
                wednesday_from = ?,
                wednesday_to = ?,
                thursday_from = ?,
                thursday_to = ?,
                friday_from = ?,
                friday_to = ?,
                saturday_from = ?,
                saturday_to = ?,
                sunday_from = ?,
                sunday_to = ? 
                WHERE
                user_guid = ?
                AND
                business_guid = ?`,
                [
                    open_status,
                    monday_from,
                    monday_to,
                    tuesday_from,
                    tuesday_to,
                    wednesday_from,
                    wednesday_to,
                    thursday_from,
                    thursday_to,
                    friday_from,
                    friday_to,
                    saturday_from,
                    saturday_to,
                    sunday_from,
                    sunday_to,
                    userGuid,
                    businessGuid
                ])


            return DoResponse({
                success: true,
                message: 'Business Hours Saved Successfully',
                workingHours: {
                    businessGuid,
                    userGuid,
                    open_status,
                    workingHours: {
                        Monday: {
                            monday_from: monday_from,
                            monday_to: monday_to
                        },
                        Tuesday: {
                            tuesday_from: tuesday_from,
                            tuesday_to: tuesday_to
                        },
                        Wednesday: {
                            wednesday_from: wednesday_from,
                            wednesday_to: wednesday_to
                        },
                        Thursday: {
                            thursday_from: thursday_from,
                            thursday_to: thursday_to
                        },
                        Friday: {
                            friday_from: friday_from,
                            friday_to: friday_to
                        },
                        Saturday: {
                            saturday_from: saturday_from,
                            saturday_to: saturday_to
                        },
                        Sunday: {
                            sunday_from: sunday_from,
                            sunday_to: sunday_to
                        }
                    }
                }
            }, 200)


        }
        catch (error: any) {
            console.log(error.message)
            return DoResponse({ error: error.message }, 500)
        }
    }

    return DoResponse({
        success: false,
        message: "method not allowed"
    }, 405)
}
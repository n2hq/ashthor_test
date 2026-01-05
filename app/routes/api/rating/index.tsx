import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node"
import { IAddUser, Rating } from "~/lib/types"
import { DoResponse, GenerateRandomHash, HashPwd } from "~/lib/lib"
import { query } from "../DB"

export const loader: LoaderFunction = async ({ request, params }) => {

    return DoResponse({
        success: false,
        message: "method not allowed"
    }, 405)


}

export async function action({ request }: ActionFunctionArgs) {
    const contentType = request.headers.get("Content-Type")
    if (contentType !== "application/json") {
        return DoResponse({ error: "Invalid content type. Expected JSON." }, 500)
    }

    if (request.method === "POST") {
        try {


            const body: Rating = await request.json()

            if (!body.business_guid) {
                return DoResponse({ error: "Please fill all information!" }, 400)
            }

            if (!body.user_guid) {
                return DoResponse({ error: "User GUID empty!" }, 400)
            }
            if (!body.rating) {
                return DoResponse({ error: "Rating empty!" }, 400)
            }
            if (!body.comment) {
                return DoResponse({ error: "Please write a comment!" }, 400)
            }
            if (!body.fullname) {
                return DoResponse({ error: "Please fill in full name!" }, 400)
            }


            const userGuid = body.user_guid
            const businsessGuid = body.business_guid
            const rating = body.rating
            const comment = body.comment
            const fullname = body.fullname
            const ratingGuid = crypto.randomUUID()


            {/** get the business */ }
            const business: any = await query(`SELECT * FROM tbl_dir
                WHERE
                gid = ?`, [businsessGuid])



            {/** check if rating exists */ }
            const rows: any = await query(`SELECT * FROM tbl_rating 
                WHERE
                user_guid = ?
                AND
                business_guid = ?
                ORDER BY
                created_at
                DESC`,
                [
                    userGuid,
                    businsessGuid
                ])



            if ((rows as any[]).length > 0) {
                {/** update if rating exists */ }

                const result = await query(`UPDATE tbl_rating 
                    SET 
                    rating = ?, 
                    comment = ?, 
                    fullname = ?  
                    WHERE
                    user_guid = ? 
                    AND 
                    business_guid = ?`,
                    [
                        rating,
                        comment,
                        fullname,
                        userGuid,
                        businsessGuid
                    ])


                {/** total query of all ratings */ }
                const oldRatingsData: any = await query(`SELECT SUM(r.rating) AS rating_total, COUNT(r.rating) AS rating_count FROM tbl_rating r
                    WHERE
                    r.business_guid = ?`, [businsessGuid])


                const old_rating_total = oldRatingsData[0].rating_total
                const old_rating_count = oldRatingsData[0].rating_count


                //old rating
                const old_rating = Number(rows[0].rating)
                const new_rating = Number(rating)


                const old_rating_average = old_rating_total / old_rating_count

                const new_rating_total = old_rating_total - old_rating + new_rating
                const new_rating_count = old_rating_count
                const new_rating_average = new_rating_total / new_rating_count


                const updateTblDir = await query(`UPDATE tbl_dir d
                    SET 
                    d.rating_total = ?, 
                    d.rating_count = ?, 
                    d.rating_average = ?  
                    WHERE
                    d.gid = ?`,
                    [
                        new_rating_total,
                        new_rating_count,
                        new_rating_average,
                        businsessGuid
                    ])


            } else {
                {/** insert if it doesn't exist */ }
                console.log('there')
                {/** total query of all ratings */ }
                const oldRatingsData: any = await query(`SELECT SUM(r.rating) AS rating_total, COUNT(r.rating) AS rating_count FROM tbl_rating r
                    WHERE
                    r.business_guid = ?`, [businsessGuid])



                const result = await query(`INSERT INTO tbl_rating 
                    (rating, comment, fullname, user_guid, business_guid, rating_guid)
                    VALUES
                    (?, ?, ?, ?, ?, ?)`,
                    [
                        rating,
                        comment,
                        fullname,
                        userGuid,
                        businsessGuid,
                        ratingGuid
                    ])




                console.log(businsessGuid)
                console.log(`SELECT SUM(r.rating) AS rating_total, COUNT(r.rating) AS rating_count FROM tbl_rating r
                    WHERE
                    r.business_guid = ?`)


                const old_rating_total = Number(oldRatingsData[0].rating_total)
                const old_rating_count = Number(oldRatingsData[0].rating_count)
                const new_rating = Number(rating)


                console.log(old_rating_total)
                console.log(old_rating_count)
                console.log(new_rating)
                console.log('----cool-----')

                const new_rating_total = old_rating_total + new_rating
                const new_rating_count = old_rating_count + 1
                const new_rating_average = new_rating_total / new_rating_count


                console.log(new_rating_total)
                console.log(new_rating_count)
                console.log(new_rating_average)
                console.log('====m====')

                const updateTblDir = await query(`UPDATE tbl_dir 
                    SET 
                    rating_total = ?, 
                    rating_count = ?, 
                    rating_average = ?  
                    WHERE 
                    gid = ?
                    `,
                    [
                        new_rating_total,
                        new_rating_count,
                        new_rating_average,
                        businsessGuid
                    ])

            }



            let responseData = null

            if ((rows as any[]).length > 0) {
                body.rating_guid = rows[0].rating_guid
                responseData = {
                    success: true,
                    message: "rating updated successfully",
                    data: body
                }
            } else {
                body.rating_guid = ratingGuid
                responseData = {
                    success: true,
                    message: "rating created successfully",
                    data: body
                }
            }


            return DoResponse(responseData, 200)

        } catch (error: any) {
            console.log(error.message)
            return DoResponse({ error: error.message }, 500)
        }
    }

    return DoResponse({ error: "method not allowed" }, 200)
}
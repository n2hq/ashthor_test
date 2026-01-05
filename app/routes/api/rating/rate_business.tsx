import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node"
import { DoResponse } from "~/lib/lib"
import { BusinessRatingsType } from "~/lib/types"
import { query } from "../DB"

export const loader: LoaderFunction = async ({ request, params }) => {

    return DoResponse({
        success: false,
        message: "method not allowed"
    }, 405)


}

export interface BusinessRatingSummary {
    avg_rating?: number;
    sum_of_rating?: number;
    count_of_rating?: number;
    avg_communication?: number;
    sum_of_communication?: number;
    count_of_communication?: number;
    avg_customer_service?: number;
    sum_of_customer_service?: number;
    count_of_customer_service?: number;
    avg_overall_satisfaction?: number;
    sum_of_overall_satisfaction?: number;
    count_of_overall_satisfaction?: number;
    avg_quality?: number;
    sum_of_quality?: number;
    count_of_quality?: number;
    avg_value?: number;
    sum_of_value?: number;
    count_of_value?: number;
}

const computeRatings = (rate: BusinessRatingSummary, received: any) => {
    /**
    * rating
    */
    let business_avg_rating = rate?.avg_rating || 0
    let business_sum_of_rating = rate?.sum_of_rating || 0
    let old_count = rate?.count_of_rating || 0

    let new_count = old_count + 1
    console.log(`here ${new_count} = ${old_count}`)

    let new_sum_of_rating = Number(business_sum_of_rating) + Number(received.avg_rating)
    console.log(new_sum_of_rating)
    let new_business_avg_rating = (new_sum_of_rating / new_count)


    /**
     * communication
     */
    let business_avg_communication = rate?.avg_communication || 0
    let business_sum_of_communication = rate?.sum_of_communication || 0

    let new_sum_of_communication = Number(business_sum_of_communication) + Number(received.communication)
    let new_communication_avg = (new_sum_of_communication / new_count)

    /**
     * customer service
     */
    let business_avg_customer_service = rate?.avg_customer_service || 0
    let business_sum_of_customer_service = rate?.sum_of_customer_service || 0

    let new_sum_of_customer_service = Number(business_sum_of_customer_service) + Number(received.customer_service)
    let new_customer_service_avg = (new_sum_of_customer_service / new_count)


    /**
     * overall satisfaction
     */
    let business_avg_overall_satisfaction = rate?.avg_overall_satisfaction || 0
    let business_sum_of_overall_satisfaction = rate?.sum_of_overall_satisfaction || 0

    let new_sum_of_overall_satisfaction = Number(business_sum_of_overall_satisfaction) + Number(received.overall_satisfaction)
    let new_overall_satisfaction_avg = (new_sum_of_overall_satisfaction / new_count)


    /**
     * quality
     */
    let business_avg_quality = rate?.avg_quality || 0
    let business_sum_of_quality = rate?.sum_of_quality || 0

    let new_sum_of_quality = Number(business_sum_of_quality) + Number(received.quality)
    let new_quality_avg = (new_sum_of_quality / new_count)

    /**
     * value
     */
    let business_avg_value = rate?.avg_value || 0
    let business_sum_of_value = rate?.sum_of_value || 0

    let new_sum_of_value = Number(business_sum_of_value) + Number(received.value)
    let new_value_avg = (new_sum_of_value / new_count)




    const _existingSummaryInfo = {
        business_avg_rating, business_sum_of_rating, old_count,
        business_avg_quality, business_sum_of_quality,
        business_avg_communication, business_sum_of_communication,
        business_avg_customer_service, business_sum_of_customer_service,
        business_avg_value, business_sum_of_value,
        business_avg_overall_satisfaction, business_sum_of_overall_satisfaction,
    }

    const _newSummaryInfo = {
        new_business_avg_rating, new_sum_of_rating, new_count,
        new_quality_avg, new_sum_of_quality,
        new_communication_avg, new_sum_of_communication,
        new_customer_service_avg, new_sum_of_customer_service,
        new_value_avg, new_sum_of_value,
        new_overall_satisfaction_avg, new_sum_of_overall_satisfaction
    }

    return {
        _existingSummaryInfo,
        _newSummaryInfo
    }

}


const computeUpdateRatings = (rate: BusinessRatingSummary, received: any, existingUserRating: any) => {
    /**
    * rating
    */
    const existing_avg_rating = existingUserRating.avg_rating
    const existing_quality = existingUserRating.quality
    const existing_customer_service = existingUserRating.customer_service
    const existing_communication = existingUserRating.communication
    const existing_overall_satisfaction = existingUserRating.overall_satisfaction
    const existing_value = existingUserRating.value

    let business_avg_rating = rate?.avg_rating || 0
    let business_sum_of_rating = rate?.sum_of_rating || 0
    let old_count = rate?.count_of_rating || 0

    let new_count = old_count


    let new_sum_of_rating = Number(business_sum_of_rating) - Number(existing_avg_rating) + Number(received.avg_rating)
    let new_business_avg_rating = (new_sum_of_rating / new_count)


    /**
     * communication
     */
    let business_avg_communication = rate?.avg_communication || 0
    let business_sum_of_communication = rate?.sum_of_communication || 0

    let new_sum_of_communication =
        Number(business_sum_of_communication) - Number(existing_communication) + Number(received.communication)
    let new_communication_avg = (new_sum_of_communication / new_count)

    /**
     * customer service
     */
    let business_avg_customer_service = rate?.avg_customer_service || 0
    let business_sum_of_customer_service = rate?.sum_of_customer_service || 0

    let new_sum_of_customer_service =
        Number(business_sum_of_customer_service) - Number(existing_customer_service) + Number(received.customer_service)
    let new_customer_service_avg = (new_sum_of_customer_service / new_count)


    /**
     * overall satisfaction
     */
    let business_avg_overall_satisfaction = rate?.avg_overall_satisfaction || 0
    let business_sum_of_overall_satisfaction = rate?.sum_of_overall_satisfaction || 0

    let new_sum_of_overall_satisfaction =
        Number(business_sum_of_overall_satisfaction) - Number(existing_overall_satisfaction) + Number(received.overall_satisfaction)
    let new_overall_satisfaction_avg = (new_sum_of_overall_satisfaction / new_count)


    /**
     * quality
     */
    let business_avg_quality = rate?.avg_quality || 0
    let business_sum_of_quality = rate?.sum_of_quality || 0

    let new_sum_of_quality =
        Number(business_sum_of_quality) - Number(existing_quality) + Number(received.quality)
    let new_quality_avg = (new_sum_of_quality / new_count)

    /**
     * value
     */
    let business_avg_value = rate?.avg_value || 0
    let business_sum_of_value = rate?.sum_of_value || 0

    let new_sum_of_value =
        Number(business_sum_of_value) - Number(existing_value) + Number(received.value)
    let new_value_avg = (new_sum_of_value / new_count)




    const _existingSummaryInfo = {
        business_avg_rating, business_sum_of_rating, old_count,
        business_avg_quality, business_sum_of_quality,
        business_avg_communication, business_sum_of_communication,
        business_avg_customer_service, business_sum_of_customer_service,
        business_avg_value, business_sum_of_value,
        business_avg_overall_satisfaction, business_sum_of_overall_satisfaction,
    }

    const _newSummaryInfo = {
        new_business_avg_rating, new_sum_of_rating, new_count,
        new_quality_avg, new_sum_of_quality,
        new_communication_avg, new_sum_of_communication,
        new_customer_service_avg, new_sum_of_customer_service,
        new_value_avg, new_sum_of_value,
        new_overall_satisfaction_avg, new_sum_of_overall_satisfaction
    }

    return {
        _existingSummaryInfo,
        _newSummaryInfo
    }

}
export async function action({ request }: ActionFunctionArgs) {


    if (request.method === "POST") {
        try {
            const body: any = await request.json()
            const user_guid = body.user_guid
            const business_guid = body.business_guid
            const communication = body.communication
            const customer_service = body.customer_service
            const experience = body.experience
            const overall_satisfaction = body.overall_satisfaction
            const quality = body.quality
            const title = body.title
            const value = body.value
            const avg_rating = (Number(quality) + Number(customer_service) + Number(communication) + Number(value) + Number(overall_satisfaction)) / 5
            const rating_guid = crypto.randomUUID()
            const ratingExists = false

            const received = {
                avg_rating, business_guid, communication,
                customer_service, experience, overall_satisfaction,
                quality, title, user_guid, value, rating_guid, ratingExists
            }

            let esi
            let nsi


            {/** check if the business rating by user exists */ }
            const ratingInDB: any = await query(`SELECT * FROM tbl_business_rating
                    WHERE
                    business_guid = ?
                    AND
                    user_guid = ?`,
                [
                    received.business_guid,
                    received.user_guid
                ])

            if ((ratingInDB as any[]).length > 0) {
                received.ratingExists = true

                received.rating_guid = ratingInDB[0].rating_guid
            }


            // doesn't exist
            if (received.ratingExists === false) {
                //insert into tbl_business_rating
                const result = await query(`INSERT INTO tbl_business_rating 
                    (business_guid, user_guid, communication, 
                    customer_service, experience, overall_satisfaction, 
                    quality, title, value, avg_rating, rating_guid)
                    VALUES
                    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        received.business_guid,
                        received.user_guid,
                        received.communication,
                        received.customer_service,
                        received.experience,
                        received.overall_satisfaction,
                        received.quality,
                        received.title,
                        received.value,
                        received.avg_rating,
                        received.rating_guid
                    ])

                //insert into tbl_business_rating_summary
                // get existing tbl_business_rating_summary
                const existingSummary: any = await query(`SELECT * FROM tbl_business_rating_summary
                    WHERE
                    business_guid = ?`,
                    [
                        received.business_guid
                    ])

                //check if the business exists in summary table
                let existsInSummary = false
                let ratingSummaryGuid
                if ((existingSummary as any[]).length > 0) {
                    existsInSummary = true
                    ratingSummaryGuid = existingSummary[0].rating_summary_guid

                }

                const ratingSummary = existingSummary[0]

                const { _existingSummaryInfo, _newSummaryInfo } = computeRatings(ratingSummary, received)

                esi = _existingSummaryInfo
                nsi = _newSummaryInfo

                if (existsInSummary) {
                    const updateRatingSummary: any = await query(`UPDATE tbl_business_rating_summary 
                        SET
                        avg_rating = ?, 
                        sum_of_rating = ?, 
                        count_of_rating = ?,
                        avg_communication = ?, 
                        sum_of_communication = ?,
                        avg_customer_service = ?, 
                        sum_of_customer_service = ?, 
                        avg_overall_satisfaction = ?, 
                        sum_of_overall_satisfaction = ?,  
                        avg_quality = ?, 
                        sum_of_quality = ?,
                        avg_value = ?, 
                        sum_of_value = ? 
                        WHERE 
                        rating_summary_guid = ?
                        `, [nsi.new_business_avg_rating, nsi.new_sum_of_rating, nsi.new_count,
                    nsi.new_communication_avg, nsi.new_sum_of_communication,
                    nsi.new_customer_service_avg, nsi.new_sum_of_customer_service,
                    nsi.new_overall_satisfaction_avg, nsi.new_sum_of_overall_satisfaction,
                    nsi.new_quality_avg, nsi.new_sum_of_quality,
                    nsi.new_value_avg, nsi.new_sum_of_value, ratingSummaryGuid])
                } else {
                    const rating_summary_guid = crypto.randomUUID()
                    const newRateSummary: any = await query(`INSERT INTO tbl_business_rating_summary
                    (avg_rating, sum_of_rating, count_of_rating,
                    avg_communication, sum_of_communication,
                    avg_customer_service, sum_of_customer_service, 
                    avg_overall_satisfaction, sum_of_overall_satisfaction,  
                    avg_quality, sum_of_quality,
                    avg_value, sum_of_value,
                    business_guid, rating_summary_guid)
                    VALUES
                    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                        [
                            nsi.new_business_avg_rating, nsi.new_sum_of_rating, nsi.new_count,
                            nsi.new_communication_avg, nsi.new_sum_of_communication,
                            nsi.new_customer_service_avg, nsi.new_sum_of_customer_service,
                            nsi.new_overall_satisfaction_avg, nsi.new_sum_of_overall_satisfaction,
                            nsi.new_quality_avg, nsi.new_sum_of_quality,
                            nsi.new_value_avg, nsi.new_sum_of_value,
                            received.business_guid, rating_summary_guid
                        ])
                }




            }


            // rating by user exists
            if (received.ratingExists === true) {
                const existingUserRating = ratingInDB[0]



                // update the tbl_business_rating of the user
                const updatedRating = await query(`UPDATE tbl_business_rating 
                        SET 
                        communication = ?, 
                        customer_service = ?, 
                        experience = ?, 
                        overall_satisfaction = ?, 
                        quality = ?, 
                        title = ?, 
                        value = ?, 
                        avg_rating = ? 
                        WHERE 
                        business_guid = ?
                        AND
                        user_guid = ?
                        AND 
                        rating_guid = ?
                        `,
                    [
                        received.communication,
                        customer_service,
                        received.experience,
                        received.overall_satisfaction,
                        received.quality,
                        received.title,
                        received.value,
                        received.avg_rating,
                        received.business_guid,
                        received.user_guid,
                        received.rating_guid
                    ])


                // get existing tbl_business_rating_summary
                const existingSummary: any = await query(`SELECT * FROM tbl_business_rating_summary
                    WHERE
                    business_guid = ?`,
                    [
                        received.business_guid
                    ])

                const ratingSummary = existingSummary[0]
                const ratingSummaryGuid = ratingSummary.rating_summary_guid

                const { _existingSummaryInfo, _newSummaryInfo } = computeUpdateRatings(ratingSummary, received, existingUserRating)

                esi = _existingSummaryInfo
                nsi = _newSummaryInfo

                // update the tbl_business_rating_summary
                const updateRatingSummary: any = await query(`UPDATE tbl_business_rating_summary 
                        SET
                        avg_rating = ?, 
                        sum_of_rating = ?, 
                        count_of_rating = ?,
                        avg_communication = ?, 
                        sum_of_communication = ?,
                        avg_customer_service = ?, 
                        sum_of_customer_service = ?, 
                        avg_overall_satisfaction = ?, 
                        sum_of_overall_satisfaction = ?,  
                        avg_quality = ?, 
                        sum_of_quality = ?,
                        avg_value = ?, 
                        sum_of_value = ? 
                        WHERE 
                        rating_summary_guid = ?
                        `, [nsi.new_business_avg_rating, nsi.new_sum_of_rating, nsi.new_count,
                nsi.new_communication_avg, nsi.new_sum_of_communication,
                nsi.new_customer_service_avg, nsi.new_sum_of_customer_service,
                nsi.new_overall_satisfaction_avg, nsi.new_sum_of_overall_satisfaction,
                nsi.new_quality_avg, nsi.new_sum_of_quality,
                nsi.new_value_avg, nsi.new_sum_of_value, ratingSummaryGuid])
            }



            return DoResponse({
                ...received,
                ...esi,
                ...nsi
            }, 200)

        } catch (e: any) {
            console.log(e.message)
            return DoResponse({ error: e.message }, 500)
        }
    }

    //collect all the posted data


    // check if rating for this business has
    // been posted before by this user
    // criteria is userGuid and businessGuid
    // rating table is tbl_business_rating


    // update rating if it exists
    // criteria is userGuid and businessGuid
    // tables to update:
    // tbl_business_rating: userGuid, businessGuid, 
    // tbl_business_rating_summary: businessGuid

    // post a new rating if it doesn't


    return DoResponse({ error: "method not allowed" }, 200)
}
import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node"
import { DoResponse } from "~/lib/lib"
import { ProductType, ServiceType } from "~/lib/types"
import { query } from "../../DB"

export const loader: LoaderFunction = async ({ request, params }) => {
    try {
        const business_guid = params.business_guid
        const user_guid = params.user_guid

        // Get pagination parameters from query string
        const url = new URL(request.url)
        const page = parseInt(url.searchParams.get('page') || '1')
        const limit = parseInt(url.searchParams.get('limit') || '10')
        const offset = (page - 1) * limit

        // Validate pagination parameters
        if (page < 1) return DoResponse({ error: "Page must be greater than 0" }, 400)
        if (limit < 1 || limit > 100) return DoResponse({ error: "Limit must be between 1 and 100" }, 400)

        // Get total count for pagination metadata
        const countResult: any = await query(
            `SELECT COUNT(*) as total FROM tbl_services 
             WHERE business_guid = ? AND user_guid = ?`,
            [business_guid, user_guid]
        )

        const total = countResult[0]?.total || 0
        const totalPages = Math.ceil(total / limit)

        // Get paginated data
        const rawlisting: any = await query(
            `SELECT * FROM tbl_services 
             WHERE business_guid = ? AND user_guid = ?
             ORDER BY created_at DESC
             LIMIT ? OFFSET ?`,
            [business_guid, user_guid, limit, offset]
        )

        const services: ServiceType[] = rawlisting

        // Return with pagination metadata
        return DoResponse({
            data: services,
            pagination: {
                currentPage: page,
                limit,
                totalItems: total,
                itemsPerPage: limit,
                totalPages: totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1,
                offset
            }
        }, 200)
    }
    catch (error: any) {
        console.error("Loader Error:", error.message)
        return DoResponse({ error: error.message }, 500)
    }
}

export async function action({ request, params }: ActionFunctionArgs) {
    return DoResponse({ "error": "method not allowed" }, 405)
}
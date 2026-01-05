import React, { useEffect, useState } from 'react'
import { useAuth } from '~/context/AuthContext'
import { ReviewType, useWriteReviewAltContext } from '~/context/WriteReviewAltContext'
import { useWriteReviewContext } from '~/context/WriteReviewContext'
import { ListingType, RatingsDataType } from '~/lib/types'
import RatingBoxInfoCard from '~/routes/web/srch/assets/RatingBoxInfoCard'

interface ReviewProps {
    listing: ListingType
    reviewContext: ReviewType | null
}
const Reviews = ({ listing, reviewContext }: ReviewProps) => {
    const [business, setListing] = useState<ListingType>()
    const reviewCxt: ReviewType | null = useWriteReviewAltContext()
    const auth = useAuth()

    useEffect(() => {
        if (listing) {
            setListing(listing)

        }
    }, [listing])

    const showReviewDialog = () => {
        if (!auth?.user) {
            alert('Sign in to Write a Review.')
            return false;
        }
        reviewContext?.showDialog(true)
        reviewContext?.setListing(listing)
    }

    return (
        <div className={`text-lg underline text-black flex gap-3 place-items-center`}>

            <div
                className={`cursor-pointer`}
                onClick={() => showReviewDialog()}
            >
                Write Review
            </div>
        </div>
    )
}

export default Reviews

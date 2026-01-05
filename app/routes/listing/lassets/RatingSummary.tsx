import React, { useEffect, useState } from 'react'
import { BusinessReviewType, ListingType, RatingsDataType } from '~/lib/types'

import Reviews from './Reviews'
import { ReviewType } from '~/context/WriteReviewAltContext'
import { BusinessRatingSummary } from '~/routes/api/rating/rate_business'
import RatingBoxInfoCard from '~/components/content/RatingBoxInfoCard'

interface RatingSummaryProps {
    ratings: RatingsDataType
    listing: ListingType
    reviewContext: ReviewType | null
    businessRating: BusinessRatingSummary
}
const RatingSummary = ({ ratings, listing, reviewContext, businessRating }: RatingSummaryProps) => {
    const [ratingInfo, setRatingInfo] = useState<RatingsDataType>()
    const [averageRating, setAverageRating] = useState<number>(0)

    useEffect(() => {
        if (ratings) {
            setRatingInfo(ratings)
            const avgRating: number = parseFloat(Number(ratings?.rating_average)?.toFixed(1))
            setAverageRating(avgRating)
        }
    }, [ratings])

    return (
        <div className='mb-8 border-b border-solid md:border-none'>
            {/* <div className={`p-3 bg-gray-100`}>
                <div className={`text-[13px] tracking-normal font-normal text-gray-500 text-center pb-3 md:pb-5 max-w-[70%] md:max-w-full mx-auto w-full md:text-start md:text-lg leading-[1.3em]`}>
                    Please always verify businesses before conducting transactions. Do not send funds to unknown individuals.
                </div>
            </div> */}
            <div className={`grid grid-cols-3 border-none md:border md:border-solid rounded-3xl py-5 divide-x `}>
                <div className={`text-lg flex flex-col  place-items-center place-content-center`}>
                    <div className={`mx-[50%] text-center leading-[1.2em] text-[14px] md:text-[15px] font-semibold`}>
                        <div className={`md:hidden`}>
                            <Reviews listing={listing}
                                reviewContext={reviewContext}
                            />
                        </div>
                        <span className={`md:block hidden`}>User Reviews</span>
                    </div>
                </div>
                <div className={`flex flex-col place-items-center gap-y-1`}>
                    <div className={`text-xl font-semibold md:text-2xl`}>
                        {businessRating?.avg_rating || 0}
                    </div>
                    <div className={`text-lg`}>
                        <RatingBoxInfoCard rating={Number(businessRating?.avg_rating) || 0} />
                    </div>
                </div>
                <div className={`flex flex-col place-items-center gap-y-0`}>
                    <div className={`text-xl font-semibold md:text-2xl`}>
                        {businessRating?.count_of_rating || 0}
                    </div>
                    <div className={`text-[12px]`}>Reviews</div>
                </div>
            </div>
        </div>
    )
}

export default RatingSummary

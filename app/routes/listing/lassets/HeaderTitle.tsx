import React, { useEffect, useState } from 'react'
import Reviews from './Reviews'
import Share from './Share'
import { ListingType, ProfileImageType } from '~/lib/types'
import { WriteReviewProvider } from '~/context/WriteReviewContext'
import { ReviewType, WriteReviewAltProvider } from '~/context/WriteReviewAltContext'
import { ShareContextType, ShareDialogProvider } from '~/context/ShareDialogContext'

export interface HeaderTitleProp {
    listing: ListingType
    ratingsData: any
    reviewContext: ReviewType | null
    showShare: boolean
    shareContext: ShareContextType | null
    profileImg: string
    profileImageData: ProfileImageType | null
}
const HeaderTitle = ({ listing, ratingsData, reviewContext, showShare, shareContext, profileImg, profileImageData }: HeaderTitleProp) => {
    const [ratings, setRatings] = useState()

    useEffect(() => {
        if (ratingsData) {
            setRatings(ratingsData)

        }
    }, [ratingsData])


    return (
        <div className={`flex place-content-between place-items-center relative`}>


            <div className={`text-[24px] font-semibold text-center leading-[1.3em]  text-gray-700 line-clamp-1 w-auto tracking-tight`}>
                {listing.title}
            </div>


            <div className={` place-items-center gap-4 flex relative top-1 w-fit`}>
                <WriteReviewAltProvider>
                    <Reviews listing={listing} reviewContext={reviewContext} />
                </WriteReviewAltProvider>
                <ShareDialogProvider>
                    <Share
                        shareContext={shareContext}
                        listing={listing}
                        profileImg={profileImg}
                        profileImageData={profileImageData}
                    />
                </ShareDialogProvider>
            </div>
        </div>
    )
}

export default HeaderTitle

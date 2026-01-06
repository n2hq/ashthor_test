import React, { useEffect, useState } from 'react'
import AlternateImage from '~/components/content/AlternateImage'
import ReadMoreAboutContext, { useReadMoreContext } from '~/context/ReadMoreAboutContext'
import { appConfig, config, convertDashToSpace, formatNumber, getBusinessProfileImageData, getInitials } from '~/lib/lib'
import { ListingType } from '~/lib/types'

export interface AboutProps {
    listing: ListingType
}
const StartingAmount = ({ listing }: AboutProps) => {
    const [img, setImg] = useState('')
    const [placeholder, setPlaceholder] = useState(appConfig.fallbackImg)
    const [isImgNull, setIsImgNull] = useState(false)

    useEffect(() => {
        if (listing.gid) {
            //console.log(listing)
            let imgdata = getBusinessProfileImageData(listing.gid)
            imgdata.then((data) => {
                if (data?.image_url === '' || data?.image_url === undefined || data?.image_url === null) {
                    setImg(placeholder)
                    setIsImgNull(true)
                } else {
                    setImg(config.IMG_BASE_URL + data.image_url)
                }

            })
        }
    }, [listing])

    const readMoreCtx = useReadMoreContext()

    const handleReadMore = (description: string) => {
        readMoreCtx?.setDescription(description)
        readMoreCtx?.setShow(true)
        readMoreCtx?.setTitle('About this business')
    }

    return (
        <div className={` border-t py-10`}>

            {/** about title */}
            <div className={`text-[22px] md:text-[25px] font-semibold`}>
                Starting Amount
            </div>





            {/** about description */}

            {

                <div className={`mt-6 flex gap-12 place-items-start`}>
                    <div className={`grow text-lg`}>
                        {listing?.starting_note || 'This business has no minimum amount set.'}
                    </div>
                    <div className={`text-4xl`}>

                        {listing?.currency}{formatNumber(Number(listing?.minimum_amount || 0))}
                    </div>
                </div>
            }
        </div>
    )
}

export default StartingAmount

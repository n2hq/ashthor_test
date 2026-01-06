import React, { ReactNode, useEffect, useState } from 'react'
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

    const handleReadMore = (description: string | ReactNode) => {
        readMoreCtx?.setDescription(description)
        readMoreCtx?.setShow(true)
        readMoreCtx?.setTitle('Starting amount')
    }

    const [starting, setStarting] = useState<ReactNode | null>(null)

    useEffect(() => {
        if (listing) {
            if (listing?.starting_note && listing?.minimum_amount) {
                let str = <div>
                    <div className={`text-3xl font-semibold`}>
                        {listing?.currency}{formatNumber(Number(listing?.minimum_amount))}
                    </div>
                    <div className={`text-lg mt-6`}>
                        {listing?.starting_note}
                    </div>

                </div>

                setStarting(str)
            }

        }
    }, [listing])
    return (
        <div className={` border-t py-10 relative`}>

            {/** about title */}
            <div className={`text-[22px] md:text-[25px] font-semibold`}>
                Starting Amount
            </div>
            <div className={`text-sm`}>
                Promos, Special Offers, Seasonal Offers and more.
            </div>





            {/** about description */}

            {

                <div className={`mt-6 flex gap-12 place-items-start relative`}>
                    <div className={`grow text-lg line-clamp-2`}>
                        {

                            (!listing?.starting_note && Number(listing?.minimum_amount <= 0)) ? 'This business has no minimum amount set.' : (listing?.starting_note || 'This may cover core business services or products. It could also include promos, seasonal and special offers.')
                        }
                    </div>
                    <div className={`text-4xl`}>

                        {listing?.currency}{formatNumber(Number(listing?.minimum_amount || 0))}
                    </div>
                </div>
            }

            {

                <button className={`mt-6 shadow-md rounded-xl text-xl px-5 py-3 bg-[#895129]/20 `}
                    onClick={() => {
                        if (starting === null) {
                            handleReadMore(listing?.starting_note)
                        } else {
                            handleReadMore(starting)
                        }
                    }}
                >
                    Read more
                </button>
            }
        </div>
    )
}

export default StartingAmount

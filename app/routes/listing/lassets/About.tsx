import React, { useEffect, useState } from 'react'
import AlternateImage from '~/components/content/AlternateImage'
import ReadMoreAboutContext, { useReadMoreContext } from '~/context/ReadMoreAboutContext'
import { appConfig, config, convertDashToSpace, getBusinessProfileImageData, getInitials } from '~/lib/lib'
import { ListingType } from '~/lib/types'

export interface AboutProps {
    listing: ListingType
}
const About = ({ listing }: AboutProps) => {
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
        <div className={`mt-12 border-t py-10`}>

            {/** about title */}
            <div className={`text-[22px] md:text-[25px] font-bold`}>
                About
            </div>


            {/** about logo and business title */}

            <div className={`flex place-items-center gap-x-3 mt-4`}>
                <div className={`relative w-[50px] h-[50px] rounded-2xl overflow-hidden border`}>
                    {
                        !isImgNull ?
                            <img
                                src={img}
                                alt=""
                                className={`object-cover w-full h-full`}
                            /> :
                            <AlternateImage title={listing?.title} />
                    }
                </div>

                <div className={`flex flex-col`}>
                    <div className={`text-lg font-semibold`}>{listing.title}</div>
                    <div className={`text-black font-semibold text-[10px] uppercase`}>{convertDashToSpace(listing.category)}</div>
                </div>
            </div>


            {/** about description */}

            <div className={`text-[15px] text-gray-700 mt-6 font-light`}>
                {listing.short_description}
            </div>

            <div className={`mt-6`}>
                <button onClick={() => handleReadMore(listing?.long_description)} className={`px-5 py-3 bg-[#895129]/20 text-[15px] w-full md:w-fit rounded-2xl`}>
                    Read more
                </button>
            </div>
        </div>
    )
}

export default About

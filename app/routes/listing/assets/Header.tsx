import React, { useEffect, useState } from 'react'
import StarRatingAlt from './StarRatingAlt'
import { appConfig, config } from '~/lib/lib'
import FormattedAddress from './FormattedAddress'
import Placeholder from '~/components/content/Placeholder'

const Header = ({ listing, profileImageData, operatingHoursStatus, ratingsData }: any) => {
    const [profileImg, setProfileImg] = useState('')
    const [placeholder, setPlaceholder] = useState('/images/bycetplaceholder.png')
    useEffect(() => {
        if (profileImageData?.image_url) {

            setProfileImg(config.IMG_BASE_URL + profileImageData?.image_url)
        } else {
            setProfileImg(placeholder)
        }
    }, [profileImageData])

    const fallbackImg = `/images/fallbackBusinessImg.png`

    return (
        <div className={` mt-4`}>
            {/* <div className={`h-[5px] bg-gradient-to-r from-black to-blue-500 w-full mt-2 `}>

            </div> */}
            <div className={`flex gap-3  w-full   md:rounded-xl`}>

                {/** business logo */}
                <div className={`bg-white w-[60px] min-w-[60px] md:w-[95px] md:min-w-[95px] h-[60px] md:h-[95px] relative rounded-lg overflow-hidden `}>
                    {
                        (profileImageData?.image_url === undefined || profileImageData?.image_url === null || profileImageData?.image_url === '') &&
                        <div className={`absolute top-0 h-full w-full flex place-content-center place-items-center font-bold text-white bg-black/20 text-[8px] tracking-[3px] flex-col`}>
                            <div>AUTOMATIC</div>
                            <div>GENERATED</div>
                        </div>
                    }
                    {
                        profileImageData?.image_url ?
                            <img
                                src={config.IMG_BASE_URL + profileImageData?.image_url}
                                alt="85x90"
                                className={` object-cover w-full h-full  shadow-gray-300 `}
                            /> :
                            <img
                                src={appConfig.fallbackImg}
                                alt=""
                                className={`object-cover w-full h-full shadow-lg shadow-gray-300`}
                            />
                    }
                </div>

                {/** business details */}
                <div className={`w-full block`}>
                    <div className={`text-[19px] md:text-[22px]
                font-semibold  leading-[1.1em] font-sans text-blue-800 `}>
                        {listing?.title}

                    </div>



                    <div className={` leading-[1.3em] space-x-1 mt-1`}>
                        {
                            operatingHoursStatus !== undefined &&
                            <div className={` leading-[1.2em]`}>
                                <div className={` line-clamp-1`}>

                                    <FormattedAddress listing={listing} />
                                </div>

                                <div className={` w-full mx-auto mt-1.5`}>
                                    {operatingHoursStatus?.localTimeText}
                                </div>

                                <div className={`mt-1.5`}>
                                    {
                                        operatingHoursStatus.openStatus === "selected_hours" ?
                                            <div>
                                                {operatingHoursStatus.todayHoursFormatted}

                                            </div> :
                                            <div>
                                                {
                                                    operatingHoursStatus.openStatus === "always_open" &&
                                                    <div key={'1'} className={`bg-blue-700 px-2 rounded w-fit text-white pt-[2px] pb-[4px]`}>
                                                        Always Open
                                                    </div>
                                                }
                                                {
                                                    operatingHoursStatus.openStatus === "permanently_closed" &&
                                                    <div key={'2'} className={`bg-red-700 px-2 rounded-lg w-fit text-white pt-[2px] pb-[4px]`}>
                                                        Permantently Closed
                                                    </div>
                                                }
                                                {
                                                    operatingHoursStatus.openStatus === "temporarily_closed" &&
                                                    <div key={'3'} className={`bg-orange-400 px-2 rounded-lg w-fit text-white pt-[2px] pb-[4px]`}>
                                                        Temporarily Closed
                                                    </div>
                                                }
                                            </div>
                                    }

                                </div>

                            </div>

                        }


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header

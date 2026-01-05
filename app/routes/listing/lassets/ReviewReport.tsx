import React, { ReactNode, useEffect, useState } from 'react'
import { BiChat, BiHotel, BiKey } from 'react-icons/bi'
import { BsStar, BsStarFill } from 'react-icons/bs'
import { FaGoodreadsG } from 'react-icons/fa'
import { FcRating } from 'react-icons/fc'
import { GiVacuumCleaner } from 'react-icons/gi'
import { LuMapPinPlus } from 'react-icons/lu'
import { MdHighQuality, MdOutlineHighQuality, MdSentimentSatisfied, MdSentimentVerySatisfied } from 'react-icons/md'
import { RiCustomerService2Fill, RiInformation2Fill } from 'react-icons/ri'
import { RxValue, RxValueNone } from 'react-icons/rx'
import { ListingType } from '~/lib/types'
import { BusinessRatingSummary } from '~/routes/api/rating/rate_business'

const reviewRept = [
    {
        title: "Cleanliness",
        score: "5.0",
        icon: <GiVacuumCleaner />
    },
    {
        title: "Accuracy",
        score: "5.0",
        icon: <FaGoodreadsG />
    },
    {
        title: "Check-in",
        score: "5.0",
        icon: <BiKey />
    },
    {
        title: "Communication",
        score: "5.0",
        icon: <BiChat />
    },
    {
        title: "Location",
        score: "5.0",
        icon: <LuMapPinPlus />
    },
    {
        title: "Value",
        score: "5.0",
        icon: <BiHotel />
    },
]

export type ReviewReportType = {
    title: string | undefined
    score: string | undefined
    icon: ReactNode
}

let reviewReport = [
    {
        title: "Overall Rating",
        score: "0",
        icon: <BsStarFill className={``} />
    },
    {
        title: "Quality",
        score: "0",
        icon: <MdOutlineHighQuality />
    },
    {
        title: "Customer Service",
        score: "0",
        icon: <RiCustomerService2Fill />
    },
    {
        title: "Communication",
        score: "0",
        icon: <BiChat />
    },
    {
        title: "Value",
        score: "0",
        icon: <RiInformation2Fill />

    },
    {
        title: "Overall Satisfaction",
        score: "0",
        icon: <MdSentimentVerySatisfied />
    }

]

interface ReviewReportProps {
    businessRating: BusinessRatingSummary | null
    listing: ListingType
}

const ReviewReport = ({ businessRating, listing }: ReviewReportProps) => {
    const [ratingReport, setRatingReport] = useState<BusinessRatingSummary | null>(null)
    useEffect(() => {
        if (businessRating) {
            setRatingReport(businessRating)
            console.log(businessRating)
        }
    }, [businessRating])

    useEffect(() => {
        if (ratingReport) {
            console.log(ratingReport)
            let rpt: ReviewReportType[] = reviewReport

            rpt[0].score = ratingReport?.avg_rating?.toString()
            rpt[1].score = ratingReport?.avg_quality?.toString()
            rpt[2].score = ratingReport?.avg_customer_service?.toString()
            rpt[3].score = ratingReport?.avg_communication?.toString()
            rpt[4].score = ratingReport?.avg_value?.toString()
            rpt[5].score = ratingReport?.avg_overall_satisfaction?.toString()

            console.log(reviewReport)

        }
    }, [ratingReport])
    return (
        <div className={`mt-24`}>
            <div className=' border-t border-gray-300 mb-20' />
            <div className={`text-center text-5xl font-semibold`}>
                {
                    ratingReport ? ratingReport.avg_rating :
                        <span>
                            Oops<i>!</i> No rating yet.'
                        </span>
                }
            </div>
            <div className={`mt-6 flex place-items-center flex-col gap-y-2`}>
                <div className={`text-2xl font-semibold`}>
                    {listing?.title}

                </div>
                <div className={`max-w-[800px] mx-auto w-full text-center text-[15px] font-light mt-6`}>
                    {listing?.short_description}
                </div>
            </div>

            <div className={`mt-20`}>
                <div className={`max-w-[1100px] mx-auto w-full`}>
                    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 place-content-between `}>
                        {
                            reviewReport?.map((item, i: number) => {
                                return (
                                    <div
                                        key={i}
                                        className={`flex flex-col gap-y-3 p-5 border rounded-xl  relative h-auto shadow-lg shadow-gray-200/50`}>
                                        <div className={`text-[15px] font-base leading-[1.1em] font-semibold text-gray-800 `}>
                                            {

                                                item.title


                                            }
                                        </div>

                                        <div className={`text-3xl flex flex-col grow w-full text-start place-content-end gap-y-1`}>

                                            <div className={` ${ratingReport ? 'text-[16px]' : 'text-[13px]'} `}>
                                                {
                                                    ratingReport ?
                                                        item.score :
                                                        'No Rating'
                                                }
                                            </div>
                                            <div className={`text-cyan-500 text-3xl`}>
                                                {item.icon}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <div className={`mt-20 border-t`} />
        </div>
    )
}

export default ReviewReport

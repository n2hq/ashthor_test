import { Link } from '@remix-run/react'
import React from 'react'
import { BiStar } from 'react-icons/bi'
import { ReviewReportType } from './ReviewReport'
import { BusinessRatingSummary } from '~/routes/api/rating/rate_business'
import { BusinessReviewType } from '~/lib/types'
import { getFormattedDateTime } from '~/lib/lib'
import RatingBoxInfoCard from '~/components/content/RatingBoxInfoCard'


const urev = [
    {
        name: "Ruba",
        img: `https://images.unsplash.com/photo-1593696140826-c58b021acf8b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhbCUyMGVzdGF0ZSUyMGludGVyaW9yfGVufDB8fDB8fHww`,
        location: "Al Khobar, Saudi Arabia",
        rating: 5,
        date: "November 2025",
        review: `I had a wonderful experience at this hotel from start to finish. The host were welcoming, and always ready to help with a smile. The room was spotless, spacious, and very comfortable`
    },
    {
        name: "Domenico",
        img: `https://images.unsplash.com/photo-1593696140826-c58b021acf8b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhbCUyMGVzdGF0ZSUyMGludGVyaW9yfGVufDB8fDB8fHww`,
        location: "Al Khobar, Saudi Arabia",
        rating: 5,
        date: "November 2025",
        review: `I had a wonderful experience at this hotel from start to finish. The host were welcoming, and always ready to help with a smile. The room was spotless, spacious, and very comfortable`
    },
    {
        name: "Aboularine",
        img: `https://images.unsplash.com/photo-1593696140826-c58b021acf8b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhbCUyMGVzdGF0ZSUyMGludGVyaW9yfGVufDB8fDB8fHww`,
        location: "Al Khobar, Saudi Arabia",
        rating: 5,
        date: "November 2025",
        review: `I had a wonderful experience at this hotel from start to finish. The host were welcoming, and always ready to help with a smile. The room was spotless, spacious, and very comfortable`
    },
    {
        name: "Mostafa",
        img: `https://images.unsplash.com/photo-1593696140826-c58b021acf8b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhbCUyMGVzdGF0ZSUyMGludGVyaW9yfGVufDB8fDB8fHww`,
        location: "Al Khobar, Saudi Arabia",
        rating: 5,
        date: "November 2025",
        review: `I had a wonderful experience at this hotel from start to finish. The host were welcoming, and always ready to help with a smile. The room was spotless, spacious, and very comfortable`
    },
    {
        name: "Tatiana Andrea",
        img: `https://images.unsplash.com/photo-1593696140826-c58b021acf8b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhbCUyMGVzdGF0ZSUyMGludGVyaW9yfGVufDB8fDB8fHww`,
        location: "Bucaramanga, Colombia",
        rating: 5,
        date: "November 2025",
        review: `I had a wonderful experience at this hotel from start to finish. The host were welcoming, and always ready to help with a smile. The room was spotless, spacious, and very comfortable`
    },
    {
        name: "Ruba",
        img: `https://images.unsplash.com/photo-1593696140826-c58b021acf8b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhbCUyMGVzdGF0ZSUyMGludGVyaW9yfGVufDB8fDB8fHww`,
        location: "Al Khobar, Saudi Arabia",
        rating: 5,
        date: "November 2025",
        review: `I had a wonderful experience at this hotel from start to finish. The host were welcoming, and always ready to help with a smile. The room was spotless, spacious, and very comfortable`
    }
]

export interface UserReviewsProps {
    businessReviews: BusinessReviewType[]
}
const UserReviews = ({ businessReviews }: UserReviewsProps) => {
    return (
        <div className={`my-16`}>
            <div className={`grid md:grid-cols-2 gap-16`}>
                {
                    businessReviews?.map((item, i: number) => {
                        const date = getFormattedDateTime(item.created_at)

                        return (
                            <div key={i}>
                                <Link to={`/`}>
                                    <div>
                                        <div className={`flex place-items-start gap-3`}>
                                            <div className={`relative h-[40px] w-[40px] rounded-full overflow-hidden`}>
                                                <img
                                                    src={item.img || `/images/pcho.png`}
                                                    alt=""
                                                    className={`object-cover h-full w-full`}
                                                />
                                            </div>
                                            <div>
                                                <div className={`text-lg font-semibold`}>
                                                    {`${item.firstname} ${item.lastname}`}
                                                </div>
                                                <div>
                                                    {item.city_name && item.city_name + ', '}
                                                    {item.country_name}
                                                </div>

                                                <div className={`flex place-items-center`}>

                                                    <div className={`text-[15px] flex place-items-center gap-2`}>

                                                        <RatingBoxInfoCard rating={Number(item.avg_rating)} />

                                                        <span>
                                                            {item.avg_rating}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className={`flex place-items-center gap-3 mt-2`}>

                                            <div>
                                                {date}
                                            </div>
                                        </div>
                                        <div className={`text-[14px] font-light mt-2`}>
                                            {item.experience}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default UserReviews

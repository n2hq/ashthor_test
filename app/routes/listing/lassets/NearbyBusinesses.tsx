import { Link } from '@remix-run/react'
import React, { useState } from 'react'
import { BiStar } from 'react-icons/bi'
import AlternateImage from '~/components/content/AlternateImage'
import RatingBoxInfoCard from '~/components/content/RatingBoxInfoCard'
import { config } from '~/lib/lib'
import { ListingType } from '~/lib/types'



const nearby2 = [
    {
        title: "Two More Beers London",
        star: "4.9",
        reviews: 169,
        img: `https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/c9/bc/33/front-of-the-pub.jpg?w=800&h=-1&s=1`
    },
    {
        title: "The Ceaser Hotel",
        star: "4.9",
        reviews: 169,
        img: `https://dynamic-media-cdn.tripadvisor.com/media/photo-o/31/24/f3/54/exterior.jpg?w=800&h=600&s=1`
    },
    {
        title: "The 55 By Le Mirage",
        star: "4.9",
        reviews: 169,
        img: `https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/54/66/f5/enjoy-a-delicious-drink.jpg?w=800&h=600&s=1`
    },
    {
        title: "DoubleTree by Hilton London - Hyde Park",
        star: "4.9",
        reviews: 169,
        img: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9lJXEfx_-xLm-T_ZTYIERDH5ofKPB0YGXtQ&s`
    },
    {
        title: "Chamuyo Basywater",
        star: "4.9",
        reviews: 169,
        img: `https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/53/cc/5c/main-room.jpg?w=800&h=600&s=1`
    },
    {
        title: "Rudy's Pizza Napoletana - Queensway",
        star: "4.9",
        reviews: 169,
        img: `https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/ab/49/bd/bow-bar.jpg?w=800&h=600&s=1`
    },
    {
        title: "Bella Italia",
        star: "4.9",
        reviews: 169,
        img: `https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/0d/4d/76/outside-front-of-pub.jpg?w=800&h=600&s=1`
    },
]

export interface NearbyProps {
    nearby: ListingType[] | null
}
const NearbyBusinesses = ({ nearby }: NearbyProps) => {
    console.log(nearby)
    console.log('hala')
    return (
        <div className='mt-12'>
            <div className={`border-t border-gray-200 py-10`}>
                <div className={`text-[22px] md:text-[25px] font-semibold`}>
                    Businesses nearby
                </div>

                <div className={`grid lg:grid-cols-12`}>
                    <div className={`lg:col-span-8`}>
                        <BestNearbyList nearby={nearby} />

                    </div>
                    <div className={`lg:col-span-4`}>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default NearbyBusinesses


const BestNearbyList = ({ nearby }: NearbyProps) => {
    return (
        <div>
            {/** header */}
            <div className={`mt-4`}>
                <div className={`flex place-content-between place-items-center`}>
                    <div className={`text-[16px] font-semibold`}>
                        Businesses near here
                    </div>
                    <div className={`text-[14px] text-right underline`}>
                        See all
                    </div>
                </div>
            </div>

            {/** list */}
            <div className={`mt-4`}>
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-12`}>
                    {
                        nearby !== null &&
                        nearby?.map((item: ListingType, i: number) => {
                            let url = config.BASE_URL + '/' + (item?.username || item?.gid)
                            let img = ''
                            if (item?.bg_image_url_ext) {
                                img = item?.bg_image_url_ext
                            } else if (item?.profile_image_url_ext) {
                                img = item?.profile_image_url_ext
                            } else {
                                img = ''
                            }
                            let imgPath = config?.IMG_BASE_URL + img

                            return (
                                <div key={i}>
                                    <Link to={url}>
                                        <div className={`flex gap-x-4`}>
                                            {/**left */}
                                            <div className={`w-[95px] min-w-[95px] h-[100px] relative rounded-2xl overflow-hidden`}>
                                                {
                                                    (img === '') ?
                                                        <AlternateImage title={item?.title} /> :
                                                        <img
                                                            src={imgPath}
                                                            alt=""
                                                            className={`object-cover w-full h-full`}
                                                        />

                                                }
                                            </div>

                                            {/** right */}
                                            <div>
                                                <div className={`text-[15px] font-semibold leading-[1.2em]`}>
                                                    {item.title}
                                                </div>
                                                <div className={`flex place-items-center gap-2 mt-2 text-[14px] text-gray-500`}>
                                                    <div className={`flex place-items-center gap-1`}>
                                                        <RatingBoxInfoCard rating={Number(item.avg_rating)} />
                                                        {item?.avg_rating || 0}
                                                    </div>
                                                    <div>
                                                        ({item?.count_of_rating || 0}) reviews
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
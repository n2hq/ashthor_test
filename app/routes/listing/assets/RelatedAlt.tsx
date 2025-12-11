import React, { useEffect, useState } from 'react'
import RatingBoxSquare from './RatingBoxSquare'
import { appConfig, getListingByCategory } from '~/lib/lib'
import { Link } from '@remix-run/react'

const dat = [
    {
        title: "Braonx Inc.",
        description: "On a waterfront promenade, this upscale high-rise hotel is 1 km from the Dubai Gold Souk market and.",
        img: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjUt8szqzHY3W3Ir6Qh3yQ_HDd7cNsRLV5fg&s`,
        avg_rating: 4
    },
    {
        title: "Brittanica Corporate.",
        description: "On a waterfront promenade, this upscale high-rise hotel is 1 km from the Dubai Gold Souk market and.",
        img: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjUt8szqzHY3W3Ir6Qh3yQ_HDd7cNsRLV5fg&s`,
        avg_rating: 2.3
    },
    {
        title: "Desica Continental",
        description: "On a waterfront promenade, this upscale high-rise hotel is 1 km from the Dubai Gold Souk market and.",
        img: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjUt8szqzHY3W3Ir6Qh3yQ_HDd7cNsRLV5fg&s`,
        avg_rating: 3.4
    },
]

const RelatedAlt = ({
    category,
    limit,
    title,
    subtitle
}: any) => {

    const [ti, setTi] = useState('')
    const [st, setSt] = useState('')
    const [listings, setListings] = useState<any[]>([])
    const [userId, setUserId] = useState('')
    const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL
    const [placeholder, setPlaceholder] = useState('/images/placeholder22.png')
    const fallbackImg = `/images/fallbackBusinessImg.png`

    useEffect(() => {
        if (title && subtitle) {
            setTi(title)
            setSt(subtitle)
        }
    }, [title, subtitle])

    let getListings = async (category: string, limit: number) => {
        if (limit && category) {
            let cat = await getListingByCategory(category, limit)
            const strCat = JSON.stringify(cat)
            const objCat = JSON.parse(strCat)
            console.log(objCat)
            setListings(objCat)
        }
    }


    useEffect(() => {

        if (limit && category) {
            getListings(category, limit)
        }
    }, [limit, category])


    return (
        <div className={`w-full px-[12px] mt-12`}>

            <div className={` max-w-[1200px] mx-auto w-full`}>
                <div className={`mb-4`}>
                    <div className={`text-2xl font-semibold`}>
                        Related - <span className={` italic capitalize`}>{category}</span>
                    </div>
                </div>
                <div className={` grid md:grid-cols-2 lg:grid-cols-3 gap-8`}>
                    {
                        listings.map((item, index: number) => {
                            let userId = ''
                            if (item?.username) {
                                userId = item?.username
                            } else {
                                userId = item?.gid
                            }
                            const cname = item.title.substring(0, 10)
                            return (

                                <div>
                                    <Link to={`/${userId}`}>
                                        <div
                                            key={index}
                                            className={`flex gap-3 place-items-start  group hover:cursor-pointer h-full rounded-md`}>

                                            <div className={`w-[70px] min-w-[70px] h-[70px] relative border rounded-lg overflow-hidden shadow-xl`}>
                                                {
                                                    (item?.image_url === undefined || item?.image_url === null || item?.image_url === '') &&
                                                    <div className={`absolute bottom-2 h-full w-full flex -gap-y-2 place-content-end place-items-center font-bold z-[10] text-white bg-black/10 text-[6px] tracking-[1px] flex-col`}>
                                                        <div>AUTOMATIC</div>
                                                        <div>GENERATED</div>
                                                    </div>
                                                }
                                                {
                                                    item?.image_url !== null ?
                                                        <img
                                                            className={`object-cover  w-full h-full text-sm  `}
                                                            src={IMG_BASE_URL + item?.image_url}
                                                            alt={cname}
                                                        /> :
                                                        <img
                                                            src={appConfig.fallbackImg}
                                                            alt={cname}
                                                            className={`object-cover  w-full h-full text-sm  `}
                                                        />
                                                }

                                            </div>
                                            <div className={`flex place-items-start h-full flex-col`}>
                                                <div className={`text-lg`}>

                                                    <div className={`group-hover:underline`}>
                                                        {item.title}
                                                    </div>
                                                </div>
                                                <div className={`mt-1`}>
                                                    <RatingBoxSquare rating={item.avg_rating} />
                                                </div>
                                                <div className={`text-sm mt-1 line-clamp-2`}>
                                                    {item.short_description}
                                                </div>
                                                <div className={`text-sm mt-1 font-semibold`}>
                                                    {item.phone}
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

export default RelatedAlt

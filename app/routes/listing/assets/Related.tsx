import React, { useEffect, useState } from 'react'

import { Link, NavLink } from '@remix-run/react'
import { getListingByCategory } from '~/lib/lib'
import LatestStarRating from '~/routes/web/search/assets/LatestStarRating'
import SectionTitle from './SectionTitle'
import RatingBoxSquare from './RatingBoxSquare'
import Placeholder from '~/components/content/Placeholder'

const latestData = [
    {
        title: "Jonathan B Lafrance Law OFC",
        phone: `(661) 257-8883`,
        short_description: `Attorneys, Child Support Collections, Automoous`,
        business_phrases: `Attorneys, Child Support Collections, Automoous`,
        website: '',
        rating: 3,
        address_one: '3456 Upper Manhattan Avenue Stanford, Santa Clarita, CA 91355',
        gid: 'dfasfdasdfasfasdfsdasdf',
        img: `https://www.creativewallpaper.co.uk/-89018901/Handler/Picture/PI/T/0000271_dubai-skyline.jpeg`
    },
    {
        title: "Jonathan B Lafrance Law OFC",
        phone: `(661) 257-8883`,
        short_description: `Attorneys, Child Support Collections, Automoous`,
        business_phrases: `Attorneys, Child Support Collections, Automoous`,
        website: 'http://google.com',
        rating: 3,
        address_one: '3456 Upper Manhattan Avenue Stanford, Santa Clarita, CA 91355',
        gid: 'dfasfdasdfasfasdfsdasmf',
        img: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWBK5WgtHDD5zUI6BMZxM-tT4GB0TnWYfUUA&s`
    },
    {
        title: "Jonathan B Lafrance Law OFC & Offers",
        phone: `(661) 257-8883`,
        short_description: `Attorneys, Child Support Collections, Automoous`,
        business_phrases: `Attorneys, Child Support Collections, Automoous`,
        website: 'http://google.com',
        rating: 3,
        address_one: '3456 Upper Manhattan Avenue Stanford, Santa Clarita, CA 91355',
        gid: 'dfasfdasdfasfasdfsdasdg',
        img: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqHQmqoXY7AcbqKifcE61X0sGp4MrTPX20MA&s`
    },
    {
        title: "Jonathan B Lafrance Law OFC",
        phone: `(661) 257-8883`,
        short_description: `Attorneys, Child Support Collections, Automoous`,
        business_phrases: `Attorneys, Child Support Collections, Automoous`,
        website: '',
        rating: 3,
        address_one: '3456 Upper Manhattan Avenue Stanford, Santa Clarita, CA 91355',
        gid: 'dfasfdasdfasfasdfsdasd8',
        img: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1xLFPhfv6ucJiOHHEnTc6pdHxN_z_S2hdUw&s`
    },


]

const Related = ({
    title,
    subtitle,
    category,
    limit
}: any) => {
    const [ti, setTi] = useState('')
    const [st, setSt] = useState('')
    const [listings, setListings] = useState<any[]>([])
    const [userId, setUserId] = useState('')
    const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL
    const [placeholder, setPlaceholder] = useState('/images/placeholder22.png')

    useEffect(() => {
        if (title && subtitle) {
            setTi(title)
            setSt(subtitle)
        }
    }, [title, subtitle])

    let getListings = async (category: string, limit: number) => {
        if (limit && category) {
            let cat = await getListingByCategory(category, limit)

            setListings(cat)
        }
    }

    useEffect(() => {

        if (limit && category) {
            getListings(category, limit)
        }
    }, [limit, category])



    return (
        <div className={`px-[15px]`}>
            <div className={`max-w-[1100px] mx-auto w-full`}>
                <div className={`mt-10 border-t pt-5`}>
                    <div className={` mb-[20px] `}>
                        <SectionTitle
                            title={ti}
                            subtitle={st}
                        />

                    </div>

                    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-4`}>
                        {
                            Array.isArray(listings) &&
                            listings?.map((data: any, index: number) => {
                                let userId = ''
                                if (data?.username) {
                                    userId = data?.username
                                } else {
                                    userId = data?.gid
                                }
                                return (
                                    <div key={userId}>
                                        <div>
                                            <NavLink to={`/${userId}`}>
                                                <div className={`relative rounded-lg h-[180px] overflow-hidden `}>

                                                    {
                                                        data?.image_url !== null ?
                                                            <img
                                                                className={`object-scale-down  w-full h-full text-sm border rounded-lg`}
                                                                src={
                                                                    data?.image_url &&
                                                                    IMG_BASE_URL + data?.image_url
                                                                }
                                                                alt={data.title}
                                                            /> :
                                                            <Placeholder />
                                                    }

                                                </div>
                                            </NavLink>
                                        </div>
                                        <div className={`mt-1 text-[15px] tracking-tight 
                                     truncate`}>
                                            {data.title}
                                        </div>

                                        <div className={`mt-1`}>
                                            <RatingBoxSquare rating={data.avg_rating} />
                                        </div>

                                        <div className={`text-[11px] mt-[5px] tracking-tight line-clamp-3
                                    leading-[1.2em]`}>
                                            {data.short_description}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Related

import React, { useEffect, useState } from 'react'
import MainNav from '~/components/header/v1/MainNav'

import FooterAlt from '~/components/footer/FooterAlt'
import { LoaderFunction } from '@remix-run/node'
import { convertDashToSpace, getCountries, getSearch, logError } from '~/lib/lib'
import { useLoaderData, useNavigation, useSearchParams } from '@remix-run/react'

import { ListingType } from '~/lib/types'

import Featured from '../browse/assets/Featured'
import SearchAd from '~/components/content/ads/SearchAd'
import { TopAd } from '~/components/content/ads/TopAd'
import InfoCard from '~/components/content/InfoCard'
import Pagination from '~/components/content/Pagination'


export const loader: LoaderFunction = async ({ request, params }) => {
    const url = new URL(request.url);
    const query = url?.searchParams.get("q") || "";
    const state = url?.searchParams.get("state") || "";
    const city = url?.searchParams.get("city") || "";
    const country = url?.searchParams.get("country") || "";
    const category = url?.searchParams.get("category") || "";

    let page: number = 1
    let data: any = ""
    let countries = null

    try {
        page = parseInt(url?.searchParams.get("page") || "1")
        data = await getSearch(query, city, state, country, category, page)
        countries = await getCountries()
    } catch (error: any) {
        logError(error)
    }

    //console.log(data?.items)
    console.log('boo')

    let res = {
        data: data,
        query: query,
        countries: countries,
        state: state,
        city: city,
        country: country,
        category: category
    }
    return res;
}

export type CardType = {
    img: string
    location: string
    title: string
    description: string
    star: number
    price: string
    total: string
}

const dat = [
    {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTtDZi1XswvKy7PygdmhaqCPBDcgeUHwc46Q&s",
        location: "Hotels, Resorts, Casinos",
        title: "Independent Luxury Studio Apartment",
        description: "Welcome to our premium studio in Damac Maison Prive,  offering stunning views of the Dubai Canal. Thoughtfully designed and fully furnished, this stylish space is perfect for solo travelers, couples, or business guests. Enjoy a modern kitchen, premium amenities, and a relaxing ambiance. Just minutes from Burj Khalifa, Dubai Mall, and Downtown Dubai, with restaurants, cafes, and transport nearby — your ideal base for a memorable Dubai stay.",
        star: 4.4,
        price: "£50.45",
        total: "£117.23"
    },
    {
        img: "https://plus.unsplash.com/premium_photo-1661874816704-3e5399637b5e?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        location: "Real Estate",
        title: "Stay at spacious Edwardian House",
        description: "Welcome to our premium studio in Damac Maison Prive,  offering stunning views of the Dubai Canal. Thoughtfully designed and fully furnished, this stylish space is perfect for solo travelers, couples, or business guests. Enjoy a modern kitchen, premium amenities, and a relaxing ambiance. Just minutes from Burj Khalifa, Dubai Mall, and Downtown Dubai, with restaurants, cafes, and transport nearby — your ideal base for a memorable Dubai stay.",
        star: 4.4,
        price: "£50.45/night",
        total: "£117.23"
    },
    {
        img: "https://images.unsplash.com/photo-1635108197198-63277d473c68?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        location: "Community & Government",
        title: "London studio apartment",
        description: "Welcome to our premium studio in Damac Maison Prive,  offering stunning views of the Dubai Canal. Thoughtfully designed and fully furnished, this stylish space is perfect for solo travelers, couples, or business guests. Enjoy a modern kitchen, premium amenities, and a relaxing ambiance. Just minutes from Burj Khalifa, Dubai Mall, and Downtown Dubai, with restaurants, cafes, and transport nearby — your ideal base for a memorable Dubai stay.",
        star: 4.4,
        price: "£50.45/night",
        total: "£117.23"
    },
    {
        img: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        location: "Restaurants",
        title: "30 minutes to Oxford Street, Excel London",
        description: "Welcome to our premium studio in Damac Maison Prive,  offering stunning views of the Dubai Canal. Thoughtfully designed and fully furnished, this stylish space is perfect for solo travelers, couples, or business guests. Enjoy a modern kitchen, premium amenities, and a relaxing ambiance. Just minutes from Burj Khalifa, Dubai Mall, and Downtown Dubai, with restaurants, cafes, and transport nearby — your ideal base for a memorable Dubai stay.",
        star: 4.4,
        price: "£50.45/night",
        total: "£117.23"
    },
    {
        img: "https://plus.unsplash.com/premium_photo-1670360414483-64e6d9ba9038?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        location: "Business Services",
        title: "The Blue Room in London",
        description: "Welcome to our premium studio in Damac Maison Prive,  offering stunning views of the Dubai Canal. Thoughtfully designed and fully furnished, this stylish space is perfect for solo travelers, couples, or business guests. Enjoy a modern kitchen, premium amenities, and a relaxing ambiance. Just minutes from Burj Khalifa, Dubai Mall, and Downtown Dubai, with restaurants, cafes, and transport nearby — your ideal base for a memorable Dubai stay.",
        star: 4.4,
        price: "£50.45",
        total: "£117.23"
    }
]

const index = () => {
    const res: any = useLoaderData()

    const [loading, setLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams();
    const navigation = useNavigation()


    const data = res.data.items || []
    const pagination = res.data.pagination
    const query = res?.query
    const countries = res.countries
    const [queryParam, setQueryParam] = useState<string | null>(null)

    const currentPage = parseInt(searchParams.get('page') || '1');

    const isLoading = navigation.state === 'loading'

    const state = res.state
    const city = res.city
    const country = res.country
    const category = res?.category




    // Extract initial filters from URL
    const initialFilters = {
        q: searchParams.get('q') || '',
        category: searchParams.get('category') || '',
        country: searchParams.get('country') || '',
        state: searchParams.get('state') || '',
        city: searchParams.get('city') || ''
    }


    return (
        <div>
            <MainNav />
            {
                import.meta.env.VITE_ENV === "prod" ?
                    <div>
                        <div className={`h-[10px]`}></div>
                        <TopAd />
                        <div className={`h-[20px]`}></div>
                    </div> :
                    <div className={`h-[40px]`}></div>
            }
            <div className={`px-[15px]`}>
                <div className={`max-w-[1200px] mx-auto w-full`}>

                    <div className={`mb-6 font-light text-2xl`}>
                        <div className={`flex gap-2`}>
                            {
                                (query || category || country || state || city) &&
                                <span>
                                    Searching
                                </span>
                            }
                            {
                                query &&
                                <span>
                                    for
                                </span>
                            }
                            {
                                query &&
                                <span>
                                    '{
                                        query
                                    }'
                                </span>
                            }

                            {
                                category &&
                                <span>
                                    in
                                </span>
                            }

                            {
                                category &&
                                <span className={`capitalize font-semibold`}>
                                    {convertDashToSpace(category)}
                                </span>
                            }

                            {
                                city &&
                                <span>
                                    in
                                </span>
                            }

                            {
                                city &&
                                <span className={`font-semibold`}>
                                    {city}
                                </span>
                            }

                            {
                                city &&
                                <span>
                                    city
                                </span>
                            }


                        </div>
                        <div className={`flex gap-2 mt-2 flex-wrap`}>
                            {
                                category !== '' &&
                                <div className={`w-fit px-[5px] py-[1px] border border-gray-300 text-[14px] font-normal`}>
                                    Hotels
                                </div>
                            }
                            {
                                country !== '' &&
                                <div className={`w-fit px-[5px] py-[1px] border border-gray-300 text-[14px] font-normal`}>
                                    United Arab Emirates</div>
                            }
                            {
                                state !== '' &&
                                <div className={`w-fit px-[5px] py-[1px] border border-gray-300 text-[14px] font-normal`}>
                                    Dubai</div>
                            }
                            {
                                city !== '' &&
                                <div className={`w-fit px-[5px] py-[1px] border border-gray-300 text-[14px] font-normal`}>
                                    City: Dubai</div>
                            }
                        </div>
                    </div>


                    <div className={``}>
                        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12`}>

                            <div className={` lg:col-span-8`}>

                                {
                                    data.map((item: ListingType, index: number) => {

                                        const showAd = (index % 4) === 3;


                                        return (
                                            <div key={index}>
                                                {
                                                    (showAd) ?
                                                        <>

                                                            <InfoCard key={index} item={item}
                                                                isFirst={index === 0}
                                                            />
                                                            <SearchAd />
                                                        </> :

                                                        <>
                                                            <InfoCard key={index} item={item}
                                                                isFirst={index === 0}
                                                            />

                                                        </>
                                                }
                                            </div>
                                        )
                                    })
                                }

                                <div className={`mb-3 mt-6`}>
                                    <Pagination
                                        pagination={pagination}
                                    />
                                </div>
                            </div>
                            <div className={`hidden lg:block col-span-4`}>
                                <div className={`sticky top-[80px] w-full`}>
                                    <Featured />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`h-[60px]`}></div>
            <FooterAlt />
        </div >
    )
}

export default index

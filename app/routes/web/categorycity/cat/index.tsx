import React, { useEffect, useState } from 'react'
import MainNav from '~/components/header/v1/MainNav'

import FooterAlt from '~/components/footer/FooterAlt'
import { LoaderFunction } from '@remix-run/node'
import { config, convertDashToSpace, getBusinessByCategory, getCountries, getSearch, logError } from '~/lib/lib'
import { useLoaderData, useLocation, useNavigate, useNavigation, useSearchParams } from '@remix-run/react'

import { ListingType } from '~/lib/types'
import Pagination from './assets/Pagination'
import Featured from '../../browse/assets/Featured'
import SearchAd from '~/components/content/ads/SearchAd'
import { TopAd } from '~/components/content/ads/TopAd'
import InfoCard from '~/components/content/InfoCard'


export const loader: LoaderFunction = async ({ request, params }) => {

    const category = params.category

    const url = new URL(request.url);
    const page = Math.max(1, parseInt(url?.searchParams.get("page") || "1"));

    let businesses: any = null;


    try {
        // Call your paginated backend function
        businesses = await getBusinessByCategory(category!, page);
    } catch (error: any) {
        console.error("Error loading businesses:", error);
    }

    return {
        category: category,
        businesses: businesses || { data: [], pagination: null },
        currentPage: page
    };
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
    const baseUrl = config.BASE_URL
    const { category, businesses } = useLoaderData<typeof loader>();
    const fallbackImg = `/images/fallbackBusinessImg.png`

    const location = useLocation();
    const navigate = useNavigate();


    const data: ListingType[] = businesses?.data || []
    const pagination = businesses?.pagination || null




    // Extract initial filters from URL



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

                    <div className={`mb-6 text-xl font-light`}>
                        <div>
                            <b className={`text-2xl`}>Searching for</b> <span className={`text-2xl font-semibold underline capitalize`}>{convertDashToSpace(category)}</span>
                        </div>
                        <div className={`flex gap-2 mt-2 flex-wrap`}>
                            <p className="mt-2 text-gray-600 font-normal text-lg">
                                Explore verified <b className={`font-bold`}>{category}</b> services. View contact info, working hours, and reviews.
                            </p>


                        </div>
                    </div>


                    <div className={``}>
                        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12`}>

                            <div className={` lg:col-span-8`}>

                                {
                                    data?.length <= 0 &&
                                    <div className={`text-lg`}>
                                        No results found.
                                    </div>
                                }
                                {
                                    data?.map((item: ListingType, index: number) => {
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

                                {
                                    data?.length > 0 &&
                                    <div className={`mb-3 mt-6`}>
                                        <Pagination
                                            pagination={pagination}
                                        />
                                    </div>
                                }
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
        </div>
    )
}

export default index

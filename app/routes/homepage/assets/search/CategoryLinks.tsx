import React from 'react'
import { BiHotel } from 'react-icons/bi'
import { BsHouse } from 'react-icons/bs'
import { FaHotel, FaWineGlass } from 'react-icons/fa'
import { FcBusiness } from 'react-icons/fc'
import { GiForkKnifeSpoon, GiKnifeFork } from 'react-icons/gi'
import { RiGovernmentFill, RiKnifeBloodFill } from 'react-icons/ri'

const catlnks = [
    {
        title: "Hotels",
        category: 'hotel',
        icon: <BiHotel size={20} />,
        color: 'text-purple-700',
        url: '/web/category/hotels'
    },
    {
        title: "Real Estate",
        category: 'real-estate',
        icon: <BsHouse size={17} />,
        color: 'text-orange-600',
        url: '/web/category/real-estate'
    },
    {
        title: "Restaurants",
        category: 'restaurants',
        icon: <GiKnifeFork size={17} />,
        color: 'text-black',
        url: '/web/category/restaurants'
    },
    {
        title: "Business",
        category: 'business-services',
        icon: <FcBusiness size={17} />,
        url: '/web/category/business-services'
    },
    {
        title: "Entertainment",
        category: 'entertainment',
        icon: <RiGovernmentFill size={17} />,
        url: '/web/category/entertainment'
    },
    // Added more categories to demonstrate overflow

]

export type CategoryType = {
    title: string
    icon: any
    color?: string
    category: string
    url: string
}

export interface CategoryLinksProp {
    categoryType: CategoryType
}

const CategoryLinks = () => {
    return (
        <div className="flex space-x-6 md:space-x-8 lg:justify-evenly lg:space-x-0">
            {catlnks?.map((link: CategoryType, index: number) => (
                <a key={index} href={link?.url}>
                    <div
                        key={index}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-gray-100 min-w-max cursor-pointer"
                    >
                        <span className={link.color || 'text-gray-700'}>
                            {link.icon}
                        </span>
                        <span className="text-[15px] md:text-[16.5px] font-medium whitespace-nowrap">
                            {link.title}
                        </span>
                    </div>
                </a>
            ))}
        </div>
    )
}

export default CategoryLinks
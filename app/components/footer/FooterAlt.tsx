import { Link } from '@remix-run/react'
import React from 'react'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import HeaderLogo from '../header/v1/HeaderLogo'
import { config } from '~/lib/lib'



const aboutLinks = [
    {
        title: "Terms",
        link: '/web/terms'
    },
    {
        title: "Privacy",
        link: '/web/privacy'
    },
    {
        title: "Contact us",
        link: '/web/contact'
    },
    {
        title: "Forgot Password",
        link: '/web/reset-password'
    },
    {
        title: "Signup",
        link: '/web/signup'
    },
]

const explorLinks = [
    {
        title: "London",
        query: "q=&city=london"
    },
    {
        title: "New York",
        query: "q=&city=new york city"
    },
    {
        title: "Paris",
        query: "q=&city=paris"
    },
    {
        title: "Berlin",
        query: "q=&city=berlin"
    },
    {
        title: "Dubai",
        query: "q=&city=dubai"
    },
    {
        title: "Beijing",
        query: "q=&city=beijing"
    }
]


const doBusinessLinks = [
    {
        title: "Hotels",
        id: "hotels"
    },
    {
        title: "Restaurants",
        id: "restaurants"
    },
    {
        title: "Travel",
        id: "travel-hospitality-rentals"
    },
    {
        title: "Business Services",
        id: "business services"
    },
    {
        title: "Real Estate",
        id: "real estate"
    },
    {
        title: "Automotive",
        id: "automotive"
    },
    {
        title: "Shopping",
        id: "shopping and retail"
    },

]

const garsseteSocialLinks = [
    {
        icon: <FaFacebook />,
        link: 'http://facebook.com/ashthors'
    },
    {
        icon: <FaXTwitter />,
        link: 'http://x.com/ashthors'
    },
    {
        icon: <FaInstagram />,
        link: 'http://instagram.com/ashthors'
    },
]


const garsseteSites = [
    {
        title: "Book a consultation",
        link: "/web/contact"
    },
    {
        title: "Support or Help",
        link: "/web/contact"
    },

]

export type DiscoverType = {
    title: string
    query: string
}

export type AboutLinksType = {
    title: string
    link: string
}

export type FooterSocialMediaType = {
    icon: any
    link: string
}

export type CategoriesType = {
    title: string
    id: string
}

const FooterAlt = () => {
    return (
        <div className={`px-[25px] bg-[#EADDCA]/50 pt-[50px] pb-[70px]`}>
            <div className={`max-w-[1100px] mx-auto w-full`}>
                <div className={`w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-8 lg:gap-x-4`}>

                    {/** first column */}
                    <div className={`lg:col-span-2 flex flex-col place-items-center text-center md:place-items-start md:text-left`}>
                        <div className={`font-poppins font-[300] text-xl`}>
                            About us
                        </div>

                        <div className={`flex flex-col space-y-2 mt-2 font-poppins font-[300]`}>
                            {
                                aboutLinks.map((link: AboutLinksType, index: number) => {
                                    return (
                                        <Link to={link?.link}
                                            key={index}
                                            className={`hover:underline`}
                                        >
                                            <div>
                                                {link?.title}
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>


                    {/** second column */}
                    <div className={`lg:col-span-2 flex flex-col place-items-center text-center md:place-items-start md:text-left`}>
                        <div className={`font-poppins font-[300] text-xl`}>
                            Discover
                        </div>

                        <div className={`flex flex-col space-y-2 mt-2 font-poppins font-[300]`}>
                            {
                                explorLinks.map((link: DiscoverType, index: number) => {
                                    const baseUrl = `/web/search?`
                                    const url = baseUrl + link?.query
                                    return (
                                        <Link to={url}
                                            key={index}
                                            className={`hover:underline`}
                                        >
                                            <div>
                                                {link?.title}
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>


                    {/** third column */}
                    <div className={`lg:col-span-5 flex flex-col place-items-center text-center md:place-items-start md:text-left`}>
                        <div className={`font-poppins font-[300] text-xl`}>
                            Top Categories
                        </div>

                        <div className={`flex flex-col space-y-2 mt-2 font-poppins font-[300]`}>
                            {
                                doBusinessLinks?.map((link: CategoriesType, index: number) => {
                                    const lnk = `/web/search?q=&category=${link?.id}`
                                    return (
                                        <Link to={lnk}
                                            key={index}
                                            className={`hover:underline`}
                                        >
                                            <div>
                                                {link?.title}
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>


                    {/** fourth column */}
                    <div className={`lg:col-span-3 flex flex-col place-items-center text-center md:place-items-start md:text-left`}>
                        <div className={`font-poppins font-[300] text-xl`}>
                            Do Business With Us
                        </div>

                        <div className={`flex flex-col space-y-2 mt-2 font-poppins font-[300]`}>
                            {
                                garsseteSites?.map((link: AboutLinksType, index: number) => {
                                    return (
                                        <Link to={`${link?.link}#${link?.title}`}
                                            key={index}
                                            className={`hover:underline`}
                                        >
                                            <div>
                                                {link?.title}
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>

                    </div>
                </div>

                <div className={`mt-12 flex flex-col place-items-center text-center md:place-items-start md:text-left`}>
                    <div className={`flex place-items-center gap-1.5`}>
                        <div className={`relative w-[20px] h-[20px] hidden`}>
                            <img
                                src="/favicon.png"
                                alt=""
                                className={` object-cover w-full h-full`}
                            />
                        </div>
                        <div className={`font-poppins text-[22px] font-[600]`}>
                            <HeaderLogo />
                        </div>
                    </div>
                    <div className={`font-poppins text-[13px] mt-[-2px]`}>
                        © 2025 {config.SITENAME}. All rights reserved.
                    </div>

                </div>

                <div className={`mt-3 font-poppins font-[300] grid-cols-1 md:grid-cols-12 flex flex-col place-items-center text-center md:place-items-start md:text-left`}>
                    <div className={`md:col-span-8`}>
                        {config.SITENAME} connects you to trusted local businesses. Discover services, read reviews, and support your community. Find everything from restaurants to contractors in one comprehensive directory. Your journey to better local experiences starts here.
                    </div>
                    <div className={`md:col-span-4`}>

                    </div>
                </div>

                <div>
                    <div className={`flex gap-2 place-items-center place-content-center md:place-content-start mt-4`}>
                        {
                            garsseteSocialLinks.map((media: FooterSocialMediaType, index: number) => {
                                return (
                                    <div key={index}>
                                        <a href={media?.link}>
                                            <div
                                                className={`bg-gray-200 text-black text-[15px] w-[35px] h-[35px] place-items-center place-content-center flex`}
                                            >
                                                {media.icon}
                                            </div>
                                        </a>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div>
                    <div>
                        <p className="text-[10px] text-gray-400 text-center mt-2">
                            <a href={config.BASE_URL} target="_blank"
                                className={`hover:underline`}>
                                {config.SITENAME} Business Directory
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FooterAlt

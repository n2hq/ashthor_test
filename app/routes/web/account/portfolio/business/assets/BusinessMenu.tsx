import { Link, useLocation } from '@remix-run/react'
import React, { useState } from 'react'
import { MdArrowBack, MdArrowForward, MdMenu, MdOutlineSafetyDivider, MdSafetyDivider } from 'react-icons/md'

const settingsLinks = [
    {
        title: "Business Hours",
        link: "/settings"
    },
    {
        title: "Gallery",
        link: "/gallery"
    },
    {
        title: "Videos",
        link: "/videos"
    },
    {
        title: "Products",
        link: "/products"
    },
    {
        title: "Services",
        link: "/services"
    },
    {
        title: "Facilities",
        link: "/facilities"
    },
    {
        title: "Socials Media",
        link: "/social_media"
    },
    {
        title: "Activate",
        link: "/activate"
    },
    {
        title: "Delete",
        link: "/delete"
    },
]

const BusinessMenu = ({ title, guid, userGuid, setIsOpen }: any) => {
    const [showSettings, setShowSettings] = useState(false)
    const displaySettings = (showSettings: boolean) => {
        setShowSettings(showSettings)
        setIsOpen(showSettings)
    }
    const location = useLocation()
    const pathname = `/web/account/portfolio/${guid}/${userGuid}`

    const hideSettings = async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setShowSettings(false)
        setIsOpen(false)
    }
    return (
        <div className=' w-fit   z-[1000] '>


            <div className={`relative`}>
                <button
                    className={`rounded-full cursor-pointer bg-blue-900 w-[40px] h-[40px]
                         text-white shadow-md shadow-blue-400 py-1 flex place-items-center place-content-center`}
                    onMouseDown={() => displaySettings(!showSettings)}
                    onBlur={() => hideSettings()}

                >
                    <MdMenu size={30} className={`${showSettings ? 'rotate-90 transition-all duration-1000 ease-in-out' : 'rotate-0 transition-all duration-1000 ease-in-out'}`} />

                </button>

                {/* <div className={`${showSettings ? 'block' : 'hidden'} absolute w-[180px] top-[50px] rounded-lg z-[10000] text-black
                border-[1px] border-gray-100 bg-white shadow-lg right-[20px] `}>
                    <div className='divide-y-[1px] divide-gray-500/20 '>
                        {
                            settingsLinks.map((item, index) => {
                                const url = pathname + item.link
                                return (
                                    <div key={index} className={`py-2.5 px-3 text-[14px]
                                     text-black font-sans font-semibold hover:bg-blue-200
                                     ${location.pathname === url && 'bg-gray-300/30'}
                                     `}>
                                        <Link to={`${url}`}>
                                            <p className={`text-lg tracking-tight`}>
                                                {item.title}
                                            </p>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div> */}
            </div>

        </div>
    )
}

export default BusinessMenu

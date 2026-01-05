import React, { useEffect, useState } from 'react'
import { ShortMenuJson } from './ShortMenuJson'
import { Link, useLocation } from '@remix-run/react'
import { CgChevronDown, CgChevronRight } from 'react-icons/cg'
import { BsExclamation } from 'react-icons/bs'

const ShortMenu = () => {

    const location = useLocation()

    return (
        <div className={`lg:flex gap-3 hidden px-4 place-items-center`}>

            <SearchLink />


            {
                ShortMenuJson.map((item, index: number) => {
                    return (
                        <div key={index} className={`hover:text-[#6001D2] underline `}>
                            <Link to={item.url}>
                                <div className={`flex place-items-center group hover:underline px-5 py-2  rounded-full hover:bg-[#D2B48C]/20 hover:text-black ${location.pathname === item.url ? 'bg-[#D2B48C]/20 text-black' : ''}`}>
                                    <div className={`text-[14px]`}>
                                        {item.title}
                                    </div>

                                </div>
                            </Link>
                        </div>
                    )
                })
            }

            {/* <div className={` hover:text-[#6001D2]`}>
                <Link to={`#`}>
                    <div className={`flex place-items-center gap-1 text-[14px]`}>
                        <span>
                            More
                        </span>
                        <span className={`top-[1px]`}>
                            <CgChevronDown />
                        </span>
                    </div>
                </Link>
            </div> */}
        </div>
    )
}

export default ShortMenu


export const SearchLink = () => {
    return (
        <div className={``}>
            <Link to={'/web/search'}>
                <div className={`flex place-items-center group underline`}>
                    <div className={`text-[14px] font-normal py-2 px-4  hover:bg-[#D2B48C]/20 rounded-full text-black hover:text-gray-700 ${location.pathname.includes('/web/search') ? 'bg-[#D2B48C]/20 text-black' : ''}`}>
                        Search
                    </div>

                </div>
            </Link>
        </div>
    )
}

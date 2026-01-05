import { Link } from '@remix-run/react';
import React from 'react'
import { BiEdit } from 'react-icons/bi'
import { BsTrophy } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa'
import { FiEdit2 } from "react-icons/fi";

const hours = [
    {
        day: "Sunday",
        hours: "11:30 AM - 10:30 PM"
    },
    {
        day: "Monday",
        hours: "11:30 AM - 10:30 PM"
    },
    {
        day: "Tuesday",
        hours: "11:30 AM - 10:30 PM"
    },
    {
        day: "Wednesday",
        hours: "11:30 AM - 10:30 PM"
    },
    {
        day: "Thursday",
        hours: "11:30 AM - 10:30 PM"
    },
    {
        day: "Friday",
        hours: "11:30 AM - 10:30 PM"
    },
    {
        day: "Saturday",
        hours: "11:30 AM - 10:30 PM"
    },
]


const ClaimBusiness = () => {
    return (
        <div className={`w-full mt-12`}>
            <div className={`border border-gray-100 p-5 pt-7 rounded-xl  shadow-lg shadow-gray-200 pb-7`}>
                <div className={`flex place-content-between`}>
                    <div className={`text-[17px] font-semibold`}>
                        Is this business yours?
                    </div>
                    <div className={`flex place-items-center gap-1`}>
                        <BsTrophy className={`text-xl`} />

                    </div>
                </div>

                <div className={`flex place-items-center mt-6 text-[14px] font-light text-center w-[80%] place-content-center mx-auto leading-[1.3em]`}>

                    Do you own this business? You can reach out and claim it for free!
                </div>

                <div className={`mt-6 flex place-content-center w-full flex-col place-items-center`}>
                    <Link to={'/web/contact'} className={`w-[70%]`}>
                        <button className={`bg-[#A52A2A] w-full rounded-full py-4 text-white text-lg`}>
                            Claim Business
                        </button>
                    </Link>

                    <div className={`mt-2 text-center`}>
                        You woun't be charged</div>
                </div>
            </div>
        </div>
    )
}

export default ClaimBusiness

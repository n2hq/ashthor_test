import { Link, useLocation } from '@remix-run/react'
import React, { useState } from 'react'
import { BiBriefcase, BiBriefcaseAlt2, BiSolidBriefcase, BiUser, BiUserCheck } from 'react-icons/bi'
import { BsPersonFill, BsPersonFillGear } from 'react-icons/bs'
import { CgChevronDown, CgChevronRight, CgMoreVertical, CgPassword, CgProfile, CgUser, CgUserRemove } from 'react-icons/cg'
import { FaTimes } from 'react-icons/fa'
import { HiMiniBriefcase } from 'react-icons/hi2'
import { MdCancel, MdEmail, MdOutlineAttachEmail, MdPassword, MdWifiPassword } from 'react-icons/md'
import { RiBriefcase4Line, RiProfileLine } from 'react-icons/ri'
import { useAuth } from '~/context/AuthContext'
import { getFirstChar } from '~/lib/lib'
import { UserProfile, UserProfileProps } from '~/lib/types'

const mainLink = [

    {
        title: "Email Address",
        icon: <MdOutlineAttachEmail />,
        link: '/web/account/email_address'
    },
    {
        title: "Change Password",
        icon: <MdPassword />,
        link: '/web/account/change_password'
    },
    {
        title: "Reset Password",
        icon: <MdWifiPassword />,
        link: '/web/account/reset_password'
    },
    {
        title: "(De)Activate Profile",
        icon: <BsPersonFill />,
        link: '/web/account/deactivate_profile'
    }

]

const moreTools = [
    {
        title: "Account Profile",
        icon: <BsPersonFillGear />,
        link: '/web/account/profile'
    },
    {
        title: "Create Business",
        icon: <BiBriefcase />,
        link: '/web/account/create_business'
    },
    {
        title: "My Portfolio",
        icon: <HiMiniBriefcase />,
        link: '/web/account/portfolio'
    },
    /* {
        title: "Add Event",
        icon: <HiMiniBriefcase />,
        link: '/web/account/events'
    } */
]

const LeftNav = ({ userProfile }: UserProfileProps) => {
    const [expanded, setExpanded] = useState(true)
    const location = useLocation();
    const auth = useAuth()
    if (!auth) { return null }
    const { user } = auth

    return (
        <div className={`mt-[0px] relative`}>
            <div className={`font-bold text-[18px] px-[15px]`}>
                Manage Account
            </div>

            <div className={` flex mt-8 pt-3 px-[15px]`}>
                <div
                    className={`w-10 h-10 rounded-md
                        bg-blue-200 flex justify-center
                        items-center font-semibold
                        text-blue-800 text-[17px]`}
                >
                    {getFirstChar(user?.first_name)}
                    {getFirstChar(user?.last_name)}
                </div>
                <div
                    className={`
                          flex justify-between items-center
                          overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
                      `}
                >
                    <div className="leading-4 flex-1 min-w-0">
                        <h4 className={`font-semibold truncate
                            overflow-hidden`}>
                            {user?.first_name} {user?.last_name}
                        </h4>
                        <div className={`text-xs text-gray-600
                            truncate overflow-hidden`}>
                            {user?.email}
                        </div>
                    </div>
                    <CgMoreVertical size={20} />
                </div>
            </div>

            <hr className={`mt-[15px]`} />

            <div className={`mt-[20px]`}>

            </div>

            <div className={` text-[17px] mt-[20px] px-[15px]
                flex place-items-center h-[40px] place-content-between`}>
                <div className={`font-[600]`}>
                    Business Tools
                </div>
                <div className={``}>
                    <CgChevronDown className={`text-[20px]`} />
                </div>
            </div>

            {
                moreTools.map((link, index) => {
                    return (
                        <div key={index} className={`mt-[0px] `}>
                            {
                                !userProfile?.active && link.title === `Create Business` ?
                                    <div className={` flex place-items-center gap-3
                        hover:bg-gray-200/60 py-1 rounded text-gray-400 px-[15px]
                        ${location.pathname.startsWith(link.link) && 'bg-[#2e374a]/15'}`}>
                                        <div className={`w-[40px] h-[40px] rounded-full
                    place-content-center place-items-center border-gray-300 text-[23px]`}>
                                            {link.icon}
                                        </div>
                                        <div className={`text-[13px]`}>
                                            {link.title}
                                        </div>
                                    </div> :
                                    <Link to={link.link}>
                                        <div className={` flex place-items-center gap-3
                        hover:bg-gray-200 py-1 rounded  px-[15px]
                        ${location.pathname.startsWith(link.link) && 'bg-[#2e374a]/15'}`}>
                                            <div className={`w-[40px] h-[40px] rounded-full
                    place-content-center place-items-center border-gray-300 text-[23px]`}>
                                                {link.icon}
                                            </div>
                                            <div className={`text-[13px]`}>
                                                {link.title}
                                            </div>
                                        </div>
                                    </Link>
                            }
                        </div>
                    )
                })
            }


            <div className={` text-[17px] mt-[20px] px-[15px]
                flex place-items-center h-[40px] place-content-between`}>
                <div className={`font-[600]`}>
                    Profile Tools
                </div>
                <div className={``}>
                    <CgChevronDown className={`text-[20px]`} />
                </div>
            </div>

            {
                mainLink.map((link, index) => {
                    return (
                        <div key={index} className={`mt-[0px]`}>
                            <Link to={link.link}>
                                <div className={` flex place-items-center gap-3
                        hover:bg-gray-200/60 py-1 rounded px-[15px]
                        ${location.pathname.startsWith(link.link) && 'bg-[#2e374a]/15'}`}>

                                    <div className={`w-[40px] h-[40px] rounded-full
                    place-content-center place-items-center border-gray-300 text-[23px]`}>
                                        {link.icon}
                                    </div>
                                    <div className={`text-[13px]`}>
                                        {link.title}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                })
            }






        </div>
    )
}

export default LeftNav

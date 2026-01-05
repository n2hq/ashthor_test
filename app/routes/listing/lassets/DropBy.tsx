import { Link } from '@remix-run/react';
import React, { ReactNode, useEffect, useState } from 'react'
import { BiPhone } from 'react-icons/bi';
import { CgWebsite } from 'react-icons/cg';
import { LuMapPinPlus } from "react-icons/lu";
import { MdEmail } from 'react-icons/md';
import { ListingType } from '~/lib/types';

const contacts2 = [
    {
        title: 'Website',
        url: '/',
        icon: <CgWebsite />
    },
    {
        title: '+44 20 7229 0647',
        url: '/',
        icon: <BiPhone />
    },
    {
        title: 'Email',
        url: 'mailto:info@mail.com',
        icon: <MdEmail />
    },

]

export type ContactType = {
    title: string
    url: string
    icon: ReactNode
}

export interface DropByProps {
    listing: ListingType
    reportTime: any
    operatingHoursStatus: any
}

const DropBy = ({ listing, reportTime, operatingHoursStatus }: DropByProps) => {
    const [address, setAddress] = useState('')
    const [contacts, setContacts] = useState<ContactType[]>()

    useEffect(() => {
        if (listing) {
            let address = ''
            if (listing.address_one) {
                address += listing.address_one + ', '
            }

            if (listing.address_two) {
                address += listing.address_two + ', '
            }

            if (listing.city_name) {
                address += listing.city_name + ' '
            }

            if (listing.zipcode) {
                address += listing.zipcode + ' '
            }

            if (listing.country_name) {
                address += listing.country_name
            }

            setAddress(address)
        }
    }, [listing])

    useEffect(() => {
        if (listing) {
            let contacts = []

            let website = {
                title: 'Website',
                url: listing?.website || '#',
                icon: <CgWebsite />
            }

            let phone = {
                title: 'Phone',
                url: `tel:${listing?.phone}` || '#',
                icon: <BiPhone />
            }

            let email = {
                title: 'Email',
                url: `mailto:${listing?.email_address}` || '#',
                icon: <MdEmail />
            }

            contacts.push(website)
            contacts.push(phone)
            contacts.push(email)
            setContacts(contacts)
        }
    }, [listing])
    return (
        <div>

            {/** say hello header */}
            <div>
                <div className={`text-[22px] md:text-[25px] font-bold`}>
                    Welcome to<i>!</i>
                </div>
                <div className={` font-light text-[15px] -mt-1 underline`}>
                    {listing?.title}
                </div>
            </div>


            <div className={`mt-8`}>
                <div className={`flex place-items-center gap-3`}>
                    <span className={`text-[15px] font-semibold`}>
                        {reportTime.openStatusObject}
                    </span>

                    <Link to={`#workinghours`}>
                        <span className={`text-[15px] font-light border-b border-gray-500`}>
                            See all hours
                        </span>
                    </Link>
                </div>

                <div className={`mt-4`}>
                    {operatingHoursStatus?.localTimeText}
                </div>


                <div className={`mt-4`}>
                    <div className={`flex place-items-center gap-3`}>
                        <LuMapPinPlus className={`text-3xl`} />
                        <div className={` border-b border-gray-300 w-fit text-[14px]`}>

                            {address}
                        </div>
                    </div>
                </div>


                <div className={`mt-6`}>
                    <div className={`flex place-items-center gap-5`}>
                        {
                            contacts?.map((item: ContactType, i: number) => {
                                return (
                                    <div key={i}>
                                        <Link to={item.url}>
                                            <div className={`flex place-items-center gap-2`}>
                                                <div className={`text-2xl`}>
                                                    {item.icon}
                                                </div>
                                                <div className={`text-[15px] underline`}>
                                                    {item.title}
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


        </div>
    )
}

export default DropBy

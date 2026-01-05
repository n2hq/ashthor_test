import { Link } from '@remix-run/react'
import React, { useEffect, useState } from 'react'
import { BiBuilding } from 'react-icons/bi'
import { CgChevronRight } from 'react-icons/cg'
import { LuMapPinPlus } from 'react-icons/lu'
import { ListingType } from '~/lib/types'

export interface LocationProps {
    listing: ListingType
}

const Location = ({ listing }: LocationProps) => {
    const [address, setAddress] = useState('')
    const [addressLink, setAddressLink] = useState('')
    const [cityCountry, setCityCountry] = useState('')

    useEffect(() => {
        let getListingAddress = async (listing: any) => {
            let address = listing?.title
            address += listing?.address_one ? ', ' + listing?.address_one : ''
            address += listing?.address_two ? ', ' + listing?.address_two : ''
            address += listing?.city_name ? ', ' + listing?.city_name : ''
            address += listing?.state_name ? ', ' + listing?.state_name : ''
            address += listing?.zipcode ? ', ' + listing?.zipcode : ''
            address += listing?.country_code ? ', ' + listing?.country_code : ''

            let addressLink = `https://www.google.com/maps?q=${(address)}&t=&z=15&ie=UTF8&iwloc=B&output=`
            setAddress(address)
            setAddressLink(addressLink)
            setCityCountry(`${listing?.city_name && listing?.city_name + ', '} ${listing?.country_name}`)
        }

        if (listing !== null) {
            getListingAddress(listing)
        }
    }, [listing])

    return (
        <div className={`mt-12 border-t`}>
            <div className={`my-10`}>
                <div className={`text-[22px] md:text-[25px] font-semibold`}>
                    Location
                </div>

                <div className={`mt-6`}>
                    <div className={`grid grid-cols-12 gap-4 h-[200px]`}>
                        <div className={`col-span-6 rounded-xl overflow-hidden border border-gray-300`}>
                            <div className={`relative h-full w-full`}>
                                <img
                                    src={`https://m.media-amazon.com/images/I/81WGuaolxhL._AC_SL1500_.jpg`}
                                    alt=""
                                    className={` object-center object-cover w-full h-full`}
                                />
                            </div>
                        </div>
                        <div className={`col-span-6`}>
                            <div className={`flex gap-3 place-items-start hover:underline hover:cursor-pointer`}>
                                <div>
                                    <LuMapPinPlus className={`text-3xl`} />
                                </div>
                                <div>
                                    <Link to={addressLink} target='_blank'>
                                        <div className={`flex place-items-center`}>
                                            <div className={`font-semibold hover:underline text-[14px]`}>
                                                {address}
                                            </div>
                                            <div>
                                                <CgChevronRight className={`text-4xl`} />
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            <div className={`flex mt-6 place-items-center gap-4 `}>
                                <div className={`text-3xl`}>
                                    <BiBuilding />
                                </div>
                                <div className={`font-semibold text-[14px]`}>
                                    {cityCountry}
                                </div>
                            </div>

                            <div className={`mt-12`}>
                                <Link to={addressLink} target='_blank'>
                                    <button className={`bg-gray-200 px-4 py-3 rounded-full w-32 hover:shadow-md hover:shadow-gray-400 transition-all ease-out duration-500 outline-none`}>
                                        Map
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Location

import React, { createContext, useContext, useEffect, useState } from 'react'
import { CgWebsite } from 'react-icons/cg'
import { LuSeparatorHorizontal, LuSeparatorVertical } from 'react-icons/lu'
import { MdEmail, MdLocationPin, MdPhone } from 'react-icons/md'
import { RiSeparator } from 'react-icons/ri'
import { TbSeparatorVertical } from 'react-icons/tb'
import { formatNumber } from '~/lib/lib'
import Review from './Review'

const AddresPanelContext = createContext<any | null>(null)

const useAddressPanelContext = () => {
    const addressCtx = useContext(AddresPanelContext)

    if (!addressCtx) {
        return null
    }

    return addressCtx
}

const AddressPanelProvider = ({ children, ratingsData, businessProfile }: any) => {

    const val = {
        ratingsData,
        businessProfile
    }

    return (
        <AddresPanelContext.Provider value={val}>
            {children}
        </AddresPanelContext.Provider>
    )
}

const AddressPanel = ({ ratingsData, businessProfile }: any) => {
    return (
        <AddressPanelProvider ratingsData={ratingsData} businessProfile={businessProfile}>
            <AddressPanelContent />
        </AddressPanelProvider>
    )
}

export default AddressPanel


const AddressPanelContent = () => {
    const addressCtx = useAddressPanelContext()
    const [ratingText, setRatingText] = useState('')
    const [address, setAddress] = useState('')


    useEffect(() => {
        const getRatingVal = (ratingVal: number) => {
            //alert(ratingVal)
            if (ratingVal > 4.5) {
                setRatingText('Excellent')
            } else if (ratingVal >= 4 && ratingVal <= 4.5) {
                setRatingText('Superb')
            } else if (ratingVal >= 3.5 && ratingVal < 4) {
                setRatingText('Very Good')
            } else if (ratingVal >= 2 && ratingVal < 3.5) {
                setRatingText('Good')
            } else if (ratingVal >= 1 && ratingVal < 2) {
                setRatingText('Poor')
            } else {
                setRatingText('Very Poor')
            }
        }
        if (addressCtx.ratingsData) {
            const data = addressCtx?.ratingsData

            if (data.rating !== null) {

                getRatingVal(Number(data.rating))
            } else {

                getRatingVal(0)
            }
        }
    }, [addressCtx?.ratingsData])

    useEffect(() => {


        if (addressCtx?.businessProfile) {

            let listing = addressCtx?.businessProfile
            let address = listing?.address_one ? listing?.address_one : ''
            address += listing?.address_two ? ', ' + listing?.address_two : ''
            address += listing?.city_name ? ', ' + listing?.city_name : ''
            address += listing?.state_name ? ', ' + listing?.state_name : ''
            address += listing?.zipcode ? ', ' + listing?.zipcode : ''
            address += listing?.country_name ? ', ' + listing?.country_name : ''
            setAddress(address)
        }
    }, [addressCtx?.businessProfile])



    return (
        <div>
            <div className={`w-full rounded-none md:rounded-lg  border-[1px] h-auto overflow-hidden`}>

                {/** header */}
                <div className={`bg-gray-100/20 px-2 py-3 border-b flex place-items-center place-content-between`}>
                    <div>
                        <div className={`flex flex-col -space-y-1`}>
                            <div className={`text-[14px] h-fit capitalize font-semibold tracking-tight font-['arial']`}>
                                {addressCtx?.businessProfile?.category}
                            </div>
                            <div className={`text-[12px] h-fit flex place-items-center gap-1 tracking-tighter font-sans`}>
                                <span>{ratingText}</span>
                                <span className={`font-bold`}>:</span>

                                <span>
                                    {formatNumber(Number(addressCtx?.ratingsData?.ratingCount))}&nbsp;
                                    Review
                                    {Number(addressCtx?.ratingsData?.ratingCount) > 0 && 's'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={`flex place-items-center place-content-center w-[40px] h-[40px] bg-gray-500 rounded-md text-white text-[22px] font-normal `}>
                            {
                                addressCtx.ratingsData?.rating >= 0 ?
                                    formatNumber(Number(addressCtx.ratingsData?.rating)) :
                                    0
                            }
                        </div>
                    </div>
                </div>

                {/** body */}

                <div>

                    {/** body title */}
                    <div className={`py-4`}>
                        <div className={`px-4 py-5 bg-gray-200/80 rounded-r-lg text-xl w-fit`}>
                            Contact
                        </div>
                    </div>

                    <div className={`px-2.5 divide-y`}>



                        {/** location */}
                        <div className={`flex w-full gap-3 py-3`}>
                            <div className={`bg-gray-200/80 h-[30px] min-w-[30px] w-[30px] flex place-content-center place-items-center rounded-md border-[1px]`}>
                                <MdLocationPin className={`text-[20px]`} />
                            </div>
                            {
                                address &&
                                <div className={`text-[14px] md:text-[12px] leading-[1.3em]`}>
                                    {address}
                                </div>
                            }

                        </div>


                        {/** phone */}
                        {
                            addressCtx?.businessProfile?.phone && <div className={`flex w-full gap-3 py-2.5`}>
                                <div className={`bg-gray-200/100 h-[30px] min-w-[30px] w-[30px] flex place-content-center place-items-center rounded-md`}>
                                    <MdPhone className={`text-[20px] h-fit`} />
                                </div>
                                <div className={` text-[15px] md:text-[13px] leading-[1.3em]
                                                    flex place-items-center font-semibold`}>
                                    {addressCtx?.businessProfile?.phone}
                                </div>

                            </div>
                        }


                        {/** website */}
                        {
                            addressCtx?.businessProfile?.website && <div className={`flex w-full gap-3 py-2.5`}>
                                <div className={`bg-gray-200/80 h-[30px] min-w-[30px] w-[30px] flex place-content-center place-items-center rounded-md`}>
                                    <CgWebsite className={`text-[20px] h-fit`} />
                                </div>
                                <div className={` text-[15px] md:text-[13px] leading-[1.3em]
                                                    flex place-items-center font-semibold
                                                    line-clamp-1`}>

                                    <a href={addressCtx?.businessProfile?.website}>
                                        {addressCtx?.businessProfile?.website || 'No website'}
                                    </a>
                                </div>

                            </div>
                        }


                        {/** email */}
                        <div className={`flex w-full gap-3 py-2.5`}>
                            <div className={`bg-gray-200/80 h-[30px] min-w-[30px] w-[30px] flex place-content-center place-items-center rounded-md`}>
                                <MdEmail className={`text-[20px]`} />
                            </div>
                            <div className={` text-[15px] md:text-[13px] leading-[1.3em]
                                                    flex place-items-center font-semibold
                                                    line-clamp-1`}>
                                <a href={`mailto:${addressCtx?.businessProfile?.email_address}`}>
                                    {addressCtx?.businessProfile?.email_address}
                                </a>
                            </div>

                        </div>


                        <div className={`pb-6`}>

                            <div className={`bg-gray-500 mt-[30px] 
                        text-white text-center py-2 rounded`}>
                                {
                                    addressCtx?.businessProfile &&
                                    <Review listing={addressCtx?.businessProfile} />
                                }


                            </div>


                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
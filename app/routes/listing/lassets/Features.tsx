import React, { ReactNode, useEffect, useState } from 'react'
import { BiCar, BiKnife, BiWifi } from 'react-icons/bi'
import { FaSwimmingPool, FaTv } from 'react-icons/fa'
import { FaElevator, FaWater } from 'react-icons/fa6'
import { GiBathtub } from 'react-icons/gi'
import { MdWash } from 'react-icons/md'
import { TbAirConditioning, TbWashDry } from 'react-icons/tb'
import { useReadMoreContext } from '~/context/ReadMoreAboutContext'
import { facilityFeatures } from '~/lib/json/facility_features'
import { getBusinessFeatures } from '~/lib/lib'
import { FacilityType, ListingType } from '~/lib/types'

const featuress = [
    {
        title: "Waterfront",
        icon: <FaWater />
    },
    {
        title: "Kitchen",
        icon: <BiKnife />
    },
    {
        title: "Wifi",
        icon: <BiWifi />
    },
    {
        title: "Free parking on premises",
        icon: <BiCar />
    },
    {
        title: "Pool",
        icon: <FaSwimmingPool />
    },
    {
        title: "TV",
        icon: <FaTv />
    },
    {
        title: "Elevator",
        icon: <FaElevator />
    },
    {
        title: "Washer",
        icon: <TbWashDry />
    },
    {
        title: "Air conditioning",
        icon: <TbAirConditioning />
    },
    {
        title: "Bathtup",
        icon: <GiBathtub />
    },
]
export type FeaturesType = {
    business_guid: string
    description: string
    feature_id: string
    icon: ReactNode
    name: string
    user_description: string
}
export interface FeaturesProps {
    listing: ListingType
}
const Features = ({ listing }: FeaturesProps) => {
    const [features, setFeatures] = useState<any>(undefined)
    const showDescr = useReadMoreContext()

    useEffect(() => {
        /* getBusinessFeatures(listing?.gid).then((data) => {
            const mergedFeatures = data?.map((dbF: any) => {
                const facility = facilityFeatures.find(f => f.feature_id === dbF.feature_id);

                return {
                    ...facility, // take default info (name, description, icon)
                    user_description: dbF.user_description || null, // add user description if any
                    business_guid: dbF.business_guid
                }
            });

            //console.log(mergedFeatures)
            setFeatures(mergedFeatures)
        }) */

        const fetchFacilities = async (business_guid: string) => {
            const facilities = await getBusinessFeatures(listing?.gid)
            console.log(facilities)
            setFeatures(facilities)
        }

        if (listing?.gid) {

            fetchFacilities(listing?.gid)
        }
    }, [listing?.gid])

    const handleDescription = (inputStr: string, title: string) => {
        showDescr?.setDescription(inputStr)
        showDescr?.setTitle(title)
        showDescr?.setShow(true)
    }

    return (
        <div className={`mt-12 border-t py-10`}>
            <div className={`text-[22px] md:text-[25px]  font-semibold `}>
                What this business offers
            </div>

            <div className={`mt-6`}>
                <div className={`grid grid-cols-2 w-full gap-x-4 gap-y-6`}>

                    {
                        features?.length > 0 &&
                        features?.map((feature: FacilityType, index: number) => {
                            return (
                                <div onClick={() => handleDescription(feature?.facility_description, `${feature?.facility_name} information`)}>
                                    <div className={`hover:underline cursor-pointer text-lg`}>
                                        {feature?.facility_name}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Features

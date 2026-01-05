import React, { useEffect, useState } from 'react'
import AccountLayout from '../../../assets/AccountLayout'
import ContentLayout from '../../../assets/ContentLayout'
import { getBusinessProfile, getFacilityList, getFacilityProfile, getServiceList, getServiceProfile, getSysFacilities, getSysFacilityFeatures, IsAuthenticated, removeAllParagraphs } from '~/lib/lib'
import BusinessProfile from '../assets/BusinessProfile'
import { useAuth } from '~/context/AuthContext'
import { useParams, useSearchParams } from '@remix-run/react'
import { FacilityType, ServiceType, SysFacilityType } from '~/lib/types'
import { AddServiceProvider, useAddServiceContext } from '~/context/AddServiceContext'
import Pagination from '~/components/content/Pagination'
import { AddFacilitiesProvider, useAddFacilitiesContext } from '~/context/AddFacilitiesContext'

const index = () => {
    useEffect(() => {
        IsAuthenticated(localStorage)
    }, [])

    const [businessGuid, setBusinessGuid] = useState<string | ''>('')
    const [userGuid, setUserGuid] = useState('')
    const [loading, setLoading] = useState(true)
    const [facilityList, setFacilityList] = useState<FacilityType[] | null>(null)
    const [sysFacilities, setSysFacilities] = useState<SysFacilityType[] | null>(null)
    const { business_guid, user_guid } = useParams();
    const [businessProfile, setBusinessProfile] = useState<any | null>(null)
    const [data, setData] = useState<any | null>(null)
    const [pagination, setPagination] = useState<any | null>(null)

    const auth = useAuth()
    const [searchParams, setSearchParams] = useSearchParams();


    useEffect(() => {

        const getAllData = async (businessGuid: string, userGuid: string, page: number) => {
            setBusinessGuid(businessGuid)

            setUserGuid(userGuid)

            const businessProfile = await getBusinessProfile(businessGuid || "")

            const sysFacilities: SysFacilityType[] | null = await getSysFacilities()

            const res = await getFacilityList(businessGuid, userGuid, page)

            const facilityList: FacilityType[] = res.data || []
            setPagination(res.pagination)
            console.log(res)
            setBusinessProfile(businessProfile)
            setFacilityList(facilityList)
            setSysFacilities(sysFacilities)
        }

        try {
            if (business_guid && user_guid) {
                const page = parseInt(searchParams.get('page') || '1');
                const limit = parseInt(searchParams.get('limit') || '10')

                getAllData(business_guid, user_guid, page)
            }
        } catch (e: any) {
            console.log(e.message)
        }
    }, [user_guid, business_guid])

    useEffect(() => {
        if (businessGuid && userGuid && facilityList && businessProfile) {

            const data = {
                businessGuid: businessGuid,
                userGuid: userGuid,
                facilityList: facilityList,
                businessProfile: businessProfile
            }
            setData(data)
            setLoading(false)
        }
    }, [businessGuid, userGuid, facilityList, businessProfile])

    return (
        <AccountLayout>
            <ContentLayout title={'Facilities Settings'}
                businessGuid={businessGuid}
                data={data}
                businessProfile={businessProfile}
            >

                <AddFacilitiesProvider>
                    {
                        businessGuid && userGuid &&

                        <AddFacility
                            userGuid={userGuid}
                            businessGuid={businessGuid}
                            facilityList={facilityList}
                            sysFacilities={sysFacilities}
                        />

                    }


                    {
                        (pagination && facilityList && businessGuid && userGuid) &&
                        <DisplayFacilities
                            pagination={pagination}
                            facilityList={facilityList}
                            businessGuid={businessGuid}
                            userGuid={userGuid}
                            sysFacilities={sysFacilities}
                        />
                    }
                </AddFacilitiesProvider>




            </ContentLayout>
        </AccountLayout>
    )
}

export default index

export interface AddFacilityProps {
    userGuid: string
    businessGuid: string
    facilityList: FacilityType[] | null
    sysFacilities: SysFacilityType[] | null
}

export const AddFacility = ({
    userGuid, businessGuid,
    facilityList, sysFacilities
}: AddFacilityProps) => {

    const addFacility = useAddFacilitiesContext()



    async function getAvailableSysSocialMedia(
        userFacilityList: FacilityType[] | null,
        sysFacilities: SysFacilityType[] | null
    ): Promise<SysFacilityType[] | null | undefined> {
        // Get all social media codes already used by the user
        const usedCodes = new Set(userFacilityList?.map(item => item.facility_id));

        // Filter sysSocialMedia to only include unused ones
        return sysFacilities?.filter(platform => !usedCodes.has(platform.id));
    }

    const handleOpenDialog = async () => {
        addFacility?.setDialog(true)
        addFacility?.setUserGuid(userGuid)
        addFacility?.setBusinessGuid(businessGuid)
        addFacility?.setFacilityProfile(null)

        const availableSysFacilities = await getAvailableSysSocialMedia(facilityList, sysFacilities);
        addFacility?.setSysFacilities(availableSysFacilities)
    }





    return (
        <div className={`mb-2`}>
            <button
                onMouseDown={handleOpenDialog}
                className={` bg-blue-800 rounded-md px-3 py-1
                text-white hover:bg-blue-700 transition
                duration-500 ease-in-out hover:shadow-md
                 shadow-gray-900 hover:shadow-black/50`}>
                Add Facility
            </button>
        </div>
    )
}

export interface DisplayFacilitiesProps {
    pagination: any
    facilityList: any
    businessGuid: string
    userGuid: string
    sysFacilities: SysFacilityType[] | null
}
export const DisplayFacilities = ({
    pagination,
    facilityList,
    businessGuid,
    userGuid,
    sysFacilities
}: DisplayFacilitiesProps) => {

    const addFacilityCtx = useAddFacilitiesContext()
    const [isClicked, setIsClicked] = useState(false)

    const handleUpdateFacility = async (facilityGuid: string) => {
        addFacilityCtx?.setDialog(true)
        addFacilityCtx?.setBusinessGuid(businessGuid)
        addFacilityCtx?.setUserGuid(userGuid)
        const facilityProfile = await getFacilityProfile(facilityGuid)

        addFacilityCtx?.setFacilityProfile(facilityProfile)
        addFacilityCtx?.setSysFacilities(sysFacilities)
        setIsClicked(true)
    }

    useEffect(() => {
        if (facilityList) {
            console.log(facilityList)
        }
    }, [facilityList])

    return (
        <div>
            <div className={`mt-6 flex flex-col border rounded-xl overflow-hidden relative`}>

                <div className={`flex flex-row gap-0 p-3 text-lg font-bold gap-x-2`}>
                    <div className={`min-w-[200px] w-[200px]`}>
                        Facility Name
                    </div>
                    <div className={`grow `}>
                        Facility Description
                    </div>
                </div>
                {
                    facilityList?.map((facility: FacilityType, index: number) => {
                        const isOdd = (index % 2) === 0 ? true : false
                        const facilityObject = sysFacilities?.find(platform => platform.id === facility?.facility_id);
                        return (
                            <div
                                onClick={() => handleUpdateFacility(facility?.facility_guid)}
                                key={index} className={` flex flex-row place-items-center relative ${isOdd && 'bg-gray-100'} border-t py-2 px-3 cursor-pointer gap-x-2`}>

                                <div className={`min-w-[200px] w-[200px] text-base first:border-none line-clamp-1`}>
                                    {facilityObject?.name}
                                </div>
                                <div className={`grow w-full line-clamp-1 text-base`}>
                                    {removeAllParagraphs(facility?.facility_description)}
                                </div>

                            </div>
                        )
                    })
                }
            </div>

            <div className={`mt-6`}>
                {
                    pagination &&
                    <Pagination
                        pagination={pagination}
                    />
                }
            </div>
        </div>
    )
}
import React, { useEffect, useState } from 'react'
import AccountLayout from '../../../assets/AccountLayout'
import ContentLayout from '../../../assets/ContentLayout'
import { getBusinessProfile, getServiceList, getServiceProfile, IsAuthenticated, removeAllParagraphs } from '~/lib/lib'
import BusinessProfile from '../assets/BusinessProfile'
import { useAuth } from '~/context/AuthContext'
import { useParams, useSearchParams } from '@remix-run/react'
import { ServiceType } from '~/lib/types'
import { AddServiceProvider, useAddServiceContext } from '~/context/AddServiceContext'
import Pagination from '~/components/content/Pagination'

const index = () => {
    useEffect(() => {
        IsAuthenticated(localStorage)
    }, [])

    const [businessGuid, setBusinessGuid] = useState<string | ''>('')
    const [userGuid, setUserGuid] = useState('')
    const [loading, setLoading] = useState(true)
    const [serviceList, setServiceList] = useState<ServiceType[] | null>(null)
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
            const res = await getServiceList(businessGuid, userGuid, page)

            const serviceList: ServiceType[] = res.data || []
            setPagination(res.pagination)
            console.log(res)
            setBusinessProfile(businessProfile)
            setServiceList(serviceList)

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
        if (businessGuid && userGuid && serviceList && businessProfile) {

            const data = {
                businessGuid: businessGuid,
                userGuid: userGuid,
                serviceList: serviceList,
                businessProfile: businessProfile
            }
            setData(data)
            setLoading(false)
        }
    }, [businessGuid, userGuid, serviceList, businessProfile])

    return (
        <AccountLayout>
            <ContentLayout title={'Services Settings'}
                businessGuid={businessGuid}
                data={data}
                businessProfile={businessProfile}
            >

                <AddServiceProvider>
                    {
                        businessGuid && userGuid &&

                        <AddService userGuid={userGuid} businessGuid={businessGuid} />

                    }


                    {
                        (pagination && serviceList && businessGuid && userGuid) &&
                        <DisplayService
                            pagination={pagination}
                            serviceList={serviceList}
                            businessGuid={businessGuid}
                            userGuid={userGuid}
                        />
                    }
                </AddServiceProvider>




            </ContentLayout>
        </AccountLayout>
    )
}

export default index



export const AddService = ({ userGuid, businessGuid }: any) => {

    const addService = useAddServiceContext()

    const handleOpenDialog = () => {
        addService?.setDialog(true)
        addService?.setUserGuid(userGuid)
        addService?.setBusinessGuid(businessGuid)
        addService?.setServiceProfile(null)
    }





    return (
        <div className={`mb-2`}>
            <button
                onMouseDown={handleOpenDialog}
                className={` bg-blue-800 rounded-md px-3 py-1
                text-white hover:bg-blue-700 transition
                duration-500 ease-in-out hover:shadow-md
                 shadow-gray-900 hover:shadow-black/50`}>
                Add Service
            </button>
        </div>
    )
}

export interface DisplayServiceProps {
    pagination: any
    serviceList: any
    businessGuid: string
    userGuid: string
}
export const DisplayService = ({ pagination, serviceList, businessGuid, userGuid }: DisplayServiceProps) => {
    const addServiceCtx = useAddServiceContext()
    const [isClicked, setIsClicked] = useState(false)

    const handleUpdateService = async (serviceGuid: string) => {
        addServiceCtx?.setDialog(true)
        addServiceCtx?.setBusinessGuid(businessGuid)
        addServiceCtx?.setUserGuid(userGuid)
        const serviceProfile = await getServiceProfile(serviceGuid)

        addServiceCtx?.setServiceProfile(serviceProfile)
        setIsClicked(true)
    }

    useEffect(() => {
        if (serviceList) {
            console.log(serviceList)
        }
    }, [serviceList])

    return (
        <div>
            <div className={`mt-6 flex flex-col border rounded-xl overflow-hidden relative`}>

                <div className={`flex flex-row gap-0 p-3 text-lg font-bold gap-x-2`}>
                    <div className={`min-w-[200px] w-[200px]`}>
                        Service Name
                    </div>
                    <div className={`grow `}>
                        Service Description
                    </div>
                </div>
                {
                    serviceList?.map((service: ServiceType, index: number) => {
                        const isOdd = (index % 2) === 0 ? true : false
                        return (
                            <div
                                onClick={() => handleUpdateService(service?.service_guid)}
                                key={index} className={` flex flex-row place-items-center relative ${isOdd && 'bg-gray-100'} border-t py-2 px-3 cursor-pointer gap-x-2`}>

                                <div className={`min-w-[200px] w-[200px] text-base first:border-none line-clamp-1`}>
                                    {service?.service_name}
                                </div>
                                <div className={`grow w-full line-clamp-1 text-base`}>
                                    {removeAllParagraphs(service?.service_description)}
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
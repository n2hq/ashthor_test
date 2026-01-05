import React, { useEffect, useState } from 'react'
import AccountLayout from '../../../assets/AccountLayout'
import ContentLayout from '../../../assets/ContentLayout'
import { getBusinessProfile, getServiceList, getServiceProfile, getSocialMediaList, getSocialMediaProfile, getSysSocialMedia, IsAuthenticated, removeAllParagraphs } from '~/lib/lib'
import BusinessProfile from '../assets/BusinessProfile'
import { useAuth } from '~/context/AuthContext'
import { useParams, useSearchParams } from '@remix-run/react'
import { ServiceType, SocialMediaType, SysSocialMediaType } from '~/lib/types'
import { AddServiceProvider, useAddServiceContext } from '~/context/AddServiceContext'
import Pagination from '~/components/content/Pagination'
import { AddSocialMediaProvider, useAddSocialMediaContext } from '~/context/AddSocialMediaContext'

const index = () => {
    useEffect(() => {
        IsAuthenticated(localStorage)
    }, [])

    const [businessGuid, setBusinessGuid] = useState<string | ''>('')
    const [userGuid, setUserGuid] = useState('')
    const [loading, setLoading] = useState(true)
    const [socialMediaList, setSocialMediaList] = useState<SocialMediaType[] | null>(null)
    const { business_guid, user_guid } = useParams();
    const [businessProfile, setBusinessProfile] = useState<any | null>(null)
    const [data, setData] = useState<any | null>(null)
    const [pagination, setPagination] = useState<any | null>(null)
    const [sysSocialMedia, setSysSocialMedia] = useState<SysSocialMediaType[] | null>(null)

    const auth = useAuth()
    const [searchParams, setSearchParams] = useSearchParams();







    useEffect(() => {

        const getAllData = async (businessGuid: string, userGuid: string, page: number) => {
            setBusinessGuid(businessGuid)

            setUserGuid(userGuid)

            const businessProfile = await getBusinessProfile(businessGuid || "")

            const sysSocialMedia: SysSocialMediaType[] | null = await getSysSocialMedia()

            const res = await getSocialMediaList(businessGuid, userGuid, page)

            const socialMediaList: SocialMediaType[] = res.data || []
            setPagination(res.pagination)
            console.log(res)
            setBusinessProfile(businessProfile)
            setSocialMediaList(socialMediaList)
            setSysSocialMedia(sysSocialMedia)

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
        if (businessGuid && userGuid && socialMediaList && businessProfile) {

            const data = {
                businessGuid: businessGuid,
                userGuid: userGuid,
                socialMediaList: socialMediaList,
                businessProfile: businessProfile
            }
            setData(data)
            setLoading(false)
        }
    }, [businessGuid, userGuid, socialMediaList, businessProfile])

    return (
        <AccountLayout>
            <ContentLayout title={'Social Media Settings'}
                businessGuid={businessGuid}
                data={data}
                businessProfile={businessProfile}
            >

                <AddSocialMediaProvider>
                    {
                        businessGuid && userGuid &&

                        <AddSocialMedia
                            userGuid={userGuid}
                            businessGuid={businessGuid}
                            sysSocialMedia={sysSocialMedia}
                            socialMediaList={socialMediaList}
                        />

                    }


                    {
                        (pagination && socialMediaList && businessGuid && userGuid && sysSocialMedia) &&
                        <DisplaySocialMedia
                            pagination={pagination}
                            socialMediaList={socialMediaList}
                            businessGuid={businessGuid}
                            userGuid={userGuid}
                            sysSocialMedia={sysSocialMedia}
                        />
                    }
                </AddSocialMediaProvider>




            </ContentLayout>
        </AccountLayout>
    )
}

export default index


export interface AddSocialMediaProps {
    userGuid: string
    businessGuid: string
    sysSocialMedia: SysSocialMediaType[] | null
    socialMediaList: SocialMediaType[] | null
}
export const AddSocialMedia = ({ userGuid, businessGuid, sysSocialMedia, socialMediaList }: any) => {

    const addSocialMedia = useAddSocialMediaContext()

    async function getAvailableSysSocialMedia(
        userSocialMediaList: SocialMediaType[] | null,
        sysSocialMedia: SysSocialMediaType[] | null
    ): Promise<SysSocialMediaType[] | null | undefined> {
        // Get all social media codes already used by the user
        const usedCodes = new Set(userSocialMediaList?.map(item => item.social_media_code));

        // Filter sysSocialMedia to only include unused ones
        return sysSocialMedia?.filter(platform => !usedCodes.has(platform.id));
    }

    const handleOpenDialog = async () => {
        addSocialMedia?.setDialog(true)
        addSocialMedia?.setUserGuid(userGuid)
        addSocialMedia?.setBusinessGuid(businessGuid)
        addSocialMedia?.setSocialMediaProfile(null)
        const availableSysSocialMedia = await getAvailableSysSocialMedia(socialMediaList, sysSocialMedia);
        addSocialMedia?.setSysSocialMedia(availableSysSocialMedia)
    }





    return (
        <div className={`mb-2`}>
            <button
                onMouseDown={handleOpenDialog}
                className={` bg-blue-800 rounded-md px-3 py-1
                text-white hover:bg-blue-700 transition
                duration-500 ease-in-out hover:shadow-md
                 shadow-gray-900 hover:shadow-black/50`}>
                Add Social Media
            </button>
        </div>
    )
}

export interface DisplaySocialMediaProps {
    pagination: any
    socialMediaList: any
    businessGuid: string
    userGuid: string
    sysSocialMedia: SysSocialMediaType[] | null
}
export const DisplaySocialMedia = ({ pagination, socialMediaList, businessGuid, userGuid, sysSocialMedia }: DisplaySocialMediaProps) => {
    const addSocialMediaCtx = useAddSocialMediaContext()
    const [isClicked, setIsClicked] = useState(false)



    const handleUpdateService = async (socialMediaGuid: string) => {
        addSocialMediaCtx?.setDialog(true)
        addSocialMediaCtx?.setBusinessGuid(businessGuid)
        addSocialMediaCtx?.setUserGuid(userGuid)
        const socialMediaProfile = await getSocialMediaProfile(socialMediaGuid)

        addSocialMediaCtx?.setSocialMediaProfile(socialMediaProfile)

        addSocialMediaCtx?.setSysSocialMedia(sysSocialMedia)
        setIsClicked(true)
    }

    useEffect(() => {
        if (socialMediaList) {
            console.log(socialMediaList)
        }
        if (sysSocialMedia) {
            console.log(sysSocialMedia)
        }
    }, [socialMediaList, sysSocialMedia])

    return (
        <div>
            <div className={`mt-6 flex flex-col border rounded-xl overflow-hidden relative`}>

                <div className={`flex flex-row gap-0 p-3 text-lg font-bold gap-x-2`}>
                    <div className={`min-w-[200px] w-[200px]`}>
                        Social Media Name
                    </div>
                    <div className={`grow `}>
                        Social Media Identifier
                    </div>
                </div>
                {
                    socialMediaList?.map((socialMedia: SocialMediaType, index: number) => {
                        const isOdd = (index % 2) === 0 ? true : false
                        const socialMediaObject = sysSocialMedia?.find(platform => platform.id === socialMedia?.social_media_code);
                        return (
                            <div
                                onClick={() => handleUpdateService(socialMedia?.social_media_guid)}
                                key={index} className={` flex flex-row place-items-center relative ${isOdd && 'bg-gray-100'} border-t py-2 px-3 cursor-pointer gap-x-2`}>

                                <div className={`min-w-[200px] w-[200px] text-base first:border-none line-clamp-1`}>
                                    {socialMediaObject?.name}
                                </div>
                                <div className={`md:grow w-full line-clamp-1 text-base`}>
                                    {socialMediaObject?.base_url}
                                    {removeAllParagraphs(socialMedia?.social_media_identifier)}
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
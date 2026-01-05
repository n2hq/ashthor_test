import { useParams } from '@remix-run/react'
import React, { useEffect, useState } from 'react'
import { getBusinessProfile, getSelectedFacilityFeatures, getSysFacilityFeatures, IsAuthenticated, logError } from '~/lib/lib'
import AccountLayout from '../../../assets/AccountLayout'
import ContentLayout from '../../../assets/ContentLayout'
import BusinessMenu from '../assets/BusinessMenu'
import FacilityFeatures from './assets/FactilityFeatures'
import { useAuth } from '~/context/AuthContext'
import CardTitle from '../../../assets/CardTitle'
import BusinessHeader from '../assets/BusinessHeader'
import { facilityFeatures as faciFeatures } from '~/lib/json/facility_features'
import LoadingMessage from '~/components/content/LoadingMessage'

const index = () => {
    useEffect(() => {
        IsAuthenticated(localStorage)
    }, [])

    const [businessGuid, setBusinessGuid] = useState('')
    const [userGuid, setUserGuid] = useState('')
    const [facilityFeatures, setFacilityFeatures] = useState<any | null>(null)
    const [selectedFacilityFeatures, setSelectedFacilityFeatures] = useState<any | null>(null)
    const [data, setData] = useState<any | null>(null)
    const [loading, setLoading] = useState(true)
    const { business_guid, user_guid } = useParams();
    const [businessProfile, setBusinessProfile] = useState<any | null>(null)
    const auth = useAuth()
    if (!auth) { return null }

    useEffect(() => {
        const getAllData = async (businessGuid: string, userGuid: string) => {

            setBusinessGuid(businessGuid)
            setUserGuid(userGuid)
            const facilityFeatures = await getSysFacilityFeatures()
            setFacilityFeatures(faciFeatures)
            const selectedFacilityFeatures = await getSelectedFacilityFeatures(userGuid, businessGuid)
            setSelectedFacilityFeatures(selectedFacilityFeatures)
            const businessProfile = await getBusinessProfile(businessGuid || "")
            setBusinessProfile(businessProfile)
        }
        try {
            if (business_guid && user_guid) {
                getAllData(business_guid, user_guid)
            }
        } catch (e: any) {
            logError(e)
        }
    }, [business_guid, user_guid, faciFeatures])

    useEffect(() => {


        if (businessGuid && userGuid && facilityFeatures && selectedFacilityFeatures && businessProfile) {

            const data = {
                businessGuid: businessGuid,
                userGuid: userGuid,
                facilityFeatures: facilityFeatures,
                selectedFacilityFeatures: selectedFacilityFeatures,
                businessProfile: businessProfile
            }
            setData(data)
            setLoading(false)
        }
    }, [
        businessGuid,
        userGuid,
        facilityFeatures,
        selectedFacilityFeatures,
        businessProfile
    ])



    if (loading) {
        return <LoadingMessage />
    }

    return (
        <AccountLayout>
            <ContentLayout
                businessGuid={businessGuid}
                data={data}
                businessProfile={businessProfile}
                title={'Facility Features'}>



                {
                    data && <FacilityFeatures
                        userGuid={userGuid}
                        businessGuid={businessGuid}
                        facilityFeatures={facilityFeatures}
                        selectedFacilityFeatures={selectedFacilityFeatures}
                    />
                }

            </ContentLayout>
        </AccountLayout>
    )
}

export default index

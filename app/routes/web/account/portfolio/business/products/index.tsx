import React, { useEffect, useState } from 'react'
import AccountLayout from '../../../assets/AccountLayout'
import ContentLayout from '../../../assets/ContentLayout'
import { getBusinessGallery, getBusinessProfile, getGallery, getProductGallery, getVideoGallery, IsAuthenticated } from '~/lib/lib'
import { useParams } from '@remix-run/react'
import BusinessMenu from '../assets/BusinessMenu'
import AddPhoto from './products/AddProduct'
import Gallery from './products/ProductGallery'
import { useAuth } from '~/context/AuthContext'
import CardTitle from '../../../assets/CardTitle'
import BusinessHeader from '../assets/BusinessHeader'
import AddVideo from './products/AddProduct'
import { AddVideoType, ProductType } from '~/lib/types'
import AddProduct from './products/AddProduct'
import { AddProductDialogProvider } from '~/context/AddProductDialogContext'
import ProductGallery from './products/ProductGallery'
import { ProductSliderProvider } from '~/context/ProductSliderContext'
import { EditProductDialogProvider } from '~/context/EditProductDialogContext'
import LoadingMessage from '~/components/content/LoadingMessage'

const index = () => {
    useEffect(() => {
        IsAuthenticated(localStorage)
    }, [])

    const [businessGuid, setBusinessGuid] = useState<string | ''>('')
    const [userGuid, setUserGuid] = useState('')
    const [productGallery, setProductGallery] = useState<ProductType[] | null>(null)
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
            const productGallery: ProductType[] | null = await getProductGallery(businessGuid, userGuid)
            //console.log(videoGallery)
            setProductGallery(productGallery)
            const businessProfile = await getBusinessProfile(businessGuid || "")
            setBusinessProfile(businessProfile)
        }


        try {
            if (business_guid && user_guid) {
                getAllData(business_guid, user_guid)
            }
        } catch (e: any) {
            console.log(e.message)
        }
    }, [business_guid, user_guid])

    useEffect(() => {


        if (businessGuid && userGuid && productGallery && businessProfile) {

            const data = {
                businessGuid: businessGuid,
                userGuid: userGuid,
                productGallery: productGallery,
                businessProfile: businessProfile
            }
            setData(data)
            setLoading(false)
        }
    }, [businessGuid, userGuid, productGallery, businessProfile])



    if (loading) {
        return <LoadingMessage />
    }

    return (
        <EditProductDialogProvider>
            <ProductSliderProvider>
                <AddProductDialogProvider>
                    <AccountLayout>
                        <ContentLayout title={'Product Settings'}
                            businessGuid={businessGuid}
                            data={data}
                            businessProfile={businessProfile}
                        >



                            {
                                businessGuid && userGuid &&
                                <AddProduct userGuid={userGuid} businessGuid={businessGuid} />
                            }

                            {
                                productGallery !== null &&
                                    productGallery?.length > 0 ?
                                    <div className='z-0'>
                                        <ProductGallery
                                            productGallery={productGallery}
                                            userGuid={userGuid}
                                            businessGuid={businessGuid}
                                            listing={businessProfile}
                                        />
                                    </div> :
                                    (<div className=' mt-2 border-[1px] rounded-lg p-3 mb-6'>
                                        Video Gallery is empty.
                                    </div>)
                            }



                        </ContentLayout>
                    </AccountLayout>
                </AddProductDialogProvider>
            </ProductSliderProvider>
        </EditProductDialogProvider>

    )
}

export default index

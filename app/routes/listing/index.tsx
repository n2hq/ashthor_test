import { LoaderFunction, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import React, { useEffect, useState } from 'react'
import SearchHead from '~/components/content/SearchHead'
import ResponsiveNav from '~/components/header/lite/ResponsiveNav'
import { GalleryProvider } from '~/context/GalleryContext'
import RatingProvider from '~/context/RatingContext'
import { config, getBusinessGallery, getBusinessProfileBgData, getBusinessProfileImageData, getBusinessVideoGallery, getOperatingHours, getPage, getProductGallery, getRatingsReviews, getSearch, getVideoGallery, logError } from '~/lib/lib'
import BusinessLayout from './assets/BusinessLayout'
import Footer from '~/components/footer/Footer'
import Related from './assets/Related'
import GenericNav from '~/components/header/generic/GenericNav'
import HomeNav from '../assets/header/HomeNav'
import { TopAd } from '~/components/content/ads/TopAd'
import SearchNavbar from '~/components/header/new/SearchNavbar'
import Layout from '../asset/SearchLayout'
import CallToActionSection from '../../components/content/CallToActionSection'
import FooterSection from '../landing/assets/FooterSection'
import VerticalHeight from '../asset/VerticalHeight'
import ResourceNotFound from './assets/ResourceNotFound'
import { AddVideoType, ProductType } from '~/lib/types'
import { useOnlineStatus } from '~/context/useOnlineStatus'
import { ReportTime } from '~/lib/ReportTime'
import { OnlineStatusProvider } from '~/context/OnlineStatusContext'
import FooterAlt from '~/components/footer/FooterAlt'
import LoadingMessage from '~/components/content/LoadingMessage'
import RelatedAlt from './assets/RelatedAlt'



export const loader: LoaderFunction = async ({ request, params }) => {


    try {
        const id = params.id || null
        let listing

        let profileImageData
        let gallery
        let ratingData
        let videoGallery: AddVideoType[] | null = null
        let products: ProductType[] | null = null
        let reportTime
        let businessProfileBgData

        try {
            listing = await getPage(id)
            profileImageData = await getBusinessProfileImageData(listing?.gid)
            businessProfileBgData = await getBusinessProfileBgData(listing?.gid)
            gallery = await getBusinessGallery(listing.gid)
            ratingData = await getRatingsReviews(listing.gid)
            videoGallery = await getBusinessVideoGallery(listing?.gid)
            products = await getProductGallery(listing?.gid, listing?.owner)
            reportTime = await ReportTime(listing)
            //console.log(profileImageData)
        } catch (error: any) {
            console.log(error.message)
        }




        return {
            listing: listing,
            gallery: gallery,
            ratingsData: ratingData,
            profileImageData: profileImageData,
            businessProfileBgData: businessProfileBgData,
            videoGallery: videoGallery,
            products: products,
            reportTime: reportTime
        }
    } catch (err: any) {
        logError(err)
    }

}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
    try {
        const listing = data?.listing
        const profileImageData = data?.profileImageData

        let profileImageLink = ""

        if (profileImageData?.image_url === "" || profileImageData?.image_url === null || profileImageData?.image_url === undefined) {
            profileImageLink = `${config.BASE_URL}/images/abstract_placeholder.jpg`
        } else {
            profileImageLink = config.IMG_BASE_URL + profileImageData?.image_url
        }

        const mimetype = profileImageData?.mimetype


        const getKeyWords = (texts: string | null): string[] | null => {
            if (texts === null || texts === undefined || texts === "") {
                return null
            }
            const cleaned = texts.replace(/&/g, ',');

            // Step 2: Split by comma and trim each part
            const arr = cleaned
                ?.split(',')
                ?.map(item => item.trim())
                ?.filter(item => item.length > 0);

            return arr
        }

        const keywords: string[] | null = getKeyWords(listing?.business_phrases || null)

        return [
            { title: listing?.title || "Garssete Inc." },
            { name: "description", content: listing?.short_description },
            { name: "keywords", content: keywords },
            { property: "fb:app_id", content: "1325393508603168" },
            { property: "og:url", content: listing?.website || "https://garssete.com" },
            { property: "og:type", content: "website" },
            { property: "og:title", content: listing?.title || "Garssete.com" },
            { property: "og:description", content: listing?.short_description },
            { property: "og:image", content: profileImageLink },
            { property: "og:image:secure_url", content: profileImageLink },
            { property: "og:image:type", content: mimetype },
            { property: "og:image:width", content: "200" },
            { property: "og:image:alt", content: listing?.title || "Garssete" },
            { name: "twitter:creator", content: "garssete" },
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:title", content: listing?.title || "Garssete Directory Listing" },
            { name: "twitter:description", content: listing?.short_description },
        ];
    } catch (e: any) {
        logError(e)
    }

    return []
};

const index = () => {

    const data: any = useLoaderData()


    let listing
    let gallery: any[] | null = null
    let ratingsData: any
    let videoGallery: AddVideoType[] | null = null
    let products: ProductType[] | null = null
    let profileImageData
    let businessProfileBgData
    let reportTime

    listing = data.listing
    gallery = data.gallery
    ratingsData = data.ratingsData
    videoGallery = data.videoGallery
    products = data.products
    profileImageData = data.profileImageData
    businessProfileBgData = data.businessProfileBgData
    reportTime = data.reportTime

    console.log(reportTime)



    /*  if (!online) {
         return (
             <div>Possible no internet connection. Check to reconnect.</div>
         )
     } */

    return (

        <RatingProvider>
            <GalleryProvider>
                <Layout>


                    <TopAd />


                    {
                        listing?.gid !== null && listing?.gid !== undefined && gallery && ratingsData && videoGallery && products && profileImageData && reportTime &&
                        <BusinessLayout
                            listing={listing}
                            images={gallery}
                            ratingsData={ratingsData}
                            videoGallery={videoGallery}
                            products={products}
                            profileImageData={profileImageData}
                            businessProfileBgData={businessProfileBgData}
                            reportTime={reportTime}
                        />
                    }





                    {
                        listing.category !== undefined ?
                            <RelatedAlt
                                category={listing?.category}
                                limit={6}
                                title={`Related: ${listing?.category}`}
                                subtitle={"Related based on the same category."}
                            /> :
                            <ResourceNotFound />
                    }
                    <VerticalHeight />
                    {/* <CallToActionSection /> */}
                    {/** footer */}
                    <FooterAlt />
                </Layout>
            </GalleryProvider>

        </RatingProvider>

    )
}

export default index
import React, { useEffect, useState } from 'react'
import { GalleryProvider } from '~/context/GalleryContext'
import RatingProvider from '~/context/RatingContext'
import SearchLayout from '../asset/SearchLayout'
import Review from './assets/Review'
import Reviews from './lassets/Reviews'
import Save from './lassets/Share'
import Hero, { ImageType } from './lassets/Hero'
import HeaderTitle from './lassets/HeaderTitle'
import About from './lassets/About'
import DropBy from './lassets/DropBy'
import WorkingHours from './lassets/WorkingHours'
import Features from './lassets/Features'
import Location from './lassets/Location'
import ReviewReport from './lassets/ReviewReport'
import UserReviews from './lassets/UserReviews'
import Related from './lassets/Related'
import NearbyBusinesses from './lassets/NearbyBusinesses'
import { BiTrophy } from 'react-icons/bi'
import HeroCarousel from './lassets/HeroCarousel'
import MobileHeroWithTitle from './lassets/MobileHeroWithTitle'
import Videos from './lassets/Videos'
import Products from './lassets/Products'
import SocialMedia from './lassets/SocialMedia'
import Services from './lassets/Services'
import ClaimBusiness from './lassets/ClaimBusiness'
import { LoaderFunction } from '@remix-run/node'
import { config, generateRandom10DigitNumber, getBusinessGallery, getBusinessProfileBgData, getBusinessProfileImageData, getBusinessRating, getBusinessReviews, getBusinessVideoGallery, getListingByCategory, getNearbyBusinesses, getPage, getProductGallery, getRatingsReviews, getRelatedByCategory, getServiceList, getServicesByBusinessGuid, logError } from '~/lib/lib'
import { AddVideoType, BusinessReviewType, ListingType, ProductType, ProfileImageType, RatingsDataType, ServiceType } from '~/lib/types'
import { ReportTime } from '~/lib/ReportTime'
import { useLoaderData } from '@remix-run/react'
import { list } from 'postcss'
import { VideoGalleryProvider } from '~/context/VideoGalleryContext'
import { ProductGalleryProvider } from '~/context/ProductGalleryContext'
import { ProductSliderProvider } from '~/context/ProductSliderContext'
import RatingSummary from './lassets/RatingSummary'
import { WriteReviewProvider } from '~/context/WriteReviewContext'
import { ReviewType, useWriteReviewAltContext, WriteReviewAltProvider } from '~/context/WriteReviewAltContext'
import { BusinessRatingSummary } from '../api/rating/rate_business'
import { useShareDialogContext } from '~/context/ShareDialogContext'
import { ReadMoreAboutProvider } from '~/context/ReadMoreAboutContext'
import { ReadMoreWithUrlProvider } from '~/context/ReadMoreWithUrlContext'


export const loader: LoaderFunction = async ({ request, params }) => {
    const id = params.id || null
    let listing

    let profileImageData, gallery, ratingData
    let reportTime, businessProfileBgData, fullPath
    let randomNumber
    let videoGallery: AddVideoType[] | null = null
    let products: ProductType[] | null = null

    let businessReviews
    let businessRating
    let related: ListingType[]
    let nearby: ListingType[]
    let services: ServiceType[] | null

    const url = new URL(request.url);
    const pathname = url.pathname;

    try {

        listing = await getPage(id)
        profileImageData = await getBusinessProfileImageData(listing?.gid)
        businessProfileBgData = await getBusinessProfileBgData(listing?.gid)
        gallery = await getBusinessGallery(listing.gid)
        ratingData = await getRatingsReviews(listing.gid)
        businessRating = await getBusinessRating(listing?.gid)
        businessReviews = await getBusinessReviews(listing?.gid)

        videoGallery = await getBusinessVideoGallery(listing?.gid)
        products = await getProductGallery(listing?.gid, listing?.owner)
        reportTime = await ReportTime(listing)
        randomNumber = generateRandom10DigitNumber()
        fullPath = config.BASE_URL + pathname

        related = await getRelatedByCategory(listing?.category, 10)
        nearby = await getNearbyBusinesses(listing?.city_id || '32', 10) //use dubai = 32

        services = await getServicesByBusinessGuid(listing?.gid)
        console.log(services)
        console.log('hal')

        return {
            listing: listing,
            gallery: gallery,
            ratingsData: ratingData,
            profileImageData: profileImageData,
            businessProfileBgData: businessProfileBgData,
            videoGallery: videoGallery,
            products: products,
            reportTime: reportTime,
            randomNumber: randomNumber,
            fullPath: fullPath,
            businessRating: businessRating,
            businessReviews: businessReviews,
            related: related,
            nearby: nearby,
            services: services
        }

    } catch (err: any) {
        logError(err)
    }

    return null
}



const listing = () => {
    const reviewContext: ReviewType | null = useWriteReviewAltContext()
    const data: any = useLoaderData()
    const [operatingHoursStatus, setOperatingHoursStatus] = useState<any | undefined>(undefined)
    const [showShare, setShowShare] = useState(false)
    const shareContext = useShareDialogContext()
    const [profileImg, setProfileImg] = useState('')



    let listing: ListingType
    let gallery: ImageType[]
    let ratingsData: RatingsDataType
    let videoGallery: AddVideoType[]
    let products: ProductType[]
    let profileImageData: ProfileImageType | null
    let businessProfileBgData
    let reportTime

    let businessRating: BusinessRatingSummary
    let businessReviews: BusinessReviewType[]
    let related: ListingType[]
    let nearby: ListingType[]
    let services: ServiceType[] | null


    listing = data.listing
    gallery = data.gallery
    ratingsData = data.ratingsData
    videoGallery = data.videoGallery
    products = data.products
    profileImageData = data.profileImageData
    businessProfileBgData = data.businessProfileBgData
    reportTime = data.reportTime
    businessRating = data.businessRating
    businessReviews = data.businessReviews
    related = data.related
    nearby = data.nearby
    services = data.services?.data

    console.log(profileImageData)


    useEffect(() => {
        if (listing && reportTime) {
            setOperatingHoursStatus(reportTime);
        }
    }, [listing, reportTime])

    useEffect(() => {
        if (profileImageData) {
            setProfileImg(config.IMG_BASE_URL + profileImageData?.image_url)
        }
    }, [profileImageData])

    return (
        <RatingProvider>
            <GalleryProvider>
                <SearchLayout>
                    <MobileHeroWithTitle
                        title={listing?.title}
                        images={gallery}
                        listing={listing}
                    />
                    <div className={`px-[20px] bg-gray-50/20`}>
                        <div className={`max-w-[1100px] mx-auto w-full mt-0 md:mt-12`}>

                            <div className={`hidden md:block`}>
                                {/** main header title */}
                                <HeaderTitle
                                    listing={listing}
                                    ratingsData={ratingsData}
                                    reviewContext={reviewContext}
                                    showShare={showShare}
                                    shareContext={shareContext}
                                    profileImg={profileImg}
                                    profileImageData={profileImageData}
                                />

                                {/** hero */}
                                {
                                    gallery && listing &&
                                    <Hero images={gallery} listing={listing} />
                                }
                            </div>



                            <div className={`grid grid-cols-1 lg:grid-cols-12 lg:gap-x-24 mt-0 md:mt-12`}>
                                <div className={` md:col-span-7`}>



                                    <WriteReviewAltProvider>
                                        <RatingSummary
                                            listing={listing}
                                            ratings={ratingsData}
                                            reviewContext={reviewContext}
                                            businessRating={businessRating}
                                        />

                                    </WriteReviewAltProvider>

                                    <DropBy listing={listing} reportTime={reportTime}
                                        operatingHoursStatus={operatingHoursStatus}
                                    />

                                    <ReadMoreAboutProvider>
                                        <About listing={listing} />
                                    </ReadMoreAboutProvider>

                                    <div className={`block lg:hidden mb-12`}>
                                        <WorkingHours listing={listing}
                                            operatingHoursStatus={operatingHoursStatus}
                                            workTimeStatusObject={reportTime.todayHoursOpenStatus}
                                        />

                                        <ClaimBusiness />
                                    </div>

                                    <VideoGalleryProvider>
                                        <Videos
                                            listing={listing}
                                            videoGallery={videoGallery}
                                        />
                                    </VideoGalleryProvider>

                                    <SocialMedia listing={listing} />

                                    <ReadMoreWithUrlProvider>
                                        <Services services={services} />
                                    </ReadMoreWithUrlProvider>


                                    <ProductSliderProvider>
                                        <ProductGalleryProvider>
                                            <Products
                                                listing={listing}
                                                products={products}
                                            />
                                        </ProductGalleryProvider>
                                    </ProductSliderProvider>

                                    <ReadMoreAboutProvider>
                                        <Features listing={listing} />
                                    </ReadMoreAboutProvider>

                                    <Location listing={listing} />
                                </div>
                                <div className={`hidden lg:block lg:col-span-5 relative w-full`}>
                                    <div className={`sticky top-[100px] w-full`}>
                                        <WorkingHours listing={listing}
                                            operatingHoursStatus={operatingHoursStatus}
                                            workTimeStatusObject={reportTime.todayHoursOpenStatus}
                                        />
                                        <ClaimBusiness />
                                    </div>
                                </div>
                            </div>

                            {/** review report */}
                            <ReviewReport businessRating={businessRating}
                                listing={listing} />

                            {/** reviews from people */}
                            <UserReviews businessReviews={businessReviews} />


                            {/** Related */}
                            <Related related={related} />


                        </div>

                        <div className={`max-w-[1100px] mx-auto w-full mt-12`}>
                            <NearbyBusinesses nearby={nearby} />
                        </div>
                    </div>
                </SearchLayout>
            </GalleryProvider>
        </RatingProvider>
    )
}

export default listing

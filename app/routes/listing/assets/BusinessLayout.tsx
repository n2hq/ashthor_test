import React, { useEffect, useState } from 'react'
import Header from './Header'
import Masonry from './Masonry';
import PreDescription from './ShortDescription';
import Description from './Description';
import Address from './Address';
import Review from './Review';
import Rating from '../../../context/RatingContext';
import StarRating from './StarRating';
import BusinessFeatures from './BusinessFeatures';
import ShortDescription from './ShortDescription';
import UserReviews from './BusinessRatings';
import BusinessRatings from './BusinessRatings';
import ImageBlock from './ImageBlock';
import { list } from 'postcss';
import { ListingCarousel } from './ListingCarousel';
import BusinessPhrases from './BusinessPhrases';

import Services from './Services';
import SocialMedia from './SocialMedia';
import RatingDisplay from './RatingDisplay';
import { RatingDisplayType } from '~/lib/types';
import RatingBox from '~/routes/web/search/assets/RatingBox';
import { config, formatNumber, logError } from '~/lib/lib';
import RatingBoxRounded from './RatingBoxRounded';
import ClaimBusiness from './ClaimBusiness';
import LocationWithHours from './LocationWithHours';
import { ReportTime } from '~/lib/ReportTime';
import RatingBoxSquare from './RatingBoxSquare';
import Videos from './Videos';
import Products from './products/Products';
import AddressPanel from './AddressPanel';



const BusinessLayout = ({
    listing,
    images,
    ratingsData,
    videoGallery,
    products,
    profileImageData,
    businessProfileBgData,
    reportTime
}: any) => {
    //console.log(profileImageData)
    const [ratingDisplayData, setRatingDisplayData] = useState<RatingDisplayType | null>(null)
    const [operatingHoursStatus, setOperatingHoursStatus] = useState<any | undefined>(undefined)
    const [bListing, setbListing] = useState<any | null>(null)

    useEffect(() => {
        if (listing) {
            setbListing(listing)
        }
    }, [listing])

    useEffect(() => {
        if (listing && ratingsData) {
            setRatingDisplayData({
                totalReviews: 0,
                category: listing?.category,
                rating: ratingsData.rating_average,
                ratingCount: ratingsData.rating_count
            })
        }
        //console.log(JSON.stringify(listing.category))
    }, [listing, ratingsData])

    useEffect(() => {
        if (listing && reportTime) {

            setOperatingHoursStatus(reportTime);

        }
    }, [listing, reportTime])
    return (
        <div className={`mt-0 `}>


            {/* <div className={`w-full h-[120px] relative overflow-hidden mb-10 bg-gray-200`}>
                    {

                        <img
                            className={` object-cover w-full h-full border-none outline-none`}
                            src={businessProfileBgData.image_url ? config.IMG_BASE_URL + businessProfileBgData?.image_url : `https://smartmag.theme-sphere.com/curated-mag/wp-content/uploads/sites/59/2025/01/025afe68a2de6252ad7f21cab94086b8.jpeg`}
                            alt=""
                        />

                    }
                </div> */}

            <div className={`px-[0px] w-full`}>
                <div className={`max-w-[1100px] w-full mx-auto bg-white`}>


                    {
                        ratingsData &&
                        <div className={`mt-4 flex gap-2 place-items-center px-[12px]`}>
                            <RatingBoxSquare rating={Number(ratingsData?.rating_average)} />
                            <div className={`flex place-items-center place-content-center
                                    gap-1 text-black/60 text-[14px]`}>
                                <div>{formatNumber(Number(ratingsData?.rating_average))}</div>
                                <div>(<span className='underline'>{formatNumber(ratingsData?.rating_count)} reviews</span>)</div>
                            </div>
                        </div>
                    }

                    {
                        listing && (profileImageData) &&
                        <Header
                            listing={listing}
                            profileImageData={profileImageData}
                            operatingHoursStatus={operatingHoursStatus}
                            ratingsData={ratingsData}
                        />
                    }


                </div>

            </div>



            {
                images?.length > 0 && listing &&
                <div className={`bg-black h-fit md:hidden
                            mt-4 `}>
                    <ListingCarousel
                        images={images}
                        listing={listing}
                    />

                </div>
            }

            <div className={` md:pt-4 md:px-[12px]`}>
                <div className={`max-w-[1100px] w-full mx-auto bg-white`}>
                    <div className={`grid grid-cols-12 gap-0 md:gap-4 relative
                    `}>
                        <div className={` col-span-12 lg:col-span-8`}>

                            {/** image block */}
                            <div className={`hidden md:block mt-0`}>
                                {
                                    Array.isArray(images) && images?.length > 0 && listing &&
                                    <ImageBlock
                                        images={images}
                                        listing={listing}
                                    />
                                }
                            </div>

                            {
                                videoGallery?.length > 0 &&
                                <Videos
                                    videoGallery={videoGallery}
                                    listing={listing}
                                />
                            }

                            {/**  */}
                            <div className={``}>
                                <div className={`lg:hidden ${images?.length <= 0 && 'mt-5'}  md:mt-0 mb-5`}>

                                    <AddressPanel
                                        ratingsData={ratingDisplayData}
                                        businessProfile={bListing}
                                    />

                                    {bListing !== null && <ClaimBusiness listing={bListing} />
                                    }
                                    {/* {
                                        listing && <Review listing={listing} />
                                    } */}

                                </div>

                                <div className={`px-[15px] md:px-[0px]`}>
                                    {/** short description */}
                                    <ShortDescription listing={listing} />


                                    {/** location with hours */}
                                    {
                                        listing && operatingHoursStatus && <LocationWithHours listing={listing} operatingHoursStatus={operatingHoursStatus} />
                                    }


                                    {/** long description */}
                                    <Description listing={listing} />


                                    {/** social media */}
                                    {listing && <SocialMedia listing={listing} />}


                                    {/** facility features */}
                                    {listing && <BusinessFeatures listing={listing} />}


                                    {/** business phrases */}
                                    {listing && <BusinessPhrases listing={listing} />}


                                    {/** products */}
                                    {listing && <Products products={products}
                                        listing={listing}
                                    />}


                                    {/** services */}
                                    {listing && <Services listing={listing} />}



                                    {/** business ratings */}
                                    {listing && <BusinessRatings listing={listing} />}
                                </div>
                            </div>
                        </div>


                        <div className={`col-span-12 lg:col-span-4 hidden lg:block`}>
                            {/** sticky sidebar */}
                            <div className={` sticky top-[100px]`}>

                                <AddressPanel
                                    ratingsData={ratingDisplayData}
                                    businessProfile={bListing}
                                />

                                <div className='h-[40px]'>

                                </div>

                                {listing && <ClaimBusiness listing={listing} />}
                                {/* <Review /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default BusinessLayout

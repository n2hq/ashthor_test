import React, { useEffect, useState } from 'react'
import { BiBuilding, BiPhone, BiSolidStar, BiStar } from 'react-icons/bi'
import { BsBank, BsInstagram, BsLinkedin, BsPinterest, BsTwitterX, BsYoutube } from 'react-icons/bs'
import { CgFacebook, CgTwitter, CgWebsite } from 'react-icons/cg'
import { FaFacebook, FaLinkedinIn, FaYoutubeSquare } from 'react-icons/fa'
import { GrYoutube } from 'react-icons/gr'
import RatingBox from './RatingBox'
import RatingText from './RatingText'
import Address from './Address'
import { appConfig, config, getCardIcon, searchCategories, searchFacilities, strToList } from '~/lib/lib'
import { MdEmail } from 'react-icons/md'
import { RatingCount } from './RatingCount'
import RatingBoxRounded from './RatingBoxRounded'
import { ListingType } from '~/lib/types'
import Tooltip from './Tooltip'
import { NavLink } from '@remix-run/react'
import Placeholder from '~/components/content/Placeholder'
import RatingBoxSquare from '~/routes/listing/assets/RatingBoxSquare'


const Card = ({ listing }: any) => {
    //const fallbackImg = `/images/fallbackBusinessImg.png`

    const [placeholder, setPlaceholder] = useState('/images/bycetplaceholder.png')
    const [imgscr, setImgsrc] = useState('')
    const [userId, setUserId] = useState('')
    const [socialMedia, setSocialMedia] = useState<any | null>(null)
    const [listingWebsite, setListingWebsite] = useState('')
    const [baseListing, setBaseListing] = useState<ListingType | null>(null)
    const [facilityFeatures, setFacilityFeatures] = useState<any | null>(null)
    const [addressLink, setAddressLink] = useState('')

    useEffect(() => {
        if (listing) {
            const baseListing: ListingType = listing as unknown as ListingType;
            setBaseListing(baseListing)

            //console.log(baseListing)

            if (baseListing?.image_url) {
                setImgsrc(config.IMG_BASE_URL + baseListing?.image_url)
            } else {
                setImgsrc(placeholder)
            }
        }
    }, [listing])

    useEffect(() => {
        if (listing?.website) {

            setListingWebsite(listing?.website)
        } else {
            if (listing?.username === "" || listing?.username === null) {
                setListingWebsite('/' + listing?.gid)
            } else {
                setListingWebsite('/' + listing?.username)
            }
        }
    }, [listing])

    useEffect(() => {
        if (listing) {
            if (listing?.image_url !== "" && listing?.image_url !== null && listing?.image_url !== undefined) {
                //console.log(config.IMG_BASE_URL)
                setImgsrc(config.IMG_BASE_URL + listing?.image_url)
            } else {
                setImgsrc(placeholder)
            }

            if (listing?.username !== "" && listing?.username !== null && listing?.username !== undefined) {
                setUserId(listing?.username)
            } else {
                setUserId(listing?.gid)
            }
        }
    }, [listing])

    useEffect(() => {
        if (listing?.social_media) {

            let socialMedia: any = []
            const separatedMedia = strToList(listing?.social_media, ",")

            if (separatedMedia !== null) {

                separatedMedia?.map((mediaString: any, index: number) => {
                    const mediaInfo = strToList(mediaString, "$")
                    const mediaObj = {
                        mediaName: mediaInfo[0],
                        mediaHandle: mediaInfo[1],
                        baseUrl: mediaInfo[2]
                    }
                    console.log(mediaObj)
                    socialMedia.push(mediaObj)
                })
            }
            setSocialMedia(socialMedia)

        }
    }, [listing])

    useEffect(() => {
        if (socialMedia !== null) {
            //console.log(socialMedia)
        }
    }, [socialMedia])


    useEffect(() => {
        if (baseListing?.facility_features) {
            let facilityFeatures: any = []
            //console.log(baseListing?.facility_features)
            const separatedFeatures = strToList(baseListing?.facility_features, "&")
            //console.log(separatedFeatures)

            if (separatedFeatures !== null) {
                separatedFeatures?.map((featureString: any, index: number) => {
                    const featureInfo = strToList(featureString, "$")

                    const featureObject = {
                        featureId: featureInfo[0],
                        userDescription: featureInfo[1]
                    }
                    facilityFeatures.push(featureObject)
                })
            }

            const mappedFacilityFeatures = searchFacilities(facilityFeatures)
            //console.log(mappedFacilityFeatures)
            setFacilityFeatures(mappedFacilityFeatures)
        }
    }, [baseListing])


    useEffect(() => {
        let getListingAddress = async (listing: any) => {
            let address = listing?.title
            address += listing?.address_one ? ', ' + listing?.address_one : ''
            address += listing?.address_two ? ', ' + listing?.address_two : ''
            address += listing?.city_name ? ', ' + listing?.city_name : ''
            address += listing?.state_name ? ', ' + listing?.state_name : ''
            address += listing?.zipcode ? ', ' + listing?.zipcode : ''
            address += listing?.country_name ? ', ' + listing?.country_name : ''
            //console.log(address)
            //let addr = `https://www.google.com/maps/place/${listing?.title}/@${listing?.latitude},${listing?.longitude},17z`
            let addLink = `https://www.google.com/maps/search/?api=1&query=${address}`
            let addressLink = `https://www.google.com/maps?q=${(address)}&t=&z=15&ie=UTF8&iwloc=B&output=`
            //setAddress(address)
            //console.log(addLink)
            setAddressLink(addLink)
        }

        if (listing !== null) {
            getListingAddress(listing)
        }
    }, [listing])


    return (
        <div className={`bg-white w-full h-auto  overflow-hidden border   hover:shadow-md hover:shadow-gray-200 md:rounded-xl`}>
            {/** header */}
            <div className={`bg-gray-50/30 py-3 px-4 border-b-0`}>

                <a href={`/${userId}`}>
                    <div className={`flex place-content-between gap-2`}>
                        {/** left */}
                        <div className={`flex place-items-start gap-2 w-full`}>
                            <div className={`max-w-[85px] h-[90px] min-w-[85px]   bg-gray-50  relative border flex place-items-center place-content-center  overflow-hidden shadow-xl shadow-gray-400/30`}

                            >
                                {
                                    (listing?.image_url === undefined || listing?.image_url === null || listing?.image_url === '') &&
                                    <div className={`absolute top-0 h-full w-full flex -gap-y-2 place-content-center place-items-center font-bold z-[10] text-white bg-black/10 text-[7px] tracking-[3px] flex-col`}>
                                        <div>AUTOMATIC</div>
                                        <div>GENERATED</div>
                                    </div>
                                }
                                {
                                    listing?.image_url !== null ?
                                        <img
                                            src={imgscr}
                                            alt={""}
                                            className={` w-full h-full text-sm
                             z-0 bg-gray-100 object-cover `}
                                        /> :
                                        <div className={`relative h-full w-full`}>
                                            <img
                                                src={appConfig.fallbackImg}
                                                alt=""
                                                className={`object-cover h-full w-full`}
                                            />
                                        </div>

                                }


                            </div>

                            <div className={` w-full`}>
                                <div className={`text-[18px] font-normal text-blue-800 line-clamp-1 w-full`}>
                                    {listing?.title}

                                </div>
                                {
                                    listing?.category &&
                                    <div className={`text-[12px] text-gray-500  capitalize mt-[0px]`}>
                                        {searchCategories(listing?.category)?.name}
                                    </div>
                                }

                                <div className={`flex place-items-center gap-x-1 mt-[5px] `}>
                                    <div>
                                        {
                                            baseListing?.average_rating !== null && baseListing?.average_rating !== "" &&
                                                baseListing?.average_rating !== undefined ?
                                                <div className={` flex gap-2 place-items-center`}>
                                                    <RatingBoxSquare rating={Number(baseListing?.average_rating)} />

                                                    <RatingCount averageRating={baseListing?.average_rating} />
                                                </div> :
                                                <div className={` flex gap-2 place-items-center`}>
                                                    <RatingBoxSquare rating={Number(baseListing?.average_rating)} />
                                                    <RatingCount averageRating={0} />
                                                </div>
                                        }
                                    </div>

                                    <div className={` `}>
                                        {
                                            Number(baseListing?.total_reviews) > 0 ?
                                                baseListing?.total_reviews :
                                                0
                                        } Reviews
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/** right */}
                        <div className={`flex place-items-start`}>
                            <div className={`font-bold rounded-sm border px-3 py-[2px]`}>View</div>
                        </div>
                    </div>
                    <div className={`mt-[8px] text-[14px] md:text-[13px] text-gray-800 leading-[1.3em] line-clamp-3`}>
                        {
                            listing?.short_description
                        }

                    </div>
                </a>
            </div>


            {/** body */}
            <div>
                <div className={` h-auto flex place-content-between gap-2 `}>
                    {/** left */}
                    <div className={`flex place-items-start w-[60%] flex-col  pl-4  pt-2 pb-4 `}>

                        {/** founded */}
                        <div className={`flex place-items-center gap-x-1`}>
                            <BsBank />
                            <span className={`mt-[1px] text-gray-500 space-x-2`}>
                                <span className={`font-bold`}>Founded:</span>
                                <span>{listing?.established}</span>
                            </span>
                        </div>

                        {/** facility features */}
                        {
                            facilityFeatures !== null &&
                            <div className={`mt-2 flex place-items-start gap-2 w-full relative`}>
                                <span className={`text-[13px]`}>Facilities: </span>
                                <div className={`flex place-items-baseline gap-3 flex-wrap leading-[0.9em] `}>
                                    {
                                        facilityFeatures?.map((feature: any, index: number) => {

                                            return (
                                                <Tooltip
                                                    key={index}
                                                    tooltip={`${feature?.name}: ${feature?.userDescription || ""}`}
                                                >
                                                    <div className={`text-[15px]`}>
                                                        {feature?.icon}
                                                    </div>
                                                </Tooltip>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        }



                    </div>

                    {/** right */}
                    <div className={`flex place-items-end flex-col w-[40%] text-end pr-4 pt-2 pb-4`}>
                        <div className={`font-[600]`}>{listing?.phone}</div>
                        <div className={`text-[12px] leading-[1.2em] mt-1`}>
                            <Address listing={listing} />
                        </div>
                    </div>
                </div>
            </div>

            {/** pre footer */}
            <div className={`border-none`}>
                <div className={`flex place-content-between mx-4 my-1`}>

                    {/** left */}
                    <div className={`flex place-items-center gap-4`}>
                        <a href={`mailto:${listing?.email_address}`} key={34}>
                            <MdEmail size={20} />
                        </a>
                        {
                            listing?.phone &&
                            <a href={`tel:${listing?.phone}`} key={30}>
                                <BiPhone size={20} />
                            </a>
                        }
                        {
                            socialMedia !== null &&
                            socialMedia?.map((media: any, index: number) => {
                                return (
                                    <a href={`${media?.baseUrl}${media?.mediaHandle}`} key={index}>
                                        {
                                            getCardIcon(media?.mediaName)
                                        }
                                    </a>
                                )
                            })
                        }




                    </div>

                    {/** right */}
                    <div className={`px-1.5 py-0.5 bg-red-500 rounded hover:shadow-lg text-white`}>
                        <a href={`${listingWebsite}`}>
                            Website
                        </a>
                    </div>
                </div>
            </div>

            {/** footer */}
            <div className={`px-4 mb-4 mt-8`}>
                <div className={` grid grid-cols-2 gap-2 w-full md:w-[50%]`}>
                    <a
                        target="_blank"
                        href={`${addressLink}`}
                        className={`border border-blue-400 py-[5px] rounded px-2 font-semibold w-full text-center`}
                    >
                        Go to map
                    </a>
                    <div>
                        {
                            baseListing?.phone &&
                            <a href={`tel:${baseListing?.phone}`}>
                                <button className={`bg-[#D71616] rounded w-full text-white flex place-items-center place-content-center text-[15px] gap-2 py-[5px]`}>
                                    <BiPhone size={20} className={`mt-[2px]`} />
                                    <span>Call</span>
                                </button>
                            </a>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Card

import { Link } from '@remix-run/react'
import React, { ReactNode, useEffect, useState } from 'react'
import { BiCar, BiKnife, BiPhone, BiWifi } from 'react-icons/bi'
import { BsInstagram, BsLinkedin, BsPhone, BsTwitterX } from 'react-icons/bs'
import { CgWebsite } from 'react-icons/cg'
import { FaFacebook, FaFacebookSquare, FaLinkedin, FaPinterest, FaPinterestSquare, FaSwimmingPool, FaTiktok, FaTv, FaVimeo, FaVimeoSquare, FaYoutubeSquare } from 'react-icons/fa'
import { FaElevator, FaWater } from 'react-icons/fa6'
import { GiBathtub } from 'react-icons/gi'
import { MdEmail, MdWash } from 'react-icons/md'
import { TbAirConditioning, TbWashDry } from 'react-icons/tb'
import { getIcon, getSocialMediaByBusinessGuid, isValidUrl } from '~/lib/lib'
import { ListingType, SocialMediaType } from '~/lib/types'

const socialMediaR = [
    {
        title: "Facebook",
        icon: <FaFacebook />,
        url: `http://facebook.com/`
    },
    {
        title: "TwitterX",
        icon: <BsTwitterX />,
        url: `http://x.com/`
    },
    {
        title: "Instagram",
        icon: <BsInstagram />,
        url: `http://instagram.com/`
    },
    {
        title: "Pinterest",
        icon: <FaPinterest />,
        url: `http://pinterest.com/`
    },
    {
        title: "Vimeo",
        icon: <FaVimeo />,
        url: `http://vimeo.com/`
    },
    {
        title: "LinkedIn",
        icon: <FaLinkedin />,
        url: `http://linkedin.com/`
    },
]

export type remappedSocialMediaType = {
    media: string
    icon: ReactNode
    name: string
    link: string
}
export interface SocialMediaProps {
    listing: ListingType
}

const SocialMedia = ({ listing }: SocialMediaProps) => {
    const [img, setImg] = useState('')
    const [social, setSocial] = useState<any | null>(null)

    useEffect(() => {
        if (social !== null) {
            console.log(social)
        }
    }, [social])

    useEffect(() => {
        const getSocialMedia = async (listing: any) => {
            const socials = []

            const socialMedia = await getSocialMediaByBusinessGuid(listing?.gid)
            socialMedia?.map((media: SocialMediaType, index: number) => {
                const handle = media?.social_media_identifier
                const isValidURL = isValidUrl(handle)
                let link = ""

                if (isValidURL) {
                    link = handle
                } else {
                    link = `${media?.base_url}${media?.social_media_identifier}`
                }



                socials.push({
                    media: media?.social_media_name,
                    icon: getIcon(media),
                    name: media?.social_media_name,
                    link: link
                })
            })



            if (listing?.website) {
                socials.push({
                    media: listing?.website,
                    icon: <CgWebsite />,
                    name: 'Website',
                    link: `${listing?.website}`
                })
            }

            if (listing?.email_address) {
                socials.push({
                    media: listing?.email_address,
                    icon: <MdEmail />,
                    name: 'Email Address',
                    link: `mailto:${listing?.email_address}`
                })
            }

            if (listing?.phone) {
                socials.push({
                    media: listing?.phone,
                    icon: <BiPhone />,
                    name: 'Phone',
                    link: `tel:${listing?.phone}`
                })
            }
            setSocial(socials)
        }

        if (listing !== null) {

            getSocialMedia(listing)
        }
    }, [listing])


    return (
        <div className={`mt-12 border-t py-10`}>
            <div className={`text-[22px] md:text-[25px] font-semibold `}>
                Social Media
            </div>

            <div className={`mt-6`}>
                <div className={`grid grid-cols-2 w-full gap-4`}>
                    {
                        social?.map((item: remappedSocialMediaType, i: number) => {
                            return (
                                <div key={i}>
                                    <Link to={item.link}>
                                        <div className={`py-2.5 flex place-items-center gap-4 group cursor-pointer`}>
                                            <div className={`text-[19px]`}>
                                                {item.icon}
                                            </div>
                                            <div className={`text-[15px] cursor-pointer group-hover:underline w-full `}>
                                                {item.name}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default SocialMedia

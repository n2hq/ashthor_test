import { Link, useLocation } from "@remix-run/react";
import { list } from "postcss";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { BiChevronLeft, BiCopy, BiMessageSquare, BiPhone } from "react-icons/bi";
import { BsFacebook, BsMailbox, BsTwitterX, BsWhatsapp } from "react-icons/bs";
import { CgChevronLeft, CgClose, CgCopy, CgWebsite } from "react-icons/cg";
import { FaLinkedin, FaMailBulk, FaTelegram } from "react-icons/fa";
import { FaCopy } from "react-icons/fa6";
import { FiMessageSquare } from "react-icons/fi";
import { MdEmail, MdMail } from "react-icons/md";
import { config, generateRandom10DigitNumber, getIcon, getInitials, getSocialMediaByBusinessGuid, isValidUrl, removeAllParagraphs, truncateText } from "~/lib/lib";
import { ListingType, ProfileImageType } from "~/lib/types";

export type ShareContextType = {
    setShow: (show: true) => void
    setListing: (listing: ListingType) => void
    setProfileImg: (profileImg: string) => void
    setProfileImageData: (profileImageData: ProfileImageType | null) => void
}
const ShareDialogContext = createContext<ShareContextType | null>(null)

export const useShareDialogContext = () => {
    const cxt = useContext(ShareDialogContext)
    if (cxt) {
        return cxt
    }
    return null
}

async function copyUrlToClipboard(location: any) {
    const url = config.BASE_URL + location.pathname

    try {
        await navigator.clipboard.writeText(url);
        console.log('URL copied to clipboard:', url);
        // Show success message to user
        //alert('Link copied to clipboard!');
    } catch (err) {
        console.error('Failed to copy:', err);
        // Fallback for older browsers
        //fallbackCopyTextToClipboard(url);
    }
}

function getEncodedShareLinks(listing: ListingType, location: any) {

    const url = config.BASE_URL + location.pathname

    const baseUrl = `${url}?v=${Date.now()}`
    const shareText = listing?.title + " - " + removeAllParagraphs(truncateText(listing?.short_description, 150)) + ` via @bycetinc`

    const encodedBaseUrl = encodeURIComponent(baseUrl);
    const encodedShareText = encodeURIComponent(shareText);

    const twitterShare = `https://twitter.com/intent/tweet?url=${encodedBaseUrl}&text=${encodedShareText}`;

    const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodedBaseUrl}&quote=${encodedShareText}`;


    const whatsappShare = `https://wa.me/?text=${encodedShareText} ${encodedBaseUrl}`


    const mailtoSubject = `Check out ${listing?.title} on Bycet.com`
    const encodedSubject = encodeURIComponent(mailtoSubject)

    const body = `${shareText}\n\nView here: ${baseUrl}\n\nShared via @bycetinc`
    const encodedBody = encodeURIComponent(body)
    const mailtoShare = `mailto:?subject=${encodedSubject}&body=${encodedBody}`


    const sms = `${shareText}\n\nView here: ${baseUrl}\n\nShared via @bycetinc`
    const encodedSms = encodeURIComponent(sms)
    const smsShare = `sms:&body=${encodedSms}`

    const telegramShare = `https://t.me/share/url?url=${encodedBaseUrl}&text=${encodedShareText}`

    const linkedInShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedBaseUrl}`

    let shareObject: any

    shareList.map((item, i: number) => {
        if (item.key === 'twitter') {
            item.url = twitterShare
        }
        if (item.key === "facebook") {
            item.url = facebookShare
        }
        if (item.key === "whatsapp") {
            item.url = whatsappShare
        }
        if (item.key === "email") {
            item.url = mailtoShare
        }
        if (item.key === "messages") {
            item.url = smsShare
        }
        if (item.key === "telegram") {
            item.url = telegramShare
        }
        if (item.key === "linkedin") {
            item.url = linkedInShare
        }

    })

    shareObject = shareList

    return shareObject

}


export type ShareListType = {
    key: string
    title: string
    url: string
    icon: ReactNode
}
let shareList = [
    {
        key: 'copy',
        title: 'Copy Link',
        url: `#copy`,
        icon: <FaCopy />
    },
    {
        key: 'email',
        title: 'Email',
        url: `mailto:`,
        icon: <MdMail />
    },
    {
        key: 'whatsapp',
        title: 'Whatsapp',
        url: ``,
        icon: <BsWhatsapp />
    },
    {
        key: 'facebook',
        title: 'Facebook',
        url: ``,
        icon: <BsFacebook />
    },
    {
        key: 'twitter',
        title: 'Twitter',
        url: ``,
        icon: <BsTwitterX />
    },
    {
        key: 'messages',
        title: 'Messages',
        url: ``,
        icon: <FiMessageSquare />
    },
    {
        key: 'telegram',
        title: 'Telegram',
        url: ``,
        icon: <FaTelegram />
    },
    {
        key: 'linkedin',
        title: 'LinkedIn',
        url: ``,
        icon: <FaLinkedin />
    },
]

export const ShareDialogProvider = ({ children }: any) => {
    const [show, setShow] = useState(false)
    const [listing, setListing] = useState<ListingType | null>(null)
    const location = useLocation()
    const [shareData, setShareData] = useState<ShareListType[] | null>(null)
    const [itemCopiedText, setItemCopiedText] = useState('Copy Link')
    const [profileImg, setProfileImg] = useState('')
    const [profileImageData, setProfileImageData] = useState<ProfileImageType | null>(null)





    useEffect(() => {
        if (itemCopiedText === 'Link Copied') {

            setTimeout(() => {
                setItemCopiedText('Copy Link')
            }, 3000)
            //
        }
    }, [itemCopiedText])

    const [social, setSocial] = useState<any | null>(null)

    useEffect(() => {
        const getSocialMedia = async (listing: any) => {
            const socials = []

            const socialMedia = await getSocialMediaByBusinessGuid(listing?.gid)

            socialMedia?.map((media: any, index: number) => {
                const handle = media?.user_description
                const isValidURL = isValidUrl(handle)
                let link = ""

                if (isValidURL) {
                    link = handle
                } else {
                    link = `${media?.base_url}${media?.user_description}`
                }

                socials.push({
                    media: media?.name,
                    icon: getIcon(media),
                    name: media?.name,
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
        if (listing) {
            getSocialMedia(listing)
        }
    }, [listing])

    useEffect(() => {
        if (listing) {
            const sharelinks: ShareListType[] = getEncodedShareLinks(listing, location)
            setShareData(sharelinks)
        }
    }, [listing])

    let vals = {
        setShow,
        setListing,
        setProfileImg,
        setProfileImageData
    }
    return (
        <ShareDialogContext.Provider value={vals}>
            <div>
                {
                    show &&
                    <div className={`fixed top-0 left-0 w-full right-0 bg-black/40 z-[4000] h-full flex place-items-center place-content-center`}
                        onClick={() => setShow(false)}
                    >
                        <CloseButton setShow={setShow} />
                        <div className={`mx-3 w-full`}>
                            <div className={`max-w-[560px] mx-auto w-full bg-white h-fit rounded-[40px] px-[24px] py-16 relative`}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className={`absolute top-8 right-8 text-3xl border-[2px] rounded-xl border-gray-500/20 w-[40px] h-[40px] shadow-sm flex place-items-center place-content-center text-gray-500 cursor-pointer hover:bg-gray-100 hover:border-gray-200/50`}
                                    onClick={() => setShow(false)}
                                >
                                    <CgClose />
                                </div>
                                <div className={`text-3xl`}>
                                    Share this place
                                </div>
                                <div className={` mt-8 flex place-items-center place-content-start gap-3`}>
                                    <div className={`w-[60px] min-w-[60px] h-[60px] relative rounded-lg overflow-hidden`}>
                                        {
                                            profileImageData !== null ?
                                                <img
                                                    src={config?.IMG_BASE_URL + profileImageData?.image_url || `/images/pcho.png`}
                                                    alt=""
                                                    className={`object-cover w-full h-full`}
                                                /> :
                                                <div className={`w-full h-full flex place-items-center place-content-center bg-gray-400 text-gray-100`}>
                                                    <span className={`uppercase text-2xl md:text-2xl`}>

                                                        {getInitials(listing?.title || '')}
                                                    </span>
                                                </div>
                                        }
                                    </div>
                                    <div className={`text-xl `}>
                                        <div className={`h-full text-gray-700 text-[16px] leading-snug`}>
                                            {
                                                listing?.title
                                            }

                                        </div>
                                    </div>
                                </div>

                                <div className={`mt-8 grid grid-cols-2 gap-x-6 gap-y-5`}>
                                    {
                                        shareData?.map((item, i: number) => {
                                            return (
                                                <div key={i}>
                                                    <a target={item?.key === 'copy' ? '_self' : '_blank'} href={item.url}
                                                        onClick={async () => {
                                                            if (item.key === 'copy') {
                                                                copyUrlToClipboard(location)
                                                                setItemCopiedText('Link Copied')


                                                            }
                                                        }}
                                                    >
                                                        <div className={`flex place-items-center gap-3 border px-4 py-4 rounded-xl border-gray-300 hover:bg-gray-50`}>
                                                            <div className={`text-2xl`}>
                                                                {item?.icon}
                                                            </div>
                                                            <div className={`text-[15px] font-normal`}>
                                                                {item?.key === 'copy' ? itemCopiedText : item?.title}
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                                <div className={`mt-6 text-[14px]`}>
                                    <b>Description: </b>{listing?.short_description}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            {children}
        </ShareDialogContext.Provider>
    )
}
export interface CloseButtonProps {
    setShow: (show: boolean) => void
}
export const CloseButton = ({ setShow }: CloseButtonProps) => {
    return (
        <div onClick={() => setShow(false)}>
            <div className={`w-[30px] h-[30px] flex place-items-center place-content-center rounded-full absolute top-2 left-2 bg-white text-[25px] font-bold transition-all ease-in-out duration-700 cursor-pointer hover:bg-white/40`}>
                <BiChevronLeft />
            </div>
        </div>
    )
}
export default ShareDialogContext



import { Link } from '@remix-run/react'
import React, { useEffect, useState } from 'react'
import { BiCopy, BiHeart } from 'react-icons/bi'
import { BsFacebook, BsHeart, BsMailbox, BsTwitterX, BsWhatsapp } from 'react-icons/bs'
import { ShareContextType, useShareDialogContext } from '~/context/ShareDialogContext'
import { ListingType, ProfileImageType } from '~/lib/types'

interface ShareProps {
    shareContext: ShareContextType | null
    listing: ListingType
    profileImg: string
    profileImageData: ProfileImageType | null
}
const Share = ({ shareContext, listing, profileImg, profileImageData }: ShareProps) => {
    const [show, setShow] = useState(false)
    const share = useShareDialogContext()

    const showShareDialog = () => {
        shareContext?.setShow(true)
        shareContext?.setListing(listing)
        shareContext?.setProfileImg(profileImg)
        shareContext?.setProfileImageData(profileImageData)
    }

    return (
        <div>
            <ShareModal showShare={show} />
            <div className={`flex place-items-center gap-1  rounded-full pl-2 pr-4 py-2  underline cursor-pointer bg-[#D2B48C]/40  hover:bg-[#D2B48C]/20`}
                onClick={() => showShareDialog()}
            >
                <BiHeart className={`text-xl`} />
                <span className={`text-lg`}>Share</span>
            </div>
        </div>
    )
}

export default Share

export interface ShareModalProps {
    showShare: boolean
}



export const ShareModal = ({ showShare }: ShareModalProps) => {
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (showShare) {
            setShow(showShare)
        }
    }, [showShare])
    return (
        <div>

        </div>
    )
}

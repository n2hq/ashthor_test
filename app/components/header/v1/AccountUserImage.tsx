import { Link } from '@remix-run/react'
import React, { useEffect, useState } from 'react'
import { BiImage, BiUser } from 'react-icons/bi'
import { IoImage } from 'react-icons/io5'
import { useAuth } from '~/context/AuthContext'
import { config, getUserProfile, getUserProfileImageData } from '~/lib/lib'

const AccountUserImage = ({ userProfileImgData }: any) => {
    const auth = useAuth()
    if (!auth) { return null }
    const { user } = auth
    const [name, setName] = useState('')


    useEffect(() => {
        setName(user?.first_name + ' ' + user?.last_name)

    }, [user])


    return (
        <div className={` relative h-full w-full rounded-full
                    overflow-hidden flex place-content-center place-items-center
                    bg-gray-400 z-0`}>
            {
                userProfileImgData?.image_url ?
                    <img
                        className={`object-cover w-full h-full z-0`}
                        src={
                            config.IMG_BASE_URL + userProfileImgData?.image_url
                        }
                        alt=""
                    /> :
                    <BiUser className={`object-cover w-[70%] h-[70%] z-0`} />
            }

        </div>

    )
}

export default AccountUserImage

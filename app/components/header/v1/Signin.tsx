import React, { useEffect, useState } from 'react'
import { useAuth } from '~/context/AuthContext'
import { getUserProfileImageData } from '~/lib/lib'
import { BiUser } from 'react-icons/bi'
import DropDown from './DropDown'
import { Link } from '@remix-run/react'
import AccountUserImage from './AccountUserImage'

const Signin = () => {
    const [open, setOpen] = useState(false)
    const auth = useAuth()
    const user = auth?.user

    const showMenu = () => setOpen(true)
    const closeMenu = async () => {
        await new Promise((resolve) => setTimeout(resolve, 300));
        setOpen(false)
    }

    const [userProfileImgData, setUserProfileImgData] = useState<any | null>(null)

    useEffect(() => {

        const getUserImageData = async (guid: string) => {
            const userProfile: any = await getUserProfileImageData(guid)
            setUserProfileImgData(userProfile)
            //console.log(userProfile?.image_url)
        }

        if (user?.guid !== null && user?.guid !== undefined) {

            getUserImageData(user?.guid)
        }
    }, [user])


    return (
        <div>
            {
                !user ?
                    <Link to={`/web/signin`}>
                        <button className={`text-lg border rounded-full w-[80px] py-[4px] hover:border border-[#A52A2A] hover:bg-black hover:text-white`}>
                            Sign in
                        </button>
                    </Link> :
                    <button
                        onClick={(e) => showMenu()}
                        onBlur={(e) => closeMenu()}

                        className={`w-[40px] h-[40px] bg-gray-400 hover:bg-gray-300 rounded-full text-white flex place-items-center place-content-center text-[13px] relative cursor-pointer`}>
                        {
                            userProfileImgData !== null ?
                                <AccountUserImage userProfileImgData={userProfileImgData} /> :
                                <BiUser className={`object-cover w-[80%] h-[80%]`} />
                        }
                    </button>
            }

            <DropDown open={open} />
        </div>
    )
}

export default Signin

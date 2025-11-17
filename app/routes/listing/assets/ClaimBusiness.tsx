import { Link } from '@remix-run/react'
import React, { useEffect, useState } from 'react'
import { getUserProfile } from '~/lib/lib'

const ClaimBusiness = ({ listing }: any) => {
    const [ownerRole, setOwnerRole] = useState('user')
    useEffect(() => {
        const getOwnerRole = async (owner: string) => {
            await getUserProfile(owner).then((data) => {
                let user: any = data
                setOwnerRole(user?.role)
                //console.log(user.role)
            })

        }

        if (listing?.owner !== "") {
            getOwnerRole(listing?.owner)
        }

    }, [listing])
    return (
        <>
            {
                ownerRole === "admin" &&
                <div className={` md:mt-0 `}>
                    <div className={`px-3  border  rounded-xl shadow-lg  underline-offset-2  bg-gray-100 mx-[0px] md:mx-[0px] mb-[40px] md:mb-[40px] divide-y-1 divide-gray-600`}>
                        <a href="/web/contact">
                            <div className={`text-[15px] text-center  py-[10px] `}>
                                Is this your business? Claim it for free!
                            </div>
                        </a>

                        <div className={`border-b-[1px] border-gray-50/20`} />

                        <a href="/web/contact">
                            <div className={`text-[12px] text-center underline py-[10px]`}>
                                Request removal.
                            </div>
                        </a>
                    </div>
                </div>
            }
        </>
    )
}

export default ClaimBusiness

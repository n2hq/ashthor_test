import React, { useEffect, useState } from 'react'
import BusinessHeader from '../portfolio/business/assets/BusinessHeader'
import BusinessMenu from '../portfolio/business/assets/BusinessMenu'
import BusinessDrawer from './BusinessDrawer'


const ContentLayout = ({ children, businessGuid, data, businessProfile, title }: any) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div>

            <BusinessDrawer isOpen={isOpen} businessGuid={businessGuid} userGuid={businessProfile?.owner} />

            <div className={`mt-4 bg-white 
                rounded-lg shadow-md pb-8 `}>
                <div className={`font-semibold text-[17px] border-b-[1px] p-3 flex place-content-between place-items-center`}>
                    <div>
                        {title}
                    </div>
                    <div className={`text-[13px] flex place-items-center gap-2`}>
                        {
                            businessProfile?.gid !== undefined && businessProfile?.gid !== "" && businessProfile?.gid !== "" &&
                            <a href={`/web/account/portfolio/${businessGuid}`}
                                className={`border py-[5px] px-[10px] rounded-full bg-blue-50`}
                            >
                                Back
                            </a>
                        }

                        <a href={`/web/account/portfolio`}
                            className={`border py-[5px] px-[10px] rounded-full bg-blue-50`}
                        >
                            Portfolio
                        </a>
                        <a href={`/${businessGuid}`}
                            className={`border py-[5px] px-[10px] rounded-full bg-blue-50`}
                        >
                            Preview
                        </a>
                    </div>
                </div>
                <div className={`px-[15px]  pt-4 `}>
                    <div className={`w-full flex place-content-between place-items-center`}>
                        <div className={`text-lg font-[600] leading-[1.4em]`}>
                            {businessProfile && businessProfile.title}
                        </div>
                        <div>
                            {
                                businessGuid && data?.userGuid &&
                                <BusinessMenu setIsOpen={setIsOpen} guid={businessGuid} userGuid={data.userGuid} />
                            }
                        </div>
                    </div>
                    <div className={`h-[12px]`}></div>
                    {children}
                    <div className={`h-[40px]`}></div>
                </div>
            </div>
        </div>
    )
}

export default ContentLayout

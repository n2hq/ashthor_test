import React from 'react'
import FooterAlt from '~/components/footer/FooterAlt'

import Navbar from '~/components/header/new/Navbar'
import SearchNavbar from '~/components/header/new/SearchNavbar'
import SrchNavbar from '~/components/header/new/SrchNavbar'
import MainNav from '~/components/header/v1/MainNav'
import { appConfig } from '~/lib/lib'
import HomeNav from '~/routes/assets/header/HomeNav'

const SearchLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={`h-full w-full`}>
            <MainNav />

            {/*  <div className={`md:hidden mt-[${appConfig.NAVBAR_HEIGHT}px] fixed w-full
            bg-white z-[3000]`}>
                <HomeNav />
            </div>
            */}

            <main className={`h-full flex w-full flex-col `}>

                {children}
            </main>

            <FooterAlt />
        </div>
    )
}

export default SearchLayout

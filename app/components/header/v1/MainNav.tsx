import React from 'react'

import HeaderLogo from './HeaderLogo'
import Hamburger from './Hamburger'
import Signin from './Signin'
import ShortMenu from './ShortMenu'
import MainSearch from './MainSearch'
import { MainNavProvider } from '~/context/MainNavContext'
import { AuthProvider } from '~/context/AuthContext'

const MainNav = () => {
    return (
        <MainNavProvider>
            <AuthProvider>
                <div>
                    <div className={`h-[60px] fixed z-10 w-full left-0 top-0 right-0 shadow-lg shadow-black/5 bg-white`}>
                        <div className={`flex place-content-between place-items-center h-full max-w-[96%] mx-auto w-full gap-6`}>
                            <div className={`flex place-items-center place-content-start gap-4  grow h-full`}>
                                <Hamburger />
                                <HeaderLogo />
                                <MainSearch />
                            </div>
                            <div className={`flex place-items-center gap-6`}>
                                <ShortMenu />
                                <Signin />
                            </div>
                        </div>
                    </div>
                    <div className={`h-[60px] z-0`}>

                    </div>
                </div>
            </AuthProvider>
        </MainNavProvider>

    )
}

export default MainNav

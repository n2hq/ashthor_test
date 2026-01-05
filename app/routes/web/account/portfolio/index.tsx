import React, { useEffect, useState } from 'react'
import AccountLayout from '../assets/AccountLayout'
import ContentLayout from '../assets/ContentLayout'
import { useAuth } from '~/context/AuthContext'
import { formatNumber, getPortfolio, getUserProfile, IsAuthenticated } from '~/lib/lib'
import Portfolio from './assets/Portfolio'
import CardTitle from '../assets/CardTitle'
import BusinessHeader from './business/assets/BusinessHeader'
import CardHeader from '../assets/CardHeader'
import { useLocation } from '@remix-run/react'
import { PortfolioSearchBox } from './business/assets/PortfolioSearchBox'
import CardHeaderWithSearch from './business/assets/CardHeaderWithSearch'
import PortfolioLayout from '../assets/PortfolioLayout'
import LoadingMessage from '~/components/content/LoadingMessage'



const Index = () => {
    useEffect(() => {

        if (localStorage) {
            IsAuthenticated(localStorage)
        }
    }, [localStorage])

    const auth = useAuth()
    if (!auth) { return null }


    const { user } = auth
    const [userProfile, setUserProfile] = useState<any | null>(null)
    const [portfolio, setPortfolio] = useState<any | null>(null)
    const [data, setData] = useState<any | null>(null)
    const [loading, setLoading] = useState(true)

    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const q = params?.get("q") || ""

    useEffect(() => {
        async function getAllData(guid: string, q: string) {
            //console.log(guid)
            const userProfile: any = await getUserProfile(guid || "")
            const portfolio: any = await getPortfolio(guid || "", q || "")
            //console.log(portfolio)
            setUserProfile(userProfile)
            setPortfolio(portfolio)
        }

        try {
            if (user?.guid) {
                getAllData(user?.guid, q)
            }
        } catch (e: any) {
            console.log(e.message)
        }
    }, [user?.guid, q])

    useEffect(() => {
        if (userProfile && portfolio) {
            const data = {
                userProfile: userProfile,
                portfolio: portfolio
            }
            setData(data)
            //alert(JSON.stringify(data.portfolio.data))
        }
    }, [
        userProfile,
        portfolio
    ])

    useEffect(() => {
        if (data !== null) {
            setLoading(false)

        }
    }, [data])



    if (loading) {
        return <LoadingMessage loading={loading} />
    }

    return (
        <AccountLayout>
            <PortfolioLayout title={'My Portfolio'}>

                {userProfile === null ? 'Loading...' : ''}

                <CardHeaderWithSearch
                    base_url={'/web/account/portfolio'}
                    title={`${formatNumber(data.portfolio.length)} Pages`}
                    q={q}

                />

                <div className={`flex place-items-center place-content-center mt-3`}>

                </div>


                <div className={`mt-[20px]`}></div>
                {
                    data !== null &&
                    <Portfolio user={data.userProfile} portfolio={data.portfolio} />
                }
                {/*  {
                    data && <EmailForm loaderData={data} user={user} />
                } */}
            </PortfolioLayout>
        </AccountLayout>
    )
}

export default Index

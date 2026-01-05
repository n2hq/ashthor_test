import React, { useEffect, useState } from 'react'
import ContentLayout from '../assets/ContentLayout'
import AccountLayout from '../assets/AccountLayout'
import { useAuth } from '~/context/AuthContext'
import CreatePageForm from './assets/CreatePageForm'
import { getCategories, getCities, getCountries, getCurrencies, getStates, getUserProfile, IsAuthenticated } from '~/lib/lib'
import CardTitle from '../assets/CardTitle'
import CardHeader from '../assets/CardHeader'
import ProfileContentLayout from '../assets/ProfileContentLayout'
import { OperationProvider } from '~/context/OperationContext'
import LoadingMessage from '~/components/content/LoadingMessage'
import { Currency } from '~/lib/types'

const index = () => {
    const tokens = localStorage?.getItem("authTokens")
    IsAuthenticated(tokens)

    const auth = useAuth()
    if (!auth) { return null }
    const [user, setUser] = useState<any | null>(null)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any | null>(null)
    const [countries, setCountries] = useState<any | null>(null)
    const [states, setStates] = useState<any | null>(null)
    const [cities, setCities] = useState<any | null>(null)
    const [categories, setCategories] = useState<any | null>(null)
    const [userProfile, setUserProfile] = useState<any | null>(null)
    const [currencies, setCurrencies] = useState<Currency[] | undefined>(undefined)
    useEffect(() => {
        const getAllData = async (user: any) => {
            const countries = await getCountries()
            const states = await getStates("")
            const cities = await getCities("", "")
            const categories = await getCategories()
            const currencies: Currency[] | undefined = await getCurrencies()

            const userProfileData = await getUserProfile(user?.guid || "")
            setUserProfile(userProfileData)

            setCountries(countries)
            setStates(states)
            setCities(cities)
            setCategories(categories)
            setUser(user)
            setCurrencies(currencies)
        }

        try {
            if (auth?.user) {
                getAllData(auth?.user)
            }
        } catch (e: any) {
            console.log(e.message)
        }
    }, [auth])

    useEffect(() => {
        if (user && countries && categories) {

            const data = {
                user,
                countries,
                states,
                cities,
                categories,
                currencies
            }
            setData(data)
            setLoading(false)
        }
    }, [countries, user])



    if (loading) {
        return <LoadingMessage loading={loading} />
    }


    return (
        <AccountLayout>
            <ProfileContentLayout title={'Create Page'}>
                <OperationProvider>
                    {
                        data && <div>

                            <CreatePageForm data={data} user={user} />
                        </div>
                    }
                </OperationProvider>
            </ProfileContentLayout>
        </AccountLayout>
    )
}

export default index

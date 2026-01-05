import React, { useEffect, useRef, useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { filterCountry, getCountries, getCountriesCurrencies } from '~/lib/lib'
import { CountryType } from '~/lib/types'

interface CCIProps {
    countryCurrency: string
    setCountryCurrency: (currency: string) => void
    setSelectedCountry: (country: CountryType) => void
    selectedCountry: CountryType | undefined
}
const CountryCurrencyInput = ({
    countryCurrency,
    setCountryCurrency,
    setSelectedCountry,
    selectedCountry
}: CCIProps) => {
    const [countries, setCountries] = useState<CountryType[] | undefined>(undefined)
    const [filteredCountries, setFilteredCountries] = useState<CountryType[] | undefined>(undefined)

    const [ctry, setCtry] = useState('')
    const currencySearchRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (selectedCountry) {
            setCtry(selectedCountry.country_name)
        }
    }, [selectedCountry])

    const [loading, setLoading] = useState(true)
    const [showCurrencies, setShowCurrencies] = useState(false)
    const [sigma, setSigma] = useState<CountryType | null>(null)

    useEffect(() => {
        if (showCurrencies && currencySearchRef.current) {
            setTimeout(() => {
                currencySearchRef.current?.focus();
            }, 100); // Small delay for animation
        }
    }, [showCurrencies]);

    useEffect(() => {
        setFilteredCountries(countries)
    }, [countries])

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                setLoading(true)
                const countriesData = await getCountriesCurrencies()
                setCountries(countriesData)

            } catch (error) {
                console.error("Failed to fetch countries:", error)
                setCountries(undefined)
            } finally {
                setLoading(false)
            }
        }

        fetchCountries()
    }, [])

    const cocu = document.getElementById('country_currency')

    const countryCurrencyRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (selectedCountry && countryCurrencyRef.current) {
            let val = selectedCountry.country_name + ' - '
            val += selectedCountry.name + ' '
            val += selectedCountry.currency_symbol
            val += ' '
            val += selectedCountry.emoji
            countryCurrencyRef.current.value = val
        }
    }, [selectedCountry])

    const handleSelectedCountry = (selectedCountry: CountryType) => {
        if (countryCurrencyRef.current) {
            let val = selectedCountry.country_name + ' - '
            val += selectedCountry.name + ' '
            val += selectedCountry.currency_symbol
            val += ' '
            val += selectedCountry.emoji
            countryCurrencyRef.current.value = val
            setShowCurrencies(false)

            setSelectedCountry(selectedCountry)
        }

    }

    const [currencyData, setCurrencyData] = useState('')

    return (
        <div className={`relative`}>
            <input
                id='country_currency'
                ref={countryCurrencyRef}
                onClick={() => setShowCurrencies(true)}
                /* onBlur={async (e) => {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    setShowCurrencies(false)

                }} */


                onChange={(e) => {
                    const inputString = e.target.value
                    const filteredCountries = filterCountry(countries, inputString)

                    setFilteredCountries(filteredCountries)
                    setCountryCurrency(e.target.value)


                }}

                placeholder={`Select Currency`}
                className={`w-full bg-gray-100 px-3  py-3 mb-1 rounded-lg border-[1px] border-gray-300`}
            />
            <div className={`fixed w-full top-0 left-0 h-full bg-black/25 z-3000 ${showCurrencies ? 'block' : 'hidden'} flex place-items-center place-content-center px-2`}
                onClick={() => setShowCurrencies(false)}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={`px-2 max-w-[600px] mx-auto w-full`}>
                    <div className={`overflow-hidden bg-white rounded-3xl relative`}>
                        <div className={`text-2xl pt-8 pb-8 px-4 border-b`}>
                            Select Currency
                        </div>
                        <div className={`text-3xl absolute top-7 right-4 w-fit h-fit p-2 rounded-xl bg-gray-100 cursor-pointer`}
                            onClick={() => setShowCurrencies(false)}
                        >
                            <CgClose />
                        </div>
                        <input
                            ref={currencySearchRef}
                            type="text"
                            className={` w-full bg-gray-100 p-4 text-lg outline-none`}
                            placeholder={`Type here...`}
                            onChange={(e) => {
                                const inputString = e.target.value
                                const filteredCountries = filterCountry(countries, inputString)

                                setFilteredCountries(filteredCountries)
                                setCountryCurrency(e.target.value)


                            }}
                        />
                        <div className={`max-h-[300px] overflow-y-auto`}>
                            {
                                filteredCountries?.map((country: CountryType, index: number) => {
                                    return (
                                        <div key={index}
                                            className={`cursor-pointer`}
                                            onClick={() => {
                                                //setSigma(country)
                                                handleSelectedCountry(country)
                                            }}
                                        >
                                            <div className={`text-lg p-2 border gap-1 first:border-t-0`}>
                                                {country.country_name} - {country.name} {country.emoji}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className={`h-[30px]`} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CountryCurrencyInput

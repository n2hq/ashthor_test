import { useLoaderData, useNavigation, useSearchParams } from '@remix-run/react'
import React, { useEffect, useRef, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { LoaderFunction, useLocation, useNavigate } from 'react-router'
import { getCountries, getSearch, logError } from '~/lib/lib'
import QueryBuilder from './QueryBuilder'

export const loader: LoaderFunction = async ({ request, params }) => {
    const url = new URL(request.url);
    const query = url?.searchParams.get("q") || "";
    const state = url?.searchParams.get("state") || "";
    const city = url?.searchParams.get("city") || "";
    const country = url?.searchParams.get("country") || "";
    const category = url?.searchParams.get("category") || "";

    let page: number = 1
    let data: any = ""
    let countries = null

    try {
        page = parseInt(url?.searchParams.get("page") || "1")
        data = await getSearch(query, city, state, country, category, page)
        countries = await getCountries()
    } catch (error: any) {
        logError(error)
    }

    let res = {
        data: data,
        query: query,
        countries: countries
    }
    return res;
}

const MainSearch = () => {
    const navigate = useNavigate()
    const res: any = useLoaderData()
    const [searchParams, setSearchParams] = useSearchParams();
    const [frmVals, setFrmVals] = useState([])

    const [formData, setFormData] = useState({ 'q': '' })

    const navigation = useNavigation()
    const isLoading = navigation.state === 'loading'

    const data = res?.data?.items || []
    const pagination = res?.data?.pagination
    const query = res?.query
    const countries = res?.countries

    const [showQueryBuilder, setShowQueryBuilder] = useState(false)
    const [queryInput, setQueryInput] = useState('')

    // Extract initial filters from URL
    const initialFilters = {
        q: searchParams.get('q') || '',
        category: searchParams.get('category') || '',
        country: searchParams.get('country') || '',
        state: searchParams.get('state') || '',
        city: searchParams.get('city') || ''
    }
    const [qryi, setQryi] = useState('')



    const handleQueryBuilderChange = (value: string) => {


        setQueryInput(value)
        setQname(value)

    }

    const handleUserInput = (inpt: string) => {
        setQueryInput(inpt)
    }


    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const qry = params.get("q") || ""

    const [qname, setQname] = useState('')
    const handleQChange = (e: any) => {
        const val = e.target.value
        setQueryInput(val)
        setQname(val)
    }

    useEffect(() => {
        if (qry !== "") {
            setQueryInput(qry)
            setQname(qry)
        }
    }, [qry])




    return (
        <div className={`w-full flex flex-col group z-10`}>
            <div className={`bg-blue-50 w-full h-[34px] rounded-full flex place-items-center pl-4  group-hover:bg-white hover:shadow-lg z-0`}
                onClick={() => setShowQueryBuilder(true)}
            >
                <input
                    type="text"
                    name='q'
                    value={qname}

                    placeholder='Search directory...'
                    className={`bg-transparent w-full outline-none text-lg`}

                    onChange={handleQChange}
                    onKeyUp={(e: any) => {
                        if (e.key === 'Enter') {
                            // Submit form or navigate directly
                            const params = new URLSearchParams(location.search)
                            params.set('q', queryInput)
                            params.set('page', '1')
                            navigate(`/web/search?${params.toString()}`)
                        }
                    }}
                />
                <button className={`bg-[#A52A2A] h-full w-[60px] rounded-full flex place-items-center place-content-center text-white`}>
                    <FaSearch />
                </button>
            </div>
            <div className={`w-full h-auto absolute z-30 top-[60px] left-0 bg-white shadow-lg shadow-black/20  ${showQueryBuilder ? 'block' : 'hidden'}`}
                onMouseLeave={() => setShowQueryBuilder(false)}
            >
                <div className={`md:w-[85%] mx-auto w-full pb-5`}>
                    <QueryBuilder
                        queryInput={queryInput}
                        onQueryChange={handleQueryBuilderChange}
                        loading={isLoading}
                        initialFilters={initialFilters}
                    />
                </div>

            </div>
        </div>

    )
}

export default MainSearch

import { FaFacebookSquare, FaLinkedinIn, FaPinterestSquare, FaTiktok, FaVimeoSquare, FaYoutubeSquare } from "react-icons/fa"
import { AddVideoType, Category, City, ContactType, Country, CountryType, Currency, FacilityType, ProductType, Rating, ServiceType, SocialMediaType, State, StateAlt, UserProfile } from "./types"
import CryptoJS from 'crypto-js'
import { BsInstagram, BsLinkedin, BsPinterest, BsTwitterX, BsVimeo } from "react-icons/bs"
import { CgFacebook } from "react-icons/cg"
import { GrYoutube } from "react-icons/gr"
import { categories } from "./json/categories"
import { facilityFeatures } from "./json/facility_features"
import { json } from "@remix-run/react"

export const config = {
    BASE_URL: import.meta.env.VITE_SITE_BASE_URL,
    IMG_BASE_URL: import.meta.env.VITE_IMG_BASE_URL,
    MAIL_SERVICE: import.meta.env.VITE_MAIL_SERVICE,
    SITENAME: import.meta.env.VITE_SITENAME,
    FORMATTED_SITENAME: import.meta.env.VITE_SITENAME,
    SESSION_SECRET: import.meta.env.VITE_SESSION_SECRET,
    ENV: import.meta.env.VITE_ENV,
    SITEMAIL: import.meta.env.VITE_SITEMAIL
}



export const appConfig = {
    NAVBAR_HEIGHT: 0,
    searchBaseUrl: '/web/search',
    fallbackImg: `https://cdn.corporatefinanceinstitute.com/assets/types-of-organizations1.jpeg`,
    placeholder: `/images/bycetplaceholder.png`
}

export const getSiteLogo = () => {
    return (
        <span className={` 
         `}>
            Bycet
        </span>
    )
}



export const headers = {
    "Access-Control-Allow-Origin": "*",  // Allow all origins
    "Access-Control-Allow-Methods": "*",  // Allow specific methods
    "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allow specific headers
    "Access-Control-Allow-Credentials": "true", // Optional: if using cookies/auth
    "Content-Type": "application/json",
    "Cache-Control": "no-store" // Note: "cache" isn't valid; use "Cache-Control"
};

export function DoResponse(json: any, code: number = 500) {
    return new Response(
        JSON.stringify(json),
        {
            status: code,
            headers: headers
        }
    )
}

export function GetResponse(data: any, success: boolean = false, code: number = 200) {

    const response = {
        success: success,
        rspcode: code,
        data: data
    }

    return new Response(
        JSON.stringify(response),
        {
            status: code,
            headers: headers
        }
    )
}

export const HashPwd = (input: string): any => {
    return CryptoJS.SHA256(input).toString();
}

export const GenerateRandomHash = () => {
    const randomBytes = CryptoJS.lib.WordArray.random(16);
    const hash = CryptoJS.SHA256(randomBytes).toString();
    return hash
};


export const getBusinessProfile = async (criteria: string | null): Promise<ContactType[] | null> => {

    const endpoint = "/api/listing/" + criteria
    const url = config.BASE_URL + endpoint

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            },
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: ContactType[] = await response.json();
        return new Promise((resolve) => setTimeout(() => {
            resolve(data)
        }, 10))
    } catch (error: any) {
        console.log(error.message)
        return null
    }
}

export const getSearch: any = async (criteria: string, city: string, state: string, country: string, category: string, page: string) => {

    let endpoint = "/api/listing/searchlisting?q=" + criteria
    endpoint += "&city=" + city
    endpoint += "&state=" + state
    endpoint += "&country=" + country
    endpoint += "&category=" + category
    endpoint += '&page=' + page

    //console.log(criteria)
    const url = config.BASE_URL + endpoint
    //console.log(url)


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();
        return data
    } catch (error: any) {
        return ({ "message": error.message })
    }
}

export const getFeaturedListing: any = async () => {

    const endpoint = `/api/listing/featured_listing`
    const url = config.BASE_URL + endpoint




    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();
        return data
    } catch (error: any) {
        return ({ "message": error.message })
    }
}

export const getListingByCategory = async (category: string, limit: number) => {

    const endpoint = `/api/listing/listing_by_category/${category}/${limit}`
    const url = config.BASE_URL + endpoint

    //console.log(url)

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();
        return data
    } catch (error: any) {
        return ({ "message": error.message })
    }
}


export const getHomeListingByCategory = async (category: string, limit: number) => {

    const endpoint = `/api/listing/home_listing_by_category/${category}/${limit}`
    const url = config.BASE_URL + endpoint

    //console.log(url)

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();
        return data
    } catch (error: any) {
        return ({ "message": error.message })
    }
}


export const getLatestBusinesses = async (limit: number) => {

    const endpoint = `/api/listing/home_latest_businesses/${limit}`
    const url = config.BASE_URL + endpoint

    //console.log(url)

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();
        return data
    } catch (error: any) {
        return ({ "message": error.message })
    }
}

export const getRating = async (userGuid: string | null, businessGuid: string | null) => {

    const endpoint = `/api/rating/${userGuid}/${businessGuid}`
    const url = config.BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();
        return data

    } catch (error: any) {
        return ({ "message": error.message })
    }
}

export const getBusinessProfileImageData = async (guid: string | null): Promise<any | undefined> => {

    const endpoint = "/api/listing/business_profile_image/" + guid
    const url = config.BASE_URL + endpoint

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {
            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const getBusinessProfileBgData = async (guid: string | null): Promise<any | undefined> => {

    const endpoint = "/api/listing/business_profile_bg/" + guid
    const url = config.BASE_URL + endpoint

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {
            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const getBusinessGallery = async (businessGuid: string | null) => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = `/api/listing/business_gallery/${businessGuid}`
    const url = BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();
        return data

    } catch (error: any) {
        return ({ "message": error.message })
    }
}

export const getRatingsReviews = async (businessGuid: string | null) => {
    const endpoint = `/api/rating/ratings_reviews/${businessGuid}`
    const url = config.BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();
        return data

    } catch (error: any) {
        return ({ "message": error.message })
    }
}

export const getPage: any = async (criteria: string) => {

    const endpoint = "/api/listing/" + criteria
    const url = config.BASE_URL + endpoint

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return data
    } catch (error: any) {
        return Response.json({ error: true, data: [] }, { status: 200 });
    }
}

export const getBusinessRatings = async (businessGuid: string | null): Promise<any | undefined> => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = `/api/rating/business_ratings/${businessGuid}`
    const url = BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const getLocalDate = (date: string) => {
    const localDate = new Date(date)
    const formatted = localDate.toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    })
    return formatted
}

export const getBusinessFeatures = async (businessGuid: string | null): Promise<any | undefined> => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = `/api/listing/business_facility_features/${businessGuid}`
    const url = BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const getSocialMediaByBusinessGuid = async (businessGuid: string | null): Promise<any | undefined> => {

    const endpoint = `/api/listing/business_social_media/${businessGuid}`
    const url = config.BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const generate7DigitNumber = (): number => {
    return Math.floor(1000000 + Math.random() * 9000000); // Range: 1000000 - 9999999
};

export const getCountries = async (): Promise<Country[] | undefined> => {

    const endpoint = "/api/util/country"
    const url = config.BASE_URL + endpoint

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Country[] = await response.json();
        const finaldata: any = data.map((country) => {
            return {
                name: country.name,
                id: country.id
            }
        })


        return data
    } catch (error: any) {
        return undefined
    }
}

export const getCountriesCurrencies = async (): Promise<CountryType[] | undefined> => {

    const endpoint = "/api/util/country_currencies"
    const url = config.BASE_URL + endpoint

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: CountryType[] = await response.json();



        return data
    } catch (error: any) {
        return undefined
    }
}

export const getStates = async (countryCode: string | null): Promise<State[] | undefined> => {

    const endpoint = "/api/util/state?country_code=" + countryCode
    const url = config.BASE_URL + endpoint

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: State[] = await response.json();

        return new Promise((resolve) => setTimeout(() => {
            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const getStatesAlt = async (countryCode: string | null): Promise<StateAlt[] | undefined> => {

    const endpoint = "/api/util/state?country_code=" + countryCode
    const url = config.BASE_URL + endpoint

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: StateAlt[] = await response.json();

        return new Promise((resolve) => setTimeout(() => {
            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const getCities = async (countryCode: string | null, stateCode: string | null): Promise<City[] | undefined> => {

    const endpoint = "/api/util/city?country_code=" + countryCode + "&state_code=" + stateCode
    const url = config.BASE_URL + endpoint

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: City[] = await response.json();

        return new Promise((resolve) => setTimeout(() => {
            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const getCategories = async (): Promise<Category[] | undefined> => {

    const endpoint = "/api/util/category"
    const url = config.BASE_URL + endpoint
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Category[] = await response.json();

        return new Promise((resolve) => setTimeout(() => {
            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}


export const getCurrencies = async (): Promise<Currency[] | undefined> => {

    const endpoint = "/api/util/currencies"
    const url = config.BASE_URL + endpoint

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Currency[] = await response.json();
        const finaldata: any = data.map((currency) => {
            return {
                id: currency.id,
                country: currency.country,
                currency: currency.currency,
                currency_name: currency.currency_name,
                currency_symbol: currency.currency_symbol,
                currency_code: currency.currency_code,
                emoji: currency.emoji
            }
        })


        return finaldata
    } catch (error: any) {
        return undefined
    }
}

export const getUserProfile = async (guid: string | null): Promise<UserProfile[] | undefined> => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = "/api/user/" + guid
    const url = BASE_URL + endpoint

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: UserProfile[] = await response.json();

        return new Promise((resolve) => setTimeout(() => {
            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const getUserProfileImageData = async (guid: string | null): Promise<UserProfile[] | undefined> => {

    const endpoint = "/api/user/user_profile_image/" + guid
    const url = config.BASE_URL + endpoint

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {
            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const getUserProfileBgData = async (guid: string | null): Promise<any | undefined> => {

    const endpoint = "/api/user/user_profile_bg/" + guid
    const url = config.BASE_URL + endpoint

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {
            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const getPortfolio = async (guid: string, q?: string): Promise<any | null> => {
    let businessesEndpoint = `/api/listing/owner?guid=${guid}&q=${q}`

    if (q && q.trim() !== "") {
        businessesEndpoint += `&q=${encodeURIComponent(q)}`
    }

    let url = config.BASE_URL + businessesEndpoint

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {
            resolve(data)
        }, 10))
    } catch (error: any) {
        return null
    }
}

export const getOperatingHours = async (businessGuid: string | null, userGuid: string | null): Promise<UserProfile[] | undefined> => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = `/api/listing/operating_hours?business_guid=${businessGuid}&user_guid=${userGuid}`
    const url = BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        console.log(error.message)
        return undefined
    }
}

export const saveOperatingHours = async (openStatus: any, workingHours: any, businessGuid: any, userGuid: any) => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = `/api/listing/operating_hours?business_guid=${businessGuid}&user_guid=${userGuid}`
    const url = BASE_URL + endpoint

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify({ openStatus, workingHours })
        })

        if (!response.ok) {
            await response.json().then((data) => {
                console.log(data)
                throw new Error(`HTTP error! Status: ${response.status}, ${data.message}`);
            })

        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        console.log(error.message)
        return new Promise((resolve) => setTimeout(() => {

            resolve({ message: error.message })
        }, 10))

    }
}

export const getGallery = async (businessGuid: string | null, userGuid: string | null): Promise<UserProfile[] | undefined> => {

    const endpoint = `/api/listing/gallery/${businessGuid}/${userGuid}`
    const url = config.BASE_URL + endpoint
    //console.log(url)
    //console.log("|||")

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();


        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const deleteGalleryImage = async (guid: string | null, bid: string | null, image_guid: string | null): Promise<any | undefined> => {
    const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL
    const endpoint = `/delete_business_gallery_pic`
    const url = IMG_BASE_URL + endpoint

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = {
            status: true
        }

        return new Promise((resolve) => setTimeout(() => {
            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const getSysFacilityFeatures = async (): Promise<any | undefined> => {

    const endpoint = `/api/listing/sys_facility_features`
    const url = config.BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const getSelectedFacilityFeatures = async (userGuid: string | null, businessGuid: string | null): Promise<any | undefined> => {
    const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
    const endpoint = `/api/listing/selected_facility_features/${userGuid}/${businessGuid}`
    const url = BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const getSysSocialMedia = async (): Promise<any | undefined> => {

    const endpoint = `/api/listing/sys_social_media`
    const url = config.BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}


export const getSysFacilities = async (): Promise<any | undefined> => {

    const endpoint = `/api/listing/sys_facilities`
    const url = config.BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const getSelectedSocialMedia = async (userGuid: string | null, businessGuid: string | null): Promise<any | undefined> => {

    const endpoint = `/api/listing/selected_social_media/${userGuid}/${businessGuid}`
    const url = config.BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const getBusiness = async (userGuid: string | null, businessGuid: string | null): Promise<any | undefined> => {

    const endpoint = `/api/listing/activate/${userGuid}/${businessGuid}`
    const url = config.BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const getRecents = async (): Promise<any | undefined> => {

    const endpoint = `/api/listing/recents`
    const url = config.BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const formatNumber = (num: number): string => {
    // Handle 0 specifically
    if (num === 0) {
        return '0.00';
    }

    if (num >= 1_000_000_000) {
        return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'b';
    }
    if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'm';
    }
    if (num >= 1_000) {
        return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
    }

    // For numbers between 0 and 1, show with 2 decimal places
    if (num > 0 && num < 1) {
        return num.toFixed(2);
    }

    // For numbers between 1 and 1000, show with 2 decimal places if needed
    if (num < 1000) {
        return num % 1 === 0 ? num.toString() : num.toFixed(2);
    }

    return num.toString();
};

export function removeCommas(numberString: string) {
    // Removes all commas from the string
    return numberString.replace(/,/g, '');
}


export function getFirstChar(word: string): string {
    if (!word || typeof word !== "string") return "";
    return word.trim().charAt(0);
}

export function toSentenceCase(text: string): string {
    return text
        .toLowerCase()
        .replace(/([^.!?]*[.!?])(\s+|$)/g, (match) =>
            match.charAt(0).toUpperCase() + match.slice(1)
        );
}

export const changeEmail = async (guid: string, email: string): Promise<any> => {

    const endpoint = `/api/user/change_email?guid=${guid}&email=${email}`
    const url = config.BASE_URL + endpoint

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: headers,
        }
        )
        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const sendEmail = async (data: any) => {
    const endpoint = config.MAIL_SERVICE

    const qs = new URLSearchParams(data).toString();
    const url = endpoint + "?" + qs

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const rsp: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {
            console.log(rsp)
            resolve(rsp)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}


export function escapeRegex(str: string): string {
    // Escape characters with special meaning in regex
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export const IsAuthenticated = (localStorage: any) => {

    if (localStorage["authTokens"] === null || localStorage["authTokens"] === undefined) {
        window.location.href = "/web/signin"
        return true;
    }
}


export function getDateInTimeZone(timeZone: any) {
    //const now = new Date();
    const adjustment = 0;
    const timeObject = new Date(Date.now() - adjustment);

    // Format to parts in target timezone
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    }).formatToParts(timeObject);

    // Extract parts
    const dateParts: any = {};
    for (const { type, value } of parts) {
        if (type !== "literal") dateParts[type] = value;
    }

    // Construct a Date from the parts (in local machine time)
    return new Date(
        `${dateParts.year}-${dateParts.month}-${dateParts.day}T${dateParts.hour}:${dateParts.minute}:${dateParts.second}`
    );
}


export function getDateInTimeZoneX(timeZone: any) {
    //const now = new Date();
    const adjustment = 0;
    const timeObject = new Date(Date.now() - adjustment);

    // Format to International
    const formattedTimeIntl = new Intl.DateTimeFormat("en-US", {
        timeZone,
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "long"
    }).format(timeObject);

    // Format to parts in target timezone
    const formattedTime = new Intl.DateTimeFormat("en-US", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "long"
    }).format(timeObject);

    const displayFormattedTime = <span className={`space-x-1 tracking-tight`}>
        <span key={'a1'} className={`font-bold uppercase text-[13px]`}></span>
        <span key={'a2'}>{formattedTimeIntl}</span>
    </span>

    // Construct a Date from the parts (in local machine time)
    return displayFormattedTime
}


export function getCardIcon(media: any) {
    let icon = null

    switch (media) {
        case "facebook":
            icon = <CgFacebook className={`text-blue-700`} size={20} />
            break;
        case "twitterx":
            icon = <BsTwitterX className={`text-blue-600`} size={16} />
            break;
        case "linkedin":
            icon = <FaLinkedinIn className={`text-blue-500`} size={17} />
            break;
        case "instagram":
            icon = <BsInstagram className={`text-red-800`} size={15} />
            break;
        case "pinterest":
            icon = <BsPinterest className={`text-red-500`} size={17} />
            break;
        case "youtube":
            icon = <GrYoutube className={`text-red-500`} size={20} />
            break;
        case "vimeo":
            icon = <FaVimeoSquare size={18} />
            break;
        case "tiktok":
            icon = <FaTiktok size={17} />
            break;


    }
    return icon
}

export function getFormattedDateTime(dateString: string) {

    const date = new Date(dateString);

    const formattedTimeIntl = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "long"
    }).format(date);


    return formattedTimeIntl
}

export function strToList(str: string, separator: string) {
    const list = str.split(separator)
        .map(item => item.trim())
        .filter(item => item.length > 0);
    return list
}


export const saveVideo = async (video: AddVideoType): Promise<any> => {

    const endpoint = `/api/listing/save_video_link`

    const url = config.BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(video)
        })

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}


export const getVideoGallery = async (businessGuid: string | null, userGuid: string | null): Promise<AddVideoType[] | null> => {

    let endpoint: string = ""

    if (businessGuid !== "" && userGuid !== "") {
        endpoint = `/api/listing/video_links/${businessGuid}/${userGuid}`
    } else {
        alert('Contact admin.')
    }




    const url = config.BASE_URL + endpoint
    //console.log(url)
    //console.log("|||")

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {

            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();


        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        return null
    }
}


export const getYoutubeId = (videoUrl: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = videoUrl?.match(regex);
    let videoId = match ? match[1] : null;
    return videoId
}


export const updateVideo = async (video: AddVideoType): Promise<any> => {

    const endpoint = `/api/listing/save_video_link`

    const url = config.BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(video)
        })

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}


export const getBusinessVideoGallery = async (businessGuid: string | null): Promise<AddVideoType[] | null> => {

    let endpoint: string = ""

    if (businessGuid !== "") {
        endpoint = `/api/listing/video_links/${businessGuid}`
    } else {

        throw new Error(`Error: Contact Admin`);

    }




    const url = config.BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {

            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();


        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        return null
    }
}


export const searchCategories = (searchTerm: string) => {
    const foundCategory = categories.find(
        (cat: Category) => cat.id.toLowerCase() === searchTerm.toLowerCase()
    );
    return foundCategory
}


export const getProductGallery = async (businessGuid: string | null, userGuid: string | null): Promise<ProductType[] | null> => {

    let endpoint: string = ""

    if (businessGuid !== "" && userGuid !== "") {
        endpoint = `/api/listing/products/${businessGuid}/${userGuid}`
    } else {
        alert('Contact admin.')
    }




    const url = config.BASE_URL + endpoint
    //console.log(url)
    //console.log("|||")

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {

            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();


        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        return null
    }
}

export const getServiceList = async (businessGuid: string | null, userGuid: string | null, page: number): Promise<any | null> => {

    let endpoint: string = ""

    if (businessGuid !== "" && userGuid !== "") {
        endpoint = `/api/listing/services/${businessGuid}/${userGuid}?page=${page}`
    } else {
        console.log('Contact admin.')
    }




    const url = config.BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {

            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        if (data.length <= 0) {
            return null
        }
        return data

    } catch (error: any) {
        console.log(error.message)
        return null
    }
}


export const getServicesByBusinessGuid = async (businessGuid: string | null): Promise<any | null> => {

    let endpoint: string = ""

    if (businessGuid !== "") {
        endpoint = `/api/listing/business/services/${businessGuid}`
    } else {
        console.log('Contact admin.')
    }




    const url = config.BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {

            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        if (data.length <= 0) {
            return null
        }
        return data

    } catch (error: any) {
        console.log(error.message)
        return null
    }
}


export const getFacilityList = async (businessGuid: string | null, userGuid: string | null, page: number): Promise<any | null> => {

    let endpoint: string = ""

    if (businessGuid !== "" && userGuid !== "") {
        endpoint = `/api/listing/facilities/${businessGuid}/${userGuid}?page=${page}`
    } else {
        console.log('Contact admin.')
    }




    const url = config.BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {

            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        if (data.length <= 0) {
            return null
        }
        return data

    } catch (error: any) {
        console.log(error.message)
        return null
    }
}


export function getRandomImage(images: { image: string }[]): string {
    const randomIndex = Math.floor(Math.random() * images.length);
    const i = randomIndex === 0 ? 1 : randomIndex
    return images[i].image;
}


export const searchFacilities = (selectedFacilities: any) => {
    const mappedFacilities = selectedFacilities
        .map((sel: any) => {
            const fac = facilityFeatures.find(fac => fac.feature_id === sel.featureId)
            if (!fac) return null;

            return {
                ...sel,
                name: fac.name,
                description: fac.description,
                icon: fac.icon
            }
        })
        .filter(Boolean);
    return mappedFacilities
}

export const logError = (e: any) => {
    const environments = ['dev']

    if (environments.includes(config.ENV)) {
        console.log(e.message)
    }
}


export const getBusinessByCategoryAndCity = async (category: string | null, city: string | null, page: number): Promise<any | undefined> => {

    const endpoint = `/api/listing/category_city/${category}/${city}?page=${page}`
    const url = config.BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}



export const getBusinessCategoryAndCity = async (): Promise<any | undefined> => {

    const endpoint = `/api/listing/cat_city_sitexml`
    const url = config.BASE_URL + endpoint

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}


export const getBusinessCategory = async (): Promise<any | undefined> => {

    const endpoint = `/api/listing/cat_sitexml`
    const url = config.BASE_URL + endpoint

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}

export const sanitizeWord = (url: string) => {
    return url
        .trim() // Remove leading/trailing spaces
        .replace(/\s+/g, '-') // Replace multiple spaces with single dash
        .toLowerCase(); // Convert to lowercase (optional)
}


export const convertDashToSpace = (str: string) => {
    return str.replace(/-/g, ' ');
};


export const getBusinessByCategory = async (category: string | null, page: number): Promise<any | undefined> => {

    const endpoint = `/api/listing/category/${category}?page=${page}`
    const url = config.BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        return new Promise((resolve) => setTimeout(() => {

            resolve(data)
        }, 10))
    } catch (error: any) {
        return undefined
    }
}



export function generateRandom10DigitNumber() {
    // Ensure the first digit is not 0
    const min = 1000000000; // smallest 10-digit number
    const max = 9999999999; // largest 10-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Remove plus signs from a string with various options
 */
export function removePlusSign(
    text: string,
    options: {
        // Also remove leading/trailing plus signs only?
        onlyFirst?: boolean; // Remove only the first plus sign
        trimSpaces?: boolean; // Trim whitespace after removal
        replaceWith?: string; // Replace plus with something else (default: empty)
    } = {}
): string {
    const {
        onlyFirst = false,
        trimSpaces = false,
        replaceWith = ''
    } = options;

    let result = text;

    if (onlyFirst) {
        // Remove only the first plus sign
        result = result?.replace('+', replaceWith);
    } else {
        // Remove all plus signs
        result = result?.replace(/\+/g, replaceWith);
    }

    if (trimSpaces) {
        result = result?.trim();
    }

    return result;
}

export function removeAllParagraphs(text: string) {
    return text?.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
}


export function truncateText(text: string, desiredLength: number) {
    const strLen = text.length
    return (strLen > 100) ? text.substring(0, desiredLength) + '...' : text
}



export const getBusinessRating = async (businessGuid: string | null) => {
    const endpoint = `/api/rating/get_business_rating/${businessGuid}`
    const url = config.BASE_URL + endpoint




    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();
        return data

    } catch (error: any) {
        return ({ "message": error.message })
    }
}



export const getBusinessReviews = async (businessGuid: string | null) => {
    const endpoint = `/api/rating/get_business_reviews/${businessGuid}`
    const url = config.BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();
        return data

    } catch (error: any) {
        return ({ "message": error.message })
    }
}


export const getRelatedByCategory = async (category: string, limit: number) => {

    const endpoint = `/api/listing/related_by_category/${category}/${limit}`
    const url = config.BASE_URL + endpoint

    //console.log(url)

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();
        return data
    } catch (error: any) {
        return ({ "message": error.message })
    }
}

export function isValidUrl(string: any) {
    try {
        new URL(string);
        return true;
    } catch (err) {
        return false;
    }
}

export function getIcon(media: SocialMediaType) {
    const socialMedia = [
        {
            name: "facebook",
            id: "FBK",
            icon: <FaFacebookSquare />
        },
        {
            name: "twitterx",
            id: "TWX",
            icon: <BsTwitterX />
        },
        {
            name: "linkedin",
            id: "LNK",
            icon: <BsLinkedin />
        },
        {
            name: "instagram",
            id: "INS",
            icon: <BsInstagram />
        },
        {
            name: "pinterest",
            id: "PIN",
            icon: <BsPinterest />
        },
        {
            name: "vimeo",
            id: "VIM",
            icon: <BsVimeo />
        },
        {
            name: "tiktok",
            id: "TKT",
            icon: <FaTiktok />
        },
        {
            name: "youtube",
            id: "YTB",
            icon: <FaYoutubeSquare />
        },

    ]
    let icon = null
    let _mediaCode: string = media.social_media_code

    let selectedMedia

    for (let index = 0; index < socialMedia.length; index++) {
        const element = socialMedia[index];
        if (_mediaCode === element.id) {
            selectedMedia = element.icon
            break;
        }
    }

    return selectedMedia

}


export const getNearbyBusinesses = async (cityId: string, limit: number) => {

    const endpoint = `/api/listing/nearby_businesses/${cityId}/${limit}`
    const url = config.BASE_URL + endpoint

    //console.log(url)

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();
        return data
    } catch (error: any) {
        return ({ "message": error.message })
    }
}


export const getInitials = (title: string) => {
    const splitted = title?.split(' ')
    let firstInitial: string
    let secondInitial: string
    if (splitted.length > 1) {
        firstInitial = splitted[0]?.substring(0, 1)
        secondInitial = splitted[1]?.substring(0, 1)
    } else {
        firstInitial = title.substring(0, 2)
        secondInitial = ''
    }
    return `${firstInitial}${secondInitial}`
}


export const formatDecimalWithCommas = (value: string): string => {
    // 1. Remove invalid characters
    let clean = value.replace(/[^0-9.]/g, '');

    // 2. If it starts with '.', prefix with 0
    if (clean.startsWith('.')) {
        clean = '0' + clean;
    }

    // 3. Allow only one dot
    const firstDotIndex = clean.indexOf('.');
    if (firstDotIndex !== -1) {
        const beforeDot = clean.slice(0, firstDotIndex + 1);
        const afterDot = clean.slice(firstDotIndex + 1).replace(/\./g, '');
        clean = beforeDot + afterDot;
    }

    // 4. Split integer and decimal parts
    let [integerPart, decimalPart] = clean.split('.');

    // 5. Add commas to integer part
    integerPart = integerPart.replace(/^0+(?=\d)/, ''); // remove leading zeros
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // 6. Limit decimal places to 2 (but allow typing "34.")
    if (decimalPart !== undefined) {
        decimalPart = decimalPart.slice(0, 2);
        return `${integerPart}.${decimalPart}`;
    }

    return integerPart;
};


export const getServiceProfile = async (serviceGuid: string | null): Promise<ServiceType | null> => {

    const endpoint = "/api/listing/services/" + serviceGuid
    const url = config.BASE_URL + endpoint

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            },
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: ServiceType = await response.json();
        return data
    } catch (error: any) {
        console.log(error.message)
        return null
    }
}

export const getFacilityProfile = async (facilityGuid: string | null): Promise<FacilityType | null> => {

    const endpoint = "/api/listing/facilities/" + facilityGuid
    const url = config.BASE_URL + endpoint

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            },
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: FacilityType = await response.json();
        return data
    } catch (error: any) {
        console.log(error.message)
        return null
    }
}


export const getSocialMediaList = async (businessGuid: string | null, userGuid: string | null, page: number): Promise<any | null> => {

    let endpoint: string = ""

    if (businessGuid !== "" && userGuid !== "") {
        endpoint = `/api/listing/social_media/${businessGuid}/${userGuid}?page=${page}`
    } else {
        console.log('Contact admin.')
    }




    const url = config.BASE_URL + endpoint


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        }
        )
        if (!response.ok) {

            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();

        if (data.length <= 0) {
            return null
        }
        return data

    } catch (error: any) {
        console.log(error.message)
        return null
    }
}


export const getSocialMediaProfile = async (socialMediaGuid: string | null): Promise<SocialMediaType | null> => {

    const endpoint = "/api/listing/social_media/" + socialMediaGuid
    const url = config.BASE_URL + endpoint

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            },
        }
        )
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: SocialMediaType = await response.json();
        return data
    } catch (error: any) {
        console.log(error.message)
        return null
    }
}

export const filterCountry = (countries: CountryType[] | undefined, searchTerm: string) => {

    const term = searchTerm?.toLowerCase().trim()

    const filtered = countries?.filter((country: CountryType) =>
        country.country_name?.toLowerCase().includes(term) ||
        country.currency?.toLowerCase().includes(term) ||
        country.numeric_code?.toLowerCase().includes(term) ||
        country.id.toString().includes(term)
    )
    return filtered
}
import React, { useEffect, useState } from 'react'
import ComponentTitle from './ComponentTitle';
import { getOperatingHours } from '~/lib/lib';
import { UserProfile } from '~/lib/types';


const hours = [
    {
        day: "Mon",
        hours: "7:00am - 5:00pm"
    },
    {
        day: "Tue",
        hours: "7:00am - 5:00pm"
    },
    {
        day: "Wed",
        hours: "7:00am - 5:00pm"
    },
    {
        day: "Thu",
        hours: "7:00am - 5:00pm"
    },
    {
        day: "Fri",
        hours: "7:00am - 5:00pm"
    },
    {
        day: "Sat",
        hours: "7:00am - 5:00pm",
        status: "Closed"
    },
    {
        day: "Sun",
        hours: "7:00am - 5:00pm"
    },
]



const LocationWithHours = ({ listing, operatingHoursStatus }: any) => {
    const [dense, setDense] = React.useState(true);
    const [secondary, setSecondary] = React.useState(false);
    const [businessGuid, setBusinessGuid] = useState('')
    const [userGuid, setUserGuid] = useState('')
    const [operatingHours, setOperatingHours] = useState<any | undefined>(undefined)
    const [opHours, setOpHours] = useState<any>(null)
    const [openStatus, setopenStatus] = useState('')
    const [address, setAddress] = useState('')
    const [addressLink, setAddressLink] = useState('')
    const [opHoursStatus, setOpHoursStatus] = useState<any | undefined>(undefined)




    useEffect(() => {
        if (listing) {
            setBusinessGuid(listing?.gid)
            setUserGuid(listing?.owner)
        }
    }, [listing])

    const constructDailyHour = (start: string, end: string) => {
        if (start === "Closed" || end == "Closed") {
            return "Closed"
        } else {
            return `${start} - ${end}`
        }
    }



    const constructHours = (operatingHours: any) => {
        const opHours = []
        setopenStatus(operatingHours?.open_status)



        opHours.push({
            day: "Mon",
            hours: constructDailyHour(operatingHours?.monday_from, operatingHours?.monday_to)
        })
        opHours.push({
            day: "Tue",
            hours: constructDailyHour(operatingHours?.tuesday_from, operatingHours?.tuesday_to)
        })
        opHours.push({
            day: "Wed",
            hours: constructDailyHour(operatingHours?.wednesday_from, operatingHours?.wednesday_to)
        })
        opHours.push({
            day: "Thu",
            hours: constructDailyHour(operatingHours?.thursday_from, operatingHours?.thursday_to)
        })
        opHours.push({
            day: "Fri",
            hours: constructDailyHour(operatingHours?.friday_from, operatingHours?.friday_to)
        })
        opHours.push({
            day: "Sat",
            hours: constructDailyHour(operatingHours?.saturday_from, operatingHours?.saturday_to)
        })

        opHours.push({
            day: "Sun",
            hours: constructDailyHour(operatingHours?.sunday_from, operatingHours?.sunday_to)
        })
        setOpHours(opHours)
    }

    useEffect(() => {
        const getOpHours = async (businessGuid: string, userGuid: string) => {
            const operatingHours = await getOperatingHours(businessGuid, userGuid)
            return operatingHours
        }
        if (businessGuid !== "" && userGuid !== "") {
            getOpHours(businessGuid, userGuid).then((data) => {

                //console.log(data)
                if (data) {
                    constructHours(data)
                }
                //setOperatingHours(data)
            })

        }
    }, [businessGuid, userGuid])

    useEffect(() => {
        let getListingAddress = async (listing: any) => {
            let address = listing?.title
            address += listing?.address_one ? ', ' + listing?.address_one : ''
            address += listing?.address_two ? ', ' + listing?.address_two : ''
            address += listing?.city_name ? ', ' + listing?.city_name : ''
            address += listing?.state_name ? ', ' + listing?.state_name : ''
            address += listing?.zipcode ? ', ' + listing?.zipcode : ''
            address += listing?.country_code ? ', ' + listing?.country_code : ''

            let addressLink = `https://www.google.com/maps?q=${(address)}&t=&z=15&ie=UTF8&iwloc=B&output=`
            setAddress(address)
            setAddressLink(addressLink)
        }

        if (listing !== null) {
            getListingAddress(listing)
        }
    }, [listing])

    useEffect(() => {
        if (operatingHoursStatus !== undefined) {
            setOpHoursStatus(operatingHoursStatus);

        }
    }, [operatingHoursStatus])


    return (
        <div className='mt-12'>
            <ComponentTitle title='Location and Hours' />

            <div className=' '>
                <div className={`grid grid-cols-1 md:grid-cols-12 gap-5
                    `}>
                    <div className='col-span-6'>
                        <div className=' relative w-full h-[150px] overflow-hidden rounded-lg'>
                            <img
                                className=' object-cover w-full h-full'
                                src="/images/mapicon.jpeg" alt=""
                            />
                        </div>
                        <div className=' grid grid-cols-2 gap-6 mt-3'>
                            <div>
                                {address}
                            </div>
                            <div>
                                <a href={`${addressLink}`} target="_blank">
                                    <button className='w-[100%] border-[1px] border-blue-300 rounded-md'>
                                        <div className='text-[14px]  font-sans font-bold text-bold  py-2 tracking-tight '>
                                            View in Map
                                        </div>
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className={`col-span-6`}>
                        <div className={``}>
                            {
                                openStatus === "no_hours" || openStatus === null &&
                                <div>
                                    No hours selected.
                                </div>
                            }
                            {
                                openStatus === "always_open" &&
                                <div>
                                    Business is always open
                                </div>
                            }
                            {
                                openStatus === "permanently_closed" &&
                                <div>
                                    Permanently Closed
                                </div>
                            }
                            {
                                openStatus === "temporarily_closed" &&
                                <div>
                                    Temporarily Closed
                                </div>
                            }
                            {
                                opHours !== null && openStatus === "selected_hours" &&
                                <ul className={`w-full divide-y-[1px] md:divide-none`}>
                                    {
                                        opHours?.map((item: any, index: number) => {
                                            return (
                                                <li
                                                    key={index}
                                                    className={`w-full ${item?.hours.includes(null) && 'hidden'} `}
                                                >
                                                    <div className={`grid grid-cols-12 py-1.5 
                                                        `}>
                                                        <div className={` col-span-2 flex flex-col
                                                        place-items-start`}>
                                                            {item?.day}
                                                        </div>
                                                        <div className={`flex flex-row col-span-10
                                                    place-items-end place-content-end md:place-content-start gap-3 `}
                                                        >
                                                            <span className={`${item?.hours.includes('Closed') && 'hidden'}`}>
                                                                {item?.hours}
                                                            </span>
                                                            <span className={`${opHoursStatus.today === item?.day ? 'mr-[10px]' : ''}`}>
                                                                {
                                                                    item?.hours.includes("Closed") ? 'Closed' :
                                                                        opHoursStatus.today === item?.day &&
                                                                        (opHoursStatus.isOpen ? 'Open Now' : 'Closed Now')
                                                                }
                                                                {/* {item?.status} */}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }

                                </ul>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LocationWithHours


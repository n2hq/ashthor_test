import { Link } from '@remix-run/react';
import React, { ReactNode, useEffect, useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { FaEdit } from 'react-icons/fa'
import { FiEdit2 } from "react-icons/fi";
import { MdOutlinePanoramaPhotosphereSelect } from 'react-icons/md';
import { getOperatingHours } from '~/lib/lib';
import { ListingType } from '~/lib/types';

const hours = [
    {
        day: "Sunday",
        hours: "11:30 AM - 10:30 PM"
    },
    {
        day: "Monday",
        hours: "11:30 AM - 10:30 PM"
    },
    {
        day: "Tuesday",
        hours: "11:30 AM - 10:30 PM"
    },
    {
        day: "Wednesday",
        hours: "11:30 AM - 10:30 PM"
    },
    {
        day: "Thursday",
        hours: "11:30 AM - 10:30 PM"
    },
    {
        day: "Friday",
        hours: "11:30 AM - 10:30 PM"
    },
    {
        day: "Saturday",
        hours: "11:30 AM - 10:30 PM"
    },
]

export interface WorkHoursProps {
    listing: ListingType
    operatingHoursStatus: any
    workTimeStatusObject: any
}



const WorkingHours = ({ listing, operatingHoursStatus, workTimeStatusObject }: WorkHoursProps) => {
    const [businessGuid, setBusinessGuid] = useState('')
    const [userGuid, setUserGuid] = useState('')
    const [opHours, setOpHours] = useState<any>(null)
    const [openStatus, setopenStatus] = useState('')
    const [opHoursStatus, setOpHoursStatus] = useState<any | undefined>(undefined)


    const constructDailyHour = (start: string, end: string) => {
        if (start === "Closed" || end == "Closed") {
            return "Closed"
        } else {

            const startNumber = parseInt(start)
            const endNumber = parseInt(end)
            const startAMPM = (startNumber < 12) ? 'AM' : 'PM'
            const endAMPM = (endNumber < 12) ? 'AM' : 'PM'
            return `${start} ${startAMPM} - ${end} ${endAMPM}`
        }
    }

    const constructHours = (operatingHours: any) => {
        const opHours = []
        setopenStatus(operatingHours?.open_status)



        if (operatingHours?.monday_from && operatingHours?.monday_to) {
            opHours.push({
                day: "Monday",
                hours: constructDailyHour(operatingHours?.monday_from, operatingHours?.monday_to)
            })
        }

        if (operatingHours?.tuesday_from && operatingHours?.tuesday_to) {
            opHours.push({
                day: "Tuesday",
                hours: constructDailyHour(operatingHours?.tuesday_from, operatingHours?.tuesday_to)
            })
        }

        if (operatingHours?.wednesday_from && operatingHours?.wednesday_to) {
            opHours.push({
                day: "Wednesday",
                hours: constructDailyHour(operatingHours?.wednesday_from, operatingHours?.wednesday_to)
            })
        }

        if (operatingHours?.thursday_from && operatingHours?.thursday_to) {
            opHours.push({
                day: "Thursday",
                hours: constructDailyHour(operatingHours?.thursday_from, operatingHours?.thursday_to)
            })
        }


        if (operatingHours?.friday_from && operatingHours?.friday_to) {
            opHours.push({
                day: "Friday",
                hours: constructDailyHour(operatingHours?.friday_from, operatingHours?.friday_to)
            })
        }

        if (operatingHours?.saturday_from && operatingHours?.saturday_to) {
            opHours.push({
                day: "Saturday",
                hours: constructDailyHour(operatingHours?.saturday_from, operatingHours?.saturday_to)
            })
        }


        if (operatingHours?.sunday_from && operatingHours?.sunday_to) {
            opHours.push({
                day: "Sunday",
                hours: constructDailyHour(operatingHours?.sunday_from, operatingHours?.sunday_to)
            })
        }


        setOpHours(opHours)
    }


    useEffect(() => {
        if (listing) {
            setBusinessGuid(listing?.gid)
            setUserGuid(listing?.owner)
        }
    }, [listing])


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
        if (operatingHoursStatus !== undefined) {
            setOpHoursStatus(operatingHoursStatus);

        }
    }, [operatingHoursStatus])

    const [displayHours, setDisplayHours] = useState<ReactNode | string>(null)

    const getDisplayHours = () => {
        switch (openStatus) {

            case 'no_hours': {
                return (
                    <div>
                        No hours set.
                    </div>
                )
            }
            case 'always_open': {
                return (
                    <div>
                        Business is always open
                    </div>
                )
            }
            case 'permanently_closed': {
                return (
                    <div>
                        Permanently Closed
                    </div>
                )
            }
            case 'temporarily_closed': {
                return (
                    <div>
                        Temporarily Closed
                    </div>
                )
            }
            case 'selected_hours': {
                return (
                    opHours !== null && openStatus === "selected_hours" &&
                    opHours?.map((item: any, index: number) => {

                        return (
                            <div
                                key={index}
                                className={`grid grid-cols-12 place-items-start text-[14px] py-2 w-full`}>

                                <div className='w-full font-semibold col-span-4'>
                                    {item.day}
                                </div>

                                <div className={`text-right w-full col-span-8 flex gap-1 place-content-end place-items-center`}>
                                    <span className={`text-[12px]`}>
                                        {
                                            item?.hours.includes("Closed") ? 'Closed' :
                                                String(item?.day).startsWith(opHoursStatus.today) &&
                                                (opHoursStatus.isOpen ? 'Open Now' : 'Closed Now')
                                        }
                                    </span>

                                    <span>
                                        {item.hours}
                                    </span>
                                </div>

                            </div>
                        )
                    })
                )
            }
            default: {
                return (
                    <div>
                        <div>This business has no set hours. </div>
                        <div className={`text-gray-500`}>Assume: 8:30AM - 5:30PM</div>
                        {
                            (listing?.phone !== null && listing?.phone !== undefined && listing?.phone !== '') &&
                            <div className={`text-sm mt-2`}>
                                <Link to={`tel:${listing?.phone}`}>
                                    <div>Contact directly: {listing?.phone}</div>
                                </Link>
                            </div>
                        }
                    </div>
                )

            }

        }
    }



    return (
        <div id='workinghours' className={`w-full`}>
            <div className={`border border-gray-100 px-5 pt-7 pb-7 rounded-xl  shadow-lg shadow-gray-200`}>
                <div className={`flex place-content-between w-full `}>
                    <div className={`text-[22px] md:text-[25px] font-semibold`}>
                        Hours
                    </div>
                    <div className={`flex place-items-center gap-1`}>
                        <FiEdit2 />
                        <div className={`underline text-[13px]`}>
                            Suggest an edit
                        </div>
                    </div>
                </div>

                <div className={`flex place-items-center mt-2 text-[15px] font-normal gap-1`}>
                    <span>{workTimeStatusObject}</span>
                    <span>•</span>
                    <span>Check timing below.</span>
                </div>

                <div className={`mt-6`}>
                    {getDisplayHours()}

                </div>
            </div>
        </div>
    )
}

export default WorkingHours

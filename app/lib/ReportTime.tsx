import { config, getDateInTimeZone, getDateInTimeZoneX, getOperatingHours, headers } from "./lib";

import tzLookup from 'tz-lookup';

const getCountriesWithTimezone = async (countryCode: string) => {
    const endpoint = config.BASE_URL + "/api/util/country_locale"
    try {

        const response = await fetch(endpoint, {
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

const getCountryTimezoneData = (countryCode: string, countries: any) => {
    return countries.find((country: any) => country?.countryCode === countryCode);
}

const constructDailyHour = (start: string, end: string) => {
    if (start === "Closed" || end == "Closed") {
        return "Closed"
    } else if (start === null || end === null) {
        return "Not Set"
    } else {
        return `${start} - ${end}`
    }
}

const randomKey = (start: number, keyLength: number) =>
    (Math.random().toString(36).substring(2, 8) + Date.now().toString(36)).substring(0, 10);


const reConstructHours = (operatingHours: any) => {

    const opHours = []
    const openStatus = (operatingHours?.open_status)
    Math.random()
    opHours.push({
        key: randomKey(2, 12),
        day: "Mon",
        hours: constructDailyHour(operatingHours.monday_from, operatingHours.monday_to)
    })
    opHours.push({
        key: randomKey(2, 12),
        day: "Tue",
        hours: constructDailyHour(operatingHours.tuesday_from, operatingHours.tuesday_to)
    })
    opHours.push({
        key: randomKey(2, 12),
        day: "Wed",
        hours: constructDailyHour(operatingHours.wednesday_from, operatingHours.wednesday_to)
    })
    opHours.push({
        key: randomKey(2, 12),
        day: "Thu",
        hours: constructDailyHour(operatingHours.thursday_from, operatingHours.thursday_to)
    })
    opHours.push({
        key: randomKey(2, 12),
        day: "Fri",
        hours: constructDailyHour(operatingHours.friday_from, operatingHours.friday_to)
    })
    opHours.push({
        key: randomKey(2, 12),
        day: "Sat",
        hours: constructDailyHour(operatingHours.saturday_from, operatingHours.saturday_to)
    })

    opHours.push({
        key: randomKey(2, 12),
        day: "Sun",
        hours: constructDailyHour(operatingHours.sunday_from, operatingHours.sunday_to)
    })

    //console.log(opHours)

    return {
        opHours: opHours,
        openStatus: openStatus
    }
}

function formatTime(time24: string): string {
    const [hourStr, minute] = time24.split(':');
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12 || 12;
    return `${hour.toString().padStart(2, '0')}:${minute} ${ampm}`;
}

function getOpenStatusDisplaysTextOnly(openStatus: string, todayHoursFormatted: any) {
    if (openStatus === "selected_hours") {
        return (
            <div>
                {todayHoursFormatted}
            </div>
        )
    }

    if (openStatus === "always_open") {
        return (
            ' Always Open'
        )
    }

    if (openStatus === "permanently_closed") {
        return (
            'Permantently Closed'
        )
    }

    if (openStatus === "temporarily_closed") {
        return (
            'Temporarily Closed'
        )
    }

    return (
        'Hours not set'
    )
}
function getOpenStatusDisplays(openStatus: string, todayHoursFormatted: any) {
    if (openStatus === "selected_hours") {
        return (
            <div>
                {todayHoursFormatted}
            </div>
        )
    }

    if (openStatus === "always_open") {
        return (
            <div key={'1'} className={`bg-blue-700 px-2 rounded w-fit text-white pt-[2px] pb-[4px]`}>
                Always Open
            </div>
        )
    }

    if (openStatus === "permanently_closed") {
        return (
            <div key={'2'} className={`bg-red-700 px-2 rounded-lg w-fit text-white pt-[2px] pb-[4px]`}>
                Permantently Closed
            </div>
        )
    }

    if (openStatus === "temporarily_closed") {
        return (
            <div key={'3'} className={`bg-orange-400 px-2 rounded-lg w-fit text-white pt-[2px] pb-[4px]`}>
                Temporarily Closed
            </div>
        )
    }

    return (
        <div key={'3'} className={`bg-orange-400 px-2 rounded-lg w-fit text-white pt-[2px] pb-[4px]`}>
            Hours not set
        </div>
    )

}

export const getLocationAndBusinessStatus = async (listing: any) => {
    const countryCode: string = listing?.country_code

    const data = await getCountriesWithTimezone(countryCode)
    const country = getCountryTimezoneData(countryCode, data)

    const operatingHours: any = await getOperatingHours(listing?.gid, listing?.owner)
    //console.log(operatingHours)
    const reconstructed = reConstructHours(operatingHours)
    const opHours = reconstructed.opHours
    country["hours"] = opHours
    country["openStatus"] = operatingHours?.open_status



    const dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const nowUTC = new Date();
    const offsetMs = (country.gmtOffset) * 1000;
    const localTime = new Date(nowUTC.getTime() + offsetMs);

    const localTimeZone = tzLookup(listing.lat, listing.lng)

    const adjustment = 0;//no adjustment
    const timeObject = new Date(Date.now() - adjustment);

    let localTimeObject: any = getDateInTimeZone(localTimeZone);

    let localTimeText = getDateInTimeZoneX(localTimeZone)

    //console.log(localTimeObject)

    //const localTimex = new Date(localTimeFormat.)


    //console.log(format(estDate, "MM/dd/yyyy, hh:mm:ss a 'EST'", { timeZone: estTimeZone }));

    const dayIndex = localTimeObject.getDay(); // 0 = Sunday, ..., 6 = Saturday
    const today = dayMap[dayIndex];
    const todayHoursEntry = country.hours.find((entry: any) => entry.day === today);

    let isOpen = false;
    let todayHoursFormatted: any = <span key={'m1'} className={` space-x-2`}>
        <span key={'n1'} className={`underline font-bold`}>
            Status:
        </span>
        <span key={'n2'}>
            Closed Today
        </span>
    </span>;

    let todayHoursOpenStatus

    if (todayHoursEntry && todayHoursEntry.hours.includes('-')) {
        const [openStr, closeStr] = todayHoursEntry.hours.split(' - ');
        const [openHour, openMinute] = openStr.split(':').map(Number);
        const [closeHour, closeMinute] = closeStr.split(':').map(Number);

        const openTime = new Date(localTimeObject);
        openTime.setHours(openHour, openMinute, 0, 0);

        const closeTime = new Date(localTimeObject);
        closeTime.setHours(closeHour, closeMinute, 0, 0);

        isOpen = localTimeObject >= openTime && localTimeObject <= closeTime;

        const formattedLabel = (isOpen: boolean) => {
            return `${isOpen ? 'Open Now' : 'Closed Now'}`
        }

        //todayHoursFormatted = formattedLabel(isOpen) + ` ${today}, ${formatTime(openStr)} - ${formatTime(closeStr)}`;

        todayHoursFormatted = (
            <div className="w-full flex gap-1.5 place-items-center flex-wrap">
                <span key={'o1'} className={`${isOpen ? 'bg-blue-700' : 'bg-red-500'} text-white px-2 py-[2px] rounded-lg text-[13px]`}>
                    {formattedLabel(isOpen)}
                </span>
                <span key={'o2'}>{today}, </span>
                <span key={'o3'}>{formatTime(openStr)}</span>
                <span key={'o4'}>-</span>
                <span key={'o5'}>{formatTime(closeStr)}</span>
            </div>
        );

        todayHoursOpenStatus = formattedLabel(isOpen);


    }


    if (todayHoursEntry && todayHoursEntry.hours.includes('Not Set')) {
        todayHoursFormatted = <div className={`text-[12px]`}>
            <span key={'p1'}>OPERATING HOURS: </span>
            <span key={'p2'} className={` rounded text-black px-1 py-[2px] uppercase text-sm font-semibold`}>
                Hours not set.
            </span>
        </div>

        todayHoursOpenStatus = 'Hours not set';
    }

    const localTimeString = localTimeObject.toString()

    const openStatusObject = getOpenStatusDisplays(country.openStatus, todayHoursFormatted);

    return {
        ...country,
        isOpen,
        openStatusObject,
        todayHoursFormatted,
        todayHoursOpenStatus,
        today,
        localTimeString,
        localTimeText
    };
}




export const ReportTime = async (listing: any) => {
    const locationDetails = getLocationAndBusinessStatus(listing)
    return locationDetails

}
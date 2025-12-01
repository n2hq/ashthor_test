import { LoaderFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import React, { useEffect } from 'react'
import Footer from '~/components/footer/Footer';
import FooterAlt from '~/components/footer/FooterAlt';
import MainNav from '~/components/header/latest/MainNav';
import { appConfig, config, convertDashToSpace, getBusinessByCategoryAndCity } from '~/lib/lib';


// schema-types.ts

export const schemaMap: Record<string, string> = {
    "business-services": "LocalBusiness",
    "fashion-accessories": "Store",
    "accounting": "AccountingService",
    "advertising-marketing": "MarketingAgency",
    "financial-services": "FinancialService",
    "legal-services": "LegalService",
    "human-resource-recruiting": "EmploymentAgency",
    "printing-publishing": "PrintingService",
    "translation-and-interpretation": "ProfessionalService",
    "cleaning-services": "CleaningService",
    "plumbing": "Plumber",
    "hotels": "Hotel",
    "construction-roofing": "ConstructionService",
    "electrical-services": "Electrician",
    "landscaping-gardening": "Landscaping",
    "interior-design": "InteriorDesign",
    "logistics-moving-storage": "MovingCompany",
    "health-fitness": "HealthClub",
    "restaurants": "Restaurant",
    "supermarkets": "Supermarket",
    "food-delivery": "FoodDeliveryService",
    "shopping-retail": "Store",
    "travel-hospitality-rentals": "TravelAgency",
    "automotive": "AutoRepair",
    "entertainment": "EntertainmentBusiness",
    "education": "School",
    "technology-it": "ITService",
    "real-estate": "RealEstateAgent",
    "community-government": "GovernmentOffice",
    "general-trading": "LocalBusiness",
};


export function getSchemaType(categoryId: string) {
    return schemaMap[categoryId] || "LocalBusiness";
}


export const loader: LoaderFunction = async ({ params }) => {
    const { category, city } = params;
    // Fetch businesses from DB
    const businesses = await getBusinessByCategoryAndCity(category!, city!);


    return ({ category, city, businesses });
};


export const sanitizePhone = (phone: string) => {
    return phone?.replace(/[^+\d]/g, "")
}

export const getOperatingDays = (object: any) => {
    let days = []

    if (object.monday_from && object.monday_to) {
        days.push({
            day: 'Monday',
            time: `${object.monday_from} - ${object.monday_to}`
        })
    }

    if (object.tuesday_from && object.tuesday_to) {
        days.push({
            day: 'Tuesday',
            time: `${object.tuesday_from} - ${object.tuesday_to}`
        })
    }

    if (object.wednesday_from && object.wednesday_to) {
        days.push({
            day: 'Wednesday',
            time: `${object.wednesday_from} - ${object.wednesday_to}`
        })
    }

    if (object.thursday_from && object.thursday_to) {
        days.push({
            day: 'Thursday',
            time: `${object.thursday_from} - ${object.thursday_to}`
        })
    }

    if (object.friday_from && object.friday_to) {
        days.push({
            day: 'Friday',
            time: `${object.friday_from} - ${object.friday_to}`
        })
    }

    if (object.saturday_from && object.saturday_to) {
        days.push({
            day: 'Saturday',
            time: `${object.saturday_from} - ${object.saturday_to}`
        })
    }

    if (object.sunday_from && object.sunday_to) {
        days.push({
            day: 'Sunday',
            time: `${object.sunday_from} - ${object.sunday_to}`
        })
    }

    return days

}

export const getOperatingDays2 = (object: any) => {
    const daysMap = [
        { day: 'Mo', from: 'monday_from', to: 'monday_to' },
        { day: 'Tu', from: 'tuesday_from', to: 'tuesday_to' },
        { day: 'We', from: 'wednesday_from', to: 'wednesday_to' },
        { day: 'Th', from: 'thursday_from', to: 'thursday_to' },
        { day: 'Fr', from: 'friday_from', to: 'friday_to' },
        { day: 'Sa', from: 'saturday_from', to: 'saturday_to' },
        { day: 'Su', from: 'sunday_from', to: 'sunday_to' },
    ];

    return daysMap.map(d => {
        const from = object[d.from];
        const to = object[d.to];

        // Only include times if both from and to exist
        if (from !== 'Closed' && to !== 'Closed') {
            return `${d.day} ${from}-${to}`;
        } else {
            return `${d.day} Closed`; // Closed, no time
        }
    });
};




export const schemaData = (object: any, fallbackImg: string) => {

    return (
        {
            "@context": "https://schema.org",
            "@type": getSchemaType(object.category),
            "name": object.title,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": `${object.address_one} ${object.address_two || ""}`,
                "addressLocality": object.city_name,
                "addressRegion": object.state_name,
                "addressCountry": object.country_code,
                "postalCode": object.zipcode || '00000',
            },
            "telephone": sanitizePhone(object.phone) || "",
            "openingHours": getOperatingDays2(object),
            "url": `${config.BASE_URL}/web/${object.category}/${object.city_name}`,
            "image": `${object.image_url !== null ?
                config.IMG_BASE_URL + object.image_url :
                config.BASE_URL + fallbackImg

                }`,
            "starRating": {
                "@type": "Rating",
                "ratingValue": object.rating_average,
                "totalReviews": object.rating_count,
                "bestRating": "5"
            }
        }
    )
}

const index = () => {

    const baseUrl = config.BASE_URL
    const { category, city, businesses } = useLoaderData<typeof loader>();
    const fallbackImg = `/images/fallbackBusinessImg.png`




    return (
        <div className='p-6 bg-gray-50'>
            <MainNav />


            <div className={`w-full `}>
                <div className={`max-w-[1100px] mx-auto w-full`}>
                    <div>
                        <h1 className="text-3xl font-bold">
                            Best <span className={`font-light font-serif italic capitalize`}>{convertDashToSpace(category)}</span> in <span className={`font-light font-serif italic capitalize`}>{convertDashToSpace(city)}</span>
                        </h1>

                        <p className="mt-2 text-gray-600">
                            Explore verified {category} services in {city}. View contact info, working hours, and reviews.
                        </p>
                    </div>
                    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6`}>
                        <div className={`md:col-span-8`}>


                            <div className="mt-6 grid grid-cols-1 gap-4">
                                {
                                    businesses?.length > 0 ?
                                        businesses?.map((b: any, index: number) => (
                                            <div className={`group`} key={index}>
                                                <Link to={`/${b.username ? b.username : b.gid}`}>
                                                    <div key={b.id} className="border-b border-blue-200 py-4">
                                                        <h2 className={`text-2xl font-normal text-[#1a0dab] group-hover:underline`}>

                                                            {b.title}



                                                        </h2>
                                                        <p>{b.address_one} {b.address_two && `, ${b.address_two}`}</p>


                                                        <div className={`flex gap-2 place-items-start place-content-start`}>
                                                            <div className={`relative min-w-[40px] w-[40px] h-[40px] bg-blue-300 mt-[5px]`}>
                                                                <img src={
                                                                    b.image_url ?
                                                                        config.IMG_BASE_URL + b.image_url :
                                                                        fallbackImg
                                                                }
                                                                    alt=""
                                                                    className={`object-cover w-full h-full border`}
                                                                />
                                                            </div>
                                                            <div className={` h-full`}>
                                                                {b.short_description}
                                                            </div>
                                                        </div>

                                                        {
                                                            b?.phone &&
                                                            <div className="text-sm mt-2 hover:underline">
                                                                <a href={`tel:${b.phone}`}>📞 {b.phone}</a>
                                                            </div>
                                                        }

                                                        <div className="text-sm mt-2 hover:underline">
                                                            <a href={`mailto:${b?.email_address}`}>📨 Contact via email: {b?.email_address}</a>
                                                        </div>

                                                        <script
                                                            key={`schema-${b.id}`}
                                                            type="application/ld+json"
                                                            dangerouslySetInnerHTML={{
                                                                __html: JSON.stringify(schemaData(b, fallbackImg)),
                                                            }}
                                                        />
                                                    </div>
                                                </Link>
                                            </div>
                                        )) :
                                        <div className={`text-xl text-[#1a0dab]`}>
                                            We didn't find any!
                                        </div>
                                }
                            </div>
                        </div>
                        <div className={`md:col-span-4`}>

                        </div>
                    </div>
                </div>
            </div>


            <div className={`h-[54px]`}></div>
            <FooterAlt />
        </div>
    )
}

export default index

import { LoaderFunction, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { Link, useLoaderData, useLocation, useNavigate } from '@remix-run/react';
import React, { useEffect } from 'react'
import Footer from '~/components/footer/Footer';
import FooterAlt from '~/components/footer/FooterAlt';
import MainNav from '~/components/header/v1/MainNav';
import { appConfig, config, convertDashToSpace, getBusinessByCategory, getBusinessByCategoryAndCity } from '~/lib/lib';
import Card from './Card';



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


type ParamsType = {
    category?: string;
    city?: string;
};

export const loader: LoaderFunction = async ({ params, request }) => {

    const category = params.category

    const url = new URL(request.url);
    const page = Math.max(1, parseInt(url?.searchParams.get("page") || "1"));

    let businesses: any = null;


    try {
        // Call your paginated backend function
        businesses = await getBusinessByCategory(category!, page);
    } catch (error: any) {
        console.error("Error loading businesses:", error);
    }





    return {
        category: category,
        businesses: businesses || { data: [], pagination: null },
        currentPage: page
    };
};

function toTitleCase(text: string) {
    return text
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
    const category: any = data?.category
    const city: any = data?.city
    const businesses: any = data?.businesses

    const formattedCategory = toTitleCase(convertDashToSpace(category))


    const title = `${formattedCategory} | Bycet Index Directory`;
    const description = `Find the best ${formattedCategory} businesses. Contact details, operating hours, ratings, and more.`

    return [
        { title },
        { name: "description", content: description },
        { name: "keywords", content: `${category}, ${city}, business directory, ${category} in ${city}` },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `https://index.bycet.com/web/${category}/${city}` },
        { property: "og:image", content: "https://index.bycet.com/og-default.jpg" }
    ];
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
    const { category, businesses } = useLoaderData<typeof loader>();
    const fallbackImg = `/images/fallbackBusinessImg.png`


    const location = useLocation();
    const navigate = useNavigate();

    const data = businesses?.data || []
    const pagination = businesses?.pagination || null

    const goToPage = (pageNumber: number) => {
        const params = new URLSearchParams(location.search);
        params.set('page', pageNumber.toString());
        navigate(`${location.pathname}?${params.toString()}`);
    };

    // Helper to generate page numbers with ellipsis
    const generatePageNumbers = (current: number, total: number) => {
        const pages: (number | string)[] = [];

        if (total <= 7) {
            // Show all pages
            for (let i = 1; i <= total; i++) pages.push(i);
        } else {
            // Show first page, current page, and last page with ellipsis
            if (current <= 4) {
                // Near the start
                for (let i = 1; i <= 5; i++) pages.push(i);
                pages.push('...');
                pages.push(total);
            } else if (current >= total - 3) {
                // Near the end
                pages.push(1);
                pages.push('...');
                for (let i = total - 4; i <= total; i++) pages.push(i);
            } else {
                // In the middle
                pages.push(1);
                pages.push('...');
                pages.push(current - 1);
                pages.push(current);
                pages.push(current + 1);
                pages.push('...');
                pages.push(total);
            }
        }

        return pages;
    };

    const renderPagination = () => {
        if (!pagination || pagination.total_pages <= 1) return null;

        return (
            <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Page info */}
                <div className="text-sm text-gray-600">
                    Showing {(pagination.current_page - 1) * pagination.items_per_page + 1}-
                    {Math.min(pagination.current_page * pagination.items_per_page, pagination.total_items)}
                    of {pagination.total_items} businesses
                </div>

                {/* Pagination buttons */}
                <div className="flex items-center gap-2">
                    {/* Previous button */}
                    <button
                        onClick={() => goToPage(pagination.prev_page!)}
                        disabled={!pagination.has_prev_page}
                        className={`px-4 py-2 rounded border ${pagination.has_prev_page
                            ? 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
                            : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                            }`}
                    >
                        ← Previous
                    </button>

                    {/* Page numbers */}
                    <div className="flex items-center gap-1">
                        {generatePageNumbers(pagination.current_page, pagination.total_pages).map((pageNum, idx) => (
                            <React.Fragment key={idx}>
                                {pageNum === '...' ? (
                                    <span className="px-2 text-gray-400">...</span>
                                ) : (
                                    <button
                                        onClick={() => goToPage(pageNum as number)}
                                        className={`w-10 h-10 rounded border flex items-center justify-center ${pageNum === pagination.current_page
                                            ? 'bg-blue-600 text-white border-blue-600'
                                            : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Next button */}
                    <button
                        onClick={() => goToPage(pagination.next_page!)}
                        disabled={!pagination.has_next_page}
                        className={`px-4 py-2 rounded border ${pagination.has_next_page
                            ? 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
                            : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                            }`}
                    >
                        Next →
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className='p-6 bg-gray-50'>
            <MainNav />


            <div className={`w-full `}>
                <div className={`max-w-[1100px] mx-auto w-full`}>
                    <div>
                        <h1 className="text-3xl font-bold">
                            Category: <span className={`font-light font-serif italic capitalize`}>{convertDashToSpace(category)}</span>
                        </h1>

                        <p className="mt-2 text-gray-600">
                            Explore verified {category} services in. View contact info, working hours, and reviews.
                        </p>

                        {/* Total count display */}
                        {pagination && (
                            <div className="mt-2 text-sm text-gray-500">
                                Found {pagination.total_items} businesses
                            </div>
                        )}
                    </div>
                    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6`}>
                        <div className={`md:col-span-8`}>


                            <div className="mt-6 grid grid-cols-1 gap-4">
                                {
                                    data?.length > 0 ?
                                        data?.map((b: any, index: number) => (
                                            <div className={`group`} key={index}>
                                                <Link to={`/${b.username !== null && b.username !== '' && b.username !== undefined ? b.username : b.gid}`}>
                                                    <div key={b.id} className=" border-blue-200 py-4">
                                                        <Card
                                                            key={index}
                                                            listing={b}
                                                        />
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

                            {/* Pagination Controls */}
                            {renderPagination()}
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



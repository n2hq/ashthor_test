import React, { useEffect, useState } from 'react'
import { CardType } from '..'
import { BsHeart } from 'react-icons/bs'
import { BiSolidStar, BiStar } from 'react-icons/bi'
import { ListingType } from '~/lib/types'
import { config, convertDashToSpace, getInitials, removeAllParagraphs, removePlusSign, truncateText } from '~/lib/lib'

import formatPhoneNumber from '~/lib/phoneFormatter'
import RatingBoxInfoCard from './RatingBoxInfoCard'
import { Link } from '@remix-run/react'
import AlternateImage from '~/components/content/AlternateImage'

/**
 * Formats an international phone number (E.164) in a universal readable format
 * Example:
 * +937048048395 → +93 704 804 8395
 */
export function formatInternationalPhone(phone: string): string {
    if (!phone) return '';

    // Ensure it starts with +
    if (!phone.startsWith('+')) return phone;

    // Remove everything except digits
    const digits = phone.replace(/\D/g, '');

    // Extract country code (1–3 digits)
    const countryCode = digits.slice(0, digits.length > 11 ? 3 : digits.length > 10 ? 2 : 1);
    const nationalNumber = digits.slice(countryCode.length);

    // Group national number into readable chunks
    const groups: string[] = [];
    let i = 0;

    while (i < nationalNumber.length) {
        const remaining = nationalNumber.length - i;

        if (remaining > 4) {
            groups.push(nationalNumber.slice(i, i + 3));
            i += 3;
        } else {
            groups.push(nationalNumber.slice(i));
            break;
        }
    }

    return `+${countryCode} ${groups.join(' ')}`;
}


const InfoCard = ({ item, isFirst = false }: { item: ListingType, isFirst?: boolean }) => {
    const [data, setData] = useState<ListingType | null>(null)
    useEffect(() => {
        if (item) {
            setData(item)
        }
    }, [item])
    return (
        <div>
            <Link to={`${(item?.username !== null && item?.username !== '' && item?.username !== undefined) ? `/${item?.username}` : `/${item?.gid}`}`}>
                <div className={`flex py-7 border-b cursor-pointer hover:opacity-80 transition duration-200 ease-out first:border-t group ${isFirst ? 'border-t' : ''}`}>
                    <div className={`relative h-48 min-w-40 w-40 md:h-52 md:w-52 md:min-w-52 flex-shrink-0 rounded-3xl overflow-hidden group-hover:shadow-md group-hover:shadow-gray-300 border group-hover:border-none`}>
                        {
                            (item?.image_url !== null && item?.image_url !== '' && item?.image_url !== undefined) ?
                                <img
                                    src={`${(item?.image_url && config?.IMG_BASE_URL + item?.image_url) || `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTtDZi1XswvKy7PygdmhaqCPBDcgeUHwc46Q&s`}`}
                                    alt=""
                                    className={`object-cover h-full w-full  `}
                                /> :
                                <AlternateImage title={item?.title} />
                        }
                    </div>

                    <div className={`flex flex-col flex-grow pl-5 relative`}>
                        <div className={`flex justify-between relative`}>
                            <p className={`text-base leading-[1.2em] capitalize`}>{convertDashToSpace(item.category)}</p>
                            <div>
                                {/* <BsHeart className={`text-2xl cursor-pointer`} /> */}
                                <div className={`text-[12px] md:text-lg min-w-[100px] text-right`}>{formatInternationalPhone(item?.phone) || `n/a`}</div>
                            </div>
                        </div>

                        <h4 className={`text-2xl leading-[1.2em] text-blue-900 group-hover:underline`}>
                            {item?.title}
                        </h4>

                        <div className={`border-b w-10 pt-2`} />

                        <div className={`pt-2 flex-grow`}>
                            <div className={`text-sm text-gray-500 line-clamp-2`}>
                                {truncateText(removeAllParagraphs(item?.short_description), 230)}
                            </div>


                        </div>

                        <div className={`flex justify-between items-end pt-5`}>
                            <div>
                                <div className={`text-sm mb-2 flex flex-col -space-y-0.5 relative`}>
                                    <p className=' line-clamp-1'>{item?.address_one}</p>
                                    <p className=' line-clamp-1'>{item.address_two && `${item.address_two}, `} {item.city_name && `${item.city_name}, `} {item?.country_name}</p>
                                </div>
                                <div className={`flex place-items-center relative`}>
                                    <RatingBoxInfoCard rating={Number(item?.avg_rating) || 0} />

                                    <span className={` ml-1 relative left-0 top-[0px] text-[14px]`}>
                                        {item?.avg_rating || 0}
                                    </span>
                                    <span className={`ml-1 relative left-0 top-[0px] text-orange-700 text-[13px]`}>
                                        ({item?.count_of_rating || 0}) Reviews
                                    </span>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={`text-right -mb-1`}>Starting</p>

                                    <p className={`text-lg lg:text-xl font-semibold pb-1 text-right`}>
                                        {item.currency}{Number(item?.minimum_amount || 0).toFixed(2)}
                                    </p>
                                </div>
                                <p className={` text-right font-light hover:underline`}>
                                    Website
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default InfoCard

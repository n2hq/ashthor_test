import { Link } from '@remix-run/react';
import React, { useRef } from 'react'
import { BiSolidStar, BiStar } from 'react-icons/bi'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import AlternateImage from '~/components/content/AlternateImage';
import RatingBoxInfoCard from '~/components/content/RatingBoxInfoCard';
import { config, convertDashToSpace, getInitials } from '~/lib/lib';
import { ListingType } from '~/lib/types';


const related2 = [
    {
        title: "Two More Beers London",
        star: "4.9",
        reviews: 169,
        img: `https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/c9/bc/33/front-of-the-pub.jpg?w=800&h=-1&s=1`
    },
    {
        title: "Two More Beers London",
        star: "4.9",
        reviews: 169,
        img: `https://dynamic-media-cdn.tripadvisor.com/media/photo-o/31/24/f3/54/exterior.jpg?w=800&h=600&s=1`
    },
    {
        title: "Two More Beers London",
        star: "4.9",
        reviews: 169,
        img: `https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/54/66/f5/enjoy-a-delicious-drink.jpg?w=800&h=600&s=1`
    },
    {
        title: "Two More Beers London",
        star: "4.9",
        reviews: 169,
        img: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9lJXEfx_-xLm-T_ZTYIERDH5ofKPB0YGXtQ&s`
    },
    {
        title: "Two More Beers London",
        star: "4.9",
        reviews: 169,
        img: `https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/53/cc/5c/main-room.jpg?w=800&h=600&s=1`
    },
    {
        title: "Two More Beers London",
        star: "4.9",
        reviews: 169,
        img: `https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/ab/49/bd/bow-bar.jpg?w=800&h=600&s=1`
    },
    {
        title: "Two More Beers London",
        star: "4.9",
        reviews: 169,
        img: `https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/0d/4d/76/outside-front-of-pub.jpg?w=800&h=600&s=1`
    },
]

export interface RelatedProps {
    related: ListingType[]
}



const Related = ({ related }: RelatedProps) => {

    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    return (
        <div className={`border-t py-10`}>
            <div className=''>
                <div className={`text-[19px] font-semibold`}>
                    Related Businesses
                </div>

                <div className={`mt-6 relative`}>
                    <div ref={scrollRef} className={`flex place-items-start overflow-x-hidden  gap-4 rounded-xl  h-[300px]`}>
                        <div className={`flex gap-3`}>
                            {
                                related?.map((item: ListingType, i: number) => {
                                    let url = config.BASE_URL + '/' + (item?.username || item?.gid)

                                    let img = ''
                                    let imgPath = ''

                                    if (item?.bg_image_url_ext) {
                                        img = item?.bg_image_url_ext
                                    } else if (item?.profile_image_url_ext) {
                                        img = item?.profile_image_url_ext
                                    } else { }

                                    imgPath = config.IMG_BASE_URL + img
                                    console.log(imgPath)

                                    return (
                                        <div key={i} className={`w-[200px] group`}>
                                            <Link to={url}>
                                                <div className={`relative w-full h-[180px]  rounded-3xl overflow-hidden border group-hover:shadow-lg`}>

                                                    {
                                                        (img !== '') ?
                                                            <img
                                                                src={`${imgPath}`}
                                                                alt=""
                                                                className={`object-cover h-full w-full`}
                                                            /> :
                                                            <AlternateImage title={item?.title} />
                                                    }
                                                </div>
                                                <div className={`mt-2 `}>
                                                    <div className={`text-[13px] leading-[1.2em] group-hover:underline pl-1 `}>
                                                        {item.title}
                                                    </div>

                                                    <div className={` mt-1`}>
                                                        {

                                                            <div className={`flex place-items-center gap-2`}>
                                                                <div className={`text-base flex place-items-center gap-0`}>
                                                                    {/* <RatingBoxInfoCard rating={Number(item.avg_rating || 0)} /> */}
                                                                    <BiSolidStar className={`relative top-[-1px]`} />
                                                                    <span>
                                                                        {item?.avg_rating || 0}
                                                                    </span>
                                                                </div>
                                                                <div className={`text-base`}>
                                                                    ({item?.count_of_rating || 0})
                                                                    <span className={`text-[12px] top-[-1px]`}> Review{item?.count_of_rating > 1 && 's'}</span>
                                                                </div>
                                                            </div>
                                                        }
                                                        <div></div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    {/** navlinks */}
                    {/** left arrow */}
                    {
                        related?.length > 0 &&
                        <div>
                            <div className={`absolute text-black top-1/3 -translate-y-1/2 left-2 w-[40px] min-w-[40px] h-[40px] bg-white hover:bg-white/70 hover:text-black flex place-content-center place-items-center hover:cursor-pointer border-[1px] border-gray-400 rounded-full z-[5]`}
                                onClick={() => { scrollLeft() }}
                            >
                                <FaChevronLeft />
                            </div>


                            {/** right arrow */}
                            <div className={`absolute text-black top-1/3 -translate-y-1/2 right-2 w-[40px] min-w-[40px] h-[40px] bg-white hover:bg-white/70 hover:text-black flex place-content-center place-items-center hover:cursor-pointer border-[1px] border-gray-400 rounded-full z-[5] transition-all ease-in-out duration-1000`}
                                onClick={() => { scrollRight() }}
                            >
                                <FaChevronRight />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Related

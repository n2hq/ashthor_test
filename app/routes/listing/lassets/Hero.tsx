import React, { useEffect, useState } from 'react'
import { BiMenu } from 'react-icons/bi'
import { MdOutlineImage } from 'react-icons/md'
import { useGallery } from '~/context/GalleryContext'
import { useSliderContext } from '~/context/SliderContext'
import { config } from '~/lib/lib'
import { ListingType } from '~/lib/types'
import { CgMenuGridR } from "react-icons/cg";

const imgs = [
    {
        image_url: `https://a0.muscache.com/im/pictures/prohost-api/Hosting-1522473065584163891/original/6ac1fb91-af82-4952-9227-e0d2158b82d6.jpeg?im_w=960`
    },
    {
        image_url: `https://a0.muscache.com/im/pictures/prohost-api/Hosting-1522473065584163891/original/ea4039cf-416d-4781-ad15-e39ae07659d8.jpeg?im_w=720`
    },
    {
        image_url: `https://a0.muscache.com/im/pictures/prohost-api/Hosting-1522473065584163891/original/e3ded900-796d-4822-b5c4-46395680c7c4.jpeg?im_w=720`
    },
    {
        image_url: `https://a0.muscache.com/im/pictures/prohost-api/Hosting-1522473065584163891/original/a290d83d-44da-4581-9623-6b2594e62e19.jpeg?im_w=720`
    },
    {
        image_url: `https://a0.muscache.com/im/pictures/prohost-api/Hosting-1522473065584163891/original/d38af0c5-abcc-44a2-b4f3-99656e38ab7f.jpeg?im_w=720`
    },
]


export type ImageType = {
    id?: number;
    image_url?: string;
    alt?: string;
    default: boolean
};

export interface HeroProp {
    images: ImageType[],
    listing: ListingType
}

const defaultImg = [{
    image_url: '/images/abstract_placeholder.jpg',
    default: true
}]

const Hero = ({ images, listing }: HeroProp) => {
    const [loaded, setLoaded] = useState(false)
    const slider = useSliderContext()
    const gallery = useGallery()
    const [heroImages, setHeroImages] = useState<ImageType[] | []>([])

    useEffect(() => {
        setLoaded(true)
    }, [])

    useEffect(() => {
        if (images === null || images.length === 0) {
            setHeroImages(defaultImg)
        } else {
            setHeroImages(images)
        }
    }, [images])

    const showCarousel = (index: number, images: ImageType[]) => {

        //alert(images.length)
        //slider.setSelectedSlide(1)
        //setOverlay(true)
        if (index < images.length) {
            slider.setDialog(true)
            slider.setSelectedSlide(index + 1)
            slider.setGallery(images)
            slider.setListing(listing)
        }
    }

    const showGallery = (index: number) => {
        gallery.setShow(true)
        gallery.setGallery(images)
        gallery.setListing(listing)
    }


    return (
        <div>
            {
                heroImages?.length > 0 &&
                <div className={`mt-6 h-[350px] relative`}>
                    <ShowGallery showGallery={showGallery} />
                    {
                        (loaded && heroImages?.length === 1) &&
                        <div className={`relative rounded-xl overflow-hidden h-full`}>
                            <SinglePhoto imgs={heroImages} index={0} showCarousel={showCarousel} />
                        </div>
                    }

                    {
                        (loaded && heroImages?.length === 2) &&
                        <div className={`relative rounded-xl overflow-hidden h-full`}>
                            <div className={`grid grid-cols-12 gap-2 h-full`}>

                                <div className={`col-span-7
                    row-span-2 overflow-hidden
                    relative cursor-pointer`}>
                                    <SinglePhoto imgs={heroImages} index={0} showCarousel={showCarousel} />
                                </div>

                                <div className={`col-span-5 row-span-2 overflow-hidden relative cursor-pointer h-full`}
                                >
                                    <SinglePhoto imgs={heroImages} index={1} showCarousel={showCarousel} />
                                </div>
                            </div>
                        </div>
                    }


                    {
                        (loaded && heroImages?.length === 3) &&
                        <div className={`relative rounded-xl overflow-hidden h-full`}>
                            <div className={`grid grid-cols-12 gap-2 h-full`}>

                                <div className={`col-span-7
                    row-span-2 overflow-hidden
                    relative cursor-pointer`}>
                                    <SinglePhoto imgs={heroImages} index={0} showCarousel={showCarousel} />
                                </div>

                                <div className={`col-span-5 overflow-hidden relative cursor-pointer h-full`}
                                >
                                    <SinglePhoto imgs={heroImages} index={1} showCarousel={showCarousel} />
                                </div>

                                <div className={`col-span-5 overflow-hidden relative cursor-pointer h-full`}
                                >
                                    <SinglePhoto imgs={heroImages} index={2} showCarousel={showCarousel} />
                                </div>
                            </div>
                        </div>
                    }

                    {
                        (loaded && heroImages.length === 4) &&
                        <div className="relative rounded-2xl overflow-hidden h-full">
                            <div className="grid grid-cols-12 grid-rows-2 h-full gap-2.5">

                                {/* First column - full height */}
                                <div className="col-span-5 row-span-2 relative overflow-hidden">
                                    <SinglePhoto imgs={heroImages} index={0} showCarousel={showCarousel} />
                                </div>

                                {/* Second column - full height */}
                                <div className="col-span-4 row-span-2 relative overflow-hidden">
                                    <SinglePhoto imgs={heroImages} index={1} showCarousel={showCarousel} />
                                </div>

                                {/* Third column - top half */}
                                <div className="col-span-3 row-span-1 relative overflow-hidden">
                                    <SinglePhoto imgs={heroImages} index={2} showCarousel={showCarousel} />
                                </div>

                                {/* Third column - bottom half */}
                                <div className="col-span-3 row-span-1 relative overflow-hidden">
                                    <SinglePhoto imgs={heroImages} index={3} showCarousel={showCarousel} />
                                </div>

                            </div>
                        </div>

                    }


                    {
                        (loaded && heroImages !== null && heroImages.length > 4) &&
                        <div className="relative rounded-2xl overflow-hidden h-full">
                            <div className="grid h-full grid-cols-4 grid-rows-2 gap-2.5">

                                {/* BIG IMAGE */}
                                <div className="col-span-2 row-span-2 relative">
                                    <SinglePhoto imgs={heroImages} index={0} showCarousel={showCarousel} />
                                </div>

                                {/* SMALL IMAGE 1 */}
                                <div className="relative">
                                    <SinglePhoto imgs={heroImages} index={1} showCarousel={showCarousel} />
                                </div>

                                {/* SMALL IMAGE 2 */}
                                <div className="relative">
                                    <SinglePhoto imgs={heroImages} index={2} showCarousel={showCarousel} />
                                </div>

                                {/* SMALL IMAGE 3 */}
                                <div className="relative">
                                    <SinglePhoto imgs={heroImages} index={3} showCarousel={showCarousel} />
                                </div>

                                {/* SMALL IMAGE 4 */}
                                <div className="relative">
                                    <SinglePhoto imgs={heroImages} index={4} showCarousel={showCarousel} />
                                </div>

                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default Hero



export interface SinglePhotoProp {
    index: number
    imgs: ImageType[]
    showCarousel?: (index: number, imgs: ImageType[]) => void
    showGallery?: (index: number) => void
}

const SinglePhoto = ({ index, imgs, showCarousel }: SinglePhotoProp) => {
    const [loaded, setLoaded] = useState(false)
    const handleShadowDelay = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoaded(true)
    }

    useEffect(() => {
        handleShadowDelay()
    }, [])

    return (
        <div className={` overflow-hidden  
                    relative cursor-pointer w-full h-full`}
            onMouseDown={(e) => {

                if (showCarousel) {
                    showCarousel(index, imgs)
                }
            }}
        >

            <div className={`w-full h-[30%] absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-black/70 z-[2] rounded-xl`} />


            <div className={`relative w-full h-full rounded-xl`}>
                <img
                    src={
                        imgs[index].default ? (imgs[index].image_url) :
                            (config.IMG_BASE_URL + imgs[index].image_url)}
                    alt=""
                    className={`object-cover w-full h-full`}
                />
            </div>
        </div>
    )
}

interface ShowGalleryProp {
    showGallery: (index: number) => void
}
export const ShowGallery = ({ showGallery }: ShowGalleryProp) => {
    return (
        <div className={`absolute bottom-5 z-[5] right-5 group`}
            onMouseDown={(e) => showGallery && showGallery(0)}
        >
            <div className={`w-fit px-4 py-2 bg-white rounded-lg group-hover:underline cursor-pointer flex place-items-center gap-2`}>
                <CgMenuGridR className={`text-2xl`} />
                <span className={`font-semibold text-lg`}>
                    Show Gallery
                </span>
            </div>
        </div>
    )
}
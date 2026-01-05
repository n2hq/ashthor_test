import React, { useEffect, useState } from 'react'
import HeroCarousel from './HeroCarousel'
import { BiTrophy } from 'react-icons/bi'
import { ImageType } from './Hero'
import { ListingType } from '~/lib/types'
import { list } from 'postcss'

interface MobileHeroProps {
    title: string
    images: ImageType[]
    listing: ListingType
}

const defaultImg = [{
    image_url: '/images/abstract_placeholder.jpg',
    default: true
}]
const MobileHeroWithTitle = ({ title, images, listing }: MobileHeroProps) => {
    const [heroImages, setHeroImages] = useState<ImageType[] | null>(null)

    useEffect(() => {
        if (images === null || images.length === 0) {
            setHeroImages(defaultImg)
        } else {
            setHeroImages(images)
        }
    }, [images])

    return (
        <div className={`block md:hidden`}>
            <div className={`bg-black h-[450px] w-full z-[0]`}>
                <HeroCarousel images={heroImages} listing={listing} />
            </div>

            <div className={`px-5 pt-8 pb-5 rounded-t-3xl overflow-hidden bg-white -mt-5 z-[3]`}>
                <div className={`text-[25px] font-semibold text-center leading-[1.3em]`}>
                    {title}
                </div>
            </div>
        </div>
    )
}

export default MobileHeroWithTitle

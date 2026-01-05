import React, { useEffect, useRef, useState } from 'react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { useSliderContext } from '~/context/SliderContext'
import { config } from '~/lib/lib'
import { ImageType } from './Hero'
import { ListingType } from '~/lib/types'

const heroimgs = [

    {
        img: "https://r4.wallpaperflare.com/wallpaper/791/501/238/new-york-city-buildings-wallpaper-51351344a10dae2b3cd90e3cb71d503d.jpg"
    },
    {
        img: "https://c0.wallpaperflare.com/path/494/492/40/signage-brand-cyan-yellow-5d1465fafe2d1f3e8deff1bbe07c71ce.jpg"
    }
]

interface HeroCarouselProps {
    images: ImageType[] | null
    listing: ListingType
}

const HeroCarousel = ({ images, listing }: HeroCarouselProps) => {
    const [currentSlide, setCurrentSlide] = useState<any>(0)
    const slideStep = useRef(0)
    const counter = useRef(0)
    const slider = useSliderContext()

    const [slides, setSlides] = useState<any | null>(heroimgs)

    let timeoutId = useRef<NodeJS.Timeout | null>(null);

    const handleNext = async () => {


        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }

        next();

        timeoutId.current = setTimeout(() => {
            //next();
            //handleNext(); // Continue the loop if needed
        }, 15000);
    }

    const handlePrev = async () => {


        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }

        prev();

        timeoutId.current = setTimeout(() => {
            //next();
            //handleNext(); // Continue the loop if needed
        }, 15000);
    }

    const handleTouchStart = (e: any) => {
        slideStep.current = e.touches[0].clientX;
    }

    const handleTouchEnd = (e: any) => {
        const endX = e.changedTouches[0].clientX;
        const deltaX = slideStep.current - endX;

        if (deltaX > 50) {
            // swipe left
            setCurrentSlide((i: any) => (i + 1) % slides.length);
        } else if (deltaX < -50) {
            // swipe right
            setCurrentSlide((i: any) => (i - 1 + slides.length) % slides.length);
        }
    };

    const showCarousel = (index: number) => {
        //alert(images.length)
        //slider.setSelectedSlide(1)
        //setOverlay(true)
        if (index < slides?.length) {
            slider.setDialog(true)
            slider.setSelectedSlide(index + 1)
            slider.setGallery(slides)
            slider.setListing(slides)
        }
    }


    const prev = () => {
        setCurrentSlide((currentSlide: any) => {
            return (currentSlide === 0) ? slides.length - 1 : currentSlide - 1
        })
    }

    const next = () => {
        setCurrentSlide((currentSlide: any) => {
            return (currentSlide === slides.length - 1) ? 0 : currentSlide + 1
        })
    }


    useEffect(() => {
        if (images) {
            setSlides(images)
        }
    }, [images])


    return (
        <div className={`relative`}>
            <div className={` w-full h-[430px] md:h-[500px] flex overflow-hidden  `}>
                {
                    slides?.map((slide: any, index: any) => {

                        return (
                            <div
                                key={index}
                                className={`h-full w-full relative block flex-shrink-0 flex-grow-0 transition-transform 
                      ease-in-out duration-1000 cursor-pointer`}
                                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                            >

                                <div className={`absolute  left-0 right-0 bottom-0 h-[30%]  w-full bg-gradient-to-b from-transparent to-gray-800`} />
                                <div className={`absolute bottom-5 w-full text-center text-white`}>
                                    <div>{index + 1} / {slides.length}</div>
                                    <div className={`max-w-[80%] mx-auto w-full line-clamp-1 text-center text-sm font-light mt-2`}>
                                        {slide?.image_title}
                                    </div>
                                </div>
                                <img
                                    onTouchStart={handleTouchStart}
                                    onTouchEnd={handleTouchEnd}
                                    onMouseDown={(e) => showCarousel(index)}
                                    key={index}
                                    src={slide?.default ? (slide?.image_url) : (config.IMG_BASE_URL + slide?.image_url)}

                                    alt=""

                                    className={`object-cover w-full h-full `}
                                />
                            </div>
                        )
                    })
                }
            </div>

            <div className={`z-[50]`}>
                <button onMouseDown={handlePrev} className={`block absolute top-0 bottom-0 z-[5] p-[1rem] cursor-pointer left-0 group h-full transition duration-1000 ease-in-out`}>
                    <div className={`w-[50px] h-[50px] bg-white/60 rounded-full 
                       flex place-content-center place-items-center group-hover:bg-white/30
                        z-[300] transition duration-500 ease-in-out`}>
                        <BiChevronLeft className=' stroke-white fill-black w-[2rem] h-[2rem]' />
                    </div>

                </button>
                <button onMouseDown={handleNext} className={`block absolute top-0 bottom-0 
                                                                    z-[5]    p-[1rem] cursor-pointer right-0 group 
                                                                         transition duration-1000 ease-in-out`}>
                    <div className={`w-[50px] h-[50px] bg-white/60 rounded-full 
                        flex place-content-center place-items-center group-hover:bg-white/30
                        z-[300]   transition duration-500 ease-in-out
                        `}>
                        <BiChevronRight className=' stroke-white fill-black w-[2rem] h-[2rem]' />
                    </div>
                </button>
            </div>
        </div>
    )
}

export default HeroCarousel

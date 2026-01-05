import { createContext, useContext, useEffect, useRef, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { CgMaximize } from "react-icons/cg";
import { FaMaximize, FaMinimize } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { getYoutubeId } from "~/lib/lib";
import { AddVideoType } from "~/lib/types";

const VideoSliderContext = createContext<any | null>(null)

export function useVideoSliderContext() {
    const context = useContext(VideoSliderContext)
    if (!context) {
        null
    }
    return context
}

const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL

export const VideoSliderProvider = ({ children }: any) => {
    const [dialog, setDialog] = useState<any>(false)
    const [selectedSlide, setSelectedSlide] = useState<any>(null)
    const [slides, setGallery] = useState<AddVideoType[] | []>([])
    const [currentSlide, setCurrentSlide] = useState<any>(0)
    const [listing, setListing] = useState<any>(null)
    const slideStep = useRef(0)
    const counter = useRef(0)
    let slideIncrement = 0

    const [maximized, setMaximized] = useState(true)

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

    const handleClose = () => { setDialog(false) }
    const handleOpen = () => { setDialog(true) }

    const prev = () => {
        {/** current count */ }
        let currentCount = currentSlide
        const currentVideo = slides[currentCount]
        const currentIframe: any = document.getElementById(currentVideo?.video_guid)

        if (currentSlide !== 0) {
            currentIframe.src = ""
        }

        let prevCount = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1
        const prevVideo = slides[prevCount]

        let iframeObject: any

        try {
            //mute the current
            const currentVideo = slides[currentCount]
            iframeObject = document.getElementById(currentVideo?.video_guid)
            iframeObject.src = ``
        } finally {
            //after start the next
            iframeObject = document.getElementById(prevVideo?.video_guid)
        }


        const videoId: string | null = getYoutubeId(prevVideo?.video_url)
        iframeObject.src = `https://www.youtube.com/embed/${videoId}`


        setCurrentSlide((currentSlide: any) => {
            return (currentSlide === 0) ? slides.length - 1 : currentSlide - 1
        })
    }

    const next = () => {

        {/** current count */ }
        let currentCount = currentSlide
        const currentVideo = slides[currentCount]
        const currentIframe: any = document.getElementById(currentVideo?.video_guid)


        if (currentSlide !== slides.length - 1) {
            currentIframe.src = ""
        }

        {/** next count */ }

        let nextCount = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1
        const nextVideo = slides[nextCount]


        let iframeObject: any

        try {
            //mute the current
            const currentVideo = slides[currentCount]
            iframeObject = document.getElementById(currentVideo?.video_guid)
            iframeObject.src = ``
        } finally {
            //after start the next
            iframeObject = document.getElementById(nextVideo?.video_guid)
        }


        const videoId: string | null = getYoutubeId(nextVideo?.video_url)
        iframeObject.src = `https://www.youtube.com/embed/${videoId}`



        setCurrentSlide((currentSlide: any) => {
            return (currentSlide === slides.length - 1) ? 0 : currentSlide + 1
        })
    }

    useEffect(() => {
        if (selectedSlide !== null) {
            setCurrentSlide(selectedSlide - 1)
        }
    }, [selectedSlide])

    let vals = {
        dialog, setDialog,
        selectedSlide, setSelectedSlide,
        slides, setGallery,
        setListing
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleClose()
            }
        }

        if (dialog) {
            document.addEventListener('keydown', handleKeyDown)
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [dialog])



    return (
        <VideoSliderContext.Provider value={vals}>
            {
                dialog &&
                <div className={`flex w-full h-full bg-white z-[20001] 
                fixed top-0 left-0 right-0 bottom-0 `}>
                    <div className={`grid grid-cols-12 gap-0 w-full`}>
                        <div className={`${maximized ? 'col-span-12' : 'col-span-12 md:col-span-9'}  w-full h-full relative bg-black flex`}>
                            <div className={` w-full h-screen flex overflow-hidden`}>
                                {
                                    slides && selectedSlide &&
                                    slides.map((slide: AddVideoType, index: number) => {

                                        const videoId = getYoutubeId(slide?.video_url)
                                        const videoSrc = `https://www.youtube.com/embed/${videoId}`
                                        const uniqueId = Date.now().toString() + videoId
                                        return (
                                            <div

                                                key={index}
                                                /* style={{ transform: `translateX(-${currentSlide * 100}%)` }} */
                                                style={{ display: index === currentSlide ? 'block' : 'none' }}

                                                className="object-scale-down w-full h-full 
                   flex flex-shrink-0 flex-grow-0 transition-transform 
                   ease-in-out duration-1000 relative place-items-center place-content-center bg-black text-white"

                                            >
                                                <div className='absolute top-[15px] my-4 '>
                                                    {currentSlide + 1} / {slides.length}
                                                </div>
                                                <div className={`absolute top-[50%] text-center w-full`}>
                                                    Loading...
                                                </div>
                                                <div className={`w-[100%] md:w-[70%] h-[70%] relative`}>
                                                    <iframe
                                                        id={slide?.video_guid}
                                                        src={videoSrc}
                                                        className="absolute top-0 left-0 w-full h-full"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    />
                                                </div>

                                                <div className={`absolute bottom-[15px] w-full z-[20px] px-5 py-7 bg-black/80`}
                                                    id="vstitle"
                                                >
                                                    <div className={` text-center text-white text-[14px] font-extralight `}>
                                                        {slide?.video_title}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <button onMouseDown={() => {

                                prev()
                            }} className={`block absolute top-0 bottom-0 
                                                p-[1rem] cursor-pointer left-0 group h-full 
                                                transition duration-1000 ease-in-out`}>
                                <div className={`w-[50px] h-[50px] bg-white/60 rounded-full flex place-content-center place-items-center group-hover:bg-white/30
                                                        transition duration-500 ease-in-out`}>
                                    <BiChevronLeft className=' stroke-white fill-black w-[2rem] h-[2rem]' />
                                </div>

                            </button>
                            <button onMouseDown={next} className={`block absolute top-0 bottom-0 
                                                    p-[1rem] cursor-pointer ${maximized ? 'right-0' : 'right-5 md:right-0'}  group 
                                                     transition duration-1000 ease-in-out`}>

                                <div className={`w-[50px] h-[50px] bg-white/60 rounded-full flex place-content-center place-items-center group-hover:bg-white/30
                                                        transition duration-500 ease-in-out`}>
                                    <BiChevronRight className=' stroke-white fill-black w-[2rem] h-[2rem]' />
                                </div>
                            </button>

                            {/** close button handle */}
                            <div
                                onMouseDown={() => handleClose()}
                                className={`w-[30px] h-[30px] z-[300] bg-white
                                                    flex place-content-center place-items-center
                                                    rounded-full absolute left-2 top-2 cursor-pointer
                                                    hover:bg-white/40 transition duration-1000 ease-in-out`}>
                                <IoClose className={`text-[30px]`} />
                            </div>

                            {/** Maximize or Minimize */}
                            <div
                                onClick={() => { setMaximized(!maximized) }}
                                className={`w-[30px] h-[30px] z-[300] bg-white flex place-content-center place-items-center rounded-full absolute top-2 right-2 cursor-pointer hover:bg-white/40 transition duration-1000 ease-in-out`}>
                                {
                                    maximized ?
                                        <FaMinimize className={`text-[20px]`} />
                                        :
                                        <FaMaximize className={`text-[20px]`} />
                                }
                            </div>
                        </div>
                        <div className={`${maximized ? 'hidden' : 'hidden md:block md:col-span-3'}   px-5 overflow-x-hidden overflow-y-auto h-full bg-white`}>
                            <h1 className=' text-[22px] my-4 font-sans font-extrabold tracking-tight leading-[24px]'>Videos for {listing && listing.title}</h1>
                            <div className=' my-4 '>{currentSlide + 1} / {slides.length}</div>
                            <hr />
                            <div className={`my-4 whitespace-pre-line border-b pb-2`}>{slides[currentSlide].video_title}</div>

                            {
                                slides[currentSlide].video_description &&
                                <div className={`my-4 whitespace-pre-line  pt-0 pb-8 `}>
                                    <div className={`font-bold text-lg mb-3`}>
                                        Description
                                    </div>
                                    <div>
                                        {slides[currentSlide].video_description}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
            {children}
        </VideoSliderContext.Provider>
    )
}
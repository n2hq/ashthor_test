import { createContext, useContext, useState } from "react";
import { useVideoSliderContext } from "./VideoSliderContext";
import { IoClose } from "react-icons/io5";
import { BiChevronLeft } from "react-icons/bi";

const VideoGalleryContext = createContext<any | null>(null)

export function useVideoGalleryContext() {
    const context = useContext(VideoGalleryContext)
    if (!context) {
        return null
    }
    return context
}

export const VideoGalleryProvider = ({ children }: any) => {
    const [show, setShow] = useState(false)
    const [videoGallery, setVideoGallery] = useState<any>(null)
    const [listing, setListing] = useState<any>(null)
    const [outVideo, setOutVideo] = useState<any>(null)
    const slider = useVideoSliderContext()


    const showCarousel = (index: number) => {
        //setSelectedSlide(index)
        //setOverlay(true)

        slider.setDialog(true)
        slider.setSelectedSlide(index + 1)
        slider.setGallery(videoGallery)
        slider.setListing(listing)

    }


    let vals = {
        setShow,
        setVideoGallery,
        setListing,
        setOutVideo
    }

    return (
        <VideoGalleryContext.Provider value={vals}>
            {
                show &&
                <div
                    onMouseDown={(e) => setShow(false)}
                    className={`flex w-screen h-screen bg-black/80 
                                   z-[20000] fixed top-0 left-0 right-0 bottom-0
                                   place-items-center place-content-center px-[15px]`}>
                    <div
                        onMouseDown={(e) => e.stopPropagation()}
                        className={`w-[95%] sm:w-[85%] md:w-[75%] lg:w-[70%] xl:w-[60%] h-[70%] max-h-[80%] 
                                       mx-auto bg-white rounded-lg shadow-lg shadow-black/50 
                                       space-y-6 z-[3100] overflow-hidden`}>

                        <div className={`w-full h-full`}>
                            <div className={`border-b py-3 px-3`}>
                                <div className={`font-bold text-gray-700
                                               text-xl w-[80%]  truncate`}>
                                    Gallery for {listing?.title}
                                </div>
                            </div>
                            <div className={` 
                                           h-full overflow-y-auto pt-2 px-2 pb-2
                                           bg-white `}>
                                <div className={`grid grid-cols-4 md:grid-cols-6 gap-2`}>
                                    {
                                        Array.isArray(outVideo) &&
                                        outVideo?.map((video: any, index: number) => {
                                            return (
                                                <div key={index} className={`mb-2`}
                                                    onClick={() => {
                                                        //handleOpen(video)
                                                        showCarousel(index)
                                                    }}
                                                >
                                                    <div

                                                        className={`relative hover:cursor-pointer
                                                             h-[80px] md:h-[100px] lg:h-[120px] rounded-md bg-black
                                                            overflow-hidden border-[5px] border-gray-200`}
                                                    >
                                                        <img
                                                            className={`object-cover w-full h-full`}
                                                            src={video?.videoThumbnail} alt=""
                                                        />

                                                    </div>
                                                    <div className={`mx-[2px] text-[13px] leading-[1.2em] line-clamp-2 mt-[3px]`}>
                                                        {video?.videoTitle}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    {/** close button handle */}
                    <div
                        onMouseDown={() => setShow(false)}
                        className={`w-[30px] h-[30px] z-[300] bg-white
                                           flex place-content-center place-items-center
                                           rounded-full absolute left-2 top-2 cursor-pointer
                                           hover:bg-white/40 transition duration-1000 ease-in-out`}>
                        <BiChevronLeft className={`text-[30px]`} />
                    </div>
                </div>
            }
            {children}
        </VideoGalleryContext.Provider>
    )
}


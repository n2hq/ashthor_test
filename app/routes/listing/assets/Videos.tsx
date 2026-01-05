import { list } from 'postcss'
import React, { useEffect, useRef, useState } from 'react'
import { BsYoutube } from 'react-icons/bs'
import { CgCloseR } from 'react-icons/cg'
import { FaChevronLeft, FaChevronRight, FaYoutube } from 'react-icons/fa'
import { GrClose } from 'react-icons/gr'
import { IoClose, IoImage, IoImagesOutline } from 'react-icons/io5'
import { MdOutlineImage } from 'react-icons/md'
import { RiYoutubeFill } from 'react-icons/ri'
import { useVideoSliderContext } from '~/context/VideoSliderContext'
import { AddVideoType, OutVideoType, VideoGalleryProps } from '~/lib/types'
import ComponentTitle from './ComponentTitle'

const videos = [
    {
        url: "https://youtu.be/fxbCHn6gE3U?si=GneGFZachbQdDEIO",
        title: "The surprising habits of original thinkers"
    },
    {
        url: "https://youtu.be/eHJnEHyyN1Y?si=aHRmeH67S227uGtr",
        title: "6 Tips on Being a Successful Entrepreneur"
    },
    {
        url: "https://youtu.be/1tRTWwZ5DIc?si=j6fNumMdLx5M16_H",
        title: "The INSANE Rise of NVIDIA: From Bankruptcy to $4 Trillion?"
    },
    {
        url: "https://www.youtube.com/watch?v=P6FORpg0KVo",
        title: "How to Make Learning as Addictive as Social Media"
    },
    {
        url: "https://www.youtube.com/watch?v=JpYA7WXkHyI",
        title: "How to be a creative thinker"
    },
    {
        url: "https://www.youtube.com/watch?v=JpYA7WXkHyI",
        title: "How to be a creative thinker"
    },
    {
        url: "https://www.youtube.com/watch?v=JpYA7WXkHyI",
        title: "How to be a creative thinker"
    },
    {
        url: "https://www.youtube.com/watch?v=JpYA7WXkHyI",
        title: "How to be a creative thinker"
    },

]
const Videos = ({ videoGallery, listing }: VideoGalleryProps) => {
    const [outVideo, setOutVideo] = useState<any | null>(null)
    const [rawVideos, setRawVideos] = useState(videos)
    const [open, setOpen] = useState(false)
    const [currentVideo, setCurrentVideo] = useState<any | null>(null)

    const slider = useVideoSliderContext()

    useEffect(() => {

        const remapVideos = async (videoGallery: AddVideoType[] | undefined) => {

            let remappedVideo: any = []
            videoGallery?.map((video: AddVideoType, index: number) => {
                const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
                const match = video.video_url.match(regex);
                let videoId = match ? match[1] : null;
                let thumbnail = `https://img.youtube.com/vi/${videoId}/0.jpg`
                let videoObject: OutVideoType = {
                    videoId: videoId,
                    videoUrl: video.video_url,
                    videoTitle: video.video_title,
                    videoThumbnail: thumbnail,
                    videoGuid: video.video_guid
                }
                remappedVideo.push(videoObject)
            })

            setOutVideo(remappedVideo)
        }

        remapVideos(videoGallery)
    }, [videoGallery])

    const handleClose = () => {

        setOpen(false)
    }

    const handleOpen = (video: any) => {
        setCurrentVideo(video)
        setOpen(true)
    }

    const showCarousel = (index: number) => {
        //setSelectedSlide(index)
        //setOverlay(true)
        slider.setDialog(true)
        slider.setSelectedSlide(index + 1)
        slider.setGallery(videoGallery)
        slider.setListing(listing)
    }

    return (
        <div className={` `}
            id='video'
        >


            <VideoScrollerAlt
                outVideo={outVideo}
                handleOpen={handleOpen}
                showCarousel={showCarousel}
                listing={listing}
            />




        </div>
    )
}

export default Videos

export const ShowVideo = ({ currentVideo, setOpen, open }: any) => {

    const handleClose = () => {
        const iframe: any | null = document.getElementById("yt-iframe");
        iframe.src = iframe.src;
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }

    return (
        <div className={` ${open ? 'fixed' : 'hidden'} z-[20010] top-[0px] left-[0px] w-full h-full bg-black/90`}>

            <div className={`absolute bg-black w-[40px] h-[40px] z-20 rounded-full text-white flex place-items-center place-content-center mt-20 ml-5 hover:cursor-pointer`}
                onClick={() => { handleClose() }}
            >
                <GrClose />
            </div>

            <div className={` relative w-full h-full`}>
                <iframe id="yt-iframe"
                    src={`${open ? `https://www.youtube.com/embed/${currentVideo?.videoId}` : ''}`}
                    className="absolute top-0 left-0 w-full h-full"

                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                >
                </iframe>
            </div>
        </div>
    )
}

export const VideoScrollerAlt = ({ outVideo, handleOpen, showCarousel, listing }: any) => {
    const [openGallery, setOpenGallery] = useState(false)
    const [slideWidth, setSlideWidth] = useState(150)
    const [slideHeight, setSlideHeight] = useState(90)

    const scrollRef = useRef<HTMLDivElement>(null);
    const [videoBar, setVideoBar] = useState<any | null>(null)
    const slider = useVideoSliderContext()
    const [video20, setVideo20] = useState<OutVideoType[]>([])
    const maxSlides = 6
    useEffect(() => {
        if (outVideo) {
            //console.log(outVideo)
            const video20 = outVideo.length > maxSlides ? outVideo.slice(0, maxSlides) : outVideo
            setVideo20(video20)
        }
    }, [outVideo])


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
        <div className={` mt-6 mb-5`}>
            <div className={`px-[12px] md:px-0`}>
                <ComponentTitle title='Videos' />
            </div>
            <div className={`relative w-full max-w-[1100px] mx-auto`}>

                <VideoGallery
                    outVideo={outVideo}
                    openGallery={openGallery}
                    setOpenGallery={setOpenGallery}
                    handleOpen={handleOpen}
                    showCarousel={showCarousel}
                    listing={listing}
                />
                <div
                    ref={scrollRef}
                    className={`w-full px-0 py-0 mt-3 relative flex flex-1 overflow-x-auto bottom-scrollbar-hidden rounded-xl overflow-hidden`}>
                    {/** videos */}
                    <div className={`flex gap-x-3`} id='videobar'>



                        {
                            Array.isArray(video20) &&
                            Array.from({ length: maxSlides }, (_, i) => {
                                return (
                                    <div key={i}>
                                        {
                                            i < maxSlides && i < video20?.length ?
                                                <div key={video20[i]?.videoGuid} className={` w-[${slideWidth}px] min-w-[${slideWidth}px] relative z-[3] hover:cursor-pointer border  rounded-xl overflow-hidden hover:bg-white/50`}
                                                    /*  onClick={() => { handleOpen(video) }} */
                                                    onClick={() => showCarousel(i)}
                                                >

                                                    {/** video thumbnail */}
                                                    <div className={`relative w-full h-[${slideHeight}px]   z-[2]`}
                                                    >
                                                        {/** youtube logo */}
                                                        <div className={`absolute top-0 left-0 w-full h-full bg-transparent  z-[3] hover:bg-white/40`}>
                                                            <RiYoutubeFill size={20} className={`text-white absolute top-0.5 right-1 `} />
                                                        </div>

                                                        <img src={video20[i]?.videoThumbnail} alt={video20[i]?.videoTitle} className={`object-cover w-full h-full`} />

                                                        {/** bottom title */}
                                                        <div className={` block w-full absolute z-[3] text-white bottom-0 px-2 py-[5px] bg-black/80 `}>

                                                            <div className={`w-full text-white bottom-0  `}>

                                                                <div className={` text-[12px] leading-[1.2em] line-clamp-1`}>
                                                                    {video20[i]?.videoTitle}
                                                                </div>

                                                            </div>
                                                        </div>


                                                    </div>
                                                </div> :
                                                <div className={`w-[${slideWidth}px] h-full border flex place-items-center place-content-center hover:cursor-pointer hover:bg-gray-300 bg-gray-200 rounded-xl `}
                                                    onClick={() => {
                                                        setOpenGallery(true)
                                                    }}
                                                >
                                                    <div className={`text-white/60 w-[85%] text-center rounded-xl h-[75%] border border-dashed border-black/30 flex place-items-center place-content-center text-[23px]`}>
                                                        <MdOutlineImage />
                                                    </div>
                                                </div>
                                        }
                                    </div>
                                )
                            })}

                        {/** last slide that opens gallery */}
                        <div className={`w-[${slideWidth}px] h-full border border-gray-200 rounded-xl flex place-items-center place-content-center hover:cursor-pointer hover:bg-gray-300 bg-gray-200`}
                            onClick={() => {
                                setOpenGallery(true)
                            }}
                        >
                            <div className={`text-white/60 w-[85%] text-center rounded-none h-[75%] border border-dashed border-black/30 flex place-items-center place-content-center `}>
                                <div className={`text-white w-1/2 text-center rounded`}>All Videos</div>
                            </div>

                        </div>

                    </div>


                </div>

                {/** navlinks */}
                {/** left arrow */}
                <div className={`absolute text-white top-1/2 -translate-y-1/2 left-2 w-[40px] min-w-[40px] h-[40px] bg-black/50 hover:bg-white/70 hover:text-black flex place-content-center place-items-center hover:cursor-pointer border-[1px] border-gray-400 rounded z-[5]`}
                    onClick={() => { scrollLeft() }}
                >
                    <FaChevronLeft />
                </div>


                {/** right arrow */}
                <div className={`absolute text-white top-1/2 -translate-y-1/2 right-2 w-[40px] min-w-[40px] h-[40px] bg-black/50 hover:bg-white/70 hover:text-black flex place-content-center place-items-center hover:cursor-pointer border-[1px] border-gray-400 rounded z-[5]`}
                    onClick={() => { scrollRight() }}
                >
                    <FaChevronRight />
                </div>
            </div>
        </div>
    )
}



export const VideoGallery = ({ outVideo, openGallery,
    setOpenGallery, handleOpen, showCarousel, listing }: any) => {

    return (
        <>
            {
                openGallery &&
                <div
                    onMouseDown={(e) => setOpenGallery(false)}
                    className={`flex w-screen h-screen bg-black/40 
                        z-[20000] fixed top-0 left-0 right-0 bottom-0
                        place-items-center place-content-center px-[15px]`}>
                    <div
                        onMouseDown={(e) => e.stopPropagation()}
                        className={`min-w-[95%] w-[95%] sm:w-[95%] md:w-[80%] h-[80%] max-h-[80%] 
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
                        onMouseDown={() => setOpenGallery(false)}
                        className={`w-[50px] h-[50px] z-[300] bg-white
                                flex place-content-center place-items-center
                                rounded-full absolute left-2 top-2 cursor-pointer
                                hover:bg-white/40 transition duration-1000 ease-in-out`}>
                        <IoClose className={`text-[30px]`} />
                    </div>
                </div>
            }
        </>
    )
}
import React, { useEffect, useRef, useState } from 'react'
import { BiStar } from 'react-icons/bi'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useVideoGalleryContext } from '~/context/VideoGalleryContext';
import { useVideoSliderContext } from '~/context/VideoSliderContext';
import { AddVideoType, ListingType, OutVideoType } from '~/lib/types';

const videos = [
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


interface VideosProps {
    listing: ListingType
    videoGallery: AddVideoType[]
}
const Videos = ({ videoGallery, listing }: VideosProps) => {

    const scrollRef = useRef<HTMLDivElement>(null);
    const [outVideo, setOutVideo] = useState<any | null>(null)
    const [rawVideos, setRawVideos] = useState(videos)
    const [open, setOpen] = useState(false)
    const [currentVideo, setCurrentVideo] = useState<any | null>(null)
    const slider = useVideoSliderContext()
    const videoGalleryCtx = useVideoGalleryContext()


    const [video20, setVideo20] = useState<OutVideoType[]>([])
    const maxSlides = 6


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


    const showCarousel = (index: number) => {
        //setSelectedSlide(index)
        //setOverlay(true)
        console.log(videoGallery)
        slider.setDialog(true)
        slider.setSelectedSlide(index + 1)
        slider.setGallery(videoGallery)
        slider.setListing(listing)
    }

    const showVideoGallery = () => {
        videoGalleryCtx.setShow(true)
        videoGalleryCtx.setOutVideo(outVideo)
        videoGalleryCtx.setListing(listing)
        videoGalleryCtx.setVideoGallery(videoGallery)

    }

    return (
        <div className={`border-t py-10`}>
            <div className=''>
                <div className={`flex place-content-between place-items-baseline`}>
                    <div className={`text-[22px] md:text-[25px] font-semibold`}>
                        Videos
                    </div>

                    <div className={`underline text-base cursor-pointer w-fit`}
                        onClick={() => showVideoGallery()}
                    >
                        Gallery
                    </div>
                </div>

                <div className={`mt-6 relative`}>
                    <div ref={scrollRef} className={`flex place-items-start w-full overflow-x-hidden gap-4 rounded-xl`}>
                        {
                            outVideo?.map((item: OutVideoType, i: number) => {
                                return (
                                    <div
                                        onClick={() => {
                                            //handleOpen(video)
                                            showCarousel(i)
                                        }}
                                        key={i}
                                        className={`flex flex-col cursor-pointer w-[250px] min-w-[250px] `}
                                    >
                                        <div className={`relative w-full  h-[180px] min-h-[180px] rounded-xl overflow-hidden`}>
                                            <img
                                                src={item.videoThumbnail}
                                                alt=""
                                                className={`object-cover h-full w-full`}
                                            />
                                        </div>
                                        <div className={`mt-4 relative  `}>
                                            <div className={`text-base leading-[1.2em] line-clamp-3`}>
                                                {item.videoTitle}
                                            </div>


                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    {/** navlinks */}
                    {/** left arrow */}
                    {
                        outVideo?.length > 0 &&
                        <div>
                            <div className={`absolute text-black top-1/2 -translate-y-1/2 left-2 w-[40px] min-w-[40px] h-[40px] bg-white hover:bg-white/70 hover:text-black flex place-content-center place-items-center hover:cursor-pointer border-[1px] border-gray-400 rounded-full z-[5]`}
                                onClick={() => { scrollLeft() }}
                            >
                                <FaChevronLeft />
                            </div>


                            {/** right arrow */}
                            <div className={`absolute text-black top-1/2 -translate-y-1/2 right-2 w-[40px] min-w-[40px] h-[40px] bg-white hover:bg-white/70 hover:text-black flex place-content-center place-items-center hover:cursor-pointer border-[1px] border-gray-400 rounded-full z-[5] transition-all ease-in-out duration-1000`}
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

export default Videos

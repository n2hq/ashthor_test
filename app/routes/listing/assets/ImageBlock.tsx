import React, { useEffect, useState } from 'react'
import { MdOutlineImage } from 'react-icons/md';
import { useGallery } from '~/context/GalleryContext';
import { useSliderContext } from '~/context/SliderContext';
import { config } from '~/lib/lib'

type Image = {
    id?: number;
    image_url?: string;
    alt?: string;
};

type MasonryProps = {
    images: Image[];
    listing: any
};

const ImageBlock = ({ images, listing }: any) => {
    const [items, setItems] = useState<Image[]>([]);
    const slider = useSliderContext()
    const gallery = useGallery()

    const [placeholder, setPlaceholder] = useState('images/abstract_placeholder.jpg')
    const [shortGallery, setShortGallery] = useState<Image[]>([])

    useEffect(() => {
        let shortGallery = [...items]

        if (images) {
            images?.map((image: any, index: number) => {
                if (index + 1 < 12) {
                    shortGallery.push(image)
                }

            })

            setShortGallery(shortGallery)
        }
    }, [images])

    const showCarousel = (index: number) => {
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
            <div className={`w-full h-auto mb-[32px] flex flex-col gap-2`}>
                <ComposeImages imgs={images} showCarousel={showCarousel} index={0} showGallery={showGallery} />
            </div>


        </div>
    )
}

export default ImageBlock



export interface BlockProp {
    index: number
    imgs: Image[]
    showCarousel?: (index: number) => void
    showGallery?: (index: number) => void
}
export function SingleBlock({ index, imgs, showCarousel }: BlockProp) {
    const [loaded, setLoaded] = useState(false)
    const handleShadowDelay = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoaded(true)
    }

    useEffect(() => {
        handleShadowDelay()
    }, [])

    return (
        <div className={` overflow-hidden bg-gray-200 
                    relative cursor-pointer w-full h-full`}>

            {
                (loaded && imgs[index]?.image_url !== undefined && imgs[index]?.image_url !== null) &&
                <div className={`w-full h-[30%] absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-gray-800`}>

                </div>
            }
            {
                imgs[index]?.image_url !== undefined && imgs[index]?.image_url !== null ?
                    <img
                        src={config.IMG_BASE_URL + imgs[index]?.image_url}
                        alt=""
                        className={`object-cover h-full w-full`}
                    /> :
                    <div className={`w-full h-full px-3 py-3 flex place-content-center place-items-center`}>
                        <div className={` w-full h-full border border-dashed border-white text-[20px] rounded-lg flex place-content-center place-items-center text-white`}>
                            <MdOutlineImage />
                        </div>
                    </div>
            }
        </div>


    )
}


export function ComposeImages({ imgs, index, showCarousel, showGallery }: BlockProp) {
    const [imageTotal, setImageTotal] = useState(0)
    const [images, setImages] = useState<Image[]>([])

    useEffect(() => {
        if (imgs?.length > 0) {
            console.log(imgs)
            setImageTotal(imgs.length)
            setImages(imgs)
        }
    }, imgs)



    return (
        <>
            {
                imageTotal === 1 && <div className={`h-[400px] rounded-xl overflow-hidden
                grid grid-cols-12`}>
                    <div className={`col-span-12 
                    row-span-2 overflow-hidden shadow-gray-500`}
                        onMouseDown={(e) => showCarousel && showCarousel(index)}
                    >
                        <SingleBlock imgs={images} index={0} />
                    </div>
                </div>
            }


            {
                imageTotal === 2 && <div className={`h-[400px] rounded-xl overflow-hidden
                grid grid-cols-12 gap-[5px]`}>
                    <div className={`col-span-7 bg-black
                    row-span-2 overflow-hidden
                    relative cursor-pointer`}
                        onMouseDown={(e) => showCarousel && showCarousel(0)}
                    >
                        <SingleBlock imgs={images} index={0} />
                    </div>


                    <div className={`col-span-5 bg-black
                    row-span-2 overflow-hidden
                    relative cursor-pointer`}
                        onMouseDown={(e) => showCarousel && showCarousel(1)}
                    >
                        <SingleBlock imgs={images} index={1} />
                    </div>
                </div>
            }


            {
                imageTotal === 3 && <div className={`h-[400px] rounded-xl overflow-hidden
                grid grid-cols-12 gap-[5px]`}>

                    <div className={`col-span-7 row-span-2 overflow-hidden`}
                        onMouseDown={(e) => showCarousel && showCarousel(0)}
                    >
                        <SingleBlock imgs={images} index={0} />
                    </div>

                    <div className={`col-span-5 overflow-hidden`}
                        onMouseDown={(e) => showCarousel && showCarousel(1)}
                    >
                        <SingleBlock imgs={images} index={1} />

                    </div>
                    <div className={`col-span-5 overflow-hidden
                    `}
                        onMouseDown={(e) => showCarousel && showCarousel(2)}
                    >
                        <SingleBlock imgs={images} index={2} />
                    </div>
                </div>
            }

            {
                imageTotal >= 4 && <div className={`space-y-[5px]`}>
                    <div className={`h-[300px]
                grid grid-cols-12 gap-[5px] rounded-t-xl overflow-hidden`}>

                        <div className={`col-span-7 row-span-2 overflow-hidden `}
                            onMouseDown={(e) => showCarousel && showCarousel(0)}
                        >
                            <SingleBlock imgs={images} index={0} />
                        </div>

                        <div className={`col-span-5 overflow-hidden`}
                            onMouseDown={(e) => showCarousel && showCarousel(1)}
                        >
                            <SingleBlock imgs={images} index={1} />

                        </div>
                        <div className={`col-span-5 overflow-hidden
                    `}
                            onMouseDown={(e) => showCarousel && showCarousel(2)}
                        >
                            <SingleBlock imgs={images} index={2} />
                        </div>
                    </div>


                    <div className={`grid grid-cols-5 gap-[5px] h-[100px] rounded-bl-xl overflow-hidden`}>

                        <div className={`overflow-hidden`}
                            onMouseDown={(e) => showCarousel && showCarousel(3)}
                        >
                            <SingleBlock imgs={images} index={3} />
                        </div>
                        <div className={`overflow-hidden`}
                            onMouseDown={(e) => showCarousel && showCarousel(4)}
                        >
                            <SingleBlock imgs={images} index={4} />
                        </div>
                        <div className={`overflow-hidden`}
                            onMouseDown={(e) => showCarousel && showCarousel(5)}
                        >
                            <SingleBlock imgs={images} index={5} />
                        </div>


                        {

                            <div className={`overflow-hidden`}
                                onMouseDown={(e) => showCarousel && showCarousel(6)}
                            >
                                <SingleBlock imgs={images} index={6} />
                            </div>
                        }


                        <div className={`rounded-br-xl overflow-hidden
                    relative bg-gray-200 text-white cursor-pointer
                    flex place-content-center place-items-center h-[100px]
                    bg-cover`}
                            onMouseDown={(e) => showGallery && showGallery(0)}
                            style={{ backgroundImage: `url("/images/abstract_placeholder.jpg")` }}
                        >
                            <div className={` absolute top-0 left-0 right-0 bottom-0 bg-black/20`}></div>
                            {images?.length > 7 ? `+${images.length - 7}` : 'View all'}
                        </div>
                    </div>

                </div>
            }
        </>
    )
}
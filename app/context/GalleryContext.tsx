import { createContext, useContext, useEffect, useState } from "react";
import { FcCancel } from "react-icons/fc";
import { IoClose } from "react-icons/io5";
import { useSliderContext } from "./SliderContext";
import { BiChevronLeft } from "react-icons/bi";

const GalleryContext = createContext<any | null>(null)

export default GalleryContext

export function useGallery() {
    const context = useContext(GalleryContext)

    /* if (!context) {
        throw new Error("useGallery must be used within a GalleryProvider")
    } */
    return context
}

type Image = {
    id: number;
    image_url: string;
    alt: string;
};

type MasonryProps = {
    images: Image[];
};

export const GalleryProvider = ({ children }: any) => {
    const [show, setShow] = useState(false)
    const [gallery, setGallery] = useState<any>(null)
    const slider = useSliderContext()
    const [listing, setListing] = useState<any>(null)
    const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL

    const handleClose = () => setShow(false)
    let vals = {
        setShow, setGallery,
        setListing
    }

    const showCarousel = (index: number) => {

        slider.setDialog(true)
        slider.setSelectedSlide(index + 1)
        slider.setGallery(gallery)
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleClose()
            }
        }

        if (show) {
            document.addEventListener('keydown', handleKeyDown)
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [show])

    useEffect(() => {
        if (gallery) {
            console.log(gallery)
        }
    }, [gallery])
    return (
        <GalleryContext.Provider value={vals}>
            {
                show &&
                <div
                    onMouseDown={(e) => setShow(false)}
                    className={`flex w-screen h-screen bg-black/80 
                        z-[20000] fixed top-0 left-0 right-0 bottom-0
                        place-items-center place-content-center px-[15px]`}
                >
                    <div
                        onMouseDown={(e) => e.stopPropagation()}
                        className={`w-[95%] sm:w-[85%] md:w-[75%] lg:w-[70%] xl:w-[60%] h-[70%] 
                            mx-auto bg-white rounded-lg shadow-lg border
                            space-y-6 z-[3100] overflow-hidden`}>

                        <div className={`w-full h-full`}>
                            <div className={`border-b py-3 px-3`}>
                                <div className={`font-bold text-gray-700
                                    text-xl w-[80%]  truncate`}>
                                    Gallery for {listing && listing?.title}
                                </div>
                            </div>
                            <div className={` 
                                h-[90%] overflow-y-auto pt-2 px-2 pb-2
                                bg-white `}>
                                <div className={`grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 h-auto`}>
                                    {gallery &&
                                        gallery?.map((image: any, index: number) => {
                                            return (
                                                <div key={index}>
                                                    <div
                                                        onClick={() => showCarousel(index)}
                                                        className={`relative hover:cursor-pointer
                                                 bg-red-200 h-[80px] md:h-[100px] lg:h-[120px] rounded-md
                                                 overflow-hidden`}>
                                                        <img
                                                            className={`object-cover w-full h-full`}
                                                            src={IMG_BASE_URL + image.image_url} alt="" />
                                                    </div>
                                                    <div className={`line-clamp-2 leading-[1.2em] text-sm mt-2`}>
                                                        {image?.image_title}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className={`h-4`}></div>
                            </div>
                        </div>
                    </div>
                    {/** close button handle */}
                    <div
                        onMouseDown={() => handleClose()}
                        className={`w-[30px] h-[30px] z-[300] bg-white
                                flex place-content-center place-items-center
                                rounded-full absolute left-2 top-2 cursor-pointer
                                hover:bg-white/40 transition duration-1000 ease-in-out`}>
                        <BiChevronLeft className={`text-[30px]`} />
                    </div>
                </div>
            }
            {children}
        </GalleryContext.Provider>
    )
}
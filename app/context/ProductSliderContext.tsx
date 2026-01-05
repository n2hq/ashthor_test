import { createContext, useContext, useEffect, useRef, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { FaMaximize, FaMinimize } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const ProductSliderContext = createContext<any | null>(null)

export function useProductSliderContext() {
    const context = useContext(ProductSliderContext)
    if (!context) {
        console.log(`Wrap product slider Provider around this component.`)
        return null
    }
    return context
}

const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL

export const ProductSliderProvider = ({ children }: any) => {
    const [dialog, setDialog] = useState<any>(false)
    const [selectedSlide, setSelectedSlide] = useState<any>(null)
    const [slides, setGallery] = useState<any>(false)
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
        <ProductSliderContext.Provider value={vals}>
            {
                dialog &&
                <div className={`flex w-full h-full bg-white z-[20001] 
                fixed top-0 left-0 right-0 bottom-0 `}>
                    <div className={`grid grid-cols-12 gap-0 w-full`}>
                        <div className={`${maximized ? 'col-span-12' : 'col-span-12 md:col-span-9'} w-full h-full relative bg-black flex`}>
                            <div className={` w-full h-screen flex overflow-hidden place-items-center place-content-center`}>
                                {
                                    slides && selectedSlide &&
                                    slides.map((slide: any, index: any) => {

                                        return (
                                            <div className={`w-full h-full flex flex-shrink-0 flex-grow-0 transition-transform  place-content-center place-items-center  relative
                                            ease-in-out duration-1000`}
                                                style={{ display: index === currentSlide ? 'block' : 'none' }}
                                            >

                                                <div className={`absolute top-10`}>
                                                    <div className='text-white text-center '>{currentSlide + 1} / {slides.length}</div>
                                                </div>


                                                <div className={`w-[100%] md:w-[70%] h-[70%]`}>
                                                    <img
                                                        onTouchStart={handleTouchStart}
                                                        onTouchEnd={handleTouchEnd}
                                                        key={index}
                                                        src={IMG_BASE_URL + slide.product_image_url}
                                                        alt=""
                                                        className={`object-scale-down w-full h-full `}
                                                    />
                                                </div>


                                                <div className={`absolute bottom-[15px] w-full z-[20px] px-5 py-7 bg-black/30`}>
                                                    <div className={` text-center text-white font-extralight text-[13px]`}>
                                                        {slide?.product_title}
                                                    </div>

                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <button onMouseDown={prev} className={`block absolute top-0 bottom-0 
                                                p-[1rem] cursor-pointer left-0 group h-full 
                                                transition duration-1000 ease-in-out`}>
                                <div className={`w-[50px] h-[50px] bg-white/60 rounded-full flex place-content-center place-items-center group-hover:bg-white/30
                                                        transition duration-500 ease-in-out`}>
                                    <BiChevronLeft className=' stroke-white fill-black w-[2rem] h-[2rem]' />
                                </div>

                            </button>
                            <button onMouseDown={next} className={`block absolute top-0 bottom-0 
                                                    p-[1rem] cursor-pointer ${maximized ? 'right-0' : 'right-0 md:right-0'} group 
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
                        <div className={`${maximized ? 'hidden' : 'hidden md:block md:col-span-3'} px-5`}>
                            <h1 className=' text-[22px] my-4 font-sans font-extrabold tracking-tight leading-[24px]'>Products for {listing && listing.title}</h1>
                            <div className=' my-4 '>{currentSlide + 1} / {slides.length}</div>
                            <hr />
                            <div className=' my-4 whitespace-pre-line'>
                                {slides[currentSlide].product_title}
                            </div>

                            {
                                slides[currentSlide].product_description &&
                                <div className=' my-4 whitespace-pre-line'>
                                    {slides[currentSlide].product_description}
                                </div>
                            }
                            <div className=' mt-8 whitespace-pre-line'>

                                <a
                                    target="_product"
                                    href={slides[currentSlide].product_link}
                                    className={`bg-gray-500 text-white px-12 py-4 text-center rounded-md cursor-pointer hover:shadow-lg hover:shadow-gray-300`}                                    >
                                    Continue
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {children}
        </ProductSliderContext.Provider>
    )
}
import { createContext, useContext, useState } from "react";
import { useProductSliderContext } from "./ProductSliderContext";
import { ListingType, ProductType } from "~/lib/types";
import { IoClose } from "react-icons/io5";
import { CgChevronDoubleLeft, CgClose } from "react-icons/cg";
import { config } from "~/lib/lib";
import { BiChevronLeft } from "react-icons/bi";

const ProductGalleryContext = createContext<any | null>(null)

export function useProductGalleryContext() {
    const context = useContext(ProductGalleryContext)
    if (!context) {
        return null
    }
    return context
}

export const ProductGalleryProvider = ({ children }: any) => {
    const [show, setShow] = useState(false)
    const [products, setProducts] = useState<ProductType[]>()
    const [listing, setListing] = useState<ListingType>()
    const [galleryDaialog, setGalleryDialog] = useState(false)
    const productSlider = useProductSliderContext()


    const showProductSlider = (currentSlide: number) => {
        productSlider.setDialog(true)
        productSlider.setSelectedSlide(currentSlide + 1)
        productSlider.setGallery(products)
        productSlider.setListing(listing)
    }




    let vals = {
        setProducts,
        setListing,
        setShow
    }
    return (
        <ProductGalleryContext.Provider value={vals}>
            {
                show &&
                <div>
                    <div className={`fixed bg-black/80 w-screen h-screen top-0 left-0 z-[3000]`}>
                        <div className={` w-full h-full flex place-content-center place-items-center`}
                            onMouseDown={(e) => setShow(false)}
                        >
                            {/** gallery body */}
                            <div className={`max-w-[90%] w-full mx-auto bg-white h-[80%] rounded-lg`}
                                onMouseDown={(e) => e.stopPropagation()}
                            >
                                {/** gallery header */}
                                <div className={` border-b px-5 py-3`}>
                                    <div className={`flex place-content-between place-items-center`}>
                                        <div className={`text-[17px] font-semibold`}>
                                            Products for {listing?.title}
                                        </div>
                                        <div className={``}

                                        >

                                        </div>
                                    </div>
                                </div>

                                {/** gallery scrollable */}
                                <div className={` w-full h-[90%] overflow-y-auto`}>
                                    <div className={`w-full h-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-5 px-5 py-5 `}>
                                        {
                                            products?.map((product: ProductType, index: number) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className={` rounded-md block hover:shadow-md hover:cursor-pointer`}
                                                        onClick={() => { showProductSlider(index) }}
                                                    >
                                                        <div className={` w-full h-[150px] relative `}>
                                                            <img
                                                                src={config.IMG_BASE_URL + product.product_image_url}
                                                                alt=""
                                                                className={` object-cover w-full h-full`}
                                                            />
                                                        </div>
                                                        <div className={`mt-3 text-center line-clamp-2 leading-[1.4em]`}>
                                                            {
                                                                product?.product_title
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
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
                    </div>
                </div>
            }
            {children}
        </ProductGalleryContext.Provider>
    )
}
import React, { useRef } from 'react'
import { BiStar } from 'react-icons/bi'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useProductGalleryContext } from '~/context/ProductGalleryContext';
import { useProductSliderContext } from '~/context/ProductSliderContext';
import { config } from '~/lib/lib';
import { ListingType, ProductType } from '~/lib/types';

const products = [
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

interface ProductsProps {
    listing: ListingType
    products: ProductType[]
}

const Products = ({ listing, products }: ProductsProps) => {

    const scrollRef = useRef<HTMLDivElement>(null);
    const productSlider = useProductSliderContext()
    const productCtx = useProductGalleryContext()


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

    const showCarousel = (currentSlide: number) => {
        productSlider.setDialog(true)
        productSlider.setSelectedSlide(currentSlide + 1)
        productSlider.setGallery(products)
        productSlider.setListing(listing)
    }


    const showProductGallery = () => {

        productCtx.setShow(true)
        productCtx.setListing(listing)
        productCtx.setProducts(products)
    }


    return (
        <div className={`border-t py-10`}>
            <div className=''>
                <div className={`flex place-content-between place-items-baseline`}>
                    <div className={`text-[22px] md:text-[25px] font-semibold`}>
                        Products
                    </div>

                    <div className={`underline text-base cursor-pointer w-fit`}
                        onClick={() => showProductGallery()}
                    >
                        Gallery
                    </div>
                </div>

                <div className={`mt-6 relative`}>
                    <div ref={scrollRef} className={`flex place-items-center overflow-x-hidden gap-4 rounded-xl`}>
                        {
                            products?.map((item: ProductType, i: number) => {
                                return (
                                    <div key={i}
                                        className={`w-[250px] min-w-[250px] cursor-pointer`}
                                        onClick={() => { showCarousel(i) }}
                                    >
                                        <div className={`relative w-full h-[180px] rounded-xl overflow-hidden`}>
                                            <img
                                                src={config.IMG_BASE_URL + item.product_image_url}
                                                alt=""
                                                className={`object-cover h-full w-full`}
                                            />
                                        </div>
                                        <div className={`mt-4 `}>
                                            <div className={`text-[14px] leading-[1.2em]`}>
                                                {item.product_title}
                                            </div>

                                            <div className={`mt-2 relative`}>

                                                <div className={`text-sm line-clamp-2`}>
                                                    {item.product_description} reviews among one of the best increases of time.
                                                </div>
                                                <div></div>
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
                        products?.length > 0 &&
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

export default Products

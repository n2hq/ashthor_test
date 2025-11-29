import { LoaderFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import React, { useEffect } from 'react'
import Footer from '~/components/footer/Footer';
import FooterAlt from '~/components/footer/FooterAlt';
import MainNav from '~/components/header/latest/MainNav';
import { getBusinessByCategoryAndCity } from '~/lib/lib';

export const loader: LoaderFunction = async ({ params }) => {
    const { category, city } = params;
    // Fetch businesses from DB
    const businesses = await getBusinessByCategoryAndCity(category!, city!);


    return ({ category, city, businesses });
};


const index = () => {


    const { category, city, businesses } = useLoaderData<typeof loader>();

    console.log(businesses)



    return (
        <div className='p-6 bg-gray-50'>
            <MainNav />


            <div className={`w-full `}>
                <div className={`max-w-[1100px] mx-auto w-full`}>
                    <div>
                        <h1 className="text-3xl font-bold">
                            Best <span className={`font-light font-serif italic`}>{category}</span> in <span className={`font-light font-serif italic`}>{city}</span>
                        </h1>

                        <p className="mt-2 text-gray-600">
                            Explore verified {category} services in {city}. View contact info, working hours, and reviews.
                        </p>
                    </div>
                    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6`}>
                        <div className={`md:col-span-8`}>


                            <div className="mt-6 grid grid-cols-1 gap-4">
                                {
                                    businesses?.length > 0 ?
                                        businesses.map((b: any, index: number) => (
                                            <div className={`group`} key={index}>
                                                <Link to={`/${b.username ? b.username : b.gid}`}>
                                                    <div key={b.id} className="border-b border-blue-200 py-4">
                                                        <h2 className={`text-2xl font-normal text-[#1a0dab] group-hover:underline`}>

                                                            {b.title}

                                                        </h2>
                                                        <p>{b.address_one} {b.address_two && `, ${b.address_two}`}</p>
                                                        <p className={`mt-3`}>
                                                            {b.short_description}
                                                        </p>
                                                        <p className="text-sm mt-2">{b.phone}</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        )) :
                                        <div className={`text-xl text-[#1a0dab]`}>
                                            We didn't find any!
                                        </div>
                                }
                            </div>
                        </div>
                        <div className={`md:col-span-4`}>

                        </div>
                    </div>
                </div>
            </div>


            <div className={`h-[54px]`}></div>
            <FooterAlt />
        </div>
    )
}

export default index

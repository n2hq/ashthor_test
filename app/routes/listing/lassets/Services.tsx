import { Link } from '@remix-run/react'
import React from 'react'
import { BiCar, BiKnife, BiWifi } from 'react-icons/bi'
import { BsInstagram, BsTwitterX } from 'react-icons/bs'
import { FaFacebook, FaLinkedin, FaPinterest, FaSwimmingPool, FaTv, FaVimeo } from 'react-icons/fa'
import { FaElevator, FaWater } from 'react-icons/fa6'
import { GiBathtub } from 'react-icons/gi'
import { MdWash } from 'react-icons/md'
import { TbAirConditioning, TbWashDry } from 'react-icons/tb'
import { useReadMoreContext } from '~/context/ReadMoreAboutContext'
import { useReadMoreWithUrlContext } from '~/context/ReadMoreWithUrlContext'
import { ServiceType } from '~/lib/types'

const services = [
    {
        service_name: "Business Development",
        icon: <FaFacebook />,
        url: `http://facebook.com/`
    },
    {
        service_name: "Business Registration",
        icon: <BsTwitterX />,
        url: `http://x.com/`
    },
    {
        service_name: "Real Estate",
        icon: <BsInstagram />,
        url: `http://instagram.com/`
    },
    {
        service_name: "Software Marketing",
        icon: <FaPinterest />,
        url: `http://pinterest.com/`
    },
    {
        service_name: "Sales Management",
        icon: <FaVimeo />,
        url: `http://vimeo.com/`
    },
    {
        service_name: "Adverts Management",
        icon: <FaLinkedin />,
        url: `http://linkedin.com/`
    },
    {
        service_name: "Social Media Mkting",
        icon: <FaLinkedin />,
        url: `http://linkedin.com/`
    },
    {
        service_name: "Hotel Concierge",
        icon: <FaLinkedin />,
        url: `http://linkedin.com/`
    },
    {
        service_name: "Booking & Ticketing",
        icon: <FaLinkedin />,
        url: `http://linkedin.com/`
    },
]

interface ServicesProps {
    services: ServiceType[] | null
}
const Services = ({ services }: ServicesProps) => {
    const readMoreCtx = useReadMoreWithUrlContext()

    const handleShowService = (service: ServiceType) => {
        readMoreCtx?.setShow(true)
        readMoreCtx?.setDescription(service.service_description)
        readMoreCtx?.setTitle(service.service_name)
        readMoreCtx?.setUrl(service.service_url)
    }
    return (
        <div className={`mt-12 border-t py-10`}>
            <div className={`text-[22px] md:text-[25px] font-semibold `}>
                Services
            </div>

            <div className={`mt-6`}>
                <div className={`grid grid-cols-2 w-full gap-4`}>
                    {
                        services?.map((item: ServiceType, i: number) => {
                            return (
                                <div key={i} onClick={() => handleShowService(item)}
                                    className={`cursor-pointer `}
                                >
                                    <div className={`py-2.5 `}>

                                        <div className={`flex text-[15px] group place-items-center gap-1`}>
                                            <div>
                                                {i + 1}
                                            </div>
                                            <div>
                                                -
                                            </div>
                                            <div className={`text-[15px]  w-full group-hover:underline `}>
                                                {item?.service_name}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Services

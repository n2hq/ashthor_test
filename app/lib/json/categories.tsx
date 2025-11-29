import { BiFoodMenu, BiHotel } from "react-icons/bi";
import { CgAirplane, CgChart, CgFeed, CgGenderFemale, CgPrinter, CgShoppingBag, CgShoppingCart } from "react-icons/cg";
import { FaFemale, FaSchool } from "react-icons/fa";
import { FcAutomotive, FcBusiness, FcLandscape } from "react-icons/fc";
import { GiFemaleLegs, GiHealthNormal, GiHumanTarget, GiNurseFemale } from "react-icons/gi";
import { GrCloudComputer, GrLanguage, GrRestaurant } from "react-icons/gr";
import { IoMdMusicalNotes } from "react-icons/io";
import { IoFemaleOutline } from "react-icons/io5";
import { MdAdsClick, MdCleaningServices, MdConstruction, MdDashboard, MdElectricalServices, MdMeetingRoom, MdPlumbing, MdRealEstateAgent, MdRoomService } from "react-icons/md";
import { RiGovernmentFill } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import FashionModel from "~/components/customicons/FashionModel";

export const categories = [
    {
        name: "Business Services",
        id: "business-services",
        icon: <MdMeetingRoom size={20} />
    },
    {
        name: "Fashion & Accessories",
        id: "fashion-accessories",
        icon: <GiFemaleLegs size={20} />
    },
    {
        name: "Accounting & Bookkeeping",
        id: "accounting",
        icon: <MdAdsClick size={20} />
    },
    {
        name: "Advertising & Marketing",
        id: "advertising-marketing",
        icon: <CgChart size={20} />
    },
    {
        name: "Financial Services",
        id: "financial-services",
        icon: <MdDashboard size={20} />
    },
    {
        name: "Legal Services",
        id: "legal-services",
        icon: <CgFeed size={20} />
    },
    {
        name: "Human Resource & Recruiting",
        id: "human-resource-recruiting",
        icon: <GiHumanTarget size={20} />
    },
    {
        name: "Printing & Publishing",
        id: "printing-publishing",
        icon: <CgPrinter size={20} />
    },
    {
        name: "Translation & Interpretation",
        id: "translation-and-interpretation",
        icon: <GrLanguage size={20} />
    },
    {
        name: "Cleaning Services",
        id: "cleaning-services",
        icon: <MdCleaningServices size={20} />
    },
    {
        name: "Plumbing",
        id: "plumbing",
        icon: <MdPlumbing size={20} />
    },
    {
        name: "Hotels",
        id: "hotels",
        icon: <BiHotel size={20} />
    },
    {
        name: "Construction & Roofing",
        id: "construction-roofing",
        icon: <MdConstruction size={20} />
    },
    {
        name: "Electrical Services",
        id: "electrical-services",
        icon: <MdElectricalServices size={20} />
    },
    {
        name: "Landscaping & Gardening",
        id: "landscaping-gardening",
        icon: <FcLandscape size={20} />
    },
    {
        name: "Interior Design",
        id: "interior-design",
        icon: <MdRoomService size={20} />
    },
    {
        name: "Logistics, Moving & Storage",
        id: "logistics-moving-storage",
        icon: <TbTruckDelivery size={20} />
    },
    {
        name: "Health & Fitness",
        id: "health-fitness",
        icon: <GiHealthNormal size={20} />
    },
    {
        name: "Restaurants",
        id: "restaurants",
        icon: <GrRestaurant size={20} />
    },
    {
        name: "Supermarkets",
        id: "supermarkets",
        icon: <CgShoppingCart size={20} />
    },
    {
        name: "Food Delivery",
        id: "food-delivery",
        icon: <BiFoodMenu size={20} />
    },
    {
        name: "Shopping & Retail",
        id: "shopping-retail",
        icon: <CgShoppingBag size={20} />
    },
    {
        name: "Travel, Hospitality & Rentals",
        id: "travel-hospitality-rentals",
        icon: <CgAirplane size={20} />
    },
    {
        name: "Automotive",
        id: "automotive",
        icon: <FcAutomotive size={20} />
    },
    {
        name: "Entertainment",
        id: "entertainment",
        icon: <IoMdMusicalNotes size={20} />
    },
    {
        name: "Education",
        id: "education",
        icon: <FaSchool size={20} />
    },
    {
        name: "Technology & IT",
        id: "technology-it",
        icon: <GrCloudComputer size={20} />
    },
    {
        name: "Real Estate",
        id: "real-estate",
        icon: <MdRealEstateAgent size={20} />
    },
    {
        name: "Community & Government",
        id: "community-government",
        icon: <RiGovernmentFill size={20} />
    },
    {
        name: "General Trading",
        id: "general-trading",
        icon: <FcBusiness size={20} />
    },


]
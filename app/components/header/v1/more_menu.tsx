import { BiCopyright, BiHome, BiLock, BiSearch, BiWorld } from "react-icons/bi";
import { BsBook, BsFillBriefcaseFill, BsLock } from "react-icons/bs";
import { CgHome, CgPhone } from "react-icons/cg";
import { FaBlenderPhone, FaHome, FaShoppingBag } from "react-icons/fa";
import { appConfig } from "~/lib/lib";

export const moremenu = [
    {
        title: `Home`,
        url: '/',
        icon: <FaHome />
    },
    {
        title: "Search",
        url: `${appConfig.searchBaseUrl}`,
        icon: <BiSearch />
    },
    {
        title: "Contact",
        url: '/web/contact',
        icon: <CgPhone />
    },
    {
        title: "Terms of Use",
        url: "/web/terms",
        icon: <FaShoppingBag />
    },
    {
        "title": "Privacy",
        "url": "/web/privacy",
        icon: <BiLock />
    },
    {
        "title": "Responsible Disclosure",
        "url": "/web/responsible-disclosure",
        icon: <FaBlenderPhone />
    },
    {
        "title": "Copyright",
        "url": "/web/copyright",
        icon: <BiCopyright />
    },

]
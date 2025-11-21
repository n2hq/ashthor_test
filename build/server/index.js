var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, useNavigate, useRouteError, Outlet, useNavigation, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, Link, useLocation, useLoaderData, NavLink as NavLink$1, useSearchParams, useParams } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import React, { useContext, createContext, useState, useEffect, useRef } from "react";
import NProgress from "nprogress";
import { FaSpinner, FaSchool, FaWheelchair, FaSwimmingPool, FaParking, FaTiktok, FaVimeoSquare, FaLinkedinIn, FaWifi, FaSignOutAlt, FaCarSide, FaAngleDown, FaMobile, FaQuestion, FaBriefcase, FaShoppingBag, FaBlenderPhone, FaChevronLeft, FaChevronRight, FaFacebook, FaInstagram, FaYoutubeSquare, FaPinterestSquare, FaFacebookSquare } from "react-icons/fa";
import CryptoJS from "crypto-js";
import { BsPersonWheelchair, BsPinterest, BsInstagram, BsTwitterX, BsPersonFillGear, BsPersonFill, BsCircleFill, BsCircle, BsSearchHeart, BsFillBriefcaseFill, BsThreeDotsVertical, BsHouse, BsAirplane, BsStarFill, BsStar, BsBagCheckFill, BsPhone, BsLinkedin, BsBank } from "react-icons/bs";
import { CgChart, CgFeed, CgPrinter, CgShoppingCart, CgShoppingBag, CgAirplane, CgGym, CgFacebook, CgMoreVertical, CgChevronDown, CgChevronRight, CgPhone, CgMenu, CgWebsite, CgBandAid } from "react-icons/cg";
import { GrLanguage, GrRestaurant, GrCloudComputer, GrCafeteria, GrLounge, GrWheelchairActive, GrYoutube, GrClose, GrLaunch } from "react-icons/gr";
import { BiHotel, BiFoodMenu, BiWine, BiLibrary, BiSpa, BiChevronLeft, BiChevronRight, BiSearch, BiBriefcase, BiUser, BiSolidRightArrow, BiHome, BiCategory, BiMenu, BiBullseye, BiWorld, BiLock, BiCopyright, BiSolidStar, BiPhone, BiSolidUser, BiBuilding, BiEditAlt } from "react-icons/bi";
import { FcLandscape, FcAutomotive, FcBusiness, FcSettings, FcHome, FcBusinessman } from "react-icons/fc";
import { GiFemaleLegs, GiHumanTarget, GiHealthNormal, GiPadlock, GiStarGate, GiKnifeFork } from "react-icons/gi";
import { IoMdMusicalNotes } from "react-icons/io";
import { MdMeetingRoom, MdAdsClick, MdDashboard, MdCleaningServices, MdPlumbing, MdConstruction, MdElectricalServices, MdRoomService, MdRealEstateAgent, MdBusinessCenter, MdOutlineWheelchairPickup, MdWheelchairPickup, MdLocalLaundryService, MdAirportShuttle, MdEditSquare, MdOutlineAttachEmail, MdPassword, MdWifiPassword, MdContacts, MdMusicNote, MdOutlineImage, MdEmail, MdBrowseGallery, MdLocationPin, MdPhone, MdMenu, MdError } from "react-icons/md";
import { RiGovernmentFill, RiMusic2Line, RiTrademarkLine, RiRestaurantFill, RiYoutubeFill, RiDoubleQuotesL, RiCommunityFill } from "react-icons/ri";
import { TbTruckDelivery, TbAirConditioning, TbWritingSign, TbPasswordUser } from "react-icons/tb";
import { FaToilet, FaMinimize, FaMaximize, FaBagShopping, FaXTwitter, FaBuildingNgo } from "react-icons/fa6";
import { TiWiFi } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { z } from "zod";
import { HiBars3BottomRight, HiMiniBriefcase, HiHome } from "react-icons/hi2";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAudible, faFacebookSquare, faInstagram, faTwitterSquare, faLinkedin, faYoutubeSquare } from "@fortawesome/free-brands-svg-icons";
import { Link as Link$1 } from "react-router-dom";
import { LuSearch } from "react-icons/lu";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import tzLookup from "tz-lookup";
import { DatePicker } from "antd";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const NotificationContext = createContext(null);
function useNotification() {
  const context = useContext(NotificationContext);
  return context;
}
const NotificationProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [type, setType] = useState(0);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [notifyMessage, setNotifyMessage] = useState("");
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [confirmOk, setConfirmOk] = useState(false);
  const [onCloseConfirm, setOnCloseConfirm] = useState();
  const handleClose = () => {
    setShow(false);
  };
  const cancel = () => {
    setShow(false);
    setType(0);
    setMessage("");
  };
  useEffect(() => {
    cancel();
  }, []);
  const notify = async (message2 = "Working...") => {
    cancel();
    setNotifyMessage(message2);
    await new Promise((resolve) => setTimeout(resolve, 100));
    setShow(true);
    setType(1);
  };
  const alert2 = async (title2, message2) => {
    cancel();
    setMessage(message2 || "Process Completed!");
    setTitle(title2 || "Alert");
    await new Promise((resolve) => setTimeout(resolve, 100));
    setShow(true);
    setType(2);
  };
  const alertCancel = async (title2, message2) => {
    cancel();
    setMessage(message2 || "Completed!");
    setTitle(title2 || "Alert");
    await new Promise((resolve) => setTimeout(resolve, 100));
    setShow(true);
    setType(5);
  };
  const alertReload = async (title2, message2) => {
    cancel();
    setMessage(message2 || "Process Completed!");
    setTitle(title2 || "Alert");
    await new Promise((resolve) => setTimeout(resolve, 100));
    setShow(true);
    setType(3);
  };
  const confirm = async (message2 = "Do you wish to continue?", onClose) => {
    cancel();
    setMessage(message2);
    await new Promise((resolve) => setTimeout(resolve, 100));
    setShow(true);
    setType(4);
    setOnCloseConfirm(() => onClose);
  };
  let vals = {
    notify,
    cancel,
    alert: alert2,
    alertReload,
    confirm,
    confirmCancel,
    confirmOk,
    alertCancel
  };
  return /* @__PURE__ */ jsxs(NotificationContext.Provider, { value: vals, children: [
    show && type === 1 && /* @__PURE__ */ jsx(
      Notify,
      {
        working: show,
        notifyMessage
      }
    ),
    show && type === 2 && /* @__PURE__ */ jsx(
      Alert,
      {
        handleClose,
        working: show,
        message,
        title
      }
    ),
    show && type === 3 && /* @__PURE__ */ jsx(
      AlertReload,
      {
        handleClose,
        working: show,
        title,
        message
      }
    ),
    show && type === 4 && /* @__PURE__ */ jsx(
      Confirm,
      {
        onClose: onCloseConfirm,
        working: show,
        message
      }
    ),
    show && type === 5 && /* @__PURE__ */ jsx(
      AlertCancel,
      {
        handleClose,
        working: show,
        message,
        title
      }
    ),
    children
  ] });
};
const Confirm = ({ handleClose, working, message, handleConfirmCancel, setConfirmOk, onClose }) => {
  return /* @__PURE__ */ jsx("div", { className: `z-[4000] fixed left-0 top-0 right-0 bottom-0
                bg-black/30 flex flex-col place-content-center place-items-center
                `, children: /* @__PURE__ */ jsxs("div", { className: `w-[90%] sm:w-[500px] h-auto bg-white 
                        overflow-hidden rounded-md relative shadow-2xl shadow-black/50`, children: [
    /* @__PURE__ */ jsx("div", { className: `px-4 py-3 border-b-[1px] font-bold text-[17px] bg-gray-100
                            w-full`, children: "Confirm" }),
    /* @__PURE__ */ jsx("div", { className: `w-full h-auto 
                            `, children: /* @__PURE__ */ jsx("div", { className: ` px-4 py-3 h-fit`, children: message }) }),
    /* @__PURE__ */ jsxs("div", { className: `px-4 py-[10px] border-t-[1px] w-full
                            flex place-content-end gap-2 `, children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => onClose(false),
          className: `px-3 bg-red-500 text-white rounded-[5px]
                                text-[14px] py-1 hover:bg-red-800`,
          children: "No"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => onClose(true),
          className: `px-3 bg-gray-100 py-1 border-[1px] rounded-[5px]
                                text-[14px] hover:bg-gray-200`,
          children: "Yes"
        }
      )
    ] })
  ] }) });
};
const Notify = ({ working, notifyMessage }) => {
  return /* @__PURE__ */ jsx("div", { className: `z-[4000] fixed left-0 top-0 right-0 bottom-0
                bg-black/30 flex flex-col place-content-center place-items-center
                `, children: /* @__PURE__ */ jsxs("div", { className: `w-[90%] sm:w-[500px] h-auto bg-white 
                        overflow-hidden rounded-md relative shadow-2xl shadow-black/50`, children: [
    /* @__PURE__ */ jsx("div", { className: `px-4 py-3 border-b-[1px] font-bold text-[17px] bg-gray-100
                            w-full`, children: "Processing..." }),
    /* @__PURE__ */ jsx("div", { className: `w-full h-auto 
                            `, children: /* @__PURE__ */ jsxs("div", { className: ` px-3 py-3 h-fit
                        flex place-items-center gap-2`, children: [
      /* @__PURE__ */ jsx(FaSpinner, { className: `text-3xl text-blue-500 ${working ? "animate-spin" : ""}` }),
      notifyMessage
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: `px-4 py-[10px] border-t-[1px] w-full
                            flex place-content-end gap-2 `, children: " " })
  ] }) });
};
const Alert = ({ handleClose, working, message, title }) => {
  return /* @__PURE__ */ jsx("div", { className: `z-[4000] fixed left-0 top-0 right-0 bottom-0
                bg-black/30 flex flex-col place-content-center place-items-center
                `, children: /* @__PURE__ */ jsxs("div", { className: `w-[90%] sm:w-[500px] h-auto bg-white 
                        overflow-hidden rounded-md relative shadow-2xl shadow-black/50`, children: [
    /* @__PURE__ */ jsx("div", { className: `px-4 py-3 border-b-[1px] font-bold text-[17px] bg-gray-100
                            w-full`, children: title }),
    /* @__PURE__ */ jsx("div", { className: `w-full h-auto 
                            `, children: /* @__PURE__ */ jsx("div", { className: ` px-4 py-3 h-fit`, children: message }) }),
    /* @__PURE__ */ jsxs("div", { className: `px-4 py-[10px] border-t-[1px] w-full
                            flex place-content-end gap-2 `, children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onMouseDown: handleClose,
          className: `px-3 bg-red-500 text-white rounded-[5px]
                                text-[14px] py-1 hover:bg-red-800`,
          children: "Close"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onMouseDown: () => window.location.reload(),
          className: `px-3 bg-gray-200 text-black rounded-[5px]
                                text-[14px] py-1 hover:bg-gray-100
                                hover:shadow-md`,
          children: "Reload"
        }
      )
    ] })
  ] }) });
};
const AlertReload = ({ handleClose, working, message, title }) => {
  return /* @__PURE__ */ jsx("div", { className: `z-[4000] fixed left-0 top-0 right-0 bottom-0
                bg-black/30 flex flex-col place-content-center place-items-center
                `, children: /* @__PURE__ */ jsxs("div", { className: `w-[90%] sm:w-[500px] h-auto bg-white 
                        overflow-hidden rounded-md relative shadow-2xl shadow-black/50`, children: [
    /* @__PURE__ */ jsx("div", { className: `px-4 py-3 border-b-[1px] font-bold text-[17px] bg-gray-100
                            w-full`, children: title }),
    /* @__PURE__ */ jsx("div", { className: `w-full h-auto 
                            `, children: /* @__PURE__ */ jsx("div", { className: ` px-4 py-3 h-fit`, children: message }) }),
    /* @__PURE__ */ jsx("div", { className: `px-4 py-[10px] border-t-[1px] w-full
                            flex place-content-end gap-2 `, children: /* @__PURE__ */ jsx(
      "button",
      {
        onMouseDown: () => window.location.reload(),
        className: `px-3 bg-gray-200 text-black rounded-[5px]
                                text-[14px] py-1 hover:bg-gray-100
                                hover:shadow-md`,
        children: "Reload"
      }
    ) })
  ] }) });
};
const AlertCancel = ({ handleClose, working, message, title }) => {
  return /* @__PURE__ */ jsx("div", { className: `z-[4000] fixed left-0 top-0 right-0 bottom-0
                bg-black/30 flex flex-col place-content-center place-items-center
                `, children: /* @__PURE__ */ jsxs("div", { className: `w-[90%] sm:w-[500px] h-auto bg-white 
                        overflow-hidden rounded-md relative shadow-2xl shadow-black/50`, children: [
    /* @__PURE__ */ jsx("div", { className: `px-4 py-3 border-b-[1px] font-bold text-[17px] bg-gray-100
                            w-full`, children: title }),
    /* @__PURE__ */ jsx("div", { className: `w-full h-auto 
                            `, children: /* @__PURE__ */ jsx("div", { className: ` px-4 py-3 h-fit`, children: message }) }),
    /* @__PURE__ */ jsx("div", { className: `px-4 py-[10px] border-t-[1px] w-full
                            flex place-content-end gap-2 `, children: /* @__PURE__ */ jsx(
      "button",
      {
        onMouseDown: handleClose,
        className: `px-3 bg-red-500 text-white rounded-[5px]
                                text-[14px] py-1 hover:bg-red-800`,
        children: "Close"
      }
    ) })
  ] }) });
};
const categories$2 = [
  {
    name: "Business Services",
    id: "business services",
    icon: /* @__PURE__ */ jsx(MdMeetingRoom, { size: 20 })
  },
  {
    name: "Fashion & Accessories",
    id: "fashion and accessories",
    icon: /* @__PURE__ */ jsx(GiFemaleLegs, { size: 20 })
  },
  {
    name: "Accounting & Bookkeeping",
    id: "accounting",
    icon: /* @__PURE__ */ jsx(MdAdsClick, { size: 20 })
  },
  {
    name: "Advertising & Marketing",
    id: "advertising marketing",
    icon: /* @__PURE__ */ jsx(CgChart, { size: 20 })
  },
  {
    name: "Financial Services",
    id: "financial services",
    icon: /* @__PURE__ */ jsx(MdDashboard, { size: 20 })
  },
  {
    name: "Legal Services",
    id: "legal services",
    icon: /* @__PURE__ */ jsx(CgFeed, { size: 20 })
  },
  {
    name: "Human Resource & Recruiting",
    id: "human resource recruiting",
    icon: /* @__PURE__ */ jsx(GiHumanTarget, { size: 20 })
  },
  {
    name: "Printing & Publishing",
    id: "printing publishing",
    icon: /* @__PURE__ */ jsx(CgPrinter, { size: 20 })
  },
  {
    name: "Translation & Interpretation",
    id: "translation and interpretation",
    icon: /* @__PURE__ */ jsx(GrLanguage, { size: 20 })
  },
  {
    name: "Cleaning Services",
    id: "cleaning services",
    icon: /* @__PURE__ */ jsx(MdCleaningServices, { size: 20 })
  },
  {
    name: "Plumbing",
    id: "plumbing",
    icon: /* @__PURE__ */ jsx(MdPlumbing, { size: 20 })
  },
  {
    name: "Hotels",
    id: "hotel",
    icon: /* @__PURE__ */ jsx(BiHotel, { size: 20 })
  },
  {
    name: "Construction & Roofing",
    id: "construction and roofing",
    icon: /* @__PURE__ */ jsx(MdConstruction, { size: 20 })
  },
  {
    name: "Electrical Services",
    id: "electrical services",
    icon: /* @__PURE__ */ jsx(MdElectricalServices, { size: 20 })
  },
  {
    name: "Landscaping & Gardening",
    id: "landscaping and gardening",
    icon: /* @__PURE__ */ jsx(FcLandscape, { size: 20 })
  },
  {
    name: "Interior Design",
    id: "interior design",
    icon: /* @__PURE__ */ jsx(MdRoomService, { size: 20 })
  },
  {
    name: "Logistics, Moving & Storage",
    id: "logistics moving and storage",
    icon: /* @__PURE__ */ jsx(TbTruckDelivery, { size: 20 })
  },
  {
    name: "Health & Fitness",
    id: "health and fitness",
    icon: /* @__PURE__ */ jsx(GiHealthNormal, { size: 20 })
  },
  {
    name: "Restaurants",
    id: "restaurants",
    icon: /* @__PURE__ */ jsx(GrRestaurant, { size: 20 })
  },
  {
    name: "Supermarkets",
    id: "supermarkets",
    icon: /* @__PURE__ */ jsx(CgShoppingCart, { size: 20 })
  },
  {
    name: "Food Delivery",
    id: "food delivery",
    icon: /* @__PURE__ */ jsx(BiFoodMenu, { size: 20 })
  },
  {
    name: "Shopping & Retail",
    id: "shopping and retail",
    icon: /* @__PURE__ */ jsx(CgShoppingBag, { size: 20 })
  },
  {
    name: "Travel, Hospitality & Rentals",
    id: "travel, hospitality and rentals",
    icon: /* @__PURE__ */ jsx(CgAirplane, { size: 20 })
  },
  {
    name: "Automotive",
    id: "automotive",
    icon: /* @__PURE__ */ jsx(FcAutomotive, { size: 20 })
  },
  {
    name: "Entertainment",
    id: "entertainment",
    icon: /* @__PURE__ */ jsx(IoMdMusicalNotes, { size: 20 })
  },
  {
    name: "Education",
    id: "education",
    icon: /* @__PURE__ */ jsx(FaSchool, { size: 20 })
  },
  {
    name: "Technology & IT",
    id: "technology and it",
    icon: /* @__PURE__ */ jsx(GrCloudComputer, { size: 20 })
  },
  {
    name: "Real Estate",
    id: "real estate",
    icon: /* @__PURE__ */ jsx(MdRealEstateAgent, { size: 20 })
  },
  {
    name: "Community & Government",
    id: "community and government",
    icon: /* @__PURE__ */ jsx(RiGovernmentFill, { size: 20 })
  },
  {
    name: "General Trading",
    id: "general trading",
    icon: /* @__PURE__ */ jsx(FcBusiness, { size: 20 })
  }
];
const facilityFeatures = [
  {
    name: "Bar",
    feature_id: "bar",
    description: "Enjoy drinks and cocktails",
    icon: /* @__PURE__ */ jsx(BiWine, {})
  },
  {
    name: "Cafetaria",
    feature_id: "cafetaria",
    description: "Cafetaria",
    icon: /* @__PURE__ */ jsx(GrCafeteria, {})
  },
  {
    name: "Library",
    feature_id: "library",
    description: "Quiet and cosy reading area",
    icon: /* @__PURE__ */ jsx(BiLibrary, {})
  },
  {
    name: "Lounge",
    feature_id: "lounge",
    description: "Relax and unwind",
    icon: /* @__PURE__ */ jsx(GrLounge, {})
  },
  {
    name: "Music",
    feature_id: "music",
    description: "Live entertainment and sound systems",
    icon: /* @__PURE__ */ jsx(RiMusic2Line, {})
  },
  {
    name: "Mini mart",
    feature_id: "mini_mart",
    description: "Shop essentials",
    icon: /* @__PURE__ */ jsx(RiTrademarkLine, {})
  },
  {
    name: "Business Center",
    feature_id: "business_center",
    description: "Work, meeting, printing and typesetting",
    icon: /* @__PURE__ */ jsx(MdBusinessCenter, {})
  },
  {
    name: "Wheelchair Accessible",
    feature_id: "wheelchair_accessible",
    description: "Helps customers for easy navigation",
    icon: /* @__PURE__ */ jsx(FaWheelchair, {})
  },
  {
    name: "Wheelchair Accessible Entrance",
    feature_id: "wheelchair_accessible_entrance",
    description: "Helps customers for easy navigation",
    icon: /* @__PURE__ */ jsx(GrWheelchairActive, {})
  },
  {
    name: "Wheelchair Accessible Seating",
    feature_id: "wheelchair_accessible_seating",
    description: "Specialised dining experience",
    icon: /* @__PURE__ */ jsx(MdOutlineWheelchairPickup, {})
  },
  {
    name: "Wheelchair Accessible Toilet",
    feature_id: "wheelchair_accessible_toilet",
    description: "Specialised convenience for wheelchair uses",
    icon: /* @__PURE__ */ jsx(BsPersonWheelchair, {})
  },
  {
    name: "Wheelchair Accessible Car Park",
    feature_id: "wheelchair_accessible_car_park",
    description: "Specialised access for wheelchair uses",
    icon: /* @__PURE__ */ jsx(MdWheelchairPickup, {})
  },
  {
    name: "Rest room",
    feature_id: "rest_room",
    description: "Convenience for customers",
    icon: /* @__PURE__ */ jsx(FaToilet, {})
  },
  {
    name: "Swimming Pool",
    feature_id: "swimming_pool",
    description: "Swimming Pool",
    icon: /* @__PURE__ */ jsx(FaSwimmingPool, {})
  },
  {
    name: "Paid Car Park",
    feature_id: "paid_car_park",
    description: "Paid Car Park",
    icon: /* @__PURE__ */ jsx(FcAutomotive, {})
  },
  {
    name: "Free Wifi",
    feature_id: "free_wifi",
    description: "Free Wifi",
    icon: /* @__PURE__ */ jsx(TiWiFi, {})
  },
  {
    name: "Free Parking",
    feature_id: "free_parking",
    description: "Free Parking",
    icon: /* @__PURE__ */ jsx(FaParking, {})
  },
  {
    name: "Air Conditioned",
    feature_id: "air_conditioned",
    description: "Air Conditioned",
    icon: /* @__PURE__ */ jsx(TbAirConditioning, {})
  },
  {
    name: "Laundry Service",
    feature_id: "laundry_service",
    description: "Laundry Service",
    icon: /* @__PURE__ */ jsx(MdLocalLaundryService, {})
  },
  {
    name: "Airport Shuttle",
    feature_id: "airport_shuttle",
    description: "Airport Shuttle",
    icon: /* @__PURE__ */ jsx(MdAirportShuttle, {})
  },
  {
    name: "Spa",
    feature_id: "spa",
    description: "Spa",
    icon: /* @__PURE__ */ jsx(BiSpa, {})
  },
  {
    name: "Gym & Fitness Center",
    feature_id: "gym",
    description: "Gym and Fitness Center",
    icon: /* @__PURE__ */ jsx(CgGym, {})
  }
];
const config = {
  BASE_URL: "https://testindex.veycet.com",
  IMG_BASE_URL: "https://tpics.gasimg.com",
  MAIL_SERVICE: "https://mailsvc.gasimg.com/emailservice/",
  SITENAME: "Garssete",
  FORMATTED_SITENAME: "Garssete",
  SESSION_SECRET: void 0,
  ENV: "test"
};
const appConfig = {
  NAVBAR_HEIGHT: 0
};
const getSiteLogo = () => {
  return /* @__PURE__ */ jsx("span", { className: ` 
         `, children: "Garssete" });
};
const headers$1 = {
  "Access-Control-Allow-Origin": "*",
  // Allow all origins
  "Access-Control-Allow-Methods": "*",
  // Allow specific methods
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  // Allow specific headers
  "Access-Control-Allow-Credentials": "true",
  // Optional: if using cookies/auth
  "Content-Type": "application/json",
  "Cache-Control": "no-store"
  // Note: "cache" isn't valid; use "Cache-Control"
};
function DoResponse(json2, code = 500) {
  return new Response(
    JSON.stringify(json2),
    {
      status: code,
      headers: headers$1
    }
  );
}
function GetResponse(data, success = false, code = 200) {
  const response = {
    success,
    rspcode: code,
    data
  };
  return new Response(
    JSON.stringify(response),
    {
      status: code,
      headers: headers$1
    }
  );
}
const HashPwd = (input) => {
  return CryptoJS.SHA256(input).toString();
};
const GenerateRandomHash = () => {
  const randomBytes = CryptoJS.lib.WordArray.random(16);
  const hash = CryptoJS.SHA256(randomBytes).toString();
  return hash;
};
const getBusinessProfile = async (criteria) => {
  const endpoint = "/api/listing/" + criteria;
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
const getSearch = async (criteria, city, state, country, category, page) => {
  let endpoint = "/api/listing/searchlisting?q=" + criteria;
  endpoint += "&city=" + city;
  endpoint += "&state=" + state;
  endpoint += "&country=" + country;
  endpoint += "&category=" + category;
  endpoint += "&page=" + page;
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers$1
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { "message": error.message };
  }
};
const getFeaturedListing = async () => {
  const endpoint = `/api/listing/featured_listing`;
  const url = config.BASE_URL + endpoint;
  console.log(url);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers$1
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { "message": error.message };
  }
};
const getListingByCategory = async (category, limit) => {
  const endpoint = `/api/listing/listing_by_category/${category}/${limit}`;
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: headers$1
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { "message": error.message };
  }
};
const getHomeListingByCategory = async (category, limit) => {
  const endpoint = `/api/listing/home_listing_by_category/${category}/${limit}`;
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: headers$1
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { "message": error.message };
  }
};
const getLatestBusinesses = async (limit) => {
  const endpoint = `/api/listing/home_latest_businesses/${limit}`;
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: headers$1
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { "message": error.message };
  }
};
const getRating = async (userGuid, businessGuid) => {
  const endpoint = `/api/rating/${userGuid}/${businessGuid}`;
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: headers$1
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { "message": error.message };
  }
};
const getBusinessProfileImageData = async (guid) => {
  const endpoint = "/api/listing/business_profile_image/" + guid;
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: headers$1
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getBusinessProfileBgData = async (guid) => {
  const endpoint = "/api/listing/business_profile_bg/" + guid;
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: headers$1
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getBusinessGallery = async (businessGuid) => {
  const BASE_URL = "https://testindex.veycet.com";
  const endpoint = `/api/listing/business_gallery/${businessGuid}`;
  const url = BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: headers$1
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { "message": error.message };
  }
};
const getRatingsReviews = async (businessGuid) => {
  const endpoint = `/api/rating/ratings_reviews/${businessGuid}`;
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: headers$1
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { "message": error.message };
  }
};
const getPage = async (criteria) => {
  const endpoint = "/api/listing/" + criteria;
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers$1
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return Response.json({ error: true, data: [] }, { status: 200 });
  }
};
const getBusinessRatings = async (businessGuid) => {
  const BASE_URL = "https://testindex.veycet.com";
  const endpoint = `/api/rating/business_ratings/${businessGuid}`;
  const url = BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: headers$1
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getLocalDate = (date) => {
  const localDate = new Date(date);
  const formatted = localDate.toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  return formatted;
};
const getBusinessFeatures = async (businessGuid) => {
  const BASE_URL = "https://testindex.veycet.com";
  const endpoint = `/api/listing/business_facility_features/${businessGuid}`;
  const url = BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: headers$1
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getSocialMediaByBusinessGuid = async (businessGuid) => {
  const endpoint = `/api/listing/business_social_media/${businessGuid}`;
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: headers$1
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const generate7DigitNumber = () => {
  return Math.floor(1e6 + Math.random() * 9e6);
};
const getCountries = async () => {
  const endpoint = "/api/util/country";
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: headers$1
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const finaldata = data.map((country) => {
      return {
        name: country.name,
        id: country.id
      };
    });
    return data;
  } catch (error) {
    return void 0;
  }
};
const getStates = async (countryCode) => {
  const endpoint = "/api/util/state?country_code=" + countryCode;
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: headers$1
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getStatesAlt = async (countryCode) => {
  const endpoint = "/api/util/state?country_code=" + countryCode;
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: headers$1
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getCities = async (countryCode, stateCode) => {
  const endpoint = "/api/util/city?country_code=" + countryCode + "&state_code=" + stateCode;
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: headers$1
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getCategories = async () => {
  const endpoint = "/api/util/category";
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: headers$1
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getUserProfile = async (guid) => {
  const BASE_URL = "https://testindex.veycet.com";
  const endpoint = "/api/user/" + guid;
  const url = BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: headers$1
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getUserProfileImageData = async (guid) => {
  const endpoint = "/api/user/user_profile_image/" + guid;
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: headers$1
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getUserProfileBgData = async (guid) => {
  const endpoint = "/api/user/user_profile_bg/" + guid;
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: headers$1
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getPortfolio = async (guid, q) => {
  let businessesEndpoint = `/api/listing/owner?guid=${guid}&q=${q}`;
  if (q && q.trim() !== "") {
    businessesEndpoint += `&q=${encodeURIComponent(q)}`;
  }
  let url = config.BASE_URL + businessesEndpoint;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers$1
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return null;
  }
};
const getOperatingHours = async (businessGuid, userGuid) => {
  const BASE_URL = "https://testindex.veycet.com";
  const endpoint = `/api/listing/operating_hours?business_guid=${businessGuid}&user_guid=${userGuid}`;
  const url = BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: headers$1
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    console.log(error.message);
    return void 0;
  }
};
const saveOperatingHours = async (openStatus, workingHours, businessGuid, userGuid) => {
  const BASE_URL = "https://testindex.veycet.com";
  const endpoint = `/api/listing/operating_hours?business_guid=${businessGuid}&user_guid=${userGuid}`;
  const url = BASE_URL + endpoint;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: headers$1,
      body: JSON.stringify({ openStatus, workingHours })
    });
    if (!response.ok) {
      await response.json().then((data2) => {
        console.log(data2);
        throw new Error(`HTTP error! Status: ${response.status}, ${data2.message}`);
      });
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    console.log(error.message);
    return new Promise((resolve) => setTimeout(() => {
      resolve({ message: error.message });
    }, 10));
  }
};
const getGallery = async (businessGuid, userGuid) => {
  const endpoint = `/api/listing/gallery/${businessGuid}/${userGuid}`;
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: headers$1
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getSysFacilityFeatures = async () => {
  const endpoint = `/api/listing/sys_facility_features`;
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: headers$1
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getSelectedFacilityFeatures = async (userGuid, businessGuid) => {
  const BASE_URL = "https://testindex.veycet.com";
  const endpoint = `/api/listing/selected_facility_features/${userGuid}/${businessGuid}`;
  const url = BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: headers$1
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getSysSocialMedia = async () => {
  const endpoint = `/api/listing/sys_social_media`;
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: headers$1
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getSelectedSocialMedia = async (userGuid, businessGuid) => {
  const endpoint = `/api/listing/selected_social_media/${userGuid}/${businessGuid}`;
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: headers$1
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getBusiness = async (userGuid, businessGuid) => {
  const endpoint = `/api/listing/activate/${userGuid}/${businessGuid}`;
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: headers$1
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getRecents = async () => {
  const endpoint = `/api/listing/recents`;
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: headers$1
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const formatNumber = (num) => {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1).replace(/\.0$/, "") + "b";
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(1).replace(/\.0$/, "") + "m";
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num.toString();
};
function getFirstChar(word) {
  if (!word || typeof word !== "string") return "";
  return word.trim().charAt(0);
}
function toSentenceCase(text) {
  return text.toLowerCase().replace(
    /([^.!?]*[.!?])(\s+|$)/g,
    (match) => match.charAt(0).toUpperCase() + match.slice(1)
  );
}
const changeEmail = async (guid, email) => {
  const endpoint = `/api/user/change_email?guid=${guid}&email=${email}`;
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "PUT",
        headers: headers$1
      }
    );
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const sendEmail = async (data) => {
  const endpoint = config.MAIL_SERVICE;
  const qs = new URLSearchParams(data).toString();
  const url = endpoint + "?" + qs;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers$1
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const rsp = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      console.log(rsp);
      resolve(rsp);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
const IsAuthenticated = (localStorage2) => {
  const tokens = localStorage2.getItem("authTokens");
  if (tokens === null) {
    window.location.href = "/web/signin";
  }
};
function getDateInTimeZone(timeZone) {
  const adjustment = 0;
  const timeObject = new Date(Date.now() - adjustment);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).formatToParts(timeObject);
  const dateParts = {};
  for (const { type, value } of parts) {
    if (type !== "literal") dateParts[type] = value;
  }
  return /* @__PURE__ */ new Date(
    `${dateParts.year}-${dateParts.month}-${dateParts.day}T${dateParts.hour}:${dateParts.minute}:${dateParts.second}`
  );
}
function getDateInTimeZoneX(timeZone) {
  const adjustment = 0;
  const timeObject = new Date(Date.now() - adjustment);
  const formattedTime = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "long"
  }).format(timeObject);
  const displayFormattedTime = /* @__PURE__ */ jsxs("span", { className: `space-x-1 tracking-tight`, children: [
    /* @__PURE__ */ jsx("span", { className: `font-bold uppercase text-[13px]`, children: "Local Time:" }, "a1"),
    /* @__PURE__ */ jsx("span", { children: formattedTime }, "a2")
  ] });
  return displayFormattedTime;
}
function getCardIcon(media) {
  let icon = null;
  switch (media) {
    case "facebook":
      icon = /* @__PURE__ */ jsx(CgFacebook, { className: `text-blue-700`, size: 20 });
      break;
    case "twitterx":
      icon = /* @__PURE__ */ jsx(BsTwitterX, { className: `text-blue-600`, size: 16 });
      break;
    case "linkedin":
      icon = /* @__PURE__ */ jsx(FaLinkedinIn, { className: `text-blue-500`, size: 17 });
      break;
    case "instagram":
      icon = /* @__PURE__ */ jsx(BsInstagram, { className: `text-red-800`, size: 15 });
      break;
    case "pinterest":
      icon = /* @__PURE__ */ jsx(BsPinterest, { className: `text-red-500`, size: 17 });
      break;
    case "youtube":
      icon = /* @__PURE__ */ jsx(GrYoutube, { className: `text-red-500`, size: 20 });
      break;
    case "vimeo":
      icon = /* @__PURE__ */ jsx(FaVimeoSquare, { size: 18 });
      break;
    case "tiktok":
      icon = /* @__PURE__ */ jsx(FaTiktok, { size: 17 });
      break;
  }
  return icon;
}
function strToList(str, separator) {
  const list = str.split(separator).map((item) => item.trim()).filter((item) => item.length > 0);
  return list;
}
const saveVideo = async (video) => {
  const endpoint = `/api/listing/save_video_link`;
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers$1,
      body: JSON.stringify(video)
    });
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getVideoGallery = async (businessGuid, userGuid) => {
  let endpoint = "";
  if (businessGuid !== "" && userGuid !== "") {
    endpoint = `/api/listing/video_links/${businessGuid}/${userGuid}`;
  } else {
    alert("Contact admin.");
  }
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: headers$1
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return null;
  }
};
const getYoutubeId = (videoUrl) => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = videoUrl == null ? void 0 : videoUrl.match(regex);
  let videoId = match ? match[1] : null;
  return videoId;
};
const updateVideo = async (video) => {
  const endpoint = `/api/listing/save_video_link`;
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: headers$1,
      body: JSON.stringify(video)
    });
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getBusinessVideoGallery = async (businessGuid) => {
  let endpoint = "";
  if (businessGuid !== "") {
    endpoint = `/api/listing/video_links/${businessGuid}`;
  } else {
    throw new Error(`Error: Contact Admin`);
  }
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: headers$1
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return null;
  }
};
const searchCategories = (searchTerm) => {
  const foundCategory = categories$2.find(
    (cat) => cat.id.toLowerCase() === searchTerm.toLowerCase()
  );
  return foundCategory;
};
const getProductGallery = async (businessGuid, userGuid) => {
  let endpoint = "";
  if (businessGuid !== "" && userGuid !== "") {
    endpoint = `/api/listing/products/${businessGuid}/${userGuid}`;
  } else {
    alert("Contact admin.");
  }
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: headers$1
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return null;
  }
};
const searchFacilities = (selectedFacilities) => {
  const mappedFacilities = selectedFacilities.map((sel) => {
    const fac = facilityFeatures.find((fac2) => fac2.feature_id === sel.featureId);
    if (!fac) return null;
    return {
      ...sel,
      name: fac.name,
      description: fac.description,
      icon: fac.icon
    };
  }).filter(Boolean);
  return mappedFacilities;
};
const logError = (e) => {
  const environments = ["dev"];
  if (environments.includes(config.ENV)) {
    console.log(e.message);
  }
};
const AuthContext = createContext(null);
const SITE_BASE_URL = "https://testindex.veycet.com";
function useAuth() {
  return useContext(AuthContext);
}
function AuthProvider({ children }) {
  let [authTokens, setAuthTokens] = useState(null);
  let [user, setUser] = useState(null);
  const verifyToken = async (accessToken) => {
    try {
      let verifyep = "/api/user/verifytoken";
      let vep = SITE_BASE_URL + verifyep;
      const response = await fetch(vep, {
        method: "POST",
        headers: headers$1,
        body: JSON.stringify({ "token": accessToken })
      });
      if (response.status !== 200) {
        throw new Error("Could not obtain token");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };
  useEffect(() => {
    const tokens = localStorage.getItem("authTokens");
    if (tokens !== null) {
      const authTokens2 = JSON.parse(tokens);
      setAuthTokens(authTokens2);
    }
    if (tokens === null) {
      setAuthTokens(null);
    }
    if (tokens) {
      const authTokens2 = JSON.parse(tokens);
      const accessToken = authTokens2.accessToken;
      verifyToken(accessToken).then((data) => {
        if (data === null) {
          setAuthTokens(null);
          setUser(null);
          localStorage.removeItem("authTokens");
        } else {
          setUser(data);
        }
      });
    } else {
      setUser(null);
    }
    setLoading(false);
    let timeoutDuration = 1e3 * 60 * 60 * 12;
    let interval = setInterval(() => {
      signoutNoReload();
    }, timeoutDuration);
    return () => clearInterval(interval);
  }, []);
  let [loading, setLoading] = useState(true);
  const baseurl = SITE_BASE_URL;
  const endpoint = "/api/user/signin";
  const requesturl = baseurl + endpoint;
  useNavigate();
  let signin = async (data) => {
    try {
      const response = await fetch(requesturl, {
        method: "POST",
        headers: headers$1,
        body: JSON.stringify(data)
      });
      let tokens = await response.json();
      if (response.status === 200) {
        setAuthTokens(tokens);
        {
        }
        verifyToken(tokens.accessToken).then((data2) => {
          setUser(data2);
        });
        localStorage.setItem("authTokens", JSON.stringify(tokens));
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(true);
          }, 100);
        });
      } else {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(tokens);
          }, 100);
        });
      }
    } catch (error) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(false);
        }, 100);
      });
    }
  };
  const signoutNoReload = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };
  const signoutReload = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    window.location.reload();
  };
  const resetpw = async (data) => {
    const BASE_URL = "https://testindex.veycet.com";
    const endpoint2 = "/api/user/reset_password_request";
    const url = BASE_URL + endpoint2;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers$1,
        body: JSON.stringify(data)
      });
      var respObj = await response.json();
      if (!response.ok) {
        throw new Error(`Error Code: ${response.status} - ${respObj.message}`);
      } else {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(respObj.message);
          }, 100);
        });
      }
    } catch (e) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(e.message);
        }, 100);
      });
    } finally {
    }
  };
  let cdata = {
    user,
    signin,
    signoutNoReload,
    signoutReload,
    resetpw
  };
  return /* @__PURE__ */ jsx(AuthContext.Provider, { value: cdata, children: loading ? null : children });
}
const SliderContext = createContext(null);
function useSliderContext() {
  const context = useContext(SliderContext);
  return context;
}
const IMG_BASE_URL$1 = "https://tpics.gasimg.com";
const SliderProvider = ({ children }) => {
  const [dialog, setDialog] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [slides, setGallery] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [listing, setListing] = useState(null);
  const slideStep = useRef(0);
  useRef(0);
  const [maximized, setMaximized] = useState(false);
  const [normalState, setNormalState] = useState(true);
  const handleTouchStart = (e) => {
    slideStep.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const deltaX = slideStep.current - endX;
    if (deltaX > 50) {
      setCurrentSlide((i) => (i + 1) % slides.length);
    } else if (deltaX < -50) {
      setCurrentSlide((i) => (i - 1 + slides.length) % slides.length);
    }
  };
  const handleClose = () => {
    setDialog(false);
  };
  const prev = () => {
    setCurrentSlide((currentSlide2) => {
      return currentSlide2 === 0 ? slides.length - 1 : currentSlide2 - 1;
    });
  };
  const next = () => {
    setCurrentSlide((currentSlide2) => {
      return currentSlide2 === slides.length - 1 ? 0 : currentSlide2 + 1;
    });
  };
  useEffect(() => {
    if (selectedSlide !== null) {
      setCurrentSlide(selectedSlide - 1);
    }
  }, [selectedSlide]);
  let vals = {
    dialog,
    setDialog,
    selectedSlide,
    setSelectedSlide,
    slides,
    setGallery,
    setListing
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    if (dialog) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dialog]);
  return /* @__PURE__ */ jsxs(SliderContext.Provider, { value: vals, children: [
    dialog && /* @__PURE__ */ jsx("div", { className: `flex w-full h-full bg-white z-[20001] 
                fixed top-0 left-0 right-0 bottom-0 `, children: /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-12 gap-0 w-full`, children: [
      /* @__PURE__ */ jsxs("div", { className: `${maximized ? "col-span-12" : "col-span-12 md:col-span-9"}  w-full h-full relative bg-black flex`, children: [
        /* @__PURE__ */ jsx("div", { className: ` w-full h-screen flex overflow-hidden`, children: slides && selectedSlide && slides.map((slide, index2) => {
          return /* @__PURE__ */ jsxs(
            "div",
            {
              className: `w-full h-full flex flex-shrink-0 flex-grow-0 transition-transform  place-content-center place-items-center  relative
                                            ease-in-out duration-1000`,
              style: { transform: `translateX(-${currentSlide * 100}%)` },
              children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    onTouchStart: handleTouchStart,
                    onTouchEnd: handleTouchEnd,
                    src: IMG_BASE_URL$1 + slide.image_url,
                    alt: "",
                    className: `object-scale-down w-full h-full 
                                            `
                  },
                  index2
                ),
                /* @__PURE__ */ jsx("div", { className: `absolute bottom-[0px] w-full z-[20px] px-5 py-7 bg-black/30 md:hidden`, children: /* @__PURE__ */ jsx("div", { className: ` text-center text-white text-[19px]`, children: slide == null ? void 0 : slide.image_title }) })
              ]
            }
          );
        }) }),
        /* @__PURE__ */ jsx("button", { onMouseDown: prev, className: `block absolute top-0 bottom-0 
                                                p-[1rem] cursor-pointer left-0 group h-full 
                                                transition duration-1000 ease-in-out`, children: /* @__PURE__ */ jsx("div", { className: `w-[50px] h-[50px] bg-white/60 rounded-full flex place-content-center place-items-center group-hover:bg-white/30
                                                        transition duration-500 ease-in-out`, children: /* @__PURE__ */ jsx(BiChevronLeft, { className: " stroke-white fill-black w-[2rem] h-[2rem]" }) }) }),
        /* @__PURE__ */ jsx("button", { onMouseDown: next, className: `block absolute top-0 bottom-0 
                                                    p-[1rem] cursor-pointer ${maximized ? "right-5" : "right-5 md:right-0"} group 
                                                     transition duration-1000 ease-in-out`, children: /* @__PURE__ */ jsx("div", { className: `w-[50px] h-[50px] bg-white/60 rounded-full flex place-content-center place-items-center group-hover:bg-white/30
                                                        transition duration-500 ease-in-out`, children: /* @__PURE__ */ jsx(BiChevronRight, { className: " stroke-white fill-black w-[2rem] h-[2rem]" }) }) }),
        /* @__PURE__ */ jsx(
          "div",
          {
            onMouseDown: () => handleClose(),
            className: `w-[50px] h-[50px] z-[300] bg-white
                                                    flex place-content-center place-items-center
                                                    rounded-full absolute left-2 top-2 cursor-pointer
                                                    hover:bg-white/40 transition duration-1000 ease-in-out`,
            children: /* @__PURE__ */ jsx(IoClose, { className: `text-[30px]` })
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            onClick: () => {
              setMaximized(!maximized);
              setNormalState(!normalState);
            },
            className: `w-[50px] h-[50px] z-[300] bg-white flex place-content-center place-items-center rounded-full absolute right-2 top-2 cursor-pointer hover:bg-white/40 transition duration-1000 ease-in-out`,
            children: maximized ? /* @__PURE__ */ jsx(FaMinimize, { className: `text-[30px]` }) : /* @__PURE__ */ jsx(FaMaximize, { className: `text-[30px]` })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `${maximized ? "hidden" : "hidden md:block md:col-span-3"} px-5`, children: [
        /* @__PURE__ */ jsxs("h1", { className: " text-[22px] my-4 font-sans font-extrabold tracking-tight leading-[24px]", children: [
          "Photos for ",
          listing && listing.title
        ] }),
        /* @__PURE__ */ jsxs("div", { className: " my-4 ", children: [
          currentSlide + 1,
          " / ",
          slides.length
        ] }),
        /* @__PURE__ */ jsx("hr", {}),
        /* @__PURE__ */ jsx("div", { className: " my-4 whitespace-pre-line", children: slides[currentSlide].image_title })
      ] })
    ] }) }),
    children
  ] });
};
const OperationContext = createContext(void 0);
const OperationProvider = ({
  children,
  defaultDuration = 5e3,
  defaultAlertDuration = 5e3
}) => {
  const [operationState, setOperationState] = useState({
    operationType: "processing",
    isVisible: false,
    progress: 0,
    dots: "",
    message: void 0
  });
  const [alertState, setAlertState] = useState({
    isVisible: false,
    type: "info",
    title: "",
    message: "",
    duration: defaultAlertDuration
  });
  const [duration, setDuration] = useState(defaultDuration);
  useEffect(() => {
    if (!operationState.isVisible) {
      setOperationState((prev) => ({ ...prev, progress: 0, dots: "" }));
      return;
    }
    const progressInterval = setInterval(() => {
      setOperationState((prev) => {
        if (prev.progress >= 90) {
          clearInterval(progressInterval);
          return { ...prev, progress: 90 };
        }
        return { ...prev, progress: prev.progress + 1 };
      });
    }, duration / 100);
    const dotsInterval = setInterval(() => {
      setOperationState((prev) => {
        const newDots = prev.dots.length >= 3 ? "" : prev.dots + ".";
        return { ...prev, dots: newDots };
      });
    }, 500);
    return () => {
      clearInterval(progressInterval);
      clearInterval(dotsInterval);
    };
  }, [operationState.isVisible, duration]);
  useEffect(() => {
    if (alertState.isVisible && alertState.duration && alertState.duration > 0) {
      const timer = setTimeout(() => {
        hideAlert();
      }, alertState.duration);
      return () => clearTimeout(timer);
    }
  }, [alertState.isVisible, alertState.duration]);
  const showOperation = (type, customMessage) => {
    setOperationState({
      operationType: type,
      isVisible: true,
      progress: 0,
      dots: "",
      message: customMessage
    });
  };
  const hideOperation = () => {
    setOperationState((prev) => ({ ...prev, isVisible: false }));
  };
  const completeOperation = () => {
    setOperationState((prev) => ({ ...prev, progress: 100 }));
    setTimeout(() => {
      setOperationState((prev) => ({ ...prev, isVisible: false }));
    }, 300);
  };
  const updateProgress = (progress) => {
    setOperationState((prev) => ({ ...prev, progress }));
  };
  const showAlert = (type, title, message, duration2) => {
    setAlertState({
      isVisible: true,
      type,
      title,
      message,
      duration: duration2 !== void 0 ? duration2 : defaultAlertDuration
    });
  };
  const hideAlert = () => {
    setAlertState((prev) => ({ ...prev, isVisible: false }));
  };
  const showSuccess = (title, message, duration2) => {
    showAlert("success", title, message, duration2);
  };
  const showError = (title, message, duration2) => {
    showAlert("error", title, message, duration2);
  };
  const showWarning = (title, message, duration2) => {
    showAlert("warning", title, message, duration2);
  };
  const showInfo = (title, message, duration2) => {
    showAlert("info", title, message, duration2);
  };
  const value = {
    operationState,
    alertState,
    showOperation,
    hideOperation,
    completeOperation,
    updateProgress,
    showAlert,
    hideAlert,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
  return /* @__PURE__ */ jsxs(OperationContext.Provider, { value, children: [
    children,
    /* @__PURE__ */ jsx(OperationNotification, {}),
    /* @__PURE__ */ jsx(AlertNotification, {})
  ] });
};
const useOperation = () => {
  const context = useContext(OperationContext);
  if (context === void 0) {
    throw new Error("useOperation must be used within an OperationProvider");
  }
  return context;
};
const OperationNotification = () => {
  const { operationState, hideOperation } = useOperation();
  const { operationType, isVisible, progress, dots, message } = operationState;
  const getOperationTitle = () => {
    switch (operationType) {
      case "login":
        return "Logging in";
      case "signup":
        return "Creating account";
      case "update":
        return "Updating information";
      default:
        return "Processing";
    }
  };
  const getOperationMessage = () => {
    if (message) return message;
    switch (operationType) {
      case "login":
        return "Please wait while we authenticate your account";
      case "signup":
        return "Setting up your new account, this will just take a moment";
      case "update":
        return "Applying your changes, please don't close this window";
      default:
        return "Your request is being processed";
    }
  };
  if (!isVisible) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 flex items-center justify-center z-[10000] bg-black bg-opacity-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-2xl p-6 w-80 animate-fade-in", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-4", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-blue-100 p-3 rounded-full mr-3", children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", className: "w-6 h-6 animate-pulse", children: [
        /* @__PURE__ */ jsx("path", { d: "M6 2h12v4l-4 4 4 4v4H6v-4l4-4-4-4V2z", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }),
        /* @__PURE__ */ jsx("path", { d: "M8 4h8l-4 4-4-4z", fill: "currentColor", opacity: "0.7" }),
        /* @__PURE__ */ jsx("path", { d: "M12 8v8", stroke: "currentColor", strokeWidth: "1", opacity: "0.8" }),
        /* @__PURE__ */ jsx("path", { d: "M8 20h8l-4-4-4 4z", fill: "currentColor", opacity: "0.3" })
      ] }) }),
      /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold text-gray-800", children: [
        getOperationTitle(),
        dots
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-2 mb-4", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: "bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300 ease-out",
        style: { width: `${progress}%` }
      }
    ) }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm mb-4", children: getOperationMessage() }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "flex space-x-2", children: [
      /* @__PURE__ */ jsx("div", { className: "w-3 h-3 bg-blue-500 rounded-full animate-bounce" }),
      /* @__PURE__ */ jsx("div", { className: "w-3 h-3 bg-blue-500 rounded-full animate-bounce", style: { animationDelay: "0.2s" } }),
      /* @__PURE__ */ jsx("div", { className: "w-3 h-3 bg-blue-500 rounded-full animate-bounce", style: { animationDelay: "0.4s" } })
    ] }) }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: hideOperation,
        className: "mt-4 text-sm text-gray-500 hover:text-gray-700 transition-colors",
        children: "Cancel"
      }
    )
  ] }) });
};
const AlertNotification = () => {
  const { alertState, hideAlert } = useOperation();
  const { isVisible, type, title, message } = alertState;
  const getAlertStyles = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          text: "text-green-800",
          icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-green-400", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) })
        };
      case "error":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          text: "text-red-800",
          icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-red-400", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", clipRule: "evenodd" }) })
        };
      case "warning":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          text: "text-yellow-800",
          icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-yellow-400", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) })
        };
      case "info":
      default:
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-800",
          icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-blue-400", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z", clipRule: "evenodd" }) })
        };
    }
  };
  const styles = getAlertStyles();
  if (!isVisible) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed top-4 right-4 z-[30000] max-w-sm w-full", children: /* @__PURE__ */ jsxs("div", { className: `rounded-md shadow-lg border ${styles.bg} ${styles.border} animate-slide-in`, children: [
    /* @__PURE__ */ jsx("div", { className: `mx-3 mt-2.5`, children: /* @__PURE__ */ jsxs("div", { className: `flex place-items-center place-content-between gap-2`, children: [
      /* @__PURE__ */ jsx("div", { className: `w-fit`, children: styles.icon }),
      /* @__PURE__ */ jsx("div", { className: `text-md font-bold ${styles.text} grow w-full text-start`, children: title }),
      /* @__PURE__ */ jsx("div", { className: "ml-4 flex-shrink-0 flex", children: /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: hideAlert,
          className: `inline-flex ${styles.bg} rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`,
          children: [
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" }),
            /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-gray-400", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z", clipRule: "evenodd" }) })
          ]
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: `mx-6 mt-1 mb-5`, children: /* @__PURE__ */ jsx("p", { className: `mt-1 text-sm ${styles.text}`, children: message }) })
  ] }) });
};
const AddPhotoDialogContext = createContext(null);
function useAddPhotoDialogContext() {
  const context = useContext(AddPhotoDialogContext);
  return context;
}
function AddPhotoDialogProvider({ children }) {
  const [working, setWorking] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const [userGuid, setUserGuid] = useState(null);
  const [businessGuid, setBusinessGuid] = useState(null);
  const [isImgSelected, setIsImageSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  useNotification();
  const { showOperation, showError, completeOperation, showSuccess } = useOperation();
  const handleCloseDialog = () => {
    setDialog(false);
    setImgSrc(null);
  };
  const handleUpload = async () => {
    setWorking(true);
    let imageTitle = document.getElementById("image_title");
    if (isImgSelected) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("guid", userGuid);
      formData.append("bid", businessGuid);
      formData.append("image_title", imageTitle.value);
      showOperation("processing", "Saving picture");
      await new Promise((resolve) => setTimeout(resolve, 2e3));
      const IMG_BASE_URL2 = "https://tpics.gasimg.com";
      const endpoint = "/business_gallery_pic_upload";
      const url = IMG_BASE_URL2 + endpoint;
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
          },
          body: formData
        });
        if (!response.ok) {
          let error = response.json().then((data) => {
            showError("Error", `${data.message}`);
            completeOperation();
          });
        } else {
          try {
            showSuccess("Success", "Picture saved.");
            completeOperation();
          } finally {
            window.location.reload();
          }
        }
      } catch (error) {
        return void 0;
      } finally {
        setWorking(false);
      }
    } else {
      showError("Error", "Please select an image to continue.");
      setWorking(false);
    }
  };
  let vals = {
    dialog,
    setDialog,
    imgSrc,
    setImgSrc,
    handleCloseDialog,
    userGuid,
    setUserGuid,
    businessGuid,
    setBusinessGuid,
    isImgSelected,
    setIsImageSelected,
    selectedFile,
    setSelectedFile
  };
  return /* @__PURE__ */ jsxs(AddPhotoDialogContext.Provider, { value: vals, children: [
    dialog && /* @__PURE__ */ jsx(
      "div",
      {
        className: `flex w-screen h-screen z-[3000] 
                fixed top-0 left-0 right-0 bottom-0 bg-black/30
                place-content-center place-items-center`,
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: `relative w-[90%] h-[80%] bg-white 
                        rounded-[8px] overflow-x-hidden z-[3000]`,
            onClick: (event) => {
              event.preventDefault();
            },
            children: [
              /* @__PURE__ */ jsx("div", { className: `relative w-full h-[75%] bg-black`, children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: imgSrc,
                  alt: "",
                  className: `object-scale-down w-full h-full`
                }
              ) }),
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
                "textarea",
                {
                  id: "image_title",
                  placeholder: `Enter picture description.`,
                  className: `w-full bg-gray-100 px-3  h-[60px] py-3`
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: `flex place-content-end px-3 gap-2`, children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onMouseDown: () => handleCloseDialog(),
                    className: `bg-gray-800 text-white px-3 py-1.5 rounded-md
                                    shadow-md mb-2 mt-4`,
                    children: "Close"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleUpload(),
                    className: `bg-blue-800 text-white px-3 py-1.5 rounded-md
                                    shadow-md mb-2 mt-4`,
                    children: working ? "Working..." : "Submit"
                  }
                )
              ] })
            ]
          }
        )
      }
    ),
    children
  ] });
}
const EditPhotoDialogContext = createContext(null);
function useEditPhotoDialogContext() {
  const context = useContext(EditPhotoDialogContext);
  return context;
}
function EditPhotoDialogProvider({ children }) {
  const [working, setWorking] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const [userGuid, setUserGuid] = useState(null);
  const [businessGuid, setBusinessGuid] = useState(null);
  const [isImgSelected, setIsImageSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageTitle, setImageTitle] = useState(null);
  const [imageGuid, setImageGuid] = useState(null);
  const [formData, setFormdata] = useState(null);
  const fileInputRef = useRef(null);
  useNotification();
  const { showOperation, showError, completeOperation, showSuccess } = useOperation();
  const handleCloseDialog = () => {
    setDialog(false);
    setImgSrc(null);
    setWorking(false);
  };
  const handleImageClick = () => {
    var _a;
    (_a = fileInputRef.current) == null ? void 0 : _a.click();
  };
  const handleFileChange = (event) => {
    var _a;
    const file = (_a = event.target.files) == null ? void 0 : _a[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImgSrc(imageUrl);
      setSelectedFile(file);
      setIsImageSelected(true);
    }
  };
  const handleUpdate = async () => {
    showOperation("processing");
    setWorking(true);
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    let imageTitle2 = document.getElementById("image_title");
    const formData2 = new FormData();
    if (isImgSelected) {
      formData2.append("file", selectedFile);
    }
    formData2.append("guid", userGuid);
    formData2.append("bid", businessGuid);
    formData2.append("image_title", imageTitle2.value);
    formData2.append("image_guid", imageGuid);
    const IMG_BASE_URL2 = "https://tpics.gasimg.com";
    const endpoint = "/business_gallery_pic_update";
    const url = IMG_BASE_URL2 + endpoint;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*"
        },
        body: formData2
      });
      if (!response.ok) {
        let error = response.json().then((data) => {
          showError("Error", `${data.message}`);
        });
      } else {
        try {
          showSuccess("Success", `Picture updated.`);
          completeOperation();
        } finally {
        }
      }
    } catch (error) {
      return void 0;
    } finally {
      setWorking(false);
    }
  };
  const deletePhoto = async (userGuid2, businessGuid2, imageGuid2) => {
    const IMG_BASE_URL2 = "https://tpics.gasimg.com";
    const endpoint = `/delete_business_gallery_pic`;
    const url = IMG_BASE_URL2 + endpoint;
    const data = {
      guid: userGuid2,
      bid: businessGuid2,
      image_guid: imageGuid2
    };
    setWorking(true);
    showOperation("processing");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers$1,
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        let error = response.json().then((data2) => {
          showError("Error", `${data2.message}`);
          completeOperation();
        });
      } else {
        try {
          showSuccess("Success", "Picture deleted.");
          completeOperation();
        } finally {
          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error.message);
      showError("Error", "Image not deleted.");
    } finally {
      setWorking(false);
    }
  };
  let vals = {
    dialog,
    setDialog,
    handleCloseDialog,
    imgSrc,
    setImgSrc,
    userGuid,
    setUserGuid,
    businessGuid,
    setBusinessGuid,
    isImgSelected,
    setIsImageSelected,
    selectedFile,
    setSelectedFile,
    imageTitle,
    setImageTitle,
    imageGuid,
    setImageGuid,
    deletePhoto
  };
  return /* @__PURE__ */ jsxs(EditPhotoDialogContext.Provider, { value: vals, children: [
    dialog && /* @__PURE__ */ jsx("div", { className: `fixed w-screen h-screen bg-black/30 z-[3000]`, children: /* @__PURE__ */ jsx("div", { className: `fixed w-screen h-screen z-[3000] 
                 top-0 left-0 right-0 bottom-0 bg-black/30
                place-content-center place-items-center`, children: /* @__PURE__ */ jsx(
      "div",
      {
        className: `relative max-w-[90%] w-[90%] h-[80%] bg-white 
                        rounded-[8px] overflow-hidden z-[3100] mx-auto `,
        children: /* @__PURE__ */ jsxs("div", { className: `w-full h-full overflow-y-auto`, children: [
          /* @__PURE__ */ jsxs("div", { className: `relative w-full h-[75%] bg-black`, children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: imgSrc,
                alt: "",
                className: `object-scale-down w-full h-full`
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                accept: "image/*",
                ref: fileInputRef,
                className: "hidden",
                onChange: handleFileChange
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `flex place-content-center place-items-center
                                        bg-black/10 w-full h-full absolute z-0 top-0 object-cover
                                        text-white/80 `,
                onMouseDown: handleImageClick,
                children: /* @__PURE__ */ jsx("div", { className: `w-[60px] h-[60px] flex flex-col
                                        place-content-center place-items-center bg-white/50
                                        hover:cursor-pointer hover:bg-white/50
                                        rounded-full transition duration-300 ease-in-out`, children: /* @__PURE__ */ jsx(MdEditSquare, { className: " text-[30px]" }) })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `h-[25%]`, children: [
            /* @__PURE__ */ jsx(
              "textarea",
              {
                onChange: (e) => setImageTitle(e.target.value),
                id: "image_title",
                value: imageTitle,
                placeholder: `Enter picture description.`,
                className: `w-full bg-gray-100 px-3  h-[60px] py-3`
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: `flex place-content-end px-3 gap-2`, children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onMouseDown: () => window.location.reload(),
                  className: `bg-gray-800 text-white px-3 py-1.5 rounded-md
                                    shadow-md mb-2 mt-4`,
                  children: "Reload"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onMouseDown: () => handleCloseDialog(),
                  className: `bg-gray-800 text-white px-3 py-1.5 rounded-md
                                    shadow-md mb-2 mt-4`,
                  children: "Close"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleUpdate(),
                  className: `bg-blue-800 text-white px-3 py-1.5 rounded-md
                                    shadow-md mb-2 mt-4`,
                  children: working ? "Working..." : "Submit"
                }
              )
            ] })
          ] })
        ] })
      }
    ) }) }),
    children
  ] });
}
const AddVideoDialogContext = createContext(null);
function useAddVideoDialogContext() {
  const context = useContext(AddVideoDialogContext);
  return context;
}
const password_regex$3 = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
z.object({
  videolink: z.string({ message: "Please enter the video link" }),
  url: z.string().url("Video link is not valid."),
  videotitle: z.string({ message: "Please enter a password" }).min(8, "Password must be at least 8 characters").regex(password_regex$3, "Please enter a valid password"),
  videodescription: z.string().trim().max(500, "Description must be less than 500 characters.").optional()
});
function AddVideoDialogProvider({ children }) {
  const [working, setWorking] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const [userGuid, setUserGuid] = useState(null);
  const [businessGuid, setBusinessGuid] = useState(null);
  const [isImgSelected, setIsImageSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const notification = useNotification();
  const [video, setVideo] = useState(null);
  const [videoIframe, setVideoIframe] = useState(null);
  const [videoVerified, setVideoVerified] = useState(false);
  const [videoUrlState, setVideoUrlState] = useState(false);
  const [videoUrlObject, setVideoUrlObject] = useState(void 0);
  const [videoUrlValue, setVideoUrlValue] = useState("");
  const { showOperation, showError, completeOperation, showSuccess } = useOperation();
  useEffect(() => {
    if (dialog) {
      setVideoVerified(false);
      setVideoUrlState(false);
      setVideoUrlObject(void 0);
      setVideoUrlValue("");
    }
  }, [dialog]);
  useEffect(() => {
    if (videoUrlValue && videoUrlValue.trim().length > 0) {
      setVideoVerified(false);
      setVideoUrlState(true);
    } else {
      setVideoVerified(false);
      setVideoUrlState(false);
    }
  }, [videoUrlValue]);
  const handleCloseDialog = () => {
    setDialog(false);
    setImgSrc(null);
  };
  useEffect(() => {
    const videoUrlObject2 = document.getElementById("videolink");
    setVideoUrlObject(videoUrlObject2);
  }, []);
  useEffect(() => {
    if ((videoUrlObject == null ? void 0 : videoUrlObject.value.trim().length) > 0) {
      setVideoUrlState(true);
    }
  }, [videoUrlObject]);
  const handleVerify = () => {
    showOperation("processing", "Verifying video link.");
    const videoUrl = document.getElementById("videolink");
    getVideoInfo(videoUrl.value);
  };
  async function checkYouTubeVideo(videoId) {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Video not found");
      const data = await res.json();
      return true;
    } catch (err) {
      console.error("❌ Invalid or unavailable video");
      return false;
    }
  }
  const getVideoInfo = async (videoUrl) => {
    showOperation("processing");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = videoUrl.match(regex);
    let videoId = match ? match[1] : null;
    let thumbnail = `https://img.youtube.com/vi/${videoId}/0.jpg`;
    let videoObject = {
      videoId,
      videoUrl,
      videoThumbnail: thumbnail
    };
    const isLoaded = await checkYouTubeVideo(videoId);
    if (isLoaded) {
      try {
        setVideo(videoObject);
        setVideoVerified(true);
        {
        }
        const ytvideoIframe = document.getElementById("yt-iframe");
        ytvideoIframe.src = `https://www.youtube.com/embed/${videoObject == null ? void 0 : videoObject.videoId}`;
      } finally {
        completeOperation();
        showSuccess("Verified", "Enter the video title and optional description to continue.");
      }
    } else {
      notification.alertCancel("Video error!", "Video could not be loaded!");
    }
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    setVideo(videoObject);
  };
  useEffect(() => {
    const iframe = document.getElementById("yt-iframe");
    if (iframe == null ? void 0 : iframe.onload) {
      console.log("✅ Iframe page loaded");
    }
    setVideoIframe(iframe);
  }, []);
  const handleVideoUrlKeyUp = (urlString) => {
    setVideoUrlValue(urlString);
  };
  const handleUpload = async () => {
    setWorking(true);
    showOperation("processing", "Submitting video link");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    let videoLinkState = document.getElementById("videolink");
    let videoTitleState = document.getElementById("videotitle");
    let videoDescriptionState = document.getElementById("videodescr");
    let videoLink = videoLinkState.value;
    let videoTitle = videoTitleState.value;
    let videoDescription = videoDescriptionState.value;
    if (videoLink.trim().length <= 0) {
      showError("Error", "Please enter a Youtube video link");
      completeOperation();
      setWorking(false);
      return false;
    }
    if (videoTitle.trim().length <= 0) {
      showError("Error", "Please enter a video title");
      completeOperation();
      setWorking(false);
      return false;
    }
    if (videoDescription.trim().length > 500) {
      notification.alertCancel("Submission error!", "Video description should not be more than 500 characters!");
      setWorking(false);
      return false;
    }
    const video2 = {
      video_url: videoLink,
      video_title: videoTitle,
      video_description: videoDescription,
      user_guid: userGuid,
      business_guid: businessGuid,
      video_guid: ""
    };
    const result = await saveVideo(video2);
    if (result == null ? void 0 : result.data.videoInsertId) {
      try {
        showSuccess("Success", "Video link submitted");
        completeOperation();
      } finally {
        window.location.reload();
      }
    } else {
      notification == null ? void 0 : notification.alertCancel("Submission Error", "Video Link submission failed.");
      showError("Error", "Submission failed.");
      completeOperation();
    }
  };
  let vals = {
    dialog,
    setDialog,
    imgSrc,
    setImgSrc,
    handleCloseDialog,
    userGuid,
    setUserGuid,
    businessGuid,
    setBusinessGuid,
    isImgSelected,
    setIsImageSelected,
    selectedFile,
    setSelectedFile
  };
  return /* @__PURE__ */ jsxs(AddVideoDialogContext.Provider, { value: vals, children: [
    dialog && /* @__PURE__ */ jsx(
      "div",
      {
        className: `flex w-screen h-screen z-[3000] 
                fixed top-0 left-0 right-0 bottom-0 bg-black/30 rounded-[8px]
                place-content-center place-items-center overflow-hidden`,
        children: /* @__PURE__ */ jsx(
          "div",
          {
            className: `relative w-[90%] h-[80%] bg-white 
                        rounded-[8px] overflow-x-hidden overflow-y-hidden z-[3000]`,
            onClick: (event) => {
              event.preventDefault();
            },
            children: /* @__PURE__ */ jsxs("div", { className: `relative h-full overflow-y-auto`, children: [
              /* @__PURE__ */ jsx("div", { className: `relative w-full h-[75%] max-h-[75%] bg-black`, children: /* @__PURE__ */ jsxs("div", { className: ` relative w-full h-full text-white flex place-items-center place-content-center flex-col`, children: [
                working ? "Loading..." : "Paste a Youtube link below!",
                /* @__PURE__ */ jsx(
                  "iframe",
                  {
                    id: "yt-iframe",
                    src: (video == null ? void 0 : video.videoId) ? `https://www.youtube.com/embed/${video == null ? void 0 : video.videoId}` : void 0,
                    className: "absolute top-0 left-0 w-full h-full",
                    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: `flex mb-1 flex-col mx-3 `, children: [
                /* @__PURE__ */ jsx("div", { className: `text-[14px] font-semibold py-1`, children: "Paste a Youtube video link" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "videolink",
                    type: "text",
                    placeholder: "Paste a Youtube Video",
                    className: `w-full border-[1px] border-gray-700 bg-gray-100 px-3 py-4 outline-none rounded-lg`,
                    onKeyUp: (e) => {
                      handleVideoUrlKeyUp(e.target.value);
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: `flex mb-1 flex-col mx-3 `, children: [
                /* @__PURE__ */ jsx("div", { className: `text-[14px] font-semibold py-1`, children: "Enter video title" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "videotitle",
                    type: "text",
                    placeholder: "Enter Video Title",
                    className: `w-full border-[1px] border-gray-700 bg-gray-100 px-3 py-4 outline-none rounded-lg`
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: `flex mb-1 flex-col mx-3 `, children: [
                /* @__PURE__ */ jsx("div", { className: `text-[14px] font-semibold py-1`, children: "Enter title description" }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    id: "videodescr",
                    placeholder: `Enter picture description.`,
                    className: `w-full border-[1px] border-gray-700 bg-gray-100 px-3 py-4 outline-none rounded-lg`
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: `flex place-content-end px-3 gap-2`, children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onMouseDown: () => handleCloseDialog(),
                    className: `bg-gray-800 text-white px-3 py-1.5 rounded-md
                                    shadow-md mb-2 mt-4`,
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleUpload(),
                    className: `bg-blue-800 text-white px-3 py-1.5 rounded-md
                                    shadow-md mb-2 mt-4 ${!videoVerified ? "hidden" : "block"}`,
                    children: "Submit"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleVerify(),
                    disabled: videoUrlState ? false : true,
                    className: `${videoUrlState ? "bg-blue-800" : "bg-blue-300"} ${videoVerified && "hidden"} text-white px-3 py-1.5 rounded-md
                                    shadow-md mb-2 mt-4`,
                    children: "Verify"
                  }
                )
              ] })
            ] })
          }
        )
      }
    ),
    children
  ] });
}
const VideoSliderContext = createContext(null);
function useVideoSliderContext() {
  const context = useContext(VideoSliderContext);
  return context;
}
const VideoSliderProvider = ({ children }) => {
  const [dialog, setDialog] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [slides, setGallery] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [listing, setListing] = useState(null);
  useRef(0);
  useRef(0);
  const [maximized, setMaximized] = useState(false);
  const handleClose = () => {
    setDialog(false);
  };
  const prev = () => {
    let currentCount = currentSlide;
    const currentVideo = slides[currentCount];
    const currentIframe = document.getElementById(currentVideo == null ? void 0 : currentVideo.video_guid);
    if (currentSlide !== 0) {
      currentIframe.src = "";
    }
    let prevCount = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    const prevVideo = slides[prevCount];
    const iframeObject = document.getElementById(prevVideo == null ? void 0 : prevVideo.video_guid);
    const videoId = getYoutubeId(prevVideo == null ? void 0 : prevVideo.video_url);
    iframeObject.src = `https://www.youtube.com/embed/${videoId}`;
    setCurrentSlide((currentSlide2) => {
      return currentSlide2 === 0 ? slides.length - 1 : currentSlide2 - 1;
    });
  };
  const next = () => {
    let currentCount = currentSlide;
    const currentVideo = slides[currentCount];
    const currentIframe = document.getElementById(currentVideo == null ? void 0 : currentVideo.video_guid);
    if (currentSlide !== slides.length - 1) {
      currentIframe.src = "";
    }
    let nextCount = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
    const nextVideo = slides[nextCount];
    const iframeObject = document.getElementById(nextVideo == null ? void 0 : nextVideo.video_guid);
    const videoId = getYoutubeId(nextVideo == null ? void 0 : nextVideo.video_url);
    iframeObject.src = `https://www.youtube.com/embed/${videoId}`;
    setCurrentSlide((currentSlide2) => {
      return currentSlide2 === slides.length - 1 ? 0 : currentSlide2 + 1;
    });
  };
  useEffect(() => {
    if (selectedSlide !== null) {
      setCurrentSlide(selectedSlide - 1);
    }
  }, [selectedSlide]);
  let vals = {
    dialog,
    setDialog,
    selectedSlide,
    setSelectedSlide,
    slides,
    setGallery,
    setListing
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    if (dialog) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dialog]);
  return /* @__PURE__ */ jsxs(VideoSliderContext.Provider, { value: vals, children: [
    dialog && /* @__PURE__ */ jsx("div", { className: `flex w-full h-full bg-white z-[20001] 
                fixed top-0 left-0 right-0 bottom-0 `, children: /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-12 gap-0 w-full`, children: [
      /* @__PURE__ */ jsxs("div", { className: `${maximized ? "col-span-12" : "col-span-12 md:col-span-9"}  w-full h-full relative bg-black flex`, children: [
        /* @__PURE__ */ jsx("div", { className: ` w-full h-screen flex overflow-hidden`, children: slides && selectedSlide && slides.map((slide, index2) => {
          console.log(slide == null ? void 0 : slide.video_url);
          const videoId = getYoutubeId(slide == null ? void 0 : slide.video_url);
          const videoSrc = `https://www.youtube.com/embed/${videoId}`;
          Date.now().toString() + videoId;
          return /* @__PURE__ */ jsxs(
            "div",
            {
              style: { transform: `translateX(-${currentSlide * 100}%)` },
              className: "object-scale-down w-full h-full \n                   flex flex-shrink-0 flex-grow-0 transition-transform \n                   ease-in-out duration-1000 relative place-items-center place-content-center bg-black text-white",
              children: [
                "Loading...",
                /* @__PURE__ */ jsx(
                  "iframe",
                  {
                    id: slide == null ? void 0 : slide.video_guid,
                    src: videoSrc,
                    className: "absolute top-0 left-0 w-full h-full",
                    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `absolute bottom-[0px] w-full z-[20px] px-5 py-7 bg-black/80 md:hidden`,
                    id: "vstitle",
                    children: /* @__PURE__ */ jsx("div", { className: ` text-center text-white text-[19px] `, children: slide == null ? void 0 : slide.video_title })
                  }
                )
              ]
            },
            index2
          );
        }) }),
        /* @__PURE__ */ jsx("button", { onMouseDown: () => {
          prev();
        }, className: `block absolute top-0 bottom-0 
                                                p-[1rem] cursor-pointer left-0 group h-full 
                                                transition duration-1000 ease-in-out`, children: /* @__PURE__ */ jsx("div", { className: `w-[50px] h-[50px] bg-white/60 rounded-full flex place-content-center place-items-center group-hover:bg-white/30
                                                        transition duration-500 ease-in-out`, children: /* @__PURE__ */ jsx(BiChevronLeft, { className: " stroke-white fill-black w-[2rem] h-[2rem]" }) }) }),
        /* @__PURE__ */ jsx("button", { onMouseDown: next, className: `block absolute top-0 bottom-0 
                                                    p-[1rem] cursor-pointer ${maximized ? "right-5" : "right-5 md:right-0"}  group 
                                                     transition duration-1000 ease-in-out`, children: /* @__PURE__ */ jsx("div", { className: `w-[50px] h-[50px] bg-white/60 rounded-full flex place-content-center place-items-center group-hover:bg-white/30
                                                        transition duration-500 ease-in-out`, children: /* @__PURE__ */ jsx(BiChevronRight, { className: " stroke-white fill-black w-[2rem] h-[2rem]" }) }) }),
        /* @__PURE__ */ jsx(
          "div",
          {
            onMouseDown: () => handleClose(),
            className: `w-[50px] h-[50px] z-[300] bg-white
                                                    flex place-content-center place-items-center
                                                    rounded-full absolute left-2 top-2 cursor-pointer
                                                    hover:bg-white/40 transition duration-1000 ease-in-out`,
            children: /* @__PURE__ */ jsx(IoClose, { className: `text-[30px]` })
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            onClick: () => {
              setMaximized(!maximized);
            },
            className: `w-[50px] h-[50px] z-[300] bg-white flex place-content-center place-items-center rounded-full absolute top-2 right-2 cursor-pointer hover:bg-white/40 transition duration-1000 ease-in-out`,
            children: maximized ? /* @__PURE__ */ jsx(FaMinimize, { className: `text-[30px]` }) : /* @__PURE__ */ jsx(FaMaximize, { className: `text-[30px]` })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `${maximized ? "hidden" : "hidden md:block md:col-span-3"}   px-5 overflow-x-hidden overflow-y-auto h-full bg-white`, children: [
        /* @__PURE__ */ jsxs("h1", { className: " text-[22px] my-4 font-sans font-extrabold tracking-tight leading-[24px]", children: [
          "Videos for ",
          listing && listing.title
        ] }),
        /* @__PURE__ */ jsxs("div", { className: " my-4 ", children: [
          currentSlide + 1,
          " / ",
          slides.length
        ] }),
        /* @__PURE__ */ jsx("hr", {}),
        /* @__PURE__ */ jsx("div", { className: `my-4 whitespace-pre-line border-b pb-2`, children: slides[currentSlide].video_title }),
        slides[currentSlide].video_description && /* @__PURE__ */ jsxs("div", { className: `my-4 whitespace-pre-line  pt-0 pb-8 `, children: [
          /* @__PURE__ */ jsx("div", { className: `font-bold text-lg mb-3`, children: "Description" }),
          /* @__PURE__ */ jsx("div", { children: slides[currentSlide].video_description })
        ] })
      ] })
    ] }) }),
    children
  ] });
};
const EditVideoDialogContext = createContext(null);
function useEditVideoDialogContext() {
  const context = useContext(EditVideoDialogContext);
  if (!context) {
    throw new Error("Wrap the app with an EditVideoDialogProvider!");
  }
  return context;
}
function EditVideoDialogProvider({ children }) {
  const [working, setWorking] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [videoSrc, setVideoSrc] = useState(null);
  const [userGuid, setUserGuid] = useState(null);
  const [businessGuid, setBusinessGuid] = useState(null);
  const [isImgSelected, setIsImageSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [videoTitle, setVideoTitle] = useState(null);
  const [videoDescription, setVideoDescription] = useState(null);
  const [videoGuid, setVideoGuid] = useState(null);
  const [formData, setFormdata] = useState(null);
  const [video, setVideo] = useState(null);
  const [videoIframe, setVideoIframe] = useState(null);
  const [videoVerified, setVideoVerified] = useState(false);
  const [videoUrlState, setVideoUrlState] = useState(true);
  const [videoUrlObject, setVideoUrlObject] = useState(void 0);
  const [videoUrlValue, setVideoUrlValue] = useState("");
  const [videoId, setVideoId] = useState(null);
  useRef(null);
  useNotification();
  const { showOperation, showError, completeOperation, showSuccess } = useOperation();
  useEffect(() => {
    if (videoUrlValue.trim().length > 0) {
      setVideoVerified(false);
      setVideoUrlState(true);
    }
  }, [videoUrlValue]);
  useEffect(() => {
    if (videoSrc) {
      const videoId2 = getYoutubeId(videoSrc);
      setVideoId(videoId2);
    }
  }, [videoSrc]);
  const handleCloseDialog = () => {
    setDialog(false);
    setVideoSrc(null);
    setWorking(false);
  };
  const handleSubmit = async () => {
    setWorking(true);
    showOperation("processing");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    let videoLinkState = document.getElementById("videolink");
    let videoTitleState = document.getElementById("videotitle");
    let videoDescriptionState = document.getElementById("videodescr");
    let videoLink = videoLinkState.value;
    let videoTitle2 = videoTitleState.value;
    let videoDescription2 = videoDescriptionState.value;
    if (videoLink.trim().length <= 0) {
      showError("Error", "Please enter a video link to proceed.");
      completeOperation();
      setWorking(false);
      return false;
    }
    if (videoTitle2.trim().length <= 0) {
      showError("Error", "Please enter a title for the video.");
      completeOperation();
      setWorking(false);
      return false;
    }
    if (videoDescription2.trim().length > 500) {
      showError("Error", "Video description should not be more than 500 characters.");
      completeOperation();
      setWorking(false);
      return false;
    }
    const video2 = {
      video_url: videoLink,
      video_title: videoTitle2,
      video_description: videoDescription2,
      user_guid: userGuid,
      business_guid: businessGuid,
      video_guid: videoGuid
    };
    const result = await updateVideo(video2);
    if ((result == null ? void 0 : result.data.success) === true) {
      showSuccess("Success", "Video link is updated.");
      completeOperation();
    } else {
      showError("Error", "Update failed");
      completeOperation();
    }
  };
  const deleteVideo = async (userGuid2, businessGuid2, videoGuid2) => {
    const endpoint = `/api/listing/save_video_link`;
    const url = config.BASE_URL + endpoint;
    const data = {
      user_guid: userGuid2,
      business_guid: businessGuid2,
      video_guid: videoGuid2,
      video_url: "",
      video_description: "",
      video_title: ""
    };
    setWorking(true);
    showOperation("processing", "Submitting video");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: headers$1,
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        let error = response.json().then((data2) => {
          showError("Error", `Failed: ${data2.message}`);
          completeOperation();
        });
      } else {
        showSuccess("Success", "Video deleted.");
        completeOperation();
      }
    } catch (error) {
      console.log(error);
      showError("Error", "Update failed");
    } finally {
      setWorking(false);
    }
  };
  const handleVideoUrlKeyUp = (urlString) => {
    setVideoUrlValue(urlString);
  };
  async function checkYouTubeVideo(videoId2) {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId2}&format=json`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Video not found");
      const data = await res.json();
      return true;
    } catch (err) {
      console.error("❌ Invalid or unavailable video");
      return false;
    }
  }
  const getVideoInfo = async (videoUrl) => {
    showOperation("processing", "Verifying video");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = videoUrl.match(regex);
    let videoId2 = match ? match[1] : null;
    let thumbnail = `https://img.youtube.com/vi/${videoId2}/0.jpg`;
    let videoObject = {
      videoId: videoId2,
      videoUrl,
      videoThumbnail: thumbnail
    };
    const isLoaded = await checkYouTubeVideo(videoId2);
    if (isLoaded) {
      try {
        setVideo(videoObject);
        setVideoVerified(true);
        {
        }
        const ytvideoIframe = document.getElementById("yt-iframe");
        ytvideoIframe.src = `https://www.youtube.com/embed/${videoObject == null ? void 0 : videoObject.videoId}`;
      } finally {
        showSuccess("Success", "Video link is verified");
        completeOperation();
      }
    } else {
      showError("Error", "Video could not be loaded!");
      completeOperation();
    }
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    setVideo(videoObject);
  };
  const handleVerify = () => {
    const videoUrl = document.getElementById("videolink");
    getVideoInfo(videoUrl.value);
  };
  let vals = {
    dialog,
    setDialog,
    handleCloseDialog,
    videoSrc,
    setVideoSrc,
    userGuid,
    setUserGuid,
    businessGuid,
    setBusinessGuid,
    isImgSelected,
    setIsImageSelected,
    selectedFile,
    setSelectedFile,
    videoTitle,
    setVideoTitle,
    videoGuid,
    setVideoGuid,
    setVideoDescription,
    deleteVideo
  };
  return /* @__PURE__ */ jsxs(EditVideoDialogContext.Provider, { value: vals, children: [
    dialog && /* @__PURE__ */ jsx(
      "div",
      {
        className: `flex w-screen h-screen z-[3000] 
                fixed top-0 left-0 right-0 bottom-0 bg-black/30 rounded-[8px]
                place-content-center place-items-center overflow-hidden`,
        children: /* @__PURE__ */ jsx(
          "div",
          {
            className: `relative w-[90%] h-[80%] bg-white 
                        rounded-[8px] overflow-x-hidden overflow-y-hidden z-[3000]`,
            onClick: (event) => {
              event.preventDefault();
            },
            children: /* @__PURE__ */ jsxs("div", { className: `relative h-full overflow-y-auto`, children: [
              /* @__PURE__ */ jsx("div", { className: `relative w-full h-[75%] max-h-[75%] bg-black`, children: /* @__PURE__ */ jsx("div", { className: ` relative w-full h-full`, children: /* @__PURE__ */ jsx(
                "iframe",
                {
                  id: "yt-iframe",
                  src: videoSrc ? `https://www.youtube.com/embed/${videoId}` : void 0,
                  className: "absolute top-0 left-0 w-full h-full",
                  allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                }
              ) }) }),
              /* @__PURE__ */ jsxs("div", { className: `flex mb-1 flex-col mx-3 `, children: [
                /* @__PURE__ */ jsx("div", { className: `text-[14px] font-semibold py-1`, children: "Paste a Youtube video link" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "videolink",
                    type: "text",
                    defaultValue: videoSrc,
                    placeholder: "Enter Video Link",
                    className: `w-full border-[1px] border-gray-700 bg-gray-100 px-3 py-4 outline-none rounded-lg`,
                    onKeyUp: (e) => {
                      handleVideoUrlKeyUp(e.target.value);
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: `flex mb-1 flex-col mx-3 `, children: [
                /* @__PURE__ */ jsx("div", { className: `text-[14px] font-semibold py-1`, children: "Enter video title" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "videotitle",
                    defaultValue: videoTitle,
                    type: "text",
                    placeholder: "Enter Video Title",
                    className: `w-full border-[1px] border-gray-700 bg-gray-100 px-3 py-4 outline-none rounded-lg`
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: `flex mb-1 flex-col mx-3 `, children: [
                /* @__PURE__ */ jsx("div", { className: `text-[14px] font-semibold py-1`, children: "Enter title description" }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    id: "videodescr",
                    defaultValue: videoDescription,
                    placeholder: `Enter video description.`,
                    className: `w-full border-[1px] border-gray-700 bg-gray-100 px-3 py-4 outline-none rounded-lg`
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: `flex place-content-end px-3 gap-2`, children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onMouseDown: () => window.location.reload(),
                    className: `bg-gray-800 text-white px-3 py-1.5 rounded-md
                                    shadow-md mb-2 mt-4`,
                    children: "Reload"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onMouseDown: () => handleCloseDialog(),
                    className: `bg-gray-800 text-white px-3 py-1.5 rounded-md
                                    shadow-md mb-2 mt-4`,
                    children: "Close"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleSubmit(),
                    className: `bg-blue-800 text-white px-3 py-1.5 rounded-md
                                    shadow-md mb-2 mt-4 ${!videoVerified ? "hidden" : "block"}`,
                    children: "Submit"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleVerify(),
                    disabled: videoUrlState ? false : true,
                    className: `${videoUrlState ? "bg-blue-800" : "bg-blue-300"} ${videoVerified && "hidden"} text-white px-3 py-1.5 rounded-md
                                    shadow-md mb-2 mt-4`,
                    children: "Verify"
                  }
                )
              ] })
            ] })
          }
        )
      }
    ),
    children
  ] });
}
const OnlineStatusContext = createContext(null);
const OnlineStatusProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const updateStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);
    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);
  return /* @__PURE__ */ jsxs(OnlineStatusContext.Provider, { value: isOnline, children: [
    children,
    !isOnline && /* @__PURE__ */ jsx(
      "div",
      {
        style: {
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "blue",
          color: "#fff",
          padding: "10px",
          textAlign: "center",
          fontWeight: "normal",
          zIndex: 1e3,
          letterSpacing: "0px"
        },
        children: "⚠️ System is offline. Check internet connection."
      }
    )
  ] });
};
function isNetworkError(error) {
  return error instanceof Error && (error.message === "Failed to fetch" || error.name === "NetworkError" || error.status === 408);
}
class CustomNetworkError extends Error {
  constructor(message, status = 408, statusText = "Network Error") {
    super(message);
    __publicField(this, "status");
    __publicField(this, "statusText");
    this.name = "NetworkError";
    this.status = status;
    this.statusText = statusText;
  }
}
function NetworkErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();
  useEffect(() => {
    console.error("Routing error:", error);
  }, [error]);
  const isNetworkError2 = error instanceof CustomNetworkError || error instanceof Error && error.message === "Failed to fetch";
  if (!isNetworkError2) {
    throw error;
  }
  const status = error instanceof CustomNetworkError ? error.status : 408;
  const message = error instanceof CustomNetworkError ? error.message : "Network connection failed";
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1100px] mx-auto w-full space-y-8 text-center flex place-items-center place-content-center font-poppins", children: [
    /* @__PURE__ */ jsxs("div", { className: `flex place-items-center place-content-center flex-col`, children: [
      /* @__PURE__ */ jsx(FaWifi, { size: 30 }),
      /* @__PURE__ */ jsx("h2", { className: "mt-6 text-3xl font-extrabold text-gray-900 font-poppins text-center", children: status === 408 ? "Network Connection Lost" : "Connection Error" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-gray-600 text-center font-poppins", children: message })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 space-y-4", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => navigate(0),
          className: "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
          children: "Retry Connection"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => navigate("/"),
          className: "ml-3 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
          children: "Go to Homepage"
        }
      )
    ] })
  ] }) });
}
const LoadingMessage = ({ loading }) => {
  const [spin, startSpin] = useState(true);
  useEffect(() => {
    if (loading) {
      startSpin(true);
    }
  }, [loading]);
  useEffect(() => {
    const handleStopSpin = async (loading2) => {
      setTimeout(() => {
        startSpin(false);
      }, 3e3);
    };
    if (!loading) {
      handleStopSpin();
    }
  }, [loading]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    "div",
    {
      style: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" },
      children: /* @__PURE__ */ jsx("div", { className: "text-lg", children: /* @__PURE__ */ jsxs("div", { style: { marginBottom: "0px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "0.5em" }, children: [
        /* @__PURE__ */ jsx("div", { className: "spinner" }),
        /* @__PURE__ */ jsx("b", { style: { fontFamily: "arial", fontSize: "13px", fontWeight: "bold" }, children: "veycet" })
      ] }) })
    }
  ) });
};
const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  }
];
const headers = () => {
  return {
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    "Pragma": "no-cache",
    "Expires": "0",
    "Surrogate-Control": "no-store"
  };
};
function Layout$1({ children }) {
  const navigation = useNavigation();
  const [hydrated, setHydrated] = useState(false);
  const error = useRouteError();
  const loading = navigation.state !== "idle" || !hydrated;
  useEffect(() => {
    if (loading) {
      setHydrated(true);
    }
  }, [loading]);
  if (isNetworkError(error) || error instanceof CustomNetworkError) {
    return /* @__PURE__ */ jsx(NetworkErrorBoundary, {});
  }
  if (isRouteErrorResponse(error)) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-4xl font-bold", children: [
        error.status,
        " ",
        error.statusText
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-xl", children: error.data })
    ] }) });
  }
  useEffect(() => {
    NProgress.start();
    if (navigation) {
      if (navigation.state !== "loading") {
        NProgress.done();
      }
    }
  }, [navigation]);
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx("link", { rel: "icon", href: "/favicon.png?v=3", type: "image/png" }),
      false,
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      loading && /* @__PURE__ */ jsx(LoadingMessage, { loading }),
      /* @__PURE__ */ jsx(NotificationProvider, { children: /* @__PURE__ */ jsx(OperationProvider, { children: /* @__PURE__ */ jsx(VideoSliderProvider, { children: /* @__PURE__ */ jsx(SliderProvider, { children: /* @__PURE__ */ jsx(EditVideoDialogProvider, { children: /* @__PURE__ */ jsx(EditPhotoDialogProvider, { children: /* @__PURE__ */ jsx(AddPhotoDialogProvider, { children: /* @__PURE__ */ jsx(AddVideoDialogProvider, { children: /* @__PURE__ */ jsx(AuthProvider, { children: /* @__PURE__ */ jsx(OnlineStatusProvider, { children }) }) }) }) }) }) }) }) }) }),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout: Layout$1,
  default: App,
  headers,
  links
}, Symbol.toStringTag, { value: "Module" }));
const HomeNav = () => {
  const [scrollHeight, setScrollHeight] = useState(1);
  const [theme, setTheme] = useState("");
  const [isScroll, setIsScroll] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [navBg, setNavBg] = useState(false);
  useEffect(() => {
    const handler = () => {
      if (window.scrollY >= scrollHeight) {
        setIsScroll(true);
      }
      if (window.scrollY < scrollHeight) {
        setIsScroll(false);
      }
      setScrollHeight(window.scrollY);
    };
    window.onscroll = () => handler();
  }, [scrollHeight]);
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: `shadow-lg pb-3 z-[1000]`, children: [
    /* @__PURE__ */ jsx("div", { className: `h-[10px]` }),
    /* @__PURE__ */ jsx("div", { className: `px-[12px] w-full bg-white`, children: /* @__PURE__ */ jsx("form", { action: "/web/search", children: /* @__PURE__ */ jsxs("div", { className: `bg-gray-100 w-full rounded-full h-[38px]
                    flex place-items-center px-2 gap-2 border
                    border-gray-400/20`, children: [
      /* @__PURE__ */ jsx(BiSearch, { className: `h-[20px] w-[20px]` }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          name: "q",
          placeholder: `Restaurants, Hotels, Cities, Real Estates`,
          className: `bg-transparent w-full outline-none
                            h-full flex place-content-center text-[14px]
                            `
        }
      )
    ] }) }) })
  ] }) });
};
const DarkLogo = () => {
  return /* @__PURE__ */ jsx(Link, { to: `/`, children: /* @__PURE__ */ jsx("div", { className: ` text-[24px]
                cursor-pointer tracking-tight relative
                top-[-1px] font-poppins`, children: getSiteLogo() }) });
};
const Hamburger = ({ theme, openNav, navBg }) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    "div",
    {
      className: `flex items-center`,
      onClick: openNav,
      children: /* @__PURE__ */ jsx("button", { className: `text-white   bg-gray-900 border border-white/50 hover:bg-blue-700 hover:text-black text-[12px] hover:border-[1px] hover:border-yellow-300/20 rounded-none px-3 py-[4px] tracking-tigher`, children: /* @__PURE__ */ jsx(
        HiBars3BottomRight,
        {
          className: `${theme === "light" ? "text-black" : "text-white"} w-9 h-[19px] cursor-pointer`
        }
      ) })
    }
  ) });
};
const mainLink = [
  {
    title: "Email Address",
    icon: /* @__PURE__ */ jsx(MdOutlineAttachEmail, {}),
    link: "/web/account/email_address"
  },
  {
    title: "Change Password",
    icon: /* @__PURE__ */ jsx(MdPassword, {}),
    link: "/web/account/change_password"
  },
  {
    title: "Reset Password",
    icon: /* @__PURE__ */ jsx(MdWifiPassword, {}),
    link: "/web/account/reset_password"
  },
  {
    title: "(De)Activate Profile",
    icon: /* @__PURE__ */ jsx(BsPersonFill, {}),
    link: "/web/account/deactivate_profile"
  }
];
const moreTools = [
  {
    title: "Account Profile",
    icon: /* @__PURE__ */ jsx(BsPersonFillGear, {}),
    link: "/web/account/profile"
  },
  {
    title: "Create Business",
    icon: /* @__PURE__ */ jsx(BiBriefcase, {}),
    link: "/web/account/create_business"
  },
  {
    title: "My Portfolio",
    icon: /* @__PURE__ */ jsx(HiMiniBriefcase, {}),
    link: "/web/account/portfolio"
  },
  {
    title: "Add Event",
    icon: /* @__PURE__ */ jsx(HiMiniBriefcase, {}),
    link: "/web/account/events"
  }
];
const LeftNav = ({ userProfile }) => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const auth = useAuth();
  if (!auth) {
    return null;
  }
  const { user } = auth;
  return /* @__PURE__ */ jsxs("div", { className: `mt-[0px] relative`, children: [
    /* @__PURE__ */ jsx("div", { className: `font-bold text-[18px] px-[15px]`, children: "Manage Account" }),
    /* @__PURE__ */ jsxs("div", { className: ` flex mt-8 pt-3 px-[15px]`, children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: `w-10 h-10 rounded-md
                        bg-blue-200 flex justify-center
                        items-center font-semibold
                        text-blue-800 text-[17px]`,
          children: [
            getFirstChar(user == null ? void 0 : user.first_name),
            getFirstChar(user == null ? void 0 : user.last_name)
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: `
                          flex justify-between items-center
                          overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
                      `,
          children: [
            /* @__PURE__ */ jsxs("div", { className: "leading-4 flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxs("h4", { className: `font-semibold truncate
                            overflow-hidden`, children: [
                user == null ? void 0 : user.first_name,
                " ",
                user == null ? void 0 : user.last_name
              ] }),
              /* @__PURE__ */ jsx("div", { className: `text-xs text-gray-600
                            truncate overflow-hidden`, children: user == null ? void 0 : user.email })
            ] }),
            /* @__PURE__ */ jsx(CgMoreVertical, { size: 20 })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("hr", { className: `mt-[15px]` }),
    /* @__PURE__ */ jsx("div", { className: `mt-[20px]` }),
    /* @__PURE__ */ jsxs("div", { className: ` text-[17px] mt-[20px] px-[15px]
                flex place-items-center h-[40px] place-content-between`, children: [
      /* @__PURE__ */ jsx("div", { className: `font-[600]`, children: "Business Tools" }),
      /* @__PURE__ */ jsx("div", { className: ``, children: /* @__PURE__ */ jsx(CgChevronDown, { className: `text-[20px]` }) })
    ] }),
    moreTools.map((link, index2) => {
      return /* @__PURE__ */ jsx("div", { className: `mt-[0px] `, children: !(userProfile == null ? void 0 : userProfile.active) && link.title === `Create Business` ? /* @__PURE__ */ jsxs("div", { className: ` flex place-items-center gap-3
                        hover:bg-gray-200/60 py-1 rounded text-gray-400 px-[15px]
                        ${location.pathname.startsWith(link.link) && "bg-[#2e374a]/15"}`, children: [
        /* @__PURE__ */ jsx("div", { className: `w-[40px] h-[40px] rounded-full
                    place-content-center place-items-center border-gray-300 text-[23px]`, children: link.icon }),
        /* @__PURE__ */ jsx("div", { className: `text-[13px]`, children: link.title })
      ] }) : /* @__PURE__ */ jsx(Link, { to: link.link, children: /* @__PURE__ */ jsxs("div", { className: ` flex place-items-center gap-3
                        hover:bg-gray-200 py-1 rounded  px-[15px]
                        ${location.pathname.startsWith(link.link) && "bg-[#2e374a]/15"}`, children: [
        /* @__PURE__ */ jsx("div", { className: `w-[40px] h-[40px] rounded-full
                    place-content-center place-items-center border-gray-300 text-[23px]`, children: link.icon }),
        /* @__PURE__ */ jsx("div", { className: `text-[13px]`, children: link.title })
      ] }) }) }, index2);
    }),
    /* @__PURE__ */ jsxs("div", { className: ` text-[17px] mt-[20px] px-[15px]
                flex place-items-center h-[40px] place-content-between`, children: [
      /* @__PURE__ */ jsx("div", { className: `font-[600]`, children: "Profile Tools" }),
      /* @__PURE__ */ jsx("div", { className: ``, children: /* @__PURE__ */ jsx(CgChevronDown, { className: `text-[20px]` }) })
    ] }),
    mainLink.map((link, index2) => {
      return /* @__PURE__ */ jsx("div", { className: `mt-[0px]`, children: /* @__PURE__ */ jsx(Link, { to: link.link, children: /* @__PURE__ */ jsxs("div", { className: ` flex place-items-center gap-3
                        hover:bg-gray-200/60 py-1 rounded px-[15px]
                        ${location.pathname.startsWith(link.link) && "bg-[#2e374a]/15"}`, children: [
        /* @__PURE__ */ jsx("div", { className: `w-[40px] h-[40px] rounded-full
                    place-content-center place-items-center border-gray-300 text-[23px]`, children: link.icon }),
        /* @__PURE__ */ jsx("div", { className: `text-[13px]`, children: link.title })
      ] }) }) }, index2);
    })
  ] });
};
const inputControlWrapper = `mb-8 w-[100%]`;
const inputHeadingClass = `text-black text-xl ml-1.5 mb-2 font-semibold`;
const inputHeadingClassForTextarea = `text-black text-xl ml-1.5 font-semibold`;
const controlInformationClass = `w-full text-gray-400 
mt-[1px] text-[12px] font-normal leading-[1.2em]`;
const inputClass = `border-[1px] border-gray-500/20 w-full px-3 py-2.5 rounded-full 
 bg-gray-50/50 text-[12.5px]`;
const inputClassError = `w-full mt-0 text-[13px] bg-red-100/50 py-2 px-3 rounded-xl flex place-items-center gap-1 text-[13px]`;
const formWrapperClass = `w-full mx-auto mt-10 flex flex-col items-center`;
const inputWrapperClass = `mb-8 w-[100%] `;
const textAreaClass = `border-[1px] border-gray-500/30 w-full px-3 py-2 
rounded-2xl bg-gray-100/40 h-[250px] text-[12px] `;
const whiteLogoColor = ``;
const WhiteLogo = () => {
  return /* @__PURE__ */ jsx(Link, { to: `/`, children: /* @__PURE__ */ jsx("div", { className: ` text-[24px]
                cursor-pointer tracking-tighter relative
                top-[-1px] ${whiteLogoColor} font-poppins font-bold`, children: getSiteLogo() }) });
};
const cnLinks = [
  {
    title: "Home",
    link: "/",
    icon: /* @__PURE__ */ jsx(HiHome, {})
  },
  {
    title: "Browse",
    link: "/web/browse",
    icon: /* @__PURE__ */ jsx(BiSearch, {})
  },
  {
    title: "Terms",
    link: "/web/terms",
    icon: /* @__PURE__ */ jsx(BiBriefcase, {})
  },
  {
    title: "Privacy",
    link: "/web/privacy",
    icon: /* @__PURE__ */ jsx(GiPadlock, {})
  },
  {
    title: "Contact",
    link: "/web/contact",
    icon: /* @__PURE__ */ jsx(MdContacts, {})
  }
];
const MobileNav = ({
  showNav,
  closeNav
}) => {
  const navOpen = showNav ? "translate-x-0" : "translate-x-[-100%]";
  const bgOverlay = showNav ? "block" : "hidden";
  const [userProfile, setUserProfile] = useState(null);
  const auth = useAuth();
  if (!auth) {
    return null;
  }
  const { user } = auth;
  const location = useLocation();
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeNav();
      }
    };
    if (showNav) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showNav, closeNav]);
  useEffect(() => {
    const getData = async (guid) => {
      const userProfile2 = await getUserProfile(guid || "");
      setUserProfile(userProfile2);
    };
    if (auth == null ? void 0 : auth.user) {
      getData(auth == null ? void 0 : auth.user.guid);
    }
  }, [auth == null ? void 0 : auth.user]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: `-mt-[2px] text-black`, children: [
    /* @__PURE__ */ jsx("div", { onClick: closeNav, className: `transform ${bgOverlay} fixed transition-all duration-500 inset-0 z-[4000] bg-black opacity-20 w-full` }),
    /* @__PURE__ */ jsxs("div", { className: `${navOpen} transform transition-all duration-500
                delay-0 fixed  justify-start  h-full top-0 left-0
                w-full md:w-[400px] bg-white z-[4001] ${showNav ? "shadow-lg shadow-black/50" : ""}
                overflow-y-auto
                `, children: [
      /* @__PURE__ */ jsx("div", { className: `bg-white pt-4 pb-4`, children: /* @__PURE__ */ jsxs("div", { className: `px-4 md:pl-12 
                            flex place-content-between h-[60px] 
                            `, children: [
        /* @__PURE__ */ jsx("div", { className: `h-full flex justify-center items-center`, children: /* @__PURE__ */ jsx(WhiteLogo, {}) }),
        /* @__PURE__ */ jsx("div", { className: `h-full flex justify-center items-center`, children: /* @__PURE__ */ jsx(
          "div",
          {
            onClick: closeNav,
            className: `w-[40px] h-[40px] bg-blue-200
                                    rounded-full flex justify-center items-center`,
            children: /* @__PURE__ */ jsx(IoClose, { className: `text-[20px]` })
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsx("hr", { className: ` border-t-[1px] border-yellow-500/20` }),
      /* @__PURE__ */ jsx("div", { className: `flex flex-col mt-5 mx-[15px]`, children: cnLinks.map((link, index2) => {
        return /* @__PURE__ */ jsx("div", { className: `mt-[0px]`, children: /* @__PURE__ */ jsx(Link, { to: link.link, children: /* @__PURE__ */ jsxs("div", { className: ` flex place-items-center gap-3
                                                hover:bg-gray-200/60 py-1 rounded
                                                place-content-between pr-1
                                                ${location.pathname === link.link && "bg-[#2e374a]/15"}`, children: [
          /* @__PURE__ */ jsx("div", { className: `w-[40px] h-[40px] rounded-full
                                            place-content-center place-items-center border-gray-300 text-[20px]`, children: link.icon }),
          /* @__PURE__ */ jsx("div", { className: `text-[13px] grow`, children: link.title }),
          /* @__PURE__ */ jsx("div", { className: `text-[17px]`, children: /* @__PURE__ */ jsx(CgChevronRight, {}) })
        ] }) }) }, index2);
      }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("hr", { className: `mt-[20px]` }),
        /* @__PURE__ */ jsx("div", { className: `mt-[20px]` }),
        user && /* @__PURE__ */ jsx(LeftNav, { userProfile })
      ] }),
      /* @__PURE__ */ jsx("div", { className: `mt-20` })
    ] })
  ] }) });
};
const AccountSettings = () => {
  return /* @__PURE__ */ jsx(Link, { to: `/web/account/profile`, children: /* @__PURE__ */ jsxs("div", { className: `flex hover:bg-gray-100 px-[10px] py-[5px] 
        hover:cursor-pointer gap-2 place-items-center`, children: [
    /* @__PURE__ */ jsx("div", { className: `bg-gray-200 h-[30px] w-[30px] rounded-full
                flex place-items-center place-content-center border`, children: /* @__PURE__ */ jsx(FcSettings, { className: `text-[20px]` }) }),
    /* @__PURE__ */ jsx("div", { className: `truncate text-[13px] text-gray-500`, children: "Account & Settings" })
  ] }) });
};
const AccountSignout = () => {
  const auth = useAuth();
  if (!auth) {
    return null;
  }
  const { signoutReload } = auth;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onClick: () => signoutReload(),
      className: `flex hover:bg-gray-100 px-[10px] py-[5px] 
        hover:cursor-pointer gap-2 place-items-center`,
      children: [
        /* @__PURE__ */ jsx("div", { className: `bg-gray-200 h-[30px] w-[30px] rounded-full
                flex place-items-center place-content-center border`, children: /* @__PURE__ */ jsx(FaSignOutAlt, { className: `text-[20px]` }) }),
        /* @__PURE__ */ jsx("div", { className: `truncate text-[13px] text-gray-500`, children: "Signout" })
      ]
    }
  );
};
const AccountUser = () => {
  const auth = useAuth();
  if (!auth) {
    return null;
  }
  const { user } = auth;
  const [name, setName] = useState("");
  const [userProfileImgData, setUserProfileImgData] = useState(null);
  useEffect(() => {
    setName((user == null ? void 0 : user.first_name) + " " + (user == null ? void 0 : user.last_name));
  }, [user]);
  useEffect(() => {
    const getUserImageData = async (guid) => {
      const userProfile = await getUserProfileImageData(guid);
      setUserProfileImgData(userProfile);
    };
    if ((user == null ? void 0 : user.guid) !== null) {
      getUserImageData(user == null ? void 0 : user.guid);
    }
  }, [user]);
  return /* @__PURE__ */ jsx(Link, { to: `/web/account/profile`, children: /* @__PURE__ */ jsxs("div", { className: `flex hover:bg-gray-100 px-[10px] py-[5px] 
        hover:cursor-pointer gap-2 place-items-center`, children: [
    /* @__PURE__ */ jsx("div", { className: ` relative h-[30px] w-[30px] rounded-full
                    overflow-hidden flex place-content-center place-items-center
                    bg-white`, children: (userProfileImgData == null ? void 0 : userProfileImgData.image_url) ? /* @__PURE__ */ jsx(
      "img",
      {
        className: `object-cover w-full h-full`,
        src: config.IMG_BASE_URL + (userProfileImgData == null ? void 0 : userProfileImgData.image_url),
        alt: ""
      }
    ) : /* @__PURE__ */ jsx(BiUser, { className: `object-cover w-[70%] h-[70%]` }) }),
    /* @__PURE__ */ jsx("div", { className: `truncate text-[13px] inline-block
                    text-gray-500`, children: name })
  ] }) });
};
const DropDown = ({ open }) => {
  return /* @__PURE__ */ jsx("div", { children: open && /* @__PURE__ */ jsx("div", { className: `absolute z-[1000]`, children: /* @__PURE__ */ jsx("div", { className: `relative`, children: /* @__PURE__ */ jsx("div", { className: `absolute right-[-25px] top-[5px]`, children: /* @__PURE__ */ jsxs("div", { className: `w-[250px] bg-white rounded-xl p-[5px] 
                            shadow-lg
                                shadow-black/30`, children: [
    /* @__PURE__ */ jsx(AccountUser, {}),
    /* @__PURE__ */ jsx("div", { className: `px-[10px] my-1`, children: /* @__PURE__ */ jsx("hr", {}) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(AccountSettings, {}),
      /* @__PURE__ */ jsx(AccountSignout, {})
    ] })
  ] }) }) }) }) });
};
const AccountUserImage = ({ userProfileImgData }) => {
  const auth = useAuth();
  if (!auth) {
    return null;
  }
  const { user } = auth;
  const [name, setName] = useState("");
  useEffect(() => {
    setName((user == null ? void 0 : user.first_name) + " " + (user == null ? void 0 : user.last_name));
  }, [user]);
  return /* @__PURE__ */ jsx("div", { className: ` relative h-[30px] w-[30px] rounded-full
                    overflow-hidden flex place-content-center place-items-center
                    bg-white`, children: (userProfileImgData == null ? void 0 : userProfileImgData.image_url) ? /* @__PURE__ */ jsx(
    "img",
    {
      className: `object-cover w-full h-full`,
      src: config.IMG_BASE_URL + (userProfileImgData == null ? void 0 : userProfileImgData.image_url),
      alt: ""
    }
  ) : /* @__PURE__ */ jsx(BiUser, { className: `object-cover w-[70%] h-[70%]` }) });
};
const UserMenu = ({ theme, userProfileImgData }) => {
  const [open, setOpen] = useState(false);
  const auth = useAuth();
  if (!auth) {
    return null;
  }
  const showMenu = () => setOpen(true);
  const closeMenu = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setOpen(false);
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);
  return /* @__PURE__ */ jsxs("div", { children: [
    auth.user ? /* @__PURE__ */ jsx(
      "button",
      {
        onClick: (e) => showMenu(),
        onBlur: (e) => closeMenu(),
        className: `w-[30px] h-[30px] bg-gray-400 hover:bg-gray-300 rounded-full text-white
                flex place-items-center place-content-center text-[13px]
                relative cursor-pointer`,
        children: userProfileImgData !== null ? /* @__PURE__ */ jsx(AccountUserImage, { userProfileImgData }) : /* @__PURE__ */ jsx(BiUser, { className: `object-cover w-[80%] h-[80%]` })
      }
    ) : /* @__PURE__ */ jsx(Link, { to: `/web/signin`, children: /* @__PURE__ */ jsx("button", { className: `text-black border-white/50 border rounded-full border-gray-600 bg-blue-200  hover:text-white text-[12px] px-3 py-[5px] tracking-tigher font-bold hover:bg-blue-200/20`, children: "Sign In" }) }),
    /* @__PURE__ */ jsx(DropDown, { open })
  ] });
};
const HeaderNav$1 = () => {
  const [scrollHeight] = useState(1);
  const [theme, setTheme] = useState("");
  const [isScroll, setIsScroll] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [navBg, setNavBg] = useState(false);
  const openNav = () => setShowNav(true);
  const closeNav = () => setShowNav(false);
  useEffect(() => {
    const handler = () => {
      if (window.scrollY >= scrollHeight) {
        setIsScroll(true);
      }
      if (window.scrollY < scrollHeight) {
        setIsScroll(false);
      }
    };
    window.onscroll = () => handler();
  }, [scrollHeight]);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: `z-[400] fixed w-full  h-[60px] 
      px-[15px] 
     transition-all duration-1000 ease-in-out
     flex flex-col place-content-center
     ${isScroll && "bg-black/90"}
     `, children: /* @__PURE__ */ jsxs("div", { className: `max-w-[1100px] 
      mx-auto w-full text-white relative gap-x-8
        flex place-content-between h-full`, children: [
      /* @__PURE__ */ jsx("div", { className: `font-bold font-sans 
          flex place-items-center text-2xl w-fit
           `, children: /* @__PURE__ */ jsx(DarkLogo, {}) }),
      /* @__PURE__ */ jsx("div", { className: `hidden place-items-center
                     lg:flex  w-full`, children: /* @__PURE__ */ jsx(Link, { to: `/web/search`, children: "Search" }) }),
      /* @__PURE__ */ jsx("div", { className: `flex place-items-center `, children: /* @__PURE__ */ jsxs("div", { className: `flex place-items-center gap-4`, children: [
        /* @__PURE__ */ jsx(UserMenu, { theme: "dark" }),
        /* @__PURE__ */ jsx(Hamburger, { theme: "dark", openNav, navBg })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(
      MobileNav,
      {
        showNav,
        closeNav
      }
    )
  ] });
};
const SearchBox$1 = ({ query: query2 }) => {
  const [queryParam, setQueryParam] = useState("");
  const changeHandler = (e) => {
    setQueryParam(e.target.value);
  };
  useEffect(() => {
    if (query2 !== null && query2 !== void 0) {
      setQueryParam(query2);
    }
  }, [query2]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("form", { action: "/web/search", method: "get", children: /* @__PURE__ */ jsx("div", { className: `mx-[15px]`, children: /* @__PURE__ */ jsxs("div", { className: `max-w-[800px] mx-auto w-full
                        bg-white rounded-md flex overflow-hidden
                        p-[5px] gap-x-1`, children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        name: "q",
        value: queryParam,
        onChange: (e) => changeHandler(e),
        type: "text",
        className: `w-full p-3 outline-none
                                 rounded`,
        placeholder: "Enter an address, city, state or country"
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "submit",
        className: `text-white bg-blue-500 rounded-md
                                border-none font-bold overflow-hidden min-w-[50px] w-[50px]
                                h-[50px] flex justify-center items-center`,
        children: /* @__PURE__ */ jsx(BiSearch, {})
      }
    )
  ] }) }) }) });
};
const heroimgs$1 = [
  {
    img: "/images/hero/man_with_reading_glasses.jpg"
  },
  {
    img: "/images/hero/mobile_device.jpg"
  },
  {
    img: "/images/hero/business_man.jpg"
  },
  {
    img: "/images/hero/realtor_in_dark.jpg"
  },
  {
    img: "/images/hero/lady_eating.jpg"
  },
  {
    img: "/images/hero/bedroom_furniture.jpg"
  },
  {
    img: "/images/hero/perfume.jpg"
  }
];
const HomepageHero$1 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideStep = useRef(0);
  useRef(0);
  const [slides, setSlides] = useState(null);
  let timeoutId = useRef(null);
  const handleTouchStart = (e) => {
    slideStep.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const deltaX = slideStep.current - endX;
    if (deltaX > 50) {
      setCurrentSlide((i) => (i + 1) % heroimgs$1.length);
    } else if (deltaX < -50) {
      setCurrentSlide((i) => (i - 1 + heroimgs$1.length) % heroimgs$1.length);
    }
  };
  useEffect(() => {
    setSlides(heroimgs$1);
  }, []);
  const prev = () => {
    setCurrentSlide((currentSlide2) => {
      return currentSlide2 === 0 ? slides.length - 1 : currentSlide2 - 1;
    });
  };
  const next = () => {
    setCurrentSlide((currentSlide2) => {
      return currentSlide2 === slides.length - 1 ? 0 : currentSlide2 + 1;
    });
  };
  const handleNext = async () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    next();
    timeoutId.current = setTimeout(() => {
    }, 15e3);
  };
  const handlePrev = async () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    prev();
    timeoutId.current = setTimeout(() => {
    }, 15e3);
  };
  useEffect(() => {
  }, [slides]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: `relative`, children: [
    /* @__PURE__ */ jsx("div", { className: ` w-full h-screen flex 
          overflow-hidden  bg-black z-[20]
          `, children: slides == null ? void 0 : slides.map((slide, index2) => {
      return /* @__PURE__ */ jsx(
        "div",
        {
          className: `w-full h-full block 
                                        flex-shrink-0 flex-grow-0 
                                        transition-transform
                                        ease-in-out relative z-[20]
                                        duration-1000 cursor-pointer`,
          onTouchStart: handleTouchStart,
          onTouchEnd: handleTouchEnd,
          style: { transform: `translateX(-${currentSlide * 100}%)` },
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: slide.img,
              alt: "",
              className: `object-cover w-full h-full 
                      block flex-shrink-0 flex-grow-0 transition-transform
                      ease-in-out duration-1000 z-[10] opacity-[70%] `
            },
            index2
          )
        },
        index2
      );
    }) }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `z-[300]`,
        children: [
          /* @__PURE__ */ jsx("button", { onMouseDown: handlePrev, className: `block absolute top-0 bottom-0 
                                                  z-[300] p-[1rem] cursor-pointer left-0 group h-full 
                                                        transition duration-1000 ease-in-out`, children: /* @__PURE__ */ jsx("div", { className: `w-[50px] h-[50px] bg-white/30 rounded-full 
            place-content-center place-items-center group-hover:bg-white/30
            z-[300] transition duration-500 ease-in-out relative `, children: /* @__PURE__ */ jsx(BiChevronLeft, { className: " stroke-white fill-black w-[2rem] h-[2rem]" }) }) }),
          /* @__PURE__ */ jsx("button", { onMouseDown: handleNext, className: `block absolute top-0 bottom-0 
                                                        z-[300]    p-[1rem] cursor-pointer right-0 group 
                                                             transition duration-1000 ease-in-out`, children: /* @__PURE__ */ jsx("div", { className: `w-[50px] h-[50px] bg-white/30 rounded-full 
            flex place-content-center place-items-center group-hover:bg-white/30
            z-[300]   transition duration-500 ease-in-out
            relative `, children: /* @__PURE__ */ jsx(BiChevronRight, { className: " stroke-white fill-black w-[2rem] h-[2rem]" }) }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: ` absolute top-0 w-full h-full
          flex place-content-center place-items-center px-[15px]`, children: /* @__PURE__ */ jsxs(
      "div",
      {
        className: ` 
          max-w-[800px] mx-auto w-full z-[100]`,
        children: [
          /* @__PURE__ */ jsx("div", { className: `text-center text-5xl text-white
                            font-extralight mb-[0px] tracking-wide font-poppins`, children: "Find The Best Businesses" }),
          /* @__PURE__ */ jsx("div", { className: `text-center text-lg text-white
                            font-extralight mb-[20px]`, children: "Across Different Industries Around the World" }),
          /* @__PURE__ */ jsx(SearchBox$1, {})
        ]
      }
    ) })
  ] }) });
};
const LatestStarRating = ({ rating = 0, maxStars = 5 }) => {
  const stars = [];
  for (let i = 1; i <= maxStars; i++) {
    if (i <= rating) {
      stars.push(
        /* @__PURE__ */ jsx("span", { className: "text-green-700 text-lg", children: /* @__PURE__ */ jsx(BsCircleFill, {}) }, i)
      );
    } else {
      stars.push(
        /* @__PURE__ */ jsx("span", { className: "text-green-900 text-lg", children: /* @__PURE__ */ jsx(BsCircle, {}) }, i)
      );
    }
  }
  return /* @__PURE__ */ jsxs("div", { className: " flex w-full place-items-center gap-2 mt-0", children: [
    /* @__PURE__ */ jsx("div", { className: `flex  gap-x-[3px] -mt-[2px]`, children: stars }),
    /* @__PURE__ */ jsx("div", { className: `text-gray-400`, children: /* @__PURE__ */ jsx(BiSolidRightArrow, { className: `text-[15px] text-green-900` }) }),
    /* @__PURE__ */ jsx("div", { className: ` text-sm`, children: Number(rating).toFixed(0) })
  ] });
};
const Recents = ({
  title,
  subtitle,
  category,
  limit
}) => {
  const [ti, setTi] = useState("");
  const [st, setSt] = useState("");
  const [listings, setListings] = useState([]);
  const IMG_BASE_URL2 = "https://tpics.gasimg.com";
  useEffect(() => {
    if (title && subtitle) {
      setTi(title);
      setSt(subtitle);
    }
  }, [title, subtitle]);
  let getListings = async (category2, limit2) => {
    if (limit2 && category2) {
      let cat = await getRecents();
      setListings(cat);
    }
  };
  useEffect(() => {
    if (limit && category) {
      getListings(category, limit);
    }
  }, [limit, category]);
  return /* @__PURE__ */ jsx("div", { className: `px-[15px]`, children: /* @__PURE__ */ jsx("div", { className: `max-w-[1100px] mx-auto w-full`, children: /* @__PURE__ */ jsxs("div", { className: `mt-5 pt-5`, children: [
    /* @__PURE__ */ jsxs("div", { className: ` mb-[20px] border-b pb-4 `, children: [
      /* @__PURE__ */ jsx("div", { className: `font-black text-2xl flex place-content-center
                        tracking-tight`, children: ti }),
      /* @__PURE__ */ jsx("div", { className: `text-sm -mt-[2px] flex place-content-center`, children: st })
    ] }),
    /* @__PURE__ */ jsx("div", { className: `grid grid-cols-2 md:grid-cols-3 
                    lg:grid-cols-4 gap-x-3 gap-y-4
                    `, children: listings == null ? void 0 : listings.map((data, index2) => {
      return /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, { to: `/${data.gid}`, children: /* @__PURE__ */ jsx("div", { className: `relative h-[120px] md:h-[180px]`, children: /* @__PURE__ */ jsx(
          "img",
          {
            className: `object-cover w-full h-full
                                                    text-sm`,
            src: (data == null ? void 0 : data.image_url) !== null ? IMG_BASE_URL2 + (data == null ? void 0 : data.image_url) : "https://accuvice.ng/wp-content/uploads/2016/06/placeholder.gif",
            alt: data.title
          }
        ) }) }) }),
        /* @__PURE__ */ jsx("div", { className: `mt-1 text-[15px] tracking-tight 
                                     truncate font-bold`, children: data.title }),
        /* @__PURE__ */ jsx("div", { className: `mt-1`, children: /* @__PURE__ */ jsx(LatestStarRating, { rating: data.avg_rating }) }),
        /* @__PURE__ */ jsx("div", { className: `text-[11px] mt-[5px] tracking-tight
                                    leading-[1.2em]`, children: data.short_description.substring(0, 100) })
      ] }, index2);
    }) })
  ] }) }) });
};
const categories$1 = [
  {
    title: "Restaurants",
    link: "/web/search?q=restaurant",
    icon: /* @__PURE__ */ jsx(RiRestaurantFill, {})
  },
  {
    title: "Shopping",
    link: "/web/search?q=shopping",
    icon: /* @__PURE__ */ jsx(CgShoppingCart, {})
  },
  {
    title: "Nightlife",
    link: "/web/search?q=nightlife",
    icon: /* @__PURE__ */ jsx(GiStarGate, {})
  },
  {
    title: "Entertainment",
    link: "/web/search?q=entertainment",
    icon: /* @__PURE__ */ jsx(MdMusicNote, {})
  },
  {
    title: "Beauty & Spa",
    link: "/web/search?q=beauty and spa",
    icon: /* @__PURE__ */ jsx(BiSpa, {})
  },
  {
    title: "Automotive",
    link: "/web/search?q=automotive",
    icon: /* @__PURE__ */ jsx(FaCarSide, {})
  },
  {
    title: "Home Services",
    link: "/web/search?q=home service",
    icon: /* @__PURE__ */ jsx(BiHome, {})
  },
  {
    title: "Real Estate",
    link: "/web/search?q=real estate",
    icon: /* @__PURE__ */ jsx(MdRealEstateAgent, {})
  }
];
const FrontPageCategories$1 = () => {
  return /* @__PURE__ */ jsx("div", { className: `w-full relative mt-[50px] px-[15px]`, children: /* @__PURE__ */ jsxs("div", { className: `max-w-[1100px] mx-auto w-full`, children: [
    /* @__PURE__ */ jsx("div", { className: `relative font-sans text-2xl
        text-center font-black mb-8 border-b pb-5
        tracking-tight`, children: "Categories" }),
    /* @__PURE__ */ jsx("div", { className: `grid grid-cols-2 gap-5
          sm:grid-cols-3 sm:gap-8
          lg:grid-cols-4 lg:gap-10`, children: categories$1.map((category, index2) => {
      return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, { to: `${category.link}`, children: /* @__PURE__ */ jsxs("div", { className: `border-[1px] h-[140px] md:h-[200px]
                rounded hover:cursor-pointer border-gray-300
                hover:shadow-none flex flex-col
               place-items-center place-content-center
               gap-y-0 shadow-lg`, children: [
        /* @__PURE__ */ jsx("div", { className: `text-[30px] w-12 h-12 rounded-full
                  flex place-items-center place-content-center
                  bg-gray-100`, children: category.icon }),
        /* @__PURE__ */ jsx("div", { className: `text-base font-semibold
                  text-gray-500`, children: category.title })
      ] }) }) }, index2);
    }) })
  ] }) });
};
const Footer = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: `h-[100px]` }),
    /* @__PURE__ */ jsx("div", { className: " pt-10 pb-12 bg-black w-full px-[15px]", children: /* @__PURE__ */ jsxs("div", { className: `max-w-[1100px] mx-auto w-full`, children: [
      /* @__PURE__ */ jsx("div", { className: `text-white`, children: /* @__PURE__ */ jsx(WhiteLogo, {}) }),
      /* @__PURE__ */ jsx("hr", { className: `border-b-0 border-t-[1px] border-gray-500/50` }),
      /* @__PURE__ */ jsxs("p", { className: " text-center mt-4 text-sm text-white/60 font-extralight", children: [
        "Copyright 2025 © | ",
        /* @__PURE__ */ jsx("a", { href: "/", children: /* @__PURE__ */ jsx("span", { className: `text-white`, children: getSiteLogo() }) })
      ] })
    ] }) })
  ] });
};
const navlinks = [
  {
    id: 1,
    url: "/web/search?q=entertainment",
    label: "Entertainment"
  },
  {
    id: 2,
    url: "/web/search?q=restaurant",
    label: "Restaurant"
  },
  {
    id: 3,
    url: "/web/search?q=hotels",
    label: "Hotels"
  },
  {
    id: 4,
    url: "/web/search?q=travel",
    label: "Travel"
  },
  {
    id: 5,
    url: `/web/search?q=real estate`,
    label: "Real Estate"
  },
  {
    id: 6,
    url: "/web/search?q=services",
    label: "Services"
  }
];
const lnks = [
  { title: "Browse", lnk: "/web/browse", icon: /* @__PURE__ */ jsx(BsSearchHeart, {}) },
  { title: "Terms", lnk: "/web/terms", icon: /* @__PURE__ */ jsx(BiBriefcase, {}) },
  { title: "Privacy", lnk: "/web/privacy", icon: /* @__PURE__ */ jsx(TbWritingSign, {}) },
  { title: "Contact", lnk: "/web/contact", icon: /* @__PURE__ */ jsx(BiCategory, {}) }
  /* { title: "Shop", lnk: "/web/shop", icon: <FiShoppingCart /> },
  { title: "Buy Now", lnk: "/web/buynow", icon: <FaBuysellads /> } */
];
function TopAd() {
  const [adsLoaded, setAdsLoaded] = useState(false);
  useEffect(() => {
  }, []);
  {
    return null;
  }
}
const meta$4 = () => {
  return [
    { title: "Garssete | Business Directory, Travel, Real Estate, Hotels & Restaurants!" },
    { name: "Garssete", content: "Welcome to Garssete!" }
  ];
};
const _index$2 = () => {
  return /* @__PURE__ */ jsxs("div", { className: " h-screen ", children: [
    /* @__PURE__ */ jsx("div", { className: `md:hidden`, children: /* @__PURE__ */ jsx(HomeNav, {}) }),
    /* @__PURE__ */ jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsx(HeaderNav$1, {}) }),
    /* @__PURE__ */ jsx("div", { className: ``, children: /* @__PURE__ */ jsx(HomepageHero$1, {}) }),
    /* @__PURE__ */ jsx(
      Recents,
      {
        category: "services",
        limit: 8,
        title: `Recent Listings`,
        subtitle: "Recent businesses or entities added by date."
      }
    ),
    /* @__PURE__ */ jsx("div", { className: `mt-[48px]` }),
    /* @__PURE__ */ jsx(TopAd, {}),
    /* @__PURE__ */ jsx(FrontPageCategories$1, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _index$2,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
const HamburgerSecondary = ({ theme, openNav, navBg }) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    "div",
    {
      className: `flex items-center`,
      onClick: openNav,
      children: /* @__PURE__ */ jsx("button", { className: ` text-[12px]  hover:border-yellow-300/20 px-1 rounded-none tracking-tigher`, children: /* @__PURE__ */ jsx(BiMenu, { className: `text-[30px]` }) })
    }
  ) });
};
const acctLnks = [
  { title: "Account", lnk: "/web/account/profile", icon: /* @__PURE__ */ jsx(TbPasswordUser, {}) }
];
const SrchNavbar = () => {
  const auth = useAuth();
  if (!auth) {
    return null;
  }
  const { user } = auth;
  const [showNav, setShowNav] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query2 = params.get("q") || "";
  const closeNav = () => setShowNav(false);
  const [userProfileImgData, setUserProfileImgData] = useState(null);
  useEffect(() => {
    const getUserImageData = async (guid) => {
      const userProfile = await getUserProfileImageData(guid);
      setUserProfileImgData(userProfile);
    };
    if ((user == null ? void 0 : user.guid) !== null) {
      getUserImageData(user == null ? void 0 : user.guid);
    }
  }, [user]);
  return /* @__PURE__ */ jsx("div", { className: ``, children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: ` bg-[blue] text-white  fixed top-0 left-0 w-full z-[1000] shadow-lg shadow-black/30`,
      style: { height: `${appConfig.NAVBAR_HEIGHT}px` },
      children: [
        /* @__PURE__ */ jsx(
          MobileNav,
          {
            showNav,
            closeNav
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: `max-w-full mx-auto flex items-center justify-between h-full gap-4 px-4 sm:px-6`, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 lg:border-r border-blue-700 pr-4", children: [
            /* @__PURE__ */ jsx("div", { className: `relative w-[25px] h-[25px] overflow-hidden `, children: /* @__PURE__ */ jsx(
              "img",
              {
                src: `/images/gssico.png`,
                alt: "Garssete",
                width: 30,
                height: 30,
                className: ` object-cover w-full h-full`
              }
            ) }),
            /* @__PURE__ */ jsx(Link, { to: "/", className: "text-3xl font-extrabold tracking-tight font-poppins", children: "Garssete" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "hidden xl:flex gap-8", children: /* @__PURE__ */ jsx(NavLinks, { links: lnks }) }),
          /* @__PURE__ */ jsx("div", { className: "flex-grow hidden sm:flex justify-center", children: /* @__PURE__ */ jsx(SearchBox, { query: query2 }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center lg:border-l border-blue-700 pl-4 gap-2", children: [
            /* @__PURE__ */ jsx(UserMenu, { theme: "light", userProfileImgData }),
            /* @__PURE__ */ jsx(HamburgerSecondary, { theme: "dark", openNav: () => setShowNav(true), navBg: false })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `md:hidden shadow-lg pb-3 z-[1000] bg-white`, children: [
          /* @__PURE__ */ jsx("div", { className: `h-[10px]` }),
          /* @__PURE__ */ jsx("div", { className: `px-[12px] w-full bg-white`, children: /* @__PURE__ */ jsx("form", { action: "/web/browse", children: /* @__PURE__ */ jsxs("div", { className: `bg-gray-100 w-full rounded-full h-[38px]
                                    flex place-items-center px-2 gap-2 border
                                    border-gray-900`, children: [
            /* @__PURE__ */ jsx(BiSearch, { className: `h-[20px] w-[20px] text-gray-500` }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "q",
                defaultValue: query2,
                placeholder: `Restaurants, Hotels, Cities, Real Estates`,
                className: `bg-transparent w-full outline-none
                                            h-full flex place-content-center text-[14px]
                                            text-black`
              }
            )
          ] }) }) })
        ] })
      ]
    }
  ) });
};
const NavLinks = ({ links: links2 }) => {
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    const tokens = localStorage.getItem("authTokens");
    if (tokens !== null) {
      setSignedIn(true);
    }
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "flex gap-6", children: [
    links2.map((link, i) => /* @__PURE__ */ jsx(NavLink, { link, index: i }, i)),
    signedIn && acctLnks.map((link, i) => /* @__PURE__ */ jsx(NavLink, { link, index: i }, i))
  ] });
};
const NavLink = ({ link, index: index2 }) => {
  const location = useLocation();
  return /* @__PURE__ */ jsxs(Link, { to: link.lnk, className: `flex items-center font-light text-[15px] hover:underline `, children: [
    link.icon,
    /* @__PURE__ */ jsx("span", { className: `mx-1 ${location.pathname === link.lnk && "underline text-white"}`, children: link.title }),
    /* @__PURE__ */ jsx(FaAngleDown, { className: "text-xs" })
  ] }, index2);
};
const SearchBox = ({ query: query2 }) => {
  return /* @__PURE__ */ jsx("form", { action: "/web/browse", className: "text-sm w-full max-w-md", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center bg-gray-50 rounded-full pl-4 pr-1 py-1 gap-2\n            border-[1px] border-gray-500", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        name: "q",
        defaultValue: query2,
        type: "text",
        placeholder: "Business name, address, country, state...",
        className: "flex-grow text-gray-700 text-[12px] outline-none bg-transparent"
      }
    ),
    /* @__PURE__ */ jsx("button", { className: "bg-gray-600 w-8 h-8 flex items-center justify-center rounded-full text-white text-lg", children: /* @__PURE__ */ jsx(BiSearch, {}) })
  ] }) });
};
const Layout = ({ children }) => {
  return /* @__PURE__ */ jsxs("div", { className: `h-full w-full`, children: [
    /* @__PURE__ */ jsx(SrchNavbar, {}),
    /* @__PURE__ */ jsx(
      "main",
      {
        className: `h-full flex w-full flex-col mt-[${appConfig.NAVBAR_HEIGHT}px]`,
        children
      }
    )
  ] });
};
const HeroSection = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query2 = params.get("q") || "";
  return /* @__PURE__ */ jsxs("div", { className: `relative h-screen w-full`, children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src: `/images/landing-splash.jpg`,
        alt: "Garssete Business Directory Platform",
        className: `object-cover object-center w-full h-full`
      }
    ),
    /* @__PURE__ */ jsx("div", { className: `absolute inset-0 bg-gradient-to-b from-black/80 to-black/20`, children: /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8 },
        className: `absolute top-1/3 transform -translate-x-1/2 -tralsate-y-1/2 text-center w-full`,
        children: /* @__PURE__ */ jsxs("div", { className: `max-w-5xl mx-auto px-[20px] sm:px-12`, children: [
          /* @__PURE__ */ jsx("h1", { className: `text-4xl md:text-[35px] font-bold text-white mb-6 leading-[1.2em]`, children: "Garssete Business Directory. Connect Your Business to the World" }),
          /* @__PURE__ */ jsx("p", { className: `font-sans text-lg text-white mb-8 font-normal leading-[1.2em] px-[20px]`, children: "Get Discovered Worldwide. List Your Business for Free and Reach Global Partners Instantly!" }),
          /* @__PURE__ */ jsxs(
            "form",
            {
              action: "/web/search",
              className: `flex justify-center`,
              children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    defaultValue: query2,
                    name: "q",
                    placeholder: "Search by city, neighbourhood or address",
                    className: "w-full max-w-lg rounded-none outline-none\n                              rounded-l border-none bg-white h-12 px-4 text-[14px]"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => {
                    },
                    className: `bg-gray-300 text-black rounded-none px-4
                                rounded-r border-none hover:bg-red-300 h-12`,
                    children: "Search"
                  }
                )
              ]
            }
          )
        ] })
      }
    ) })
  ] });
};
const containerVariants$1 = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5,
      staggerChildren: 0.2
    }
  }
};
const itemVariants$1 = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0
  }
};
const getFeatures = () => {
  return [
    {
      imageSrc: `/images/landing-search3.png`,
      title: "List Your Business",
      description: "Create a detailed listing with your services, contact details, and branding. Let the world know what makes your business unique.",
      linkText: "Sign In",
      linkHref: "/web/signin"
    },
    {
      imageSrc: `/images/landing-search${2}.png`,
      title: "Connect with Partners",
      description: "Our global directory connects you with international clients, investors, and collaborators who are actively searching for businesses like yours.",
      linkText: "Sign up",
      linkHref: "/web/signup"
    },
    {
      imageSrc: `/images/landing-search${1}.png`,
      title: "Grow Beyond Borders",
      description: "Gain visibility in new markets and watch your business thrive. With more eyes on your listing, the potential for growth is limitless.",
      linkText: "Discover",
      linkHref: "/web/browse"
    }
  ];
};
const FeaturesSection = () => {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: "hidden",
      whileInView: "visible",
      viewport: { once: true },
      variants: containerVariants$1,
      className: `py-24 px-6 sm:px-8 lg:px-12
            xl:px-16 bg-white`,
      children: /* @__PURE__ */ jsxs("div", { className: `max-w-4xl xl:max-w-[1000px]
            mx-auto`, children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            variants: itemVariants$1,
            className: `my-12 text-center`,
            children: [
              /* @__PURE__ */ jsx("h2", { className: `text-3xl font-bold
                        leading-tight text-gray-800`, children: "Discover" }),
              /* @__PURE__ */ jsx("p", { className: `mt-4 text-xl text-gray-600`, children: "Attract Global Opportunities Today!" }),
              /* @__PURE__ */ jsx("p", { className: `mt-2 text-gray-500
                        max-w-4xl mx-auto`, children: "Quickly list your business and get discovered by potential clients and partners worldwide. Our intuitive platform helps your business stand out and grow without barriers. Start your journey today!" })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: `grid grid-cols-1 md:grid-cols-3
                gap-8 lg:gap-12 xl:gap-16`, children: getFeatures().map((feature, index2) => {
          return /* @__PURE__ */ jsx(
            motion.div,
            {
              variants: itemVariants$1,
              children: /* @__PURE__ */ jsx(
                FeatureCard,
                {
                  imageSrc: feature.imageSrc,
                  title: feature.title,
                  description: feature.description,
                  linkText: feature.linkText,
                  linkHref: feature.linkHref
                }
              )
            },
            index2
          );
        }) })
      ] })
    }
  );
};
const FeatureCard = ({
  imageSrc,
  title,
  description,
  linkText,
  linkHref
}) => {
  return /* @__PURE__ */ jsxs("div", { className: `text-center`, children: [
    /* @__PURE__ */ jsx("div", { className: `p-4 rounded-lg mb-4 flex items-center justify-center h-48 `, children: /* @__PURE__ */ jsx(
      "img",
      {
        src: imageSrc,
        alt: title,
        width: 400,
        height: 400,
        className: `w-full h-full object-contain`
      }
    ) }),
    /* @__PURE__ */ jsx("h3", { className: `text-xl font-semibold mb-2`, children: title }),
    /* @__PURE__ */ jsx("p", { className: `mb-4 `, children: description }),
    /* @__PURE__ */ jsx(
      Link,
      {
        to: linkHref,
        className: `inline-block border border-gray-300 rounded px-4 py-2 hover:bg-gray-100`,
        preventScrollReset: true,
        children: linkText
      }
    )
  ] });
};
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5,
      staggerChildren: 0.2
    }
  }
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0
  }
};
const getCardData = () => {
  return [
    {
      imageSrc: `/images/landing-icon-wand.png`,
      title: "Verified & Trusted Listings",
      description: "Our directory features only trustworthy, verified businesses—backed by real reviews and community ratings. Build connections with confidence."
    },
    {
      imageSrc: `/images/landing-icon-calendar.png`,
      title: "Browse with Ease",
      description: "Seamlessly explore a wide range of businesses across industries and locations. Our platform is built to help you navigate and connect effortlessly."
    },
    {
      imageSrc: `/images/landing-icon-heart.png`,
      title: "Smarter Business Discovery",
      description: "Discover reliable businesses and services with advanced search capabilities and verified insights. We make connecting easier and more secure."
    }
  ];
};
const DiscoverSection = () => {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: "hidden",
      whileInView: "visible",
      viewport: { once: true },
      variants: containerVariants,
      className: `py-12 bg-white mb-16 text-black`,
      children: /* @__PURE__ */ jsxs("div", { className: `max-w-6xl xl:max-w-[1000px]
            mx-auto px-6 sm:px-8 lg:px-12 xl:px-0 `, children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            variants: itemVariants,
            className: `my-12 text-center`,
            children: [
              /* @__PURE__ */ jsx("h2", { className: `text-3xl font-bold
                    leading-tight text-gray-800`, children: "Quickly Find the Right Business" }),
              /* @__PURE__ */ jsx("p", { className: `mt-4 text-xl text-gray-600`, children: "Powerful Filters to Narrow Your Search!" }),
              /* @__PURE__ */ jsx("p", { className: `mt-2 text-gray-500
                    max-w-4xl mx-auto`, children: "Easily locate the exact type of business or service you need using our intelligent and intuitive filtering system. Save time and connect with the right professionals!" })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: `grid grid-cols-1 md:grid-cols-3
                gap-8 lg:gap-12 xl:gap-16 text-center`, children: getCardData().map((card, index2) => {
          return /* @__PURE__ */ jsx(
            motion.div,
            {
              variants: itemVariants,
              children: /* @__PURE__ */ jsx(
                DiscoverCard,
                {
                  ...card
                }
              )
            },
            index2
          );
        }) })
      ] })
    }
  );
};
const DiscoverCard = ({
  imageSrc,
  title,
  description
}) => {
  return /* @__PURE__ */ jsxs("div", { className: `px-4 py-12 shadow-lg rounded-lg bg-gray-50 md:h-72`, children: [
    /* @__PURE__ */ jsx("div", { className: `bg-gray-700 p-[0.6rem] rounded-full mb-4 h-10
            w-10 mx-auto`, children: /* @__PURE__ */ jsx(
      "img",
      {
        src: imageSrc,
        alt: title,
        width: 30,
        height: 30,
        className: `w-full h-full`
      }
    ) }),
    /* @__PURE__ */ jsx("h3", { className: `mt-4 text-xl font-mediium text-gray-800`, children: title }),
    /* @__PURE__ */ jsx("p", { className: `mt-2 text-base text-gray-500`, children: description })
  ] });
};
const CallToActionSection = () => {
  return /* @__PURE__ */ jsxs("div", { className: `relative bg-black h-[300px] min-h-[300px]`, children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src: `/images/landing-call-to-action.jpg`,
        alt: "",
        className: `object-cover w-full h-full`
      }
    ),
    /* @__PURE__ */ jsx("div", { className: `absolute inset-0 bg-black bg-opacity-60 flex place-content-center `, children: /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        transition: { duration: 0 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        className: `relative max-w-10xl xl:max-w-12xl
                    px-6 sm:px-8 lg:px-12 xl:px-16 py-12 flex place-items-center`,
        children: /* @__PURE__ */ jsxs("div", { className: `flex flex-col md:flex-row justify-between
                    items-center text-center md:gap-20`, children: [
          /* @__PURE__ */ jsx("div", { className: `mb-6 md:mb-0 md:mr-10 `, children: /* @__PURE__ */ jsx("h2", { className: `text-2xl font-bold text-white`, children: "Sign up. Get access to global and local businesses." }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: `text-white mb-3`, children: "Explore a wide network of businesses and services tailored to your location and industry needs." }),
            /* @__PURE__ */ jsxs("div", { className: `flex justify-center md:justify-start gap-4`, children: [
              /* @__PURE__ */ jsx(
                Link,
                {
                  className: `inline-block text-primary-700 bg-white rounded-lg 
                                    px-6 py-3 font-semibold hover:bg-primary-500 hover:text-primary-50`,
                  to: "/web/browse",
                  children: "Browse"
                }
              ),
              /* @__PURE__ */ jsx(
                Link,
                {
                  to: "/web/signup",
                  className: `inline-block text-white bg-red-700 rounded-lg 
                                    px-6 py-3 font-semibold hover:bg-red-500 hover:text-primary-50`,
                  children: "Sign up"
                }
              )
            ] })
          ] })
        ] })
      }
    ) })
  ] });
};
const socials = [
  {
    title: "Facebook",
    url: "http://facebook.com/garssete",
    icon: faFacebookSquare
  },
  {
    title: "Instagram",
    url: "http://instagram.com/garssete",
    icon: faInstagram
  },
  {
    title: "Twitter",
    url: "http://x.com/garssete",
    icon: faTwitterSquare
  },
  {
    title: "Linkedin",
    url: "https://www.linkedin.com/company/garssete",
    icon: faLinkedin
  },
  {
    title: "Youtube",
    url: "https://www.youtube.com/@Garssete",
    icon: faYoutubeSquare
  }
];
const ftrLinks = [
  {
    title: "About Us",
    url: "/web/about",
    icon: faAudible
  },
  {
    title: "Contact Us",
    url: "/web/contact",
    icon: FaMobile
  },
  {
    title: "FAQ",
    url: "/web/faq",
    icon: FaQuestion
  },
  {
    title: "Terms",
    url: "/web/terms",
    icon: FaBagShopping
  },
  {
    title: "Privacy",
    url: "/web/privacy",
    icon: FaBriefcase
  }
];
const FooterSection = () => {
  return /* @__PURE__ */ jsx("footer", { className: "border-t border-gray-200 py-20", children: /* @__PURE__ */ jsxs("div", { className: `max-w-6xl mx-auto px-6 sm:px-8`, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between\n              items-center\n              ", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsx(
        Link,
        {
          to: `/`,
          className: `text-xl font-bold tracking-tighter`,
          preventScrollReset: true,
          children: "GARSSETE"
        }
      ) }),
      /* @__PURE__ */ jsx("nav", { className: `mb-8`, children: /* @__PURE__ */ jsx("ul", { className: "flex flex-col text-center space-y-6 md:flex-row md:space-x-6 md:space-y-0", children: ftrLinks.map((link, index2) => {
        return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: link.url, children: link.title }) }, index2);
      }) }) }),
      /* @__PURE__ */ jsx("div", { className: `flex space-x-4 mb-8`, children: socials.map((media, index2) => {
        return /* @__PURE__ */ jsx(
          "a",
          {
            href: media == null ? void 0 : media.url,
            target: "_blank",
            "aria-label": media.title,
            className: "hover:text-primary-600",
            children: /* @__PURE__ */ jsx(
              FontAwesomeIcon,
              {
                icon: media.icon,
                className: "h-6 w-6"
              }
            )
          },
          index2
        );
      }) })
    ] }),
    /* @__PURE__ */ jsx("hr", {}),
    /* @__PURE__ */ jsx("div", { className: `mt-8 text-center text-sm text-gray-500 flex md:justify-center space-x-4 flex-col md:flex-row`, children: /* @__PURE__ */ jsx("span", { children: "@Garssete. All rights reserved." }) })
  ] }) });
};
const meta$3 = () => {
  return [
    { title: "Garssete | Business Directory, Travel, Real Estate, Hotels & Restaurants!" },
    { name: "Garssete", content: "Welcome to Garssete!" }
  ];
};
const _index$1 = () => {
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(HeroSection, {}),
    /* @__PURE__ */ jsx(FeaturesSection, {}),
    /* @__PURE__ */ jsx(DiscoverSection, {}),
    /* @__PURE__ */ jsx(CallToActionSection, {}),
    /* @__PURE__ */ jsx(FooterSection, {})
  ] });
};
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _index$1,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
const meta$2 = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" }
  ];
};
function Index$4() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(HeaderNav, {}),
    /* @__PURE__ */ jsx(HomepageHero, {}),
    /* @__PURE__ */ jsx(
      Recents,
      {
        category: "services",
        limit: 8,
        title: `Recent Listings`,
        subtitle: "Recent businesses or entities added by date."
      }
    ),
    /* @__PURE__ */ jsx(FrontPageCategories, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const HeaderNav = () => {
  const [scrollHeight] = useState(1);
  const [theme, setTheme] = useState("");
  const [isScroll, setIsScroll] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [navBg, setNavBg] = useState(false);
  const openNav = () => setShowNav(true);
  const closeNav = () => setShowNav(false);
  useEffect(() => {
    const handler = () => {
      if (window.scrollY >= scrollHeight) {
        setIsScroll(true);
      }
      if (window.scrollY < scrollHeight) {
        setIsScroll(false);
      }
    };
    window.onscroll = () => handler();
  }, [scrollHeight]);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: `z-[400] fixed w-full  h-[60px] 
      px-[15px] 
     transition-all duration-1000 ease-in-out
     flex flex-col place-content-center
     ${isScroll && "bg-black/50"}
     `, children: /* @__PURE__ */ jsxs("div", { className: `max-w-[1100px] 
      mx-auto w-full text-white 
        flex place-content-between h-full gap-x-8`, children: [
      /* @__PURE__ */ jsx("div", { className: `font-bold font-sans 
          flex place-items-center text-2xl`, children: /* @__PURE__ */ jsx(WhiteLogo, {}) }),
      /* @__PURE__ */ jsx("div", { className: `hidden place-items-center
          w-full lg:flex`, children: /* @__PURE__ */ jsx(Link, { to: `/web/search`, children: "Search" }) }),
      /* @__PURE__ */ jsx("div", { className: `flex place-items-center`, children: /* @__PURE__ */ jsxs("div", { className: `flex place-items-center gap-4`, children: [
        /* @__PURE__ */ jsx(UserMenu, { theme: "dark" }),
        /* @__PURE__ */ jsx(Hamburger, { theme: "dark", openNav, navBg })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(
      MobileNav,
      {
        showNav,
        closeNav
      }
    )
  ] });
};
const heroimgs = [
  {
    img: "images/dubai7star.jpeg"
  },
  {
    img: "https://r4.wallpaperflare.com/wallpaper/791/501/238/new-york-city-buildings-wallpaper-51351344a10dae2b3cd90e3cb71d503d.jpg"
  },
  {
    img: "https://c0.wallpaperflare.com/path/494/492/40/signage-brand-cyan-yellow-5d1465fafe2d1f3e8deff1bbe07c71ce.jpg"
  }
];
const HomepageHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  useRef(0);
  useRef(0);
  const [slides, setSlides] = useState(null);
  let timeoutId = useRef(null);
  useEffect(() => {
    setSlides(heroimgs);
  }, []);
  const prev = () => {
    setCurrentSlide((currentSlide2) => {
      return currentSlide2 === 0 ? slides.length - 1 : currentSlide2 - 1;
    });
  };
  const next = () => {
    setCurrentSlide((currentSlide2) => {
      return currentSlide2 === slides.length - 1 ? 0 : currentSlide2 + 1;
    });
  };
  const handleNext = async () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    next();
    timeoutId.current = setTimeout(() => {
      handleNext();
    }, 15e3);
  };
  const handlePrev = async () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    prev();
    timeoutId.current = setTimeout(() => {
      next();
    }, 15e3);
  };
  useEffect(() => {
    const startSlide = async (slides2) => {
      if (slides2 !== null) {
        const cnt = slides2.length;
        for (let i = 0; i < cnt; i++) {
          timeoutId = await new Promise((resolve) => setTimeout(resolve, 15e3));
          next();
          if (i == slides2.length - 1) {
            startSlide(slides2);
          }
        }
      }
    };
    if (slides) {
      startSlide(slides);
    }
  }, [slides]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: `relative`, children: [
    /* @__PURE__ */ jsx("div", { className: ` w-full h-[300px] md:h-[500px] flex 
          overflow-hidden z-0
          `, children: slides == null ? void 0 : slides.map((slide, index2) => {
      return /* @__PURE__ */ jsx(
        "img",
        {
          src: slide.img,
          alt: "",
          style: { transform: `translateX(-${currentSlide * 100}%)` },
          className: `object-cover w-full h-full 
                      block flex-shrink-0 flex-grow-0 transition-transform
                      ease-in-out duration-1000`
        },
        index2
      );
    }) }),
    /* @__PURE__ */ jsx("div", { className: `w-full h-[70%]
          absolute z-[200] top-0
          bg-gradient-to-b
     from-black/60 to-transparent` }),
    /* @__PURE__ */ jsxs("div", { className: `z-[300]`, children: [
      /* @__PURE__ */ jsx("button", { onMouseDown: handlePrev, className: `block absolute top-0 bottom-0 
                                                  z-[300] p-[1rem] cursor-pointer left-0 group h-full 
                                                        transition duration-1000 ease-in-out`, children: /* @__PURE__ */ jsx("div", { className: `w-[50px] h-[50px] bg-white/60 rounded-full 
            place-content-center place-items-center group-hover:bg-white/30
            z-[300] transition duration-500 ease-in-out relative top-[100px]`, children: /* @__PURE__ */ jsx(BiChevronLeft, { className: " stroke-white fill-black w-[2rem] h-[2rem]" }) }) }),
      /* @__PURE__ */ jsx("button", { onMouseDown: handleNext, className: `block absolute top-0 bottom-0 
                                                        z-[300]    p-[1rem] cursor-pointer right-0 group 
                                                             transition duration-1000 ease-in-out`, children: /* @__PURE__ */ jsx("div", { className: `w-[50px] h-[50px] bg-white/60 rounded-full 
            flex place-content-center place-items-center group-hover:bg-white/30
            z-[300]   transition duration-500 ease-in-out
            relative top-[100px]`, children: /* @__PURE__ */ jsx(BiChevronRight, { className: " stroke-white fill-black w-[2rem] h-[2rem]" }) }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: `z-100 absolute top-0 w-full h-[300px] md:h-[500px] 
          flex place-content-center place-items-center px-[15px]`, children: /* @__PURE__ */ jsx(
      "div",
      {
        className: ` 
          max-w-[800px] mx-auto w-full z-[300]`,
        children: /* @__PURE__ */ jsx(SearchBox$1, {})
      }
    ) })
  ] }) });
};
const categories = [
  {
    title: "Restaurants",
    link: "/web/search?q=restaurants",
    icon: /* @__PURE__ */ jsx(RiRestaurantFill, {})
  },
  {
    title: "Shopping",
    link: "/web/search?q=shopping",
    icon: /* @__PURE__ */ jsx(CgShoppingCart, {})
  },
  {
    title: "Nightlife",
    link: "/web/search?q=nightlife",
    icon: /* @__PURE__ */ jsx(GiStarGate, {})
  },
  {
    title: "Active Life",
    link: "/web/search?q=nightlife",
    icon: /* @__PURE__ */ jsx(BiBullseye, {})
  },
  {
    title: "Beauty & Spa",
    link: "/web/search?q=beauty and spa",
    icon: /* @__PURE__ */ jsx(BiSpa, {})
  },
  {
    title: "Automotive",
    link: "/web/search?q=automotive",
    icon: /* @__PURE__ */ jsx(FaCarSide, {})
  },
  {
    title: "Home Services",
    link: "/web/search?q=home service",
    icon: /* @__PURE__ */ jsx(BiHome, {})
  },
  {
    title: "Real Estate",
    link: "/web/search?q=real estate",
    icon: /* @__PURE__ */ jsx(MdRealEstateAgent, {})
  }
];
const FrontPageCategories = () => {
  return /* @__PURE__ */ jsx("div", { className: `w-full relative mt-[50px] px-[15px]`, children: /* @__PURE__ */ jsxs("div", { className: `max-w-[1100px] mx-auto w-full`, children: [
    /* @__PURE__ */ jsx("div", { className: `relative font-sans text-2xl
        text-center font-black mb-8 border-b pb-5
        tracking-tight`, children: "Categories" }),
    /* @__PURE__ */ jsx("div", { className: `grid grid-cols-2 gap-5
          sm:grid-cols-3 sm:gap-8
          lg:grid-cols-4 lg:gap-10`, children: categories.map((category, index2) => {
      return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, { to: `${category.link}`, children: /* @__PURE__ */ jsxs("div", { className: `border-[1px] h-[140px] md:h-[200px]
                rounded hover:cursor-pointer border-gray-300
                hover:shadow-none flex flex-col
               place-items-center place-content-center
               gap-y-0 shadow-lg`, children: [
        /* @__PURE__ */ jsx("div", { className: `text-[30px] w-12 h-12 rounded-full
                  flex place-items-center place-content-center
                  bg-gray-100`, children: category.icon }),
        /* @__PURE__ */ jsx("div", { className: `text-base font-semibold
                  text-gray-500`, children: category.title })
      ] }) }) }, index2);
    }) })
  ] }) });
};
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FrontPageCategories,
  HeaderNav,
  HomepageHero,
  default: Index$4,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const MainLogo = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsxs("div", { className: `flex place-items-center w-fit text-[21px] tracking-tight gap-[2px] font-extrabold font-sans place-content-between`, children: [
    /* @__PURE__ */ jsxs("div", { className: `text-blue-800 first-letter:`, children: [
      /* @__PURE__ */ jsx("i", { children: "b" }),
      "ycet."
    ] }),
    /* @__PURE__ */ jsxs("div", { className: ``, children: [
      /* @__PURE__ */ jsx("span", { className: "italic font-serif", children: "i" }),
      "ndex"
    ] })
  ] }) }) });
};
const SigninButton = () => {
  const [open, setOpen] = useState(false);
  const auth = useAuth();
  if (!auth) {
    return null;
  }
  const { user } = auth;
  const showMenu = () => setOpen(true);
  const closeMenu = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setOpen(false);
  };
  const [userProfileImgData, setUserProfileImgData] = useState(null);
  useEffect(() => {
    const getUserImageData = async (guid) => {
      const userProfile = await getUserProfileImageData(guid);
      setUserProfileImgData(userProfile);
    };
    if ((user == null ? void 0 : user.guid) !== null) {
      getUserImageData(user == null ? void 0 : user.guid);
    }
  }, [user]);
  return /* @__PURE__ */ jsxs("div", { className: ` `, children: [
    auth.user ? /* @__PURE__ */ jsx(
      "button",
      {
        onClick: (e) => showMenu(),
        onBlur: (e) => closeMenu(),
        className: `w-[30px] h-[30px] bg-gray-400 hover:bg-gray-300 rounded-full text-white
                flex place-items-center place-content-center text-[13px]
                relative cursor-pointer`,
        children: userProfileImgData !== null ? /* @__PURE__ */ jsx(AccountUserImage, { userProfileImgData }) : /* @__PURE__ */ jsx(BiUser, { className: `object-cover w-[80%] h-[80%]` })
      }
    ) : /* @__PURE__ */ jsx(Link, { to: `/web/signin`, children: /* @__PURE__ */ jsx("button", { className: ` w-[70px] h-[35px] border rounded-full`, children: "Sign in" }) }),
    /* @__PURE__ */ jsx(DropDown, { open })
  ] });
};
const MainNavContext = createContext(null);
const MainNavProvider = ({ children }) => {
  const [clickSearch, setClickSearch] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const showMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);
  const data = {
    isOpen,
    showMenu,
    closeMenu
  };
  return /* @__PURE__ */ jsx(MainNavContext.Provider, { value: data, children });
};
const moremenu = [
  {
    title: `Veycet Global`,
    url: "http://veycet.com",
    icon: /* @__PURE__ */ jsx(BiWorld, {})
  },
  {
    title: " Index",
    url: "/",
    icon: /* @__PURE__ */ jsx(BiHome, {})
  },
  {
    title: "Browse",
    url: "/web/browse",
    icon: /* @__PURE__ */ jsx(BiSearch, {})
  },
  {
    title: "About",
    url: "/web/about",
    icon: /* @__PURE__ */ jsx(BsFillBriefcaseFill, {})
  },
  {
    title: "Contact",
    url: "/web/contact",
    icon: /* @__PURE__ */ jsx(CgPhone, {})
  },
  {
    title: "Terms of Use",
    url: "/web/terms",
    icon: /* @__PURE__ */ jsx(FaShoppingBag, {})
  },
  {
    "title": "Privacy",
    "url": "/web/privacy",
    icon: /* @__PURE__ */ jsx(BiLock, {})
  },
  {
    "title": "Responsible Disclosure",
    "url": "/web/responsible_disclosure",
    icon: /* @__PURE__ */ jsx(FaBlenderPhone, {})
  },
  {
    "title": "Copyright",
    "url": "/web/copyright",
    icon: /* @__PURE__ */ jsx(BiCopyright, {})
  }
];
const MobileMenu = ({ openMenu, closeNav }) => {
  useLocation();
  const navOpen = openMenu ? "translate-x-0" : "translate-x-[-100%]";
  const bgOverlay = openMenu ? "block" : "hidden";
  const [userProfile, setUserProfile] = useState(null);
  const auth = useAuth();
  if (!auth) {
    return null;
  }
  const { user } = auth;
  useEffect(() => {
    const getData = async (guid) => {
      const userProfile2 = await getUserProfile(guid || "");
      setUserProfile(userProfile2);
    };
    if (auth == null ? void 0 : auth.user) {
      getData(auth == null ? void 0 : auth.user.guid);
    }
  }, [auth == null ? void 0 : auth.user]);
  return /* @__PURE__ */ jsxs("div", { className: ``, children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        onClick: closeNav,
        className: `transform fixed transition-all duration-500 inset-0 z-4000 bg-black opacity-20 w-full ${bgOverlay}`
      }
    ),
    /* @__PURE__ */ jsx("div", { className: `transform transition-all duration-500 delay-0 fixed justify-start h-full w-full md:w-[300px] bg-white z-4001 overflow-y-auto top-0 left-0 text-black ${navOpen} ${openMenu ? "shadow-lg shadow-black/50" : ""} bg-[url(https://unbound.radiantthemes.com/wp-content/uploads/2022/03/Banner-Image.png?id=8229)]`, children: /* @__PURE__ */ jsxs("div", { className: `bg-transparent `, children: [
      /* @__PURE__ */ jsxs("div", { className: ` px-4 md:pl-12 flex place-content-between h-[60px] place-items-center`, children: [
        /* @__PURE__ */ jsx("div", { className: "h-full flex justify-center items-center", children: /* @__PURE__ */ jsx(MainLogo, {}) }),
        /* @__PURE__ */ jsx("div", { className: "h-full flex justify-center items-center cursor-pointer", children: /* @__PURE__ */ jsx(
          "div",
          {
            onClick: closeNav,
            className: "w-[30px] h-[30px] bg-gray-200 rounded-full flex justify-center items-center hover:bg-blue-600 hover:text-white border border-gray-500 group",
            children: /* @__PURE__ */ jsx(IoClose, { size: 28, className: ` transition-all duration-500 ease-in-out group-hover:rotate-90` })
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("hr", { className: `mobile-nav-hrule` }),
      /* @__PURE__ */ jsx(
        VerticalMenu,
        {
          menuData: moremenu,
          closeNav
        }
      ),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("hr", { className: `mt-[20px]` }),
        /* @__PURE__ */ jsx("div", { className: `mt-[20px]` }),
        user && /* @__PURE__ */ jsx(LeftNav, { userProfile })
      ] }),
      /* @__PURE__ */ jsx("div", { className: `h-10` })
    ] }) })
  ] });
};
const VerticalMenu = ({ menuData, closeNav }) => {
  const location = useLocation();
  return /* @__PURE__ */ jsx("div", { children: menuData.map((menu, index2) => {
    menu.icon;
    return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link$1, { to: menu.url, onClick: () => closeNav(), children: /* @__PURE__ */ jsxs(
      "div",
      {
        className: `group text-[15px] py-2 px-4 rounded-none hover:bg-gray-200 hover:cursor-pointer flex place-items-center place-content-between w-full hover:text-gray-500 ${location.pathname === menu.url && " bg-gray-200 text-black"}`,
        children: [
          /* @__PURE__ */ jsxs("div", { className: ` flex place-items-center gap-10 py-1`, children: [
            /* @__PURE__ */ jsx("div", { className: `w-[22px] h-[20px] flex place-items-center place-content-center  text-[20px]`, children: menu.icon }),
            /* @__PURE__ */ jsx("div", { className: `text-[13px]`, children: menu.title })
          ] }),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(CgChevronRight, { size: 20, className: "transition-all delay-0 duration-500 ease-in-out group-hover:rotate-90" }) })
        ]
      }
    ) }) }, index2);
  }) });
};
const HamburgerMenu = () => {
  const mainMenuContext = useContext(MainNavContext);
  if (!mainMenuContext) {
    return null;
  }
  const menuCtx = mainMenuContext;
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(MobileMenu, { openMenu: menuCtx.isOpen, closeNav: menuCtx.closeMenu }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `text-2xl w-[32px] h-[32px] flex place-items-center place-content-center rounded-full hover:cursor-pointer bg-gray-100 hover:bg-gray-200`,
        onClick: () => menuCtx.showMenu(),
        children: /* @__PURE__ */ jsx(CgMenu, {})
      }
    )
  ] });
};
const MainSearch = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query2 = params.get("q") || "";
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("form", { action: "/web/browse", className: `bg-gray-100 rounded-full h-[40px] flex place-items-center pl-[20px] gap-2 max-w-[50%] grow group hover:shadow hover:bg-white`, children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        name: "q",
        defaultValue: query2,
        className: `w-full bg-transparent outline-none`,
        placeholder: "Search businesses..."
      }
    ),
    /* @__PURE__ */ jsx("button", { className: `h-full bg-gray-500 min-w-[70px] w-[70px] rounded-full text-white flex place-items-center place-content-center text-xl group-hover:bg-gray-700 group-hover:cursor-pointer`, children: /* @__PURE__ */ jsx(LuSearch, {}) })
  ] }) });
};
const menudata = [
  {
    title: "Browse",
    url: "/web/browse"
  },
  {
    title: "New York",
    url: "/web/browse?q=&category=shopping and retail&city=new york city"
  },
  {
    title: "London",
    url: "/web/browse?q=&category=shopping and retail&city=london"
  },
  {
    title: "Dubai",
    url: "/web/browse?q=&category=shopping and retail&city=dubai"
  }
];
const SmallMenu = () => {
  const location = useLocation();
  return /* @__PURE__ */ jsx("div", { className: `hidden lg:block`, children: /* @__PURE__ */ jsxs("div", { className: `flex gap-8 place-items-center`, children: [
    menudata == null ? void 0 : menudata.map((item, index2) => {
      return /* @__PURE__ */ jsx("div", { className: `font-semibold ${location.pathname === item.url ? "text-black" : "text-gray-500"} `, children: /* @__PURE__ */ jsx(Link, { to: item.url, children: /* @__PURE__ */ jsx("div", { className: `capitalize`, children: item.title }) }) }, index2);
    }),
    /* @__PURE__ */ jsx(MoreItem, {})
  ] }) });
};
const MoreItem = () => {
  return /* @__PURE__ */ jsx("div", { className: `h-[35px] w-[35px] rounded-full flex place-items-center place-content-center bg-gray-100 cursor-pointer`, children: /* @__PURE__ */ jsx(BsThreeDotsVertical, {}) });
};
function useScrollThreshold(options = {}) {
  const { threshold = 0, delay = 150 } = options;
  const [isOverThreshold, setIsOverThreshold] = useState(false);
  const scrollTimeout = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const crossedThreshold = currentScrollY > threshold;
      setIsOverThreshold(crossedThreshold);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = setTimeout(() => {
      }, delay);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [threshold, delay]);
  return isOverThreshold;
}
const MainNav = () => {
  const isOverThreshold = useScrollThreshold({ delay: 100 });
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(MainNavProvider, { children: /* @__PURE__ */ jsxs(AuthProvider, { children: [
    /* @__PURE__ */ jsx("div", { className: `w-full h-[60px] border-b border-b-gray-200 fixed left-0 top-0 right-0 z-[100] bg-white ${isOverThreshold && " shadow-lg"} transition-all duration-1000 ease-in-out`, children: /* @__PURE__ */ jsxs("div", { className: `max-w-[98%] h-full mx-auto w-full flex place-items-center place-content-between gap-2 relative `, children: [
      /* @__PURE__ */ jsx(HamburgerMenu, {}),
      /* @__PURE__ */ jsx(MainLogo, {}),
      /* @__PURE__ */ jsx(MainSearch, {}),
      /* @__PURE__ */ jsx(SmallMenu, {}),
      /* @__PURE__ */ jsx(SigninButton, {})
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: `h-[60px]` })
  ] }) }) });
};
const HomeLayout = ({ children }) => {
  return /* @__PURE__ */ jsxs("div", { className: `h-full w-full bg-gray-100`, children: [
    /* @__PURE__ */ jsx(MainNav, {}),
    /* @__PURE__ */ jsx(
      "main",
      {
        className: `h-full flex w-full flex-col mt-[${appConfig.NAVBAR_HEIGHT}px]`,
        children
      }
    )
  ] });
};
const SearchBar = () => {
  return /* @__PURE__ */ jsx("form", { action: "/web/browse", className: ` w-full`, children: /* @__PURE__ */ jsxs("div", { className: `border-2 border-black rounded-full flex place-items-center place-content-between gap-3 pl-[15px] pr-[4px] py-1 bg-gray-100 shadow-md shadow-gray-300 font-poppins font-light`, children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(BiSearch, { size: 25 }) }),
    /* @__PURE__ */ jsx("div", { className: `grow w-full`, children: /* @__PURE__ */ jsx(
      "input",
      {
        name: "q",
        placeholder: `Search businesses, hotels, entertainment`,
        type: "text",
        className: `w-full py-3 outline-none text-[17px] h-full bg-transparent`
      }
    ) }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      "button",
      {
        className: `bg-purple-600 py-3 rounded-full px-6 border-[1px] border-black text-[15px] font-poppins text-white font-[500]`,
        children: "Search"
      }
    ) })
  ] }) });
};
const catlnks = [
  {
    title: "Hotels",
    category: "hotel",
    icon: /* @__PURE__ */ jsx(BiHotel, { size: 20 }),
    color: "text-purple-700"
  },
  {
    title: "Real Estate",
    category: "real estate",
    icon: /* @__PURE__ */ jsx(BsHouse, { size: 17 }),
    color: "text-orange-600"
  },
  {
    title: "Restaurants",
    category: "restaurants",
    icon: /* @__PURE__ */ jsx(GiKnifeFork, { size: 17 }),
    color: "text-black"
  },
  {
    title: "Business",
    category: "business services",
    icon: /* @__PURE__ */ jsx(FcBusiness, { size: 17 })
  },
  {
    title: "Entertainment",
    category: "entertainment",
    icon: /* @__PURE__ */ jsx(RiGovernmentFill, { size: 17 })
  }
  // Added more categories to demonstrate overflow
];
const CategoryLinks = () => {
  return /* @__PURE__ */ jsx("div", { className: "flex space-x-6 md:space-x-8 lg:justify-evenly lg:space-x-0", children: catlnks == null ? void 0 : catlnks.map((link, index2) => /* @__PURE__ */ jsx("a", { href: `/web/browse?q=&category=${link.category}`, children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-gray-100 min-w-max cursor-pointer",
      children: [
        /* @__PURE__ */ jsx("span", { className: link.color || "text-gray-700", children: link.icon }),
        /* @__PURE__ */ jsx("span", { className: "text-[15px] md:text-[16.5px] font-medium whitespace-nowrap", children: link.title })
      ]
    },
    index2
  ) }, index2)) });
};
const SearchBusiness = () => {
  return /* @__PURE__ */ jsx("div", { className: `px-[15px] z-0`, children: /* @__PURE__ */ jsxs("div", { className: `max-w-[1100px] mx-auto w-full relative md:mt-0`, children: [
    /* @__PURE__ */ jsxs("div", { className: ` mt-12 md:mt-24 `, children: [
      /* @__PURE__ */ jsxs("div", { className: `text-lg text-center z-0`, children: [
        "Business Directory",
        /* @__PURE__ */ jsx("i", { children: "!" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: `font-poppins text-4xl text-center font-black md:text-5xl tracking-tighter`, children: "Search Businesses?" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `max-w-[800px] mx-auto w-full mt-10 md:mt-16`, children: [
      /* @__PURE__ */ jsx("div", { className: "w-full overflow-x-auto scroll-container pb-0 scrollbar-hidden", children: /* @__PURE__ */ jsx("div", { className: "min-w-max", children: /* @__PURE__ */ jsx(CategoryLinks, {}) }) }),
      /* @__PURE__ */ jsx("div", { className: `mt-2 md:mt-8`, children: /* @__PURE__ */ jsx(SearchBar, {}) })
    ] })
  ] }) });
};
const topcat$1 = [
  {
    title: "Hotels",
    category: "hotel",
    icon: /* @__PURE__ */ jsx(BiHotel, { size: 20 }),
    link: "/web/browse?q=hotel",
    bglink: "/images/home/hotels-img.jpg"
  },
  {
    title: "Entertainment",
    category: "entertainment",
    icon: /* @__PURE__ */ jsx(BsHouse, { size: 17 }),
    link: "/web/browse?q=hotel",
    bglink: `/images/home/ent-img.webp`
  },
  {
    title: "Restaurant",
    category: "restaurant",
    icon: /* @__PURE__ */ jsx(GiKnifeFork, { size: 17 }),
    link: "/web/browse?q=hotel",
    bglink: `/images/home/rest-img.webp`
  },
  {
    title: "Travels",
    category: "travel",
    icon: /* @__PURE__ */ jsx(BsAirplane, { size: 17 }),
    link: "/web/browse?q=travel",
    bglink: `/images/home/travel.jpg`
  },
  {
    title: "Real Estate",
    category: "real estate",
    icon: /* @__PURE__ */ jsx(FcHome, { size: 17 }),
    link: "/web/browse?q=realestate",
    bglink: `/images/home/real-img.jpg`
  }
  // Added more categories to demonstrate overflow
];
const TopCategories = () => {
  const scrollRef = useRef(null);
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
  return /* @__PURE__ */ jsx("div", { className: `px-[15px] mt-24`, children: /* @__PURE__ */ jsxs("div", { className: `max-w-[1100px] mx-auto w-full`, children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: `text-[19px] font-poppins font-bold`, children: "Find businesses by interest" }),
      /* @__PURE__ */ jsx("div", { className: `text-[15px] font-poppins mt-1 mb-6`, children: "Whatever you're into, we've got you covered." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `relative`, children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          ref: scrollRef,
          className: `w-full overflow-x-auto bottom-scrollbar-hidden relative rounded-xl`,
          children: /* @__PURE__ */ jsx("div", { className: `flex gap-3`, children: topcat$1 == null ? void 0 : topcat$1.map((category, index2) => {
            const lnk = `/web/browse?q=&category=${category.category}`;
            return /* @__PURE__ */ jsx(
              Link,
              {
                to: lnk,
                children: /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: `border-none rounded-xl min-w-[220px] md:min-w-[220px] h-[400px] overflow-hidden relative`,
                    children: [
                      /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: category == null ? void 0 : category.bglink,
                          alt: "",
                          className: `object-cover w-full h-full`
                        }
                      ),
                      /* @__PURE__ */ jsx("div", { className: `absolute bottom-0 text-white h-[40%] bg-gradient-to-t from-black to-gray-200/0 w-full flex items-end content-start`, children: /* @__PURE__ */ jsx("div", { className: `mx-3 mb-6 text-2xl font-poppins leading-[1.3em] font-bold`, children: category == null ? void 0 : category.title }) })
                    ]
                  },
                  index2
                )
              },
              index2
            );
          }) })
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `absolute text-white top-1/2 -translate-y-1/2 left-2 w-[50px] min-w-[50px] h-[50px] bg-black/50 hover:bg-white/70 hover:text-black flex place-content-center place-items-center hover:cursor-pointer border-[1px] border-gray-400 rounded-full z-[50]`,
          onClick: () => {
            scrollLeft();
          },
          children: /* @__PURE__ */ jsx(FaChevronLeft, {})
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `absolute text-white top-1/2 -translate-y-1/2 right-2 w-[50px] min-w-[50px] h-[50px] bg-black/70 hover:bg-white/70 hover:text-black flex place-content-center place-items-center hover:cursor-pointer border-[1px] border-gray-400 rounded-full z-[50]`,
          onClick: () => {
            scrollRight();
          },
          children: /* @__PURE__ */ jsx(FaChevronRight, {})
        }
      )
    ] })
  ] }) });
};
const topcat = [
  {
    title: "Find Real Estate Businesses",
    category: "real estate",
    link: "/web/browse?q=real estate",
    bglink: `/images/home/realest.png`
  },
  {
    title: "Discover IT and Tech Firms",
    category: "technology and it",
    link: "/web/browse?q=technology and it",
    bglink: `/images/home/techr.jpg`
  },
  {
    title: "Browse Cleaning Services Companies",
    category: "cleaning services",
    link: "/web/browse?q=&category=cleaning services",
    bglink: `/images/home/cleaning.jpg`
  },
  {
    title: "Explore Advertising and Marketing Agencies",
    category: "advertising & marketing",
    link: "/web/browse?q=&category=advertising marketing",
    bglink: `/images/home/advert.jpg`
  },
  {
    title: "Autmotive Manufacturing and Sales",
    category: "automotive",
    link: "/web/browse?q=&category=automotive",
    bglink: `/images/home/autom.jpeg`
  },
  {
    title: "Communities and Government Agencies",
    category: "community and government",
    link: "/web/browse?q=&category=community and government",
    bglink: `/images/home/gov.jpg`
  }
  // Added more categories to demonstrate overflow
];
const Inspire = () => {
  const scrollRef = useRef(null);
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
  return /* @__PURE__ */ jsx("div", { className: `px-[15px] mt-24 pt-[40px] pb-[60px] bg-gray-100`, children: /* @__PURE__ */ jsxs("div", { className: `max-w-[1100px] mx-auto w-full`, children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: `text-[19px] font-poppins font-bold`, children: "Get inspired to do more" }),
      /* @__PURE__ */ jsx("div", { className: `text-[15px] font-poppins mt-1 mb-6`, children: "Whatever you're into, we've got it" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `relative`, children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          ref: scrollRef,
          className: `w-full overflow-x-auto bottom-scrollbar-hidden relative rounded-xl`,
          children: /* @__PURE__ */ jsx("div", { className: `flex gap-3 place-content-between`, children: topcat == null ? void 0 : topcat.map((business, index2) => {
            const lnk = `/web/browse?q=&category=${business == null ? void 0 : business.category}`;
            return /* @__PURE__ */ jsx(
              "div",
              {
                children: /* @__PURE__ */ jsxs(Link, { to: lnk, children: [
                  /* @__PURE__ */ jsxs("div", { className: `border-none rounded-xl min-w-[220px] md:min-w-[280px] h-[250px] overflow-hidden relative`, children: [
                    /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: business == null ? void 0 : business.bglink,
                        alt: "",
                        className: `object-cover w-full h-full`
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: `absolute bottom-0 text-white h-[40%] w-full flex items-end content-start` })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: `mt-3 `, children: [
                    /* @__PURE__ */ jsx("div", { className: `font-poppins text-xl font-[500] text-center capitalize`, children: business == null ? void 0 : business.title }),
                    /* @__PURE__ */ jsx("div", { className: `mt-2 font-poppins text-[13px] font-[500] text-gray-500 text-center capitalize`, children: business == null ? void 0 : business.category })
                  ] })
                ] })
              },
              index2
            );
          }) })
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `absolute text-white top-1/2 -translate-y-1/2 left-2 w-[50px] min-w-[50px] h-[50px] bg-black/50 hover:bg-white/70 hover:text-black flex place-content-center place-items-center hover:cursor-pointer border-[1px] border-gray-400 rounded-full z-[50]`,
          onClick: () => {
            scrollLeft();
          },
          children: /* @__PURE__ */ jsx(FaChevronLeft, {})
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `absolute text-white top-1/2 -translate-y-1/2 right-2 w-[50px] min-w-[50px] h-[50px] bg-black/70 hover:bg-white/70 hover:text-black flex place-content-center place-items-center hover:cursor-pointer border-[1px] border-gray-400 rounded-full z-[50]`,
          onClick: () => {
            scrollRight();
          },
          children: /* @__PURE__ */ jsx(FaChevronRight, {})
        }
      )
    ] })
  ] }) });
};
const hotels = [
  {
    title: "Luxury shopping paradise amid dazzling modern architecture.",
    city: `dubai`,
    category: "shopping and retail",
    link: "/web/browse?q=&category=shopping and retail&city=dubai",
    bglink: `https://www.vexcolt.com/wp-content/uploads/2018/04/ref_Mall_01.jpg`
  },
  {
    title: "Historic streets brimming with iconic retail destinations.",
    city: `london`,
    category: "shopping and retail",
    link: "/web/browse?q=hotel&city=london",
    bglink: `https://www.europetravelguide.co.uk/wp-content/uploads/2020/05/Shopping-in-London.jpg`
  },
  {
    title: "Ultimate urban shopping experience, endless variety.",
    city: `new york city`,
    category: "shopping and retail",
    link: "/web/browse?q=hotel&city=new york",
    bglink: `https://thetravelexpert.ie/wp-content/uploads/2015/09/new-york-742795_1280_opt.jpg`
  },
  {
    title: "Opulent malls meet rich traditional market culture.",
    city: `doha`,
    category: "shopping and retail",
    link: "/web/browse?q=hotel&city=doha",
    bglink: `https://visitqatar.com/content/dam/visitqatar/img/things-to-do/shopping-in-qatar/shopping-malls-2.jpg/_jcr_content/renditions/medium-1280px.jpeg`
  },
  {
    title: "Chic fashion capital and style epicenter.",
    city: `paris`,
    category: "shopping and retail",
    link: "/web/browse?q=hotel&city=paris",
    bglink: `https://hips.hearstapps.com/hmg-prod/images/crowds-of-people-at-rue-montorgueil-pedestrian-royalty-free-image-1576958383.jpg`
  }
  // Added more categories to demonstrate overflow
];
const Hotel = () => {
  const scrollRef = useRef(null);
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
  return /* @__PURE__ */ jsx("div", { className: `px-[15px] mt-24`, children: /* @__PURE__ */ jsxs("div", { className: `max-w-[1100px] mx-auto w-full`, children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: `text-[19px] font-poppins font-bold`, children: "Explore shops worldwide" }),
      /* @__PURE__ */ jsx("div", { className: `text-[15px] font-poppins mt-1 mb-6`, children: "Whatever you're into, we've got it" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `relative`, children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          ref: scrollRef,
          className: `w-full overflow-x-auto bottom-scrollbar-hidden relative rounded-xl`,
          children: /* @__PURE__ */ jsx("div", { className: `flex gap-3`, children: hotels == null ? void 0 : hotels.map((business, index2) => {
            const link = `/web/browse?q=&category=${business == null ? void 0 : business.category}&city=${business == null ? void 0 : business.city}`;
            return /* @__PURE__ */ jsx(
              "div",
              {
                children: /* @__PURE__ */ jsxs(Link, { to: link, children: [
                  /* @__PURE__ */ jsxs("div", { className: `border-none rounded-xl min-w-[220px] md:min-w-[280px] h-[290px] overflow-hidden relative`, children: [
                    /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: business == null ? void 0 : business.bglink,
                        alt: "",
                        className: `object-cover w-full h-full`
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: `absolute bottom-0 text-white h-[40%] w-full flex items-end content-start` })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: `mt-3 `, children: [
                    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: `bg-gray-100 w-fit px-2 rounded capitalize`, children: business == null ? void 0 : business.city }) }),
                    /* @__PURE__ */ jsx("div", { className: `font-poppins text-xl font-[500] mt-[3px]`, children: business == null ? void 0 : business.title })
                  ] })
                ] })
              },
              index2
            );
          }) })
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `absolute text-white top-1/2 -translate-y-1/2 left-2 w-[50px] min-w-[50px] h-[50px] bg-black/50 hover:bg-white/70 hover:text-black flex place-content-center place-items-center hover:cursor-pointer border-[1px] border-gray-400 rounded-full z-[50]`,
          onClick: () => {
            scrollLeft();
          },
          children: /* @__PURE__ */ jsx(FaChevronLeft, {})
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `absolute text-white top-1/2 -translate-y-1/2 right-2 w-[50px] min-w-[50px] h-[50px] bg-black/70 hover:bg-white/70 hover:text-black flex place-content-center place-items-center hover:cursor-pointer border-[1px] border-gray-400 rounded-full z-[50]`,
          onClick: () => {
            scrollRight();
          },
          children: /* @__PURE__ */ jsx(FaChevronRight, {})
        }
      )
    ] })
  ] }) });
};
const Hotels = ({ data }) => {
  const scrollRef = useRef(null);
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
  return /* @__PURE__ */ jsx("div", { className: `px-[15px] mt-24 pt-[40px] pb-[60px] bg-gray-100`, children: /* @__PURE__ */ jsxs("div", { className: `max-w-[1100px] mx-auto w-full`, children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: `text-[19px] font-poppins font-bold`, children: [
        "Discover hotels across the globe",
        /* @__PURE__ */ jsx("i", { children: "!" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: `text-[15px] font-poppins mt-1 mb-6`, children: "Browse both affordable and luxury hotels" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `relative`, children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          ref: scrollRef,
          className: `w-full overflow-x-auto bottom-scrollbar-hidden relative rounded-xl`,
          children: /* @__PURE__ */ jsx("div", { className: `flex gap-3`, children: data == null ? void 0 : data.map((business, index2) => {
            return /* @__PURE__ */ jsx(
              "div",
              {
                children: /* @__PURE__ */ jsxs("a", { href: `/${(business == null ? void 0 : business.username) || (business == null ? void 0 : business.gid)}`, children: [
                  /* @__PURE__ */ jsxs("div", { className: `border-none rounded-xl min-w-[220px] md:min-w-[280px] h-[250px] overflow-hidden relative`, children: [
                    /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: config.IMG_BASE_URL + (business == null ? void 0 : business.image_url),
                        alt: "",
                        className: `object-cover w-full h-full`
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: `absolute bottom-0 text-white h-[40%] w-full flex items-end content-start` })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: `mt-3 `, children: [
                    /* @__PURE__ */ jsx("div", { className: `font-poppins text-xl font-[500] text-center`, children: business == null ? void 0 : business.title }),
                    /* @__PURE__ */ jsx("div", { className: `mt-2 font-poppins text-[13px] font-[500] text-gray-500 text-center`, children: (business == null ? void 0 : business.city_name) || (business == null ? void 0 : business.state_name) || (business == null ? void 0 : business.country_name) })
                  ] })
                ] })
              },
              index2
            );
          }) })
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `absolute text-white top-1/2 -translate-y-1/2 left-2 w-[50px] min-w-[50px] h-[50px] bg-black/50 hover:bg-white/70 hover:text-black flex place-content-center place-items-center hover:cursor-pointer border-[1px] border-gray-400 rounded-full z-[50]`,
          onClick: () => {
            scrollLeft();
          },
          children: /* @__PURE__ */ jsx(FaChevronLeft, {})
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `absolute text-white top-1/2 -translate-y-1/2 right-2 w-[50px] min-w-[50px] h-[50px] bg-black/70 hover:bg-white/70 hover:text-black flex place-content-center place-items-center hover:cursor-pointer border-[1px] border-gray-400 rounded-full z-[50]`,
          onClick: () => {
            scrollRight();
          },
          children: /* @__PURE__ */ jsx(FaChevronRight, {})
        }
      )
    ] })
  ] }) });
};
const YourGuide = () => {
  return /* @__PURE__ */ jsx("div", { className: `px-[15px] mt-24`, children: /* @__PURE__ */ jsx("div", { className: `max-w-[1000px] mx-auto w-full`, children: /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-1 md:grid-cols-2 md:gap-x-4 gap-y-8 md:gap-y-0`, children: [
    /* @__PURE__ */ jsx("div", { className: `flex flex-col place-content-center place-items-center`, children: /* @__PURE__ */ jsxs("div", { className: `w-[90%] md:w-[80%]`, children: [
      /* @__PURE__ */ jsx("div", { className: `font-poppins text-center font-[400] text-lg text-gray-600`, children: "Garssete Business Directory" }),
      /* @__PURE__ */ jsxs("div", { className: `mt-4 font-poppins text-4xl text-center font-[600]`, children: [
        "Your guide to businesses around the globe",
        /* @__PURE__ */ jsx("span", { className: `italic`, children: "!" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: `text-center mt-2`, children: "We've researched various needs of businesses to achieve visibility and global status with minimal effort, well sourced information so you can take your business to the next leve." }),
      /* @__PURE__ */ jsx("div", { className: `text-center mt-6 flex place-content-center`, children: /* @__PURE__ */ jsx(Link, { to: `/web/signup`, children: /* @__PURE__ */ jsx("div", { className: `bg-black px-10 py-4 text-lg text-white font-poppins w-fit rounded-full`, children: "Sign up!" }) }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: `relative overflow-hidden rounded-xl`, children: /* @__PURE__ */ jsx(
      "img",
      {
        src: `/images/home/dubai-real-estate-1.jpg`,
        alt: "",
        className: `object-cover w-full h-full`
      }
    ) })
  ] }) }) });
};
const aboutLinks = [
  {
    title: "Terms",
    link: "/web/terms"
  },
  {
    title: "Privacy",
    link: "/web/privacy"
  },
  {
    title: "Contact us",
    link: "/web/contact"
  },
  {
    title: "Account",
    link: "/web/account/profile"
  },
  {
    title: "Portfolio",
    link: "/web/account/"
  },
  {
    title: "Forgot Password",
    link: "/web/reset_password"
  },
  {
    title: "Signup",
    link: "/web/signup"
  }
];
const explorLinks = [
  {
    title: "London",
    link: "/web/browse?q=&city=london"
  },
  {
    title: "New York",
    link: "/web/browse?q=&city=new york city"
  },
  {
    title: "Paris",
    link: "/web/browse?q=&city=paris"
  },
  {
    title: "Berlin",
    link: "/web/browse?q=&city=berlin"
  },
  {
    title: "Dubai",
    link: "/web/browse?q=&city=dubai"
  },
  {
    title: "Beijing",
    link: "/web/browse?q=&city=beijing"
  }
];
const doBusinessLinks = [
  {
    title: "Hotels",
    id: "hotel"
  },
  {
    title: "Restaurants",
    id: "restaurants"
  },
  {
    title: "Travel",
    id: "travel, hospitality and rentals"
  },
  {
    title: "Business Services",
    id: "business services"
  },
  {
    title: "Real Estate",
    id: "real estate"
  },
  {
    title: "Automotive",
    id: "automotive"
  },
  {
    title: "Shopping",
    id: "shopping and retail"
  }
];
const garsseteSocialLinks = [
  {
    icon: /* @__PURE__ */ jsx(FaFacebook, {}),
    link: "http://facebook.com/garssete"
  },
  {
    icon: /* @__PURE__ */ jsx(FaXTwitter, {}),
    link: "http://x.com/garssete"
  },
  {
    icon: /* @__PURE__ */ jsx(FaInstagram, {}),
    link: "http://instagram.com/garssete"
  }
];
const garsseteSites = [
  {
    title: "Book a consultation",
    link: "/web/contact"
  },
  {
    title: "Support or Help",
    link: "/web/contact"
  }
];
const FooterAlt = () => {
  return /* @__PURE__ */ jsx("div", { className: `px-[15px] bg-gray-100 pt-[50px] pb-[70px]`, children: /* @__PURE__ */ jsxs("div", { className: `max-w-[1100px] mx-auto w-full`, children: [
    /* @__PURE__ */ jsxs("div", { className: `w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-8 lg:gap-x-4`, children: [
      /* @__PURE__ */ jsxs("div", { className: `lg:col-span-2 flex flex-col place-items-center text-center md:place-items-start md:text-left`, children: [
        /* @__PURE__ */ jsx("div", { className: `font-poppins font-[300] text-xl`, children: "About Garssete" }),
        /* @__PURE__ */ jsx("div", { className: `flex flex-col space-y-2 mt-2 font-poppins font-[300]`, children: aboutLinks.map((link, index2) => {
          return /* @__PURE__ */ jsx(
            Link,
            {
              to: link == null ? void 0 : link.link,
              className: `hover:underline`,
              children: /* @__PURE__ */ jsx("div", { children: link == null ? void 0 : link.title })
            },
            index2
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `lg:col-span-2 flex flex-col place-items-center text-center md:place-items-start md:text-left`, children: [
        /* @__PURE__ */ jsx("div", { className: `font-poppins font-[300] text-xl`, children: "Discover" }),
        /* @__PURE__ */ jsx("div", { className: `flex flex-col space-y-2 mt-2 font-poppins font-[300]`, children: explorLinks.map((link, index2) => {
          return /* @__PURE__ */ jsx(
            Link,
            {
              to: link == null ? void 0 : link.link,
              className: `hover:underline`,
              children: /* @__PURE__ */ jsx("div", { children: link == null ? void 0 : link.title })
            },
            index2
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `lg:col-span-5 flex flex-col place-items-center text-center md:place-items-start md:text-left`, children: [
        /* @__PURE__ */ jsx("div", { className: `font-poppins font-[300] text-xl`, children: "Top Categories" }),
        /* @__PURE__ */ jsx("div", { className: `flex flex-col space-y-2 mt-2 font-poppins font-[300]`, children: doBusinessLinks == null ? void 0 : doBusinessLinks.map((link, index2) => {
          const lnk = `/web/browse?q=&category=${link == null ? void 0 : link.id}`;
          return /* @__PURE__ */ jsx(
            Link,
            {
              to: lnk,
              className: `hover:underline`,
              children: /* @__PURE__ */ jsx("div", { children: link == null ? void 0 : link.title })
            },
            index2
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `lg:col-span-3 flex flex-col place-items-center text-center md:place-items-start md:text-left`, children: [
        /* @__PURE__ */ jsx("div", { className: `font-poppins font-[300] text-xl`, children: "Do Business With Us" }),
        /* @__PURE__ */ jsx("div", { className: `flex flex-col space-y-2 mt-2 font-poppins font-[300]`, children: garsseteSites == null ? void 0 : garsseteSites.map((link, index2) => {
          return /* @__PURE__ */ jsx(
            Link,
            {
              to: `${link == null ? void 0 : link.link}#${link == null ? void 0 : link.title}`,
              className: `hover:underline`,
              children: /* @__PURE__ */ jsx("div", { children: link == null ? void 0 : link.title })
            },
            index2
          );
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `mt-12 flex flex-col place-items-center text-center md:place-items-start md:text-left`, children: [
      /* @__PURE__ */ jsxs("div", { className: `flex place-items-center gap-1.5`, children: [
        /* @__PURE__ */ jsx("div", { className: `relative w-[20px] h-[20px] hidden`, children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "/favicon.png",
            alt: "",
            className: ` object-cover w-full h-full`
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: `font-poppins text-[22px] font-[600]`, children: /* @__PURE__ */ jsx(MainLogo, {}) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: `font-poppins text-[13px] mt-[-2px]`, children: "© 2025 Index by Veycet. All rights reserved." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `mt-3 font-poppins font-[300] grid-cols-1 md:grid-cols-12 flex flex-col place-items-center text-center md:place-items-start md:text-left`, children: [
      /* @__PURE__ */ jsx("div", { className: `md:col-span-8`, children: "Veycet connects you to trusted local businesses. Discover services, read reviews, and support your community. Find everything from restaurants to contractors in one comprehensive directory. Your journey to better local experiences starts here." }),
      /* @__PURE__ */ jsx("div", { className: `md:col-span-4` })
    ] }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: `flex gap-2 place-items-center place-content-center md:place-content-start mt-4`, children: garsseteSocialLinks.map((media, index2) => {
      return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("a", { href: media == null ? void 0 : media.link, children: /* @__PURE__ */ jsx(
        "div",
        {
          className: `bg-gray-200 text-black text-[15px] w-[35px] h-[35px] place-items-center place-content-center flex`,
          children: media.icon
        }
      ) }) }, index2);
    }) }) }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-gray-400 text-center mt-2", children: [
      "Icon by ",
      /* @__PURE__ */ jsx("a", { href: "https://www.flaticon.com/", target: "_blank", className: "underline", children: "Flaticon" }),
      " (CC BY 3.0)"
    ] }) }) })
  ] }) });
};
const topdestinations = [
  {
    title: "London",
    category: "hotel",
    icon: /* @__PURE__ */ jsx(BiHotel, { size: 20 }),
    link: "/web/browse?q=&city=london",
    bglink: "/images/home/londonts.png"
  },
  {
    title: "New York",
    category: "entertainment",
    icon: /* @__PURE__ */ jsx(BsHouse, { size: 17 }),
    link: "/web/browse?q=&city=new york city",
    bglink: `/images/home/newyrkst.webp`
  },
  {
    title: "Berlin",
    category: "restaurant",
    icon: /* @__PURE__ */ jsx(GiKnifeFork, { size: 17 }),
    link: "/web/browse?q=&city=berlin",
    bglink: `/images/home/berlin.jpg`
  },
  {
    title: "Dubai",
    category: "travel",
    icon: /* @__PURE__ */ jsx(BsAirplane, { size: 17 }),
    link: "/web/browse?q=&city=dubai",
    bglink: `/images/home/dubaij.avif`
  },
  {
    title: "Paris",
    category: "realestate",
    icon: /* @__PURE__ */ jsx(FcHome, { size: 17 }),
    link: "/web/browse?q=&city=paris",
    bglink: `/images/home/france.webp`
  }
  // Added more categories to demonstrate overflow
];
const TopDestinations = () => {
  const scrollRef = useRef(null);
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
  return /* @__PURE__ */ jsx("div", { className: `px-[15px] mt-24`, children: /* @__PURE__ */ jsxs("div", { className: `max-w-[1100px] mx-auto w-full`, children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: `text-[19px] font-poppins font-bold`, children: "Find businesses in Top Cities" }),
      /* @__PURE__ */ jsx("div", { className: `text-[15px] font-poppins mt-1 mb-6`, children: "Seeking to do businesses in these cities?" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `relative`, children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          ref: scrollRef,
          className: `w-full overflow-x-auto bottom-scrollbar-hidden relative rounded-xl`,
          children: /* @__PURE__ */ jsx("div", { className: `flex gap-3`, children: topdestinations == null ? void 0 : topdestinations.map((category, index2) => {
            return /* @__PURE__ */ jsx(
              "a",
              {
                href: `${category == null ? void 0 : category.link}`,
                children: /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: `border-none rounded-xl min-w-[220px] md:min-w-[280px] h-[300px] overflow-hidden relative`,
                    children: [
                      /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: category == null ? void 0 : category.bglink,
                          alt: "",
                          className: `object-cover w-full h-full`
                        }
                      ),
                      /* @__PURE__ */ jsx("div", { className: `absolute bottom-0 text-white h-[40%] bg-gradient-to-t from-black to-gray-200/0 w-full flex items-end content-start`, children: /* @__PURE__ */ jsx("div", { className: `mx-3 mb-6 text-2xl font-poppins leading-[1.3em] font-bold`, children: category == null ? void 0 : category.title }) })
                    ]
                  },
                  index2
                )
              },
              index2
            );
          }) })
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `absolute text-white top-1/2 -translate-y-1/2 left-2 w-[50px] min-w-[50px] h-[50px] bg-black/50 hover:bg-white/70 hover:text-black flex place-content-center place-items-center hover:cursor-pointer border-[1px] border-gray-400 rounded-full z-[50]`,
          onClick: () => {
            scrollLeft();
          },
          children: /* @__PURE__ */ jsx(FaChevronLeft, {})
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `absolute text-white top-1/2 -translate-y-1/2 right-2 w-[50px] min-w-[50px] h-[50px] bg-black/70 hover:bg-white/70 hover:text-black flex place-content-center place-items-center hover:cursor-pointer border-[1px] border-gray-400 rounded-full z-[50]`,
          onClick: () => {
            scrollRight();
          },
          children: /* @__PURE__ */ jsx(FaChevronRight, {})
        }
      )
    ] })
  ] }) });
};
const loader$X = async ({ request, params }) => {
  try {
    const id = params.id || null;
    let hotels2 = [];
    let latestBusinesses = [];
    let gallery;
    let ratingData;
    try {
      hotels2 = await getHomeListingByCategory("hotel", 6);
      latestBusinesses = await getLatestBusinesses(10);
    } catch (error) {
      console.log(error.message);
    }
    return {
      hotels: hotels2,
      latestBusinesses
    };
  } catch (err) {
    logError(err);
  }
};
const homepage = () => {
  const loader2 = useLoaderData();
  const hotels2 = loader2.hotels;
  loader2.latestBusinesses;
  return /* @__PURE__ */ jsxs(HomeLayout, { children: [
    /* @__PURE__ */ jsx(SearchBusiness, {}),
    /* @__PURE__ */ jsx(TopCategories, {}),
    /* @__PURE__ */ jsx(Hotels, { data: hotels2 }),
    /* @__PURE__ */ jsx(YourGuide, {}),
    /* @__PURE__ */ jsx(TopDestinations, {}),
    /* @__PURE__ */ jsx(Inspire, {}),
    /* @__PURE__ */ jsx(Hotel, {}),
    /* @__PURE__ */ jsx("div", { className: `h-[100px]` }),
    /* @__PURE__ */ jsx(FooterAlt, {})
  ] });
};
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: homepage,
  loader: loader$X
}, Symbol.toStringTag, { value: "Module" }));
const index$s = () => {
  return /* @__PURE__ */ jsx("div", {});
};
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$s
}, Symbol.toStringTag, { value: "Module" }));
const GalleryContext = createContext(null);
function useGallery() {
  const context = useContext(GalleryContext);
  return context;
}
const GalleryProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [gallery, setGallery] = useState(null);
  const slider = useSliderContext();
  const [listing, setListing] = useState(null);
  const IMG_BASE_URL2 = "https://tpics.gasimg.com";
  const handleClose = () => setShow(false);
  let vals = {
    setShow,
    setGallery,
    setListing
  };
  const showCarousel = (index2) => {
    slider.setDialog(true);
    slider.setSelectedSlide(index2 + 1);
    slider.setGallery(gallery);
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    if (show) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [show]);
  return /* @__PURE__ */ jsxs(GalleryContext.Provider, { value: vals, children: [
    show && /* @__PURE__ */ jsxs(
      "div",
      {
        onMouseDown: (e) => setShow(false),
        className: `flex w-screen h-screen bg-black/40 
                        z-[20000] fixed top-0 left-0 right-0 bottom-0
                        place-items-center place-content-center px-[15px]`,
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              onMouseDown: (e) => e.stopPropagation(),
              className: `min-w-[95%] w-[95%] sm:w-[95%] md:w-[80%] h-[80%] max-h-[80%] 
                            mx-auto bg-white rounded-lg shadow-lg shadow-black/50 
                            space-y-6 z-[3100] overflow-hidden`,
              children: /* @__PURE__ */ jsxs("div", { className: `w-full h-full`, children: [
                /* @__PURE__ */ jsx("div", { className: `border-b py-3 px-3`, children: /* @__PURE__ */ jsxs("div", { className: `font-bold text-gray-700
                                    text-xl w-[80%]  truncate`, children: [
                  "Gallery for ",
                  listing && (listing == null ? void 0 : listing.title)
                ] }) }),
                /* @__PURE__ */ jsx("div", { className: ` 
                                h-full overflow-y-auto pt-2 px-2 pb-2
                                bg-white `, children: /* @__PURE__ */ jsx("div", { className: `grid grid-cols-4 md:grid-cols-6 gap-2`, children: gallery && (gallery == null ? void 0 : gallery.map((image, index2) => {
                  return /* @__PURE__ */ jsx(
                    "div",
                    {
                      onClick: () => showCarousel(index2),
                      className: `relative hover:cursor-pointer
                                                 bg-red-200 h-[80px] md:h-[100px] lg:h-[120px] rounded-md
                                                 overflow-hidden`,
                      children: /* @__PURE__ */ jsx(
                        "img",
                        {
                          className: `object-cover w-full h-full`,
                          src: IMG_BASE_URL2 + image.image_url,
                          alt: ""
                        }
                      )
                    }
                  );
                })) }) })
              ] })
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              onMouseDown: () => handleClose(),
              className: `w-[50px] h-[50px] z-[300] bg-white
                                flex place-content-center place-items-center
                                rounded-full absolute left-2 top-2 cursor-pointer
                                hover:bg-white/40 transition duration-1000 ease-in-out`,
              children: /* @__PURE__ */ jsx(IoClose, { className: `text-[30px]` })
            }
          )
        ]
      }
    ),
    children
  ] });
};
const maximumWords = 100;
const RatingContext = createContext(null);
function useRating() {
  const context = useContext(RatingContext);
  return context;
}
const RatingSchema = z.object({
  fullname: z.any(),
  rating: z.any(),
  comment: z.any()
});
function RatingProvider({ children }) {
  var _a, _b, _c;
  const [show, setShow] = useState(false);
  const [working, setWorking] = useState(false);
  const [listing, setListing] = useState(null);
  const [ratingData, setRatingData] = useState(void 0);
  const [text, setText] = useState("");
  useNotification();
  const { showOperation, showError, completeOperation, showSuccess } = useOperation();
  const [stars, setStars] = useState(5);
  const auth = useAuth();
  if (!auth) {
    return null;
  }
  let { user } = auth;
  const [formdata, setFormdata] = useState(null);
  const [wordLimitReached, setWordLimitReached] = useState(false);
  const countWords = (input) => {
    return input.trim() === "" ? 0 : input.trim().split(/\s+/).length;
  };
  const changeHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormdata((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  };
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    reset,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(RatingSchema)
  });
  const handleTextChange = (e) => {
    const input = e.target.value;
    const words = input.trim().split(/\s+/);
    if (words.length <= maximumWords) {
      setValue("text", input);
      setWordLimitReached(false);
    } else {
      setWordLimitReached(true);
      const trimmedWords = words.slice(0, maximumWords).join(" ");
      setValue("text", trimmedWords);
    }
  };
  const postRating = async (data) => {
    showOperation("processing");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    const userGuid = user.guid;
    const businessGuid = listing.gid;
    data["user_guid"] = userGuid;
    data["business_guid"] = businessGuid;
    const BASE_URL = "https://testindex.veycet.com";
    const endpoint = `/api/rating`;
    const url = BASE_URL + endpoint;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const datar = await res.json();
      if (res.ok) {
        showSuccess("Success", "Rating submitted.");
        completeOperation();
      } else {
        console.log(datar.error);
        showError("Error", datar.error);
        completeOperation();
      }
    } catch (error) {
      showError("Error", "Rating not submitted.");
      completeOperation();
      console.log(error.message);
    }
  };
  const validateData = async (data, user2) => {
    if ((data == null ? void 0 : data.length) === 0) {
      let fname = (user2 == null ? void 0 : user2.first_name) || "";
      let lname = (user2 == null ? void 0 : user2.last_name) || "";
      let fullname = fname + " " + lname;
      setValue("fullname", fullname);
    }
  };
  let vals = {
    show,
    setShow,
    setListing,
    reset,
    setRatingData,
    validateData
  };
  const textValue = watch("text") || "";
  const handleKeyDown = (e) => {
    const words = textValue.trim().split(/\s+/);
    if (words.length >= maximumWords && e.key !== "Backspace" && e.key !== "Delete" && !e.ctrlKey) {
      e.preventDefault();
      setWordLimitReached(true);
    } else {
      setWordLimitReached(false);
    }
  };
  useEffect(() => {
    const handleKeyDown2 = (e) => {
      if (e.key === "Escape") {
        setShow(false);
      }
    };
    if (show) {
      document.addEventListener("keydown", handleKeyDown2);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown2);
    };
  }, [show]);
  return /* @__PURE__ */ jsxs(RatingContext.Provider, { value: vals, children: [
    show && /* @__PURE__ */ jsx("div", { className: `flex w-full h-full bg-black/40 z-[3000] 
                fixed top-0 left-0 right-0 bottom-0 place-items-center place-content-center`, children: /* @__PURE__ */ jsx("div", { className: `max-w-[400px] w-full h-fit mx-auto bg-white rounded-xl shadow-md `, children: /* @__PURE__ */ jsxs("div", { className: `space-y-6 p-6`, children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: "Create/Edit Rating" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit(postRating), className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block mb-1 text-sm font-semibold", children: "Full Name" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              ...register("fullname", {
                onChange: changeHandler
              }),
              type: "text",
              className: `w-full px-3 py-2 border rounded-md
                                        text-sm`,
              placeholder: "Enter Business GUID"
            }
          ),
          ((_a = errors.fullname) == null ? void 0 : _a.message) && /* @__PURE__ */ jsx("div", { className: `text-red-500 mt-1 text-sm`, children: errors.fullname.message.toString() })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block mb-1 text-sm font-semibold", children: "Stars" }),
          /* @__PURE__ */ jsx(
            "select",
            {
              ...register("rating", {
                onChange: (e) => {
                  setStars(Number(e.target.value));
                  changeHandler(e);
                }
              }),
              className: `w-full px-3 py-2 border rounded-md
                                        text-sm`,
              children: [5, 4, 3, 2, 1].map((s) => /* @__PURE__ */ jsxs("option", { value: s, children: [
                s,
                " Star",
                s > 1 ? "s" : ""
              ] }, s))
            }
          ),
          ((_b = errors.rating) == null ? void 0 : _b.message) && /* @__PURE__ */ jsx("div", { className: "text-red-500 mt-1 text-sm", children: errors.rating.message.toString() })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex place-content-between", children: [
            /* @__PURE__ */ jsx("label", { className: "block mb-1 text-sm font-semibold", children: "Comment" }),
            /* @__PURE__ */ jsxs("label", { className: " text-gray-600 text-sm", children: [
              "Word Count: ",
              /* @__PURE__ */ jsx("strong", { children: countWords(text) })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              ...register("comment", {
                onChange: (e) => {
                  let words = countWords(text);
                  if (words <= maximumWords) {
                    setText(e.target.value);
                    handleTextChange(e);
                    changeHandler(e);
                  } else {
                    e.preventDefault();
                  }
                }
              }),
              onKeyDown: handleKeyDown,
              className: `w-full px-3 py-2 border rounded-md 
                                        text-sm`,
              placeholder: "Write your review...",
              rows: 4
            }
          ),
          wordLimitReached && /* @__PURE__ */ jsx("div", { className: "text-red-500 mt-0 text-sm", children: "Maximum maximumWords words allowed." }),
          ((_c = errors.comment) == null ? void 0 : _c.message) && /* @__PURE__ */ jsx("div", { className: "text-red-500 mt-0 text-sm", children: errors.comment.message.toString() })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `w-full grid grid-cols-2 gap-2`, children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setShow(false),
              className: `w-full bg-red-200 rounded-md
                                        hover:bg-red-100 text-sm`,
              children: "Close"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: working,
              className: `w-full bg-blue-600 text-white py-2 
                                        rounded-md hover:bg-blue-700 text-sm`,
              children: working ? "Submitting..." : "Submit Rating"
            }
          )
        ] })
      ] })
    ] }) }) }),
    children
  ] });
}
const FormattedAddress$1 = ({ listing }) => {
  return /* @__PURE__ */ jsxs("div", { children: [
    (listing == null ? void 0 : listing.address_one) ? (listing == null ? void 0 : listing.address_one) + ", " : "",
    (listing == null ? void 0 : listing.state_code) ? (listing == null ? void 0 : listing.state_name) + ", " : "",
    (listing == null ? void 0 : listing.country_code) ? listing == null ? void 0 : listing.country_code : ""
  ] });
};
const Header = ({ listing, profileImageData, operatingHoursStatus, ratingsData }) => {
  const [profileImg, setProfileImg] = useState("");
  const [placeholder, setPlaceholder] = useState("/images/placeholder22.png");
  useEffect(() => {
    if (profileImageData == null ? void 0 : profileImageData.image_url) {
      setProfileImg(config.IMG_BASE_URL + (profileImageData == null ? void 0 : profileImageData.image_url));
    } else {
      setProfileImg(placeholder);
    }
  }, [profileImageData]);
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: `flex gap-2 mt-2 w-full  p-3 md:p-3  md:rounded-xl  border border-gray-100 bg-gray-50`, children: [
    /* @__PURE__ */ jsx("div", { className: `bg-white w-[60px] min-w-[60px] md:w-[95px] md:min-w-[95px] h-[60px] md:h-[95px] rounded-lg relative overflow-hidden border-[1px]  border-gray-200`, children: /* @__PURE__ */ jsx(
      "img",
      {
        src: profileImg,
        alt: "",
        className: ` object-cover w-full h-full `
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: `w-full block`, children: [
      /* @__PURE__ */ jsx("div", { className: `text-[19px] md:text-[24px]
                font-semibold  leading-[1.2em] font-sans text-cyan-900`, children: listing == null ? void 0 : listing.title }),
      /* @__PURE__ */ jsx("div", { className: ` line-clamp-1`, children: /* @__PURE__ */ jsx(FormattedAddress$1, { listing }) }),
      /* @__PURE__ */ jsx("div", { className: ` leading-[1.3em] space-x-1 mt-1`, children: operatingHoursStatus !== void 0 && /* @__PURE__ */ jsxs("div", { className: ` leading-[1.2em]`, children: [
        operatingHoursStatus.openStatus === "selected_hours" ? /* @__PURE__ */ jsx("div", { children: operatingHoursStatus.todayHoursFormatted }) : /* @__PURE__ */ jsxs("div", { children: [
          operatingHoursStatus.openStatus === "always_open" && /* @__PURE__ */ jsx("div", { className: `bg-green-700 px-2 rounded-lg w-fit text-white pt-[2px] pb-[4px]`, children: "Always Open" }, "1"),
          operatingHoursStatus.openStatus === "permanently_closed" && /* @__PURE__ */ jsx("div", { className: `bg-red-700 px-2 rounded-lg w-fit text-white pt-[2px] pb-[4px]`, children: "Permantently Closed" }, "2"),
          operatingHoursStatus.openStatus === "temporarily_closed" && /* @__PURE__ */ jsx("div", { className: `bg-orange-400 px-2 rounded-lg w-fit text-white pt-[2px] pb-[4px]`, children: "Temporarily Closed" }, "3")
        ] }),
        /* @__PURE__ */ jsx("div", { className: ` w-full mx-auto mt-1.5`, children: operatingHoursStatus == null ? void 0 : operatingHoursStatus.localTimeText })
      ] }) })
    ] })
  ] }) });
};
const ComponentTitle = ({ title }) => {
  return /* @__PURE__ */ jsx("div", { className: `text-[19px] font-bold
                border-b mb-6`, children: title });
};
const Description = ({ listing }) => {
  var _a;
  const [img, setImg] = useState("");
  const [placeholder, setPlaceholder] = useState("/images/placeholder22.png");
  useEffect(() => {
    if (listing.gid) {
      let imgdata = getBusinessProfileImageData(listing.gid);
      imgdata.then((data) => {
        if ((data == null ? void 0 : data.image_url) === "" || (data == null ? void 0 : data.image_url) === void 0 || (data == null ? void 0 : data.image_url) === null) {
          setImg(placeholder);
        } else {
          setImg(config.IMG_BASE_URL + data.image_url);
        }
      });
    }
  }, [listing]);
  return /* @__PURE__ */ jsxs("div", { className: "mt-12", children: [
    /* @__PURE__ */ jsx(ComponentTitle, { title: "About this business" }),
    /* @__PURE__ */ jsxs("div", { className: `flex place-items-start place-content-start
                gap-2 mt-4 mb-3`, children: [
      /* @__PURE__ */ jsx("div", { className: `rounded-full bg-white w-[30px] h-[30px]
                    overflow-hidden relative border`, children: /* @__PURE__ */ jsx(
        "img",
        {
          className: `object-cover w-full h-full`,
          src: img,
          alt: ""
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: `flex flex-col`, children: [
        /* @__PURE__ */ jsx("div", { className: `text-md font-bold tracking-tight leading-[1.2em]`, children: listing.title }),
        /* @__PURE__ */ jsx("div", { className: `text-[12px] capitalize`, children: (_a = searchCategories(listing.category)) == null ? void 0 : _a.name })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: `flex flex-col gap-y-5 text-[14px] mt-4 whitespace-pre-wrap`, children: listing == null ? void 0 : listing.long_description })
  ] });
};
const BusinessFeatures = ({ listing }) => {
  const [features, setFeatures] = useState(void 0);
  useEffect(() => {
    getBusinessFeatures(listing == null ? void 0 : listing.gid).then((data) => {
      const mergedFeatures = data == null ? void 0 : data.map((dbF) => {
        const facility = facilityFeatures.find((f) => f.feature_id === dbF.feature_id);
        return {
          ...facility,
          // take default info (name, description, icon)
          user_description: dbF.user_description || null,
          // add user description if any
          business_guid: dbF.business_guid
        };
      });
      setFeatures(mergedFeatures);
    });
  }, [listing.business_guid]);
  return /* @__PURE__ */ jsxs("div", { className: " mt-12", children: [
    /* @__PURE__ */ jsx(ComponentTitle, { title: "Facility Features" }),
    /* @__PURE__ */ jsx("div", { className: `grid grid-cols-2 gap-x-4 gap-y-8 mt-3`, children: features == null ? void 0 : features.map((feature, index2) => {
      return /* @__PURE__ */ jsxs("div", { className: `flex flex-col`, children: [
        /* @__PURE__ */ jsxs("div", { className: `font-bold flex place-items-center gap-2 `, children: [
          /* @__PURE__ */ jsx("span", { className: `text-lg`, children: feature.icon }),
          /* @__PURE__ */ jsx("span", { className: `text-lg leading-[1.2em]`, children: feature.name })
        ] }),
        /* @__PURE__ */ jsx("div", { className: ` mt-[5px] text-black tracking-normal leading-snug`, children: feature.user_description || feature.description })
      ] }, index2);
    }) })
  ] });
};
const ShortDescription = ({ listing }) => {
  return /* @__PURE__ */ jsxs("div", { className: `mt-4`, children: [
    /* @__PURE__ */ jsx(ComponentTitle, { title: "Intro" }),
    /* @__PURE__ */ jsx("div", { className: ` text-[14px] flex flex-col gap-y-4 whitespace-pre-wrap `, children: listing.short_description })
  ] });
};
const SingleStarRating = ({ rating = 3.5, maxStars = 5 }) => {
  const stars = [];
  for (let i = 1; i <= maxStars; i++) {
    if (i <= rating) {
      stars.push(
        /* @__PURE__ */ jsx("span", { className: "text-yellow-500 text-xl", children: /* @__PURE__ */ jsx(BsStarFill, {}) }, i)
      );
    } else {
      stars.push(
        /* @__PURE__ */ jsx("span", { className: "text-yellow-500 text-xl", children: /* @__PURE__ */ jsx(BsStar, {}) }, i)
      );
    }
  }
  return /* @__PURE__ */ jsxs("div", { className: " flex w-full place-items-center gap-2 mt-0", children: [
    /* @__PURE__ */ jsx("div", { className: `flex  gap-x-[3px] -mt-[2px]`, children: stars }),
    /* @__PURE__ */ jsx("div", { className: `text-gray-400`, children: /* @__PURE__ */ jsx(BiSolidRightArrow, { className: `text-[15px] text-yellow-400` }) }),
    /* @__PURE__ */ jsxs("div", { className: ` text-xl`, children: [
      "Rating: ",
      Number(rating)
    ] })
  ] });
};
const BusinessRatings = ({ listing }) => {
  const [reviews, setReviews] = useState([]);
  const [ratingsRevews, setRatingsReviews] = useState({});
  const [img, setImg] = useState("");
  useEffect(() => {
    const getReviews = async (guid) => {
      if (guid) {
        await getBusinessRatings(guid).then((data) => {
          setReviews(data);
        });
      }
    };
    const getRatingsReviewsData = async (guid) => {
      if (guid) {
        await getRatingsReviews(guid).then((data) => {
          setRatingsReviews(data);
        });
      }
    };
    if (listing.gid) {
      getReviews(listing.gid);
      getRatingsReviewsData(listing.gid);
    }
  }, [listing]);
  return /* @__PURE__ */ jsxs("div", { className: `mt-12`, children: [
    /* @__PURE__ */ jsx(ComponentTitle, { title: "Reviews" }),
    /* @__PURE__ */ jsxs("div", { className: `-mt-1 text-[14px] flex flex-col -gap-y-1 font-light`, children: [
      /* @__PURE__ */ jsx("div", { className: `font-bold text-lg`, children: "Overall Rating:" }),
      ratingsRevews && /* @__PURE__ */ jsx(SingleStarRating, { rating: ratingsRevews == null ? void 0 : ratingsRevews.rating_average })
    ] }),
    /* @__PURE__ */ jsx("hr", { className: `mt-3` }),
    /* @__PURE__ */ jsx("div", { className: `flex flex-col gap-y-4 divide-y-[1px]`, children: reviews !== null && (reviews == null ? void 0 : reviews.map((review, index2) => {
      return /* @__PURE__ */ jsxs("div", { className: `pt-7 pb-4`, children: [
        /* @__PURE__ */ jsxs("div", { className: `flex place-items-start gap-2`, children: [
          /* @__PURE__ */ jsx("div", { className: `w-[30px] h-[30px] rounded-full
                                        bg-black overflow-hidden`, children: /* @__PURE__ */ jsx("img", { src: config.IMG_BASE_URL + (review == null ? void 0 : review.image_url), alt: "" }) }),
          /* @__PURE__ */ jsxs("div", { className: `flex flex-col -space-y-1.5`, children: [
            /* @__PURE__ */ jsx("div", { className: `text-lg font-bold`, children: review.fullname }),
            (review == null ? void 0 : review.city_name) !== null && (review == null ? void 0 : review.state_name) && /* @__PURE__ */ jsx("div", { className: `text-[11px]`, children: `${review == null ? void 0 : review.city_name}, ${review == null ? void 0 : review.state_name}` }),
            (review == null ? void 0 : review.country_name) !== null && /* @__PURE__ */ jsx("div", { className: `text-[11px]`, children: `${review == null ? void 0 : review.country_name}` })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `mt-2`, children: [
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(SingleStarRating, { rating: review.rating }) }),
          /* @__PURE__ */ jsxs("div", { className: `text-[12px] mt-1`, children: [
            /* @__PURE__ */ jsx("b", { children: "Created at:" }),
            /* @__PURE__ */ jsx("span", { className: `text-[12px]`, children: getLocalDate(review.created_at) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `text-[12px]`, children: [
            /* @__PURE__ */ jsx("b", { children: "Last Edited:" }),
            /* @__PURE__ */ jsx("span", { className: `text-[12px]`, children: getLocalDate(review.updated_at) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: `text-[14px] mt-2`, children: review.comment })
        ] })
      ] }, index2);
    })) })
  ] });
};
const ImageBlock = ({ images, listing }) => {
  const [items, setItems] = useState([]);
  const slider = useSliderContext();
  const gallery = useGallery();
  const [placeholder, setPlaceholder] = useState("images/abstract_placeholder.jpg");
  const [shortGallery, setShortGallery] = useState([]);
  useEffect(() => {
    let shortGallery2 = [...items];
    if (images) {
      images == null ? void 0 : images.map((image, index2) => {
        if (index2 + 1 < 12) {
          shortGallery2.push(image);
        }
      });
      setShortGallery(shortGallery2);
    }
  }, [images]);
  const showCarousel = (index2) => {
    if (index2 < images.length) {
      slider.setDialog(true);
      slider.setSelectedSlide(index2 + 1);
      slider.setGallery(images);
      slider.setListing(listing);
    }
  };
  const showGallery = (index2) => {
    gallery.setShow(true);
    gallery.setGallery(images);
    gallery.setListing(listing);
  };
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: `w-full h-auto mb-[32px] flex flex-col gap-2`, children: /* @__PURE__ */ jsx(ComposeImages, { imgs: images, showCarousel, index: 0, showGallery }) }) });
};
function SingleBlock({ index: index2, imgs, showCarousel }) {
  var _a, _b, _c;
  return /* @__PURE__ */ jsx("div", { className: `rounded-xl overflow-hidden bg-gray-200
                    relative cursor-pointer w-full h-full`, children: ((_a = imgs[index2]) == null ? void 0 : _a.image_url) !== void 0 && ((_b = imgs[index2]) == null ? void 0 : _b.image_url) !== null ? /* @__PURE__ */ jsx(
    "img",
    {
      src: config.IMG_BASE_URL + ((_c = imgs[index2]) == null ? void 0 : _c.image_url),
      alt: "",
      className: `object-cover h-full w-full`
    }
  ) : /* @__PURE__ */ jsx("div", { className: `w-full h-full px-3 py-3 flex place-content-center place-items-center`, children: /* @__PURE__ */ jsx("div", { className: ` w-full h-full border border-dashed border-white text-[20px] rounded-lg flex place-content-center place-items-center text-white`, children: /* @__PURE__ */ jsx(MdOutlineImage, {}) }) }) });
}
function ComposeImages({ imgs, index: index2, showCarousel, showGallery }) {
  const [imageTotal, setImageTotal] = useState(0);
  const [images, setImages] = useState([]);
  useEffect(() => {
    if ((imgs == null ? void 0 : imgs.length) > 0) {
      console.log(imgs);
      setImageTotal(imgs.length);
      setImages(imgs);
    }
  }, imgs);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    imageTotal === 1 && /* @__PURE__ */ jsx("div", { className: `h-[350px]
                grid grid-cols-12 gap-[7px]`, children: /* @__PURE__ */ jsx(
      "div",
      {
        className: `col-span-12 
                    row-span-2 overflow-hidden`,
        onMouseDown: (e) => showCarousel && showCarousel(index2),
        children: /* @__PURE__ */ jsx(SingleBlock, { imgs: images, index: 0 })
      }
    ) }),
    imageTotal === 2 && /* @__PURE__ */ jsxs("div", { className: `h-[350px]
                grid grid-cols-12 gap-[7px]`, children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `col-span-7 bg-black
                    row-span-2 rounded-xl overflow-hidden
                    relative cursor-pointer`,
          onMouseDown: (e) => showCarousel && showCarousel(0),
          children: /* @__PURE__ */ jsx(SingleBlock, { imgs: images, index: 0 })
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `col-span-5 bg-black
                    row-span-2 rounded-xl overflow-hidden
                    relative cursor-pointer`,
          onMouseDown: (e) => showCarousel && showCarousel(1),
          children: /* @__PURE__ */ jsx(SingleBlock, { imgs: images, index: 1 })
        }
      )
    ] }),
    imageTotal === 3 && /* @__PURE__ */ jsxs("div", { className: `h-[350px]
                grid grid-cols-12 gap-[7px]`, children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `col-span-7 row-span-2 overflow-hidden`,
          onMouseDown: (e) => showCarousel && showCarousel(0),
          children: /* @__PURE__ */ jsx(SingleBlock, { imgs: images, index: 0 })
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `col-span-5 overflow-hidden`,
          onMouseDown: (e) => showCarousel && showCarousel(1),
          children: /* @__PURE__ */ jsx(SingleBlock, { imgs: images, index: 1 })
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `col-span-5 overflow-hidden
                    `,
          onMouseDown: (e) => showCarousel && showCarousel(2),
          children: /* @__PURE__ */ jsx(SingleBlock, { imgs: images, index: 2 })
        }
      )
    ] }),
    imageTotal >= 4 && /* @__PURE__ */ jsxs("div", { className: `space-y-[7px]`, children: [
      /* @__PURE__ */ jsxs("div", { className: `h-[350px]
                grid grid-cols-12 gap-[7px]`, children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `col-span-7 row-span-2 overflow-hidden`,
            onMouseDown: (e) => showCarousel && showCarousel(0),
            children: /* @__PURE__ */ jsx(SingleBlock, { imgs: images, index: 0 })
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `col-span-5 overflow-hidden`,
            onMouseDown: (e) => showCarousel && showCarousel(1),
            children: /* @__PURE__ */ jsx(SingleBlock, { imgs: images, index: 1 })
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `col-span-5 overflow-hidden
                    `,
            onMouseDown: (e) => showCarousel && showCarousel(2),
            children: /* @__PURE__ */ jsx(SingleBlock, { imgs: images, index: 2 })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-5 gap-[7px] mt-[2px] h-[100px]`, children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `overflow-hidden`,
            onMouseDown: (e) => showCarousel && showCarousel(3),
            children: /* @__PURE__ */ jsx(SingleBlock, { imgs: images, index: 3 })
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `overflow-hidden`,
            onMouseDown: (e) => showCarousel && showCarousel(4),
            children: /* @__PURE__ */ jsx(SingleBlock, { imgs: images, index: 4 })
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `overflow-hidden`,
            onMouseDown: (e) => showCarousel && showCarousel(5),
            children: /* @__PURE__ */ jsx(SingleBlock, { imgs: images, index: 5 })
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `overflow-hidden`,
            onMouseDown: (e) => showCarousel && showCarousel(6),
            children: /* @__PURE__ */ jsx(SingleBlock, { imgs: images, index: 6 })
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: `rounded-xl overflow-hidden
                    relative bg-gray-200 text-white cursor-pointer
                    flex place-content-center place-items-center h-[100px]
                    bg-cover`,
            onMouseDown: (e) => showGallery && showGallery(0),
            style: { backgroundImage: `url("/images/abstract_placeholder.jpg")` },
            children: [
              /* @__PURE__ */ jsx("div", { className: ` absolute top-0 left-0 right-0 bottom-0 bg-black/20` }),
              (images == null ? void 0 : images.length) > 7 ? `+${images.length - 7}` : "View all"
            ]
          }
        )
      ] })
    ] })
  ] });
}
const ListingCarousel = ({ images, listing }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideStep = useRef(0);
  useRef(0);
  const handleTouchStart = (e) => {
    slideStep.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const deltaX = slideStep.current - endX;
    if (deltaX > 50) {
      setCurrentSlide((i) => (i + 1) % images.length);
    } else if (deltaX < -50) {
      setCurrentSlide((i) => (i - 1 + images.length) % images.length);
    }
  };
  const [slides, setSlides] = useState(null);
  let timeoutId = useRef(null);
  const [items, setItems] = useState([]);
  const slider = useSliderContext();
  useGallery();
  const [shortGallery, setShortGallery] = useState([]);
  useEffect(() => {
    let shortGallery2 = [...items];
    if (images) {
      images.map((image, index2) => {
        if (index2 + 1 < 12) {
          shortGallery2.push(image);
        }
      });
      setShortGallery(shortGallery2);
    }
  }, [images]);
  const showCarousel = (index2) => {
    if (index2 < (images == null ? void 0 : images.length)) {
      slider.setDialog(true);
      slider.setSelectedSlide(index2 + 1);
      slider.setGallery(images);
      slider.setListing(listing);
    }
  };
  useEffect(() => {
    if (images) {
      setSlides(images);
    }
  }, [images]);
  const prev = () => {
    setCurrentSlide((currentSlide2) => {
      return currentSlide2 === 0 ? slides.length - 1 : currentSlide2 - 1;
    });
  };
  const next = () => {
    setCurrentSlide((currentSlide2) => {
      return currentSlide2 === slides.length - 1 ? 0 : currentSlide2 + 1;
    });
  };
  const handleNext = async () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    next();
    timeoutId.current = setTimeout(() => {
    }, 15e3);
  };
  const handlePrev = async () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    prev();
    timeoutId.current = setTimeout(() => {
    }, 15e3);
  };
  useEffect(() => {
  }, [slides]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: `relative`, children: [
    /* @__PURE__ */ jsx("div", { className: ` w-full h-[300px] md:h-[500px] flex overflow-hidden z-20 `, children: slides == null ? void 0 : slides.map((slide, index2) => {
      return /* @__PURE__ */ jsx(
        "img",
        {
          onTouchStart: handleTouchStart,
          onTouchEnd: handleTouchEnd,
          onMouseDown: (e) => showCarousel(index2),
          src: (config == null ? void 0 : config.IMG_BASE_URL) + (slide == null ? void 0 : slide.image_url),
          alt: "",
          style: { transform: `translateX(-${currentSlide * 100}%)` },
          className: `object-cover w-full h-full 
                      block flex-shrink-0 flex-grow-0 transition-transform
                      ease-in-out duration-1000 cursor-pointer`
        },
        index2
      );
    }) }),
    /* @__PURE__ */ jsxs("div", { className: `z-[50]`, children: [
      /* @__PURE__ */ jsx("button", { onMouseDown: handlePrev, className: `block absolute top-0 bottom-0 z-[50] p-[1rem] cursor-pointer left-0 group h-full transition duration-1000 ease-in-out`, children: /* @__PURE__ */ jsx("div", { className: `w-[50px] h-[50px] bg-white/60 rounded-full 
           flex place-content-center place-items-center group-hover:bg-white/30
            z-[300] transition duration-500 ease-in-out`, children: /* @__PURE__ */ jsx(BiChevronLeft, { className: " stroke-white fill-black w-[2rem] h-[2rem]" }) }) }),
      /* @__PURE__ */ jsx("button", { onMouseDown: handleNext, className: `block absolute top-0 bottom-0 
                                                        z-[50]    p-[1rem] cursor-pointer right-0 group 
                                                             transition duration-1000 ease-in-out`, children: /* @__PURE__ */ jsx("div", { className: `w-[50px] h-[50px] bg-white/60 rounded-full 
            flex place-content-center place-items-center group-hover:bg-white/30
            z-[300]   transition duration-500 ease-in-out
            `, children: /* @__PURE__ */ jsx(BiChevronRight, { className: " stroke-white fill-black w-[2rem] h-[2rem]" }) }) })
    ] })
  ] }) });
};
const StringToListMaker = ({ phrasesString, useGrid }) => {
  const [phrasesList, setPhrasesList] = useState([]);
  useEffect(() => {
    const convertToList = (phrasesString2) => {
      const phraseList = phrasesString2 == null ? void 0 : phrasesString2.split(",").map((item) => item.trim());
      setPhrasesList(phraseList);
    };
    if (phrasesString !== null && phrasesString !== "") {
      convertToList(phrasesString);
    }
  }, [phrasesString]);
  return /* @__PURE__ */ jsx(Fragment, { children: useGrid === true ? /* @__PURE__ */ jsx("div", { className: `grid grid-cols-2 gap-y-5 w-full`, children: phrasesList == null ? void 0 : phrasesList.map((phrase, index2) => {
    return /* @__PURE__ */ jsxs("div", { className: `flex place-items-center gap-3`, children: [
      /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(BsBagCheckFill, {}) }),
      /* @__PURE__ */ jsx("span", { children: phrase })
    ] }, index2);
  }) }) : /* @__PURE__ */ jsx("div", { className: `flex gap-3 flex-wrap`, children: phrasesList == null ? void 0 : phrasesList.map((phrase, index2) => {
    return /* @__PURE__ */ jsx("span", { className: `bg-blue-50 px-2 border py-1 border-gray-300 hover:shadow-lg cursor-move
                        rounded-md shadow-none shadow-gray-500`, children: phrase }, index2);
  }) }) });
};
const BusinessPhrases = ({ listing }) => {
  return /* @__PURE__ */ jsxs("div", { className: "mt-12", children: [
    /* @__PURE__ */ jsx(ComponentTitle, { title: "Business Offerings" }),
    /* @__PURE__ */ jsx("div", { className: `flex gap-3 flex-wrap`, children: (listing == null ? void 0 : listing.business_phrases) && /* @__PURE__ */ jsx(StringToListMaker, { useGrid: true, phrasesString: listing == null ? void 0 : listing.business_phrases }) })
  ] });
};
const Services = ({ listing }) => {
  const [serviceList, setServiceList] = useState([]);
  useEffect(() => {
    const convertToList = (phrases) => {
      if (phrases !== null && phrases !== "") {
        const serviceList2 = phrases == null ? void 0 : phrases.split(",").map((item) => item.trim());
        setServiceList(serviceList2);
      }
    };
    if (listing !== null) {
      convertToList(listing == null ? void 0 : listing.services);
    }
  }, [listing]);
  return /* @__PURE__ */ jsxs("div", { className: "mt-12", children: [
    /* @__PURE__ */ jsx(ComponentTitle, { title: "Services" }),
    /* @__PURE__ */ jsx("div", { className: `flex gap-3 flex-wrap`, children: (listing == null ? void 0 : listing.services) && /* @__PURE__ */ jsx(StringToListMaker, { useGrid: true, phrasesString: listing == null ? void 0 : listing.services }) })
  ] });
};
const SocialMedia$1 = ({ listing }) => {
  const [img, setImg] = useState("");
  const [social, setSocial] = useState(null);
  function getIcon(media) {
    let icon = null;
    switch (media == null ? void 0 : media.media_id) {
      case "facebook":
        icon = /* @__PURE__ */ jsx(FaFacebookSquare, {});
        break;
      case "twitterx":
        icon = /* @__PURE__ */ jsx(BsTwitterX, {});
        break;
      case "linkedin":
        icon = /* @__PURE__ */ jsx(BsLinkedin, {});
        break;
      case "instagram":
        icon = /* @__PURE__ */ jsx(BsInstagram, {});
        break;
      case "pinterest":
        icon = /* @__PURE__ */ jsx(FaPinterestSquare, {});
        break;
      case "youtube":
        icon = /* @__PURE__ */ jsx(FaYoutubeSquare, {});
        break;
      case "vimeo":
        icon = /* @__PURE__ */ jsx(FaVimeoSquare, {});
        break;
      case "tiktok":
        icon = /* @__PURE__ */ jsx(FaTiktok, {});
        break;
    }
    return icon;
  }
  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }
  useEffect(() => {
    const getSocialMedia = async (listing2) => {
      const socials2 = [];
      const socialMedia = await getSocialMediaByBusinessGuid(listing2 == null ? void 0 : listing2.gid);
      socialMedia == null ? void 0 : socialMedia.map((media, index2) => {
        const handle = media == null ? void 0 : media.user_description;
        const isValidURL = isValidUrl(handle);
        let link = "";
        if (isValidURL) {
          link = handle;
        } else {
          link = `${media == null ? void 0 : media.base_url}${media == null ? void 0 : media.user_description}`;
        }
        socials2.push({
          media: media == null ? void 0 : media.name,
          icon: getIcon(media),
          name: media == null ? void 0 : media.name,
          link
        });
      });
      if (listing2 == null ? void 0 : listing2.website) {
        socials2.push({
          media: listing2 == null ? void 0 : listing2.website,
          icon: /* @__PURE__ */ jsx(CgWebsite, {}),
          name: "Website",
          link: `${listing2 == null ? void 0 : listing2.website}`
        });
      }
      if (listing2 == null ? void 0 : listing2.email_address) {
        socials2.push({
          media: listing2 == null ? void 0 : listing2.email_address,
          icon: /* @__PURE__ */ jsx(MdEmail, {}),
          name: "Email Address",
          link: `mailto:${listing2 == null ? void 0 : listing2.email_address}`
        });
      }
      if (listing2 == null ? void 0 : listing2.phone) {
        socials2.push({
          media: listing2 == null ? void 0 : listing2.phone,
          icon: /* @__PURE__ */ jsx(BsPhone, {}),
          name: "Phone",
          link: `tel:${listing2 == null ? void 0 : listing2.phone}`
        });
      }
      setSocial(socials2);
    };
    if (listing !== null) {
      getSocialMedia(listing);
    }
  }, [listing]);
  return /* @__PURE__ */ jsxs("div", { className: "mt-12", children: [
    /* @__PURE__ */ jsx(ComponentTitle, { title: "Social Media" }),
    /* @__PURE__ */ jsx("div", { className: `flex flex-col gap-y-5 text-[14px] mt-4 whitespace-pre-wrap`, children: /* @__PURE__ */ jsx("div", { className: `flex gap-3 flex-wrap`, children: social !== null && (social == null ? void 0 : social.map((socialMedia, index2) => {
      return /* @__PURE__ */ jsx(Link, { to: socialMedia == null ? void 0 : socialMedia.link, children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: `border px-[8px] py-[2px] 
                                    cursor-pointer flex place-items-center rounded-md
                                    gap-1 border-gray-400 bg-blue-50 hover:bg-blue-50
                                    text-black hover:text-black
                                    hover:shadow-md`,
          children: [
            /* @__PURE__ */ jsx("span", { className: `text-[12px]`, children: socialMedia == null ? void 0 : socialMedia.icon }),
            socialMedia == null ? void 0 : socialMedia.name
          ]
        },
        index2
      ) }, index2);
    })) }) })
  ] });
};
const ClaimBusiness = ({ listing }) => {
  const [ownerRole, setOwnerRole] = useState("user");
  useEffect(() => {
    const getOwnerRole = async (owner) => {
      await getUserProfile(owner).then((data) => {
        let user = data;
        setOwnerRole(user == null ? void 0 : user.role);
      });
    };
    if ((listing == null ? void 0 : listing.owner) !== "") {
      getOwnerRole(listing == null ? void 0 : listing.owner);
    }
  }, [listing]);
  return /* @__PURE__ */ jsx(Fragment, { children: ownerRole === "admin" && /* @__PURE__ */ jsx("div", { className: ` md:mt-0 `, children: /* @__PURE__ */ jsxs("div", { className: `px-3  border  rounded-xl shadow-lg  underline-offset-2  bg-gray-100 mx-[0px] md:mx-[0px] mb-[40px] md:mb-[40px] divide-y-1 divide-gray-600`, children: [
    /* @__PURE__ */ jsx("a", { href: "/web/contact", children: /* @__PURE__ */ jsx("div", { className: `text-[15px] text-center  py-[10px] `, children: "Is this your business? Claim it for free!" }) }),
    /* @__PURE__ */ jsx("div", { className: `border-b-[1px] border-gray-50/20` }),
    /* @__PURE__ */ jsx("a", { href: "/web/contact", children: /* @__PURE__ */ jsx("div", { className: `text-[12px] text-center underline py-[10px]`, children: "Request removal." }) })
  ] }) }) });
};
const LocationWithHours = ({ listing, operatingHoursStatus }) => {
  const [dense, setDense] = React.useState(true);
  const [secondary, setSecondary] = React.useState(false);
  const [businessGuid, setBusinessGuid] = useState("");
  const [userGuid, setUserGuid] = useState("");
  const [operatingHours, setOperatingHours] = useState(void 0);
  const [opHours, setOpHours] = useState(null);
  const [openStatus, setopenStatus] = useState("");
  const [address, setAddress] = useState("");
  const [addressLink, setAddressLink] = useState("");
  const [opHoursStatus, setOpHoursStatus] = useState(void 0);
  useEffect(() => {
    if (listing) {
      setBusinessGuid(listing == null ? void 0 : listing.gid);
      setUserGuid(listing == null ? void 0 : listing.owner);
    }
  }, [listing]);
  const constructDailyHour2 = (start, end) => {
    if (start === "Closed" || end == "Closed") {
      return "Closed";
    } else {
      return `${start} - ${end}`;
    }
  };
  const constructHours = (operatingHours2) => {
    const opHours2 = [];
    setopenStatus(operatingHours2 == null ? void 0 : operatingHours2.open_status);
    opHours2.push({
      day: "Mon",
      hours: constructDailyHour2(operatingHours2 == null ? void 0 : operatingHours2.monday_from, operatingHours2 == null ? void 0 : operatingHours2.monday_to)
    });
    opHours2.push({
      day: "Tue",
      hours: constructDailyHour2(operatingHours2 == null ? void 0 : operatingHours2.tuesday_from, operatingHours2 == null ? void 0 : operatingHours2.tuesday_to)
    });
    opHours2.push({
      day: "Wed",
      hours: constructDailyHour2(operatingHours2 == null ? void 0 : operatingHours2.wednesday_from, operatingHours2 == null ? void 0 : operatingHours2.wednesday_to)
    });
    opHours2.push({
      day: "Thu",
      hours: constructDailyHour2(operatingHours2 == null ? void 0 : operatingHours2.thursday_from, operatingHours2 == null ? void 0 : operatingHours2.thursday_to)
    });
    opHours2.push({
      day: "Fri",
      hours: constructDailyHour2(operatingHours2 == null ? void 0 : operatingHours2.friday_from, operatingHours2 == null ? void 0 : operatingHours2.friday_to)
    });
    opHours2.push({
      day: "Sat",
      hours: constructDailyHour2(operatingHours2 == null ? void 0 : operatingHours2.saturday_from, operatingHours2 == null ? void 0 : operatingHours2.saturday_to)
    });
    opHours2.push({
      day: "Sun",
      hours: constructDailyHour2(operatingHours2 == null ? void 0 : operatingHours2.sunday_from, operatingHours2 == null ? void 0 : operatingHours2.sunday_to)
    });
    setOpHours(opHours2);
  };
  useEffect(() => {
    const getOpHours = async (businessGuid2, userGuid2) => {
      const operatingHours2 = await getOperatingHours(businessGuid2, userGuid2);
      return operatingHours2;
    };
    if (businessGuid !== "" && userGuid !== "") {
      getOpHours(businessGuid, userGuid).then((data) => {
        if (data) {
          constructHours(data);
        }
      });
    }
  }, [businessGuid, userGuid]);
  useEffect(() => {
    let getListingAddress = async (listing2) => {
      let address2 = listing2 == null ? void 0 : listing2.title;
      address2 += (listing2 == null ? void 0 : listing2.address_one) ? ", " + (listing2 == null ? void 0 : listing2.address_one) : "";
      address2 += (listing2 == null ? void 0 : listing2.address_two) ? ", " + (listing2 == null ? void 0 : listing2.address_two) : "";
      address2 += (listing2 == null ? void 0 : listing2.city_name) ? ", " + (listing2 == null ? void 0 : listing2.city_name) : "";
      address2 += (listing2 == null ? void 0 : listing2.state_name) ? ", " + (listing2 == null ? void 0 : listing2.state_name) : "";
      address2 += (listing2 == null ? void 0 : listing2.zipcode) ? ", " + (listing2 == null ? void 0 : listing2.zipcode) : "";
      address2 += (listing2 == null ? void 0 : listing2.country_code) ? ", " + (listing2 == null ? void 0 : listing2.country_code) : "";
      let addressLink2 = `https://www.google.com/maps?q=${address2}&t=&z=15&ie=UTF8&iwloc=B&output=`;
      setAddress(address2);
      setAddressLink(addressLink2);
    };
    if (listing !== null) {
      getListingAddress(listing);
    }
  }, [listing]);
  useEffect(() => {
    if (operatingHoursStatus !== void 0) {
      setOpHoursStatus(operatingHoursStatus);
    }
  }, [operatingHoursStatus]);
  return /* @__PURE__ */ jsxs("div", { className: "mt-12", children: [
    /* @__PURE__ */ jsx(ComponentTitle, { title: "Location and Hours" }),
    /* @__PURE__ */ jsx("div", { className: " ", children: /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-1 md:grid-cols-12 gap-5
                    `, children: [
      /* @__PURE__ */ jsxs("div", { className: "col-span-6", children: [
        /* @__PURE__ */ jsx("div", { className: " relative w-full h-[150px] overflow-hidden rounded-lg", children: /* @__PURE__ */ jsx(
          "img",
          {
            className: " object-cover w-full h-full",
            src: "/images/mapicon.jpeg",
            alt: ""
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: " grid grid-cols-2 gap-6 mt-3", children: [
          /* @__PURE__ */ jsx("div", { children: address }),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("a", { href: `${addressLink}`, target: "_blank", children: /* @__PURE__ */ jsx("button", { className: "w-[100%] border-[1px] border-blue-300 rounded-md", children: /* @__PURE__ */ jsx("div", { className: "text-[14px]  font-sans font-bold text-bold  py-2 tracking-tight ", children: "View in Map" }) }) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: `col-span-6`, children: /* @__PURE__ */ jsxs("div", { className: ``, children: [
        openStatus === "no_hours" || openStatus === null && /* @__PURE__ */ jsx("div", { children: "No hours selected." }),
        openStatus === "always_open" && /* @__PURE__ */ jsx("div", { children: "Business is always open" }),
        openStatus === "permanently_closed" && /* @__PURE__ */ jsx("div", { children: "Permanently Closed" }),
        openStatus === "temporarily_closed" && /* @__PURE__ */ jsx("div", { children: "Temporarily Closed" }),
        opHours !== null && openStatus === "selected_hours" && /* @__PURE__ */ jsx("ul", { className: `w-full divide-y-[1px] md:divide-none`, children: opHours == null ? void 0 : opHours.map((item, index2) => {
          return /* @__PURE__ */ jsx(
            "li",
            {
              className: `w-full ${(item == null ? void 0 : item.hours.includes(null)) && "hidden"} `,
              children: /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-12 py-1.5 
                                                        `, children: [
                /* @__PURE__ */ jsx("div", { className: ` col-span-2 flex flex-col
                                                        place-items-start`, children: item == null ? void 0 : item.day }),
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: `flex flex-row col-span-10
                                                    place-items-end place-content-end md:place-content-start gap-3 `,
                    children: [
                      /* @__PURE__ */ jsx("span", { className: `${(item == null ? void 0 : item.hours.includes("Closed")) && "hidden"}`, children: item == null ? void 0 : item.hours }),
                      /* @__PURE__ */ jsx("span", { className: `${opHoursStatus.today === (item == null ? void 0 : item.day) ? "mr-[10px]" : ""}`, children: (item == null ? void 0 : item.hours.includes("Closed")) ? "Closed" : opHoursStatus.today === (item == null ? void 0 : item.day) && (opHoursStatus.isOpen ? "Open Now" : "Closed Now") })
                    ]
                  }
                )
              ] })
            },
            index2
          );
        }) })
      ] }) })
    ] }) })
  ] });
};
function RatingBoxSquare({ rating }) {
  return /* @__PURE__ */ jsx("div", { className: "flex gap-x-[3px]", children: Array.from({ length: 5 }).map((_, i) => {
    const fillPercent = Math.max(0, Math.min(1, rating - i)) * 100;
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: `relative w-[20px] h-[20px] ${rating > 0 ? "bg-blue-500" : "bg-gray-200"} rounded 
                            overflow-hidden flex place-items-center
                            place-content-center`,
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `absolute inset-0 bg-green-400  z-[0]`,
              style: { width: `${fillPercent}%` }
            }
          ),
          /* @__PURE__ */ jsx(BiSolidStar, { className: `relative z-[0] w-[14px] h-[14px] ${rating > 0 ? "text-black" : "text-red-500"}`, fill: "currentColor" })
        ]
      },
      i
    );
  }) });
}
const videos = [
  {
    url: "https://youtu.be/fxbCHn6gE3U?si=GneGFZachbQdDEIO",
    title: "The surprising habits of original thinkers"
  },
  {
    url: "https://youtu.be/eHJnEHyyN1Y?si=aHRmeH67S227uGtr",
    title: "6 Tips on Being a Successful Entrepreneur"
  },
  {
    url: "https://youtu.be/1tRTWwZ5DIc?si=j6fNumMdLx5M16_H",
    title: "The INSANE Rise of NVIDIA: From Bankruptcy to $4 Trillion?"
  },
  {
    url: "https://www.youtube.com/watch?v=P6FORpg0KVo",
    title: "How to Make Learning as Addictive as Social Media"
  },
  {
    url: "https://www.youtube.com/watch?v=JpYA7WXkHyI",
    title: "How to be a creative thinker"
  },
  {
    url: "https://www.youtube.com/watch?v=JpYA7WXkHyI",
    title: "How to be a creative thinker"
  },
  {
    url: "https://www.youtube.com/watch?v=JpYA7WXkHyI",
    title: "How to be a creative thinker"
  },
  {
    url: "https://www.youtube.com/watch?v=JpYA7WXkHyI",
    title: "How to be a creative thinker"
  }
];
const Videos = ({ videoGallery, listing }) => {
  const [outVideo, setOutVideo] = useState(null);
  const [rawVideos, setRawVideos] = useState(videos);
  const [open, setOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const slider = useVideoSliderContext();
  useEffect(() => {
    const remapVideos = async (videoGallery2) => {
      let remappedVideo = [];
      videoGallery2 == null ? void 0 : videoGallery2.map((video, index2) => {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = video.video_url.match(regex);
        let videoId = match ? match[1] : null;
        let thumbnail = `https://img.youtube.com/vi/${videoId}/0.jpg`;
        let videoObject = {
          videoId,
          videoUrl: video.video_url,
          videoTitle: video.video_title,
          videoThumbnail: thumbnail,
          videoGuid: video.video_guid
        };
        remappedVideo.push(videoObject);
      });
      setOutVideo(remappedVideo);
    };
    remapVideos(videoGallery);
  }, [videoGallery]);
  const handleOpen = (video) => {
    setCurrentVideo(video);
    setOpen(true);
  };
  const showCarousel = (index2) => {
    slider.setDialog(true);
    slider.setSelectedSlide(index2 + 1);
    slider.setGallery(videoGallery);
    slider.setListing(listing);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: ` `,
      id: "video",
      children: [
        /* @__PURE__ */ jsx(
          ShowVideo,
          {
            setOpen,
            open,
            currentVideo
          }
        ),
        /* @__PURE__ */ jsx(
          VideoScrollerAlt,
          {
            outVideo,
            handleOpen,
            showCarousel,
            listing
          }
        )
      ]
    }
  );
};
const ShowVideo = ({ currentVideo, setOpen, open }) => {
  const handleClose = () => {
    const iframe = document.getElementById("yt-iframe");
    iframe.src = iframe.src;
    setOpen(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: ` ${open ? "fixed" : "hidden"} z-[20010] top-[0px] left-[0px] w-full h-full bg-black/90`, children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `absolute bg-black w-[40px] h-[40px] z-20 rounded-full text-white flex place-items-center place-content-center mt-20 ml-5 hover:cursor-pointer`,
        onClick: () => {
          handleClose();
        },
        children: /* @__PURE__ */ jsx(GrClose, {})
      }
    ),
    /* @__PURE__ */ jsx("div", { className: ` relative w-full h-full`, children: /* @__PURE__ */ jsx(
      "iframe",
      {
        id: "yt-iframe",
        src: `${open ? `https://www.youtube.com/embed/${currentVideo == null ? void 0 : currentVideo.videoId}` : ""}`,
        className: "absolute top-0 left-0 w-full h-full",
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      }
    ) })
  ] });
};
const VideoScrollerAlt = ({ outVideo, handleOpen, showCarousel, listing }) => {
  const [openGallery, setOpenGallery] = useState(false);
  const [slideWidth, setSlideWidth] = useState(150);
  const [slideHeight, setSlideHeight] = useState(90);
  const scrollRef = useRef(null);
  const [videoBar, setVideoBar] = useState(null);
  useVideoSliderContext();
  const [video20, setVideo20] = useState([]);
  const maxSlides = 6;
  useEffect(() => {
    if (outVideo) {
      const video202 = outVideo.length > maxSlides ? outVideo.slice(0, maxSlides) : outVideo;
      setVideo20(video202);
    }
  }, [outVideo]);
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
  return /* @__PURE__ */ jsx("div", { className: ` mt-6 mb-5`, children: /* @__PURE__ */ jsxs("div", { className: `relative w-full max-w-[1100px] mx-auto`, children: [
    /* @__PURE__ */ jsx(
      VideoGallery,
      {
        outVideo,
        openGallery,
        setOpenGallery,
        handleOpen,
        showCarousel,
        listing
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: scrollRef,
        className: `w-full px-0 py-0 mt-3 relative flex flex-1 overflow-x-auto bottom-scrollbar-hidden rounded-none overflow-hidden`,
        children: /* @__PURE__ */ jsxs("div", { className: `flex gap-x-3`, id: "videobar", children: [
          Array.isArray(video20) && Array.from({ length: maxSlides }, (_, i) => {
            var _a, _b, _c, _d;
            return /* @__PURE__ */ jsx("div", { children: i < maxSlides && i < (video20 == null ? void 0 : video20.length) ? /* @__PURE__ */ jsx(
              "div",
              {
                className: ` w-[${slideWidth}px] min-w-[${slideWidth}px] relative z-[30] hover:cursor-pointer border  rounded-none overflow-hidden hover:bg-white/50`,
                onClick: () => showCarousel(i),
                children: /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: `relative w-full h-[${slideHeight}px]   z-[20]`,
                    children: [
                      /* @__PURE__ */ jsx("div", { className: `absolute top-0 left-0 w-full h-full bg-transparent  z-[300000] hover:bg-white/40`, children: /* @__PURE__ */ jsx(RiYoutubeFill, { size: 20, className: `text-white absolute top-0.5 right-1 ` }) }),
                      /* @__PURE__ */ jsx("img", { src: (_a = video20[i]) == null ? void 0 : _a.videoThumbnail, alt: (_b = video20[i]) == null ? void 0 : _b.videoTitle, className: `object-cover w-full h-full` }),
                      /* @__PURE__ */ jsx("div", { className: ` block w-full absolute z-[30] text-white bottom-0 px-2 py-[5px] bg-black/80 `, children: /* @__PURE__ */ jsx("div", { className: `w-full text-white bottom-0  `, children: /* @__PURE__ */ jsx("div", { className: ` text-[12px] leading-[1.2em] line-clamp-1`, children: (_c = video20[i]) == null ? void 0 : _c.videoTitle }) }) })
                    ]
                  }
                )
              },
              (_d = video20[i]) == null ? void 0 : _d.videoGuid
            ) : /* @__PURE__ */ jsx(
              "div",
              {
                className: `w-[${slideWidth}px] h-full border flex place-items-center place-content-center hover:cursor-pointer hover:bg-gray-300 bg-gray-200 rounded-none `,
                onClick: () => {
                  setOpenGallery(true);
                },
                children: /* @__PURE__ */ jsx("div", { className: `text-white/60 w-[85%] text-center rounded-none h-[75%] border border-dashed border-black/30 flex place-items-center place-content-center text-[23px]`, children: /* @__PURE__ */ jsx(MdOutlineImage, {}) })
              }
            ) }, i);
          }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `w-[${slideWidth}px] h-full border border-gray-200 rounded-none flex place-items-center place-content-center hover:cursor-pointer hover:bg-gray-300 bg-gray-200`,
              onClick: () => {
                setOpenGallery(true);
              },
              children: /* @__PURE__ */ jsx("div", { className: `text-white/60 w-[85%] text-center rounded-none h-[75%] border border-dashed border-black/30 flex place-items-center place-content-center `, children: /* @__PURE__ */ jsx("div", { className: `text-white w-1/2 text-center rounded`, children: "All Videos" }) })
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `absolute text-white top-1/2 -translate-y-1/2 left-2 w-[40px] min-w-[40px] h-[40px] bg-black/50 hover:bg-white/70 hover:text-black flex place-content-center place-items-center hover:cursor-pointer border-[1px] border-gray-400 rounded z-[50]`,
        onClick: () => {
          scrollLeft();
        },
        children: /* @__PURE__ */ jsx(FaChevronLeft, {})
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `absolute text-white top-1/2 -translate-y-1/2 right-2 w-[40px] min-w-[40px] h-[40px] bg-black/50 hover:bg-white/70 hover:text-black flex place-content-center place-items-center hover:cursor-pointer border-[1px] border-gray-400 rounded z-[50]`,
        onClick: () => {
          scrollRight();
        },
        children: /* @__PURE__ */ jsx(FaChevronRight, {})
      }
    )
  ] }) });
};
const VideoGallery = ({
  outVideo,
  openGallery,
  setOpenGallery,
  handleOpen,
  showCarousel,
  listing
}) => {
  return /* @__PURE__ */ jsx(Fragment, { children: openGallery && /* @__PURE__ */ jsxs(
    "div",
    {
      onMouseDown: (e) => setOpenGallery(false),
      className: `flex w-screen h-screen bg-black/40 
                        z-[20000] fixed top-0 left-0 right-0 bottom-0
                        place-items-center place-content-center px-[15px]`,
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            onMouseDown: (e) => e.stopPropagation(),
            className: `min-w-[95%] w-[95%] sm:w-[95%] md:w-[80%] h-[80%] max-h-[80%] 
                            mx-auto bg-white rounded-lg shadow-lg shadow-black/50 
                            space-y-6 z-[3100] overflow-hidden`,
            children: /* @__PURE__ */ jsxs("div", { className: `w-full h-full`, children: [
              /* @__PURE__ */ jsx("div", { className: `border-b py-3 px-3`, children: /* @__PURE__ */ jsxs("div", { className: `font-bold text-gray-700
                                    text-xl w-[80%]  truncate`, children: [
                "Gallery for ",
                listing == null ? void 0 : listing.title
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: ` 
                                h-full overflow-y-auto pt-2 px-2 pb-2
                                bg-white `, children: /* @__PURE__ */ jsx("div", { className: `grid grid-cols-4 md:grid-cols-6 gap-2`, children: Array.isArray(outVideo) && (outVideo == null ? void 0 : outVideo.map((video, index2) => {
                return /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: `mb-2`,
                    onClick: () => {
                      showCarousel(index2);
                    },
                    children: [
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: `relative hover:cursor-pointer
                                                  h-[80px] md:h-[100px] lg:h-[120px] rounded-md bg-black
                                                 overflow-hidden border-[5px] border-gray-200`,
                          children: /* @__PURE__ */ jsx(
                            "img",
                            {
                              className: `object-cover w-full h-full`,
                              src: video == null ? void 0 : video.videoThumbnail,
                              alt: ""
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsx("div", { className: `mx-[2px] text-[13px] leading-[1.2em] line-clamp-2 mt-[3px]`, children: video == null ? void 0 : video.videoTitle })
                    ]
                  },
                  index2
                );
              })) }) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            onMouseDown: () => setOpenGallery(false),
            className: `w-[50px] h-[50px] z-[300] bg-white
                                flex place-content-center place-items-center
                                rounded-full absolute left-2 top-2 cursor-pointer
                                hover:bg-white/40 transition duration-1000 ease-in-out`,
            children: /* @__PURE__ */ jsx(IoClose, { className: `text-[30px]` })
          }
        )
      ]
    }
  ) });
};
const ProductSliderContext = createContext(null);
function useProductSliderContext() {
  const context = useContext(ProductSliderContext);
  return context;
}
const IMG_BASE_URL = "https://tpics.gasimg.com";
const ProductSliderProvider = ({ children }) => {
  const [dialog, setDialog] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [slides, setGallery] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [listing, setListing] = useState(null);
  const slideStep = useRef(0);
  useRef(0);
  const handleTouchStart = (e) => {
    slideStep.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const deltaX = slideStep.current - endX;
    if (deltaX > 50) {
      setCurrentSlide((i) => (i + 1) % slides.length);
    } else if (deltaX < -50) {
      setCurrentSlide((i) => (i - 1 + slides.length) % slides.length);
    }
  };
  const handleClose = () => {
    setDialog(false);
  };
  const prev = () => {
    setCurrentSlide((currentSlide2) => {
      return currentSlide2 === 0 ? slides.length - 1 : currentSlide2 - 1;
    });
  };
  const next = () => {
    setCurrentSlide((currentSlide2) => {
      return currentSlide2 === slides.length - 1 ? 0 : currentSlide2 + 1;
    });
  };
  useEffect(() => {
    if (selectedSlide !== null) {
      setCurrentSlide(selectedSlide - 1);
    }
  }, [selectedSlide]);
  let vals = {
    dialog,
    setDialog,
    selectedSlide,
    setSelectedSlide,
    slides,
    setGallery,
    setListing
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    if (dialog) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dialog]);
  return /* @__PURE__ */ jsxs(ProductSliderContext.Provider, { value: vals, children: [
    dialog && /* @__PURE__ */ jsx("div", { className: `flex w-screen h-screen bg-white z-[20001] 
                fixed top-0 left-0 right-0 bottom-0 `, children: /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-12 gap-0 w-full`, children: [
      /* @__PURE__ */ jsxs("div", { className: `col-span-12 md:col-span-9 w-full h-full relative bg-black flex`, children: [
        /* @__PURE__ */ jsx("div", { className: ` w-full h-screen flex overflow-hidden`, children: slides && selectedSlide && slides.map((slide, index2) => {
          return /* @__PURE__ */ jsx(
            "img",
            {
              onTouchStart: handleTouchStart,
              onTouchEnd: handleTouchEnd,
              src: IMG_BASE_URL + slide.product_image_url,
              alt: "",
              style: { transform: `translateX(-${currentSlide * 100}%)` },
              className: `object-scale-down w-full h-full 
                                            block flex-shrink-0 flex-grow-0 transition-transform
                                            ease-in-out duration-1000`
            },
            index2
          );
        }) }),
        /* @__PURE__ */ jsx("button", { onMouseDown: prev, className: `block absolute top-0 bottom-0 
                                                p-[1rem] cursor-pointer left-0 group h-full 
                                                transition duration-1000 ease-in-out`, children: /* @__PURE__ */ jsx("div", { className: `w-[50px] h-[50px] bg-white/60 rounded-full flex place-content-center place-items-center group-hover:bg-white/30
                                                        transition duration-500 ease-in-out`, children: /* @__PURE__ */ jsx(BiChevronLeft, { className: " stroke-white fill-black w-[2rem] h-[2rem]" }) }) }),
        /* @__PURE__ */ jsx("button", { onMouseDown: next, className: `block absolute top-0 bottom-0 
                                                    p-[1rem] cursor-pointer right-0 group 
                                                     transition duration-1000 ease-in-out`, children: /* @__PURE__ */ jsx("div", { className: `w-[50px] h-[50px] bg-white/60 rounded-full flex place-content-center place-items-center group-hover:bg-white/30
                                                        transition duration-500 ease-in-out`, children: /* @__PURE__ */ jsx(BiChevronRight, { className: " stroke-white fill-black w-[2rem] h-[2rem]" }) }) }),
        /* @__PURE__ */ jsx(
          "div",
          {
            onMouseDown: () => handleClose(),
            className: `w-[50px] h-[50px] z-[300] bg-white
                                                    flex place-content-center place-items-center
                                                    rounded-full absolute left-2 top-2 cursor-pointer
                                                    hover:bg-white/40 transition duration-1000 ease-in-out`,
            children: /* @__PURE__ */ jsx(IoClose, { className: `text-[30px]` })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `hidden md:block md:col-span-3 px-5`, children: [
        /* @__PURE__ */ jsxs("h1", { className: " text-[22px] my-4 font-sans font-extrabold tracking-tight leading-[24px]", children: [
          "Products for ",
          listing && listing.title
        ] }),
        /* @__PURE__ */ jsxs("div", { className: " my-4 ", children: [
          currentSlide + 1,
          " / ",
          slides.length
        ] }),
        /* @__PURE__ */ jsx("hr", {}),
        /* @__PURE__ */ jsx("div", { className: " my-4 whitespace-pre-line", children: slides[currentSlide].product_title }),
        slides[currentSlide].product_description && /* @__PURE__ */ jsx("div", { className: " my-4 whitespace-pre-line", children: slides[currentSlide].product_description }),
        /* @__PURE__ */ jsx("div", { className: " mt-8 whitespace-pre-line", children: /* @__PURE__ */ jsx(
          "a",
          {
            target: "_product",
            href: slides[currentSlide].product_link,
            className: `bg-blue-600 text-white px-12 py-4 text-center rounded-md cursor-pointer hover:shadow-lg hover:shadow-gray-300`,
            children: "Go"
          }
        ) })
      ] })
    ] }) }),
    children
  ] });
};
const ProductGallery$1 = (productGallery) => {
  const [showProductGallerySlider, setShowProductGallerySlider] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const productSlider = useProductSliderContext();
  const showProductSlider = (currentSlide2) => {
    productSlider.setDialog(true);
    productSlider.setSelectedSlide(currentSlide2 + 1);
    productSlider.setGallery(productGallery.products);
    productSlider.setListing(productGallery.listing);
  };
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: `fixed bg-black/20 w-screen h-screen top-0 left-0 z-[3000]`, children: /* @__PURE__ */ jsx(
    "div",
    {
      className: ` w-full h-full flex place-content-center place-items-center`,
      onMouseDown: (e) => productGallery.setGalleryDialog(false),
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: `max-w-[90%] w-full mx-auto bg-white h-[80%] rounded-lg`,
          onMouseDown: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsx("div", { className: ` border-b px-5 py-2`, children: /* @__PURE__ */ jsxs("div", { className: `flex place-content-between place-items-center`, children: [
              /* @__PURE__ */ jsxs("div", { className: `text-[17px] font-semibold`, children: [
                "Products for ",
                productGallery.listing.title
              ] }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `text-[25px] rounded-full border flex place-content-center place-items-center w-[35px] h-[35px] hover:bg-gray-100 hover:cursor-pointer`,
                  onMouseDown: () => productGallery.setGalleryDialog(false),
                  children: /* @__PURE__ */ jsx(IoClose, {})
                }
              )
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: ` w-full h-[85%] overflow-auto`, children: /* @__PURE__ */ jsx("div", { className: `w-full h-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-5 px-5 py-5`, children: productGallery.products.map((product, index2) => {
              return /* @__PURE__ */ jsxs(
                "div",
                {
                  className: `border rounded-md p-3 block hover:shadow-md hover:cursor-pointer`,
                  onClick: () => {
                    showProductSlider(index2);
                  },
                  children: [
                    /* @__PURE__ */ jsx("div", { className: ` w-full h-[150px] relative `, children: /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: config.IMG_BASE_URL + product.product_image_url,
                        alt: "",
                        className: ` object-cover w-full h-full`
                      }
                    ) }),
                    /* @__PURE__ */ jsx("div", { className: `mt-3 text-center line-clamp-2 border-t pt-2 h-[50px] leading-[1.4em]`, children: product == null ? void 0 : product.product_title })
                  ]
                },
                index2
              );
            }) }) })
          ]
        }
      )
    }
  ) }) });
};
const Products = (products) => {
  var _a;
  const [galleryDaialog, setGalleryDialog] = useState(false);
  const showGallery = () => {
    setGalleryDialog(true);
  };
  return /* @__PURE__ */ jsx(ProductSliderProvider, { children: /* @__PURE__ */ jsxs("div", { className: "mt-12", children: [
    /* @__PURE__ */ jsx(ComponentTitle, { title: "Products" }),
    galleryDaialog && /* @__PURE__ */ jsx(
      ProductGallery$1,
      {
        products: products.products,
        setGalleryDialog,
        listing: products.listing
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5`, children: [
      (_a = products.products) == null ? void 0 : _a.map((product, index2) => {
        return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("a", { href: product == null ? void 0 : product.product_link, target: "product", children: /* @__PURE__ */ jsxs("div", { className: `border rounded-md p-3 h-[230px] block hover:shadow-md`, children: [
          /* @__PURE__ */ jsx("div", { className: ` w-full h-[150px] relative `, children: /* @__PURE__ */ jsx(
            "img",
            {
              src: config.IMG_BASE_URL + product.product_image_url,
              alt: "",
              className: ` object-cover w-full h-full`
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: `mt-3 text-center line-clamp-2 border-t pt-2 leading-[1.4em]`, children: product == null ? void 0 : product.product_title })
        ] }) }) }, index2);
      }),
      /* @__PURE__ */ jsx(
        "div",
        {
          onClick: () => showGallery(),
          children: /* @__PURE__ */ jsxs("div", { className: `border rounded-md p-3 hover:bg-gray-50 h-[230px] flex place-items-center place-content-center flex-col bg-gray-200 cursor-pointer min-w-full`, children: [
            /* @__PURE__ */ jsx(MdBrowseGallery, { size: 22 }),
            /* @__PURE__ */ jsx("div", { children: "Product Gallery" })
          ] })
        },
        products.products.length + 1
      )
    ] })
  ] }) });
};
const Review = ({ listing }) => {
  const rating = useRating();
  const { user } = useAuth();
  const notification = useNotification();
  useEffect(() => {
    if ((listing == null ? void 0 : listing.gid) && (user == null ? void 0 : user.guid)) {
      rating.setListing(listing);
      getRating(user.guid, listing.gid).then((data) => {
        if ((data == null ? void 0 : data.length) !== 0) {
          rating.reset(data);
          rating.setRatingData(data);
        } else {
          rating.validateData(data, user);
        }
      });
    }
  }, [listing, user]);
  const handleResult = (confirmed) => {
    if (confirmed) {
      notification.cancel();
      window.location.href = "/signin";
    } else {
      notification.cancel();
    }
  };
  const handleShow = () => {
    if ((user == null ? void 0 : user.guid) === null || (user == null ? void 0 : user.guid) === void 0) {
      notification.confirm("Login to continue", handleResult);
    } else {
      rating.setShow(true);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: `w-full mt-0 `, children: /* @__PURE__ */ jsx("div", { className: ``, children: /* @__PURE__ */ jsx(
    "button",
    {
      onClick: () => handleShow(),
      className: `bg-gray-500 text-white flex flex-col
                items-center pt-[2px] pb-[3px] w-full `,
      children: "Write Review"
    }
  ) }) });
};
const AddresPanelContext = createContext(null);
const useAddressPanelContext = () => {
  const addressCtx = useContext(AddresPanelContext);
  if (!addressCtx) {
    return null;
  }
  return addressCtx;
};
const AddressPanelProvider = ({ children, ratingsData, businessProfile }) => {
  const val = {
    ratingsData,
    businessProfile
  };
  return /* @__PURE__ */ jsx(AddresPanelContext.Provider, { value: val, children });
};
const AddressPanel = ({ ratingsData, businessProfile }) => {
  return /* @__PURE__ */ jsx(AddressPanelProvider, { ratingsData, businessProfile, children: /* @__PURE__ */ jsx(AddressPanelContent, {}) });
};
const AddressPanelContent = () => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  const addressCtx = useAddressPanelContext();
  const [ratingText, setRatingText] = useState("");
  const [address, setAddress] = useState("");
  useEffect(() => {
    const getRatingVal = (ratingVal) => {
      if (ratingVal > 4.5) {
        setRatingText("Excellent");
      } else if (ratingVal >= 4 && ratingVal <= 4.5) {
        setRatingText("Superb");
      } else if (ratingVal >= 3.5 && ratingVal < 4) {
        setRatingText("Very Good");
      } else if (ratingVal >= 2 && ratingVal < 3.5) {
        setRatingText("Good");
      } else if (ratingVal >= 1 && ratingVal < 2) {
        setRatingText("Poor");
      } else {
        setRatingText("Very Poor");
      }
    };
    if (addressCtx.ratingsData) {
      const data = addressCtx == null ? void 0 : addressCtx.ratingsData;
      if (data.rating !== null) {
        getRatingVal(Number(data.rating));
      } else {
        getRatingVal(0);
      }
    }
  }, [addressCtx == null ? void 0 : addressCtx.ratingsData]);
  useEffect(() => {
    if (addressCtx == null ? void 0 : addressCtx.businessProfile) {
      let listing = addressCtx == null ? void 0 : addressCtx.businessProfile;
      let address2 = (listing == null ? void 0 : listing.address_one) ? listing == null ? void 0 : listing.address_one : "";
      address2 += (listing == null ? void 0 : listing.address_two) ? ", " + (listing == null ? void 0 : listing.address_two) : "";
      address2 += (listing == null ? void 0 : listing.city_name) ? ", " + (listing == null ? void 0 : listing.city_name) : "";
      address2 += (listing == null ? void 0 : listing.state_name) ? ", " + (listing == null ? void 0 : listing.state_name) : "";
      address2 += (listing == null ? void 0 : listing.zipcode) ? ", " + (listing == null ? void 0 : listing.zipcode) : "";
      address2 += (listing == null ? void 0 : listing.country_name) ? ", " + (listing == null ? void 0 : listing.country_name) : "";
      setAddress(address2);
    }
  }, [addressCtx == null ? void 0 : addressCtx.businessProfile]);
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: `w-full rounded-lg  border-[1px] border-t-0 md:border-t h-auto overflow-hidden`, children: [
    /* @__PURE__ */ jsxs("div", { className: `bg-gray-100/20 px-2 py-3 border-b flex place-items-center place-content-between`, children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: `flex flex-col -space-y-1`, children: [
        /* @__PURE__ */ jsx("div", { className: `text-[14px] h-fit capitalize font-semibold tracking-tight font-['arial']`, children: (_a = addressCtx == null ? void 0 : addressCtx.businessProfile) == null ? void 0 : _a.category }),
        /* @__PURE__ */ jsxs("div", { className: `text-[12px] h-fit flex place-items-center gap-1 tracking-tighter font-sans`, children: [
          /* @__PURE__ */ jsx("span", { children: ratingText }),
          /* @__PURE__ */ jsx("span", { className: `font-bold`, children: ":" }),
          /* @__PURE__ */ jsxs("span", { children: [
            formatNumber(Number((_b = addressCtx == null ? void 0 : addressCtx.ratingsData) == null ? void 0 : _b.ratingCount)),
            "  Review",
            Number((_c = addressCtx == null ? void 0 : addressCtx.ratingsData) == null ? void 0 : _c.ratingCount) > 0 && "s"
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: `flex place-items-center place-content-center w-[40px] h-[40px] bg-gray-500 rounded-md text-white text-[22px] font-normal `, children: formatNumber(Number((_d = addressCtx.ratingsData) == null ? void 0 : _d.rating)) }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: `py-4`, children: /* @__PURE__ */ jsx("div", { className: `px-4 py-5 bg-gray-200/80 rounded-r-lg text-xl w-fit`, children: "Contact" }) }),
      /* @__PURE__ */ jsxs("div", { className: `px-2.5 divide-y`, children: [
        /* @__PURE__ */ jsxs("div", { className: `flex w-full gap-3 py-3`, children: [
          /* @__PURE__ */ jsx("div", { className: `bg-gray-200/80 h-[30px] min-w-[30px] w-[30px] flex place-content-center place-items-center rounded-md border-[1px]`, children: /* @__PURE__ */ jsx(MdLocationPin, { className: `text-[20px]` }) }),
          address && /* @__PURE__ */ jsx("div", { className: `text-[14px] md:text-[12px] leading-[1.3em]`, children: address })
        ] }),
        ((_e = addressCtx == null ? void 0 : addressCtx.businessProfile) == null ? void 0 : _e.phone) && /* @__PURE__ */ jsxs("div", { className: `flex w-full gap-3 py-2.5`, children: [
          /* @__PURE__ */ jsx("div", { className: `bg-gray-200/100 h-[30px] min-w-[30px] w-[30px] flex place-content-center place-items-center rounded-md`, children: /* @__PURE__ */ jsx(MdPhone, { className: `text-[20px] h-fit` }) }),
          /* @__PURE__ */ jsx("div", { className: ` text-[15px] md:text-[13px] leading-[1.3em]
                                                    flex place-items-center font-semibold`, children: (_f = addressCtx == null ? void 0 : addressCtx.businessProfile) == null ? void 0 : _f.phone })
        ] }),
        ((_g = addressCtx == null ? void 0 : addressCtx.businessProfile) == null ? void 0 : _g.website) && /* @__PURE__ */ jsxs("div", { className: `flex w-full gap-3 py-2.5`, children: [
          /* @__PURE__ */ jsx("div", { className: `bg-gray-200/80 h-[30px] min-w-[30px] w-[30px] flex place-content-center place-items-center rounded-md`, children: /* @__PURE__ */ jsx(CgWebsite, { className: `text-[20px] h-fit` }) }),
          /* @__PURE__ */ jsx("div", { className: ` text-[15px] md:text-[13px] leading-[1.3em]
                                                    flex place-items-center font-semibold
                                                    line-clamp-1`, children: /* @__PURE__ */ jsx("a", { href: (_h = addressCtx == null ? void 0 : addressCtx.businessProfile) == null ? void 0 : _h.website, children: ((_i = addressCtx == null ? void 0 : addressCtx.businessProfile) == null ? void 0 : _i.website) || "No website" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `flex w-full gap-3 py-2.5`, children: [
          /* @__PURE__ */ jsx("div", { className: `bg-gray-200/80 h-[30px] min-w-[30px] w-[30px] flex place-content-center place-items-center rounded-md`, children: /* @__PURE__ */ jsx(MdEmail, { className: `text-[20px]` }) }),
          /* @__PURE__ */ jsx("div", { className: ` text-[15px] md:text-[13px] leading-[1.3em]
                                                    flex place-items-center font-semibold
                                                    line-clamp-1`, children: /* @__PURE__ */ jsx("a", { href: `mailto:${(_j = addressCtx == null ? void 0 : addressCtx.businessProfile) == null ? void 0 : _j.email_address}`, children: (_k = addressCtx == null ? void 0 : addressCtx.businessProfile) == null ? void 0 : _k.email_address }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: `pb-6`, children: /* @__PURE__ */ jsx("div", { className: `bg-gray-500 mt-[30px] 
                        text-white text-center py-2 rounded`, children: (addressCtx == null ? void 0 : addressCtx.businessProfile) && /* @__PURE__ */ jsx(Review, { listing: addressCtx == null ? void 0 : addressCtx.businessProfile }) }) })
      ] })
    ] })
  ] }) });
};
const BusinessLayout = ({
  listing,
  images,
  ratingsData,
  videoGallery,
  products,
  profileImageData,
  businessProfileBgData,
  reportTime
}) => {
  const [ratingDisplayData, setRatingDisplayData] = useState(null);
  const [operatingHoursStatus, setOperatingHoursStatus] = useState(void 0);
  const [bListing, setbListing] = useState(null);
  useEffect(() => {
    if (listing) {
      setbListing(listing);
    }
  }, [listing]);
  useEffect(() => {
    if (listing && ratingsData) {
      setRatingDisplayData({
        totalReviews: 0,
        category: listing == null ? void 0 : listing.category,
        rating: ratingsData.rating_average,
        ratingCount: ratingsData.rating_count
      });
    }
  }, [listing, ratingsData]);
  useEffect(() => {
    if (listing && reportTime) {
      setOperatingHoursStatus(reportTime);
    }
  }, [listing, reportTime]);
  return /* @__PURE__ */ jsxs("div", { className: `mt-0 `, children: [
    /* @__PURE__ */ jsx("div", { className: `px-[0px] w-full`, children: /* @__PURE__ */ jsxs("div", { className: `max-w-[1100px] w-full mx-auto bg-white`, children: [
      ratingsData && /* @__PURE__ */ jsxs("div", { className: `mt-4 flex gap-2 place-items-center px-[15px]`, children: [
        /* @__PURE__ */ jsx(RatingBoxSquare, { rating: Number(ratingsData == null ? void 0 : ratingsData.rating_average) }),
        /* @__PURE__ */ jsxs("div", { className: `flex place-items-center place-content-center
                                    gap-1 text-black/60 text-[14px]`, children: [
          /* @__PURE__ */ jsx("div", { children: formatNumber(Number(ratingsData == null ? void 0 : ratingsData.rating_average)) }),
          /* @__PURE__ */ jsxs("div", { children: [
            "(",
            /* @__PURE__ */ jsxs("span", { className: "underline", children: [
              formatNumber(ratingsData == null ? void 0 : ratingsData.rating_count),
              " reviews"
            ] }),
            ")"
          ] })
        ] })
      ] }),
      listing && profileImageData && /* @__PURE__ */ jsx(
        Header,
        {
          listing,
          profileImageData,
          operatingHoursStatus,
          ratingsData
        }
      )
    ] }) }),
    (images == null ? void 0 : images.length) > 0 && listing && /* @__PURE__ */ jsx("div", { className: `bg-black h-fit md:hidden
                            mt-4 `, children: /* @__PURE__ */ jsx(
      ListingCarousel,
      {
        images,
        listing
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: ` md:pt-4 md:px-[12px]`, children: /* @__PURE__ */ jsx("div", { className: `max-w-[1100px] w-full mx-auto bg-white`, children: /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-12 gap-0 md:gap-4 relative
                    `, children: [
      /* @__PURE__ */ jsxs("div", { className: ` col-span-12 lg:col-span-8`, children: [
        /* @__PURE__ */ jsx("div", { className: `hidden md:block mt-0`, children: Array.isArray(images) && (images == null ? void 0 : images.length) > 0 && listing && /* @__PURE__ */ jsx(
          ImageBlock,
          {
            images,
            listing
          }
        ) }),
        (videoGallery == null ? void 0 : videoGallery.length) > 0 && /* @__PURE__ */ jsx(
          Videos,
          {
            videoGallery,
            listing
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: ``, children: [
          /* @__PURE__ */ jsxs("div", { className: `lg:hidden ${(images == null ? void 0 : images.length) <= 0 && "mt-5"}  md:mt-0 mb-5`, children: [
            /* @__PURE__ */ jsx(
              AddressPanel,
              {
                ratingsData: ratingDisplayData,
                businessProfile: bListing
              }
            ),
            bListing !== null && /* @__PURE__ */ jsx(ClaimBusiness, { listing: bListing })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `px-[15px] md:px-[0px]`, children: [
            /* @__PURE__ */ jsx(ShortDescription, { listing }),
            listing && operatingHoursStatus && /* @__PURE__ */ jsx(LocationWithHours, { listing, operatingHoursStatus }),
            /* @__PURE__ */ jsx(Description, { listing }),
            listing && /* @__PURE__ */ jsx(SocialMedia$1, { listing }),
            listing && /* @__PURE__ */ jsx(BusinessFeatures, { listing }),
            listing && /* @__PURE__ */ jsx(BusinessPhrases, { listing }),
            listing && /* @__PURE__ */ jsx(
              Products,
              {
                products,
                listing
              }
            ),
            listing && /* @__PURE__ */ jsx(Services, { listing }),
            listing && /* @__PURE__ */ jsx(BusinessRatings, { listing })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: `col-span-12 lg:col-span-4 hidden lg:block`, children: /* @__PURE__ */ jsxs("div", { className: ` sticky top-[100px]`, children: [
        /* @__PURE__ */ jsx(
          AddressPanel,
          {
            ratingsData: ratingDisplayData,
            businessProfile: bListing
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "h-[40px]" }),
        listing && /* @__PURE__ */ jsx(ClaimBusiness, { listing })
      ] }) })
    ] }) }) })
  ] });
};
const SectionTitle = ({ title, subtitle }) => {
  return /* @__PURE__ */ jsxs("div", { className: `mb-6 border-b pb-4 -space-y-1`, children: [
    /* @__PURE__ */ jsx("div", { className: `text-[19px] font-bold
                `, children: title }),
    /* @__PURE__ */ jsx("div", { className: "text-sm ", children: subtitle })
  ] });
};
const Related = ({
  title,
  subtitle,
  category,
  limit
}) => {
  const [ti, setTi] = useState("");
  const [st, setSt] = useState("");
  const [listings, setListings] = useState([]);
  const [userId, setUserId] = useState("");
  const IMG_BASE_URL2 = "https://tpics.gasimg.com";
  const [placeholder, setPlaceholder] = useState("/images/placeholder22.png");
  useEffect(() => {
    if (title && subtitle) {
      setTi(title);
      setSt(subtitle);
    }
  }, [title, subtitle]);
  let getListings = async (category2, limit2) => {
    if (limit2 && category2) {
      let cat = await getListingByCategory(category2, limit2);
      setListings(cat);
    }
  };
  useEffect(() => {
    if (limit && category) {
      getListings(category, limit);
    }
  }, [limit, category]);
  return /* @__PURE__ */ jsx("div", { className: `px-[15px]`, children: /* @__PURE__ */ jsx("div", { className: `max-w-[1100px] mx-auto w-full`, children: /* @__PURE__ */ jsxs("div", { className: `mt-10 border-t pt-5`, children: [
    /* @__PURE__ */ jsx("div", { className: ` mb-[20px] `, children: /* @__PURE__ */ jsx(
      SectionTitle,
      {
        title: ti,
        subtitle: st
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-4`, children: Array.isArray(listings) && (listings == null ? void 0 : listings.map((data, index2) => {
      let userId2 = "";
      if (data == null ? void 0 : data.username) {
        userId2 = data == null ? void 0 : data.username;
      } else {
        userId2 = data == null ? void 0 : data.gid;
      }
      return /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(NavLink$1, { to: `/${userId2}`, children: /* @__PURE__ */ jsx("div", { className: `relative h-[120px] rounded-lg md:h-[180px] overflow-hidden`, children: /* @__PURE__ */ jsx(
          "img",
          {
            className: `${(data == null ? void 0 : data.image_url) ? "object-cover" : "object-scale-down"}  w-full h-full
                                                    text-sm bg-gray-100`,
            src: (data == null ? void 0 : data.image_url) ? IMG_BASE_URL2 + (data == null ? void 0 : data.image_url) : "images/placeholder22.png",
            alt: data.title
          }
        ) }) }) }),
        /* @__PURE__ */ jsx("div", { className: `mt-1 text-[15px] tracking-tight 
                                     truncate`, children: data.title }),
        /* @__PURE__ */ jsx("div", { className: `mt-1`, children: /* @__PURE__ */ jsx(RatingBoxSquare, { rating: data.avg_rating }) }),
        /* @__PURE__ */ jsx("div", { className: `text-[11px] mt-[5px] tracking-tight line-clamp-3
                                    leading-[1.2em]`, children: data.short_description })
      ] }, userId2);
    })) })
  ] }) }) });
};
const SearchLayout = ({ children }) => {
  return /* @__PURE__ */ jsxs("div", { className: `h-full w-full`, children: [
    /* @__PURE__ */ jsx(MainNav, {}),
    /* @__PURE__ */ jsx("main", { className: `h-full flex w-full flex-col `, children })
  ] });
};
const VerticalHeight = () => {
  return /* @__PURE__ */ jsx("div", { className: `h-20` });
};
const ResourceNotFound = () => {
  return /* @__PURE__ */ jsx("div", { className: `flex place-content-center place-items-center w-full min-h-[700px] text-[13px] flex-col space-y-4`, children: /* @__PURE__ */ jsxs("div", { className: `flex place-content-center place-items-center gap-3
                h-[40px]`, children: [
    /* @__PURE__ */ jsx("div", { className: `text-2xl font-bold text-red-600 h-full
                    flex place-items-center`, children: "404" }),
    /* @__PURE__ */ jsx("div", { className: `h-full w-[2px] border-r` }),
    /* @__PURE__ */ jsxs("div", { className: `text-black text-[14px]
                    h-full flex place-items-center space-x-2`, children: [
      /* @__PURE__ */ jsx("span", { children: "Resource not found." }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            window.history.back();
          },
          className: `underline`,
          children: "Go back"
        }
      )
    ] })
  ] }) });
};
const getCountriesWithTimezone = async (countryCode) => {
  const endpoint = config.BASE_URL + "/api/util/country_locale";
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: headers$1
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { "message": error.message };
  }
};
const getCountryTimezoneData = (countryCode, countries) => {
  return countries.find((country) => (country == null ? void 0 : country.countryCode) === countryCode);
};
const constructDailyHour = (start, end) => {
  if (start === "Closed" || end == "Closed") {
    return "Closed";
  } else if (start === null || end === null) {
    return "Not Set";
  } else {
    return `${start} - ${end}`;
  }
};
const randomKey = (start, keyLength) => (Math.random().toString(36).substring(2, 8) + Date.now().toString(36)).substring(0, 10);
const reConstructHours = (operatingHours) => {
  const opHours = [];
  const openStatus = operatingHours == null ? void 0 : operatingHours.open_status;
  opHours.push({
    key: randomKey(),
    day: "Mon",
    hours: constructDailyHour(operatingHours.monday_from, operatingHours.monday_to)
  });
  opHours.push({
    key: randomKey(),
    day: "Tue",
    hours: constructDailyHour(operatingHours.tuesday_from, operatingHours.tuesday_to)
  });
  opHours.push({
    key: randomKey(),
    day: "Wed",
    hours: constructDailyHour(operatingHours.wednesday_from, operatingHours.wednesday_to)
  });
  opHours.push({
    key: randomKey(),
    day: "Thu",
    hours: constructDailyHour(operatingHours.thursday_from, operatingHours.thursday_to)
  });
  opHours.push({
    key: randomKey(),
    day: "Fri",
    hours: constructDailyHour(operatingHours.friday_from, operatingHours.friday_to)
  });
  opHours.push({
    key: randomKey(),
    day: "Sat",
    hours: constructDailyHour(operatingHours.saturday_from, operatingHours.saturday_to)
  });
  opHours.push({
    key: randomKey(),
    day: "Sun",
    hours: constructDailyHour(operatingHours.sunday_from, operatingHours.sunday_to)
  });
  return {
    opHours,
    openStatus
  };
};
function formatTime(time24) {
  const [hourStr, minute] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "pm" : "am";
  hour = hour % 12 || 12;
  return `${hour.toString().padStart(2, "0")}:${minute} ${ampm}`;
}
const getLocationAndBusinessStatus = async (listing) => {
  const countryCode = listing == null ? void 0 : listing.country_code;
  const data = await getCountriesWithTimezone();
  const country = getCountryTimezoneData(countryCode, data);
  const operatingHours = await getOperatingHours(listing == null ? void 0 : listing.gid, listing == null ? void 0 : listing.owner);
  const reconstructed = reConstructHours(operatingHours);
  const opHours = reconstructed.opHours;
  country["hours"] = opHours;
  country["openStatus"] = operatingHours == null ? void 0 : operatingHours.open_status;
  const dayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const nowUTC = /* @__PURE__ */ new Date();
  const offsetMs = country.gmtOffset * 1e3;
  new Date(nowUTC.getTime() + offsetMs);
  const localTimeZone = tzLookup(listing.lat, listing.lng);
  let localTimeObject = getDateInTimeZone(localTimeZone);
  let localTimeText = getDateInTimeZoneX(localTimeZone);
  const dayIndex = localTimeObject.getDay();
  const today = dayMap[dayIndex];
  const todayHoursEntry = country.hours.find((entry2) => entry2.day === today);
  let isOpen = false;
  let todayHoursFormatted = /* @__PURE__ */ jsxs("span", { className: ` space-x-2`, children: [
    /* @__PURE__ */ jsx("span", { className: `underline font-bold`, children: "Status:" }, "n1"),
    /* @__PURE__ */ jsx("span", { children: "Closed Today" }, "n2")
  ] }, "m1");
  if (todayHoursEntry && todayHoursEntry.hours.includes("-")) {
    const [openStr, closeStr] = todayHoursEntry.hours.split(" - ");
    const [openHour, openMinute] = openStr.split(":").map(Number);
    const [closeHour, closeMinute] = closeStr.split(":").map(Number);
    const openTime = new Date(localTimeObject);
    openTime.setHours(openHour, openMinute, 0, 0);
    const closeTime = new Date(localTimeObject);
    closeTime.setHours(closeHour, closeMinute, 0, 0);
    isOpen = localTimeObject >= openTime && localTimeObject <= closeTime;
    const formattedLabel = (isOpen2) => {
      return `${isOpen2 ? "Open Now" : "Closed Now"}`;
    };
    todayHoursFormatted = /* @__PURE__ */ jsxs("div", { className: "w-full flex gap-1.5 place-items-center flex-wrap", children: [
      /* @__PURE__ */ jsx("span", { className: `${isOpen ? "bg-blue-700" : "bg-red-500"} text-white px-2 py-[2px] rounded-lg text-[13px]`, children: formattedLabel(isOpen) }, "o1"),
      /* @__PURE__ */ jsxs("span", { children: [
        today,
        ", "
      ] }, "o2"),
      /* @__PURE__ */ jsx("span", { children: formatTime(openStr) }, "o3"),
      /* @__PURE__ */ jsx("span", { children: "-" }, "o4"),
      /* @__PURE__ */ jsx("span", { children: formatTime(closeStr) }, "o5")
    ] });
  }
  if (todayHoursEntry && todayHoursEntry.hours.includes("Not Set")) {
    todayHoursFormatted = /* @__PURE__ */ jsxs("div", { className: `text-[12px]`, children: [
      /* @__PURE__ */ jsx("span", { children: "OPERATING HOURS: " }, "p1"),
      /* @__PURE__ */ jsx("span", { className: ` rounded text-black px-1 py-[2px] uppercase text-sm font-semibold`, children: "Hours not set." }, "p2")
    ] });
  }
  const localTimeString = localTimeObject.toString();
  return {
    ...country,
    isOpen,
    todayHoursFormatted,
    today,
    localTimeString,
    localTimeText
  };
};
const ReportTime = async (listing) => {
  const locationDetails = getLocationAndBusinessStatus(listing);
  return locationDetails;
};
const loader$W = async ({ request, params }) => {
  try {
    const id = params.id || null;
    let listing;
    let profileImageData;
    let gallery;
    let ratingData;
    let videoGallery = null;
    let products = null;
    let reportTime;
    let businessProfileBgData;
    try {
      listing = await getPage(id);
      profileImageData = await getBusinessProfileImageData(listing == null ? void 0 : listing.gid);
      businessProfileBgData = await getBusinessProfileBgData(listing == null ? void 0 : listing.gid);
      gallery = await getBusinessGallery(listing.gid);
      ratingData = await getRatingsReviews(listing.gid);
      videoGallery = await getBusinessVideoGallery(listing == null ? void 0 : listing.gid);
      products = await getProductGallery(listing == null ? void 0 : listing.gid, listing == null ? void 0 : listing.owner);
      reportTime = await ReportTime(listing);
    } catch (error) {
      console.log(error.message);
    }
    return {
      listing,
      gallery,
      ratingsData: ratingData,
      profileImageData,
      businessProfileBgData,
      videoGallery,
      products,
      reportTime
    };
  } catch (err) {
    logError(err);
  }
};
const meta$1 = ({ data }) => {
  try {
    const listing = data == null ? void 0 : data.listing;
    const profileImageData = data == null ? void 0 : data.profileImageData;
    let profileImageLink = "";
    if ((profileImageData == null ? void 0 : profileImageData.image_url) === "" || (profileImageData == null ? void 0 : profileImageData.image_url) === null || (profileImageData == null ? void 0 : profileImageData.image_url) === void 0) {
      profileImageLink = `${config.BASE_URL}/images/abstract_placeholder.jpg`;
    } else {
      profileImageLink = config.IMG_BASE_URL + (profileImageData == null ? void 0 : profileImageData.image_url);
    }
    const mimetype = profileImageData == null ? void 0 : profileImageData.mimetype;
    const getKeyWords = (texts) => {
      var _a, _b;
      if (texts === null || texts === void 0 || texts === "") {
        return null;
      }
      const cleaned = texts.replace(/&/g, ",");
      const arr = (_b = (_a = cleaned == null ? void 0 : cleaned.split(",")) == null ? void 0 : _a.map((item) => item.trim())) == null ? void 0 : _b.filter((item) => item.length > 0);
      return arr;
    };
    const keywords = getKeyWords((listing == null ? void 0 : listing.business_phrases) || null);
    return [
      { title: (listing == null ? void 0 : listing.title) || "Garssete Inc." },
      { name: "description", content: listing == null ? void 0 : listing.short_description },
      { name: "keywords", content: keywords },
      { property: "fb:app_id", content: "1325393508603168" },
      { property: "og:url", content: (listing == null ? void 0 : listing.website) || "https://garssete.com" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: (listing == null ? void 0 : listing.title) || "Garssete.com" },
      { property: "og:description", content: listing == null ? void 0 : listing.short_description },
      { property: "og:image", content: profileImageLink },
      { property: "og:image:secure_url", content: profileImageLink },
      { property: "og:image:type", content: mimetype },
      { property: "og:image:width", content: "200" },
      { property: "og:image:alt", content: (listing == null ? void 0 : listing.title) || "Garssete" },
      { name: "twitter:creator", content: "garssete" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: (listing == null ? void 0 : listing.title) || "Garssete Directory Listing" },
      { name: "twitter:description", content: listing == null ? void 0 : listing.short_description }
    ];
  } catch (e) {
    logError(e);
  }
  return [];
};
const index$r = () => {
  const data = useLoaderData();
  let listing;
  let gallery = null;
  let ratingsData;
  let videoGallery = null;
  let products = null;
  let profileImageData;
  let businessProfileBgData;
  let reportTime;
  listing = data.listing;
  gallery = data.gallery;
  ratingsData = data.ratingsData;
  videoGallery = data.videoGallery;
  products = data.products;
  profileImageData = data.profileImageData;
  businessProfileBgData = data.businessProfileBgData;
  reportTime = data.reportTime;
  console.log(reportTime);
  return /* @__PURE__ */ jsx(RatingProvider, { children: /* @__PURE__ */ jsx(GalleryProvider, { children: /* @__PURE__ */ jsxs(SearchLayout, { children: [
    /* @__PURE__ */ jsx(TopAd, {}),
    (listing == null ? void 0 : listing.gid) !== null && (listing == null ? void 0 : listing.gid) !== void 0 && gallery && ratingsData && videoGallery && products && profileImageData && reportTime && /* @__PURE__ */ jsx(
      BusinessLayout,
      {
        listing,
        images: gallery,
        ratingsData,
        videoGallery,
        products,
        profileImageData,
        businessProfileBgData,
        reportTime
      }
    ),
    (listing == null ? void 0 : listing.category) !== void 0 ? /* @__PURE__ */ jsx(
      Related,
      {
        category: listing == null ? void 0 : listing.category,
        limit: 6,
        title: `Related: ${listing == null ? void 0 : listing.category}`,
        subtitle: "Related based on the same category."
      }
    ) : /* @__PURE__ */ jsx(ResourceNotFound, {}),
    /* @__PURE__ */ jsx(VerticalHeight, {}),
    /* @__PURE__ */ jsx(CallToActionSection, {}),
    /* @__PURE__ */ jsx(FooterAlt, {})
  ] }) }) });
};
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$r,
  loader: loader$W,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const loader$V = async ({ request, params }) => {
  function generateRandom10DigitNumber() {
    const min = 1e9;
    const max = 9999999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  try {
    const id = params.id || null;
    let hotels2 = [];
    let latestBusinesses = [];
    let gallery;
    let ratingData;
    let randomNumber;
    try {
      hotels2 = await getHomeListingByCategory("hotel", 6);
      latestBusinesses = await getLatestBusinesses(10);
      randomNumber = generateRandom10DigitNumber();
    } catch (error) {
      console.log(error.message);
    }
    return {
      hotels: hotels2,
      latestBusinesses,
      randomNumber
    };
  } catch (err) {
    logError(err);
  }
};
const meta = ({ data }) => {
  let randomNo = data == null ? void 0 : data.randomNumber;
  try {
    return [
      { title: "Garssete - Online Business Directory, Explore Listings Around The World" },
      { name: "description", content: "Discover and connect with businesses worldwide. Garssete.com helps you explore listings, find services, and grow your network across industries and countries." },
      { name: "keywords", content: "Business Directory Service, Location Services" },
      { property: "fb:app_id", content: "1325393508603168" },
      { property: "og:url", content: "https://garssete.com" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Garssete - Online Business Directory, Explore Listings Around The World" },
      { property: "og:description", content: "Discover and connect with businesses worldwide. Garssete.com helps you explore listings, find services, and grow your network across industries and countries." },
      { property: "og:image", content: `https://edition.garssete.com/images/gsbg.png?v=${randomNo}` },
      { property: "og:image:secure_url", content: `https://edition.garssete.com/images/gsbg.png?v=${randomNo}` },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "200" },
      { property: "og:image:alt", content: "Garssete" },
      { name: "twitter:creator", content: "garssete" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Garssete - Online Business Directory, Explore Listings Around The World" },
      { name: "twitter:description", content: "Discover and connect with businesses worldwide. Garssete.com helps you explore listings, find services, and grow your network across industries and countries." }
    ];
  } catch (e) {
    logError(e);
  }
  return [];
};
const _index = () => {
  const loader2 = useLoaderData();
  loader2.hotels;
  loader2.latestBusinesses;
  return /* @__PURE__ */ jsx(OperationProvider, { defaultDuration: 4e3, children: /* @__PURE__ */ jsxs(HomeLayout, { children: [
    /* @__PURE__ */ jsx(SearchBusiness, {}),
    /* @__PURE__ */ jsx(YourGuide, {}),
    /* @__PURE__ */ jsx(Hotel, {}),
    /* @__PURE__ */ jsx("div", { className: `h-[100px]` }),
    /* @__PURE__ */ jsx(FooterAlt, {})
  ] }) });
};
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _index,
  loader: loader$V,
  meta
}, Symbol.toStringTag, { value: "Module" }));
function loader$U() {
  return null;
}
function NotFound() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(MainNav, {}),
    /* @__PURE__ */ jsx("div", { className: `min-h-screen flex items-center justify-center 
        text-center px-4 text-black fixed top-0 w-full`, children: /* @__PURE__ */ jsxs("div", { className: `flex place-content-center place-items-center gap-3
                h-[40px]`, children: [
      /* @__PURE__ */ jsx("div", { className: `text-2xl font-bold text-red-600 h-full
                    flex place-items-center`, children: "404" }),
      /* @__PURE__ */ jsx("div", { className: `h-full w-[2px] border-r` }),
      /* @__PURE__ */ jsxs("div", { className: `text-black text-[14px]
                    h-full flex place-items-center space-x-2`, children: [
        /* @__PURE__ */ jsx("span", { children: "Resource not found." }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              window.history.back();
            },
            className: `underline`,
            children: "Go back"
          }
        )
      ] })
    ] }) })
  ] });
}
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: NotFound,
  loader: loader$U
}, Symbol.toStringTag, { value: "Module" }));
const index$q = () => {
  return /* @__PURE__ */ jsx("div", {});
};
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$q
}, Symbol.toStringTag, { value: "Module" }));
const Feature$1 = ({ feature }) => {
  return /* @__PURE__ */ jsxs("div", { id: feature.gid, className: `pb-4 pt-3`, children: [
    /* @__PURE__ */ jsx(Link, { to: `/${(feature == null ? void 0 : feature.username) ? feature == null ? void 0 : feature.username : feature == null ? void 0 : feature.gid}`, children: /* @__PURE__ */ jsx("div", { className: `text-[15px] tracking-normal 
                text-blue-700 font-normal`, children: feature.title }) }),
    /* @__PURE__ */ jsx("div", { className: `text-md font-semibold 
                tracking-tight mt-[2px]`, children: feature.phone }),
    /* @__PURE__ */ jsx("div", { className: `font-normal  
                tracking-normal mt-[2px] leading-[1.3em]
                text-black`, children: feature.short_description.substring(0, 80) }),
    /* @__PURE__ */ jsx("div", { className: `text-[12px] font-normal 
                tracking-tight mt-[5px] leading-[1.4em]
                text-brown-700`, children: feature.address_one }),
    /* @__PURE__ */ jsx("div", { className: ` font-semibold  
                tracking-tight mt-[8px] text-blue-800`, children: /* @__PURE__ */ jsx(Link, { to: feature.website ? feature.website : `#${feature.gid}`, children: "Website" }) })
  ] });
};
const Featured$1 = () => {
  const [featured, setFeatured] = useState([]);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const getFeatured = async () => {
      const data = await getFeaturedListing();
      setFeatured(data);
    };
    getFeatured();
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: `border-[1px] px-4 pt-4 pb-4
        rounded-xl border-gray-200`, children: [
    /* @__PURE__ */ jsx("div", { className: `font-bold text-lg`, children: "Featured" }),
    /* @__PURE__ */ jsx("div", { className: `divide-y divide-gray-200`, children: (featured == null ? void 0 : featured.length) > 0 ? featured == null ? void 0 : featured.map((feature, index2) => {
      if (index2 > 2) {
        return null;
      }
      return /* @__PURE__ */ jsx(Feature$1, { feature }, index2);
    }) : /* @__PURE__ */ jsx("div", { className: `text-[15px] mt-4`, children: "Loading..." }) })
  ] });
};
const ResultLayout = ({ children }) => {
  return /* @__PURE__ */ jsx("div", { className: `w-full h-auto px-[15px] mt-5 z-0`, children: /* @__PURE__ */ jsxs("div", { className: `max-w-[1100px] mx-auto w-full
                    grid grid-cols-12 gap-8`, children: [
    /* @__PURE__ */ jsx("div", { className: `col-span-12 lg:col-span-8 `, children }),
    /* @__PURE__ */ jsx("div", { className: `col-span-12 lg:col-span-4 lg:block `, children: /* @__PURE__ */ jsx("div", { className: `sticky top-[80px]`, children: /* @__PURE__ */ jsx(Featured$1, {}) }) })
  ] }) });
};
function RatingBox({ rating }) {
  return /* @__PURE__ */ jsx("div", { className: "flex gap-[3px]", children: Array.from({ length: 5 }).map((_, i) => {
    const fillPercent = Math.max(0, Math.min(1, rating - i)) * 100;
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: `relative w-[20px] h-[20px] bg-gray-300 rounded 
                            overflow-hidden flex place-items-center
                            place-content-center`,
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `absolute inset-0 bg-green-600 z-[0]`,
              style: { width: `${fillPercent}%` }
            }
          ),
          /* @__PURE__ */ jsx(BiSolidStar, { className: "relative z-[0] w-[14px] h-[14px] text-white", fill: "currentColor" })
        ]
      },
      i
    );
  }) });
}
const ResultItem$1 = ({ listing }) => {
  var _a, _b;
  const [placeholder, setPlaceholder] = useState("/images/imgplaceholder2.jpg");
  const [imgscr, setImgsrc] = useState("/images/imgplaceholder2.jpg");
  const [userId, setUserId] = useState("");
  useEffect(() => {
    if (listing) {
      if ((listing == null ? void 0 : listing.image_url) !== "" || (listing == null ? void 0 : listing.image_url) !== null) {
        setImgsrc(config.IMG_BASE_URL + (listing == null ? void 0 : listing.image_url));
      }
      if ((listing == null ? void 0 : listing.username) !== "" && (listing == null ? void 0 : listing.username) !== null && (listing == null ? void 0 : listing.username) !== void 0) {
        setUserId(listing == null ? void 0 : listing.username);
      } else {
        setUserId(listing == null ? void 0 : listing.gid);
      }
    }
  }, [listing]);
  return /* @__PURE__ */ jsxs("div", { className: ` cursor-pointer mt-6 z-0 pb-6`, onClick: (e) => {
    window.location.href = `/${userId}`;
  }, children: [
    /* @__PURE__ */ jsxs("div", { className: `flex rounded-sm gap-4 z-0`, children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: `relative min-w-[170px] w-[100px] h-[100px] border
                    bg-white z-0 bg-cover bg-center rounded-lg shadow-md overflow-hidden`,
          style: { backgroundImage: `url(${placeholder})` },
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: imgscr,
                alt: listing.title,
                className: `object-cover w-full h-full text-sm
                            rounded z-0`
              }
            ),
            /* @__PURE__ */ jsx("div", { className: `w-full h-[50%]
                            absolute z-[10] bottom-0 
                            bg-gradient-to-t from-black/40
                            to-transparent
                            ` })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: " w-full", children: /* @__PURE__ */ jsxs("div", { className: `md:flex md:place-content-between 
                w-full md:gap-x-[4px]`, children: [
        /* @__PURE__ */ jsxs("div", { className: `w-full md:w-[60%]`, children: [
          /* @__PURE__ */ jsx(Link, { to: `/${userId}`, onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsx("div", { className: `font-bold text-[17px] text-brown-800
                    leading-[1.1em] hover:underline text-[#001e5a]`, children: listing.title }) }),
          /* @__PURE__ */ jsxs("div", { className: `mt-2 flex gap-1
                                                     place-items-center`, children: [
            /* @__PURE__ */ jsx(RatingBox, { rating: listing == null ? void 0 : listing.average_rating }),
            /* @__PURE__ */ jsxs("div", { className: `flex place-items-center
                                gap-1 text-black/60 text-[13px]`, children: [
              /* @__PURE__ */ jsx("div", { children: listing == null ? void 0 : listing.average_rating }),
              /* @__PURE__ */ jsxs("div", { children: [
                "(",
                `${(listing == null ? void 0 : listing.total_reviews) === null ? 0 : listing == null ? void 0 : listing.total_reviews} review${Number(listing == null ? void 0 : listing.total_reviews) > 1 ? "s" : ""}`,
                ")"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: `font-normal text-[13px] leading-[1.2em] mt-[5px]
                    `, children: (listing == null ? void 0 : listing.business_phrases) ? `${(_a = listing == null ? void 0 : listing.business_phrases) == null ? void 0 : _a.substring(0, 150)}...` : "" }),
          /* @__PURE__ */ jsx("div", { className: `font-normal text-[13px] 
                                    flex place-items-center gap-1 mt-[3px]`, children: /* @__PURE__ */ jsx("div", { className: `capitalize flex place-items-center gap-1
                                    text-black underline`, children: listing.category }) }),
          (listing == null ? void 0 : listing.established) && /* @__PURE__ */ jsxs("div", { className: `flex gap-2 mt-[5px] place-items-center`, children: [
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(BsBank, {}) }),
            /* @__PURE__ */ jsxs("div", { className: `flex flex-col gap-y-[3px] leading-3`, children: [
              /* @__PURE__ */ jsxs("div", { className: `text-[12px] font-bold`, children: [
                "Since ",
                listing == null ? void 0 : listing.established
              ] }),
              /* @__PURE__ */ jsx("div", { className: `text-[12px]`, children: "In Business" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `w-full lg:w-[40%] hidden 
                                sm:block`, children: [
          /* @__PURE__ */ jsx("div", { className: `flex flex-col 
                    place-items-end place-content-end
                        font-semibold text-[15px] tracking-tighter`, children: listing.phone }),
          /* @__PURE__ */ jsxs("div", { className: `flex flex-col text-end text-[12px]
                                leading-[1.2em]`, children: [
            listing == null ? void 0 : listing.address_one,
            (listing == null ? void 0 : listing.address_two) ? `, ${listing == null ? void 0 : listing.address_two}` : "",
            (listing == null ? void 0 : listing.city_name) ? `, ${listing == null ? void 0 : listing.city_name}` : "",
            (listing == null ? void 0 : listing.state_name) ? `, ${listing == null ? void 0 : listing.state_name}` : "",
            (listing == null ? void 0 : listing.country_name) ? `, ${listing == null ? void 0 : listing.country_name}` : ""
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `mt-2 md:mt-3 mb-0 text-[13px] leading-[1.2em]
                    flex place-content-start`, children: [
      /* @__PURE__ */ jsx("div", { className: `relative top-[-3px] z-0 flex`, children: /* @__PURE__ */ jsx(RiDoubleQuotesL, { className: `tracking-tighter text-[20px]` }) }),
      /* @__PURE__ */ jsx("div", { children: (listing == null ? void 0 : listing.short_description) ? `${(_b = listing == null ? void 0 : listing.short_description) == null ? void 0 : _b.substring(0, 150)}...` : "" })
    ] })
  ] });
};
const ResultMobile = ({ listing, index: index2 }) => {
  var _a;
  const [placeholder, setPlaceholder] = useState("/images/imgplaceholder2.jpg");
  const [imgscr, setImgsrc] = useState("/images/imgplaceholder2.jpg");
  const [userId, setUserId] = useState("");
  useEffect(() => {
    if (listing) {
      if ((listing == null ? void 0 : listing.image_url) !== "" || (listing == null ? void 0 : listing.image_url) !== null) {
        setImgsrc(config.IMG_BASE_URL + (listing == null ? void 0 : listing.image_url));
      }
      if ((listing == null ? void 0 : listing.username) !== "" && (listing == null ? void 0 : listing.username) !== null && (listing == null ? void 0 : listing.username) !== void 0) {
        setUserId(listing == null ? void 0 : listing.username);
      } else {
        setUserId(listing == null ? void 0 : listing.gid);
      }
    }
  }, [listing]);
  return /* @__PURE__ */ jsx("div", { className: ` cursor-pointer mt-6 z-0 pb-6`, onClick: (e) => {
    window.location.href = `/${userId}`;
  }, children: /* @__PURE__ */ jsxs("div", { className: `w-full h-fit my-4`, children: [
    /* @__PURE__ */ jsxs("div", { className: `flex gap-[10px]`, children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: `w-[90px] min-w-[90px]
                    bg-transparent z-0 h-[80px]
                    rounded-md overflow-hidden
                    relative`,
          style: { backgroundImage: `url(${placeholder})` },
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: imgscr,
                alt: listing == null ? void 0 : listing.title,
                className: `object-cover w-full h-full 
                                text-sm rounded z-[0]`
              }
            ),
            /* @__PURE__ */ jsx("div", { className: `w-full h-[40%]
                            absolute z-[10] bottom-0 
                            bg-gradient-to-t from-black/40
                            to-transparent
                            ` })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: `flex-1 min-w-0 `, children: [
        /* @__PURE__ */ jsxs("div", { className: `text-[19px] 
                    font-bold leading-[1.2em]
                    truncate overflow-hidden
                    `, children: [
          index2 + 1,
          ". ",
          listing == null ? void 0 : listing.title
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `mt-2 flex gap-1
                         place-items-center`, children: [
          /* @__PURE__ */ jsx(RatingBox, { rating: listing == null ? void 0 : listing.average_rating }),
          /* @__PURE__ */ jsxs("div", { className: `flex place-items-center
                                gap-1 text-black/60 text-[13px]`, children: [
            /* @__PURE__ */ jsxs("div", { children: [
              Number(listing == null ? void 0 : listing.average_rating),
              ","
            ] }),
            /* @__PURE__ */ jsxs("div", { className: `leading-[1.2em]`, children: [
              "(",
              `${listing == null ? void 0 : listing.total_reviews} review${Number(listing == null ? void 0 : listing.total_reviews) > 1 ? "s" : ""}`,
              ")"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: `capitalize mt-1
                            text-[14px] underline`, children: listing == null ? void 0 : listing.category }),
        (listing == null ? void 0 : listing.established) && /* @__PURE__ */ jsxs("div", { className: `flex gap-2 mt-[5px] place-items-center`, children: [
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(BsBank, {}) }),
          /* @__PURE__ */ jsxs("div", { className: `flex flex-col gap-y-1 leading-3`, children: [
            /* @__PURE__ */ jsxs("div", { className: `text-[12px] font-bold`, children: [
              "Since ",
              listing == null ? void 0 : listing.established
            ] }),
            /* @__PURE__ */ jsx("div", { className: `text-[12px]`, children: "In Business" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `mt-2 md:mt-3 mb-0 text-[14px] leading-[1.2em]
                                flex place-content-start`, children: [
      /* @__PURE__ */ jsx("div", { className: `relative top-[-3px] z-0 flex`, children: /* @__PURE__ */ jsx(RiDoubleQuotesL, { className: `tracking-tighter text-[20px]` }) }),
      /* @__PURE__ */ jsx("div", { children: (listing == null ? void 0 : listing.short_description) ? `${(_a = listing == null ? void 0 : listing.short_description) == null ? void 0 : _a.substring(0, 150)}...` : "" })
    ] })
  ] }) });
};
const SearchPagination = ({
  data,
  itemsPerPage = 10
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: ` divide-y z-0 divide-gray-500/30`, children: currentItems == null ? void 0 : currentItems.map((item, index2) => {
      return /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: `md:hidden`, children: /* @__PURE__ */ jsx(ResultMobile, { listing: item, index: index2 }) }),
        /* @__PURE__ */ jsx("div", { className: `hidden md:block`, children: item && /* @__PURE__ */ jsx(ResultItem$1, { listing: item }) })
      ] }, index2);
    }) }),
    totalPages > 1 && /* @__PURE__ */ jsxs("div", { className: `flex justify-center gap-[5px] 
                mt-[60px]`, children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: goToPrevious,
          disabled: currentPage === 1,
          className: "px-[12px] py-[8px] bg-white cursor-pointer border\n                                rounded-[4px]",
          children: "Previous"
        }
      ),
      Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => paginate(number),
          className: `px-[12px] py-[8px]  cursor-pointer border
                                rounded-[4px] ${currentPage === number ? "bg-blue-500 text-white border-blue-500" : "bg-white"}`,
          children: number
        },
        number
      )),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: goToNext,
          disabled: currentPage === totalPages,
          className: "px-[12px] py-[8px] bg-white cursor-pointer border\n                                rounded-[4px]",
          children: "Next"
        }
      )
    ] })
  ] });
};
const LatestBusinesses = ({
  title,
  subtitle,
  category,
  limit
}) => {
  const [ti, setTi] = useState("");
  const [st, setSt] = useState("");
  const [listings, setListings] = useState([]);
  const IMG_BASE_URL2 = "https://tpics.gasimg.com";
  useEffect(() => {
    if (title && subtitle) {
      setTi(title);
      setSt(subtitle);
    }
  }, [title, subtitle]);
  let getListings = async (category2, limit2) => {
    if (limit2 && category2) {
      let cat = await getListingByCategory(category2, limit2);
      setListings(cat);
    }
  };
  useEffect(() => {
    if (limit && category) {
      getListings(category, limit);
    }
  }, [limit, category]);
  return /* @__PURE__ */ jsxs("div", { className: `mt-10 border-t pt-5`, children: [
    /* @__PURE__ */ jsxs("div", { className: ` mb-[20px] `, children: [
      /* @__PURE__ */ jsx("div", { className: `font-semibold text-xl`, children: ti }),
      /* @__PURE__ */ jsx("div", { className: `text-sm -mt-[2px]`, children: st })
    ] }),
    /* @__PURE__ */ jsx("div", { className: `grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-4`, children: (listings == null ? void 0 : listings.length) > 0 && (listings == null ? void 0 : listings.map((data, index2) => {
      return /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, { to: `/${data.gid}`, children: /* @__PURE__ */ jsx("div", { className: `relative h-[180px]`, children: /* @__PURE__ */ jsx(
          "img",
          {
            className: `object-cover w-full h-full
                                                    text-sm`,
            src: (data == null ? void 0 : data.image_url) ? IMG_BASE_URL2 + (data == null ? void 0 : data.image_url) : "https://accuvice.ng/wp-content/uploads/2016/06/placeholder.gif",
            alt: data.title
          }
        ) }) }) }),
        /* @__PURE__ */ jsx("div", { className: `mt-1 text-[15px] tracking-tight 
                                     truncate`, children: data.title }),
        /* @__PURE__ */ jsx("div", { className: `mt-1`, children: /* @__PURE__ */ jsx(LatestStarRating, { rating: data.avg_rating }) }),
        /* @__PURE__ */ jsx("div", { className: `text-[11px] mt-[5px] tracking-tight
                                    leading-[1.2em]`, children: data.short_description.substring(0, 100) })
      ] }, index2);
    })) })
  ] });
};
const loader$T = async ({ request, params }) => {
  try {
    const url = new URL(request.url);
    const query2 = url.searchParams.get("q") || "";
    let data = await getSearch(query2);
    let res = {
      data,
      query: query2
    };
    return res;
  } catch (err) {
    throw new Response("You are offline. Please reconnect.", { status: 503 });
  }
};
const index$p = () => {
  var _a;
  const res = useLoaderData();
  const [searchParams] = useSearchParams();
  const data = res.data;
  const query2 = res.query;
  const [queryParam, setQueryParam] = useState(null);
  useEffect(() => {
    if (query2) {
      setQueryParam(query2);
    }
  }, [query2]);
  return /* @__PURE__ */ jsxs(SearchLayout, { children: [
    /* @__PURE__ */ jsx("div", { className: `px-[15px] bg-gray-100 `, children: /* @__PURE__ */ jsx("div", { className: `max-w-[1100px] mx-auto w-full`, children: /* @__PURE__ */ jsxs("div", { className: ` grid grid-cols-12 gap-x-2 gap-y-2 md:gap-y-0`, children: [
      /* @__PURE__ */ jsx("div", { className: `flex place-items-center col-span-12 md:col-span-4 truncate
                             pt-3 pb-0 md:pb-3 `, children: /* @__PURE__ */ jsx("span", { className: `text-[17px] font-bold`, children: ((_a = res.query) == null ? void 0 : _a.length) > 0 ? `Search for '${res.query}'` : `Browse Updates` }) }),
      /* @__PURE__ */ jsx("div", { className: `flex place-items-center place-content-start
                         text-gray-500 col-span-12 md:col-span-8 
                            md:place-content-end font-bold pb-[15px] md:pb-[0px]
                            gap-x-3 md:gap-x-12 flex-wrap md:flex-nowrap leading-[1.4em]
                              `, children: navlinks == null ? void 0 : navlinks.map((link, index2) => {
        return /* @__PURE__ */ jsx(Link, { to: `${link.url}`, className: ``, children: link.label }, index2);
      }) })
    ] }) }) }),
    /* @__PURE__ */ jsx(TopAd, {}),
    /* @__PURE__ */ jsxs("div", { className: `md:hidden px-[12px] mt-8`, children: [
      (data == null ? void 0 : data.length) > 0 ? /* @__PURE__ */ jsx(
        SearchPagination,
        {
          data,
          itemsPerPage: 20
        }
      ) : /* @__PURE__ */ jsx("div", { className: `flex place-items-center rounded
                            place-content-center p-5 border capitalize`, children: /* @__PURE__ */ jsx("span", { children: "no record" }) }),
      /* @__PURE__ */ jsx(
        LatestBusinesses,
        {
          category: "entertainment",
          limit: 5,
          title: "Entertainment",
          subtitle: "Entertainment based businesses added in the last 7 days"
        }
      ),
      /* @__PURE__ */ jsx(
        LatestBusinesses,
        {
          category: "services",
          limit: 5,
          title: "Services",
          subtitle: "Services based businesses added in the last 7 days"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: `hidden md:block`, children: /* @__PURE__ */ jsxs(ResultLayout, { children: [
      data.length > 0 ? /* @__PURE__ */ jsx(
        SearchPagination,
        {
          data,
          itemsPerPage: 20
        }
      ) : /* @__PURE__ */ jsx("div", { className: `flex place-items-center rounded
                            place-content-center p-5 border capitalize`, children: /* @__PURE__ */ jsx("span", { children: "no record" }) }),
      /* @__PURE__ */ jsx(
        LatestBusinesses,
        {
          category: "entertainment",
          limit: 5,
          title: "Entertainment",
          subtitle: "Entertainment based businesses added in the last 7 days"
        }
      ),
      /* @__PURE__ */ jsx(
        LatestBusinesses,
        {
          category: "services",
          limit: 5,
          title: "Services",
          subtitle: "Services based businesses added in the last 7 days"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(VerticalHeight, {}),
    /* @__PURE__ */ jsx(CallToActionSection, {}),
    /* @__PURE__ */ jsx(FooterSection, {})
  ] });
};
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$p,
  loader: loader$T
}, Symbol.toStringTag, { value: "Module" }));
const Address = ({ listing }) => {
  return /* @__PURE__ */ jsxs("div", { children: [
    listing == null ? void 0 : listing.address_one,
    (listing == null ? void 0 : listing.address_two) ? `, ${listing == null ? void 0 : listing.address_two}` : "",
    (listing == null ? void 0 : listing.city_name) ? `, ${listing == null ? void 0 : listing.city_name}` : "",
    (listing == null ? void 0 : listing.state_name) ? `, ${listing == null ? void 0 : listing.state_name}` : "",
    (listing == null ? void 0 : listing.country_name) ? `, ${listing == null ? void 0 : listing.country_name}` : ""
  ] });
};
const RatingCount$1 = ({ averageRating }) => {
  const [avgRating, setAvgRating] = useState(0);
  useEffect(() => {
    if (averageRating !== null && averageRating !== void 0) {
      setAvgRating(averageRating);
    }
  }, [averageRating]);
  return /* @__PURE__ */ jsxs("div", { className: `text-blue-700`, children: [
    "(",
    formatNumber(Number(avgRating)),
    ")"
  ] });
};
function RatingBoxRounded({ rating }) {
  return /* @__PURE__ */ jsx("div", { className: "flex gap-x-[2px]", children: Array.from({ length: 5 }).map((_, i) => {
    const fillPercent = Math.max(0, Math.min(1, rating - i)) * 100;
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: `relative w-[17px] h-[17px] bg-white rounded-full 
                            overflow-hidden flex place-items-center border-[1px]
                            place-content-center border-gray-500`,
        children: /* @__PURE__ */ jsx(
          "div",
          {
            className: `absolute inset-0 bg-green-600 z-[0]`,
            style: { width: `${fillPercent}%` }
          }
        )
      },
      i
    );
  }) });
}
const Tooltip = ({ tooltip, children }) => {
  return /* @__PURE__ */ jsx("div", { className: `block`, children: /* @__PURE__ */ jsxs("a", { href: "#", className: `tooltip z-[20000] relative  `, "data-tooltip": tooltip, children: [
    children,
    /* @__PURE__ */ jsx("style", { children: `
                    .tooltip{
                        position:relative;
                        display: inline-block;
                        cursor: pointer;
                        text-decoration: underline;
                    }

                    .tooltip::after{
                        content:attr(data-tooltip);
                        position: absolute;
                        bottom: 125%;
                        left: 50%;
                        transform: translateX(-20px);
                        background-color: blue;
                        color: #fff;
                        padding: 6px 8px;
                        border-radius: 4px;
                        white-space: normal;
                        max-width: 250px; 
                        min-width: 200px; 
                        word-wrap: break-word;
                        opacity: 0;
                        pointer-events: none;
                        transition: opacity 0.2s ease-in-out;
                        font-size: 11px;
                        z-index: 999;
                        line-height:1.4em;
                    }

                    .tooltip:hover::after{
                        opacity: 1;
                    }
                    ` })
  ] }) });
};
const Card = ({ listing }) => {
  var _a;
  const [placeholder, setPlaceholder] = useState("/images/placeholder22.png");
  const [imgscr, setImgsrc] = useState("");
  const [userId, setUserId] = useState("");
  const [socialMedia, setSocialMedia] = useState(null);
  const [listingWebsite, setListingWebsite] = useState("");
  const [baseListing, setBaseListing] = useState(null);
  const [facilityFeatures2, setFacilityFeatures] = useState(null);
  const [addressLink, setAddressLink] = useState("");
  useEffect(() => {
    if (listing) {
      const baseListing2 = listing;
      setBaseListing(baseListing2);
      if (baseListing2 == null ? void 0 : baseListing2.image_url) {
        setImgsrc(config.IMG_BASE_URL + (baseListing2 == null ? void 0 : baseListing2.image_url));
      } else {
        setImgsrc(placeholder);
      }
    }
  }, [listing]);
  useEffect(() => {
    if (listing == null ? void 0 : listing.website) {
      setListingWebsite(listing == null ? void 0 : listing.website);
    } else {
      if ((listing == null ? void 0 : listing.username) === "" || (listing == null ? void 0 : listing.username) === null) {
        setListingWebsite("/" + (listing == null ? void 0 : listing.gid));
      } else {
        setListingWebsite("/" + (listing == null ? void 0 : listing.username));
      }
    }
  }, [listing]);
  useEffect(() => {
    if (listing) {
      if ((listing == null ? void 0 : listing.image_url) !== "" && (listing == null ? void 0 : listing.image_url) !== null && (listing == null ? void 0 : listing.image_url) !== void 0) {
        setImgsrc(config.IMG_BASE_URL + (listing == null ? void 0 : listing.image_url));
      } else {
        setImgsrc(placeholder);
      }
      if ((listing == null ? void 0 : listing.username) !== "" && (listing == null ? void 0 : listing.username) !== null && (listing == null ? void 0 : listing.username) !== void 0) {
        setUserId(listing == null ? void 0 : listing.username);
      } else {
        setUserId(listing == null ? void 0 : listing.gid);
      }
    }
  }, [listing]);
  useEffect(() => {
    if (listing == null ? void 0 : listing.social_media) {
      let socialMedia2 = [];
      const separatedMedia = strToList(listing == null ? void 0 : listing.social_media, ",");
      if (separatedMedia !== null) {
        separatedMedia == null ? void 0 : separatedMedia.map((mediaString, index2) => {
          const mediaInfo = strToList(mediaString, "$");
          const mediaObj = {
            mediaName: mediaInfo[0],
            mediaHandle: mediaInfo[1],
            baseUrl: mediaInfo[2]
          };
          socialMedia2.push(mediaObj);
        });
      }
      setSocialMedia(socialMedia2);
    }
  }, [listing]);
  useEffect(() => {
  }, [socialMedia]);
  useEffect(() => {
    if (baseListing == null ? void 0 : baseListing.facility_features) {
      let facilityFeatures22 = [];
      const separatedFeatures = strToList(baseListing == null ? void 0 : baseListing.facility_features, "&");
      if (separatedFeatures !== null) {
        separatedFeatures == null ? void 0 : separatedFeatures.map((featureString, index2) => {
          const featureInfo = strToList(featureString, "$");
          const featureObject = {
            featureId: featureInfo[0],
            userDescription: featureInfo[1]
          };
          facilityFeatures22.push(featureObject);
        });
      }
      const mappedFacilityFeatures = searchFacilities(facilityFeatures22);
      setFacilityFeatures(mappedFacilityFeatures);
    }
  }, [baseListing]);
  useEffect(() => {
    let getListingAddress = async (listing2) => {
      let address = listing2 == null ? void 0 : listing2.title;
      address += (listing2 == null ? void 0 : listing2.address_one) ? ", " + (listing2 == null ? void 0 : listing2.address_one) : "";
      address += (listing2 == null ? void 0 : listing2.address_two) ? ", " + (listing2 == null ? void 0 : listing2.address_two) : "";
      address += (listing2 == null ? void 0 : listing2.city_name) ? ", " + (listing2 == null ? void 0 : listing2.city_name) : "";
      address += (listing2 == null ? void 0 : listing2.state_name) ? ", " + (listing2 == null ? void 0 : listing2.state_name) : "";
      address += (listing2 == null ? void 0 : listing2.zipcode) ? ", " + (listing2 == null ? void 0 : listing2.zipcode) : "";
      address += (listing2 == null ? void 0 : listing2.country_name) ? ", " + (listing2 == null ? void 0 : listing2.country_name) : "";
      let addLink = `https://www.google.com/maps/search/?api=1&query=${address}`;
      setAddressLink(addLink);
    };
    if (listing !== null) {
      getListingAddress(listing);
    }
  }, [listing]);
  return /* @__PURE__ */ jsxs("div", { className: `bg-white w-full h-auto  overflow-hidden border   hover:shadow-md hover:shadow-gray-200 md:rounded-xl`, children: [
    /* @__PURE__ */ jsx("div", { className: `bg-gray-50/30 py-3 px-4 border-b-0`, children: /* @__PURE__ */ jsxs("a", { href: `/${userId}`, children: [
      /* @__PURE__ */ jsxs("div", { className: `flex place-content-between gap-2`, children: [
        /* @__PURE__ */ jsxs("div", { className: `flex place-items-start gap-2 w-full`, children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `w-[90px] h-[90px] min-w-[90px]   bg-black bg-cover bg-center overflow-hidden relative border border-gray-300`,
              children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: imgscr,
                  alt: "",
                  className: `object-cover w-full h-full text-sm
                             z-0 bg-white`
                }
              )
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: ` w-full`, children: [
            /* @__PURE__ */ jsx("div", { className: `text-[18px] font-normal text-blue-800 line-clamp-1 w-full`, children: listing == null ? void 0 : listing.title }),
            (listing == null ? void 0 : listing.category) && /* @__PURE__ */ jsx("div", { className: `text-[12px] text-gray-500  capitalize mt-[0px]`, children: (_a = searchCategories(listing == null ? void 0 : listing.category)) == null ? void 0 : _a.name }),
            /* @__PURE__ */ jsxs("div", { className: `flex place-items-center gap-x-1 mt-[5px] `, children: [
              /* @__PURE__ */ jsx("div", { children: (baseListing == null ? void 0 : baseListing.average_rating) !== null && (baseListing == null ? void 0 : baseListing.average_rating) !== "" && (baseListing == null ? void 0 : baseListing.average_rating) !== void 0 ? /* @__PURE__ */ jsxs("div", { className: ` flex gap-2 place-items-center`, children: [
                /* @__PURE__ */ jsx(RatingBoxRounded, { rating: Number(baseListing == null ? void 0 : baseListing.average_rating) }),
                /* @__PURE__ */ jsx(RatingCount$1, { averageRating: baseListing == null ? void 0 : baseListing.average_rating })
              ] }) : /* @__PURE__ */ jsxs("div", { className: ` flex gap-2 place-items-center`, children: [
                /* @__PURE__ */ jsx(RatingBoxRounded, { rating: Number(1) }),
                /* @__PURE__ */ jsx(RatingCount$1, { averageRating: 0 })
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: ` `, children: Number(baseListing == null ? void 0 : baseListing.total_reviews) > 0 ? baseListing == null ? void 0 : baseListing.total_reviews : 0 })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: `flex place-items-start`, children: /* @__PURE__ */ jsx("div", { className: `font-bold rounded-sm border px-3 py-[2px]`, children: "View" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: `mt-[8px] text-[14px] md:text-[13px] text-gray-800 leading-[1.3em] line-clamp-3`, children: listing == null ? void 0 : listing.short_description })
    ] }) }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: ` h-auto flex place-content-between gap-2 `, children: [
      /* @__PURE__ */ jsxs("div", { className: `flex place-items-start w-[60%] flex-col  pl-4  pt-2 pb-4 `, children: [
        /* @__PURE__ */ jsxs("div", { className: `flex place-items-center gap-x-1`, children: [
          /* @__PURE__ */ jsx(BsBank, {}),
          /* @__PURE__ */ jsxs("span", { className: `mt-[1px] text-gray-500 space-x-2`, children: [
            /* @__PURE__ */ jsx("span", { className: `font-bold`, children: "Founded:" }),
            /* @__PURE__ */ jsx("span", { children: listing == null ? void 0 : listing.established })
          ] })
        ] }),
        facilityFeatures2 !== null && /* @__PURE__ */ jsxs("div", { className: `mt-2 flex place-items-start gap-2 w-full relative`, children: [
          /* @__PURE__ */ jsx("span", { className: `text-[13px]`, children: "Facilities: " }),
          /* @__PURE__ */ jsx("div", { className: `flex place-items-baseline gap-3 flex-wrap leading-[0.9em] `, children: facilityFeatures2 == null ? void 0 : facilityFeatures2.map((feature, index2) => {
            return /* @__PURE__ */ jsx(
              Tooltip,
              {
                tooltip: `${feature == null ? void 0 : feature.name}: ${(feature == null ? void 0 : feature.userDescription) || ""}`,
                children: /* @__PURE__ */ jsx("div", { className: `text-[15px]`, children: feature == null ? void 0 : feature.icon })
              },
              index2
            );
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `flex place-items-end flex-col w-[40%] text-end pr-4 pt-2 pb-4`, children: [
        /* @__PURE__ */ jsx("div", { className: `font-[600]`, children: listing == null ? void 0 : listing.phone }),
        /* @__PURE__ */ jsx("div", { className: `text-[12px] leading-[1.2em] mt-1`, children: /* @__PURE__ */ jsx(Address, { listing }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: `border-none`, children: /* @__PURE__ */ jsxs("div", { className: `flex place-content-between mx-4 my-1`, children: [
      /* @__PURE__ */ jsxs("div", { className: `flex place-items-center gap-4`, children: [
        /* @__PURE__ */ jsx("a", { href: `mailto:${listing == null ? void 0 : listing.email_address}`, children: /* @__PURE__ */ jsx(MdEmail, { size: 20 }) }, 34),
        (listing == null ? void 0 : listing.phone) && /* @__PURE__ */ jsx("a", { href: `tel:${listing == null ? void 0 : listing.phone}`, children: /* @__PURE__ */ jsx(BiPhone, { size: 20 }) }, 30),
        socialMedia !== null && (socialMedia == null ? void 0 : socialMedia.map((media, index2) => {
          return /* @__PURE__ */ jsx("a", { href: `${media == null ? void 0 : media.baseUrl}${media == null ? void 0 : media.mediaHandle}`, children: getCardIcon(media == null ? void 0 : media.mediaName) }, index2);
        }))
      ] }),
      /* @__PURE__ */ jsx("div", { className: `px-1.5 py-0.5 bg-red-500 rounded hover:shadow-lg text-white`, children: /* @__PURE__ */ jsx("a", { href: `${listingWebsite}`, children: "Website" }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: `px-4 mb-4 mt-8`, children: /* @__PURE__ */ jsxs("div", { className: ` grid grid-cols-2 gap-2 w-full md:w-[50%]`, children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          target: "_blank",
          href: `${addressLink}`,
          className: `border border-blue-400 py-[5px] rounded px-2 font-semibold w-full text-center`,
          children: "Go to map"
        }
      ),
      /* @__PURE__ */ jsx("div", { children: (baseListing == null ? void 0 : baseListing.phone) && /* @__PURE__ */ jsx("a", { href: `tel:${baseListing == null ? void 0 : baseListing.phone}`, children: /* @__PURE__ */ jsxs("button", { className: `bg-gray-500 rounded w-full text-white flex place-items-center place-content-center text-[15px] gap-2 py-[5px]`, children: [
        /* @__PURE__ */ jsx(BiPhone, { size: 20, className: `mt-[2px]` }),
        /* @__PURE__ */ jsx("span", { children: "Call" })
      ] }) }) })
    ] }) })
  ] });
};
const FooterCard = () => {
  return /* @__PURE__ */ jsx("div", { className: `bg-white w-full h-auto md:rounded-t-md shadow-md overflow-hidden border`, children: /* @__PURE__ */ jsxs("div", { className: `bg-gray-50/30 py-3 px-4 border-b`, children: [
    /* @__PURE__ */ jsxs("div", { className: `flex place-content-between`, children: [
      /* @__PURE__ */ jsx("div", { className: `flex place-items-center gap-2`, children: /* @__PURE__ */ jsxs("div", { className: `-space-y-1`, children: [
        /* @__PURE__ */ jsx("div", { className: `text-black text-lg font-semibold`, children: "Garsset.com" }),
        /* @__PURE__ */ jsx("div", { className: `text-[12px] text-gray-500 italic capitalize`, children: "Business Directory Service" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: `flex place-items-center` })
    ] }),
    /* @__PURE__ */ jsx("div", { className: `mt-[8px] text-[12px] text-gray-500 leading-[1.3em]`, children: "The only real-time generative AI app for video chatting, live streaming, and video creation on the market." })
  ] }) });
};
const Feature = ({ feature }) => {
  return /* @__PURE__ */ jsxs("div", { id: feature.gid, className: `pb-4 pt-3`, children: [
    /* @__PURE__ */ jsx(Link, { to: `/${(feature == null ? void 0 : feature.username) ? feature == null ? void 0 : feature.username : feature == null ? void 0 : feature.gid}`, children: /* @__PURE__ */ jsx("div", { className: `text-[15px] tracking-normal 
                text-blue-700 font-normal`, children: feature.title }) }),
    /* @__PURE__ */ jsx("div", { className: `text-md font-semibold 
                tracking-tight mt-[2px]`, children: feature.phone }),
    /* @__PURE__ */ jsx("div", { className: `font-normal  
                tracking-normal mt-[2px] leading-[1.3em]
                text-black`, children: feature.short_description.substring(0, 80) }),
    /* @__PURE__ */ jsx("div", { className: `text-[12px] font-normal 
                tracking-tight mt-[5px] leading-[1.4em]
                text-brown-700`, children: /* @__PURE__ */ jsx(Address, { listing: feature }) }),
    /* @__PURE__ */ jsx("div", { className: ` font-semibold  
                tracking-tight mt-[8px] text-blue-800`, children: /* @__PURE__ */ jsx(Link, { to: feature.website ? feature.website : `#${feature.gid}`, children: "Website" }) })
  ] });
};
const Featured = () => {
  const [featured, setFeatured] = useState([]);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const getFeatured = async () => {
      const data = await getFeaturedListing();
      setFeatured(data);
    };
    try {
      getFeatured();
    } catch (e) {
      logError(e.message);
    }
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: `border-[1px] px-4 pt-4 pb-4
        rounded-xl border-gray-200`, children: [
    /* @__PURE__ */ jsx("div", { className: `font-bold text-lg`, children: "Featured" }),
    /* @__PURE__ */ jsx("div", { className: `divide-y divide-gray-200`, children: (featured == null ? void 0 : featured.length) > 0 ? featured == null ? void 0 : featured.map((feature, index2) => {
      if (index2 > 2) {
        return null;
      }
      return /* @__PURE__ */ jsx(Feature, { feature }, index2);
    }) : /* @__PURE__ */ jsx("div", { className: `text-[15px] mt-4`, children: "Loading..." }) })
  ] });
};
const Countries = ({ countries }) => {
  var _a;
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCountries = (_a = countries == null ? void 0 : countries.filter(
    (country) => country.name.toLowerCase().includes(searchTerm.toLowerCase())
  )) == null ? void 0 : _a.sort((a, b) => a.name.localeCompare(b.name));
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsx("div", { className: "px-3", children: /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        placeholder: "Search country...",
        value: searchTerm,
        onChange: (e) => setSearchTerm(e.target.value),
        className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "h-[150px] overflow-y-auto scrollbar-hidden", children: [
      filteredCountries == null ? void 0 : filteredCountries.map((nav, index2) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("a", { href: `/web/browse?q=&country=${nav == null ? void 0 : nav.id}`, children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex place-content-start place-items-center gap-2 w-full hover:bg-blue-100 pl-5 py-1.5 hover:cursor-pointer",
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-[30px] h-[30px] flex place-content-center place-items-center bg-blue-100 rounded-full", children: nav == null ? void 0 : nav.id }),
            /* @__PURE__ */ jsx("div", { className: "text-lg", children: nav == null ? void 0 : nav.name })
          ]
        }
      ) }) }, index2)),
      (filteredCountries == null ? void 0 : filteredCountries.length) === 0 && /* @__PURE__ */ jsx("div", { className: "px-5 text-gray-500", children: "No results found" })
    ] })
  ] });
};
const Categories = () => {
  var _a;
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCategories = (_a = categories$2 == null ? void 0 : categories$2.filter(
    (cat) => cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  )) == null ? void 0 : _a.sort((a, b) => a.name.localeCompare(b.name));
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsx("div", { className: "px-3", children: /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        placeholder: "Search category...",
        value: searchTerm,
        onChange: (e) => setSearchTerm(e.target.value),
        className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "max-h-[150px] overflow-y-auto scrollbar-hidden", children: [
      filteredCategories == null ? void 0 : filteredCategories.map((nav, index2) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("a", { href: `/web/browse?q=${nav == null ? void 0 : nav.id}`, children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex place-content-start place-items-center gap-2 w-full hover:bg-blue-100 pl-5 py-1.5 hover:cursor-pointer",
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-[30px] h-[30px] flex place-content-center place-items-center bg-blue-100 rounded-full", children: nav == null ? void 0 : nav.icon }),
            /* @__PURE__ */ jsx("div", { className: "text-lg", children: nav == null ? void 0 : nav.name })
          ]
        }
      ) }) }, index2)),
      (filteredCategories == null ? void 0 : filteredCategories.length) === 0 && /* @__PURE__ */ jsx("div", { className: "px-5 text-gray-500", children: "No results found" })
    ] })
  ] });
};
function Pagination({ pagination }) {
  var _a;
  const [searchParams] = useSearchParams();
  const currentPage = pagination.currentPage;
  const totalPages = pagination.totalPages;
  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages = [];
    pages.push(1);
    switch (currentPage) {
      case 1:
        pages.push(2, 3, "...", totalPages);
        break;
      case 2:
        pages.push(2, 3, 4, "...", totalPages);
        break;
      case 3:
        pages.push(2, 3, 4, 5, "...", totalPages);
        break;
      case totalPages - 2:
        pages.push("...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        break;
      case totalPages - 1:
        pages.push("...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        break;
      case totalPages:
        pages.push("...", totalPages - 2, totalPages - 1, totalPages);
        break;
      default:
        pages.push("...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
        break;
    }
    return pages;
  };
  const createPageUrl = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `?${params.toString()}`;
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-600", children: [
      "Showing ",
      (currentPage - 1) * pagination.itemsPerPage + 1,
      " to",
      " ",
      Math.min(currentPage * pagination.itemsPerPage, pagination.totalItems),
      " of",
      " ",
      pagination.totalItems,
      " items"
    ] }),
    /* @__PURE__ */ jsxs("nav", { className: "flex items-center space-x-1", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: pagination.hasPrev ? createPageUrl(currentPage - 1) : "#",
          className: `px-3 py-2 border rounded-md text-sm font-medium ${!pagination.hasPrev ? "opacity-50 cursor-not-allowed text-gray-400" : "text-gray-700 hover:bg-gray-100"}`,
          "aria-disabled": !pagination.hasPrev,
          onClick: (e) => !pagination.hasPrev && e.preventDefault(),
          children: "Prev"
        }
      ),
      (_a = getPageNumbers()) == null ? void 0 : _a.map(
        (page, index2) => typeof page === "number" ? /* @__PURE__ */ jsx(
          "a",
          {
            href: createPageUrl(page),
            className: `px-3 py-2 border rounded-md text-sm font-medium ${page === currentPage ? "bg-blue-500 text-white border-blue-500" : "text-gray-700 hover:bg-gray-100"}`,
            children: page
          },
          page
        ) : /* @__PURE__ */ jsx(
          "span",
          {
            className: "px-3 py-2 text-gray-500",
            children: page
          },
          `ellipsis-${index2}`
        )
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: pagination.hasNext ? createPageUrl(currentPage + 1) : "#",
          className: `px-3 py-2 border rounded-md text-sm font-medium ${!pagination.hasNext ? "opacity-50 cursor-not-allowed text-gray-400" : "text-gray-700 hover:bg-gray-100"}`,
          "aria-disabled": !pagination.hasNext,
          onClick: (e) => !pagination.hasNext && e.preventDefault(),
          children: "Next"
        }
      )
    ] })
  ] });
}
const QueryBuilder = ({
  loading = false,
  initialFilters = {
    q: "",
    category: "",
    country: "",
    state: "",
    city: ""
  }
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [filters, setFilters] = useState(initialFilters);
  const [categories2, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setFilters({
      q: searchParams.get("q") || "",
      category: searchParams.get("category") || "",
      country: searchParams.get("country") || "",
      state: searchParams.get("state") || "",
      city: searchParams.get("city") || ""
    });
  }, [location.search]);
  useEffect(() => {
    fetchCategories();
    fetchCountries();
  }, []);
  useEffect(() => {
    if (filters.country) {
      fetchStates(filters.country);
    } else {
      setStates([]);
    }
  }, [filters.country]);
  useEffect(() => {
    if (filters.country && filters.state) {
      fetchCities(filters.country, filters.state);
    } else {
      setCities([]);
    }
  }, [filters.country, filters.state]);
  const fetchCategories = async () => {
    const sortedCategories = categories$2.sort(
      (a, b) => a.name.localeCompare(b.name)
    );
    setCategories(sortedCategories);
  };
  const fetchCountries = async () => {
    try {
      const countries2 = await getCountries();
      setCountries(countries2 || []);
    } catch (error) {
      console.error("Failed to fetch countries:", error);
    }
  };
  const fetchStates = async (countryCode) => {
    try {
      const states2 = await getStatesAlt(countryCode);
      setStates(states2 || []);
    } catch (error) {
      console.error("Failed to fetch countries:", error);
    }
  };
  const fetchCities = async (countryCode, stateCode) => {
    try {
      const cities2 = await getCities(countryCode, stateCode);
      setCities(cities2 || []);
    } catch (error) {
      console.error("Failed to fetch countries:", error);
    }
  };
  const handleInputChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };
  const handleCountryChange = (countryCode) => {
    handleInputChange("country", countryCode);
    fetchStates(countryCode);
  };
  const handleStateChange = (stateCode) => {
    handleInputChange("state", stateCode);
    fetchCities(filters.country, stateCode);
  };
  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (filters.q) searchParams.set("q", filters.q);
    if (filters.category) searchParams.set("category", filters.category);
    if (filters.country) searchParams.set("country", filters.country);
    if (filters.state) searchParams.set("state", filters.state);
    if (filters.city) searchParams.set("city", filters.city);
    searchParams.set("page", "1");
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const clearFilters = () => {
    navigate(location.pathname);
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full space-y-3 p-4 bg-gray-50 rounded-lg border", children: [
    /* @__PURE__ */ jsxs("div", { className: "w-full grid grid-cols-1 md:grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx(
        "input",
        {
          id: "query",
          type: "text",
          value: filters.q,
          onChange: (e) => handleInputChange("q", e.target.value),
          onKeyPress: handleKeyPress,
          placeholder: "Hotel, Restaurant or ABC Inc.",
          className: "w-full px-3 border border-gray-300 rounded outline-none h-[35px] focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
          disabled: loading
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsxs(
        "select",
        {
          id: "category",
          value: filters.category,
          onChange: (e) => handleInputChange("category", e.target.value),
          className: "w-full h-[35px] border border-gray-300 rounded px-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
          disabled: loading,
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "All Categories" }),
            categories2.map((category, index2) => /* @__PURE__ */ jsx("option", { value: category == null ? void 0 : category.id, children: category == null ? void 0 : category.name }, category == null ? void 0 : category.id))
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-full grid grid-cols-1 md:grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsxs(
        "select",
        {
          id: "country",
          value: filters.country,
          onChange: (e) => handleCountryChange(e.target.value),
          className: "w-full h-[35px] border border-gray-300 rounded px-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
          disabled: loading,
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "All Countries" }),
            countries.map((country) => /* @__PURE__ */ jsx("option", { value: country.id, children: country.name }, country.id))
          ]
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsxs(
        "select",
        {
          id: "state",
          value: filters.state,
          onChange: (e) => handleStateChange(e.target.value),
          className: "w-full h-[35px] border border-gray-300 rounded px-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
          disabled: loading || !filters.country,
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "All States" }),
            states.map((state) => /* @__PURE__ */ jsx("option", { value: state.id, children: state.name }, state.id))
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-full grid grid-cols-1 md:grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsxs(
        "select",
        {
          id: "city",
          value: filters.city,
          onChange: (e) => handleInputChange("city", e.target.value),
          className: "w-full h-[35px] border border-gray-300 rounded px-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
          disabled: loading || !filters.state,
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "All Cities" }),
            cities == null ? void 0 : cities.map((city) => /* @__PURE__ */ jsx("option", { value: city.name, children: city.name }, city.id))
          ]
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "w-full flex gap-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleSearch,
            disabled: loading,
            className: "flex-1 bg-blue-600 text-white h-[35px] px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
            children: loading ? "Searching..." : "Search"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: clearFilters,
            disabled: loading,
            className: "px-4 h-[35px] border border-gray-300 rounded text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
            children: "Clear"
          }
        )
      ] })
    ] }),
    loading && /* @__PURE__ */ jsx("div", { className: "text-center text-blue-600 text-sm", children: "Loading results..." })
  ] });
};
const loader$S = async ({ request, params }) => {
  const url = new URL(request.url);
  const query2 = (url == null ? void 0 : url.searchParams.get("q")) || "";
  const state = (url == null ? void 0 : url.searchParams.get("state")) || "";
  const city = (url == null ? void 0 : url.searchParams.get("city")) || "";
  const country = (url == null ? void 0 : url.searchParams.get("country")) || "";
  const category = (url == null ? void 0 : url.searchParams.get("category")) || "";
  let page = 1;
  let data = "";
  let countries = null;
  try {
    page = parseInt((url == null ? void 0 : url.searchParams.get("page")) || "1");
    data = await getSearch(query2, city, state, country, category, page);
    countries = await getCountries();
  } catch (error) {
    logError(error);
  }
  let res = {
    data,
    query: query2,
    countries
  };
  return res;
};
const Index$3 = () => {
  const res = useLoaderData();
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigation();
  const data = res.data.items || [];
  const pagination = res.data.pagination;
  const query2 = res.query;
  const countries = res.countries;
  const [queryParam, setQueryParam] = useState(null);
  parseInt(searchParams.get("page") || "1");
  const isLoading = navigation.state === "loading";
  useEffect(() => {
    if (query2) {
      setQueryParam(query2);
    }
  }, [query2]);
  const initialFilters = {
    q: searchParams.get("q") || "",
    category: searchParams.get("category") || "",
    country: searchParams.get("country") || "",
    state: searchParams.get("state") || "",
    city: searchParams.get("city") || ""
  };
  return /* @__PURE__ */ jsxs("div", { className: " bg-gray-50", children: [
    /* @__PURE__ */ jsx(MainNav, {}),
    /* @__PURE__ */ jsx("div", { className: `h-screen flex flex-col relative `, children: /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-12 h-full overflow-hidden  gap-5 `, children: [
      /* @__PURE__ */ jsxs("aside", { className: `col-span-3 h-full overflow-y-auto scrollbar-hidden pt-2 hidden xl:block`, children: [
        /* @__PURE__ */ jsxs("div", { className: ``, children: [
          /* @__PURE__ */ jsx("div", { className: `mt-3 text-[17px] mb-4 font-bold ml-6`, children: "Search Filter" }),
          /* @__PURE__ */ jsx(
            QueryBuilder,
            {
              loading: isLoading,
              initialFilters
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: ``, children: [
          /* @__PURE__ */ jsx("div", { className: `mt-3 text-[17px] mb-4 font-bold ml-6`, children: "Categories" }),
          /* @__PURE__ */ jsx(Categories, {})
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `mt-5`, children: [
          /* @__PURE__ */ jsx("div", { className: `mt-3 text-[17px] mb-4 font-bold ml-6`, children: "Countries" }),
          countries && /* @__PURE__ */ jsx(Countries, { countries })
        ] }),
        /* @__PURE__ */ jsx("div", { className: ` py-4 px-4 border-t`, children: "Garssete - Business Directory Listing" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: `col-span-12 xl:col-span-9  overflow-y-auto w-full md:px-[15px]`, children: /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-12 gap-5`, children: [
        /* @__PURE__ */ jsx("div", { className: `col-span-12 md:col-span-8  pt-3`, children: /* @__PURE__ */ jsxs("div", { className: `space-y-8`, children: [
          /* @__PURE__ */ jsx(
            Pagination,
            {
              pagination
            }
          ),
          data == null ? void 0 : data.map((data2, index2) => {
            return /* @__PURE__ */ jsx(
              Card,
              {
                listing: data2
              },
              index2
            );
          }),
          /* @__PURE__ */ jsx(
            Pagination,
            {
              pagination
            }
          ),
          /* @__PURE__ */ jsx(FooterCard, {})
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: `hidden md:block md:col-span-4 pt-3    `, children: /* @__PURE__ */ jsx("div", { className: `w-full xl:w-[90%] sticky top-3 ml-auto`, children: /* @__PURE__ */ jsx(Featured, {}) }) })
      ] }) })
    ] }) })
  ] });
};
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$3,
  loader: loader$S
}, Symbol.toStringTag, { value: "Module" }));
const Browse = () => {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(SrchNavbar, {}),
    /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-12 gap-4 h-screen`, children: [
      /* @__PURE__ */ jsx("div", { className: `col-span-3 block h-full`, children: /* @__PURE__ */ jsx("div", { className: `sticky top-[80px] bg-red-50 h-screen overflow-y-auto`, children: "Left" }) }),
      /* @__PURE__ */ jsx("div", { className: `col-span-6 bg-blue-200`, children: /* @__PURE__ */ jsx("div", { className: `h-[1000px]`, children: "Center" }) }),
      /* @__PURE__ */ jsx("div", { className: `col-span-3 block`, children: /* @__PURE__ */ jsx("div", { className: `w-full sticky top-[80px]`, children: "Right" }) })
    ] })
  ] });
};
const route14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Browse
}, Symbol.toStringTag, { value: "Module" }));
const password_regex$2 = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
const SigninSchema = z.object({
  username: z.string({ message: "Please enter an email" }).min(7, { message: "Email must be greater than 7 characters" }).email({ message: "Please enter a valid email" }),
  password: z.string({ message: "Please enter a password" }).min(8, "Password must be at least 8 characters").regex(password_regex$2, "Please enter a valid password")
});
function SigninFormAlt() {
  const [isVisible, setIsVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  const auth = useAuth();
  if (!auth) {
    return null;
  }
  const { signin } = auth;
  const { showOperation, showSuccess, showError, showWarning, showInfo, completeOperation } = useOperation();
  const [formdata, setFormdata] = useState({});
  const [working, setWorking] = useState(false);
  useNotification();
  const navigator2 = useNavigate();
  const changeHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormdata((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  };
  const handleSigninForm = async (data) => {
    try {
      setWorking(true);
      showOperation("processing");
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      const email = data.username;
      const password = data.password;
      const datr = {
        email,
        password
      };
      const res = await signin(datr);
      if (res === true) {
        showSuccess("login", "Signin is successful.");
        await new Promise((resolve) => setTimeout(resolve, 1e3));
        completeOperation();
        navigator2("/");
      } else {
        showError("error", `${res.message}`);
        completeOperation();
      }
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      setWorking(false);
    } catch (error) {
      console.log(error);
    }
  };
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {},
    resolver: zodResolver(SigninSchema)
  });
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen w-screen min-w-screen bg-black/50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsx("div", { className: `bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-sm transition-all duration-700 ease-in-out transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`, children: /* @__PURE__ */ jsxs("div", { className: "pb-8", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-6 mt-0 py-2 bg-gray-50 border-b", children: /* @__PURE__ */ jsxs("div", { className: `text-2xl font-[600] tracking-tighter font-poppins text-gray-700`, children: [
      "Sign in",
      /* @__PURE__ */ jsx("i", { children: "!" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "px-8", children: [
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit(handleSigninForm), className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700 mb-1", children: "Email Address" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              ...register("username", {
                onChange: changeHandler
              }),
              type: "email",
              className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300",
              placeholder: "your.email@example.com"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: `w-[85%] mt-2 text-red-600 text-[11px] leading-[1.3em]`, children: (errors == null ? void 0 : errors.username) && /* @__PURE__ */ jsx("div", { children: errors.username.message }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700 mb-1", children: "Password" }),
          /* @__PURE__ */ jsxs("div", { className: "", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  ...register("password", {
                    onChange: changeHandler
                  }),
                  type: showPassword ? "text" : "password",
                  className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300 pr-10",
                  placeholder: "Enter your password"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: "absolute inset-y-0 right-0 pr-3 flex items-center",
                  onClick: () => setShowPassword(!showPassword),
                  children: showPassword ? /* @__PURE__ */ jsxs("svg", { className: "h-5 w-5 text-gray-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [
                    /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
                    /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })
                  ] }) : /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-gray-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" }) })
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: `w-[85%] mt-2 text-red-600 text-[11px] leading-[1.3em]`, children: (errors == null ? void 0 : errors.password) && /* @__PURE__ */ jsx("div", { children: errors.password.message }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "remember-me",
                type: "checkbox",
                checked: rememberMe,
                onChange: (e) => setRememberMe(e.target.checked),
                className: "h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              }
            ),
            /* @__PURE__ */ jsx("label", { htmlFor: "remember-me", className: "ml-2 block text-sm text-gray-700", children: "Remember me" })
          ] }),
          /* @__PURE__ */ jsx(Link, { to: "/web/reset_password", className: "text-sm text-indigo-600 hover:text-indigo-500 transition-colors duration-300", children: "Forgot password?" })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
            children: "Sign In"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
        "Don't have an account?",
        " ",
        /* @__PURE__ */ jsx(Link, { to: "/web/signup", className: "font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300", children: "Sign up" })
      ] }) })
    ] })
  ] }) }) });
}
const AuthHeader = () => {
  return /* @__PURE__ */ jsx("div", { className: `absolute top-0 left-0 right-0 text-white bg-black/10 w-full p-4 flex place-content-center`, children: /* @__PURE__ */ jsx("div", { className: ``, children: /* @__PURE__ */ jsx("a", { href: "/", className: `underline text-white hover:text-white/50`, children: "Home" }) }) });
};
const SigninBody = () => {
  return /* @__PURE__ */ jsxs("div", { className: `bg-white w-full 
        bg-[url('/images/oiltanker.jpg')]
        bg-cover bg-center min-h-screen flex place-content-center`, children: [
    /* @__PURE__ */ jsx(AuthHeader, {}),
    /* @__PURE__ */ jsx(SigninFormAlt, {})
  ] });
};
const index$o = () => {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(OperationProvider, { children: /* @__PURE__ */ jsx(SigninBody, {}) }) });
};
const route15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$o
}, Symbol.toStringTag, { value: "Module" }));
const password_regex$1 = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
const SignupSchema = z.object({
  email: z.string({ message: "Please enter an email" }).min(7, { message: "Email must be greater than 7 characters" }).email({ message: "Please enter a valid email" }),
  password: z.string({ message: "Please enter a password" }).min(8, "Password must be at least 8 characters").regex(password_regex$1, "Please enter a valid password"),
  first_name: z.string({ message: "Please enter your first name" }).min(1, { message: "First name must be at least 1 character" }).max(50, { message: "First name must be at most 50 characters" }),
  lastname: z.string({ message: "Please enter your last name" }).min(1, { message: "Last name must be at least 1 character" }).max(50, { message: "Last name must be at most 50 characters" })
});
function SignupFormAlt() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  const [formdata, setFormdata] = useState(null);
  const [working, setWorking] = useState(false);
  useNotification();
  useNavigate();
  const [signedup, setSignedup] = useState(false);
  const successMsg = `Signup is successful! Please check email provided to complete signup.`;
  const { showOperation, showError, completeOperation, showSuccess } = useOperation();
  const changeHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormdata((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  };
  const handleSignup = async (data) => {
    setWorking(true);
    showOperation("processing");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    const BASE_URL = "https://testindex.veycet.com";
    const endpoint = "/api/user";
    const url = BASE_URL + endpoint;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers$1,
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        var respObj = await response.json();
        throw new Error(`${respObj.message || respObj.error}`);
      } else {
        {
        }
        showSuccess("Success", successMsg);
        completeOperation();
        setIsCompleted(true);
        setSignedup(true);
      }
    } catch (e) {
      showError("Error", e.message);
      completeOperation();
      return void 0;
    } finally {
      setWorking(false);
    }
  };
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {},
    resolver: zodResolver(SignupSchema)
  });
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen w-screen min-w-screen bg-black/50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsx(
    "div",
    {
      className: `bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-sm transition-all duration-700 ease-in-out transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`,
      children: /* @__PURE__ */ jsxs("div", { className: "pb-8", children: [
        /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-6 mt-0 py-2 bg-gray-50 border-b", children: /* @__PURE__ */ jsxs("div", { className: `text-2xl font-[600] tracking-tighter font-poppins text-gray-700`, children: [
          "Sign up",
          /* @__PURE__ */ jsx("i", { children: "!" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "px-8", children: [
          !isCompleted ? /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit(handleSignup), className: "space-y-3", children: [
            /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "firstName", className: "block text-sm font-medium text-gray-700 mb-1", children: "First Name" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  ...register("first_name", {
                    onChange: changeHandler
                  }),
                  id: "firstName",
                  type: "text",
                  className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300",
                  placeholder: "John"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: `w-full mt-2 text-red-600 text-[11px] leading-[1.3em]`, children: (errors == null ? void 0 : errors.first_name) && /* @__PURE__ */ jsx("div", { children: errors.first_name.message }) })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "lastName", className: "block text-sm font-medium text-gray-700 mb-1", children: "Last Name" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  ...register("lastname"),
                  id: "lastName",
                  type: "text",
                  className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300",
                  placeholder: "Doe"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: `w-full mt-2 text-red-600 text-[11px] leading-[1.3em]`, children: (errors == null ? void 0 : errors.lastname) && /* @__PURE__ */ jsx("div", { children: errors.lastname.message }) })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700 mb-1", children: "Email Address" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  ...register("email"),
                  id: "email",
                  type: "email",
                  className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300",
                  placeholder: "your.email@example.com"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: `w-full mt-2 text-red-600 text-[11px] leading-[1.3em]`, children: (errors == null ? void 0 : errors.email) && /* @__PURE__ */ jsx("div", { children: errors.email.message }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700 mb-1", children: "Password" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    ...register("password"),
                    id: "password",
                    type: showPassword ? "text" : "password",
                    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300 pr-10",
                    placeholder: "Create a strong password"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    className: "absolute inset-y-0 right-0 pr-3 flex items-center",
                    onClick: () => setShowPassword(!showPassword),
                    children: showPassword ? /* @__PURE__ */ jsxs("svg", { className: "h-5 w-5 text-gray-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [
                      /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
                      /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })
                    ] }) : /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-gray-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" }) })
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: `w-full mt-2 text-red-600 text-[11px] leading-[1.3em]`, children: (errors == null ? void 0 : errors.password) && /* @__PURE__ */ jsx("div", { children: errors.password.message }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "terms-agreement",
                  type: "checkbox",
                  checked: termsAgreed,
                  onChange: (e) => setTermsAgreed(e.target.checked),
                  className: "h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                }
              ),
              /* @__PURE__ */ jsxs("label", { htmlFor: "terms-agreement", className: "ml-2 block text-sm text-gray-700", children: [
                "I agree to the",
                " ",
                /* @__PURE__ */ jsx(Link, { to: "/terms", className: "text-indigo-600 hover:text-indigo-500", children: "Terms of Service" }),
                " ",
                "and",
                " ",
                /* @__PURE__ */ jsx(Link, { to: "/privacy", className: "text-indigo-600 hover:text-indigo-500", children: "Privacy Policy" })
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: isSubmitting || working || !termsAgreed,
                className: "w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed",
                children: isSubmitting || working ? "Creating Account..." : "Create Account"
              }
            )
          ] }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-3", children: [
            /* @__PURE__ */ jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsx("svg", { className: "w-14 h-14 text-green-500 mx-auto", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-gray-800 mb-2", children: "Signup Successful" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-6", children: "Your signup is successful. Please check your email to complete signup." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-6 text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
            "Already have an account?",
            " ",
            /* @__PURE__ */ jsx(
              Link,
              {
                to: "/web/signin",
                className: "font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300",
                children: "Sign in"
              }
            )
          ] }) })
        ] })
      ] })
    }
  ) });
}
const SignupBody = () => {
  return /* @__PURE__ */ jsxs("div", { className: `bg-white w-full 
        bg-[url('/images/mobiletab.jpg')]
        bg-cover bg-center min-h-screen flex place-content-center`, children: [
    /* @__PURE__ */ jsx(AuthHeader, {}),
    /* @__PURE__ */ jsx(SignupFormAlt, {})
  ] });
};
const index$n = () => {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(SignupBody, {}) });
};
const route16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$n
}, Symbol.toStringTag, { value: "Module" }));
const ResetPwSchema = z.object({
  username: z.string({ message: "Please enter an email" }).min(1, { message: "Please enter an email" }).email({ message: "Please enter a valid email" })
});
z.object({
  username: z.string({ message: "Please enter your email or username" }).min(1, { message: "This field is required" }).email({ message: "Please enter a valid email address" })
});
function ResetPasswordForm$1() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  const [formdata, setFormdata] = useState(null);
  const auth = useAuth();
  if (!auth) {
    return null;
  }
  const [working, setWorking] = useState(false);
  useNotification();
  const navigator2 = useNavigate();
  const [recoverySent, setRecoverySent] = useState(false);
  const { showOperation, showError, completeOperation, showSuccess } = useOperation();
  const handleResetPw = async (data) => {
    setWorking(true);
    showOperation("processing");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    const email = data.username;
    const datr = {
      email
    };
    const res = await auth.resetpw(datr);
    if (JSON.stringify(res).includes("Error")) {
      setWorking(false);
      showError("Error", toSentenceCase(res));
      completeOperation();
    } else {
      showSuccess("Success", toSentenceCase(res));
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      completeOperation();
      setWorking(false);
      setRecoverySent(true);
    }
  };
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {},
    resolver: zodResolver(ResetPwSchema)
  });
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen w-screen min-w-screen bg-black/50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsx(
    "div",
    {
      className: `bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-sm transition-all duration-700 ease-in-out transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`,
      children: /* @__PURE__ */ jsxs("div", { className: "pb-8", children: [
        /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-6 mt-0 py-3 bg-gray-50 border-b", children: /* @__PURE__ */ jsx("div", { className: `text-2xl font-[600] tracking-tighter font-poppins text-gray-700`, children: "Reset Password" }) }),
        /* @__PURE__ */ jsxs("div", { className: "px-8", children: [
          !isSubmitted ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-center mb-6", children: "Enter your email address and we'll send you instructions to reset your password." }),
            /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit(handleResetPw), className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "username", className: "block text-sm font-medium text-gray-700 mb-1", children: "Email Address" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    ...register("username"),
                    id: "username",
                    type: "email",
                    className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300",
                    placeholder: "your.email@example.com",
                    autoComplete: "email"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: `w-full mt-2 text-red-600 text-[11px] leading-[1.3em]`, children: (errors == null ? void 0 : errors.username) && /* @__PURE__ */ jsx("div", { children: errors.username.message }) })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: isSubmitting || working,
                  className: "w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed",
                  children: isSubmitting || working ? "Sending Instructions..." : "Send Reset Instructions"
                }
              )
            ] })
          ] }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-4", children: [
            /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx("svg", { className: "w-16 h-16 text-green-500 mx-auto", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-gray-800 mb-2", children: "Check Your Email" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-6", children: "We've sent password reset instructions to your email address. Please check your inbox and follow the instructions to reset your password." }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => navigator2("/web/signin"),
                className: "w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                children: "Return to Sign In"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-6 text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
            "Remember your password?",
            " ",
            /* @__PURE__ */ jsx(
              Link,
              {
                to: "/web/signin",
                className: "font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300",
                children: "Sign in"
              }
            )
          ] }) })
        ] })
      ] })
    }
  ) });
}
const ResetPasswordBody$2 = () => {
  return /* @__PURE__ */ jsxs("div", { className: `bg-white w-full 
        md:bg-[url('/images/drone.jpg')]
        bg-cover bg-center min-h-screen flex place-content-center `, children: [
    /* @__PURE__ */ jsx(AuthHeader, {}),
    /* @__PURE__ */ jsx(ResetPasswordForm$1, {})
  ] });
};
const index$m = () => {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(ResetPasswordBody$2, {}) });
};
const route17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$m
}, Symbol.toStringTag, { value: "Module" }));
const AccountLayout = ({ children }) => {
  const [show, setShow] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [userActive, setUserActive] = useState(true);
  const [inactiveMessage, setInactiveMessage] = useState(null);
  const auth = useAuth();
  if (!auth) {
    return null;
  }
  const [loading, setLoading] = useState(true);
  const handleShow = () => {
    if (show === false) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  useEffect(() => {
    const tokens = localStorage.getItem("authTokens");
    if (tokens === null || tokens === void 0 || tokens === "") {
      window.location.href = "/web/signin";
    } else {
      setLoading(false);
    }
  }, [auth == null ? void 0 : auth.user]);
  useEffect(() => {
    const getData = async (guid) => {
      const userProfile2 = await getUserProfile(guid || "");
      setUserProfile(userProfile2);
    };
    if (auth == null ? void 0 : auth.user) {
      getData(auth == null ? void 0 : auth.user.guid);
    }
  }, [auth == null ? void 0 : auth.user]);
  useEffect(() => {
    if (Boolean(userProfile)) {
      setUserActive(Boolean(userProfile == null ? void 0 : userProfile.active));
    }
  }, [userProfile]);
  useEffect(() => {
    if (userActive === false) {
      const info = `You are currently deactivated. Some operations like creating new business cannot be performed. Activate your profile to continue.`;
      setInactiveMessage(info);
    }
  }, [userActive]);
  if (loading) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: `h-screen flex flex-col relative`, children: [
    /* @__PURE__ */ jsx("div", { className: `h-[${appConfig.NAVBAR_HEIGHT}px] md:h-[0px]` }),
    /* @__PURE__ */ jsx("div", { className: `border-b`, children: /* @__PURE__ */ jsx(MainNav, {}) }),
    /* @__PURE__ */ jsx("div", { className: `md:hidden`, children: /* @__PURE__ */ jsx(HomeNav, {}) }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: handleShow,
        className: `text-xl text-white bg-gray-700 p-2 
                rounded-full hover:bg-gray-700 shadow-lg top-[72px]
                ${show ? "left-[295px]" : "left-[15px]"}
                focus:outline-none fixed z-50 top-[60px] 
                transition-all duration-1000 ease-in-out
                hidden lg:block`,
        children: /* @__PURE__ */ jsx(CgMenu, { className: `${show ? "rotate-0 transition-all duration-1000 ease-in-out" : "rotate-90 transition-all duration-1000 ease-in-out"}` })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: `flex flex-1 md:mt-[${appConfig.NAVBAR_HEIGHT}px] h-full
                overflow-hidden`, children: [
      /* @__PURE__ */ jsxs(
        "aside",
        {
          className: `bg-gray-50 text-gray-900 
                        h-full overflow-y-auto transition-all z-30
                        duration-1000 ease-in-out border-r shadow-md
                        hidden lg:block 
                        ${show ? "w-[350px] min-w-[350px]" : "w-0 min-w-0 overflow-hidden"}`,
          children: [
            /* @__PURE__ */ jsx("div", { className: `mt-[20px]` }),
            /* @__PURE__ */ jsx(LeftNav, { userProfile }),
            /* @__PURE__ */ jsx("div", { className: `h-[20px]` })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: `flex-1 overflow-y-auto bg-gray-100 `, children: [
        inactiveMessage && /* @__PURE__ */ jsx("div", { className: `max-w-[100%] mx-auto w-full bg-blue-500 pt-[10px] pb-[15px] text-white text-center`, children: inactiveMessage }),
        /* @__PURE__ */ jsx("div", { className: `mx-[15px]`, children: /* @__PURE__ */ jsx("div", { className: `max-w-[100%] mx-auto w-full  `, children }) })
      ] })
    ] })
  ] });
};
const BusinessMenu = ({ title, guid, userGuid, setIsOpen }) => {
  const [showSettings, setShowSettings] = useState(false);
  const displaySettings = (showSettings2) => {
    setShowSettings(showSettings2);
    setIsOpen(showSettings2);
  };
  useLocation();
  const hideSettings = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setShowSettings(false);
    setIsOpen(false);
  };
  return /* @__PURE__ */ jsx("div", { className: " w-fit   z-[1000] ", children: /* @__PURE__ */ jsx("div", { className: `relative`, children: /* @__PURE__ */ jsx(
    "button",
    {
      className: `rounded-full cursor-pointer bg-blue-900 w-[40px] h-[40px]
                         text-white shadow-md shadow-blue-400 py-1 flex place-items-center place-content-center`,
      onMouseDown: () => displaySettings(!showSettings),
      onBlur: () => hideSettings(),
      children: /* @__PURE__ */ jsx(MdMenu, { size: 30, className: `${showSettings ? "rotate-90 transition-all duration-1000 ease-in-out" : "rotate-0 transition-all duration-1000 ease-in-out"}` })
    }
  ) }) });
};
const settingsLinks = [
  {
    title: "Business Hours",
    link: "/settings"
  },
  {
    title: "Gallery",
    link: "/gallery"
  },
  {
    title: "Videos",
    link: "/videos"
  },
  {
    title: "Products",
    link: "/products"
  },
  {
    title: "Facilities",
    link: "/facilities"
  },
  {
    title: "Socials Media",
    link: "/social_media"
  },
  {
    title: "Activate",
    link: "/activate"
  },
  {
    title: "Delete",
    link: "/delete"
  }
];
const BusinessDrawer = ({ isOpen, userGuid, businessGuid }) => {
  const auth = useAuth();
  if (!auth) {
    return null;
  }
  const { user } = auth;
  useEffect(() => {
    if (user) {
      console.log(user.role);
    }
  }, [user]);
  const navOpen = isOpen ? "translate-x-0 " : "-translate-x-[110%]";
  const location = useLocation();
  const pathname = `/web/account/portfolio/${businessGuid}/${userGuid}`;
  const businesspath = `/web/account/portfolio/${businessGuid}`;
  const reassignpath = `/web/account/portfolio/${businessGuid}/${userGuid}/reassign`;
  useEffect(() => {
  }, [userGuid, businessGuid]);
  return /* @__PURE__ */ jsx("div", { className: `relative`, children: /* @__PURE__ */ jsxs("div", { className: ` fixed ${navOpen}   w-[250px] h-screen bg-white shadow-lg transform transition-transform ease-in-out duration-500 z-[10] `, children: [
    /* @__PURE__ */ jsx("div", { className: `p-5 border-b font-bold text-lg`, children: "Settings" }),
    /* @__PURE__ */ jsxs("div", { className: ``, children: [
      /* @__PURE__ */ jsx("div", { className: "group", children: /* @__PURE__ */ jsx("a", { href: `/web/account/portfolio/${businessGuid}`, children: /* @__PURE__ */ jsx("div", { className: `py-4 hover:bg-gray-100 ${location.pathname === businesspath && "bg-gray-300/30"}`, children: /* @__PURE__ */ jsx("div", { className: `mx-5 group-hover:underline`, children: "Page Home" }) }) }) }),
      settingsLinks == null ? void 0 : settingsLinks.map((setting, index2) => {
        const url = pathname + setting.link;
        return /* @__PURE__ */ jsx("div", { className: ` group  `, children: /* @__PURE__ */ jsx("a", { href: `/web/account/portfolio/${businessGuid}/${userGuid}${setting == null ? void 0 : setting.link}`, children: /* @__PURE__ */ jsx("div", { className: `py-4 hover:bg-gray-200 ${location.pathname === url && "bg-gray-300/30"}`, children: /* @__PURE__ */ jsx("div", { className: `mx-5 group-hover:underline`, children: setting == null ? void 0 : setting.title }) }) }) }, index2);
      }),
      (user == null ? void 0 : user.role) === "admin" && /* @__PURE__ */ jsx("div", { className: "group", children: /* @__PURE__ */ jsx("a", { href: `/web/account/portfolio/${businessGuid}/${userGuid}/reassign`, children: /* @__PURE__ */ jsx("div", { className: `py-4 hover:bg-gray-100 ${location.pathname === reassignpath && "bg-gray-300/30"}`, children: /* @__PURE__ */ jsx("div", { className: `mx-5 group-hover:underline`, children: "Reassign Business" }) }) }) })
    ] })
  ] }) });
};
const ContentLayout = ({ children, businessGuid, data, businessProfile, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(BusinessDrawer, { isOpen, businessGuid, userGuid: businessProfile == null ? void 0 : businessProfile.owner }),
    /* @__PURE__ */ jsxs("div", { className: `mt-4 bg-white 
                rounded-lg shadow-md pb-8 `, children: [
      /* @__PURE__ */ jsxs("div", { className: `font-semibold text-[17px] border-b-[1px] p-3 flex place-content-between place-items-center`, children: [
        /* @__PURE__ */ jsx("div", { children: title }),
        /* @__PURE__ */ jsxs("div", { className: `text-[13px] flex place-items-center gap-2`, children: [
          (businessProfile == null ? void 0 : businessProfile.gid) !== void 0 && (businessProfile == null ? void 0 : businessProfile.gid) !== "" && (businessProfile == null ? void 0 : businessProfile.gid) !== "" && /* @__PURE__ */ jsx(
            "a",
            {
              href: `/web/account/portfolio/${businessGuid}`,
              className: `border py-[5px] px-[10px] rounded-full bg-blue-50`,
              children: "Back"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: `/web/account/portfolio`,
              className: `border py-[5px] px-[10px] rounded-full bg-blue-50`,
              children: "Portfolio"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: `/${businessGuid}`,
              className: `border py-[5px] px-[10px] rounded-full bg-blue-50`,
              children: "Preview"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `px-[15px]  pt-4 `, children: [
        /* @__PURE__ */ jsxs("div", { className: `w-full flex place-content-between place-items-center`, children: [
          /* @__PURE__ */ jsx("div", { className: `text-lg font-[600] leading-[1.4em]`, children: businessProfile && businessProfile.title }),
          /* @__PURE__ */ jsx("div", { children: businessGuid && data.userGuid && /* @__PURE__ */ jsx(BusinessMenu, { setIsOpen, guid: businessGuid, userGuid: data.userGuid }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: `h-[12px]` }),
        children,
        /* @__PURE__ */ jsx("div", { className: `h-[40px]` })
      ] })
    ] })
  ] });
};
const index$l = () => {
  return /* @__PURE__ */ jsx(AccountLayout, { children: /* @__PURE__ */ jsx(ContentLayout, { title: "Account Profile", children: "Account Profile" }) });
};
const route18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$l
}, Symbol.toStringTag, { value: "Module" }));
const ImgComponentAlt$1 = ({ user, userProfileImageData }) => {
  useNotification();
  let imgconst = "";
  if (userProfileImageData == null ? void 0 : userProfileImageData.image_url) {
    imgconst = config.IMG_BASE_URL + userProfileImageData.image_url;
  }
  const [imgSrc, setImgSrc] = useState(imgconst);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isImgSelected, setIsImageSelected] = useState(false);
  const [working, setWorking] = useState(false);
  const { showOperation, showSuccess, showError, showWarning, showInfo, completeOperation } = useOperation();
  const handleImageClick = () => {
    var _a;
    (_a = fileInputRef.current) == null ? void 0 : _a.click();
  };
  const handleFileChange = (event) => {
    var _a;
    const file = (_a = event.target.files) == null ? void 0 : _a[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImgSrc(imageUrl);
      setSelectedFile(file);
      setIsImageSelected(true);
    }
  };
  const handleUpload = async () => {
    setWorking(true);
    showOperation("processing");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    if (isImgSelected) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("guid", user.user_guid);
      const endpoint = "/user_profile_pic_upload";
      const url = config.IMG_BASE_URL + endpoint;
      try {
        const response = await fetch(url, {
          method: "POST",
          body: formData
        });
        if (!response.ok) {
          let error = response.json().then((data) => {
            showError("Error", data.message);
            completeOperation();
          });
        } else {
          showSuccess("Success", "Image uploaded.");
          completeOperation();
        }
      } catch (error) {
        showError("Error", "Image upload failed.");
        completeOperation();
      } finally {
        setWorking(false);
      }
    } else {
      showError("Error", "Please select an image to continue");
      completeOperation();
      setWorking(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: `w-[50%] mx-auto flex flex-col 
        place-content-center place-items-center`, children: [
    /* @__PURE__ */ jsxs("div", { className: `relative bg-black w-[150px] 
                h-[150px] z-40 rounded-full overflow-hidden
                flex place-content-center place-items-center border-[3px] border-white`, children: [
      imgSrc !== "" ? /* @__PURE__ */ jsx(
        "img",
        {
          src: imgSrc,
          alt: "",
          className: ` object-cover w-full h-full z-0 absolute ${imgSrc === "" ? "bg-transparent" : "bg-white"}`
        }
      ) : /* @__PURE__ */ jsx(BiSolidUser, { className: `object-cover w-[70%] h-[70%]` }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "file",
          accept: "image/*",
          ref: fileInputRef,
          className: " hidden",
          onChange: handleFileChange
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `flex place-content-center place-items-center
                                 bg-black/10 w-full h-full absolute z-0 
                                 top-0 object-cover
                                 text-white/80 `,
          onMouseDown: handleImageClick,
          children: /* @__PURE__ */ jsx("div", { className: `w-[50%] h-[50%] flex flex-col
                                    place-content-center place-items-center
                                    hover:cursor-pointer hover:bg-white/50
                                    rounded-full transition duration-300 ease-in-out bg-white/50`, children: /* @__PURE__ */ jsx(MdEditSquare, { className: " text-[30px]" }) })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: ` flex flex-col place-items-center 
                place-content-center mt-2 `, children: /* @__PURE__ */ jsx(
      "button",
      {
        className: `
                        ${working ? "bg-gray-200 cursor-default" : "bg-blue-100"}  
                        w-full py-[6px] rounded-[8px] border-[1px] border-gray-200
                        shadow-sm hover:shadow-lg transition duration-500 ease-in-out
                        px-5`,
        onMouseDown: handleUpload,
        disabled: working,
        children: working ? "Uploading..." : "Submit"
      }
    ) })
  ] });
};
const ProfileSchema = z.object({
  first_name: z.string().min(1, { message: "Enter a first name" }),
  lastname: z.any(),
  country_code: z.any(),
  state_code: z.any(),
  city_id: z.any(),
  phone: z.any(),
  address_one: z.any(),
  address_two: z.any(),
  country: z.any(),
  xsocial: z.any(),
  linksocial: z.any(),
  fbsocial: z.any(),
  zipcode: z.any()
});
const Button = ({
  working,
  value
}) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: inputControlWrapper, children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      "button",
      {
        className: `border-[1px] border-none bg-gray-700 
                            w-full  text-xl
                            py-2.5 rounded-full text-white mt-1 shadow-lg shadow-gray-400
                            cursor-pointer ${working && "bg-gray-500 cursor-default"}`,
        disabled: working,
        children: working ? "Submitting..." : `${value ? value : "Submit"}`
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: `mt-4 text-[.7em] leading-[1.2em] 
                    px-2 w-full`, children: "By submitting, you agree to our Privacy Commitment and Terms of Service." })
  ] }) });
};
const Input = ({
  controlName,
  controlType,
  controlPlaceholder,
  controlTitle,
  controlInformation,
  register,
  changeHandler,
  error,
  width,
  disabled = false
}) => {
  const [wrapperWidth, setWrapperWidth] = useState("");
  const [inputWidth, setInputWidth] = useState(width);
  useEffect(() => {
    if (inputWidth > 0) {
      if (inputWidth === 100) {
        setWrapperWidth(`xl:w-full`);
      } else {
        setWrapperWidth(`xl:w-[${inputWidth}%]`);
      }
    }
  }, [inputWidth]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: inputControlWrapper, children: [
    /* @__PURE__ */ jsxs("div", { className: inputHeadingClass, children: [
      /* @__PURE__ */ jsx("div", { className: `mb-0 text-xl`, children: controlTitle }),
      (controlInformation == null ? void 0 : controlInformation.length) > 1 && /* @__PURE__ */ jsx("div", { className: controlInformationClass, children: controlInformation })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `w-[100%]`, children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          ...register(controlName, {
            onChange: changeHandler
          }),
          type: controlType ? controlType : "text",
          className: `${inputClass} ${disabled && "bg-gray-200/80"}`,
          placeholder: controlPlaceholder,
          disabled
        }
      ),
      error && /* @__PURE__ */ jsxs("div", { className: `${inputClassError}`, children: [
        /* @__PURE__ */ jsx(MdError, { className: "text-lg" }),
        error.message
      ] })
    ] })
  ] }) });
};
const Select = ({
  controlName,
  controlTitle,
  controlPlaceholder,
  selectJson,
  register,
  changeHandler,
  error,
  setCode,
  controlInformation
}) => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (register && changeHandler && selectJson) {
      setTimeout(() => {
        setReady(true);
      }, 1e3);
    }
  }, [register, changeHandler, selectJson]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: inputControlWrapper, children: [
    /* @__PURE__ */ jsxs("div", { className: inputHeadingClass, children: [
      /* @__PURE__ */ jsx("div", { className: `mb-0 text-xl`, children: controlTitle }),
      (controlInformation == null ? void 0 : controlInformation.length) > 1 && /* @__PURE__ */ jsx("div", { className: controlInformationClass, children: controlInformation })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-[90%]", children: [
      ready && /* @__PURE__ */ jsxs(
        "select",
        {
          ...register(controlName, {
            onChange: (e) => {
              changeHandler(e);
              if (setCode) {
                setCode(e.target.value);
              }
            }
          }),
          className: inputClass,
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: controlPlaceholder }),
            selectJson.map((item, id) => {
              return /* @__PURE__ */ jsx("option", { value: item.id, children: item.name }, id);
            })
          ]
        }
      ),
      error && /* @__PURE__ */ jsxs("div", { className: `input__class__error`, children: [
        /* @__PURE__ */ jsx(MdError, { className: "text-lg" }),
        error.message
      ] })
    ] })
  ] }) });
};
const ProfileBg = ({ listing, user, userProfileBgData }) => {
  const [working, setWorking] = useState(false);
  const [imgconst, setImgconst] = useState("");
  const fileInputRef = useRef(null);
  const [isImgSelected, setIsImageSelected] = useState(false);
  useNotification();
  const [selectedFile, setSelectedFile] = useState(null);
  const { showOperation, showError, completeOperation, showSuccess } = useOperation();
  useEffect(() => {
    if (userProfileBgData == null ? void 0 : userProfileBgData.image_url) {
      setImgconst(config.IMG_BASE_URL + (userProfileBgData == null ? void 0 : userProfileBgData.image_url));
    }
  }, []);
  const handleImageClick = () => {
    var _a;
    (_a = fileInputRef.current) == null ? void 0 : _a.click();
  };
  const handleFileChange = (event) => {
    var _a;
    const file = (_a = event.target.files) == null ? void 0 : _a[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImgconst(imageUrl);
      setSelectedFile(file);
      setIsImageSelected(true);
    }
  };
  const handleUpload = async () => {
    setWorking(true);
    showOperation("processing");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    const formData = new FormData();
    if (isImgSelected) {
      formData.append("file", selectedFile);
      formData.append("guid", user.user_guid);
      const endpoint = "/user_profile_bg_upload";
      const url = config.IMG_BASE_URL + endpoint;
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
          },
          body: formData
        });
        if (!response.ok) {
          let error = response.json().then((data) => {
            console.log(data.message);
            showError("Error", data.message);
            completeOperation();
          });
        } else {
          try {
            showSuccess("Success", "Image saved.");
          } finally {
            completeOperation();
          }
        }
      } catch (error) {
        console.log(error);
        showError("Error", "Image save failed");
        completeOperation();
      } finally {
        setWorking(false);
      }
    } else {
      showError("Error", "Please select an image to continue.");
      completeOperation();
      setWorking(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: `relative`, children: [
    /* @__PURE__ */ jsxs("div", { className: `bg-gray-700 w-full h-[200px] relative shadow-lg text-white flex place-items-center place-content-center flex-col`, children: [
      imgconst === "" && "Add Photo (1920x200)",
      imgconst && /* @__PURE__ */ jsx(
        "img",
        {
          src: imgconst,
          alt: "",
          className: `object-cover w-full h-full absolute`
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "file",
          accept: "image/*",
          ref: fileInputRef,
          className: " hidden",
          onChange: handleFileChange
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: ` flex place-items-center gap-1.5
                place-content-center top-[5px] right-[5px] w-fit z-[120] absolute`, children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: `bg-white  w-full py-[4px] rounded-[8px] border-[1px] border-gray-200
                        shadow-sm hover:shadow-lg transition duration-500 ease-in-out px-[8px] `,
          disabled: working,
          onMouseDown: handleImageClick,
          children: "Browse"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: `bg-white  w-full py-[3px] rounded-[8px] border-[1px] border-gray-200 px-[8px]
                        shadow-sm hover:shadow-lg transition duration-500 ease-in-out`,
          onMouseDown: handleUpload,
          disabled: working,
          children: working ? "Uploading..." : "Upload"
        }
      )
    ] })
  ] });
};
const Profile = ({ loaderData, user, userProfileData, userProfileBgData }) => {
  var _a, _b;
  const [formdata, setFormdata] = useState(null);
  const [working, setWorking] = useState(false);
  useNotification();
  const countries = loaderData.countries;
  let [states, setStates] = useState(loaderData.states);
  let [cities, setCities] = useState(loaderData.cities);
  loaderData.categories;
  const [countryCode, setCountryCode] = useState((_a = loaderData.userProfileData) == null ? void 0 : _a.country_code);
  const [stateCode, setStateCode] = useState((_b = loaderData.userProfileData) == null ? void 0 : _b.state_code);
  const [newCountryCode, setNewCountryCode] = useState("");
  const [newStateCode, setNewStateCode] = useState("");
  const { showOperation, showError, completeOperation, showSuccess } = useOperation();
  const resetStates = async (countryCode2) => {
    setCountryCode(countryCode2);
    setNewCountryCode(countryCode2);
    const states2 = await getStates(countryCode2);
    setStates(states2);
    resetCities("");
  };
  const resetCities = async (stateCode2) => {
    setStateCode(stateCode2);
    setNewStateCode(stateCode2);
    const cities2 = await getCities(countryCode, stateCode2);
    setCities(cities2);
  };
  const changeHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormdata((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  };
  const handleUpdateUser = async (data) => {
    setWorking(true);
    showOperation("processing");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    const BASE_URL = "https://testindex.veycet.com";
    const endpoint = "/api/user/" + user.guid;
    const url = BASE_URL + endpoint;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: headers$1,
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        var respObj = await response.json();
        throw new Error(`Error Code: ${response.status} - ${respObj.error}`);
      } else {
        showSuccess("Success", "Updated.");
        completeOperation();
      }
    } catch (error) {
      showError("Error", (error == null ? void 0 : error.message) || (error == null ? void 0 : error.error) || "Update failed.");
      completeOperation();
      return void 0;
    } finally {
      setWorking(false);
    }
  };
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: userProfileData,
    resolver: zodResolver(ProfileSchema)
  });
  useEffect(() => {
    if (newCountryCode) {
      setValue("state_code", "");
      setValue("city_id", "");
    }
  }, [newCountryCode]);
  useEffect(() => {
    if (newStateCode) {
      setValue("city_id", "");
    }
  }, [newStateCode]);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      ProfileBg,
      {
        user: userProfileData,
        userProfileBgData
      }
    ),
    /* @__PURE__ */ jsx("div", { className: `px-[15px]  relative w-full flex place-content-center h-[180px]`, children: /* @__PURE__ */ jsx("div", { className: `absolute top-[-50px]`, children: /* @__PURE__ */ jsx("div", { className: `flex place-items-center place-content-center flex-col`, children: /* @__PURE__ */ jsx(
      ImgComponentAlt$1,
      {
        user: userProfileData,
        userProfileImageData: loaderData.userProfileImageData
      }
    ) }) }) }),
    /* @__PURE__ */ jsxs("div", { className: `px-[15px]`, children: [
      /* @__PURE__ */ jsx("hr", {}),
      /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit(handleUpdateUser), children: /* @__PURE__ */ jsxs("div", { className: `${formWrapperClass} mt-0  rounded-lg pt-4
                 md:max-w-[600px] w-full mx-auto `, children: [
        /* @__PURE__ */ jsxs("div", { className: `text-xl font-[600] leading-[1.4em] px-[10px] text-black mb-[32px]`, children: [
          userProfileData == null ? void 0 : userProfileData.first_name,
          " ",
          userProfileData == null ? void 0 : userProfileData.lastname
        ] }),
        /* @__PURE__ */ jsx(
          Input,
          {
            controlTitle: "First Name",
            controlName: "first_name",
            controlPlaceholder: "Enter first name",
            register,
            changeHandler,
            error: errors.first_name,
            controlInformation: `Please enter your first name. First name is compulsory. `
          }
        ),
        /* @__PURE__ */ jsx(
          Input,
          {
            controlTitle: "Last Name",
            controlName: "lastname",
            controlPlaceholder: "Enter last name",
            register,
            changeHandler,
            error: errors.lastname,
            controlInformation: `Please enter your last name. Last name is compulsory. `
          }
        ),
        /* @__PURE__ */ jsx(
          Select,
          {
            controlTitle: "Country",
            controlName: "country_code",
            controlPlaceholder: "Select Country",
            selectJson: countries,
            register,
            changeHandler,
            error: errors.country_code,
            setCode: resetStates,
            controlInformation: `Please select country. `
          }
        ),
        /* @__PURE__ */ jsx(
          Select,
          {
            controlTitle: "State",
            controlName: "state_code",
            controlPlaceholder: "Select State",
            selectJson: states,
            register,
            changeHandler,
            setCode: resetCities,
            controlInformation: `Please select state. `
          }
        ),
        /* @__PURE__ */ jsx(
          Select,
          {
            controlTitle: "City",
            controlName: "city_id",
            controlPlaceholder: "Select City",
            selectJson: cities,
            register,
            changeHandler,
            controlInformation: `Please select a city. `
          }
        ),
        /* @__PURE__ */ jsx(
          Input,
          {
            controlTitle: "Zipcode",
            controlName: "zipcode",
            controlPlaceholder: "Enter zip code",
            register,
            changeHandler,
            controlInformation: `Please a zipcode. `
          }
        ),
        /* @__PURE__ */ jsx(
          Input,
          {
            controlTitle: "Phone",
            controlName: "phone",
            controlPlaceholder: "Enter phone number",
            register,
            changeHandler,
            controlInformation: `Please enter a phone or mobile. `
          }
        ),
        /* @__PURE__ */ jsx(
          Input,
          {
            controlTitle: "Address Line 1",
            controlName: "address_one",
            controlPlaceholder: "Enter address",
            register,
            changeHandler,
            controlInformation: `Please enter an address. `
          }
        ),
        /* @__PURE__ */ jsx(
          Input,
          {
            controlTitle: "Address Line 2",
            controlName: "address_two",
            controlPlaceholder: "Enter address",
            register,
            changeHandler,
            controlInformation: `E.g. Off Brian's Boulevard or Avenue. `
          }
        ),
        /* @__PURE__ */ jsx(Button, { working })
      ] }) })
    ] })
  ] });
};
const ProfileLayout = ({ children }) => {
  const [show, setShow] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [userActive, setUserActive] = useState(true);
  const [inactiveMessage, setInactiveMessage] = useState(null);
  const auth = useAuth();
  if (!auth) {
    return null;
  }
  useEffect(() => {
    if (auth.user === null) {
      window.location.href = "/web/signin";
    }
  }, [auth]);
  const [loading, setLoading] = useState(true);
  const handleShow = () => {
    if (show === false) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  useEffect(() => {
    var _a, _b, _c;
    if (((_a = auth == null ? void 0 : auth.user) == null ? void 0 : _a.guid) !== null && ((_b = auth == null ? void 0 : auth.user) == null ? void 0 : _b.guid) !== void 0 && ((_c = auth == null ? void 0 : auth.user) == null ? void 0 : _c.guid) !== "") {
      setLoading(false);
    } else {
      window.location.href = "/web/signin";
    }
  }, [auth == null ? void 0 : auth.user]);
  useEffect(() => {
    const getData = async (guid) => {
      const userProfile2 = await getUserProfile(guid || "");
      setUserProfile(userProfile2);
    };
    if (auth == null ? void 0 : auth.user) {
      getData(auth == null ? void 0 : auth.user.guid);
    }
  }, [auth == null ? void 0 : auth.user]);
  useEffect(() => {
    const tokens = localStorage.getItem("authTokens");
    if (tokens === null || tokens === void 0 || tokens === "") {
      window.location.href = "/web/signin";
    }
  }, []);
  useEffect(() => {
    if (Boolean(userProfile)) {
      setUserActive(Boolean(userProfile == null ? void 0 : userProfile.active));
    }
  }, [userProfile]);
  useEffect(() => {
    if (userActive === false) {
      const info = "You are currently deactivated. Some operations like creating new business cannot be performed. Activate your profile to continue.";
      setInactiveMessage(info);
    }
  }, [userActive]);
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center h-screen", children: /* @__PURE__ */ jsx("div", { className: "text-lg", children: "Loading..." }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: `h-screen flex flex-col relative`, children: [
    /* @__PURE__ */ jsx("div", { className: `h-[${appConfig.NAVBAR_HEIGHT}px] md:h-[0px]` }),
    /* @__PURE__ */ jsx(MainNav, {}),
    /* @__PURE__ */ jsx("div", { className: `md:hidden`, children: /* @__PURE__ */ jsx(HomeNav, {}) }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: handleShow,
        className: `text-xl text-white bg-gray-700 p-2 
                rounded-full hover:bg-gray-700 shadow-lg top-[72px]
                ${show ? "left-[295px]" : "left-[15px]"}
                focus:outline-none fixed z-50 top-[60px] 
                transition-all duration-1000 ease-in-out
                hidden lg:block`,
        children: /* @__PURE__ */ jsx(CgMenu, { className: `${show ? "rotate-0 transition-all duration-1000 ease-in-out" : "rotate-90 transition-all duration-1000 ease-in-out"}` })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: `flex flex-1 md:mt-[${appConfig.NAVBAR_HEIGHT}px] h-full
                overflow-hidden`, children: [
      /* @__PURE__ */ jsxs(
        "aside",
        {
          className: `bg-gray-50 text-gray-900 
                        h-full overflow-y-auto transition-all z-30
                        duration-1000 ease-in-out border-r shadow-md
                        hidden lg:block 
                        ${show ? "w-[350px] min-w-[350px]" : "w-0 min-w-0 overflow-hidden"}`,
          children: [
            /* @__PURE__ */ jsx("div", { className: `mt-[20px]` }),
            /* @__PURE__ */ jsx(LeftNav, { userProfile }),
            /* @__PURE__ */ jsx("div", { className: `h-[20px]` })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: `flex-1 overflow-y-auto bg-gray-50 pb-6 px-[0px] relative`, children: [
        inactiveMessage && /* @__PURE__ */ jsx("div", { className: `max-w-[100%] mx-auto w-full bg-blue-500 px-3 pt-[10px] pb-[15px] text-white text-center`, children: inactiveMessage }),
        /* @__PURE__ */ jsx("div", { className: `max-w-[100%] mx-auto w-full  `, children })
      ] })
    ] })
  ] });
};
const index$k = () => {
  const auth = useAuth();
  if (!auth) {
    return null;
  }
  const { user } = auth;
  IsAuthenticated(localStorage);
  const [userProfile, setUserProfile] = useState(null);
  const [states, setStates] = useState(null);
  const [countries, setCountries] = useState(null);
  const [cities, setCities] = useState(null);
  const [userProfileImageData, setUserProfileImageData] = useState(null);
  const [userProfileBgData, setUserProfileBgData] = useState(null);
  const [categories2, setCategories] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getAllData(guid) {
      try {
        const userProfileData = await getUserProfile(guid || "");
        const countries2 = await getCountries();
        const userObject = userProfileData;
        const states2 = await getStates(userObject.country_code || "");
        const cities2 = await getCities(userObject.country_code || "", userObject.state_code || "");
        const categories22 = await getCategories();
        const userProfileImageData2 = await getUserProfileImageData(guid || "");
        const userProfileBgData2 = await getUserProfileBgData(guid || "");
        setUserProfile(userProfileData);
        setCountries(countries2);
        setStates(states2);
        setCities(cities2);
        setUserProfileImageData(userProfileImageData2);
        setUserProfileBgData(userProfileBgData2);
        setCategories(categories22);
      } catch (e) {
        console.log(e.message);
      }
    }
    if (user == null ? void 0 : user.guid) {
      getAllData(user == null ? void 0 : user.guid);
    }
  }, [user == null ? void 0 : user.guid]);
  useEffect(() => {
    if (userProfile && countries && states && cities && userProfileImageData && categories2) {
      const data2 = {
        userProfile,
        countries,
        states,
        cities,
        userProfileImageData,
        categories: categories2
      };
      setData(data2);
    }
  }, [
    categories2,
    countries,
    states,
    cities,
    userProfileImageData,
    userProfile
  ]);
  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);
  if (loading) {
    return /* @__PURE__ */ jsx(LoadingMessage, { loading });
  }
  return /* @__PURE__ */ jsx(ProfileLayout, { children: userProfile && data && !loading && user && /* @__PURE__ */ jsx(
    Profile,
    {
      loaderData: data,
      user,
      userProfileData: data.userProfile,
      userProfileBgData
    }
  ) });
};
const route19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$k
}, Symbol.toStringTag, { value: "Module" }));
const EmailSchema = z.object({
  email: z.string({ message: "Please enter an email." }).min(1, { message: "Email must not be empty" }).email({ message: "Please enter a valid email" })
});
const EmailForm = ({ loaderData, user }) => {
  var _a, _b;
  const [formdata, setFormdata] = useState(null);
  const [working, setWorking] = useState(false);
  useNotification();
  const [loading, setLoading] = useState(true);
  const { showOperation, showSuccess, showError, showWarning, showInfo, completeOperation } = useOperation();
  const changeHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormdata((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  };
  const handleEmailChangeRequest = async (data) => {
    var _a2, _b2;
    setWorking(true);
    showOperation("processing");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    if (data["email"] === ((_a2 = loaderData.userProfile) == null ? void 0 : _a2.email)) {
      showError("Error", "Email is in use. Enter a new email.");
      completeOperation();
      setWorking(false);
      return false;
    }
    const endpoint = "/api/user/change_email_request";
    const url = config.BASE_URL + endpoint;
    data["guid"] = (_b2 = loaderData.userProfile) == null ? void 0 : _b2.user_guid;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers$1,
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        let error = response.json().then((data2) => {
          showError("Error", data2.message);
          completeOperation();
        });
      } else {
        showSuccess("Success", "Please check your new email to continue.");
        completeOperation();
      }
    } catch (error) {
      showError("Error", "Change request failed");
      completeOperation();
    } finally {
      setWorking(false);
    }
  };
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: loaderData.listing,
    resolver: zodResolver(EmailSchema)
  });
  return /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit(handleEmailChangeRequest), children: /* @__PURE__ */ jsx("div", { className: `${formWrapperClass} mt-0  rounded-lg pt-4
                             max-w-[500px] w-full mx-auto`, children: /* @__PURE__ */ jsxs("div", { className: inputWrapperClass, children: [
    /* @__PURE__ */ jsx("div", { className: " text-xl text-gray-700 font-semibold border-b pb-1", children: "Current email" }),
    /* @__PURE__ */ jsxs("div", { className: " pt-3 pb-4 text-[13px] leading-5", children: [
      /* @__PURE__ */ jsxs("span", { className: " font-semibold", children: [
        "[",
        (_a = loaderData.userProfile) == null ? void 0 : _a.email,
        "]"
      ] }),
      " will be used for account-related notifications and can be used for password resets."
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border-[1px] rounded-full px-3 py-3 bg-gray-50", children: [
      (_b = loaderData.userProfile) == null ? void 0 : _b.email,
      "  "
    ] }),
    /* @__PURE__ */ jsx("div", { className: `mt-[20px]` }),
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "Update Email",
        controlPlaceholder: "Enter new email address",
        controlName: "email",
        register,
        changeHandler,
        error: errors.email,
        width: 100,
        controlInformation: `Enter a new email address.`
      }
    ),
    /* @__PURE__ */ jsx(Button, { working })
  ] }) }) });
};
const ProfileContentLayout = ({ children, businessGuid, data, businessProfile, title }) => {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: `mt-4 bg-white 
                rounded-lg shadow-md pb-8 `, children: [
    /* @__PURE__ */ jsxs("div", { className: `font-semibold text-[17px] border-b-[1px] p-3 flex place-content-between place-items-center`, children: [
      /* @__PURE__ */ jsx("div", { children: title }),
      /* @__PURE__ */ jsx("div", { className: `text-[13px] flex place-items-center gap-2`, children: /* @__PURE__ */ jsx(
        "a",
        {
          href: `/web/account/profile`,
          className: `border py-[5px] px-[15px] rounded-full bg-blue-50`,
          children: "Back"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `px-[15px]  pt-4 `, children: [
      /* @__PURE__ */ jsx("div", { children: businessGuid && data.userGuid && /* @__PURE__ */ jsx(BusinessMenu, { guid: businessGuid, userGuid: data.userGuid }) }),
      children,
      /* @__PURE__ */ jsx("div", { className: `h-[40px]` })
    ] })
  ] }) });
};
const index$j = () => {
  useEffect(() => {
    IsAuthenticated(localStorage);
  }, []);
  const auth = useAuth();
  if (!auth) {
    return null;
  }
  const { user } = auth;
  const [userProfile, setUserProfile] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getAllData(guid) {
      const userProfileData = await getUserProfile(guid || "");
      setUserProfile(userProfileData);
    }
    try {
      if (user == null ? void 0 : user.guid) {
        getAllData(user == null ? void 0 : user.guid);
      }
    } catch (e) {
      console.log(e.message);
    }
  }, [user == null ? void 0 : user.guid]);
  useEffect(() => {
    if (userProfile) {
      const data2 = {
        userProfile
      };
      setData(data2);
    }
  }, [
    userProfile
  ]);
  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);
  if (loading) {
    return /* @__PURE__ */ jsx(LoadingMessage, { loading });
  }
  return /* @__PURE__ */ jsx(AccountLayout, { children: /* @__PURE__ */ jsxs(ProfileContentLayout, { title: "Email Address", children: [
    userProfile === null ? "Loading..." : "",
    /* @__PURE__ */ jsx("div", { className: `font-semibold mb-2 text-md` }),
    data && /* @__PURE__ */ jsx(EmailForm, { loaderData: data, user })
  ] }) });
};
const route20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$j
}, Symbol.toStringTag, { value: "Module" }));
const passwordValidation$1 = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!()£@$%^&*-]).{8,}$/
);
const ChangePasswordSchema = z.object({
  oldpassword: z.string().min(1, { message: "Please enter old password." }).min(8, { message: "Password must be up to 8 characters." }).regex(passwordValidation$1, {
    message: "Please enter a valid password"
  }),
  newpassword: z.string().min(1, { message: "Please enter new password." }).min(8, { message: "Password must be at least 8 characters." }).regex(passwordValidation$1, {
    message: "Please enter a valid password"
  }),
  newpassword2: z.string().min(1, { message: "Please retype new password." }).min(8, { message: "Password must be at least 8 characters." }).regex(passwordValidation$1, {
    message: "Please enter a valid password"
  })
}).superRefine((data, ctx) => {
  if (data.oldpassword === data.newpassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["newpassword"],
      message: "New password cannot be the same as old password"
    });
  }
  if (data.newpassword !== data.newpassword2) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["newpd2"],
      message: "Your new password don't match"
    });
  }
});
const ChangePasswordForm = ({ loaderData, user }) => {
  var _a;
  const [formdata, setFormdata] = useState(null);
  const [working, setWorking] = useState(false);
  useNotification();
  const { showOperation, showError, completeOperation, showSuccess } = useOperation();
  const changeHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormdata((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  };
  const handleEmailChangeRequest = async (data) => {
    var _a2;
    setWorking(true);
    showOperation("processing");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    const endpoint = "/api/user/change_password/" + ((_a2 = loaderData.userProfile) == null ? void 0 : _a2.user_guid);
    const url = config.BASE_URL + endpoint;
    data["password"] = data == null ? void 0 : data.newpassword;
    delete data["oldpassword"];
    delete data["newpassword"];
    delete data["newpassword2"];
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: headers$1,
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        let error = response.json().then((data2) => {
          showError("Error", data2.message);
          completeOperation();
        });
      } else {
        showSuccess("Success", "Password changed. Use new password on next login.");
        completeOperation();
      }
    } catch (error) {
      console.log(error.message);
      showError("Error", "Password change failed.");
      completeOperation();
    } finally {
      setWorking(false);
    }
  };
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: loaderData.listing,
    resolver: zodResolver(ChangePasswordSchema)
  });
  return /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit(handleEmailChangeRequest), children: /* @__PURE__ */ jsx("div", { className: `${formWrapperClass} mt-0  
            rounded-lg pt-4 max-w-[500px] w-full mx-auto`, children: /* @__PURE__ */ jsxs("div", { className: inputWrapperClass, children: [
    /* @__PURE__ */ jsx("div", { className: " text-xl text-gray-700 font-semibold border-b pb-1", children: "Change Password" }),
    /* @__PURE__ */ jsxs("div", { className: " pt-3 pb-4 text-[13px] leading-5", children: [
      /* @__PURE__ */ jsx("b", { children: (_a = loaderData.userProfile) == null ? void 0 : _a.email }),
      " is your current email. It will be used be used for password resets or changes."
    ] }),
    /* @__PURE__ */ jsx("div", { className: `mt-[20px]` }),
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "Current Password",
        controlPlaceholder: "Enter current password",
        controlType: "password",
        controlName: "oldpassword",
        register,
        changeHandler,
        error: errors.oldpassword
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "New Password",
        controlType: "password",
        controlPlaceholder: "Enter new password",
        controlName: "newpassword",
        register,
        changeHandler,
        error: errors.newpassword
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "Retype New Password",
        controlPlaceholder: "Retype new password",
        controlName: "newpassword2",
        controlType: "password",
        register,
        changeHandler,
        error: errors.newpassword2
      }
    ),
    /* @__PURE__ */ jsx(Button, { working })
  ] }) }) });
};
const index$i = () => {
  useEffect(() => {
    IsAuthenticated(localStorage);
  }, []);
  const auth = useAuth();
  if (!auth) {
    return null;
  }
  const { user } = auth;
  const [userProfile, setUserProfile] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getAllData(guid) {
      const userProfileData = await getUserProfile(guid || "");
      setUserProfile(userProfileData);
    }
    try {
      if (user == null ? void 0 : user.guid) {
        getAllData(user == null ? void 0 : user.guid);
      }
    } catch (e) {
      console.log(e.message);
    }
  }, [user == null ? void 0 : user.guid]);
  useEffect(() => {
    if (userProfile && user) {
      const data2 = {
        userProfile,
        ...user
      };
      setData(data2);
    }
  }, [
    userProfile,
    user
  ]);
  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);
  if (loading) {
    return /* @__PURE__ */ jsx(LoadingMessage, { loading });
  }
  return /* @__PURE__ */ jsx(AccountLayout, { children: /* @__PURE__ */ jsxs(
    ProfileContentLayout,
    {
      title: "Change Password",
      data,
      children: [
        userProfile === null ? "Loading..." : "",
        data && /* @__PURE__ */ jsx(ChangePasswordForm, { loaderData: data, user })
      ]
    }
  ) });
};
const route21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$i
}, Symbol.toStringTag, { value: "Module" }));
const ResetPasswordSchema$1 = z.object({
  email: z.string({ message: "Please enter an email." }).min(1, { message: "Email must not be empty" }).email({ message: "Please enter a valid email" })
});
const ResetPasswordForm = ({ loaderData, user }) => {
  var _a;
  const [formdata, setFormdata] = useState(null);
  const [working, setWorking] = useState(false);
  useNotification();
  const auth = useAuth();
  if (!auth) {
    return null;
  }
  const { showOperation, showError, completeOperation, showSuccess } = useOperation();
  const changeHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormdata((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  };
  const handleSendResetEmail = async (data) => {
    var _a2;
    setWorking(true);
    showOperation("processing", "Sending reset password email");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    const email = (_a2 = auth == null ? void 0 : auth.user) == null ? void 0 : _a2.email.trim();
    const datr = {
      email
    };
    try {
      const res = await auth.resetpw(datr);
      if (JSON.stringify(res).includes("Error")) {
        setWorking(false);
        showError("Error", toSentenceCase(res));
        completeOperation();
      } else {
        showSuccess("Success", toSentenceCase(res));
        completeOperation();
        await new Promise((resolve) => setTimeout(resolve, 1e3));
        setWorking(false);
      }
    } catch (error) {
      showError("Error", "Password reset failed. Wait for a minute and retry.");
      completeOperation();
    }
  };
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: loaderData.userProfile,
    resolver: zodResolver(ResetPasswordSchema$1)
  });
  return /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit(handleSendResetEmail), children: /* @__PURE__ */ jsx("div", { className: `${formWrapperClass} mt-0  
                        rounded-lg pt-4 max-w-[500px] w-full mx-auto`, children: /* @__PURE__ */ jsxs("div", { className: inputWrapperClass, children: [
    /* @__PURE__ */ jsx("div", { className: " text-xl text-gray-700 font-semibold border-b pb-1", children: "Reset Password" }),
    /* @__PURE__ */ jsxs("div", { className: " pt-3 pb-4 text-[13px] leading-5", children: [
      /* @__PURE__ */ jsx("b", { children: (_a = loaderData.userProfile) == null ? void 0 : _a.email }),
      " is your current email. It will be used be used for password resets or changes."
    ] }),
    /* @__PURE__ */ jsx("div", { className: `mt-[20px]` }),
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "Your Email Address",
        controlPlaceholder: "Retype new password",
        controlName: "email",
        controlType: "text",
        disabled: true,
        register,
        changeHandler,
        error: errors.email
      }
    ),
    /* @__PURE__ */ jsx(Button, { working, value: "Send Reset Email" })
  ] }) }) });
};
const index$h = () => {
  useEffect(() => {
    IsAuthenticated(localStorage);
  }, []);
  const auth = useAuth();
  if (!auth) {
    return null;
  }
  const { user } = auth;
  const [userProfile, setUserProfile] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getAllData(guid) {
      const userProfileData = await getUserProfile(guid || "");
      setUserProfile(userProfileData);
    }
    try {
      if (user == null ? void 0 : user.guid) {
        getAllData(user == null ? void 0 : user.guid);
      }
    } catch (e) {
      console.log(e.message);
    }
  }, [user == null ? void 0 : user.guid]);
  useEffect(() => {
    if (userProfile) {
      const data2 = {
        userProfile
      };
      setData(data2);
    }
  }, [
    userProfile
  ]);
  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);
  if (loading) {
    return /* @__PURE__ */ jsx(LoadingMessage, { loading });
  }
  return /* @__PURE__ */ jsx(AccountLayout, { children: /* @__PURE__ */ jsxs(ProfileContentLayout, { title: "Reset Password", children: [
    userProfile === null ? "Loading..." : "",
    data && /* @__PURE__ */ jsx(ResetPasswordForm, { loaderData: data, user })
  ] }) });
};
const route22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$h
}, Symbol.toStringTag, { value: "Module" }));
const DeactivateProfilechema = z.object({
  email: z.string({ message: "Please enter an email." }).min(1, { message: "Email must not be empty" }).email({ message: "Please enter a valid email" })
});
const DeactivateProfileForm = ({ loaderData, user }) => {
  var _a, _b, _c;
  const [formdata, setFormdata] = useState(null);
  const [working, setWorking] = useState(false);
  useNotification();
  const { showOperation, showError, completeOperation, showSuccess } = useOperation();
  const changeHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormdata((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  };
  const handleDeactivateUser = async (data) => {
    var _a2;
    setWorking(true);
    let msg = "";
    if (loaderData.userProfile.active) {
      msg = "Deactivating...";
    } else {
      msg = "Activating...";
    }
    showOperation("processing", msg);
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    let guid = loaderData.userProfile.user_guid;
    const endpoint = "/api/user/activate_deactivate/" + guid;
    const url = config.BASE_URL + endpoint;
    data["active"] = ((_a2 = loaderData.userProfile) == null ? void 0 : _a2.active) ? false : true;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: headers$1,
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        let error = response.json().then((data2) => {
          showError("Error", data2.message);
          completeOperation();
        });
      } else {
        let message = Boolean(data["active"]) ? "Activated." : "Deactivated.";
        showSuccess("Success", message);
        await new Promise((resolve) => setTimeout(resolve, 1e3));
        showOperation("processing", "Refreshing...");
        await new Promise((resolve) => setTimeout(resolve, 4e3));
        window.location.reload();
        completeOperation();
      }
    } catch (error) {
      console.log(error.message);
      showError("Error", "Process not completed.");
    } finally {
      setWorking(false);
    }
  };
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: loaderData.userProfile,
    resolver: zodResolver(DeactivateProfilechema)
  });
  return /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit(handleDeactivateUser), children: /* @__PURE__ */ jsx("div", { className: `${formWrapperClass} mt-0  
                        rounded-lg pt-4 max-w-[500px] w-full mx-auto`, children: /* @__PURE__ */ jsxs("div", { className: inputWrapperClass, children: [
    /* @__PURE__ */ jsx("div", { className: " text-xl text-gray-700 font-semibold border-b pb-1", children: ((_a = loaderData.userProfile) == null ? void 0 : _a.active) ? "Deactivate User" : "Activate User" }),
    /* @__PURE__ */ jsxs("div", { className: " pt-3 pb-4 text-[13px] leading-5", children: [
      /* @__PURE__ */ jsx("b", { children: (_b = loaderData.userProfile) == null ? void 0 : _b.email }),
      " is your current email. It will be used for password resets or changes."
    ] }),
    /* @__PURE__ */ jsx("div", { className: `mt-[10px]` }),
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "Your Email Address",
        controlPlaceholder: "Retype new password",
        controlName: "email",
        controlType: "text",
        disabled: true,
        register,
        changeHandler,
        error: errors == null ? void 0 : errors.email
      }
    ),
    /* @__PURE__ */ jsx(Button, { working, value: `${((_c = loaderData.userProfile) == null ? void 0 : _c.active) ? "Deactivate" : "Activate"} Profile` })
  ] }) }) });
};
const index$g = () => {
  useEffect(() => {
    IsAuthenticated(localStorage);
  }, []);
  const auth = useAuth();
  if (!auth) {
    return null;
  }
  const { user } = auth;
  const [userProfile, setUserProfile] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getAllData(guid) {
      const userProfileData = await getUserProfile(guid || "");
      setUserProfile(userProfileData);
    }
    try {
      if (user == null ? void 0 : user.guid) {
        getAllData(user == null ? void 0 : user.guid);
      }
    } catch (e) {
      console.log(e.message);
    }
  }, [user == null ? void 0 : user.guid]);
  useEffect(() => {
    if (userProfile) {
      const data2 = {
        userProfile
      };
      setData(data2);
    }
  }, [
    userProfile
  ]);
  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);
  if (loading) {
    return /* @__PURE__ */ jsx(LoadingMessage, {});
  }
  return /* @__PURE__ */ jsx(AccountLayout, { children: /* @__PURE__ */ jsxs(ProfileContentLayout, { title: userProfile.active ? "Deactivate Profile" : "Activate Profile", children: [
    userProfile === null ? "Loading..." : "",
    data && /* @__PURE__ */ jsx(DeactivateProfileForm, { loaderData: data, user })
  ] }) });
};
const route23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$g
}, Symbol.toStringTag, { value: "Module" }));
const index$f = () => {
  return /* @__PURE__ */ jsxs(SearchLayout, { children: [
    /* @__PURE__ */ jsx("div", { className: `max-w-[1100px] mx-auto w-full mt-[30px]`, children: /* @__PURE__ */ jsxs("div", { className: `grid md:grid-cols-12 gap-4 `, children: [
      /* @__PURE__ */ jsx("div", { className: ` md:col-span-7  px-[15px]`, children: /* @__PURE__ */ jsx(InfoTerms, {}) }),
      /* @__PURE__ */ jsx("div", { className: `md:col-span-5` })
    ] }) }),
    /* @__PURE__ */ jsx(VerticalHeight, {}),
    /* @__PURE__ */ jsx(FooterAlt, {})
  ] });
};
const InfoTerms = () => {
  return /* @__PURE__ */ jsxs("div", { className: `markdown prose dark:prose-invert w-full break-words light space-y-4`, children: [
    /* @__PURE__ */ jsx("h2", { "data-start": "208", "data-end": "235", className: `text-xl`, children: /* @__PURE__ */ jsx(
      "strong",
      {
        "data-start": "211",
        "data-end": "235",
        className: `text-2xl`,
        children: "Terms and Conditions"
      }
    ) }),
    /* @__PURE__ */ jsxs("p", { "data-start": "237", "data-end": "270", children: [
      /* @__PURE__ */ jsx("strong", { "data-start": "237", "data-end": "256", children: "Effective Date:" }),
      " 12 July 2025"
    ] }),
    /* @__PURE__ */ jsxs("p", { "data-start": "272", "data-end": "485", children: [
      "Welcome to ",
      /* @__PURE__ */ jsx("strong", { "data-start": "283", "data-end": "302", children: "Garssete" }),
      ". We're glad to have you here! To ensure a safe and positive experience for everyone, we kindly ask that you review the terms below. By using our platform, you agree to the following:"
    ] }),
    /* @__PURE__ */ jsx("hr", { "data-start": "487", "data-end": "490" }),
    /* @__PURE__ */ jsx("h3", { "data-start": "492", "data-end": "522", children: /* @__PURE__ */ jsx("strong", { "data-start": "496", "data-end": "522", children: "1. Acceptance of Terms" }) }),
    /* @__PURE__ */ jsx("p", { "data-start": "523", "data-end": "707", children: "By accessing or using our platform, including browsing, registering, or listing a business, you confirm that you understand and agree to be bound by these Terms and our Privacy Policy." }),
    /* @__PURE__ */ jsx("hr", { "data-start": "709", "data-end": "712" }),
    /* @__PURE__ */ jsx("h3", { "data-start": "714", "data-end": "738", children: /* @__PURE__ */ jsx("strong", { "data-start": "718", "data-end": "738", children: "2. User Accounts" }) }),
    /* @__PURE__ */ jsx("p", { "data-start": "739", "data-end": "965", children: "When creating an account, we kindly ask that you provide accurate and up-to-date information. You are responsible for maintaining the confidentiality of your account details and for any activity that occurs under your account." }),
    /* @__PURE__ */ jsx("hr", { "data-start": "967", "data-end": "970" }),
    /* @__PURE__ */ jsx("h3", { "data-start": "972", "data-end": "1000", children: /* @__PURE__ */ jsx("strong", { "data-start": "976", "data-end": "1000", children: "3. Business Listings" }) }),
    /* @__PURE__ */ jsx("p", { "data-start": "1001", "data-end": "1086", children: "We welcome listings from all legitimate businesses. To help ensure quality and trust:" }),
    /* @__PURE__ */ jsxs("ul", { "data-start": "1088", "data-end": "1336", children: [
      /* @__PURE__ */ jsx("li", { "data-start": "1088", "data-end": "1145", children: /* @__PURE__ */ jsx("p", { "data-start": "1090", "data-end": "1145", children: "Please make sure your listings are truthful and lawful." }) }),
      /* @__PURE__ */ jsx("li", { "data-start": "1146", "data-end": "1247", children: /* @__PURE__ */ jsx("p", { "data-start": "1148", "data-end": "1247", children: "We may review and, if necessary, edit or remove any content that appears to violate our guidelines." }) }),
      /* @__PURE__ */ jsx("li", { "data-start": "1248", "data-end": "1336", children: /* @__PURE__ */ jsx("p", { "data-start": "1250", "data-end": "1336", children: "We appreciate your help in keeping our directory useful and trustworthy for all users." }) })
    ] }),
    /* @__PURE__ */ jsx("hr", { "data-start": "1338", "data-end": "1341" }),
    /* @__PURE__ */ jsx("h3", { "data-start": "1343", "data-end": "1366", children: /* @__PURE__ */ jsx("strong", { "data-start": "1347", "data-end": "1366", children: "4. User Conduct" }) }),
    /* @__PURE__ */ jsx("p", { "data-start": "1367", "data-end": "1431", children: "We ask all users to be respectful and responsible. Please avoid:" }),
    /* @__PURE__ */ jsxs("ul", { "data-start": "1433", "data-end": "1634", children: [
      /* @__PURE__ */ jsx("li", { "data-start": "1433", "data-end": "1495", children: /* @__PURE__ */ jsx("p", { "data-start": "1435", "data-end": "1495", children: "Uploading content that is harmful, misleading, or offensive." }) }),
      /* @__PURE__ */ jsx("li", { "data-start": "1496", "data-end": "1555", children: /* @__PURE__ */ jsx("p", { "data-start": "1498", "data-end": "1555", children: "Engaging in spam, impersonation, or any illegal activity." }) }),
      /* @__PURE__ */ jsx("li", { "data-start": "1556", "data-end": "1634", children: /* @__PURE__ */ jsx("p", { "data-start": "1558", "data-end": "1634", children: "Misusing the platform in any way that could affect the experience of others." }) })
    ] }),
    /* @__PURE__ */ jsx("hr", { "data-start": "1636", "data-end": "1639" }),
    /* @__PURE__ */ jsx("h3", { "data-start": "1641", "data-end": "1673", children: /* @__PURE__ */ jsx("strong", { "data-start": "1645", "data-end": "1673", children: "5. Intellectual Property" }) }),
    /* @__PURE__ */ jsx("p", { "data-start": "1674", "data-end": "1874", children: "All content, including our logo, platform design, and written materials, is the property of [Your Company Name] or its partners. Please don’t reproduce, copy, or use it without our written permission." }),
    /* @__PURE__ */ jsx("hr", { "data-start": "1876", "data-end": "1879" }),
    /* @__PURE__ */ jsx("h3", { "data-start": "1881", "data-end": "1903", children: /* @__PURE__ */ jsx("strong", { "data-start": "1885", "data-end": "1903", children: "6. Disclaimers" }) }),
    /* @__PURE__ */ jsx("p", { "data-start": "1904", "data-end": "2120", children: "While we strive to provide accurate and helpful information, we cannot guarantee the completeness or reliability of every business listing. We encourage users to independently verify business details before engaging." }),
    /* @__PURE__ */ jsx("hr", { "data-start": "2122", "data-end": "2125" }),
    /* @__PURE__ */ jsx("h3", { "data-start": "2127", "data-end": "2153", children: /* @__PURE__ */ jsx("strong", { "data-start": "2131", "data-end": "2153", children: "7. Indemnification" }) }),
    /* @__PURE__ */ jsx("p", { "data-start": "2154", "data-end": "2362", children: "By using our platform, you agree to kindly hold harmless and indemnify [Your Company Name], our team, and partners from any claims, damages, losses, or expenses (including reasonable legal fees) arising from:" }),
    /* @__PURE__ */ jsxs("ul", { "data-start": "2364", "data-end": "2490", children: [
      /* @__PURE__ */ jsx("li", { "data-start": "2364", "data-end": "2393", children: /* @__PURE__ */ jsx("p", { "data-start": "2366", "data-end": "2393", children: "Your use of the platform," }) }),
      /* @__PURE__ */ jsx("li", { "data-start": "2394", "data-end": "2427", children: /* @__PURE__ */ jsx("p", { "data-start": "2396", "data-end": "2427", children: "Any violation of these Terms," }) }),
      /* @__PURE__ */ jsx("li", { "data-start": "2428", "data-end": "2490", children: /* @__PURE__ */ jsx("p", { "data-start": "2430", "data-end": "2490", children: "Any third-party rights infringed by your content or conduct" }) })
    ] }),
    /* @__PURE__ */ jsx("p", { "data-start": "2492", "data-end": "2581", children: "We hope this clause never becomes relevant, but it's important for everyone’s protection." }),
    /* @__PURE__ */ jsx("hr", { "data-start": "2583", "data-end": "2586" }),
    /* @__PURE__ */ jsx("h3", { "data-start": "2588", "data-end": "2622", children: /* @__PURE__ */ jsx("strong", { "data-start": "2592", "data-end": "2622", children: "8. Limitation of Liability" }) }),
    /* @__PURE__ */ jsx("p", { "data-start": "2623", "data-end": "2808", children: "While we do our best to provide a reliable service, [Your Company Name] cannot be held liable for any direct or indirect damages resulting from the use or inability to use our platform." }),
    /* @__PURE__ */ jsx("hr", { "data-start": "2810", "data-end": "2813" }),
    /* @__PURE__ */ jsx("h3", { "data-start": "2815", "data-end": "2842", children: /* @__PURE__ */ jsx("strong", { "data-start": "2819", "data-end": "2842", children: "9. Updates to Terms" }) }),
    /* @__PURE__ */ jsx("p", { "data-start": "2843", "data-end": "3057", children: "From time to time, we may update these Terms to reflect changes to our services or policies. We'll do our best to communicate these changes clearly. Continued use of the platform means you accept the revised Terms." }),
    /* @__PURE__ */ jsx("hr", { "data-start": "3059", "data-end": "3062" }),
    /* @__PURE__ */ jsx("h3", { "data-start": "3064", "data-end": "3089", children: /* @__PURE__ */ jsx("strong", { "data-start": "3068", "data-end": "3089", children: "10. Governing Law" }) }),
    /* @__PURE__ */ jsx("p", { "data-start": "3090", "data-end": "3181", children: "These Terms shall be governed by and interpreted under the laws of [Your Country or State]." }),
    /* @__PURE__ */ jsx("hr", { "data-start": "3183", "data-end": "3186" }),
    /* @__PURE__ */ jsxs("p", { "data-start": "3188", "data-end": "3318", children: [
      "If you have any questions or suggestions about these Terms, we’d love to hear from you at ",
      /* @__PURE__ */ jsx("a", { href: "mailto:support@garssete.com", className: "text-blue-600", children: "support@garssete.com" }),
      ". Thank you for being part of our community!"
    ] }),
    /* @__PURE__ */ jsx("hr", { "data-start": "3320", "data-end": "3323" })
  ] });
};
const route24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  InfoTerms,
  default: index$f
}, Symbol.toStringTag, { value: "Module" }));
const index$e = () => {
  return /* @__PURE__ */ jsxs(SearchLayout, { children: [
    /* @__PURE__ */ jsx("div", { className: `max-w-[1100px] mx-auto w-full mt-[30px]`, children: /* @__PURE__ */ jsxs("div", { className: `grid md:grid-cols-12 gap-4 `, children: [
      /* @__PURE__ */ jsx("div", { className: ` md:col-span-7  px-[15px]`, children: /* @__PURE__ */ jsx(InfoPrivacy, {}) }),
      /* @__PURE__ */ jsx("div", { className: `md:col-span-5` })
    ] }) }),
    /* @__PURE__ */ jsx(VerticalHeight, {}),
    /* @__PURE__ */ jsx(FooterAlt, {})
  ] });
};
const InfoPrivacy = () => {
  return /* @__PURE__ */ jsxs("div", { className: `markdown prose dark:prose-invert w-full break-words light space-y-4`, children: [
    /* @__PURE__ */ jsx("h2", { "data-start": "193", "data-end": "214", className: `text-xl`, children: /* @__PURE__ */ jsx(
      "strong",
      {
        "data-start": "196",
        "data-end": "214",
        className: `text-2xl`,
        children: "Privacy Policy"
      }
    ) }),
    /* @__PURE__ */ jsxs("p", { "data-start": "216", "data-end": "249", children: [
      /* @__PURE__ */ jsx("strong", { "data-start": "216", "data-end": "235", children: "Effective Date:" }),
      " 23 Jul 2025"
    ] }),
    /* @__PURE__ */ jsxs("p", { "data-start": "251", "data-end": "429", children: [
      "Thank you for trusting ",
      /* @__PURE__ */ jsx("strong", { "data-start": "274", "data-end": "293", children: "Garssete" }),
      " with your information. Your privacy is important to us, and we’re committed to handling your data with care, respect, and transparency."
    ] }),
    /* @__PURE__ */ jsx("hr", { "data-start": "431", "data-end": "434" }),
    /* @__PURE__ */ jsx("h3", { "data-start": "436", "data-end": "469", children: /* @__PURE__ */ jsx("strong", { "data-start": "440", "data-end": "469", children: "1. Information We Collect" }) }),
    /* @__PURE__ */ jsx("p", { "data-start": "471", "data-end": "538", children: "We may collect the following information when you use our platform:" }),
    /* @__PURE__ */ jsxs("ul", { "data-start": "540", "data-end": "884", children: [
      /* @__PURE__ */ jsx("li", { "data-start": "540", "data-end": "615", children: /* @__PURE__ */ jsxs("p", { "data-start": "542", "data-end": "615", children: [
        /* @__PURE__ */ jsx("strong", { "data-start": "542", "data-end": "562", children: "Personal Details" }),
        ": such as your name, email address, and contact info."
      ] }) }),
      /* @__PURE__ */ jsx("li", { "data-start": "616", "data-end": "700", children: /* @__PURE__ */ jsxs("p", { "data-start": "618", "data-end": "700", children: [
        /* @__PURE__ */ jsx("strong", { "data-start": "618", "data-end": "642", children: "Business Information" }),
        ": details you provide when listing or managing a business."
      ] }) }),
      /* @__PURE__ */ jsx("li", { "data-start": "701", "data-end": "802", children: /* @__PURE__ */ jsxs("p", { "data-start": "703", "data-end": "802", children: [
        /* @__PURE__ */ jsx("strong", { "data-start": "703", "data-end": "717", children: "Usage Data" }),
        ": information about how you interact with our platform (e.g., pages visited, clicks)."
      ] }) }),
      /* @__PURE__ */ jsx("li", { "data-start": "803", "data-end": "884", children: /* @__PURE__ */ jsxs("p", { "data-start": "805", "data-end": "884", children: [
        /* @__PURE__ */ jsx("strong", { "data-start": "805", "data-end": "823", children: "Technical Data" }),
        ": like your IP address, browser type, and device information."
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("hr", { "data-start": "886", "data-end": "889" }),
    /* @__PURE__ */ jsx("h3", { "data-start": "891", "data-end": "929", children: /* @__PURE__ */ jsx("strong", { "data-start": "895", "data-end": "929", children: "2. How We Use Your Information" }) }),
    /* @__PURE__ */ jsx("p", { "data-start": "931", "data-end": "958", children: "We use your information to:" }),
    /* @__PURE__ */ jsxs("ul", { "data-start": "960", "data-end": "1182", className: `pl-2`, children: [
      /* @__PURE__ */ jsx("li", { "data-start": "960", "data-end": "997", children: /* @__PURE__ */ jsx("p", { "data-start": "962", "data-end": "997", children: "- Provide and maintain our services" }) }),
      /* @__PURE__ */ jsx("li", { "data-start": "998", "data-end": "1045", children: /* @__PURE__ */ jsx("p", { "data-start": "1000", "data-end": "1045", children: "- Process business listings and user accounts" }) }),
      /* @__PURE__ */ jsx("li", { "data-start": "1046", "data-end": "1102", children: /* @__PURE__ */ jsx("p", { "data-start": "1048", "data-end": "1102", children: "- Communicate with you (updates, support, newsletters)" }) }),
      /* @__PURE__ */ jsx("li", { "data-start": "1103", "data-end": "1147", children: /* @__PURE__ */ jsx("p", { "data-start": "1105", "data-end": "1147", children: "- Improve our platform and user experience" }) }),
      /* @__PURE__ */ jsx("li", { "data-start": "1148", "data-end": "1182", children: /* @__PURE__ */ jsx("p", { "data-start": "1150", "data-end": "1182", children: "- Comply with legal requirements" }) })
    ] }),
    /* @__PURE__ */ jsx("p", { "data-start": "1184", "data-end": "1213", children: "We will never sell your data." }),
    /* @__PURE__ */ jsx("hr", { "data-start": "1215", "data-end": "1218" }),
    /* @__PURE__ */ jsx("h3", { "data-start": "1220", "data-end": "1264", children: /* @__PURE__ */ jsx("strong", { "data-start": "1224", "data-end": "1264", children: "3. Cookies and Tracking Technologies" }) }),
    /* @__PURE__ */ jsx("p", { "data-start": "1266", "data-end": "1313", children: "We may use cookies and similar technologies to:" }),
    /* @__PURE__ */ jsxs("ul", { "data-start": "1315", "data-end": "1409", children: [
      /* @__PURE__ */ jsx("li", { "data-start": "1315", "data-end": "1337", children: /* @__PURE__ */ jsx("p", { "data-start": "1317", "data-end": "1337", children: "- Keep you logged in" }) }),
      /* @__PURE__ */ jsx("li", { "data-start": "1338", "data-end": "1367", children: /* @__PURE__ */ jsx("p", { "data-start": "1340", "data-end": "1367", children: "- Understand usage patterns" }) }),
      /* @__PURE__ */ jsx("li", { "data-start": "1368", "data-end": "1409", children: /* @__PURE__ */ jsx("p", { "data-start": "1370", "data-end": "1409", children: "- Improve functionality and performance" }) })
    ] }),
    /* @__PURE__ */ jsx("p", { "data-start": "1411", "data-end": "1476", children: "You can control cookie settings through your browser preferences." }),
    /* @__PURE__ */ jsx("hr", { "data-start": "1478", "data-end": "1481" }),
    /* @__PURE__ */ jsx("h3", { "data-start": "1483", "data-end": "1518", children: /* @__PURE__ */ jsx("strong", { "data-start": "1487", "data-end": "1518", children: "4. Sharing Your Information" }) }),
    /* @__PURE__ */ jsx("p", { "data-start": "1520", "data-end": "1570", children: "We may share your information only when necessary:" }),
    /* @__PURE__ */ jsxs("ul", { "data-start": "1572", "data-end": "1733", children: [
      /* @__PURE__ */ jsx("li", { "data-start": "1572", "data-end": "1639", children: /* @__PURE__ */ jsx("p", { "data-start": "1574", "data-end": "1639", children: "- With trusted service providers who help us operate our platform" }) }),
      /* @__PURE__ */ jsx("li", { "data-start": "1640", "data-end": "1676", children: /* @__PURE__ */ jsx("p", { "data-start": "1642", "data-end": "1676", children: "- To comply with legal obligations" }) }),
      /* @__PURE__ */ jsx("li", { "data-start": "1677", "data-end": "1733", children: /* @__PURE__ */ jsx("p", { "data-start": "1679", "data-end": "1733", children: "- If required to prevent fraud or protect our platform" }) })
    ] }),
    /* @__PURE__ */ jsx("p", { "data-start": "1735", "data-end": "1806", children: "We never share your data for advertising or marketing by third parties." }),
    /* @__PURE__ */ jsx("hr", { "data-start": "1808", "data-end": "1811" }),
    /* @__PURE__ */ jsx("h3", { "data-start": "1813", "data-end": "1838", children: /* @__PURE__ */ jsx("strong", { "data-start": "1817", "data-end": "1838", children: "5. Data Retention" }) }),
    /* @__PURE__ */ jsx("p", { "data-start": "1840", "data-end": "1897", children: "We retain your information only for as long as necessary:" }),
    /* @__PURE__ */ jsxs("ul", { "data-start": "1899", "data-end": "2033", children: [
      /* @__PURE__ */ jsx("li", { "data-start": "1899", "data-end": "1935", children: /* @__PURE__ */ jsx("p", { "data-start": "1901", "data-end": "1935", children: "- To provide you with our services" }) }),
      /* @__PURE__ */ jsx("li", { "data-start": "1936", "data-end": "1982", children: /* @__PURE__ */ jsx("p", { "data-start": "1938", "data-end": "1982", children: "- To fulfill legal or regulatory obligations" }) }),
      /* @__PURE__ */ jsx("li", { "data-start": "1983", "data-end": "2033", children: /* @__PURE__ */ jsx("p", { "data-start": "1985", "data-end": "2033", children: "- To resolve disputes and enforce our agreements" }) })
    ] }),
    /* @__PURE__ */ jsx("p", { "data-start": "2035", "data-end": "2080", children: "You may request account deletion at any time." }),
    /* @__PURE__ */ jsx("hr", { "data-start": "2082", "data-end": "2085" }),
    /* @__PURE__ */ jsx("h3", { "data-start": "2087", "data-end": "2109", children: /* @__PURE__ */ jsx("strong", { "data-start": "2091", "data-end": "2109", children: "6. Your Rights" }) }),
    /* @__PURE__ */ jsx("p", { "data-start": "2111", "data-end": "2133", children: "You have the right to:" }),
    /* @__PURE__ */ jsxs("ul", { "data-start": "2135", "data-end": "2326", children: [
      /* @__PURE__ */ jsx("li", { "data-start": "2135", "data-end": "2191", children: /* @__PURE__ */ jsx("p", { "data-start": "2137", "data-end": "2191", children: "- Access, correct, or delete your personal information" }) }),
      /* @__PURE__ */ jsx("li", { "data-start": "2192", "data-end": "2246", children: /* @__PURE__ */ jsx("p", { "data-start": "2194", "data-end": "2246", children: "- Withdraw consent for non-essential data processing" }) }),
      /* @__PURE__ */ jsx("li", { "data-start": "2247", "data-end": "2278", children: /* @__PURE__ */ jsx("p", { "data-start": "2249", "data-end": "2278", children: "- Request a copy of your data" }) }),
      /* @__PURE__ */ jsx("li", { "data-start": "2279", "data-end": "2326", children: /* @__PURE__ */ jsx("p", { "data-start": "2281", "data-end": "2326", children: "Contact us with any privacy-related questions" }) })
    ] }),
    /* @__PURE__ */ jsxs("p", { "data-start": "2328", "data-end": "2401", children: [
      "To make a request, please reach out to us at ",
      /* @__PURE__ */ jsx("strong", { "data-start": "2373", "data-end": "2400", children: "support@garssete.com" }),
      "."
    ] }),
    /* @__PURE__ */ jsx("hr", { "data-start": "2403", "data-end": "2406" }),
    /* @__PURE__ */ jsx("h3", { "data-start": "2408", "data-end": "2427", children: /* @__PURE__ */ jsx("strong", { "data-start": "2412", "data-end": "2427", children: "7. Security" }) }),
    /* @__PURE__ */ jsx("p", { "data-start": "2429", "data-end": "2648", children: "We take your privacy seriously and have implemented appropriate security measures to protect your data. However, no system is 100% secure, and we encourage you to use strong passwords and protect your login credentials." }),
    /* @__PURE__ */ jsx("hr", { "data-start": "2650", "data-end": "2653" }),
    /* @__PURE__ */ jsx("h3", { "data-start": "2655", "data-end": "2684", children: /* @__PURE__ */ jsx("strong", { "data-start": "2659", "data-end": "2684", children: "8. Children's Privacy" }) }),
    /* @__PURE__ */ jsx("p", { "data-start": "2686", "data-end": "2917", children: "Our platform is intended for users aged 18 and above. We do not knowingly collect personal data from children under 13. If you believe a child has provided us with personal data, please contact us so we can take appropriate action." }),
    /* @__PURE__ */ jsx("hr", { "data-start": "2919", "data-end": "2922" }),
    /* @__PURE__ */ jsx("h3", { "data-start": "2924", "data-end": "2957", children: /* @__PURE__ */ jsx("strong", { "data-start": "2928", "data-end": "2957", children: "9. Changes to This Policy" }) }),
    /* @__PURE__ */ jsx("p", { "data-start": "2959", "data-end": "3174", children: "We may update this Privacy Policy from time to time to reflect changes to our practices or legal requirements. We'll notify users of significant changes, and the updated version will always be available on our site." }),
    /* @__PURE__ */ jsx("hr", { "data-start": "3176", "data-end": "3179" }),
    /* @__PURE__ */ jsx("h3", { "data-start": "3181", "data-end": "3203", children: /* @__PURE__ */ jsx("strong", { "data-start": "3185", "data-end": "3203", children: "10. Contact Us" }) }),
    /* @__PURE__ */ jsx("p", { "data-start": "3205", "data-end": "3294", children: "If you have any questions or concerns about this Privacy Policy, feel free to contact us:" }),
    /* @__PURE__ */ jsxs("p", { "data-start": "3296", "data-end": "3371", children: [
      /* @__PURE__ */ jsx("strong", { "data-start": "3299", "data-end": "3309", children: "Email:" }),
      " ",
      /* @__PURE__ */ jsx("a", { href: "mailto:support@garssete.com", children: "support@garssete.com" }),
      /* @__PURE__ */ jsx("br", { "data-start": "3331", "data-end": "3334" }),
      "🌐 ",
      /* @__PURE__ */ jsx("strong", { "data-start": "3337", "data-end": "3349", children: "Website:" }),
      " ",
      /* @__PURE__ */ jsx("a", { href: "garssete.com/contact", children: "garssete.com/contact" })
    ] }),
    /* @__PURE__ */ jsx("hr", { "data-start": "3373", "data-end": "3376" }),
    /* @__PURE__ */ jsxs("p", { "data-start": "3378", "data-end": "3557", "data-is-last-node": "", "data-is-only-node": "", children: [
      "Would you like me to turn this into a downloadable ",
      /* @__PURE__ */ jsx("code", { "data-start": "3429", "data-end": "3435", children: ".txt" }),
      " or ",
      /* @__PURE__ */ jsx("code", { "data-start": "3439", "data-end": "3444", children: ".md" }),
      " file? Or generate a version for Nigerian data compliance (NDPR) or GDPR if you’re targeting international users?"
    ] })
  ] });
};
const route25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  InfoPrivacy,
  default: index$e
}, Symbol.toStringTag, { value: "Module" }));
const index$d = () => {
  return /* @__PURE__ */ jsxs(SearchLayout, { children: [
    /* @__PURE__ */ jsx("div", { className: `max-w-[1100px] mx-auto w-full mt-[30px]`, children: /* @__PURE__ */ jsxs("div", { className: `grid md:grid-cols-12 gap-4 `, children: [
      /* @__PURE__ */ jsx("div", { className: ` md:col-span-7  px-[15px]`, children: /* @__PURE__ */ jsx(InfoContact, {}) }),
      /* @__PURE__ */ jsx("div", { className: `md:col-span-5 w-full` })
    ] }) }),
    /* @__PURE__ */ jsx(VerticalHeight, {}),
    /* @__PURE__ */ jsx(VerticalHeight, {}),
    /* @__PURE__ */ jsx(VerticalHeight, {}),
    /* @__PURE__ */ jsx(FooterAlt, {})
  ] });
};
const InfoContact = () => {
  return /* @__PURE__ */ jsxs("div", { className: `markdown prose dark:prose-invert w-full break-words light space-y-4 text-[13px]`, children: [
    /* @__PURE__ */ jsx("h2", { "data-start": "208", "data-end": "235", className: `text-xl`, children: /* @__PURE__ */ jsx(
      "strong",
      {
        "data-start": "211",
        "data-end": "235",
        className: `text-2xl`,
        children: "Contact Us"
      }
    ) }),
    /* @__PURE__ */ jsxs("p", { "data-start": "272", "data-end": "485", children: [
      /* @__PURE__ */ jsx("strong", { "data-start": "283", "data-end": "302", children: "Garssete.com" }),
      " Support and Technical team are  available Monday to Sunday, 09:00 to 18:00 Central European Time."
    ] }),
    /* @__PURE__ */ jsx("hr", { "data-start": "487", "data-end": "490" }),
    /* @__PURE__ */ jsx("p", { className: `text-lg underline`, children: "Garssete Support" }),
    /* @__PURE__ */ jsx("ul", { children: /* @__PURE__ */ jsxs("li", { className: `flex gap-4`, children: [
      /* @__PURE__ */ jsx("span", { className: `font-bold`, children: "Email:" }),
      /* @__PURE__ */ jsx("span", { children: "support@garssete.com" })
    ] }) }),
    /* @__PURE__ */ jsx("hr", {}),
    /* @__PURE__ */ jsx("h3", { children: /* @__PURE__ */ jsx(
      "span",
      {
        className: `text-xl text-blue-500 `,
        children: "Claim Your Business"
      }
    ) }),
    /* @__PURE__ */ jsxs("p", { className: ``, children: [
      "To claim your business, please sign up and then send an email to ",
      /* @__PURE__ */ jsx("span", { children: "support@garssete.com" }),
      "."
    ] })
  ] });
};
const route26 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  InfoContact,
  default: index$d
}, Symbol.toStringTag, { value: "Module" }));
const SearchAd = () => {
  const [adsLoaded, setAdsLoaded] = useState(false);
  useEffect(() => {
  }, []);
  {
    return null;
  }
};
const FormattedAddress = ({ listing }) => {
  return /* @__PURE__ */ jsxs("div", { className: `leading-[1.3em] `, children: [
    (listing == null ? void 0 : listing.address_one) ? (listing == null ? void 0 : listing.address_one) + ", " : "",
    (listing == null ? void 0 : listing.state_code) ? (listing == null ? void 0 : listing.state_name) + ", " : "",
    (listing == null ? void 0 : listing.country_code) ? listing == null ? void 0 : listing.country_code : ""
  ] });
};
const CardexCopy = ({ listing, index: index2 }) => {
  var _a;
  const [baseListing, setBaseListing] = useState(null);
  const [imgsrc, setImgsrc] = useState("");
  const [bgimgsrc, setBgimgsrc] = useState("");
  const [socialMedia, setSocialMedia] = useState(null);
  const [facilityFeatures2, setFacilityFeatures] = useState(null);
  const [userId, setUserId] = useState("");
  useEffect(() => {
    if (baseListing) {
      if ((baseListing == null ? void 0 : baseListing.image_url) !== "" && (baseListing == null ? void 0 : baseListing.image_url) !== null && (baseListing == null ? void 0 : baseListing.image_url) !== void 0) ;
      if ((baseListing == null ? void 0 : baseListing.bg_image_url) !== "" && (baseListing == null ? void 0 : baseListing.bg_image_url) !== null && (baseListing == null ? void 0 : baseListing.bg_image_url) !== void 0) {
        setBgimgsrc(config.IMG_BASE_URL + (baseListing == null ? void 0 : baseListing.bg_image_url));
      }
      if ((baseListing == null ? void 0 : baseListing.username) !== "" && (baseListing == null ? void 0 : baseListing.username) !== null && (baseListing == null ? void 0 : baseListing.username) !== void 0) {
        setUserId(baseListing == null ? void 0 : baseListing.username);
      } else {
        setUserId(baseListing == null ? void 0 : baseListing.gid);
      }
    }
  }, [baseListing]);
  useEffect(() => {
    if (listing) {
      const baseListing2 = listing;
      setBaseListing(baseListing2);
      setImgsrc(config.IMG_BASE_URL + (baseListing2 == null ? void 0 : baseListing2.image_url));
    }
  }, [listing]);
  useEffect(() => {
    if (baseListing == null ? void 0 : baseListing.facility_features) {
      let facilityFeatures22 = [];
      const separatedFeatures = strToList(baseListing == null ? void 0 : baseListing.facility_features, "&");
      if (separatedFeatures !== null) {
        separatedFeatures == null ? void 0 : separatedFeatures.map((featureString, index22) => {
          const featureInfo = strToList(featureString, "$");
          const featureObject = {
            featureId: featureInfo[0],
            userDescription: featureInfo[1]
          };
          facilityFeatures22.push(featureObject);
        });
      }
      const mappedFacilityFeatures = searchFacilities(facilityFeatures22);
      console.log(mappedFacilityFeatures);
      setFacilityFeatures(mappedFacilityFeatures);
    }
  }, [baseListing]);
  useEffect(() => {
    if (baseListing == null ? void 0 : baseListing.social_media) {
      let socialMedia2 = [];
      const separatedMedia = strToList(baseListing == null ? void 0 : baseListing.social_media, ",");
      if (separatedMedia !== null) {
        separatedMedia == null ? void 0 : separatedMedia.map((mediaString, index22) => {
          const mediaInfo = strToList(mediaString, "$");
          const mediaObj = {
            mediaName: mediaInfo[0],
            mediaHandle: mediaInfo[1],
            baseUrl: mediaInfo[2]
          };
          socialMedia2.push(mediaObj);
        });
      }
      setSocialMedia(socialMedia2);
    }
  }, [baseListing]);
  return /* @__PURE__ */ jsxs("div", { className: `border py-3 px-3 hover:shadow-md hover:shadow-gray-200`, children: [
    /* @__PURE__ */ jsxs("div", { className: `flex gap-2`, children: [
      /* @__PURE__ */ jsx("div", { className: `w-[90px] min-w-[90px] h-[90px] relative`, children: /* @__PURE__ */ jsx(
        "img",
        {
          src: imgsrc,
          alt: "",
          className: ` object-cover w-full h-full border`
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: `flex place-content-between w-full`, children: [
        /* @__PURE__ */ jsxs("div", { className: `w-full  block`, children: [
          /* @__PURE__ */ jsx("div", { className: `text-xl font-normal text-blue-700`, children: /* @__PURE__ */ jsx("a", { href: `/${userId}`, children: baseListing == null ? void 0 : baseListing.title }) }),
          /* @__PURE__ */ jsx("div", { className: ` mt-2 font-bold md:hidden`, children: baseListing == null ? void 0 : baseListing.phone }),
          /* @__PURE__ */ jsx("div", { className: `mt-2 md:hidden`, children: /* @__PURE__ */ jsx(FormattedAddress, { listing: baseListing }) }),
          (baseListing == null ? void 0 : baseListing.category) !== null && (baseListing == null ? void 0 : baseListing.category) !== "" && /* @__PURE__ */ jsx("div", { className: `text-[14px] mt-2`, children: (_a = searchCategories((baseListing == null ? void 0 : baseListing.category) || "")) == null ? void 0 : _a.name }),
          (baseListing == null ? void 0 : baseListing.average_rating) !== null && (baseListing == null ? void 0 : baseListing.average_rating) !== "" ? /* @__PURE__ */ jsxs("div", { className: `mt-2 flex gap-2 place-items-center`, children: [
            /* @__PURE__ */ jsx(RatingBoxRounded, { rating: Number(baseListing == null ? void 0 : baseListing.average_rating) }),
            /* @__PURE__ */ jsx(RatingCount, { averageRating: baseListing == null ? void 0 : baseListing.average_rating })
          ] }) : /* @__PURE__ */ jsxs("div", { className: `mt-2 flex gap-2 place-items-center`, children: [
            /* @__PURE__ */ jsx(RatingBoxRounded, { rating: Number(3) }),
            /* @__PURE__ */ jsx(RatingCount, { averageRating: 3 })
          ] }),
          (baseListing == null ? void 0 : baseListing.website) && /* @__PURE__ */ jsx("div", { className: `mt-2`, children: /* @__PURE__ */ jsx(
            "a",
            {
              href: baseListing == null ? void 0 : baseListing.website,
              className: `text-blue-700`,
              children: "Website"
            }
          ) }),
          socialMedia !== null && /* @__PURE__ */ jsx("div", { className: `mt-4 flex place-items-center gap-4`, children: socialMedia == null ? void 0 : socialMedia.map((media, index22) => {
            return /* @__PURE__ */ jsx("a", { href: `${media == null ? void 0 : media.baseUrl}${media == null ? void 0 : media.mediaHandle}`, children: getCardIcon(media == null ? void 0 : media.mediaName) }, index22);
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `w-[200px] hidden md:block `, children: [
          /* @__PURE__ */ jsx("div", { className: ` text-end font-bold`, children: baseListing == null ? void 0 : baseListing.phone }),
          /* @__PURE__ */ jsx("div", { className: ` text-end `, children: /* @__PURE__ */ jsx(FormattedAddress, { listing: baseListing }) })
        ] })
      ] })
    ] }),
    facilityFeatures2 !== null && /* @__PURE__ */ jsxs("div", { className: `mt-6 flex place-items-center gap-8 w-full relative`, children: [
      /* @__PURE__ */ jsx("span", { className: `text-[15px]`, children: "Facilities: " }),
      /* @__PURE__ */ jsx("div", { className: `flex place-items-center gap-3 flex-wrap `, children: facilityFeatures2 == null ? void 0 : facilityFeatures2.map((feature, index22) => {
        return /* @__PURE__ */ jsx(
          "a",
          {
            href: "",
            className: `text-[17px] block`,
            children: /* @__PURE__ */ jsx(
              Tooltip,
              {
                href: "#",
                tooltip: `${feature == null ? void 0 : feature.name}: ${(feature == null ? void 0 : feature.userDescription) || ""}`,
                children: feature == null ? void 0 : feature.icon
              }
            )
          },
          index22
        );
      }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: ` mt-4`, children: (baseListing == null ? void 0 : baseListing.short_description) && /* @__PURE__ */ jsx("div", { className: `line-clamp-2 mt-2 text-[13px]`, children: baseListing == null ? void 0 : baseListing.short_description }) }),
    /* @__PURE__ */ jsx("div", { className: `mt-8 max-w-[100%] md:max-w-[50%] w-full`, children: /* @__PURE__ */ jsxs("div", { className: ` grid grid-cols-2 gap-2 w-full`, children: [
      /* @__PURE__ */ jsx("div", { className: `w-full`, children: /* @__PURE__ */ jsx("button", { className: `border border-blue-400 py-[5px] rounded px-2 font-semibold w-full`, children: "Go to map" }) }),
      /* @__PURE__ */ jsx("div", { children: (baseListing == null ? void 0 : baseListing.phone) && /* @__PURE__ */ jsxs("button", { className: `bg-blue-700 rounded w-full text-white flex place-items-center place-content-center text-[15px] gap-2 py-[5px]`, children: [
        /* @__PURE__ */ jsx(BiPhone, { size: 20, className: `mt-[2px]` }),
        /* @__PURE__ */ jsx("span", { children: "Call" })
      ] }) })
    ] }) })
  ] });
};
const RatingCount = ({ averageRating }) => {
  const [avgRating, setAvgRating] = useState(0);
  useEffect(() => {
    if (averageRating !== null && averageRating !== void 0) {
      setAvgRating(averageRating);
    }
  }, [averageRating]);
  return /* @__PURE__ */ jsxs("div", { className: `text-blue-700 mt-[3px]`, children: [
    "(",
    formatNumber(Number(avgRating)),
    ")"
  ] });
};
const SearchPaginationCopy = ({
  data,
  itemsPerPage = 10,
  resetPageKey
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const updatePage = (page) => {
    setCurrentPage(page);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", String(page));
    setSearchParams(newParams);
  };
  const goToPrevious = () => {
    if (currentPage > 1) updatePage(currentPage - 1);
  };
  const goToNext = () => {
    if (currentPage < totalPages) updatePage(currentPage + 1);
  };
  useEffect(() => {
    if (resetPageKey !== void 0) {
      updatePage(1);
    }
  }, [resetPageKey]);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "space-y-6", children: currentItems == null ? void 0 : currentItems.map((item, index2) => /* @__PURE__ */ jsx("div", { children: (index2 + 1) % 2 ? /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(CardexCopy, { listing: item, index: index2 }) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(CardexCopy, { listing: item, index: index2 }),
      /* @__PURE__ */ jsx(SearchAd, {})
    ] }) }, index2)) }),
    totalPages > 1 && /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-[5px] mt-[60px]", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: goToPrevious,
          disabled: currentPage === 1,
          className: "px-[12px] py-[8px] bg-white cursor-pointer border rounded-[4px]",
          children: "Previous"
        }
      ),
      Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => updatePage(number),
          className: `px-[12px] py-[8px] cursor-pointer border rounded-[4px] ${currentPage === number ? "bg-blue-500 text-white border-blue-500" : "bg-white"}`,
          children: number
        },
        number
      )),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: goToNext,
          disabled: currentPage === totalPages,
          className: "px-[12px] py-[8px] bg-white cursor-pointer border rounded-[4px]",
          children: "Next"
        }
      )
    ] })
  ] });
};
const loader$R = async ({ request, params }) => {
  const url = new URL(request.url);
  const query2 = (url == null ? void 0 : url.searchParams.get("q")) || "";
  let data = await getSearch(query2);
  let countries = await getCountries();
  let res = {
    data,
    query: query2,
    countries
  };
  return res;
};
const db = () => {
  const res = useLoaderData();
  const [searchParams] = useSearchParams();
  const data = res.data;
  const query2 = res.query;
  const countries = res.countries;
  const [queryParam, setQueryParam] = useState(null);
  useEffect(() => {
    if (query2) {
      setQueryParam(query2);
    }
  }, [query2]);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(SrchNavbar, {}),
    /* @__PURE__ */ jsx("div", { className: `h-[140px] md:h-[80px]` }),
    /* @__PURE__ */ jsxs("div", { className: `flex place-content-between md:gap-x-8`, children: [
      /* @__PURE__ */ jsxs("div", { className: ` w-[350px] min-w-[350px] h-screen overflow-auto scrollbar-hidden sticky top-[80px] md:pr-6 hidden lg:block`, children: [
        /* @__PURE__ */ jsxs("div", { className: ``, children: [
          /* @__PURE__ */ jsx("div", { className: `mt-3 text-[17px] mb-4 font-bold ml-6`, children: "Categories" }),
          /* @__PURE__ */ jsx(Categories, {})
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `mt-5`, children: [
          /* @__PURE__ */ jsx("div", { className: `mt-3 text-[17px] mb-4 font-bold ml-6`, children: "Countries" }),
          countries && /* @__PURE__ */ jsx(Countries, { countries })
        ] }),
        /* @__PURE__ */ jsx("div", { className: ` py-4 px-4 border-t`, children: "Garssete - Business Directory Listing" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: ` flex md:place-content-between w-full md:gap-x-24 md:mr-[15px]`, children: [
        /* @__PURE__ */ jsx("div", { children: (data == null ? void 0 : data.length) > 0 ? /* @__PURE__ */ jsx(
          SearchPaginationCopy,
          {
            data,
            itemsPerPage: 20,
            resetPageKey: query2
          }
        ) : /* @__PURE__ */ jsx("div", { className: `flex place-items-center rounded
                            place-content-center p-5 border capitalize`, children: /* @__PURE__ */ jsx("span", { children: "no record" }) }) }),
        /* @__PURE__ */ jsx("div", { className: `w-[350px] min-w-[350px] h-screen  sticky top-[80px] hidden lg:block`, children: /* @__PURE__ */ jsx(Featured, {}) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(VerticalHeight, {}),
      /* @__PURE__ */ jsx(CallToActionSection, {}),
      /* @__PURE__ */ jsx(FooterSection, {})
    ] })
  ] });
};
const route27 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: db,
  loader: loader$R
}, Symbol.toStringTag, { value: "Module" }));
const ResultItem = ({ listing, index: index2 }) => {
  const [placeholder, setPlaceholder] = useState("/images/placeholder-icon.webp");
  const [imgsrc, setImgsrc] = useState("");
  function isOdd(num) {
    return num % 2 !== 0;
  }
  useEffect(() => {
    if (listing && (listing == null ? void 0 : listing.image_url) !== null) {
      let imgsrc2 = config.IMG_BASE_URL + (listing == null ? void 0 : listing.image_url);
      setImgsrc(imgsrc2);
    } else {
      setImgsrc(placeholder);
    }
  }, [listing]);
  return /* @__PURE__ */ jsx("div", { className: ` cursor-pointer my-0`, children: /* @__PURE__ */ jsxs("div", { className: `flex rounded  gap-x-2 py-2 px-1
             hover:bg-blue-50  
             ${isOdd(index2) ? "" : ""}
                `, children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `relative min-w-[46px] w-[46px] h-[45px]
                    rounded-md overflow-hidden border bg-transparent bg-cover bg-center`,
        style: { backgroundImage: `url(${placeholder})` },
        children: imgsrc !== null && /* @__PURE__ */ jsx(
          "img",
          {
            src: imgsrc,
            alt: listing.title,
            className: `object-cover w-full h-full text-sm bg-white
                             `
          }
        )
      }
    ),
    /* @__PURE__ */ jsx("div", { className: " w-full", children: /* @__PURE__ */ jsx(Link, { to: `/web/account/portfolio/${listing.gid}`, children: /* @__PURE__ */ jsxs("div", { className: `md:flex md:place-content-between 
                w-full md:gap-x-[4px]`, children: [
      /* @__PURE__ */ jsxs("div", { className: `w-full md:w-[60%] -space-y-1 block`, children: [
        /* @__PURE__ */ jsx("div", { className: `font-bold text-[14px] text-brown-800 line-clamp-1`, children: listing.title }),
        /* @__PURE__ */ jsx("div", { className: `font-normal text-[11.5px] flex place-items-center gap-1`, children: /* @__PURE__ */ jsx("div", { className: `capitalize flex place-items-center `, children: listing.category }) }),
        /* @__PURE__ */ jsx("div", { className: `font-normal text-[11px] 
                                    flex place-items-center gap-1 `, children: Boolean(listing == null ? void 0 : listing.active_status) ? "Active" : "Inactive" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `w-full lg:w-[40%] hidden 
                                sm:block`, children: [
        /* @__PURE__ */ jsx("div", { className: `flex flex-col place-items-end place-content-end font-bold text-black tracking-tighter`, children: listing.phone }),
        /* @__PURE__ */ jsxs("div", { className: `flex flex-col text-end text-[12px]
                                leading-[1.2em]`, children: [
          listing == null ? void 0 : listing.address_one,
          (listing == null ? void 0 : listing.address_two) ? `, ${listing == null ? void 0 : listing.address_two}` : "",
          (listing == null ? void 0 : listing.city_name) ? `, ${listing == null ? void 0 : listing.city_name}` : "",
          (listing == null ? void 0 : listing.state_name) ? `, ${listing == null ? void 0 : listing.state_name}` : "",
          (listing == null ? void 0 : listing.country_name) ? `, ${listing == null ? void 0 : listing.country_name}` : ""
        ] })
      ] })
    ] }) }) })
  ] }) });
};
const PortfolioPagination = ({
  data,
  itemsPerPage = 3,
  resetPageKey
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const updatePage = (page) => {
    setCurrentPage(page);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", String(page));
    setSearchParams(newParams);
  };
  const goToPrevious = () => {
    if (currentPage > 1) updatePage(currentPage - 1);
  };
  const goToNext = () => {
    if (currentPage < totalPages) updatePage(currentPage + 1);
  };
  useEffect(() => {
    if (resetPageKey !== void 0) {
      updatePage(1);
    }
  }, [resetPageKey]);
  const renderPageNumbers = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => updatePage(number),
          className: `px-[12px] py-[6px] cursor-pointer border rounded-[4px] ${currentPage === number ? "bg-blue-500 text-white border-blue-500" : "bg-white"}`,
          children: number
        },
        number
      ));
    }
    const buttons = [];
    if (currentPage > 2) {
      buttons.push(
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => updatePage(1),
            className: `px-[12px] py-[6px] cursor-pointer border rounded-[4px] ${currentPage === 1 ? "bg-blue-500 text-white border-blue-500" : "bg-white"}`,
            children: "1"
          },
          1
        )
      );
      if (currentPage > 3) {
        buttons.push(
          /* @__PURE__ */ jsx("span", { className: "px-2", children: "…" }, "start-ellipsis")
        );
      }
    }
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);
    for (let number = start; number <= end; number++) {
      buttons.push(
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => updatePage(number),
            className: `px-[12px] py-[6px] cursor-pointer border rounded-[4px] ${currentPage === number ? "bg-blue-500 text-white border-blue-500" : "bg-white"}`,
            children: number
          },
          number
        )
      );
    }
    if (currentPage < totalPages - 1) {
      if (currentPage < totalPages - 2) {
        buttons.push(
          /* @__PURE__ */ jsx("span", { className: "px-2", children: "…" }, "end-ellipsis")
        );
      }
      buttons.push(
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => updatePage(totalPages),
            className: `px-[12px] py-[6px] cursor-pointer border rounded-[4px] ${currentPage === totalPages ? "bg-blue-500 text-white border-blue-500" : "bg-white"}`,
            children: totalPages
          },
          totalPages
        )
      );
    }
    return buttons;
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "divide-gray-500/20 divide-y-[1px]", children: currentItems.map((item, index2) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(ResultItem, { index: index2 + 1, listing: item }) }, index2)) }),
    totalPages > 1 && /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-[5px] mt-[20px] text-[13px] border-t pt-6", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: goToPrevious,
          disabled: currentPage === 1,
          className: "px-[12px] py-[6px] bg-white cursor-pointer border rounded-[4px] disabled:opacity-50",
          children: "Previous"
        }
      ),
      renderPageNumbers(),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: goToNext,
          disabled: currentPage === totalPages,
          className: "px-[12px] py-[6px] bg-white cursor-pointer border rounded-[4px] disabled:opacity-50",
          children: "Next"
        }
      )
    ] })
  ] });
};
const Portfolio = ({ user, portfolio }) => {
  return /* @__PURE__ */ jsx("div", { className: ` h-fit pl-[5px] pr-[10px]`, children: (portfolio == null ? void 0 : portfolio.length) > 0 ? /* @__PURE__ */ jsx(
    PortfolioPagination,
    {
      data: portfolio,
      itemsPerPage: 7
    }
  ) : /* @__PURE__ */ jsx("div", { className: `flex place-items-center rounded
                            place-content-center p-5 border capitalize`, children: /* @__PURE__ */ jsx("span", { children: "no record" }) }) });
};
const PortfolioSearchBox = ({ query: query2 }) => {
  return /* @__PURE__ */ jsx("form", { action: "/web/account/portfolio", className: "text-sm w-full max-w-md", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center bg-gray-50 rounded-full pl-4 pr-1 py-1 gap-2\n            border-[1px] border-gray-500", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        name: "q",
        defaultValue: query2,
        type: "text",
        placeholder: "Business name, address, country, state...",
        className: "flex-grow text-gray-700 text-[12px] outline-none bg-transparent"
      }
    ),
    /* @__PURE__ */ jsx("button", { className: "bg-gray-600 w-8 h-8 flex items-center justify-center rounded-full text-white text-lg", children: /* @__PURE__ */ jsx(BiSearch, {}) })
  ] }) });
};
const CardHeaderWithSearch = ({ base_url, title, q }) => {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: `bg-gray-100 w-full  
                            flex place-content-between rounded-lg
                            place-items-center h-auto py-3 gap-[5px]
                            leading-[1.5em] px-[10px]`, children: [
    /* @__PURE__ */ jsx("div", { className: `h-full min-w-[100px] w-[100px] max-w-[300px]`, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center   ", children: [
      /* @__PURE__ */ jsx(GrLaunch, { className: "mr-1 flex-shrink-0", size: 20 }),
      /* @__PURE__ */ jsx("span", { className: "line-clamp-1 overflow-hidden text-blue-800 text-[16px] font-sans tracking-tight font-bold", children: title })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: `grow flex place-content-end`, children: /* @__PURE__ */ jsx(PortfolioSearchBox, { query: q }) })
  ] }) });
};
const PortfolioLayout = ({ children, businessGuid, data, businessProfile, title }) => {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: `mt-4 bg-white 
                rounded-lg shadow-md pb-8 `, children: [
    /* @__PURE__ */ jsxs("div", { className: `font-semibold text-[17px] border-b-[1px] p-3 flex place-content-between place-items-center`, children: [
      /* @__PURE__ */ jsx("div", { children: title }),
      /* @__PURE__ */ jsx("div", { className: `text-[13px] flex place-items-center gap-2`, children: /* @__PURE__ */ jsx(
        "a",
        {
          href: `/web/account/portfolio`,
          className: `border py-[5px] px-[10px] rounded-full bg-blue-50`,
          children: "Portfolio Home"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `  pt-0 `, children: [
      /* @__PURE__ */ jsx("div", { className: `w-full flex place-content-end` }),
      children,
      /* @__PURE__ */ jsx("div", { className: `h-[40px]` })
    ] })
  ] }) });
};
const Index$2 = () => {
  useEffect(() => {
    IsAuthenticated(localStorage);
  }, []);
  const auth = useAuth();
  if (!auth) {
    return null;
  }
  const { user } = auth;
  const [userProfile, setUserProfile] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const q = (params == null ? void 0 : params.get("q")) || "";
  useEffect(() => {
    async function getAllData(guid, q2) {
      const userProfile2 = await getUserProfile(guid || "");
      const portfolio2 = await getPortfolio(guid || "", q2 || "");
      setUserProfile(userProfile2);
      setPortfolio(portfolio2);
    }
    try {
      if (user == null ? void 0 : user.guid) {
        getAllData(user == null ? void 0 : user.guid, q);
      }
    } catch (e) {
      console.log(e.message);
    }
  }, [user == null ? void 0 : user.guid, q]);
  useEffect(() => {
    if (userProfile && portfolio) {
      const data2 = {
        userProfile,
        portfolio
      };
      setData(data2);
    }
  }, [
    userProfile,
    portfolio
  ]);
  useEffect(() => {
    if (data !== null) {
      setLoading(false);
    }
  }, [data]);
  if (loading) {
    return /* @__PURE__ */ jsx(LoadingMessage, { loading });
  }
  return /* @__PURE__ */ jsx(AccountLayout, { children: /* @__PURE__ */ jsxs(PortfolioLayout, { title: "My Portfolio", children: [
    userProfile === null ? "Loading..." : "",
    /* @__PURE__ */ jsx(
      CardHeaderWithSearch,
      {
        base_url: "/web/account/portfolio",
        title: `${formatNumber(data.portfolio.length)} Pages`,
        q
      }
    ),
    /* @__PURE__ */ jsx("div", { className: `flex place-items-center place-content-center mt-3` }),
    /* @__PURE__ */ jsx("div", { className: `mt-[20px]` }),
    data !== null && /* @__PURE__ */ jsx(Portfolio, { user: data.userProfile, portfolio: data.portfolio })
  ] }) });
};
const route28 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$2
}, Symbol.toStringTag, { value: "Module" }));
const BusinessProfileSchema = z.object({
  username: z.any(),
  pagetype: z.string({ message: "Please select page type" }).min(1, { message: "Please select page type" }),
  email_address: z.string({ message: "Please enter an email." }).min(1, { message: "Email must not be empty" }).email({ message: "Please enter a valid email" }),
  title: z.string().min(1, { message: "Enter a business name" }).min(3, { message: "Busines Name must not be less than 3 characters" }).max(100, { message: "Business name must not be more than 100 characters." }),
  country_code: z.string({ message: "Please select a country" }).min(1, { message: "Please enter a country code." }),
  address_one: z.string({ message: "Please enter an address" }).min(3, { message: "Address must not be less than 3 characters" }).max(100, { message: "Address must not be more than 100 characters" }),
  short_description: z.string().refine(
    (val) => {
      const words = val.trim().split(/\s+/).filter(Boolean);
      return words.length >= 30;
    },
    { message: "You must write at least 30 words." }
  ).refine(
    (val) => {
      const words = val.trim().split(/\s+/).filter(Boolean);
      return words.length <= 60;
    },
    { message: "You can only write up to 60 words." }
  ),
  long_description: z.string().nullish().refine(
    (val) => {
      if (!val || val.trim() === "") {
        return true;
      }
      const words = val.trim().split(/\s+/).filter(Boolean);
      return words.length <= 500;
    },
    { message: "You can only write up to 500 words." }
  ),
  address_two: z.any(),
  state_code: z.any(),
  state_text: z.any(),
  country_text: z.any(),
  city_id: z.any(),
  established: z.string().optional().nullable().transform((val) => val ?? "").refine(
    (val) => val === "" || /^[0-9]+$/.test(val),
    { message: "Year established must contain only numbers" }
  ).refine(
    (val) => val === "" || val.length <= 4,
    { message: "Year established must not be more than 4 digits" }
  ),
  zipcode: z.string().optional().nullable().transform((val) => val ?? "").refine(
    (val) => val === "" || /^[0-9]+$/.test(val),
    { message: "Zipcode must contain only numbers" }
  ).refine(
    (val) => val === "" || val.length <= 7,
    { message: "Zipcode must not be more than 7 digits" }
  ),
  call_code: z.any(),
  phone: z.string().max(30, { message: "Phone must not be more than 30 characters" }).optional().nullable().refine(
    (val) => !val || val.trim().length > 0,
    { message: "Phone must not be empty" }
  ),
  intro: z.any(),
  category: z.string().min(2, { message: "Please select a business category" }),
  business_phrases: z.union([
    z.literal(""),
    z.string({ message: "Please enter business phrase" }).min(3, { message: "Business Phrases must not be less than 3 characters" }).max(1e3, { message: "Business Phrases must not be more than 100 characters" }).nullish()
  ]),
  products: z.any(),
  services: z.any(),
  xsocial: z.any(),
  fbsocial: z.any(),
  linksocial: z.any(),
  website: z.string().nullable().optional().refine(
    (val) => {
      if (!val || val === "") return true;
      try {
        new URL(val);
        return true;
      } catch {
        return false;
      }
    },
    { message: "Please enter a valid website. Example: http://example.com" }
  )
}).superRefine((data, ctx) => {
  var _a, _b;
  if (((_a = data == null ? void 0 : data.address_two) == null ? void 0 : _a.length) !== 0) {
    if (((_b = data == null ? void 0 : data.address_two) == null ? void 0 : _b.length) < 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["address_two"],
        message: "Enter a minimum of 3 characters"
      });
    }
  }
});
const pageType = [
  {
    name: "Local Business or Place",
    id: "local_business",
    icon: /* @__PURE__ */ jsx(FcBusinessman, { size: 20 })
  },
  {
    name: "Company, Organization or Institution",
    id: "company_organization_institution",
    icon: /* @__PURE__ */ jsx(BiBuilding, { size: 20 })
  },
  {
    name: "Non-Governmental Organization",
    id: "ngo",
    icon: /* @__PURE__ */ jsx(FaBuildingNgo, { size: 20 })
  },
  {
    name: "Artist, Band or Public Figure",
    id: "artist_band_public_figure",
    icon: /* @__PURE__ */ jsx(CgBandAid, { size: 20 })
  },
  {
    name: "Entertainment",
    id: "entertainment",
    icon: /* @__PURE__ */ jsx(MdMusicNote, { size: 20 })
  },
  {
    name: "Cause or Community",
    id: "cause_or_community",
    icon: /* @__PURE__ */ jsx(RiCommunityFill, { size: 20 })
  }
];
const BgComponent = ({ listing, user, businessProfileBgData }) => {
  let imgconst = "";
  if (businessProfileBgData == null ? void 0 : businessProfileBgData.image_url) {
    imgconst = config.IMG_BASE_URL + businessProfileBgData.image_url;
  }
  const [imgSrc, setImgSrc] = useState(imgconst);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isImgSelected, setIsImageSelected] = useState(false);
  const [working, setWorking] = useState(false);
  useNotification();
  const { showOperation, showSuccess, showError, showWarning, showInfo, completeOperation } = useOperation();
  const handleImageClick = () => {
    var _a;
    (_a = fileInputRef.current) == null ? void 0 : _a.click();
  };
  const handleFileChange = (event) => {
    var _a;
    const file = (_a = event.target.files) == null ? void 0 : _a[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImgSrc(imageUrl);
      setSelectedFile(file);
      setIsImageSelected(true);
    }
  };
  const handleUpload = async () => {
    setWorking(true);
    showOperation("processing");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    const formData = new FormData();
    if (isImgSelected) {
      formData.append("file", selectedFile);
      formData.append("guid", user.user_guid);
      formData.append("bid", listing.gid);
      const endpoint = "/business_profile_bg_upload";
      const url = config.IMG_BASE_URL + endpoint;
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
          },
          body: formData
        });
        if (!response.ok) {
          let error = response.json().then((data) => {
            showError("Error", data.message);
            completeOperation();
          });
        } else {
          showSuccess("Success", "Image uploaded.");
          completeOperation();
        }
      } catch (error) {
        console.log(error.message);
        showError("Error", "Image upload failed.");
        completeOperation();
      } finally {
        setWorking(false);
      }
    } else {
      showError("Error", "Please select an image to continue.");
      completeOperation();
      setWorking(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: `relative`, children: [
    /* @__PURE__ */ jsxs("div", { className: "relative bg-gray-700 w-full h-[200px] z-[0] shadow-lg text-white flex place-items-center place-content-center flex-col", children: [
      imgSrc === "" && "Add Photo (1920x200)",
      imgSrc && /* @__PURE__ */ jsx(
        "img",
        {
          src: imgSrc,
          alt: "",
          className: `object-cover w-full h-full  absolute z-[40]`
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "file",
          accept: "image/*",
          ref: fileInputRef,
          className: " hidden",
          onChange: handleFileChange
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: ` flex place-items-center gap-1.5
                place-content-center top-[5px] right-[5px] w-fit z-[120] absolute`, children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: `bg-white  w-full py-[4px] rounded-[8px] border-[1px] border-gray-200
                        shadow-sm hover:shadow-lg transition duration-500 ease-in-out px-[8px] `,
          disabled: working,
          onMouseDown: handleImageClick,
          children: "Browse"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: ` bg-white  w-full py-[3px] rounded-[8px] border-[1px] border-gray-200 px-[8px]
                        shadow-sm hover:shadow-lg transition duration-500 ease-in-out`,
          onMouseDown: handleUpload,
          disabled: working,
          children: working ? "Uploading..." : "Upload"
        }
      )
    ] })
  ] });
};
const ImgComponentAlt = ({ listing, user, businessProfileImageData }) => {
  let imgconst = "";
  if (businessProfileImageData.image_url) {
    imgconst = config.IMG_BASE_URL + businessProfileImageData.image_url;
  }
  const [imgSrc, setImgSrc] = useState(imgconst);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isImgSelected, setIsImageSelected] = useState(false);
  const [working, setWorking] = useState(false);
  useNotification();
  const { showOperation, showSuccess, showError, showWarning, showInfo, completeOperation } = useOperation();
  const handleImageClick = () => {
    var _a;
    (_a = fileInputRef.current) == null ? void 0 : _a.click();
  };
  const handleFileChange = (event) => {
    var _a;
    const file = (_a = event.target.files) == null ? void 0 : _a[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImgSrc(imageUrl);
      setSelectedFile(file);
      setIsImageSelected(true);
    }
  };
  const handleUpload = async () => {
    setWorking(true);
    showOperation("processing");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    const formData = new FormData();
    if (isImgSelected) {
      formData.append("file", selectedFile);
      formData.append("guid", user.user_guid);
      formData.append("bid", listing.gid);
      const endpoint = "/business_profile_pic_upload";
      const url = config.IMG_BASE_URL + endpoint;
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
          },
          body: formData
        });
        if (!response.ok) {
          let error = response.json().then((data) => {
            showError("Error", data.message);
            completeOperation();
          });
        } else {
          showSuccess("Success", "Image uploaded.");
          completeOperation();
        }
      } catch (error) {
        showError("Error", "Image upload failed");
        completeOperation();
      } finally {
        setWorking(false);
      }
    } else {
      showError("Error", "Please select an image to continue.");
      completeOperation();
      setWorking(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "relative bg-blue-100 w-[150px] h-[150px] z-40 rounded-full overflow-hidden border-[2px] border-gray-200", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: imgSrc,
          alt: "",
          className: `object-cover w-full h-full z-0 absolute ${imgSrc === "" ? "bg-black" : "bg-white"}`
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "file",
          accept: "image/*",
          ref: fileInputRef,
          className: " hidden",
          onChange: handleFileChange
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `flex place-content-center place-items-center
                                 bg-black/10 w-full h-full absolute z-0 top-0 object-cover
                                 text-white/80 `,
          onMouseDown: handleImageClick,
          children: /* @__PURE__ */ jsx("div", { className: `w-[50%] h-[50%] flex flex-col
                                    place-content-center place-items-center
                                    hover:cursor-pointer hover:bg-white/50
                                    bg-blue-300/50
                                    rounded-full transition duration-300 ease-in-out`, children: /* @__PURE__ */ jsx(MdEditSquare, { className: " text-[30px]" }) })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: ` flex flex-col place-items-center 
                place-content-center mt-2 `, children: /* @__PURE__ */ jsx(
      "button",
      {
        className: `${working ? "bg-gray-200 cursor-default" : "bg-blue-100"}  w-full py-[6px] rounded-[8px] border-[1px] border-gray-200
                        shadow-sm hover:shadow-lg transition duration-500 ease-in-out`,
        onMouseDown: handleUpload,
        disabled: working,
        children: working ? "Uploading..." : "Upload"
      }
    ) })
  ] });
};
const TextareaWithWordLimit = ({
  controlName,
  controlPlaceholder,
  controlTitle,
  register,
  changeHandler,
  controlInformationClass: controlInformationClass2,
  controlInformation,
  error,
  setValue,
  getValues,
  watch,
  minWords = 100,
  maxWords = 500
}) => {
  const [text, setText] = useState("");
  const [wordLimitReached, setWordLimitReached] = useState(false);
  const countWords = (input) => {
    return (input == null ? void 0 : input.trim()) === "" ? 0 : input == null ? void 0 : input.trim().split(/\s+/).length;
  };
  const handleTextChange = (e) => {
    const input = e.target.value;
    const words = input.trim().split(/\s+/);
    if (words.length <= maxWords) {
      setValue("text", input);
      setWordLimitReached(false);
    } else {
      setWordLimitReached(true);
      const trimmedWords = words.slice(0, maxWords).join(" ");
      setValue("text", trimmedWords);
    }
  };
  const textValue = watch("text") || "";
  const handleKeyDown = (e) => {
    const words = textValue.trim().split(/\s+/);
    if (words.length >= maxWords && e.key !== "Backspace" && e.key !== "Delete" && !e.ctrlKey) {
      e.preventDefault();
      setWordLimitReached(true);
    } else {
      setWordLimitReached(false);
    }
  };
  useEffect(() => {
    if (controlName) {
      let priorText = getValues(controlName);
      setText(priorText);
    }
  }, [controlName]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: inputControlWrapper, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex place-content-between place-items-baseline top-1", children: [
      /* @__PURE__ */ jsx("label", { className: inputHeadingClassForTextarea, children: controlTitle }),
      /* @__PURE__ */ jsxs("label", { className: " text-gray-600 text-sm", children: [
        "Word Count: ",
        /* @__PURE__ */ jsx("strong", { children: countWords(text) })
      ] })
    ] }),
    (controlInformation == null ? void 0 : controlInformation.length) > 1 && /* @__PURE__ */ jsx("div", { className: `${controlInformationClass2} ml-1.5 mb-2`, children: controlInformation }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        "textarea",
        {
          ...register(controlName, {
            onChange: (e) => {
              setText(e.target.value);
              handleTextChange(e);
              changeHandler(e);
            }
          }),
          className: textAreaClass,
          placeholder: controlPlaceholder,
          onKeyDown: handleKeyDown
        }
      ),
      error && /* @__PURE__ */ jsxs("div", { className: `input__class__error -mt-[5px]`, children: [
        /* @__PURE__ */ jsx(MdError, { className: "text-lg" }),
        error.message
      ] })
    ] })
  ] }) });
};
const BusinessProfile = ({ data }) => {
  var _a;
  const [formdata, setFormdata] = useState(null);
  const [working, setWorking] = useState(false);
  useNotification();
  const [errorMsg, setErrorMsg] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { showOperation, showSuccess, showError, showWarning, showInfo, completeOperation } = useOperation();
  const countries = data.countries;
  let [states, setStates] = useState(data.states);
  let [cities, setCities] = useState(data.cities);
  const categories2 = categories$2 == null ? void 0 : categories$2.sort(
    (a, b) => a.name.localeCompare(b.name)
  );
  const [countryCode, setCountryCode] = useState(data.businessProfile.country_code);
  const [stateCode, setStateCode] = useState(data.businessProfile.state_code);
  const [newCountryCode, setNewCountryCode] = useState("");
  const [newStateCode, setNewStateCode] = useState("");
  const resetStates = async (countryCode2) => {
    setCountryCode(countryCode2);
    setNewCountryCode(countryCode2);
    const states2 = await getStates(countryCode2);
    setStates(states2);
    resetCities("");
  };
  const resetCities = async (stateCode2) => {
    setStateCode(stateCode2);
    setNewStateCode(stateCode2);
    const cities2 = await getCities(countryCode, stateCode2);
    setCities(cities2);
  };
  const changeHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormdata((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  };
  const handleUpdateBusiness = async (datar) => {
    setWorking(true);
    showOperation("processing", "Updating page profile");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    const endpoint = "/api/listing/" + data.businessProfile.gid;
    const url = config.BASE_URL + endpoint;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: headers$1,
        body: JSON.stringify(datar)
      });
      if (!response.ok) {
        const errorData = await response.text();
        const errorObject = JSON.parse(errorData);
        throw new Error(`${errorObject.error}`);
      } else {
        showSuccess("Success", "Page profile updated.");
        completeOperation();
      }
    } catch (error) {
      showError("error", `${error.message}`);
      completeOperation();
    } finally {
      setWorking(false);
    }
  };
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: data.businessProfile,
    resolver: zodResolver(BusinessProfileSchema)
  });
  useEffect(() => {
    if (data.businessProfile) {
      setValue("state_code", data.businessProfile.state_code);
      setValue("city_id", data.businessProfile.city_id);
    }
  }, [data.businessProfile]);
  useEffect(() => {
    if (newCountryCode) {
      setValue("state_code", "");
      setValue("city_id", "");
    }
  }, [newCountryCode, data]);
  useEffect(() => {
    if (newStateCode) {
      setValue("city_id", "");
    }
  }, [newStateCode]);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(BusinessDrawer, { isOpen, businessGuid: data.businessProfile.gid, userGuid: (_a = data.businessProfile) == null ? void 0 : _a.owner }),
    /* @__PURE__ */ jsx(
      BgComponent,
      {
        listing: data.businessProfile,
        user: data.userProfile,
        businessProfileBgData: data.businessProfileBgData
      }
    ),
    /* @__PURE__ */ jsx("div", { className: `px-[15px]  relative w-full flex place-content-center h-[180px]`, children: /* @__PURE__ */ jsx("div", { className: `absolute top-[-50px]`, children: /* @__PURE__ */ jsx("div", { className: `flex place-items-center place-content-center flex-col`, children: /* @__PURE__ */ jsx(
      ImgComponentAlt,
      {
        listing: data.businessProfile,
        user: data.userProfile,
        businessProfileImageData: data.businessProfileImageData
      }
    ) }) }) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("hr", { className: `mb-4` }),
      /* @__PURE__ */ jsxs("div", { className: `relative w-full flex place-items-center gap-1 place-content-end px-[10px]`, children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: `/web/account/portfolio`,
            className: ` py-[9px] px-[20px] rounded-full bg-blue-900 shadow-lg shadow-blue-400 text-white`,
            children: "Portfolio"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: `/${data.businessProfile.gid}`,
            className: ` py-[9px] px-[20px] rounded-full bg-blue-900 shadow-lg shadow-blue-400 text-white`,
            children: "Preview"
          }
        ),
        (data == null ? void 0 : data.businessProfile) && /* @__PURE__ */ jsx(
          BusinessMenu,
          {
            setIsOpen,
            guid: data == null ? void 0 : data.businessProfile.gid,
            userGuid: data == null ? void 0 : data.businessProfile.owner
          }
        )
      ] }),
      /* @__PURE__ */ jsx("form", { className: `w-full px-[10px]`, onSubmit: handleSubmit(handleUpdateBusiness), children: /* @__PURE__ */ jsxs("div", { className: `${formWrapperClass} mt-0  rounded-lg pt-4 md:max-w-[80%]
                                lg:max-w-[60%] w-full mx-auto `, children: [
        /* @__PURE__ */ jsx("div", { className: `text-2xl mb-5`, children: "Page update" }),
        /* @__PURE__ */ jsx("div", { className: `text-xl font-[600] leading-[1.4em] px-[10px] text-black mb-[32px]`, children: data == null ? void 0 : data.businessProfile.title }),
        /* @__PURE__ */ jsx(
          Input,
          {
            controlTitle: "Page Username",
            controlPlaceholder: "Enter username",
            controlName: "username",
            register,
            changeHandler,
            error: errors.username,
            controlInformation: `Choose a username. `
          }
        ),
        /* @__PURE__ */ jsx(
          Select,
          {
            controlTitle: "Page Type",
            controlName: "pagetype",
            controlPlaceholder: "Select Page Type",
            selectJson: pageType,
            register,
            changeHandler,
            error: errors.pagetype,
            controlInformation: `Select business category.`
          }
        ),
        /* @__PURE__ */ jsx(
          Input,
          {
            controlTitle: "Email Address",
            controlPlaceholder: "Enter email address",
            controlName: "email_address",
            register,
            changeHandler,
            error: errors.email_address,
            controlInformation: `Email address is compulsory.`
          }
        ),
        /* @__PURE__ */ jsx(
          Input,
          {
            controlTitle: "Business name",
            controlPlaceholder: "Enter business name",
            controlName: "title",
            register,
            changeHandler,
            error: errors.title,
            controlInformation: `Please enter page name. Page name is compulsory. `
          }
        ),
        /* @__PURE__ */ jsx(
          Select,
          {
            controlTitle: "Category",
            controlName: "category",
            controlPlaceholder: "Select category",
            selectJson: categories2,
            register,
            changeHandler,
            error: errors.category,
            controlInformation: `Select business category.`
          }
        ),
        /* @__PURE__ */ jsx(
          Input,
          {
            controlTitle: "Year established",
            controlPlaceholder: "Enter year established",
            controlName: "established",
            register,
            changeHandler,
            error: errors.established,
            controlInformation: `This is the name the business was registered or started `
          }
        ),
        /* @__PURE__ */ jsx(
          Input,
          {
            controlTitle: "Address 1",
            controlPlaceholder: "Enter address",
            controlName: "address_one",
            register,
            changeHandler,
            error: errors.address_one,
            width: 100,
            controlInformation: `Contact address for the business. `
          }
        ),
        /* @__PURE__ */ jsx(
          Input,
          {
            controlTitle: "Address 2",
            controlPlaceholder: "Enter address",
            controlName: "address_two",
            register,
            changeHandler,
            error: errors.address_two,
            width: 100,
            controlInformation: `E.g. Off North Central Boulevard or North Central Road. `
          }
        ),
        /* @__PURE__ */ jsx(
          Select,
          {
            controlTitle: "Country",
            controlName: "country_code",
            controlPlaceholder: "Select country",
            selectJson: countries,
            register,
            changeHandler,
            error: errors.country_code,
            setCode: resetStates,
            controlInformation: `Country the business was registered. `
          }
        ),
        /* @__PURE__ */ jsx(
          Select,
          {
            controlTitle: "State",
            controlName: "state_code",
            controlPlaceholder: "Select state",
            selectJson: states,
            register,
            changeHandler,
            error: errors.state_code,
            setCode: resetCities,
            controlInformation: `State the business was registered. `
          }
        ),
        /* @__PURE__ */ jsx(
          Select,
          {
            controlTitle: "City",
            controlName: "city_id",
            controlPlaceholder: "Select city",
            selectJson: cities,
            register,
            changeHandler,
            error: errors.city_id,
            controlInformation: `City the business was registered. `
          }
        ),
        /* @__PURE__ */ jsx(
          Input,
          {
            controlTitle: "Zipcode",
            controlPlaceholder: "Enter zipcode",
            controlName: "zipcode",
            register,
            changeHandler,
            error: errors.zipcode,
            controlInformation: `Enter the zipcode. E.g.: 51234 or 845219 `
          }
        ),
        /* @__PURE__ */ jsx(
          Input,
          {
            controlTitle: "Phone number",
            controlPlaceholder: "Enter phone number",
            controlName: "phone",
            register,
            changeHandler,
            error: errors.phone,
            controlInformation: `Mobile number or phone number. `
          }
        ),
        /* @__PURE__ */ jsx(
          Input,
          {
            controlTitle: "Business Phrases",
            controlPlaceholder: "E.g. Advocates, Software Developers, Architect",
            controlName: "business_phrases",
            register,
            changeHandler,
            error: errors.business_phrases,
            controlInformation: `Enter business phrases like: Solicitor, Advocate, Plumber, Business Analyst, Mechanical Engineers.`
          }
        ),
        /* @__PURE__ */ jsx(
          Input,
          {
            controlTitle: "Products",
            controlPlaceholder: "E.g.: Publications, Accessories, Shoes, Subscriptions, Magazines, Cars",
            controlName: "products",
            register,
            changeHandler,
            error: errors.products,
            controlInformation: `Enter your products name like: Magazines, Generators, Accessories, Perfumes, Publications etc.`
          }
        ),
        /* @__PURE__ */ jsx(
          Input,
          {
            controlTitle: "Services",
            controlPlaceholder: "E.g.: Consulting Services, Project Management, Outsourcing or BPO, Training and Development. etc.",
            controlName: "services",
            register,
            changeHandler,
            error: errors.services,
            controlInformation: `Enter your services E.g.: Consulting Services, Project Management, Outsourcing or BPO, Training and Development. etc.`
          }
        ),
        /* @__PURE__ */ jsx(
          TextareaWithWordLimit,
          {
            controlTitle: "Short Description",
            controlPlaceholder: "Short description",
            controlName: "short_description",
            register,
            changeHandler,
            error: errors.short_description,
            setValue,
            getValues,
            watch,
            controlInformationClass,
            controlInformation: `Short description of business activities`
          }
        ),
        /* @__PURE__ */ jsx(
          TextareaWithWordLimit,
          {
            controlTitle: "Long Description",
            controlPlaceholder: "Long description",
            controlName: "long_description",
            register,
            changeHandler,
            error: errors.long_description,
            setValue,
            getValues,
            watch,
            controlInformationClass,
            controlInformation: `More description about the business.`
          }
        ),
        /* @__PURE__ */ jsx(
          Input,
          {
            controlTitle: "Website",
            controlPlaceholder: "Enter website",
            controlName: "website",
            register,
            changeHandler,
            error: errors.website,
            controlInformation: `Your website should look like this: http://example.com `
          }
        ),
        /* @__PURE__ */ jsx(Button, { working })
      ] }) })
    ] })
  ] });
};
const loader$Q = async ({ request, params }) => {
  const business_guid = params.business_guid;
  const data = {
    business_guid
  };
  return data;
};
const index$c = () => {
  var _a;
  useEffect(() => {
    IsAuthenticated(localStorage);
  }, []);
  const loaderData = useLoaderData();
  const auth = useAuth();
  if (!auth) {
    return null;
  }
  const businessGuid = loaderData.business_guid;
  const userGuid = (_a = auth == null ? void 0 : auth.user) == null ? void 0 : _a.guid;
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [businessProfile, setBusinessProfile] = useState(null);
  const [states, setStates] = useState(null);
  const [countries, setCountries] = useState(null);
  const [cities, setCities] = useState(null);
  const [userProfileImageData, setUserProfileImageData] = useState(null);
  const [businessProfileImageData, setBusinessProfileImageData] = useState(null);
  const [businessProfileBgData, setBusinessProfileBgData] = useState(null);
  const [categories2, setCategories] = useState(null);
  const [data, setData] = useState(null);
  useNavigation();
  useEffect(() => {
    async function getAllData(userGuid2, businessGuid2) {
      const userProfile2 = await getUserProfile(userGuid2 || "");
      const businessProfile2 = await getBusinessProfile(businessGuid2 || "");
      const countries2 = await getCountries();
      const businessObject = businessProfile2;
      const states2 = await getStates(businessObject.country_code || "");
      const cities2 = await getCities(businessObject.country_code || "", businessObject.state_code || "");
      const categories22 = await getCategories();
      const userProfileImageData2 = await getUserProfileImageData(userGuid2 || "");
      const businessProfileImageData2 = await getBusinessProfileImageData(businessGuid2 || "");
      const businessProfileBgData2 = await getBusinessProfileBgData(businessGuid2 || "");
      setUserProfile(userProfile2);
      setBusinessProfile(businessProfile2);
      setCountries(countries2);
      setStates(states2);
      setCities(cities2);
      setUserProfileImageData(userProfileImageData2);
      setBusinessProfileImageData(businessProfileImageData2);
      setCategories(categories22);
      setBusinessProfileBgData(businessProfileBgData2);
    }
    try {
      if (userGuid && businessGuid) {
        getAllData(userGuid, businessGuid);
      }
    } catch (e) {
      console.log(e.message);
    }
  }, [userGuid, businessGuid]);
  useEffect(() => {
    if (userProfile && businessProfile && countries && states && cities && userProfileImageData && categories2 && businessProfileImageData && businessProfileBgData) {
      const data2 = {
        userProfile,
        businessProfile,
        countries,
        states,
        cities,
        userProfileImageData,
        businessProfileImageData,
        businessProfileBgData,
        categories: categories2
      };
      setData(data2);
    }
  }, [
    categories2,
    countries,
    states,
    cities,
    userProfileImageData,
    businessProfileImageData,
    userProfile,
    businessProfile,
    businessProfileBgData
  ]);
  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);
  if (loading) {
    return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(LoadingMessage, {}) });
  }
  return /* @__PURE__ */ jsx(ProfileLayout, { children: /* @__PURE__ */ jsx(OperationProvider, { children: data !== null && /* @__PURE__ */ jsx(
    BusinessProfile,
    {
      data
    }
  ) }) });
};
const route29 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$c,
  loader: loader$Q
}, Symbol.toStringTag, { value: "Module" }));
const CreatePageSchema = z.object({
  title: z.string().min(1, { message: "Enter a business name" }).min(3, { message: "Busines Name must not be less than 3 characters" }).max(100, { message: "Business name must not be more than 100 characters." }),
  pagetype: z.string({ message: "Please select page type" }).min(1, { message: "Please select page type" }),
  category: z.string().min(1, { message: "Please select a business category." }),
  country_code: z.string({ message: "Please select a country" }).min(1, { message: "Please enter a country code." }),
  state_code: z.any(),
  city_id: z.any(),
  zipcode: z.string().max(7, { message: "Zipcode must not be more than 7 characters" }).optional().or(z.literal("")),
  // allow empty string
  short_description: z.string().refine(
    (val) => {
      const words = val.trim().split(/\s+/).filter(Boolean);
      return words.length >= 30;
    },
    { message: "You must write at least 30 words." }
  ).refine(
    (val) => {
      const words = val.trim().split(/\s+/).filter(Boolean);
      return words.length <= 60;
    },
    { message: "You can only write up to 60 words." }
  ),
  email_address: z.string({ message: "Please enter an email." }).min(1, { message: "Email must not be empty" }).email({ message: "Please enter a valid email" }),
  phone: z.string().max(30, { message: "Phone must not be more than 30 characters" }).optional().nullable().refine(
    (val) => !val || val.trim().length > 0,
    { message: "Phone must not be empty" }
  ),
  address_one: z.string({ message: "Please enter an address" }).min(3, { message: "Address must not be less than 3 characters" }).max(100, { message: "Address must not be more than 100 characters" }),
  address_two: z.any(),
  /* established: z.string({ message: "Please enter year established" })
      .min(4, { message: "Year must be at least 4 characters" }) */
  established: z.string().optional().refine(
    (val) => !val || /^\d{1,4}$/.test(val),
    { message: "Must be only numbers and not more than 4 digits" }
  )
}).superRefine((data, ctx) => {
  var _a, _b;
  if (((_a = data == null ? void 0 : data.address_two) == null ? void 0 : _a.length) !== 0) {
    if (((_b = data == null ? void 0 : data.address_two) == null ? void 0 : _b.length) < 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["address_two"],
        message: "Enter a minimum of 3 characters"
      });
    }
  }
});
const CreatePageForm = ({ data, user }) => {
  const [formdata, setFormdata] = useState(null);
  const [working, setWorking] = useState(false);
  useNotification();
  useNavigate();
  const { showOperation, showSuccess, showError, showWarning, showInfo, completeOperation } = useOperation();
  const countries = data.countries;
  let [states, setStates] = useState(data.states);
  let [cities, setCities] = useState(data.cities);
  const categories2 = categories$2;
  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [newCountryCode, setNewCountryCode] = useState("");
  const [newStateCode, setNewStateCode] = useState("");
  const resetStates = async (countryCode2) => {
    setCountryCode(countryCode2);
    setNewCountryCode(countryCode2);
    const states2 = await getStates(countryCode2);
    setStates(states2);
    resetCities("");
  };
  const resetCities = async (stateCode2) => {
    setStateCode(stateCode2);
    setNewStateCode(stateCode2);
    const cities2 = await getCities(countryCode, stateCode2);
    setCities(cities2);
  };
  const changeHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormdata((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  };
  const handleAddBusiness = async (datar) => {
    setWorking(true);
    showOperation("processing", "Creating a page");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    datar["owner"] = user.guid;
    const endpoint = "/api/listing";
    const url = config.BASE_URL + endpoint;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers$1,
        body: JSON.stringify(datar)
      });
      if (!response.ok) {
        var respObj = await response.json();
        throw new Error(`Error Code: ${response.status} - ${(respObj == null ? void 0 : respObj.message) || (respObj == null ? void 0 : respObj.error)}`);
      } else {
        showSuccess("success", "Page created successfully.");
        showOperation("processing", "Redirecting...");
        await new Promise((resolve) => setTimeout(resolve, 4e3));
        window.location.href = "/web/account/portfolio";
        completeOperation();
      }
    } catch (e) {
      showError("Error", e.message);
      completeOperation();
    } finally {
      setWorking(false);
    }
  };
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(CreatePageSchema)
  });
  useEffect(() => {
    if (newCountryCode) {
      setValue("state_code", "");
      setValue("city_id", "");
    }
  }, [newCountryCode]);
  useEffect(() => {
    if (newStateCode) {
      setValue("city_id", "");
    }
  }, [newStateCode]);
  return /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit(handleAddBusiness), children: /* @__PURE__ */ jsxs("div", { className: `${formWrapperClass} mt-0  rounded-lg pt-4
                             max-w-[500px] w-full mx-auto `, children: [
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "Business Name",
        controlPlaceholder: "Enter business name",
        controlName: "title",
        register,
        changeHandler,
        error: errors.title,
        width: 80,
        controlInformation: `Business name is compulsory.`
      }
    ),
    /* @__PURE__ */ jsx(
      Select,
      {
        controlTitle: "Page Type",
        controlName: "pagetype",
        controlPlaceholder: "Select Page Type",
        selectJson: pageType,
        register,
        changeHandler,
        error: errors.pagetype,
        controlInformation: `Select business category.`
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "Email Address",
        controlPlaceholder: "Enter email address",
        controlName: "email_address",
        register,
        changeHandler,
        error: errors.email_address,
        controlInformation: `Email address is compulsory.`
      }
    ),
    /* @__PURE__ */ jsx(
      Select,
      {
        controlTitle: "Business Category",
        controlName: "category",
        controlPlaceholder: "Select business category",
        selectJson: categories2,
        register,
        changeHandler,
        error: errors.category,
        controlInformation: `Select business category.`
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "Address 1",
        controlPlaceholder: "Enter address",
        controlName: "address_one",
        register,
        changeHandler,
        error: errors.address_one,
        width: 100,
        controlInformation: `Address of Business. E.g. 28 New York Street `
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "Address 2",
        controlPlaceholder: "Enter address",
        controlName: "address_two",
        register,
        changeHandler,
        error: errors.address_two,
        width: 100,
        controlInformation: `Continuation of address. E.g. Crown Tower, Off Belleveu Avenue or Valu Complex, Kingston Donnel Boulevard. `
      }
    ),
    /* @__PURE__ */ jsx(
      Select,
      {
        controlTitle: "Country",
        controlName: "country_code",
        controlPlaceholder: "Select country",
        selectJson: countries,
        register,
        changeHandler,
        error: errors.country_code,
        setCode: resetStates,
        controlInformation: `Country the business was registered or active. `
      }
    ),
    /* @__PURE__ */ jsx(
      Select,
      {
        controlTitle: "State",
        controlName: "state_code",
        controlPlaceholder: "Select state",
        selectJson: states,
        register,
        changeHandler,
        error: errors.state_code,
        setCode: resetCities,
        controlInformation: `State the business is registered or active. `
      }
    ),
    /* @__PURE__ */ jsx(
      Select,
      {
        controlTitle: "City",
        controlName: "city_id",
        controlPlaceholder: "Select city",
        selectJson: cities,
        register,
        changeHandler,
        error: errors.city_id,
        controlInformation: `City the business is registered or active. `
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "Zipcode",
        controlPlaceholder: "Enter zipcode",
        controlName: "zipcode",
        register,
        changeHandler,
        error: errors.zipcode,
        controlInformation: `Zipcode of location of business. Eg. 92829 or 239484 `
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "Phone number",
        controlPlaceholder: "Enter phone number",
        controlName: "phone",
        register,
        changeHandler,
        error: errors.phone,
        controlInformation: `Phone OR Mobile number. `
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "Year established - Optional",
        controlPlaceholder: "Enter year established",
        controlName: "established",
        register,
        changeHandler,
        error: errors.established,
        controlInformation: `Year registered is compulsory.`
      }
    ),
    /* @__PURE__ */ jsx(
      TextareaWithWordLimit,
      {
        controlTitle: "Short Description",
        controlPlaceholder: "Short description",
        controlName: "short_description",
        register,
        changeHandler,
        error: errors.short_description,
        setValue,
        getValues,
        watch,
        controlInformationClass,
        controlInformation: `Enter a short description of this business. It should be a maximum of 50 words. `
      }
    ),
    /* @__PURE__ */ jsx(Button, { working })
  ] }) });
};
const index$b = () => {
  useEffect(() => {
    IsAuthenticated(localStorage);
  }, []);
  const auth = useAuth();
  if (!auth) {
    return null;
  }
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [countries, setCountries] = useState(null);
  const [states, setStates] = useState(null);
  const [cities, setCities] = useState(null);
  const [categories2, setCategories] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  useEffect(() => {
    const getAllData = async (user2) => {
      const countries2 = await getCountries();
      const states2 = await getStates("");
      const cities2 = await getCities("", "");
      const categories22 = await getCategories();
      const userProfileData = await getUserProfile((user2 == null ? void 0 : user2.guid) || "");
      setUserProfile(userProfileData);
      setCountries(countries2);
      setStates(states2);
      setCities(cities2);
      setCategories(categories22);
      setUser(user2);
    };
    try {
      if (auth == null ? void 0 : auth.user) {
        getAllData(auth == null ? void 0 : auth.user);
      }
    } catch (e) {
      console.log(e.message);
    }
  }, [auth]);
  useEffect(() => {
    if (user && countries && categories2) {
      const data2 = {
        user,
        countries,
        states,
        cities,
        categories: categories2
      };
      setData(data2);
      setLoading(false);
    }
  }, [countries, user]);
  if (loading) {
    return /* @__PURE__ */ jsx(LoadingMessage, { loading });
  }
  return /* @__PURE__ */ jsx(AccountLayout, { children: /* @__PURE__ */ jsx(ProfileContentLayout, { title: "Create Page", children: /* @__PURE__ */ jsx(OperationProvider, { children: data && /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(CreatePageForm, { data, user }) }) }) }) });
};
const route30 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$b
}, Symbol.toStringTag, { value: "Module" }));
const urlvalidator = /^(?!https?)(?!www\.?).*\..+$/g;
const SettingsSchema = z.object({
  username: z.any(),
  title: z.string().min(1, { message: "Enter a business name" }).min(3, { message: "Busines Name must not be less than 3 characters" }).max(100, { message: "Business name must not be more than 100 characters." }),
  country_code: z.string({ message: "Please select a country" }).min(1, { message: "Please enter a country code." }),
  address_one: z.string({ message: "Please enter an address" }).min(3, { message: "Address must not be less than 3 characters" }).max(100, { message: "Address must not be more than 100 characters" }),
  address_two: z.any(),
  state_code: z.any(),
  state_text: z.any(),
  country_text: z.any(),
  city: z.any(),
  established: z.string({ message: "Please enter year established" }).min(4, { message: "Year must be at least 4 characters" }),
  call_code: z.any(),
  call_mobile: z.any(),
  zipcode: z.any(),
  intro: z.any(),
  category: z.string().min(2, { message: "Please select a business category" }),
  business_phrases: z.string({ message: "Please enter business phrase" }).min(3, { message: "Business Phrases must not be less than 3 characters" }).max(1e3, { message: "Business Phrases must not be more than 100 characters" }),
  products: z.string({ message: "Please enter products offered" }),
  services: z.union([
    z.string({ message: "Please enter services offered" }).min(3, { message: "Please enter up to 3 characters" }),
    z.literal("")
  ]),
  xsocial: z.any(),
  fbsocial: z.any(),
  linksocial: z.any(),
  website: z.union(
    [
      z.string().regex(urlvalidator).nullish(),
      z.literal("")
    ]
  ),
  email: z.string({ message: "Please enter an email." }).min(1, { message: "Email must not be empty" }).email({ message: "Please enter a valid email" })
}).superRefine((data, ctx) => {
  var _a, _b;
  if (((_a = data == null ? void 0 : data.address_two) == null ? void 0 : _a.length) !== 0) {
    if (((_b = data == null ? void 0 : data.address_two) == null ? void 0 : _b.length) < 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["address_two"],
        message: "Enter a minimum of 3 characters"
      });
    }
  }
});
const timeOptions$1 = [
  "Closed",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
  "24:00"
];
const BusinessWorkingHours = ({
  data,
  onChange,
  options
}) => {
  const [workingHours, setWorkingHours] = useState(null);
  const [openStatus, setOpenStatus] = useState("no_hours");
  const [working, setWorking] = useState(false);
  useNotification();
  const { showOperation, completeOperation, showError, showSuccess } = useOperation();
  const getWorkingHours = async (operatingHours) => {
    const hours = operatingHours;
    return {
      Monday: { start: hours.monday_from, end: hours.monday_to },
      Tuesday: { start: hours.tuesday_from, end: hours.tuesday_to },
      Wednesday: { start: hours.wednesday_from, end: hours.wednesday_to },
      Thursday: { start: hours.thursday_from, end: hours.thursday_to },
      Friday: { start: hours.friday_from, end: hours.friday_to },
      Saturday: { start: hours.saturday_from, end: hours.saturday_to },
      Sunday: { start: hours.sunday_from, end: hours.sunday_to }
    };
  };
  useEffect(() => {
    const loadHours = async () => {
      const hours = await getWorkingHours(data.operatingHours);
      setWorkingHours(hours);
      onChange(hours);
      setOpenStatus(data.operatingHours.open_status);
    };
    loadHours();
  }, [data.operatingHours]);
  const handleTimeChangeStart = (day, type, value) => {
    if (!workingHours) return;
    let startTime = value;
    let endTime = workingHours[day].end;
    if (endTime <= startTime && startTime !== "Closed") {
      alert(`For ${day}, closing time must be later than opening time.`);
      return;
    }
    setWorkingHours({
      ...workingHours,
      [day]: {
        ...workingHours[day],
        [type]: value
      }
    });
    onChange(workingHours);
  };
  const handleTimeChangeEnd = (day, type, value) => {
    if (!workingHours) return;
    let startTime = workingHours[day].start;
    let endTime = value;
    if (endTime <= startTime && startTime !== "Closed") {
      alert(`For ${day}, closing time must be later than opening time.`);
      return;
    }
    setWorkingHours({
      ...workingHours,
      [day]: {
        ...workingHours[day],
        [type]: value
      }
    });
    onChange(workingHours);
  };
  const handleSave = async () => {
    if (openStatus === null) {
      showError("Error", "Please select working hours.");
      return false;
    }
    setWorking(true);
    showOperation("processing", "Request is being processed.");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    try {
      const response = await saveOperatingHours(openStatus, workingHours, data.businessGuid, data.userGuid);
      console.log(response);
      completeOperation();
      showSuccess("Success", "Working hours saved.");
      setWorking(false);
    } catch (error) {
      console.log(error.message);
      showError("error", `Business working hours could not be saved.`);
    }
  };
  if (!workingHours) return /* @__PURE__ */ jsx("p", { children: "Loading working hours..." });
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: `${formWrapperClass}`, children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("div", { className: `w-full`, children: options.map((option) => /* @__PURE__ */ jsxs(
      "label",
      {
        className: `flex items-center gap-3 p-3 rounded cursor-pointer ${openStatus === option.value ? " bg-blue-50" : "border-gray-300"}`,
        children: [
          /* @__PURE__ */ jsx("div", { className: `w-[20px]`, children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "radio",
              name: "openStatus",
              value: option.value,
              checked: openStatus === option.value,
              onChange: () => setOpenStatus(option.value),
              className: `accent-blue-600 w-[20px] h-[20px]`
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: `flex flex-col`, children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-800", children: option.label }),
            /* @__PURE__ */ jsx("span", { className: `text-[13px] text-gray-500`, children: option.more })
          ] })
        ]
      },
      option.value
    )) }),
    openStatus === "selected_hours" && Object.keys(workingHours).map((day) => {
      var _a;
      return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("span", { className: "w-24 font-semibold", children: day }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: ((_a = workingHours[day]) == null ? void 0 : _a.start) || "",
            onChange: (e) => handleTimeChangeStart(day, "start", e.target.value),
            className: "border p-2 rounded",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "From..." }),
              timeOptions$1.map((time) => /* @__PURE__ */ jsx("option", { value: time, children: time }, time))
            ]
          }
        ),
        /* @__PURE__ */ jsx("span", { children: "to" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: workingHours[day].end || "",
            onChange: (e) => handleTimeChangeEnd(day, "end", e.target.value),
            className: "border p-2 rounded",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "To..." }),
              timeOptions$1.map((time) => /* @__PURE__ */ jsx("option", { value: time, children: time }, time))
            ]
          }
        )
      ] }, day);
    }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      "button",
      {
        onClick: handleSave,
        className: `mt-6 bg-blue-600 text-white px-6 py-2 
                            rounded hover:bg-blue-700 transition
                            shadow-md hover:shadow-lg hover:shadow-black/50`,
        children: working ? "Saving..." : "Save Business Hours"
      }
    ) })
  ] }) }) });
};
const index$a = () => {
  useEffect(() => {
    IsAuthenticated(localStorage);
  }, []);
  const [loading, setLoading] = useState(true);
  const [businessGuid, setBusinessGuid] = useState("");
  const [userGuid, setUserGuid] = useState("");
  const [operatingHours, setOperatingHours] = useState();
  const [workingHours, setWorkingHours] = useState([]);
  const options = [
    { value: "no_hours", label: "No Hours Available", more: "Visitors won't see business hours on this Page" },
    { value: "always_open", label: "Always Open", more: "e.g. Parks, beaches, roads" },
    { value: "permanently_closed", label: "Permanently Closed", more: "Permantently closed" },
    { value: "temporarily_closed", label: "Temporarily Closed", more: "Temporarily closed" },
    { value: "selected_hours", label: "Open During Selected Hours", more: "Open during selected hours" }
  ];
  const [data, setData] = useState(null);
  const [businessProfile, setBusinessProfile] = useState(null);
  const { business_guid, user_guid } = useParams();
  useAuth();
  useEffect(() => {
    const getAllData = async (businessGuid2, userGuid2) => {
      setBusinessGuid(businessGuid2);
      setUserGuid(userGuid2);
      const operatingHours2 = await getOperatingHours(businessGuid2, userGuid2);
      setOperatingHours(operatingHours2);
      const businessProfile2 = await getBusinessProfile(businessGuid2 || "");
      setBusinessProfile(businessProfile2);
    };
    try {
      if (business_guid && user_guid) {
        getAllData(business_guid, user_guid);
      }
    } catch (e) {
      console.log(e.message);
    }
  }, [business_guid, user_guid]);
  useEffect(() => {
    if (businessGuid && userGuid && operatingHours && businessProfile) {
      const data2 = {
        businessGuid,
        userGuid,
        operatingHours,
        businessProfile
      };
      setData(data2);
      setLoading(false);
    }
  }, [businessGuid, userGuid, operatingHours, businessProfile]);
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {},
    resolver: zodResolver(SettingsSchema)
  });
  if (loading) {
    return /* @__PURE__ */ jsx(LoadingMessage, {});
  }
  return /* @__PURE__ */ jsx(AccountLayout, { children: /* @__PURE__ */ jsx(
    ContentLayout,
    {
      title: "Settings",
      businessGuid,
      data,
      businessProfile,
      children: /* @__PURE__ */ jsx(OperationProvider, { children: data && /* @__PURE__ */ jsx("div", { className: `mt-6`, children: /* @__PURE__ */ jsx(
        BusinessWorkingHours,
        {
          data,
          onChange: setWorkingHours,
          options
        }
      ) }) })
    }
  ) });
};
const route31 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$a
}, Symbol.toStringTag, { value: "Module" }));
const AddPhoto = ({ userGuid, businessGuid }) => {
  const fileInputRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isImgSelected, setIsImageSelected] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [dialog, setDialog] = useState(false);
  const addPhoto = useAddPhotoDialogContext();
  const handleFileChange = (event) => {
    var _a;
    try {
      const file = (_a = event.target.files) == null ? void 0 : _a[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImgSrc(imageUrl);
        setSelectedFile(file);
        setIsImageSelected(true);
        addPhoto.setDialog(true);
        addPhoto.setImgSrc(imageUrl);
        addPhoto.setSelectedFile(file);
        addPhoto.setIsImageSelected(true);
        addPhoto.setUserGuid(userGuid);
        addPhoto.setBusinessGuid(businessGuid);
      }
    } finally {
      event.target.value = "";
    }
  };
  const handleImageClick = () => {
    var _a;
    (_a = fileInputRef.current) == null ? void 0 : _a.click();
  };
  return /* @__PURE__ */ jsxs("div", { className: `mb-2`, children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onMouseDown: handleImageClick,
        className: ` bg-blue-800 rounded-md px-3 py-1
                text-white hover:bg-blue-700 transition
                duration-500 ease-in-out hover:shadow-md
                 shadow-gray-900 hover:shadow-black/50`,
        children: "Add Photo"
      }
    ),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "file",
        accept: "image/*",
        ref: fileInputRef,
        className: " hidden",
        onChange: handleFileChange
      }
    )
  ] });
};
const GalleryItemMenu$2 = ({
  item,
  menu,
  userGuid,
  businessGuid
}) => {
  const [dialog, setDialog] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const editPhoto = useEditPhotoDialogContext();
  useNotification();
  const IMG_BASE_URL2 = "https://tpics.gasimg.com";
  const handleOpenDialog = () => {
    editPhoto.setDialog(true);
    editPhoto.setImgSrc(IMG_BASE_URL2 + item.image_url);
    editPhoto.setImageTitle(item.image_title);
    editPhoto.setUserGuid(userGuid);
    editPhoto.setBusinessGuid(businessGuid);
    editPhoto.setImageGuid(item.image_guid);
    setDialog(true);
  };
  const handleDelete = async () => {
    editPhoto.deletePhoto(userGuid, businessGuid, item.image_guid);
  };
  return /* @__PURE__ */ jsx("div", { className: "", children: menu && /* @__PURE__ */ jsx("div", { className: ` absolute top-2 right-2 w-[80%] bg-white
                rounded-[12px] overflow-hidden border-[1px] border-white
                shadow-md`, children: /* @__PURE__ */ jsx("div", { className: `mt-3`, children: /* @__PURE__ */ jsxs("div", { className: ` divide-y-[1px]`, children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        onMouseDown: handleOpenDialog,
        className: `py-1 hover:bg-gray-300 w-full
                                flex flex-col
                                px-2 transition duration-1000 ease-in-out`,
        children: "Edit"
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        onMouseDown: handleDelete,
        className: `py-1 hover:bg-gray-300 w-full
                                flex flex-col
                                px-2 transition duration-1000 ease-in-out`,
        children: "Delete"
      }
    )
  ] }) }) }) });
};
const GalleryItem$2 = ({
  showCarousel,
  item,
  itemIndex,
  userGuid,
  businessGuid
}) => {
  const [menu, setMenu] = useState(false);
  const IMG_BASE_URL2 = "https://tpics.gasimg.com";
  let imgconst = "";
  if (item.image_url) {
    imgconst = IMG_BASE_URL2 + item.image_url;
  } else {
    imgconst = "https://trendyblinds.ca/wp-content/uploads/2023/09/3.-3D-WALLPAPER-SKU0015.jpg";
  }
  const [imgSrc, setImgSrc] = useState(imgconst);
  const showMenu = () => {
    setMenu(true);
  };
  const hideMenu = async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    setMenu(false);
  };
  return /* @__PURE__ */ jsx("div", { className: "z-0", children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: `border-[1px] h-fit p-1 rounded-md shadow-md
                    hover:cursor-pointer relative z-0`,
      children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onMouseDown: showMenu,
            onBlur: hideMenu,
            className: `w-[30px] h-[30px] z-50 bg-white 
                flex place-content-center place-items-center 
                rounded-full absolute right-2 top-2 cursor-pointer
                hover:bg-gray-500 hover:text-white/80 transition duration-1000 ease-in-out`,
            children: /* @__PURE__ */ jsx(BiEditAlt, { className: `text-[20px]` })
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            onMouseDown: (e) => showCarousel(itemIndex),
            className: `relative h-[100px] md:h-[170px] xl:h-[160px]
                         rounded-md overflow-hidden -z-10
                    `,
            children: /* @__PURE__ */ jsx(
              "img",
              {
                src: imgSrc,
                alt: "",
                className: `object-cover w-full h-full -z-40
                        `
              }
            )
          }
        ),
        item.image_title.length > 0 && /* @__PURE__ */ jsx("div", { className: `text-[13px] mt-2 mb-1.5 leading-[1.2em] mx-[2px] line-clamp-2`, children: item.image_title }),
        /* @__PURE__ */ jsx(
          GalleryItemMenu$2,
          {
            item,
            menu,
            userGuid,
            businessGuid
          }
        )
      ]
    }
  ) });
};
const Slider$2 = ({ slides, selectedSlide, handleClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  useRef(0);
  useRef(0);
  const prev = () => {
    setCurrentSlide((currentSlide2) => {
      return currentSlide2 === 0 ? slides.length - 1 : currentSlide2 - 1;
    });
  };
  const next = () => {
    setCurrentSlide((currentSlide2) => {
      return currentSlide2 === slides.length - 1 ? 0 : currentSlide2 + 1;
    });
  };
  useEffect(() => {
    if (selectedSlide !== null) {
      setCurrentSlide(selectedSlide - 1);
    }
  }, [selectedSlide]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-12 gap-0 `, children: [
    /* @__PURE__ */ jsxs("div", { className: `col-span-12 md:col-span-9 w-full h-full relative bg-black flex`, children: [
      /* @__PURE__ */ jsx("div", { className: ` w-auto h-screen flex overflow-hidden`, children: slides.map((slide, index2) => {
        return /* @__PURE__ */ jsx(
          "img",
          {
            src: slide.image_url,
            alt: "",
            style: { transform: `translateX(-${currentSlide * 100}%)` },
            className: `object-scale-down w-full h-full 
                                            block flex-shrink-0 flex-grow-0 transition-transform
                                            ease-in-out duration-1000`
          },
          index2
        );
      }) }),
      /* @__PURE__ */ jsx("button", { onMouseDown: prev, className: `block absolute top-0 bottom-0 
                p-[1rem] cursor-pointer left-0 group h-full 
                transition duration-1000 ease-in-out`, children: /* @__PURE__ */ jsx("div", { className: `w-[50px] h-[50px] bg-white/60 rounded-full place-content-center place-items-center group-hover:bg-white/30
                        transition duration-500 ease-in-out`, children: /* @__PURE__ */ jsx(BiChevronLeft, { className: " stroke-white fill-black w-[2rem] h-[2rem]" }) }) }),
      /* @__PURE__ */ jsx("button", { onMouseDown: next, className: `block absolute top-0 bottom-0 
                    p-[1rem] cursor-pointer right-0 group 
                     transition duration-1000 ease-in-out`, children: /* @__PURE__ */ jsx("div", { className: `w-[50px] h-[50px] bg-white/60 rounded-full flex place-content-center place-items-center group-hover:bg-white/30
                        transition duration-500 ease-in-out`, children: /* @__PURE__ */ jsx(BiChevronRight, { className: " stroke-white fill-black w-[2rem] h-[2rem]" }) }) }),
      /* @__PURE__ */ jsx(
        "div",
        {
          onMouseDown: () => handleClose(),
          className: `w-[50px] h-[50px] z-[300] bg-white
                    flex place-content-center place-items-center
                    rounded-full absolute left-2 top-2 cursor-pointer
                    hover:bg-white/40 transition duration-1000 ease-in-out`,
          children: /* @__PURE__ */ jsx(IoClose, { className: `text-[30px]` })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `hidden md:block md:col-span-3 px-5`, children: [
      /* @__PURE__ */ jsx("h1", { className: " text-[22px] my-4 font-sans font-extrabold tracking-tight leading-[24px]", children: "Photos for Jason Won, DPT - Flex With Doctor Jay" }),
      /* @__PURE__ */ jsxs("div", { className: " my-4 ", children: [
        currentSlide + 1,
        " / ",
        slides.length
      ] }),
      /* @__PURE__ */ jsx("hr", {}),
      /* @__PURE__ */ jsx("div", { className: " my-4", children: slides[currentSlide].image_title })
    ] })
  ] }) });
};
const Carousel$2 = ({
  overlay,
  setOverlay,
  selectedSlide,
  handleClose,
  gallery
}) => {
  return /* @__PURE__ */ jsx("div", { children: overlay && /* @__PURE__ */ jsx(
    "div",
    {
      className: `flex w-screen h-screen bg-white z-[1000] 
                fixed top-0 left-0 right-0 bottom-0 `,
      children: gallery && selectedSlide && /* @__PURE__ */ jsx(
        Slider$2,
        {
          slides: gallery,
          selectedSlide,
          handleClose
        }
      )
    }
  ) });
};
const Gallery$1 = ({ gallery, userGuid, businessGuid, listing }) => {
  const [overlay, setOverlay] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(0);
  const slider = useSliderContext();
  const handleClose = () => {
    setOverlay(false);
  };
  const showCarousel = (index2) => {
    slider.setDialog(true);
    slider.setSelectedSlide(index2 + 1);
    slider.setGallery(gallery);
    slider.setListing(listing);
  };
  return /* @__PURE__ */ jsxs("div", { className: ``, children: [
    /* @__PURE__ */ jsx("div", { className: ` border-[1px] p-3 rounded-[5px] 
                grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
                lg:grid-cols-4 xl:grid-cols-5 gap-2 z-0`, children: gallery.map((item, index2) => {
      return /* @__PURE__ */ jsx("div", { className: "z-0", children: /* @__PURE__ */ jsx(
        GalleryItem$2,
        {
          showCarousel,
          item,
          itemIndex: index2,
          userGuid,
          businessGuid
        }
      ) }, index2);
    }) }),
    /* @__PURE__ */ jsx(
      Carousel$2,
      {
        overlay,
        setOverlay,
        selectedSlide: selectedSlide + 1,
        handleClose,
        gallery
      }
    )
  ] });
};
const index$9 = () => {
  useEffect(() => {
    IsAuthenticated(localStorage);
  }, []);
  const [businessGuid, setBusinessGuid] = useState("");
  const [userGuid, setUserGuid] = useState("");
  const [gallery, setGallery] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { business_guid, user_guid } = useParams();
  const [businessProfile, setBusinessProfile] = useState(null);
  const auth = useAuth();
  if (!auth) {
    return null;
  }
  useEffect(() => {
    const getAllData = async (businessGuid2, userGuid2) => {
      setBusinessGuid(businessGuid2);
      setUserGuid(userGuid2);
      const gallery2 = await getGallery(businessGuid2, userGuid2);
      setGallery(gallery2);
      const businessProfile2 = await getBusinessProfile(businessGuid2 || "");
      setBusinessProfile(businessProfile2);
    };
    try {
      if (business_guid && user_guid) {
        getAllData(business_guid, user_guid);
      }
    } catch (e) {
      console.log(e.message);
    }
  }, [business_guid, user_guid]);
  useEffect(() => {
    if (businessGuid && userGuid && gallery && businessProfile) {
      const data2 = {
        businessGuid,
        userGuid,
        gallery,
        businessProfile
      };
      setData(data2);
      setLoading(false);
    }
  }, [businessGuid, userGuid, gallery, businessProfile]);
  if (loading) {
    return /* @__PURE__ */ jsx(LoadingMessage, {});
  }
  return /* @__PURE__ */ jsx(AccountLayout, { children: /* @__PURE__ */ jsx(
    ContentLayout,
    {
      title: "Gallery Settings",
      businessGuid,
      data,
      businessProfile,
      children: /* @__PURE__ */ jsxs(OperationProvider, { children: [
        businessGuid && userGuid && /* @__PURE__ */ jsx(AddPhoto, { userGuid, businessGuid }),
        gallery.length > 0 ? /* @__PURE__ */ jsx("div", { className: "z-0", children: /* @__PURE__ */ jsx(
          Gallery$1,
          {
            gallery,
            userGuid,
            businessGuid,
            listing: businessProfile
          }
        ) }) : /* @__PURE__ */ jsx("div", { className: " mt-2 border-[1px] rounded-lg p-3 mb-6", children: "Gallery is empty" })
      ] })
    }
  ) });
};
const route32 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$9
}, Symbol.toStringTag, { value: "Module" }));
const AddProductDialogContext = createContext(null);
function useAddProductDialogContext() {
  const context = useContext(AddProductDialogContext);
  return context;
}
function AddProductDialogProvider({ children }) {
  const [working, setWorking] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const [userGuid, setUserGuid] = useState(null);
  const [businessGuid, setBusinessGuid] = useState(null);
  const [isImgSelected, setIsImageSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [productTitle, setProductTitle] = useState(null);
  const [productLink, setProductLink] = useState(null);
  const [productDescription, setProductDescription] = useState(null);
  const [formData, setFormdata] = useState(null);
  const fileInputRef = useRef(null);
  const notification = useNotification();
  const { showOperation, showError, completeOperation, showSuccess } = useOperation();
  const handleCloseDialog = () => {
    setDialog(false);
    setImgSrc(null);
    setWorking(false);
  };
  const handleImageClick = () => {
    var _a;
    (_a = fileInputRef.current) == null ? void 0 : _a.click();
  };
  const handleFileChange = (event) => {
    var _a;
    const file = (_a = event.target.files) == null ? void 0 : _a[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImgSrc(imageUrl);
      setSelectedFile(file);
      setIsImageSelected(true);
    }
  };
  const handleUpdate = async () => {
    showOperation("processing");
    setWorking(true);
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    let productTitle2 = document.getElementById("product_title");
    let productDescription2 = document.getElementById("product_description");
    let productLink2 = document.getElementById("product_link");
    const formData2 = new FormData();
    if (isImgSelected) {
      formData2.append("file", selectedFile);
    }
    formData2.append("guid", userGuid);
    formData2.append("bid", businessGuid);
    formData2.append("product_title", productTitle2.value || "");
    formData2.append("product_description", productDescription2.value || "");
    formData2.append("product_link", productLink2.value || "");
    const endpoint = "/business_gallery_product_upload";
    const url = config.IMG_BASE_URL + endpoint;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*"
        },
        body: formData2
      });
      if (!response.ok) {
        let error = response.json().then((data) => {
          console.log(data.message);
          showError("Error", `Failed to add product: ${data.message}`);
          completeOperation();
        });
      } else {
        try {
          showSuccess("Success", `Product saved.`);
          completeOperation();
        } finally {
          window.location.reload();
        }
      }
    } catch (error) {
      return void 0;
    } finally {
      setWorking(false);
    }
  };
  const deleteProduct = async (userGuid2, businessGuid2, imageGuid) => {
    const IMG_BASE_URL2 = "https://tpics.gasimg.com";
    const endpoint = `/delete_business_gallery_pic`;
    const url = IMG_BASE_URL2 + endpoint;
    const data = {
      guid: userGuid2,
      bid: businessGuid2,
      image_guid: imageGuid
    };
    setWorking(true);
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers$1,
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        let error = response.json().then((data2) => {
          notification.alert(data2.message);
        });
      } else {
        notification.alertReload("", "Image deleted successfully!");
      }
    } catch (error) {
      return alert(error.message);
    } finally {
      setWorking(false);
    }
  };
  let vals = {
    dialog,
    setDialog,
    handleCloseDialog,
    imgSrc,
    setImgSrc,
    userGuid,
    setUserGuid,
    businessGuid,
    setBusinessGuid,
    isImgSelected,
    setIsImageSelected,
    selectedFile,
    setSelectedFile,
    productTitle,
    setProductTitle,
    productDescription,
    setProductDescription,
    productLink,
    setProductLink,
    deleteProduct
  };
  return /* @__PURE__ */ jsxs(AddProductDialogContext.Provider, { value: vals, children: [
    dialog && /* @__PURE__ */ jsx(
      "div",
      {
        onMouseDown: (e) => setDialog(false),
        className: `fixed w-screen h-screen z-[3100] 
                 top-0 left-0 right-0 bottom-0 bg-black/30
                place-content-center place-items-center`,
        children: /* @__PURE__ */ jsx(
          "div",
          {
            className: `relative max-w-[90%] w-[90%] h-[80%] bg-white 
                        rounded-[8px] overflow-hidden z-[3100] mx-auto `,
            onMouseDown: (e) => e.stopPropagation(),
            children: /* @__PURE__ */ jsxs("div", { className: `w-full h-full overflow-y-auto`, children: [
              /* @__PURE__ */ jsxs("div", { className: `relative w-full h-[75%] bg-black`, children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: imgSrc,
                    alt: "",
                    className: `object-scale-down w-full h-full`
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "file",
                    accept: "image/*",
                    ref: fileInputRef,
                    className: "hidden",
                    onChange: handleFileChange
                  }
                ),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `flex place-content-center place-items-center
                                        bg-black/10 w-full h-full absolute z-0 top-0 object-cover
                                        text-white/80 `,
                    onMouseDown: handleImageClick,
                    children: /* @__PURE__ */ jsx("div", { className: `w-[60px] h-[60px] flex flex-col
                                        place-content-center place-items-center bg-white/50
                                        hover:cursor-pointer hover:bg-white/50
                                        rounded-full transition duration-300 ease-in-out`, children: /* @__PURE__ */ jsx(MdEditSquare, { className: " text-[30px]" }) })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: `h-[25%] space-y-1`, children: [
                /* @__PURE__ */ jsxs("div", { className: `flex mb-1 flex-col mx-3 `, children: [
                  /* @__PURE__ */ jsx("div", { className: `text-[14px] font-semibold py-1`, children: "Enter product title" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      onChange: (e) => setProductTitle(e.target.value),
                      id: "product_title",
                      value: productTitle || "",
                      placeholder: `Enter product title.`,
                      className: `w-full border-[1px] border-gray-700 bg-gray-100 px-3 py-4 outline-none rounded-lg`
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: `flex mb-1 flex-col mx-3 `, children: [
                  /* @__PURE__ */ jsx("div", { className: `text-[14px] font-semibold py-1`, children: "Enter product description" }),
                  /* @__PURE__ */ jsx(
                    "textarea",
                    {
                      onChange: (e) => setProductDescription(e.target.value),
                      id: "product_description",
                      value: productDescription || "",
                      placeholder: `Enter product description.`,
                      className: `w-full border-[1px] border-gray-700 bg-gray-100 px-3 py-4 outline-none rounded-lg`
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: `flex mb-1 flex-col mx-3 `, children: [
                  /* @__PURE__ */ jsx("div", { className: `text-[14px] font-semibold py-1`, children: "Enter product link" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      onChange: (e) => setProductLink(e.target.value),
                      id: "product_link",
                      value: productLink || "",
                      placeholder: `Enter product link.`,
                      className: `w-full border-[1px] border-gray-700 bg-gray-100 px-3 py-4 outline-none rounded-lg`
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: `flex place-content-end px-3 gap-2`, children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onMouseDown: () => handleCloseDialog(),
                      className: `bg-gray-800 text-white px-3 py-1.5 rounded-md
                                    shadow-md mb-2 mt-4`,
                      children: "Cancel"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => handleUpdate(),
                      className: `bg-blue-800 text-white px-3 py-1.5 rounded-md
                                    shadow-md mb-2 mt-4`,
                      children: working ? "Working..." : "Submit"
                    }
                  )
                ] })
              ] })
            ] })
          }
        )
      }
    ),
    children
  ] });
}
const AddProduct = ({ userGuid, businessGuid }) => {
  const addProduct = useAddProductDialogContext();
  const handleOpenDialog = () => {
    addProduct.setDialog(true);
    addProduct.setUserGuid(userGuid);
    addProduct.setBusinessGuid(businessGuid);
  };
  return /* @__PURE__ */ jsx("div", { className: `mb-2`, children: /* @__PURE__ */ jsx(
    "button",
    {
      onMouseDown: handleOpenDialog,
      className: ` bg-blue-800 rounded-md px-3 py-1
                text-white hover:bg-blue-700 transition
                duration-500 ease-in-out hover:shadow-md
                 shadow-gray-900 hover:shadow-black/50`,
      children: "Add Product"
    }
  ) });
};
const EditProductDialogContext = createContext(null);
function useEditProductDialogContext() {
  const context = useContext(EditProductDialogContext);
  return context;
}
function EditProductDialogProvider({ children }) {
  const [working, setWorking] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const [userGuid, setUserGuid] = useState(null);
  const [businessGuid, setBusinessGuid] = useState(null);
  const [isImgSelected, setIsImageSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [productTitle, setProductTitle] = useState(null);
  const [productDescription, setProductDescription] = useState(null);
  const [productLink, setProductLink] = useState(null);
  const [imageGuid, setImageGuid] = useState(null);
  const [productGuid, setProductGuid] = useState("null");
  const [formData, setFormdata] = useState(null);
  const fileInputRef = useRef(null);
  useNotification();
  const { showOperation, showError, completeOperation, showSuccess } = useOperation();
  const handleCloseDialog = () => {
    setDialog(false);
    setImgSrc(null);
    setWorking(false);
  };
  const handleImageClick = () => {
    var _a;
    (_a = fileInputRef.current) == null ? void 0 : _a.click();
  };
  const handleFileChange = (event) => {
    var _a;
    const file = (_a = event.target.files) == null ? void 0 : _a[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImgSrc(imageUrl);
      setSelectedFile(file);
      setIsImageSelected(true);
    }
  };
  const handleUpdate = async () => {
    showOperation("processing");
    setWorking(true);
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    let productTitle2 = document.getElementById("product_title");
    let productDescription2 = document.getElementById("product_description");
    let productLink2 = document.getElementById("product_link");
    const formData2 = new FormData();
    if (isImgSelected) {
      formData2.append("file", selectedFile);
    }
    formData2.append("guid", userGuid);
    formData2.append("bid", businessGuid);
    formData2.append("product_title", productTitle2.value);
    formData2.append("product_description", productDescription2.value);
    formData2.append("product_link", productLink2.value);
    formData2.append("product_guid", productGuid);
    const IMG_BASE_URL2 = "https://tpics.gasimg.com";
    const endpoint = "/business_gallery_product_update";
    const url = IMG_BASE_URL2 + endpoint;
    console.log(Object.fromEntries(formData2.entries()));
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*"
        },
        body: formData2
      });
      if (!response.ok) {
        let error = response.json().then((data) => {
          console.log(data.message);
          showError("Error", "Update failed");
          completeOperation();
        });
      } else {
        showSuccess("Success", "Product saved.");
        completeOperation();
      }
    } catch (error) {
      return void 0;
    } finally {
      setWorking(false);
    }
  };
  const deleteProduct = async (userGuid2, businessGuid2, productGuid2) => {
    const IMG_BASE_URL2 = "https://tpics.gasimg.com";
    const endpoint = `/delete_business_product`;
    const url = IMG_BASE_URL2 + endpoint;
    const data = {
      guid: userGuid2,
      bid: businessGuid2,
      product_guid: productGuid2
    };
    showOperation("processing");
    setWorking(true);
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers$1,
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        let error = response.json().then((data2) => {
          console.log(data2);
          showError("Error", `Delete failed.`);
          completeOperation();
        });
      } else {
        try {
          showSuccess("Success", "Product deleted.");
          completeOperation();
          await new Promise((resolve) => setTimeout(resolve, 500));
        } finally {
          window.location.reload();
        }
      }
    } catch (error) {
      showError("Error", "Product delete failed.");
      console.log(error.message);
    } finally {
      setWorking(false);
    }
  };
  let vals = {
    dialog,
    setDialog,
    handleCloseDialog,
    imgSrc,
    setImgSrc,
    userGuid,
    setUserGuid,
    businessGuid,
    setBusinessGuid,
    isImgSelected,
    setIsImageSelected,
    selectedFile,
    setSelectedFile,
    productTitle,
    setProductTitle,
    productDescription,
    setProductDescription,
    productLink,
    setProductLink,
    productGuid,
    setProductGuid,
    deleteProduct
  };
  return /* @__PURE__ */ jsxs(EditProductDialogContext.Provider, { value: vals, children: [
    dialog && /* @__PURE__ */ jsx("div", { className: `fixed w-screen h-screen bg-black/30 z-[3000]`, children: /* @__PURE__ */ jsx("div", { className: `fixed w-screen h-screen z-[3000] 
                 top-0 left-0 right-0 bottom-0 bg-black/30
                place-content-center place-items-center`, children: /* @__PURE__ */ jsx(
      "div",
      {
        className: `relative max-w-[90%] w-[90%] h-[80%] bg-white 
                        rounded-[8px] overflow-hidden z-[3100] mx-auto `,
        children: /* @__PURE__ */ jsxs("div", { className: `w-full h-full overflow-y-auto`, children: [
          /* @__PURE__ */ jsxs("div", { className: `relative w-full h-[75%] bg-black`, children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: imgSrc,
                alt: "",
                className: `object-scale-down w-full h-full`
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                accept: "image/*",
                ref: fileInputRef,
                className: "hidden",
                onChange: handleFileChange
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `flex place-content-center place-items-center
                                        bg-black/10 w-full h-full absolute z-0 top-0 object-cover
                                        text-white/80 `,
                onMouseDown: handleImageClick,
                children: /* @__PURE__ */ jsx("div", { className: `w-[60px] h-[60px] flex flex-col
                                        place-content-center place-items-center bg-white/50
                                        hover:cursor-pointer hover:bg-white/50
                                        rounded-full transition duration-300 ease-in-out`, children: /* @__PURE__ */ jsx(MdEditSquare, { className: " text-[30px]" }) })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `h-[25%]`, children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                onChange: (e) => setProductTitle(e.target.value),
                id: "product_title",
                value: productTitle || "",
                placeholder: `Enter product title.`,
                className: `w-full bg-gray-100 px-3  py-3 mb-1`
              }
            ),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                onChange: (e) => setProductDescription(e.target.value),
                id: "product_description",
                value: productDescription || "",
                placeholder: `Enter product description.`,
                className: `w-full bg-gray-100 px-3  h-[60px] py-3`
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                onChange: (e) => setProductLink(e.target.value),
                id: "product_link",
                value: productLink || "",
                placeholder: `Enter product link.`,
                className: `w-full bg-gray-100 px-3 py-3`
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: `flex place-content-end px-3 gap-2`, children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onMouseDown: () => window.location.reload(),
                  className: `bg-gray-800 text-white px-3 py-1.5 rounded-md
                                    shadow-md mb-2 mt-4`,
                  children: "Reload"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onMouseDown: () => handleCloseDialog(),
                  className: `bg-gray-800 text-white px-3 py-1.5 rounded-md
                                    shadow-md mb-2 mt-4`,
                  children: "Close"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleUpdate(),
                  className: `bg-blue-800 text-white px-3 py-1.5 rounded-md
                                    shadow-md mb-2 mt-4`,
                  children: working ? "Working..." : "Submit"
                }
              )
            ] })
          ] })
        ] })
      }
    ) }) }),
    children
  ] });
}
const GalleryItemMenu$1 = ({
  product,
  menu,
  userGuid,
  businessGuid
}) => {
  const [dialog, setDialog] = useState(false);
  const [videoSrc, setVideoSrc] = useState(null);
  const editProduct = useEditProductDialogContext();
  useNotification();
  const handleOpenDialog = () => {
    editProduct.setDialog(true);
    editProduct.setImgSrc(config.IMG_BASE_URL + product.product_image_url);
    editProduct.setProductTitle(product.product_title);
    editProduct.setProductDescription(product.product_description);
    editProduct.setProductLink(product.product_link);
    editProduct.setProductGuid(product.product_guid);
    editProduct.setUserGuid(userGuid);
    editProduct.setBusinessGuid(businessGuid);
  };
  const handleDelete = async () => {
    editProduct.deleteProduct(userGuid, businessGuid, product.product_guid);
  };
  return /* @__PURE__ */ jsx("div", { className: "", children: menu && /* @__PURE__ */ jsx("div", { className: ` absolute top-2 right-2 w-[80%] bg-white
                rounded-[12px] overflow-hidden border-[1px] border-white
                shadow-md`, children: /* @__PURE__ */ jsx("div", { className: `mt-3`, children: /* @__PURE__ */ jsxs("div", { className: ` divide-y-[1px]`, children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        onMouseDown: handleOpenDialog,
        className: `py-1 hover:bg-gray-300 w-full
                                flex flex-col
                                px-2 transition duration-1000 ease-in-out`,
        children: "Edit"
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        onMouseDown: handleDelete,
        className: `py-1 hover:bg-gray-300 w-full
                                flex flex-col
                                px-2 transition duration-1000 ease-in-out`,
        children: "Delete"
      }
    )
  ] }) }) }) });
};
const GalleryItem$1 = ({
  showCarousel,
  product,
  itemIndex,
  userGuid,
  businessGuid
}) => {
  const [menu, setMenu] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const IMG_BASE_URL2 = "https://tpics.gasimg.com";
  let imgconst = "";
  if (product.product_image_url) {
    imgconst = IMG_BASE_URL2 + product.product_image_url;
  } else {
    imgconst = "https://trendyblinds.ca/wp-content/uploads/2023/09/3.-3D-WALLPAPER-SKU0015.jpg";
  }
  const [imgSrc, setImgSrc] = useState(imgconst);
  const showMenu = () => {
    setMenu(true);
  };
  const hideMenu = async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    setMenu(false);
  };
  useEffect(() => {
    if (product) {
      const videoId2 = getYoutubeId(product == null ? void 0 : product.product_link);
      setVideoId(videoId2);
    }
  }, [product]);
  return /* @__PURE__ */ jsx("div", { className: "z-0", children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: `border-[1px] h-fit p-1 rounded-md shadow-md
                    hover:cursor-pointer relative z-0`,
      children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onMouseDown: showMenu,
            onBlur: hideMenu,
            className: `w-[30px] h-[30px] z-50 bg-white 
                flex place-content-center place-items-center 
                rounded-full absolute right-2 top-2 cursor-pointer
                hover:bg-gray-500 hover:text-white/80 transition duration-1000 ease-in-out`,
            children: /* @__PURE__ */ jsx(BiEditAlt, { className: `text-[20px]` })
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            onMouseDown: (e) => showCarousel(itemIndex),
            className: `relative h-[100px] md:h-[170px] xl:h-[160px]
                         rounded-md overflow-hidden -z-10
                    `,
            children: /* @__PURE__ */ jsx(
              "img",
              {
                src: config.IMG_BASE_URL + (product == null ? void 0 : product.product_image_url),
                alt: "",
                className: `object-cover w-full h-full -z-40
                        `
              }
            )
          }
        ),
        (product == null ? void 0 : product.product_title).length > 0 && /* @__PURE__ */ jsx("div", { className: `text-[13px] mt-2 mb-1.5 leading-[1.2em] mx-[2px] line-clamp-2`, children: product == null ? void 0 : product.product_title }),
        /* @__PURE__ */ jsx(
          GalleryItemMenu$1,
          {
            product,
            menu,
            userGuid,
            businessGuid
          }
        )
      ]
    }
  ) });
};
const Slider$1 = ({ slides, selectedSlide, handleClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  useRef(0);
  useRef(0);
  const prev = () => {
    setCurrentSlide((currentSlide2) => {
      return currentSlide2 === 0 ? slides.length - 1 : currentSlide2 - 1;
    });
  };
  const next = () => {
    setCurrentSlide((currentSlide2) => {
      return currentSlide2 === slides.length - 1 ? 0 : currentSlide2 + 1;
    });
  };
  useEffect(() => {
    if (selectedSlide !== null) {
      setCurrentSlide(selectedSlide - 1);
    }
  }, [selectedSlide]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-12 gap-0 `, children: [
    /* @__PURE__ */ jsxs("div", { className: `col-span-12 md:col-span-9 w-full h-full relative bg-black flex`, children: [
      /* @__PURE__ */ jsx("div", { className: ` w-auto h-screen flex overflow-hidden`, children: slides.map((slide, index2) => {
        return /* @__PURE__ */ jsx(
          "img",
          {
            src: slide.image_url,
            alt: "",
            style: { transform: `translateX(-${currentSlide * 100}%)` },
            className: `object-scale-down w-full h-full 
                                            block flex-shrink-0 flex-grow-0 transition-transform
                                            ease-in-out duration-1000`
          },
          index2
        );
      }) }),
      /* @__PURE__ */ jsx("button", { onMouseDown: prev, className: `block absolute top-0 bottom-0 
                p-[1rem] cursor-pointer left-0 group h-full 
                transition duration-1000 ease-in-out`, children: /* @__PURE__ */ jsx("div", { className: `w-[50px] h-[50px] bg-white/60 rounded-full place-content-center place-items-center group-hover:bg-white/30
                        transition duration-500 ease-in-out`, children: /* @__PURE__ */ jsx(BiChevronLeft, { className: " stroke-white fill-black w-[2rem] h-[2rem]" }) }) }),
      /* @__PURE__ */ jsx("button", { onMouseDown: next, className: `block absolute top-0 bottom-0 
                    p-[1rem] cursor-pointer right-0 group 
                     transition duration-1000 ease-in-out`, children: /* @__PURE__ */ jsx("div", { className: `w-[50px] h-[50px] bg-white/60 rounded-full flex place-content-center place-items-center group-hover:bg-white/30
                        transition duration-500 ease-in-out`, children: /* @__PURE__ */ jsx(BiChevronRight, { className: " stroke-white fill-black w-[2rem] h-[2rem]" }) }) }),
      /* @__PURE__ */ jsx(
        "div",
        {
          onMouseDown: () => handleClose(),
          className: `w-[50px] h-[50px] z-[300] bg-white
                    flex place-content-center place-items-center
                    rounded-full absolute left-2 top-2 cursor-pointer
                    hover:bg-white/40 transition duration-1000 ease-in-out`,
          children: /* @__PURE__ */ jsx(IoClose, { className: `text-[30px]` })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `hidden md:block md:col-span-3 px-5`, children: [
      /* @__PURE__ */ jsx("h1", { className: " text-[22px] my-4 font-sans font-extrabold tracking-tight leading-[24px]", children: "Photos for Jason Won, DPT - Flex With Doctor Jay" }),
      /* @__PURE__ */ jsxs("div", { className: " my-4 ", children: [
        currentSlide + 1,
        " / ",
        slides.length
      ] }),
      /* @__PURE__ */ jsx("hr", {}),
      /* @__PURE__ */ jsx("div", { className: " my-4", children: slides[currentSlide].image_title })
    ] })
  ] }) });
};
const Carousel$1 = ({
  overlay,
  setOverlay,
  selectedSlide,
  handleClose,
  gallery
}) => {
  return /* @__PURE__ */ jsx("div", { children: overlay && /* @__PURE__ */ jsx(
    "div",
    {
      className: `flex w-screen h-screen bg-white z-[1000] 
                fixed top-0 left-0 right-0 bottom-0 `,
      children: gallery && selectedSlide && /* @__PURE__ */ jsx(
        Slider$1,
        {
          slides: gallery,
          selectedSlide,
          handleClose
        }
      )
    }
  ) });
};
const ProductGallery = ({ productGallery, userGuid, businessGuid, listing }) => {
  const [overlay, setOverlay] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(0);
  const slider = useProductSliderContext();
  const handleClose = () => {
    setOverlay(false);
  };
  const showCarousel = (index2) => {
    slider.setDialog(true);
    slider.setSelectedSlide(index2 + 1);
    slider.setGallery(productGallery);
    slider.setListing(listing);
  };
  return /* @__PURE__ */ jsxs("div", { className: ``, children: [
    /* @__PURE__ */ jsx("div", { className: ` border-[1px] p-3 rounded-[5px] 
                grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
                lg:grid-cols-4 xl:grid-cols-5 gap-2 z-0`, children: productGallery == null ? void 0 : productGallery.map((product, index2) => {
      return /* @__PURE__ */ jsx("div", { className: "z-0", children: /* @__PURE__ */ jsx(
        GalleryItem$1,
        {
          showCarousel,
          product,
          itemIndex: index2,
          userGuid,
          businessGuid
        }
      ) }, index2);
    }) }),
    /* @__PURE__ */ jsx(
      Carousel$1,
      {
        overlay,
        setOverlay,
        selectedSlide: selectedSlide + 1,
        handleClose,
        gallery: productGallery
      }
    )
  ] });
};
const index$8 = () => {
  useEffect(() => {
    IsAuthenticated(localStorage);
  }, []);
  const [businessGuid, setBusinessGuid] = useState("");
  const [userGuid, setUserGuid] = useState("");
  const [productGallery, setProductGallery] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { business_guid, user_guid } = useParams();
  const [businessProfile, setBusinessProfile] = useState(null);
  const auth = useAuth();
  if (!auth) {
    return null;
  }
  useEffect(() => {
    const getAllData = async (businessGuid2, userGuid2) => {
      setBusinessGuid(businessGuid2);
      setUserGuid(userGuid2);
      const productGallery2 = await getProductGallery(businessGuid2, userGuid2);
      setProductGallery(productGallery2);
      const businessProfile2 = await getBusinessProfile(businessGuid2 || "");
      setBusinessProfile(businessProfile2);
    };
    try {
      if (business_guid && user_guid) {
        getAllData(business_guid, user_guid);
      }
    } catch (e) {
      console.log(e.message);
    }
  }, [business_guid, user_guid]);
  useEffect(() => {
    if (businessGuid && userGuid && productGallery && businessProfile) {
      const data2 = {
        businessGuid,
        userGuid,
        productGallery,
        businessProfile
      };
      setData(data2);
      setLoading(false);
    }
  }, [businessGuid, userGuid, productGallery, businessProfile]);
  if (loading) {
    return /* @__PURE__ */ jsx(LoadingMessage, {});
  }
  return /* @__PURE__ */ jsx(EditProductDialogProvider, { children: /* @__PURE__ */ jsx(ProductSliderProvider, { children: /* @__PURE__ */ jsx(AddProductDialogProvider, { children: /* @__PURE__ */ jsx(AccountLayout, { children: /* @__PURE__ */ jsxs(
    ContentLayout,
    {
      title: "Product Settings",
      businessGuid,
      data,
      businessProfile,
      children: [
        businessGuid && userGuid && /* @__PURE__ */ jsx(AddProduct, { userGuid, businessGuid }),
        productGallery !== null && (productGallery == null ? void 0 : productGallery.length) > 0 ? /* @__PURE__ */ jsx("div", { className: "z-0", children: /* @__PURE__ */ jsx(
          ProductGallery,
          {
            productGallery,
            userGuid,
            businessGuid,
            listing: businessProfile
          }
        ) }) : /* @__PURE__ */ jsx("div", { className: " mt-2 border-[1px] rounded-lg p-3 mb-6", children: "Video Gallery is empty." })
      ]
    }
  ) }) }) }) });
};
const route33 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$8
}, Symbol.toStringTag, { value: "Module" }));
const GalleryItemMenu = ({
  item,
  menu,
  userGuid,
  businessGuid
}) => {
  const [dialog, setDialog] = useState(false);
  const [videoSrc, setVideoSrc] = useState(null);
  const editVideo = useEditVideoDialogContext();
  const notification = useNotification();
  const handleOpenDialog = () => {
    editVideo.setDialog(true);
    editVideo.setVideoSrc(item.video_url);
    editVideo.setVideoTitle(item.video_title);
    editVideo.setUserGuid(userGuid);
    editVideo.setBusinessGuid(businessGuid);
    editVideo.setVideoGuid(item.video_guid);
    editVideo.setVideoDescription(item.video_description);
  };
  const handleDelete = async () => {
    notification.notify();
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    editVideo.deleteVideo(userGuid, businessGuid, item.video_guid);
  };
  return /* @__PURE__ */ jsx("div", { className: "", children: menu && /* @__PURE__ */ jsx("div", { className: ` absolute top-2 right-2 w-[80%] bg-white
                rounded-[12px] overflow-hidden border-[1px] border-white
                shadow-md`, children: /* @__PURE__ */ jsx("div", { className: `mt-3`, children: /* @__PURE__ */ jsxs("div", { className: ` divide-y-[1px]`, children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        onMouseDown: handleOpenDialog,
        className: `py-1 hover:bg-gray-300 w-full
                                flex flex-col
                                px-2 transition duration-1000 ease-in-out`,
        children: "Edit"
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        onMouseDown: handleDelete,
        className: `py-1 hover:bg-gray-300 w-full
                                flex flex-col
                                px-2 transition duration-1000 ease-in-out`,
        children: "Delete"
      }
    )
  ] }) }) }) });
};
const GalleryItem = ({
  showCarousel,
  item,
  itemIndex,
  userGuid,
  businessGuid
}) => {
  const [menu, setMenu] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const IMG_BASE_URL2 = "https://tpics.gasimg.com";
  let imgconst = "";
  if (item.video_url) {
    imgconst = IMG_BASE_URL2 + item.video_url;
  } else {
    imgconst = "https://trendyblinds.ca/wp-content/uploads/2023/09/3.-3D-WALLPAPER-SKU0015.jpg";
  }
  const [imgSrc, setImgSrc] = useState(imgconst);
  const showMenu = () => {
    setMenu(true);
  };
  const hideMenu = async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    setMenu(false);
  };
  useEffect(() => {
    if (item) {
      const videoId2 = getYoutubeId(item == null ? void 0 : item.video_url);
      setVideoId(videoId2);
    }
  }, [item]);
  return /* @__PURE__ */ jsx("div", { className: "z-0", children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: `border-[1px] h-fit p-1 rounded-md shadow-md
                    hover:cursor-pointer relative z-0`,
      children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onMouseDown: showMenu,
            onBlur: hideMenu,
            className: `w-[30px] h-[30px] z-50 bg-white 
                flex place-content-center place-items-center 
                rounded-full absolute right-2 top-2 cursor-pointer
                hover:bg-gray-500 hover:text-white/80 transition duration-1000 ease-in-out`,
            children: /* @__PURE__ */ jsx(BiEditAlt, { className: `text-[20px]` })
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            onMouseDown: (e) => showCarousel(itemIndex),
            className: `relative h-[100px] md:h-[170px] xl:h-[160px]
                         rounded-md overflow-hidden -z-10
                    `,
            children: /* @__PURE__ */ jsx(
              "img",
              {
                src: `https://img.youtube.com/vi/${videoId}/0.jpg`,
                alt: "",
                className: `object-cover w-full h-full -z-40
                        `
              }
            )
          }
        ),
        item.video_title.length > 0 && /* @__PURE__ */ jsx("div", { className: `text-[13px] mt-2 mb-1.5 leading-[1.2em] mx-[2px] line-clamp-2`, children: item.video_title }),
        /* @__PURE__ */ jsx(
          GalleryItemMenu,
          {
            item,
            menu,
            userGuid,
            businessGuid
          }
        )
      ]
    }
  ) });
};
const Slider = ({ slides, selectedSlide, handleClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  useRef(0);
  useRef(0);
  const prev = () => {
    setCurrentSlide((currentSlide2) => {
      return currentSlide2 === 0 ? slides.length - 1 : currentSlide2 - 1;
    });
  };
  const next = () => {
    setCurrentSlide((currentSlide2) => {
      return currentSlide2 === slides.length - 1 ? 0 : currentSlide2 + 1;
    });
  };
  useEffect(() => {
    if (selectedSlide !== null) {
      setCurrentSlide(selectedSlide - 1);
    }
  }, [selectedSlide]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-12 gap-0 `, children: [
    /* @__PURE__ */ jsxs("div", { className: `col-span-12 md:col-span-9 w-full h-full relative bg-black flex`, children: [
      /* @__PURE__ */ jsx("div", { className: ` w-auto h-screen flex overflow-hidden`, children: slides.map((slide, index2) => {
        return /* @__PURE__ */ jsx(
          "img",
          {
            src: slide.image_url,
            alt: "",
            style: { transform: `translateX(-${currentSlide * 100}%)` },
            className: `object-scale-down w-full h-full 
                                            block flex-shrink-0 flex-grow-0 transition-transform
                                            ease-in-out duration-1000`
          },
          index2
        );
      }) }),
      /* @__PURE__ */ jsx("button", { onMouseDown: prev, className: `block absolute top-0 bottom-0 
                p-[1rem] cursor-pointer left-0 group h-full 
                transition duration-1000 ease-in-out`, children: /* @__PURE__ */ jsx("div", { className: `w-[50px] h-[50px] bg-white/60 rounded-full place-content-center place-items-center group-hover:bg-white/30
                        transition duration-500 ease-in-out`, children: /* @__PURE__ */ jsx(BiChevronLeft, { className: " stroke-white fill-black w-[2rem] h-[2rem]" }) }) }),
      /* @__PURE__ */ jsx("button", { onMouseDown: next, className: `block absolute top-0 bottom-0 
                    p-[1rem] cursor-pointer right-0 group 
                     transition duration-1000 ease-in-out`, children: /* @__PURE__ */ jsx("div", { className: `w-[50px] h-[50px] bg-white/60 rounded-full flex place-content-center place-items-center group-hover:bg-white/30
                        transition duration-500 ease-in-out`, children: /* @__PURE__ */ jsx(BiChevronRight, { className: " stroke-white fill-black w-[2rem] h-[2rem]" }) }) }),
      /* @__PURE__ */ jsx(
        "div",
        {
          onMouseDown: () => handleClose(),
          className: `w-[50px] h-[50px] z-[300] bg-white
                    flex place-content-center place-items-center
                    rounded-full absolute left-2 top-2 cursor-pointer
                    hover:bg-white/40 transition duration-1000 ease-in-out`,
          children: /* @__PURE__ */ jsx(IoClose, { className: `text-[30px]` })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `hidden md:block md:col-span-3 px-5`, children: [
      /* @__PURE__ */ jsx("h1", { className: " text-[22px] my-4 font-sans font-extrabold tracking-tight leading-[24px]", children: "Photos for Jason Won, DPT - Flex With Doctor Jay" }),
      /* @__PURE__ */ jsxs("div", { className: " my-4 ", children: [
        currentSlide + 1,
        " / ",
        slides.length
      ] }),
      /* @__PURE__ */ jsx("hr", {}),
      /* @__PURE__ */ jsx("div", { className: " my-4", children: slides[currentSlide].image_title })
    ] })
  ] }) });
};
const Carousel = ({
  overlay,
  setOverlay,
  selectedSlide,
  handleClose,
  gallery
}) => {
  return /* @__PURE__ */ jsx("div", { children: overlay && /* @__PURE__ */ jsx(
    "div",
    {
      className: `flex w-screen h-screen bg-white z-[1000] 
                fixed top-0 left-0 right-0 bottom-0 `,
      children: gallery && selectedSlide && /* @__PURE__ */ jsx(
        Slider,
        {
          slides: gallery,
          selectedSlide,
          handleClose
        }
      )
    }
  ) });
};
const Gallery = ({ videoGallery, userGuid, businessGuid, listing }) => {
  const [overlay, setOverlay] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(0);
  const slider = useVideoSliderContext();
  const handleClose = () => {
    setOverlay(false);
  };
  const showCarousel = (index2) => {
    slider.setDialog(true);
    slider.setSelectedSlide(index2 + 1);
    slider.setGallery(videoGallery);
    slider.setListing(listing);
  };
  return /* @__PURE__ */ jsxs("div", { className: ``, children: [
    /* @__PURE__ */ jsx("div", { className: ` border-[1px] p-3 rounded-[5px] 
                grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
                lg:grid-cols-4 xl:grid-cols-5 gap-2 z-0`, children: videoGallery == null ? void 0 : videoGallery.map((item, index2) => {
      return /* @__PURE__ */ jsx("div", { className: "z-0", children: /* @__PURE__ */ jsx(
        GalleryItem,
        {
          showCarousel,
          item,
          itemIndex: index2,
          userGuid,
          businessGuid
        }
      ) }, index2);
    }) }),
    /* @__PURE__ */ jsx(
      Carousel,
      {
        overlay,
        setOverlay,
        selectedSlide: selectedSlide + 1,
        handleClose,
        gallery: videoGallery
      }
    )
  ] });
};
const AddVideo = ({ userGuid, businessGuid }) => {
  const fileInputRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isImgSelected, setIsImageSelected] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [dialog, setDialog] = useState(false);
  const addVideo = useAddVideoDialogContext();
  const handleOpenDialog = () => {
    addVideo.setDialog(true);
    addVideo.setUserGuid(userGuid);
    addVideo.setBusinessGuid(businessGuid);
  };
  const handleFileChange = (event) => {
    var _a;
    try {
      const file = (_a = event.target.files) == null ? void 0 : _a[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImgSrc(imageUrl);
        setSelectedFile(file);
        setIsImageSelected(true);
        addVideo.setDialog(true);
        addVideo.setImgSrc(imageUrl);
        addVideo.setSelectedFile(file);
        addVideo.setIsImageSelected(true);
        addVideo.setUserGuid(userGuid);
        addVideo.setBusinessGuid(businessGuid);
      }
    } finally {
      event.target.value = "";
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: `mb-2`, children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onMouseDown: handleOpenDialog,
        className: ` bg-blue-800 rounded-md px-3 py-1
                text-white hover:bg-blue-700 transition
                duration-500 ease-in-out hover:shadow-md
                 shadow-gray-900 hover:shadow-black/50`,
        children: "Add Video"
      }
    ),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "file",
        accept: "image/*",
        ref: fileInputRef,
        className: " hidden",
        onChange: handleFileChange
      }
    )
  ] });
};
const index$7 = () => {
  useEffect(() => {
    IsAuthenticated(localStorage);
  }, []);
  const [businessGuid, setBusinessGuid] = useState("");
  const [userGuid, setUserGuid] = useState("");
  const [videoGallery, setVideoGallery] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { business_guid, user_guid } = useParams();
  const [businessProfile, setBusinessProfile] = useState(null);
  const auth = useAuth();
  if (!auth) {
    return null;
  }
  useEffect(() => {
    const getAllData = async (businessGuid2, userGuid2) => {
      setBusinessGuid(businessGuid2);
      setUserGuid(userGuid2);
      const videoGallery2 = await getVideoGallery(businessGuid2, userGuid2);
      setVideoGallery(videoGallery2);
      const businessProfile2 = await getBusinessProfile(businessGuid2 || "");
      setBusinessProfile(businessProfile2);
    };
    try {
      if (business_guid && user_guid) {
        getAllData(business_guid, user_guid);
      }
    } catch (e) {
      console.log(e.message);
    }
  }, [business_guid, user_guid]);
  useEffect(() => {
    if (businessGuid && userGuid && videoGallery && businessProfile) {
      const data2 = {
        businessGuid,
        userGuid,
        videoGallery,
        businessProfile
      };
      setData(data2);
      setLoading(false);
    }
  }, [businessGuid, userGuid, videoGallery, businessProfile]);
  if (loading) {
    return /* @__PURE__ */ jsx(LoadingMessage, {});
  }
  return /* @__PURE__ */ jsx(AccountLayout, { children: /* @__PURE__ */ jsxs(
    ContentLayout,
    {
      title: "Videos Settings",
      businessGuid,
      data,
      businessProfile,
      children: [
        businessGuid && userGuid && /* @__PURE__ */ jsx(AddVideo, { userGuid, businessGuid }),
        videoGallery !== null && (videoGallery == null ? void 0 : videoGallery.length) > 0 ? /* @__PURE__ */ jsx("div", { className: "z-0", children: /* @__PURE__ */ jsx(
          Gallery,
          {
            videoGallery,
            userGuid,
            businessGuid,
            listing: businessProfile
          }
        ) }) : /* @__PURE__ */ jsx("div", { className: " mt-2 border-[1px] rounded-lg p-3 mb-6", children: "Video Gallery is empty." })
      ]
    }
  ) });
};
const route34 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$7
}, Symbol.toStringTag, { value: "Module" }));
const FacilityFeatures = ({
  businessGuid,
  userGuid,
  facilityFeatures: facilityFeatures2,
  selectedFacilityFeatures
}) => {
  const [working, setWorking] = useState(false);
  useNotification();
  const [features, setFeatures] = useState(null);
  const [selectedFeatures, setSelectedFeatures] = useState(null);
  const [mergedFeatures, setMergedFeatures] = useState(null);
  const { showOperation, showError, completeOperation, showSuccess } = useOperation();
  useEffect(() => {
    if (facilityFeatures2 && selectedFacilityFeatures) {
      setFeatures(facilityFeatures2);
      setSelectedFeatures(selectedFacilityFeatures);
    }
  }, [facilityFeatures2, selectedFacilityFeatures]);
  useEffect(() => {
    if (features && selectedFeatures) {
      const mergedFeatures2 = features.map((feature) => {
        const selected = selectedFeatures.find(
          (selected2) => selected2.feature_id === feature.feature_id
        );
        return {
          ...feature,
          active: selected ? true : false,
          user_description: selected ? selected.user_description : void 0
        };
      });
      setMergedFeatures(mergedFeatures2);
    }
  }, [features, selectedFeatures]);
  const handleToggle = (id) => {
    setMergedFeatures(
      (prev) => prev.map(
        (feature) => feature.feature_id === id ? {
          ...feature,
          active: !feature.active,
          user_description: feature.user_description ? feature.user_description : ""
        } : feature
      )
    );
  };
  const handleDescriptionChange = (id, value) => {
    setMergedFeatures(
      (prev) => prev.map(
        (feature) => feature.feature_id === id ? { ...feature, user_description: value } : feature
      )
    );
  };
  const handleSave = async () => {
    const BASE_URL = "https://testindex.veycet.com";
    const endpoint = `/api/listing/selected_facility_features`;
    const url = BASE_URL + endpoint;
    setWorking(true);
    showOperation("processing");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    try {
      const selected = mergedFeatures.filter((f) => f.active).map((f) => {
        return {
          feature_id: f.feature_id,
          user_description: f.user_description
        };
      });
      let data = {
        user_guid: userGuid,
        business_guid: businessGuid,
        selected
      };
      const response = await fetch(url, {
        method: "POST",
        headers: headers$1,
        body: JSON.stringify(data)
      });
      if (response.ok) {
        showSuccess("Success", "Features saved.");
        completeOperation();
      } else {
        showError("Error", "Save failed.");
        completeOperation();
      }
    } catch (error) {
      console.log(error.message);
      showError("Error", `Save failed.`);
    } finally {
      setWorking(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-3", children: "Select Facility Features" }),
    facilityFeatures2.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: mergedFeatures == null ? void 0 : mergedFeatures.map((feature) => /* @__PURE__ */ jsxs(
        "label",
        {
          className: "flex items-center space-x-3 p-3 border rounded cursor-pointer",
          children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  onChange: () => handleToggle(feature.feature_id),
                  type: "checkbox",
                  checked: feature.active,
                  className: "hidden"
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `w-5 h-5 border-2 rounded ${feature.active ? "bg-blue-700" : "bg-white"}`
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: " w-full", children: [
              /* @__PURE__ */ jsxs("p", { className: `font-medium flex place-items-center gap-2 text-lg`, children: [
                /* @__PURE__ */ jsx("span", { className: `text-lg`, children: feature.icon }),
                /* @__PURE__ */ jsx("span", { children: feature.name })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs ", children: feature.description }),
              /* @__PURE__ */ jsx("div", { className: " w-full h-[100px] mt-1 rounded overflow-hidden", children: /* @__PURE__ */ jsx(
                "textarea",
                {
                  onClick: () => handleToggle(feature.feature_id),
                  onChange: (e) => handleDescriptionChange(feature.feature_id, e.target.value),
                  className: `w-full h-full bg-gray-100
                                            border p-3 text-sm rounded-md`,
                  value: feature.user_description
                }
              ) })
            ] })
          ]
        },
        feature.feature_id
      )) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleSave,
          className: "mt-5 px-4 py-2 bg-blue-600 text-white rounded",
          children: "Save Selected Features"
        }
      )
    ] })
  ] });
};
const index$6 = () => {
  useEffect(() => {
    IsAuthenticated(localStorage);
  }, []);
  const [businessGuid, setBusinessGuid] = useState("");
  const [userGuid, setUserGuid] = useState("");
  const [facilityFeatures$1, setFacilityFeatures] = useState(null);
  const [selectedFacilityFeatures, setSelectedFacilityFeatures] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { business_guid, user_guid } = useParams();
  const [businessProfile, setBusinessProfile] = useState(null);
  const auth = useAuth();
  if (!auth) {
    return null;
  }
  useEffect(() => {
    const getAllData = async (businessGuid2, userGuid2) => {
      setBusinessGuid(businessGuid2);
      setUserGuid(userGuid2);
      await getSysFacilityFeatures();
      setFacilityFeatures(facilityFeatures);
      const selectedFacilityFeatures2 = await getSelectedFacilityFeatures(userGuid2, businessGuid2);
      setSelectedFacilityFeatures(selectedFacilityFeatures2);
      const businessProfile2 = await getBusinessProfile(businessGuid2 || "");
      setBusinessProfile(businessProfile2);
    };
    try {
      if (business_guid && user_guid) {
        getAllData(business_guid, user_guid);
      }
    } catch (e) {
      logError(e);
    }
  }, [business_guid, user_guid, facilityFeatures]);
  useEffect(() => {
    if (businessGuid && userGuid && facilityFeatures$1 && selectedFacilityFeatures && businessProfile) {
      const data2 = {
        businessGuid,
        userGuid,
        facilityFeatures: facilityFeatures$1,
        selectedFacilityFeatures,
        businessProfile
      };
      setData(data2);
      setLoading(false);
    }
  }, [
    businessGuid,
    userGuid,
    facilityFeatures$1,
    selectedFacilityFeatures,
    businessProfile
  ]);
  if (loading) {
    return /* @__PURE__ */ jsx(LoadingMessage, {});
  }
  return /* @__PURE__ */ jsx(AccountLayout, { children: /* @__PURE__ */ jsx(
    ContentLayout,
    {
      businessGuid,
      data,
      businessProfile,
      title: "Facility Features",
      children: data && /* @__PURE__ */ jsx(
        FacilityFeatures,
        {
          userGuid,
          businessGuid,
          facilityFeatures: facilityFeatures$1,
          selectedFacilityFeatures
        }
      )
    }
  ) });
};
const route35 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$6
}, Symbol.toStringTag, { value: "Module" }));
const Activate = ({
  userGuid,
  businessGuid
}) => {
  const [isActive, setIsActive] = useState(null);
  const [loading, setLoading] = useState(true);
  useNotification();
  const [working, setWorking] = useState(false);
  const { showOperation, showSuccess, showError, showWarning, showInfo, completeOperation } = useOperation();
  useEffect(() => {
    try {
      getBusiness(userGuid, businessGuid).then((business) => {
        setIsActive(business[0].active_status);
        setLoading(false);
      });
    } catch (error) {
      console.log("Could not fetch business");
    }
  }, []);
  const toggleBusiness = async () => {
    setWorking(true);
    showOperation("processing", "");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    const newStatus = !isActive;
    try {
      const endpoint = `/api/listing/activate/${userGuid}/${businessGuid}`;
      const url = config.BASE_URL + endpoint;
      const data = {
        user_guid: userGuid,
        business_guid: businessGuid,
        active: newStatus
      };
      const res = await fetch(url, {
        method: "PUT",
        headers: headers$1,
        body: JSON.stringify(data)
      });
      showSuccess("success", "Operation completed successfully");
      completeOperation();
      await new Promise((resolve) => setTimeout(resolve, 1e3));
    } catch (error) {
      showError("error", `Error processing: ${error.message}`);
    } finally {
      setIsActive(newStatus);
    }
  };
  if (loading) return /* @__PURE__ */ jsx("div", { children: "Loading..." });
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: `p-6  rounded  max-w-2xl
        mx-auto mt-12`, children: [
    /* @__PURE__ */ jsx("div", { className: `mb-6 text-[13.5px] border-b pb-3`, children: "If you deactivate your data all your data will still be intact, however, it will no longer be visible across all Garssete.com platforms." }),
    /* @__PURE__ */ jsxs("h2", { className: "text-lg mb-1 font-semibold", children: [
      isActive ? "Deactivate" : "Activate",
      " Business or Organization"
    ] }),
    /* @__PURE__ */ jsx("div", { className: `mb-5`, children: isActive ? "Your data is active. It will be visible across all Garssete.com platforms." : "Your data is deactivated, it will no longer be visible. However, all your data will still be intact." }),
    /* @__PURE__ */ jsx("div", { className: `border-[3px] border-gray-100 p-5 rounded-lg shadow`, children: /* @__PURE__ */ jsxs("label", { className: `flex items-center space-x-4 hover:cursor-pointer
                        `, children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          checked: isActive ?? false,
          onChange: toggleBusiness,
          className: "w-8 h-8"
        }
      ),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: `font-semibold`, children: isActive ? "Active" : "Inactive" }),
        /* @__PURE__ */ jsxs("div", { className: `font-normal text-sm`, children: [
          "Click to ",
          isActive ? "deactivate" : "activate",
          " this business profile."
        ] })
      ] })
    ] }) })
  ] }) });
};
const index$5 = () => {
  useEffect(() => {
    IsAuthenticated(localStorage);
  }, []);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [businessGuid, setBusinessGuid] = useState("");
  const [userGuid, setUserGuid] = useState("");
  const { business_guid, user_guid } = useParams();
  const [businessProfile, setBusinessProfile] = useState(null);
  const auth = useAuth();
  if (!auth) {
    return null;
  }
  const { user } = auth;
  useEffect(() => {
    const getAllData = async (businessGuid2, userGuid2) => {
      setBusinessGuid(businessGuid2);
      setUserGuid(userGuid2);
      const businessProfile2 = await getBusinessProfile(businessGuid2 || "");
      setBusinessProfile(businessProfile2);
    };
    try {
      if (business_guid && user_guid) {
        getAllData(business_guid, user_guid);
      }
    } catch (e) {
      logError(e);
    }
  }, [business_guid, user_guid]);
  useEffect(() => {
  }, [user]);
  useEffect(() => {
    if (businessGuid && userGuid && businessProfile) {
      const data2 = {
        businessGuid,
        userGuid,
        businessProfile
      };
      setData(data2);
      setLoading(false);
    }
  }, [
    businessGuid,
    userGuid,
    businessProfile
  ]);
  if (loading) {
    return /* @__PURE__ */ jsx(LoadingMessage, {});
  }
  return /* @__PURE__ */ jsx(AccountLayout, { children: /* @__PURE__ */ jsx(
    ContentLayout,
    {
      title: `${Boolean(businessProfile.active_status) ? "Deactivate" : "Activate"} Business Profile`,
      businessGuid,
      data,
      businessProfile,
      children: /* @__PURE__ */ jsx(OperationProvider, { children: data && /* @__PURE__ */ jsx(
        Activate,
        {
          userGuid,
          businessGuid
        }
      ) })
    }
  ) });
};
const route36 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$5
}, Symbol.toStringTag, { value: "Module" }));
const SocialMedia = ({
  businessGuid,
  userGuid,
  allSocialMedia,
  allSelectedSocialMedia
}) => {
  const [working, setWorking] = useState(false);
  const { showOperation, showError, completeOperation, showSuccess } = useOperation();
  const [socialMedia, setSocialMedia] = useState(null);
  const [selectedSocialMedia, setSelectedSocialMedia] = useState(null);
  const [mergedSocialMedia, setMergedSocialMedia] = useState(null);
  useEffect(() => {
    if (allSocialMedia && allSelectedSocialMedia) {
      setSocialMedia(allSocialMedia);
      setSelectedSocialMedia(allSelectedSocialMedia);
    }
  }, [allSocialMedia, allSelectedSocialMedia]);
  useEffect(() => {
    if (socialMedia && selectedSocialMedia) {
      const mergedSocialMedia2 = socialMedia.map((media) => {
        const selected = selectedSocialMedia.find(
          (selected2) => selected2.media_id === media.media_id
        );
        return {
          ...media,
          active: selected ? true : false,
          user_description: selected ? selected.user_description : void 0
        };
      });
      setMergedSocialMedia(mergedSocialMedia2);
    }
  }, [socialMedia, selectedSocialMedia]);
  const handleToggle = (id) => {
    setMergedSocialMedia(
      (prev) => prev.map(
        (socialMedia2) => socialMedia2.media_id === id ? {
          ...socialMedia2,
          active: !socialMedia2.active,
          user_description: socialMedia2.user_description ? socialMedia2.user_description : ""
        } : socialMedia2
      )
    );
  };
  const handleDescriptionChange = (id, value) => {
    setMergedSocialMedia(
      (prev) => prev.map(
        (media) => media.media_id === id ? { ...media, user_description: value } : media
      )
    );
  };
  const handleSave = async () => {
    const BASE_URL = "https://testindex.veycet.com";
    const endpoint = `/api/listing/selected_social_media`;
    const url = BASE_URL + endpoint;
    setWorking(true);
    showOperation("processing");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    try {
      const selected = mergedSocialMedia.filter((f) => f.active).map((f) => {
        return {
          media_id: f.media_id,
          user_description: f.user_description
        };
      });
      let data = {
        user_guid: userGuid,
        business_guid: businessGuid,
        selected
      };
      const response = await fetch(url, {
        method: "POST",
        headers: headers$1,
        body: JSON.stringify(data)
      });
      if (response.ok) {
        showSuccess("Success", "Social media saved.");
        completeOperation();
      } else {
        showError("Error", "Save failed.");
        completeOperation();
      }
    } catch (error) {
      console.log(error.message);
      showError("Error", "Save failed.");
      completeOperation();
    } finally {
      setWorking(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-3", children: "Select Social Media" }),
    allSocialMedia.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: mergedSocialMedia == null ? void 0 : mergedSocialMedia.map((socialMedia2) => /* @__PURE__ */ jsxs(
        "label",
        {
          className: "flex items-center space-x-3 p-3 border rounded cursor-pointer",
          children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  onChange: () => handleToggle(socialMedia2.media_id),
                  type: "checkbox",
                  checked: socialMedia2.active,
                  className: "hidden"
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `w-5 h-5 border-[1px] border-black  rounded-none 
                                            ${socialMedia2.active ? "bg-blue-400" : "bg-white"}`
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: " w-full", children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium ", children: socialMedia2.name }),
              /* @__PURE__ */ jsx("div", { className: " w-full h-[50px] mt-1 rounded overflow-hidden", children: /* @__PURE__ */ jsx(
                "textarea",
                {
                  onClick: (e) => handleToggle(socialMedia2.media_id),
                  onChange: (e) => handleDescriptionChange(socialMedia2.media_id, e.target.value),
                  className: `w-full h-full bg-gray-100
                                            border p-3 text-sm`,
                  value: socialMedia2.user_description,
                  onBlur: (e) => {
                    if (e.currentTarget.value.length <= 0) {
                      handleToggle(socialMedia2.media_id);
                    }
                  }
                }
              ) })
            ] })
          ]
        },
        socialMedia2.media_id
      )) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleSave,
          className: "mt-5 px-4 py-2 bg-blue-600 text-white rounded",
          children: "Save Selected Social Media"
        }
      )
    ] })
  ] });
};
const index$4 = () => {
  useEffect(() => {
    IsAuthenticated(localStorage);
  }, []);
  const [businessGuid, setBusinessGuid] = useState("");
  const [userGuid, setUserGuid] = useState("");
  const [socialMedia, setSocialMedia] = useState(null);
  const [selectedSocialMedia, setSelectedSocialMedia] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { business_guid, user_guid } = useParams();
  const [businessProfile, setBusinessProfile] = useState(null);
  useEffect(() => {
    const getAllData = async (businessGuid2, userGuid2) => {
      setBusinessGuid(businessGuid2);
      setUserGuid(userGuid2);
      const socialMedia2 = await getSysSocialMedia();
      setSocialMedia(socialMedia2);
      const selectedSocialMedia2 = await getSelectedSocialMedia(userGuid2, businessGuid2);
      setSelectedSocialMedia(selectedSocialMedia2);
      const businessProfile2 = await getBusinessProfile(businessGuid2 || "");
      setBusinessProfile(businessProfile2);
    };
    try {
      if (business_guid && user_guid) {
        getAllData(business_guid, user_guid);
      }
    } catch (e) {
      logError(e);
    }
  }, [business_guid, user_guid]);
  useEffect(() => {
    if (businessGuid && userGuid && socialMedia && selectedSocialMedia && businessProfile) {
      const data2 = {
        businessGuid,
        userGuid,
        facilityFeatures: socialMedia,
        selectedFacilityFeatures: selectedSocialMedia,
        businessProfile
      };
      setData(data2);
      setLoading(false);
    }
  }, [
    businessGuid,
    userGuid,
    socialMedia,
    selectedSocialMedia,
    businessProfile
  ]);
  if (loading) {
    return /* @__PURE__ */ jsx(LoadingMessage, {});
  }
  return /* @__PURE__ */ jsx(AccountLayout, { children: /* @__PURE__ */ jsx(
    ContentLayout,
    {
      title: "Social Media",
      businessGuid,
      data,
      businessProfile,
      children: data && /* @__PURE__ */ jsx(
        SocialMedia,
        {
          userGuid,
          businessGuid,
          allSocialMedia: socialMedia,
          allSelectedSocialMedia: selectedSocialMedia
        }
      )
    }
  ) });
};
const route37 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$4
}, Symbol.toStringTag, { value: "Module" }));
const password_regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
const DeleteSchema = z.object({
  confirm_delete: z.string().refine((val) => val === "DELETE", {
    message: 'You must type "DELETE" to confirm'
  }),
  password: z.string({ message: "Please enter a password" }).min(8, "Password must be at least 8 characters").regex(password_regex, "Please enter a valid password")
});
const DeleteForm = ({
  userGuid,
  businessGuid
}) => {
  const [isActive, setIsActive] = useState(null);
  const [loading, setLoading] = useState(true);
  useNotification();
  const navigator2 = useNavigate();
  const [working, setWorking] = useState(false);
  const [formdata, setFormdata] = useState(null);
  const { showOperation, showError, completeOperation, showSuccess } = useOperation();
  const changeHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormdata((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  };
  const handleDelete = async (data) => {
    setWorking(true);
    showOperation("processing");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    data["user_guid"] = userGuid;
    const endpoint = "/api/listing/delete_business/" + businessGuid;
    const url = config.BASE_URL + endpoint;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: headers$1,
        body: JSON.stringify(data)
      });
      if (response.status !== 200) {
        const errorData = await response.text();
        const errorObject = JSON.parse(errorData);
        let msg = errorObject.message || errorObject.error;
        throw new Error(`${msg}`);
      } else {
        try {
          showSuccess("Success", "Page Deleted.");
          await new Promise((resolve) => setTimeout(resolve, 3e3));
          completeOperation();
        } finally {
          navigator2("/web/account/portfolio");
        }
      }
    } catch (error) {
      console.log(error.message);
      showError("Error", error.message || error.error || "Delete failed.");
      completeOperation();
    }
  };
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {},
    resolver: zodResolver(DeleteSchema)
  });
  useEffect(() => {
    try {
      getBusiness(userGuid, businessGuid).then((business) => {
        setIsActive(business[0].active_status);
        setLoading(false);
      });
    } catch (error) {
      alert("Could not fetch business");
    }
  }, []);
  if (loading) return /* @__PURE__ */ jsx("div", { children: "Loading..." });
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("form", { className: " w-full", onSubmit: handleSubmit(handleDelete), children: /* @__PURE__ */ jsxs("div", { className: `p-6  rounded  max-w-2xl
        mx-auto mt-12`, children: [
    /* @__PURE__ */ jsx("h2", { className: "text-lg mb-4 font-semibold", children: "Delete this Business or Organization" }),
    /* @__PURE__ */ jsx("p", { className: `mb-4 text-gray-500`, children: "Once you delete this business, it cannot be undone. Every resource or item entered under this business will be deleted completely and will not be recoverable." }),
    /* @__PURE__ */ jsxs("div", { className: `border-[3px] border-gray-100 pt-5 pl-5 pr-5 rounded-lg shadow`, children: [
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Confirm Delete",
          controlPlaceholder: `Type the word "DELETE"`,
          controlName: "confirm_delete",
          register,
          controlType: "text",
          changeHandler,
          error: errors.confirm_delete,
          controlInformation: `Please enter password to delete this business.`
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Password",
          controlPlaceholder: "Enter password",
          controlName: "password",
          register,
          controlType: "password",
          changeHandler,
          error: errors.password,
          controlInformation: `Please enter password to delete this business.`
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          value: "Delete Business",
          working: false
        }
      )
    ] })
  ] }) }) });
};
const Index$1 = () => {
  useEffect(() => {
    IsAuthenticated(localStorage);
  }, []);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [businessGuid, setBusinessGuid] = useState("");
  const [userGuid, setUserGuid] = useState("");
  const { business_guid, user_guid } = useParams();
  const [businessProfile, setBusinessProfile] = useState(null);
  const auth = useAuth();
  if (!auth) {
    return null;
  }
  useEffect(() => {
    const getAllData = async (businessGuid2, userGuid2) => {
      setBusinessGuid(businessGuid2);
      setUserGuid(userGuid2);
      const businessProfile2 = await getBusinessProfile(businessGuid2 || "");
      setBusinessProfile(businessProfile2);
    };
    try {
      if (business_guid && user_guid) {
        getAllData(business_guid, user_guid);
      }
    } catch (e) {
      logError(e);
    }
  }, [business_guid, user_guid]);
  useEffect(() => {
    if (businessGuid && userGuid && businessProfile) {
      const data2 = {
        businessGuid,
        userGuid,
        businessProfile
      };
      setData(data2);
      setLoading(false);
    }
  }, [
    businessGuid,
    userGuid,
    businessProfile
  ]);
  if (loading) {
    return /* @__PURE__ */ jsx(LoadingMessage, {});
  }
  return /* @__PURE__ */ jsx(AccountLayout, { children: /* @__PURE__ */ jsx(
    ContentLayout,
    {
      title: `Delete Business Profile`,
      businessGuid,
      data,
      businessProfile,
      children: data && /* @__PURE__ */ jsx(
        DeleteForm,
        {
          userGuid,
          businessGuid
        }
      )
    }
  ) });
};
const route38 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$1
}, Symbol.toStringTag, { value: "Module" }));
function BusinessUserSelector({ userGuid }) {
  const [businessQuery, setBusinessQuery] = useState("");
  const [businessResults, setBusinessResults] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [userQuery, setUserQuery] = useState("");
  const [userResults, setUserResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { showOperation, showError, completeOperation, showSuccess } = useOperation();
  const handleBusinessSearch = async (q) => {
    setBusinessQuery(q);
    if (q.length < 2) return setBusinessResults([]);
    const res = await fetch(`/api/listing/business_single_search?q=${encodeURIComponent(q)}&user_guid=${userGuid}`);
    const data = await res.json();
    setBusinessResults(data);
  };
  const handleUserSearch = async (q) => {
    setUserQuery(q);
    if (q.length < 2) return setUserResults([]);
    const res = await fetch(`/api/listing/user_single_search?q=${encodeURIComponent(q)}`);
    const data = await res.json();
    setUserResults(data);
  };
  const handleReassign = async () => {
    showOperation("processing");
    if (!selectedUser || !selectedBusiness) {
      showError("Error", `Please select both a user and a business before submitting.`);
      completeOperation();
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    const user = JSON.parse(JSON.stringify(selectedUser));
    const business = JSON.parse(JSON.stringify(selectedBusiness));
    const query2 = {
      user_guid: user.user_guid,
      previous_owner_guid: business.owner,
      business_guid: business.gid
    };
    console.log(user);
    console.log(business);
    console.log(query2);
    try {
      const res = await fetch("/api/listing/reassign_business", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(query2)
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error response:", errorText);
        showError("Error", `${errorText}`);
        completeOperation();
        return;
      }
      const data = await res.json();
      showSuccess("Success", "Business reassigned successfully!");
      completeOperation();
    } catch (error) {
      console.error("Request failed:", error);
      showError("Error", `Something went wrong while reassigning.`);
      completeOperation();
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 p-4 max-w-lg", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-1", children: "Search Business" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          id: "biz",
          type: "text",
          value: businessQuery,
          onChange: (e) => handleBusinessSearch(e.target.value),
          className: "w-full border rounded px-3 py-2",
          placeholder: "Type business name..."
        }
      ),
      businessResults.length > 0 && /* @__PURE__ */ jsx("ul", { className: "border mt-2 rounded bg-white shadow divide-y", children: businessResults.map((biz, index2) => /* @__PURE__ */ jsx(
        "li",
        {
          onClick: () => {
            setSelectedBusiness(biz);
            setBusinessResults([]);
            setBusinessQuery(biz.title);
          },
          className: "p-2 cursor-pointer hover:bg-gray-100",
          children: biz.title
        },
        biz.id
      )) }),
      selectedBusiness && /* @__PURE__ */ jsx("input", { type: "hidden", name: "businessId", value: selectedBusiness.id })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-1", children: "Search User" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          id: "user",
          type: "text",
          value: userQuery,
          onChange: (e) => handleUserSearch(e.target.value),
          className: "w-full border rounded px-3 py-2",
          placeholder: "Type user name..."
        }
      ),
      userResults.length > 0 && /* @__PURE__ */ jsx("ul", { className: "border mt-2 rounded bg-white shadow divide-y", children: userResults.map((u) => /* @__PURE__ */ jsxs(
        "li",
        {
          onClick: () => {
            setSelectedUser(u);
            setUserResults([]);
            setUserQuery(`${u.first_name}, ${u.lastname}`);
          },
          className: "p-2 cursor-pointer hover:bg-gray-100",
          children: [
            u.first_name,
            ", ",
            u.lastname
          ]
        },
        u.id
      )) }),
      selectedUser && /* @__PURE__ */ jsx("input", { type: "hidden", name: "userId", value: selectedUser.id })
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "submit",
        onClick: handleReassign,
        className: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700",
        children: "Submit"
      }
    )
  ] });
}
const Index = () => {
  useEffect(() => {
    IsAuthenticated(localStorage);
  }, []);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [businessGuid, setBusinessGuid] = useState("");
  const [userGuid, setUserGuid] = useState("");
  const { business_guid, user_guid } = useParams();
  const [businessProfile, setBusinessProfile] = useState(null);
  const auth = useAuth();
  if (!auth) {
    return null;
  }
  useEffect(() => {
    const getAllData = async (businessGuid2, userGuid2) => {
      setBusinessGuid(businessGuid2);
      setUserGuid(userGuid2);
      const businessProfile2 = await getBusinessProfile(businessGuid2 || "");
      setBusinessProfile(businessProfile2);
    };
    try {
      if (business_guid && user_guid) {
        getAllData(business_guid, user_guid);
      }
    } catch (e) {
      logError(e);
    }
  }, [business_guid, user_guid]);
  useEffect(() => {
    if (businessGuid && userGuid && businessProfile) {
      const data2 = {
        businessGuid,
        userGuid,
        businessProfile
      };
      setData(data2);
      setLoading(false);
    }
  }, [
    businessGuid,
    userGuid,
    businessProfile
  ]);
  if (loading) {
    return /* @__PURE__ */ jsx(LoadingMessage, {});
  }
  return /* @__PURE__ */ jsx(AccountLayout, { children: /* @__PURE__ */ jsx(
    ContentLayout,
    {
      title: `Delete Business Profile`,
      businessGuid,
      data,
      businessProfile,
      children: data && /* @__PURE__ */ jsx(BusinessUserSelector, { userGuid })
    }
  ) });
};
const route39 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const DateInput = ({
  controlName,
  controlType,
  controlPlaceholder,
  controlTitle,
  controlInformation,
  register,
  changeHandler,
  error,
  width,
  control,
  disabled = false
}) => {
  const [wrapperWidth, setWrapperWidth] = useState("");
  const [inputWidth, setInputWidth] = useState(width);
  const [selectedDate, setSelectedDate] = useState(/* @__PURE__ */ new Date());
  const [value, onChange] = useState(/* @__PURE__ */ new Date());
  useEffect(() => {
    if (inputWidth > 0) {
      if (inputWidth === 100) {
        setWrapperWidth(`xl:w-full`);
      } else {
        setWrapperWidth(`xl:w-[${inputWidth}%]`);
      }
    }
  }, [inputWidth]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: inputControlWrapper, children: [
    /* @__PURE__ */ jsxs("div", { className: inputHeadingClass, children: [
      /* @__PURE__ */ jsx("div", { className: `mb-0 text-xl`, children: controlTitle }),
      (controlInformation == null ? void 0 : controlInformation.length) > 1 && /* @__PURE__ */ jsx("div", { className: controlInformationClass, children: controlInformation })
    ] }),
    /* @__PURE__ */ jsx("div", { className: `w-[100%] h-[50px]`, children: /* @__PURE__ */ jsx(
      Controller,
      {
        name: controlName,
        control,
        defaultValue: [null, null],
        render: ({ field }) => /* @__PURE__ */ jsx(
          RangePicker,
          {
            ...field,
            onChange: (dates, dateStrings) => {
              field.onChange(dates);
              console.log(dates);
            },
            className: `${inputClass} text-[17px] tracking-wider ${disabled && "bg-gray-200/80"}`
          }
        )
      }
    ) })
  ] }) });
};
const timeOptions = [
  "Closed",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
  "24:00"
];
const HoursInput = ({
  controlName,
  controlType,
  controlPlaceholder,
  controlTitle,
  controlInformation,
  register,
  changeHandler,
  error,
  width,
  control,
  disabled = false
}) => {
  const [wrapperWidth, setWrapperWidth] = useState("");
  const [inputWidth, setInputWidth] = useState(width);
  const [selectedDate, setSelectedDate] = useState(/* @__PURE__ */ new Date());
  const [value, onChange] = useState(/* @__PURE__ */ new Date());
  const handleTimeChangeStart = () => {
  };
  const handleTimeChangeEnd = () => {
  };
  useEffect(() => {
    if (inputWidth > 0) {
      if (inputWidth === 100) {
        setWrapperWidth(`xl:w-full`);
      } else {
        setWrapperWidth(`xl:w-[${inputWidth}%]`);
      }
    }
  }, [inputWidth]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: inputControlWrapper, children: [
    /* @__PURE__ */ jsxs("div", { className: inputHeadingClass, children: [
      /* @__PURE__ */ jsx("div", { className: `mb-0 text-xl`, children: controlTitle }),
      (controlInformation == null ? void 0 : controlInformation.length) > 1 && /* @__PURE__ */ jsx("div", { className: controlInformationClass, children: controlInformation })
    ] }),
    /* @__PURE__ */ jsx("div", { className: `w-[100%] h-[50px]`, children: /* @__PURE__ */ jsxs("div", { className: "flex place-content-between gap-4 w-full ", children: [
      /* @__PURE__ */ jsxs(
        "select",
        {
          onChange: (e) => handleTimeChangeStart(),
          className: "border p-4 rounded rounded-l-full grow bg-gray-100",
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "From..." }),
            timeOptions.map((time) => /* @__PURE__ */ jsx("option", { value: time, children: time }, time))
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: " col-span-2 flex place-items-center place-content-center", children: "to" }),
      /* @__PURE__ */ jsxs(
        "select",
        {
          onChange: (e) => handleTimeChangeEnd(),
          className: "border p-4 rounded rounded-r-full grow bg-gray-100",
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "To..." }),
            timeOptions.map((time) => /* @__PURE__ */ jsx("option", { value: time, children: time }, time))
          ]
        }
      )
    ] }) })
  ] }) });
};
const EventForm = () => {
  const [formdata, setFormdata] = useState(null);
  const { showOperation, showSuccess, showError, showWarning, showInfo, completeOperation } = useOperation();
  const changeHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormdata((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  };
  const handleAddBusiness = async (datar) => {
  };
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    control,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(CreatePageSchema)
  });
  return /* @__PURE__ */ jsxs("div", { className: `max-w-[100%] md:max-w-[80%] w-full mx-auto`, children: [
    /* @__PURE__ */ jsx("div", { className: `text-2xl font-bold mt-6`, children: "Create an Event" }),
    /* @__PURE__ */ jsx("div", { className: `text-md mt-3 text-gray-500`, children: "Answer a few questions about your event and our AI creation tool will use internal data to build an event page. You can still create an event without AI." }),
    /* @__PURE__ */ jsx("div", { className: `text-2xl mt-12`, children: "What’s the name of your event?" }),
    /* @__PURE__ */ jsx("div", { className: `text-md mt-3 text-gray-500`, children: "This will be your event’s title. Your title will be used to help create your event’s summary, description, category, and tags – so be specific!" }),
    /* @__PURE__ */ jsx("div", { className: `mt-5`, children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit(handleAddBusiness), children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Event Name",
          controlPlaceholder: "Enter event name",
          controlName: "title",
          register,
          changeHandler,
          error: errors.title,
          width: 80,
          controlInformation: `Business name is compulsory.`
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: `mt-8 mb-6 text-2xl`, children: "When does your event start?" }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        DateInput,
        {
          controlTitle: "Start Date",
          controlPlaceholder: "Select start date",
          controlName: "eventDate",
          register,
          changeHandler,
          error: errors.title,
          width: 80,
          controlInformation: `Start date is compulsory.`,
          control
        }
      ) }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        HoursInput,
        {
          controlTitle: "Start Date",
          controlPlaceholder: "Select start date",
          controlName: "eventDate",
          register,
          changeHandler,
          error: errors.title,
          width: 80,
          controlInformation: `Start date is compulsory.`,
          control
        }
      ) })
    ] }) })
  ] });
};
const index$3 = () => {
  return /* @__PURE__ */ jsx(AccountLayout, { children: /* @__PURE__ */ jsx(ProfileContentLayout, { title: "Create Event", children: /* @__PURE__ */ jsx(EventForm, {}) }) });
};
const route40 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$3
}, Symbol.toStringTag, { value: "Module" }));
function ChangeEmailSuccessAlt({ email, message }) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen w-screen min-w-screen bg-black/50  flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: `bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-sm transition-all duration-700 ease-in-out transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "pb-8", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-6 mt-0 py-5 bg-gray-50 border-b", children: /* @__PURE__ */ jsx("div", { className: `text-2xl font-[600] tracking-tighter font-poppins text-gray-700`, children: "Garssete" }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-center text-gray-800 mb-4 ", children: "Email Changed!" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-center mb-8 px-8", children: "Your email was changed. You can now sign in with your new email." }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(
        Link,
        {
          to: "/web/signin",
          className: "bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
          children: "Continue to Login"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-gray-50 p-4 border-t border-gray-100", children: /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 text-center flex items-center justify-center", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-1", fill: "currentColor", viewBox: "0 0 20 20", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z", clipRule: "evenodd" }) }),
      "Your account security is important to us"
    ] }) })
  ] }) });
}
function ChangeEmailFailAlt() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen w-screen min-w-screen bg-black/50  flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: `bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-sm transition-all duration-700 ease-in-out transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "pb-8", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-6 mt-0 py-5 bg-gray-50 border-b", children: /* @__PURE__ */ jsx("div", { className: `text-2xl font-[600] tracking-tighter font-poppins text-gray-700`, children: "Garssete" }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-center text-gray-800 mb-4 ", children: "Link Expired!" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-center mb-8 px-8", children: "Your link has expired. You can sign into your account and attempt to change your email again." }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(
        Link,
        {
          to: "/web/signin",
          className: "bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
          children: "Continue to Login"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-gray-50 p-4 border-t border-gray-100", children: /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 text-center flex items-center justify-center", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-1", fill: "currentColor", viewBox: "0 0 20 20", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z", clipRule: "evenodd" }) }),
      "Your account security is important to us"
    ] }) })
  ] }) });
}
const ChangeEmailForm = ({ guid, email, response }) => {
  return /* @__PURE__ */ jsx("div", { children: response.success ? /* @__PURE__ */ jsx(ChangeEmailSuccessAlt, { email, message: response.message }) : /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(ChangeEmailFailAlt, {}) }) });
};
const ChangeEmailBody = ({ userGuid, email, response }) => {
  return /* @__PURE__ */ jsx("div", { className: `w-full bg-gray-500
        bg-[url('/images/liberty.jpg')]
        bg-cover bg-center min-h-screen flex place-content-center`, children: /* @__PURE__ */ jsx(
    ChangeEmailForm,
    {
      guid: userGuid,
      email,
      response
    }
  ) });
};
const loader$P = async ({ request, params }) => {
  const url = new URL(request.url);
  let userGuid = url.searchParams.get("guid");
  let email = url.searchParams.get("email");
  const response = await changeEmail(userGuid, email);
  console.log(response);
  const data = {
    guid: userGuid,
    email,
    response
  };
  return DoResponse(data, 200);
};
const index$2 = () => {
  const loaderData = useLoaderData();
  const auth = useAuth();
  if (!auth) {
    return null;
  }
  useEffect(() => {
    if (auth == null ? void 0 : auth.user) {
      auth == null ? void 0 : auth.signoutNoReload();
    }
  }, [auth]);
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { children: (loaderData == null ? void 0 : loaderData.guid) && (loaderData == null ? void 0 : loaderData.email) && loaderData && /* @__PURE__ */ jsx(
    ChangeEmailBody,
    {
      userGuid: loaderData == null ? void 0 : loaderData.guid,
      email: loaderData == null ? void 0 : loaderData.email,
      response: loaderData == null ? void 0 : loaderData.response
    }
  ) }) });
};
const route41 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$2,
  loader: loader$P
}, Symbol.toStringTag, { value: "Module" }));
const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!()£@$%^&*-]).{8,}$/
);
const ResetPasswordSchema = z.object({
  password: z.string().min(1, { message: "Please enter new password." }).min(8, { message: "Password must be up to 8 characters." }).regex(passwordValidation, {
    message: "Please enter a valid password"
  }),
  password2: z.string().min(1, { message: "Please retype new password." }).min(8, { message: "Password must be at least 8 characters." }).regex(passwordValidation, {
    message: "Please enter a valid password"
  })
}).superRefine((data, ctx) => {
  if (data.password !== data.password2) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["password2"],
      message: "Your new password don't match"
    });
  }
});
function ResetPasswordFormAlt({ guid }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formdata, setFormdata] = useState(null);
  const auth = useAuth();
  if (!auth) {
    return null;
  }
  const [working, setWorking] = useState(false);
  useNotification();
  const navigator2 = useNavigate();
  const [successful, setSuccessful] = useState(false);
  const [recoverySent, setRecoverySent] = useState(false);
  const { showOperation, showError, completeOperation, showSuccess } = useOperation();
  const handleResetPassword = async (data) => {
    setWorking(true);
    showOperation("processing");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    data.password;
    const BASE_URL = "https://testindex.veycet.com";
    const endpoint = `/api/user/reset_password/${guid}`;
    const url = BASE_URL + endpoint;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: headers$1,
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        let error = response.json().then((data2) => {
          showError("Error", data2.message);
          completeOperation();
        });
      } else {
        reset();
        setSuccessful(true);
        setIsSubmitted(true);
        showSuccess("Success", "Password changed.");
        completeOperation();
      }
    } catch (error) {
      showError("Error", error.message);
      completeOperation();
      return void 0;
    } finally {
      setWorking(false);
    }
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    setWorking(false);
  };
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setError,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {},
    resolver: zodResolver(ResetPasswordSchema)
  });
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen w-screen min-w-screen bg-black/50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsx(
    "div",
    {
      className: `bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-sm transition-all duration-700 ease-in-out transform ${isVisible ? "translate-y-10 opacity-0" : " translate-y-0 opacity-100"}`,
      children: /* @__PURE__ */ jsxs("div", { className: "pb-8", children: [
        /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-6 mt-0 py-3 bg-gray-50 border-b", children: /* @__PURE__ */ jsx("div", { className: `text-2xl font-[600] tracking-tighter font-poppins text-gray-700`, children: "Reset Password" }) }),
        /* @__PURE__ */ jsxs("div", { className: "px-8", children: [
          !isSubmitted ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-center mb-6", children: "Please enter your new password below." }),
            /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit(handleResetPassword), className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700 mb-1", children: "New Password" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      ...register("password"),
                      id: "password",
                      type: showPassword ? "text" : "password",
                      className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300 pr-10",
                      placeholder: "Enter your new password",
                      autoComplete: "new-password"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      className: "absolute inset-y-0 right-0 pr-3 flex items-center",
                      onClick: () => setShowPassword(!showPassword),
                      children: showPassword ? /* @__PURE__ */ jsxs("svg", { className: "h-5 w-5 text-gray-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [
                        /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
                        /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })
                      ] }) : /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-gray-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" }) })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("div", { className: `w-full mt-2 text-red-600 text-[11px] leading-[1.3em]`, children: (errors == null ? void 0 : errors.password) && /* @__PURE__ */ jsx("div", { children: errors.password.message }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "password2", className: "block text-sm font-medium text-gray-700 mb-1", children: "Confirm New Password" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      ...register("password2"),
                      id: "confirmPassword",
                      type: showConfirmPassword ? "text" : "password",
                      className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300 pr-10",
                      placeholder: "Confirm your new password",
                      autoComplete: "new-password"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      className: "absolute inset-y-0 right-0 pr-3 flex items-center",
                      onClick: () => setShowConfirmPassword(!showConfirmPassword),
                      children: showConfirmPassword ? /* @__PURE__ */ jsxs("svg", { className: "h-5 w-5 text-gray-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [
                        /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
                        /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })
                      ] }) : /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-gray-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" }) })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("div", { className: `w-full mt-2 text-red-600 text-[11px] leading-[1.3em]`, children: (errors == null ? void 0 : errors.password2) && /* @__PURE__ */ jsx("div", { children: errors.password2.message }) })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: isSubmitting || working,
                  className: "w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed",
                  children: isSubmitting || working ? "Resetting Password..." : "Reset Password"
                }
              )
            ] })
          ] }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-4", children: [
            /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx("svg", { className: "w-16 h-16 text-green-500 mx-auto", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-gray-800 mb-2", children: "Password Reset Successful" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-6", children: "Your password has been reset successfully. You can now sign in with your new password." }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => navigator2("/web/signin"),
                className: "w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                children: "Sign In Now"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-6 text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
            "Remember your password?",
            " ",
            /* @__PURE__ */ jsx(
              Link,
              {
                to: "/web/signin",
                className: "font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300",
                children: "Sign in"
              }
            )
          ] }) })
        ] })
      ] })
    }
  ) });
}
const ResetPasswordBody$1 = ({ userGuid }) => {
  return /* @__PURE__ */ jsx("div", { className: `bg-white w-full 
        md:bg-[url('https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=1200')]
        bg-cover bg-center min-h-screen flex place-content-center`, children: /* @__PURE__ */ jsx(ResetPasswordFormAlt, { guid: userGuid }) });
};
const loader$O = async ({ request, params }) => {
  new URL(request.url);
  let userGuid = params.guid;
  const data = {
    guid: userGuid
  };
  return DoResponse(data, 200);
};
const index$1 = () => {
  const loaderData = useLoaderData();
  const userGuid = loaderData.guid;
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(ResetPasswordBody$1, { userGuid }) });
};
const route42 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$1,
  loader: loader$O
}, Symbol.toStringTag, { value: "Module" }));
function CompleteSignup({ guid }) {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState("Loading...");
  const [userProfile, setUserProfile] = useState(null);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  const handleVerify = async (hash) => {
    const endpoint = `/api/user/verify_signup/${hash}`;
    const url = config.BASE_URL + endpoint;
    const data = {};
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: headers$1,
        body: JSON.stringify(data)
      });
      const respObj = await response.json();
      if (!response.ok) {
        setLoading(`${respObj.message || "Unknown error"}`);
      }
      setLoading(respObj.message);
    } catch (err) {
      setLoading(`${err.message || "Unexpected error occurred"}`);
    }
  };
  useEffect(() => {
    const getUser = async (guid2) => {
      const userProfile2 = await getUserProfile(guid2);
      setUserProfile(userProfile2);
    };
    if (guid) {
      getUser(guid);
    }
  }, [guid]);
  useEffect(() => {
    if (userProfile !== null) {
      handleVerify(userProfile.user_hash);
    }
  }, [userProfile]);
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen w-screen min-w-screen bg-black/50  flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: `bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-sm transition-all duration-700 ease-in-out transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "pb-8", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-6 mt-0 py-4 bg-gray-50 border-b", children: /* @__PURE__ */ jsx("div", { className: `text-2xl font-[600] tracking-tighter font-poppins text-gray-700`, children: "Garssete" }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-center text-gray-800 mb-4 ", children: "Signup Complete!" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-center mb-8 px-8", children: loading }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(
        Link,
        {
          to: "/web/signin",
          className: "bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
          children: "Continue to Login"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-gray-50 p-4 border-t border-gray-100", children: /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 text-center flex items-center justify-center", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-1", fill: "currentColor", viewBox: "0 0 20 20", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z", clipRule: "evenodd" }) }),
      "Your account security is important to us"
    ] }) })
  ] }) });
}
const ResetPasswordBody = ({ userGuid }) => {
  return /* @__PURE__ */ jsx("div", { className: `bg-white w-full 
        md:bg-[url('https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=1200')]
        bg-cover bg-center min-h-screen flex place-content-center`, children: /* @__PURE__ */ jsx(CompleteSignup, { guid: userGuid }) });
};
const loader$N = async ({ request, params }) => {
  new URL(request.url);
  let userGuid = params.guid;
  const data = {
    guid: userGuid
  };
  return DoResponse(data, 200);
};
const index = () => {
  const loaderData = useLoaderData();
  const userGuid = loaderData.guid;
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(ResetPasswordBody, { userGuid }) });
};
const route43 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index,
  loader: loader$N
}, Symbol.toStringTag, { value: "Module" }));
let cachedPool = global.mysqlPool || null;
const DATABASE_HOST = "localhost";
const DATABASE_PORT = "3306";
const DATABASE_NAME = "garssete_test";
const DATABASE_PASS = "Querty123$$$$";
const DATABASE_USER = "garssete_test_user";
if (!cachedPool) {
  cachedPool = global.mysqlPool = mysql.createPool({
    host: DATABASE_HOST,
    port: Number(DATABASE_PORT) || 3306,
    user: DATABASE_USER,
    password: DATABASE_PASS,
    database: DATABASE_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
}
async function getConnection() {
  console.log(`${DATABASE_USER}: got connection`);
  return cachedPool.getConnection();
}
async function query(sql, values = []) {
  const connection = await getConnection();
  try {
    const [results] = await connection.query(sql, values);
    connection.commit();
    return results;
  } finally {
    connection.release();
  }
}
const getSignupEmail = (first_name, guid) => {
  const formattedSitename = config.FORMATTED_SITENAME;
  const host = config.BASE_URL;
  return `
        Congratulations ${first_name},

        Thank you for signing up with ${formattedSitename}.

        To complete your signup, please click on the link below.

        ${host}/web/landing/complete_signup/${guid}

        Thank you.

        ${formattedSitename} Support`;
};
const getResetPwdEmail = (first_name, guid, request_id) => {
  const formattedSitename = config.FORMATTED_SITENAME;
  const host = config.BASE_URL;
  return `
        Dear ${first_name},

        You requested to reset your password.

        To continue to reset your password, click on the link below.

        ${host}/web/landing/reset_password/${guid}

        Thank you.

        ${formattedSitename} Support`;
};
const getChangeEmailRequestEmail = (first_name, guid, request_id, email) => {
  const formattedSitename = config.FORMATTED_SITENAME;
  const host = config.BASE_URL;
  return `
        Dear ${first_name},

        You requested to change your email.

        To continue to change your email, click on the link below.

        ${host}/web/landing/change_email?guid=${guid}&request_id=${request_id}&email=${email}

        Thank you.

        ${formattedSitename} Support`;
};
const getChangePasswordEmail = (first_name) => {
  const formattedSitename = config.FORMATTED_SITENAME;
  const host = config.BASE_URL;
  return `
        Dear ${first_name},

        You recently changed your password.

        If you didn't initiate this password change, please use the link below to reset your password.

        ${host}/web/reset_password

        Thank you.

        ${formattedSitename} Support`;
};
const getResetPasswordEmailCompleted = (first_name) => {
  const formattedSitename = config.FORMATTED_SITENAME;
  const host = config.BASE_URL;
  return `
        Dear ${first_name},

        Your password reset was successful!

        Click the link below to signin.

        ${host}/web/signin

        Thank you.

        ${formattedSitename} Support`;
};
async function loader$M() {
  let users = null;
  try {
    users = await query(`SELECT * FROM tbl_user ORDER BY date_created DESC`);
    return DoResponse(users, 200);
  } catch (error) {
    let errors = { "error": error.message };
    return DoResponse(errors, 500);
  }
  return new Response(JSON.stringify({ users }), {
    headers: { "Content-Type": "application/json" }
  });
}
async function action$n({ request }) {
  if (request.method === "POST") {
    try {
      const contentType = request.headers.get("Content-Type");
      if (contentType !== "application/json") {
        return DoResponse({ error: "Invalid content type. Expected JSON." }, 500);
      }
      const body = await request.json();
      if (!body.email || !body.first_name || !body.password) {
        return DoResponse({ error: "Missing email or firstname" }, 400);
      }
      const userGuid = crypto.randomUUID();
      const hashedPassword = HashPwd(body.password);
      const userHash = GenerateRandomHash();
      const verifyCode = generate7DigitNumber();
      {
      }
      const rows = await query(`SELECT * FROM tbl_user WHERE email = ?`, [body.email]);
      if (rows.length > 0) {
        return DoResponse(
          {
            exists: true,
            message: "Please choose another email."
          },
          409
        );
      }
      const result = await query(
        `INSERT INTO tbl_user 
                (email, password, first_name, lastname, user_guid, user_hash, verify_code)
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          body.email,
          hashedPassword,
          body.first_name,
          body.lastname,
          userGuid,
          userHash,
          verifyCode
        ]
      );
      const emailData = {
        subject: `${config.SITENAME} Account Signup`,
        to: body.email,
        msg: getSignupEmail(body.first_name, userGuid)
      };
      await sendEmail(emailData);
      const data = {
        success: true,
        message: "User created successfully",
        userId: result.insertId,
        user_guid: userGuid,
        user_hash: userHash,
        first_name: body.first_name,
        lastname: body.lastname,
        email: body.email
      };
      return DoResponse({ requestMethod: data }, 200);
    } catch (error) {
      return DoResponse({ message: error.message }, 500);
    }
  }
  return DoResponse({ message: "method not allowed" }, 200);
}
const route44 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$n,
  loader: loader$M
}, Symbol.toStringTag, { value: "Module" }));
const VerifiedStatus = {
  OK: true,
  PENDING: false
};
const RequestType = {
  PASSWORD_RESET: "password_reset",
  CHANGE_PASSWORD: "change_password",
  CHANGE_EMAIL: "change_email"
};
const RequestStatus = {
  OPEN: "open",
  CLOSED: "closed"
};
const JWT_SECRET$1 = "2454522643636363463643565346346";
const loader$L = async ({ request, params }) => {
  return DoResponse({
    success: false,
    message: "method not allowed"
  }, 405);
};
const action$m = async ({ request }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse({ error: "Invalid content type. Expected JSON." }, 405);
  }
  try {
    const body = await request.json();
    if (!body.email || !body.password) {
      return DoResponse({ error: "Missing email or password" }, 400);
    }
    const { email, password } = body;
    const hashedPassword = HashPwd(password);
    const rows = await query(`SELECT * FROM tbl_user 
            WHERE
            email = ?
            AND
            password = ?`, [email, hashedPassword]);
    const user = rows[0];
    if (rows.length <= 0) {
      return DoResponse({
        success: false,
        message: "Please check your email and password and try again!"
      }, 405);
    }
    if (Boolean(rows[0].is_verified) === VerifiedStatus.PENDING) {
      const verifyCode = generate7DigitNumber();
      const result = await query(
        `UPDATE tbl_user 
                SET
                verify_code = ?
                WHERE
                user_hash = ?`,
        [
          verifyCode,
          rows[0].user_hash
        ]
      );
      let userInfo = rows[0];
      let firstName = userInfo.first_name;
      let userGuid = userInfo.user_guid;
      const emailData = {
        subject: `${config.SITENAME} Account Signup`,
        to: body.email,
        msg: getSignupEmail(firstName, userGuid)
      };
      console.log(emailData);
      await sendEmail(emailData);
      return DoResponse({ message: "Please check your email to complete signup." }, 500);
    }
    const JWT_INFO = {
      guid: user.user_guid,
      email: user.email,
      first_name: user.first_name,
      last_name: user.lastname,
      role: user.role
    };
    const accessToken = jwt.sign(JWT_INFO, JWT_SECRET$1, { expiresIn: "7d" });
    const refreshToken = jwt.sign(JWT_INFO, JWT_SECRET$1, { expiresIn: "7d" });
    const tokens = {
      accessToken,
      refreshToken
    };
    return DoResponse(tokens, 200);
  } catch (error) {
    return DoResponse({ message: error.message }, 500);
  }
};
const route45 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$m,
  loader: loader$L
}, Symbol.toStringTag, { value: "Module" }));
const JWT_SECRET = "2454522643636363463643565346346";
async function action$l({ request, params }) {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse({ error: "Invalid content type. Expected JSON." }, 405);
  }
  if (request.method === "POST") {
    try {
      const requestToken = await request.json();
      const token = requestToken.token;
      const user = jwt.verify(token, JWT_SECRET);
      return DoResponse(user, 200);
    } catch (error) {
      return DoResponse(null, 200);
    }
  }
  return DoResponse({ success: false, message: "method not allowed" }, 405);
}
const route46 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$l
}, Symbol.toStringTag, { value: "Module" }));
const loader$K = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
  if (request.method === "GET") {
    const guid = params.guid;
    const rows = await query(`SELECT * FROM tbl_user WHERE user_guid = ?`, [guid]);
    if (rows.length <= 0) {
      return DoResponse({}, 200);
    }
    rows.map((user) => {
      return {
        email: user.email,
        first_name: user.first_name,
        hash: user.user_hash,
        guid: user.user_guid,
        active: user.active,
        deleted: user.deleted
      };
    });
    delete rows[0].password;
    return DoResponse(rows[0], 200);
  }
};
const action$k = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
  if (request.method === "PUT") {
    try {
      {
      }
      const body = await request.json();
      let guid = params.guid;
      {
      }
      const rawuser = await query(`SELECT * FROM tbl_user WHERE user_guid = ?`, [guid]);
      const user = rawuser[0];
      if (rawuser.length <= 0) {
        return DoResponse({ error: "User does not exist" }, 400);
      }
      {
      }
      let first_name = body.first_name === void 0 ? user.first_name : body.first_name;
      let lastname = body.lastname === void 0 ? user.lastname : body.lastname;
      let country_code = body.country_code === void 0 ? user.country_code : body.country_code;
      let state_code = body.state_code === void 0 ? user.state_code : body.state_code;
      let city_id = body.city_id === void 0 ? user.city_id : body.city_id;
      let zipcode = body.zipcode === void 0 ? user.zipcode : body.zipcode;
      let phone = body.phone === void 0 ? user.phone : body.phone;
      let address_one = body.address_one === void 0 ? user.address_one : body.address_one;
      let address_two = body.address_two === void 0 ? user.address_two : body.address_two;
      const result = await query(
        `UPDATE tbl_user SET
                first_name = ?,
                lastname = ?,
                country_code = ?,
                state_code = ?,
                city_id = ?,
                zipcode = ?,
                phone = ?,
                address_one = ?,
                address_two = ?
                WHERE user_guid = ?`,
        [
          first_name,
          lastname,
          country_code,
          state_code,
          city_id,
          zipcode,
          phone,
          address_one,
          address_two,
          guid
        ]
      );
      return DoResponse({
        success: true,
        message: "User updated successfully",
        user: body
      }, 200);
    } catch (error) {
      console.log(error.message);
      return DoResponse({ error: error.message }, 500);
    }
  }
  if (request.method === "DELETE") {
    try {
      {
      }
      let guid = params.guid;
      {
      }
      const rawuser = await query(`SELECT * FROM tbl_user WHERE user_guid = ?`, [guid]);
      const user = rawuser[0];
      if (rawuser.length <= 0) {
        return DoResponse({
          success: false,
          error: "User does not exist"
        }, 404);
      }
      const result = await query(
        `DELETE FROM tbl_user
                WHERE user_guid = ?`,
        [guid]
      );
      const data = {
        message: `User ${guid} deleted successfully`
      };
      return DoResponse(data, 200);
    } catch (error) {
      return DoResponse({ error: error.message }, 500);
    }
  }
  return DoResponse({
    success: false,
    message: "method not allowed"
  }, 405);
};
const route47 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$k,
  loader: loader$K
}, Symbol.toStringTag, { value: "Module" }));
const loader$J = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
};
async function action$j({ request, params }) {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse({ error: "Invalid content type. Expected JSON." }, 500);
  }
  if (request.method === "PUT") {
    try {
      const body = await request.json();
      let userGuid = params.guid;
      if (!body.password) {
        return DoResponse({ error: "Enter password!" }, 400);
      }
      {
      }
      let rows = await query(`SELECT * FROM tbl_user WHERE user_guid = ?`, [userGuid]);
      if (rows.length <= 0) {
        return DoResponse(
          {
            exists: false,
            message: "User with id does not exist!"
          },
          404
        );
      }
      const user = rows[0];
      {
      }
      const password = body.password;
      const hashedPassword = HashPwd(password);
      {
      }
      let result = await query(
        `UPDATE tbl_user 
                    SET
                    password = ? 
                    WHERE
                    user_guid = ?`,
        [hashedPassword, userGuid]
      );
      const owner = user == null ? void 0 : user.user_guid;
      const emailData = {
        subject: `Garssete Password Change`,
        to: user == null ? void 0 : user.email,
        msg: getChangePasswordEmail(user.first_name)
      };
      await sendEmail(emailData);
      const data = {
        success: true,
        message: "password change is successful"
      };
      return DoResponse(data, 200);
    } catch (error) {
      return DoResponse({ error: error.message }, 500);
    }
  }
  return DoResponse({ error: "method not allowed" }, 200);
}
const route48 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$j,
  loader: loader$J
}, Symbol.toStringTag, { value: "Module" }));
async function action$i({ request }) {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse({ error: "Invalid content type. Expected JSON." }, 500);
  }
  if (request.method === "POST") {
    try {
      const body = await request.json();
      if (!body.email) {
        return DoResponse({ error: "Enter email!" }, 400);
      }
      {
      }
      let rows = await query(
        `SELECT * FROM tbl_user 
                WHERE 
                email = ?`,
        [body.email]
      );
      if (rows.length <= 0) {
        return DoResponse(
          {
            exists: false,
            message: "User with email does not exist!"
          },
          409
        );
      }
      const user = rows[0];
      {
      }
      const title = "Password Request";
      const type = RequestType.PASSWORD_RESET;
      const owner = user.user_guid;
      const guid = crypto.randomUUID();
      const status = RequestStatus.OPEN;
      {
      }
      rows = await query(`SELECT * FROM tbl_requests 
                WHERE owner = ?
                AND status = ?
                AND type = ?`, [owner, status, type]);
      if (rows.length > 0) {
        {
        }
        console.log(`UPDATE tbl_requests 
                    SET
                    title = '${title}',
                    type = '${type}',
                    guid = '${guid}',
                    status = '${status}'
                    WHERE
                    owner = '${owner}'
                    AND
                    type = '${type}'
                    AND
                    status = '${status}'`);
        const result = await query(
          `UPDATE tbl_requests 
                    SET
                    title = ?,
                    type = ?,
                    guid = ?,
                    status = ?
                    WHERE
                    owner = ?
                    AND
                    type = ?
                    AND
                    status = ?`,
          [title, type, guid, status, owner, type, status]
        );
      } else {
        {
        }
        const result = await query(
          `INSERT INTO tbl_requests 
                    (title, type, owner, guid, status) values (?, ?, ?, ?, ?)`,
          [title, type, owner, guid, status]
        );
      }
      const emailData = {
        subject: `${config.SITENAME} Password Reset`,
        to: body.email,
        msg: getResetPwdEmail(user.first_name, owner, guid)
      };
      await sendEmail(emailData);
      const data = {
        success: true,
        message: "password reset initiated. check email to continue.",
        title,
        type,
        owner,
        guid,
        status
      };
      return DoResponse(data, 200);
    } catch (error) {
      return DoResponse({ message: error.message }, 500);
    }
  }
  return DoResponse({ message: "method not allowed" }, 200);
}
const route49 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$i
}, Symbol.toStringTag, { value: "Module" }));
const loader$I = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
};
async function action$h({ request, params }) {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse({ error: "Invalid content type. Expected JSON." }, 500);
  }
  if (request.method === "PUT") {
    try {
      const body = await request.json();
      let userGuid = params.guid;
      if (!body.password) {
        return DoResponse({ error: "Enter password!" }, 400);
      }
      {
      }
      let rows = await query(`SELECT * FROM tbl_user WHERE user_guid = ?`, [userGuid]);
      if (rows.length <= 0) {
        return DoResponse(
          {
            exists: false,
            message: "User with id does not exist!"
          },
          404
        );
      }
      const user = rows[0];
      {
      }
      const password = body.password;
      const hashedPassword = HashPwd(password);
      {
      }
      {
      }
      rows = await query(`SELECT * FROM tbl_requests 
                WHERE
                owner = ?
                AND
                status = ?
                AND
                type = ?`, [userGuid, RequestStatus.OPEN, RequestType.PASSWORD_RESET]);
      if (rows.length <= 0) {
        return DoResponse(
          {
            exists: false,
            message: "Link has expired! Initiate another password reset request."
          },
          405
        );
      }
      let result = await query(
        `UPDATE tbl_user 
                    SET
                    password = ? 
                    WHERE
                    user_guid = ?`,
        [hashedPassword, userGuid]
      );
      {
      }
      result = await query(
        `UPDATE tbl_requests 
                    SET
                    status = ? 
                    WHERE
                    owner = ?
                    AND
                    type = ?
                    AND
                    status = ?`,
        [
          RequestStatus.CLOSED,
          userGuid,
          RequestType.PASSWORD_RESET,
          RequestStatus.OPEN
        ]
      );
      const emailData = {
        subject: `${config.SITENAME} Password Reset`,
        to: user.email,
        msg: getResetPasswordEmailCompleted(user.first_name)
      };
      await sendEmail(emailData);
      const data = {
        success: true,
        message: "password reset is successful"
      };
      return DoResponse(data, 200);
    } catch (error) {
      return DoResponse({ error: error.message }, 500);
    }
  }
  return DoResponse({ error: "method not allowed" }, 200);
}
const route50 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$h,
  loader: loader$I
}, Symbol.toStringTag, { value: "Module" }));
const loader$H = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
  return DoResponse({
    success: false,
    message: "method not allowed"
  }, 405);
};
const action$g = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
  if (request.method === "PUT") {
    try {
      {
      }
      const body = await request.json();
      let guid = params.guid;
      {
      }
      const rawuser = await query(`SELECT * FROM tbl_user WHERE user_guid = ?`, [guid]);
      const user = rawuser[0];
      if (rawuser.length <= 0) {
        return DoResponse({ error: "User does not exist" }, 400);
      }
      {
      }
      let active = body.active === void 0 ? user.active : body.active;
      const result = await query(
        `UPDATE tbl_user SET
                active = ? 
                WHERE user_guid = ?`,
        [
          active,
          guid
        ]
      );
      return DoResponse({
        success: true,
        message: `User ${active ? "activated" : "deactivated"} successfully`,
        user: body
      }, 200);
    } catch (error) {
      console.log(error.message);
      return DoResponse({ error: error.message }, 500);
    }
  }
  if (request.method === "DELETE") {
    try {
      {
      }
      let guid = params.guid;
      {
      }
      const rawuser = await query(`SELECT * FROM tbl_user WHERE user_guid = ?`, [guid]);
      const user = rawuser[0];
      if (rawuser.length <= 0) {
        return DoResponse({
          success: false,
          error: "User does not exist"
        }, 404);
      }
      const result = await query(
        `DELETE FROM tbl_user
                WHERE user_guid = ?`,
        [guid]
      );
      const data = {
        message: `User ${guid} deleted successfully`
      };
      return DoResponse(data, 200);
    } catch (error) {
      return DoResponse({ error: error.message }, 500);
    }
  }
  return DoResponse({
    success: false,
    message: "method not allowed"
  }, 405);
};
const route51 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$g,
  loader: loader$H
}, Symbol.toStringTag, { value: "Module" }));
const loader$G = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
  if (request.method === "GET") {
    const guid = params.guid;
    const rows = await query(`SELECT * FROM tbl_user_profile_image WHERE user_guid = ?`, [guid]);
    if (rows.length <= 0) {
      return DoResponse([{}], 200);
    }
    return DoResponse(rows[0], 200);
  }
};
const route52 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$G
}, Symbol.toStringTag, { value: "Module" }));
const loader$F = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
  if (request.method === "GET") {
    const guid = params.guid;
    const rows = await query(`SELECT * FROM tbl_user_profile_bg WHERE user_guid = ?`, [guid]);
    if (rows.length <= 0) {
      return DoResponse([{}], 200);
    }
    return DoResponse(rows[0], 200);
  }
};
const route53 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$F
}, Symbol.toStringTag, { value: "Module" }));
async function action$f({ request }) {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse({ error: "Invalid content type. Expected JSON." }, 500);
  }
  if (request.method === "POST") {
    try {
      const body = await request.json();
      if (!body.email) {
        return DoResponse({ error: "Enter email!" }, 400);
      }
      if (!body.guid) {
        return DoResponse({ error: "User / Owner Guid is required!" }, 400);
      }
      {
      }
      let emailExists = await query(`SELECT * FROM tbl_user WHERE email = ?`, [body.email]);
      if (emailExists.length > 0) {
        return DoResponse(
          {
            exists: false,
            message: "Email is not available. Choose another email!"
          },
          409
        );
      }
      {
      }
      let rows = await query(`SELECT * FROM tbl_user WHERE user_guid = ?`, [body.guid]);
      if (rows.length <= 0) {
        return DoResponse(
          {
            exists: false,
            message: "User does not exist!"
          },
          409
        );
      }
      const user = rows[0];
      {
      }
      const title = "Email Change Request";
      const type = RequestType.CHANGE_EMAIL;
      const owner = user.user_guid;
      const guid = crypto.randomUUID();
      const status = RequestStatus.OPEN;
      {
      }
      rows = await query(`SELECT * FROM tbl_requests 
                WHERE owner = ?
                AND status = ?
                AND type = ?`, [owner, status, type]);
      if (rows.length > 0) {
        {
        }
        const result = await query(
          `UPDATE tbl_requests 
                    SET
                    title = ?,
                    type = ?,
                    guid = ?,
                    status = ?
                    WHERE
                    owner = ?
                    AND
                    type = ?
                    AND
                    status = ?`,
          [title, type, guid, status, owner, type, status]
        );
      } else {
        {
        }
        const result = await query(
          `INSERT INTO tbl_requests 
                    (title, type, owner, guid, status) values (?, ?, ?, ?, ?)`,
          [title, type, owner, guid, status]
        );
      }
      const emailData = {
        subject: `Email Change Request`,
        to: body.email,
        msg: getChangeEmailRequestEmail(user.first_name, owner, guid, body.email)
      };
      await sendEmail(emailData);
      const data = {
        success: true,
        message: "email change request saved successfully",
        title,
        type,
        owner,
        guid,
        status
      };
      return DoResponse(data, 200);
    } catch (error) {
      return DoResponse({ message: error.message }, 500);
    }
  }
  return DoResponse({ error: "method not allowed" }, 200);
}
const route54 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$f
}, Symbol.toStringTag, { value: "Module" }));
const loader$E = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
};
async function action$e({ request, params }) {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse({ error: "Invalid content type. Expected JSON." }, 500);
  }
  if (request.method === "PUT") {
    try {
      const url = new URL(request.url);
      let userGuid = url.searchParams.get("guid");
      let email = url.searchParams.get("email");
      if (email === void 0) {
        return DoResponse({ error: "Enter new email!" }, 400);
      }
      {
      }
      let rows = await query(`SELECT * FROM tbl_user WHERE user_guid = ?`, [userGuid]);
      if (rows.length <= 0) {
        return DoResponse(
          {
            success: false,
            exists: false,
            message: "User with id does not exist!"
          },
          404
        );
      }
      const user = rows[0];
      {
      }
      rows = await query(`SELECT * FROM tbl_requests 
                WHERE owner = ?
                AND status = ?
                AND type = ?`, [userGuid, RequestStatus.OPEN, RequestType.CHANGE_EMAIL]);
      if (rows.length <= 0) {
        return DoResponse(
          {
            success: false,
            message: "Request has expired!"
          },
          404
        );
      }
      {
      }
      let result = await query(
        `UPDATE tbl_user 
                    SET
                    email = ? 
                    WHERE
                    user_guid = ?`,
        [email, userGuid]
      );
      {
      }
      result = await query(
        `UPDATE tbl_requests 
                    SET
                    status = ? 
                    WHERE
                    owner = ?
                    AND
                    type = ?
                    AND
                    status = ?`,
        [RequestStatus.CLOSED, userGuid, RequestType.CHANGE_EMAIL, RequestStatus.OPEN]
      );
      const data = {
        success: true,
        message: "email change is successful"
      };
      return DoResponse(data, 200);
    } catch (error) {
      return DoResponse({ error: error.message }, 500);
    }
  }
  return DoResponse({ error: "method not allowed" }, 200);
}
const route55 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$e,
  loader: loader$E
}, Symbol.toStringTag, { value: "Module" }));
async function action$d({ request, params }) {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse({ error: "Invalid content type. Expected JSON." }, 500);
  }
  if (request.method === "PUT") {
    try {
      const body = await request.json();
      let userHash = params.user_hash;
      let code = body.code;
      {
      }
      let rows = await query(`SELECT * FROM tbl_user 
                WHERE
                user_hash = ?`, [userHash]);
      if (rows.length <= 0) {
        return DoResponse(
          {
            exists: false,
            message: "User with hash does not exist!"
          },
          500
        );
      }
      const user = rows[0];
      {
      }
      {
      }
      rows = await query(`SELECT * FROM tbl_user 
                WHERE
                user_hash = ?
                AND
                is_verified = ?
                `, [userHash, VerifiedStatus.OK]);
      if (rows.length > 0) {
        return DoResponse(
          {
            exists: false,
            message: "You have been verified! You can now signin with your email and password."
          },
          500
        );
      }
      let result = await query(
        `UPDATE tbl_user 
                    SET
                    is_verified = ? 
                    WHERE
                    user_hash = ?`,
        [VerifiedStatus.OK, userHash]
      );
      const data = {
        success: true,
        message: "Sign up is complete. You can now signin with your email and password!"
      };
      return DoResponse(data, 200);
    } catch (error) {
      return DoResponse({ message: error.message }, 500);
    }
  }
  return DoResponse({ message: "method not allowed" }, 500);
}
const route56 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$d
}, Symbol.toStringTag, { value: "Module" }));
const loader$D = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }));
  }
  try {
    const rawdata = await query(`SELECT * FROM tbl_dir ORDER BY date_created DESC`);
    const listings = rawdata.map((listing) => {
      delete listing.date_created;
      delete listing.last_updated;
      return listing;
    });
    return DoResponse(listings, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
async function action$c({ request, params }) {
  if (request.method === "POST") {
    try {
      const contentType = request.headers.get("Content-Type");
      if (contentType !== "application/json") {
        return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }));
      }
      const body = await request.json();
      const rows = await query(`SELECT * FROM tbl_dir 
                WHERE
                SOUNDEX(title) = SOUNDEX(?)
                AND
                owner = ?`, [body.title, body.owner]);
      let title = "";
      if (body.branch === false || body.branch === void 0) {
        {
        }
        if (rows.length > 0) {
          return new Response(
            JSON.stringify({ exists: true, message: "A similar business or branch name exists. If this is a branch, add a comma and additional phrase to identify the branch e.g. Business Inc., New York!" }),
            { status: 409 }
          );
        }
      } else {
        if (rows.length > 0) {
          return new Response(
            JSON.stringify({ exists: true, message: "A similar branch name exists. If this is a branch, add a comma and additional phrase to identify the branch e.g. Business Inc., New York!" }),
            { status: 409 }
          );
        }
      }
      if (!body.title) {
        return new Response(JSON.stringify({ message: "Missing Title" }), { status: 400 });
      }
      if (!body.category) {
        return new Response(JSON.stringify({ message: "Missing Category" }), { status: 400 });
      }
      if (!body.short_description) {
        return new Response(JSON.stringify({ message: "Missing Short Description" }), { status: 400 });
      }
      if (!body.email_address) {
        return new Response(JSON.stringify({ message: "Missing Email Address" }), { status: 400 });
      }
      if (!body.address_one) {
        return new Response(JSON.stringify({ message: "Missing Address" }), { status: 400 });
      }
      if (!body.owner) {
        return new Response(JSON.stringify({ message: "Missing Owner" }), { status: 400 });
      }
      if (!body.pagetype) {
        return new Response(JSON.stringify({ message: "Missing Pagetype" }), { status: 400 });
      }
      let branch = false;
      let branch_location = "";
      if (body.branch !== void 0) {
        branch = body.branch;
      }
      if (body.branch_location !== void 0) {
        branch_location = body.branch_location;
      }
      const gid = crypto.randomUUID();
      const listingHash = GenerateRandomHash();
      const result = await query(
        `INSERT INTO tbl_dir SET 
                title = ?, 
                pagetype = ?,
                branch = ?,
                branch_location = ?, 
                category = ?, 
                short_description = ?, 
                long_description = ?, 
                phone = ?, 
                email_address = ?, 
                address_one = ?, 
                address_two = ?,
                country_code = ?,
                state_code = ?, 
                city_id = ?,
                zipcode = ?, 
                gid = ?, 
                owner = ?,
                established = ?,
                listing_hash = ?`,
        [
          body.title || null,
          body.pagetype,
          branch,
          branch_location,
          body.category || null,
          body.short_description || null,
          body.long_description || null,
          body.phone || null,
          body.email_address || null,
          body.address_one || null,
          body.address_two || null,
          body.country_code || null,
          body.state_code || null,
          body.city_id || null,
          body.zipcode || null,
          gid,
          body.owner || null,
          body.established || null,
          listingHash || null
        ]
      );
      const data = {
        message: "Listing created successfully",
        data: body,
        guid: gid,
        listing_hash: listingHash
      };
      return new Response(JSON.stringify(data), { status: 201 });
    } catch (error) {
      console.log(error.message);
      return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
  }
}
const route57 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$c,
  loader: loader$D
}, Symbol.toStringTag, { value: "Module" }));
const loader$C = async ({ request, params }) => {
  try {
    const id = params.guid_or_username;
    const rows = await query(`SELECT 
            d.*,
            c.name AS country_name,
            s.name AS state_name,
            s.latitude AS lat,
            s.longitude as lng,
            ci.name AS city_name
            FROM tbl_dir d
            LEFT JOIN tbl_country c ON d.country_code = c.iso2 AND d.country_code IS NOT NULL AND d.country_code != ''
            LEFT JOIN tbl_state s ON d.state_code = s.iso2 AND d.state_code IS NOT NULL AND d.state_code != '' AND d.country_code = s.country_code
            LEFT JOIN tbl_city ci ON d.city_id = ci.id AND d.city_id IS NOT NULL AND d.city_id != ''
            WHERE (d.gid = ? OR d.username = ?)
            `, [id, id]);
    if (rows.length <= 0) {
      return DoResponse({}, 200);
    }
    const listings = rows.map((listing) => {
      return listing;
    });
    return DoResponse(listings[0], 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const action$b = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
  if (request.method === "PUT") {
    try {
      {
      }
      const body = await request.json();
      let guid = params.guid_or_username;
      {
      }
      const rawlisting = await query(`SELECT * FROM tbl_dir WHERE gid = ?`, [guid]);
      const listing = rawlisting[0];
      if (rawlisting.length <= 0) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Listing does not exist"
          }),
          { status: 400 }
        );
      }
      {
      }
      let email_address = body.email_address === void 0 ? listing.email_address : body.email_address;
      let title = body.title === void 0 ? listing.title : body.title;
      let branch = body.branch === void 0 ? Boolean(listing.branch) : Boolean(body.branch);
      let branch_location = body.branch_location === void 0 ? listing.branch_location : body.branch_location;
      let category = body.category === void 0 ? listing.category : body.category;
      let pagetype = body.pagetype === void 0 ? listing.pagetype : body.pagetype;
      let short_description = body.short_description === void 0 ? listing.short_description : body.short_description;
      let long_description = body.long_description === void 0 ? listing.long_description : body.long_description;
      let phone = body.phone === void 0 ? listing.phone : body.phone;
      let address_one = body.address_one === void 0 ? listing.address_one : body.address_one;
      let address_two = body.address_two === void 0 ? listing.address_two : body.address_two;
      let img = body.img === void 0 ? listing.img : body.img;
      let owner = body.owner === void 0 ? listing.owner : body.owner;
      let username = body.username === void 0 ? listing.username : body.username;
      let zipcode = body.zipcode === void 0 ? listing.zipcode : body.zipcode;
      let products = body.products === void 0 ? listing.products : body.products;
      let services = body.services === void 0 ? listing.services : body.services;
      let business_phrases = body.business_phrases === void 0 ? listing.business_phrases : body.business_phrases;
      let established = body.established === void 0 ? listing.established : body.established;
      let xsocial = body.xsocial === void 0 ? listing.xsocial : body.xsocial;
      let fbsocial = body.fbsocial === void 0 ? listing.fbsocial : body.fbsocial;
      let linksocial = body.linksocial === void 0 ? listing.linksocial : body.linksocial;
      let country_code = body.country_code === void 0 ? listing.country_code : body.country_code;
      let state_code = body.state_code === void 0 ? listing.state_code : body.state_code;
      let city_id = body.city_id === void 0 ? listing.city_id : body.city_id;
      let website = body.website === void 0 ? listing.website : body.website;
      {
      }
      if (username !== "" && username !== null) {
        if (username === (listing == null ? void 0 : listing.username)) {
        }
        {
        }
        if (username !== (listing == null ? void 0 : listing.username)) {
          {
          }
          let checkSql = `SELECT * FROM tbl_dir d 
                        WHERE d.username = '${username}'
                        AND
                        d.gid != '${listing == null ? void 0 : listing.gid}'`;
          const checkUsernameResult = await query(checkSql);
          if (checkUsernameResult.length > 0) {
            return DoResponse({
              success: false,
              error: "Username is unavailable"
            }, 500);
          }
        }
      }
      let sql = `UPDATE tbl_dir SET
                title = '${title}',
                branch = '${branch}',
                branch_location = '${branch_location}',
                category = '${category}',
                short_description = '${short_description}',
                phone = '${phone}',
                email_address = '${email_address}',
                address_one = '${address_one}',
                address_two = '${address_two}',
                owner = '${owner}',
                username = '${username}',
                pagetype = '${pagetype}',
                img = '${img}',
                zipcode = '${zipcode}',
                products = '${products}',
                services = '${services}',
                business_phrases = '${business_phrases}',
                established = '${established}',
                xsocial = '${xsocial}',
                fbsocial = '${fbsocial}',
                linksocial = '${linksocial}',
                country_code = '${country_code}',
                state_code = '${state_code}',
                city_id = '${city_id}',
                website = '${website}'
                WHERE
                gid = '${guid}'`;
      const result = await query(
        `UPDATE tbl_dir SET
                title = ?,
                branch = ?,
                branch_location = ?,
                category = ?,
                short_description = ?,
                long_description = ?,
                phone = ?,
                email_address = ?,
                address_one = ?,
                address_two = ?,
                owner = ?,
                username = ?,
                pagetype = ?,
                img = ?,
                zipcode = ?,
                products = ?,
                services = ?,
                business_phrases = ?,
                established = ?,
                xsocial = ?,
                fbsocial = ?,
                linksocial = ?,
                country_code = ?,
                state_code = ?,
                city_id = ?,
                website = ?
                WHERE
                gid = ?`,
        [
          title,
          branch,
          branch_location,
          category,
          short_description,
          long_description,
          phone,
          email_address,
          address_one,
          address_two,
          owner,
          username,
          pagetype,
          img,
          zipcode,
          products,
          services,
          business_phrases,
          established,
          xsocial,
          fbsocial,
          linksocial,
          country_code,
          state_code,
          city_id,
          website,
          guid
        ]
      );
      {
      }
      {
      }
      const updatedrawlisting = await query(`SELECT * FROM tbl_dir WHERE gid = ?`, [guid]);
      const updatedlisting = updatedrawlisting[0];
      const data = {
        success: true,
        message: "Listing updated successfully",
        data: updatedlisting
      };
      return DoResponse(data, 200);
    } catch (error) {
      console.log(error.message);
      return DoResponse({ error: error.message }, 500);
    }
  }
  if (request.method === "DELETE") {
    try {
      {
      }
      let guid = params.guid;
      {
      }
      const rawlisting = await query(`SELECT * FROM tbl_dir WHERE gid = ?`, [guid]);
      const listing = rawlisting[0];
      if (rawlisting.length <= 0) {
        return new Response(
          JSON.stringify({ error: "Listing does not exist" }),
          { status: 400 }
        );
      }
      {
      }
      const result = await query(
        `DELETE FROM tbl_dir
                WHERE gid = ?`,
        [guid]
      );
      const data = {
        success: true,
        message: `Listing ${guid} deleted successfully`
      };
      return DoResponse(data, 200);
    } catch (error) {
      return DoResponse({ error: error.message }, 500);
    }
  }
  return DoResponse({
    success: false,
    message: "method not allowed"
  }, 405);
};
const route58 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$b,
  loader: loader$C
}, Symbol.toStringTag, { value: "Module" }));
const loader$B = async ({ request, params }) => {
  try {
    const url = new URL(request.url);
    let criteria = url.searchParams.get("q");
    let category = url.searchParams.get("category");
    let city = escapeRegex(url.searchParams.get("city")) || "";
    let state = escapeRegex(url.searchParams.get("state")) || "";
    let country = escapeRegex(url.searchParams.get("country")) || "";
    if (criteria === "" || criteria === null || criteria === void 0) {
      criteria = "";
    } else {
      criteria = escapeRegex(criteria);
    }
    let rawdata = null;
    if (!criteria || criteria.trim() === "" || criteria === null || criteria === void 0 || criteria === "") {
      rawdata = await query(`SELECT
                    d.id,
                    d.email_address,
                    d.gid,
                    d.title,
                    d.username,
                    d.short_description,
                    d.phone,
                    d.category,
                    d.established,
                    d.address_one,
                    d.address_two,
                    d.website,
                    d.date_created,
                    (
                    SELECT NAME
                FROM
                    tbl_country co
                WHERE
                    co.iso2 = d.country_code
                LIMIT 1
                ) AS country_name,(
                    SELECT
                        co.iso2
                    FROM
                        tbl_country co
                    WHERE
                        co.iso2 = d.country_code
                    LIMIT 1
                ) AS country_code,(
                    SELECT NAME
                FROM
                    tbl_state st
                WHERE
                    st.iso2 = d.state_code AND st.country_code = d.country_code
                LIMIT 1
                ) AS state_name,(
                    SELECT
                        st.iso2
                    FROM
                        tbl_state st
                    WHERE
                        st.iso2 = d.state_code AND st.country_code = d.country_code
                    LIMIT 1
                ) AS state_code,(
                    SELECT NAME
                FROM
                    tbl_city ci
                WHERE
                    ci.id = d.city_id
                LIMIT 1
                ) AS city_name,(
                    SELECT
                        GROUP_CONCAT(
                            CONCAT(
                                sm.media_id,
                                '$',
                                sm.user_description,
                                '$',
                                sysm.base_url
                            ) SEPARATOR ', '
                        )
                    FROM
                        tbl_selected_social_media sm,
                        tbl_sys_social_media sysm
                    WHERE
                        d.gid = sm.business_guid AND sm.media_id = sysm.media_id
                ) AS social_media,
                (
                    SELECT
                        GROUP_CONCAT(
                            CONCAT(
                                sf.feature_id,
                                '$',
                                sf.user_description,
                                '$'
                            ) SEPARATOR '& '
                        )
                    FROM
                        tbl_selected_facility_features sf
                    WHERE
                        d.gid = sf.business_guid
                ) AS facility_features,
                b.image_url,
                bg.image_url AS bg_image_url,
                r.average_rating,
                r.total_reviews
                FROM
                    tbl_dir d
                LEFT JOIN tbl_business_profile_image b ON
                    d.gid = b.business_guid
                LEFT JOIN tbl_business_profile_bg bg ON
                    d.gid = bg.business_guid
                LEFT JOIN(
                    SELECT business_guid,
                        ROUND(AVG(rating),
                        1) AS average_rating,
                        COUNT(*) AS total_reviews
                    FROM
                        tbl_rating
                    GROUP BY
                        business_guid
                ) r
                ON
                    d.gid = r.business_guid
                WHERE
                    d.active_status = TRUE
                ORDER BY
                    d.date_created
                DESC
                LIMIT 50`);
    } else {
      rawdata = await query(`SELECT
                    d.id,
                    d.username,
                    d.gid,
                    d.title,
                    d.short_description,
                    d.phone,
                    d.category,
                    d.established,
                    d.address_one,
                    d.address_two,
                    d.website,
                    d.date_created,
                    co.name AS country_name,
                    co.iso2 AS country_code,
                    st.name AS state_name,
                    st.iso2 AS state_code,
                    ci.name AS city_name,
                    (SELECT GROUP_CONCAT(CONCAT(sm.media_id, '$', sm.user_description, '$', sysm.base_url) SEPARATOR ', ')
                    FROM tbl_selected_social_media sm
                    JOIN tbl_sys_social_media sysm ON sm.media_id = sysm.media_id
                    WHERE d.gid = sm.business_guid) AS social_media,
                    b.image_url,
                    bg.image_url AS bg_image_url,
                    r.average_rating,
                    r.total_reviews
                FROM tbl_dir d
                LEFT JOIN tbl_country co 
                    ON co.iso2 = d.country_code
                LEFT JOIN tbl_state st 
                    ON st.iso2 = d.state_code AND st.country_code = d.country_code
                LEFT JOIN tbl_city ci 
                    ON ci.id = d.city_id
                LEFT JOIN tbl_business_profile_image b 
                    ON d.gid = b.business_guid
                LEFT JOIN tbl_business_profile_bg bg
                    ON d.gid = bg.business_guid
                LEFT JOIN (
                    SELECT 
                        business_guid,
                        ROUND(AVG(rating), 1) AS average_rating,
                        COUNT(*) AS total_reviews
                    FROM tbl_rating
                    GROUP BY business_guid
                ) r ON d.gid = r.business_guid
                WHERE
                    (
                        d.title RLIKE ?
                        OR d.short_description RLIKE ?
                        OR d.address_one RLIKE ?
                        OR d.address_two RLIKE ?
                        OR d.category RLIKE ?
                        OR co.name RLIKE ?
                        OR st.name RLIKE ?
                        OR ci.name RLIKE ?
                    )
                    AND d.active_status = true
                    AND d.category RLIKE ?
                    AND co.name RLIKE ?
                    AND st.name RLIKE ?
                    AND ci.name RLIKE ?
                ORDER BY d.date_created DESC
                LIMIT 50;
`, [criteria, criteria, criteria, criteria, criteria, criteria, criteria, criteria, category, country, state, city]);
    }
    const listings = rawdata.map((listing) => {
      delete listing.date_created;
      delete listing.last_updated;
      return listing;
    });
    console.log(listings);
    return DoResponse(listings, 200);
  } catch (error) {
    console.log(error.message);
    return DoResponse({ "error": error.message }, 500);
  }
};
const route59 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$B
}, Symbol.toStringTag, { value: "Module" }));
const loader$A = async ({ request, params }) => {
  var _a;
  const ITEMS_PER_PAGE = 20;
  try {
    const url = new URL(request.url);
    const searchParams = {
      criteria: url.searchParams.get("q") || "",
      category: url.searchParams.get("category") || "",
      city: url.searchParams.get("city") || "",
      state: url.searchParams.get("state") || "",
      country: url.searchParams.get("country") || "",
      page: Math.max(1, Number(url.searchParams.get("page")) || 1)
    };
    const offset = (searchParams.page - 1) * ITEMS_PER_PAGE;
    const { baseQuery, countQuery, params: queryParams } = buildSearchQuery(searchParams);
    const countResult = await query(countQuery, queryParams);
    const totalItems = ((_a = countResult[0]) == null ? void 0 : _a.total) || 0;
    const dataQuery = `${baseQuery} ORDER BY d.date_created DESC LIMIT ? OFFSET ?`;
    const rows = await query(dataQuery, [...queryParams, ITEMS_PER_PAGE, offset]);
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    return DoResponse({
      items: rows,
      pagination: {
        currentPage: searchParams.page,
        totalPages,
        totalItems,
        itemsPerPage: ITEMS_PER_PAGE,
        hasNext: searchParams.page < totalPages,
        hasPrev: searchParams.page > 1
      }
    }, 200);
  } catch (error) {
    console.error("Search error:", error.message);
    return DoResponse({ error: "Internal server error" }, 500);
  }
};
function buildSearchQuery(params) {
  const conditions = ["d.active_status = true"];
  const queryParams = [];
  if (params.criteria) {
    conditions.push(`(
            d.title LIKE ? OR d.short_description LIKE ? OR 
            d.address_one LIKE ? OR d.address_two LIKE ? OR
            d.category LIKE ? OR co.iso2 LIKE ? OR
            st.iso2 LIKE ? OR ci.name LIKE ?
        )`);
    const likePattern = `%${params.criteria}%`;
    queryParams.push(...Array(8).fill(likePattern));
  }
  if (params.category) {
    conditions.push("d.category LIKE ?");
    queryParams.push(`%${params.category}%`);
  }
  if (params.country) {
    conditions.push("co.iso2 LIKE ?");
    queryParams.push(`%${params.country}%`);
  }
  if (params.state) {
    conditions.push("st.iso2 LIKE ?");
    queryParams.push(`%${params.state}%`);
  }
  if (params.city) {
    conditions.push("ci.name LIKE ?");
    queryParams.push(`%${params.city}%`);
  }
  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  const baseQuery = `
        SELECT
            d.id, d.username, d.gid, d.title, d.short_description, d.phone,
            d.category, d.established, d.address_one, d.address_two, d.website,
            d.date_created, co.name AS country_name, co.iso2 AS country_code,
            st.name AS state_name, st.iso2 AS state_code, ci.name AS city_name,
            b.image_url, bg.image_url AS bg_image_url,
            r.average_rating, r.total_reviews,
            (
                SELECT GROUP_CONCAT(
                    CONCAT(sm.media_id, '$', sm.user_description, '$', sysm.base_url) 
                    SEPARATOR ', '
                )
                FROM tbl_selected_social_media sm
                JOIN tbl_sys_social_media sysm ON sm.media_id = sysm.media_id
                WHERE d.gid = sm.business_guid
            ) AS social_media
        FROM tbl_dir d
        LEFT JOIN tbl_country co ON co.iso2 = d.country_code
        LEFT JOIN tbl_state st ON st.iso2 = d.state_code AND st.country_code = d.country_code
        LEFT JOIN tbl_city ci ON ci.id = d.city_id
        LEFT JOIN tbl_business_profile_image b ON d.gid = b.business_guid
        LEFT JOIN tbl_business_profile_bg bg ON d.gid = bg.business_guid
        LEFT JOIN (
            SELECT business_guid, 
                   ROUND(AVG(rating), 1) AS average_rating,
                   COUNT(*) AS total_reviews
            FROM tbl_rating
            GROUP BY business_guid
        ) r ON d.gid = r.business_guid
        ${whereClause}
    `;
  const countQuery = `
        SELECT COUNT(*) as total
        FROM tbl_dir d
        LEFT JOIN tbl_country co ON co.iso2 = d.country_code
        LEFT JOIN tbl_state st ON st.iso2 = d.state_code AND st.country_code = d.country_code
        LEFT JOIN tbl_city ci ON ci.id = d.city_id
        ${whereClause}
    `;
  return { baseQuery, countQuery, params: queryParams };
}
const route60 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$A
}, Symbol.toStringTag, { value: "Module" }));
const loader$z = async ({ request, params }) => {
  try {
    const id = params.guid_or_username;
    const isFeatured = true;
    const rows = await query(`SELECT
                d.id,
                d.email_address,
                d.gid,
                d.title,
                d.username,
                d.short_description,
                d.phone,
                d.category,
                d.established,
                d.address_one,
                d.address_two,
                d.website,
                d.date_created,
                (SELECT name FROM tbl_country co WHERE co.iso2 = d.country_code LIMIT 1) AS country_name,
                (SELECT name FROM tbl_state st WHERE st.iso2 = d.state_code AND st.country_code = d.country_code LIMIT 1) AS state_name,
                (SELECT name FROM tbl_city ci WHERE ci.id = d.city_id LIMIT 1) AS city_name,
                 (SELECT GROUP_CONCAT(CONCAT(sm.media_id, '$', sm.user_description, '$', sysm.base_url) SEPARATOR ', ')
 FROM tbl_selected_social_media sm, tbl_sys_social_media sysm 
 WHERE d.gid = sm.business_guid AND sm.media_id = sysm.media_id) AS social_media,
                b.image_url,
                r.average_rating,
                r.total_reviews

                FROM tbl_dir d

                LEFT JOIN tbl_business_profile_image b ON d.gid = b.business_guid

                LEFT JOIN (
                    SELECT 
                        business_guid,
                        ROUND(AVG(rating), 1) AS average_rating,
                        COUNT(*) AS total_reviews
                    FROM tbl_rating
                    GROUP BY business_guid
                ) r ON d.gid = r.business_guid

                WHERE d.active_status = true
                AND
                d.featured = true
                ORDER BY RAND()
                ASC
            `, [isFeatured]);
    if (rows.length <= 0) {
      return DoResponse({}, 200);
    }
    const listings = rows.map((listing) => {
      return listing;
    });
    return DoResponse(listings, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const route61 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$z
}, Symbol.toStringTag, { value: "Module" }));
const loader$y = async ({ request, params }) => {
  request.headers.get("Content-Type");
  const businessGuid = params.business_guid;
  const selectedFeatureQuery = `SELECT
        a.feature_id, a.user_description, a.business_guid
        FROM 
        tbl_selected_facility_features a 
        WHERE 
        a.business_guid = ?`;
  try {
    const rawdata = await query(
      selectedFeatureQuery,
      [
        businessGuid
      ]
    );
    console.log(rawdata);
    return DoResponse(rawdata, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const route62 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$y
}, Symbol.toStringTag, { value: "Module" }));
const loader$x = async ({ params }) => {
  try {
    const category = params.category;
    const limitRaw = params.limit;
    const limit = Math.max(parseInt(limitRaw ?? "5", 10), 1);
    const rows = await query(`
      SELECT 
        d.*, 
        avg_ratings.avg_rating,
        b.image_url
      FROM tbl_dir d
      LEFT JOIN (
          SELECT business_guid, AVG(rating) AS avg_rating
          FROM tbl_rating
          GROUP BY business_guid
      ) AS avg_ratings ON d.gid = avg_ratings.business_guid
      LEFT JOIN tbl_business_profile_image b ON b.business_guid = d.gid
      WHERE d.category = ?
      AND
      d.active_status = true
      LIMIT ?
    `, [category, limit]);
    if (rows.length === 0) {
      return DoResponse([], 200);
    }
    return DoResponse(rows, 200);
  } catch (error) {
    return DoResponse({ error: error.message }, 500);
  }
};
const route63 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$x
}, Symbol.toStringTag, { value: "Module" }));
const loader$w = async ({ params }) => {
  try {
    const category = params.category;
    const limitRaw = params.limit;
    const limit = Math.max(parseInt(limitRaw ?? "5", 10), 1);
    const rows = await query(`
            SELECT
                    d.id,
                    d.gid,
                    d.title,
                    d.username,
                    d.category,
                    d.date_created,
                    (
                    SELECT NAME
                FROM
                    tbl_country co
                WHERE
                    co.iso2 = d.country_code
                LIMIT 1
                ) AS country_name,
                (
                    SELECT
                        co.iso2
                    FROM
                        tbl_country co
                    WHERE
                        co.iso2 = d.country_code
                    LIMIT 1
                ) AS country_code,
                (
                    SELECT NAME
                FROM
                    tbl_state st
                WHERE
                    st.iso2 = d.state_code AND st.country_code = d.country_code
                LIMIT 1
                ) AS state_name,
                (
                    SELECT
                        st.iso2
                    FROM
                        tbl_state st
                    WHERE
                        st.iso2 = d.state_code AND st.country_code = d.country_code
                    LIMIT 1
                ) AS state_code,
                (
                    SELECT NAME
                FROM
                    tbl_city ci
                WHERE
                    ci.id = d.city_id
                LIMIT 1
                ) AS city_name,
                b.image_url,
                bg.image_url AS bg_image_url,
                r.average_rating,
                r.total_reviews
                FROM
                    tbl_dir d
                LEFT JOIN tbl_business_profile_image b ON
                    d.gid = b.business_guid
                LEFT JOIN tbl_business_profile_bg bg ON
                    d.gid = bg.business_guid
                LEFT JOIN(
                    SELECT business_guid,
                        ROUND(AVG(rating),
                        1) AS average_rating,
                        COUNT(*) AS total_reviews
                    FROM
                        tbl_rating
                    GROUP BY
                        business_guid
                ) r
                ON
                    d.gid = r.business_guid
                WHERE
                    d.active_status = TRUE
                AND
                	d.category RLIKE ?
                ORDER BY
                    d.date_created
                DESC
                LIMIT ?
            `, [category, limit]);
    if (rows.length === 0) {
      return DoResponse([], 200);
    }
    return DoResponse(rows, 200);
  } catch (error) {
    return DoResponse({ error: error.message }, 500);
  }
};
const route64 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$w
}, Symbol.toStringTag, { value: "Module" }));
const loader$v = async ({ params }) => {
  try {
    const category = params.category;
    const limitRaw = params.limit;
    const limit = Math.max(parseInt(limitRaw ?? "5", 10), 1);
    const rows = await query(`
            SELECT
                    d.id,
                    d.gid,
                    d.title,
                    d.username,
                    d.category,
                    d.date_created,
                    (
                    SELECT NAME
                FROM
                    tbl_country co
                WHERE
                    co.iso2 = d.country_code
                LIMIT 1
                ) AS country_name,
                (
                    SELECT
                        co.iso2
                    FROM
                        tbl_country co
                    WHERE
                        co.iso2 = d.country_code
                    LIMIT 1
                ) AS country_code,
                (
                    SELECT NAME
                FROM
                    tbl_state st
                WHERE
                    st.iso2 = d.state_code AND st.country_code = d.country_code
                LIMIT 1
                ) AS state_name,
                (
                    SELECT
                        st.iso2
                    FROM
                        tbl_state st
                    WHERE
                        st.iso2 = d.state_code AND st.country_code = d.country_code
                    LIMIT 1
                ) AS state_code,
                (
                    SELECT NAME
                FROM
                    tbl_city ci
                WHERE
                    ci.id = d.city_id
                LIMIT 1
                ) AS city_name,
                b.image_url,
                bg.image_url AS bg_image_url,
                r.average_rating,
                r.total_reviews
                FROM
                    tbl_dir d
                LEFT JOIN tbl_business_profile_image b ON
                    d.gid = b.business_guid
                LEFT JOIN tbl_business_profile_bg bg ON
                    d.gid = bg.business_guid
                LEFT JOIN(
                    SELECT business_guid,
                        ROUND(AVG(rating),
                        1) AS average_rating,
                        COUNT(*) AS total_reviews
                    FROM
                        tbl_rating
                    GROUP BY
                        business_guid
                ) r
                ON
                    d.gid = r.business_guid
                WHERE
                    d.active_status = TRUE
                ORDER BY
                    d.date_created
                DESC
                LIMIT ?
            `, [limit]);
    if (rows.length === 0) {
      return DoResponse([], 200);
    }
    return DoResponse(rows, 200);
  } catch (error) {
    return DoResponse({ error: error.message }, 500);
  }
};
const route65 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$v
}, Symbol.toStringTag, { value: "Module" }));
const loader$u = async ({ request, params }) => {
  const businessGuid = params.business_guid;
  try {
    const rawdata = await query(`SELECT * FROM tbl_business_gallery_image 
            WHERE 
            business_guid = ? 
            ORDER BY date_created DESC`, [businessGuid]);
    return DoResponse(rawdata, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const route66 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$u
}, Symbol.toStringTag, { value: "Module" }));
const loader$t = async ({ request, params }) => {
  if (request.method === "GET") {
    const guid = params.guid;
    const rows = await query(
      `SELECT * FROM tbl_business_profile_image 
            WHERE
            business_guid = ?`,
      [guid]
    );
    if (rows.length <= 0) {
      return DoResponse([{}], 200);
    }
    return DoResponse(rows[0], 200);
  }
};
const route67 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$t
}, Symbol.toStringTag, { value: "Module" }));
const loader$s = async ({ request, params }) => {
  if (request.method === "GET") {
    const guid = params.guid;
    const rows = await query(
      `SELECT * FROM tbl_business_profile_bg 
            WHERE
            business_guid = ?`,
      [guid]
    );
    if (rows.length <= 0) {
      return DoResponse([{}], 200);
    }
    return DoResponse(rows[0], 200);
  }
};
const route68 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$s
}, Symbol.toStringTag, { value: "Module" }));
const loader$r = async ({ request, params }) => {
  try {
    const url = new URL(request.url);
    let criteria = url.searchParams.get("q");
    let owner = url.searchParams.get("guid");
    if (criteria === "" || criteria === null || criteria === void 0) {
      criteria = "";
    } else {
      criteria = escapeRegex(criteria);
    }
    let rawdata = null;
    if (!criteria || criteria.trim() === "" || criteria === null || criteria === void 0 || criteria === "") {
      rawdata = await query(`SELECT
                d.id,
                d.owner,
                d.email_address,
                d.gid,
                d.title,
                d.username,
                d.short_description,
                d.phone,
                d.category,
                d.established,
                d.address_one,
                d.address_two,
                d.website,
                d.active_status,
                d.date_created,
                (SELECT name FROM tbl_country co WHERE co.iso2 = d.country_code LIMIT 1) AS country_name,
                (SELECT name FROM tbl_state st WHERE st.iso2 = d.state_code AND st.country_code = d.country_code LIMIT 1) AS state_name,
                (SELECT name FROM tbl_city ci WHERE ci.id = d.city_id LIMIT 1) AS city_name,
                 (SELECT GROUP_CONCAT(CONCAT(sm.media_id, '$', sm.user_description, '$', sysm.base_url) SEPARATOR ', ')
 FROM tbl_selected_social_media sm, tbl_sys_social_media sysm 
 WHERE d.gid = sm.business_guid AND sm.media_id = sysm.media_id) AS social_media,
                b.image_url,
                r.average_rating,
                r.total_reviews

                FROM tbl_dir d

                LEFT JOIN tbl_business_profile_image b ON d.gid = b.business_guid

                LEFT JOIN (
                    SELECT 
                        business_guid,
                        ROUND(AVG(rating), 1) AS average_rating,
                        COUNT(*) AS total_reviews
                    FROM tbl_rating
                    GROUP BY business_guid
                ) r ON d.gid = r.business_guid

                WHERE d.owner = ?
                ORDER BY d.date_created DESC
                LIMIT 50`, [owner]);
    } else {
      rawdata = await query(`SELECT
                    d.id,
                    d.username,
                    d.gid,
                    d.title,
                    d.short_description,
                    d.phone,
                    d.category,
                    d.established,
                    d.address_one,
                    d.address_two,
                    d.website,
                    d.active_status,
                    d.date_created,
                    co.name AS country_name,
                    st.name AS state_name,
                    ci.name AS city_name,
                    (SELECT GROUP_CONCAT(CONCAT(sm.media_id, '$', sm.user_description, '$', sysm.base_url) SEPARATOR ', ')
                    FROM tbl_selected_social_media sm
                    JOIN tbl_sys_social_media sysm ON sm.media_id = sysm.media_id
                    WHERE d.gid = sm.business_guid) AS social_media,
                    b.image_url,
                    r.average_rating,
                    r.total_reviews
                FROM tbl_dir d
                LEFT JOIN tbl_country co 
                    ON co.iso2 = d.country_code
                LEFT JOIN tbl_state st 
                    ON st.iso2 = d.state_code AND st.country_code = d.country_code
                LEFT JOIN tbl_city ci 
                    ON ci.id = d.city_id
                LEFT JOIN tbl_business_profile_image b 
                    ON d.gid = b.business_guid
                LEFT JOIN (
                    SELECT 
                        business_guid,
                        ROUND(AVG(rating), 1) AS average_rating,
                        COUNT(*) AS total_reviews
                    FROM tbl_rating
                    GROUP BY business_guid
                ) r ON d.gid = r.business_guid
                WHERE
                    (
                        d.title RLIKE ?
                        OR d.short_description RLIKE ?
                        OR d.address_one RLIKE ?
                        OR d.address_two RLIKE ?
                        OR d.category RLIKE ?
                        OR co.name RLIKE ?
                        OR st.name RLIKE ?
                        OR ci.name RLIKE ?
                    )
                    AND d.owner = ?
                ORDER BY d.date_created DESC
                LIMIT 50;
`, [criteria, criteria, criteria, criteria, criteria, criteria, criteria, criteria, owner]);
    }
    const listings = rawdata.map((listing) => {
      delete listing.date_created;
      delete listing.last_updated;
      return listing;
    });
    return DoResponse(listings, 200);
  } catch (error) {
    console.log(error.message);
    return DoResponse({ "error": error.message }, 500);
  }
};
const route69 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$r
}, Symbol.toStringTag, { value: "Module" }));
const loader$q = async ({ request, params }) => {
  return DoResponse({
    success: false,
    message: "method not allowed"
  }, 405);
};
const action$a = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse({ error: "Invalid content type. Expected JSON." }, 405);
  }
  if (request.method === "PUT") {
    try {
      let business_guid = params.business_guid;
      const body = await request.json();
      if (!body.user_guid || !body.password || !body.confirm_delete || !business_guid) {
        return DoResponse({ error: "Missing email or password" }, 400);
      }
      const { user_guid, confirm_delete, password } = body;
      const hashedPassword = HashPwd(password);
      const rows = await query(`SELECT * FROM tbl_user 
            WHERE
            user_guid = ?
            AND
            password = ?`, [user_guid, hashedPassword]);
      const user = rows[0];
      if (rows.length <= 0) {
        return DoResponse({
          success: false,
          message: "Please check your password and try again!"
        }, 405);
      }
      const businessExists = await query(`SELECT * FROM tbl_dir 
            WHERE
            gid = ?
            AND
            owner = ?`, [business_guid, user_guid]);
      const business = businessExists[0];
      if (businessExists.length <= 0) {
        return DoResponse({
          success: false,
          message: "Page does not exist"
        }, 405);
      }
      const deleteBusiness = await query(`DELETE FROM tbl_dir WHERE gid = ?`, [business_guid]);
      const deleteSocialMedia = await query(`DELETE FROM tbl_selected_social_media WHERE business_guid = ?`, [business_guid]);
      const deleteFacilityFeatures = await query(`DELETE FROM tbl_selected_facility_features WHERE business_guid = ?`, [business_guid]);
      const deleteRating = await query(`DELETE FROM tbl_rating WHERE business_guid = ?`, [business_guid]);
      const deleteHours = await query(`DELETE FROM tbl_operating_hours WHERE business_guid = ?`, [business_guid]);
      const deleteProfileImage = await query(`DELETE FROM tbl_business_profile_image WHERE business_guid = ?`, [business_guid]);
      const deleteProfileGallery = await query(`DELETE FROM tbl_business_gallery_image WHERE business_guid = ?`, [business_guid]);
      const data = {
        success: true,
        message: "BUSINESS_DELETED"
      };
      return DoResponse(data, 200);
    } catch (error) {
      return DoResponse({ message: error.message }, 500);
    }
  }
};
const route70 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$a,
  loader: loader$q
}, Symbol.toStringTag, { value: "Module" }));
async function action$9({ request, params }) {
  if (request.method === "POST") {
    try {
      const contentType = request.headers.get("Content-Type");
      if (contentType !== "application/json") {
        return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }));
      }
      const body = await request.json();
      const businessGuid = body.business_guid;
      const userGuid = body.user_guid;
      const previousOwnerGuid = body.previous_owner_guid;
      if (!userGuid) {
        return new Response(JSON.stringify({ message: "Missing New Owner" }), { status: 400 });
      }
      if (!previousOwnerGuid) {
        return new Response(JSON.stringify({ message: "Missing Previous Owner" }), { status: 400 });
      }
      if (!businessGuid) {
        return new Response(JSON.stringify({ message: "Missing Business ID" }), { status: 400 });
      }
      await query(`update tbl_dir a SET a.owner = ? WHERE a.owner = ? AND a.gid = ?`, [userGuid, previousOwnerGuid, businessGuid]);
      await query(`update tbl_operating_hours b set b.user_guid = ? WHERE b.user_guid = ? AND b.business_guid = ?`, [userGuid, previousOwnerGuid, businessGuid]);
      await query(`update tbl_business_gallery_image c set c.user_guid = ? WHERE c.user_guid = ? AND c.business_guid = ?`, [userGuid, previousOwnerGuid, businessGuid]);
      await query(`update tbl_business_gallery_products d set d.user_guid = ? WHERE d.user_guid = ? AND d.business_guid = ?`, [userGuid, previousOwnerGuid, businessGuid]);
      await query(`update tbl_business_gallery_video e set e.user_guid = ? WHERE e.user_guid = ? AND e.business_guid = ?`, [userGuid, previousOwnerGuid, businessGuid]);
      await query(`update tbl_business_profile_image f set f.user_guid = ? WHERE f.user_guid = ? AND f.business_guid = ?`, [userGuid, previousOwnerGuid, businessGuid]);
      await query(`update tbl_rating g set g.user_guid = ? WHERE g.user_guid = ? AND g.business_guid = ?`, [userGuid, previousOwnerGuid, businessGuid]);
      await query(`update tbl_selected_facility_features i set i.user_guid = ? WHERE i.user_guid = ? AND i.business_guid = ?`, [userGuid, previousOwnerGuid, businessGuid]);
      await query(`update tbl_selected_social_media j set j.user_guid = ? WHERE j.user_guid = ? AND j.business_guid = ?`, [userGuid, previousOwnerGuid, businessGuid]);
      const data = {
        message: "Listing assigned",
        newOwner: userGuid,
        oldOwner: previousOwnerGuid,
        businessGuid
      };
      return new Response(JSON.stringify(data), { status: 201 });
    } catch (error) {
      console.log(error.message);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }
}
const route71 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$9
}, Symbol.toStringTag, { value: "Module" }));
const loader$p = async ({ request, params }) => {
  try {
    const url = new URL(request.url);
    let criteria = url.searchParams.get("q");
    let userGuid = url.searchParams.get("user_guid");
    if (criteria === "" || criteria === null || criteria === void 0) {
      criteria = "";
    } else {
      criteria = escapeRegex(criteria);
    }
    let rawdata = null;
    rawdata = await query(`SELECT * FROM tbl_dir WHERE title RLIKE ? AND owner = ?`, [criteria, userGuid]);
    const listings = rawdata.map((listing) => {
      delete listing.date_created;
      delete listing.last_updated;
      return listing;
    });
    return DoResponse(listings, 200);
  } catch (error) {
    console.log(error.message);
    return DoResponse({ "error": error.message }, 500);
  }
};
const route72 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$p
}, Symbol.toStringTag, { value: "Module" }));
const loader$o = async ({ request, params }) => {
  try {
    const url = new URL(request.url);
    let criteria = url.searchParams.get("q");
    if (criteria === "" || criteria === null || criteria === void 0) {
      criteria = "";
    } else {
      criteria = escapeRegex(criteria);
    }
    let rawdata = null;
    rawdata = await query(`SELECT * FROM tbl_user WHERE email RLIKE ?`, [criteria]);
    const listings = rawdata.map((listing) => {
      delete listing.date_created;
      delete listing.last_updated;
      return listing;
    });
    return DoResponse(listings, 200);
  } catch (error) {
    console.log(error.message);
    return DoResponse({ "error": error.message }, 500);
  }
};
const route73 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$o
}, Symbol.toStringTag, { value: "Module" }));
const loader$n = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }));
  }
  try {
    const url = new URL(request.url);
    let userGuid = url.searchParams.get("user_guid");
    let businessGuid = url.searchParams.get("business_guid");
    let rows = await query(`SELECT * FROM tbl_operating_hours 
            WHERE 
            user_guid = ? 
            AND 
            business_guid = ?
            `, [userGuid, businessGuid]);
    if (rows.length <= 0) {
      {
      }
      await query(`INSERT INTO tbl_operating_hours 
            SET 
            user_guid = ?,  
            business_guid = ?
            `, [userGuid, businessGuid]);
      rows = await query(`SELECT * FROM tbl_operating_hours 
            WHERE 
            user_guid = ? 
            AND 
            business_guid = ?
            `, [userGuid, businessGuid]);
    }
    console.log(rows[0]);
    return DoResponse(rows[0], 200);
  } catch (error) {
    console.log(error.message);
    return DoResponse({ "error": error.message }, 500);
  }
};
const action$8 = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
  if (request.method === "PUT") {
    try {
      {
      }
      const url = new URL(request.url);
      let userGuid = url.searchParams.get("user_guid");
      let businessGuid = url.searchParams.get("business_guid");
      const body = await request.json();
      const workingHours = body.workingHours;
      {
      }
      const ophours = await query(`SELECT * FROM 
                tbl_operating_hours WHERE
                user_guid = ?
                AND
                business_guid = ?`, [userGuid, businessGuid]);
      if (ophours.length <= 0) {
        return DoResponse({ error: "Operating hours not yet created" }, 400);
      }
      {
      }
      const ophour = ophours[0];
      const open_status = body.openStatus === void 0 ? ophour.open_status : body.openStatus;
      const monday_from = workingHours.Monday.start === void 0 ? ophour.monday_from : workingHours.Monday.start;
      const monday_to = workingHours.Monday.end === void 0 ? ophour.monday_to : workingHours.Monday.end;
      const tuesday_from = workingHours.Tuesday.start === void 0 ? ophour.tuesday_from : workingHours.Tuesday.start;
      const tuesday_to = workingHours.Tuesday.end === void 0 ? ophour.tuesday_to : workingHours.Tuesday.end;
      const wednesday_from = workingHours.Wednesday.start === void 0 ? ophour.wednesday_from : workingHours.Wednesday.start;
      const wednesday_to = workingHours.Wednesday.end === void 0 ? ophour.wednesday_to : workingHours.Wednesday.end;
      const thursday_from = workingHours.Thursday.start === void 0 ? ophour.thursday_from : workingHours.Thursday.start;
      const thursday_to = workingHours.Thursday.end === void 0 ? ophour.thursday_to : workingHours.Thursday.end;
      const friday_from = workingHours.Friday.start === void 0 ? ophour.friday_from : workingHours.Friday.start;
      const friday_to = workingHours.Friday.end === void 0 ? ophour.friday_to : workingHours.Friday.end;
      const saturday_from = workingHours.Saturday.start === void 0 ? ophour.saturday_from : workingHours.Saturday.start;
      const saturday_to = workingHours.Saturday.end === void 0 ? ophour.saturday_to : workingHours.Saturday.end;
      const sunday_from = workingHours.Sunday.start === void 0 ? ophour.sunday_from : workingHours.Sunday.start;
      const sunday_to = workingHours.Sunday.end === void 0 ? ophour.sunday_to : workingHours.Sunday.end;
      if (saturday_from === "" && saturday_to !== "") {
        return DoResponse({
          success: false,
          message: "Please check Saturday Start and End times."
        }, 500);
      }
      if (sunday_from === "" && sunday_to !== "") {
        return DoResponse({
          success: false,
          message: "Please check Sunday Start and End times."
        }, 500);
      }
      const update = await query(
        `UPDATE tbl_operating_hours SET
                open_status = ?,
                monday_from = ?,
                monday_to = ?,
                tuesday_from = ?,
                tuesday_to = ?,
                wednesday_from = ?,
                wednesday_to = ?,
                thursday_from = ?,
                thursday_to = ?,
                friday_from = ?,
                friday_to = ?,
                saturday_from = ?,
                saturday_to = ?,
                sunday_from = ?,
                sunday_to = ? 
                WHERE
                user_guid = ?
                AND
                business_guid = ?`,
        [
          open_status,
          monday_from,
          monday_to,
          tuesday_from,
          tuesday_to,
          wednesday_from,
          wednesday_to,
          thursday_from,
          thursday_to,
          friday_from,
          friday_to,
          saturday_from,
          saturday_to,
          sunday_from,
          sunday_to,
          userGuid,
          businessGuid
        ]
      );
      return DoResponse({
        success: true,
        message: "Business Hours Saved Successfully",
        workingHours: {
          businessGuid,
          userGuid,
          open_status,
          workingHours: {
            Monday: {
              monday_from,
              monday_to
            },
            Tuesday: {
              tuesday_from,
              tuesday_to
            },
            Wednesday: {
              wednesday_from,
              wednesday_to
            },
            Thursday: {
              thursday_from,
              thursday_to
            },
            Friday: {
              friday_from,
              friday_to
            },
            Saturday: {
              saturday_from,
              saturday_to
            },
            Sunday: {
              sunday_from,
              sunday_to
            }
          }
        }
      }, 200);
    } catch (error) {
      console.log(error.message);
      return DoResponse({ error: error.message }, 500);
    }
  }
  return DoResponse({
    success: false,
    message: "method not allowed"
  }, 405);
};
const route74 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$8,
  loader: loader$n
}, Symbol.toStringTag, { value: "Module" }));
const loader$m = async ({ request, params }) => {
  request.headers.get("Content-Type");
  const buid = params.business_guid;
  const user_guid = params.user_guid;
  console.log(user_guid + "|||");
  try {
    const rawdata = await query(`SELECT * FROM tbl_business_gallery_image 
            WHERE 
            business_guid = ? 
            AND 
            user_guid = ?
            ORDER BY date_created DESC`, [buid, user_guid]);
    return DoResponse(rawdata, 200);
  } catch (error) {
    console.log(error.message);
    return DoResponse({ "error": error.message }, 500);
  }
};
const route75 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$m
}, Symbol.toStringTag, { value: "Module" }));
const loader$l = async ({ request, params }) => {
  request.headers.get("Content-Type");
  params.buid;
  params.user_guid;
  try {
    const rawdata = await query(`SELECT * FROM tbl_sys_facility_features`);
    console.log(rawdata);
    return DoResponse(rawdata, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const route76 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$l
}, Symbol.toStringTag, { value: "Module" }));
const loader$k = async ({ request, params }) => {
  request.headers.get("Content-Type");
  const businessGuid = params.business_guid;
  const userGuid = params.user_guid;
  try {
    const rawdata = await query(
      `SELECT * FROM tbl_selected_facility_features 
            WHERE
            user_guid = ?
            AND
            business_guid = ?`,
      [
        userGuid,
        businessGuid
      ]
    );
    return DoResponse(rawdata, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const route77 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$k
}, Symbol.toStringTag, { value: "Module" }));
const loader$j = async ({ request, params }) => {
  request.headers.get("Content-Type");
  params.buid;
  params.user_guid;
  try {
    const rawdata = await query(`SELECT * FROM tbl_selected_facility_features`);
    return DoResponse(rawdata, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
async function action$7({ request, params }) {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }));
  }
  if (request.method === "POST") {
    try {
      const body = await request.json();
      const userGuid = body.user_guid;
      const businessGuid = body.business_guid;
      const selected = body.selected;
      await query(`DELETE FROM tbl_selected_facility_features 
                WHERE 
                user_guid = ? 
                AND 
                business_guid = ?
                `, [userGuid, businessGuid]);
      if (selected.length > 0) {
        const vals = selected.map(async (feature) => {
          try {
            const guid = crypto.randomUUID();
            await query(
              `INSERT INTO tbl_selected_facility_features 
                    (user_guid, business_guid, feature_id, user_description, guid) VALUES (?, ?, ?, ?, ?)`,
              [userGuid, businessGuid, feature.feature_id, feature.user_description, guid]
            );
          } catch (error) {
            console.log(error.message);
            return DoResponse({ error: error.message }, 405);
          }
        });
      }
      const gid = crypto.randomUUID();
      const data = {
        message: "Features added successfully",
        data: body,
        user_guid: userGuid,
        business_guid: businessGuid
      };
      return new Response(JSON.stringify(data), { status: 201 });
    } catch (error) {
      console.log(error.message);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }
}
const route78 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$7,
  loader: loader$j
}, Symbol.toStringTag, { value: "Module" }));
const loader$i = async ({ request, params }) => {
  request.headers.get("Content-Type");
  params.buid;
  params.user_guid;
  try {
    const rawdata = await query(`SELECT * FROM tbl_sys_social_media`);
    console.log(rawdata);
    return DoResponse(rawdata, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const route79 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$i
}, Symbol.toStringTag, { value: "Module" }));
const loader$h = async ({ request, params }) => {
  request.headers.get("Content-Type");
  const businessGuid = params.business_guid;
  const userGuid = params.user_guid;
  try {
    const rawdata = await query(
      `SELECT * FROM tbl_selected_social_media 
            WHERE
            user_guid = ?
            AND
            business_guid = ?`,
      [
        userGuid,
        businessGuid
      ]
    );
    return DoResponse(rawdata, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const route80 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$h
}, Symbol.toStringTag, { value: "Module" }));
const loader$g = async ({ request, params }) => {
  request.headers.get("Content-Type");
  params.buid;
  params.user_guid;
  try {
    const rawdata = await query(`SELECT * FROM tbl_selected_socials`);
    return DoResponse(rawdata, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
async function action$6({ request, params }) {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }));
  }
  if (request.method === "POST") {
    try {
      const body = await request.json();
      const userGuid = body.user_guid;
      const businessGuid = body.business_guid;
      const selected = body.selected;
      console.log(body);
      await query(`DELETE FROM tbl_selected_social_media 
                WHERE 
                user_guid = ? 
                AND 
                business_guid = ?
                `, [userGuid, businessGuid]);
      if (selected.length > 0) {
        const vals = selected.map(async (media) => {
          try {
            const guid = crypto.randomUUID();
            await query(
              `INSERT INTO tbl_selected_social_media 
                    (user_guid, business_guid, media_id, user_description, guid) VALUES (?, ?, ?, ?, ?)`,
              [userGuid, businessGuid, media.media_id, media.user_description, guid]
            );
          } catch (error) {
            return DoResponse({ error: error.message }, 405);
          }
        });
      }
      const gid = crypto.randomUUID();
      const data = {
        message: "Social media added successfully",
        data: body,
        user_guid: userGuid,
        business_guid: businessGuid
      };
      return new Response(JSON.stringify(data), { status: 201 });
    } catch (error) {
      console.log(error.message);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }
}
const route81 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$6,
  loader: loader$g
}, Symbol.toStringTag, { value: "Module" }));
const loader$f = async ({ request, params }) => {
  request.headers.get("Content-Type");
  const businessGuid = params.business_guid;
  try {
    const rawdata = await query(
      `SELECT 
            a.media_id, b.description, a.user_description, 
            a.business_guid, b.name, b.base_url, b.media_icon
            FROM 
            tbl_selected_social_media a, tbl_sys_social_media b 
            WHERE a.media_id = b.media_id 
            AND
            a.business_guid = ?`,
      [
        businessGuid
      ]
    );
    return DoResponse(rawdata, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const route82 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$f
}, Symbol.toStringTag, { value: "Module" }));
const loader$e = async ({ request, params }) => {
  request.headers.get("Content-Type");
  const businessGuid = params.business_guid;
  const userGuid = params.user_guid;
  try {
    const rawdata = await query(`SELECT * FROM tbl_dir 
            WHERE 
            gid = ? 
            AND 
            owner = ?
            ORDER BY date_created DESC`, [businessGuid, userGuid]);
    return DoResponse(rawdata, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const action$5 = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
  if (request.method === "PUT") {
    try {
      {
      }
      const body = await request.json();
      let userGuid = params.user_guid;
      let businessGuid = params.business_guid;
      {
      }
      const listings = await query(`SELECT * FROM tbl_dir 
                WHERE
                owner = ?
                AND
                gid = ?`, [userGuid, businessGuid]);
      const listing = listings[0];
      if (listings.length <= 0) {
        return DoResponse({ error: "Business does not exist" }, 400);
      }
      {
      }
      let active = body.active === void 0 ? listing.active : body.active;
      const result = await query(
        `UPDATE tbl_dir SET
                active_status = ? 
                WHERE owner = ?
                AND
                gid = ?`,
        [
          active,
          userGuid,
          businessGuid
        ]
      );
      return DoResponse({
        success: true,
        message: `User ${active ? "activated" : "deactivated"} successfully`,
        user: body
      }, 200);
    } catch (error) {
      console.log(error.message);
      return DoResponse({ error: error.message }, 500);
    }
  }
  return DoResponse({
    success: false,
    message: "method not allowed"
  }, 405);
};
const route83 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$5,
  loader: loader$e
}, Symbol.toStringTag, { value: "Module" }));
const loader$d = async ({ request, params }) => {
  try {
    const rows = await query(`SELECT 
            d.*, 
            avg_ratings.avg_rating,
            b.image_url
            FROM tbl_dir d
            LEFT JOIN (
                SELECT business_guid, AVG(rating) AS avg_rating
                FROM tbl_rating
                GROUP BY business_guid
            ) AS avg_ratings ON d.gid = avg_ratings.business_guid
            LEFT JOIN tbl_business_profile_image b ON b.business_guid = d.gid
            WHERE d.active_status = true
            ORDER BY 
            date_created
            LIMIT 0, 8
            `, []);
    if (rows.length <= 0) {
      return DoResponse({}, 200);
    }
    const listings = rows.map((listing) => {
      return listing;
    });
    return DoResponse(listings, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const action$4 = async ({ request, params }) => {
  return DoResponse({
    success: false,
    message: "method not allowed"
  }, 405);
};
const route84 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$4,
  loader: loader$d
}, Symbol.toStringTag, { value: "Module" }));
const loader$c = async ({ request, params }) => {
  const businessGuid = params.business_guid;
  const userGuid = params.user_guid;
  try {
    const rawdata = await query(`SELECT * FROM tbl_business_gallery_video 
            WHERE 
            business_guid = ? 
            AND 
            user_guid = ?
            ORDER BY date_created DESC`, [businessGuid, userGuid]);
    if (rawdata.length <= 0) {
      return DoResponse({}, 200);
    }
    return DoResponse(rawdata, 200);
  } catch (error) {
    console.log(error.message);
    return DoResponse({ "error": error.message }, 500);
  }
};
async function action$3({ request }) {
  if (request.method === "POST") {
    try {
      const body = await request.json();
      if (!body.video_url || !body.video_title) {
        return DoResponse({ error: "Please enter video link and video title" }, 400);
      }
      if (!body.business_guid) {
        return DoResponse({ error: "Business Id is missing. Contact Admin" }, 400);
      }
      if (!body.user_guid) {
        return DoResponse({ error: "User Id is missing. Contact Admin" }, 400);
      }
      const videoGuid = crypto.randomUUID();
      const videoLink = body.video_url;
      const videoTitle = body.video_title;
      const videoDescription = body.video_description;
      const userGuid = body.user_guid;
      const businessGuid = body.business_guid;
      {
      }
      const insert = await query(
        `INSERT INTO tbl_business_gallery_video
      (video_title, video_url, video_description, video_guid, user_guid, business_guid)
      VALUES (?, ?, ?, ?, ?, ?)`,
        [videoTitle, videoLink, videoDescription, videoGuid, userGuid, businessGuid]
      );
      const data = {
        success: true,
        message: "Video added successfully",
        videoInsertId: insert.insertId,
        user_guid: userGuid,
        business_guid: businessGuid,
        videoLink,
        videoTitle,
        videoDescription
      };
      return DoResponse({ data }, 200);
    } catch (error) {
      return DoResponse({ message: error.message }, 500);
    }
  }
  if (request.method === "PUT") {
    try {
      const body = await request.json();
      if (!body.video_url || !body.video_title) {
        return DoResponse({ error: "Please enter video link and video title" }, 400);
      }
      if (!body.business_guid) {
        return DoResponse({ error: "Business Id is missing. Contact Admin" }, 400);
      }
      if (!body.user_guid) {
        return DoResponse({ error: "User Id is missing. Contact Admin" }, 400);
      }
      if (!body.video_guid) {
        return DoResponse({ error: "Video guid is missing. Contact Admin" }, 400);
      }
      const videoGuid = body.video_guid;
      const videoLink = body.video_url;
      const videoTitle = body.video_title;
      const videoDescription = body.video_description;
      const userGuid = body.user_guid;
      const businessGuid = body.business_guid;
      {
      }
      const update = await query(
        `UPDATE tbl_business_gallery_video
                SET 
                video_url = ?,
                video_title = ?, 
                video_description = ? 
                WHERE
                video_guid = ?
                AND
                business_guid = ?
                AND
                user_guid = ?`,
        [
          videoLink,
          videoTitle,
          videoDescription,
          videoGuid,
          businessGuid,
          userGuid
        ]
      );
      const data = {
        success: true,
        message: "Video updated successfully",
        user_guid: userGuid,
        business_guid: businessGuid,
        videoLink,
        videoTitle,
        videoDescription
      };
      return DoResponse({ data }, 200);
    } catch (error) {
      return DoResponse({ message: error.message }, 500);
    }
  }
  if (request.method === "DELETE") {
    try {
      const contentType = request.headers.get("Content-Type");
      if (!(contentType == null ? void 0 : contentType.includes("application/json"))) {
        return DoResponse({ error: "Invalid content type. Expected JSON." }, 415);
      }
      const body = await request.json();
      const { user_guid, business_guid, video_guid } = body;
      if (!user_guid || !business_guid || !video_guid) {
        return DoResponse({ error: "Missing required fields. Contact Admin" }, 400);
      }
      const [existingImageRecord] = await query(
        `SELECT * FROM tbl_business_gallery_video
                WHERE user_guid = ?
                AND business_guid = ?
                AND video_guid = ?`,
        [user_guid, business_guid, video_guid]
      );
      const video = existingImageRecord;
      if (video.length <= 0) {
        return DoResponse({ message: "Video does not exist" }, 200);
      }
      await query(
        `DELETE FROM tbl_business_gallery_video
                WHERE user_guid = ? AND
                business_guid = ? AND
                video_guid = ?`,
        [user_guid, business_guid, video_guid]
      );
      return DoResponse(
        {
          message: "File deleted successfully"
        },
        200
      );
    } catch (error) {
      console.error("Deletion error:", error);
      return DoResponse({ error: error.message || "Deletion failed" }, 500);
    }
  }
  return DoResponse({ message: "method not allowed" }, 200);
}
const route85 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$3,
  loader: loader$c
}, Symbol.toStringTag, { value: "Module" }));
const loader$b = async ({ request, params }) => {
  const businessGuid = params.business_guid;
  const userGuid = params.user_guid;
  try {
    const rawdata = await query(`SELECT * FROM tbl_business_gallery_video 
            WHERE 
            business_guid = ? 
            AND 
            user_guid = ?
            ORDER BY date_created DESC`, [businessGuid, userGuid]);
    if (rawdata.length <= 0) {
      return DoResponse({}, 200);
    }
    return DoResponse(rawdata, 200);
  } catch (error) {
    console.log(error.message);
    return DoResponse({ "error": error.message }, 500);
  }
};
async function action$2({ request }) {
  if (request.method === "POST") {
    try {
      const body = await request.json();
      if (!body.video_url || !body.video_title) {
        return DoResponse({ error: "Please enter video link and video title" }, 400);
      }
      if (!body.business_guid) {
        return DoResponse({ error: "Business Id is missing. Contact Admin" }, 400);
      }
      if (!body.user_guid) {
        return DoResponse({ error: "User Id is missing. Contact Admin" }, 400);
      }
      const videoGuid = crypto.randomUUID();
      const videoLink = body.video_url;
      const videoTitle = body.video_title;
      const videoDescription = body.video_description;
      const userGuid = body.user_guid;
      const businessGuid = body.business_guid;
      {
      }
      const insert = await query(
        `INSERT INTO tbl_business_gallery_video
      (video_title, video_url, video_description, video_guid, user_guid, business_guid)
      VALUES (?, ?, ?, ?, ?, ?)`,
        [videoTitle, videoLink, videoDescription, videoGuid, userGuid, businessGuid]
      );
      const data = {
        success: true,
        message: "Video added successfully",
        videoInsertId: insert.insertId,
        user_guid: userGuid,
        business_guid: businessGuid,
        videoLink,
        videoTitle,
        videoDescription
      };
      return DoResponse({ data }, 200);
    } catch (error) {
      return DoResponse({ message: error.message }, 500);
    }
  }
  return DoResponse({ message: "method not allowed" }, 200);
}
const route86 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$2,
  loader: loader$b
}, Symbol.toStringTag, { value: "Module" }));
const loader$a = async ({ request, params }) => {
  const businessGuid = params.business_guid;
  try {
    const rawdata = await query(`SELECT * FROM tbl_business_gallery_video 
            WHERE 
            business_guid = ? 
            ORDER BY date_created DESC`, [businessGuid]);
    if (rawdata.length <= 0) {
      return DoResponse({}, 200);
    }
    return DoResponse(rawdata, 200);
  } catch (error) {
    console.log(error.message);
    return DoResponse({ "error": error.message }, 500);
  }
};
const route87 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$a
}, Symbol.toStringTag, { value: "Module" }));
const loader$9 = async ({ request, params }) => {
  const userGuid = params.user_guid;
  const businessGuid = params.business_guid;
  try {
    const rawdata = await query(`SELECT * FROM tbl_business_gallery_products 
            WHERE
            user_guid = ?
            AND 
            business_guid = ?
            ORDER BY date_created DESC`, [userGuid, businessGuid]);
    return DoResponse(rawdata, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
async function action$1({ request }) {
  return DoResponse({ message: "method not allowed" }, 200);
}
const route88 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1,
  loader: loader$9
}, Symbol.toStringTag, { value: "Module" }));
const loader$8 = async ({ request, params }) => {
  return DoResponse({
    success: false,
    message: "method not allowed"
  }, 405);
};
async function action({ request }) {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse({ error: "Invalid content type. Expected JSON." }, 500);
  }
  if (request.method === "POST") {
    try {
      const body = await request.json();
      if (!body.business_guid) {
        return DoResponse({ error: "Please fill all information!" }, 400);
      }
      if (!body.user_guid) {
        return DoResponse({ error: "User GUID empty!" }, 400);
      }
      if (!body.rating) {
        return DoResponse({ error: "Rating empty!" }, 400);
      }
      if (!body.comment) {
        return DoResponse({ error: "Please write a comment!" }, 400);
      }
      if (!body.fullname) {
        return DoResponse({ error: "Please fill in full name!" }, 400);
      }
      const userGuid = body.user_guid;
      const businsessGuid = body.business_guid;
      const rating = body.rating;
      const comment = body.comment;
      const fullname = body.fullname;
      const ratingGuid = crypto.randomUUID();
      {
      }
      const rows = await query(
        `SELECT * FROM tbl_rating 
                WHERE
                user_guid = ?
                AND
                business_guid = ?`,
        [
          userGuid,
          businsessGuid
        ]
      );
      if (rows.length > 0) {
        {
        }
        const result = await query(
          `UPDATE tbl_rating 
                    SET 
                    rating = ?, 
                    comment = ?, 
                    fullname = ?  
                    WHERE
                    user_guid = ? 
                    AND 
                    business_guid = ?`,
          [
            rating,
            comment,
            fullname,
            userGuid,
            businsessGuid
          ]
        );
      } else {
        {
        }
        const result = await query(
          `INSERT INTO tbl_rating 
                    (rating, comment, fullname, user_guid, business_guid, rating_guid)
                    VALUES
                    (?, ?, ?, ?, ?, ?)`,
          [
            rating,
            comment,
            fullname,
            userGuid,
            businsessGuid,
            ratingGuid
          ]
        );
      }
      let responseData = null;
      if (rows.length > 0) {
        body.rating_guid = rows[0].rating_guid;
        responseData = {
          success: true,
          message: "rating updated successfully",
          data: body
        };
      } else {
        body.rating_guid = ratingGuid;
        responseData = {
          success: true,
          message: "rating created successfully",
          data: body
        };
      }
      return DoResponse(responseData, 200);
    } catch (error) {
      return DoResponse({ error: error.message }, 500);
    }
  }
  return DoResponse({ error: "method not allowed" }, 200);
}
const route89 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  loader: loader$8
}, Symbol.toStringTag, { value: "Module" }));
const loader$7 = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }));
  }
  try {
    const userGuid = params.user_guid;
    const businessGuid = params.business_guid;
    const rows = await query(`SELECT * from tbl_rating
            WHERE
            user_guid = ? 
            AND 
            business_guid = ?
            `, [userGuid, businessGuid]);
    if (rows.length <= 0) {
      return DoResponse([], 200);
    }
    return DoResponse(rows[0], 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const route90 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$7
}, Symbol.toStringTag, { value: "Module" }));
const loader$6 = async ({ request, params }) => {
  try {
    const businessGuid = params.business_guid;
    const rows = await query(`
            SELECT
            r.rating_guid,
            r.rating,
            r.fullname,
            r.comment,
            r.created_at,
            r.updated_at,
            up.image_url,
            
            -- Location data pulled safely via scalar subqueries
            (SELECT name FROM tbl_country co WHERE co.iso2 = u.country_code LIMIT 1) AS country_name,
            (SELECT name FROM tbl_state st WHERE st.iso2 = u.state_code LIMIT 1) AS state_name,
            (SELECT name FROM tbl_city ci WHERE ci.id = u.city_id LIMIT 1) AS city_name

        FROM tbl_rating r
        LEFT JOIN tbl_user u ON r.user_guid = u.user_guid
        LEFT JOIN tbl_user_profile_image up ON up.user_guid = u.user_guid
        WHERE r.business_guid = ?
        ORDER BY r.created_at DESC;
                `, [businessGuid]);
    if (rows.length <= 0) {
      return DoResponse([], 200);
    }
    return DoResponse(rows, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const route91 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$6
}, Symbol.toStringTag, { value: "Module" }));
const loader$5 = async ({ request, params }) => {
  try {
    const businessGuid = params.business_guid;
    const rows = await query(
      `SELECT 
            AVG(a.rating) as rating_average,
            SUM(a.rating) as rating_sum, 
            COUNT(a.rating) AS rating_count 
            FROM 
            tbl_rating a 
            WHERE 
            a.business_guid = ?`,
      [businessGuid]
    );
    return DoResponse(rows[0], 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const route92 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$5
}, Symbol.toStringTag, { value: "Module" }));
const loader$4 = async ({ request, params }) => {
  request.headers.get("Content-Type");
  if (request.method === "GET") {
    const url = new URL(request.url);
    const countryCode = url.searchParams.get("country_code");
    const rows = await query(`SELECT * FROM tbl_state WHERE country_code = ?
            ORDER BY name ASC`, [countryCode]);
    if (rows.length <= 0) {
      return DoResponse([{}], 200);
    }
    const states = rows.map((state) => {
      return {
        name: state.name,
        country_code: state.country_code,
        id: state.iso2
      };
    });
    return DoResponse(states, 200);
  }
};
const route93 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$4
}, Symbol.toStringTag, { value: "Module" }));
const loader$3 = async ({ request, params }) => {
  if (request.method === "GET") {
    const rows = await query(`SELECT * FROM tbl_country`);
    if (rows.length <= 0) {
      return DoResponse({}, 200);
    }
    const countries = rows.map((country) => {
      return {
        name: country.name,
        id: country.iso2
      };
    });
    return DoResponse(countries, 200);
  }
};
const route94 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$3
}, Symbol.toStringTag, { value: "Module" }));
const getZoneData = (zone) => {
  const obj = JSON.parse(zone);
  return obj;
};
const loader$2 = async ({ request, params }) => {
  if (request.method === "GET") {
    const rows = await query(`SELECT * FROM tbl_country`);
    if (rows.length <= 0) {
      return DoResponse({}, 200);
    }
    const countries = rows.map((country) => {
      const zoneData = getZoneData(country == null ? void 0 : country.timezones);
      const zone = zoneData[0];
      return {
        id: country.iso2,
        countryCode: country.iso2,
        callCode: country.phonecode,
        countryName: country.name,
        gmtOffset: zone == null ? void 0 : zone.gmtOffset,
        gmtOffsetName: zone == null ? void 0 : zone.gmtOffsetName,
        abbreviation: zone == null ? void 0 : zone.abbreviation,
        timezoneName: zone == null ? void 0 : zone.tzName,
        zoneName: zone == null ? void 0 : zone.zoneName,
        timeZone: "mo",
        lat: zone == null ? void 0 : zone.latitude,
        lng: zone == null ? void 0 : zone.longitude
      };
    });
    return DoResponse(countries, 200);
  }
};
const route95 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
const loader$1 = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
  if (request.method === "GET") {
    const url = new URL(request.url);
    const countryCode = url.searchParams.get("country_code");
    const stateCode = url.searchParams.get("state_code");
    console.log(`statecode: ${stateCode}`);
    console.log(`countrycode: ${countryCode}`);
    const rows = await query(`SELECT * FROM tbl_city 
            WHERE
            country_code = ?
            AND
            state_code = ?
            ORDER BY name
            ASC`, [countryCode, stateCode]);
    if (rows.length <= 0) {
      return DoResponse([{}], 200);
    }
    const cities = rows.map((city) => {
      return {
        name: city.name,
        country_code: city.country_code,
        state_code: city.state_code,
        id: city.id
      };
    });
    return DoResponse(cities, 200);
  }
};
const route96 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
const loader = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
  if (request.method === "GET") {
    const rows = await query(`SELECT * FROM tbl_category`);
    if (rows.length <= 0) {
      return GetResponse([{}], true, 200);
    }
    return GetResponse(rows, true, 200);
  }
};
const route97 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-C5CjjBrB.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-QUucBwvO.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-DI7YrXfw.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-QUucBwvO.js", "/assets/NotificationContext-BINcc4pQ.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/SliderContext-Do4036m9.js", "/assets/EditPhotoDialogContext-Cbk1fN0I.js", "/assets/EditVideoDialogContext-VQ328tnj.js", "/assets/VideoSliderContext-CzprGIa_.js", "/assets/OperationContext-C6xAhjBF.js", "/assets/lib-fXI4j3aJ.js", "/assets/LoadingMessage-bRJt_uvW.js", "/assets/index-BUrKnmy-.js", "/assets/types-DBTFAyTi.js"], "css": ["/assets/root-wpRm-7dU.css"] }, "routes/_index_second_backup": { "id": "routes/_index_second_backup", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index_second_backup-BBMB6fJf.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/HomeNav-CWDj5E_I.js", "/assets/components-QUucBwvO.js", "/assets/lib-fXI4j3aJ.js", "/assets/Footer-DtuFR9bx.js", "/assets/UserMenu-CjBNPLvY.js", "/assets/TopAd-3RAqbcjV.js", "/assets/AccountUserImage-CnoFpQuq.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/LatestStarRating-DCNjL6NK.js", "/assets/css-CVxtJxAn.js", "/assets/index-BUrKnmy-.js"], "css": [] }, "routes/_index_third_backup": { "id": "routes/_index_third_backup", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index_third_backup-B_ElJK25.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/SrchNavbar-DGecDSsg.js", "/assets/lib-fXI4j3aJ.js", "/assets/components-QUucBwvO.js", "/assets/CallToActionSection-nqiJW55f.js", "/assets/FooterSection-iHY_pQnb.js", "/assets/UserMenu-CjBNPLvY.js", "/assets/AccountUserImage-CnoFpQuq.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/css-CVxtJxAn.js", "/assets/index-BUrKnmy-.js", "/assets/json-DxAbghx2.js"], "css": [] }, "routes/_index_backup": { "id": "routes/_index_backup", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index_backup-BI1XsRe5.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/Footer-DtuFR9bx.js", "/assets/lib-fXI4j3aJ.js", "/assets/components-QUucBwvO.js", "/assets/UserMenu-CjBNPLvY.js", "/assets/AccountUserImage-CnoFpQuq.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/LatestStarRating-DCNjL6NK.js", "/assets/css-CVxtJxAn.js", "/assets/index-BUrKnmy-.js"], "css": [] }, "routes/homepage": { "id": "routes/homepage", "parentId": "root", "path": "homepage", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/homepage-qSJ5idFo.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/YourGuide-iED_Vexc.js", "/assets/components-QUucBwvO.js", "/assets/lib-fXI4j3aJ.js", "/assets/FooterAlt-Bxh0-Ta0.js", "/assets/MainNav-BMkHXq3s.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/AccountUserImage-CnoFpQuq.js", "/assets/index-BUrKnmy-.js"], "css": [] }, "routes/landing": { "id": "routes/landing", "parentId": "root", "path": "landing", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-BspaleB3.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js"], "css": [] }, "routes/listing": { "id": "routes/listing", "parentId": "root", "path": "listing", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-Cd8rPj2O.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-QUucBwvO.js", "/assets/index-BUrKnmy-.js", "/assets/SliderContext-Do4036m9.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/zod-BgOlUoe_.js", "/assets/NotificationContext-BINcc4pQ.js", "/assets/OperationContext-C6xAhjBF.js", "/assets/types-DBTFAyTi.js", "/assets/lib-fXI4j3aJ.js", "/assets/VideoSliderContext-CzprGIa_.js", "/assets/ProductSliderContext-Z8CdvAmU.js", "/assets/TopAd-3RAqbcjV.js", "/assets/SearchLayout-BZkTQaP1.js", "/assets/CallToActionSection-nqiJW55f.js", "/assets/VerticalHeight-CjKseacd.js", "/assets/FooterAlt-Bxh0-Ta0.js", "/assets/MainNav-BMkHXq3s.js", "/assets/AccountUserImage-CnoFpQuq.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-CaBSMFoj.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/YourGuide-iED_Vexc.js", "/assets/FooterAlt-Bxh0-Ta0.js", "/assets/lib-fXI4j3aJ.js", "/assets/OperationContext-C6xAhjBF.js", "/assets/components-QUucBwvO.js", "/assets/MainNav-BMkHXq3s.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/AccountUserImage-CnoFpQuq.js", "/assets/index-BUrKnmy-.js"], "css": [] }, "routes/_404": { "id": "routes/_404", "parentId": "root", "path": "*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_404-C6qwenAs.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/MainNav-BMkHXq3s.js", "/assets/components-QUucBwvO.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/lib-fXI4j3aJ.js", "/assets/AccountUserImage-CnoFpQuq.js", "/assets/index-BUrKnmy-.js"], "css": [] }, "routes/web": { "id": "routes/web", "parentId": "root", "path": "web", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-Cmlstfnz.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js"], "css": [] }, "routes/listing/index": { "id": "routes/listing/index", "parentId": "root", "path": "/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-Cd8rPj2O.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-QUucBwvO.js", "/assets/index-BUrKnmy-.js", "/assets/SliderContext-Do4036m9.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/zod-BgOlUoe_.js", "/assets/NotificationContext-BINcc4pQ.js", "/assets/OperationContext-C6xAhjBF.js", "/assets/types-DBTFAyTi.js", "/assets/lib-fXI4j3aJ.js", "/assets/VideoSliderContext-CzprGIa_.js", "/assets/ProductSliderContext-Z8CdvAmU.js", "/assets/TopAd-3RAqbcjV.js", "/assets/SearchLayout-BZkTQaP1.js", "/assets/CallToActionSection-nqiJW55f.js", "/assets/VerticalHeight-CjKseacd.js", "/assets/FooterAlt-Bxh0-Ta0.js", "/assets/MainNav-BMkHXq3s.js", "/assets/AccountUserImage-CnoFpQuq.js"], "css": [] }, "routes/landing/index": { "id": "routes/landing/index", "parentId": "root", "path": "/landing", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-BspaleB3.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js"], "css": [] }, "routes/web/search/index": { "id": "routes/web/search/index", "parentId": "root", "path": "/web/search", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-BguuBV9T.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-QUucBwvO.js", "/assets/lib-fXI4j3aJ.js", "/assets/LatestStarRating-DCNjL6NK.js", "/assets/json-DxAbghx2.js", "/assets/TopAd-3RAqbcjV.js", "/assets/SearchLayout-BZkTQaP1.js", "/assets/VerticalHeight-CjKseacd.js", "/assets/CallToActionSection-nqiJW55f.js", "/assets/FooterSection-iHY_pQnb.js", "/assets/MainNav-BMkHXq3s.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/AccountUserImage-CnoFpQuq.js", "/assets/index-BUrKnmy-.js"], "css": [] }, "routes/web/browse/index": { "id": "routes/web/browse/index", "parentId": "root", "path": "/web/browse", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-Eb-oR8Wd.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-QUucBwvO.js", "/assets/lib-fXI4j3aJ.js", "/assets/Categories-wTMXIohr.js", "/assets/MainNav-BMkHXq3s.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/AccountUserImage-CnoFpQuq.js", "/assets/index-BUrKnmy-.js"], "css": [] }, "routes/web/browse/browse": { "id": "routes/web/browse/browse", "parentId": "root", "path": "/web/browser", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/browse-BWwU0Udr.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/SrchNavbar-DGecDSsg.js", "/assets/components-QUucBwvO.js", "/assets/lib-fXI4j3aJ.js", "/assets/UserMenu-CjBNPLvY.js", "/assets/AccountUserImage-CnoFpQuq.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/css-CVxtJxAn.js", "/assets/index-BUrKnmy-.js", "/assets/json-DxAbghx2.js"], "css": [] }, "routes/web/signin/index": { "id": "routes/web/signin/index", "parentId": "root", "path": "/web/signin", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-C6n5FlEd.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/zod-BgOlUoe_.js", "/assets/components-QUucBwvO.js", "/assets/types-DBTFAyTi.js", "/assets/NotificationContext-BINcc4pQ.js", "/assets/OperationContext-C6xAhjBF.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/AuthHeader-BHHSunR4.js", "/assets/lib-fXI4j3aJ.js"], "css": [] }, "routes/web/signup/index": { "id": "routes/web/signup/index", "parentId": "root", "path": "/web/signup", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-4pCIUVl1.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/zod-BgOlUoe_.js", "/assets/components-QUucBwvO.js", "/assets/OperationContext-C6xAhjBF.js", "/assets/NotificationContext-BINcc4pQ.js", "/assets/lib-fXI4j3aJ.js", "/assets/types-DBTFAyTi.js", "/assets/AuthHeader-BHHSunR4.js"], "css": [] }, "routes/web/reset_password/index": { "id": "routes/web/reset_password/index", "parentId": "root", "path": "/web/reset_password", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-BhmMa6Li.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/zod-BgOlUoe_.js", "/assets/components-QUucBwvO.js", "/assets/OperationContext-C6xAhjBF.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/types-DBTFAyTi.js", "/assets/lib-fXI4j3aJ.js", "/assets/NotificationContext-BINcc4pQ.js", "/assets/AuthHeader-BHHSunR4.js"], "css": [] }, "routes/web/account/index": { "id": "routes/web/account/index", "parentId": "root", "path": "/web/account", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-K7CFDcxe.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/AccountLayout-BU6wv3SG.js", "/assets/ContentLayout-BSjCmbyT.js", "/assets/components-QUucBwvO.js", "/assets/AccountUserImage-CnoFpQuq.js", "/assets/lib-fXI4j3aJ.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/HomeNav-CWDj5E_I.js", "/assets/MainNav-BMkHXq3s.js", "/assets/index-BUrKnmy-.js", "/assets/BusinessMenu-BoPGBUS3.js", "/assets/BusinessDrawer-BtxLyMOE.js"], "css": [] }, "routes/web/account/profile/index": { "id": "routes/web/account/profile/index", "parentId": "root", "path": "/web/account/profile", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-8FGBDt1A.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-QUucBwvO.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/lib-fXI4j3aJ.js", "/assets/NotificationContext-BINcc4pQ.js", "/assets/OperationContext-C6xAhjBF.js", "/assets/zod-BgOlUoe_.js", "/assets/types-DBTFAyTi.js", "/assets/Button-7Woa2p3a.js", "/assets/Input-WkjcjSGn.js", "/assets/Select-B3UKVxdB.js", "/assets/css-CVxtJxAn.js", "/assets/ProfileLayout-BR7TCf-Y.js", "/assets/LoadingMessage-bRJt_uvW.js", "/assets/AccountUserImage-CnoFpQuq.js", "/assets/HomeNav-CWDj5E_I.js", "/assets/MainNav-BMkHXq3s.js", "/assets/index-BUrKnmy-.js"], "css": [] }, "routes/web/account/email_address/index": { "id": "routes/web/account/email_address/index", "parentId": "root", "path": "/web/account/email_address", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-BQcnToVI.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-QUucBwvO.js", "/assets/AccountLayout-BU6wv3SG.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/lib-fXI4j3aJ.js", "/assets/zod-BgOlUoe_.js", "/assets/Button-7Woa2p3a.js", "/assets/Input-WkjcjSGn.js", "/assets/types-DBTFAyTi.js", "/assets/css-CVxtJxAn.js", "/assets/NotificationContext-BINcc4pQ.js", "/assets/OperationContext-C6xAhjBF.js", "/assets/ProfileContentLayout-DDi9pYmo.js", "/assets/LoadingMessage-bRJt_uvW.js", "/assets/AccountUserImage-CnoFpQuq.js", "/assets/HomeNav-CWDj5E_I.js", "/assets/MainNav-BMkHXq3s.js", "/assets/index-BUrKnmy-.js", "/assets/BusinessMenu-BoPGBUS3.js"], "css": [] }, "routes/web/account/change_password/index": { "id": "routes/web/account/change_password/index", "parentId": "root", "path": "/web/account/change_password", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-CQ82I-T8.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-QUucBwvO.js", "/assets/AccountLayout-BU6wv3SG.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/lib-fXI4j3aJ.js", "/assets/zod-BgOlUoe_.js", "/assets/Button-7Woa2p3a.js", "/assets/Input-WkjcjSGn.js", "/assets/types-DBTFAyTi.js", "/assets/css-CVxtJxAn.js", "/assets/NotificationContext-BINcc4pQ.js", "/assets/OperationContext-C6xAhjBF.js", "/assets/ProfileContentLayout-DDi9pYmo.js", "/assets/LoadingMessage-bRJt_uvW.js", "/assets/AccountUserImage-CnoFpQuq.js", "/assets/HomeNav-CWDj5E_I.js", "/assets/MainNav-BMkHXq3s.js", "/assets/index-BUrKnmy-.js", "/assets/BusinessMenu-BoPGBUS3.js"], "css": [] }, "routes/web/account/reset_password/index": { "id": "routes/web/account/reset_password/index", "parentId": "root", "path": "/web/account/reset_password", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-Cmh5PSIS.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-QUucBwvO.js", "/assets/AccountLayout-BU6wv3SG.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/lib-fXI4j3aJ.js", "/assets/zod-BgOlUoe_.js", "/assets/Button-7Woa2p3a.js", "/assets/Input-WkjcjSGn.js", "/assets/types-DBTFAyTi.js", "/assets/css-CVxtJxAn.js", "/assets/NotificationContext-BINcc4pQ.js", "/assets/OperationContext-C6xAhjBF.js", "/assets/ProfileContentLayout-DDi9pYmo.js", "/assets/LoadingMessage-bRJt_uvW.js", "/assets/AccountUserImage-CnoFpQuq.js", "/assets/HomeNav-CWDj5E_I.js", "/assets/MainNav-BMkHXq3s.js", "/assets/index-BUrKnmy-.js", "/assets/BusinessMenu-BoPGBUS3.js"], "css": [] }, "routes/web/account/deactivate_profile/index": { "id": "routes/web/account/deactivate_profile/index", "parentId": "root", "path": "/web/account/deactivate_profile", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-CtwNCBI5.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-QUucBwvO.js", "/assets/AccountLayout-BU6wv3SG.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/lib-fXI4j3aJ.js", "/assets/zod-BgOlUoe_.js", "/assets/Button-7Woa2p3a.js", "/assets/Input-WkjcjSGn.js", "/assets/types-DBTFAyTi.js", "/assets/css-CVxtJxAn.js", "/assets/NotificationContext-BINcc4pQ.js", "/assets/OperationContext-C6xAhjBF.js", "/assets/ProfileContentLayout-DDi9pYmo.js", "/assets/LoadingMessage-bRJt_uvW.js", "/assets/AccountUserImage-CnoFpQuq.js", "/assets/HomeNav-CWDj5E_I.js", "/assets/MainNav-BMkHXq3s.js", "/assets/index-BUrKnmy-.js", "/assets/BusinessMenu-BoPGBUS3.js"], "css": [] }, "routes/web/terms/index": { "id": "routes/web/terms/index", "parentId": "root", "path": "/web/terms", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-D8LN-e4o.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/VerticalHeight-CjKseacd.js", "/assets/FooterAlt-Bxh0-Ta0.js", "/assets/SearchLayout-BZkTQaP1.js", "/assets/lib-fXI4j3aJ.js", "/assets/components-QUucBwvO.js", "/assets/MainNav-BMkHXq3s.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/AccountUserImage-CnoFpQuq.js", "/assets/index-BUrKnmy-.js"], "css": [] }, "routes/web/privacy/index": { "id": "routes/web/privacy/index", "parentId": "root", "path": "/web/privacy", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-CKmlEOF8.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/VerticalHeight-CjKseacd.js", "/assets/FooterAlt-Bxh0-Ta0.js", "/assets/SearchLayout-BZkTQaP1.js", "/assets/lib-fXI4j3aJ.js", "/assets/components-QUucBwvO.js", "/assets/MainNav-BMkHXq3s.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/AccountUserImage-CnoFpQuq.js", "/assets/index-BUrKnmy-.js"], "css": [] }, "routes/web/contact/index": { "id": "routes/web/contact/index", "parentId": "root", "path": "/web/contact", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-BvvJ-zSy.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/VerticalHeight-CjKseacd.js", "/assets/FooterAlt-Bxh0-Ta0.js", "/assets/SearchLayout-BZkTQaP1.js", "/assets/lib-fXI4j3aJ.js", "/assets/components-QUucBwvO.js", "/assets/MainNav-BMkHXq3s.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/AccountUserImage-CnoFpQuq.js", "/assets/index-BUrKnmy-.js"], "css": [] }, "routes/web/browse/db": { "id": "routes/web/browse/db", "parentId": "root", "path": "/web/db", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/db-CLXrFxUX.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-QUucBwvO.js", "/assets/SrchNavbar-DGecDSsg.js", "/assets/Categories-wTMXIohr.js", "/assets/FooterSection-iHY_pQnb.js", "/assets/VerticalHeight-CjKseacd.js", "/assets/CallToActionSection-nqiJW55f.js", "/assets/lib-fXI4j3aJ.js", "/assets/UserMenu-CjBNPLvY.js", "/assets/AccountUserImage-CnoFpQuq.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/css-CVxtJxAn.js", "/assets/index-BUrKnmy-.js", "/assets/json-DxAbghx2.js"], "css": [] }, "routes/web/account/portfolio/index": { "id": "routes/web/account/portfolio/index", "parentId": "root", "path": "/web/account/portfolio", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-G7JAz9j2.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-QUucBwvO.js", "/assets/AccountLayout-BU6wv3SG.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/lib-fXI4j3aJ.js", "/assets/LoadingMessage-bRJt_uvW.js", "/assets/AccountUserImage-CnoFpQuq.js", "/assets/HomeNav-CWDj5E_I.js", "/assets/MainNav-BMkHXq3s.js", "/assets/index-BUrKnmy-.js"], "css": [] }, "routes/web/account/portfolio/business/index": { "id": "routes/web/account/portfolio/business/index", "parentId": "root", "path": "/web/account/portfolio/:business_guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-q9P2i5Ow.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-QUucBwvO.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/lib-fXI4j3aJ.js", "/assets/ProfileLayout-BR7TCf-Y.js", "/assets/zod-BgOlUoe_.js", "/assets/types-DBTFAyTi.js", "/assets/TextareaWithWordLimit-DEecuI9K.js", "/assets/NotificationContext-BINcc4pQ.js", "/assets/OperationContext-C6xAhjBF.js", "/assets/Button-7Woa2p3a.js", "/assets/Input-WkjcjSGn.js", "/assets/css-CVxtJxAn.js", "/assets/Select-B3UKVxdB.js", "/assets/BusinessMenu-BoPGBUS3.js", "/assets/BusinessDrawer-BtxLyMOE.js", "/assets/LoadingMessage-bRJt_uvW.js", "/assets/AccountUserImage-CnoFpQuq.js", "/assets/HomeNav-CWDj5E_I.js", "/assets/MainNav-BMkHXq3s.js", "/assets/index-BUrKnmy-.js"], "css": [] }, "routes/web/account/create_business/index": { "id": "routes/web/account/create_business/index", "parentId": "root", "path": "/web/account/create_business", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-BBz4dRFw.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-QUucBwvO.js", "/assets/AccountLayout-BU6wv3SG.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/zod-BgOlUoe_.js", "/assets/lib-fXI4j3aJ.js", "/assets/Input-WkjcjSGn.js", "/assets/Select-B3UKVxdB.js", "/assets/Button-7Woa2p3a.js", "/assets/css-CVxtJxAn.js", "/assets/TextareaWithWordLimit-DEecuI9K.js", "/assets/CreatePageSchema-5wPOr2lU.js", "/assets/NotificationContext-BINcc4pQ.js", "/assets/OperationContext-C6xAhjBF.js", "/assets/ProfileContentLayout-DDi9pYmo.js", "/assets/LoadingMessage-bRJt_uvW.js", "/assets/AccountUserImage-CnoFpQuq.js", "/assets/HomeNav-CWDj5E_I.js", "/assets/MainNav-BMkHXq3s.js", "/assets/index-BUrKnmy-.js", "/assets/types-DBTFAyTi.js", "/assets/BusinessMenu-BoPGBUS3.js"], "css": [] }, "routes/web/account/portfolio/business/settings/index": { "id": "routes/web/account/portfolio/business/settings/index", "parentId": "root", "path": "/web/account/portfolio/:business_guid/:user_guid/settings", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-BTRd9NL9.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/zod-BgOlUoe_.js", "/assets/components-QUucBwvO.js", "/assets/lib-fXI4j3aJ.js", "/assets/types-DBTFAyTi.js", "/assets/AccountLayout-BU6wv3SG.js", "/assets/ContentLayout-BSjCmbyT.js", "/assets/NotificationContext-BINcc4pQ.js", "/assets/OperationContext-C6xAhjBF.js", "/assets/css-CVxtJxAn.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/LoadingMessage-bRJt_uvW.js", "/assets/AccountUserImage-CnoFpQuq.js", "/assets/HomeNav-CWDj5E_I.js", "/assets/MainNav-BMkHXq3s.js", "/assets/index-BUrKnmy-.js", "/assets/BusinessMenu-BoPGBUS3.js", "/assets/BusinessDrawer-BtxLyMOE.js"], "css": [] }, "routes/web/account/portfolio/business/gallery/index": { "id": "routes/web/account/portfolio/business/gallery/index", "parentId": "root", "path": "/web/account/portfolio/:business_guid/:user_guid/gallery", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-BZD2cSm8.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-QUucBwvO.js", "/assets/AccountLayout-BU6wv3SG.js", "/assets/ContentLayout-BSjCmbyT.js", "/assets/lib-fXI4j3aJ.js", "/assets/EditPhotoDialogContext-Cbk1fN0I.js", "/assets/NotificationContext-BINcc4pQ.js", "/assets/index-BUrKnmy-.js", "/assets/SliderContext-Do4036m9.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/OperationContext-C6xAhjBF.js", "/assets/LoadingMessage-bRJt_uvW.js", "/assets/AccountUserImage-CnoFpQuq.js", "/assets/HomeNav-CWDj5E_I.js", "/assets/MainNav-BMkHXq3s.js", "/assets/BusinessMenu-BoPGBUS3.js", "/assets/BusinessDrawer-BtxLyMOE.js"], "css": [] }, "routes/web/account/portfolio/business/products/index": { "id": "routes/web/account/portfolio/business/products/index", "parentId": "root", "path": "/web/account/portfolio/:business_guid/:user_guid/products", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-fb9AcZHO.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-QUucBwvO.js", "/assets/AccountLayout-BU6wv3SG.js", "/assets/ContentLayout-BSjCmbyT.js", "/assets/lib-fXI4j3aJ.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/NotificationContext-BINcc4pQ.js", "/assets/OperationContext-C6xAhjBF.js", "/assets/index-BUrKnmy-.js", "/assets/ProductSliderContext-Z8CdvAmU.js", "/assets/LoadingMessage-bRJt_uvW.js", "/assets/AccountUserImage-CnoFpQuq.js", "/assets/HomeNav-CWDj5E_I.js", "/assets/MainNav-BMkHXq3s.js", "/assets/BusinessMenu-BoPGBUS3.js", "/assets/BusinessDrawer-BtxLyMOE.js"], "css": [] }, "routes/web/account/portfolio/business/videos/index": { "id": "routes/web/account/portfolio/business/videos/index", "parentId": "root", "path": "/web/account/portfolio/:business_guid/:user_guid/videos", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-CV84byoq.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-QUucBwvO.js", "/assets/AccountLayout-BU6wv3SG.js", "/assets/ContentLayout-BSjCmbyT.js", "/assets/lib-fXI4j3aJ.js", "/assets/EditVideoDialogContext-VQ328tnj.js", "/assets/NotificationContext-BINcc4pQ.js", "/assets/index-BUrKnmy-.js", "/assets/VideoSliderContext-CzprGIa_.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/LoadingMessage-bRJt_uvW.js", "/assets/AccountUserImage-CnoFpQuq.js", "/assets/HomeNav-CWDj5E_I.js", "/assets/MainNav-BMkHXq3s.js", "/assets/BusinessMenu-BoPGBUS3.js", "/assets/BusinessDrawer-BtxLyMOE.js", "/assets/OperationContext-C6xAhjBF.js", "/assets/types-DBTFAyTi.js"], "css": [] }, "routes/web/account/portfolio/business/facilities/index": { "id": "routes/web/account/portfolio/business/facilities/index", "parentId": "root", "path": "/web/account/portfolio/:business_guid/:user_guid/facilities", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-B8xO3zSB.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-QUucBwvO.js", "/assets/lib-fXI4j3aJ.js", "/assets/AccountLayout-BU6wv3SG.js", "/assets/ContentLayout-BSjCmbyT.js", "/assets/NotificationContext-BINcc4pQ.js", "/assets/OperationContext-C6xAhjBF.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/LoadingMessage-bRJt_uvW.js", "/assets/AccountUserImage-CnoFpQuq.js", "/assets/HomeNav-CWDj5E_I.js", "/assets/MainNav-BMkHXq3s.js", "/assets/index-BUrKnmy-.js", "/assets/BusinessMenu-BoPGBUS3.js", "/assets/BusinessDrawer-BtxLyMOE.js"], "css": [] }, "routes/web/account/portfolio/business/activate/index": { "id": "routes/web/account/portfolio/business/activate/index", "parentId": "root", "path": "/web/account/portfolio/:business_guid/:user_guid/activate", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-kjH8wwf3.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-QUucBwvO.js", "/assets/NotificationContext-BINcc4pQ.js", "/assets/OperationContext-C6xAhjBF.js", "/assets/lib-fXI4j3aJ.js", "/assets/AccountLayout-BU6wv3SG.js", "/assets/ContentLayout-BSjCmbyT.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/LoadingMessage-bRJt_uvW.js", "/assets/AccountUserImage-CnoFpQuq.js", "/assets/HomeNav-CWDj5E_I.js", "/assets/MainNav-BMkHXq3s.js", "/assets/index-BUrKnmy-.js", "/assets/BusinessMenu-BoPGBUS3.js", "/assets/BusinessDrawer-BtxLyMOE.js"], "css": [] }, "routes/web/account/portfolio/business/social_media/index": { "id": "routes/web/account/portfolio/business/social_media/index", "parentId": "root", "path": "/web/account/portfolio/:business_guid/:user_guid/social_media", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-DQk4DOEc.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-QUucBwvO.js", "/assets/lib-fXI4j3aJ.js", "/assets/AccountLayout-BU6wv3SG.js", "/assets/ContentLayout-BSjCmbyT.js", "/assets/OperationContext-C6xAhjBF.js", "/assets/LoadingMessage-bRJt_uvW.js", "/assets/AccountUserImage-CnoFpQuq.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/HomeNav-CWDj5E_I.js", "/assets/MainNav-BMkHXq3s.js", "/assets/index-BUrKnmy-.js", "/assets/BusinessMenu-BoPGBUS3.js", "/assets/BusinessDrawer-BtxLyMOE.js"], "css": [] }, "routes/web/account/portfolio/business/delete/index": { "id": "routes/web/account/portfolio/business/delete/index", "parentId": "root", "path": "/web/account/portfolio/:business_guid/:user_guid/delete", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-CLcGmcPT.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-QUucBwvO.js", "/assets/lib-fXI4j3aJ.js", "/assets/AccountLayout-BU6wv3SG.js", "/assets/ContentLayout-BSjCmbyT.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/zod-BgOlUoe_.js", "/assets/Button-7Woa2p3a.js", "/assets/Input-WkjcjSGn.js", "/assets/NotificationContext-BINcc4pQ.js", "/assets/types-DBTFAyTi.js", "/assets/OperationContext-C6xAhjBF.js", "/assets/LoadingMessage-bRJt_uvW.js", "/assets/AccountUserImage-CnoFpQuq.js", "/assets/HomeNav-CWDj5E_I.js", "/assets/MainNav-BMkHXq3s.js", "/assets/index-BUrKnmy-.js", "/assets/BusinessMenu-BoPGBUS3.js", "/assets/BusinessDrawer-BtxLyMOE.js", "/assets/css-CVxtJxAn.js"], "css": [] }, "routes/web/account/portfolio/business/reassign/index": { "id": "routes/web/account/portfolio/business/reassign/index", "parentId": "root", "path": "/web/account/portfolio/:business_guid/:user_guid/reassign", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-B99XHYHy.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-QUucBwvO.js", "/assets/lib-fXI4j3aJ.js", "/assets/AccountLayout-BU6wv3SG.js", "/assets/ContentLayout-BSjCmbyT.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/OperationContext-C6xAhjBF.js", "/assets/LoadingMessage-bRJt_uvW.js", "/assets/AccountUserImage-CnoFpQuq.js", "/assets/HomeNav-CWDj5E_I.js", "/assets/MainNav-BMkHXq3s.js", "/assets/index-BUrKnmy-.js", "/assets/BusinessMenu-BoPGBUS3.js", "/assets/BusinessDrawer-BtxLyMOE.js"], "css": [] }, "routes/web/account/events/index": { "id": "routes/web/account/events/index", "parentId": "root", "path": "/web/account/events", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-BfNf8l2i.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/AccountLayout-BU6wv3SG.js", "/assets/ProfileContentLayout-DDi9pYmo.js", "/assets/zod-BgOlUoe_.js", "/assets/components-QUucBwvO.js", "/assets/OperationContext-C6xAhjBF.js", "/assets/CreatePageSchema-5wPOr2lU.js", "/assets/Input-WkjcjSGn.js", "/assets/css-CVxtJxAn.js", "/assets/AccountUserImage-CnoFpQuq.js", "/assets/lib-fXI4j3aJ.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/HomeNav-CWDj5E_I.js", "/assets/MainNav-BMkHXq3s.js", "/assets/index-BUrKnmy-.js", "/assets/BusinessMenu-BoPGBUS3.js", "/assets/types-DBTFAyTi.js"], "css": ["/assets/index-DEhv-EUh.css"] }, "routes/web/landing/change_email/index": { "id": "routes/web/landing/change_email/index", "parentId": "root", "path": "/web/landing/change_email", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-D_UEXL1L.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-QUucBwvO.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/lib-fXI4j3aJ.js"], "css": [] }, "routes/web/landing/reset_password/index": { "id": "routes/web/landing/reset_password/index", "parentId": "root", "path": "/web/landing/reset_password/:guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-CYAZcLJR.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/zod-BgOlUoe_.js", "/assets/components-QUucBwvO.js", "/assets/OperationContext-C6xAhjBF.js", "/assets/AuthContext-CiHjwqvQ.js", "/assets/NotificationContext-BINcc4pQ.js", "/assets/lib-fXI4j3aJ.js", "/assets/types-DBTFAyTi.js"], "css": [] }, "routes/web/landing/complete_signup/index": { "id": "routes/web/landing/complete_signup/index", "parentId": "root", "path": "/web/landing/complete_signup/:guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-DnoBkMPs.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-QUucBwvO.js", "/assets/lib-fXI4j3aJ.js"], "css": [] }, "routes/api/user/index": { "id": "routes/api/user/index", "parentId": "root", "path": "api/user", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/user/signin": { "id": "routes/api/user/signin", "parentId": "root", "path": "api/user/signin", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/signin-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/user/verifytoken": { "id": "routes/api/user/verifytoken", "parentId": "root", "path": "api/user/verifytoken", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/verifytoken-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/user/user": { "id": "routes/api/user/user", "parentId": "root", "path": "api/user/:guid", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/user-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/user/change_password": { "id": "routes/api/user/change_password", "parentId": "root", "path": "api/user/change_password/:guid", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/change_password-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/user/reset_password_request": { "id": "routes/api/user/reset_password_request", "parentId": "root", "path": "api/user/reset_password_request", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/reset_password_request-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/user/reset_password": { "id": "routes/api/user/reset_password", "parentId": "root", "path": "api/user/reset_password/:guid", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/reset_password-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/user/activate_deactivate": { "id": "routes/api/user/activate_deactivate", "parentId": "root", "path": "api/user/activate_deactivate/:guid", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/activate_deactivate-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/user/user_profile_image": { "id": "routes/api/user/user_profile_image", "parentId": "root", "path": "api/user/user_profile_image/:guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/user_profile_image-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/user/user_profile_bg": { "id": "routes/api/user/user_profile_bg", "parentId": "root", "path": "api/user/user_profile_bg/:guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/user_profile_bg-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/user/change_email_request": { "id": "routes/api/user/change_email_request", "parentId": "root", "path": "api/user/change_email_request", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/change_email_request-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/user/change_email": { "id": "routes/api/user/change_email", "parentId": "root", "path": "api/user/change_email", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/change_email-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/user/verify_signup": { "id": "routes/api/user/verify_signup", "parentId": "root", "path": "api/user/verify_signup/:user_hash", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/verify_signup-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/index": { "id": "routes/api/listing/index", "parentId": "root", "path": "api/listing", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-DP2rzg_V.js", "imports": [], "css": [] }, "routes/api/listing/listing": { "id": "routes/api/listing/listing", "parentId": "root", "path": "api/listing/:guid_or_username", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/listing-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/search": { "id": "routes/api/listing/search", "parentId": "root", "path": "api/listing/search", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/search-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/searchlisting": { "id": "routes/api/listing/searchlisting", "parentId": "root", "path": "api/listing/searchlisting", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/searchlisting-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/featured_listing": { "id": "routes/api/listing/featured_listing", "parentId": "root", "path": "api/listing/featured_listing", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/featured_listing-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/business_facility_features": { "id": "routes/api/listing/business_facility_features", "parentId": "root", "path": "api/listing/business_facility_features/:business_guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/business_facility_features-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/listing_by_category": { "id": "routes/api/listing/listing_by_category", "parentId": "root", "path": "api/listing/listing_by_category/:category/:limit", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/listing_by_category-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/home_listing_by_category": { "id": "routes/api/listing/home_listing_by_category", "parentId": "root", "path": "api/listing/home_listing_by_category/:category/:limit", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/home_listing_by_category-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/home_latest_businesses": { "id": "routes/api/listing/home_latest_businesses", "parentId": "root", "path": "api/listing/home_latest_businesses/:limit", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/home_latest_businesses-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/business_gallery": { "id": "routes/api/listing/business_gallery", "parentId": "root", "path": "api/listing/business_gallery/:business_guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/business_gallery-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/business_profile_image": { "id": "routes/api/listing/business_profile_image", "parentId": "root", "path": "api/listing/business_profile_image/:guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/business_profile_image-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/business_profile_bg": { "id": "routes/api/listing/business_profile_bg", "parentId": "root", "path": "api/listing/business_profile_bg/:guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/business_profile_bg-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/owner/index": { "id": "routes/api/listing/owner/index", "parentId": "root", "path": "api/listing/owner", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-K6Dvbx-E.js", "imports": [], "css": [] }, "routes/api/listing/delete_business": { "id": "routes/api/listing/delete_business", "parentId": "root", "path": "api/listing/delete_business/:business_guid", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/delete_business-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/reassign_business": { "id": "routes/api/listing/reassign_business", "parentId": "root", "path": "api/listing/reassign_business", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/reassign_business-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/business_single_search": { "id": "routes/api/listing/business_single_search", "parentId": "root", "path": "api/listing/business_single_search", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/business_single_search-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/user_single_search": { "id": "routes/api/listing/user_single_search", "parentId": "root", "path": "api/listing/user_single_search", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/user_single_search-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/operating_hours": { "id": "routes/api/listing/operating_hours", "parentId": "root", "path": "api/listing/operating_hours", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/operating_hours-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/gallery": { "id": "routes/api/listing/gallery", "parentId": "root", "path": "api/listing/gallery/:business_guid/:user_guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/gallery-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/sys_facility_features/index": { "id": "routes/api/listing/sys_facility_features/index", "parentId": "root", "path": "api/listing/sys_facility_features", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-C6Kfwj0f.js", "imports": [], "css": [] }, "routes/api/listing/selected_facility_features/selected_facility_features": { "id": "routes/api/listing/selected_facility_features/selected_facility_features", "parentId": "root", "path": "api/listing/selected_facility_features/:user_guid/:business_guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/selected_facility_features-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/selected_facility_features/index": { "id": "routes/api/listing/selected_facility_features/index", "parentId": "root", "path": "api/listing/selected_facility_features", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-RnTpOC5-.js", "imports": [], "css": [] }, "routes/api/listing/sys_social_media/index": { "id": "routes/api/listing/sys_social_media/index", "parentId": "root", "path": "api/listing/sys_social_media", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-DVN7Oi2P.js", "imports": [], "css": [] }, "routes/api/listing/selected_social_media/selected_social_media": { "id": "routes/api/listing/selected_social_media/selected_social_media", "parentId": "root", "path": "api/listing/selected_social_media/:user_guid/:business_guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/selected_social_media-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/selected_social_media/index": { "id": "routes/api/listing/selected_social_media/index", "parentId": "root", "path": "api/listing/selected_social_media", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-DdXTRxfG.js", "imports": [], "css": [] }, "routes/api/listing/business_social_media": { "id": "routes/api/listing/business_social_media", "parentId": "root", "path": "api/listing/business_social_media/:business_guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/business_social_media-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/activate/activate": { "id": "routes/api/listing/activate/activate", "parentId": "root", "path": "api/listing/activate/:user_guid/:business_guid", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/activate-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/recents": { "id": "routes/api/listing/recents", "parentId": "root", "path": "api/listing/recents", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/recents-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/video_link": { "id": "routes/api/listing/video_link", "parentId": "root", "path": "api/listing/save_video_link", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/video_link-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/video_links": { "id": "routes/api/listing/video_links", "parentId": "root", "path": "api/listing/video_links/:business_guid/:user_guid", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/video_links-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/video_links_listing": { "id": "routes/api/listing/video_links_listing", "parentId": "root", "path": "api/listing/video_links/:business_guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/video_links_listing-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/products/index": { "id": "routes/api/listing/products/index", "parentId": "root", "path": "api/listing/products/:business_guid/:user_guid", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-BIjMHF-b.js", "imports": [], "css": [] }, "routes/api/rating/index": { "id": "routes/api/rating/index", "parentId": "root", "path": "api/rating", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-BQEWTaK-.js", "imports": [], "css": [] }, "routes/api/rating/rating": { "id": "routes/api/rating/rating", "parentId": "root", "path": "api/rating/:user_guid/:business_guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/rating-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/rating/business_ratings": { "id": "routes/api/rating/business_ratings", "parentId": "root", "path": "api/rating/business_ratings/:business_guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/business_ratings-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/rating/ratings_reviews": { "id": "routes/api/rating/ratings_reviews", "parentId": "root", "path": "api/rating/ratings_reviews/:business_guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/ratings_reviews-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/util/state": { "id": "routes/api/util/state", "parentId": "root", "path": "api/util/state", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/state-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/util/country": { "id": "routes/api/util/country", "parentId": "root", "path": "api/util/country", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/country-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/util/country_locale": { "id": "routes/api/util/country_locale", "parentId": "root", "path": "api/util/country_locale", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/country_locale-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/util/city": { "id": "routes/api/util/city", "parentId": "root", "path": "api/util/city", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/city-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/util/category": { "id": "routes/api/util/category", "parentId": "root", "path": "api/util/category", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/category-l0sNRNKZ.js", "imports": [], "css": [] } }, "url": "/assets/manifest-8927900a.js", "version": "8927900a" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": true, "v3_lazyRouteDiscovery": true, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_index_second_backup": {
    id: "routes/_index_second_backup",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/_index_third_backup": {
    id: "routes/_index_third_backup",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/_index_backup": {
    id: "routes/_index_backup",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/homepage": {
    id: "routes/homepage",
    parentId: "root",
    path: "homepage",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/landing": {
    id: "routes/landing",
    parentId: "root",
    path: "landing",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "routes/listing": {
    id: "routes/listing",
    parentId: "root",
    path: "listing",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route7
  },
  "routes/_404": {
    id: "routes/_404",
    parentId: "root",
    path: "*",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/web": {
    id: "routes/web",
    parentId: "root",
    path: "web",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/listing/index": {
    id: "routes/listing/index",
    parentId: "root",
    path: "/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "routes/landing/index": {
    id: "routes/landing/index",
    parentId: "root",
    path: "/landing",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "routes/web/search/index": {
    id: "routes/web/search/index",
    parentId: "root",
    path: "/web/search",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "routes/web/browse/index": {
    id: "routes/web/browse/index",
    parentId: "root",
    path: "/web/browse",
    index: void 0,
    caseSensitive: void 0,
    module: route13
  },
  "routes/web/browse/browse": {
    id: "routes/web/browse/browse",
    parentId: "root",
    path: "/web/browser",
    index: void 0,
    caseSensitive: void 0,
    module: route14
  },
  "routes/web/signin/index": {
    id: "routes/web/signin/index",
    parentId: "root",
    path: "/web/signin",
    index: void 0,
    caseSensitive: void 0,
    module: route15
  },
  "routes/web/signup/index": {
    id: "routes/web/signup/index",
    parentId: "root",
    path: "/web/signup",
    index: void 0,
    caseSensitive: void 0,
    module: route16
  },
  "routes/web/reset_password/index": {
    id: "routes/web/reset_password/index",
    parentId: "root",
    path: "/web/reset_password",
    index: void 0,
    caseSensitive: void 0,
    module: route17
  },
  "routes/web/account/index": {
    id: "routes/web/account/index",
    parentId: "root",
    path: "/web/account",
    index: void 0,
    caseSensitive: void 0,
    module: route18
  },
  "routes/web/account/profile/index": {
    id: "routes/web/account/profile/index",
    parentId: "root",
    path: "/web/account/profile",
    index: void 0,
    caseSensitive: void 0,
    module: route19
  },
  "routes/web/account/email_address/index": {
    id: "routes/web/account/email_address/index",
    parentId: "root",
    path: "/web/account/email_address",
    index: void 0,
    caseSensitive: void 0,
    module: route20
  },
  "routes/web/account/change_password/index": {
    id: "routes/web/account/change_password/index",
    parentId: "root",
    path: "/web/account/change_password",
    index: void 0,
    caseSensitive: void 0,
    module: route21
  },
  "routes/web/account/reset_password/index": {
    id: "routes/web/account/reset_password/index",
    parentId: "root",
    path: "/web/account/reset_password",
    index: void 0,
    caseSensitive: void 0,
    module: route22
  },
  "routes/web/account/deactivate_profile/index": {
    id: "routes/web/account/deactivate_profile/index",
    parentId: "root",
    path: "/web/account/deactivate_profile",
    index: void 0,
    caseSensitive: void 0,
    module: route23
  },
  "routes/web/terms/index": {
    id: "routes/web/terms/index",
    parentId: "root",
    path: "/web/terms",
    index: void 0,
    caseSensitive: void 0,
    module: route24
  },
  "routes/web/privacy/index": {
    id: "routes/web/privacy/index",
    parentId: "root",
    path: "/web/privacy",
    index: void 0,
    caseSensitive: void 0,
    module: route25
  },
  "routes/web/contact/index": {
    id: "routes/web/contact/index",
    parentId: "root",
    path: "/web/contact",
    index: void 0,
    caseSensitive: void 0,
    module: route26
  },
  "routes/web/browse/db": {
    id: "routes/web/browse/db",
    parentId: "root",
    path: "/web/db",
    index: void 0,
    caseSensitive: void 0,
    module: route27
  },
  "routes/web/account/portfolio/index": {
    id: "routes/web/account/portfolio/index",
    parentId: "root",
    path: "/web/account/portfolio",
    index: void 0,
    caseSensitive: void 0,
    module: route28
  },
  "routes/web/account/portfolio/business/index": {
    id: "routes/web/account/portfolio/business/index",
    parentId: "root",
    path: "/web/account/portfolio/:business_guid",
    index: void 0,
    caseSensitive: void 0,
    module: route29
  },
  "routes/web/account/create_business/index": {
    id: "routes/web/account/create_business/index",
    parentId: "root",
    path: "/web/account/create_business",
    index: void 0,
    caseSensitive: void 0,
    module: route30
  },
  "routes/web/account/portfolio/business/settings/index": {
    id: "routes/web/account/portfolio/business/settings/index",
    parentId: "root",
    path: "/web/account/portfolio/:business_guid/:user_guid/settings",
    index: void 0,
    caseSensitive: void 0,
    module: route31
  },
  "routes/web/account/portfolio/business/gallery/index": {
    id: "routes/web/account/portfolio/business/gallery/index",
    parentId: "root",
    path: "/web/account/portfolio/:business_guid/:user_guid/gallery",
    index: void 0,
    caseSensitive: void 0,
    module: route32
  },
  "routes/web/account/portfolio/business/products/index": {
    id: "routes/web/account/portfolio/business/products/index",
    parentId: "root",
    path: "/web/account/portfolio/:business_guid/:user_guid/products",
    index: void 0,
    caseSensitive: void 0,
    module: route33
  },
  "routes/web/account/portfolio/business/videos/index": {
    id: "routes/web/account/portfolio/business/videos/index",
    parentId: "root",
    path: "/web/account/portfolio/:business_guid/:user_guid/videos",
    index: void 0,
    caseSensitive: void 0,
    module: route34
  },
  "routes/web/account/portfolio/business/facilities/index": {
    id: "routes/web/account/portfolio/business/facilities/index",
    parentId: "root",
    path: "/web/account/portfolio/:business_guid/:user_guid/facilities",
    index: void 0,
    caseSensitive: void 0,
    module: route35
  },
  "routes/web/account/portfolio/business/activate/index": {
    id: "routes/web/account/portfolio/business/activate/index",
    parentId: "root",
    path: "/web/account/portfolio/:business_guid/:user_guid/activate",
    index: void 0,
    caseSensitive: void 0,
    module: route36
  },
  "routes/web/account/portfolio/business/social_media/index": {
    id: "routes/web/account/portfolio/business/social_media/index",
    parentId: "root",
    path: "/web/account/portfolio/:business_guid/:user_guid/social_media",
    index: void 0,
    caseSensitive: void 0,
    module: route37
  },
  "routes/web/account/portfolio/business/delete/index": {
    id: "routes/web/account/portfolio/business/delete/index",
    parentId: "root",
    path: "/web/account/portfolio/:business_guid/:user_guid/delete",
    index: void 0,
    caseSensitive: void 0,
    module: route38
  },
  "routes/web/account/portfolio/business/reassign/index": {
    id: "routes/web/account/portfolio/business/reassign/index",
    parentId: "root",
    path: "/web/account/portfolio/:business_guid/:user_guid/reassign",
    index: void 0,
    caseSensitive: void 0,
    module: route39
  },
  "routes/web/account/events/index": {
    id: "routes/web/account/events/index",
    parentId: "root",
    path: "/web/account/events",
    index: void 0,
    caseSensitive: void 0,
    module: route40
  },
  "routes/web/landing/change_email/index": {
    id: "routes/web/landing/change_email/index",
    parentId: "root",
    path: "/web/landing/change_email",
    index: void 0,
    caseSensitive: void 0,
    module: route41
  },
  "routes/web/landing/reset_password/index": {
    id: "routes/web/landing/reset_password/index",
    parentId: "root",
    path: "/web/landing/reset_password/:guid",
    index: void 0,
    caseSensitive: void 0,
    module: route42
  },
  "routes/web/landing/complete_signup/index": {
    id: "routes/web/landing/complete_signup/index",
    parentId: "root",
    path: "/web/landing/complete_signup/:guid",
    index: void 0,
    caseSensitive: void 0,
    module: route43
  },
  "routes/api/user/index": {
    id: "routes/api/user/index",
    parentId: "root",
    path: "api/user",
    index: void 0,
    caseSensitive: void 0,
    module: route44
  },
  "routes/api/user/signin": {
    id: "routes/api/user/signin",
    parentId: "root",
    path: "api/user/signin",
    index: void 0,
    caseSensitive: void 0,
    module: route45
  },
  "routes/api/user/verifytoken": {
    id: "routes/api/user/verifytoken",
    parentId: "root",
    path: "api/user/verifytoken",
    index: void 0,
    caseSensitive: void 0,
    module: route46
  },
  "routes/api/user/user": {
    id: "routes/api/user/user",
    parentId: "root",
    path: "api/user/:guid",
    index: void 0,
    caseSensitive: void 0,
    module: route47
  },
  "routes/api/user/change_password": {
    id: "routes/api/user/change_password",
    parentId: "root",
    path: "api/user/change_password/:guid",
    index: void 0,
    caseSensitive: void 0,
    module: route48
  },
  "routes/api/user/reset_password_request": {
    id: "routes/api/user/reset_password_request",
    parentId: "root",
    path: "api/user/reset_password_request",
    index: void 0,
    caseSensitive: void 0,
    module: route49
  },
  "routes/api/user/reset_password": {
    id: "routes/api/user/reset_password",
    parentId: "root",
    path: "api/user/reset_password/:guid",
    index: void 0,
    caseSensitive: void 0,
    module: route50
  },
  "routes/api/user/activate_deactivate": {
    id: "routes/api/user/activate_deactivate",
    parentId: "root",
    path: "api/user/activate_deactivate/:guid",
    index: void 0,
    caseSensitive: void 0,
    module: route51
  },
  "routes/api/user/user_profile_image": {
    id: "routes/api/user/user_profile_image",
    parentId: "root",
    path: "api/user/user_profile_image/:guid",
    index: void 0,
    caseSensitive: void 0,
    module: route52
  },
  "routes/api/user/user_profile_bg": {
    id: "routes/api/user/user_profile_bg",
    parentId: "root",
    path: "api/user/user_profile_bg/:guid",
    index: void 0,
    caseSensitive: void 0,
    module: route53
  },
  "routes/api/user/change_email_request": {
    id: "routes/api/user/change_email_request",
    parentId: "root",
    path: "api/user/change_email_request",
    index: void 0,
    caseSensitive: void 0,
    module: route54
  },
  "routes/api/user/change_email": {
    id: "routes/api/user/change_email",
    parentId: "root",
    path: "api/user/change_email",
    index: void 0,
    caseSensitive: void 0,
    module: route55
  },
  "routes/api/user/verify_signup": {
    id: "routes/api/user/verify_signup",
    parentId: "root",
    path: "api/user/verify_signup/:user_hash",
    index: void 0,
    caseSensitive: void 0,
    module: route56
  },
  "routes/api/listing/index": {
    id: "routes/api/listing/index",
    parentId: "root",
    path: "api/listing",
    index: void 0,
    caseSensitive: void 0,
    module: route57
  },
  "routes/api/listing/listing": {
    id: "routes/api/listing/listing",
    parentId: "root",
    path: "api/listing/:guid_or_username",
    index: void 0,
    caseSensitive: void 0,
    module: route58
  },
  "routes/api/listing/search": {
    id: "routes/api/listing/search",
    parentId: "root",
    path: "api/listing/search",
    index: void 0,
    caseSensitive: void 0,
    module: route59
  },
  "routes/api/listing/searchlisting": {
    id: "routes/api/listing/searchlisting",
    parentId: "root",
    path: "api/listing/searchlisting",
    index: void 0,
    caseSensitive: void 0,
    module: route60
  },
  "routes/api/listing/featured_listing": {
    id: "routes/api/listing/featured_listing",
    parentId: "root",
    path: "api/listing/featured_listing",
    index: void 0,
    caseSensitive: void 0,
    module: route61
  },
  "routes/api/listing/business_facility_features": {
    id: "routes/api/listing/business_facility_features",
    parentId: "root",
    path: "api/listing/business_facility_features/:business_guid",
    index: void 0,
    caseSensitive: void 0,
    module: route62
  },
  "routes/api/listing/listing_by_category": {
    id: "routes/api/listing/listing_by_category",
    parentId: "root",
    path: "api/listing/listing_by_category/:category/:limit",
    index: void 0,
    caseSensitive: void 0,
    module: route63
  },
  "routes/api/listing/home_listing_by_category": {
    id: "routes/api/listing/home_listing_by_category",
    parentId: "root",
    path: "api/listing/home_listing_by_category/:category/:limit",
    index: void 0,
    caseSensitive: void 0,
    module: route64
  },
  "routes/api/listing/home_latest_businesses": {
    id: "routes/api/listing/home_latest_businesses",
    parentId: "root",
    path: "api/listing/home_latest_businesses/:limit",
    index: void 0,
    caseSensitive: void 0,
    module: route65
  },
  "routes/api/listing/business_gallery": {
    id: "routes/api/listing/business_gallery",
    parentId: "root",
    path: "api/listing/business_gallery/:business_guid",
    index: void 0,
    caseSensitive: void 0,
    module: route66
  },
  "routes/api/listing/business_profile_image": {
    id: "routes/api/listing/business_profile_image",
    parentId: "root",
    path: "api/listing/business_profile_image/:guid",
    index: void 0,
    caseSensitive: void 0,
    module: route67
  },
  "routes/api/listing/business_profile_bg": {
    id: "routes/api/listing/business_profile_bg",
    parentId: "root",
    path: "api/listing/business_profile_bg/:guid",
    index: void 0,
    caseSensitive: void 0,
    module: route68
  },
  "routes/api/listing/owner/index": {
    id: "routes/api/listing/owner/index",
    parentId: "root",
    path: "api/listing/owner",
    index: void 0,
    caseSensitive: void 0,
    module: route69
  },
  "routes/api/listing/delete_business": {
    id: "routes/api/listing/delete_business",
    parentId: "root",
    path: "api/listing/delete_business/:business_guid",
    index: void 0,
    caseSensitive: void 0,
    module: route70
  },
  "routes/api/listing/reassign_business": {
    id: "routes/api/listing/reassign_business",
    parentId: "root",
    path: "api/listing/reassign_business",
    index: void 0,
    caseSensitive: void 0,
    module: route71
  },
  "routes/api/listing/business_single_search": {
    id: "routes/api/listing/business_single_search",
    parentId: "root",
    path: "api/listing/business_single_search",
    index: void 0,
    caseSensitive: void 0,
    module: route72
  },
  "routes/api/listing/user_single_search": {
    id: "routes/api/listing/user_single_search",
    parentId: "root",
    path: "api/listing/user_single_search",
    index: void 0,
    caseSensitive: void 0,
    module: route73
  },
  "routes/api/listing/operating_hours": {
    id: "routes/api/listing/operating_hours",
    parentId: "root",
    path: "api/listing/operating_hours",
    index: void 0,
    caseSensitive: void 0,
    module: route74
  },
  "routes/api/listing/gallery": {
    id: "routes/api/listing/gallery",
    parentId: "root",
    path: "api/listing/gallery/:business_guid/:user_guid",
    index: void 0,
    caseSensitive: void 0,
    module: route75
  },
  "routes/api/listing/sys_facility_features/index": {
    id: "routes/api/listing/sys_facility_features/index",
    parentId: "root",
    path: "api/listing/sys_facility_features",
    index: void 0,
    caseSensitive: void 0,
    module: route76
  },
  "routes/api/listing/selected_facility_features/selected_facility_features": {
    id: "routes/api/listing/selected_facility_features/selected_facility_features",
    parentId: "root",
    path: "api/listing/selected_facility_features/:user_guid/:business_guid",
    index: void 0,
    caseSensitive: void 0,
    module: route77
  },
  "routes/api/listing/selected_facility_features/index": {
    id: "routes/api/listing/selected_facility_features/index",
    parentId: "root",
    path: "api/listing/selected_facility_features",
    index: void 0,
    caseSensitive: void 0,
    module: route78
  },
  "routes/api/listing/sys_social_media/index": {
    id: "routes/api/listing/sys_social_media/index",
    parentId: "root",
    path: "api/listing/sys_social_media",
    index: void 0,
    caseSensitive: void 0,
    module: route79
  },
  "routes/api/listing/selected_social_media/selected_social_media": {
    id: "routes/api/listing/selected_social_media/selected_social_media",
    parentId: "root",
    path: "api/listing/selected_social_media/:user_guid/:business_guid",
    index: void 0,
    caseSensitive: void 0,
    module: route80
  },
  "routes/api/listing/selected_social_media/index": {
    id: "routes/api/listing/selected_social_media/index",
    parentId: "root",
    path: "api/listing/selected_social_media",
    index: void 0,
    caseSensitive: void 0,
    module: route81
  },
  "routes/api/listing/business_social_media": {
    id: "routes/api/listing/business_social_media",
    parentId: "root",
    path: "api/listing/business_social_media/:business_guid",
    index: void 0,
    caseSensitive: void 0,
    module: route82
  },
  "routes/api/listing/activate/activate": {
    id: "routes/api/listing/activate/activate",
    parentId: "root",
    path: "api/listing/activate/:user_guid/:business_guid",
    index: void 0,
    caseSensitive: void 0,
    module: route83
  },
  "routes/api/listing/recents": {
    id: "routes/api/listing/recents",
    parentId: "root",
    path: "api/listing/recents",
    index: void 0,
    caseSensitive: void 0,
    module: route84
  },
  "routes/api/listing/video_link": {
    id: "routes/api/listing/video_link",
    parentId: "root",
    path: "api/listing/save_video_link",
    index: void 0,
    caseSensitive: void 0,
    module: route85
  },
  "routes/api/listing/video_links": {
    id: "routes/api/listing/video_links",
    parentId: "root",
    path: "api/listing/video_links/:business_guid/:user_guid",
    index: void 0,
    caseSensitive: void 0,
    module: route86
  },
  "routes/api/listing/video_links_listing": {
    id: "routes/api/listing/video_links_listing",
    parentId: "root",
    path: "api/listing/video_links/:business_guid",
    index: void 0,
    caseSensitive: void 0,
    module: route87
  },
  "routes/api/listing/products/index": {
    id: "routes/api/listing/products/index",
    parentId: "root",
    path: "api/listing/products/:business_guid/:user_guid",
    index: void 0,
    caseSensitive: void 0,
    module: route88
  },
  "routes/api/rating/index": {
    id: "routes/api/rating/index",
    parentId: "root",
    path: "api/rating",
    index: void 0,
    caseSensitive: void 0,
    module: route89
  },
  "routes/api/rating/rating": {
    id: "routes/api/rating/rating",
    parentId: "root",
    path: "api/rating/:user_guid/:business_guid",
    index: void 0,
    caseSensitive: void 0,
    module: route90
  },
  "routes/api/rating/business_ratings": {
    id: "routes/api/rating/business_ratings",
    parentId: "root",
    path: "api/rating/business_ratings/:business_guid",
    index: void 0,
    caseSensitive: void 0,
    module: route91
  },
  "routes/api/rating/ratings_reviews": {
    id: "routes/api/rating/ratings_reviews",
    parentId: "root",
    path: "api/rating/ratings_reviews/:business_guid",
    index: void 0,
    caseSensitive: void 0,
    module: route92
  },
  "routes/api/util/state": {
    id: "routes/api/util/state",
    parentId: "root",
    path: "api/util/state",
    index: void 0,
    caseSensitive: void 0,
    module: route93
  },
  "routes/api/util/country": {
    id: "routes/api/util/country",
    parentId: "root",
    path: "api/util/country",
    index: void 0,
    caseSensitive: void 0,
    module: route94
  },
  "routes/api/util/country_locale": {
    id: "routes/api/util/country_locale",
    parentId: "root",
    path: "api/util/country_locale",
    index: void 0,
    caseSensitive: void 0,
    module: route95
  },
  "routes/api/util/city": {
    id: "routes/api/util/city",
    parentId: "root",
    path: "api/util/city",
    index: void 0,
    caseSensitive: void 0,
    module: route96
  },
  "routes/api/util/category": {
    id: "routes/api/util/category",
    parentId: "root",
    path: "api/util/category",
    index: void 0,
    caseSensitive: void 0,
    module: route97
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};

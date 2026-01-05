import { Link } from "@remix-run/react";
import { createContext, useContext, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { CgClose } from "react-icons/cg";

interface ReadMoreType {
    setDescription: (description: string) => void
    setShow: (show: boolean) => void
    setTitle: (title: string) => void
    setUrl: (title: string) => void
}
const ReadMoreWithUrlContext = createContext<ReadMoreType | null>(null)

export const useReadMoreWithUrlContext = () => {
    const ctx = useContext(ReadMoreWithUrlContext)
    if (ctx) return ctx
    return null
}

export const ReadMoreWithUrlProvider = ({ children }: any) => {
    const [show, setShow] = useState(false)
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')

    let vals = {
        setDescription,
        setShow,
        setTitle,
        setUrl
    }
    return (
        <ReadMoreWithUrlContext.Provider value={vals}>
            <div>
                {
                    show &&
                    <div className={`fixed top-0 left-0 w-full right-0 bg-black/40 z-[4000] h-full flex place-items-center place-content-center`}
                        onClick={() => setShow(false)}
                    >
                        <CloseButton setShow={setShow} />

                        <div className={`max-w-[660px] min-h-[50%] max-h-[80%]  mx-auto w-full bg-white rounded-[40px] px-[32px] pt-12 pb-20 relative`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className={`absolute top-8 right-8 text-3xl border-[2px] rounded-xl border-gray-500/20 w-[40px] h-[40px] shadow-sm flex place-items-center place-content-center text-gray-500 cursor-pointer hover:bg-gray-100 hover:border-gray-200/50`}
                                onClick={() => setShow(false)}
                            >
                                <CgClose />
                            </div>
                            <div className={`text-3xl`}>
                                Service Description
                            </div>

                            <div className={`text-xl mt-6 line-clamp-1`}>
                                {title}
                            </div>

                            <div className={` whitespace-pre-wrap mt-6 max-h-[280px] overflow-y-auto`}>
                                {description}
                                <div className={`h-[30px]`} />
                                {
                                    url ?
                                        <div>
                                            <Link to={url}
                                                className={`underline`}>
                                                Service Link
                                            </Link>
                                            <div className={`h-[60px]`} />
                                        </div> :
                                        <div className={`h-[30px]`} />
                                }
                            </div>


                        </div>
                    </div>

                }
            </div>
            {children}
        </ReadMoreWithUrlContext.Provider>
    )
}
export default ReadMoreWithUrlContext

export interface CloseButtonProps {
    setShow: (show: boolean) => void
}
export const CloseButton = ({ setShow }: CloseButtonProps) => {
    return (
        <div onClick={() => setShow(false)}>
            <div className={`w-[30px] h-[30px] flex place-items-center place-content-center rounded-full absolute top-2 left-2 bg-white text-[25px] font-bold transition-all ease-in-out duration-700 cursor-pointer hover:bg-white/40`}>
                <BiChevronLeft />
            </div>
        </div>
    )
}
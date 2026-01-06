import { createContext, useContext, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { CgClose } from "react-icons/cg";

interface ReadMoreType {
    setDescription: (description: any) => void
    setShow: (show: boolean) => void
    setTitle: (title: string) => void
}
const ReadMoreAboutContext = createContext<ReadMoreType | null>(null)

export const useReadMoreContext = () => {
    const ctx = useContext(ReadMoreAboutContext)
    if (ctx) return ctx
    return null
}

export const ReadMoreAboutProvider = ({ children }: any) => {
    const [show, setShow] = useState(false)
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')


    let vals = {
        setDescription,
        setShow,
        setTitle
    }
    return (
        <ReadMoreAboutContext.Provider value={vals}>
            <div>
                {
                    show &&
                    <div className={`fixed top-0 left-0 w-full right-0 bg-black/40 z-[4000] h-full flex place-items-center place-content-center`}
                        onClick={() => setShow(false)}
                    >
                        <CloseButton setShow={setShow} />

                        <div className={`max-w-[660px] min-h-[50%] max-h-[80%]  mx-auto w-full bg-white rounded-[40px] px-[32px] py-16 relative`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className={`absolute top-8 right-8 text-3xl border-[2px] rounded-xl border-gray-500/20 w-[40px] h-[40px] shadow-sm flex place-items-center place-content-center text-gray-500 cursor-pointer hover:bg-gray-100 hover:border-gray-200/50`}
                                onClick={() => setShow(false)}
                            >
                                <CgClose />
                            </div>
                            <div className={`text-2xl`}>
                                {title}
                            </div>

                            <div className={` whitespace-pre-wrap mt-6 max-h-[300px] overflow-y-auto`}>
                                {description}
                                <div className={`h-[60px]`} />
                            </div>


                        </div>
                    </div>

                }
            </div>
            {children}
        </ReadMoreAboutContext.Provider>
    )
}
export default ReadMoreAboutContext

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
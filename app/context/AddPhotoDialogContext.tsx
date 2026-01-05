import { createContext, useContext, useState } from "react";
import { useNotification } from "./NotificationContext";
import { useOperation } from "./OperationContext";
import { CgClose } from "react-icons/cg";

const AddPhotoDialogContext = createContext<any | null>(null)

export function useAddPhotoDialogContext() {
    const context = useContext(AddPhotoDialogContext)
    /* if (!context) {
        throw new Error("useAddPhotoDialogContext must be used within an AuthProvider")
    } */
    return context
}

export function AddPhotoDialogProvider({ children }: any) {
    const [working, setWorking] = useState<any>(false)
    const [dialog, setDialog] = useState<any>(false)
    const [imgSrc, setImgSrc] = useState<any>(null)
    const [userGuid, setUserGuid] = useState<any>(null)
    const [businessGuid, setBusinessGuid] = useState<any>(null)
    const [isImgSelected, setIsImageSelected] = useState<any>(false)
    const [selectedFile, setSelectedFile] = useState<any>(null)
    const notification = useNotification()

    const { showOperation, showError, completeOperation, showSuccess } = useOperation()

    const handleCloseDialog = () => {
        setDialog(false)
        setImgSrc(null)
    }

    const handleUpload = async () => {
        setWorking(true)
        //await new Promise((resolve) => setTimeout(resolve, 1000));

        let imageTitle = document.getElementById("image_title") as HTMLInputElement

        if (isImgSelected) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('guid', userGuid)
            formData.append('bid', businessGuid)
            formData.append('image_title', imageTitle.value)

            //notification.notify()
            showOperation('processing', 'Saving picture')
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL
            const endpoint = "/business_gallery_pic_upload"
            const url = IMG_BASE_URL + endpoint


            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "*"
                    },
                    body: (formData)
                })

                if (!response.ok) {
                    let error = response.json().then((data) => {
                        //notification.alert('', data.message)
                        showError('Error', `${data.message}`)
                        completeOperation()
                    })

                } else {
                    //notification.alertReload('', 'Image uploaded successfully!')
                    try {
                        showSuccess('Success', 'Picture saved.')
                        completeOperation()
                    } finally {
                        window.location.reload()
                    }

                }

            } catch (error) {
                return undefined
            } finally {
                setWorking(false)
            }
        } else {
            showError('Error', 'Please select an image to continue.')
            setWorking(false)
        }
    }

    let vals = {
        dialog, setDialog,
        imgSrc, setImgSrc,
        handleCloseDialog,
        userGuid, setUserGuid,
        businessGuid, setBusinessGuid,
        isImgSelected, setIsImageSelected,
        selectedFile, setSelectedFile
    }


    return (
        <AddPhotoDialogContext.Provider value={vals}>
            {
                dialog &&
                <div

                    className={`flex w-screen h-screen z-[3000] 
                fixed top-0 left-0 right-0 bottom-0 bg-black/30
                place-content-center place-items-center`}>

                    <div className={`relative max-w-[600px] mx-2 w-full h-fit bg-white 
                        rounded-[40px] overflow-hidden z-[3000]`}
                        onClick={(event) => {
                            event.preventDefault()
                        }}
                    >
                        <CloseButton
                            setShow={handleCloseDialog}
                        />
                        <div className={`pt-12 pb-5 px-3 text-2xl font-semibold`}>
                            Add Photo
                        </div>
                        <div className={`relative w-full h-[300px] bg-gray-200`}>
                            <img
                                src={imgSrc}
                                alt=""
                                className={`object-scale-down w-full h-full`}
                            />
                        </div>

                        { /** description */}
                        <div>
                            <textarea
                                id='image_title'
                                placeholder={`Enter picture description.`}
                                className={`w-full bg-gray-100 px-3  h-[60px] py-3`}
                            ></textarea>
                        </div>

                        <div className={`flex place-content-between place-items-center`}>
                            <div className={`px-3 text-2xl`}>

                            </div>
                            <div className={`flex place-content-end px-6 gap-x-2 py-6`}>
                                <button
                                    onMouseDown={() => handleCloseDialog()}
                                    className={`bg-gray-800 text-white px-3 py-1.5 rounded-md
                                    shadow-md `}
                                >
                                    Close
                                </button>

                                <button
                                    onClick={() => handleUpload()}
                                    className={`bg-blue-800 text-white px-3 py-1.5 rounded-md
                                    shadow-md `}
                                >
                                    {
                                        working ? 'Working...' : 'Submit'
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {children}
        </AddPhotoDialogContext.Provider>
    )
}


export interface CloseButtonProps {
    setShow: () => void
}
export const CloseButton = ({ setShow }: CloseButtonProps) => {
    return (
        <div className={`absolute top-8 right-6 text-3xl  rounded-xl  w-[40px] h-[40px] shadow-sm flex place-items-center place-content-center cursor-pointer bg-gray-200/70 hover:border-gray-200/50 text-gray-400 hover:text-gray-500 z-10`}
            onClick={() => setShow()}
        >
            <CgClose />
        </div>
    )
}
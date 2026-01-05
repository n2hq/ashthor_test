import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { config, headers } from "~/lib/lib";
import { useNotification } from "./NotificationContext";
import { useOperation } from "./OperationContext";
import { CgClose } from "react-icons/cg";
import { CountryType } from "~/lib/types";
import CountryCurrencyInput from "~/components/content/input/CountryCurrencyInput";


const AddProductDialogContext = createContext<any | null>(null)

export function useAddProductDialogContext() {
    const context = useContext(AddProductDialogContext)
    /* if (!context) {
        throw new Error("useEditPhotoDialogContext must be used within an EditPhotoDialogProvider")
    } */
    return context
}

export function AddProductDialogProvider({ children }: any) {

    const [working, setWorking] = useState<any>(false)
    const [dialog, setDialog] = useState<any>(false)
    const [imgSrc, setImgSrc] = useState<any>(null)
    const [userGuid, setUserGuid] = useState<any>(null)
    const [businessGuid, setBusinessGuid] = useState<any>(null)
    const [isImgSelected, setIsImageSelected] = useState<any>(false)
    const [selectedFile, setSelectedFile] = useState<any>(null)
    const [productTitle, setProductTitle] = useState<any>(null)
    const [productLink, setProductLink] = useState<any>(null)
    const [productDescription, setProductDescription] = useState<any>(null)
    const [fullView, setFullView] = useState(true)
    const [productAmount, setProductAmount] = useState<any>(null)
    const [countryCurrency, setCountryCurrency] = useState<any>(null)
    const [selectedCountry, setSelectedCountry] = useState<CountryType | undefined>(undefined)
    const [productCurrencyId, setProductCurrencyId] = useState('')

    const [formData, setFormdata] = useState<any | null>(null)

    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const notification = useNotification()

    const { showOperation, showError, completeOperation, showSuccess } = useOperation()


    useEffect(() => {
        if (selectedCountry) {
            setProductCurrencyId(selectedCountry.id)
        }
    }, [selectedCountry, productCurrencyId])

    const handleCloseDialog = () => {
        setDialog(false)
        setImgSrc(null)
        setWorking(false)
    }

    const handleImageClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setImgSrc(imageUrl)
            setSelectedFile(file)
            setIsImageSelected(true)
        }
    }

    const handleAdd = async () => {
        //notification.notify()
        showOperation('processing')
        setWorking(true)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        let productTitle = document.getElementById("product_title") as HTMLInputElement
        let productDescription = document.getElementById("product_description") as HTMLInputElement
        let productLink = document.getElementById("product_link") as HTMLInputElement


        const formData = new FormData();

        if (isImgSelected) {

            formData.append('file', selectedFile);
        }

        formData.append('guid', userGuid)
        formData.append('bid', businessGuid)
        formData.append('product_title', productTitle.value || "")
        formData.append('product_description', productDescription.value || "")
        formData.append('product_link', productLink.value || "")
        formData.append('product_amount', productAmount)
        const countryId: string = productCurrencyId || "840"
        formData.append('product_currency_country_id', countryId)

        //const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL
        const endpoint = "/business_gallery_product_upload"
        const url = config.IMG_BASE_URL + endpoint


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
                    console.log(data.message)
                    showError('Error', `Failed to add product: ${data.message}`)
                    completeOperation()
                })

            } else {
                ///notification.alert('Product Saved', 'Product saved successfully!')
                try {
                    showSuccess('Success', `Product saved.`)
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

    }

    const deleteProduct = async (userGuid: string, businessGuid: string, imageGuid: string) => {
        const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL
        const endpoint = `/delete_business_gallery_pic`
        const url = IMG_BASE_URL + endpoint

        const data = {
            guid: userGuid,
            bid: businessGuid,
            image_guid: imageGuid
        }

        setWorking(true)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                let error = response.json().then((data) => {
                    notification.alert(data.message)
                })

            } else {
                notification.alertReload('', 'Image deleted successfully!')
            }

        } catch (error: any) {
            return alert(error.message)
        } finally {
            setWorking(false)

        }
    }

    const handlePriceKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Allow: backspace, delete, tab, escape, enter, decimal point, numbers
        if (
            [46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
            // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
            (e.keyCode === 65 && e.ctrlKey === true) ||
            (e.keyCode === 67 && e.ctrlKey === true) ||
            (e.keyCode === 86 && e.ctrlKey === true) ||
            (e.keyCode === 88 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)
        ) {
            return;
        }

        // Ensure that it is a number and stop the keypress if not
        if (
            (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
            (e.keyCode < 96 || e.keyCode > 105)
        ) {
            e.preventDefault();
        }
    };


    const handlePriceChangeFormatted = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        // Remove all non-numeric characters except dot
        value = value.replace(/[^\d.]/g, '');

        // Ensure only one dot
        const parts = value.split('.');
        if (parts.length > 2) {
            value = parts[0] + '.' + parts.slice(1).join('');
        }

        // Limit to 2 decimal places
        if (parts.length > 1) {
            value = parts[0] + '.' + parts[1].slice(0, 2);
        }

        setProductAmount(value);
    };


    let vals = {
        dialog, setDialog,
        handleCloseDialog,
        imgSrc, setImgSrc,
        userGuid, setUserGuid,
        businessGuid, setBusinessGuid,
        isImgSelected, setIsImageSelected,
        selectedFile, setSelectedFile,
        productTitle, setProductTitle,
        productDescription, setProductDescription,
        productLink, setProductLink,
        deleteProduct
    }

    return (
        <AddProductDialogContext.Provider value={vals}>
            {
                dialog &&
                <div
                    onMouseDown={(e) => setDialog(false)}
                    className={`fixed flex w-screen h-screen z-[3100] 
                 top-0 left-0 right-0 bottom-0 bg-black/30
                place-content-center place-items-center`}

                >
                    <div className={`relative max-w-[600px] w-full h-fit bg-white mx-2
                        rounded-[40px] overflow-hidden z-[3100] `}
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        <CloseButton setShow={setDialog} />
                        <div className={`pt-12 pb-6 px-6 flex place-items-baseline place-content-between gap-3`}>
                            <div className={`text-2xl font-semibold w-full `}>
                                Add Product
                            </div>
                            <div className={` relative w-full`}>
                                <div className={`w-[70%] flex place-content-end hover:underline relative`}>
                                    {
                                        !fullView ?
                                            (
                                                selectedFile && <PictureLabel
                                                    title={'Normal View'}
                                                    setFullView={setFullView}
                                                    fullView={true}
                                                />
                                            ) :
                                            <PictureLabel
                                                title={'Full View'}
                                                setFullView={setFullView}
                                                fullView={false}
                                            />
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={`w-full h-[400px] overflow-y-auto`}>
                            <div className={`relative w-full h-[300px] bg-gray-300`}>
                                <img
                                    src={imgSrc}
                                    alt=""
                                    className={`${fullView ? 'object-scale-down' : 'object-cover'} w-full h-full`}
                                />
                                <input type="file"
                                    accept='image/*'
                                    ref={fileInputRef}
                                    className='hidden'
                                    onChange={handleFileChange}
                                />

                                <div
                                    className={`flex place-content-center place-items-center
                                        bg-black/10 w-full h-full absolute z-0 top-0 object-cover
                                        text-white/80 `}
                                    onMouseDown={handleImageClick}
                                >
                                    <div className={`w-[60px] h-[60px] flex flex-col
                                        place-content-center place-items-center bg-black/50
                                        hover:cursor-pointer hover:bg-white/50
                                        rounded-full transition duration-300 ease-in-out`}>
                                        <MdEditSquare className=' text-[30px]' />
                                    </div>
                                </div>
                            </div>

                            <div className={`h-fit space-y-1`}>
                                <div className={`flex mb-1 flex-col mx-6 `}>
                                    <div className={`text-[15px] pt-3 pb-1 text-gray-500`}>
                                        Enter product title
                                    </div>
                                    <input
                                        onChange={(e) => setProductTitle(e.target.value)}
                                        id='product_title'
                                        value={productTitle || ""}
                                        placeholder={`Enter product title.`}
                                        className={`w-full border-[1px] border-gray-300 bg-gray-100 px-3 py-4 outline-none rounded-lg text-xl`}
                                    />
                                </div>

                                <div className={`flex mb-1 flex-col mx-6 `}>
                                    <div className={`text-[15px] pt-3 pb-1 text-gray-500`}>Enter product description</div>
                                    <textarea
                                        onChange={(e) => setProductDescription(e.target.value)}
                                        id='product_description'
                                        value={productDescription || ""}
                                        placeholder={`Enter product description.`}
                                        className={`w-full border-[1px] border-gray-300 bg-gray-100 px-3 py-4 outline-none rounded-lg text-xl`}
                                    />
                                </div>


                                <div className={`flex mb-1 flex-col mx-6 `}>
                                    <div className={`text-[14px] pt-3 pb-1 text-gray-500`}>Enter product link</div>
                                    <input
                                        onChange={(e) => setProductLink(e.target.value)}
                                        id='product_link'
                                        value={productLink || ""}
                                        placeholder={`Enter product link.`}
                                        className={`w-full border-[1px] border-gray-300 bg-gray-100 px-3 py-4 outline-none rounded-lg`}
                                    />
                                </div>


                                <div className={`flex mb-1 flex-col mx-6 `}>

                                    <div className={`text-[15px] pt-3 pb-1 text-gray-500`}>
                                        Currency
                                    </div>

                                    <div className={``}>
                                        <CountryCurrencyInput
                                            countryCurrency={countryCurrency}
                                            setCountryCurrency={setCountryCurrency}
                                            setSelectedCountry={setSelectedCountry}
                                            selectedCountry={selectedCountry}
                                        />

                                    </div>
                                </div>


                                <div className={`flex mb-1 flex-col mx-6 `}>

                                    <div className={`text-[15px] pt-3 pb-1 text-gray-500`}>
                                        Amount
                                    </div>

                                    <div className={``}>

                                        <input
                                            onKeyDown={handlePriceKeyDown}
                                            onChange={handlePriceChangeFormatted}
                                            id='product_amount'
                                            value={productAmount || ""}
                                            placeholder={`Enter Amount. E.g.: 500.00`}
                                            className={`w-full bg-gray-100 px-3  py-3 mb-1 rounded-lg border-[1px] border-gray-300`}
                                        />
                                    </div>
                                </div>



                                <div className={`flex place-content-end mx-6 gap-2 pt-4 pb-8`}>
                                    <button
                                        onMouseDown={() => handleCloseDialog()}
                                        className={`bg-gray-800 text-white px-3 py-1.5 rounded-md
                                    shadow-md `}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={() => handleAdd()}
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
                </div>
            }
            {children}
        </AddProductDialogContext.Provider>
    )
}


export interface CloseButtonProps {
    setShow: (show: boolean) => void
}
export const CloseButton = ({ setShow }: CloseButtonProps) => {
    return (
        <div className={`absolute top-8 right-6 text-3xl  rounded-xl  w-[40px] h-[40px] shadow-sm flex place-items-center place-content-center cursor-pointer bg-gray-200/70 hover:border-gray-200/50 text-gray-400 hover:text-gray-500 z-10`}
            onClick={() => setShow(false)}
        >
            <CgClose />
        </div>
    )
}

export interface PictureProps {
    title: string
    setFullView: (fullView: boolean) => void
    fullView: boolean
}
export const PictureLabel = ({ title, setFullView, fullView }: PictureProps) => {
    return (
        <div className={`cursor-pointer text-lg underline`}
            onClick={() => setFullView(fullView)}
        >
            {title}
        </div>
    )
}
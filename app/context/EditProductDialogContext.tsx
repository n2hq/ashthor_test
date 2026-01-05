import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { filterCountry, getCountriesCurrencies, headers } from "~/lib/lib";
import { useNotification } from "./NotificationContext";
import { useOperation } from "./OperationContext";
import { BiChevronLeft } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import CountryCurrencyInput from "~/components/content/input/CountryCurrencyInput";
import { CountryType } from "~/lib/types";


const EditProductDialogContext = createContext<any | null>(null)

export function useEditProductDialogContext() {
    const context = useContext(EditProductDialogContext)
    if (context) {
        return context
    }
    /* if (!context) {
        throw new Error("useEditPhotoDialogContext must be used within an EditPhotoDialogProvider")
    } */
    return null
}

export function EditProductDialogProvider({ children }: any) {

    const [working, setWorking] = useState<any>(false)
    const [dialog, setDialog] = useState<any>(false)
    const [imgSrc, setImgSrc] = useState<any>(null)
    const [userGuid, setUserGuid] = useState<any>(null)
    const [businessGuid, setBusinessGuid] = useState<any>(null)
    const [isImgSelected, setIsImageSelected] = useState<any>(false)
    const [selectedFile, setSelectedFile] = useState<any>(null)
    const [productTitle, setProductTitle] = useState<any>(null)
    const [productDescription, setProductDescription] = useState<any>(null)
    const [productLink, setProductLink] = useState<any>(null)
    const [productAmount, setProductAmount] = useState<any>(null)
    const [countryCurrency, setCountryCurrency] = useState<any>(null)
    const [selectedCountry, setSelectedCountry] = useState<CountryType | undefined>(undefined)
    const [imageGuid, setImageGuid] = useState<any>(null)
    const [productGuid, setProductGuid] = useState<string | "">("null")
    const [formData, setFormdata] = useState<any | null>(null)
    const [fullView, setFullView] = useState(true)

    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const notification = useNotification()

    const [productCurrencyId, setProductCurrencyId] = useState('')



    useEffect(() => {

        if (selectedCountry) {

            setProductCurrencyId(selectedCountry.id)
        }


    }, [selectedCountry, productCurrencyId])


    const { showOperation, showError, completeOperation, showSuccess } = useOperation()


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

    const handleUpdate = async () => {
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
        formData.append('product_title', productTitle.value)
        formData.append('product_description', productDescription.value)
        formData.append('product_link', productLink.value)
        formData.append('product_guid', productGuid)
        formData.append('product_amount', productAmount)
        const countryId: string = productCurrencyId || "840" //use United States if selected country is null
        formData.append('product_currency_country_id', countryId)

        const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL
        const endpoint = "/business_gallery_product_update"
        const url = IMG_BASE_URL + endpoint

        console.log(Object.fromEntries(formData.entries()));
        //return false

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
                    console.log(data.message)
                    showError('Error', 'Update failed')
                    completeOperation()
                    //notification.alert('', data.message)
                })

            } else {
                //notification.alert('Product Update', 'Product updated successfully!')
                showSuccess('Success', 'Product saved.')
                completeOperation()
            }

        } catch (error) {
            return undefined
        } finally {
            setWorking(false)

        }

    }

    const deleteProduct = async (userGuid: string, businessGuid: string, productGuid: string) => {
        const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL
        const endpoint = `/delete_business_product`
        const url = IMG_BASE_URL + endpoint

        const data = {
            guid: userGuid,
            bid: businessGuid,
            product_guid: productGuid
        }

        showOperation('processing')
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
                    //notification.alert(data.message)
                    console.log(data)
                    showError('Error', `Delete failed.`)
                    completeOperation()
                })

            } else {
                try {
                    showSuccess('Success', 'Product deleted.')
                    completeOperation()
                    await new Promise((resolve) => setTimeout(resolve, 500));
                } finally {
                    window.location.reload()
                }

                //notification.alertReload('', 'Image deleted successfully!')
            }

        } catch (error: any) {
            showError('Error', 'Product delete failed.')
            console.log(error.message)
            //return alert(error.message)
        } finally {
            setWorking(false)

        }
    }


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
        productGuid, setProductGuid,
        deleteProduct, setSelectedCountry,
        setProductCurrencyId, setProductAmount
    }

    return (
        <EditProductDialogContext.Provider value={vals}>
            {
                dialog &&
                <div
                    className={`fixed w-screen h-screen bg-black/30 z-[3000]`}>

                    <div className={`fixed flex w-screen h-screen z-[3000] 
                 top-0 left-0 right-0 bottom-0 bg-black/30
                place-content-center place-items-center`}>

                        <div className={`relative max-w-[600px] w-full h-fit bg-white 
                        rounded-[40px] overflow-hidden z-[3100] mx-2 `}>
                            <CloseButton setShow={setDialog} />
                            <div className={`pt-12 pb-6 px-6 flex place-items-baseline place-content-between gap-3`}>
                                <div className={`text-2xl font-semibold w-full `}>
                                    Edit Product
                                </div>
                                <div className={` relative w-full`}>
                                    <div className={`w-[70%] flex place-content-end hover:underline relative`}>
                                        {
                                            !fullView ?
                                                <PictureLabel
                                                    title={'Normal View'}
                                                    setFullView={setFullView}
                                                    fullView={true}
                                                /> :
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
                                <div className={`relative w-full h-[300px] bg-white`}>
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
                                        place-content-center place-items-center bg-white/50
                                        hover:cursor-pointer hover:bg-white/50
                                        rounded-full transition duration-300 ease-in-out`}>
                                            <MdEditSquare className=' text-[30px]' />
                                        </div>
                                    </div>
                                </div>

                                <div className={`h-fit space-y-1`}>
                                    <div className={`flex mb-1 flex-col mx-6 `}>
                                        <CloseButton setShow={setDialog} />
                                        <div className={`text-[15px] pt-3 pb-1 text-gray-500`}>
                                            Product title
                                        </div>
                                        <input
                                            onChange={(e) => setProductTitle(e.target.value)}
                                            id='product_title'
                                            value={productTitle || ""}
                                            placeholder={`Enter product title.`}
                                            className={`w-full bg-gray-100 px-3  py-3 mb-1 rounded-lg border-[1px] border-gray-300`}
                                        />
                                    </div>


                                    <div className={`flex mb-1 flex-col mx-6 `}>
                                        <div className={`text-[15px] pt-3 pb-1 text-gray-500`}>Description</div>
                                        <textarea
                                            onChange={(e) => setProductDescription(e.target.value)}
                                            id='product_description'
                                            value={productDescription || ""}
                                            placeholder={`Enter product description.`}
                                            className={`w-full bg-gray-100 px-3  h-[60px] py-3 rounded-lg border-[1px] border-gray-300`}
                                        ></textarea>
                                    </div>


                                    <div className={`flex mb-1 flex-col mx-6 `}>
                                        <div className={`text-[14px] pt-3 pb-1 text-gray-500`}>Product link</div>
                                        <input
                                            onChange={(e) => setProductLink(e.target.value)}
                                            id='product_link'
                                            value={productLink || ""}
                                            placeholder={`Enter product link.`}
                                            className={`w-full bg-gray-100 px-3 py-3 rounded-lg border-[1px] border-gray-300 `}
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


                                    <div className={`flex place-content-end mx-6 gap-2 pt-4 pb-6`}>
                                        <button
                                            onMouseDown={() => window.location.reload()}
                                            className={`bg-gray-800 text-white px-3 py-1.5 rounded-md
                                    shadow-md`}
                                        >
                                            Reload
                                        </button>

                                        <button
                                            onMouseDown={() => handleCloseDialog()}
                                            className={`bg-gray-800 text-white px-3 py-1.5 rounded-md
                                    shadow-md `}
                                        >
                                            Close
                                        </button>

                                        <button
                                            onClick={() => handleUpdate()}
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
                </div>
            }
            {children}
        </EditProductDialogContext.Provider>
    )
}


export interface CloseButtonProps {
    setShow: (show: boolean) => void
}
export const CloseButton = ({ setShow }: CloseButtonProps) => {
    return (
        <div className={`absolute top-8 right-8 text-3xl  rounded-xl  w-[40px] h-[40px] shadow-sm flex place-items-center place-content-center cursor-pointer bg-gray-200/70 hover:border-gray-200/50 text-gray-400 hover:text-gray-500`}
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
        <div className={` cursor-pointer text-lg underline`}
            onClick={() => setFullView(fullView)}
        >
            {title}
        </div>
    )
}
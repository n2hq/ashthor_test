import React, { useState } from 'react'

import { useEditPhotoDialogContext } from '~/context/EditPhotoDialogContext'
import { useEditProductDialogContext } from '~/context/EditProductDialogContext'
import { useEditVideoDialogContext } from '~/context/EditVideoDialogContext'
import { useNotification } from '~/context/NotificationContext'
import { config, filterCountry, getCountriesCurrencies } from '~/lib/lib'
import { CountryType, GalleryItemMenuProps, ProductItemMenuProps } from '~/lib/types'

const GalleryItemMenu = ({
    product,
    menu,
    userGuid,
    businessGuid
}: ProductItemMenuProps) => {

    const [dialog, setDialog] = useState<any>(false)
    const [videoSrc, setVideoSrc] = useState<any>(null)
    const editProduct = useEditProductDialogContext()
    const notification = useNotification()
    const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL

    const handleOpenDialog = async () => {
        editProduct.setDialog(true)
        editProduct.setImgSrc(config.IMG_BASE_URL + product.product_image_url)
        editProduct.setProductTitle(product.product_title)
        editProduct.setProductDescription(product.product_description)
        editProduct.setProductLink(product.product_link)
        editProduct.setProductGuid(product.product_guid)
        editProduct.setProductAmount(product.product_amount)
        editProduct.setProductCurrencyId(product.product_currency_country_id)
        editProduct.setUserGuid(userGuid)
        editProduct.setBusinessGuid(businessGuid)
        const countriesData: CountryType[] | undefined = await getCountriesCurrencies()

        const filteredCountry: CountryType[] | undefined = filterCountry(countriesData, product.product_currency_country_id)

        let ctry: CountryType | undefined = undefined

        if (filteredCountry && filteredCountry.length > 0) {
            ctry = filteredCountry[0] // Now safe to access
        }

        editProduct.setSelectedCountry(ctry)
        //setDialog(true)
    }

    const handleDelete = async () => {
        //notification.notify()
        //await new Promise((resolve) => setTimeout(resolve, 1000));

        editProduct.deleteProduct(userGuid, businessGuid, product.product_guid)

    }

    const handleCloseDialog = () => {
        setDialog(false)
        setVideoSrc(null)
    }

    return (
        <div className=''>
            {
                menu &&
                <div className={` absolute top-2 right-2 w-[80%] bg-white
                rounded-[12px] overflow-hidden border-[1px] border-white
                shadow-md`}>
                    <div className={`mt-3`}>
                        <div className={` divide-y-[1px]`}>
                            <div
                                onMouseDown={handleOpenDialog}
                                className={`py-1 hover:bg-gray-300 w-full
                                flex flex-col
                                px-2 transition duration-1000 ease-in-out`}>
                                Edit
                            </div>
                            <div
                                onMouseDown={handleDelete}
                                className={`py-1 hover:bg-gray-300 w-full
                                flex flex-col
                                px-2 transition duration-1000 ease-in-out`}>
                                Delete
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default GalleryItemMenu

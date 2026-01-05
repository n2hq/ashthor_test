import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import BusinessProfileSchema from './BusinessProfileSchema'
import { config, formatDecimalWithCommas, getCities, getStates, headers } from '~/lib/lib'
import { categories as category } from '~/lib/json/categories'
import { pageType } from '~/lib/json/page_type'
import { useNotification } from '~/context/NotificationContext'
import BgComponent from './image/BgComponent'
import ImgComponentAlt from './image/ImgComponentAlt'
import Button from '~/components/content/button/Button'
import Input from '~/components/content/input/Input'
import { controlInformationClass, formWrapperClass } from '~/lib/css'
import TextareaWithWordLimit from '~/components/content/textarea/TextareaWithWordLimit'
import Select from '~/components/content/select/Select'
import BusinessMenu from './BusinessMenu'
import { useOperation } from '~/context/OperationContext'
import BusinessDrawer from '../../../assets/BusinessDrawer'
import PhoneNoInput from '~/components/content/input/PhoneNoInput'
import InputNumberOnly from '~/components/content/input/InputNumberOnly'
import SelectCurrency from '~/components/content/select/SelectCurrency'

const BusinessProfile = ({ data }: any) => {
    //console.log(data.businessProfile)
    const [businessProfile, setBusinessProfile] = useState<any | null>(data.businessProfile)
    const [formdata, setFormdata] = useState<any | null>(null)
    const [working, setWorking] = useState<boolean>(false)
    const notification = useNotification()
    const [errorMsg, setErrorMsg] = useState<any>(null)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (data.businessProfile) {
            const minAmt = formatDecimalWithCommas(businessProfile.minimum_amount.toString())
            setValue("minimum_amount", minAmt)
        }
    }, [data])


    const { showOperation, showSuccess, showError, showWarning, showInfo, completeOperation } = useOperation();

    const currencies = data?.currencies
    const countries = data?.countries
    let [states, setStates] = useState(data.states)
    let [cities, setCities] = useState(data.cities)
    //const categories = data.categories.data
    const categories = category?.sort((a, b) =>
        a.name.localeCompare(b.name)
    )

    const [countryCode, setCountryCode] = useState(data?.businessProfile?.country_code)
    const [stateCode, setStateCode] = useState(data?.businessProfile?.state_code)

    const [newCountryCode, setNewCountryCode] = useState('')
    const [newStateCode, setNewStateCode] = useState('')

    const resetStates = async (countryCode: string) => {
        setCountryCode(countryCode)
        setNewCountryCode(countryCode)
        const states = await getStates(countryCode)
        setStates(states)
        resetCities('')
    }
    const resetCities = async (stateCode: string) => {
        setStateCode(stateCode)
        setNewStateCode(stateCode)
        const cities = await getCities(countryCode, stateCode)
        setCities(cities)
    }

    const changeHandler = (e: any) => {
        let value = e.target.value
        let name = e.target.name
        setFormdata((previousValue: any) => {
            return (
                {
                    ...previousValue, [name]: value
                }
            )
        })
    }

    const handleUpdateBusiness: SubmitHandler<any> = async (datar: any) => {
        setWorking(true)
        //alert(JSON.stringify(datar))
        console.log(datar)
        //return false
        //notification.notify('Updating business profile...')
        showOperation('processing', 'Updating page profile')
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const endpoint = "/api/listing/" + data?.businessProfile?.gid
        const url = config.BASE_URL + endpoint

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: headers,
                body: JSON.stringify(datar)
            })

            if (!response.ok) {
                const errorData = await response.text();
                const errorObject = JSON.parse(errorData)
                throw new Error(`${errorObject.error}`);

            } else {
                //notification.alertReload('Success!', 'Successfully updated!')
                showSuccess('Success', 'Page profile updated.')
                completeOperation()
            }

        } catch (error: any) {
            //notification.alertCancel('Unsuccessful', error.message)
            showError('error', `${error.message}`)
            completeOperation()
        } finally {
            setWorking(false)
        }
    }

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        watch,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<any>({
        defaultValues: (businessProfile),
        resolver: zodResolver(BusinessProfileSchema)
    })


    useEffect(() => {
        if (data.businessProfile) {
            setValue("state_code", data.businessProfile.state_code)
            setValue("city_id", data.businessProfile.city_id)
        }
    }, [data.businessProfile])

    useEffect(() => {
        if (newCountryCode) {
            setValue("state_code", "")
            setValue("city_id", "")
        }

    }, [newCountryCode, data])

    useEffect(() => {
        if (newStateCode) {
            setValue("city_id", "")
        }
    }, [newStateCode])



    return (
        <div>
            <BusinessDrawer isOpen={isOpen} businessGuid={data.businessProfile?.gid} userGuid={data.businessProfile?.owner} />

            <BgComponent
                listing={data.businessProfile}
                user={data.userProfile}
                businessProfileBgData={data.businessProfileBgData}
            />

            <div className={`px-[15px]  relative w-full flex place-content-center h-[180px]`}>
                <div className={`absolute top-[-50px]`}>
                    <div className={`flex place-items-center place-content-center flex-col`}>
                        <ImgComponentAlt
                            listing={data.businessProfile}
                            user={data.userProfile}
                            businessProfileImageData={data.businessProfileImageData}
                        />
                    </div>

                </div>


            </div>

            <div>

                <hr className={`mb-4`} />

                <div className={`relative w-full flex place-items-center gap-1 place-content-end px-[10px]`}>
                    <a href={`/web/account/portfolio`}
                        className={` py-[9px] px-[20px] rounded-full bg-blue-900 shadow-lg shadow-blue-400 text-white`}
                    >
                        Portfolio
                    </a>

                    <a href={`/${data.businessProfile?.gid}`}
                        className={` py-[9px] px-[20px] rounded-full bg-blue-900 shadow-lg shadow-blue-400 text-white`}
                    >
                        Preview
                    </a>



                    {
                        data?.businessProfile &&
                        <BusinessMenu
                            setIsOpen={setIsOpen}
                            guid={data?.businessProfile?.gid}
                            userGuid={data?.businessProfile?.owner} />
                    }


                </div>


                <form className={`w-full px-[10px]`} onSubmit={handleSubmit(handleUpdateBusiness)}>


                    <div className={`${formWrapperClass} mt-0  rounded-lg pt-4 md:max-w-[80%]
                                lg:max-w-[60%] w-full mx-auto `}>


                        <div className={`text-2xl leading-[1.4em] px-[10px] text-gray-500 mb-[32px] font-bold text-center bg-gray-100 w-full p-3 border rounded`}>
                            {data?.businessProfile?.title}
                        </div>

                        <Input
                            controlTitle={"Page Username"}
                            controlPlaceholder={"Enter username"}
                            controlName={"username"}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.username}
                            controlInformation={`Choose a username. `}

                        />

                        <Select
                            controlTitle={"Page Type"}
                            controlName={"pagetype"}
                            controlPlaceholder={"Select Page Type"}
                            selectJson={pageType}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.pagetype}
                            controlInformation={`Select business category.`}
                        />

                        <Input
                            controlTitle={"Email Address"}
                            controlPlaceholder={"Enter email address"}
                            controlName={"email_address"}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.email_address}
                            controlInformation={`Email address is compulsory.`}
                        />

                        <Input
                            controlTitle={"Business name"}
                            controlPlaceholder={"Enter business name"}
                            controlName={"title"}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.title}
                            controlInformation={`Please enter page name. Page name is compulsory. `}

                        />



                        <Select
                            controlTitle={"Category"}
                            controlName={"category"}
                            controlPlaceholder={"Select category"}
                            selectJson={categories}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.category}
                            controlInformation={`Select business category.`}
                        />



                        <Input
                            controlTitle={"Year established"}
                            controlPlaceholder={"Enter year established"}
                            controlName={"established"}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.established}
                            controlInformation={`This is the name the business was registered or started `}

                        />


                        <Input
                            controlTitle={"Address 1"}
                            controlPlaceholder={"Enter address"}
                            controlName={"address_one"}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.address_one}
                            width={100}
                            controlInformation={`Contact address for the business. `}
                        />

                        <Input
                            controlTitle={"Address 2"}
                            controlPlaceholder={"Enter address"}
                            controlName={"address_two"}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.address_two}
                            width={100}
                            controlInformation={`E.g. Off North Central Boulevard or North Central Road. `}
                        />

                        <Select
                            controlTitle={"Country"}
                            controlName={"country_code"}
                            controlPlaceholder={"Select country"}
                            selectJson={countries}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.country_code}
                            setCode={resetStates}
                            controlInformation={`Country the business was registered. `}

                        />

                        <Select
                            controlTitle={"State"}
                            controlName={"state_code"}
                            controlPlaceholder={"Select state"}
                            selectJson={states}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.state_code}
                            setCode={resetCities}
                            controlInformation={`State the business was registered. `}
                        />

                        <Select
                            controlTitle={"City"}
                            controlName={"city_id"}
                            controlPlaceholder={"Select city"}
                            selectJson={cities}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.city_id}
                            controlInformation={`City the business was registered. `}
                        />



                        <Input
                            controlTitle={"Zipcode"}
                            controlPlaceholder={"Enter zipcode"}
                            controlName={"zipcode"}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.zipcode}
                            controlInformation={`Enter the zipcode. E.g.: 51234 or 845219 `}
                        />

                        <PhoneNoInput
                            controlTitle={"Phone number"}
                            controlPlaceholder={"Enter phone number"}
                            controlName={"phone"}
                            register={register}
                            setValue={setValue}
                            getValues={getValues}
                            changeHandler={changeHandler}
                            error={errors.phone}
                            controlInformation={`Mobile number or phone number. `}
                        />










                        <div className={`w-full mt-4 mb-12`}>
                            <div className={`text-2xl font-semibold`}>
                                Minimum rate charged by this business.
                            </div>
                            <div className={`text-[14px] py-4 mb-0 leading-[1.3em]`}>Select the minimum amount customers or clients are charged to purchase goods/services from this business. This is optional.</div>

                            <div className={`p-4 border rounded-xl`}>
                                <SelectCurrency
                                    controlTitle={"Currency"}
                                    controlName={"minimum_amount_currency_code"}
                                    controlPlaceholder={"Select currency"}
                                    selectJson={currencies}
                                    register={register}
                                    changeHandler={changeHandler}
                                    error={errors.minimum_amount_currency_code}
                                    setCode={resetStates}
                                    controlInformation={`Default currency to receive funds.`}
                                />

                                <div className={`h-2`}></div>

                                <InputNumberOnly
                                    controlTitle={"Minimum amount charged"}
                                    controlPlaceholder={"Starting amount. E.g. 10 or 30..."}
                                    controlName={"minimum_amount"}
                                    register={register}
                                    changeHandler={changeHandler}
                                    error={errors.minimum_amount}
                                    controlInformation={`Enter the starting amount charged by this business`}
                                />

                            </div>
                        </div>

                        <TextareaWithWordLimit
                            controlTitle={"Short Description"}
                            controlPlaceholder={"Short description"}
                            controlName={"short_description"}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.short_description}
                            setValue={setValue}
                            getValues={getValues}
                            watch={watch}
                            controlInformationClass={controlInformationClass}
                            controlInformation={`Short description of business activities`}
                        />

                        <TextareaWithWordLimit
                            controlTitle={"Long Description"}
                            controlPlaceholder={"Long description"}
                            controlName={"long_description"}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.long_description}
                            setValue={setValue}
                            getValues={getValues}
                            watch={watch}
                            controlInformationClass={controlInformationClass}
                            controlInformation={`More description about the business.`}
                        />

                        {/* <Input
                            controlTitle={"Twitter"}
                            controlPlaceholder={"@handle"}
                            controlName={"xsocial"}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.address}
                        />

                        <Input
                            controlTitle={"Facebook"}
                            controlPlaceholder={"@handle"}
                            controlName={"fbsocial"}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.fbsocial}
                        />

                        <Input
                            controlTitle={"LinkedIn"}
                            controlPlaceholder={"https://linkedin.com/company/username"}
                            controlName={"linksocial"}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.linksocial}
                        />
 */}
                        <Input
                            controlTitle={"Website"}
                            controlPlaceholder={"Enter website"}
                            controlName={"website"}
                            register={register}
                            changeHandler={changeHandler}
                            error={errors.website}
                            controlInformation={`Your website should look like this: http://example.com `}
                        />

                        <Button working={working} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default BusinessProfile

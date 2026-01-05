import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { config, getCities, getStates, headers } from '~/lib/lib'
import AddBusinessSchema from './CreatePageSchema.js'
import Input from '~/components/content/input/Input'
import Select from '~/components/content/select/Select'
import Button from '~/components/content/button/Button'
import Textarea from '~/components/content/textarea/Textarea'
import { controlInformationClass, formWrapperClass } from '~/lib/css.js'
import TextareaWithWordLimit from '~/components/content/textarea/TextareaWithWordLimit.js'
import CreatePageSchema from './CreatePageSchema.js'
import { useNotification } from '~/context/NotificationContext.js'
import { useNavigate, useNavigation } from '@remix-run/react'
import { leftNavLinks } from '~/lib/json.js'
import { categories as category } from '~/lib/json/categories.js'
import { useOperation } from '~/context/OperationContext.js'
import { pageType } from '~/lib/json/page_type.js'
import PhoneNoInput from '~/components/content/input/PhoneNoInput.js'
import SelectCurrency from '~/components/content/select/SelectCurrency.js'
import InputNumberOnly from '~/components/content/input/InputNumberOnly.js'

const CreatePageForm = ({ data, user }: any) => {



    const [formdata, setFormdata] = useState<any | null>(null)
    const [working, setWorking] = useState<boolean>(false)
    const notification = useNotification()
    const navigator = useNavigate()

    const { showOperation, showSuccess, showError, showWarning, showInfo, completeOperation } = useOperation();

    const currencies = data.currencies
    const countries = data.countries
    let [states, setStates] = useState(data.states)
    let [cities, setCities] = useState(data.cities)
    //const categories = data.categories.data
    const categories = category
    //console.log(categories)

    const [countryCode, setCountryCode] = useState('')
    const [stateCode, setStateCode] = useState('')

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

    const handleAddBusiness = async (datar: any) => {

        datar['first_name'] = user.first_name
        datar['last_name'] = user.last_name
        console.log(datar)
        //return true;
        setWorking(true)
        //notification.notify('Creating page...')
        showOperation('processing', 'Creating a page')
        await new Promise((resolve) => setTimeout(resolve, 1000));
        datar["owner"] = user.guid
        //alert(JSON.stringify(datar))
        //return false

        const endpoint = "/api/listing"
        const url = config.BASE_URL + endpoint

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(datar)
            })



            if (!response.ok) {
                var respObj = await response.json()
                throw new Error(`Error Code: ${response.status} - ${respObj?.message || respObj?.error}`)
            } else {

                showSuccess('success', 'Page created successfully.')

                showOperation('processing', 'Redirecting...')
                await new Promise((resolve) => setTimeout(resolve, 4000));
                window.location.href = '/web/account/portfolio'
                completeOperation()
                //alert('Successfully added!')
                /*  const handleOption = async (value: boolean) => {
                     if (value) {
                         notification.cancel()
 
                     } else {
                         window.location.href = ("/web/account/portfolio")
                         await new Promise((resolve) => setTimeout(resolve, 1000));
                         notification.cancel()
 
                     }
                 }
 
                 if (notification.confirm('Page created. Do you wish to create another page?', handleOption)) {
 
                 } */

            }
        } catch (e: any) {
            showError('Error', e.message)
            completeOperation()
            //notification.alertCancel('Error!', e.message)
        } finally {
            setWorking(false)
        }
    }

    const {
        register,
        handleSubmit,
        getValues,
        watch,
        setValue,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<any>({
        resolver: zodResolver(CreatePageSchema)
    })

    useEffect(() => {
        if (newCountryCode) {
            setValue("state_code", "")
            setValue("city_id", "")
        }
    }, [newCountryCode])

    useEffect(() => {
        if (newStateCode) {
            setValue("city_id", "")
        }
    }, [newStateCode])





    return (
        <form onSubmit={handleSubmit(handleAddBusiness)}>
            <div className={`${formWrapperClass} mt-0  rounded-lg pt-4
                             max-w-[500px] w-full mx-auto `}>
                <Input
                    controlTitle={"Business Name"}
                    controlPlaceholder={"Enter business name"}
                    controlName={"title"}
                    register={register}
                    changeHandler={changeHandler}
                    error={errors.title}
                    width={80}
                    controlInformation={`Business name is compulsory.`}
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



                <Select
                    controlTitle={"Business Category"}
                    controlName={"category"}
                    controlPlaceholder={"Select business category"}
                    selectJson={categories}
                    register={register}
                    changeHandler={changeHandler}
                    error={errors.category}
                    controlInformation={`Select business category.`}
                />

                <Input
                    controlTitle={"Address 1"}
                    controlPlaceholder={"Enter address"}
                    controlName={"address_one"}
                    register={register}
                    changeHandler={changeHandler}
                    error={errors.address_one}
                    width={100}
                    controlInformation={`Address of Business. E.g. 28 New York Street `}
                />

                <Input
                    controlTitle={"Address 2"}
                    controlPlaceholder={"Enter address"}
                    controlName={"address_two"}
                    register={register}
                    changeHandler={changeHandler}
                    error={errors.address_two}
                    width={100}
                    controlInformation={`Continuation of address. E.g. Crown Tower, Off Belleveu Avenue or Valu Complex, Kingston Donnel Boulevard. `}
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
                    controlInformation={`Country the business was registered or active. `}
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
                    controlInformation={`State the business is registered or active. `}
                />

                <Select
                    controlTitle={"City"}
                    controlName={"city_id"}
                    controlPlaceholder={"Select city"}
                    selectJson={cities}
                    register={register}
                    changeHandler={changeHandler}
                    error={errors.city_id}
                    controlInformation={`City the business is registered or active. `}

                />


                <Input
                    controlTitle={"Zipcode"}
                    controlPlaceholder={"Enter zipcode"}
                    controlName={"zipcode"}
                    register={register}
                    changeHandler={changeHandler}
                    error={errors.zipcode}
                    controlInformation={`Zipcode of location of business. Eg. 92829 or 239484 `}
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
                    controlInformation={`Phone OR Mobile number. `}
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
                            error={errors.country_code}
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
                            error={errors.established}
                            controlInformation={`Enter the starting amount charged by this business`}
                        />

                    </div>
                </div>


                <Input
                    controlTitle={"Year established - Optional"}
                    controlPlaceholder={"Enter year established"}
                    controlName={"established"}
                    register={register}
                    changeHandler={changeHandler}
                    error={errors.established}
                    controlInformation={`Year registered is compulsory.`}
                />

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
                    controlInformation={`Enter a short description of this business. It should be a maximum of 50 words. `}
                />

                <Button working={working} />
            </div>
        </form>
    )
}

export default CreatePageForm

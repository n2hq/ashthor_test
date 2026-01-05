import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiChevronLeft } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { z } from 'zod'
import Button from "~/components/content/button/Button";
import Input from "~/components/content/input/Input";
import TextareaWithWordLimit from "~/components/content/textarea/TextareaWithWordLimit";
import { controlInformationClass } from "~/lib/css";
import { useOperation } from "./OperationContext";
import { config, headers } from "~/lib/lib";
import { ServiceType } from "~/lib/types";

export interface AddServiceProps {
    setDialog: (dialog: boolean) => void
    setUserGuid: (userGuid: string) => void
    setBusinessGuid: (businessGuid: string) => void
    setServiceProfile: (serviceProfile: any) => void
}
const AddServiceContext = createContext<AddServiceProps | null>(null)

export default AddServiceContext

export const useAddServiceContext = () => {
    const ctx = useContext(AddServiceContext)
    if (ctx) { return ctx }
    return null
}

export const AddServiceProvider = ({ children }: any) => {
    const [dialog, setDialog] = useState(false)
    const [userGuid, setUserGuid] = useState('')
    const [businessGuid, setBusinessGuid] = useState('')
    const [serviceProfile, setServiceProfile] = useState<ServiceType | null>(null)
    const [formdata, setFormdata] = useState<any | null>(null)
    const [working, setWorking] = useState(false)

    useEffect(() => {
        if (serviceProfile !== null) {
            reset(serviceProfile)
        }

        if (serviceProfile === null) {
            setValue("service_name", "")
            setValue("service_description", "")
            setValue("service_url", "")
        }
    }, [serviceProfile])

    const { showOperation, showSuccess, showError, showWarning, showInfo, completeOperation } = useOperation();


    const AddService = async (data: any) => {
        const endpoint = "/api/listing/services"
        const url = config.BASE_URL + endpoint

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                const errorData = await response.text();
                const errorObject = JSON.parse(errorData)
                throw new Error(`${errorObject.error}`);

            } else {

                showSuccess('Success', 'Service added successfully.')


                await new Promise((resolve) => setTimeout(resolve, 2000));
                showOperation('processing', 'Reloading...')
                await new Promise((resolve) => setTimeout(resolve, 3000));
                window.location.reload()
                await new Promise((resolve) => setTimeout(resolve, 3000));
                completeOperation()
            }

        } catch (error: any) {
            showError('error', `${error.message}`)
            completeOperation()
        } finally {
            setWorking(false)
        }
    }

    const UpdateService = async (data: any) => {
        const endpoint = "/api/listing/services/" + serviceProfile?.service_guid
        const url = config.BASE_URL + endpoint


        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: headers,
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                const errorData = await response.text();
                const errorObject = JSON.parse(errorData)
                throw new Error(`${errorObject.error}`);

            } else {

                showSuccess('Success', 'Service UPDATED successfully.')

                await new Promise((resolve) => setTimeout(resolve, 2000));
                showOperation('processing', 'Reloading...')
                await new Promise((resolve) => setTimeout(resolve, 3000));
                window.location.reload()
                await new Promise((resolve) => setTimeout(resolve, 3000));
                completeOperation()
            }

        } catch (error: any) {
            showError('error', `${error.message}`)
            completeOperation()
        } finally {
            setWorking(false)
        }
    }

    const handleAddService: SubmitHandler<any> = async (data: any) => {
        setWorking(true)

        if (serviceProfile === null) {
            showOperation('processing', 'Adding service...')
        } else {
            showOperation('processing', 'Updating service...')
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));


        if (serviceProfile === null) {
            data['user_guid'] = userGuid
            data['business_guid'] = businessGuid
            const finalData = JSON.parse(JSON.stringify(data))

            AddService(data)
        } else {

            UpdateService(data)
        }


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
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        watch,
        reset,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<any>({
        defaultValues: (serviceProfile),
        resolver: zodResolver(ServiceProfileSchema)
    })

    let vals = {
        setDialog,
        setUserGuid,
        setBusinessGuid,
        setServiceProfile
    }

    const handleDelete = async (serviceGuid: string) => {
        const result = confirm('Do you wish to delete this service. Once deleted, you cannot recover it?')
        if (result === true) {
            showOperation('processing', 'Deleting service...')
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const endpoint = "/api/listing/services/" + serviceProfile?.service_guid
            const url = config.BASE_URL + endpoint


            try {
                const response = await fetch(url, {
                    method: "DELETE",
                    headers: headers
                })

                if (!response.ok) {
                    const errorData = await response.text();
                    const errorObject = JSON.parse(errorData)
                    throw new Error(`${errorObject.error}`);

                } else {

                    showSuccess('Success', 'Service DELETED successfully.')


                    await new Promise((resolve) => setTimeout(resolve, 2000));
                    showOperation('processing', 'Reloading...')
                    await new Promise((resolve) => setTimeout(resolve, 3000));
                    window.location.reload()
                    await new Promise((resolve) => setTimeout(resolve, 3000));
                    completeOperation()
                }

            } catch (error: any) {
                showError('error', `${error.message}`)
                completeOperation()
            } finally {
                setWorking(false)
            }
        } else {
            //alert('abort')
        }
    }

    return (
        <AddServiceContext.Provider value={vals}>
            <div>
                {
                    dialog &&
                    <div className={`fixed top-0 left-0 w-full right-0 bg-black/40 z-[4000] h-full flex place-items-center place-content-center`}
                        onClick={() => setDialog(false)}
                    >
                        <CloseButton setDialog={setDialog} />
                        <div className={`mx-3 w-full`}>
                            <div className={`max-w-[600px] mx-auto w-full bg-white rounded-[40px] px-[24px] pt-16 relative pb-12`}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className={`absolute top-8 right-8 text-3xl border-[2px] rounded-xl border-gray-500/20 w-[40px] h-[40px] shadow-sm flex place-items-center place-content-center text-gray-500 cursor-pointer hover:bg-gray-100 hover:border-gray-200/50`}
                                    onClick={() => setDialog(false)}
                                >
                                    <CgClose />
                                </div>
                                <div className={`text-3xl font-semibold`}>
                                    {
                                        serviceProfile === null ? 'Add' : 'Edit'
                                    } Service
                                </div>

                                <div className={`border rounded-2xl overflow-hidden pl-3 pt-3 mt-4`}>
                                    <div className={`mt-0  h-[430px] overflow-x-hidden overflow-y-scroll pr-3`}>
                                        <form className={`w-full `} onSubmit={handleSubmit(handleAddService)}>

                                            <Input
                                                controlTitle={"Service name"}
                                                controlPlaceholder={"Enter service name"}
                                                controlName={"service_name"}
                                                register={register}
                                                changeHandler={changeHandler}
                                                error={errors.service_name}
                                                controlInformation={`Enter a service name. `}

                                            />


                                            <TextareaWithWordLimit
                                                controlTitle={"Service Description"}
                                                controlPlaceholder={"Service description"}
                                                controlName={"service_description"}
                                                register={register}
                                                changeHandler={changeHandler}
                                                error={errors.service_description}
                                                setValue={setValue}
                                                getValues={getValues}
                                                watch={watch}
                                                controlInformationClass={controlInformationClass}
                                                controlInformation={`Service description for this business activities`}
                                            />

                                            <Input
                                                controlTitle={"Service URL"}
                                                controlPlaceholder={"Enter a valid url"}
                                                controlName={"service_url"}
                                                register={register}
                                                changeHandler={changeHandler}
                                                error={errors.service_url}
                                                controlInformation={`Your url should start like this: http://example.com `}
                                            />


                                            <Button working={working} />

                                        </form>
                                    </div>
                                </div>

                                {
                                    serviceProfile !== null &&
                                    <div className={`flex flex-col`} onClick={() => handleDelete(serviceProfile?.service_guid)}>
                                        <div className={`py-4 underline text-xl  cursor-pointer`}>
                                            Delete Service
                                        </div>
                                    </div>
                                }
                            </div>

                        </div>

                    </div>
                }
            </div>
            {children}
        </AddServiceContext.Provider>
    )
}


export interface CloseButtonProps {
    setDialog: (dialog: boolean) => void
}
export const CloseButton = ({ setDialog }: CloseButtonProps) => {
    return (
        <div onClick={() => setDialog(false)}>
            <div className={`w-[30px] h-[30px] flex place-items-center place-content-center rounded-full absolute top-2 left-2 bg-white text-[25px] font-bold transition-all ease-in-out duration-700 cursor-pointer hover:bg-white/40`}>
                <BiChevronLeft />
            </div>
        </div>
    )
}



const urlvalidator = /^(?!https?)(?!www\.?).*\..+$/g


export const ServiceProfileSchema = z.object({
    service_name: z.string({ message: "Please enter a service name" })
        .min(1, { message: "Please enter a service name" }),
    service_description: z.string({ message: "Please enter a service description" })
        .min(1, { message: "Please enter a service description" }),
    service_url: z
        .string()
        .nullable()
        .optional()
        .refine(
            (val) => {
                if (!val || val === "" || val === undefined) return true; // ✅ allow empty, null, undefined
                try {
                    new URL(val); // will throw if invalid
                    return true;
                } catch {
                    return false;
                }
            },
            { message: "Please enter a valid URL. Example: http://example.com/service-link" }
        ),

})


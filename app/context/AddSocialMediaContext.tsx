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
import { ServiceType, SocialMediaType, SysSocialMediaType } from "~/lib/types";
import Select from "~/components/content/select/Select";

export interface AddSocialMediaProps {
    setDialog: (dialog: boolean) => void
    setUserGuid: (userGuid: string) => void
    setBusinessGuid: (businessGuid: string) => void
    setSocialMediaProfile: (socialMediaProfile: any) => void
    setSysSocialMedia: (sysSocialMedia: SysSocialMediaType[] | null | undefined) => void
}
const AddSocialMediaContext = createContext<AddSocialMediaProps | null>(null)

export default AddSocialMediaContext

export const useAddSocialMediaContext = () => {
    const ctx = useContext(AddSocialMediaContext)
    if (ctx) { return ctx }
    return null
}

export const AddSocialMediaProvider = ({ children }: any) => {
    const [dialog, setDialog] = useState(false)
    const [userGuid, setUserGuid] = useState('')
    const [businessGuid, setBusinessGuid] = useState('')
    const [socialMediaProfile, setSocialMediaProfile] = useState<SocialMediaType | null>(null)
    const [sysSocialMedia, setSysSocialMedia] = useState<SysSocialMediaType[] | null | undefined>(null)

    const [formdata, setFormdata] = useState<any | null>(null)
    const [working, setWorking] = useState(false)

    useEffect(() => {
        if (socialMediaProfile !== null) {
            reset(socialMediaProfile)
        }

        if (socialMediaProfile === null) {
            setValue("social_media_code", "")
            setValue("social_media_identifier", "")

        }
    }, [socialMediaProfile])

    const { showOperation, showSuccess, showError, showWarning, showInfo, completeOperation } = useOperation();


    const AddSocialMedia = async (data: any) => {
        const endpoint = "/api/listing/social_media"
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

                showSuccess('Success', 'Social Media added successfully.')


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

    const UpdateSocialMedia = async (data: any) => {
        const endpoint = "/api/listing/social_media/" + socialMediaProfile?.social_media_guid
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

                showSuccess('Success', 'Social Media UPDATED successfully.')

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

    const handleAddSocialMedia: SubmitHandler<any> = async (data: any) => {
        setWorking(true)

        if (socialMediaProfile === null) {
            showOperation('processing', 'Adding service...')
        } else {
            showOperation('processing', 'Updating service...')
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));


        if (socialMediaProfile === null) {
            data['user_guid'] = userGuid
            data['business_guid'] = businessGuid
            const finalData = JSON.parse(JSON.stringify(data))

            AddSocialMedia(data)
        } else {

            UpdateSocialMedia(data)
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
        defaultValues: (socialMediaProfile),
        resolver: zodResolver(SocialMediaProfileSchema)
    })

    let vals = {
        setDialog,
        setUserGuid,
        setBusinessGuid,
        setSocialMediaProfile,
        setSysSocialMedia
    }

    const handleDelete = async (serviceGuid: string) => {
        const result = confirm('Do you wish to delete this social media. Once deleted, you cannot recover it?')
        if (result === true) {
            showOperation('processing', 'Deleting social media...')
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const endpoint = "/api/listing/social_media/" + socialMediaProfile?.social_media_guid
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
        <AddSocialMediaContext.Provider value={vals}>
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
                                        socialMediaProfile === null ? 'Add' : 'Edit'
                                    } Social Media
                                </div>

                                <div className={`border rounded-2xl overflow-hidden pl-3 pt-3 mt-4`}>
                                    <div className={`mt-0  h-[330px] overflow-x-hidden overflow-y-auto pr-3`}>
                                        <form className={`w-full `} onSubmit={handleSubmit(handleAddSocialMedia)}>

                                            <Select
                                                controlTitle={"Social Media Name"}
                                                controlName={"social_media_code"}
                                                controlPlaceholder={"Select Social Media"}
                                                selectJson={sysSocialMedia}
                                                register={register}
                                                changeHandler={changeHandler}
                                                error={errors.category}
                                                controlInformation={`Select social media to add to the business.`}
                                            />





                                            <Input
                                                controlTitle={"Social Media Identifier"}
                                                controlPlaceholder={"Enter a valid url"}
                                                controlName={"social_media_identifier"}
                                                register={register}
                                                changeHandler={changeHandler}
                                                error={errors.social_media_identifier}
                                                controlInformation={`Your url should start like this: http://example.com `}
                                            />


                                            <Button working={working} />

                                        </form>
                                    </div>
                                </div>

                                {
                                    socialMediaProfile !== null &&
                                    <div className={`flex flex-col`} onClick={() => handleDelete(socialMediaProfile?.social_media_guid)}>
                                        <div className={`py-4 underline text-xl  cursor-pointer`}>
                                            Delete Social Media
                                        </div>
                                    </div>
                                }
                            </div>

                        </div>

                    </div>
                }
            </div>
            {children}
        </AddSocialMediaContext.Provider>
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


export const SocialMediaProfileSchema = z.object({
    social_media_code: z.string({ message: "Please enter a service name" })
        .min(1, { message: "Please enter a service name" }),

    social_media_identifier: z
        .string()
        .nullable()
        .optional()
        .refine(
            (val) => {
                // ✅ Allow empty, null, undefined
                if (!val || val.trim() === "") return true;

                const trimmedVal = val.trim();

                // ❌ Reject URLs
                try {
                    new URL(trimmedVal);
                    return false; // URL detected - reject it
                } catch {
                    // Not a valid URL, continue validation
                }

                // ❌ Reject anything starting with http://, https://, www.
                const urlPattern = /^(https?:\/\/|www\.)/i;
                if (urlPattern.test(trimmedVal)) {
                    return false;
                }

                // ✅ Validate it's a proper handle (customize this regex as needed)
                const handlePattern = /^[a-zA-Z0-9._-]+$/;
                return handlePattern.test(trimmedVal);
            },
            {
                message: "Please enter only the username/handle (e.g., 'oracle'), not a full URL."
            }
        ),

})


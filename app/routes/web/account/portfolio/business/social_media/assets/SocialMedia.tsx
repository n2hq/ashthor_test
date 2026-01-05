import React, { useEffect, useState } from 'react'
import { useNotification } from '~/context/NotificationContext'
import { useOperation } from '~/context/OperationContext'
import { headers } from '~/lib/lib'

type Socials = {
    id: number
    name: string
    description: string
    active: boolean
    media_id: string
}

type SelectedSocials = {
    id: number
    media_id: string
    user_description: string
}



// Simulated list of previously selected features (e.g. from DB)
const fetchSelectedFeatureIds = async (): Promise<number[]> => [1, 3, 5, 6]

const SocialMedia = ({
    businessGuid,
    userGuid,
    allSocialMedia,
    allSelectedSocialMedia
}: any) => {


    const [working, setWorking] = useState<boolean>(false)
    //const notification = useNotification()
    const { showOperation, showError, completeOperation, showSuccess } = useOperation()

    const [socialMedia, setSocialMedia] = useState<any | null>(null)
    const [selectedSocialMedia, setSelectedSocialMedia] = useState<any | null>(null)
    const [mergedSocialMedia, setMergedSocialMedia] = useState<any | null>(null)

    useEffect(() => {
        if (allSocialMedia && allSelectedSocialMedia) {
            setSocialMedia(allSocialMedia)
            setSelectedSocialMedia(allSelectedSocialMedia)
        }
    }, [allSocialMedia, allSelectedSocialMedia])

    useEffect(() => {
        if (socialMedia && selectedSocialMedia) {
            const mergedSocialMedia = socialMedia.map((media: any) => {
                const selected = selectedSocialMedia.find(
                    (selected: any) => selected.media_id === media.media_id
                );
                return {
                    ...media,
                    active: selected ? true : false,
                    user_description: selected ? selected.user_description : undefined,
                };
            });
            setMergedSocialMedia(mergedSocialMedia)
        }
    }, [socialMedia, selectedSocialMedia])



    const handleToggle = (id: string) => {

        setMergedSocialMedia((prev: any) =>
            prev.map((socialMedia: any) =>
                socialMedia.media_id === id ? {
                    ...socialMedia,
                    active: !socialMedia.active,
                    user_description: socialMedia.user_description ? socialMedia.user_description : ""
                } : socialMedia
            )
        )

    }

    const handleDescriptionChange = (id: string, value: string) => {

        setMergedSocialMedia((prev: any) =>
            prev.map((media: any) =>
                media.media_id === id ? { ...media, user_description: value } : media
            )
        )
    }

    const handleSave = async () => {
        const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
        const endpoint = `/api/listing/selected_social_media`
        const url = BASE_URL + endpoint

        setWorking(true)
        //notification.notify()
        showOperation('processing')
        await new Promise((resolve) => setTimeout(resolve, 1000));

        //console.log((mergedFeatures))
        //return false

        try {
            const selected = mergedSocialMedia.filter((f: any) => f.active).map((f: any) => {
                return ({
                    media_id: f.media_id,
                    user_description: f.user_description
                })
            })
            let data = {
                user_guid: userGuid,
                business_guid: businessGuid,
                selected: selected
            }

            //alert(JSON.stringify(data))
            //return false


            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data),
            })

            if (response.ok) {
                //notification.alertReload('', 'Saved successfully!')
                showSuccess('Success', 'Social media saved.')
                completeOperation()
            } else {
                //notification.alert('', 'Failed to save.')
                showError('Error', 'Save failed.')
                completeOperation()
            }
        } catch (error: any) {
            //notification.alert('', 'Something happened!')
            console.log(error.message)
            showError('Error', 'Save failed.')
            completeOperation()
        } finally {
            setWorking(false)
            //notification.alertReload("", "Completed successfully.")
        }
    }

    return (
        <div>
            <h2 className="text-lg font-semibold mb-3">Select Social Media</h2>
            {
                allSocialMedia.length > 0 &&
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {mergedSocialMedia?.map((socialMedia: any) => (
                            <label
                                key={socialMedia.media_id}
                                className="flex items-center space-x-3 p-3 border rounded-2xl cursor-pointer"

                            >
                                <div>
                                    <input
                                        onChange={() => handleToggle(socialMedia.media_id)}
                                        type="checkbox"
                                        checked={socialMedia.active}

                                        className="hidden"
                                    />
                                    <div
                                        className={`w-5 h-5 border-[1px] border-black  rounded 
                                            ${socialMedia.active ? 'bg-blue-400' : 'bg-white'
                                            }`}
                                    ></div>
                                </div>
                                <div className=' w-full'>
                                    <p className="font-medium ">{socialMedia.name}</p>
                                    {/* <p className="text-xs ">{socialMedia.description}</p> */}
                                    <div className=' w-full h-[50px] mt-1 rounded overflow-hidden'>
                                        <textarea
                                            onClick={(e) => handleToggle(socialMedia.media_id)}
                                            placeholder={`OurHandle`}
                                            onChange={(e) => handleDescriptionChange(socialMedia.media_id, e.target.value)}
                                            className={`w-full h-full bg-gray-100 rounded-2xl
                                            border p-3 text-sm`}
                                            value={socialMedia.user_description}
                                            onBlur={(e) => {
                                                if (e.currentTarget.value.length <= 0) {
                                                    handleToggle(socialMedia.media_id)
                                                }
                                            }}
                                        ></textarea>
                                    </div>
                                </div>
                            </label>
                        ))}
                    </div>
                    <button
                        onClick={handleSave}
                        className="mt-5 px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Save Selected Social Media
                    </button>
                </div>
            }
        </div>
    )
}

export default SocialMedia

import React, { useEffect, useState } from 'react'
import { useNotification } from '~/context/NotificationContext'
import { headers } from '~/lib/lib'

type FacilityFeature = {
    id: number
    name: string
    description: string
    active: boolean
    feature_id: string
}

type SelectedFacilityFeature = {
    id: number
    feature_id: string
    user_description: string
}



// Simulated list of previously selected features (e.g. from DB)
const fetchSelectedFeatureIds = async (): Promise<number[]> => [1, 3, 5, 6]

const FacilityFeaturesBackup = ({
    businessGuid,
    userGuid,
    facilityFeatures,
    selectedFacilityFeatures
}: any) => {
    const [working, setWorking] = useState<boolean>(false)
    const notification = useNotification()

    const [features, setFeatures] = useState<FacilityFeature[]>([])

    const fetchFeatures = async (): Promise<FacilityFeature[]> => {
        return facilityFeatures
    }

    const fetchSelectedFeaturesIds = async (): Promise<string[]> => {
        let selectedFacilitiesIds: string[] = []

        selectedFacilityFeatures.map((selectedFeature: SelectedFacilityFeature) => {
            selectedFacilitiesIds.push((selectedFeature.feature_id))

        })



        return selectedFacilitiesIds
    }

    useEffect(() => {

        const loadFeatures = async () => {


            const [allFeatures, selectedIds] = await Promise.all([
                fetchFeatures(),
                fetchSelectedFeaturesIds(),
            ])


            // Merge selection state
            const withSelection = allFeatures.map((feature) => {
                return (
                    {
                        ...feature,
                        active: selectedIds.includes(feature.feature_id),
                    }
                )
            })

            setFeatures(withSelection)
        }

        loadFeatures()
    }, [facilityFeatures, selectedFacilityFeatures])

    const handleToggle = (id: string) => {
        setFeatures((prev) =>
            prev.map((feature) =>
                feature.feature_id === id ? { ...feature, active: !feature.active } : feature
            )
        )
    }

    const handleSave = async () => {
        const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
        const endpoint = `/api/listings/selected_facility_features`
        const url = BASE_URL + endpoint

        setWorking(true)
        notification.notify()
        await new Promise((resolve) => setTimeout(resolve, 1000));

        try {
            const selected = features.filter((f) => f.active).map((f) => f.feature_id)
            let data = {
                user_guid: userGuid,
                business_guid: businessGuid,
                selected: selected
            }


            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data),
            })

            if (response.ok) {
                notification.alertReload('', 'Saved successfully!')
            } else {
                notification.alert('', 'Failed to save.')
            }
        } catch (error: any) {

        } finally {
            setWorking(true)
            //notification.alertReload("", "Completed successfully.")
        }
    }

    return (
        <div>
            <h2 className="text-lg font-semibold mb-3">Select Facility Features</h2>
            {
                facilityFeatures.length > 0 &&
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {features.map((feature) => (
                            <label
                                key={feature.feature_id}
                                className="flex items-center space-x-3 p-3 border rounded cursor-pointer"

                            >
                                <div>
                                    <input
                                        onChange={() => handleToggle(feature.feature_id)}
                                        type="checkbox"
                                        checked={feature.active}
                                        readOnly
                                        className="hidden"
                                    />
                                    <div
                                        className={`w-5 h-5 border-2 rounded ${feature.active ? 'bg-green-500' : 'bg-white'
                                            }`}
                                    ></div>
                                </div>
                                <div className=' w-full'>
                                    <p className="font-medium ">{feature.name}</p>
                                    <p className="text-xs ">{feature.description}</p>
                                    <div className=' w-full h-[100px] mt-1 rounded overflow-hidden'>
                                        <textarea className={`w-full h-full bg-gray-100
                                            border p-3 text-sm`}>
                                            {feature.description}
                                        </textarea>
                                    </div>
                                </div>
                            </label>
                        ))}
                    </div>
                    <button
                        onClick={handleSave}
                        className="mt-5 px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Save Selected Features
                    </button>
                </div>
            }
        </div>
    )
}

export default FacilityFeaturesBackup

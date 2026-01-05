import React, { useEffect, useState } from 'react'

const FacilityFeatureForm = ({
    facilityFeatures,
    businessGuid,
    userGuid
}: any) => {
    const [features, setFeatures] = useState<any | null>(null)
    const [selected, setSelected] = useState<Set<any>>(new Set())

    useEffect(() => {
        if (facilityFeatures) {
            setFeatures(facilityFeatures)
        }
    }, [facilityFeatures])

    const toggleFeature = (id: number, currentActive: boolean) => {
        setFeatures((prev: any) =>
            prev.map((feature: any) =>
                feature.id === id ? { ...feature, active: !currentActive } : feature
            )
        );
    };





    return (
        <div className=' w-full md:max-w-[70%] mx-auto'>
            <div className=" space-y-2">

                {features?.map((feature: any) => (
                    <div

                        key={feature.id}
                        className={`flex items-start gap-4 px-4 py-3 border rounded
                    cursor-pointer shadow hover:shadow-lg `}>
                        <input
                            onChange={() => toggleFeature(feature.id, feature.active)}
                            type="checkbox"
                            checked={feature.active}
                            className="mt-1"
                        />
                        <div className=' w-full'>
                            <div className={`text-[17px] font-semibold border-b w-full
                                `}>
                                {feature.name}
                            </div>

                            <textarea
                                className={`w-full outline-none 
                                    border rounded-[8px] p-3 h-[100px]`}
                            >
                                {feature.description}
                            </textarea>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default FacilityFeatureForm

import React from 'react'
import { getInitials } from '~/lib/lib'

interface AlternateImageProps {
    title: string
}
const AlternateImage = ({ title }: AlternateImageProps) => {
    return (
        <div className={`w-full h-full flex place-items-center place-content-center bg-gray-200 text-gray-500 `}>
            <span className={`uppercase text-3xl md:4xl font-semibold`}>
                {getInitials(title)}
            </span>
        </div>
    )
}

export default AlternateImage

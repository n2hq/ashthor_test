import React, { useState } from 'react'

import { useEditPhotoDialogContext } from '~/context/EditPhotoDialogContext'
import { useEditVideoDialogContext } from '~/context/EditVideoDialogContext'
import { useNotification } from '~/context/NotificationContext'
import { GalleryItemMenuProps } from '~/lib/types'

const GalleryItemMenu = ({
    item,
    menu,
    userGuid,
    businessGuid
}: GalleryItemMenuProps) => {
    const [dialog, setDialog] = useState<any>(false)
    const [videoSrc, setVideoSrc] = useState<any>(null)
    const editVideo = useEditVideoDialogContext()
    const notification = useNotification()
    const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL

    const handleOpenDialog = () => {
        editVideo.setDialog(true)
        editVideo.setVideoSrc(item.video_url)
        editVideo.setVideoTitle(item.video_title)
        editVideo.setUserGuid(userGuid)
        editVideo.setBusinessGuid(businessGuid)
        editVideo.setVideoGuid(item.video_guid)
        editVideo.setVideoDescription(item.video_description)
        editVideo.setVideoVerified(false)
        //setDialog(true)
    }

    const handleDelete = async () => {
        notification.notify()
        await new Promise((resolve) => setTimeout(resolve, 1000));

        editVideo.deleteVideo(userGuid, businessGuid, item.video_guid)

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

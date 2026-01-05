import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { config, getYoutubeId, headers, saveVideo, updateVideo } from "~/lib/lib";
import { useNotification } from "./NotificationContext";
import { AddVideoType } from "~/lib/types";
import { useOperation } from "./OperationContext";
import { CgClose } from "react-icons/cg";


const EditVideoDialogContext = createContext<any | null>(null)

export function useEditVideoDialogContext() {
    const context = useContext(EditVideoDialogContext)
    if (!context) {
        throw new Error("Wrap the app with an EditVideoDialogProvider!")

        return true
    }

    return context
}

export function EditVideoDialogProvider({ children }: any) {

    const [working, setWorking] = useState<any>(false)
    const [dialog, setDialog] = useState<any>(false)
    const [videoSrc, setVideoSrc] = useState<any>(null)
    const [userGuid, setUserGuid] = useState<any>(null)
    const [businessGuid, setBusinessGuid] = useState<any>(null)
    const [isImgSelected, setIsImageSelected] = useState<any>(false)
    const [selectedFile, setSelectedFile] = useState<any>(null)
    const [videoTitle, setVideoTitle] = useState<any>(null)
    const [videoDescription, setVideoDescription] = useState<any | null>(null)
    const [videoGuid, setVideoGuid] = useState<any>(null)
    const [formData, setFormdata] = useState<any | null>(null)
    const [video, setVideo] = useState<any | null>(null)
    const [videoIframe, setVideoIframe] = useState<any | null>(null)
    const [videoVerified, setVideoVerified] = useState(false)
    const [videoUrlState, setVideoUrlState] = useState(true)
    const [videoUrlObject, setVideoUrlObject] = useState<any | undefined>(undefined)
    const [videoUrlValue, setVideoUrlValue] = useState('')
    const [videoId, setVideoId] = useState<string | null>(null)


    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const notification = useNotification()

    const { showOperation, showError, completeOperation, showSuccess } = useOperation()



    useEffect(() => {
        if (videoUrlValue.trim().length > 0) {
            // URL changed → reset verification
            setVideoVerified(false)
            setVideoUrlState(true)
        }
    }, [videoUrlValue])



    useEffect(() => {
        if (videoSrc) {
            const videoId: string | null = getYoutubeId(videoSrc)
            setVideoId(videoId)
        }
    }, [videoSrc])

    const handleCloseDialog = () => {
        setDialog(false)
        setVideoSrc(null)
        setWorking(false)
    }

    const handleImageClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setVideoSrc(imageUrl)
            setSelectedFile(file)
            setIsImageSelected(true)
        }
    }

    const handleSubmit = async () => {
        setWorking(true)
        //notification.notify('Submitting...')
        showOperation('processing')

        await new Promise((resolve) => setTimeout(resolve, 1000));

        let videoLinkState: any = document.getElementById("videolink")
        let videoTitleState: any = document.getElementById("videotitle")
        let videoDescriptionState: any = document.getElementById("videodescr")

        let videoLink = videoLinkState.value;
        let videoTitle = videoTitleState.value;
        let videoDescription = videoDescriptionState.value;

        if (videoLink.trim().length <= 0) {
            //notification.alertCancel("Submission error!", "Enter a Video link!")
            showError('Error', 'Please enter a video link to proceed.')
            completeOperation()
            setWorking(false)
            return false
        }

        if (videoTitle.trim().length <= 0) {
            //notification.alertCancel("Submission error!", "Video title should not be empty!")
            showError('Error', 'Please enter a title for the video.')
            completeOperation()
            setWorking(false)
            return false
        }

        if (videoDescription.trim().length > 500) {
            //notification.alertCancel("Submission error!", "Video description should not be more than 500 characters!")
            showError('Error', 'Video description should not be more than 500 characters.')
            completeOperation()
            setWorking(false)
            return false
        }

        const video: AddVideoType = {
            video_url: videoLink,
            video_title: videoTitle,
            video_description: videoDescription,
            user_guid: userGuid,
            business_guid: businessGuid,
            video_guid: videoGuid
        }

        const result = await updateVideo(video);

        if (result?.data.success === true) {
            //notification?.alertReload("Successful", "Video link updated successfully.")
            showSuccess('Success', 'Video link is updated.')
            completeOperation()
        } else {
            //notification?.alertCancel("Submission Error", "Video link update failed.")
            showError('Error', 'Update failed')
            completeOperation()
        }


    }

    const deleteVideo = async (userGuid: string, businessGuid: string, videoGuid: string) => {
        const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL
        const endpoint = `/api/listing/save_video_link`
        const url = config.BASE_URL + endpoint

        const data: AddVideoType = {
            user_guid: userGuid,
            business_guid: businessGuid,
            video_guid: videoGuid,
            video_url: "",
            video_description: "",
            video_title: ""
        }

        setWorking(true)
        showOperation('processing', 'Submitting video')
        await new Promise((resolve) => setTimeout(resolve, 1000));

        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: headers,
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                let error = response.json().then((data) => {
                    //notification.alert(data.message)
                    showError('Error', `Failed: ${data.message}`)
                    completeOperation()
                })

            } else {
                //notification.alertReload('Deleted', 'Video deleted successfully!')
                showSuccess('Success', 'Video deleted.')
                completeOperation()
            }

        } catch (error: any) {
            console.log(error)
            showError('Error', 'Update failed')
        } finally {
            setWorking(false)

        }
    }

    const handleVideoUrlKeyUp = (urlString: string) => {

        setVideoUrlValue(urlString);
    }

    async function checkYouTubeVideo(videoId: string) {
        const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error("Video not found");
            const data = await res.json();
            //console.log("✅ Video exists:", data.title);
            return true;
        } catch (err) {
            console.error("❌ Invalid or unavailable video");
            return false;
        }
    }


    const getVideoInfo = async (videoUrl: any) => {

        //notification.notify()
        showOperation('processing', 'Verifying video')
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = videoUrl.match(regex);
        let videoId = match ? match[1] : null;
        let thumbnail = `https://img.youtube.com/vi/${videoId}/0.jpg`
        let videoObject = {
            videoId: videoId,
            videoUrl: videoUrl,
            videoThumbnail: thumbnail
        }

        const isLoaded = await checkYouTubeVideo(videoId)

        if (isLoaded) {

            try {
                setVideo(videoObject)
                setVideoVerified(true)
                {/** refresh the iframe */ }
                const ytvideoIframe: any = document.getElementById('yt-iframe')
                ytvideoIframe.src = `https://www.youtube.com/embed/${videoObject?.videoId}`

            } finally {
                showSuccess('Success', 'Video link is verified')
                completeOperation()
            }

        } else {

            //notification.alertCancel("Video error!", "Video could not be loaded!")
            showError('Error', 'Video could not be loaded!')

            completeOperation()
        }


        await new Promise((resolve) => setTimeout(resolve, 1000));

        setVideo(videoObject)
    }

    const handleVerify = () => {
        const videoUrl: any = document.getElementById("videolink")

        getVideoInfo(videoUrl.value)
    }

    const handleUpload = async () => {

        setWorking(true)
        notification.notify('Submitting...')

        await new Promise((resolve) => setTimeout(resolve, 1000));

        let videoLinkState: any = document.getElementById("videolink")
        let videoTitleState: any = document.getElementById("videotitle")
        let videoDescriptionState: any = document.getElementById("videodescr")

        let videoLink = videoLinkState.value;
        let videoTitle = videoTitleState.value;
        let videoDescription = videoDescriptionState.value;




        if (videoLink.trim().length <= 0) {
            notification.alertCancel("Submission error!", "Enter a Video link!")
            setWorking(false)
            return false
        }

        if (videoTitle.trim().length <= 0) {
            //notification.alertCancel("Submission error!", "Video title should not be empty!")
            showError('Error', 'Video title should not be empty')
            completeOperation()
            setWorking(false)
            return false
        }

        if (videoDescription.trim().length > 500) {
            //notification.alertCancel("Submission error!", "Video description should not be more than 500 characters!")
            showError('Error', 'Video description should not be more than 500 characters')
            completeOperation()
            setWorking(false)
            return false
        }

        const video: AddVideoType = {
            video_url: videoLink,
            video_title: videoTitle,
            video_description: videoDescription,
            user_guid: userGuid,
            business_guid: businessGuid,
            video_guid: ""
        }

        const result = await saveVideo(video);

        if (result?.data.videoInsertId) {
            //notification?.alertReload("Completed", "Video Link Submitted Successfully.")
            showSuccess('Success', 'Video link submitted')
            completeOperation()
        } else {
            //notification?.alertCancel("Submission Error", "Video Link submission failed.")
            showError('Error', 'Video link submission failed')
        }



        //handleVerify()
        //await new Promise((resolve) => setTimeout(resolve, 1000));

    }


    let vals = {
        dialog, setDialog,
        handleCloseDialog,
        videoSrc, setVideoSrc,
        userGuid, setUserGuid,
        businessGuid, setBusinessGuid,
        isImgSelected, setIsImageSelected,
        selectedFile, setSelectedFile,
        videoTitle, setVideoTitle,
        videoGuid, setVideoGuid,
        setVideoDescription,
        deleteVideo,
        setVideoVerified
    }

    return (
        <EditVideoDialogContext.Provider value={vals}>
            {
                dialog &&
                <div

                    className={`fixed flex w-screen h-screen z-[3000] 
                 top-0 left-0 right-0 bottom-0 bg-black/30 rounded-[8px]
                place-content-center place-items-center overflow-hidden`}>

                    <div className={`relative max-w-[600px] h-fit w-full bg-white mx-2
                        rounded-[40px] overflow-x-hidden overflow-y-hidden z-[3000]`}
                        onClick={(event) => {
                            event.preventDefault()
                        }}
                    >
                        <CloseButton setShow={setDialog} />
                        <div className={`pt-12 pb-4 px-3 text-2xl font-semibold`}>
                            Add Video
                        </div>

                        {/** video link */}
                        <div className={`flex mb-3 flex-col mx-3 `}>
                            <div className={`text-[15px] pt-1 pb-1`}>Paste a Youtube video link</div>
                            <div className={`flex place-content-between place-items-center gap-x-4`}>
                                <div className={`grow`}>
                                    <input
                                        id="videolink"
                                        type="text"
                                        defaultValue={videoSrc}
                                        placeholder="Enter Video Link"
                                        className={`w-full border-[1px] border-gray-300 bg-gray-100 px-3 py-2 outline-none rounded-lg text-xl`}
                                        onKeyUp={(e: any) => {
                                            handleVideoUrlKeyUp(e.target.value);
                                        }}
                                    />
                                </div>
                                <div>
                                    <button
                                        onClick={() => handleVerify()}
                                        disabled={videoUrlState ? false : true}
                                        className={`${videoUrlState ? 'bg-blue-800' : 'bg-blue-300'} ${videoVerified && 'hidden'} text-white px-3 py-2.5 rounded-md
                                    shadow-md `}
                                    >
                                        Verify
                                    </button>
                                </div>
                            </div>


                        </div>
                        <div className={`relative w-full h-[300px] overflow-y-auto`}>
                            <div className={`relative w-full h-full bg-black`}>
                                <div className={` relative w-full h-full`}>
                                    <iframe id="yt-iframe"
                                        src={videoSrc ? `https://www.youtube.com/embed/${videoId}` : undefined}
                                        className="absolute top-0 left-0 w-full h-full bg-black"

                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    >
                                    </iframe>
                                </div>
                            </div>



                            {/** video title */}

                            <div className={`flex mb-1 flex-col mx-3 `}>
                                <div className={`text-[15px] pl-1 pt-3 pb-1`}>
                                    Title</div>
                                <input
                                    id="videotitle"
                                    defaultValue={videoTitle}
                                    type="text"
                                    placeholder="Enter Video Title"
                                    className={`w-full border-[1px] border-gray-300 bg-gray-100 px-3 py-4 outline-none rounded-lg text-xl`}
                                />

                            </div>

                            { /** description */}
                            <div className={`flex mb-1 flex-col mx-3 `}>
                                <div className={`text-[15px] pl-1 pt-3 pb-1`}>
                                    Description</div>
                                <textarea
                                    id='videodescr'
                                    defaultValue={videoDescription}
                                    placeholder={`Enter video description.`}
                                    className={`w-full border-[1px] border-gray-300 bg-gray-100 px-3 py-4 outline-none rounded-lg text-xl`}
                                ></textarea>
                            </div>

                            <div className={`flex place-content-end px-6 gap-2 py-6`}>
                                <button
                                    onMouseDown={() => window.location.reload()}
                                    className={`bg-gray-800 text-white px-3 py-1.5 rounded-md
                                    shadow-md`}
                                >
                                    Reload
                                </button>
                                <button
                                    onMouseDown={() => handleCloseDialog()}
                                    className={`bg-gray-800 text-white px-3 py-1.5 rounded-md
                                    shadow-md`}
                                >
                                    Close
                                </button>

                                <button
                                    onClick={() => handleSubmit()}
                                    disabled={!videoVerified ? true : false}

                                    className={`bg-blue-800 text-white px-3 py-1.5 rounded-md
                                    shadow-md `}
                                >
                                    {!videoVerified ? 'Click verify above' : 'Submit'}
                                </button>


                            </div>
                        </div>
                    </div>
                </div>
            }
            {children}
        </EditVideoDialogContext.Provider>
    )
}


export interface CloseButtonProps {
    setShow: (show: boolean) => void
}
export const CloseButton = ({ setShow }: CloseButtonProps) => {
    return (
        <div className={`absolute top-8 right-6 text-3xl  rounded-xl  w-[40px] h-[40px] shadow-sm flex place-items-center place-content-center cursor-pointer bg-gray-200/70 hover:border-gray-200/50 text-gray-400 hover:text-gray-500 z-10`}
            onClick={() => setShow(false)}
        >
            <CgClose />
        </div>
    )
}
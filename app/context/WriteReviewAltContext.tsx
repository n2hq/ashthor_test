import { createContext, useContext, useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from "react-hook-form";
import { ListingType } from "~/lib/types";
import { useAuth } from "./AuthContext";

const WriteReviewAltContext = createContext<any | null>(null)
export default WriteReviewAltContext

export type ReviewType = {
    showDialog: (dialog: boolean) => void
    setListing: (listing: ListingType) => void
}

export const useWriteReviewAltContext = () => {
    const ctx: ReviewType = useContext(WriteReviewAltContext)
    if (ctx) {
        return ctx
    }
    return null
}



export const WriteReviewAltProvider = ({ children }: any) => {
    const [dialog, showDialog] = useState(false)
    const [listing, setListing] = useState<ListingType>()


    let vals = {
        showDialog,
        setListing
    }

    return (
        <WriteReviewAltContext.Provider value={vals}>
            {
                dialog &&
                <div>
                    <div className={`w-full h-full fixed bg-white top-0 left-0 z-[3000]`}
                    >
                        <WriteReivewAltForm listing={listing} />
                    </div>
                </div>
            }
            {children}
        </WriteReviewAltContext.Provider>
    )
}

export const CloseHandle = () => {
    const wrCxt = useWriteReviewAltContext()

    return (
        <div className={`w-[30px] h-[30px] rounded-full bg-white border place-items-center place-content-center cursor-pointer text-3xl`}
            onClick={() => wrCxt?.showDialog(false)}
        >
            <BiChevronLeft />
        </div>
    )
}

const universalSet = {
    'quality': 'Quality of product/service',
    'customer_service': 'Customer service experience',
    'communication': 'Clarity and responsiveness',
    'value': 'Value for money',
    'overall_satisfaction': 'Overall satisfaction',
};

const formFields = {
    QUALITY: 'quality',
    CUSTOMER_SERVICE: 'customer_service',
    COMMUNICATION: 'communication',
    VALUE: 'value',
    OVERALL_SATISFACTION: 'overall_satisfaction'
}

export const ReviewSchema = z.object({
    quality: z.string({ message: 'Please rate qualify of product or service' })
        .min(1, 'Please rate qualify of product or service'),
    customer_service: z.string({ message: 'Please rate customer service experience' })
        .min(1, 'Please rate accuracy'),
    communication: z.string({ message: 'Please rate communication' })
        .min(1, 'Please rate communication'),
    value: z.string({ message: 'Please rate value for money' })
        .min(1, 'Please rate value for money'),
    overall_satisfaction: z.string({ message: 'Please rate your overall satisfaction' })
        .min(1, 'Please rate your overall satisfaction'),
    title: z.string({ message: 'Please enter title' })
        .min(1, 'Please enter title'),
    experience: z.string({ message: 'Please enter experience' })
        .min(1, 'Please write your experience'),
    avgRating: z.any(),
    businessGuid: z.any(),
    userGuid: z.any()
})

type FormData = z.infer<typeof ReviewSchema>;

interface WriteReviewAltProps {
    listing: ListingType | undefined
}
export const WriteReivewAltForm = ({ listing }: WriteReviewAltProps) => {
    const STORAGE_KEY = 'REVIEW_FORM_DATA';
    const auth = useAuth()


    const initVals: FormData = {
        'title': '',
        'experience': '',
        'quality': '',
        'customer_service': '',
        'communication': '',
        'value': '',
        'overall_satisfaction': '',
        'avgRating': '',
        'businessGuid': '',
        'userGuid': ''
    };

    const getStoredData = (): FormData => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : initVals;
        } catch {
            return initVals;
        }
    };

    const {
        register,
        handleSubmit,
        watch,
        reset,
        clearErrors, // Add clearErrors
        formState: { errors, isSubmitting, isDirty }
    } = useForm<FormData>({
        resolver: zodResolver(ReviewSchema),
        defaultValues: getStoredData(),
        mode: 'onChange', // Add this to validate on change
    })

    const handleClearForm = () => {
        localStorage.removeItem(STORAGE_KEY);
        clearErrors(); // Clear all errors
        reset(initVals); // Reset to initial values
    };

    const doSubmit = async (data: FormData) => {

        const {
            quality,
            customer_service,
            communication,
            value,
            overall_satisfaction
        } = data;

        const avgRating = (parseInt(quality) +
            parseInt(customer_service) +
            parseInt(communication) +
            parseInt(value) +
            parseInt(overall_satisfaction)) / 5

        data.avgRating = avgRating
        data.businessGuid = listing?.gid
        data.userGuid = auth?.user.guid

        console.log('Submitting:', data);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            //alert('Review submitted successfully!');

            // ✅ Clear localStorage and reset form
            localStorage.removeItem(STORAGE_KEY);
            clearErrors(); // Clear all errors
            reset(initVals); // Reset form to initial values

            //reload after submission

        } catch (error) {
            console.error('Submission error:', error);
            alert('Failed to submit review');
        }
    }

    const formValues = watch();

    useEffect(() => {
        // Only save if form is dirty (has changes)
        if (isDirty) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(formValues));
        }
    }, [formValues, isDirty]);

    return (
        <div className={`w-full h-full flex place-items-center place-content-center`}>
            <div className={`max-w-full mx-auto w-full h-[100%]`}>
                <div className={`flex bg-orange-100 py-6 px-5 place-items-center gap-3`}>
                    <CloseHandle />
                    <div className={`text-2xl `}>
                        Tell us, how was your experience at <span className={`text-[18px] font-bold`}>{listing?.title}</span>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit(doSubmit)}
                    className={`h-[100%] overflow-y-auto px-[20px]`}>
                    <div className={`lg:max-w-[80%] mx-auto w-full mt-12`}>

                        <div className={`mt-12 `}>
                            Review Title {errors.title && <span className="text-red-500">*</span>}
                            <div className={`text-2xl mb-4`}>
                                Title of Review?
                            </div>
                            <input
                                type="text"
                                {...register('title')}
                                placeholder={`Enter title of review.`}
                                className={`w-full bg-gray-100 p-6 rounded-2xl outline-none text-xl ${errors.title ? 'border-2 border-red-500' : ''
                                    }`}
                            />
                            {errors.title && <p className="text-red-500 text-lg mt-2">{errors.title.message?.toString()}</p>}
                        </div>

                        <div className={`mt-12`}>
                            <div className={`border-b text-2xl font-bold`}>
                                Ratings
                            </div>
                            <div className={` md:px-8 `}>
                                <RadioInput
                                    question="1. How would you rate the quality of product/service?"
                                    controlName={formFields.QUALITY}
                                    error={errors.quality}
                                    register={register}
                                />
                                <RadioInput
                                    question="2. Did you have a good customer service?"
                                    controlName={formFields.CUSTOMER_SERVICE}
                                    error={errors.customer_service}
                                    register={register}
                                />
                                <RadioInput
                                    question="3. How well did they communicate with you?"
                                    controlName={formFields.COMMUNICATION}
                                    error={errors.communication}
                                    register={register}
                                />
                                <RadioInput
                                    question="4. Is it worth your money and time visiting this business?"
                                    controlName={formFields.VALUE}
                                    error={errors.value}
                                    register={register}
                                />
                                <RadioInput
                                    question="5. How would you rate overall satisfaction?"
                                    controlName={formFields.OVERALL_SATISFACTION}
                                    error={errors.overall_satisfaction}
                                    register={register}
                                />
                            </div>
                        </div>

                        <div className={`mt-12`}>
                            <div className={`text-2xl mb-3`}>
                                Write your experience.
                            </div>
                            <textarea
                                {...register('experience')}
                                placeholder={`Write your review of this place.`}
                                className={`w-[100%] h-[300px] bg-gray-100 rounded-2xl border p-8 text-xl ${errors.experience ? 'border-2 border-red-500' : ''
                                    }`}
                            />
                            {errors.experience &&
                                <p className="text-red-500 text-lg mt-2">
                                    {errors?.experience?.message?.toString()}
                                </p>
                            }
                        </div>

                        <div className={`mt-12`}>
                            <button
                                type="submit"
                                className={`bg-gray-900 w-[200px] py-5 rounded-full text-white text-2xl hover:bg-gray-800`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>

                            <button
                                type="button"
                                onClick={handleClearForm}
                                className={`ml-4 bg-gray-300 w-[200px] py-5 rounded-full text-gray-800 text-2xl hover:bg-gray-400`}
                            >
                                Clear Form
                            </button>
                        </div>

                        <div className={`h-[200px]`}></div>
                    </div>
                </form>
            </div>
        </div>
    )
}

interface RadioInputProps {
    question?: string
    controlName: string
    error: any
    register: any
}

export const RadioInput = ({ question, register, controlName, error }: RadioInputProps) => {
    // Remove local state for error - use the error from react-hook-form directly
    const ratings = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

    return (
        <div className={`mt-12`}>
            <div className={`text-2xl `}>
                {question}
            </div>

            <div className={`flex flex-col w-full md:w-fit`}>
                <div className={`grid grid-cols-5 gap-4 mt-4 w-full md:w-fit `}>
                    {ratings.map((item, index: number) => {
                        const value = (index + 1).toString();

                        return (
                            <div key={index} className={`flex flex-col place-items-center  md:w-[100px] border border-gray-200 rounded-lg py-1 lg:py-2 bg-gray-50 group hover:cursor-pointer`}>
                                <span className={`font-semibold`}>
                                    {value}
                                </span>
                                <label className="relative cursor-pointer">
                                    <input
                                        type="radio"
                                        {...register(controlName)}
                                        value={value}
                                        className={`w-[30px] h-[30px] border border-gray-500 rounded-full appearance-none
                                            checked:bg-green-700 checked:border-green-700
                                            focus:outline-none focus:ring-2 focus:ring-green-300
                                            transition-all duration-200
                                            group-hover:cursor-pointer
                                        `}
                                    />
                                </label>
                                <div className={`w-full text-center`}>
                                    {item}
                                </div>
                            </div>
                        )
                    })}
                </div>
                {error && (
                    <p className={`text-red-500 mt-3 text-lg bg-gray-100 py-2 px-2 rounded-md`}>
                        {error.message?.toString()}
                    </p>
                )}
            </div>
        </div>
    )
}
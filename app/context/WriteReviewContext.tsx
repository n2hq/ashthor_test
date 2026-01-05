import { createContext, useContext, useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";

const WriteReviewContext = createContext<any | null>(null)
export default WriteReviewContext

export const useWriteReviewContext = () => {
    const ctx = useContext(WriteReviewContext)
    if (ctx) {
        return ctx
    }
    return null
}

export const WriteReviewProvider = ({ children }: any) => {
    const [dialog, showDialog] = useState(false)

    let vals = {
        showDialog
    }

    return (
        <WriteReviewContext.Provider value={vals}>
            {
                dialog &&
                <div>
                    <div className={`w-full h-full fixed bg-white top-0 left-0 z-[3000]`}
                    >


                        <WriteReivewForm />

                    </div>
                </div>
            }
            {children}
        </WriteReviewContext.Provider>
    )
}

export const CloseHandle = () => {
    const wrCxt = useWriteReviewContext()

    return (
        <div className={`w-[30px] h-[30px] rounded-full bg-white border place-items-center place-content-center cursor-pointer text-3xl`}
            onClick={() => wrCxt.showDialog(false)}
        >
            <BiChevronLeft />
        </div>
    )
}

interface FormErrors {
    title?: string;
    experience?: string;
    cleanliness?: string;
    accuracy?: string;
    communication?: string;
    checkin?: string;
    value?: string;
}

export const WriteReivewForm = () => {
    const controlName1 = "cleanliness"
    const controlName2 = "accuracy"
    const controlName3 = "communication"
    const controlName4 = "checkin"
    const controlName5 = "value"

    const [cleanliness, setCleanliness] = useState(localStorage.getItem(controlName1) || '')
    const [accuracy, setAccuracy] = useState(localStorage.getItem(controlName2) || '')
    const [communication, setCommunication] = useState(localStorage.getItem(controlName3) || '')
    const [checkin, setCheckin] = useState(localStorage.getItem(controlName4) || '')
    const [value, setValue] = useState(localStorage.getItem(controlName5) || '')
    const [title, setTitle] = useState(localStorage.getItem('title') || '')
    const [experience, setExperience] = useState(localStorage.getItem('experience') || '')
    const [errors, setErrors] = useState<FormErrors>({});
    const [titleError, setTitleError] = useState<string>('')
    const [experienceError, setExperienceError] = useState<string>('')

    useEffect(() => {
        if (errors.title) {
            setTitleError(errors.title)
        }
        if (errors.experience) {
            setExperienceError(errors.experience)
        }
    }, [errors.title, errors.experience])

    const validateForm = () => {
        const newErrors: FormErrors = {};

        if (!title.trim()) newErrors.title = 'Title is required';
        if (!experience.trim()) newErrors.experience = 'Experience description is required';
        if (!cleanliness) newErrors.cleanliness = 'Please rate cleanliness';
        if (!accuracy) newErrors.accuracy = 'Please rate accuracy';
        if (!communication) newErrors.communication = 'Please rate communication';
        if (!checkin) newErrors.checkin = 'Please rate check-in';
        if (!value) newErrors.value = 'Please rate value';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: any) => {
        e.preventDefault()

        validateForm()

        const avgRating = (parseInt(cleanliness) +
            parseInt(accuracy) +
            parseInt(communication) +
            parseInt(checkin) +
            parseInt(value)) / 5

        const timeSubmitted = new Date().toISOString()

        const formData = {
            title,
            experience,
            ratings: { cleanliness, accuracy, communication, checkin, value },
            averageRating: avgRating,
            submittedAt: timeSubmitted
        };

        console.log('Form Data:', formData);

        try {
            //api call

            //reset form
            setCleanliness('');
            setAccuracy('');
            setCommunication('');
            setCheckin('');
            setValue('');
            setTitle('');
            setExperience('');
            setErrors({});

            localStorage.setItem(controlName1, "")
            localStorage.setItem(controlName2, "")
            localStorage.setItem(controlName3, "")
            localStorage.setItem(controlName4, "")
            localStorage.setItem(controlName5, "")
            localStorage.setItem("title", "")
            localStorage.setItem("experience", "")

        } catch (e: any) {

        }
    }

    useEffect(() => {

    }, [cleanliness, accuracy, communication, checkin, value, title, experience])

    return (
        <div className={`w-full h-full flex place-items-center place-content-center`}>

            <div className={`max-w-full mx-auto w-full h-[100%]`}>
                <div className={`flex bg-orange-100 py-6 px-5 place-items-center gap-3`}>
                    <CloseHandle />
                    <div className={`text-[22px] `}>
                        Reviewing Microsoft Delaware
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className={`h-[100%] overflow-y-auto px-[20px]`}>
                    <div className={`md:max-w-[70%] mx-auto w-full mt-12`}>

                        <div className={`mt-12 `}>
                            Review Title {errors.title && <span className="text-red-500">*</span>}
                            <div className={`text-2xl mb-4`}>
                                Title of Review?
                            </div>
                            <input
                                type="text"
                                placeholder={`Enter title of review.`}
                                className={`w-full bg-gray-100 p-6 rounded-2xl outline-none text-xl`}
                                value={title || localStorage.getItem("title")?.toString()}
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                    localStorage.setItem("title", e.target.value)
                                    if (titleError) {
                                        setTitleError('')
                                    }
                                }}
                            />
                            {titleError && <p className="text-red-500 text-lg">{titleError}</p>}
                        </div>

                        <div className={`mt-12`}>
                            <div className={`border-b text-2xl font-bold`}>
                                Ratings
                            </div>
                            <div className={` px-8 `}>
                                <RadioInput
                                    question="1. How would you rate cleanliness?"
                                    controlName={controlName1}
                                    controlValue={cleanliness}
                                    setControlValue={setCleanliness}
                                    error={errors.cleanliness}
                                />
                                <RadioInput
                                    question="2. How would you rate accuracy?"
                                    controlName={controlName2}
                                    controlValue={accuracy}
                                    setControlValue={setAccuracy}
                                    error={errors.accuracy}
                                />


                                <RadioInput
                                    question="3. How would you rate communication?"
                                    controlName={controlName3}
                                    controlValue={communication}
                                    setControlValue={setCommunication}
                                    error={errors.communication}
                                />


                                <RadioInput
                                    question="4. How would you rate checkin?"
                                    controlName={controlName4}
                                    controlValue={checkin}
                                    setControlValue={setCheckin}
                                    error={errors.checkin}
                                />


                                <RadioInput
                                    question="5. How would you rate value?"
                                    controlName={controlName5}
                                    controlValue={value}
                                    setControlValue={setValue}
                                    error={errors.value}
                                />

                            </div>
                        </div>


                        <div className={`mt-12`}>
                            <div className={`text-2xl mb-3`}>
                                Write your experience.</div>
                            <textarea
                                value={experience || localStorage.getItem("experience")?.toString()}
                                onChange={(e) => {
                                    setExperience(e.target.value)
                                    localStorage.setItem("experience", e.target.value?.toString())
                                    if (experienceError) {
                                        setExperienceError('')
                                    }
                                }}
                                className={`w-[100%] h-[300px] bg-gray-100 rounded-2xl border p-8 text-xl`}
                            />
                            {experienceError && <p className="text-red-500 text-lg">{experienceError}</p>}
                        </div>

                        <div className={`mt-12`}>
                            <button type="submit" className={`bg-gray-900 w-[200px] py-5 rounded-full text-white text-2xl`}>
                                Submit
                            </button>
                        </div>

                        <div className={`h-[200px]`}>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

interface RadioInputProps {
    question?: string
    controlName: string
    error?: string
    controlValue: string
    setControlValue: (val: string) => void
}

export const RadioInput = ({ question, controlName, error, controlValue, setControlValue }: RadioInputProps) => {
    const [fieldError, setFieldError] = useState<string>('')
    useEffect(() => {
        if (error) {
            setFieldError(error)
        }
    }, [error])
    return (
        <div className={`mt-12`}>
            <div className={`text-2xl `}>
                {question}
            </div>

            <div className={`flex flex-col w-fit`}>
                <div className={`flex gap-8 mt-4 w-fit `}>
                    {
                        ["Excellent", "Very Good", "Good", "Manageable", "Bad"].map((item, index: number) => {
                            return (
                                <div key={index} className={`flex flex-col place-items-center`}>
                                    <span className={`font-semibold`}>
                                        {index + 1}
                                    </span>
                                    <input
                                        type="radio"
                                        name={controlName}
                                        checked={controlValue === (index + 1).toString()}
                                        value={index + 1}
                                        className={`w-[30px] h-[30px] border border-gray-500 rounded-full bg-green-700`}
                                        onChange={(e) => {
                                            setControlValue(e.target.value)
                                            localStorage.setItem(controlName, e.target.value.toString())
                                            if (fieldError) {
                                                setFieldError('')
                                            }
                                        }}
                                    />

                                    <span>
                                        {item}
                                    </span>

                                </div>
                            )
                        })
                    }

                </div>
                {fieldError && <p className={`text-red-500 mt-3 text-lg bg-gray-100 py-2 px-2 rounded-md`}>{fieldError}</p>}
            </div>

        </div>
    )
}
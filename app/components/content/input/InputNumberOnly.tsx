import React, { useEffect, useState } from 'react'
import { MdError } from 'react-icons/md'
import { controlInformationClass, inputClass, inputClassError, inputControlWrapper, inputHeadingClass } from '~/lib/css'
import { formatDecimalWithCommas, formatNumber } from '~/lib/lib';

const formatWithCommas = (numStr: string) => {
    if (!numStr) return '';
    // Remove existing commas and non-digits
    const clean = numStr.replace(/[^0-9]/g, '');
    if (!clean) return '';

    // Only format when we have at least 4 digits (1,000)
    if (clean.length <= 3) return clean;

    // Format with commas
    return clean.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};


const getCleanDecimal = (value: string) => {
    // Remove everything except digits and dot
    let clean = value.replace(/[^0-9.]/g, '');

    // If the value is just a dot, allow it
    if (clean === '.') return clean;

    // Allow only one dot
    const firstDotIndex = clean.indexOf('.');
    if (firstDotIndex !== -1) {
        clean =
            clean.slice(0, firstDotIndex + 1) +
            clean.slice(firstDotIndex + 1).replace(/\./g, '');
    }

    // Split into integer & decimal parts
    const [integer, decimal] = clean.split('.');

    // Limit decimal places to 2 (only if decimal exists)
    if (decimal !== undefined) {
        return `${integer}.${decimal.slice(0, 2)}`;
    }

    return clean;
};





const InputNumberOnly = ({
    controlName,
    controlType,
    controlPlaceholder,
    controlTitle,
    controlInformation,
    register,
    changeHandler,
    error,
    width,
    disabled = false
}: any) => {

    const [wrapperWidth, setWrapperWidth] = useState('')
    const [inputWidth, setInputWidth] = useState(width)

    useEffect(() => {
        if (inputWidth > 0) {
            if (inputWidth === 100) {
                setWrapperWidth(`xl:w-full`)
            } else {
                setWrapperWidth(`xl:w-[${inputWidth}%]`)
            }
        }
    }, [inputWidth])
    return (
        <>
            <div className={inputControlWrapper}>
                <div className={inputHeadingClass}>
                    <div className={`mb-0 text-xl`}>
                        {controlTitle}
                    </div>
                    {
                        controlInformation?.length > 1 && <div className={controlInformationClass}>
                            {controlInformation}
                        </div>
                    }
                </div>

                <div className={`w-[100%]`}>
                    <input
                        {...register(controlName, {
                            onChange: (e: any) => {
                                const value = e.target.value

                                const raw = formatDecimalWithCommas(value)



                                e.target.value = raw;

                                changeHandler(e)
                            },

                        })}
                        type={controlType ? controlType : 'text'}
                        className={`${inputClass} ${disabled && 'bg-gray-200/80'}`}
                        placeholder={controlPlaceholder}
                        disabled={disabled}
                        onLoad={(e: any) => {
                            const value = e.target.value

                            alert(value)

                            const raw = formatDecimalWithCommas(value)

                            const formatted = formatWithCommas(raw)

                            e.target.value = raw;
                        }}
                    />

                    {
                        error &&
                        (
                            <div className={`${inputClassError}`}>
                                <MdError className='text-lg' />
                                {error.message}
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default InputNumberOnly

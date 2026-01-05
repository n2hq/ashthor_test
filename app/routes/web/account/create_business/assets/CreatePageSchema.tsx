import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'




const phoneRegex = new RegExp(/^(?:\+1)?\s?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/);
const zipcoderegex = new RegExp(/(^\d{5}$)|(^\d{5}-\d{4}$)/)

const getMaxWords = (wordsInput: any, maxWords: any) => {


    let reconstruct = ""
    let wordsLength = 0
    let testWordLength = wordsInput.length

    if (testWordLength > 0) {

        let trimmedText = wordsInput.trim()

        let words = trimmedText.split(" ")
        wordsLength = words.length


        for (let i = 0; i < maxWords; i++) {
            let word = words[i]

            if (i < wordsLength) {
                if (i == (maxWords - 1)) {
                    reconstruct += word
                } else {
                    reconstruct += word + " "
                }
            }
        }
    }

    return wordsLength
}

function isValidPostalCode(postalCode: any, countryCode: any) {
    let postalCodeRegex
    switch (countryCode) {
        case "US":
            postalCodeRegex = /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/;

            break;
        case "CA":
            postalCodeRegex = /^([A-Z][0-9][A-Z])\s*([0-9][A-Z][0-9])$/;
            break;
        default:
            postalCodeRegex = /^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/;
    }
    return postalCodeRegex.test(postalCode);
}

const CreatePageSchema = z.object({
    title: z.string()
        .min(1, { message: "Enter a business name" })
        .min(3, { message: "Busines Name must not be less than 3 characters" })
        .max(100, { message: "Business name must not be more than 100 characters." }),

    pagetype: z.string({ message: "Please select page type" })
        .min(1, { message: "Please select page type" }),

    category: z.string()
        .min(1, { message: "Please select a business category." }),

    country_code: z.string({ message: "Please select a country" })
        .min(1, { message: "Please enter a country code." }),

    state_code: z.any(),

    city_id: z.any(),

    zipcode: z.string()
        .max(7, { message: "Zipcode must not be more than 7 characters" })
        .optional()
        .or(z.literal("")), // allow empty string

    short_description: z
        .string()
        .refine(
            (val) => {
                const words = val.trim().split(/\s+/).filter(Boolean)
                return words.length >= 30
            },
            { message: 'You must write at least 30 words.' }
        )
        .refine(
            (val) => {
                const words = val.trim().split(/\s+/).filter(Boolean)
                return words.length <= 60
            },
            { message: 'You can only write up to 60 words.' }
        ),

    email_address: z.string({ message: "Please enter an email." })
        .min(1, { message: "Email must not be empty" })
        .email({ message: "Please enter a valid email" }),

    phone: z
        .string()
        .max(30, { message: "Phone must not be more than 30 characters" })
        .optional()
        .nullable()
        .refine(
            (val) => !val || val.trim().length > 0,
            { message: "Phone must not be empty" }
        ),
    address_one: z.string({ message: "Please enter an address" })
        .min(3, { message: "Address must not be less than 3 characters" })
        .max(100, { message: "Address must not be more than 100 characters" }),

    address_two: z.any(),

    /* established: z.string({ message: "Please enter year established" })
        .min(4, { message: "Year must be at least 4 characters" }) */

    established: z
        .string()
        .optional()
        .refine(
            (val) => !val || (/^\d{1,4}$/.test(val)),
            { message: "Must be only numbers and not more than 4 digits" }
        ),

    minimum_amount_currency_code: z.any(),
    minimum_amount: z.any()


}).superRefine((data, ctx) => {

    if (data?.address_two?.length !== 0) {
        if (data?.address_two?.length < 3) {

            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['address_two'],
                message: 'Enter a minimum of 3 characters',
            });
        }
    }




})


export default CreatePageSchema

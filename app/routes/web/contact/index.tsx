import React from 'react'
import { appConfig, config, generateRandom10DigitNumber, logError } from '~/lib/lib'
import SearchLayoutMain from '~/routes/asset/SearchLayoutMain'
import VerticalHeight from '~/routes/asset/VerticalHeight'
import CallToActionSection from '~/components/content/CallToActionSection'
import FooterSection from '~/routes/landing/assets/FooterSection'
import FooterAlt from '~/components/footer/FooterAlt'
import SearchLayout from '~/routes/asset/SearchLayout'
import { LoaderFunction } from '@remix-run/node'
import { MetaFunction } from '@remix-run/react'

export const loader: LoaderFunction = async ({ request, params }) => {

    try {
        let randomNumber
        try {
            randomNumber = generateRandom10DigitNumber()
            //console.log(latestBusinesses)

        } catch (error: any) {
            console.log(error.message)
        }

        return {
            randomNumber: randomNumber
        }
    } catch (err: any) {
        logError(err)
    }

}

export const meta: MetaFunction<typeof loader> = ({ data }) => {

    let randomNo = data?.randomNumber
    try {



        return [
            { title: "Bycet Contact - Online Business Directory, Explore Listings Around The World" },
            { name: "description", content: "Discover and connect with businesses worldwide. Bycet.com helps you explore listings, find services, and grow your network across industries and countries." },
            { name: "keywords", content: "Business Directory Service, Location Services" },
            { property: "fb:app_id", content: "1325393508603168" },
            { property: "og:url", content: "https://bycet.com/web/contact" },
            { property: "og:type", content: "website" },
            { property: "og:title", content: "Bycet Contact - Online Business Directory, Explore Listings Around The World" },
            { property: "og:description", content: "Discover and connect with businesses worldwide. Bycet.com helps you explore listings, find services, and grow your network across industries and countries." },
            { property: "og:image", content: `https://bycet.com/images/bycet.png?v=${randomNo}` },
            { property: "og:image:secure_url", content: `https://bycet.com/images/bycet.png?v=${randomNo}` },
            { property: "og:image:type", content: "image/png" },
            { property: "og:image:width", content: "1200" },
            { property: "og:image:height", content: "630" },
            { property: "og:image:alt", content: "Bycet" },
            { name: "twitter:site", content: "@bycetinc" },
            { name: "twitter:creator", content: "@bycetinc" },
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:title", content: "Bycet Contact - Online Business Directory, Explore Listings Around The World" },
            { name: "twitter:description", content: "Discover and connect with businesses worldwide. Bycet.com helps you explore listings, find services, and grow your network across industries and countries." },
            { name: "twitter:image", content: `https://bycet.com/images/bycet.png?v=${randomNo}` },
            { name: "twitter:image:alt", content: "Bycet Business Directory Logo" }
        ];
    } catch (e: any) {
        logError(e)
    }

    return []
};

const index = () => {
    return (
        <SearchLayout>
            <div className={`max-w-[1100px] mx-auto w-full mt-[30px]`}>
                <div className={`grid md:grid-cols-12 gap-4 `}>
                    <div className={` md:col-span-7  px-[15px]`}>
                        <InfoContact />
                    </div>
                    <div className={`md:col-span-5 w-full`}>

                    </div>
                </div>

            </div>
            <VerticalHeight />
            <VerticalHeight />
            <VerticalHeight />

        </SearchLayout>
    )
}

export default index

export const InfoContact = () => {
    return (
        <div className={`markdown prose dark:prose-invert w-full break-words light space-y-4 text-[13px]`}>

            <h2 data-start="208" data-end="235" className={`text-xl`}>
                <strong data-start="211" data-end="235"
                    className={`text-2xl`}
                >
                    Contact Us
                </strong>
            </h2>

            <p data-start="272" data-end="485">
                <strong data-start="283" data-end="302">{config.SITENAME}</strong> Support and Technical team are  available Monday to Sunday, 09:00 to 18:00 Central European Time.
            </p>
            <hr data-start="487" data-end="490" />

            <p className={`text-lg underline`}>
                {config.SITENAME} Support
            </p>

            <ul>
                <li className={`flex gap-4`}>
                    <span className={`font-bold`}>
                        Email:
                    </span>
                    <span>
                        {config.SITEMAIL}
                    </span>
                </li>

            </ul>

            <hr />
            <h3>
                <span
                    className={`text-xl text-blue-500 `}
                >
                    Claim Your Business
                </span>
            </h3>
            <p className={``}>
                To claim your business, please sign up and then send an email to <span>{config.SITEMAIL}</span>.
            </p>




        </div>
    )
}

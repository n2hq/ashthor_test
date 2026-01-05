import React from 'react'
import { appConfig, config } from '~/lib/lib'
import VerticalHeight from '~/routes/asset/VerticalHeight'
import CallToActionSection from '~/components/content/CallToActionSection'
import FooterSection from '~/routes/landing/assets/FooterSection'
import SearchLayoutMain from '~/routes/asset/SearchLayoutMain'
import FooterAlt from '~/components/footer/FooterAlt'
import SearchLayout from '~/routes/asset/SearchLayout'

const index = () => {
    return (
        <SearchLayout>
            <div className={`max-w-[1100px] mx-auto w-full mt-[30px]`}>
                <div className={`grid md:grid-cols-12 gap-4 `}>
                    <div className={` md:col-span-7  px-[15px]`}>
                        <InfoTerms />
                    </div>
                    <div className={`md:col-span-5`}>

                    </div>
                </div>

            </div>
            <VerticalHeight />
            <FooterAlt />
        </SearchLayout>
    )
}

export default index

export const InfoTerms = () => {
    return (
        <div className={`markdown prose dark:prose-invert w-full break-words light space-y-4`}>

            <h2 data-start="208" data-end="235" className={`text-xl`}>
                <span data-start="211" data-end="235"
                    className={`text-3xl font-extrabold`}
                >Terms and Conditions</span>
            </h2>
            <p data-start="237" data-end="270">
                <strong data-start="237" data-end="256">Effective Date:</strong> 12 July 2025
            </p>
            <p data-start="272" data-end="485">
                Welcome to <strong data-start="283" data-end="302">{config.SITENAME}</strong>. We're glad to have you here! To ensure a safe and positive experience for everyone, we kindly ask that you review the terms below. By using our platform, you agree to the following:
            </p>
            <hr data-start="487" data-end="490" />
            <h3 data-start="492" data-end="522">
                <strong data-start="496" data-end="522">
                    1. Acceptance of Terms
                </strong>
            </h3>
            <p data-start="523" data-end="707">
                By accessing or using our platform, including browsing, registering, or listing a business, you confirm that you understand and agree to be bound by these Terms and our Privacy Policy.
            </p>
            <hr data-start="709" data-end="712" />
            <h3 data-start="714" data-end="738">
                <strong data-start="718" data-end="738">2. User Accounts</strong>
            </h3>
            <p data-start="739" data-end="965">
                When creating an account, we kindly ask that you provide accurate and up-to-date information. You are responsible for maintaining the confidentiality of your account details and for any activity that occurs under your account.
            </p>
            <hr data-start="967" data-end="970" />
            <h3 data-start="972" data-end="1000">
                <strong data-start="976" data-end="1000">
                    3. Business Listings</strong>
            </h3>
            <p data-start="1001" data-end="1086">
                We welcome listings from all legitimate businesses. To help ensure quality and trust:
            </p>
            <ul data-start="1088" data-end="1336">
                <li data-start="1088" data-end="1145">
                    <p data-start="1090" data-end="1145">
                        Please make sure your listings are truthful and lawful.
                    </p>
                </li>
                <li data-start="1146" data-end="1247">
                    <p data-start="1148" data-end="1247">
                        We may review and, if necessary, edit or remove any content that appears to violate our guidelines.
                    </p>
                </li>
                <li data-start="1248" data-end="1336">
                    <p data-start="1250" data-end="1336">
                        We appreciate your help in keeping our directory useful and trustworthy for all users.
                    </p>
                </li>
            </ul>
            <hr data-start="1338" data-end="1341" />
            <h3 data-start="1343" data-end="1366">
                <strong data-start="1347" data-end="1366">4. User Conduct</strong>
            </h3>
            <p data-start="1367" data-end="1431">
                We ask all users to be respectful and responsible. Please avoid:
            </p>
            <ul data-start="1433" data-end="1634">
                <li data-start="1433" data-end="1495">
                    <p data-start="1435" data-end="1495">Uploading content that is harmful, misleading, or offensive.
                    </p>
                </li>
                <li data-start="1496" data-end="1555">
                    <p data-start="1498" data-end="1555">Engaging in spam, impersonation, or any illegal activity.
                    </p>
                </li>
                <li data-start="1556" data-end="1634">
                    <p data-start="1558" data-end="1634">
                        Misusing the platform in any way that could affect the experience of others.
                    </p>
                </li>
            </ul>
            <hr data-start="1636" data-end="1639" />
            <h3 data-start="1641" data-end="1673">
                <strong data-start="1645" data-end="1673">
                    5. Intellectual Property
                </strong>
            </h3>
            <p data-start="1674" data-end="1874">
                All content, including our logo, platform design, and written materials, is the property of {config.SITENAME} or its partners. Please don’t reproduce, copy, or use it without our written permission.
            </p>
            <hr data-start="1876" data-end="1879" />
            <h3 data-start="1881" data-end="1903">
                <strong data-start="1885" data-end="1903">
                    6. Disclaimers
                </strong>
            </h3>
            <p data-start="1904" data-end="2120">
                While we strive to provide accurate and helpful information, we cannot guarantee the completeness or reliability of every business listing. We encourage users to independently verify business details before engaging.
            </p>
            <hr data-start="2122" data-end="2125" />
            <h3 data-start="2127" data-end="2153">
                <strong data-start="2131" data-end="2153">
                    7. Indemnification
                </strong>
            </h3>
            <p data-start="2154" data-end="2362">
                By using our platform, you agree to kindly hold harmless and indemnify {config?.SITENAME}, our team, and partners from any claims, damages, losses, or expenses (including reasonable legal fees) arising from:
            </p>
            <ul data-start="2364" data-end="2490">
                <li data-start="2364" data-end="2393">
                    <p data-start="2366" data-end="2393">
                        Your use of the platform,
                    </p>
                </li>
                <li data-start="2394" data-end="2427">
                    <p data-start="2396" data-end="2427">
                        Any violation of these Terms,

                    </p>
                </li>
                <li data-start="2428" data-end="2490">
                    <p data-start="2430" data-end="2490">
                        Any third-party rights infringed by your content or conduct
                    </p>
                </li>
            </ul>
            <p data-start="2492" data-end="2581">
                We hope this clause never becomes relevant, but it's important for everyone’s protection.
            </p>
            <hr data-start="2583" data-end="2586" />
            <h3 data-start="2588" data-end="2622">
                <strong data-start="2592" data-end="2622">
                    8. Limitation of Liability
                </strong>
            </h3>
            <p data-start="2623" data-end="2808">
                While we do our best to provide a reliable service, {config?.SITENAME} cannot be held liable for any direct or indirect damages resulting from the use or inability to use our platform.
            </p>
            <hr data-start="2810" data-end="2813" />
            <h3 data-start="2815" data-end="2842">
                <strong data-start="2819" data-end="2842">
                    9. Updates to Terms
                </strong>
            </h3>
            <p data-start="2843" data-end="3057">
                From time to time, we may update these Terms to reflect changes to our services or policies. We'll do our best to communicate these changes clearly. Continued use of the platform means you accept the revised Terms.
            </p>
            <hr data-start="3059" data-end="3062" />
            <h3 data-start="3064" data-end="3089">
                <strong data-start="3068" data-end="3089">
                    10. Governing Law
                </strong>
            </h3>
            <p data-start="3090" data-end="3181">
                These Terms shall be governed by and interpreted under the laws of the country in which {config.SITENAME} is based.
            </p>
            <hr data-start="3183" data-end="3186" />
            <p data-start="3188" data-end="3318">
                If you have any questions or suggestions about these Terms, we’d love to hear from you at <a href={`mailto:${config.SITEMAIL}`} className='text-blue-600'>{config.SITEMAIL}</a>. Thank you for being part of our community!
            </p>
            <hr data-start="3320" data-end="3323" />

        </div>
    )
}

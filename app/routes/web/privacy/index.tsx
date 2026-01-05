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
                        <InfoPrivacy />
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

export const InfoPrivacy = () => {
    return (
        <div className={`markdown prose dark:prose-invert w-full break-words light space-y-4`}>

            <h2 data-start="193" data-end="214" className={`text-xl`}>
                <span data-start="196" data-end="214"
                    className={`text-3xl font-extrabold`}
                ><i>P</i>rivacy Policy</span>
            </h2>
            <p data-start="216" data-end="249">
                <strong data-start="216" data-end="235">Effective Date:</strong> 23 Jul 2025
            </p>
            <p data-start="251" data-end="429">
                Thank you for trusting <strong data-start="274" data-end="293">{config?.SITENAME}</strong> with your information. Your privacy is important to us, and we’re committed to handling your data with care, respect, and transparency.
            </p>
            <hr data-start="431" data-end="434" />
            <h3 data-start="436" data-end="469">
                <strong data-start="440" data-end="469">
                    1. Information We Collect
                </strong>
            </h3>
            <p data-start="471" data-end="538">
                We may collect the following information when you use our platform:
            </p>
            <ul data-start="540" data-end="884">
                <li data-start="540" data-end="615">
                    <p data-start="542" data-end="615">
                        <strong data-start="542" data-end="562">Personal Details</strong>: such as your name, email address, and contact info.</p>
                </li>
                <li data-start="616" data-end="700">
                    <p data-start="618" data-end="700">
                        <strong data-start="618" data-end="642">Business Information</strong>: details you provide when listing or managing a business.
                    </p>
                </li>
                <li data-start="701" data-end="802">
                    <p data-start="703" data-end="802">
                        <strong data-start="703" data-end="717">Usage Data</strong>: information about how you interact with our platform (e.g., pages visited, clicks).
                    </p>
                </li>
                <li data-start="803" data-end="884">
                    <p data-start="805" data-end="884">
                        <strong data-start="805" data-end="823">Technical Data</strong>: like your IP address, browser type, and device information.
                    </p>
                </li>
            </ul>
            <hr data-start="886" data-end="889" />
            <h3 data-start="891" data-end="929">
                <strong data-start="895" data-end="929">2. How We Use Your Information</strong>
            </h3>
            <p data-start="931" data-end="958">We use your information to:</p>
            <ul data-start="960" data-end="1182" className={`pl-2`}>
                <li data-start="960" data-end="997">
                    <p data-start="962" data-end="997">
                        - Provide and maintain our services
                    </p>
                </li>
                <li data-start="998" data-end="1045">
                    <p data-start="1000" data-end="1045">
                        - Process business listings and user accounts
                    </p>
                </li>
                <li data-start="1046" data-end="1102">
                    <p data-start="1048" data-end="1102">
                        - Communicate with you (updates, support, newsletters)
                    </p>
                </li>
                <li data-start="1103" data-end="1147">
                    <p data-start="1105" data-end="1147">
                        - Improve our platform and user experience

                    </p>
                </li>
                <li data-start="1148" data-end="1182">
                    <p data-start="1150" data-end="1182">
                        - Comply with legal requirements

                    </p>
                </li>
            </ul>
            <p data-start="1184" data-end="1213">We will never sell your data.</p>
            <hr data-start="1215" data-end="1218" />
            <h3 data-start="1220" data-end="1264">
                <strong data-start="1224" data-end="1264">3. Cookies and Tracking Technologies</strong>
            </h3>
            <p data-start="1266" data-end="1313">We may use cookies and similar technologies to:

            </p>
            <ul data-start="1315" data-end="1409">
                <li data-start="1315" data-end="1337">
                    <p data-start="1317" data-end="1337">- Keep you logged in</p>
                </li>
                <li data-start="1338" data-end="1367">
                    <p data-start="1340" data-end="1367">- Understand usage patterns</p>
                </li>
                <li data-start="1368" data-end="1409">
                    <p data-start="1370" data-end="1409">- Improve functionality and performance</p>
                </li>
            </ul>
            <p data-start="1411" data-end="1476">You can control cookie settings through your browser preferences.</p>
            <hr data-start="1478" data-end="1481" />
            <h3 data-start="1483" data-end="1518">
                <strong data-start="1487" data-end="1518">4. Sharing Your Information</strong>
            </h3>
            <p data-start="1520" data-end="1570">
                We may share your information only when necessary:
            </p>
            <ul data-start="1572" data-end="1733">
                <li data-start="1572" data-end="1639">
                    <p data-start="1574" data-end="1639">
                        - With trusted service providers who help us operate our platform
                    </p>
                </li>
                <li data-start="1640" data-end="1676">
                    <p data-start="1642" data-end="1676">
                        - To comply with legal obligations
                    </p>
                </li>
                <li data-start="1677" data-end="1733">
                    <p data-start="1679" data-end="1733">
                        - If required to prevent fraud or protect our platform
                    </p>
                </li>
            </ul>
            <p data-start="1735" data-end="1806">
                We never share your data for advertising or marketing by third parties.
            </p>
            <hr data-start="1808" data-end="1811" />
            <h3 data-start="1813" data-end="1838">
                <strong data-start="1817" data-end="1838">
                    5. Data Retention
                </strong>
            </h3>
            <p data-start="1840" data-end="1897">We retain your information only for as long as necessary:</p>
            <ul data-start="1899" data-end="2033">
                <li data-start="1899" data-end="1935">
                    <p data-start="1901" data-end="1935">
                        - To provide you with our services</p>
                </li>
                <li data-start="1936" data-end="1982">
                    <p data-start="1938" data-end="1982">
                        - To fulfill legal or regulatory obligations</p>
                </li>
                <li data-start="1983" data-end="2033">
                    <p data-start="1985" data-end="2033">
                        - To resolve disputes and enforce our agreements</p>
                </li>
            </ul>
            <p data-start="2035" data-end="2080">You may request account deletion at any time.</p>
            <hr data-start="2082" data-end="2085" />
            <h3 data-start="2087" data-end="2109">
                <strong data-start="2091" data-end="2109">6. Your Rights</strong>
            </h3>
            <p data-start="2111" data-end="2133">You have the right to:</p>
            <ul data-start="2135" data-end="2326">
                <li data-start="2135" data-end="2191">
                    <p data-start="2137" data-end="2191">
                        - Access, correct, or delete your personal information</p>
                </li>
                <li data-start="2192" data-end="2246">
                    <p data-start="2194" data-end="2246">
                        - Withdraw consent for non-essential data processing</p>
                </li>
                <li data-start="2247" data-end="2278">
                    <p data-start="2249" data-end="2278">
                        - Request a copy of your data</p>
                </li>
                <li data-start="2279" data-end="2326">
                    <p data-start="2281" data-end="2326">Contact us with any privacy-related questions</p>
                </li>
            </ul>
            <p data-start="2328" data-end="2401">To make a request, please reach out to us at <strong data-start="2373" data-end="2400">{config?.SITEMAIL}</strong>.</p>
            <hr data-start="2403" data-end="2406" />
            <h3 data-start="2408" data-end="2427">
                <strong data-start="2412" data-end="2427">7. Security</strong>
            </h3>
            <p data-start="2429" data-end="2648">
                We take your privacy seriously and have implemented appropriate security measures to protect your data. However, no system is 100% secure, and we encourage you to use strong passwords and protect your login credentials.
            </p>
            <hr data-start="2650" data-end="2653" />
            <h3 data-start="2655" data-end="2684">
                <strong data-start="2659" data-end="2684">
                    8. Children's Privacy
                </strong>
            </h3>
            <p data-start="2686" data-end="2917">
                Our platform is intended for users aged 18 and above. We do not knowingly collect personal data from children under 13. If you believe a child has provided us with personal data, please contact us so we can take appropriate action.
            </p>
            <hr data-start="2919" data-end="2922" />
            <h3 data-start="2924" data-end="2957">
                <strong data-start="2928" data-end="2957">
                    9. Changes to This Policy
                </strong>
            </h3>
            <p data-start="2959" data-end="3174">
                We may update this Privacy Policy from time to time to reflect changes to our practices or legal requirements. We'll notify users of significant changes, and the updated version will always be available on our site.
            </p>
            <hr data-start="3176" data-end="3179" />
            <h3 data-start="3181" data-end="3203">
                <strong data-start="3185" data-end="3203">10. Contact Us</strong>
            </h3>
            <p data-start="3205" data-end="3294">
                If you have any questions or concerns about this Privacy Policy, feel free to contact us:
            </p>
            <p data-start="3296" data-end="3371">
                <strong data-start="3299" data-end="3309">Email:</strong> <a href={`mailto:${config?.SITEMAIL}.com`}>{config?.SITEMAIL}</a><br data-start="3331" data-end="3334" />
                🌐 <strong data-start="3337" data-end="3349">Website:</strong> <a href={`${config?.BASE_URL}/contact`}>{config?.BASE_URL}/contact</a>
            </p>
            <hr data-start="3373" data-end="3376" />
            <p data-start="3378" data-end="3557" data-is-last-node="" data-is-only-node="">Would you like me to turn this into a downloadable <code data-start="3429" data-end="3435">.txt</code> or <code data-start="3439" data-end="3444">.md</code> file? Or generate a version for Nigerian data compliance (NDPR) or GDPR if you’re targeting international users?</p>
        </div>
    )
}

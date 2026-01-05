import { config } from "~/lib/lib";

const ResponsibleDisclosurePolicy = () => {
    return (
        <div className="w-full  max-w-[1100px] mx-auto px-4 py-8">
            <div className={`max-w-[700px]`}>
                <h1 className="text-3xl tracking-normal font-extrabold text-gray-900 mb-6 first-letter:italic">Responsible Disclosure Policy</h1>
                <p className="text-gray-600 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

                <div className="space-y-8">
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">Our Commitment to Security</h2>
                        <p className="text-gray-600">
                            At <b>{config.SITENAME}</b>, we consider the security of our systems and our clients' data a top priority.
                            Despite our best efforts, vulnerabilities may still exist. We value the role that security
                            researchers and the wider community play in helping to keep our systems secure.
                        </p>
                    </section>
                    <hr />
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">Reporting Vulnerabilities</h2>
                        <p className="text-gray-600 mb-4">
                            If you discover a vulnerability, we would appreciate your help in disclosing it to us
                            in a responsible manner. Please act in good faith and follow these guidelines:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>Submit your findings to <strong>{config.SITEMAIL}</strong></li>
                            <li>Provide sufficient information to reproduce the vulnerability</li>
                            <li>Do not exploit the vulnerability beyond what is necessary to demonstrate it</li>
                            <li>Do not access, modify, or destroy data that does not belong to you</li>
                            <li>Give us a reasonable time to address the vulnerability before public disclosure</li>
                            <li>Do not use attacks on physical security, social engineering, or DDoS attacks</li>
                        </ul>
                    </section>
                    <hr />
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">What We Promise</h2>
                        <p className="text-gray-600 mb-3">
                            In return for your responsible disclosure, we commit to:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>Respond to your report within 3 business days with our assessment</li>
                            <li>Work diligently to resolve confirmed vulnerabilities in a timely manner</li>
                            <li>Keep you informed of our progress throughout the remediation process</li>
                            <li>Credit you as the discoverer (unless you prefer to remain anonymous)</li>
                            <li>Not take legal action against you provided you follow this policy</li>
                        </ul>
                    </section>
                    <hr />
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">Out of Scope Vulnerabilities</h2>
                        <p className="text-gray-600 mb-3">
                            The following issues are generally considered out of scope:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>Clickjacking on pages with no sensitive actions</li>
                            <li>Missing security headers that don't lead directly to a vulnerability</li>
                            <li>Theoretical vulnerabilities without practical exploitability</li>
                            <li>Denial of service attacks</li>
                            <li>Social engineering or physical security attacks</li>
                            <li>Vulnerabilities in third-party applications that we use</li>
                        </ul>
                    </section>
                    <hr />
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">Safe Harbor</h2>
                        <p className="text-gray-600">
                            We will not initiate legal action against security researchers who discover and report
                            vulnerabilities through this responsible disclosure process, provided they:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mt-3">
                            <li>Follow the guidelines outlined in this policy</li>
                            <li>Do not violate any laws or compromise data privacy</li>
                            <li>Act in good faith to avoid privacy violations and service disruption</li>
                            <li>Do not use the vulnerability for personal gain beyond potential recognition</li>
                        </ul>
                    </section>
                    <hr />
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">Recognition</h2>
                        <p className="text-gray-600">
                            With your permission, we would like to credit your responsible disclosure in our
                            Security Hall of Fame. Please let us know if you prefer to remain anonymous.
                        </p>
                    </section>
                    <hr />
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">Contact Information</h2>
                        <p className="text-gray-600 mb-3">
                            Please send all vulnerability reports to:
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-800 font-medium">Email: {config.SITEMAIL}</p>
                            <p className="text-gray-600 text-sm mt-1">
                                We prefer encrypted communications. Please use our PGP key if possible.
                            </p>
                        </div>
                    </section>
                    <hr />
                    <section className="bg-blue-50 p-6 rounded-lg">
                        <h2 className="text-lg font-semibold text-red-800 mb-3">Thank You</h2>
                        <p className="text-gray-500">
                            We appreciate your efforts to make {config.SITENAME} and the internet a safer place. Your
                            expertise and ethical approach help us maintain the highest security standards
                            for our clients and their users.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default ResponsibleDisclosurePolicy;
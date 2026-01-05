import React from 'react'
import SigninForm from './SigninForm'
import SigninFormAlt from './SigninFormAlt'
import AuthHeader from '~/components/content/AuthHeader'

interface SigninBodyProps {
    referer: any
}
const SigninBody = ({ referer }: SigninBodyProps) => {
    return (
        <div className={`bg-white w-full 
        bg-[url('/images/oiltanker.jpg')]
        bg-cover bg-center min-h-screen flex place-content-center`}>
            <AuthHeader />
            {/* <SigninForm /> */}
            <SigninFormAlt referer={referer} />
        </div>
    )
}

export default SigninBody

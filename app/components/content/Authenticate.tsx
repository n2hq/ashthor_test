import React, { useEffect } from 'react'

const Authenticate = () => {
    useEffect(() => {
        console.log('hello')
        const authTokens = localStorage.getItem("authTokens") || null
        if (authTokens === undefined || authTokens === null) {
            window.location.href = "/web/signin"
        }
    }, [])
    return (
        <div>

        </div>
    )
}

export default Authenticate

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { AuthContextType, AuthTokens, AuthUser, LoginType, TokenType } from "~/lib/types";
import { useNavigate } from "@remix-run/react";
import { headers } from "~/lib/lib";


const AuthContext = createContext<AuthContextType | null>(null)

const SITE_BASE_URL = import.meta.env.VITE_SITE_BASE_URL

/* export function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {

        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
} */

export function useAuth() {

    const context = useContext(AuthContext)
    if (context)
        return context

    return null
}

export function AuthProvider({ children }: { children: ReactNode }) {
    let [authTokens, setAuthTokens] = useState<AuthTokens | null>(null)
    let [user, setUser] = useState<any | null>(null)


    const verifyToken = async (accessToken: string) => {
        try {
            let verifyep = '/api/user/verifytoken'
            let vep = SITE_BASE_URL + verifyep
            const response = await fetch(vep, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ "token": accessToken })
            });
            if (response.status !== 200) {
                throw new Error("Could not obtain token");
            }

            const data = await response.json()
            return data

        } catch (error: any) {
            {/** return null if token could not be verified */ }
            console.log(error.message)
            //alert(error.message)
            return null
        }
    }



    useEffect(() => {

        const tokens = localStorage.getItem("authTokens")
        {/** setAuthTokens */ }
        if (tokens !== null) {
            const authTokens = JSON.parse(tokens) as AuthTokens
            setAuthTokens(authTokens)
        }

        if (tokens === null) {

            setAuthTokens(null)
            //window.location.href = "/web/signin"

        }


        {/** setUser */ }
        if (tokens) {
            const authTokens = JSON.parse(tokens) as AuthTokens
            const accessToken = authTokens.accessToken
            verifyToken(accessToken).then((data) => {
                if (data === null) {
                    /**if token expires 
                     * if token expires, reset user 
                     * and authTokens to null
                     * and remove localStorage tokens
                    */
                    setAuthTokens(null)
                    setUser(null)
                    localStorage.removeItem("authTokens")
                } else {
                    //console.log(data)
                    setUser(data)
                }
            })
        } else {
            setUser(null)
        }
        setLoading(false)

        {/** time the signout 12 hours */ }
        let timeoutDuration = 1000 * 60 * 60 * 12
        let interval = setInterval(() => {
            signoutNoReload()
        }, timeoutDuration)
        return () => clearInterval(interval)
    }, [])

    let [loading, setLoading] = useState(true)

    const baseurl = SITE_BASE_URL
    //console.log(SITE_BASE_URL)
    const endpoint = '/api/user/signin'
    const requesturl = baseurl + endpoint
    const navigator = useNavigate()

    let signin = async (data: LoginType) => {

        try {
            const response = await fetch(requesturl, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data)
            })

            let tokens: AuthTokens = await response.json()

            if (response.status === 200) {
                setAuthTokens(tokens)

                {/** verify / decode the token */ }
                verifyToken(tokens.accessToken).then((data) => {
                    setUser(data as AuthUser)
                })
                localStorage.setItem('authTokens', JSON.stringify(tokens))
                //navigator("/")
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(true)
                    }, 100)
                })
            } else {
                //alert('Something went wrong')
                return new Promise((resolve) => {
                    setTimeout(() => {

                        resolve(tokens)
                    }, 100)
                })
            }
        } catch (error: any) {
            //alert(error.message)
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(false)
                }, 100)
            })
        }
    }

    const signoutNoReload = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        //window.location.reload()
    }

    const signoutReload = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        window.location.reload()
    }

    const resetpw = async (data: any) => {

        const BASE_URL = import.meta.env.VITE_SITE_BASE_URL
        const endpoint = "/api/user/reset_password_request"
        const url = BASE_URL + endpoint

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data)
            })

            var respObj = await response.json()

            if (!response.ok) {

                throw new Error(`Error Code: ${response.status} - ${respObj.message}`)
            } else {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(respObj.message)
                    }, 100)
                })

            }
        } catch (e: any) {

            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(e.message)
                }, 100)
            })
        } finally {

        }
    }

    let cdata = {
        user: user,
        signin: signin,
        signoutNoReload: signoutNoReload,
        signoutReload: signoutReload,
        resetpw: resetpw,
    }

    return (
        <AuthContext.Provider value={cdata}>
            {loading ? null : children}
        </AuthContext.Provider>
    )

}
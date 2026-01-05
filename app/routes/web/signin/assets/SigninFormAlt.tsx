import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@remix-run/react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import SigninSchema from "./SigninSchema";
import { LoginData } from "~/lib/types";
import { useNotification } from "~/context/NotificationContext";
import { useOperation } from "~/context/OperationContext";
import { useAuth } from "~/context/AuthContext";
import { config } from "~/lib/lib";

interface SigninFormAltProps {
    referer: any
}
export default function SigninFormAlt({ referer }: SigninFormAltProps) {
    const [isVisible, setIsVisible] = useState(false);
    //const [email, setEmail] = useState("");
    ///const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        // Trigger animation after component mounts
        setIsVisible(true);
    }, []);





    const auth = useAuth()
    if (!auth) { return null }
    const { signin } = auth


    const { showOperation, showSuccess, showError, showWarning, showInfo, completeOperation } = useOperation();

    const [formdata, setFormdata] = useState<any>({})
    const [working, setWorking] = useState<boolean>(false)
    const notification = useNotification()
    const navigator = useNavigate()

    const changeHandler = (e: any) => {
        let value = e.target.value
        let name = e.target.name
        setFormdata((previousValue: any) => {
            return (
                {
                    ...previousValue, [name]: value
                }
            )
        })
    }

    const handleSigninForm = async (data: LoginData) => {
        try {
            setWorking(true)
            //notification.notify()
            showOperation('processing');

            await new Promise((resolve) => setTimeout(resolve, 1000));

            const email = data.username
            const password = data.password

            const datr = {
                email: email,
                password: password
            }
            const res = await signin(datr)
            if (res === true) {
                //notification.cancel()
                showSuccess('login', 'Signin is successful.')
                await new Promise((resolve) => setTimeout(resolve, 1000));
                completeOperation()

                navigator("/")
                return true;

            } else {
                //alert(res.message))
                //notification.alertCancel("Complete Your Signup", res.message)
                showError('error', `${res.message}`)
                completeOperation()
            }
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setWorking(false)
        } catch (error: any) {
            console.log(error)
        }
    }

    const {
        register,
        handleSubmit,
        getValues,
        watch,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<LoginData>({
        defaultValues: ({}),
        resolver: zodResolver(SigninSchema)
    })



    return (
        <div className="min-h-screen w-screen min-w-screen bg-black/50 flex items-center justify-center p-4">
            <div className={`bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-sm transition-all duration-700 ease-in-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="pb-8">
                    {/* Brand Header */}
                    <div className="flex justify-center mb-6 mt-0 py-2 bg-gray-50 border-b">
                        <div className={`text-2xl font-[600] tracking-tighter font-poppins text-gray-700`}>
                            Sign in<i>!</i>
                        </div>
                    </div>

                    {/* Login Form */}
                    <div className="px-8">
                        {/* <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h2>
 */}

                        <form onSubmit={handleSubmit(handleSigninForm)} className="space-y-5">
                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    {...register('username', {
                                        onChange: changeHandler
                                    })}

                                    type="email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300"
                                    placeholder="your.email@example.com"

                                />
                                <div className={`w-[85%] mt-2 text-red-600 text-[11px] leading-[1.3em]`}>
                                    {errors?.username && <div>{errors.username.message}</div>}
                                </div>
                            </div>

                            {/* Password Input */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <div className="">
                                    <div className="relative">
                                        <input
                                            {...register('password', {
                                                onChange: changeHandler
                                            })}

                                            type={showPassword ? "text" : "password"}

                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300 pr-10"
                                            placeholder="Enter your password"

                                        />

                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            ) : (
                                                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    <div className={`w-[85%] mt-2 text-red-600 text-[11px] leading-[1.3em]`}>
                                        {errors?.password && <div>{errors.password.message}</div>}
                                    </div>


                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                        Remember me
                                    </label>
                                </div>

                                <Link to="/web/reset-password" className="text-sm text-indigo-600 hover:text-indigo-500 transition-colors duration-300">
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sign In
                            </button>
                        </form>

                        {/* Divider */}
                        {/* <div className="mt-6 mb-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>
                        </div> */}

                        {/* Social Login Options */}
                        {/* <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-300"
                            >
                                <svg className="w-5 h-5 text-[#4285F4]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                                </svg>
                                <span className="ml-2">Google</span>
                            </button>

                            <button
                                type="button"
                                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-300"
                            >
                                <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                <span className="ml-2">Facebook</span>
                            </button>
                        </div> */}

                        {/* Sign Up Link */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{" "}
                                <Link to="/web/signup" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Security Note */}
                {/* <div className="bg-gray-50 p-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 text-center flex items-center justify-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                        </svg>
                        Your account security is important to us
                    </p>
                </div> */}
            </div>
        </div>
    );
}
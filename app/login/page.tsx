"use client";
import { UserInterface } from '@/models/User'
import { Eye, EyeOff } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
function LogIn() {
    const router = useRouter();
    const [userData, setUserData] = useState<UserInterface>({
        email: "",
        password: ""
    });
    const [view, setView] = useState(false);
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const data = e.target.value;
        setUserData({
            ...userData,
            email: data,
        })
    }
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const data = e.target.value;
        setUserData({
            ...userData,
            password: data,
        })
    }
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await signIn("credentials", { ...userData, redirect: false })
        if (result?.error) {
            console.error("Login error:", result.error);
        } else {
            router.push("/");
        }
    }
    return (
        <div className="hero bg-base-200 min-h-screen mx-auto">
            <div className="hero-content flex-col lg:flex-row-reverse lg:w-3/4 mx-auto">
                <div className="text-center">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">

                        <form className="fieldset" onSubmit={handleLogin}>
                            <label className="input validator join-item">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
                                <input type="email" placeholder="mail@site.com" required onChange={handleEmail} />
                            </label>
                            <div className="validator-hint hidden">Enter valid email address</div>
                            <label className="input validator">
                                <input type={view ? "text" : "password"} required placeholder="Password" minLength={8} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" onChange={handlePassword} />
                                <span className=' right-0' onClick={() => setView(!view)}>{
                                    view ?
                                        <Eye /> :
                                        <EyeOff />
                                }</span>
                            </label>
                            <p className="validator-hint hidden">
                                Must be more than 8 characters, including
                                <br />At least one number
                                <br />At least one lowercase letter
                                <br />At least one uppercase letter
                            </p>

                            <div><a className="link link-hover">Forgot password?</a></div>
                            <button className="btn btn-neutral mt-4" type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogIn
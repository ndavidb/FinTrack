"use client"

import React, {useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import Brand from "@/components/Brand/Brand";
import {useUser} from "@/lib/auth";
import {useRouter} from "next/navigation";
import Cookies from "js-cookie";


export default function Login() {
    const api = "http://localhost:5254/accounts/login"
    const router = useRouter();
    const {mutate} = useUser();
    const [error, setError] = useState<string | null>(null);

    const handleSubmitLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const response = await fetch(api, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})
            });
            if (response.ok) {
                const data = await response.json();
                await mutate(data);
                Cookies.set('token', data.token, {expires: 3});
                router.push('/home');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Login failed');
            }
        } catch (error) {
            console.error(error);
            setError('An error occurred during login');
        }
    };

    return (
        <main className="w-full min-h-screen lg:grid lg:grid-cols-2">
            <div className="min-h-screen flex items-center justify-center">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="w-full flex justify-center mb-4">
                        <Link href="/"><Brand/></Link>
                    </div>
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold mb-2">Login</h1>
                        <p className="text-balance text-muted-foreground text-gray-700">
                            Enter your email below to login to your account
                        </p>
                    </div>
                    {error && <div className="text-red-500">{error}</div>}
                    <form className="grid gap-4" onSubmit={handleSubmitLogin}>
                        <div className="grid gap-4">
                            <Label htmlFor="email" className="text-md">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Email address"
                                required
                            />
                        </div>
                        <div className="grid gap-4">
                            <div className="flex items-center text-md">
                                <Label htmlFor="password" className="text-md">Password</Label>
                                <Link
                                    href="/forgot-password"
                                    className="ml-auto inline-block text-sm underline"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input id="password"
                                   type="password"
                                   name="password"
                                   required placeholder="Password"/>
                        </div>
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </form>
                    <div>

                        <Button variant="outline" className="w-full">
                            <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_17_40)">
                                    <path
                                        d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                                        fill="#4285F4"/>
                                    <path
                                        d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                                        fill="#34A853"/>
                                    <path
                                        d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                                        fill="#FBBC04"/>
                                    <path
                                        d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                                        fill="#EA4335"/>
                                </g>
                            </svg>
                            Login with Google
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-md">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="underline">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block">
                <div className="h-full w-full relative">
                <Image
                        src="/images/login.jpg"
                        alt="Image"
                        layout="fill"
                        className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                </div>
            </div>
        </main>
    )
}
"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Brand from "@/components/Brand/Brand";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {useUser} from "@/lib/auth";

export default function Register() {
    const api = "http://localhost:5254/accounts/register"
    const router = useRouter();
    const {mutate} = useUser();
    const [error, setError] = useState<string | null>(null);

    const handleSubmitRegistration = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement)
        const username = formData.get('username') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        
        try {
            console.log(username, email, password);
            const response = await fetch(api, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, email, password})
            }) 
            if (response.ok){
                router.push('/login');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Registration failed');
            }
        } catch (error) {
            console.error(error);
            setError('An error occurred during registration');
        }
    }


    return (
        <main className="w-full h-screen flex flex-col justify-center items-center">
            <div><Link href="/"><Brand/></Link></div>
            <div className="mt-5">
                <Card className="mx-auto max-w-md border-0">
                    <CardHeader className="flex items-center">
                        <CardTitle className="text-3xl font-bold mb-2">Sign Up</CardTitle>
                        <CardDescription className="text-md text-black">
                            Enter your information to create an account
                        </CardDescription>
                    </CardHeader>
                    {error && <div className="text-red-500">{error}</div>}
                    <form className="grid gap-4 " onSubmit={handleSubmitRegistration}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first-name">Username</Label>
                                <Input id="username" type="username" name="username" placeholder="Max" required/>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" name="password" type="password" required/>
                            </div>
                            <Button type="submit" className="w-full">
                                Create an account
                            </Button>
                        </div>
                    </form>
                    <div className=" mt-5">
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
                            Continue with Google
                        </Button>
                        <div className="mt-4 text-center text-md">
                            Already have an account?{" "}
                            <Link href="/login" className="underline">
                                Sign in
                            </Link>
                        </div>
                    </div>
                </Card>
            </div>
        </main>
    )
}
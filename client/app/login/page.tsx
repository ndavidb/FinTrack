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
import {Alert, AlertDescription} from "@/components/ui/alert";


export default function Login() {
    const api = `${process.env.NEXT_PUBLIC_API_URL}/accounts/login`;
    const router = useRouter();
    const {mutate} = useUser();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);


    const handleSubmitLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
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
                Cookies.set('token', data.accessToken, {expires: 3});
                router.push('/home');
            } else {
                const data = {message : await response.text()} 
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            setError('Unexpected error occurred, Please try again');
        } finally {
            setIsLoading(false);
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
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>)
                    }
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
                            </div>
                            <Input id="password"
                                   type="password"
                                   name="password"
                                   required placeholder="Password"/>
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? 'Accessing..' : 'Login'}
                        </Button>
                    </form>
                    
                    <div className="mt-4 text-center text-md">
                        <Link
                            href="/forgot-password"
                            className="ml-auto inline-block text-sm underline"
                        >
                            Forgot your password?
                        </Link>
                        <div>
                            Don&apos;t have an account?{" "}
                            <Link href="/register" className="underline">
                                Sign up
                            </Link>    
                        </div>
                        
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
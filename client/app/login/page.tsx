"use client"

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Brand from "@/components/Brand/Brand";
import { useUser } from "@/lib/auth";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; // Fixed import
import { z } from "zod";

// Form validation schema
const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
    const api = `${process.env.NEXT_PUBLIC_API_URL}/accounts/login`;
    const router = useRouter();
    const searchParams = useSearchParams();
    const { mutate } = useUser();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const returnUrl = searchParams.get('returnUrl') || '/home';

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (formData: LoginFormData) => {
        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch(api, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                Cookies.set('token', data.accessToken, {
                    expires: 3,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict'
                });

                await mutate(data);
                router.push(returnUrl);
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="w-full min-h-screen lg:grid lg:grid-cols-2">
            <div className="min-h-screen flex items-center justify-center">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="w-full flex justify-center mb-4">
                        <Link href="/"><Brand /></Link>
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
                        </Alert>
                    )}

                    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-4">
                            <Label htmlFor="email" className="text-md">Email</Label>
                            <Input
                                {...register('email')}
                                id="email"
                                type="email"
                                placeholder="Email address"
                                aria-invalid={!!errors.email}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="grid gap-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-md">Password</Label>
                                <Link
                                    href="/forgot-password"
                                    className="text-sm text-gray-600 hover:text-gray-800"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                {...register('password')}
                                id="password"
                                type="password"
                                placeholder="Password"
                                aria-invalid={!!errors.password}
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500">{errors.password.message}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </Button>
                    </form>

                    <div className="mt-4 text-center text-md">
                        <p>
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/register"
                                className="text-primary hover:underline"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <div className="hidden lg:block">
                <div className="h-full w-full relative">
                    <Image
                        src="/images/login.jpg"
                        alt="Login background"
                        layout="fill"
                        className="object-cover dark:brightness-[0.2] dark:grayscale"
                        priority
                    />
                </div>
            </div>
        </main>
    );
}
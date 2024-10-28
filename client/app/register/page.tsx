"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import Brand from "@/components/Brand/Brand";
import Cookies from "js-cookie";

interface ErrorResponse {
    $id: string;
    errors: {
        $id: string;
        $values: string[];
    };
}

export default function Register() {
    const api = `${process.env.NEXT_PUBLIC_API_URL}/accounts/register`;
    const router = useRouter();
    const { mutate } = useUser();
    const [errors, setErrors] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const extractErrors = (errorData: any): string[] => {
        if (errorData.errors?.$values) {
            return errorData.errors.$values;
        }

        if (Array.isArray(errorData)) {
            return errorData;
        }

        if (typeof errorData === 'string') {
            return [errorData];
        }

        return ['An unexpected error occurred'];
    };

    const handleSubmitRegistration = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors([]);

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
                Cookies.set('token', data.accessToken);
                router.push('/home');
            } else {
                const errorData: ErrorResponse = await response.json();
                const extractedErrors = extractErrors(errorData);
                setErrors(extractedErrors);
            }
        } catch (error) {
            console.error(error);
            setErrors(['An error occurred during registration']);
        } finally {
            setIsLoading(false);
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
                    <CardContent>
                        {errors.length > 0 && (
                            <div className="space-y-2 mb-4">
                                {errors.map((error, index) => (
                                    <Alert key={index} variant="destructive">
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                ))}
                            </div>
                        )}
                        <form className="grid gap-4" onSubmit={handleSubmitRegistration}>
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
                                <p className="text-sm text-gray-500">
                                    Password must contain at least 6 characters, and one number.
                                </p>
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Creating account...' : 'Create an account'}
                            </Button>
                        </form>
                        <div className="mt-4 text-center text-md">
                            Already have an account?{" "}
                            <Link href="/login" className="underline">
                                Sign in
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
'use client';

import React, {useState} from 'react'
import {Button, buttonVariants} from "@/components/ui/button";
import NavHeader from "@/components/navbar/NavHeader";
import {useLogout} from "@/lib/auth";
import Link from "next/link";
import {usePathname} from "next/navigation";

interface Props {
    className?: string;
}

export default function Navbar({className}: Props) {

    const logout = useLogout();
    const [state, setState] = useState(false)
    const pathname = usePathname();
    
    return (
        <nav className={`border-b w-full md:static md:text-md md:border-none ${className}`}>
            <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
                <NavHeader state={state} onClick={() => setState(!state)}/>
                <div className={`flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>
                    <div className="flex flex-col justify-end md:items-center space-y-6 md:flex md:flex-row md:space-x-6 md:space-y-0 font-semibold">
                        <Link href="/home/" className={`link ${pathname === '/home' ? 'active border-b-2 border-b-black' : ''}`}>Home</Link>
                        <Link href="/portfolio/" className={`link ${pathname === '/portfolio' ? 'active border-b-2 border-b-black' : ''}`}>Portfolio</Link>
                        <Button className="bg-black" onClick={logout}>
                            Log out
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
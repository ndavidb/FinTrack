'use client';

import { useState } from 'react'
import Link from "next/link";
import Image from "next/image";
import Brand from "@/components/Brand/Brand";
import {Button, buttonVariants} from "@/components/ui/button";
import NavHeader from "@/components/navbar/NavHeader";

export default () => {

    const [state, setState] = useState(false)

    // Replace javascript:void(0) paths with your paths
    const menu = [
        {name: "Features", path:""},
        {name: "Pricing", path:""},
        {name: "FAQs", path: ""},
    ]

    return (
        <nav className="bg-white border-b w-full md:static md:text-md md:border-none">
            <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
                <NavHeader state={state} onClick={() => setState(!state)}/>
                <div className={`flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>
                    <ul className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                        {
                            menu.map((item, idx) => {
                                return (
                                    <li key={idx} className="text-black hover:text-indigo-600">
                                        <a href={item.path} className="block">
                                            {item.name}
                                        </a>
                                    </li>
                                )
                            })
                        }
                        <span className='hidden w-px h-6 bg-gray-300 md:block'></span>
                        <div className='space-y-3 items-center gap-x-6 md:flex md:space-y-0'>
                            <li>
                                <Link href="/login" className={buttonVariants({ variant: "outline" })}>
                                    Log in
                                </Link>
                            </li>
                            <li>
                                <Link href="/" className={buttonVariants({ variant: "default" })}>
                                    Sign Up
                                </Link>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
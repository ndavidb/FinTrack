'use client';

import React, {useState} from 'react'
import {Button, buttonVariants} from "@/components/ui/button";
import NavHeader from "@/components/navbar/NavHeader";
import {useLogout} from "@/lib/auth";

export default function Navbar (){

    const logout = useLogout();
    const [state, setState] = useState(false)


    return (
        <nav className="bg-white border-b w-full md:static md:text-md md:border-none">
            <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
                <NavHeader state={state} onClick={() => setState(!state)}/>
                <div className={`flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>
                    <div className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                        <Button className="bg-black" onClick={logout}>
                            Log out
                        </Button>
                    </div>

                </div>
            </div>
        </nav>
    )
}
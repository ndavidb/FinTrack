'use client'

import Brand from "@/components/Brand/Brand";
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import React from "react";
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";

interface FooterSidebarLinks {
    href: string,
    name: string,
    icon: React.ReactNode
}

interface MainSidebarLinks{
    href: string;
    name: string;
    icon: React.ReactNode;
}

interface NavigationSearchProps {
    mainSidebarLinks: MainSidebarLinks[];
    footerSidebarLinks: FooterSidebarLinks[];
    sideBarTitle: string;
}

const Sidebar = ({mainSidebarLinks, footerSidebarLinks, sideBarTitle}: NavigationSearchProps) => {
    const pathname = usePathname();

    const isActive = (href: string) => {
        return pathname.endsWith(href);
    };

    return (
        <>
            <nav className="hidden md:block fixed top-0 left-0 h-full w-full border-r bg-white space-y-8 md:w-64">
                <div className="flex flex-col h-full">
                    <div className='h-20 flex items-center justify-center mb-3 px-8 mt-5'>
                        <Link href='/' className='flex-none'>
                            <Brand />
                        </Link>
                    </div>
                    <div className="flex-1 flex flex-col h-full overflow-auto">
                        <p className="px-4 text-md text-black font-semibold mb-3">{sideBarTitle}</p>
                        <ul className="px-4 text-sm font-medium flex-1">
                            {mainSidebarLinks.map((item, idx) => (
                                <li key={idx}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center gap-x-2 text-black p-2 rounded-lg hover:bg-gray-200 hover:text-black duration-150 ${
                                            isActive(item.href) ? 'bg-[#4F46E6] text-white hover:text-black' : ''
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div>
                            <ul className="px-4 pb-4 text-sm font-medium ">
                                {footerSidebarLinks.map((item, idx) => (
                                    <li key={idx}>
                                        <Link href={item.href} className="flex items-center p-2 rounded-lg">
                                            <Button
                                                variant="default"
                                                className={`hover:bg-black duration-150 hover:text-white hover:outline-black p-2 gap-x-2 w-full ${
                                                    isActive(item.href) ? 'bg-black text-white' : ''
                                                }`}
                                            >
                                                {item.name}
                                            </Button>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Sidebar;
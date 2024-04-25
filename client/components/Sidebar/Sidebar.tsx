import Image from "next/image";
import Brand from "@/components/Brand/Brand";
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {NavsFooter} from "@/components/Sidebar/SidebarLinks";
import React from "react";

interface NavigationLinks {
    href: string,
    name: string,
    icon: React.ReactNode
}

interface NavigationSearchProps {
    links: NavigationLinks[];
    sideBarTitle: string;
}

const Sidebar = ({links, sideBarTitle}: NavigationSearchProps) => {
    return (
        <>
            <nav className="hidden md:block fixed top-0 left-0 h-full w-full border-r bg-white space-y-8 md:w-64">
                <div className="flex flex-col h-full">
                    <div className='h-20 flex items-center justify-center mb-3 px-8'>
                        <Link href='/' className='flex-none'>
                            <Brand />
                        </Link>
                    </div>
                    <div className="flex-1 flex flex-col h-full overflow-auto">
                        <p className="px-4 text-md text-zinc-700 font-semibold mb-3">{sideBarTitle}</p>
                        <ul className="px-4 text-sm font-medium flex-1">
                            {
                                links.map((item, idx) => (
                                    <li key={idx}>
                                        <Link href={item.href} className="flex items-center gap-x-2 text-gray-700 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150">
                                            <div className="text-gray-500">{item.icon}</div>
                                            {item.name}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                        <div>
                            <ul className="px-4 pb-4 text-sm font-medium">
                                {
                                    NavsFooter.map((item, idx) => (
                                        <li key={idx}>
                                            <Link href={item.href} className="flex items-center gap-x-2 text-gray-700 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150">
                                                <div className="text-gray-500">{item.icon}</div>
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                            <div className="py-4 px-4 border-t">
                                <div className="flex items-center gap-x-4">
                                    <Avatar>
                                        <AvatarImage src="                  "/>
                                        <AvatarFallback>NB</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <span className="block text-gray-700 text-sm font-semibold">Nilson David Bello</span>
                                        <Link
                                            href="/"
                                            className="block mt-px text-gray-600 hover:text-blue-600 text-xs"
                                        >
                                            View profile
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div>
            </nav>
        </>
    );
};
export default Sidebar;

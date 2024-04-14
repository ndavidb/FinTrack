import Link from "next/link";
import React from "react";

interface Props { 
    children: React.ReactNode;     
    href: string;
    className: string;
}
export default function NavLink({children, href, ...props}: Props){
    return (
        <Link href={href} className={`py-2.5 px-4 text-center rounded-full duration-150" ${props?.className || ""}`}>
            {children}
        </Link>
    )
}
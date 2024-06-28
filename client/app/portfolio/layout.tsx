import React from "react";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import { sidebarFooterLinks, sidebarMainLinks } from "@/components/Sidebar/SidebarLinks";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-1 overflow-hidden">
                <main className="flex-1 overflow-auto bg-blue-50 p-4 md:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
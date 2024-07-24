import React from "react";
import UserNavbar from "@/components/UserNavbar/UserNavbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <UserNavbar />
            <div className="flex flex-1 overflow-hidden">
                <main className="flex-1 overflow-auto  p-4 md:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
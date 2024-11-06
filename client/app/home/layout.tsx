import React from "react";
import UserNavbar from "@/components/UserNavbar/UserNavbar";
import Footer from "@/components/Footer/Footer";

const Layout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <UserNavbar />
            <main className="flex-grow max-w-screen-xl w-full mx-auto">
                <div className="h-full p-6 md:px-8">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
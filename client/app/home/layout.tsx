import React from "react";
import UserNavbar from "@/components/UserNavbar/UserNavbar";
import Footer from "@/components/Footer/Footer";

const Layout = ({children}: {children: React.ReactNode}) => {
    return (
        <>
            <UserNavbar/>
            <div className="h-screen flex-col md:flex-row md:overflow-hidden max-w-screen-xl mx-auto">
                <div className="flex flex-col w-full h-full">
                    <div className="flex-grow p-6 md:overflow-y-auto md:px-8">
                        {children}
                    </div>
                </div>
            </div>
            <Footer />
        </>

    );
};
export default Layout;

import React from "react";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/navbar/Navbar";

const Layout = ({children}: {children: React.ReactNode}) => {
    return (
        <div>
            {children}
        </div>
    );
};
export default Layout;

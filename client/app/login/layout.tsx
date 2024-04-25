import React from "react";
import Footer from "@/components/Footer/Footer";

const Layout = ({children}: {children: React.ReactNode}) => {
    return (
        <div>
            {children}
        </div>
    );
};
export default Layout;

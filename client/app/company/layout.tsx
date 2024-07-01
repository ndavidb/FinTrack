import React from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import CardWrapper from "@/components/CardDashboard/CardDashboard";
import {sidebarFooterLinks, sidebarMainLinks} from "@/components/Sidebar/SidebarLinks";

const Layout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <Sidebar sideBarTitle="Stocks Search"  footerSidebarLinks={sidebarFooterLinks} mainSidebarLinks={sidebarMainLinks}/>
            </div>
            <div className="flex flex-col w-full h-full bg-blue-50">
                <div className="p-8">
                    <CardWrapper ticker="AAPL"/>
                </div>
                <div className="flex-grow p-6 md:overflow-y-auto md:px-8">
                    {children}
                </div>
            </div>
        </div>
    );
};
export default Layout;

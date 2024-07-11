import React from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import CardWrapper from "@/components/CardDashboard/CardDashboard";
import {sidebarFooterLinks, sidebarMainLinks} from "@/components/Sidebar/SidebarLinks";

const Layout = ({children, params}: {children: React.ReactNode, params: {ticker: string}}) => {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <Sidebar sideBarTitle="Stocks Search"  footerSidebarLinks={sidebarFooterLinks} mainSidebarLinks={sidebarMainLinks}/>
            </div>
            <div className="flex flex-col w-full h-full bg-blue-50">
                <div className="flex-grow p-6 md:overflow-y-auto md:px-8">
                    <div className="py-8">
                        <CardWrapper params={params} />
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;

'use client'


import PortfolioStocksTable from "@/components/Portfolio/PortfolioStocksTable";
import PortfolioStocksWrapper from "@/components/Portfolio/PortfolioStocksHeader";

export default function PortfolioPage() {
    return (
        <div className="">
            <main className="mx-auto p-4 md:p-6 2xl:p-1 max-w-screen-2xl bg-purple-50">
                <PortfolioStocksWrapper/>
                
                <PortfolioStocksTable/>
                
            </main>
        </div>
    );
};

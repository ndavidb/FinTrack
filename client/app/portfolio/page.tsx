
import PortfolioStocksTable from "@/components/Portfolio/PortfolioStocksTable";
import PortfolioStocksWrapper from "@/components/Portfolio/PortfolioStocksWrapper";
import StockPriceChart from "@/components/Portfolio/StockPriceChart";
import StockListSimple from "@/components/Portfolio/StockListSimple";
import React from "react";
import {getStocksPortfolio} from "@/lib/data";

export default async function PortfolioPage() {
    const portfolioData = await getStocksPortfolio();
    
    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Portfolio Overview</h1>
            <PortfolioStocksWrapper  portfolioData={portfolioData}/>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <StockPriceChart className="md:col-span-8 h-[400px]"/>
                <StockListSimple className="md:col-span-4 h-[400px]" portfolioData={portfolioData}/>
            </div>
            <PortfolioStocksTable />
        </div>
    );
}
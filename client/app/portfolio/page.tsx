import PortfolioStocksTable from "@/components/Portfolio/PortfolioStocksTable";
import PortfolioStocksWrapper from "@/components/Portfolio/PortfolioStocksWrapper";
import PortfolioPerformanceChart from "@/components/Portfolio/PortfolioPerformanceChart";
import StockListSimple from "@/components/Portfolio/StockListSimple";
import React, {Suspense} from "react";
import {getPortfolioPerformance, getStocksPortfolio} from "@/lib/data";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button, buttonVariants} from "@/components/ui/button";
import Link from "next/link";

export default async function PortfolioPage() {
    const portfolioData = await getStocksPortfolio();
    const portfolioPerformance = await getPortfolioPerformance();

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {portfolioData.length > 0 && portfolioPerformance.length > 0 ? (
                <>
                    <PortfolioStocksWrapper portfolioPerformance={portfolioPerformance}/>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <Suspense fallback={<div>Loading...</div>}>
                            <PortfolioPerformanceChart className="md:col-span-8"/>
                        </Suspense>
                        <StockListSimple className="md:col-span-4" portfolioData={portfolioData}/>
                    </div>
                    <PortfolioStocksTable portfolioPerformance={portfolioPerformance}/>
                </>
            ) : (<div className="flex justify-center items-center min-h-60 mx-auto">
                <Card className="flex flex-col justify-center items-center">
                    <CardHeader className="text-center">
                        <CardTitle>No stocks available</CardTitle>
                        <CardDescription>Use the searchbar in the Home page to add new stocks</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link href="/home#search" className={buttonVariants({variant: "default"})}>Go to home</Link>
                    </CardContent>
                </Card>
            </div>)}
        </div>
    );
}
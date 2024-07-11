'use client';

import React, {useEffect, useState} from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { getStocksPortfolio } from "@/lib/data";
import PortfolioStockCard from './PortfolioStockCard';

interface StockPortfolio {
    id: number;
    symbol: string;
    companyName: string;
    industry: string;
    website: string;
    purchaseDate: string;
    purchasePrice: number;
}

interface Props {
    portfolioData : StockPortfolio[];
}

export default function PortfolioStocksWrapper({portfolioData} : Props) {
    // const [portfolioData, setPortfolioData] = useState<StockPortfolio[] | null>(null);
    // const [error, setError] = useState<string | null>(null);
    //
    // useEffect(() => {
    //     async function fetchPortfolioData() {
    //         try {
    //             const data = await getStocksPortfolio();
    //             setPortfolioData(data);
    //         } catch (err) {
    //             setError('Failed to fetch portfolio data');
    //             console.error(err);
    //         }
    //     }
    //
    //     fetchPortfolioData();
    // }, []);
    //
    // if (error) return <div className="text-red-500">{error}</div>;
    // if (!portfolioData) return <div>Loading portfolio data...</div>;
    // if (portfolioData.length === 0) return <div>No portfolio data available</div>;


    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <Carousel opts={{align: "start"}} className="w-full">
                <CarouselContent className="-ml-2 md:-ml-4">
                    {portfolioData.map((stock) => (
                        <CarouselItem key={stock.symbol}
                                      className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                            <PortfolioStockCard {...stock} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="hidden sm:block">
                    <CarouselPrevious/>
                    <CarouselNext/>
                </div>
            </Carousel>
        </div>
    );
}
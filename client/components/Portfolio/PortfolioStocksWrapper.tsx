'use client';

import React, {useEffect} from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
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
    portfolioPerformance : StockPortfolioPerformance[];
}

export default function PortfolioStocksWrapper({portfolioPerformance} : Props) {
    const [isMobile, setIsMobile] = React.useState(false);
    
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, [])
    
    const showControls = isMobile ? portfolioPerformance.length > 1 : portfolioPerformance.length > 4;
    
    
    
    return (
        <div className="flex justify-center items-center">
            <div className="w-11/12 md:w-full bg-white p-4 rounded-lg shadow ">
                <Carousel opts={{align: "start"}} className="w-full">
                    <CarouselContent className="-ml-2 md:-ml-4 w-11/12 md:w-full ">
                        {portfolioPerformance.map((stock) => (
                            <CarouselItem key={stock.symbol}
                                          className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                                <PortfolioStockCard {...stock} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {showControls && (
                        <div>
                            <CarouselPrevious/>
                            <CarouselNext/>
                        </div>
                    )}
                </Carousel>
            </div>
        </div>

    );
}
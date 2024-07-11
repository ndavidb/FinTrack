import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import PortfolioStockCard from "@/components/Portfolio/PortfolioStockCard";
import React from "react";

interface Props {
    portfolioData: StockPortfolio[];
}

export default function PortfolioStocksCarousel({portfolioData} : Props) {
    
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-2 md:-ml-4">
                    {portfolioData.map((stock) => (
                        <CarouselItem key={stock.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                            <PortfolioStockCard {...stock} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="hidden sm:block">
                    <CarouselPrevious />
                    <CarouselNext />
                </div>
            </Carousel>
        </div>
    );
}
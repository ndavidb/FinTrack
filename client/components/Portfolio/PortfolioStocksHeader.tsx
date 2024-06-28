import React from "react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface StockData {
    name: string;
    domain: string;
    totalShare: number;
    totalReturn: number;
}

const stockData: StockData[] = [
    { name: 'Meta', domain: 'www.meta.com', totalShare: 157.36, totalReturn: -0.1 },
    { name: 'Google', domain: 'www.google.com', totalShare: 743.76, totalReturn: 0.98 },
    { name: 'Tesla', domain: 'www.tesla.com', totalShare: 234.09, totalReturn: -1.1 },
    { name: 'Microsoft', domain: 'www.microsoft.com', totalShare: 410.5, totalReturn: -2.9 },
    { name: 'Ocul', domain: 'www.ocutx.com', totalShare: 410.5, totalReturn: -2.9 },
    { name: 'Apple', domain: 'www.apple.com', totalShare: 410.5, totalReturn: -2.9 },
];

export default function PortfolioStocksWrapper() {
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-2 md:-ml-4">
                    {stockData.map((stock) => (
                        <CarouselItem key={stock.name} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
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

const PortfolioStockCard: React.FC<StockData> = ({name, domain, totalShare, totalReturn}) => {
    return (
        <div className="bg-white p-4 rounded border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-2">
                <Image
                    src={`https://img.logo.dev/${domain}?token=pk_H-H7gJdRR3qZgFO4dEkKtw`}
                    alt={`${name} logo`}
                    width={24}
                    height={24}
                    className="mr-2"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = `/api/placeholder/24/24?text=${name[0]}`;
                    }}
                />
                <span className="font-semibold">{name}</span>
            </div>
            <div className="flex justify-between items-center">
                <div className="text-xs lg:text-sm">
                    <p className="text-gray-500">Current Price</p>
                    <p className="font-semibold">${totalShare.toFixed(2)}</p>
                </div>
                <div className="text-xs lg:text-sm">
                    <p className=" text-gray-500">Performance</p>
                    <p className={`font-semibold ${totalReturn >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {totalReturn.toFixed(2)}%
                        {totalReturn >= 0 ? '▲' : '▼'}
                    </p>
                </div>
            </div>
        </div>
    );
}
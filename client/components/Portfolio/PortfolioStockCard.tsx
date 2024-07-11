import React from "react";
import Image from "next/image";

interface Props {
    companyName: string;
    website: string;
    purchasePrice: number;
}

const PortfolioStockCard: React.FC<StockPortfolio> = ({companyName, website, purchasePrice} : Props) => {
    return (
        <div className="bg-white p-4 rounded border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-2">
                <Image
                    src={`https://img.logo.dev/${website}?token=pk_H-H7gJdRR3qZgFO4dEkKtw`}
                    alt={`${companyName} logo`}
                    width={24}
                    height={24}
                    className="mr-2"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = `/api/placeholder/24/24?text=${companyName[0]}`;
                    }}
                />
                <span className="font-semibold">{companyName}</span>
            </div>
            <div className="flex justify-between items-center">
                <div className="text-xs lg:text-sm">
                    <p className="text-gray-500">Current Price</p>
                    <p className="font-semibold">${purchasePrice.toFixed(2)}</p>
                </div>
                {/*<div className="text-xs lg:text-sm">*/}
                {/*    <p className=" text-gray-500">Performance</p>*/}
                {/*    <p className={`font-semibold ${totalReturn >= 0 ? 'text-green-500' : 'text-red-500'}`}>*/}
                {/*        {totalReturn.toFixed(2)}%*/}
                {/*        {totalReturn >= 0 ? '▲' : '▼'}*/}
                {/*    </p>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}

export default PortfolioStockCard;
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Image from "next/image";
import React from "react";
import {CardTitle} from "@/components/ui/card";

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
];

interface props {
    className?: string;
}

const StockListSimple: React.FC<props> = ({className} : props) => {
    return (
        <div className={`bg-white p-5 ${className || ''}`}>
            <CardTitle className="mb-4 text-xl font-semibold leading-none tracking-tight">My Stocks</CardTitle>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Stock</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {stockData.map((stock) => (
                        <TableRow>
                            <TableCell className="flex content-center h-full">
                                <Image
                                    src={`https://img.logo.dev/${stock.domain}?token=pk_H-H7gJdRR3qZgFO4dEkKtw`}
                                    alt={`${stock.name} logo`}
                                    width={24}
                                    height={24}
                                    className="mr-2"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = `/api/placeholder/24/24?text=${stock.name[0]}`;
                                    }}
                                />
                                <p>{stock.name}</p>
                            </TableCell>
                            <TableCell className="text-right">
                                <p>{stock.name}</p>
                                <p>{stock.name}</p>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
        

    );
}

export default StockListSimple;
'use client';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Image from "next/image";
import React from "react";
import {CardTitle} from "@/components/ui/card";

interface props {
    className?: string;
    portfolioData: StockPortfolio[];
}

const StockListSimple: React.FC<props> = ({className, portfolioData} : props) => {
    return (
        <div className={`h-full w-full bg-white p-5 rounded-lg shadow-sm ${className || ''}`}>
            <CardTitle className="mb-4 text-xl font-semibold leading-none tracking-tight">My Stocks</CardTitle>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Stock</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {portfolioData.map((stock) => (
                        <TableRow key={stock.id}>
                            <TableCell className="flex content-center h-full">
                                <Image
                                    src={`https://img.logo.dev/${stock.website}?token=pk_H-H7gJdRR3qZgFO4dEkKtw`}
                                    alt={`${stock.companyName} logo`}
                                    width={24}
                                    height={24}
                                    className="mr-2"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = `/api/placeholder/24/24?text=${stock.companyName[0]}`;
                                    }}
                                />
                                <p>{stock.symbol}</p>
                            </TableCell>
                            <TableCell className="text-right">
                                <p>{stock.purchaseDate}</p>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
        

    );
}

export default StockListSimple;
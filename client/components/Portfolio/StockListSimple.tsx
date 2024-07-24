'use client';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Image from "next/image";
import React from "react";
import {CardTitle} from "@/components/ui/card";
import {format} from "date-fns/format";

interface props {
    className?: string;
    portfolioData: StockPortfolio[];
}

const StockListSimple: React.FC<props> = ({className, portfolioData} : props) => {
    return (
        <div className={`flex flex-col h-[350px] md:h-full w-full bg-white p-5 rounded-lg shadow-sm ${className || ''}`}>
            <CardTitle className="static mb-4 text-xl font-semibold leading-none tracking-tight">My Stocks</CardTitle>
                <div className="relative flex-grow overflow-hidden">
                    <Table >
                        <TableHeader className="sticky top-0 bg-white z-10">
                            <TableRow>
                                <TableHead className="w-[100px]">Stock</TableHead>
                                <TableHead className="text-right">Purchase date</TableHead>
                            </TableRow>
                        </TableHeader>
                    </Table>
                    <div className="absolute top-[2.5rem] left-0 right-0 bottom-0 overflow-y-auto">
                        <Table>
                            <TableBody  >
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
                                            <p>{format(new Date(stock.purchaseDate), 'dd-MM-yyyy')}</p>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
        </div>
    );
}

export default StockListSimple;
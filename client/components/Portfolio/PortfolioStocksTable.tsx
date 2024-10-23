'use client';

import { useTransition } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {removeStockFromPortfolio} from "@/actions/portfolioActions";
import Link from "next/link";
interface StockPortfolioPerformance {
    symbol: string;
    companyName: string;
    purchaseDate: string;
    purchasePrice: number;
    currentPrice: number;
    performance: number;
}

interface Props {
    portfolioPerformance: StockPortfolioPerformance[];
}

export default function PortfolioStocksTable({ portfolioPerformance }: Props) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleRemoveStock = async (symbol: string) => {
        startTransition(async () => {
            try {
                await removeStockFromPortfolio(symbol);
                router.refresh();
            } catch (error: any) {
                console.log("Failed to remove stock", error.message);
            }
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="mb-4 text-xl font-semibold leading-none tracking-tight">Full detail of stocks</CardTitle>
                <CardDescription>List of all stocks</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[180px]">Company name</TableHead>
                                <TableHead>Purchase Date</TableHead>
                                <TableHead className="hidden md:table-cell">Purchase Price</TableHead>
                                <TableHead className="hidden md:table-cell">Current Price</TableHead>
                                <TableHead>Performance</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {portfolioPerformance.map((stock) => (
                                <TableRow key={stock.symbol}>
                                    <TableCell className="font-medium"><Link href={`/company/${stock.symbol}/profile`} >{stock.companyName}</Link></TableCell>
                                    <TableCell>{format(new Date(stock.purchaseDate), 'dd-MM-yyyy')}</TableCell>
                                    <TableCell className="hidden md:table-cell">${stock.purchasePrice.toFixed(2)}</TableCell>
                                    <TableCell className="hidden md:table-cell">${stock.currentPrice.toFixed(2)}</TableCell>
                                    <TableCell className={stock.performance >= 0 ? "text-green-500" : "text-red-500"}>
                                        {stock.performance.toFixed(2)}%
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            size="sm"
                                            className="bg-gray-400 hover:bg-red-500"
                                            onClick={() => handleRemoveStock(stock.symbol)}
                                            disabled={isPending}
                                        >
                                            {isPending ? 'Removing...' : 'Remove'}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}
'use client';
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { addStockPortfolio } from "@/actions/portfolioActions";
import { useState } from "react";
import toast from 'react-hot-toast';

interface Props {
    id: string;
    searchResult: CompanySearch;
}

export default function SearchCard({ id, searchResult }: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const [added, setAdded] = useState<boolean>(false);

    const handleAddingStock = async (symbol: string) => {
        if (loading || added) return;

        setLoading(true);
        toast.promise(
            addStockPortfolio(symbol),
            {
                loading: 'Adding to portfolio...',
                success: (result) => {
                    setAdded(true);
                    return result === 'exists'
                        ? 'Stock is already in your portfolio'
                        : 'Stock added to portfolio!';
                },
                error: 'Failed to add stock to portfolio',
            }
        ).finally(() => setLoading(false));
    }

    return (
        <Card key={id} id={id} className="my-2">
            <CardContent className="flex justify-between items-center py-2">
                <Link href={`company/${searchResult.symbol}/profile`} className="font-medium">
                    {searchResult.name} - {searchResult.symbol}
                </Link>
                <Button
                    onClick={() => handleAddingStock(searchResult.symbol)}
                    variant={added ? "default" : "secondary"}
                    disabled={loading || added}
                    className="hover:bg-primary-600"
                >
                    {loading ? "Adding..." : added ? "Added" : "Add to portfolio"}
                </Button>
            </CardContent>
        </Card>
    );
};
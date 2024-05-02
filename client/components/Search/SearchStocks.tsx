import Searchbar from "@/components/Search/Searchbar";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {ChangeEvent, SyntheticEvent} from "react";

interface Props {
    onSearchSubmit: (e: SyntheticEvent) => void;
    search: string | undefined;
    placeholder: string;
    handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchStocks({search, onSearchSubmit, handleSearchChange, placeholder}: Props) {
    return (
        <>
            <Card
                className="sm:col-span-2 border-none [&>*]:pl-2"
            >
                <CardHeader className="pt-3 pb-0">
                    <CardTitle>Search a stock</CardTitle>
                    <CardDescription>Search for any stock of NASDAQ</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-row p-4 w-3/4 items-center">
                    <Searchbar placeholder={placeholder} handleSearchChange={handleSearchChange} onSearchSubmit={onSearchSubmit} search={search}/>
                    <Button size={"sm"} className="text-sm font-medium ml-4">Search</Button>
                </CardContent>
            </Card>
        </>
    );
};

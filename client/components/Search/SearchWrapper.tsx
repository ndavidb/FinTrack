'use client';
import React, { ChangeEvent, SyntheticEvent, useEffect, useCallback, useState } from "react";
import { searchCompanies } from "@/lib/data";
import SearchStocks from "@/components/Search/SearchStocks";
import SearchResultList from "@/components/Search/SearchResultList";

export default function SearchWrapper() {
    const [search, setSearch] = useState<string>("");
    const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
    const [serverError, setServerError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const performSearch = async (searchTerm: string) => {
        if (searchTerm.length >= 3) {
            try {
                setIsLoading(true);
                const result = await searchCompanies(searchTerm);
                if (typeof result === "string") {
                    setServerError(result);
                } else {
                    setSearchResult(result!);
                    setServerError(null);
                }
                setIsLoading(false);
            } catch (error) {
                setServerError("Error performing search");
            }
        } else {
            setSearchResult([]);
        }
    };

    // Real-time search with debouncing
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            performSearch(search);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [search]);

    // Button-triggered search
    const onSearchSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await performSearch(search);
    };
    

    return (
        <>
            <SearchStocks
                placeholder="Search stocks"
                handleSearchChange={handleSearchChange}
                onSearchSubmit={onSearchSubmit}
                search={search}
                isLoading={isLoading}
            />

            <SearchResultList searchResults={searchResult}/>
            {serverError && (
                <div className="px-2 text-sm text-red-500">
                    {serverError}
                </div>
            )}
        </>
    );
}
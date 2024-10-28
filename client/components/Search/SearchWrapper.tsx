'use client';
import React, { ChangeEvent, SyntheticEvent, useEffect, useCallback, useState } from "react";
import { searchCompanies } from "@/lib/data";
import SearchStocks from "@/components/Search/SearchStocks";
import SearchResultList from "@/components/Search/SearchResultList";
import { debounce } from 'lodash';

export default function SearchWrapper() {
    const [search, setSearch] = useState<string>("");
    const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
    const [serverError, setServerError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Create a debounced search function
    const debouncedSearch = useCallback(
        debounce(async (query: string) => {
            if (query.length >= 3) {
                setIsLoading(true);
                try {
                    const result = await searchCompanies(query);
                    if (typeof result === "string") {
                        setServerError(result);
                        setSearchResult([]);
                    } else {
                        setSearchResult(result!);
                        setServerError(null);
                    }
                } catch (error) {
                    setServerError("An error occurred while searching");
                    setSearchResult([]);
                }
                setIsLoading(false);
            } else {
                setSearchResult([]);
                setServerError(null);
            }
        }, 300), // 300ms delay
        []
    );

    // Handle search input changes
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        debouncedSearch(value);
    };

    // Handle manual search submit (keeping this for accessibility)
    const onSearchSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        debouncedSearch(search);
    };

    // Cleanup debounce on component unmount
    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

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
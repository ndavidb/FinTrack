'use client';
import React, {ChangeEvent, SyntheticEvent, useState} from "react";
import {searchCompanies} from "@/lib/data";
import SearchStocks from "@/components/Search/SearchStocks";
import SearchResultList from "@/components/Search/SearchResultList";

export default function SearchWrapper() {
    const [search, setSearch] = useState<string>("");
    const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
    const [serverError, setServerError] = useState<string | null>(null);


    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) =>{
        setSearch(e.target.value);
    }

    const onSearchSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const result = await searchCompanies(search);
        if (typeof result === "string") {
            setServerError(result);
        } else {
            setSearchResult(result!);
        }
    }
    return (
        <>
            <SearchStocks placeholder="Search stocks" handleSearchChange={handleSearchChange}
                          onSearchSubmit={onSearchSubmit} search={search}/>
            <SearchResultList searchResults={searchResult}/>
            {serverError && <div>Unable to connect to API</div>}
        </>
    );
};

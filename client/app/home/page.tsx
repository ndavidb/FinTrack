'use client';

import Searchbar from "@/components/Search/Searchbar";
import React, {ChangeEvent, SyntheticEvent, useState} from "react";
import HomePortfolioReview from "@/components/UserHomePortfolio/HomePortfolioReview";
import SearchResultList from "@/components/Search/SearchResultList";
import {searchCompanies} from "@/lib/data";
import {Button} from "@/components/ui/button";
import SearchStocks from "@/components/Search/SearchStocks";
import {useRouter} from "next/router";

interface Props {
}

export default function HomeUser({}: Props) {
    const isUserAuthenticated : Boolean = false;
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
        <div className="space-y-5"> 
            <div className="font-bold text-2xl">Welcome, Nilson David Bello</div>
            <HomePortfolioReview/>
            <div>
                <SearchStocks placeholder="Search stocks" handleSearchChange={handleSearchChange} onSearchSubmit={onSearchSubmit} search={search}/>
                <SearchResultList searchResults={searchResult}/>
                {serverError && <div>Unable to connect to API</div>}
            </div>
        </div>
    )
}

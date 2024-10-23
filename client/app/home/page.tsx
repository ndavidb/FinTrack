import React from "react";
import HomePortfolioReview from "@/components/UserHomePortfolio/HomePortfolioReview";
import SearchWrapper from "@/components/Search/SearchWrapper";

export default function HomeUser() {
    return (
        <>
            <div className="flex flex-col space-y-5">
                <div className="font-bold text-2xl">Welcome</div>
                <HomePortfolioReview />
                <div id="search">
                    <SearchWrapper/>
                </div>
            </div>
        </>

    )
}

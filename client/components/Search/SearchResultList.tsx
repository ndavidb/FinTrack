import {SyntheticEvent} from "react";
import {Result} from "postcss";
import {Card} from "@/components/ui/card";
import SearchCard from "@/components/Search/SearchCard";
import {addStockPortfolio, removeStockFromPortfolio} from "@/actions/portfolioActions";

interface Props {
    searchResults: CompanySearch[];
}

export default function SearchResultList({searchResults}: Props) {
    
    return (
        <div className="px-2">
            {searchResults.length > 0 && (
                    searchResults.map((result) =>
                        (
                            <SearchCard id={result.symbol} key={result.symbol} searchResult={result}/>)
                    )
                )
            }
        </div>
    );
};

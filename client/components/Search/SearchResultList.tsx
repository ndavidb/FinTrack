import {SyntheticEvent} from "react";
import {Result} from "postcss";
import {Card} from "@/components/ui/card";
import SearchCard from "@/components/Search/SearchCard";

interface Props {
    searchResults: CompanySearch[];
}

export default function SearchResultList({searchResults}: Props) {
    return (
        <div>
            {searchResults.length > 0 ? (
                searchResults.map((result) =>{
                    return (
                        <SearchCard id={result.symbol} key={result.symbol} searchResult={result}/>)
                })
            ) :
                (
                    <p>No results</p>
                )}
        </div>
    );
};

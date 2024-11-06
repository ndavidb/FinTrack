
import SearchCard from "@/components/Search/SearchCard";

interface Props {
    searchResults: CompanySearch[];
}

export default function SearchResultList({searchResults}: Props) {
    
    return (
        <div className="px-2">
            {searchResults.length > 0 && (
                    searchResults.map((result) =>
                        (
                            <SearchCard id={result.symbol} key={result.symbol} searchResult={result}/>
                        )
                )
            )
            }
        </div>
    );
};

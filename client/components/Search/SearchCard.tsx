import {Card, CardContent} from "@/components/ui/card";
import Link from "next/link";

interface Props {
    id: string;
    searchResult: CompanySearch;
}

export default function SearchCard({id, searchResult}: Props) {
    return (
        <Card key={id} id={id}>
            <CardContent>
                <Link href={`company/${searchResult.symbol}/profile`}>
                    {searchResult.name} ({searchResult.symbol}) - {searchResult.exchangeShortName}
                </Link>
            </CardContent>
        </Card>
    );
};

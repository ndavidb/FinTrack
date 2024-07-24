import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {getPortfolioPerformance} from "@/lib/data";

export default async function HomePortfolioReview() {
    const portfolioPerformances = await getPortfolioPerformance();
    
    return (
        <Card
            className="sm:col-span-2"
        >
            <CardHeader className="pb-5">
                <CardTitle>My portfolio</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-2 md:mb-2">
                <div>
                    <p className="font-semibold">
                        Performance summary
                    </p>
                    <div className="flex flex-col md:flex-row text-sm [&>*]:pr-2 [&>*]:mr-4 spacey-4">
                        {portfolioPerformances.map((stock) =>(
                            <div key={stock.symbol} className="flex flex-row md:space-x-2"> 
                                <p className="font-medium">{stock.companyName}:</p>
                                <p className={`text-green-500 ${stock.performance >= 0 ? `text-green-600` : 'text-red-500'}`}>{stock.performance.toFixed(2)}%</p>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Link  href="/portfolio">
                    <Button size={"sm"} className="text-sm font-medium">Review my portfolio</Button>
                </Link>
            </CardFooter>
        </Card>
    );
};

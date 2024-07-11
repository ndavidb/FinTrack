import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Inter} from "next/dist/compiled/@next/font/dist/google";
import {getCompanyKeyMetrics, getCompanyProfile} from "@/lib/data";

type DashboardCard = {
    title: string,
    value: string | number,
    className?: string,
}

interface Props {
    params : {ticker: string};
}

export default async function CardWrapper({params}: Props) {
    const ticker = params.ticker;
    const companyProfile = await getCompanyProfile(ticker);
    
    if (!companyProfile || companyProfile.length === 0) return <div>Loading company profile...</div>
    
    const profile = companyProfile[0];
    
    return (
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 xl:grid-cols-5">
            <CardDashboard  title="Company name" value={profile.companyName}/>
            <CardDashboard  title="Industry" value={profile.industry}/>
            <CardDashboard  title="Price" value={profile.price}/>
            <CardDashboard  title="Last Dividend" value={profile.lastDiv}/>
            <CardDashboard  title="Market Capitalisation" value={profile.mktCap} />
        </div>
    )
};

export function CardDashboard({title, value, className}: DashboardCard) {
    return (
        <Card>
            <CardHeader className="p-3 text-gray-600">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="">
                <div className="text-lg font-bold text-zinc-700 xl:text-xl">{value}</div>
            </CardContent>
        </Card>
    );
}
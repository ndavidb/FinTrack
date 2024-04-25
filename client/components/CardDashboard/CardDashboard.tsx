import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Inter} from "next/dist/compiled/@next/font/dist/google";
import {getCompanyKeyMetrics} from "@/lib/data";

type DashboardCard = {
    title: string,
    value: string | number,
    className?: string,
}

interface CardWrapperProps {
    ticker: string;
}

export default async function CardWrapper({ticker}: CardWrapperProps) {
    
    return (
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 xl:grid-cols-5">
            <CardDashboard  title="Company name" value="Apple Inc."/>
            <CardDashboard  title="Sector" value="Technology"/>
            <CardDashboard  title="Price" value={40404}/>
            <CardDashboard  title="Discounted Cash Flow" value={1231}/>
            <CardDashboard  title="Market Capitalisation" value={4254235} />
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
                <div className="text-xl font-bold text-zinc-700 xl:text-2xl">{value}</div>
            </CardContent>
        </Card>
    );
}
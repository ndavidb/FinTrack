"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { usePortfolioPerformance } from "@/hooks/usePortfolioPerformance";

interface StockPriceChartProps {
    className?: string,
}

const chartConfig = {
    performance: {
        label: "Performance",
        color: "#4f46e6",
    },
} satisfies ChartConfig

export default function PortfolioPerformanceChart({ className }: StockPriceChartProps) {
    const { data: portfolioPerformance, error, isLoading } = usePortfolioPerformance();

    if (isLoading) return <div>Loading...</div>
    if (error) {
        if (error.status === 401) {
            return <div>Your session has expired. Please log in again to view your portfolio performance.</div>
        }
        return <div>Error loading data: {error.message}</div>
    }
    if (!portfolioPerformance) return null

    return (
        <div className={className}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">General Stocks Performance - Last 30 Days</CardTitle>
                </CardHeader>
                <CardContent className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <ChartContainer config={chartConfig}>
                            <AreaChart
                                data={portfolioPerformance}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="date"
                                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                                    angle={-45}
                                    textAnchor="end"
                                    height={70}
                                />
                                <YAxis
                                    tickFormatter={(value) => `${value.toFixed(2)}%`}
                                />
                                <ChartTooltip
                                    content={
                                        <ChartTooltipContent
                                            labelFormatter={(value) => new Date(value).toLocaleDateString()}
                                            formatter={(value: any) => [`${value.toFixed(2)} %`]}
                                        />
                                    }
                                />
                                <Area
                                    type="monotone"
                                    dataKey="performance"
                                    stroke="var(--color-performance)"
                                    fill="var(--color-performance)"
                                    fillOpacity={0.3}
                                />
                            </AreaChart>
                        </ChartContainer>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}
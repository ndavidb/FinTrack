import {getCompanyCashFlow} from "@/lib/data";
import StatementTable from "@/components/StatementTable/statementTable";
import {useParams} from "next/navigation";
import {formatLargeMonetaryNumber} from "@/helpers/NumberFormatting";

interface Props {
}

const config = [
    {
        label: "Date",
        render: (company: CompanyCashFlow) => company.date,
    },
    {
        label: "Operating Cashflow",
        render: (company: CompanyCashFlow) => formatLargeMonetaryNumber(company.operatingCashFlow),
    },
    {
        label: "Investing Cashflow",
        render: (company: CompanyCashFlow) =>
            formatLargeMonetaryNumber(company.netCashUsedForInvestingActivites),
    },
    {
        label: "Financing Cashflow",
        render: (company: CompanyCashFlow) =>
            formatLargeMonetaryNumber(company.netCashUsedProvidedByFinancingActivities),
    },
    {
        label: "Cash At End of Period",
        render: (company: CompanyCashFlow) => formatLargeMonetaryNumber(company.cashAtEndOfPeriod),
    },
    {
        label: "CapEX",
        render: (company: CompanyCashFlow) => formatLargeMonetaryNumber(company.capitalExpenditure),
    },
    {
        label: "Issuance Of Stock",
        render: (company: CompanyCashFlow) => formatLargeMonetaryNumber(company.commonStockIssued),
    },
    {
        label: "Free Cash Flow",
        render: (company: CompanyCashFlow) => formatLargeMonetaryNumber(company.freeCashFlow),
    },
];

export default async function Page({params} : {params: {ticker: string}}) {
    const ticker = params.ticker;
    const data = await getCompanyCashFlow(ticker);
    if (!data) return <div>Loading Cash Flow data...</div>
    return (
        <div className="bg-white">
            <h2 className="font-bold text-xl mb-2 p-3">Cash Flow Statement</h2>
            <StatementTable config={config} data={data}/>
        </div>
    );
};

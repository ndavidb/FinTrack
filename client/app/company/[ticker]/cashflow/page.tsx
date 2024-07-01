import {getCompanyCashFlow} from "@/lib/data";
import StatementTable from "@/components/StatementTable/statementTable";
import {useParams} from "next/navigation";

interface Props {
}

const config = [
    {
        label: "Date",
        render: (company: CompanyCashFlow) => company.date,
    },
    {
        label: "Operating Cashflow",
        render: (company: CompanyCashFlow) => company.operatingCashFlow,
    },
    {
        label: "Investing Cashflow",
        render: (company: CompanyCashFlow) =>
            company.netCashUsedForInvestingActivites,
    },
    {
        label: "Financing Cashflow",
        render: (company: CompanyCashFlow) =>
            company.netCashUsedProvidedByFinancingActivities,
    },
    {
        label: "Cash At End of Period",
        render: (company: CompanyCashFlow) => company.cashAtEndOfPeriod,
    },
    {
        label: "CapEX",
        render: (company: CompanyCashFlow) => company.capitalExpenditure,
    },
    {
        label: "Issuance Of Stock",
        render: (company: CompanyCashFlow) => company.commonStockIssued,
    },
    {
        label: "Free Cash Flow",
        render: (company: CompanyCashFlow) => company.freeCashFlow,
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

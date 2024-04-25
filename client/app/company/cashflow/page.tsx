import {getCompanyCashFlow} from "@/lib/data";
import StatementTable from "@/components/StatementTable/statementTable";

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

export default async function Page({}: Props) {
    const data = await getCompanyCashFlow("AAPL");
    if (!data) return <div>Loading Cash Flow data...</div>
    return (
        <div>
            <h2 className="font-bold text-xl mb-3">Cash Flow Statement</h2>
            <StatementTable config={config} data={data}/>
        </div>
    );
};

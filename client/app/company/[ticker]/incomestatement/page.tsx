import {getCompanyIncomeStatement} from "@/lib/data";
import StatementTable from "@/components/StatementTable/statementTable";

interface Props {
    params : {ticker: string};
}

const config = [
    {
        label: "Date",
        render: (company: CompanyIncomeStatement) => company.date,
    },
    {
        label: "Revenue",
        render: (company: CompanyIncomeStatement) => company.revenue,
    },
    {
        label: "Cost Of Revenue",
        render: (company: CompanyIncomeStatement) => company.costOfRevenue,
    },
    {
        label: "Depreciation",
        render: (company: CompanyIncomeStatement) =>
            company.depreciationAndAmortization,
    },
    {
        label: "Operating Income",
        render: (company: CompanyIncomeStatement) => company.operatingIncome,
    },
    {
        label: "Income Before Taxes",
        render: (company: CompanyIncomeStatement) => company.incomeBeforeTax,
    },
    {
        label: "Net Income",
        render: (company: CompanyIncomeStatement) => company.netIncome,
    },
    {
        label: "Net Income Ratio",
        render: (company: CompanyIncomeStatement) => company.netIncomeRatio,
    },
    {
        label: "Earnings Per Share",
        render: (company: CompanyIncomeStatement) => company.eps,
    },
    {
        label: "Earnings Per Diluted",
        render: (company: CompanyIncomeStatement) => company.epsdiluted,
    },
    {
        label: "Gross Profit Ratio",
        render: (company: CompanyIncomeStatement) => company.grossProfitRatio,
    },
    {
        label: "Opearting Income Ratio",
        render: (company: CompanyIncomeStatement) => company.operatingIncomeRatio,
    },
    {
        label: "Income Before Taxes Ratio",
        render: (company: CompanyIncomeStatement) => company.incomeBeforeTaxRatio,
    },
];

export default async function Page({params}: Props) {
    const ticker = params.ticker;
    const incomeStatementData = await getCompanyIncomeStatement(ticker);
    if (!incomeStatementData) return <div>Loading Income Statement data...</div>
    return (
        <div className="bg-white">
            <h2 className="font-bold text-xl mb-3">Income Statement</h2>
            <StatementTable config={config} data={incomeStatementData}/>
        </div>
    );
};

import {getCompanyIncomeStatement} from "@/lib/data";
import StatementTable from "@/components/StatementTable/statementTable";
import {formatLargeMonetaryNumber} from "@/helpers/NumberFormatting";

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
        render: (company: CompanyIncomeStatement) => formatLargeMonetaryNumber(company.revenue),
    },
    {
        label: "Cost Of Revenue",
        render: (company: CompanyIncomeStatement) => formatLargeMonetaryNumber(company.costOfRevenue),
    },
    {
        label: "Depreciation",
        render: (company: CompanyIncomeStatement) =>
            formatLargeMonetaryNumber(company.depreciationAndAmortization),
    },
    {
        label: "Operating Income",
        render: (company: CompanyIncomeStatement) => formatLargeMonetaryNumber(company.operatingIncome),
    },
    {
        label: "Income Before Taxes",
        render: (company: CompanyIncomeStatement) => formatLargeMonetaryNumber(company.incomeBeforeTax),
    },
    {
        label: "Net Income",
        render: (company: CompanyIncomeStatement) => formatLargeMonetaryNumber(company.netIncome),
    },
    {
        label: "Net Income Ratio",
        render: (company: CompanyIncomeStatement) => formatLargeMonetaryNumber(company.netIncomeRatio),
    },
    {
        label: "Earnings Per Share",
        render: (company: CompanyIncomeStatement) => formatLargeMonetaryNumber(company.eps),
    },
    {
        label: "Earnings Per Diluted",
        render: (company: CompanyIncomeStatement) => formatLargeMonetaryNumber(company.epsdiluted),
    },
    {
        label: "Gross Profit Ratio",
        render: (company: CompanyIncomeStatement) => formatLargeMonetaryNumber(company.grossProfitRatio),
    },
    {
        label: "Opearting Income Ratio",
        render: (company: CompanyIncomeStatement) => formatLargeMonetaryNumber(company.operatingIncomeRatio),
    },
    {
        label: "Income Before Taxes Ratio",
        render: (company: CompanyIncomeStatement) => formatLargeMonetaryNumber(company.incomeBeforeTaxRatio),
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

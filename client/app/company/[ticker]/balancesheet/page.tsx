import {getCompanyBalanceSheet} from "@/lib/data";
import RatioList from "@/components/ui/ratioList";
import {formatLargeMonetaryNumber} from "@/helpers/NumberFormatting";

type Props = {};

const config = [
    {
        label: <div className="font-bold">Total Assets</div>,
        render: (company: CompanyBalanceSheet) => formatLargeMonetaryNumber(company.totalAssets),
    },
    {
        label: "Current Assets",
        render: (company: CompanyBalanceSheet) => formatLargeMonetaryNumber(company.totalCurrentAssets),
    },
    {
        label: "Total Cash",
        render: (company: CompanyBalanceSheet) => formatLargeMonetaryNumber(company.cashAndCashEquivalents),
    },
    {
        label: "Property & equipment",
        render: (company: CompanyBalanceSheet) => formatLargeMonetaryNumber(company.propertyPlantEquipmentNet),
    },
    {
        label: "Intangible Assets",
        render: (company: CompanyBalanceSheet) => formatLargeMonetaryNumber(company.intangibleAssets),
    },
    {
        label: "Long Term Debt",
        render: (company: CompanyBalanceSheet) => formatLargeMonetaryNumber(company.longTermDebt),
    },
    {
        label: "Total Debt",
        render: (company: CompanyBalanceSheet) => formatLargeMonetaryNumber(company.otherCurrentLiabilities),
    },
    {
        label: <div className="font-bold">Total Liabilities</div>,
        render: (company: CompanyBalanceSheet) => formatLargeMonetaryNumber(company.totalLiabilities),
    },
    {
        label: "Current Liabilities",
        render: (company: CompanyBalanceSheet) => formatLargeMonetaryNumber(company.totalCurrentLiabilities),
    },
    {
        label: "Long-Term Debt",
        render: (company: CompanyBalanceSheet) => formatLargeMonetaryNumber(company.longTermDebt),
    },
    {
        label: "Long-Term Income Taxes",
        render: (company: CompanyBalanceSheet) => formatLargeMonetaryNumber(company.otherLiabilities),
    },
    {
        label: "Stakeholder's Equity",
        render: (company: CompanyBalanceSheet) => formatLargeMonetaryNumber(company.totalStockholdersEquity),
    },
    {
        label: "Retained Earnings",
        render: (company: CompanyBalanceSheet) => formatLargeMonetaryNumber(company.retainedEarnings),
    },
];
export default async function BalanceSheetPage({params}: {params:{ticker:string}}){
    const ticker = params.ticker;
    const data = await getCompanyBalanceSheet(ticker)
    if (!data) return <div>Loading data...</div>
    const balanceSheetData = data[0];
    return (
        <>
            <h2 className="font-bold text-xl mb-3">Balance Sheet</h2>
            <div className="w-1/2">
                <RatioList config={config} data={balanceSheetData}/>
            </div>
        </>
        
    );
};


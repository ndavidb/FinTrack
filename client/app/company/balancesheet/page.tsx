import {getCompanyBalanceSheet} from "@/lib/data";
import RatioList from "@/components/ui/ratioList";

type Props = {};

const config = [
    {
        label: <div className="font-bold">Total Assets</div>,
        render: (company: CompanyBalanceSheet) => company.totalAssets,
    },
    {
        label: "Current Assets",
        render: (company: CompanyBalanceSheet) => company.totalCurrentAssets,
    },
    {
        label: "Total Cash",
        render: (company: CompanyBalanceSheet) => company.cashAndCashEquivalents,
    },
    {
        label: "Property & equipment",
        render: (company: CompanyBalanceSheet) => company.propertyPlantEquipmentNet,
    },
    {
        label: "Intangible Assets",
        render: (company: CompanyBalanceSheet) => company.intangibleAssets,
    },
    {
        label: "Long Term Debt",
        render: (company: CompanyBalanceSheet) => company.longTermDebt,
    },
    {
        label: "Total Debt",
        render: (company: CompanyBalanceSheet) => company.otherCurrentLiabilities,
    },
    {
        label: <div className="font-bold">Total Liabilities</div>,
        render: (company: CompanyBalanceSheet) => company.totalLiabilities,
    },
    {
        label: "Current Liabilities",
        render: (company: CompanyBalanceSheet) => company.totalCurrentLiabilities,
    },
    {
        label: "Long-Term Debt",
        render: (company: CompanyBalanceSheet) => company.longTermDebt,
    },
    {
        label: "Long-Term Income Taxes",
        render: (company: CompanyBalanceSheet) => company.otherLiabilities,
    },
    {
        label: "Stakeholder's Equity",
        render: (company: CompanyBalanceSheet) => company.totalStockholdersEquity,
    },
    {
        label: "Retained Earnings",
        render: (company: CompanyBalanceSheet) => company.retainedEarnings,
    },
];
const Page = async () => {
    const data = await getCompanyBalanceSheet("AAPL")
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
export default Page;

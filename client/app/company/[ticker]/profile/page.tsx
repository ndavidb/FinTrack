
import {getCompanyKeyMetrics} from "@/lib/data";
import RatioList from "@/components/ui/ratioList";

const config = [
    {
        label: "Market Cap",
        render: (company: CompanyKeyMetrics) => company.marketCapTTM,
        subTitle: "Total value of all a company's shares of stock",
    },
    {
        label: "Current Ratio",
        render: (company: CompanyKeyMetrics) =>
            company.currentRatioTTM,
        subTitle:
            "Measures the companies ability to pay short term debt obligations",
    },
    {
        label: "Return On Equity",
        render: (company: CompanyKeyMetrics) => company.roeTTM,
        subTitle:
            "Return on equity is the measure of a company's net income divided by its shareholder's equity",
    },
    {
        label: "Return On Assets",
        render: (company: CompanyKeyMetrics) =>
            company.returnOnTangibleAssetsTTM,
        subTitle:
            "Return on assets is the measure of how effective a company is using its assets",
    },
    {
        label: "Free Cashflow Per Share",
        render: (company: CompanyKeyMetrics) =>
            company.freeCashFlowPerShareTTM,
        subTitle:
            "Return on assets is the measure of how effective a company is using its assets",
    },
    {
        label: "Book Value Per Share TTM",
        render: (company: CompanyKeyMetrics) =>
            company.bookValuePerShareTTM,
        subTitle:
            "Book value per share indicates a firm's net asset value (total assets - total liabilities) on per share basis",
    },
    {
        label: "Divdend Yield TTM",
        render: (company: CompanyKeyMetrics) =>
            company.dividendYieldTTM,
        subTitle: "Shows how much a company pays each year relative to stock price",
    },
    {
        label: "Capex Per Share TTM",
        render: (company: CompanyKeyMetrics) =>
            company.capexPerShareTTM,
        subTitle:
            "Capex is used by a company to aquire, upgrade, and maintain physical assets",
    },
    {
        label: "Graham Number",
        render: (company: CompanyKeyMetrics) =>
            company.grahamNumberTTM,
        subTitle:
            "This is the upperbouind of the price range that a defensive investor should pay for a stock",
    },
    {
        label: "PE Ratio",
        render: (company: CompanyKeyMetrics) => company.peRatioTTM,
        subTitle:
            "This is the upperbouind of the price range that a defensive investor should pay for a stock",
    },
];

export default async function CompanyProfilePage({params} : {params:{ticker: string}}) {
    const ticker = params.ticker;
    const data = await getCompanyKeyMetrics(ticker);
    
    if (!data) return <div>Loading Company Profile...</div>
    const companyData = data[0];

    return(
        <div>
            <h2 className="font-bold text-xl mb-3">Key metrics</h2>
            <RatioList config={config} data={companyData}/>
        </div>
    )
};

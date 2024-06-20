import {unstable_noStore as nonStore} from "next/cache";
import {Inter} from "next/dist/compiled/@next/font/dist/google";

export async function searchCompanies(query: string){
    nonStore();
    try {
        console.log(`https://financialmodelingprep.com/api/v3/search-ticker?query=${query}&limit=10&exchange=NASDAQ&apikey=${process.env.NEXT_PUBLIC_API_KEY}`)
        const response = await fetch(`https://financialmodelingprep.com/api/v3/search-ticker?query=${query}&limit=10&exchange=NASDAQ&apikey=${process.env.NEXT_PUBLIC_API_KEY}`)
        if (!response.ok){
            throw new Error("Request failed");
        }
        
        const data : CompanySearch[] = await response.json();
        return data;
    } catch (error){
        if (error instanceof Error){
            console.error("Error message: ", error.message)
        } else {
            console.error("Unexpected error: ", error);
            return "Unexpected error occurred." 
        }
    }
}

export async function getCompanyKeyMetrics(query: string){
    nonStore();
    try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/key-metrics-ttm/${query}?apikey=${process.env.NEXT_PUBLIC_API_KEY}`)
        
        if (!response.ok){
            throw new Error("Request failed")
        }
        
        const data: CompanyKeyMetrics[] = await response.json();
        return data;
    } catch (error: any) {
        console.error('Error fetching key metrics:', error.message);
        return undefined;
    }
}

export async function getCompanyBalanceSheet(query: string){
    nonStore();
    try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/balance-sheet-statement/${query}?limit=40&apikey=${process.env.NEXT_PUBLIC_API_KEY}`)
        if (!response.ok){
            throw new Error("Request failed");
        }
        
        const data: CompanyBalanceSheet[] = await response.json();
        return data;
    } catch (error: any){
        console.error('Error fetching balance sheet:', error.message);
        return undefined;
    }
}

export async function getCompanyCashFlow(query: string){
    nonStore();
    try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/cash-flow-statement/${query}?limit=40&apikey=${process.env.NEXT_PUBLIC_API_KEY}`)
        if (!response.ok){
            throw new Error("Request failed");
        }

        const data: CompanyCashFlow[] = await response.json();
        return data;
    } catch (error: any){
        console.error('Error fetching CashFlow data:', error.message);
        return undefined;
    }
}

export async function getCompanyIncomeStatement(query: string){
    nonStore();
    try {
        const response = await fetch(
            `https://financialmodelingprep.com/api/v3/income-statement/${query}?limit=50&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
        )
        if (!response.ok){
            throw new Error("Request failed");
        }

        const data: CompanyIncomeStatement[] = await response.json();
        return data;
    } catch (error: any){
        console.error('Error fetching CashFlow data:', error.message);
        return undefined;
    }
}


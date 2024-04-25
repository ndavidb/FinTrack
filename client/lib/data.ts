export async function searchCompanies(query: string){
    try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/search-ticker?query=${query}&limit=10&exchange=NASDAQ&apikey=${process.env.REACT_APP_API}`)
        
        if (!response.ok){
            throw new Error("Request failed");
        }
        
        const data : CompanySearch = await response.json();
        console.log(process.env.REACT_APP_API_KEY);
        console.log(data);
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
    try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/key-metrics-ttm/${query}?apikey=${process.env.API_KEY}`)
        
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
    try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/balance-sheet-statement/${query}?limit=40&apikey=${process.env.API_KEY}`)
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
    try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/cash-flow-statement/${query}?limit=40&apikey=${process.env.API_KEY}`)
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
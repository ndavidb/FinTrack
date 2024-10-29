import {unstable_noStore as nonStore} from "next/cache";


export async function searchCompanies(query: string) {
    nonStore();
    try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/search?query=${query}&limit=15&exchange=NASDAQ&apikey=${process.env.NEXT_PUBLIC_API_KEY}`);
        if (!response.ok) {
            throw new Error("Request failed");
        }

        const data: CompanySearch[] = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error message: ", error.message);
        } else {
            console.error("Unexpected error: ", error);
        }
        return "Unexpected error occurred.";
    }
}

export async function getCompanyProfile(query: string) {
    nonStore();
    
    try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/profile/${query}?apikey=${process.env.NEXT_PUBLIC_API_KEY}`);
        if (!response.ok) {
            throw new Error("Request failed");
        }
        const data: CompanyProfile[] = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error message: ", error.message);
        } else {
            console.error("Unexpected error: ", error);
        }
        return undefined;
    }
}

export async function getCompanyKeyMetrics(query: string) {
    nonStore();
    
    try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/key-metrics-ttm/${query}?apikey=${process.env.NEXT_PUBLIC_API_KEY}`);
        if (!response.ok) {
            throw new Error("Request failed");
        }

        const data: CompanyKeyMetrics[] = await response.json();
        return data;
    } catch (error: any) {
        console.error('Error fetching key metrics:', error.message);
        return undefined;
    }
}

export async function getCompanyBalanceSheet(query: string) {
    nonStore();
    
    try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/balance-sheet-statement/${query}?limit=40&apikey=${process.env.NEXT_PUBLIC_API_KEY}`);
        if (!response.ok) {
            throw new Error("Request failed");
        }

        const data: CompanyBalanceSheet[] = await response.json();
        return data;
    } catch (error: any) {
        console.error('Error fetching balance sheet:', error.message);
        return undefined;
    }
}

export async function getCompanyCashFlow(query: string) {
    nonStore();
    
    try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/cash-flow-statement/${query}?limit=40&apikey=${process.env.NEXT_PUBLIC_API_KEY}`);
        if (!response.ok) {
            throw new Error("Request failed");
        }

        const data: CompanyCashFlow[] = await response.json();
        return data;
    } catch (error: any) {
        console.error('Error fetching CashFlow data:', error.message);
        return undefined;
    }
}

export async function getCompanyIncomeStatement(query: string) {
    nonStore();
    
    try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/income-statement/${query}?limit=50&apikey=${process.env.NEXT_PUBLIC_API_KEY}`);
        if (!response.ok) {
            throw new Error("Request failed");
        }

        const data: CompanyIncomeStatement[] = await response.json();
        return data;
    } catch (error: any) {
        console.error('Error fetching CashFlow data:', error.message);
        return undefined;
    }
}

export async function getStocksPortfolio(): Promise<StockPortfolio[]> {
    nonStore();

    const {cookies} = await import('next/headers');
    const cookieManager = cookies();

    const token = cookieManager.get('token')?.value;

    if (!token) {
        throw new Error('No authentication token found');
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Portfolios`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            cache: 'no-store'
        });

        if (response.status === 401) {
            // Handle unauthorized access
            throw new Error('Unauthorized access');
        }

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            console.error('Received non-array data:', data);
            throw new Error('Invalid data format received from server');
        }

        return data as StockPortfolio[];
    } catch (error: any) {
        console.error('Error fetching portfolio:', error.message);
        throw error;
    }
}

export async function getPortfolioPerformance() : Promise<StockPortfolioPerformance[]>{
    nonStore();
    
    const {cookies} = await import('next/headers');
    const cookieManager = cookies();
    
    const token = cookieManager.get('token')?.value;
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Portfolios/stocks-performance`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: 'include',
        });
        
        if (!response.ok){
            throw new Error(`Request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!Array.isArray(data)){
            console.error('Received non-array data:', data);
            throw new Error('Invalid data format received from server');
        }
        
        return data as StockPortfolioPerformance[];
    } catch (error: any) {
        console.error('Error fetching portfolio:', error.message);
        throw error;
    }
}



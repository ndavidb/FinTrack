import useSWR from "swr";
import Cookies from "js-cookie";

interface PortfolioPerformance {
    date: string;
    performance: number;
}

interface ApiResponse {
    $values: PortfolioPerformance[];
}

const fetcher = async (url: string) => {
    const response = await fetch(url, {
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${await getToken()}`,
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        const error = new Error('An error occurred while fetching the data.') as Error & { status?: number };
        error.status = response.status;
        throw error;
    }
    return response.json();
};

export function usePortfolioPerformance(){
    const {data, error, isLoading} = useSWR<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/portfolios/portfolio-performance`, fetcher);
    
    return {
        data: data?.$values ?? null,
        isLoading,
        error
    };
}

export async function getToken() {
    return Cookies.get('token');
}
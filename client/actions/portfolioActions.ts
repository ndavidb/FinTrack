'use server'

import { revalidatePath } from 'next/cache'
import {cookies} from "next/headers";

export async function removeStockFromPortfolio(symbol: string) {
    const cookiesStore = cookies()
    const token = cookiesStore.get('token')?.value;
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Portfolios?symbol=${symbol}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        revalidatePath('/portfolio');
        return true;
    } catch (error: any) {
        console.error('Error removing stock:', error.message);
        throw error;
    }
}

export async function addStockPortfolio(symbol: string) {
    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Portfolios?symbol=${symbol}`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            }
        });

        const text = await response.text();
        let data;
        try {
            data = JSON.parse(text);
        } catch (e) {
            data = { message: text };
        }

        if (!response.ok) {
            if (data.message === "Stock already exists in portfolio") {
                return 'exists';
            }
            if (data.message === "Stock not found") {
                return 'not found';
            }
            throw new Error(data.message || `Request failed with status ${response.status}`);
        }

        revalidatePath('/portfolio');
        return true;

    } catch (error: unknown) {
        console.error('Error adding stock:', error);
        throw error;
    }
}
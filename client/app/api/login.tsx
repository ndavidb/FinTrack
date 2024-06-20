import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, body } = req;

    if (method === 'POST') {
        try {
            const apiRes = await fetch('http://localhost:5254/Account/login', { // Correct backend URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (apiRes.ok) {
                const data = await apiRes.json();
                res.status(200).json(data);
            } else {
                const errorData = await apiRes.json(); // Get error details from ASP.NET API
                res.status(apiRes.status).json(errorData);
            }
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ message: error.message || 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}
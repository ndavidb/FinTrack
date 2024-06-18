import {NextApiRequest, NextApiResponse} from "next";
import {UserProfileToken} from "@/models/User";

const api = "http://localhost:5254/api";
export default async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
    const {email, password} = req.body;
    try {
        const response = await fetch(`${api}/account/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password})
        });
        if (!response.ok){
            throw new Error("Request failed"); 
        }
        
        const data: UserProfileToken = await response.json();
        res.status(200).json(data);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

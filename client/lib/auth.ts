import useSWR from 'swr';
import {UserProfileToken} from "@/models/User";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useUser() {
    const { data, error, mutate } = useSWR<UserProfileToken>(false, fetcher);

    return {
        user: data,
        isLoading: !error && !data,
        isError: !!error,
        mutate
    };
}


export function useLogout(){
    
    const router  = useRouter();
    const logout = () => {
        Cookies.remove('token');
        router.push('/')
    }
    
    return logout;
}
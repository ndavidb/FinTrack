import useSWR from 'swr';
import {UserProfileToken} from "@/models/User";

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
import useSWR, { KeyedMutator } from 'swr';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface UserProfileToken {
    id: string;
    email: string;
    accessToken: string;
}

interface UserResponse {
    user: UserProfileToken | null;
    isLoading: boolean;
    isError: boolean;
    mutate: KeyedMutator<UserProfileToken>;
}

const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch user');
    return res.json();
};

export function useUser(): UserResponse {
    const { data, error, mutate } = useSWR<UserProfileToken>(
        false, // Don't automatically fetch
        fetcher
    );

    return {
        user: data || null,
        isLoading: !error && !data,
        isError: !!error,
        mutate,
    };
}

export function useLogout() {
    const router = useRouter();
    const { mutate } = useUser();

    return () => {
        Cookies.remove('token');
        router.push('/');
    };
}
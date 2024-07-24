import React, {ChangeEvent, SyntheticEvent} from "react";
import {FaMagnifyingGlassChart } from "react-icons/fa6";
import {Button} from "@/components/ui/button";

interface Props {
    onSearchSubmit: (e: SyntheticEvent) => void;
    search: string | undefined;
    placeholder: string;
    handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Searchbar({placeholder, onSearchSubmit, handleSearchChange, search}: Props) {
    return (
        <div className="relative w-3/4">
            <form onSubmit={onSearchSubmit} className="flex flex-shrink-0 ">
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <input
                    type="search"
                    placeholder={placeholder}
                    value={search}
                    onChange={handleSearchChange}
                    className="peer font-medium block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm placeholder:text-gray-500 "
                />
                <Button onClick={() => onSearchSubmit} size={"sm"} className="text-sm font-medium ml-4">Search</Button>
            </form>
            <FaMagnifyingGlassChart
                className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
        </div>
    );
};


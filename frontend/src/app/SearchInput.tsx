'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import 'font-awesome/css/font-awesome.min.css'

const SearchInput = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const onSearch = (event: React.FormEvent) => {
        event.preventDefault();

        const encodedSearchQuery = encodeURI(searchQuery);
        router.push(`/search?q=${encodedSearchQuery}`);
    };

    return (
        <form className="search-form" onSubmit={onSearch}>
        <input 
        value={searchQuery}
        onChange={event => setSearchQuery(event.target.value)}
        className="search-bar"
        placeholder="   Sök efter mat här"/>
        <button type="submit"><i className="fa fa-search"></i></button>
        </form>
    )
};

export default SearchInput;
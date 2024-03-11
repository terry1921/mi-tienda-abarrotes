import React, {useState} from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = event.target.value;
        setQuery(newQuery);
        onSearch(newQuery);
    };

    return (
        <section>
            <header className="space-y-4 p-4 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
                <form className="group relative">
                    <svg width="20" height="20"
                         fill="currentColor"
                         className="absolute left-3 top-1/2 -mt-2.5 text-text-tertiary pointer-events-none group-focus-within:text-accent-success"
                         aria-hidden="true">
                        <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"/>
                    </svg>
                    <input
                        className="focus:ring-2 focus:ring-neutral focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-text-tertiary rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        aria-label="Filter projects"
                        placeholder="Buscar productos..."/>
                </form>
            </header>
        </section>
    );
}

export default SearchBar;
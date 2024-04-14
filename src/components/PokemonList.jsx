import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonList_Card";

export default function PokemonList({ pokemonList, totalPages, currentPage, setCurrentPage, handlePageChange, allPokemon, filter, searchInput }) {
    const [filteredData, setFilteredData] = useState(null);
    const [pokemonData, setPokemonData] = useState([]);

    useEffect(() => {
        const fetchDataForAllPokemon = async () => {
            try {
                if (!allPokemon) return;
                const newData = await Promise.all(
                    allPokemon.map(async (pokemon) => {
                        const res = await fetch(pokemon.url);
                        return await res.json();
                    })
                );
                setPokemonData(newData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDataForAllPokemon();
    }, [allPokemon]);

    useEffect(() => {
        if (pokemonData.length > 0) {
            let filtered = pokemonData.filter(pokemon => {
                return pokemon.name.startsWith(searchInput) 
                    || pokemon.id.toString().startsWith(searchInput);
            });
            
            switch (filter) {
                case 'asc-num':
                    filtered = [...filtered].sort((a, b) => a.id - b.id);
                    break;
                case 'desc-num':
                    filtered = [...filtered].sort((a, b) => b.id - a.id);
                    break;
                case 'asc-name':
                    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'desc-name':
                    filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
                    break;
                default:
                    break;
            }
            setFilteredData(filtered);
            setCurrentPage(1);
        }
    }, [searchInput, pokemonData, filter]);

    if (allPokemon.length === 0 || pokemonList.length === 0 || filteredData === null) {
        return (
            <div className='loading-view'>Farfetch'ding
                <span className='dot-1'>.</span>
                <span className='dot-2'>.</span>
                <span className='dot-3'>.</span>
            </div>
        );
    }

    const ITEMS_PER_PAGE = 24;
    const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    return(
        <div className="pokemon--list-wrapper">
            <div className="pokemon--list">
                {paginatedData.map((pokemon, index) => (
                    <PokemonCard
                        key={pokemon.id}
                        pokemonData={pokemon}
                    />
                ))}
            </div>
            <div className="pokemon--page-btns flex-ac-jcc">
                {Array.from({ length: Math.ceil(filteredData.length / ITEMS_PER_PAGE) }, (_, i) => i + 1).map((pageNumber) => (
                    <button className="flex-ac-jcc" key={pageNumber} onClick={() => handlePageChange(pageNumber)}>
                        {pageNumber}
                    </button>
                ))}
            </div>
        </div>
    )
}

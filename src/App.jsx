import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import PokemonList from "./components/PokemonList";

export default function App() {
    const [allPokemon, setAllPokemon] = useState([])
    const [filter, setFilter] = useState('asc-num')
    const [searchInput, setSearchInput] = useState('')
    const [pokemonList, setPokemonList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)


    useEffect(()=> {
        const fetchAllPokemon = async() => {
            const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=721&offset=0')
            const data = await res.json()
            setAllPokemon(data.results)
        }
        fetchAllPokemon()
    }, [])

    const fetchPokemonData = async (page) => {
        setPokemonList([])
        const limit = 24
        const offset = (page - 1) * limit
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
        const data = await res.json()
        const filteredData = data.results.filter(pokemon => pokemon.url.split('/')[6] <= 721);
        setPokemonList(filteredData)
        setTotalPages(Math.ceil(721 / limit))
    }

    useEffect(()=> {
        fetchPokemonData(currentPage)
    }, [currentPage])

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const handleFilterChange = (selectedFilter)=> {
        setFilter(selectedFilter)
    }
    const handleSearch = (search) => {
        setSearchInput(search)
    }

    console.log(searchInput)
    console.log(filter)
    console.log(allPokemon)

    return(
        <main>
            <Header 
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
                searchInput={searchInput}
            />
            {
                <PokemonList
                    pokemonList={pokemonList}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    handlePageChange={handlePageChange}
                    allPokemon={allPokemon}
                    filter={filter} 
                    searchInput={searchInput}
                />
            }
        </main>
    )
}
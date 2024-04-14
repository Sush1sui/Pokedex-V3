import React, { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "../utils";

export default function PokemonCard({pokemonData}) {
    const [pokemon, setPokemon] = useState(null)

    useEffect(()=> {
        async function fetchPokemonData() {
            try {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonData.name}/`);
                const data = await res.json();
                setPokemon(data);
            } catch (error) {
                console.error(error)
            }
        }
        fetchPokemonData()
    }, [pokemonData])

    if(!pokemon) {
        return <div className="pokemon--card-wrapper flex-ac-jcc">
                    <h4 className="card-loading">
                        Farfetch'ding
                        <span className='dot-1'>.</span>
                        <span className='dot-2'>.</span>
                        <span className='dot-3'>.</span>
                    </h4>
                </div>
    }

    return (
        <div className="pokemon--card-wrapper flex-ac-jcc">
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={`${pokemon.name} photo`} />
            <h4>{`#${pokemon.id} ${capitalizeFirstLetter(pokemon.name)}`}</h4>
        </div>
    )
}
"use client";

import { useEffect, useState } from "react";
import "./style.css";
import Pokemon from "./pokemon";
import { useSearchParams } from "next/navigation";

export default function Pokedex() {
    const paginate = useSearchParams().get("paginate");

    const [paginateState, setPaginateState] = useState(paginate || 1);
    const [pokemons, setPokemons] = useState([]);
    const [pokemonsFiltered, setPokemonsFiltered] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        const fetchPokemons = async () => {
            const response = await fetch("https://pokeapi.co/api/v2/pokedex/2");
            const data = await response.json();
            const newPokemons = data.pokemon_entries.map((pokemon) => ({
                id: pokemon.entry_number,
                name: pokemon.pokemon_species.name,
            }));
            setPokemons(newPokemons);
            setPokemonsFiltered(newPokemons);
        };
        fetchPokemons();
    }, []);

    useEffect(() => {
        if (filter.length >= 3) {
            const newPokemonsFiltered = pokemons.filter((pokemon) =>
                pokemon.name.includes(filter.toLowerCase()),
            );
            setPokemonsFiltered(newPokemonsFiltered);

            if (paginateState > Math.ceil(newPokemonsFiltered?.length / 25)) {
                setPaginateState(
                    Math.ceil(newPokemonsFiltered?.length / 25) || 1,
                );
            }
        } else {
            setPokemonsFiltered(pokemons);
        }
    }, [filter]);

    const onClick = (isLeft) => {
        const newValue = isLeft ? paginateState - 1 : paginateState + 1;

        if (isLeft && newValue > 1) {
            setPaginateState(newValue);
        } else if (
            !isLeft &&
            newValue <= Math.ceil(pokemonsFiltered?.length / 25)
        ) {
            setPaginateState(newValue);
        }
    };

    return (
        <div className="app">
            <div className="pagination">
                <div onClick={() => onClick(true)}>{"<"}</div>
                <div onClick={() => onClick(false)}>{">"}</div>
            </div>
            <div className="input">
                <input
                    type="text"
                    placeholder="Rechercher un pokemon"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>
            <div className="pokedex">
                {pokemonsFiltered
                    .slice((paginateState - 1) * 25, paginateState * 25)
                    .map((pokemon) => (
                        <Pokemon
                            key={pokemon.id}
                            id={pokemon.id}
                            name={pokemon.name}
                        />
                    ))}
            </div>
        </div>
    );
}

"use server";

import { prisma } from "../../lib/prisma";

// Ici tu sais à quoi va ressembler tes paramètres d'entrée !
interface PokemonInTeam {
    entry: number;
    level: number;
}

interface createTeamInfos {
    name: string;
    pokemons: PokemonInTeam[];
}

export const createTeam = async ({ name, pokemons }: createTeamInfos) => {
    // Complète la fonction !
    console.log(name, pokemons);
    const team = await prisma.team.create({
        data: {
            name,
            userId: 1,
        },
    });

    console.log(team);

    const pokemonsDB = await prisma.pokemon.createMany({
        data: pokemons.map((pokeData) => ({
            pokemonEntry: pokeData.entry,
            level: pokeData.level,
            teamId: team.id,
        })),
    });

    return pokemonsDB;
};

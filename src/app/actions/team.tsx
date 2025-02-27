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
};

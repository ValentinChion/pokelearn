import "./team.css";
import { prisma } from "@/lib/prisma";

// If Connection Timeout, disable your ipv6
const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

type PokemonDetails = {
    name: string;
    types: { type: { name: string } }[];
    level: number;
    imageSrc: string;
};

export default async function TeamPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const teamId = (await params).id;

    const teams = await prisma.team.findMany({
        include: {
            user: true,
            pokemons: true,
        },
    });

    const team = teams.find(({ id }) => id === +teamId);

    const pokemonsDetails: PokemonDetails[] =
        (await Promise.all(
            team?.pokemons.map(async (poke) => {
                const pokemonDataResponse = await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${poke.pokemonEntry}`,
                );
                const { name, types, sprites } =
                    await pokemonDataResponse.json();

                return {
                    name,
                    types,
                    level: poke.level,
                    imageSrc: sprites.front_default,
                };
            }),
        )) || [];

    if (!team) return <div>Oops, il n'y a pas d'équipe correspondante...</div>;

    return (
        <div className="teamContent">
            <div className="teamHeader">
                <div className="teamName">{team.name}</div>
                <div className="teamOwner">
                    Appartient à <b>{team.user.name}</b>
                </div>
            </div>
            <div className="pokemonsTeam">
                {pokemonsDetails?.map((pokemon) => (
                    <div key={pokemon.name} className="pokemonCard">
                        <img src={pokemon.imageSrc} alt={pokemon.name} />
                        <div className="pokemonName">{pokemon.name}</div>
                        <div className="pokemonLevel">
                            Niveau {pokemon.level}
                        </div>
                        <div className="pokemonTypes">
                            {pokemon.types.map((type) => (
                                <div key={type.type.name}>{type.type.name}</div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

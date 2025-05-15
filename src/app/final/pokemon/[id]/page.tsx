// If Connection Timeout, disable your ipv6
import Image from "next/image";
import "./details.css";
const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export default async function PokemonPage({
    params,
}: {
    params: { id: string };
}) {
    const pokemonData = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${params.id}`,
    );
    const pokemon = await pokemonData.json();

    return (
        <div>
            <div className="title">{capitalize(pokemon.name)}</div>
            <div className="details">
                <div className="sprites">
                    <div>
                        <Image
                            className="sprite"
                            src={pokemon.sprites.front_default}
                            alt="front"
                            width={100}
                            height={100}
                        />
                        <Image
                            className="sprite"
                            src={pokemon.sprites.back_default}
                            alt="back"
                            width={100}
                            height={100}
                        />
                    </div>
                    <div>
                        <Image
                            className="sprite"
                            src={pokemon.sprites.front_shiny}
                            alt="front shiny"
                            width={100}
                            height={100}
                        />
                        <Image
                            className="sprite"
                            src={pokemon.sprites.back_shiny}
                            alt="back shiny"
                            width={100}
                            height={100}
                        />
                    </div>
                </div>

                <div className="typesTitle">Types :</div>
                <div className="types">
                    {pokemon.types.map((type: { type: { name: string } }) => (
                        <div key={type.type.name}>{type.type.name}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}

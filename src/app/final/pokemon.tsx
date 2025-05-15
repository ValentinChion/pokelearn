import { useRouter } from "next/navigation";
import "./pokemon.css";

export default function Pokemon({ name, id }) {
    const router = useRouter();
    const src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    return (
        <div
            className="pokemon"
            onClick={() => router.push(`/test/pokemon/${id}`)}
        >
            <img src={src} />
            <div>Name : {name}</div>
            <div>Id : {id}</div>
        </div>
    );
}

import { useState, useEffect } from "react";

function Pokemon({ url }) {
    let [pokemon, setPokemon] = useState();

    useEffect(() => {
        if (url != "") console.log(url);
        if (url != "") searchPokemon(url);
    }, [url]);

    useEffect(() => {
        if (pokemon != undefined) console.log(pokemon);
    }, [pokemon]);

    let searchPokemon = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        setPokemon(data);
    };

    return (
        <div>
            <img
                src={
                    pokemon != undefined
                        ? pokemon.sprites.other.dream_world.front_default
                        : ""
                }
                alt=""
            />
        </div>
    );
}

export default Pokemon;

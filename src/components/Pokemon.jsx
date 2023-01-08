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

    let tipoElemento = () => {};

    let estadisticas = () => {};

    return (
        <div>
            <div>
                <p></p>
            </div>
            <img
                src={
                    pokemon != undefined
                        ? pokemon.sprites.other.dream_world.front_default
                        : ""
                }
                alt=""
            />
            <div>{tipoElemento}</div>
            <div>{estadisticas}</div>
            <div>
                <p></p>
            </div>
        </div>
    );
}

export default Pokemon;

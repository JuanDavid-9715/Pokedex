import { useState, useEffect } from "react";

function Pokemon({ url }) {
    let [pokemon, setPokemon] = useState();
    let [listTextPokemonSpanish, setListTextPokemonSpanish] = useState();

    useEffect(() => {
        if (url != "") searchPokemon(url);
    }, [url]);

    let searchPokemon = async (url) => {
        const res = await fetch(url);
        const dataPokemon = await res.json();
        const dataSpecies = await searchSpeciesPokemon(dataPokemon.species.url);
        const ListaTextPokemonSpanish =
            ObtenerListTextPokemonSpanish(dataSpecies);
        setPokemon(dataPokemon);
        setListTextPokemonSpanish(ListaTextPokemonSpanish);
    };

    let searchSpeciesPokemon = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    };

    const ObtenerListTextPokemonSpanish = (dataSpecies) => {
        const list = dataSpecies.flavor_text_entries
            .map((TextPokemonSpanish) => {
                if (TextPokemonSpanish.language.name === "es") {
                    return TextPokemonSpanish.flavor_text;
                }
            })
            .filter((TextPokemonSpanish) => {
                if (TextPokemonSpanish != undefined) {
                    return TextPokemonSpanish;
                }
            });

        return list;
    };

    let tipoElemento = pokemon?.types.map((tipo, i) => (
        <div key={i} className={`type type-${tipo.type.name}`}>
            {tipo.type.name}
        </div>
    ));

    let estadisticas = pokemon?.stats.map((estadistica, i) => (
        <div key={i} className="containerStatsOne">
            <p className="statsText">{estadistica.stat.name}</p>
            <div className="statsBarr">
                <div
                    className="starsBarrInterna"
                    style={{ width: `${estadistica.base_stat}px` }}
                ></div>
            </div>
        </div>
    ));

    let aleatoryTextPokemonSpanish = (
        <p>
            {listTextPokemonSpanish
                ? listTextPokemonSpanish[
                      Math.floor(Math.random() * listTextPokemonSpanish.length)
                  ]
                : ""}
        </p>
    );

    return (
        <div>
            <div className="containerType">
                <p>{pokemon?.name}</p>
            </div>
            <img
                src={pokemon ? pokemon.sprites.other.home.front_default : ""}
                alt=""
            />
            <div>{tipoElemento}</div>
            <ul className="containerStats">{estadisticas}</ul>
            <div>{aleatoryTextPokemonSpanish}</div>
        </div>
    );
}

export default Pokemon;

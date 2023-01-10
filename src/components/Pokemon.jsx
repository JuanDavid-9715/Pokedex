import { useState, useEffect } from "react";

import "./../assets/styles/_pokemon.scss";

function Pokemon({ url }) {
    let [pokemon, setPokemon] = useState();
    let [listTextPokemonSpanish, setListTextPokemonSpanish] = useState();

    useEffect(() => {
        if (url != "") searchPokemon(url);
    }, [url]);

    useEffect(() => {
        if (pokemon != "") console.log(pokemon);
    }, [pokemon]);

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
                    style={{
                        width: `${estadistica.base_stat}%`,
                    }}
                ></div>
            </div>
        </div>
    ));

    let aleatoryTextPokemonSpanish = (
        <p className="Text">
            {listTextPokemonSpanish
                ? listTextPokemonSpanish[
                      Math.floor(Math.random() * listTextPokemonSpanish.length)
                  ]
                : ""}
        </p>
    );

    return (
        <>
            <div className="containerTitleName">
                <p className="titleName">{pokemon?.name}</p>
            </div>
            <div className="containerFoto">
                <img
                    className="foto"
                    src={
                        pokemon ? pokemon.sprites.other.home.front_default : ""
                    }
                    alt=""
                />
            </div>
            <div className="containerElemento">{tipoElemento}</div>
            <ul className="containerStats">{estadisticas}</ul>
            <div className="containerText">{aleatoryTextPokemonSpanish}</div>
        </>
    );
}

export default Pokemon;

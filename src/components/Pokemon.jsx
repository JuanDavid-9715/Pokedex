import { useState, useEffect } from "react";

function Pokemon({ url }) {
    let [pokemon, setPokemon] = useState();
    let [specie, setSpecie] = useState();

    // useEffect

    useEffect(() => {
        if (url != "") searchPokemon(url);
    }, [url]);

    useEffect(() => {
        /* if (pokemon != undefined) console.log(pokemon); */
        if (pokemon != undefined) searchSpeciesPokemon(pokemon.species.url);
    }, [pokemon]);

    /* useEffect(() => {
        if (specie != undefined) console.log(specie);
    }, [specie]); */

    // API

    let searchPokemon = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        setPokemon(data);
    };

    let searchSpeciesPokemon = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        setSpecie(data);
    };

    let searchTypePokemon = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        /* setType(data); */
        console.log(data);
        return data.names[5].name;
    };

    // Funciones
    // --Descripción

    const ObtenerListTextPokemonSpanish = () => {
        const list = specie.flavor_text_entries
            .map((e) => {
                if (e.language.name === "es") {
                    return e.flavor_text;
                }
            })
            .filter((e) => {
                if (e != undefined) {
                    return e;
                }
            });

        return list;
    };

    const texto = () => {
        const list = ObtenerListTextPokemonSpanish();

        return list[Math.floor(Math.random() * list.length)];
    };

    // Funciones HTML
    // --Elemento

    let tipoElemento = pokemon?.types.map((e, i) => (
        <div key={i} className={`type type-${e.type.name}`}>
            <p className="title-type">{e.type.name}</p>
        </div>
    ));

    // --Estadísticas

    const BuildBar = (stats) => (
        <div
            className="starsBarrInterna"
            style={{
                backgroundColor: `${specie.color.name}`,
                width: `${stats.base_stat / 2.3}%`,
            }}
        ></div>
    );
    let stats = pokemon?.stats.map((stats, i) => (
        <div key={i} className="containerStatsOne">
            <p className="statsText">{stats.stat.name}</p>
            <div className="statsBarr">{specie ? BuildBar(stats) : ""}</div>
        </div>
    ));

    // --Descripción

    let aleatoryTextPokemonSpanish = (
        <p className="Text">{specie ? texto() : ""}</p>
    );

    // return

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
            <ul className="containerStats">{stats}</ul>
            <div className="containerTextText">
                <div className="containerText">
                    {aleatoryTextPokemonSpanish}
                </div>
            </div>
        </>
    );
}

export default Pokemon;

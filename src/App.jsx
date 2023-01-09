import { useState, useEffect } from "react";
import Pokemon from "./components/Pokemon";

import "./App.scss";

function App() {
    let [pokemons, setPokemons] = useState();
    let [numPokemon, setNumPokemon] = useState(0);

    useEffect(() => {
        searchPokemons();
    }, []);

    let searchPokemons = async () => {
        const res = await fetch(
            "https://pokeapi.co/api/v2/pokemon?offset=0&limit=2000"
        );
        const data = await res.json();
        setPokemons(data.results);
    };

    const crearLista = pokemons?.map((pokemon, i) => (
        <li key={i} className={`containerPokemon Pokemon${i}`}>
            <img className="logo" src="/src/assets/svg/pokeBola.svg" alt="" />

            <div className="containerNumPokemon">
                <p>{i + 1}</p>
            </div>
            <button
                className="containerNamePokemon"
                onClick={() => {
                    setNumPokemon(i);
                }}
            >
                <p>{pokemon.name}</p>
            </button>
        </li>
    ));

    return (
        <div className="pokedex">
            <div className="pokedexName">
                <p>POKEDEX</p>
            </div>
            <div className="pokemonInfo">
                <Pokemon
                    url={pokemons != undefined ? pokemons[numPokemon].url : ""}
                />
            </div>

            <ul className="pokemonLista">{crearLista}</ul>

            <div className="containerControl">
                <button
                    className="buttonControl previous"
                    onClick={() => {
                        numPokemon > 0
                            ? setNumPokemon(numPokemon - 1)
                            : alert("no hay mas pokemon");
                    }}
                ></button>
                <div className="containerScroll">
                    <div className="scroll"></div>
                </div>
                <button
                    className="buttonControl next"
                    onClick={() => {
                        numPokemon < 1024
                            ? setNumPokemon(numPokemon + 1)
                            : alert("no hay mas pokemon");
                    }}
                ></button>
            </div>
            <div className="creadorName">
                <p>JUAN DAVID MEDELLIN CALDERON</p>
            </div>
        </div>
    );
}

export default App;

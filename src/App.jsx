import { useState, useEffect } from "react";
import Pokemon from "./components/Pokemon";

import "./App.css";

function App() {
    let [pokemons, setPokemons] = useState();
    let [numPokemon, setNumPokemon] = useState(0);

    useEffect(() => {
        searchPokemons();
    }, []);

    useEffect(() => {
        if (pokemons != undefined) console.log(pokemons);
        /* if (pokemons != undefined) console.log(pokemons[numPokemon].url); */
    }, [pokemons]);

    let searchPokemons = async () => {
        const res = await fetch(
            "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1025"
        );
        const data = await res.json();
        setPokemons(data.results);
        console.log(data);
    };

    return (
        <>
            <div className="pokemonInfo">
                <Pokemon
                    url={pokemons != undefined ? pokemons[numPokemon].url : ""}
                />
            </div>

            <div className="pokemonLista"></div>

            <div className="conteinerControl">
                <button
                    onClick={() => {
                        numPokemon < 512
                            ? setNumPokemon(numPokemon + 1)
                            : alert("no hay mas pokemon");
                    }}
                >
                    next
                </button>
                <button
                    onClick={() => {
                        numPokemon > 0
                            ? setNumPokemon(numPokemon - 1)
                            : alert("no hay mas pokemon");
                    }}
                >
                    previous
                </button>
            </div>
        </>
    );
}

export default App;

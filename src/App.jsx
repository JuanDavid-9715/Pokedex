import { useState, useEffect, useRef } from "react";
import { Events, scrollSpy } from "react-scroll";

import Pokemon from "./components/Pokemon";

import "./App.scss";

function App() {
    const containerTitleDiv = useRef();
    const ScrollTrackDiv = useRef();
    const ScrollThumbDiv = useRef();
    let flag = useRef();
    let scroll = useRef();
    let containerScroll = useRef();

    let [pokemons, setPokemons] = useState();
    let [numPokemon, setNumPokemon] = useState(0);

    useEffect(() => {
        searchPokemons();

        const containerTitle = containerTitleDiv.current;
        const ScrollTrack = ScrollTrackDiv.current;
        const ScrollThumb = ScrollThumbDiv.current;

        // obtiene la position del scroll
        const handleScroll = () => {
            scroll = containerTitle.scrollTop / 122;
            ScrollThumb.style.transform = `translateY(${scroll}px)`;
            console.log(`rueda del mouse: ${scroll}`);
        };

        const mouseMoveScroll = (e) => {
            if (flag) {
                if (
                    e.offsetY >= ScrollThumb.clientHeight / 2 &&
                    e.offsetY <=
                        ScrollTrack.clientHeight - ScrollThumb.clientHeight / 2
                ) {
                    scroll = e.offsetY - ScrollThumb.clientHeight / 2;
                    containerScroll = e.offsetY * 122;
                    ScrollThumb.style.transform = `translateY(${scroll}px)`;

                    containerTitle.scrollTo(0, containerScroll);
                    /* console.log(`entro al Track ${e.offsetY}`); */
                }
            }
        };

        const mouseDownScroll = (e) => {
            flag = true;
            ScrollTrack.addEventListener("mousemove", mouseMoveScroll, {
                passive: true,
            });
        };

        const mouseUpScroll = (e) => {
            flag = false;
            ScrollTrack.removeEventListener("mousemove", mouseMoveScroll);
        };

        containerTitle.addEventListener("scroll", handleScroll, {
            passive: true,
        });
        window.addEventListener("mousedown", mouseDownScroll);
        window.addEventListener("mouseup", mouseUpScroll);

        return () => {
            containerTitle.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousedown", mouseDownScroll);
            window.removeEventListener("mouseup", mouseUpScroll);
        };
    }, []);

    /* useEffect(() => {
        console.log(numPokemon);
    }, [numPokemon]); */

    let searchPokemons = async () => {
        const res = await fetch(
            "https://pokeapi.co/api/v2/pokemon?offset=0&limit=2000"
        );
        const data = await res.json();
        setPokemons(data.results);
    };

    const crearLista = pokemons?.map((pokemon, i) => (
        <li key={i}>
            <button
                id={`pokemon${i}`}
                className="containerPokemon"
                style={
                    numPokemon == i
                        ? {
                              zIndex: "100",
                              borderRadius: "10px",
                              border: "2px solid black",
                          }
                        : { border: "none" }
                }
                onClick={() => {
                    setNumPokemon(i);
                }}
            >
                <div className="containerLogo">
                    <img
                        className="logoPokemon"
                        src="/src/assets/svg/pokeBola.svg"
                        alt=""
                    />
                </div>
                <div className="containerNumPokemon">
                    <p>{i + 1}</p>
                </div>
                <div className="containerName">
                    <p>{pokemon.name}</p>
                </div>
            </button>
        </li>
    ));

    return (
        <div className="containerProyecto">
            <div className="containerPokebola">
                <img
                    className="pokebola"
                    src="/src/assets/svg/pokeBolaFondo.svg"
                    alt=""
                />
            </div>
            <div className="contenedor">
                <img
                    className="containerRejilla"
                    src="https://static.vecteezy.com/system/resources/thumbnails/015/338/792/small/grey-line-squared-paper-sheet-png.png"
                    alt=""
                />
            </div>
            <div className="pokedex">
                <div className="containerPokedexName">
                    <p>POKEDEX</p>
                </div>
                <div className="pokemonInfo">
                    <Pokemon
                        url={
                            pokemons != undefined
                                ? pokemons[numPokemon].url
                                : ""
                        }
                    />
                </div>

                <ul ref={containerTitleDiv} className="pokemonLista">
                    {crearLista}
                </ul>

                <div className="containerControl">
                    <button
                        className="buttonControl previous"
                        onClick={() => {
                            const containerTitle = containerTitleDiv.current;
                            const ScrollTrack = ScrollTrackDiv.current;
                            const ScrollThumb = ScrollThumbDiv.current;

                            if (numPokemon > 0) {
                                setNumPokemon(numPokemon - 1);
                                console.log(`entro a previous: ${numPokemon}`);
                            } else {
                                alert("no hay mas pokemon");
                            }
                        }}
                    >
                        <img
                            className="logoFlecha logoPrevious"
                            src="/src/assets/svg/flecha.svg"
                            alt=""
                        />
                    </button>
                    <div ref={ScrollTrackDiv} className="containerScroll">
                        <div ref={ScrollThumbDiv} className="scroll"></div>
                    </div>
                    <button
                        className="buttonControl next"
                        onClick={() => {
                            const containerTitle = containerTitleDiv.current;
                            const ScrollTrack = ScrollTrackDiv.current;
                            const ScrollThumb = ScrollThumbDiv.current;

                            if (numPokemon < 1024) {
                                setNumPokemon(numPokemon + 1);
                                scroll = scroll + 40;
                                containerScroll = containerScroll + 40;
                                ScrollThumb.style.transform = `translateY(${scroll}px)`;
                                containerTitle.scrollTo(0, containerScroll);
                                console.log(`entro a next: ${numPokemon}`);
                            } else {
                                alert("no hay mas pokemon");
                            }
                        }}
                    >
                        <img
                            className="logoFlecha logoNext"
                            src="/src/assets/svg/flecha.svg"
                            alt=""
                        />
                    </button>
                </div>
                <div className="creadorName">
                    <p>JUAN DAVID MEDELLIN CALDERON</p>
                </div>
            </div>
        </div>
    );
}

export default App;

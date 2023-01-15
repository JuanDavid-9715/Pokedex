import react, { useState, useRef, useEffect } from "react";
import "./../assets/styles/_prueba.scss";

function Prueba() {
    const containerTitleDiv = useRef();
    const ScrollTrackDiv = useRef();
    const ScrollThumbDiv = useRef();
    let flag = useRef();

    const [numScroll, setNumScroll] = useState();
    const [scrollThumb, setScrollThumb] = useState();
    const [array, setArray] = useState([
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
    ]);
    /* const [flag, setFlag] = useState(); */

    useEffect(() => {
        const containerTitle = containerTitleDiv.current;
        const ScrollTrack = ScrollTrackDiv.current;
        const ScrollThumb = ScrollThumbDiv.current;

        // obtiene la position del scroll
        const handleScroll = () => {
            ScrollThumb.style.transform = `translate(${
                containerTitle.scrollTop / 2
            }px)`;
            console.log(containerTitle.scrollTop);
        };

        const mouseMoveScroll = (e) => {
            if (flag) {
                console.log(e.offsetX);
                if (
                    e.offsetX >= ScrollThumb.clientWidth / 2 &&
                    e.offsetX <=
                        ScrollTrack.clientWidth - ScrollThumb.clientWidth / 2
                ) {
                    /* setScrollThumb(e.offsetX - ScrollThumb.clientWidth / 2); */
                    ScrollThumb.style.transform = `translate(${
                        e.offsetX - ScrollThumb.clientWidth / 2
                    }px)`;
                    console.log(`entoro al Track ${e.offsetX}`);
                    containerTitle.scrollTo(0, e.offsetX * 2);
                }
            }
        };

        const mouseDownScroll = (e) => {
            flag = true;
            console.log(flag);
            ScrollTrack.addEventListener("mousemove", mouseMoveScroll, {
                passive: true,
            });
        };

        const mouseUpScroll = (e) => {
            flag = false;
            console.log(flag);
            ScrollTrack.removeEventListener("mousemove", mouseMoveScroll);
        };

        // posiciona el scroll
        /* containerTitle.scrollTo(0, 500); */

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

    useEffect(() => {
        console.log(numScroll);
    }, [numScroll]);

    useEffect(() => {
        console.log(scrollThumb);
    }, [scrollThumb]);

    const crearLista = array?.map((e, i) => (
        <li key={i} style={{ height: "100px", background: `#${e}0${e}0${e}0` }}>
            <h1>Prueba Scroll</h1>
        </li>
    ));

    return (
        <div>
            <ul
                ref={containerTitleDiv}
                className="containerTitle"
                style={{
                    height: "500px",
                    overflow: "scroll",
                }}
            >
                {crearLista}
            </ul>

            <div
                ref={ScrollTrackDiv}
                style={{
                    background: "red",
                    width: "700px",
                    height: "40px",
                    margin: "50px",
                    position: "relative",
                }}
            >
                <div
                    ref={ScrollThumbDiv}
                    style={{
                        background: "blue",
                        width: "40px",
                        height: "40px",
                        position: "absolute",
                        transition: "1s all lineal",
                    }}
                ></div>
            </div>
        </div>
    );
}

export default Prueba;

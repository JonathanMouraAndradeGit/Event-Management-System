import React from "react";
import Style from "./DynamicSld5.module.css"
import { useRef, useEffect } from "react";
export default function DynamicSld5() {

    let arr = [
        { img: "/static/bio1.jpg", name: 1 },
        { img: "/static/bio2.jpg", name: 2 },
        { img: "/static/bio3.jpg", name: 3 }
    ];

    let arrRef = useRef(arr);
    let cardRef = useRef();
    let execOnce = useRef(true);
    let globC = useRef();
    let imgRefs = useRef();

    /* intervalo */
    let intervalRef = useRef(null);

    useEffect(() => {

        if (execOnce.current) {
            loadCards();
            execOnce.current = false;
        }

        /* autoplay */
        intervalRef.current = setInterval(() => {
            moveSides("l");
        }, 4000);

        /* cleanup */
        return () => {
            clearInterval(intervalRef.current);
        };

    }, []);

    function loadCards() {

        arr.forEach((el) => {

            let doc = document.createElement("div");

            doc.classList.add("CardGlob");

            doc.style.setProperty("--qtd", arr.length);

            let img = document.createElement("img");

            img.setAttribute("src", el.img);

            doc.appendChild(img);

            cardRef.current.appendChild(doc);

        });

    }

    function movArr(side) {

        let arr1 = arrRef.current;

        if (side == "l") {

            let child = arr1[0];

            arr1.shift();

            arr1.push(child);

        } else {

            let child = arr1[arr1.length - 1];

            arr1.pop();

            arr1.unshift(child);

        }

    }

    function moveSides(side) {

        /* pausa autoplay durante interação */
        clearInterval(intervalRef.current);

        if (side == "l") {

            let resp = cardRef.current.firstChild;

            resp.style.width = "0%";
            resp.style.opacity = "0";

            let selectedImg = arrRef.current[0].img;

            globC.current.children[0].setAttribute("src", selectedImg);

            globC.current.classList.add("markerMain");

            resp.style.zIndex = "0";

            movArr(side);

            globC.current.style.transition = "0.5s";

            globC.current.style.filter = `brightness(0.5)`;

            setTimeout(() => {

                imgRefs.current.setAttribute("src", selectedImg);

                resp.style.opacity = "0";

                cardRef.current.appendChild(resp);

                let len = cardRef.current.children.length;

                let last = cardRef.current.children[len - 1];

                last.style.transition = `0.5s`;

                last.style.width = `${100 / arr.length}%`;

                resp.style.zIndex = "1";

                globC.current.classList.remove("markerMain");

                globC.current.style.transition = "0s";

                resp.style.opacity = "1";

                globC.current.style.filter = `brightness(1)`;

            }, 510);

            setTimeout(() => {

                globC.current.style.transition = "0s";

                resp.style.opacity = "1";

            }, 750);

        } else {

            let lenc = cardRef.current.children.length - 1;

            let resp = cardRef.current.children[lenc];

            resp.style.width = "0%";

            resp.style.opacity = "0";

            globC.current.children[0].setAttribute(
                "src",
                arrRef.current[arrRef.current.length - 1].img
            );

            movArr(side);

            let selectedImg =
                arrRef.current[arrRef.current.length - 1].img;

            imgRefs.current.setAttribute("src", selectedImg);

            globC.current.classList.add("markerMain");

            globC.current.style.transition = "0s";

            globC.current.style.filter = `brightness(0.5)`;

            setTimeout(() => {

                globC.current.classList.remove("markerMain");

                globC.current.style.transition = "0.5s";

                resp.style.opacity = "0";

                cardRef.current.insertBefore(
                    resp,
                    cardRef.current.children[0]
                );

                let last = cardRef.current.children[0];

                last.style.transition = `0.5s`;

                last.style.width = `${100 / arr.length}%`;

                resp.style.zIndex = "1";

                globC.current.style.filter = `brightness(1)`;

            }, 510);

            setTimeout(() => {

                resp.style.opacity = "1";

            }, 800);

        }

        /* reinicia autoplay */
        intervalRef.current = setInterval(() => {
            moveSides("l");
        }, 4000);

    }

    return (

        <div className={Style.SldDContainer}>

            <img
                src={arr[arr.length - 1].img}
                ref={imgRefs}
            />

            <div className={Style.bottomDiv}>

                {/* BOTÕES OPCIONAIS */}
                <div className={Style.btnCon}>

                    <button onClick={() => moveSides("r")}>
                        ◀
                    </button>

                    <button onClick={() => moveSides("l")}>
                        ▶
                    </button>

                </div>

                <div
                    className={Style.CardsCon}
                    ref={cardRef}
                />

            </div>

            <div
                className={Style.globSld}
                ref={globC}
            >
                <img></img>
            </div>

        </div>

    );

}
/*
<button onClick={() => moveSides("l")}>&larr;</button>
                    <button  onClick={() => moveSides("r")}>&rarr;</button>
*/
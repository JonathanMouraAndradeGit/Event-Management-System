import { useEffect, useRef } from "react";
import Style from "./SldDynamic.module.css"
export default function SldDynamic1() {
    const arr2 = [
        { img: "/static/city.jpg", title: "title1", text: "this is a short description" },
        { img: "/static/citynight.jpg", title: "title2", text: "this is a short description" },
        { img: "/static/program.jpg", title: "title3", text: "this is a short description" },
        { img: "/static/Habitos_Consumo_746x419.jpg", title: "title4", text: "this is a short description" },
    ];

    const mainRef = useRef(null);
    const progRef = useRef(null);
    const side = useRef("r");

    // 🔥 começa no 0 (mais correto)
    const currentNum = useRef(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!mainRef.current || !progRef.current) return;

            moveSide(currentNum.current);

            selectItem(currentNum.current, "spnSelected", mainRef.current.children);
            selectItem(currentNum.current, "spnSelected", progRef.current.children);

            // 🔥 controle de direção corrigido
            if (
                side.current === "r"
                    ? currentNum.current === arr2.length - 1
                    : currentNum.current === 0
            ) {
                side.current = side.current === "r" ? "l" : "r";
            }

            // 🔥 movimento correto
            currentNum.current += side.current === "r" ? 1 : -1;

        }, 2000);

        // ✅ cleanup obrigatório
        return () => clearInterval(interval);

    }, []);

    function selectItem(cur, classN, elements) {
        Array.from(elements).forEach((el, i) => {
            if (i === cur) {
                el.classList.add(classN);
            } else {
                el.classList.remove(classN);
            }
        });
    }

    function moveSide(val) {
        if (!mainRef.current) return;
        mainRef.current.style.transform = `translateX(${val * -100}%)`;
    }

    return (
        <div className={Style.ContainerSld}>
            <div className={Style.SldMain} ref={mainRef}>
                {arr2.map((el, i) => (
                    <div className={Style.SldItem} key={i}>
                        <img src={el.img} alt={el.title} />
                        <div className={Style.content}>
                            <p>{el.title}</p>
                            <p>{el.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className={Style.ProgBar} ref={progRef}>
                {arr2.map((_, i) => (
                    <div className={Style.ProgItem} key={i}>
                        <span></span>
                    </div>
                ))}
            </div>
        </div>
    );
}

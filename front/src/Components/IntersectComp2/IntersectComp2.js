import React, { useRef } from "react"
import Style from "./IntersectComp2.module.css"
import { useEffect, useState } from "react"
export default function IntersectComp2() {
    let [time, setTime] = useState()
    let [refn, setRefn] = useState(0)
    let ref = useRef()
    let opts = {
        threashold: 0.5
    }
    let obs = (entries, observe) => {
        entries.forEach((el, i) => {
            if (el.isIntersecting) {
                ref.current.classList.add("IntersectEl2")
                if (!time) {
                    const interval = setInterval(() => {
                        setRefn(prev => {
                            if (prev >= 100) {
                                clearInterval(interval);
                                setTime(null);
                                return prev;
                            }
                            return prev + 1;
                        });
                    }, 19);

                    setTime(interval);
                }
                observe.unobserve(ref.current)
            } else {
                if (time) {
                    clearInterval(time);
                    setTime(null);
                }

                setRefn(0);
                ref.current.classList.remove("IntersectEl2")
            }
        });
    }
    useEffect(() => {
        let observ = new IntersectionObserver(obs, opts)
        observ.observe(ref.current)
    }, [])
    return (
        <div className={Style.IntersectComp2Con}>

            <div className={Style.IntersectEl} ref={ref}>

                {/* Loading Screen */}
                <div className={Style.sec1ic2}>

                    <div className={Style.LoadText}>
                        <span>Inicializando Plataforma</span>
                        <p>Carregando dados ambientais...</p>
                    </div>

                    <div className={Style.ProgressBox}>
                        <p>{refn}%</p>

                        <div className={Style.ProgressBar}>
                            <div
                                className={Style.ProgressFill}
                                style={{ width: `${refn}%` }}
                            />
                        </div>
                    </div>

                </div>

                {/* Main Hero */}
                <div className={Style.sec2ic2}>

                    <img src="/static/city.jpg" alt="Cidade sustentável" />

                    <div className={Style.Overlay} />

                    <div className={Style.ContentHero}>

                        <span className={Style.TagHero}>
                            Plataforma de Mutirões Ambientais
                        </span>

                        <p>
                            Transformando cidades através da ação coletiva 🌱
                        </p>

                        <p>
                            Organize eventos, acompanhe métricas e conecte voluntários
                            para gerar impacto ambiental positivo em tempo real.
                        </p>

                        <button>
                            Explorar Plataforma
                        </button>

                    </div>

                </div>

            </div>

        </div>
    )
}
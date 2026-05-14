import React from "react";
import Style from "./IntersectComp5.module.css"
import { useState, useEffect, useRef } from "react";
export default function IntersectComp5() {
    let [time, setTime] = useState({ time1: 0, time2: 0 })
    let [timeRf, setTimeRf] = useState({ time1: null, time2: null })
    let ref = useRef()
    let opts = {
        threshold: 0.5
    }
    function timeGen(refItem, name, total, timeD) {
        return new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    if (!timeRf[name]) {
                        setTimeRf(prev => {
                            if (prev[name]) return prev;
                            //let obj = timeRf
                            let interval = setInterval(() => {
                                setTime(prev => {
                                    if (prev[name] < total) {
                                        return { ...prev, [name]: prev[name] + 1 }
                                    } else {
                                        clearInterval(interval)
                                        setTimeRf(prev => ({ ...prev, [name]: null }))
                                        return prev
                                    }
                                })
                                /*
                                if (time[name] < total) {
                                    setTime(prev => ({
                                        ...prev,
                                        [name]: prev[name] + 1
                                    }))
                                } else {
                                    clearInterval(interval)
                                    setTimeRf(prev => ({ ...prev, [name]: null }))
                                }*/
                            }, timeD)
                            //obj[name] = interval
                            return { ...prev, [name]: interval };
                        })
                    }
                    observer.unobserve(entry.target);
                }
            })
        }, opts)


    }
    useEffect(() => {
        //const children = ref.current.children;

        let obs = timeGen(ref.current, "time1", 250, 10)
        obs.observe(ref.current)
        let obs2 = timeGen(ref.current, "time2", 450, 5)
        obs2.observe(ref.current)
        return () => {
            obs.disconnect()
            obs2.disconnect()
        }
    }, [])

    return (
        <div className={Style.IntersectComp5Con} ref={ref}>
            <span className={Style.TagInfo}>Impacto Ambiental</span>

            <h2>
                Juntos por um planeta mais limpo 🌱
            </h2>

            <p>
                Nossa plataforma conecta voluntários, ONGs e comunidades para organizar
                mutirões ambientais com eficiência. Acompanhe resultados, participe de
                ações sustentáveis e veja o impacto positivo gerado em tempo real.
            </p>

            <div className={Style.ItemCardBoxic5}>
                <div className={Style.ItemBoxic5}>
                    <p>Coletas Realizadas</p>
                    <p>{time["time1"]}</p>
                </div>

                <div className={Style.ItemBoxic5}>
                    <p>Voluntários Ativos</p>
                    <p>{time["time2"]}</p>
                </div>
            </div>
        </div>
    )
}
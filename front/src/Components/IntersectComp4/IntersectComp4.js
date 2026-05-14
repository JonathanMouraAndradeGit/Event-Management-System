import React from "react";
import Style from "./IntersectComp4.module.css"
import { useState, useEffect, useRef } from "react";
export default function IntersectComp4() {
    let ref = useRef()
    function funcObs(elref) {
        return new IntersectionObserver((entry, observe) => {
            entry.forEach((el, i) => {
                if (el.isIntersecting) {
                    elref.classList.add("select4")
                    //observe.unobserve(entry.target);
                }
            })
        })
    }
    useEffect(() => {
        let chil = ref.current.children
        let obs = funcObs(chil[0])
        let obs1 = funcObs(chil[1])
        obs.observe(ref.current)
        obs1.observe(ref.current)

        return () => {
            obs.disconnect()
            obs1.disconnect()
        }
    }, [])

    return (
        <div className={Style.Intersect4Container} ref={ref}>

            <div className={Style.sidel}>
                <img src="/static/city.jpg" alt="Cidade sustentável" />
            </div>

            <div className={Style.sider}>

                <div className={Style.itemGrd4}>
                    <div className={Style.IconWrap}>
                        <img src="/static/check-mark_15761039.png" alt="Impacto ambiental" />
                    </div>

                    <p>Monitoramento Ambiental</p>

                    <p>
                        Acompanhe áreas afetadas, organize mutirões e visualize
                        dados ambientais em tempo real através da plataforma.
                    </p>
                </div>

                <div className={Style.itemGrd4}>
                    <div className={Style.IconWrap}>
                        <img src="/static/user.png" alt="Voluntários" />
                    </div>

                    <p>Gestão de Voluntários</p>

                    <p>
                        Coordene equipes, registre presença e distribua tarefas
                        de maneira prática e eficiente.
                    </p>
                </div>

                <div className={Style.itemGrd4}>
                    <div className={Style.IconWrap}>
                        <img src="/static/data-assessment.png" alt="Relatórios" />
                    </div>

                    <p>Relatórios Inteligentes</p>

                    <p>
                        Gere métricas automáticas sobre resíduos coletados,
                        impacto social e participação comunitária.
                    </p>
                </div>

                <div className={Style.itemGrd4}>
                    <div className={Style.IconWrap}>
                        <img src="/static/user_17740838.png" alt="Comunidade" />
                    </div>

                    <p>Engajamento Social</p>

                    <p>
                        Incentive comunidades locais a participarem de ações
                        sustentáveis com comunicação integrada.
                    </p>
                </div>

            </div>

        </div>
    )
}
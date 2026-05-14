import React from "react";
import Style from "./Main.module.css"
import SldDynamic1 from "../SldDynamic1/SldDynamic";
import DynamicSld5 from "../DynamicSld5/DynamicSld5";
import IntersectComp2 from "../IntersectComp2/IntersectComp2";
import IntersectComp3 from "../IntersectComp3/IntersectComp3";
import IntersectComp4 from "../IntersectComp4/IntersectComp4";
import IntersectComp5 from "../IntersectComp5/IntersectComp5";
export default function Main() {
    return (
        <div className={Style.MainContainer}>

            {/* HERO */}
            <div className={Style.MainSec}>

                <div className={Style.imgCon}>
                    <img src={`static/city.jpg`} />
                </div>

                <div className={Style.ContentTxt}>

                    <p>www.sigmambiental.org</p>

                    <p>
                        SIGMA
                    </p>

                    <span className={Style.Line}></span>

                    <p>
                        Sistema Independente de Gerenciamento de Mutirões Ambientais
                        desenvolvido para conectar voluntários, organizações e comunidades
                        em ações sustentáveis de impacto social e ambiental.
                    </p>

                    <button className={Style.btnSlc}>
                        Participar do Mutirão
                    </button>

                </div>

            </div>

            <IntersectComp5 />

            <IntersectComp4 />

            <IntersectComp2 />

            <div className={Style.CardLst}>

                <div className={Style.CardItem}>

                    <div className={Style.IConC}>
                        <img src="/static/bio1.jpg"></img>
                    </div>

                    <div className={Style.cardDesc}>

                        <p>
                            Limpeza Ambiental
                        </p>

                        <p>
                            Organize operações de limpeza urbana, coleta seletiva
                            e recuperação de áreas degradadas com acompanhamento em tempo real.
                        </p>

                    </div>

                </div>

                <div className={Style.CardItem}>

                    <div className={Style.IConC}>
                        <img src="/static/bio2.jpg"></img>
                    </div>

                    <div className={Style.cardDesc}>

                        <p>
                            Reflorestamento
                        </p>

                        <p>
                            Coordene ações coletivas de plantio e monitore indicadores
                            ambientais relacionados à preservação ecológica.
                        </p>

                    </div>

                </div>

                <div className={Style.CardItem}>

                    <div className={Style.IConC}>
                        <img src="/static/bio3.jpg"></img>
                    </div>

                    <div className={Style.cardDesc}>

                        <p>
                            Engajamento Comunitário
                        </p>

                        <p>
                            Incentive a participação da população através de campanhas,
                            eventos ambientais e metas colaborativas sustentáveis.
                        </p>

                    </div>

                </div>

            </div>

            <DynamicSld5 />

            <IntersectComp3 />

            <div className={Style.SldCon}>
                <SldDynamic1 />
            </div>

            <div className={Style.grdCon}>

                {[
                    {
                        title: "Gestão de Equipes",
                        desc: "Distribua tarefas, acompanhe participantes e organize mutirões ambientais com eficiência."
                    },

                    {
                        title: "Indicadores Ambientais",
                        desc: "Visualize métricas sobre resíduos coletados, árvores plantadas e impacto ecológico."
                    },

                    {
                        title: "Eventos Sustentáveis",
                        desc: "Crie campanhas ambientais e coordene ações comunitárias em diferentes regiões."
                    },

                    {
                        title: "Rede Colaborativa",
                        desc: "Conecte ONGs, voluntários e instituições através de uma plataforma integrada."
                    }

                ].map((item, i) => (

                    <div className={Style.CardConTopic} key={i}>

                        <div className={Style.cardTopContent}>

                            <div className={Style.imgTopCon}>
                                <img src="/static/user.png" alt="user" />
                            </div>

                            <p>{item.title}</p>

                        </div>

                        <p className={Style.desc}>
                            {item.desc}
                        </p>

                    </div>

                ))}

            </div>

            {/* FOOTER */}
            <footer className={Style.footer}>

                <div className={Style.footerContainer}>

                    {/* BRAND */}
                    <div className={Style.footerBrand}>

                        <h2>SIGMA</h2>

                        <p>
                            Sistema Independente de Gerenciamento de Mutirões Ambientais
                            focado em ações sustentáveis, impacto social e colaboração comunitária.
                        </p>

                    </div>

                    {/* LINKS */}
                    <div className={Style.footerLinks}>

                        <div>

                            <h4>Plataforma</h4>

                            <a href="#">Recursos</a>
                            <a href="#">Mutirões</a>
                            <a href="#">Impacto Ambiental</a>

                        </div>

                        <div>

                            <h4>Comunidade</h4>

                            <a href="#">Sobre</a>
                            <a href="#">Voluntários</a>
                            <a href="#">Parceiros</a>

                        </div>

                        <div>

                            <h4>Suporte</h4>

                            <a href="#">Ajuda</a>
                            <a href="#">Privacidade</a>
                            <a href="#">Termos</a>

                        </div>

                    </div>

                </div>

                {/* BOTTOM */}
                <div className={Style.footerBottom}>
                    <p>
                        © 2026 SIGMA — Sistema Independente de Gerenciamento de Mutirões Ambientais.
                    </p>
                </div>

            </footer>

        </div>
    )
}
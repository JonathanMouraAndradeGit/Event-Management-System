import React from "react";
import Style from "./Main.module.css"
import SldDynamic1 from "../SldDynamic1/SldDynamic";
import DynamicSld5 from "../DynamicSld5/DynamicSld5";
export default function Main() {
    return (
        <div className={Style.MainContainer}>
            <div className={Style.MainSec}>
                <div className={Style.imgCon}>
                    <img src={`static/city.jpg`} />
                </div>
                <div className={Style.ContentTxt}>
                    <p>www.title.com</p>
                    <p>title</p>
                    <span className={Style.Line}></span>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>

                    <button className={Style.btnSlc}>click</button>
                </div>
            </div>
            
            <div className={Style.CardLst}>
                <div className={Style.CardItem}>
                    <div className={Style.IConC}>
                        <img src="/static/citynight.jpg"></img>
                    </div>
                    <div className={Style.cardDesc}>
                        <p>
                            title1
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt
                        </p>
                    </div>
                </div>
                <div className={Style.CardItem}>
                    <div className={Style.IConC}>
                        <img src="/static/citynight.jpg"></img>
                    </div>
                    <div className={Style.cardDesc}>
                        <p>
                            title1
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt
                        </p>
                    </div>
                </div>
                <div className={Style.CardItem}>
                    <div className={Style.IConC}>
                        <img src="/static/citynight.jpg"></img>
                    </div>
                    <div className={Style.cardDesc}>
                        <p>
                            title1
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt
                        </p>
                    </div>
                </div>
            </div>
            <DynamicSld5></DynamicSld5>
            <div className={Style.SldCon}>
                <SldDynamic1></SldDynamic1>
            </div>
            <div className={Style.grdCon}>
                {[1, 2, 3, 4].map((_, i) => (
                    <div className={Style.CardConTopic} key={i}>
                        <div className={Style.cardTopContent}>
                            <div className={Style.imgTopCon}>
                                <img src="/static/user.png" alt="user" />
                            </div>
                            <p>title {i + 1}</p>
                        </div>
                        <p className={Style.desc}>description {i + 1}</p>
                    </div>
                ))}
            </div>
            <footer className={Style.footer}>
                <div className={Style.footerContainer}>

                    <div className={Style.footerBrand}>
                        <h2>Project</h2>
                        <p>menage events</p>
                    </div>

                    <div className={Style.footerLinks}>
                        <div>
                            <h4>Produto</h4>
                            <a href="#">Recursos</a>
                            <a href="#">Preços</a>
                            <a href="#">Atualizações</a>
                        </div>

                        <div>
                            <h4>Empresa</h4>
                            <a href="#">Sobre</a>
                            <a href="#">Carreiras</a>
                            <a href="#">Contato</a>
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
                    <p>© 2026 MyBrand. Todos os direitos reservados.</p>
                </div>
            </footer>
        </div>
    )
}
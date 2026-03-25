import React, { useState } from "react";
import Style from "./EventCard.module.css"

import { useEffect } from "react";
export default function EventCard(props) {
    let [rol,setRol] = useState()
    useEffect(()=>{
        let obj = JSON.parse(localStorage.getItem("token"))
        if(obj && obj.role){
            setRol(obj.rol)
        }
    },[])
    return (
        <div className={Style.card}>
            <div className={Style.imgCon}>
                <img src="./static/citynight.jpg"></img>
            </div>

            <div className={Style.Content}>
                <div className={Style.MainTxtContent}>
                    <p>{props.obj.title}</p>
                    <p>{props.obj.description}</p>
                    <p>date: {props.obj.description}</p>
                </div>

                <div className={Style.tagsCon}>
                    <span className={Style.spng}>Info 1</span>
                    <span className={Style.spny}>Info 2</span>
                </div>
            </div>
            {(rol != 'admin') && (
                <div className={Style.OptCards}>

                </div>)
            }
        </div>
    )
}
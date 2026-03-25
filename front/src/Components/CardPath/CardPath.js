import React from "react";
import Style from "./CardPath.module.css"

export default function CardPath(props){
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let fullNamwMonth = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"]
    return (
        <div className={Style.ContainerCardUp}>
            <div className={Style.imgCon}>
                <img src={`${props.path}${props.obj.file}`}/>
                <p>{props.obj.title}</p>
            </div>
            <div className={Style.CardUpContent}>
                <div className={Style.topic}>
                    <img src="/static/calendar.png"/>
                    <p className={Style.txtDesc}>{`${days[new Date(props.obj.eventDate).getDay()]} 
                    ${new Date(props.obj.eventDate).getDate()} 
                    ${fullNamwMonth[new Date(props.obj.eventDate).getMonth()].toUpperCase()}
                    ${new Date(props.obj.eventDate).getFullYear()}`}</p>
                </div>
                <div className={Style.topic}>
                    <img src="/static/location.png"/>
                    <p className={Style.locdesc}>{props.obj.display}</p>
                </div>
                <div className={Style.descCon}>
                    <p>Description</p>
                    <p>{props.obj.description}</p>
                </div>
                <button className={Style.btnItemC} onClick={()=>props.redirect()}>
                    Click
                </button>
            </div>
        </div>
    )
}
/**
<div className={Style.btnCon}>
                    <button className={Style.btnItemC} onClick={()=>props.redirect()}>
                        Click
                    </button>
                </div>


 */
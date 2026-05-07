import React from "react";
import Style from "./PercentComp.module.css"

export default function PercentComp(props){
    let tot = 60
    return (
        <div className={Style.PercentCompContainer}>
            <div className={Style.mainC}>
                <p>{props.selc}%</p>
                <div className={Style.labsCOn}>
                    {Array.from(Array(tot).keys()).map((el,i)=>{
                        return <span key={`idspn${i}`} className={Style.spnstl} style={{'--numb':i,'--tot':tot}}>
                            <span className={((tot*props.selc)/100) >= i ? "selection" : "" }></span>
                        </span>
                    })

                    }
                </div>
            </div>
        </div>
    )
}
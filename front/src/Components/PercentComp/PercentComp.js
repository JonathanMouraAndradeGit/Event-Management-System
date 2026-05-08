import React from "react";
import Style from "./PercentComp.module.css"

export default function PercentComp(props) {
    let tot = 35
    return (
        <div className={Style.PercentCompContainer}>
            <div className={Style.mainC}>
                <p>{props.selc}%</p>
                <div className={`${Style.labsCOn} ${props.typ == 1
                        ? Style.red
                        : props.typ == 2
                            ? Style.green
                            : Style.blue
                    }`}>
                    {Array.from(Array(tot).keys()).map((el, i) => {
                        return <span key={`idspn${i}`} className={Style.spnstl} style={{ '--numb': i, '--tot': tot }}>
                            <span className={((tot * props.selc) / 100) >= i ? "selection" : ""}></span>
                        </span>
                    })

                    }
                </div>
            </div>
        </div>
    )
}
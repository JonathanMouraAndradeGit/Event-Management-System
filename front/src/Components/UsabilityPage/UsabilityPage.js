import React, { useRef, useState } from "react";
import Style from "./UsabilityPage.module.css"
import PercentComp from "../PercentComp/PercentComp"
import { useEffect } from "react";
import { useContext } from "react";
import { ctx } from "../../App";
export default function UsabilityPage() {
    let [obj, setObj] = useState()
    //MSG----------------------------
    let msgCtx = useContext(ctx)
    function genMsg(title, description, type) {
        let dt = new Date().toString()
        let rdnVal = Math.random().toString()
        let res = `${dt}${rdnVal}`
        msgCtx(prev => [
            ...prev,
            { id: res, title: title, desc: description, type: type }
        ])
    }
    //--------------------------------
    let qtd = 5
    let ref1 = useRef(true)
    useEffect(() => {
        if (ref1.current) {
            getValues()
            ref1.current = false
        }
    }, [])
    async function getValues() {
        try {
            let ref = await fetch("http://[::1]:4000/getTotalEvaluation/", {
                method: "GET",
                headers: {
                    "ContentType": "Application/Json"
                }
            }).then((e) => e.json())
            console.log("the ref is ")
            console.log(ref)
            if (ref.msgError) {
                genMsg("Error", ref.msgError, 1)
            }
            setObj(ref)
        } catch (e) {
            genMsg("Error", "Erro ao realizar operação", 1)
        }
    }
    return (
        <div className={Style.UsabilityPageContainer}>
            <div className={Style.sec1}>
                {(obj && obj.evaluations) && (
                    obj.evaluations.map((el, i) => {
                        return <div key={`usergrd${i}`} className={Style.userUsblt}>
                            <div className={Style.imgCon}>
                                <img src={`http://localhost:4000/uploads/${el.img}`} />
                            </div>
                            <div className={Style.userInfo}>
                                <p>{el.name}</p>
                                <p>{el.email}</p>
                            </div>
                            <div className={Style.GradeCon}
                                style={{ "backgroundColor": (el.grade > 70) ? "green" : (el.grade) > 50 ? "yellow" : "red" }}>
                                {el.grade}
                            </div>
                        </div>
                    })
                )}
            </div>
            <div className={Style.sec2}>
                <div className={Style.PercentC}>
                    <PercentComp selc={(obj && obj.avg) ? obj.avg : 0}></PercentComp>
                </div>
            </div>
        </div>
    )
}
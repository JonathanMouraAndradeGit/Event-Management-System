import Style from "./DynamicMsg.module.css"
import React, { useState } from "react"
import DynamicMsgCard from "../DynamicMsgCard/DynamicMsgCard"
export default function DynamicMsg(props) {
    /*
    const [msg, setMsg] = useState([])

    function genMsg() {
        let dt = new Date().toString()
        let rdnVal = Math.random().toString()
        let res = `${dt}${rdnVal}`
        let arr = msg
        console.log({ id: res, title: "error", desc: "error description" })
        setMsg(prev => [
            ...prev,
            { id: res, title: "error", desc: "error description",type: "2" }
        ])

        console.log(msg)
    }*/
    return (
        <div className={Style.Container}>
            {props.arrMsg.map((el, i) => {
                return <DynamicMsgCard vl={props.msg} setVl={props.setMsg} obj={el} key={`${el.id}`} type={el.type}></DynamicMsgCard>
            })

            }
        </div>
    )
}
/*
<button onClick={() => genMsg()}>addMsg</button>

*/
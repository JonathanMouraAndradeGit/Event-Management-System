import React, { useEffect } from "react";
import Style from "./SldInputCompInd.module.css"
import { useRef } from "react";
export default function SldInputCompInd(props) {
    //let qtd = 3
    let con = useRef()
    let exec = useRef(true)
    useEffect(() => {
        if (exec.current) {
            //generateIndex()
            setotal(2)
            exec.current = false
        }
    }, [])
    useEffect(()=>{
        console.log("propsChanged "+props.cur)
        setotal(props.cur)
    },[props.cur])
    function setotal(qtd) {
        Array.from(con.current.children).forEach((el, i) => {
            if (i <= qtd) {
                el.classList.add("selected")
            } else {
                el.classList.remove("selected")
            }
        })
    }
    return (
        <div className={Style.ContainerP}>
            <div className={Style.ContentCon} ref={con}>
                {Array.from(Array(props.qtd).keys()).map((el, i) => {
                    return <div className={Style.ItemB} key={`SldInputCOmp${i}`}>
                        <div className={Style.mark}>
                        </div>
                        <span className={Style.progBar}>
                        </span>
                    </div>
                })}
            </div>
        </div>
    )
}
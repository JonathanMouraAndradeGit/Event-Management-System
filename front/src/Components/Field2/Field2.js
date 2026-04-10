import Style from "./Field2.module.css";
import React from "react";
import { useRef,useEffect } from "react";
export default function Field2(props) {
    let refField = useRef()
    function setValue(e) {
        const newObj = {
            ...props.obj,
            [props.lab]: e.target.value
        };
        props.setVal(newObj);
    }
    useEffect(() => {
        if (props.obj[props.lab]) {
            refField.current.value = props.obj[props.lab]
        } else {
            refField.current.value = null
        }
    }, [props.obj[props.lab]])
    return (
        <div className={`${Style.FieldCon} ${(props.error && props.error[props.lab]) ? Style.error : ""}`}>
            <div className={Style.ImgCon}>
                <img src={props.img} alt="img" />
            </div>

            <div className={Style.inputCon}>
                <div className={Style.inputmainCon}>
                    <input type={props.type} id="labtxt" placeholder=" " 
                    onBlur={()=>props.checkF(true, props.lab)} onInput={(e) => setValue(e)} ref={refField}/>
                    <label htmlFor="labtxt">{props.lab}</label>
                </div>
                {(props.error && props.error[props.lab]) &&
                (<p className={Style.msgError}>{props.error[props.lab]}</p>)}
            </div>
        </div>
    );
}
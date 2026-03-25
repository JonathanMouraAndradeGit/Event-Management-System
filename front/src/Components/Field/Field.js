import React from "react";
import Style from "./Field.module.css"
import { useEffect } from "react";
import { useRef } from "react";
export default function Field(props) {
    let refField = useRef()
    function setValue(e) {
        const newObj = {
            ...props.obj,
            [props.lab]: e.target.value
        };
        //let lab = props.lab
        //let newobj = props.obj
        props.setVal(newObj);
    }
    useEffect(()=>{
        refField.current.value = props.obj[props.lab]
    },[props.obj[props.lab]])
    return (
        <div className={Style.FieldCon}>
            <label className={Style.mainC}>
                <p>{props.lab}</p>
                <input type={props.type} placeholder=" " onInput={(e) => setValue(e)} ref={refField}></input>
            </label>
        </div>
    )
}
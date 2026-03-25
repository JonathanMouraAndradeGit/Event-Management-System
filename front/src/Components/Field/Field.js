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
        //props.checkF(true, props.lab)
        //props.checkF()
        //let lab = props.lab
        //let newobj = props.obj
        props.setVal(newObj);
    }
    useEffect(()=>{
        if(props.obj[props.lab]){
            refField.current.value = props.obj[props.lab]
        }else{
            refField.current.value = null
        }
        //refField.current.value = props.obj[props.lab]
    },[props.obj[props.lab]])
    return (
        <div className={Style.FieldCM}>
            <div className={Style.FieldCon}>
                <label className={Style.mainC}>
                    <p>{props.lab}</p>
                    <input type={props.type} placeholder=" " 
                    onBlur={()=>props.checkF(true, props.lab)} onInput={(e) => setValue(e)} ref={refField}></input>
                </label>
            </div>
            {(props.error && props.error[props.lab]) &&
                (<p className={Style.ErrorMsg}>{props.error[props.lab]}</p>)
            }
        </div>
    )
}
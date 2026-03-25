import React from "react";
import Style from "./FormOng.module.css"
import Field from "../Field/Field";
export default function FormOng(){
    function submitFunc(e){
        e.preventDefault()
        console.log("ok")
    }
    return(
        <div className={Style.FormUserContainer}>
            <form>
                <Field lab="name" type="text"></Field>
                <Field lab="password" type="password"></Field>
                <Field lab="cnpj" type="text"></Field>
                <Field lab="description" type="text"></Field>
                <Field lab="logo" type="text"></Field>
                <button onClick={(e)=>submitFunc(e)}>submit</button>
            </form>
        </div>
    )
}
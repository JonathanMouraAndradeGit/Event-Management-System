import React from "react";
import Style from "./FormEvent.module.css"
import Field from "../Field/Field";
import { useState } from "react";
export default function FormEvent(){
    let [obj, setObj] = useState({})
    async function submit(e){
        e.preventDefault()
        let obj1 = {...obj}
        obj1["eventDate"] = new Date()
        obj1["ongE"] = 2
        let dt = JSON.parse(localStorage.getItem("token"))

        obj1['username'] = dt.name
        console.log(obj1)
        console.log("now submiting")
        let response = await fetch("http://[::1]:4000/event/",{
                
                headers:{
                    'Content-Type': 'application/json',
                    
                },
                method:"POST",
                body:JSON.stringify(obj1)
        }).then((e)=>e.json())

        console.log(response)
        
    }
    return(
        <div className={Style.FormEventContainer}>
            <form className={Style.FormContent}>
                <Field lab="title" type="text" obj={obj} setVal={setObj}></Field>
                <Field lab="description" type="text" obj={obj} setVal={setObj}></Field>
                <Field lab="place" type="text" obj={obj} setVal={setObj}></Field>
                <Field lab="city" type="text" obj={obj} setVal={setObj}></Field>
                <Field lab="state" type="text" obj={obj} setVal={setObj}></Field>
                <button onClick={(e)=>submit(e)}>submit</button>
            </form>
        </div>
    )
}
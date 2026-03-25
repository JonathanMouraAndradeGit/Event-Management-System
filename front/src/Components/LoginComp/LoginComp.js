import React, { useState } from "react";
import Style from "./LoginComp.module.css"
import Field from "../Field/Field";
export default function LoginComp(props) {
    let [obj, setObj] = useState({})
    async function submit(e) {
        e.preventDefault()
        console.log(obj)
        console.log("ok")
        let response = await fetch("http://[::1]:4000/authck/",{
                headers:{
                    'Content-Type': 'application/json',
                },
                method:"POST",
                body:JSON.stringify(obj)
        }).then((e)=>e.json())
        console.log(response)
        if(response.token){
            let objls = {name:obj.name,role:response.role,token:response.token}
            console.log(objls)
            let jweb = JSON.stringify({name:obj.name,role:response.role,token:response.token})
            localStorage.setItem("token",jweb)
            props.setAuth(objls)
            //localStorage.setItem("")
        }
        /*
        let response = await fetch("http://[::1]:4000/usr", {
            headers: {
                'Content-Type': 'application/json',

            },
            method: "POST",
            body: JSON.stringify(obj)
        }).then((e) => e.json())
        console.log(response)*/
    }
    return (
        <div className={Style.Container}>
            <div className={Style.LogContent}>
                <div className={Style.sideContentL}>

                </div>
                <form className={Style.sideContentR}>
                    <Field lab="name" type="text" obj={obj} setVal={setObj}></Field>
                    <Field lab="password" type="password" obj={obj} setVal={setObj}></Field>
                    <button onClick={(e) => submit(e)}>submit</button>
                </form>
            </div>
        </div>
    )
}
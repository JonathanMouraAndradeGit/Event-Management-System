import React, { useState,useRef } from "react";
import Style from "./LoginComp.module.css"
import Field from "../Field/Field";
export default function LoginComp(props) {
    let [obj, setObj] = useState({name:null,password:null})
    //ERROR
    let [error, setError] = useState({})
    let valref = useRef(false)

    function checkFunction(checkOne, fieldName) {
        let valid = true
        Object.keys(obj).forEach((el, i) => {
            if (checkOne ? el == fieldName && obj[el] : obj[el]) {
                setError(prev => ({ ...prev, [el]: "" }))
                if (el == "password") {
                    let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{5,}$/
                    if (!reg.test(obj[el])) {
                        setError(prev => ({ ...prev, [el]: "senha fraca" }))
                        valid = false
                    }
                }
            } else {
                if (!checkOne ? true : el == fieldName) {
                    setError(prev => ({ ...prev, [el]: "nao pode ser nulo" }))
                    console.log("nullable " + el)
                    valid = false
                }
            }
        })
        /*
        if (!checkOne) {
            if (!checkFile()) {
                valid = false
            }
        }*/
        if (!checkOne) {
            valref.current = valid
        }
    }
    /*
    function checkFile() {
        if (!file) {
            setError(prev => ({ ...prev, "file": "imagem nao pode ser nulo" }))
            return false
        } else {
            setError(prev => ({ ...prev, "file": "" }))
            return true
        }
    }
    function checkFile2(val) {
        if (val) {
            setError(prev => ({ ...prev, "file": "imagem nao pode ser nulo" }))
            return false
        } else {
            setError(prev => ({ ...prev, "file": "" }))
            return true
        }
    }*/
    function subs(e){
        e.preventDefault()
        checkFunction(false,"")
        console.log("is valid "+valref.current)
        if(valref.current){
            //submitFunc(e)
            //printRes()
            submit(e)
        }
        //console.log(error)
    }
    //-----------------------------------------------
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
                    <Field lab="name" type="text" obj={obj} setVal={setObj} error={error} checkF={checkFunction}></Field>
                    <Field lab="password" type="password" obj={obj} setVal={setObj} error={error} checkF={checkFunction}></Field>
                    <button onClick={(e) => subs(e)}>submit</button>
                </form>
            </div>
        </div>
    )
}
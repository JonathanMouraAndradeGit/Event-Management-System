import React, { useRef, useState } from "react";
import Style from "./FormUser.module.css"
import Field from "../Field/Field";
import ImgInput from "../imgInput/ImgInput";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { ctx } from "../../App";
import Field2 from "../Field2/Field2";
import ImgInput2 from "../ImgInput2/ImgInput2";
export default function FormUser() {

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

    let nav = useNavigate()
    const [obj, setObj] = useState({ name: null, email: null, password: null, role: "user" })
    let [file, setFile] = useState()
    let [error, setError] = useState({})
    //let [isValid,SetIsValid] = useState(false)
    let valref = useRef(false)
    async function submitFunc(e) {
        e.preventDefault()
        console.log(obj)
        console.log("ok")
        let formData = new FormData()
        Object.keys(obj).forEach(key => {
            formData.append(key, obj[key])
        })
        if (file) {//fileInput.files[0]) {
            formData.append("file", file) //fileInput.files[0])
        }
        let response = await fetch("http://[::1]:4000/usr", {
            headers: {
                //'Content-Type': 'application/json',

            },
            method: "POST",
            body: formData
        }).then((e) => e.json())
        console.log(response)
        if (!response.msgerror) {
            genMsg("Sucesso", "cadastro realizado com sucesso", 2)
            nav("/frm3")
        } else {
            genMsg("Error", `${response.msgerror}`, 1)
        }
        /*
        let response = await fetch("http://[::1]:4000/authck/",{
                headers:{
                    'Content-Type': 'application/json',
                },
                method:"GET",
                body:JSON.stringify(obj)
        }).then((e)=>e.json())
        console.log(response)*/
    }
    function checkFunction(checkOne, fieldName) {
        let valid = true
        //console.log("here start hecking "+checkOne);
        Object.keys(obj).forEach((el, i) => {
            //console.log(checkOne ? el == fieldName : obj[el] )
            if (checkOne ? el == fieldName && obj[el] : obj[el]) {
                //console.log("the selected is "+el)
                setError(prev => ({ ...prev, [el]: "" }))
                if (el == "password") {
                    let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{5,}$/
                    //^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,11}$/
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
        if (!checkOne) {
            if (!checkFile()) {
                valid = false
            }
        }
        if (!checkOne) {
            //SetIsValid(valid)
            valref.current = valid
            //console.log("checking if it is valid "+valid)
            //console.log(isValid)
        }
    }
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
    }
    function subs(e) {
        e.preventDefault()
        checkFunction(false, "")
        console.log("is valid " + valref.current)
        if (valref.current) {
            submitFunc(e)
        } else {
            genMsg("Error", "campos inválidos", 1)
        }
        //console.log(error)
    }
    return (
        <div className={Style.FormUserContainer}>
            <form>
                <div className={Style.ImgFieldCon}>
                    <ImgInput2 refId={"userImg1"}
                        file={file} setFile={setFile} update={true}
                        checkF={checkFile2}
                        error={error}
                        obj={obj} lab="file" path="http://localhost:4000/uploads/"></ImgInput2>
                </div>
                <Field2 lab="name" type="text" img="/static/user.png"
                    obj={obj} setVal={setObj} error={error} checkF={checkFunction}></Field2>
                <Field2 lab="email" type="email" img="/static/setting.png"
                obj={obj} setVal={setObj} error={error} checkF={checkFunction}></Field2>
                <Field2 lab="password" type="password" img="/static/password_14562503.png"
                    obj={obj} setVal={setObj} error={error} checkF={checkFunction}></Field2>
                <button onClick={(e) => subs(e)}>submit</button>
            </form>
        </div>
    )
}
/*
<Field lab="name" type="text" obj={obj} setVal={setObj} error={error} checkF={checkFunction}></Field>
<Field lab="email" type="email" obj={obj} setVal={setObj} error={error} checkF={checkFunction}></Field>
<Field lab="password" type="password" obj={obj} setVal={setObj} error={error} checkF={checkFunction}
                ></Field>
*/
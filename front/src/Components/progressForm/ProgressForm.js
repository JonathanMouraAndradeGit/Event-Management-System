import React from "react";
import Style from "./ProgressForm.module.css"
import SldInputComp from "../SldInputComp/SldInputComp";
import Field from "../Field/Field";
import { useState, useRef } from "react";
import ImgInput from "../imgInput/ImgInput";
export default function ProgressForm() {
    let [obj, setObj] = useState({name:null,password:null,role: "admin",cnpj:null,logo:null,
        description:null
    })
    let [file, setFile] = useState()
    //ERROR
    let [error, setError] = useState({})
    let valref = useRef(false)

    async function printRes() {
        let newObj = toObj()
        console.log(newObj)
        let formData = new FormData()
        //let rs = toObj(obj)
        appendFormData(formData, toObj())
        /*
        Object.keys(obj).forEach(key => {
            formData.append(key, obj[key])
        })*/
        if (file) {//fileInput.files[0]) {
            formData.append("file", file) //fileInput.files[0])
        }
        let response = await fetch("http://[::1]:4000/usrOng", {
            headers: {
                //'Content-Type': 'application/json',

            },
            method: "POST",
            body: formData//JSON.stringify(newObj)
        }).then((e) => e.json())

        console.log(response)
    }
    function appendFormData(formData, data, parentKey = '') {
        Object.keys(data).forEach(key => {
            const value = data[key]
            const formKey = parentKey ? `${parentKey}[${key}]` : key

            if (value && typeof value === 'object' && !(value instanceof File)) {
                appendFormData(formData, value, formKey)
            } else {
                formData.append(formKey, value)
            }
        })
    }
    function toObj() {
        let newObj = {
            name: obj.name,
            password: obj.password,
            role: "admin",
            ongData: {
                cnpj: obj.cnpj,
                status: true,
                description: obj.description,
                logo: obj.logo
            }
        }
        return newObj
    }
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
        if (!checkOne) {
            if (!checkFile()) {
                valid = false
            }
        }
        if (!checkOne) {
            valref.current = valid
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
    function subs(e){
        e.preventDefault()
        checkFunction(false,"")
        console.log("is valid "+valref.current)
        if(valref.current){
            //submitFunc(e)
            printRes()

        }
        //console.log(error)
    }
    return (
        <SldInputComp>
            <div id='side1' className={Style.sld}>
                <div className={Style.ImgFieldCon}>
                    <ImgInput refId={"userImg2"}
                        file={file} setFile={setFile} update={true}
                        checkF={checkFile2}
                        error={error}
                        obj={obj} lab="file" path="http://localhost:4000/uploads/"
                    ></ImgInput>
                </div>
                <Field lab="name" type="text" obj={obj} setVal={setObj} error={error} checkF={checkFunction}></Field>
                <Field lab="password" type="password" obj={obj} setVal={setObj} error={error} checkF={checkFunction}></Field>
            </div>
            <div id='side1' className={Style.sld}>
                <Field lab="cnpj" type="text" obj={obj} setVal={setObj} error={error} checkF={checkFunction}></Field>
                <Field lab="description" type="text" obj={obj} setVal={setObj} error={error} checkF={checkFunction}></Field>
                <Field lab="logo" type="text" obj={obj} setVal={setObj} error={error} checkF={checkFunction}></Field>
            </div>
            <div id='side1' className={Style.sld}>
                <button onClick={(e) => subs(e)}>submit</button>
            </div>
        </SldInputComp>
    )
}
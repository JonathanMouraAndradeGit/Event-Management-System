import React from "react";
import Style from "./ProgressForm.module.css"
import SldInputComp from "../SldInputComp/SldInputComp";
import Field from "../Field/Field";
import { useState } from "react";
import ImgInput from "../imgInput/ImgInput";
export default function ProgressForm() {
    let [obj, setObj] = useState({ role: "admin" })
    let [file, setFile] = useState()
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
    return (
        <SldInputComp>
            <div id='side1' className={Style.sld}>
                <div className={Style.ImgFieldCon}>
                    <ImgInput refId={"userImg2"}
                        file={file} setFile={setFile} update={true}
                        obj={obj} lab="file" path="http://localhost:4000/uploads/"
                    ></ImgInput>
                </div>
                <Field lab="name" type="text" obj={obj} setVal={setObj}></Field>
                <Field lab="password" type="password" obj={obj} setVal={setObj}></Field>
            </div>
            <div id='side1' className={Style.sld}>
                <Field lab="cnpj" type="text" obj={obj} setVal={setObj}></Field>
                <Field lab="description" type="text" obj={obj} setVal={setObj}></Field>
                <Field lab="logo" type="text" obj={obj} setVal={setObj}></Field>
                <p>ok</p>
            </div>
            <div id='side1' className={Style.sld}>
                <button onClick={() => printRes()}>submit</button>
            </div>
        </SldInputComp>
    )
}
import React, { useState } from "react";
import Style from "./FormUser.module.css"
import Field from "../Field/Field";
import ImgInput from "../imgInput/ImgInput";
export default function FormUser() {
    const [obj, setObj] = useState({ role: "user" })
    let [file, setFile] = useState()
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
            //body: JSON.stringify(obj)
        }).then((e) => e.json())
        console.log(response)

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
    return (
        <div className={Style.FormUserContainer}>
            <form>
                <div className={Style.ImgFieldCon}>
                    <ImgInput refId={"userImg1"}
                        file={file} setFile={setFile} update={true}
                        obj={obj} lab="file" path="http://localhost:4000/uploads/"></ImgInput>
                </div>
                <Field lab="name" type="text" obj={obj} setVal={setObj}></Field>
                <Field lab="password" type="password" obj={obj} setVal={setObj}></Field>
                <button onClick={(e) => submitFunc(e)}>submit</button>
            </form>
        </div>
    )
}
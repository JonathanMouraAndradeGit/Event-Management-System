import React, { useState } from "react";
import Style from "./MenageUser.module.css"
import { useEffect } from "react";
import Field from "../Field/Field";
import ImgInput from "../imgInput/ImgInput";
import { useNavigate } from "react-router-dom";
export default function MenageUser() {
    let nav = useNavigate()
    let [rol, setRol] = useState('')
    let [file, setFile] = useState()
    const [obj, setObj] = useState({ role: "user" })
    let [eventLst,setEventLst] = useState([])
    useEffect(() => {
        let obj1 = JSON.parse(localStorage.getItem("token"))
        //console.log("the role is here")
        //console.log(obj1)
        if (obj1 && obj.role) {
            setRol(obj1.role)
            //console.log(obj1.role)
            getMenageUser()
            if(obj1.role == "admin"){
                getUserEvents()
            }
        } else {
            setRol('')
        }
    }, [])
    async function getMenageUser() {
        let name = JSON.parse(localStorage.getItem("token"))
        console.log("get local storage getmenageuser")
        console.log(name)
        let response = await fetch("http://[::1]:4000/usrtoken/", {
            headers: {
                'Authorization': `Bearer ${name.token}`,
                'Content-Type': 'application/json',

            },
            method: "GET",
        }).then((e) => e.json())
        let trueId = response.id
        const resultado = {
            ...response,
            ...response.ondData
        };

        delete resultado.ondData;

        resultado.trueId = trueId
        console.log(resultado)
        setObj(resultado)


    }
    function toObj() {
        let lst = JSON.parse(localStorage.getItem("token"))
        let newObj = {
            id: obj.trueId,
            name: obj.name,
            password: obj.password,
            role: lst.role,
            ongData: {
                cnpj: obj.cnpj,
                status: true,
                description: obj.description,
                logo: obj.logo
            }
        }
        return newObj
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
    async function update(e) {
        e.preventDefault()
        console.log(obj)
        //console.log("ok")
        let trueObj = toObj()
        console.log(trueObj)
        let tok = JSON.parse(localStorage.getItem("token"))
        let formData = new FormData()
        appendFormData(formData, toObj())
        /*Object.keys(obj).forEach(key => {
            formData.append(key, obj[key])
        })*/
        if (file) {//fileInput.files[0]) {
            formData.append("file", file) //fileInput.files[0])
        }
        let response = await fetch(`http://[::1]:4000/usrOng/updateU/${obj.trueId}`, {
            headers: {
                //'Content-Type': 'application/json',
                'Authorization': `Bearer ${tok.token}`,
            },
            method: "PUT",
            body: formData//JSON.stringify(trueObj)
        }).then((e) => e.json())
        console.log(response)
        if(response.msg){
            let tok = JSON.parse(localStorage.getItem("token"))
            let objls = {name:obj.name,role:tok.role,token:response.token}
            //tok.name = obj.name
            console.log("new local storage is ")
            console.log(objls)
            let tres = JSON.stringify(objls)
            localStorage.setItem("token",tres)
        }
        getMenageUser()

    }
    function DealUpdate(e){
        let tok = JSON.parse(localStorage.getItem("token"))
        
        if(tok.role == "admin"){
            update(e)
        }
        if(tok.role == "user"){
            updateUsr(e)
        }
    }
    async function updateUsr(e) {
        e.preventDefault()
        //console.log(obj)
        //console.log("ok")
        //let trueObj = toObj()
        //console.log(trueObj)
        console.log("updating obj")
        console.log(obj)
        let formData = new FormData()
        Object.keys(obj).forEach(key => {
            formData.append(key, obj[key])
        })
        if (file) {//fileInput.files[0]) {
            formData.append("file", file) //fileInput.files[0])
        }
        let tok = JSON.parse(localStorage.getItem("token"))
        let response = await fetch(`http://[::1]:4000/usr/updateU/`, {
            headers: {
                //'Content-Type': 'application/json',
                'Authorization': `Bearer ${tok.token}`,
            },
            method: "PUT",
            body: formData//JSON.stringify(obj)
        }).then((e) => e.json())
        console.log(response)
        if(response.msg){
            let tok = JSON.parse(localStorage.getItem("token"))
            let objls = {name:obj.name,role:tok.role,token:response.token}
            //tok.name = obj.name
            console.log("new local storage is ")
            console.log(objls)
            let tres = JSON.stringify(objls)
            localStorage.setItem("token",tres)
        }
        getMenageUser()

    }
    async function getUserEvents(){
        let tok = JSON.parse(localStorage.getItem("token"))
        let response = await fetch(`http://[::1]:4000/eventOngEvents/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tok.token}`,
            },
            method: "GET"
        }).then((e) => e.json())
        console.log("events")
        console.log(response)
        if(!response.msgError){
            setEventLst(response)
        }
        //setEventLst()
    }
    function gotoUpdate(id){
        nav(`/frm6/${id}`)
    }
    return (
        <div className={Style.MenageUserContainer}>
            <div className={Style.sideContent}>
                <div className={Style.contentBlock}>
                    <div className={Style.ImgFieldCon}>
                        <ImgInput refId={"userImg1"}
                        file={file} setFile={setFile} update={true}
                        obj={obj} lab="file" path="http://localhost:4000/uploads/"
                        ></ImgInput>
                    </div>
                    <Field lab="name" type="text" obj={obj} setVal={setObj}></Field>
                    <Field lab="password" type="password" obj={obj} setVal={setObj}></Field>
                    <button onClick={(e) => DealUpdate(e)}>update</button>
                </div>
            </div>
            {rol == 'admin' && (
                <div className={Style.sideContent}>
                    <div className={Style.contentBlock}>
                        <Field lab="cnpj" type="text" obj={obj} setVal={setObj}></Field>
                        <Field lab="description" type="text" obj={obj} setVal={setObj}></Field>
                        <Field lab="logo" type="text" obj={obj} setVal={setObj}></Field>
                    </div>
                    <div className={Style.contentBlock}>
                        <div className={Style.lstStl}>
                            {eventLst.length > 0 && (
                                eventLst.map((el,i)=>{
                                    //console.log(el.file)
                                    return <div key={`lstItemCard${i}`}
                                    className={Style.lstItem} onClick={()=>gotoUpdate(el.id)}>
                                        <img src={`http://localhost:4000/uploads/${el.file}`}/><p>{el.title}</p>
                                        </div>
                                })
                            )}
                        </div>
                    </div>
                </div>)
            }
        </div>
    )
}
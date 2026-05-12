import React, { useState } from "react";
import Style from "./MenageUser.module.css"
import { useEffect, useRef } from "react";
import Field from "../Field/Field";
import ImgInput from "../imgInput/ImgInput";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { ctx } from "../../App";

import Field2 from "../Field2/Field2";
import ImgInput2 from "../ImgInput2/ImgInput2";


export default function MenageUser(props) {

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
    let [rol, setRol] = useState('')
    let [file, setFile] = useState()
    const [obj, setObj] = useState({ name: null, email: null, password: null, role: "user" })
    let [eventLst, setEventLst] = useState([])

    //ERROR
    let [error, setError] = useState({})
    let valref = useRef(false)

    function checkFunction(checkOne, fieldName) {
        let valid = true
        Object.keys(obj).forEach((el, i) => {
            if (checkOne ? el == fieldName && obj[el]
                : obj[el]) {
                setError(prev => ({ ...prev, [el]: "" }))
                if (el == "password") {
                    let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{5,}$/
                    if (!reg.test(obj[el])) {
                        setError(prev => ({ ...prev, [el]: "senha fraca" }))
                        valid = false
                    }
                }
            } else {
                if (el != "status") {
                    if (!checkOne ? true : el == fieldName) {
                        setError(prev => ({ ...prev, [el]: "nao pode ser nulo" }))
                        console.log("nullable " + el)
                        valid = false
                    }
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

    function subs(e) {
        e.preventDefault()
        checkFunction(false, "")
        console.log("is valid " + valref.current)
        console.log(error)
        if (valref.current) {
            //submitFunc(e)
            //printRes()
            //submit(e)
            DealUpdate(e)
        } else {
            genMsg("Error", "campos inválidos", 1)
        }
        //console.log(error)
    }

    useEffect(() => {
        let obj1 = JSON.parse(localStorage.getItem("token"))
        //console.log("the role is here")
        //console.log(obj1)
        if (obj1 && obj.role) {
            setRol(obj1.role)
            //console.log(obj1.role)
            getMenageUser()
            if (obj1.role == "admin") {

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
            email: obj.email,
            password: obj.password,
            role: lst.role,
            ongData: {
                cnpj: obj.cnpj,
                status: true,
                description: obj.description,
                //logo: obj.logo
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
        if (response.msg) {
            let tok = JSON.parse(localStorage.getItem("token"))
            //let objls = { name: obj.name, role: tok.role, token: response.token}
            //if(response.file && response.file != undefined){
            let objls = { name: obj.name, role: tok.role, token: response.token, file: response.file }
            //}
            //tok.name = obj.name
            console.log("new local storage is ")
            console.log(objls)
            console.log(response)
            let tres = JSON.stringify(objls)
            localStorage.setItem("token", tres)
            props.setAuth(objls)
            genMsg("Sucesso", "operação realizada com sucesso", 2)
        } else {
            //genMsg("Erro","Erro ao realizar operação",1)
            if (response.msgerror) {
                genMsg("Error", `${response.msgerror}`, 1)
            } else {
                genMsg("Error", "erro ao realizar operação", 1)
            }
        }
        getMenageUser()

    }
    function DealUpdate(e) {
        let tok = JSON.parse(localStorage.getItem("token"))

        if (tok.role == "admin") {
            update(e)
        }
        if (tok.role == "user") {
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
        if (response.msg) {
            let tok = JSON.parse(localStorage.getItem("token"))
            //let objls = { name: obj.name, role: tok.role, token: response.token, file: response.file }
            //let objls = { name: obj.name, role: tok.role, token: response.token}
            //if(response.file && response.file != undefined){
            let objls = { name: obj.name, role: tok.role, token: response.token, file: response.file }
            //}
            //tok.name = obj.name
            console.log("new local storage is ")
            console.log(objls)
            let tres = JSON.stringify(objls)
            localStorage.setItem("token", tres)
            props.setAuth(objls)
            genMsg("Sucesso", "operação realizada com sucesso", 2)
        } else {
            if (response.msgerror) {
                genMsg("Error", `${response.msgerror}`, 1)
            } else {
                genMsg("Error", "erro ao realizar operação", 1)
            }
        }
        getMenageUser()

    }
    async function getUserEvents() {
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
        if (!response.msgError) {
            setEventLst(response)
        }
        //setEventLst()
    }
    function gotoUpdate(id) {
        nav(`/frm6/${id}`)
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
    return (
        <div className={Style.MenageUserContainer}>
            <div className={Style.sideContent}>
                <div className={Style.contentBlock}>
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
                    <button className={Style.btnOps} onClick={(e) => subs(e)}>update</button>
                </div>
            </div>
            {rol == 'admin' && (
                <div className={Style.sideContent}>
                    <div className={Style.contentBlock}>
                        <Field2 lab="cnpj" type="text" img="/static/user.png"
                            obj={obj} setVal={setObj} error={error} checkF={checkFunction}></Field2>
                        <Field2 lab="description" type="text" img="/static/setting.png"
                            obj={obj} setVal={setObj} error={error} checkF={checkFunction}></Field2>
                    </div>
                    <div className={Style.contentBlock2}>
                        <div className={Style.lstStl}>
                            {eventLst.length > 0 && (
                                eventLst.map((el, i) => {
                                    //console.log(el.file)
                                    return <div key={`lstItemCard${i}`}
                                        className={Style.lstItem} onClick={() => gotoUpdate(el.id)}>
                                        <img src={`http://localhost:4000/uploads/${el.file}`} />
                                        <div className={Style.sideEventtxt}>
                                            <p>{el.title}</p>
                                            <p>{`${new Date(el.eventDate).getDate()}
                                            / ${new Date(el.eventDate).getMonth()} /
                                            ${new Date(el.eventDate).getFullYear()}`}</p>
                                        </div>
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

/*
<ImgInput refId={"userImg1"}
                            file={file} setFile={setFile} update={true}
                            obj={obj} lab="file" path="http://localhost:4000/uploads/"
                        ></ImgInput>






<Field lab="name" type="text" obj={obj} setVal={setObj}
                        error={error} checkF={checkFunction}></Field>
                    <Field lab="email" type="email" obj={obj} setVal={setObj}
                        error={error} checkF={checkFunction}></Field>
                    <Field lab="password" type="password" obj={obj} setVal={setObj}
                        error={error} checkF={checkFunction}></Field>


                        <Field lab="cnpj" type="text" obj={obj} setVal={setObj}
                            error={error} checkF={checkFunction}></Field>
                        <Field lab="description" type="text" obj={obj} setVal={setObj}
                            error={error} checkF={checkFunction}></Field>                       

*/

/*
<Field lab="logo" type="text" obj={obj} setVal={setObj}
                            error={error} checkF={checkFunction}></Field>
*/
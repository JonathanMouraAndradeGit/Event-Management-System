import Style from "./UpdateEvent.module.css"
import React, { useRef } from "react"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventCard from "../EventCard/EventCard";
import Field from "../Field/Field";
import CalendarSet from "../CalendarSet/CalendarSet"
import ImgInput from "../imgInput/ImgInput";
import MapComp from "../MapComp/MapComp";
import CardUp from "../CardUp/CardUp";
export default function UpdateEvent() {
    const { id } = useParams();
    let [obj, setObj] = useState({title:null,description:null,eventDate:null,latlon:null,display:null})//{})
    let [file, setFile] = useState()
    let [rol, setRol] = useState('')
    let [event, setEvent] = useState([])
    let lstE = useRef([])

    let Opeation = useRef(true)

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
        if (!checkOne && Opeation.current) {
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
    function subs1(e) {
        e.preventDefault()
        checkFunction(false, "")
        console.log("is valid " + valref.current)
        console.log(error)
        if (valref.current) {
            subsFunction()
        }
    }
    function subs2(e) {
        e.preventDefault()
        checkFunction(false, "")
        console.log("is valid " + valref.current)
        console.log(error)
        if (valref.current) {
            execUpdate()
        }
        //console.log(error)
    }

    useEffect(() => {
        let obj1 = JSON.parse(localStorage.getItem("token"))
        //console.log("the role is here")
        //console.log(obj1)
        const res = async () => {
            if (obj1 && obj1.role) {
                setRol(obj1.role)
                //console.log(obj1.role)
                if (obj1.role == "admin") {
                    await getUserEvents()
                    setFirstEvetn()
                }
            } else {
                setRol('')
            }
        }
        res()
    }, [])
    function setFirstEvetn() {
        console.log("trying to load")
        //console.log(event)
        console.log(lstE.current)
        lstE.current.forEach((el, i) => {
            if (el.id == id) {
                console.log("is equal here=---------------")
                updateEventFunction(el)
            }
        })
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
            setEvent(response)
            lstE.current = response
        }
        //setEventLst()
    }
    /*
    async function subsFunction() {
        console.log("the field are")
        console.log(obj)
        let tok = JSON.parse(localStorage.getItem("token"))
        let obj1 = { ...obj }
        //obj1["eventDate"] = new Date()
        obj1["ongE"] = 2
        let response = await fetch(`http://[::1]:4000/event/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tok.token}`,
            },
            method: "POST",
            body: JSON.stringify(obj1)
        }).then((e) => e.json())
        console.log("events")
        console.log(response)
    }*/
    async function subsFunction() {
        console.log("the field are")
        console.log(obj)

        let tok = JSON.parse(localStorage.getItem("token"))

        let formData = new FormData()

        // adiciona os campos normais
        formData.append("ongE", 2)

        Object.keys(obj).forEach(key => {
            formData.append(key, obj[key])
        })

        // adiciona a imagem
        //const fileInput = document.querySelector("#imageInput")
        if (file) {//fileInput.files[0]) {
            formData.append("file", file) //fileInput.files[0])
        }

        let response = await fetch(`http://[::1]:4000/event/`, {
            headers: {
                'Authorization': `Bearer ${tok.token}`,
            },
            method: "POST",
            body: formData
        }).then((e) => e.json())

        console.log("events")
        console.log(response)
        getUserEvents()
        clearFields()
    }
    async function deleteFunction(id) {
        let tok = JSON.parse(localStorage.getItem("token"))
        let response = await fetch(`http://[::1]:4000/event/${id}`, {
            headers: {
                'Authorization': `Bearer ${tok.token}`,
            },
            method: "DELETE"
        }).then((e) => e.json())
        if (response.message) {
            clearFields()
            getUserEvents()
        }
        console.log(response)
    }
    function updateEventFunction(el) {
        console.log(el)
        setObj(el)
        Opeation.current = false

    }
    function clearFields() {
        setObj({title:null,description:null,eventDate:null,latlon:null,display:null})
        setError({})
        Opeation.current = true
    }
    async function execUpdate() {
        //console.log("the field are")
        //console.log(obj)
        let tok = JSON.parse(localStorage.getItem("token"))
        //let obj1 = { ...obj }
        //obj1["eventDate"] = new Date()
        //obj1["ongE"] = 2
        let formData = new FormData()

        // adiciona os campos normais
        formData.append("ongE", 2)

        Object.keys(obj).forEach(key => {
            formData.append(key, obj[key])
        })

        if (file) {
            formData.append("file", file)
        }
        let response = await fetch(`http://[::1]:4000/event/${obj.id}`, {
            headers: {
                //'Content-Type': 'application/json',
                'Authorization': `Bearer ${tok.token}`,
            },
            method: "PUT",
            body: formData//JSON.stringify(obj1)
        }).then((e) => e.json())
        console.log("events")
        console.log(response)
        getUserEvents()
    }
    return (
        <div className={Style.ContainerUE}>
            <div className={Style.ConScroller}>
                <div className={Style.divCon}>
                    <div className={Style.SideFrm}>
                        <div className={Style.SideBox}>
                            <div className={Style.InputBox}>
                                <div className={Style.ImgFieldCon}>
                                    {(!Opeation.current) ? (
                                    <ImgInput refId={"userImg1"}
                                        file={file} setFile={setFile} update={true}
                                        obj={obj} lab="file" path="http://localhost:4000/uploads/"></ImgInput>)
                                        : (
                                    <ImgInput refId={"userImg1"}
                                        file={file} setFile={setFile} update={true}
                                        checkF={checkFile2}
                                        error={error}
                                        obj={obj} lab="file" path="http://localhost:4000/uploads/"></ImgInput>)
                                    }
                                </div>
                                <Field lab="title" type="text" obj={obj} setVal={setObj}
                                 error={error} checkF={checkFunction}></Field>
                                <Field lab="description" type="text" obj={obj} setVal={setObj}
                                 error={error} checkF={checkFunction}></Field>
                                <div>
                                    {Opeation.current && (
                                        <button onClick={(e) => subs1(e)}>Submit</button>)
                                    }
                                    {!Opeation.current && (
                                        <button onClick={(e) => subs2(e)}>update</button>
                                    )
                                    }
                                </div>
                                <button className={Style.clearCon}
                                    onClick={() => clearFields()}>X</button>
                            </div>
                        </div>
                    </div>
                    <div className={Style.SideFrm2}>
                        <div className={Style.SideBox}>
                            <CalendarSet readOnly={false} selectedDt={new Date()}
                                lab="eventDate" obj={obj} setVal={setObj}></CalendarSet>
                        </div>
                        <div className={Style.SideBox}>
                            <MapComp
                                lab="latlon"
                                lab2="display"
                                readOnly={false}
                                obj={obj} setVal={setObj}></MapComp>
                        </div>
                    </div>
                </div>
                <div className={Style.divCon2}>
                    <div className={Style.scrollContent}>
                        <div className={Style.eventLst}>
                            {event.map((el, i) => {
                                return (
                                    <div className={Style.ItemLst} key={i}>
                                        <CardUp update={() => updateEventFunction(el)}
                                            delete={() => deleteFunction(el.id)} obj={el}
                                            path="http://localhost:4000/uploads/"></CardUp>

                                    </div>
                                )
                            })

                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
/*

<form className={Style.FormContent}>
                    <Field lab="title" type="text" obj={obj} setVal={setObj}></Field>
                    <Field lab="description" type="text" obj={obj} setVal={setObj}></Field>
                    <Field lab="place" type="text" obj={obj} setVal={setObj}></Field>
                    <Field lab="city" type="text" obj={obj} setVal={setObj}></Field>
                    <Field lab="state" type="text" obj={obj} setVal={setObj}></Field>
                    
                </form>





<div>
                                            <p>{el.title}</p>
                                            <div>
                                                <button onClick={() => updateEventFunction(el)}>update</button>
                                                <button>delete</button>
                                            </div>
                                        </div>


                */
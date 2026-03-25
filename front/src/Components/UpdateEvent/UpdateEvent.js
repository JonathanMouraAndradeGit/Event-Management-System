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
    let [obj, setObj] = useState({})
    let [file, setFile] = useState()
    let [rol, setRol] = useState('')
    let [event, setEvent] = useState([])
    let lstE = useRef([])
    useEffect(() => {
        let obj1 = JSON.parse(localStorage.getItem("token"))
        //console.log("the role is here")
        //console.log(obj1)
        const res = async ()=>{
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
    function setFirstEvetn(){
        console.log("trying to load")
        //console.log(event)
        console.log(lstE.current)
        lstE.current.forEach((el,i)=>{
            if(el.id == id){
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

    }
    function clearFields() {
        setObj({})
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
                                    <ImgInput refId={"userImg1"}
                                        file={file} setFile={setFile} update={true}
                                        obj={obj} lab="file" path="http://localhost:4000/uploads/"></ImgInput>
                                </div>
                                <Field lab="title" type="text" obj={obj} setVal={setObj}></Field>
                                <Field lab="description" type="text" obj={obj} setVal={setObj}></Field>
                                <div>
                                    <button onClick={() => subsFunction()}>Submit</button>
                                    <button onClick={() => execUpdate()}>update</button>
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
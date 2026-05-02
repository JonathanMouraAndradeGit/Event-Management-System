import React, { useState } from "react";
import Style from "./EventPage.module.css"
import CalendarSet from "../CalendarSet/CalendarSet";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import MapComp from "../MapComp/MapComp";
import CommentCon3 from "../CommentCon3/CommentCon3";

import { useContext } from "react";
import { ctx } from "../../App";

export default function EventPage() {

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


    let [obj, setObj] = useState({})
    let [rol, setRol] = useState('')
    let [isSubscribe, setIsSubscribe] = useState(true)
    let [objEP, setObjEP] = useState({})
    const { id } = useParams();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let fullNamwMonth = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"]
    useEffect(() => {
        if (id) {
            getEventById(id)
        }
        let obj1 = JSON.parse(localStorage.getItem("token"))
        console.log("here ate the use effect")
        if (obj1 && obj1.role) {
            setRol(obj1.role)
        }
        console.log("checking user")

        console.log(obj1.role)
        if (id && obj1.role == "user") {
            //console.log("execution ------ ")
            checkSubscription(obj1.role)
        }
    }, [])
    async function getEventById(id) {
        //let tok = JSON.parse(localStorage.getItem("token"))
        let response = await fetch(`http://[::1]:4000/eventid/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${tok.token}`,
            },
            method: "GET"
        }).then((e) => e.json())
        console.log("events")
        console.log(response)
        setObjEP(response)
        setObj({
            latlon: response.event.latlon, //"{\"lat\":\"-23.6524495\",\"lon\":\"-46.5424910\"}",
            eventDate: response.event.eventDate//"2026-09-14T17:14:22.000Z"

        })
        //if (!response.msgError) {
        //setEvent(response)
        //}
    }
    async function subscribe() {
        try {
            let tok = JSON.parse(localStorage.getItem("token"))
            let response = await fetch(`http://[::1]:4000/subscription/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tok.token}`,
                },
                method: "POST"
            }).then((e) => e.json())
            console.log(response)
            //if(response){
            //}

            if(response.messagerror){
                genMsg("Error",response.messagerror,1)    
            }else{
                genMsg("Sucesso","operação realizada com sucesso",2)
            }
        } catch (e) {
            console.log(`Error: ${e}`)

            genMsg("Error","Erro ao realizar operação",1)
        }
        checkSubscription(rol)
    }
    async function checkSubscription(role) {
        let subs = false
        //console.log("check subscription")
        try {
            if (id && role == "user") {

                let tok = JSON.parse(localStorage.getItem("token"))
                let response = await fetch(`http://[::1]:4000/checkSubcription/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${tok.token}`,
                    },
                    method: "GET"
                }).then((e) => e.json())
                //console.log("this is the response")
                console.log(response)
                if (response.subscribe) {
                    subs = response.subscribe
                }
            }
        } catch (e) {
            //console.log("the error is here ----------")
            console.log(e)
        }
        //console.log("the res is " + subs)
        setIsSubscribe(subs)
        //return subs
    }
    return (
        <div className={Style.EPContainer}>
            <div className={Style.UpHeader}>
                <img src={objEP && objEP.event ? `http://localhost:4000/uploads/${objEP.event.file}` : "/static/default-image.jpg"} />
            </div>
            <div className={Style.MainC}>
                <div className={Style.SideInfo}>
                    <div className={Style.imgCirc}>
                        <img src={objEP && objEP.photo ? `http://localhost:4000/uploads/${objEP.photo}` : "/static/citynight.jpg"} />
                    </div>
                    <div className={Style.FieldC}>
                        <img src="/static/user.png" />
                        {objEP && objEP.name ? (
                            <p>{objEP.name}</p>) : "name"}
                    </div>
                    <div className={Style.FieldC}>
                        <img src="/static/id-card.png" />
                        {objEP && objEP.ong ? (
                            <p>{objEP.ong.cnpj}</p>) : "cnpj"}
                    </div>

                    <div className={Style.DescriptionCon}>
                        <p>Description</p>
                        <p>
                            {objEP && objEP.ong ? objEP.ong.description : "description"}
                        </p>
                    </div>
                </div>
                <div className={Style.MainContent}>
                    <p className={Style.TitleEvent}>{objEP && objEP.event ? objEP.event.title : "title"}</p>
                    <div className={Style.Field}>
                        <img src="/static/calendar.png" />
                        {objEP && objEP.event ? (
                            <p>{`${days[new Date(objEP.event.eventDate).getDay()]} 
                        ${new Date(objEP.event.eventDate).getDate()} 
                        ${fullNamwMonth[new Date(objEP.event.eventDate).getMonth()].toUpperCase()}
                        ${new Date(objEP.event.eventDate).getFullYear()}`}</p>)
                            : "datw"
                        }
                    </div>
                    <div className={Style.Field}>
                        <img src="/static/location.png" />
                        {objEP && objEP.event ? (
                            <p>{objEP.event.display}</p>
                        )
                            : "datw"
                        }
                    </div>
                    <div className={Style.DescriptionCon}>
                        <p>Description</p>
                        <p>{objEP && objEP.event ? objEP.event.description : "description"}</p>
                    </div>
                    <div className={Style.boxSection}>
                        <div className={Style.boxC}>
                            <CalendarSet readOnly={true} selectedDt={new Date()}
                                lab="eventDate" obj={obj} setVal={setObj}></CalendarSet>
                        </div>
                        <div className={Style.boxC}>
                            <MapComp
                                lab="latlon"
                                lab2="display"
                                readOnly={true}
                                obj={obj} setVal={setObj}></MapComp>
                        </div>
                    </div>
                </div>
            </div>
            {(rol == 'user' && !isSubscribe) && (
                <div className={Style.subsCribeSection}>
                    <button onClick={() => subscribe()}>Inscrever{isSubscribe}</button>
                </div>
            )}
            <div className={Style.CommentCOn}>
                <CommentCon3 eventId={id}></CommentCon3>
            </div>
        </div>
    )
}

/**
(rol == 'user' && isSubscribe) && 

<p>{objEP && objEP.name ? objEP.name : "name"}</p>
                    <p>
                        {objEP && objEP.ong ? objEP.ong.cnpj :"cnpj"}
                    </p>


 */
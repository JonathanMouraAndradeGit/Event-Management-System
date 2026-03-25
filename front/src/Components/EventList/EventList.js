import React from "react";
import Style from "./EventList.module.css"
import EventCard from "../EventCard/EventCard";
import { useEffect, useState } from "react";
import CardPath from "../CardPath/CardPath";
import { Navigate, useNavigate } from "react-router-dom";
export default function EventList() {
    //let arr = [1, 2, 3, 4, 5]
    let nav = useNavigate()
    let [event, setEvent] = useState([])
    useEffect(() => {
        getAllevents()
    }, [])
    async function getAllevents() {
        let response = await fetch("http://[::1]:4000/event/", {
            headers: {
                'Content-Type': 'application/json',

            },
            method: "GET",
        }).then((e) => e.json())
        //console.log(response)
        setEvent(response)
    }
    function goNav(id){
        nav(`/frm7/${id}`)
    }
    return (
        <div className={Style.ContainerList}>
            <div className={Style.maindDiv}>
                <div className={Style.imgCon}>
                    <p>Events</p>
                    <img src="/static/citynight.jpg"/>
                </div>
            </div>

            <div className={Style.scrollContent}>
                <div className={Style.eventLst}>
                    {event.map((el, i) => {
                        return (
                            <div className={Style.ItemLst} key={i}>
                                <CardPath redirect={()=>goNav(el.id)} obj={el}
                                    path="http://localhost:4000/uploads/"></CardPath>
                            </div>
                        )
                    })

                    }
                </div>
            </div>
        </div>
    )
}
/*
<EventCard obj={el}></EventCard>
<div className={Style.eventLst}>
                {arr.map((el,i)=>{
                    return (
                        <div className={Style.ItemLst}>
                            {el}
                        </div>
                    )
                })

                }
            </div>
*/
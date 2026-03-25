import Style from "./UserEventsPage.module.css"
import React, { useRef, useState } from "react"
import CalendarInfo from "../CalendarInfo/CalendarInfo"
import { useEffect } from "react"
export default function UserEventsPage() {
    let dt = new Date()
    let dt2 = new Date(dt.setDate(5))
    //let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 6, 67, 8, 9]
    let [UserEvent, setUsrEvent] = useState([])
    /*let arr2 = [{ name: 1, date: new Date() },
    { name: 2, date: new Date(dt.setMonth(dt.getMonth() + 1)) },
    { name: 4, date: new Date(dt2.setMonth(dt2.getMonth())) },
    { name: 2, date: new Date(dt.setMonth(dt.getMonth() + 2)) },
    { name: 3, date: new Date(dt.setMonth(dt.getMonth() + 3)) },
    ]*/
    let refLstEvents = useRef()
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let fullNamwMonth = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"]
    let [obj, setObj] = useState({})
    useEffect(() => {
        console.log(obj)
        console.log("date selected")
        if(obj){
            appyCardStyle(obj.id)
        }
    }, [obj])//[obj["eventDate"]])
    useEffect(() => {
        console.log("here is the events")
        getEvents()
    }, [])
    async function getEvents() {
        let tok = JSON.parse(localStorage.getItem("token"))
        let response = await fetch(`http://[::1]:4000/getAllSub/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tok.token}`,
            },
            method: "GET",
            //body: formData//JSON.stringify(obj1)
        }).then((e) => e.json())
        console.log(response)
        if (response.length > 0) {
            setUsrEvent(response)
        }
    }
    function menageSelection(el){
        setObj(el)
    }
    function appyCardStyle(idItem) {
        Array.from(refLstEvents.current.children).forEach((el, i) => {
            //console.log(el)
            let lst = el.querySelectorAll('span')
            if (lst.length > 0) {
                let iditemLst = lst[0].textContent //JSON.parse(lst[0].textContent)
                //let objDate = new Date(obj)
                //let comp = compareDates(selectedDT.current, objDate)
                if (idItem == iditemLst ) {
                    el.classList.add("selectedLstCard")
                } else {
                    el.classList.remove("selectedLstCard")
                }
            } else {
                el.classList.remove("selectedLstCard")
            }
        })
    }
    return (
        <div className={Style.Container}>
            <div className={Style.mainDiv}>
                <div className={`${Style.sideList} ${Style.sideShadow}`} ref={refLstEvents}>
                    {UserEvent.map((el, i) => {
                        return (
                            <div className={Style.LstItem} key={`userEvent${i}`}
                            onClick={()=>menageSelection(el)}>
                                <img src={`http://localhost:4000/uploads/${el.file}`} />
                                {el.title}
                                <span>{el.id}</span>
                            </div>
                        )
                    })

                    }
                </div>

                <div className={`${Style.mainCal} ${Style.sideShadow}`}>
                    <CalendarInfo readOnly={false} selectedDt={new Date()}
                        lab="eventDate"
                        dateset={UserEvent}
                        obj={obj} setVal2={setObj}></CalendarInfo>
                </div>
            </div>
            {(obj && obj.title) && (
                <div className={`${Style.EventInfo} ${Style.sideShadow}`}>
                    <div className={Style.EventImg}>
                        <img src={obj && obj.file ? `http://localhost:4000/uploads/${obj.file}` : "/static/citynight.jpg"}/>
                    </div>
                    <div className={Style.sideMainC}>
                        <div className={Style.Field}>
                            <img src="/static/calendar.png" />
                            {obj && obj.eventDate ? (
                                <p>{`${days[new Date(obj.eventDate).getDay()]} 
                                                ${new Date(obj.eventDate).getDate()} 
                                                ${fullNamwMonth[new Date(obj.eventDate).getMonth()].toUpperCase()}
                                                ${new Date(obj.eventDate).getFullYear()}`}</p>)
                                : "datw"
                            }
                        </div>
                        <div className={Style.Field}>
                            <img src="/static/location.png" />
                            {obj && obj.display ? (
                                <p>{obj.display}</p>
                            )
                                : "datw"
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
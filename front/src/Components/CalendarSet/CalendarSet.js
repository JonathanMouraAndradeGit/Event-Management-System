import React, { useState } from "react";
import Style from "./CalendarSet.module.css"
import { useRef, useEffect } from "react";
export default function CalendarSet(props) {
    let dateRef = useRef(new Date())
    let refDays = useRef()
    let [ld, setld] = useState([])
    //let [arrD, setArrD] = useState([])
    let dayName = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    let monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let fullNamwMonth = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"]
    //let [selectedDate, setSelectedDate] = useState()
    let selectedDT = useRef()
    useEffect(() => {
        if (props.readOnly && props.obj[props.lab]) {
            selectedDT.current = props.obj[props.lab] //props.selectedDt
        }
        loadDays()
    }, [])
    useEffect(() => {
        //refField.current.value = props.obj[props.lab]
        if (props.obj[props.lab]) {
            selectedDT.current = props.obj[props.lab]
            dateRef.current = new Date(props.obj[props.lab])
            setld([])
            loadDays()
            setld([])
        }else{
            setld([])
            selectedDT.current = null
            dateRef.current = new Date()
            loadDays()
        }
    }, [props.obj[props.lab]])
    function loadDays() {
        let arr = []
        let lastDate = new Date(dateRef.current)
        lastDate = new Date(lastDate.setDate(0))
        let nextDate = new Date(dateRef.current)
        nextDate = new Date(nextDate.setMonth(nextDate.getMonth() + 1))
        nextDate = new Date(nextDate.setDate(-1))

        let curDate = new Date(dateRef.current)
        curDate = new Date(curDate.setDate(1))

        let w = curDate.getDay() == 6 ? 7 : 7 - (curDate.getDay() + 1)

        for (let i = w; i >= 0; i--) {
            let lst = new Date(lastDate)
            lst = new Date(lst.setDate(lastDate.getDate() - i))
            arr.push({ d: (lastDate.getDate() - i), full: lst, cur: false })
        }
        for (let i2 = 0; i2 <= nextDate.getDate(); i2++) {
            //arr.push(i2 + 1)
            let lst = new Date(dateRef.current)
            lst = new Date(lst.setDate(i2 + 1))
            arr.push({ d: (i2 + 1), full: lst, cur: true })
        }
        let val = 0
        let lst = new Date(dateRef.current)
        lst = new Date(lst.setMonth(dateRef.current.getMonth() + 1))
        while (arr.length < 42) {
            val += 1
            lst = new Date(lst.setDate(val))
            arr.push({ d: val, full: lst, cur: false })
        }
        //setArrD(arr)
        console.log(arr)
        renderDaysRef(arr)
        //appyDayStyle(selectedDate)
        appyDayStyle(selectedDT.current)
    }

    function gotoMonth(val) {
        if (!props.readOnly) {
            let rs = 0
            monthName.forEach((el, i) => {
                if (el == val) {
                    rs = i
                }
            })
            dateRef.current = new Date(dateRef.current.setMonth(rs))
            setld([])
            loadDays()
        }
    }
    function changeMonth(val) {
        dateRef.current = new Date(dateRef.current.setMonth(dateRef.current.getMonth() + val))
        setld([])
        loadDays()
    }
    function changeYear(val) {
        dateRef.current = new Date(dateRef.current.setFullYear(dateRef.current.getFullYear() + val))
        setld([])
        loadDays()
    }
    function getDat(e) {
        let day = e.target.textContent
        console.log(`${day}/${dateRef.current.getMonth() + 1}/
        ${dateRef.current.getFullYear()}`)
    }
    function getDat2(e, i) {
        if (!props.readOnly) {
            selectedDT.current = e.full
            console.log("the obj is ")
            appyDayStyle(e.full)
            console.log(props.obj)
            /*
            const newObj = {
                ...props.obj,
                [props.lab]: e.full
            };
            props.setVal(newObj);*/
            props.setVal(prev => ({
                ...prev,
                [props.lab]: e.full
            }));
        }
    }
    function appyDayStyle(dt) {
        Array.from(refDays.current.children).forEach((el, i) => {
            //console.log(el)
            let lst = el.querySelectorAll('span')
            if (lst.length > 0) {
                let obj = JSON.parse(lst[0].textContent)
                let objDate = new Date(obj)
                let comp = compareDates(selectedDT.current, objDate)
                if (comp) {
                    //console.log("the comparation is equal")
                    //console.log(comp)
                    //console.log(selectedDT.current)
                    //console.log(objDate)
                    el.classList.add("selectedDateDay")
                } else {
                    el.classList.remove("selectedDateDay")
                }
            } else {
                el.classList.remove("selectedDateDay")
            }
        })
    }
    function compareDates(data1, data2) {
        const d1 = new Date(data1);
        const d2 = new Date(data2);

        return (
            d1.getDate() === d2.getDate() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getFullYear() === d2.getFullYear()
        );
    }
    function renderDaysRef(arrD) {
        if (!refDays.current) return;

        refDays.current.innerHTML = ""; // limpa antes

        arrD.forEach((el, i) => {
            const div = document.createElement("div");
            div.setAttribute("key", `dayElement${i}`);

            div.textContent = el.d;

            if (el.cur) {
                div.onclick = () => getDat2(el, i);

                const span = document.createElement("span");
                span.textContent = JSON.stringify(el.full);
                div.appendChild(span);
            } else {
                div.classList.add(Style.unSelected);
            }

            refDays.current.appendChild(div);
        });
    }
    return (
        <div className={Style.ContainerCal}>
            <div className={Style.calCon}>
                <div className={Style.mainSide}>
                    <div className={Style.CalendarH2}>
                        <div className={Style.displayMonth}>
                            {!props.readOnly && (
                                <button onClick={() => changeMonth(-1)}>&larr;</button>
                            )}
                            <p>{fullNamwMonth[dateRef.current.getMonth()]}</p>
                            {!props.readOnly && (
                                <button onClick={() => changeMonth(1)}>&rarr;</button>
                            )}
                        </div>
                        <div className={Style.displayYear}>
                            <p>{dateRef.current.getFullYear()}</p>
                            {!props.readOnly && (
                                <div className={Style.btnYear}>
                                    <button onClick={() => changeYear(1)}>&uarr;</button>
                                    <button onClick={() => changeYear(-1)}>&darr;</button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={Style.CalendarH}>
                        <div className={Style.displayMonth}>
                            {monthName.map((el, i) => {
                                return (
                                    <div onClick={() => gotoMonth(el)} key={`monthLstK${i}`}>{el}</div>
                                )
                            })}
                        </div>
                        <span className={Style.line}></span>
                        <div className={Style.displayDays}>
                            {dayName.map((el, i) => {
                                return (
                                    <div key={`weekDays${i}`}>{el}</div>
                                )
                            })}
                        </div>
                    </div>
                    <div className={Style.grdDays} ref={refDays}>

                    </div>
                </div>
            </div>
        </div>
    )
}

/*
<div className={Style.sideCon}>
                </div>



{arrD.length > 0 && (
                            arrD.map((el, i) => {
                                if (el.cur) {
                                    return <div onClick={(e) => getDat2(el, i)}>{el.d}<span>{JSON.stringify(el.full)}</span></div>
                                } else {
                                    return <div className={Style.unSelected}>{el.d}</div>
                                }

                            })
                        )}*/
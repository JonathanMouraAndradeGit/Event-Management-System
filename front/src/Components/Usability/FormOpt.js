import React from "react";
import Style from "./FormOpt.module.css"
import { useEffect, useState, useRef } from "react";
import PercentComp from "../PercentComp/PercentComp"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ctx } from "../../App";
export default function FormOpt() {
    let [phase, setPhase] = useState("1")
    //let [numb, setNumb] = useState(0)
    let numb = useRef(0)
    let ref = useRef()
    let cur = useRef(0)
    let nav = useNavigate()

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

    /*
    let obj = [
        {
            question: "what is this",
            answers: [
                { text: "good", point: 1 },
                { text: "bad", point: 0 },
            ]
        },
        {
            question: "what is this b",
            answers: [
                { text: "good", point: 1 },
                { text: "bad", point: 0 },
                { text: "very bad", point: -1 },
                { text: "terrible", point: -2 }
            ]
        },
        {
            question: "what is this c",
            answers: [
                { text: "good", point: 1 },
                { text: "bad", point: 0 },
                { text: "very bad", point: -1 },
                { text: "terrible", point: -2 }
            ]
        },
    ]*/
    let obj = [
        {
            question: "O sistema é fácil de entender ao primeiro uso?",
            answers: [
                { text: "Muito fácil", point: 0.1 },
                { text: "Fácil", point: 0.0667 },
                { text: "Difícil", point: 0.0333 },
                { text: "Muito difícil", point: 0 }
            ]
        },
        {
            question: "A navegação entre as telas é intuitiva?",
            answers: [
                { text: "Muito intuitiva", point: 0.1 },
                { text: "Intuitiva", point: 0.0667 },
                { text: "Pouco intuitiva", point: 0.0333 },
                { text: "Nada intuitiva", point: 0 }
            ]
        },
        {
            question: "Os elementos visuais são claros?",
            answers: [
                { text: "Muito claros", point: 0.1 },
                { text: "Claros", point: 0.0667 },
                { text: "Pouco claros", point: 0.0333 },
                { text: "Nada claros", point: 0 }
            ]
        },
        {
            question: "O sistema responde rapidamente?",
            answers: [
                { text: "Muito rápido", point: 0.1 },
                { text: "Rápido", point: 0.0667 },
                { text: "Lento", point: 0.0333 },
                { text: "Muito lento", point: 0 }
            ]
        },
        {
            question: "As mensagens de erro são compreensíveis?",
            answers: [
                { text: "Muito claras", point: 0.1 },
                { text: "Claras", point: 0.0667 },
                { text: "Confusas", point: 0.0333 },
                { text: "Muito confusas", point: 0 }
            ]
        },
        {
            question: "É fácil encontrar funcionalidades?",
            answers: [
                { text: "Muito fácil", point: 0.1 },
                { text: "Fácil", point: 0.0667 },
                { text: "Difícil", point: 0.0333 },
                { text: "Muito difícil", point: 0 }
            ]
        },
        {
            question: "O sistema é consistente?",
            answers: [
                { text: "Muito consistente", point: 0.1 },
                { text: "Consistente", point: 0.0667 },
                { text: "Inconsistente", point: 0.0333 },
                { text: "Muito inconsistente", point: 0 }
            ]
        },
        {
            question: "Os textos são claros?",
            answers: [
                { text: "Muito claros", point: 0.1 },
                { text: "Claros", point: 0.0667 },
                { text: "Pouco claros", point: 0.0333 },
                { text: "Nada claros", point: 0 }
            ]
        },
        {
            question: "Você se sente confiante usando o sistema?",
            answers: [
                { text: "Muito confiante", point: 0.1 },
                { text: "Confiante", point: 0.0667 },
                { text: "Pouco confiante", point: 0.0333 },
                { text: "Nada confiante", point: 0 }
            ]
        },
        {
            question: "Você recomendaria o sistema?",
            answers: [
                { text: "Com certeza", point: 0.1 },
                { text: "Talvez sim", point: 0.0667 },
                { text: "Talvez não", point: 0.0333 },
                { text: "Não", point: 0 }
            ]
        }
    ];
    function moveSide(side) {
        let tot = obj.length
        if (side == "r" && (tot - 1) > cur.current) {
            cur.current += 1
            ref.current.style.left = `-${cur.current * 100}%`
        }
    }
    function AnsFunc(res) {
        console.log(res)
        //setNumb(prev => prev + res)
        numb.current = Number(numb.current || 0) + Number(res || 0);
        let tot = obj.length
        if (cur.current == (tot - 1)) {
            setPhase("2")
            update(numb.current)
            //submitFun()
        } else {
            moveSide("r")
        }
    }
    function submitFun() {
        setTimeout(() => {
            try{
                nav("/")
                genMsg("Sucesso", "operação realizada com sucesso", 2)
            }catch(e){
                genMsg("Error","Erro ao realizar operação", 1)
            }
        }, 2500)
    }
    async function update(value) {
        //e.preventDefault()
        console.log(obj)
        let tok = JSON.parse(localStorage.getItem("token"))
        let formData = new FormData()
        //let obj = JSON.parse(localStorage.getItem("token"))
        let res = {name:tok.name,grade:Math.ceil(numb.current * 100).toFixed(0)}

        console.log("submiting")
        console.log(res)

        try{
        let response = await fetch(`http://[::1]:4000/injectEvaluation/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tok.token}`,
            },
            method: "Post",
            body: JSON.stringify(res)//formData//JSON.stringify(trueObj)
        }).then((e) => e.json())
        console.log(response)
        if(response.msgError){
            genMsg("Error",`${response.msgError}`,1)
        }else{
            genMsg("Error",`${response.message}`,2)
        }
        }catch(e){
            genMsg("Error","erro ao realizar operação",1)
        } 
        setTimeout(() => {
            //try{
                nav("/")
              //  genMsg("Sucesso", "operação realizada com sucesso", 2)
            //}catch(e){
              //  genMsg("Error","Erro ao realizar operação", 1)
            //}
        }, 2500)

    }
    return (
        <div className={Style.FormOptContainer}>
            {(phase == "1") ? (
                <div className={Style.Slider} ref={ref}>
                    {obj.map((el, i) => {
                        return <div key={`question${i}`} className={Style.QuestionCOn}>
                            <p>{el.question}</p>
                            <div className={Style.OptBox}>
                                {el.answers.map((el, i2) => {
                                    return <label htmlFor={`${i}${i2}`} className={Style.SelectionOpts} key={`ans${i}${i2}`}>
                                        <p>{el.text}</p>
                                        <input id={`${i}${i2}`} type="radio" onInput={(e) => AnsFunc(el.point)}></input>
                                    </label>
                                })}
                            </div>
                        </div>
                    })

                    }
                </div>)
                : (
                    <div className={Style.ResultContent}>
                        <div className={Style.PercentC}>
                            <PercentComp selc={Math.ceil(numb.current * 100).toFixed(2)}></PercentComp>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
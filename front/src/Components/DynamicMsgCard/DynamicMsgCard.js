import Style from "./DynamicMsgCard.module.css"
import React from "react"
import { useEffect, useRef } from "react"
export default function DynamicMsgCard(props) {
    let exec = useRef(true)
    let ref = useRef()

    useEffect(() => {
        if (props.type == "1") {
            ref.current.style.backgroundImage = 'linear-gradient(to top right, red, black)';
            let len = ref.current.children.length
            ref.current.children[len - 1].style.backgroundColor = 'red';
        }
        if (props.type == "2") {
            ref.current.style.backgroundImage = 'linear-gradient(to top right, green, black)';
            let len = ref.current.children.length
            ref.current.children[len - 1].style.backgroundColor = 'green';
        }
        const removeTimer = setTimeout(() => {
            props.setVl(prev => prev.filter(el => el.id !== props.obj.id));
        }, 2500);

        const enterTimer = setTimeout(() => {
            if (ref.current) {
                ref.current.style.marginLeft = "0vw";
            }
        }, 10);

        const exitTimer = setTimeout(() => {
            if (ref.current) {
                ref.current.style.marginLeft = "30vw";
            }
        }, 1900);

        return () => {
            clearTimeout(removeTimer);
            clearTimeout(enterTimer);
            clearTimeout(exitTimer);
        };
    }, []);

    function clear() {
        props.setVl(prev => prev.filter(el => el.id !== props.obj.id));
    }
    return (
        <div className={Style.msgCon} ref={ref}>
            <div className={Style.imgCon} onClick={clear}>
                <img src="/static/x-button.png" />
            </div>
            <div className={Style.ContentCon}>
                <div className={Style.imgCon2}>
                    { props.type == "1" && (<img src="/static/caution-sign.png"></img>)}
                    { props.type == "2" && (<img src="/static/check-mark_15761039.png"></img>)}
                </div>
                <div className={Style.txtCon}>
                    <p className={Style.title}>{props.obj.title}</p>
                    <p className={Style.desc}>{props.obj.desc}</p>
                </div>
            </div>
            <span className={Style.spn}></span>
        </div>
    )
}
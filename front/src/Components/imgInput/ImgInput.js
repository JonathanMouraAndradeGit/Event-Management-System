import React from "react";
import Style from "./ImgInput.module.css"
import { useRef,useState,useEffect } from "react";

export default function ImgInput(props) {
    let refimg = useRef()
    useEffect (()=>{
        if(props.obj[props.lab]){
            simpleSet()
        }else{
            simpleSet2()
        }
    },[props.obj[props.lab]])
    function imgFunc() {
        let len = Array.from(document.getElementById(props.refId).files)
        if (len.length > 0) {
            let filesres = document.getElementById(props.refId).files[0]
            if(props.update){
                props.setFile(filesres)
            }
            let fl = new FileReader()
            fl.onload = () => {
                let val = fl.result
                //let strv = `data:image/png;base64,${val}`
                refimg.current.setAttribute('src', val);
                //console.log(val)
            }
            fl.readAsDataURL(filesres)
        }
    }
    function execbtn() {
        console.log("ok")
        imgFunc()
    }
    function simpleSet(){
        console.log("the src in imgcomp is")
        console.log(`${props.path}${props.obj[props.lab]}`)
        refimg.current.setAttribute('src',`${props.path}${props.obj[props.lab]}`);
    }
    function simpleSet2(){
        console.log("the src in imgcomp is")
        console.log(`${props.path}${props.obj[props.lab]}`)
        refimg.current.setAttribute('src',`/static/default-image.jpg`);
    }
    return (
        <div className={Style.imgInputContainer}>
            <label htmlFor={props.refId} className={Style.imgIMainC}>
                <img src="/static/citynight.jpg" ref={refimg} />
                <input id={props.refId} type="file" multiple={false} onChange={() => execbtn()}/>
            </label>
        </div>
    )
}
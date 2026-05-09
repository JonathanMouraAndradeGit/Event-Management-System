import React, { useRef, useEffect, useState } from "react";
import Style from "./ImgInput2.module.css";

export default function ImgInput2({
    obj,
    lab,
    //filem,
    path = "",
    refId,
    setFile,
    error,
    checkF,
}) {
    const inputRef = useRef(null);
    //const [preview, setPreview] = useState("/static/default-image.jpg");
    let refimg = useRef()

    /*
    useEffect(() => {
        if (obj?.[lab]) {
            setPreview(`${path}${obj[lab]}`);
        } else {
            setPreview("/static/default-image.jpg");
        }
    }, [obj, lab, path]);*/

    useEffect(() => {
        if (obj[lab]) {
            simpleSet()
        } else {
            simpleSet2()
        }
    }, [obj[lab]])

    /*
    useEffect(()=>{
        if(!filem){
            refimg.current.setAttribute('src', `/static/default-image.jpg`);
        }
    },filem)*/

    function handleFileChange(e) {
        const file = e.target.files?.[0];

        if (!file) {
            checkF && checkF(!false);
            return;
        }

        checkF && checkF(!true);
        setFile && setFile(file);

        const reader = new FileReader();
        reader.onload = () => {
            //setPreview(reader.result);
            let val = reader.result
            refimg.current.setAttribute('src', val);
        };
        reader.readAsDataURL(file);
    }
    function simpleSet() {
        console.log("the src in imgcomp is")
        console.log(`${path}${obj[lab]}`)
        refimg.current.setAttribute('src', `${path}${obj[lab]}`);
    }
    function simpleSet2() {
        console.log("the src in imgcomp is")
        console.log(`${path}${obj[lab]}`)
        refimg.current.setAttribute('src', `/static/default-image.jpg`);
    }

    return (
        <div className={Style.imgInputContainer}>
            <label className={Style.imgIMainC} htmlFor={refId}>
                <img ref={refimg} />

                <div className={Style.overlay}>
                    <span>Alterar</span>
                </div>

                <input
                    ref={inputRef}
                    id={refId}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </label>

            {error?.[lab] && (
                <p className={Style.ErrorMsg}>{error[lab]}</p>
            )}
        </div>
    );
}
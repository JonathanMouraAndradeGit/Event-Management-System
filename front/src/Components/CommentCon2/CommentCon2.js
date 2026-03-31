import React, { useRef } from "react";
import Style from "./COmmentCon2.module.css"
import { useState } from "react";
export default function COmmentCon2() {
    let [msg, SetMsg] = useState({ message: null })
    let msg2 = useRef(null)
    let cRef = useRef()
    function addEdit(e, sib) {
        console.log("attempSearch")
        //let vl = e.target.closest("[name='mainC']")
        //let vl = e.target.closest(`.${Style.ItemCon}`)
        //let sib = vl.nextElementSibling;
        //console.log(sib)
        let doc = document.createElement("li")
        doc.classList.add("CommentLevelGraft")
        let itCon = document.createElement("div")
        itCon.classList.add("ItemConGraft")
        itCon.setAttribute("name", "mainC")
        itCon.style.backgroundColor = "white"


        //-------------------------------
        let marker = document.createElement("div")
        marker.classList.add("MarkerGraft")

        let img = document.createElement("img")
        img.setAttribute("src", "/static/cityImage.jpeg")
        marker.appendChild(img)
        //--------------------------------

        let MsgCOntentGraft = document.createElement("div")
        MsgCOntentGraft.classList.add("MsgCOntentGraft")

        //------------------------
        let msgCconGraft = document.createElement("div")
        msgCconGraft.classList.add("msgCconGraft")

        let postTitleGraft = document.createElement("p")
        postTitleGraft.classList.add("postTitleGraft")
        postTitleGraft.textContent = "titledesc"

        let userCommentGraft = document.createElement("p")
        userCommentGraft.classList.add("userCommentGraft")
        userCommentGraft.textContent = msg2.current //`description`

        ///-----
        let CommentbtnConGraf = document.createElement("div")
        CommentbtnConGraf.classList.add("CommentbtnConGraf")
        let img1 = document.createElement("img")
        img1.setAttribute("src", "/logo/cut.png")
        img1.addEventListener("click", (e) => addComment(e)) //addEdit(e))
        let img2 = document.createElement("img")
        img2.setAttribute("src", "/logo/google-drive-logo.png")
        img2.addEventListener("click",(e)=>upDateComment(e))
        CommentbtnConGraf.appendChild(img1)
        CommentbtnConGraf.appendChild(img2)

        ///-----

        msgCconGraft.appendChild(postTitleGraft)
        msgCconGraft.appendChild(userCommentGraft)
        msgCconGraft.appendChild(CommentbtnConGraf)
        //-------------------------
        MsgCOntentGraft.appendChild(msgCconGraft)


        let ul = document.createElement("ul")
        ul.classList.add("levelCGraf")
        ul.style.setProperty("--pad", 1)

        itCon.appendChild(marker)
        itCon.appendChild(MsgCOntentGraft)
        doc.appendChild(itCon)
        doc.appendChild(ul)
        //sib.appendChild(doc)
        sib.insertBefore(doc, sib.children[0])
    }
    function subsBtn(e, sib) {
        console.log("Submitting comment")
        //console.log(msg)
        console.log(msg2.current)
        insrtAt(sib, e)
    }
    function clearmsg() {
        SetMsg({ msg: null })
    }
    function setValueMsg(key, e) {
        let value = e.target.value
        console.log("value is here " + value)
        SetMsg(prev => ({ ...prev, [key]: value }))
    }
    function addComment(e) {
        console.log("attempSearch")
        let vl = e.target.closest("[name='mainC']")
        //let vl = e.target.closest(`.${Style.ItemCon}`)
        let sib = vl.nextElementSibling;
        console.log(sib)
        let doc = document.createElement("li")
        doc.classList.add("CommentLevelGraft")
        let itCon = document.createElement("div")
        itCon.classList.add("ItemConGraft")
        itCon.setAttribute("name", "mainC")
        itCon.style.backgroundColor = "white"


        //-------------------------------
        let marker = document.createElement("div")
        marker.classList.add("MarkerGraft")

        let img = document.createElement("img")
        img.setAttribute("src", "/static/cityImage.jpeg")
        marker.appendChild(img)
        //--------------------------------

        let MsgCOntentGraft = document.createElement("div")
        MsgCOntentGraft.classList.add("MsgCOntentGraft")

        //------------------------
        let msgCconGraft = document.createElement("form")
        msgCconGraft.classList.add("msgCconGraft")

        let lab = document.createElement("label")
        lab.classList.add("textAreaInputLGraf")
        lab.textContent = "Comment"

        let textArea = document.createElement("textarea")
        textArea.classList.add("textAreaInputGraf")
        textArea.addEventListener("blur", (e) => {
            console.log("input detected")
            //setValueMsg("message",e)
            let value = e.target.value
            console.log("value is here " + value)
            //SetMsg({message:value})
            msg2.current = value
        })

        /*
        let postTitleGraft = document.createElement("p")
        postTitleGraft.classList.add("postTitleGraft")
        postTitleGraft.textContent = "titledesc"

        let userCommentGraft = document.createElement("p")
        userCommentGraft.classList.add("userCommentGraft")
        userCommentGraft.textContent = `description`
        */

        ///-----
        let CommentbtnConGraf = document.createElement("div")
        CommentbtnConGraf.classList.add("CommentbtnConGraf")
        let img1 = document.createElement("img")
        img1.setAttribute("src", "/logo/add.png")
        img1.addEventListener("click", (e) => subsBtn(e, sib))
        let img2 = document.createElement("img")
        img2.setAttribute("src", "/logo/delete.png")
        img2.addEventListener("click", () => deleteComment(sib))
        CommentbtnConGraf.appendChild(img1)
        CommentbtnConGraf.appendChild(img2)

        ///-----

        //msgCconGraft.appendChild(postTitleGraft)
        //msgCconGraft.appendChild(userCommentGraft)
        msgCconGraft.appendChild(lab)
        msgCconGraft.appendChild(textArea)
        msgCconGraft.appendChild(CommentbtnConGraf)
        //-------------------------
        MsgCOntentGraft.appendChild(msgCconGraft)


        let ul = document.createElement("ul")
        ul.classList.add("levelCGraf")
        ul.style.setProperty("--pad", 1)



        itCon.appendChild(marker)
        itCon.appendChild(MsgCOntentGraft)

        doc.appendChild(itCon)
        doc.appendChild(ul)

        //sib.appendChild(doc)
        sib.insertBefore(doc, sib.children[0])
    }
    function insrtAt(sib, e) {
        sib.removeChild(sib.children[0])
        addEdit(e, sib)
        //sib.insertBefore(doc, sib.children[0])

        //pos.removeChild(child)
        //let vl = e.target.closest("[name='mainC']")
        //let vl = e.target.closest(`.${Style.ItemCon}`)
        //let sib = vl.nextElementSibling;
        //console.log(sib)
        //sib.insertBefore(doc, sib.children[0])
    }
    function deleteComment(sib) {
        sib.removeChild(sib.children[0])
    }
    function upDateComment(e) {
        let doc = e.target.closest("[name='mainC']")
        let res = doc.children[1].children[0]
        let text = deleteAllChildren(res)

        //------------------------
        //let msgCconGraft = document.createElement("form")
        //msgCconGraft.classList.add("msgCconGraft")
        msg2.current = text
        let lab = document.createElement("label")
        lab.classList.add("textAreaInputLGraf")
        lab.textContent = "Comment"

        let textArea = document.createElement("textarea")
        textArea.value = text
        textArea.classList.add("textAreaInputGraf")
        textArea.addEventListener("blur", (e) => {
            console.log("input detected")
            //setValueMsg("message",e)
            let value = e.target.value
            console.log("value is here " + value)
            //SetMsg({message:value})
            msg2.current = value
        })

        let CommentbtnConGraf = document.createElement("div")
        CommentbtnConGraf.classList.add("CommentbtnConGraf")
        let img1 = document.createElement("img")
        img1.setAttribute("src", "/logo/add.png")
        img1.addEventListener("click",(e)=>{
            //console.log("updating")
            ReInsert(e)
        })
        //img1.addEventListener("click", (e) => subsBtn(e, sib))
        let img2 = document.createElement("img")
        //img2.setAttribute("src", "/logo/delete.png")
        //img2.addEventListener("click", () => deleteComment(sib))
        CommentbtnConGraf.appendChild(img1)
        //CommentbtnConGraf.appendChild(img2)

        //msgCconGraft.appendChild(lab)
        //msgCconGraft.appendChild(textArea)
        //msgCconGraft.appendChild(CommentbtnConGraf)
        res.appendChild(lab)
        res.appendChild(textArea)
        res.appendChild(CommentbtnConGraf)


    }
    function ReInsert(e){
        let doc = e.target.closest("[name='mainC']")
        let res = doc.children[1].children[0]
        deleteAllChildren2(res)

        //let msgCconGraft = document.createElement("div")
        //msgCconGraft.classList.add("msgCconGraft")

        let postTitleGraft = document.createElement("p")
        postTitleGraft.classList.add("postTitleGraft")
        postTitleGraft.textContent = "titledesc"

        let userCommentGraft = document.createElement("p")
        userCommentGraft.classList.add("userCommentGraft")
        userCommentGraft.textContent = msg2.current //`description`

        ///-----
        let CommentbtnConGraf = document.createElement("div")
        CommentbtnConGraf.classList.add("CommentbtnConGraf")
        let img1 = document.createElement("img")
        img1.setAttribute("src", "/logo/cut.png")
        img1.addEventListener("click", (e) => addComment(e)) //addEdit(e))
        let img2 = document.createElement("img")
        img2.setAttribute("src", "/logo/google-drive-logo.png")
        img2.addEventListener("click",(e)=>upDateComment(e))
        CommentbtnConGraf.appendChild(img1)
        CommentbtnConGraf.appendChild(img2)

        ///-----

        res.appendChild(postTitleGraft)
        res.appendChild(userCommentGraft)
        res.appendChild(CommentbtnConGraf)

        msg.current = null

    }
    function deleteAllChildren(vl) {
        //let vl = document.getElementById("")
        let txt = vl.children[1].textContent
        while (vl.firstChild) {
            vl.removeChild(vl.firstChild)
        }
        return txt
    }
    function deleteAllChildren2(vl) {
        //let vl = document.getElementById("")
        //let txt = vl.children[1].textContent
        while (vl.firstChild) {
            vl.removeChild(vl.firstChild)
        }
        //return txt
    }
    return (
        <div className={Style.CommentCon} ref={cRef}>
            <ul className={Style.levelC} style={{ "--pad": 1 }}>
                <li className={Style.CommentLevel}>
                    <div className={Style.ItemCon} name={"mainC"}>
                        <div className={Style.Marker}>
                            <img src="/static/shark.jpg" />
                        </div>
                        <div className={Style.MsgCOntent}>
                            <div className={Style.msgCcon}>
                                <p className={Style.postTitle}>title1</p>

                                <p className={Style.userComment}>description desc 01 here is the desc test the btn</p>
                                <div className={Style.CommentbtnCon}>
                                    <img src="/logo/cut.png" onClick={(e) => addComment(e)} />
                                    <img src="/logo/google-drive-logo.png" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul className={Style.levelC} style={{ "--pad": 1 }}>
                        <li className={Style.CommentLevel}>
                            <div className={Style.ItemCon} style={{ backgroundColor: "white" }} name={"mainC"}>
                                <div className={Style.Marker}>
                                    <img src="/static/shark.jpg" />
                                </div>
                                <div className={Style.MsgCOntent}>
                                    <div className={Style.msgCcon}>
                                        <p className={Style.postTitle}>title1</p>
                                        <p className={Style.userComment}>description desc 01 here is the desc</p>
                                        <div className={Style.CommentbtnCon}>
                                            <img src="/logo/cut.png" onClick={(e) => addComment(e)} />
                                            <img src="/logo/google-drive-logo.png" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ul className={Style.levelC} style={{ "--pad": 1 }}>
                                <li className={Style.CommentLevel}>
                                    <div className={Style.ItemCon} style={{ backgroundColor: "white" }} name={"mainC"}>
                                        <div className={Style.Marker}>
                                            <img src="/static/shark.jpg" />
                                        </div>
                                        <div className={Style.MsgCOntent}>
                                            <div className={Style.msgCcon}>
                                                <p className={Style.postTitle}>title1</p>
                                                <p className={Style.userComment}>description desc 01 here is the desc</p>
                                                <div className={Style.CommentbtnCon}>
                                                    <img src="/logo/cut.png" onClick={(e) => addComment(e)} />
                                                    <img src="/logo/google-drive-logo.png" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <ul className={Style.levelC} style={{ "--pad": 1 }}></ul>
                                </li>
                                <li className={Style.CommentLevel}>
                                    <div className={Style.ItemCon} style={{ backgroundColor: "white" }} name={"mainC"}>
                                        <div className={Style.Marker}>
                                            <img src="/static/shark.jpg" />
                                        </div>
                                        <div className={Style.MsgCOntent}>
                                            <div className={Style.msgCcon}>
                                                <p className={Style.postTitle}>title1</p>
                                                <p className={Style.userComment}>description desc 01 here is the desc</p>
                                                <div className={Style.CommentbtnCon}>
                                                    <img src="/logo/cut.png" onClick={(e) => addComment(e)} />
                                                    <img src="/logo/google-drive-logo.png" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <ul className={Style.levelC} style={{ "--pad": 1 }}></ul>
                                </li>
                            </ul>
                        </li>
                        <li className={Style.CommentLevel}>
                            <div className={Style.ItemCon} style={{ backgroundColor: "white" }} name={"mainC"}>
                                <div className={Style.Marker}>
                                    <img src="/static/shark.jpg" />
                                </div>
                                <div className={Style.MsgCOntent}>
                                    <div className={Style.msgCcon}>
                                        <p className={Style.postTitle}>title1</p>
                                        <p className={Style.userComment}>description desc 01 here is the desc</p>
                                    </div>
                                </div>
                            </div>
                            <ul className={Style.levelC} style={{ "--pad": 1 }}></ul>

                        </li>
                    </ul>
                </li>
                <li className={Style.CommentLevel}>
                    <div className={Style.ItemCon} style={{ backgroundColor: "white" }} name={"mainC"}>
                        <div className={Style.Marker}>
                            <img src="/static/shark.jpg" />
                        </div>
                        <div className={Style.MsgCOntent}>
                            <div className={Style.msgCcon}>
                                <p className={Style.postTitle}>title1</p>
                                <p className={Style.userComment}>description desc 01 here is the desc</p>
                            </div>
                        </div>
                    </div>
                    <ul className={Style.levelC} style={{ "--pad": 1 }}></ul>
                </li>
                <li className={Style.CommentLevel}>
                    <div className={Style.ItemCon} style={{ backgroundColor: "white" }} name={"mainC"}>
                        <div className={Style.Marker}>
                            <img src="/static/shark.jpg" />
                        </div>
                        <div className={Style.MsgCOntent}>
                            <div className={Style.msgCcon}>
                                <p className={Style.postTitle}>title1</p>
                                <p className={Style.userComment}>description desc 01 here is the desc</p>
                            </div>
                        </div>
                    </div>
                    <ul className={Style.levelC} style={{ "--pad": 1 }}></ul>
                </li>
            </ul>
        </div>
    )
}
/*
<li className={Style.CommentLevel}>
                    <div className={Style.ItemCon} style={{ backgroundColor: "white" }} name={"mainC"}>
                        <div className={Style.Marker}>
                            <img src="/static/shark.jpg" />
                        </div>
                        <div className={Style.MsgCOntent}>
                            <form className={Style.msgCcon}>
                                <label className={Style.textAreaInputL}>Comment</label>
                                <textarea className={Style.textAreaInput} minLength={1}
                                    required
                                    onInput={(e) => setValueMsg("message", e)}>
                                </textarea>
                                <div className={Style.CommentbtnCon}>
                                    <img src="/logo/add.png" onClick={(e) => subsBtn(e)} />
                                    <img src="/static/radiation.png" />
                                </div>
                            </form>
                        </div>
                    </div>
                    <ul className={Style.levelC} style={{ "--pad": 1 }}></ul>
                </li>
function addEdit(e) {
        console.log("attempSearch")
        let vl = e.target.closest("[name='mainC']")
        //let vl = e.target.closest(`.${Style.ItemCon}`)
        let sib = vl.nextElementSibling;
        console.log(sib)
        let doc = document.createElement("li")
        doc.classList.add("CommentLevelGraft")
        let itCon = document.createElement("div")
        itCon.classList.add("ItemConGraft")
        itCon.setAttribute("name", "mainC")
        itCon.style.backgroundColor = "white"


        //-------------------------------
        let marker = document.createElement("div")
        marker.classList.add("MarkerGraft")

        let img = document.createElement("img")
        img.setAttribute("src", "/static/cityImage.jpeg")
        marker.appendChild(img)
        //--------------------------------

        let MsgCOntentGraft = document.createElement("div")
        MsgCOntentGraft.classList.add("MsgCOntentGraft")

        //------------------------
        let msgCconGraft = document.createElement("div")
        msgCconGraft.classList.add("msgCconGraft")

        let postTitleGraft = document.createElement("p")
        postTitleGraft.classList.add("postTitleGraft")
        postTitleGraft.textContent = "titledesc"

        let userCommentGraft = document.createElement("p")
        userCommentGraft.classList.add("userCommentGraft")
        userCommentGraft.textContent = `description`

        ///-----
        let CommentbtnConGraf = document.createElement("div")
        CommentbtnConGraf.classList.add("CommentbtnConGraf")
        let img1 = document.createElement("img")
        img1.setAttribute("src", "/logo/cut.png")
        img1.addEventListener("click", (e) => addComment(e)) //addEdit(e))
        let img2 = document.createElement("img")
        img2.setAttribute("src", "/logo/google-drive-logo.png")
        CommentbtnConGraf.appendChild(img1)
        CommentbtnConGraf.appendChild(img2)

        ///-----

        msgCconGraft.appendChild(postTitleGraft)
        msgCconGraft.appendChild(userCommentGraft)
        msgCconGraft.appendChild(CommentbtnConGraf)
        //-------------------------
        MsgCOntentGraft.appendChild(msgCconGraft)


        let ul = document.createElement("ul")
        ul.classList.add("levelCGraf")
        ul.style.setProperty("--pad", 1)

        itCon.appendChild(marker)
        itCon.appendChild(MsgCOntentGraft)
        doc.appendChild(itCon)
        doc.appendChild(ul)
        //sib.appendChild(doc)
        sib.insertBefore(doc, sib.children[0])
    }














<div className={Style.Field}>
                                    <label htmlFor="titleF" className={Style.titleInput}>
                                        Title
                                    </label>
                                    <input type="text" id="titleF" required
                                        placeholder=" " onInput={(e)=>setValueMsg("title",e)}/>
                                </div>



*/
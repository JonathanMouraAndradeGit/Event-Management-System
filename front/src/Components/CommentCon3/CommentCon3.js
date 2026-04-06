import React from "react";
import Style from "./CommentCon3.module.css"
import { useRef, useState, useEffect } from "react";
export default function CommentCon3(props) {
    let ref1layerc = useRef()
    let cRef = useRef()
    //let [msg, SetMsg] = useState({ message: null })
    let msg2 = useRef()
    let execOnc = useRef(true)
    useEffect(() => {
        if (execOnc.current) {
            loadCOmments()
            //getEventComments()
            execOnc.current = false
        }
    }, [])
    function addMainComment(e) {
        let imgj = JSON.parse(localStorage.getItem("token"))
        let usrImg = `http://localhost:4000/uploads/${imgj.file}`

        let doc = document.createElement("li")
        doc.classList.add("CommentLevelGraft")
        let itCon = document.createElement("div")
        itCon.classList.add("ItemConGraft")
        itCon.setAttribute("name", "mainC")
        itCon.style.backgroundColor = "white"
        //-----------------------------------------------------------------------------------------
        let marker = document.createElement("div")
        marker.classList.add("MarkerGraft")

        let img = document.createElement("img")
        img.setAttribute("src", usrImg)
        marker.appendChild(img)
        //-----------------------------------------------------------------------------------------
        let MsgCOntentGraft = document.createElement("div")
        MsgCOntentGraft.classList.add("MsgCOntentGraft")
        //FORM - SECTION
        let msgCconGraft = document.createElement("form")
        msgCconGraft.classList.add("msgCconGraft")

        let lab = document.createElement("label")
        lab.classList.add("textAreaInputLGraf")
        lab.textContent = "Comment"

        let textArea = document.createElement("textarea")
        textArea.classList.add("textAreaInputGraf")
        textArea.addEventListener("blur", (e) => {
            console.log("input detected")
            let value = e.target.value
            console.log("value is here " + value)
            msg2.current = value
        })

        //BUTTON - SECTION
        let CommentbtnConGraf = document.createElement("div")
        CommentbtnConGraf.classList.add("CommentbtnConGraf")
        let img1 = document.createElement("img")
        img1.setAttribute("src", "/static/add.png")
        //img1.addEventListener("click", (e) => subsBtn(e, sib))subsComment(parent)
        let commentId=null
        img1.addEventListener("click", (e) =>subsBtn(e, ref1layerc.current,commentId)) //subsComment())
        let img2 = document.createElement("img")
        img2.setAttribute("src", "/static/delete.png")
        img2.addEventListener("click", () => deleteComment(ref1layerc.current))
        CommentbtnConGraf.appendChild(img1)
        CommentbtnConGraf.appendChild(img2)
        ///-----------------------------------------------------------------------------------
        msgCconGraft.appendChild(lab)
        msgCconGraft.appendChild(textArea)
        msgCconGraft.appendChild(CommentbtnConGraf)
        //------------------------------------------------------------------------------------
        MsgCOntentGraft.appendChild(msgCconGraft)

        let ul = document.createElement("ul")
        ul.classList.add("levelCGraf")
        ul.style.setProperty("--pad", 1)

        itCon.appendChild(marker)
        itCon.appendChild(MsgCOntentGraft)

        doc.appendChild(itCon)
        doc.appendChild(ul)

        //sib.appendChild(doc)
        //if(ref1layerc.current.children){

        //}
        ref1layerc.current.insertBefore(doc, ref1layerc.current.children[0])
    }
    function deleteComment(sib) {
        sib.removeChild(sib.children[0])
    }
    async function subsComment(parent) {
        let tok = JSON.parse(localStorage.getItem("token"))
        let obj1 = {
            event: props.eventId,
            user: 0,
            content: msg2.current
        }
        obj1.parent = parent ? parent : undefined
        console.log("sending")
        console.log(obj1)
        let response = await fetch(`http://[::1]:4000/comment/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tok.token}`,
            },
            method: "POST",
            body: JSON.stringify(obj1)//formData
        }).then((e) => e.json())
        if (!response.messageerr) {
            return response
        } else {
            return false
        }
        //console.log(response)
    }
    async function getEventComments() {
        //commentAlign/:id
        let tok = JSON.parse(localStorage.getItem("token"))
        let response = await fetch(`http://[::1]:4000/commentAlign/${props.eventId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tok.token}`,
            },
            method: "GET",
            //body: JSON.stringify(obj1)//formData
        }).then((e) => e.json())
        console.log("this are the obj -----------------------")
        console.log(response)
        if (!response.messageerr) {
            return response
        } else {
            return []
        }
    }
    function addBDComments(objC, parentC,layer) {
        let tok = JSON.parse(localStorage.getItem("token"))
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
        console.log("this is the objC---------------------------------------------------------")
        console.log(objC)
        img.setAttribute("src", `http://[::1]:4000/uploads/${objC.user.file}`)//"/static/citynight.jpg")
        marker.appendChild(img)
        //--------------------------------

        let MsgCOntentGraft = document.createElement("div")
        MsgCOntentGraft.classList.add("MsgCOntentGraft")

        //------------------------
        let msgCconGraft = document.createElement("form")
        msgCconGraft.classList.add("msgCconGraft")


        /*
        let lab = document.createElement("label")
        lab.classList.add("textAreaInputLGraf")
        lab.textContent = "Comment"

        let textArea = document.createElement("textarea")
        textArea.classList.add("textAreaInputGraf")
        textArea.addEventListener("blur", (e) => {
            console.log("input detected")
            let value = e.target.value
            console.log("value is here " + value)
            msg2.current = value
        })*/

        //COMMENT

        let postTitleGraft = document.createElement("p")
        postTitleGraft.classList.add("postTitleGraft")
        postTitleGraft.textContent = objC.user.name//"titledesc"

        let userCommentGraft = document.createElement("p")
        userCommentGraft.classList.add("userCommentGraft")
        userCommentGraft.textContent = objC.content//`description`

        ///BUTTON
        let CommentbtnConGraf = document.createElement("div")
        CommentbtnConGraf.classList.add("CommentbtnConGraf")
        if( layer < 2){
            let img1 = document.createElement("img")
            img1.setAttribute("src", "/static/add.png")
            img1.addEventListener("click", (e) => addComment(e,objC.id))
            CommentbtnConGraf.appendChild(img1)
        }

        if (tok.name == objC.user.name) {
            let img2 = document.createElement("img")
            img2.setAttribute("src", "/static/edit.png")
            //img2.addEventListener("click", () => deleteComment(sib))
            img2.addEventListener("click",(e)=>upDateComment(e,objC.id))
            CommentbtnConGraf.appendChild(img2)
        }

        ///-----

        msgCconGraft.appendChild(postTitleGraft)
        msgCconGraft.appendChild(userCommentGraft)
        //msgCconGraft.appendChild(lab)
        //msgCconGraft.appendChild(textArea)
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

        parentC.appendChild(doc)

        let len = parentC.children.length
        let res = parentC.children[parentC.children.length - 1].children[1]
        return res
        //sib.appendChild(doc)
        //sib.insertBefore(doc, sib.children[0])
    }
    async function loadCOmments() {
        let objarr = await getComments()
        objarr.forEach((el, i) => {
            if(el.parentId == null){
                forEv(el, "answers", ref1layerc.current,0)
            }
        })
    }
    function forEv(obj, name, parent,layer) {
        console.log("here is the obj ------------------------/////////////////////////")
        console.log(obj.id)
        console.log(obj[name])
        let place = addBDComments(obj, parent,layer)
        if (Array.isArray(obj[name]) && obj[name].length > 0) {
            obj[name].forEach((el, i) => {
                forEv(el, name, place,(layer+1))
            })
        }
    }
    //-------------------------------------------------------------------------------------------------------
    //COMMENT FUNCTIONS
    //-------------------------------------------------------------------------------------------------------
    function addComment(e,idC) {
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
        //let img = document.createElement("img")
        let imgj = JSON.parse(localStorage.getItem("token"))
        //console.log("the image is this ")
        //console.log(imgj.file)
        let usrImg = `http://localhost:4000/uploads/${imgj.file}`
        img.setAttribute("src", usrImg)//"/static/cityImage.jpeg")
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
        img1.setAttribute("src", "/static/add.png")
        img1.addEventListener("click", (e) => subsBtn(e, sib,idC))
        let img2 = document.createElement("img")
        img2.setAttribute("src", "/static/delete.png")
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
    async function subsBtn(e, sib,idC) {
        console.log("Submitting comment")
        //console.log(msg)
        let res = await subsComment(idC)
        if (res) {
            console.log(msg2.current)
            insrtAt(sib, e,res.id)
        } else {
            deleteComment(sib)
            msg2.current = null
        }
    }
    function insrtAt(sib, e,idC) {
        sib.removeChild(sib.children[0])
        addEdit(e, sib,idC)
    }
    function addEdit(e, sib,idC) {
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
        let imgj = JSON.parse(localStorage.getItem("token"))
        let usrImg = `http://localhost:4000/uploads/${imgj.file}`
        img.setAttribute("src", usrImg)//"/static/cityImage.jpeg")
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
        img1.setAttribute("src", "/static/add.png")
        img1.addEventListener("click", (e) => addComment(e,idC)) //addEdit(e))
        let img2 = document.createElement("img")
        img2.setAttribute("src", "/static/edit.png")
        img2.addEventListener("click",(e)=>upDateComment(e,idC))
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
    //---------------------------------------------------------------------------------------------
    //UPDATE COMMENT
    //---------------------------------------------------------------------------------------------
    function upDateComment(e,idC) {
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
        img1.setAttribute("src", "/static/add.png")
        img1.addEventListener("click",async (e)=>{
            //console.log("updating")
            let result = await updateCommentSubs(idC)
            if(result){
                ReInsert(e,idC,msg2.current)
            }else{
                ReInsert(e,idC,text)
            }
            //ReInsert(e,msg2.current)
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
    async function updateCommentSubs(idC) {
        let tok = JSON.parse(localStorage.getItem("token"))
        let obj1 = {
            id:idC,
            event: props.eventId,
            user: 0,
            content: msg2.current
        }
        //obj1.parent = parent ? parent : undefined
        console.log("updating")
        //console.log(obj1)
        let response = await fetch(`http://[::1]:4000/comment/${idC}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tok.token}`,
            },
            method: "PUT",
            body: JSON.stringify(obj1)//formData
        }).then((e) => e.json())
        console.log(response)
        if (!response.messageerr) {
            //ReInsert(e,idC)

            return response
        } else {
            //ReInsert(e,idC)
            return false
        }
        //console.log(response)
    }
    function ReInsert(e,idC,txt){
        let imgj = JSON.parse(localStorage.getItem("token"))
        let usrImg = `http://localhost:4000/uploads/${imgj.file}`
        
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
        userCommentGraft.textContent = txt //msg2.current //`description`

        ///-----
        let CommentbtnConGraf = document.createElement("div")
        CommentbtnConGraf.classList.add("CommentbtnConGraf")
        let img1 = document.createElement("img")
        img1.setAttribute("src", "/static/add.png")
        img1.addEventListener("click", (e) => addComment(e,idC)) //addEdit(e))
        let img2 = document.createElement("img")
        img2.setAttribute("src", "/static/edit.png")
        img2.addEventListener("click",(e)=>upDateComment(e,idC))
        CommentbtnConGraf.appendChild(img1)
        CommentbtnConGraf.appendChild(img2)

        ///-----

        res.appendChild(postTitleGraft)
        res.appendChild(userCommentGraft)
        res.appendChild(CommentbtnConGraf)

        msg2.current = null

    }
    async function getComments() {
        return await getEventComments()
        /*
        return [
            {
                id: 0, comment: "big rocket war machine", name: "user01", answers: [
                    { id: 1, comment: "chaos engine of the doom", name: "user02", answers: [] },
                    {
                        id: 2, comment: "robomenace", name: "user03", answers: [
                            { id: 4, comment: "eace combat overtank", name: "user04", answers: [] }
                        ]
                    }
                ]
            },
            { id: 3, comment: "description01", name: "user05", answers: [] }
        ]*/
    }
    return (
        <div className={Style.CommentCon} ref={cRef}>
            <div className={Style.plusBoxCon}>
                <img src="/static/plus.png" onClick={(e) => addMainComment(e)} />
            </div>
            <ul className={Style.levelC} style={{ "--pad": 1 }} ref={ref1layerc}>

            </ul>
        </div>
    )
}
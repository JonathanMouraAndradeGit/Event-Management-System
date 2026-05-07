import React, { useState } from "react";
import Style from "./MenuComp.module.css"
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function MenuComp(props) {
    let nav = useNavigate()
    let [rol, setRol] = useState('')
    let [fil, setFil] = useState('')
    useEffect(() => {
        console.log(props.auth)
        if (props.auth && props.auth.role) {
            setRol(props.auth.role)
            setFil(props.auth.file)
            //if(props.auth.file && props.auth.file != undefined){
            //setFil(props.auth.file)
            //}
        } else {
            setRol('')
        }
    }, [props.auth])
    function logout() {
        console.log("logout")
        localStorage.setItem("token", null)
        props.setAuth(null)
        nav("/frm3")
    }
    return (
        <div className={Style.stlMenu}>
            <div className={Style.container}>
                <div className={Style.menuItemTitle}>
                    <div className={Style.menuIcon}>
                        <img src="/static/atom.png"></img>
                    </div>
                    <Link to="/">Title</Link>
                </div>
                {rol == 'admin' && (
                    <div className={Style.menuItem}>
                        <div className={Style.menuIcon}>
                            <img src="/static/edit.png"></img>
                        </div>
                        <Link to="/frm6/">update</Link>
                    </div>)
                }
                {rol == '' && (
                    <div className={Style.menuItem}>
                        <div className={Style.menuIcon}>
                            <img src="/static/user.png"></img>
                        </div>
                        <Link to="/frm3">login</Link>
                    </div>)
                }
                {rol != '' && (
                    <div className={Style.menuItem}>
                        <div className={Style.menuIcon}>
                            <img src="/static/clipboard.png"></img>
                        </div>
                        <Link to="/frm4">list</Link>
                    </div>
                )}
                {rol == 'user' && (
                    <div className={Style.menuItem}>
                        <div className={Style.menuIcon}>
                            <img src="/static/calendar2.png"></img>
                        </div>
                        <Link to="/frm8">agenda</Link>
                    </div>
                )}
                {(rol == 'manager') && (
                    <div className={Style.menuItem}>
                        <div className={Style.menuIcon}>
                            <img src="/static/data-assessment.png"></img>
                        </div>
                        <Link to="/usbltres">Results</Link>
                    </div>
                )}
                {(rol == 'user' || rol == 'admin') && (
                    <div className={Style.menuItem}>
                        <div className={Style.menuIcon}>
                            <img src="/static/check.png"></img>
                        </div>
                        <Link to="/usblt">Usabilidade</Link>
                    </div>
                )}
                {rol != '' && (
                    <div className={Style.menuItemAc}>
                        <div className={Style.menuIconAc}>
                            <img src={`http://localhost:4000/uploads/${fil}`}></img>
                        </div>
                        <div className={Style.itemsideContent}>
                            <div className={Style.acItems}><img src="/static/logout.png" onClick={() => logout()} /></div>
                            <div className={Style.acItems}><Link to="/frm5"><img src="/static/setting.png" /></Link></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

/*
{rol != '' && (
                    <div className={Style.menuItem}>
                        <div className={Style.menuIcon}>
                            <img src="/static/logout.png"></img>
                        </div>
                        <p onClick={() => logout()}>logout</p>
                    </div>
                )}
{rol != '' && (
                    <div className={Style.menuItem}>
                        <div className={Style.menuIcon}>
                            <img src="/static/user.png"></img>
                        </div>
                        <Link to="/frm5">account</Link>
                    </div>
                )}
<div className={Style.menuItem}>
                    <div className={Style.menuIcon}>
                        <img src="/static/settings.png"></img>
                    </div>
                    <Link to="/frm1">description1</Link>
                </div>
{rol == 'admin' && (
                    <div className={Style.menuItem}>
                        <div className={Style.menuIcon}>
                            <img src="/static/user_17740838.png"></img>
                        </div>
                        <Link to="/frm2">description2</Link>
                    </div>)
                }
{rol != '' && (
                    <div className={Style.menuItem}>
                        <div className={Style.menuIcon}>
                            <img src="/static/settings.png"></img>
                        </div>
                        <Link to="/frm7">event</Link>
                    </div>
                )}

*/
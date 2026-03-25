import React, { useState } from "react";
import Style from "./MenuComp.module.css"
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function MenuComp(props) {
    let nav = useNavigate()
    let [rol, setRol] = useState('')
    useEffect(() => {
        console.log(props.auth)
        if (props.auth && props.auth.role) {
            setRol(props.auth.role)
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
                        <Link to="/frm6/">updateEvent</Link>
                    </div>)
                }
                {rol == '' && (
                <div className={Style.menuItem}>
                    <div className={Style.menuIcon}>
                        <img src="/static/user_17740838.png"></img>
                    </div>
                    <Link to="/frm3">login</Link>
                </div>)
                }
                {rol != '' && (
                    <div className={Style.menuItem}>
                        <div className={Style.menuIcon}>
                            <img src="/static/user_17740838.png"></img>
                        </div>
                        <button onClick={() => logout()}>logout</button>
                    </div>
                )}
                {rol != '' && (
                    <div className={Style.menuItem}>
                        <div className={Style.menuIcon}>
                            <img src="/static/settings.png"></img>
                        </div>
                        <Link to="/frm4">list</Link>
                    </div>
                )}
                {rol != '' && (
                    <div className={Style.menuItem}>
                        <div className={Style.menuIcon}>
                            <img src="/static/user_17740838.png"></img>
                        </div>
                        <Link to="/frm5">account</Link>
                    </div>
                )}
                {rol == 'user' && (
                    <div className={Style.menuItem}>
                        <div className={Style.menuIcon}>
                            <img src="/static/user_17740838.png"></img>
                        </div>
                        <Link to="/frm8">agenda</Link>
                    </div>
                )}
            </div>
        </div>
    )
}

/*
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
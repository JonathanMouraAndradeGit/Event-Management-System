import React from "react";
import Style from "./Form1.module.css"
export default function Form1({ children }) {
    const filter1 = React.Children.toArray(children).filter(child => {
        if (!React.isValidElement(child)) return false;
        return child.props.id === "side1";
    });
    const filter2 = React.Children.toArray(children).filter(child => {
        if (!React.isValidElement(child)) return false;
        return child.props.id === "side2";
    });
    return (
        <div className={Style.formContainer}>
            <div className={Style.ContentItem}>
                <div className={Style.sideForm}>
                    {filter1}
                </div>
                <div className={Style.sideForm}>
                    {filter2}
                </div>
                <div className={Style.sld}>
                    <div className={Style.btnContent}>
                        <label htmlFor="sld1" className={Style.selectSld}><input id="sld1" name="rd" type="radio"></input></label>
                        <label htmlFor="sld2" className={Style.selectSld}><input id="sld2" name="rd" type="radio"></input></label>
                    </div>
                </div>
            </div>
        </div>
    )
}
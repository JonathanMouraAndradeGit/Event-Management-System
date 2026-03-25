import React, { useRef, useState } from "react";
import Style from "./SldInputComp.module.css"
import SldInputCompInd from "../SldInputCompInd/SldInputCompInd";
export default function SldInputComp({ children }){
    //let qtd = ["1","2","3"]
    let cur = useRef(0)
    let sld = useRef()
    let [st,setSt] = useState(0)
    const filter1 = React.Children.toArray(children).filter(child => {
        if (!React.isValidElement(child)) return false;
        return child.props.id === "side1";
    });
    function moveSides(ammount){
        if(cur.current+ammount >= 0 && cur.current+ammount < filter1.length ){
            sld.current.style.transform=`translateX(-${(cur.current+ammount)*100}%)`
            setSt(cur.current+ammount)
            cur.current = cur.current+ammount

        }
    }
    return (
        <div className={Style.ContainerSld}>
            <div className={Style.IndCon}>
                <SldInputCompInd qtd = {filter1.length} cur = {st}></SldInputCompInd>
            </div>
            <div className={Style.mainSldPos}>
                <div className={Style.SldCon}>
                    <button className={`${Style.l} ${Style.btn}`} onClick={()=>moveSides(-1)}>&larr;</button>
                    <button className={`${Style.r} ${Style.btn}`} onClick={()=>moveSides(1)}>&rarr;</button>
                    <div className={Style.mainSldCon} ref={sld}>
                        {
                            filter1.map((el,i)=>{
                                return(
                                    <div className={Style.SldItem} key={`sldInputComp${i}`}>
                                        {el}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
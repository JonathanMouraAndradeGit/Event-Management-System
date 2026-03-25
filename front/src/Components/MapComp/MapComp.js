import Style from "./MapComp.module.css"
import React from "react"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { useMapEvents } from "react-leaflet";
import { useState, useRef } from "react";
import { useEffect } from "react";
import { Map } from "leaflet";
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});
export default function MapComp(props) {
    const [position, setPosition] = useState([-23.5505, -46.6333]);
    const [pointer, setPointer] = useState()
    let ref = useRef()
    useEffect(() => {

    }, [])
    useEffect(() => {
        if (props.obj[props.lab]) {
            let objp = typeof props.obj[props.lab] === "string"
                ? JSON.parse(props.obj[props.lab])
                : props.obj[props.lab];

            let lat = parseFloat(objp.lat);
            let lon = parseFloat(objp.lon);

            setPointer({ lat, lon });
            setPosition([lat, lon]);
        }else{
            setPointer(null)
        }
    }, [props.obj[props.lab], props.obj[props.lab2]]);
    /*
    function MapClickHandler({ onClick }) {
        useMapEvents({
            click(e) {
                onClick(e.latlng);
            },
        });

        return null;
    }
    function onClick(e){ 
        console.log(e)
    }*/
    /*
    function MapClickHandler({ onClick }) {
        useMapEvents({
            click(e) {
                onClick(e.latlng);
            },
        });

        return null;
    }*/
    const [markers, setMarkers] = useState([]);
    const addMarker = (latlng) => {
        console.log(latlng)
        setMarkers((prev) => [...prev, latlng]);
    };
    function addChecker(e) {
        setPointer(e)
    }
    async function subs(e) {
        console.log(ref.current.value.trim())
        let location = ref.current.value.trim()
        try {


            if (location) {
                let url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
                let res = await fetch(url, {
                    headers: {
                        "Content-Type": "Application/json"
                    },
                    method: "GET"
                }).then((e) => e.json())
                if (res.length > 0) {
                    const { lat, lon, display_name } = res[0]
                    //if(pointer){
                    //Map.removeLayer(pointer)
                    //}
                    //L.marker([lat,lon]).addTo()
                    setPointer({ lat, lon })
                    setPosition([lat, lon])
                    props.setVal(prev => ({
                        ...prev,
                        [props.lab]: JSON.stringify({ lat: lat, lon: lon }),
                        [props.lab2]: display_name
                    }));
                }
                console.log(res)
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className={Style.Container}>
            {!props.readOnly && (
            <div className={Style.SearchBox}>
                <input type="text" ref={ref}></input><button onClick={(e) => subs(e)}>Submit</button>
            </div>)
            }
            <MapContainer center={[position[0],position[1]]} zoom={10} style={{ height: '100%', width: '100%' }} className={Style.posz}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />

                {pointer && (
                    <Marker position={pointer} eventHandlers={{
                        click: () => {
                            console.log(pointer)
                        }
                    }}>
                        <Popup>
                            <h1>here</h1>
                            <p>shortDescription</p>
                        </Popup>
                    </Marker>
                )
                }
            </MapContainer>
        </div>
    )
}
/*
<MapClickHandler onClick={addMarker} onDblClick={addChecker}/>
function MapClickHandler({ onClick,onDblClick }) {
        useMapEvents({
            click(e) {
                //console.log(e)
                onClick(e.latlng);
            },
            dblclick(e){
                onDblClick(e.latlng);
            }
        });

        return null;
    }
*/
/*
<Marker position={position}>
                    <Popup>
                        Você está em São Paulo!
                    </Popup>
                </Marker>
*/
/*
function addEvents({onDblClick}){
    useMapEvents({
        dblclick(e){
            onDblClick(e.latlng);
        }
    })
    return null;
}*/
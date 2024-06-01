import MapComponent from "google-map-react"
import { MapProp } from "./types/mapProp"
import { addMarker } from "../utils/marker"
import "../styles/map.css"
import { useEffect, useState } from "react"

const apiKey = import.meta.env.VITE_APP_MAP_API_KEY

export const Map = (props: MapProp)=>{

    const [mapRef, setMapRef] = useState<any>()
    const [mapsRef, setMapsRef] = useState<any>()
    const [markers, setMarkers] = useState<any[]>([])

    useEffect(()=>{
        markers.forEach(marker=>marker.setMap(null))
        if(mapRef && mapsRef){
            const markersList = []
            markersList.push(addMarker(mapRef, mapsRef, props.curr, "<p>my location</p>", "curr"))
            props.target && markersList.push(addMarker(mapRef, mapsRef, props.target, `<p style="color: black;" >Target location</p>`, "target"))
            props.points.forEach(p=>{
                markersList.push(addMarker(mapRef, mapsRef, p.coord, `<h1 style="color: black;" >Responder</h1><p style="color: black;" >${p.firstName} ${p.lastName}</p>`, "responder"))
            })
            setMarkers(markersList)
        }
    }, [mapRef, mapsRef, props.curr, props.points, props.target])

    return <div className="map-wrapper">
        <MapComponent 
        center={props.target?props.target:props.curr}
        bootstrapURLKeys={{
            id: "API key 1",
            key: apiKey,
          }}
          zoom={10}
        onGoogleApiLoaded={({map, maps})=>{
            
            setMapRef(map)
            setMapsRef(maps)
        }}

        key={apiKey}
        yesIWantToUseGoogleMapApiInternals
         >

        </MapComponent>
    </div>
}
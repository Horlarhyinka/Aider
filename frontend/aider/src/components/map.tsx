import MapComponent from "google-map-react"
import { MapProp } from "./types/mapProp"
import { addMarker } from "../utils/marker"
import "../styles/map.css"

const apiKey = import.meta.env.VITE_APP_MAP_API_KEY

export const Map = (props: MapProp)=>{

    return <div className="map-wrapper">
        <MapComponent 
        center={props.target?props.target:props.curr}
        bootstrapURLKeys={{
            id: "API key 1",
            key: apiKey,
          }}
          zoom={10}
        onGoogleApiLoaded={({map, maps})=>{
            addMarker(map, maps, props.curr, "<p>my location</p>")
            props.target && addMarker(map, maps, props.target, `<p style="color: black;" >Target location</p>`, false)
            props.points.forEach(p=>{
                addMarker(map, maps, p.coord, `<h1 style="color: black;" >Responder</h1><p style="color: black;" >${p.name}</p>`)
            })
        }}

        key={apiKey}
        yesIWantToUseGoogleMapApiInternals
         >

        </MapComponent>
    </div>
}
import { Coordinate } from "./factory"
import React from "react"


export const marker_path = "M12 0C7 0 3 4 3 9c0 5 9 15 9 15s9-10 9-15c0-5-4-9-9-9zm0 12.7c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"


export const addMarker = (map: any, maps: any, position: Coordinate, template: React.JSX.Element | string, bounce=false)=>{
    const marker = new maps.Marker({ position, map, clickable: true })
    marker.setAnimation(bounce?maps.Animation.BOUNCE:maps.Animation.BOUNCE)
    // marker.setIcon({fillColor: "green", path: marker_path, strokeColor: "white", fillOpacity: 1})
    const infoWindow = new maps.InfoWindow()
    infoWindow.setContent(template)
    marker.addListener("click", (e: any)=>{
        infoWindow.open(map, marker)
        })

}
import { ResponderOverviewCard } from "../components/responder-overview-card"
import Bot from "../assets/img/Bot.jpg"
import { responders } from "../assets/data/responders"
import { Map } from "../components/map"
import { useEffect, useState } from "react"

import { aboutFromCat, Coordinate, getDistance, getReport } from "../utils/factory"
import { useParams } from "react-router-dom"
import { getFirestoreDB } from "../config/firebase.config"
import { doc, onSnapshot } from "firebase/firestore"
import PHImg from "../assets/img/PHImg.jpeg"
import { User } from "./types/others/user"

export const ResponderPreview = () =>{


  const [curr, setCurr] = useState<Coordinate>({lat: 0, lng:0})
  const [responder, setResponder] = useState<User & {coord: Coordinate, remoteId: string}>()
  const {id} = useParams()

getFirestoreDB()
    .then(async(db)=>{
      const docRef = doc(db, `emergencies/${getReport()}/responders/${id}`)
      onSnapshot(docRef, (doc)=>{
        const r = {...(doc.data() as(User & {coord: Coordinate})), remoteId: doc.id}
        setResponder(r)
      })
    })

  navigator.geolocation.getCurrentPosition((p)=>{
    setCurr({lng: p.coords.longitude, lat: p.coords.latitude})
  })
    return responder?<div className="responder-preview">
        <ResponderOverviewCard avatar={responder.avatar || PHImg} name={responder.firstName + " " + responder.lastName} distance={+getDistance(responder.coord, curr)} about={aboutFromCat(responder.about)} />
        <Map curr={curr} points={responders}  />
    </div>:<h1 className="null" >loading...</h1>
}
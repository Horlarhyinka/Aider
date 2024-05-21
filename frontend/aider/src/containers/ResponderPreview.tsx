import { ResponderOverviewCard } from "../components/responder-overview-card"
import Bot from "../assets/img/Bot.jpg"
import { responders } from "../assets/data/responders"
import { Map } from "../components/map"
import { useState } from "react"

import { Coordinate } from "../utils/factory"

export const ResponderPreview = () =>{


  const [curr, setCurr] = useState<Coordinate>({lat: 0, lng:0})


  navigator.geolocation.getCurrentPosition((p)=>{
    setCurr({lng: p.coords.longitude, lat: p.coords.latitude})
  })
    return <div className="responder-preview">
        <ResponderOverviewCard avatar={Bot} name='tester' distance={120} about='EMT, Graduate at Massachusetts university. I am testing to seee how it adapts to longer text lengths......................................' />
        <Map curr={curr} points={responders}  />
    </div>
}
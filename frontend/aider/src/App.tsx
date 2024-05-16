import { Footer } from './components/footer'
import { Header } from './components/header'
// import { Home } from './containers/home'
// import { Report } from './containers/report'
// import { ReportMade } from './containers/ReportMade'
import { Responders } from './containers/responders'
import "./styles/index.css"
import { Map } from './components/map'
import { useState } from 'react'
import { Coordinate } from './utils/factory'
import { responders } from './assets/data/responders'
import { ResponderOverviewCard } from './components/responder-overview-card'

import Bot from "./assets/img/Bot.jpg"

function App() {

  const [curr, setCurr] = useState<Coordinate>({lat: 0, lng:0})


  navigator.geolocation.getCurrentPosition((p)=>{
    setCurr({lng: p.coords.longitude, lat: p.coords.latitude})
  })

  return (
    <>
    <Header isAuthenticated={false} />
    {/* <Home /> */}
    {/* <Report /> */}
    {/* <ReportMade/> */}
    {/* <Responders /> */}
    <ResponderOverviewCard avatar={Bot} name='tester' distance={120} about='EMT, Graduate at Massachusetts university. I am testing to seee how it adapts to longer text lengths......................................' />
    <Map curr={curr} points={responders}  />
    <Footer /> 
    </>
  )
}

export default App

import { Footer } from './components/footer'
import { Header } from './components/header'
// import { Home } from './containers/home'
// import { Report } from './containers/report'
// import { ReportMade } from './containers/ReportMade'
import { Responders } from './containers/responders'
import "./styles/index.css"

function App() {

  return (
    <>
    <Header isAuthenticated={false} />
    {/* <Home /> */}
    {/* <Report /> */}
    {/* <ReportMade/> */}
    <Responders />
    <Footer />
    </>
  )
}

export default App

import { Footer } from './components/footer'
import { Header } from './components/header'
import { Respond } from './containers/respond'
// import { Dashboard } from './containers/dashboard'
// import { Emergencies } from './containers/emergencies'
// import { Login } from './containers/login'
// import { Register } from './containers/register'
// import { Home } from './containers/home'
// import { Report } from './containers/report'
// import { ReportMade } from './containers/ReportMade'
import "./styles/index.css"

// import { ResponderPreview } from './containers/ResponderPreview'

function App() {


  return (
    <>
    <Header isAuthenticated={false} />
    {/* <Home /> */}
    {/* <Report /> */}
    {/* <ReportMade/> */}
    {/* <Responders /> */}
    {/* <ResponderPreview /> */}
    {/* <Register /> */}
    {/* <Login /> */}
    {/* <Dashboard /> */}
    {/* <Emergencies /> */}
    <Respond />
    <Footer /> 
    </>
  )
}

export default App

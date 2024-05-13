import { Footer } from './components/footer'
import { Header } from './components/header'
// import { Home } from './containers/home'
// import { Report } from './containers/report'
import { ReportMade } from './containers/ReportMade'
import "./styles/index.css"

function App() {

  return (
    <>
    <Header isAuthenticated={false} />
    {/* <Home /> */}
    {/* <Report /> */}
    <ReportMade/>
    <Footer />
    </>
  )
}

export default App

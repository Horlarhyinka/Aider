import { Footer } from './components/footer'
import { Header } from './components/header'
import { Respond } from './containers/respond'
import { Dashboard } from './containers/dashboard'
import { Emergencies } from './containers/emergencies'
import { Login } from './containers/login'
import { Register } from './containers/register'
import { Home } from './containers/home'
import { Report } from './containers/report'
import { ReportMade } from './containers/ReportMade'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ResponderPreview } from './containers/ResponderPreview'

import "./styles/index.css"
import { Responders } from './containers/responders'
import { register } from './serviceWorkerRegistration'


function App() {

  register({})

  return (
    <BrowserRouter basename='' >
      <div className="app">

    <Header isAuthenticated={false} />
    <Routes>

    <Route path='/' element={<Home />} />
    <Route path='/dashboard' element={<Dashboard/>} />
    <Route path="/emergencies" element={<Emergencies />} />
    <Route path='/emergencies/:id' element={<Respond />} />
    {/* <Route path='/emergencies/:id' element={<EmergencyPreview />} /> */}
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register/>} />
    <Route path='/report' element={<Report/>} />
    <Route path='/report-made' element={<ReportMade />} />
    <Route path='/responders/:id' element={<ResponderPreview />} />
    <Route path='/responders' element={<Responders/>} />

    </Routes>
    <Footer />         
    </div>
    </BrowserRouter>

  )
}

export default App

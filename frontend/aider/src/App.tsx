import { Footer } from './components/footer'
import { Header } from './components/header'
import { Home } from './containers/home'
import "./styles/index.css"

function App() {

  return (
    <>
    <Header isAuthenticated={false} />
    <Home />
    <Footer />
    </>
  )
}

export default App

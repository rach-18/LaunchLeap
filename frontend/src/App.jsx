import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SignUp from './components/SignUp-Login/SignUp'
import Query from './components/Query/Query'
import Responses from './components/Query/Responses'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { AppProvider } from './components/context/AppContext'
import SharedResponse from './components/Query/SharedResponse'

function App() {
  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, [])

  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path='/' element={<Home />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/query' element={<Query />}></Route>
          {/* <Route path='/responses' element={<Responses />}></Route> */}
          <Route path='/response/:id' element={<Responses />}></Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  )
}

export default App

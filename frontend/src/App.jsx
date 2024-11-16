import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SignUp from './components/SignUp-Login/SignUp'
import Query from './components/Query/Query'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

function App() {
  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/query' element={<Query />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

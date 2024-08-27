import React from 'react'
import NavBar from '../../components/navbar/NavBar'
import { Outlet } from 'react-router-dom'
import Home from '../../components/page/home/Home'
import Footer from '../../components/footer/Footer'


const HomePage = () => {
  return (
    < div>
      <NavBar />
      {/* <Home/>*/}
      <Outlet />
      <Footer/>
    </div>

  )
}

export default HomePage
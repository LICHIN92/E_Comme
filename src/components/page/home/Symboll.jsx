import React, { useEffect } from 'react'
import './ymbol.css'
import $ from 'jquery'
import logo from '../../../assets/phoenix.jpg'

const Symboll = () => {

  useEffect(() => {
    // Corrected jQuery usage
    $('#imgg').animate({
      width: '300px',
      height: '300px',
      opacity: '1'
    }, 5000);
  }, []);
  return (
    <div className=' symbol_container'>
      <div id="symbol_img">
        <img id='imgg' src={logo} alt="" />
        <span>E-shop</span>
      </div>
    </div>
  )
}

export default Symboll

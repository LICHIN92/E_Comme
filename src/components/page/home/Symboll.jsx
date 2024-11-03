import React, { useEffect } from 'react'
import './ymbol.css'
import $ from 'jquery'
import logo from '../../../assets/creative-elegant-abstract-minimalistic-logo-design-vector-any-brand-company_1287271-50142.jpg'

const Symboll = () => {

  useEffect(() => {
    // Corrected jQuery usage
    $('#imgg').animate({
      width: '300px',
      height: '300px',
      opacity: '1'
    }, 2000);
  }, []);
  return (
    <div className=' symbol_container'>
      <div id="symbol_img">
        <img id='imgg' src={logo} alt="" />

      </div>
    </div>
  )
}

export default Symboll

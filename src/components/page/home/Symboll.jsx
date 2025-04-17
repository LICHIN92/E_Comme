// import React, { useEffect } from 'react'
// import './ymbol.css'
// import $ from 'jquery'
// import logo from '../../../assets/phoenix.jpg'

// const Symboll = () => {

//   useEffect(() => {
//     // Corrected jQuery usage
//     $('#imgg').animate({
//       width: '300px',
//       height: '300px',
//       opacity: '1'
//     }, 5000);
//   }, []);
//   return (
//     <div className=' symbol_container'>
//       <div id="symbol_img">
//         <img id='imgg' src={logo} alt="" />
//         <span>E-shop</span>
//       </div>
//     </div>
//   )
// }

// export default Symboll


import React, { useEffect } from 'react';
import './ymbol.css'; // Ensure file name is correct
import gsap from 'gsap';

const Symboll = ({time}) => {
  useEffect(() => {
    gsap.to(".E", {
      duration: 5,
      rotation: 360,
      opacity: 1,
      // delay: 0.3,
      stagger: 0,
      ease: "sine.inOut",
      // force3D: true,
    });
    setInterval(()=>{time(true)},6000)
  }, []);

  return (
    <div className="symbol_container">
      <div id="symbol_img" className="text-white">
        <div className='flex justify-center boxx'>
          <div className="E bg-violet-800  text-white">E</div>
          <div className="shop text-white">Shop</div>
        </div>
      </div>
    </div>
  );
};

export default Symboll;

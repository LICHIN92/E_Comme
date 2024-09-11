import React, { useEffect, useState } from 'react';
import ring from '../../assets//download-removebg-preview.png';
import './carousel.css';
import axios from 'axios';

const CarouselC = () => {
  const [image,setImage]=useState([])
  useEffect(()=>{
  const data=async()=>{
    try {
    const response=await axios.get('http://localhost:3200/product')
      setImage(response.data)
      console.log(response);
      
    } catch (error) {
       console.log(error);
       
    }


  }
  data()
  },[])
  return (
    <div
      id="carouselExampleAutoplaying"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="2500"
    >
      <div className="carousel-inner">
      {/* {image.map((item, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? 'active' : ''}`}
          >
            <div className='w-100 flex justify-center '>
            <img
              src={item.Pics[0]} // Ensure item.Pics[0] exists
              className="d-block w-45"
              alt={`Slide ${index + 1}`}
            />
            </div>
            
          </div>
        ))} */}
        <div className="carousel-item active">
          <img src='https://media.istockphoto.com/id/1302329703/photo/little-child-boy-standing-arms-crossed-and-looking-face-of-tall-child-at-standing-arms.jpg?s=612x612&w=0&k=20&c=i6GxzpFhlWj7u81MExAfx6tyIpJFxH_cFdeGBr-iehE=' className="d-block w-100" alt="First slide" />
        </div>
        <div className="carousel-item ">
          <img src='data:image/jpeg;base64,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' className="d-block w-100 items-center" alt="Second slide" />
        </div>
        <div className="carousel-item">
          <img src='https://images.herzindagi.info/image/2022/Mar/how-to-look-tall-in-saree-main.jpg' className="d-block w-100" alt="Third slide" />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default CarouselC;

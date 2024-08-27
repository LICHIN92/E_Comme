import React, { useEffect, useState } from 'react'
import CarouselC from '../../carousel/CarouselC'
import './home.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Home = () => {
  const navigate = useNavigate();
  const [items,setItems]=useState([])
  useEffect(()=>{
    const items=async()=>{
      try {
        const data=await axios.get('http://localhost:3200/product')
        console.log(data);
        setItems(data.data)
      } catch (error) {
           console.log(error);
           
      }
    }
    items()
  },[])
  const ViewItem = () => {
    const user = localStorage.getItem('user')
    if (user) {
      navigate('/itemView', { replace: false });
      console.log('hgghcgg');
    } else {
      navigate('/user')
    }
  }
  return (
    <div className='px-2 '>
      <CarouselC />
      <div className='flex  flex-wrap justify-center  border rounded my-2 py-3 lg:gap-5  gap-3 '>
        {items.map((item ,key)=> (
          <div className='img_box relative border-l-fuchsia-700' key={key} onClick={() => ViewItem()}>
            <img src={item.Pics[0]} alt="" />
            <div className='span_div ps-2 flex flex-col relative '>

              <span className='relative '>{item.Type}</span>
              {/* <span className='relative '>item</span> */}

            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default Home
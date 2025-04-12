import React, { useEffect, useState } from 'react'
import CarouselC from '../../carousel/CarouselC'
import './home.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modl from './Modl';
import Symboll from './Symboll';
const Home = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([])
  const [modall, setModal] = useState(true)
  const token = localStorage.getItem('user')
  const [time,setTime]=useState(false)
  useEffect(() => {
    const items = async () => {
      try {
        const data = await axios.get('https://ecomback-1.onrender.com/product/home', { withCredentials: true })
        // console.log(data);
        setItems(data.data)
      } catch (error) {
        // console.log(error);

      }
    }
    items()

  }, [])
  const ViewItem = async (Type) => {
    const user = localStorage.getItem('user')
    if (user) {
      const result = await axios.get(`https://ecomback-1.onrender.com/product/viewType/${Type}`);
      // console.log(result.data.items);

      // Correctly passing state
      navigate('/itemView', { replace: false, state: { data: result.data.items, type: Type } });

    } else {
      navigate('/user')
    }
  }
  return (
    <div className='px-0 '>
      {!time && <Symboll time={setTime}/>}
      {!token && modall && <Modl setModal={setModal} />}

      <CarouselC />
      <div className='flex  flex-wrap justify-center  border rounded my-2 py-3 lg:gap-5  md:gap-3 gap-2 '>
        {items.length > 0 ?
          <>{items.map((item, key) => (
            <div className='img_box relative border-l-fuchsia-700' key={key} onClick={() => ViewItem(item.Type)}>
              <img src={item.Pics[0]} alt="" />
              <div className='span_div ps-2 flex flex-col relative '>

                <span className='relativeType '>{item.Type}</span>
                {/* <span className='relative '>item</span> */}

              </div>
            </div>
          ))}</>
          : <div className='text-orange-700'> Please Wait Loading.....</div>
        }
      </div>
    </div>
  )
}

export default Home
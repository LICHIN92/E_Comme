import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const DeleteCategary = () => {
    const navigate = useNavigate();
  const [items, setItems] = useState([])
  useEffect(() => {
    const items = async () => {
      try {
        const data = await axios.get('https://ecomback-1.onrender.com/product/home')
        console.log(data);
        setItems(data.data)
      } catch (error) {
        console.log(error);

      }
    }
    items()
  }, [])
  const ViewItem = async (Type) => {
    const user = localStorage.getItem('user')
    if (user) {
      const result = await axios.get(`https://ecomback-1.onrender.com/product/viewType/${Type}`);
      console.log(result.data.items);

      // Correctly passing state
      navigate('/itemView', { replace: false, state: { data: result.data.items, type: Type } });

    } else {
      navigate('/user')
    }
  }
  return (
    <div className='px-2 '>
      <div className='flex  flex-wrap justify-center  border rounded my-2 py-3 lg:gap-5  gap-3 '>
        {items.map((item, key) => (
          <div className='img_box relative border-l-fuchsia-700' key={key} onClick={() => ViewItem(item.Type)}>
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

export default DeleteCategary
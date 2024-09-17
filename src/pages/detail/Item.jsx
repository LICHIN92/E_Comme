import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './item.css'
import dark from '../../assets/darkMode.svg'
import light from '../../assets/lightMode.svg'
import axios from 'axios'
import addItem from '../../assets/additem.svg'
import { useSelector } from 'react-redux'
const Item = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const { data: initialData, type } = location.state || {}; // Safely accessing the state object
  const [data, setData] = useState(initialData)

  // console.log(data);
  // console.log(type);
  const Type = type
  const { user } = useSelector(state => state.user)
console.log(user?.user?.user);

  useEffect(() => {
    const view = async () => {
      try {
        const result = await axios.get(`https://ecomback-1.onrender.com/product/viewType/${type}`);
        console.log(result);
        setData(result.data.items)
      } catch (error) {
        console.log(error);

      }
    }
    view()
  }, [Type])
  const [isActive, setIsActive] = useState(false)
  const handleToggle = () => {
    setIsActive(!isActive); // Toggle the state between true and false
  };
  return (
    <div className={isActive ? "dark" : 'itemContainer'}>
      {data.length > 0 ?
        <>
          <div className='flex justify-between p-1'>
            {/* <span>{data[0].Type}</span> */}
            <span onClick={handleToggle} className='toggle-mode'>
              {isActive ? (
                <>
                  <span className='modeSpan ms-2 mb-3'> Light Mode </span><img className='mode' src={light} alt="Light Mode Icon" />
                </>
              ) : (
                <>
                  <span className='modeSpan'>Dark Mode</span> <img className='mode' src={dark} alt="Dark Mode Icon" />
                </>
              )}
            </span>          </div>
          <div className='flex gap-3 flex-wrap md:justify-center md:px-2 px-1'>
            {data.map((item, index) =>
              <div className='showbox ' key={index}
                onClick={() => navigate(`/Dress/${item._id}`, { state: { data: item } })}
              >
                <div className='showboximage'>
                  <img src={item.Pics[0]} alt="" />

                </div>
                <div className="showspan ">
                  <span className='fw-medium uppercase font-serif'>{item.Name}</span>
                  <span className='fw-bold'>  ₹ {item.Price}/- </span>
                  {data.Quantity <= 0 &&
                    <span className='available'>not available</span>
                  }
                </div>

              </div>
            )}
            {user?.user?.user && <div className='addingdress cursor-pointer' onClick={()=>navigate('/AddDress')}>
              <img src={addItem} alt="" />
              <span>Add new {data[0].Type}</span>
            </div>}
          </div>

        </>

        : <div>
          <p className='p-6'>{type} is currently unavailable <br /> {type} will be added soon</p>
          {user?.user?.user && <div className='addingdress cursor-pointer' onClick={()=>navigate('/AddDress')}>
              <img src={addItem} alt="" />
              <span>Add new {data[0]?.Type}</span>
            </div>}
        </div>
      }

    </div>
  )
}

export default Item
import React, { useState } from 'react'
import './book.css'
import close from '../../assets/close.svg'
import { RiMoneyRupeeCircleFill } from 'react-icons/ri'
import retu from '../../assets/return.svg'
import rupee from '../../assets/roopa.svg'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const Book = ({ data, setBook }) => {
  const price = data.Price
  let rate = price
  const id = data._id
  console.log(id);

  let items = data.Size
  const [newrate, setRate] = useState(price)
  const [size, setSize] = useState(items)
  const [selectedSize, setSelectedSize] = useState('')
  const hanldesize = (i) => {
    setSelectedSize(i)
    console.log(selectedSize);
    if (i === 's') {
      rate = price + 0
    } else if (i === 'M') {
      rate = price + 50
    } else if (i === 'L') {
      rate = price + 100
    } else if (i === 'XL') {
      rate = price + 150
    } else if (i === 'XXL') {
      rate = price + 200
    } else {
      rate = price + 250

    }
    setRate(rate)
  }
  const { handleSubmit } = useForm()
  const onsubmit = async (formdata) => {
    formdata.Name=data.Name
    formdata.id=data._id
    if (items.length > 0) {
      if (selectedSize) {
        formdata.size = selectedSize
        formdata.price = newrate

      } else {
       return alert('select your size')
      }
    } else {
      formdata.price = rate
      
    }
    try {
      console.log(formdata);
      const token=localStorage.getItem('user')
      const response = await axios.post(`https://ecomback-yhya.onrender.com/booking/${id}`, formdata,{
        headers:{
          'Authorization': `Bearer ${token}`
        }
      })
      setBook(false)
      alert(response.data)
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }

  }
  return (
    <div className='BookContainer'>{data._id}
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className='bookingBox'>
          <img className='bookclose' src={close} onClick={() => setBook(false)} />
          <div className='bookImg lg:pt-2'>
            <img src={data.Pics[0]} alt="" />
            <p className="flex justify-center items-center gap-2 mt-2"><span className='text-green-400 font-serif fw-bold '> <RiMoneyRupeeCircleFill /> </span>
              {newrate} /-</p>
          </div>
          {items.length > 0 && <div className='flex md:justify-center'>

            <span className='text-amber-400 fw-medium'>Select Size:</span>
            <div className='flex gap-3 px-2'>

              {size.map((size, index) => (
                <span className={selectedSize === size ? 'selected' : 'size'} onClick={() => hanldesize(size)} key={index}>{size}</span>

              ))}
            </div>

          </div>}
          <div className='returnBox flex justify-center items-center mt-4 gap-4'>
            <img className='return' src={retu} alt="" />
            <p className='capitalize'>two days return policy</p>
          </div>
          <div className='pe-10 returnBox flex justify-center items-center  gap-4'>
            <img className='rupee ' src={rupee} alt="" />
            <span>Cash on Delivery  </span>
          </div>
          <div className='flex justify-center items-center  gap-4'>
            <button type='submit' className='bookButton'>Book Now</button>
          </div>
        </div>
      </form>

    </div>
  )
}

export default Book
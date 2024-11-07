import React, { useState } from 'react'
import './book.css'
import close from '../../assets/close.svg'
import { RiMoneyRupeeCircleFill } from 'react-icons/ri'
import retu from '../../assets/return.svg'
import rupee from '../../assets/roopa.svg'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Book = ({ data, setBook }) => {
  const info = data
  const price = data.Price
  let rate = price
  let Name = data.Name
  const id = data._id
  // console.log(id);

  const { user } = useSelector(state => state.user.user)


  let items = data.Size
  const [newrate, setRate] = useState(price)
  const [size, setSize] = useState(items)
  const [selectedSize, setSelectedSize] = useState('')
  const [cashOn, setCashOn] = useState(true)
  const hanldesize = (i) => {
    setSelectedSize(i)
    console.log(selectedSize);
    if (i === 'S') {
      rate = price
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
    formdata.Name = data.Name
    formdata.id = data._id
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
      // console.log(formdata);
      const token = localStorage.getItem('user')
      const response = await axios.post(`https://ecomback-1.onrender.com/booking/${id}`, formdata, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setBook(false)
      alert(response.data + "\nVisit your PROFILE");

    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }

  }
  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        console.log("Razorpay SDK loaded");
        resolve(true);
      };
      script.onerror = () => {
        console.log("Razorpay SDK failed to load");
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };


  const payfunction = async () => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      const token = localStorage.getItem('user');
      const formdata = {
        price: newrate, // Update to ensure it's using the current rate
        size: selectedSize,
        Name: Name,
        itemBooked: id
      };
      
      console.log(formdata)
      const response = await axios.post(`https://ecomback-1.onrender.com/booking/orderr/${id}`,  {
        price: newrate, // Update to ensure it's using the current rate
        size: selectedSize,
        Name: Name,
        itemBooked: id
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response) {
        alert("Server error. Are you online?");
        return;
      }

      const { amount, id: order_id, currency, receipt } = response.data;
      console.log(response);
      
      const key = import.meta.env.VITE_RP_KEY_ID;

      const options = {
        key,
        amount: amount.toString(),
        currency,
        name: "E-shop",
        description: "Online Payment",
        order_id, // Corrected to match Razorpay's expected field name
        handler: async (response) => {
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            receipt,
            itemId: id,
          };

          try {
            const result = await axios.post('https://ecomback-1.onrender.com/booking/verify', data, {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            });
            console.log(result);
            alert("Payment successful and verified!");
          } catch (error) {
            console.log("Verification error:", error);
          }
        },
        prefill: {
          name: user.FirstName || "Customer Name",
          email: user.Email || "customer@example.com",
          contact: user.Mobile || "9999999999"
        },
        theme: {
          color: "#F37254"
        }
      };

      const razorpayInstance = new Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while initiating payment.");
    }
  };


  return (
    <div className='BookContainer'>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className='bookingBox'>
          <img className='bookclose' src={close} onClick={() => setBook(false)} />
          <div className='bookImg lg:pt-2'>
            <img src={data.Pics[0]} alt="" />
            <span>{data.Name}</span>
            <p className="flex justify-center items-center gap-2 mt-2"><span className='text-green-400 font-serif fw-bold '> <RiMoneyRupeeCircleFill /> </span>
              {newrate} /-</p>
          </div>
          {items.length > 0 && <div className='flex justify-center'>

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
            <span onClick={() => setCashOn(!cashOn)}>{cashOn ? 'click-Online Payment' : "click-Cash on Delivery"}</span>
          </div>
          <div className='flex justify-center items-center  gap-4'>
            {cashOn ? <button type='submit' className='bookButton'>Book Now</button>
              : <span className='bookButton cursor-pointer' onClick={() => payfunction()}>Pay Now</span>}
          </div>
        </div>
      </form>

    </div>
  )
}

export default Book
import React, { useEffect, useState } from 'react';
import './profile.css';
import profile from '../../assets/profile.svg';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FaMobileScreen } from 'react-icons/fa6';
import { BiLogoGmail } from 'react-icons/bi';
import { MdModeEditOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useSelector((state) => state.user.user);
  const id = user._id;
  const [data, setData] = useState([]);
  const [bookdata, setBookData] = useState([]);
  const token = localStorage.getItem('user');
  const [refresh, setRefresh] = useState(false);
  const [returnback, setReturn] = useState(false);
  const [number, setNumber] = useState('0')
  const navigate = useNavigate()

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`https://ecomback-1.onrender.com/user/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setData(response.data);
console.log(response.data);

      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    fetch();
  }, [id, token, refresh]);

  useEffect(() => {
    const Bookings = async () => {
      try {
        const response = await axios.get(`https://ecomback-1.onrender.com/Booking/user/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setBookData(response.data);
      } catch (error) {
        console.error("Error fetching bookings", error);
      }
    };
    Bookings();
  }, [id, token, refresh, returnback]);

  useEffect(() => {
    const users = async () => {
      try {
        const num = await axios.get('https://ecomback-1.onrender.com/user')
        setNumber(num.data)
      } catch (error) {
        alert(error)
      }
    }
    users()
  }, [])

  const returnfun = async (id) => {
    console.log(id);
    try {
      setReturn(!returnback);
      await axios.put(`https://ecomback-1.onrender.com/booking/return/${id}`);
    } catch (error) {
      console.error("Error updating return status", error);
    }
  };

  const cancel = async (id) => {
    try {
      await axios.delete(`https://ecomback-1.onrender.com/booking/${id}`);
      setRefresh(prev => !prev);
      alert('Canceled Your Booking');
    } catch (error) {
      console.error("Error canceling booking", error);
    }
  };

  return (
    <div className='profile'>
      <div className='userprofile'>
        <div className='profileName flex ps-1 gap-1'>
          <img src={profile} alt="Profile" />
          <h1>{data?.FirstName} {data?.LastName}</h1>
        </div>
        <div className='flex flex-col ps-7 my-2'>
          <span className='flex items-center gap-1'>
            <FaMobileScreen />{data?.Mobile}<abbr title="edit Mobile"> <MdModeEditOutline /></abbr>
          </span>
          <span className='flex items-center gap-1'>
            <BiLogoGmail />{data?.Email}<abbr title="edit email"> <MdModeEditOutline /></abbr>
          </span>
        </div>
        <div className='flex flex-col ps-7 my-2'>
          <span className='capitalize'>{data?.AddressLine1}</span>
          <span className='capitalize'>{data?.AddressLine2}</span>
          <span className='capitalize'>{data?.AddressLine3}</span>
          <span className='capitalize'>PIN {data?.PIN}</span>
        </div>
      </div>
      <div className='userBooking'>
        {data.user ?
          <div className='flex flex-wrap gap-6 p-2'>
            <button className='bg-lime-700 p-2 text-white rounded-full' onClick={() => navigate('/Bookings')}>Bookings</button>
            <button className='bg-yellow-700 p-2 text-white rounded-full' onClick={() => navigate('/return/Request')}>Retern Request</button>
            <button className='bg-blue-700 p-2 text-white rounded-full'>No.of Users = {number}</button>

          </div> :
          <>
            <h1>Booking</h1>
            {bookdata.length > 0 ? (
              <div className='usedbookedDetails'>
                {bookdata.map((file, index) => (
                  <div className='bookedDetail' key={index}>
                    <span className='text-black uppercase fw-medium'>{file.Name}</span>
                    <div className="bookedimage">
                      <img src={file?.itemBooked?.Pics[0]} alt="Booking Item" />
                    </div>
                    <span>Price: {file?.itemBooked?.Price}</span>
                    {!file.delivery ? (
                      <button className='bg-red-700 px-1 text-white' onClick={() => cancel(file._id)}>Cancel</button>
                    ) : (
                      (new Date(file.returnDate).getTime() >= Date.now() && !file.returned) && (
                        <div>
                          {!file.return ? (
                            <button className='bg-blue-700 px-1 text-white' onClick={() => returnfun(file._id)}>Return</button>
                          ) : (
                            <button className='bg-green-600 px-1 text-white' onClick={() => returnfun(file._id)}>Cancel Return</button>
                          )}
                        </div>
                      )
                    )}
                  </div>
                ))}
              </div>
            ) : 'You have not booked anything'}
          </>
        }

      </div>
    </div>
  );
};

export default Profile;

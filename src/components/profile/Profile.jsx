import React, { useEffect, useState } from 'react';
import './profile.css';
import profile from '../../assets/profile.svg';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FaMobileScreen } from 'react-icons/fa6';
import { BiLogoGmail } from 'react-icons/bi';
import { MdModeEditOutline } from 'react-icons/md';
import { set } from 'date-fns';

const Profile = () => {
  const { user } = useSelector((state) => state.user.user);
  const id = user._id;
  const [data, setData] = useState([]);
  const [bookdata, setBookData] = useState([]);
  const token = localStorage.getItem('user');
  const [refresh,setRefresh]=useState(false)

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`https://ecomback-yhya.onrender.com/user/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    fetch();
  }, [id, token,refresh]);

  useEffect(() => {
    const Bookings = async () => {
      try {
        const response = await axios.get(`https://ecomback-yhya.onrender.com/Booking/user/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setBookData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching bookings", error);
      }
    };
    Bookings();
  }, [id, token,refresh]);

  const cancel=async(id)=>{
    const ID=id
    try {
      const resp=await axios.delete(`https://ecomback-yhya.onrender.com/booking/${ID}`)
      setRefresh(prev => !prev)
      alert('Canceled Your Booking')

    } catch (error) {
      
    }

  }

  return (
    <div className='profile '>
      <div className='userprofile'>
        <div className='profileName flex ps-1 gap-1'>
          <img src={profile} alt="Profile" />
          <h1>{data.FirstName} {data.LastName}</h1>
        </div>
        <div className='flex flex-col ps-7 my-2'>
          <span className='flex items-center gap-1'><FaMobileScreen />{data.Mobile}<abbr title="edit Mobile"> <MdModeEditOutline /></abbr></span>
          <span className='flex items-center gap-1'><BiLogoGmail />{data.Email} <abbr title="edit email"> <MdModeEditOutline /></abbr></span>
        </div>
        <div className='flex flex-col ps-7 my-2'>
          <span className='capitalize'>{data.AddressLine1}</span>
          <span className='capitalize'>{data.AddressLine2}</span>
          <span className='capitalize'>{data.AddressLine3}</span>
          <span className='capitalize'>PIN {data.PIN}</span>
        </div>
      </div>
      <div className='userBooking'>
        <h1>Booking</h1>
        {bookdata.length > 0 ?
          <div className='usedbooedDetails'>
            {bookdata.map((file, index) => (
              <div className='bookedDetail' key={index}>
                <span className='text-black uppercase fw-medium'>{file.Name}</span>
                <div className="bookedimage">
                  <img src={file.itemBooked.Pics[0]} alt="Booking Item" />
                </div>
                <span>Price: {file.itemBooked.Price}</span>
                {! file.delivery &&
                  <button className='bg-red-700 px-1  text-white ' onClick={()=>cancel(file._id)}>Cancel</button>}
              </div>
            ))}
          </div>
          : 'You have not Booked Anything'}
      </div>
    </div>
  );
};

export default Profile;

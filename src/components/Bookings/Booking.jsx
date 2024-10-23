import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './bookings.css'
const Booking = () => {
    let [Book, setBook] = useState([])
    const [refresh, setRefresh] = useState(false)
    //   Function to format the timestamp into a readable date
    const formatDate = (timestamp) => {
        const date = new Date(timestamp); // Create a new Date object
        return date.toLocaleString(); // Convert it to a readable string
    };
    const token=localStorage.getItem('user')
    useEffect(() => {
        const book = async () => {
            try {
                const data = await axios.get('http://localhost:3200/booking/bookings',{
                    headers:{
                        "Authorization":`Bearer ${token}`
                    }
                })
                // console.log(data.data.data);
                setBook(data.data.data)
            } catch (error) {
                alert(error.response.data.message)
                // console.log(error)
            }
        }
        book()
    }, [refresh])
    const update = async (id) => {
        console.log(id);
        const Id = id
        try {
            const result = await axios.put(`http://localhost:3200/booking/${id}`)
            setRefresh(prev => !prev)
            console.log(refresh);
            alert('updated')

        } catch (error) {
            console.log(error);
            alert
        }
    }
    return (
        <div className='bookContainer'>
            <h1>bookings</h1>
            <div className='qwa flex flex-wrap gap-1'>
                {Book.map((item, index) => (
                    <div className='deliveredBox' key={index}>
                        <div className='itemImageName'>
                            <img src={item?.itemBooked?.Pics[0]} alt="" />
                            <h5 className='uppercase'>{item?.itemBooked?.Name}</h5>

                        </div>
                        <div>
                            <label className='text-black'>Booked By:</label>
                            <span className='capitalize fw-bold'> {item?.bookedBy?.FirstName} {item?.bookedBy?.LastName}</span>
                        </div>
                        <div>
                            <label className='text-black'>Mobile:</label>
                            <span className="fw-bold">{item?.bookedBy?.Mobile}</span>
                        </div>
                        <div>
                            <label className="text-black">Address:</label>
                            <ul className='fw-bold'>
                                <li className='fw-bold'>{item?.bookedBy?.AddressLine1}</li>
                                <li className='fw-bold'>{item?.bookedBy?.AddressLine2}</li>
                                <li className='fw-bold'>{item?.bookedBy?.AddressLine3}</li>
                                <li className='fw-bold'>PIN: {item?.bookedBy?.PIN}</li>
                            </ul>
                        </div>
                        <div>
                            <label className="text-black">Booked Date:</label>
                            <span className='fw-bold'>{formatDate(item.bookingDate)}</span>
                        </div>
                        <div>
                            <label className="text-black"> Delivered:</label>
                            <span className={item.delivery ? "Yes" : "No"}>{item.delivery ? "Yes" : "No"}</span>
                        </div>
                        {item.deliveredDate && <div>
                            <label className="text-black">Delivred Date:</label>
                            <span className='fw-bold'>{formatDate(item.deliveredDate)}</span>
                        </div>}
                        {!item.delivery && <div className='flex justify-center items-center'>
                            <button className='bg-yellow-600 px-3 py-1 text-gray-50 my-1 rounded' onClick={() => update(item._id)}>Gave</button>
                        </div>}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Booking

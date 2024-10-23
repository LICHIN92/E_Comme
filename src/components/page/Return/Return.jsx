import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Return.css'

const Return = () => {
    const [data, setData] = useState([])
    const[refresh,setRefresh]=useState(false)

    useEffect(() => {
    const token=localStorage.getItem('user')

        const datafun = async () => {
            try {
                const response = await axios.get('http://localhost:3200/booking/return',{
                    headers:{
                        "Authorization":`Bearer ${token}`
                    }
                })
                setData(response.data)
                // console.log(response.data);

            } catch (error) {
    alert(error)
            }
        }
        datafun()
    }, [refresh])

    

    const update = async (id) => {
        console.log(id);
        const token = localStorage.getItem('user');
    
        try {
            const res = await axios.put(`http://localhost:3200/booking/update/${id}`, {}, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            setRefresh(!refresh);
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }
    
    return (
        <div className='return_container'>
            <h3>Return Request</h3>
            <div className='retutn_Detail '>

                {data.length>0 && data.map((file, index) => (
                    <div key={index} className="return-item">
                        <div className='flex flex-col items-center  justify-center font-semibold capitalize'>
                            <img className='' src={file.itemBooked.Pics[0]} alt={file.itemBooked.Name} />
                            <span className='text-black'>{file.itemBooked.Name}</span>
                            <span>Price: {file.itemBooked.Price}</span>
                        </div>
                        <div className='flex flex-col font-medium'>
                            <span className='font-bold'>Requested By :-</span>
                            <div className='flex flex-col ps-2'>
                                <span className=' capitalize'>{file.bookedBy.FirstName}{file.bookedBy.lastName}</span>
                                <span>{file.bookedBy.AddressLine1}</span>
                                <span>{file.bookedBy.AddressLine2}</span>
                                <span>{file.bookedBy.AddressLine3}</span>
                                <span>PIN: {file.bookedBy.PIN}</span>
                                <span>Mob: {file.bookedBy.Mobile}</span>
                            </div>

                        </div>
                        <div className='flex flex-col font-semibold'>
                            <span>Requested Date</span>
                            <span className='ms-3'>{file.returnDate}</span>
                            <span >Solved:{file.returned ?
                                <small className='bg-green-600 px-1 text-white'>Yes</small> :
                                <small className='bg-red-600 px-1 text-white'>No</small>}</span>
                            {!file.returned && <button className='solve bg-orange-600' onClick={()=>update(file._id)}>Solve</button>}
                        </div>
                    </div>
                ))}

            </div>

        </div>
    )
}

export default Return
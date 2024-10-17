import React, { useState } from 'react'
import './users.css'
import { useEffect } from 'react'
import axios from 'axios'
import { tr } from 'date-fns/locale'

const Users = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const fetchdata = await axios.get("https://ecomback-1.onrender.com/user/user/all")
                console.log(fetchdata);
                setData(fetchdata.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchDetail()
    }, [])
    return (
        <div className='Users_Container'>
            {
                <table>
                    <thead>
                        <tr>
                            <th className='slNo'>sl.No</th>
                            <th>User Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((file, index) => {
                                return ( // Explicitly returning JSX
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td className='uppercase fw-medium'>{file.FirstName} {file.LastName}</td>
                                        <td className='addrers_td'>
                                           <span> {file.AddressLine1}</span> <br />
                                           <span> {file.AddressLine2}</span> <br />
                                           <span> {file.AddressLine3}</span> <br />
                                           <span> {file.PIN}</span>
                                        </td>
                                        <td className='delete_td'>
                                            <button>Delete</button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            }
        </div>
    )
}

export default Users
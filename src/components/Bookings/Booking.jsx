import axios from 'axios'
import React, { useEffect } from 'react'

const Booking = () => {
    useEffect(() => {
        const book=async()=>{
            try {
                const data=await axios.get('http://localhost:3200/booking')
            } catch (error) {
                
            }
        }
        book()
    }, [])
    return (
        <div>Booking</div>
    )
}

export default Booking
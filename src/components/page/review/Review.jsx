import React, { useState } from 'react';
import './review.css';
import { FaStar } from 'react-icons/fa6';
import close from '../../../assets/close.svg'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import axios from 'axios';

const Review = ({ setReview, file }) => {
    const [rating, setRating] = useState(1); // State to hold the selected rating
    const [hover, setHover] = useState(1); // State for hover effect
    const stars = [1, 2, 3, 4, 5]; // Array for 5 stars
    const token = localStorage.getItem('user')
    const schema=yup.object({
        review: yup.string().required('Review is required').min(10, 'Review should be at least 10 characters long'),
    })
    const {register,handleSubmit,formState:{errors}}=useForm({resolver:yupResolver(schema)})
   
    const reviewSubmit = async (data) => {
        const id = file.itemBooked._id;
        data.rating = rating;
        const bookingId=file._id
        data.bookingId=file._id

        try {
            const submit = await axios.post(`http://localhost:3200/review/${id}`, data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log(submit);
            alert(submit.data)
            setReview(false)
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };
    return (
        <div className='review-container'>
            <div className='review_box'>
                <form onSubmit={handleSubmit(reviewSubmit)}>
                    <div className='review_itemImage'>
                        <img src={file.itemBooked.Pics[0]} alt="image" />
                    </div>
                    <div className='comment_box flex flex-col'>
                        <label htmlFor="">Comments</label>
                        <textarea {...register("review")} className='px-2' cols={36} rows={4} placeholder='Comments...' required />
                        {errors.review && <small>{errors.review.message}</small>}
                    </div>
                    <div className='star_rating'>
                        <label htmlFor="">Rating</label>
                        <div className='flex'>
                            {stars.map((star, index) => (
                                <FaStar
                                    key={index}
                                    size={24}
                                    className='star'
                                    color={(hover || rating) >= star ? '#ffc107' : '#999999'}
                                    onClick={() => setRating(star)} // Set rating on click
                                    onMouseEnter={() => setHover(star)} // Set hover effect
                                    onMouseLeave={() => setHover(null)} // Reset hover on mouse leave
                                />
                                
                            ))}
                                <span>{hover|| rating}/5</span>

                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <button className='bg-green-600 text-white px-2' type='submit'>Submit</button>
                    </div>
                </form>
                <abbr title="click to close">  <img className='close' src={close} width={20} alt="" onClick={() => setReview(false)} /></abbr>

            </div>
        </div>
    )
}

export default Review;

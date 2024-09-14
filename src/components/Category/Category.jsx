import React, { useState } from 'react'
import './category.css'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Category = () => {
    const schema = yup.object({
        Type: yup.string().required('Type is required'),
        Category: yup.string().required('Category is required'),
        pic: yup.mixed().required('Please upload an image')
    });

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const [images, setImages] = useState(null);
    const navigate=useNavigate()

    const handleFileChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            setImages(file);
        }
    };

    const onSubmit = async (data) => {
        data.pic = images;
        
        try {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
            });

            // Sending the form data
            const token=localStorage.getItem('user')
            const upload = await axios.post('https://ecomback-yhya.onrender.com/admin', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization':`Bearer ${token}`
                }
            });

            console.log(upload.data);
                alert(upload.data.message)
                navigate('/')
        } catch (error) {
            console.error('There was an error uploading the file:', error);
        }
    };

    return (
        <div className='category flex flex-col justify-center items-center capitalize '>
            <div className='category_container py-3 flex flex-col justify-center items-center w-80'>
                <h1 className='mb-4 underline'>Add Item</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
                    <div className='category_box'>
                        <label htmlFor="type">Type:</label>
                        <input className='ps-1 h-8' type="text" {...register('Type')} placeholder='Enter Type' />
                        {errors.Type && <small>{errors.Type.message}</small>}
                    </div>
                    <div className='category_box'>
                        <label htmlFor="category">Category:</label>
                        <select className='w-20' {...register('Category')}>
                            <option className='option1 italic' value="">Select</option>
                            <option value="men">Men</option>
                            <option value="women">Women</option>
                            <option value="kid">Kids</option>
                            <option value="all">All</option>
                        </select>
                        {errors.Category && <small>{errors.Category.message}</small>}
                    </div>
                    <div className="category_box">
                        <label htmlFor="pic">Image:</label>
                        <input type="file" {...register('pic')} accept='image/*' onChange={handleFileChange} />
                        {images && <img className='w-20 mt-2' src={URL.createObjectURL(images)} alt="Preview" />}
                        {errors.pic && <small>{errors.pic.message}</small>}
                    </div>
                    <div className="category_box">
                        <input className='category_button text-white capitalize h-10' type="submit" value='Upload' />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Category;

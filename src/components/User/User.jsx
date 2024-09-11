import React, { useState } from 'react';
import './user.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../redux/userSlice';
import { jwtDecode } from 'jwt-decode';
import Forgot from '../forgretPassword/Forgot';

const User = ({ setLoader }) => {
    const navigate = useNavigate();
    const [boxType, setBoxtype] = useState('login');
    const dispath = useDispatch()
    const [forgot, setForgot] = useState(false)
    const signupSchema = yup.object({
        FirstName: yup.string().required('First Name is required').matches(/^[a-z]+/i),
        LastName: yup.string().required('Last Name is required').matches(/^[a-z]+/i),
        Email: yup.string().email('Invalid email format').required('Email is required'),
        Mobile: yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits').required('Mobile is required'),
        Password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        Confirm_Password: yup.string().oneOf([yup.ref('Password'), null], 'Passwords must match').required('Confirm Password is required'),
    });

    const loginSchema = yup.object({
        userId: yup.string().required('Email/Mobile is required'),
        User_Password: yup.string().required('Password is required'),
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(boxType === 'login' ? loginSchema : signupSchema),
    });

    const handleSignup = async (data) => {
        console.log(data);
        if (data.Password !== data.Confirm_Password) {
            return alert('Confirm_Password does not match');
        }
        try {
            setLoader(true)
            const Sign = await axios.post('http://localhost:3200/signup', data);
            setLoader(false)
            alert(Sign.data);
            setBoxtype('login')
            navigate('/')
        } catch (error) {
            console.log(error);
            alert(error.response.data)
        }
    };

    const LoginSubmit = async (data) => {
        console.log(data);
        localStorage.setItem('email', data.userId)
        try {
            setLoader(true)
            const response = await axios.post('http://localhost:3200', data);
            alert(response.data.message);
            setLoader(false)
            localStorage.setItem('user', response.data.token);
            localStorage.removeItem('email')

            const token = localStorage.getItem('user');
            const decodedToken = jwtDecode(token);
            console.log(decodedToken);
            
            dispath(setUserData(decodedToken))

            navigate('/');
        } catch (error) {
            console.log(error);
            alert(error.response.data);
            setLoader(false)
        }
    };


    const handleBoxTypeChange = (type) => {
        setBoxtype(type);
        reset(); // This will clear the form state when switching between login and signup
    };

    return (
        <div>
            {forgot && <Forgot setForgot={setForgot}/>}

            <div className='user absolute w-screen p-3 h-screen lg:h-screen'>
                <h1 className='text-yellow-500 mt-2 font-serif italic text-4xl '>E-shop</h1>
                <div className='user-container flex flex-col '>

                    {boxType === "login" ?

                        <div className='login  py-10 mt-4'>

                            <form onSubmit={handleSubmit(LoginSubmit)} className='flex flex-col justify-center items-center py-4'>
                                <h3 className='create_account font-bold font-serif text-2xl mb-2 underline'>User Log in</h3>

                                <div className="flex  flex-col py-4 lg:w-60">
                                    <label htmlFor="" className='font-serif  text-white'>User Id</label>
                                    <input className='font-serif w-60 h-8 ps-1' {...register("userId")} type="text" placeholder='Enter Email/Mobile' />
                                    {errors.userId && <small>{errors.userId.message}</small>}
                                </div>

                                <div className="flex flex-col py- lg:w-60 ">
                                    <label htmlFor="" className='font-serif text-white'>Password</label>
                                    <input className='font-serif w-60 h-8 ps-1' {...register("User_Password")} type="password" placeholder='Password' />
                                    {errors.User_Password && <small>{errors.User_Password.message}</small>}
                                </div>

                                <div className="flex flex-col gap-3 pt-5 items-center ">
                                    <input className='bg-lime-800 h-10 rounded text-white font-semibold text-xl  w-60' type="submit" value={'Log in'} />
                                    <span className='text-white'>Don't have Account? <span className='click cursor-pointer' onClick={() => handleBoxTypeChange('create')}>Create_Account</span></span>
                                </div>
                                <div>
                                    <span className='text-orange-200 cursor-pointer' onClick={() => setForgot(true)}>Forgot Password</span>
                                </div>
                            </form>
                        </div>
                        :
                        <div className='sign_container  flex flex-col justify-center pt-2 pb-3  items-center '>
                            <h3 className='create_account font-bold font-serif text-3xl mb-2 underline'>Create Account</h3>
                            <form onSubmit={handleSubmit(handleSignup)} className='sign_up flex flex-col '>
                                <div className="flex flex-col sm:mt-2 ">
                                    <label htmlFor="" className='font-serif'>First Name</label>
                                    <input className='font-serif w-60 h-8 ps-1 capitalize' {...register("FirstName")} type="text" placeholder='First Name' />
                                    {errors.FirstName && <small>{errors.FirstName.message}</small>}
                                </div>

                                <div className="flex flex-col ">
                                    <label htmlFor="" className='font-serif'>Last Name</label>
                                    <input className='font-serif w-60 h-8 ps-1 capitalize' {...register("LastName")} type="text" placeholder='Last Name' />
                                    {errors.LastName && <small>{errors.LastName.message}</small>}
                                </div>

                                <div className="flex flex-col ">
                                    <label htmlFor="" className='font-serif'>Mobile</label>
                                    <input className='font-serif w-60 h-8 ps-1' {...register("Mobile")} type="number" placeholder='Mobile' />
                                    {errors.Mobile && <small>{errors.Mobile.message}</small>}
                                </div>

                                <div className="flex flex-col ">
                                    <label htmlFor="" className='font-serif'>Email</label>
                                    <input className='font-serif w-60 h-8 ps-1' {...register("Email")} type="text" placeholder='Email' />
                                    {errors.Email && <small>{errors.Email.message}</small>}
                                </div>

                                <div className="flex flex-col ">
                                    <label htmlFor="" className='font-serif'>Password</label>
                                    <input className='font-serif w-60 h-8 ps-1' {...register("Password")} type="password" placeholder='Password' />
                                    {errors.Password && <small>{errors.Password.message}</small>}
                                </div>

                                <div className="flex flex-col ">
                                    <label htmlFor="" className='font-serif'>Confirm_Password</label>
                                    <input className='font-serif w-60 h-8 ps-1' {...register("Confirm_Password")} type="password" placeholder='Confirm_Password' />
                                    {errors.Confirm_Password && <small>{errors.Confirm_Password.message}</small>}
                                </div>

                                <div className="flex flex-col gap-2 mt-2">
                                    <input className='sign_up_button font-serif  w-60 rounded h-10 bg-teal-700 text-white cursor-pointer hover:bg-teal-800' type="submit" value={'SIGN UP'} />
                                    <span className='text-white'>Have an Account? <span className='click cursor-pointer' onClick={() => handleBoxTypeChange('login')}>Login</span></span>
                                </div>
                            </form>
                        </div>
                    }
                </div>
            </div>
        </div>

    )
}

export default User;

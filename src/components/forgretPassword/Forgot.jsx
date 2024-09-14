import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import './forget.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Forgot = ({setForgot}) => {
    const schema = yup.object({
        Email: yup.string().email("Invalid email format").required("Email is required"),
        Mobile: yup.string().required("Mobile number is required").matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
        Password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
        ConfirmPassword: yup.string().oneOf([yup.ref('Password'), null], 'Passwords must match').required('Confirm password is required'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const result = await axios.post('https://ecomback-2.onrender.com/user/forgot', data)
            console.log(result);
            localStorage.removeItem('email')
            navigate('/')
            alert(result.data.message)
        } catch (error) {
            console.log(error);

            alert(error.response.data.message)
        }

    };

    const email = localStorage.getItem('email');

    return (
        <div className='forget_body'>
            <div className="forgot_Form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Email</label>
                        <input type="email" {...register('Email')} defaultValue={email} placeholder='Enter your Email' />
                        <small>{errors.Email?.message}</small>
                    </div>
                    <div>
                        <label>Mobile</label>
                        <input type="text" {...register('Mobile')} placeholder='Registered Mobile Number' />
                        <small>{errors.Mobile?.message}</small>
                    </div>
                    <div>
                        <label>New Password</label>
                        <input type="password" {...register('Password')} placeholder='New Password' />
                        <small>{errors.Password?.message}</small>
                    </div>
                    <div>
                        <label>Confirm Password</label>
                        <input type="password" {...register('ConfirmPassword')} placeholder='Confirm Password' />
                        <small>{errors.ConfirmPassword?.message}</small>
                    </div>
                    <div>
                        <button type='submit'>Change Password</button>
                    </div>
                </form>
                <span className='backto' onClick={()=>setForgot(false)}>Back to Login Page</span>
            </div>
        </div>
    );
};

export default Forgot;

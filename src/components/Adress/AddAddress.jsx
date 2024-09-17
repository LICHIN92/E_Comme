import React from 'react';
import './address.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const AddAddress = ({ setBook }) => {
    const schema = yup.object({
        AddressLine1: yup.string().required("Address Line 1 is required."),
        AddressLine2: yup.string().required("Address Line 2 is required."),
        AddressLine3: yup.string().required("Address Line 3 is required."),
        PIN: yup.string().length(6, "PIN code must be exactly 6 digits.").required("PIN code is required.")
    });

    const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    const submit = async (data) => {
        const token = localStorage.getItem('user');
        // console.log(token);

        // console.log(data); // You can handle your form data here
        try {
            const result = await axios.post('https://ecomback-1.onrender.com/user/address', data, {
                headers: {
                    "authorization": `Bearer ${token}` // Added space after 'Bearer'
                }
            });
            console.log(result);

            alert(result.data.message)
            localStorage.setItem('user', result.data.token)
            setBook(true)

        } catch (error) {
            console.log(error);
            alert(error.response.data)
        }
    };

    return (
        <div className='address_container'>
            <form onSubmit={handleSubmit(submit)}>
                <div className='addressform'>
                    <h1>add your address</h1>
                    <div className="address">
                        <label htmlFor="AddressLine1">Address Line 1</label>
                        <input {...register('AddressLine1')} type="text" />
                        {errors.AddressLine1 && <small>{errors.AddressLine1.message}</small>}
                    </div>
                    <div className="address">
                        <label htmlFor="AddressLine2">Address Line 2</label>
                        <input {...register('AddressLine2')} type="text" />
                        {errors.AddressLine2 && <small>{errors.AddressLine2.message}</small>}
                    </div>
                    <div className="address">
                        <label htmlFor="AddressLine3">Address Line 3</label>
                        <input {...register('AddressLine3')} type="text" />
                        {errors.AddressLine3 && <small>{errors.AddressLine3.message}</small>}
                    </div>
                    <div className="address">
                        <label htmlFor="PIN">PIN Code</label>
                        <input {...register('PIN')} type="number" />
                        {errors.PIN && <small>{errors.PIN.message}</small>}
                    </div>
                    <div className='addresButton mt-3'>
                        <button type='submit'>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddAddress;

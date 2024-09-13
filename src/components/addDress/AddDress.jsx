import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import addImage from '../../assets/addImage.svg'
import './addDress.css'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import closeImg from '../../assets/close.svg'
import Loader from '../loader/Loader';
import { useNavigate } from 'react-router-dom';
const AddDress = () => {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState([])
    const fileInputRef = useRef()
    const sizeOption = ['S', 'M', 'L', 'XL', 'XXL']
    const [selectedSize, setSize] = useState([])
    const [loader, setLoader] = useState(false)
    const navigate=useNavigate()
    const schema = yup.object({
        Type: yup.string().required('Type is required'),
        Category: yup.string().required('Category is required'),
        Name: yup.string().required('Name is required'),
        Fabric: yup.string().required('Fabric is required'),
        Price: yup.string().required('Price is required'),
        Size: yup.array(),
        Quantity: yup.string().required('Quantity is required'),
        pic: yup.mixed()
    });
    const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(schema) })

    const handleChange = (e) => {
        const filesArray = [...e.target.files]; // Convert FileList to an array
        setImages(filesArray); // Update the images state
        setSelectedImage(prev => [...prev, ...filesArray]); // Append the new files to selectedImage

        console.log('Selected Images:', selectedImage); // This might still log the previous state
       
    };

    const handleFile = (e) => {
        e.preventDefault()
        if (fileInputRef.current) {
            fileInputRef.current.click()

        }
    }
   
    const handleCheckBoxChange = (size) => {
        setSize((prevSelectedSize) =>
            prevSelectedSize.includes(size)
                ? prevSelectedSize.filter((i) => i !== size)
                : [...prevSelectedSize, size]
        );
        console.log(selectedSize);

    };

    const imgFilter = (item) => {
        console.log('kmjbh');

        setSelectedImage((prev) => prev.filter((i) => i !== item));
    };

    const addSubmit = async (data) => {
        data.files = selectedImage
        const type=data.Type
        if (selectedSize) {
            data.Size = selectedSize
        } if (selectedImage.length == 0) {
            
            return alert('please add images')
        }
        console.log(selectedImage);
        console.log(selectedSize);
        console.log(data);

        try {
            setLoader(true)
            const token=localStorage.getItem('user')
            const result = await axios.post('https://ecomback-sli5.onrender.com/admin/addNewDress', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "authorization": `Bearer ${token}` // Added space after 'Bearer'
                }
            })
            setLoader(false)
            console.log(result);
        navigate('/itemView', { replace: false, state: { data: {}, type: type } });

            alert(result.data)


        } catch (error) {
            console.log(error)
            alert(error.response.data)
        }
    }
    return (
        <div className='addDress flex flex-col items-center'>
            {loader&& <Loader/>}
            <h1>add dress</h1>
            <form onSubmit={handleSubmit(addSubmit)} className='grid  md:border rounded py-3 md:px-2 lg:px-4  grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full'>

                <div className='input_box '>
                    <label htmlFor="">Type :</label>
                    <select name="" id="" {...register('Type')}>
                        <option value="">select</option>
                        <option value="Nighty">Nighty</option>
                        <option value="Kavi Dhoti">Kavi Dhoti</option>
                        <option value="dhoti">Dhoti</option>
                        <option value="lungi">Lungi</option>
                        <option value="T-Shirt">T-Shirt</option>
                        <option value="saree">Sarees</option>
                        <option value="churidhar">Churidhar</option>
                        <option value="color dhoti">Color Dhoti</option>
                    </select>
                    {errors.Type && <small> {errors.Type.message}</small>}
                </div>

                <div className='input_box'>
                    <label htmlFor="">Category :</label>
                    <select name="" id="" {...register('Category')}>
                        <option value="" >select</option>
                        <option value="women">Women</option>
                        <option value="men">Men</option>
                        <option value="kid">Kid</option>
                    </select>
                    {errors.Category && <small> {errors.Category.message}</small>}

                </div>

                <div className='input_box '>
                    <label htmlFor="">Name :</label>
                    <input type="text"  {...register('Name')} />
                    {errors.Name && <small>{errors.Name.message}</small>}
                </div>

                <div className='input_box '>
                    <label htmlFor="">Fabric :</label>
                    <input type="text"  {...register('Fabric')} />
                    {errors.Fabric && <small> {errors.Fabric.message}</small>}
                </div>

                <div className='input_box '>
                    <label htmlFor="">Price :</label>
                    <input type="number"  {...register('Price')} />
                    {errors.Price && <small> {errors.Price.message}</small>}

                </div>

                <div className='input_box '>
                    <label htmlFor="">Size :</label>
                    {/* <input type="text" {...register('Size')} /> */}
                    <div className='flex flex-row flex-wrap gap-1'>

                        {sizeOption.map((size, index) => <div key={index} className='flex items-center  gap-1 mx-1'>
                            <span className='spanSize' htmlFor={index}>{size}</span>
                            <input className='check' type="checkbox" name="" id={index}
                                onChange={() => handleCheckBoxChange(size)}
                            />
                        </div>
                        )}
                    </div>
                    {/* {selectedSize.length == 0 && errors.Size && <small> {errors.Size.message}</small>} */}
                    {errors.Size && <small> {errors.Size.message}</small>}
                </div>

                <div className='input_box '>
                    <label htmlFor="">Quantity :</label>
                    <input type="number" {...register('Quantity')} />
                    {errors.Quantity && <small> {errors.Quantity.message}</small>}

                </div>

                <div className='input_box'>
                    <label htmlFor="">Add Image :</label>
                    <input type="file"
                        ref={fileInputRef}
                        multiple
                        accept='image/*'
                        onChange={handleChange}
                        style={{ display: 'none' }} />
                    <img className='addImage cursor-pointer' src={addImage} onClick={handleFile} />
                    <div className=" flex flex-wrap gap-1">
                        {selectedImage.map((file, index) =>
                            <div className='imageprev' key={index}>
                                <img className='veiwingImage' src={URL.createObjectURL(file)} key={index} alt='sleected image' />
                                <img onClick={() => imgFilter(file)} className='close' src={closeImg} alt="close" />
                            </div>

                        )}
                    </div>
                    {selectedImage.length === 0 ?<small>{'Add images'}</small>:null}

                </div>

                <div className='col-span- md:col-span-2 lg:col-span-3 flex justify-center'>
                    <button className='addbutton' type='submit'>Add </button>

                </div>

            </form>
        </div>
    )
}

export default AddDress
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Detail.css';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Book from '../booking/Book';
import { useSelector } from 'react-redux';
import AddAddress from '../Adress/AddAddress';
import axios from 'axios';

const Details = () => {
    const location = useLocation();
    const { data: initialData } = location.state || {}; // Safely accessing state
    const { user } = useSelector((state) => state.user.user);
    console.log(user.user);

    const [data, setData] = useState(initialData);
    const [book, setBook] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [address, setAddress] = useState(false);
    const [refresh, setrefresh] = useState(false)
    const [type, setType] = useState('')
    const navigate = useNavigate()

    const id = initialData?._id;

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const result = await axios.get(`https://ecomback-2.onrender.com/product/${id}`);
                setData(result.data);
                setType(data.Type)
                console.log(result.data);

                if (data=="" || data==undefined) {
                    navigate('/itemView', { replace: false, state: { data: {}, type: type } });

                }


            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        if (id) {
            fetchDetail();
        }
    }, [id, book, refresh]);

    const handleIndexChange = (direction) => {
        if (direction === '1') {
            setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : data.Pics.length - 1));
        } else {
            setCurrentIndex((prevIndex) => (prevIndex < data.Pics.length - 1 ? prevIndex + 1 : 0));
        }
    };
    const deleting = async (id) => {
        console.log(id);
        try {
            const dele = await axios.delete(`https://ecomback-2.onrender.com/product/${id}`)
            console.log(dele);
            alert(dele.data.message)
            setrefresh(true)
            navigate('/itemView', { replace: false, state: { data: {}, type: type } });
        } catch (error) {
            console.log(error);

        }

    }

    if (!data) return <div className='NoDetail'>Loading...</div>;

    return (
        <div className={book ? 'book' : 'Detail'}>
            {book && (address || user?.AddressLine1 ? (
                <Book data={data} setBook={setBook} />
            ) : (
                <AddAddress setBook={setAddress} />
            ))}
            <div className='imageBox'>
                <img src={data.Pics[currentIndex]} alt={data.Name || "Product Image"} />
                <div className='flex'>
                    <IoIosArrowBack className='arrow' onClick={() => handleIndexChange('1')} />
                        <span>{currentIndex+1}/{data.Pics.length }</span>
                    <IoIosArrowForward className='arrow' onClick={() => handleIndexChange('2')} />
                </div>
                <p className='name'>{data.Name}</p>
            </div>
            <div className='info'>
                <span className='font-bold'>Type:</span>
                <span className='data'>{data.Type}</span>
            </div>
            <div className='info'>
                <span className='font-bold'>Price:</span>
                <span className='data'>₹ {data.Price}/-</span>
            </div>
            <div className='info'>
                <span className='font-bold'>Material:</span>
                <span className='data'>{data.Fabric}</span>
            </div>
            <div className='info'>
                <span className='font-bold'>Available:</span>
                {data.Quantity > 0 ?
                    <span className='data'>{data.Quantity} left</span> :
                    <span className='data'>not available</span>

                }
            </div>
            {data.Size?.length > 0 && (
                <div className='flex gap-2'>
                    <span className='font-bold'>Size:</span>
                    {data.Size.map((size, index) => (
                        <span className='size' key={index}>{size}</span>
                    ))}
                </div>
            )}
            {!user.user && data.Quantity > 0 && (
                <div className='buyBox'>
                    <button className='buyButton' onClick={() => setBook(true)}>Buy Now</button>
                    <button className='buyButton'>Add to Cart</button>
                </div>
            )}
            {user.user &&
                <div className='buyBox'>
                    <button className='Delete' onClick={() => deleting(data._id)}>Delete</button>
                </div>
            }
        </div>
    );
};

export default Details;

import React, { useState } from 'react'
import './modal.css'
import close from '../../../assets/close.svg'

const Modl = ({ setModal }) => {
    const [language, setLanguage] = useState(false)
    return (
        <div className='modal_container'>
            <img className=' lg:w-8 lg:h-10 w-8 h-6 ' src={close} onClick={() => setModal(false)} alt='close'/>
            <div className='info_box'>
                <div className='heading'>
                    <h2 className='font-serif font-semibold'>E-shop</h2>
                </div>
                {!language ?
                    <p> 
                    <b>Welcome to E-shop</b> <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<i>E-shop</i> is a local startup offering a limited range of quality clothing and more. 
                    Currently serving the Kayakkodi area, we provide a seamless shopping experience with flexible payment options. 
                    Whether you prefer to pay in installments or make a one-time purchase, we've got you covered. 
                    Sign up for an account and start shopping today!
                    <br /><br />  
                    &nbsp;&nbsp;&nbsp;&nbsp;Your support helps us grow and continue bringing the best to our community. 
                    Thank you for choosing Eshop!
                </p>
                
                    : <p>
                        <b>Welcome to E-shop</b>
                    </p>

                }
                {/* <div className='ee'>
                    {language ? <button onClick={() => setLanguage(!language)}>Enlish</button> :
                        <button onClick={() => setLanguage(!language)}>മലയാളം</button>}
                </div> */}
            </div>
        </div>
    )
}

export default Modl
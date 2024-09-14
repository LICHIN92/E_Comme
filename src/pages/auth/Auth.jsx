import React, { useState } from 'react'
import User from '../../components/User/User'
import Loader from '../../components/loader/Loader'
import './auth.css'
const Auth = () => {
    const [loader, setLoader] = useState(false)
    return (
        <div className='auth'>
            {loader && <Loader />}

        
            <User setLoader={setLoader} />
           
        </div>
    )
}

export default Auth
import React from 'react'
import gear from '../../assets/loader.svg'
import './loader.css'

const Loader = () => {
  return (
    <div className='loader flex justify-center items-center'>
        <div className='loader_box flex flex-col items-center'>
            <span>Please wait ...</span>
            <img src={gear} alt="" />

        </div>
    </div>
  )
}

export default Loader
import React, { useState } from 'react';
import './NavBar.css'
import { FaTimes } from 'react-icons/fa'
import { ImMenu } from 'react-icons/im';
import { jwtDecode } from 'jwt-decode';
import { FaRegCircleUser } from 'react-icons/fa6';
import { Link as ScrollLink } from 'react-scroll';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const NavBar = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const token = localStorage.getItem('user')
  const decodedToken = token ? jwtDecode(token) : null;
  // console.log(decodedToken);
  // const user = decodedToken
  // console.log(user);
  const { user } = useSelector(state => state.user)
  console.log(user?.user?.user);

  const handleClick = () => {
    setShow(!show)
  }
  const addsection=()=>{
    setShow(!show)
    navigate('/AddCategory')
  }
  const LogoutFunction = () => {
    handleClick()
    localStorage.removeItem('user')
    navigate('/')
  }
  const content = (
    <div className='un_order text-orange-500 lg:hidden block absolute z-10 top-9 w-full  left-0 right-0 transition'>
      <hr />
      <ul className='text-start flex flex-col gap-1.5 text-[15px] font-serif ps-3 '>
        <li onClick={handleClick}><Link className='link' to='/'>HOME</Link> </li>
        <li onClick={handleClick}><ScrollLink className='link' spy={true} smooth={true} to="about">ABOUT</ScrollLink> </li>
        {/* <li>ITEMS</li> */}
        <li onClick={handleClick}><Link className='link' to=''>CONTACT</Link></li>

        {token && user && user.user.user &&
          <li onClick={addsection}><Link className='link' to=''>ADD_ITEM</Link></li>
        }

        {!token &&
          <li className='link cursor-pointer' onClick={() => navigate('/user')}>SIGNIN</li>
        }
        {token && user && user.user &&
          <>
            <li onClick={() => navigate('/user/profile')} className='uppercase flex gap-1 items-center' > {user.user.FirstName} </li>
            <li onClick={LogoutFunction}><button className='btn btn-danger py-0 px-1 capitalize'>Logout</button></li>
          </>

        }
      </ul>
    </div>
  )
  return (
    <>
      <div className=' flex flex-row justify-between items-center py-1 px-3 bg-slate-700'>
        <div className='pt-1'>
          <span className='text-orange-500 text-3xl lg:text-3xl font-bold font-serif italic'>E-shop</span>
        </div>
        <div >
          <ul className='un_order uppercase lg:flex flex-row justify-center items-center pt-3 gap-4 text-orange-500 text-[15px] me-4 font-serif hidden'>
            <li onClick={handleClick}><Link className='link' to='/'>HOME</Link> </li>
            <li onClick={handleClick}><ScrollLink className='link' spy={true} smooth={true} to="about">ABOUT</ScrollLink> </li>
            <li onClick={handleClick}><Link className='link' to=''>CONTACT</Link></li>
            {token && user && user.user.user  &&
              <li onClick={addsection}><Link className='link' to=''>ADD_ITEM</Link></li> 
            }
            {token && user && user.user &&
              <>
                <li className='uppercase flex gap-1 items-center ' onClick={() => navigate('/user/profile')} ><FaRegCircleUser />{user.user.FirstName} </li>
                <li onClick={LogoutFunction}><button className='btn btn-danger py-0 px-1 capitalize'>Logout</button></li>
              </>
            }
            {!token &&
              <li className='cursor-pointer' onClick={() => navigate('/user')}>Signin</li>
            }
          </ul>
          {show && content}

        </div>

        <button className='block text-2xl lg:hidden transition text-orange-500' onClick={handleClick} >
          {show ? <FaTimes /> : <ImMenu />}

        </button>
      </div>

    </>
  );
}

export default NavBar;


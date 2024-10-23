import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'


const Adminprotect = ({ children }) => {
  const { user } = useSelector((state) => state.user.user);
  // console.log(user?.user);

  const token = localStorage.getItem('user')
  if (token && user?.user) {
    return children

  }
  return <Navigate to={'/'} replace />

}

export default Adminprotect
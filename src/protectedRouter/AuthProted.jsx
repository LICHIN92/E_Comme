import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

const AuthProted = ({children }) => {
    const token = localStorage.getItem('user')
    if (token) {
        return <Navigate to={'/'} replace/>
    }
    return children
}


export default AuthProted


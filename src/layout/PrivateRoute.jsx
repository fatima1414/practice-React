import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    const [authUser,setAuthUser] = useState({})
    useEffect(()=>{
        onAuthStateChanged(auth,(result)=>{
         setAuthUser(result)
        })
    })
  return authUser!=null ? <Outlet/> : <Navigate to='/signin' />

}

export default PrivateRoute
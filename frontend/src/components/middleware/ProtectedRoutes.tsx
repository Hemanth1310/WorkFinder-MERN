import React from 'react'
import { useAuthContextData } from '../../utils/useAuthContextData'
import Loading from '../layouts/Loading'
import { Navigate, Outlet } from 'react-router'


const ProtectedRoutes = () => {
    const {userData,isLoading} = useAuthContextData()

    if(isLoading){
       return <Loading/>
    }
    if(userData){
        return <Outlet/>
    }

  return <Navigate to='/'/>
}

export default ProtectedRoutes
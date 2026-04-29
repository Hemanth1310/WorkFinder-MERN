import React from 'react'
import { useAuthContextData } from '../../utils/useAuthContextData'
import { Navigate, useParams } from 'react-router'

const Opening = () => {
     const {userData} = useAuthContextData()
     const {id} = useParams()

    if(userData.role==='CANDIDATE'){
        return <Navigate to='/'/>
    }
  return (
    <div>Opening : {id}</div>
  )
}

export default Opening
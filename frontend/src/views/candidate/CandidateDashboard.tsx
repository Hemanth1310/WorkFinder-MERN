import React from 'react'
import Sidebar from '../../components/layouts/Sidebar'

const CandidateDashboard = () => {
  return (
    <div className='w-full h-full flex'>
        <Sidebar/>
         <div className="flex-5 min-h-full rounded-2xl p-5 box-border">
          Home
          </div> 
    </div>
  )
}

export default CandidateDashboard
import { Snail } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
    <div className='w-full h-16 shadow-md flex justify-center'>
      <div className='container h-full flex items-center '>
        <div className='flex gap-2 items-center'>
          <div className='h-8 w-8 bg-brand-primary rounded-lg flex items-center justify-center'>
              <Snail  color='rgb(224 231 255)'/>
          </div>
           <p className='font-mono'>Work/Finder</p>
           </div>
      </div>

      
    </div>
  )
}

export default Header
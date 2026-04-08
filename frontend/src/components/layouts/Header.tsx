import { Snail } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
    <div className='w-full h-16 flex'>
        <div className='flex gap-2 items-center'>
          <div className='h-8 w-8 bg-brand-primary rounded-lg flex items-center justify-center'>
              <Snail  color='rgb(224 231 255)'/>
          </div>
           <p className='font-mono'>Work/Finder</p>
           </div>

      
    </div>
  )
}

export default Header
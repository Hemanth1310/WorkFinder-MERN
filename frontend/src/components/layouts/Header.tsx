import { Snail } from 'lucide-react'
import React,{useState} from 'react'
import AuthLayout from './AuthLayout'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const isLoggedIn = true
    const onClose = ()=>{
        setIsOpen(prev=>!prev)
    }
  return (
    <div className='w-full h-16 flex items-center justify-between pr-5 pl-5'>
        <div className='flex gap-2 items-center'>
          <div className='h-8 w-8 bg-brand-primary rounded-lg flex items-center justify-center'>
              <Snail  color='rgb(224 231 255)'/>
          </div>
           <p className='font-mono'>Work/Finder</p>
        </div>
        {isLoggedIn?
        <div>
          <button className='' onClick={()=>setIsOpen(true)}>Login</button>
        </div> :
        <div>
          </div>}

      <AuthLayout isOpen={isOpen} onClose={onClose}/>
    </div>
  )
}

export default Header
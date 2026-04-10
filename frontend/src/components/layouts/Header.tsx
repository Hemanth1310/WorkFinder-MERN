import { ChevronDown, CircleUserIcon, LucideLogOut, Snail } from 'lucide-react'
import { useState } from 'react'
import AuthLayout from './AuthLayout'
import { useAuthContextData } from '../../utils/useAuthContextData'
import { toast } from 'react-toastify'
import axios from '../../utils/authMiddleware'

const BASE_API_URL = import.meta.env.VITE_API_URL
const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const {userData, updateUser} = useAuthContextData()
    const onClose = ()=>{
        setIsOpen(prev=>!prev)
    }

    const handleLogout=async()=>{
      try{
          const response = await axios.get(`${BASE_API_URL}/api/private/logout`)
          if(!response.status){
            throw new Error("Login failed")
          }
          updateUser(null)
          setIsDropDownOpen(false)
           toast.success('Logout Successful',{
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
        })
      }catch(err){
         toast.error('Logout Failed',{
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
        })
        console.log(err)
      }
    }
  return (
    <div className='w-full h-16 flex items-center justify-between pr-5 pl-5'>
        <div className='flex gap-2 items-center'>
          <div className='h-8 w-8 bg-brand-primary rounded-lg flex items-center justify-center'>
              <Snail  color='rgb(224 231 255)'/>
          </div>
           <p className='font-mono'>Work/Finder</p>
        </div>
        {!userData?
        <div>
          <button className='hover:border-b-2 hover:border-b-brand-primary' onClick={()=>setIsOpen(true)}>Login</button>
        </div> :
        <div className='relative flex gap-1'>
          <div className='flex flex-col items-center' onClick={()=>setIsDropDownOpen(prev=>!prev)}>
            <CircleUserIcon/>
            <div className='flex items-center' >
              <p className='text-xs'>
                            {userData.firstName[0].toUpperCase()+userData.firstName.slice(1)}
              </p>
              <span><ChevronDown className={`${isDropDownOpen && 'rotate-180'}`} size={14} /></span>
            </div>
            
                        
          </div>
          {isDropDownOpen && 
          <div className='absolute top-12 right-0 w-40 bg-mist-50 border-2 border-mist-200 rounded-lg pt-3 pb-3'>
              <div className='flex items-center gap-2 w-full h-10 pl-3 pr-3 hover:bg-indigo-300'>
                <p className='text-sm'>Hello, {userData.firstName}</p>
              </div>
              <div className='flex items-center gap-2 w-full h-10 pl-3 pr-3 hover:bg-indigo-300' onClick={handleLogout}>
                <LucideLogOut size={14}/>
                <p className='text-sm'>Logout</p>
              </div>
            </div>}
         
        </div>}

      <AuthLayout isOpen={isOpen} onClose={onClose}/>
    </div>
  )
}

export default Header
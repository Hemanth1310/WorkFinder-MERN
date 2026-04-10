import React, { useState } from 'react'
import { loginDetailSchema } from '../../utils/typechecker'
import axios from '../../utils/authMiddleware'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import { useAuthContextData } from '../../utils/useAuthContextData'
import type { User } from '../../types'

const BASE_API_URL = import.meta.env.VITE_API_URL

type Props = {
    handleToggle:(tab:string)=>void,
    onClose:()=>void
}

const Login = ({handleToggle, onClose}: Props) => {
    const navigate = useNavigate()
    const [errors, setErrors] = useState({
        email:"",
        password:"",
        apiResponse:""
    })
    const {updateUser} = useAuthContextData()
    
    const handleForm =async(formData: FormData) =>{
        const logindetails =Object.fromEntries(formData.entries())
        const parsedLoginDetails = loginDetailSchema.safeParse(logindetails)
        if(!parsedLoginDetails.success){
            for(const issue of parsedLoginDetails.error.issues)
            {
                setErrors(prev=>({...prev,[issue.path[0]]:issue.message}))
            }
        }

        try{
           const {data} = await axios.post(`${BASE_API_URL}/api/auth/login`,parsedLoginDetails.data)
             toast.success('Login Successful',{
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    })
              if(!data){
                throw new Error("Login Failed")
              }      
            updateUser(data.payload as User)
            onClose()   
            navigate('/')

        }catch(err){
            if(err instanceof AxiosError){
                setErrors(prev=>({...prev,apiResponse:err.response.data.error}))
            }
            setErrors(prev=>({...prev,apiResponse:"Unexpected Error Occured. Try again Later!"}))
            toast.error('Login Failed',{
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    })
            }  
    }
  return (
    <form action={handleForm} className='w-full h-full flex flex-col items-center gap-5'>
        <div className='flex w-full flex-col gap-2'>
            <label >Username:</label>
            <input name='email' type='email' className='w-full border-2 rounded-lg border-mist-200 text-lg p-1' placeholder=''></input>
            {errors.email && <p className='text-xs text-red-500'>{errors.email}</p>}
        </div>
        <div className='flex w-full flex-col gap-2'>
            <label >Password:</label>
            <input name='password' type='password' className='border-2 rounded-lg border-mist-200 text-lg p-1' placeholder=''></input>
             {errors.password && <p className='text-xs text-red-500'>{errors.password}</p>}
        </div>
        {errors.apiResponse && <p className='text-xs text-red-500'>Login Failed: {errors.apiResponse}</p>}
        <button className='w-full h-10 p-1 bg-brand-primary rounded-lg text-white'>Login</button>
        
        <p>Not registered ? <span className='text-blue-500' onClick={()=>handleToggle('register')}>Register Here</span></p>
        
    </form>
  )
}

export default Login
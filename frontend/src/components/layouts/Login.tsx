import React, { useState } from 'react'
import { loginDetailSchema } from '../../utils/typechecker'

type Props = {
    handleToggle:(tab:string)=>void
}

const Login = ({handleToggle}: Props) => {
    const [errors, setErrors] = useState({
        email:"",
        password:""
    })
    
    const handleForm =(formData: FormData) =>{
        const logindetails =Object.fromEntries(formData.entries())
        const parsedLoginDetails = loginDetailSchema.safeParse(logindetails)
        if(!parsedLoginDetails.success){
            for(const issue of parsedLoginDetails.error.issues)
            {
                setErrors(prev=>({...prev,[issue.path[0]]:issue.message}))
            }
        }

        console.log(parsedLoginDetails.data)


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
        <button className='w-full h-10 p-1 bg-brand-primary rounded-lg text-white'>Login</button>
        
        <p>Not a user ? <span className='text-blue-500' onClick={()=>handleToggle('register')}>Register Here</span></p>
        
    </form>
  )
}

export default Login
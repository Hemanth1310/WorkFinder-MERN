import React, { useState } from 'react'
import { registerSchema } from '../../utils/typechecker'

type Props = {
    handleToggle:(tab:string)=>void
}

const Register = ({handleToggle}: Props) => {
  const [errors, setErrors] = useState({
          email:"",
          password:"",
          firstName:"",
          lastName:"",
          role:""
      })
      
      const handleForm =(formData: FormData) =>{
          const registerdetails =Object.fromEntries(formData.entries())
          const parsedRegisterDetails = registerSchema.safeParse(registerdetails)
          if(!parsedRegisterDetails.success){
              for(const issue of parsedRegisterDetails.error.issues)
              {
                  setErrors(prev=>({...prev,[issue.path[0]]:issue.message}))
              }
          }
  
          console.log(parsedRegisterDetails.data)
  
  
      }
    return (
      <form action={handleForm} className='w-full h-full flex flex-col items-center gap-5'>
          <div className='flex w-full flex-col gap-2'>
              <label >Username:</label>
              <input name='email' type='email' className='w-full border-2 rounded-lg border-mist-200 text-lg p-1' placeholder=''></input>
              {errors.email && <p className='text-xs text-red-500'>{errors.email}</p>}
          </div>
          <div className='flex w-full flex-col gap-2'>
              <label >First Name:</label>
              <input name='firstName' type='text' className='border-2 rounded-lg border-mist-200 text-lg p-1' placeholder=''></input>
               {errors.firstName && <p className='text-xs text-red-500'>{errors.firstName}</p>}
          </div>
          <div className='flex w-full flex-col gap-2'>
              <label >Last Name:</label>
              <input name='lastName' type='text' className='border-2 rounded-lg border-mist-200 text-lg p-1' placeholder=''></input>
               {errors.lastName && <p className='text-xs text-red-500'>{errors.lastName}</p>}
          </div>
           <div className='flex w-full gap-2 items-center'>
              <label >Last Name:</label>
              <div className=" border border-mist-200   box-border text-sm rounded-md p-3">
                <select className="w-full outline-none" name='role'>
                        <option value='CANDIDATE' >CANDIDATE</option>
                        <option value='EMPLOYER'>EMPLOYER</option>
                </select>
                </div>
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

export default Register
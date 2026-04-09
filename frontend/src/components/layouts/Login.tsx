import React from 'react'

type Props = {
    handleToggle:(tab:string)=>void
}

const Login = ({handleToggle}: Props) => {

  return (
    <div className='w-full h-full flex flex-col items-center gap-5'>
        <div className='flex w-full flex-col gap-2'>
            <label >Username:</label>
            <input type='email' className='w-full border-2 rounded-lg border-mist-200 text-lg p-1' placeholder=''></input>
        </div>
        <div className='flex w-full flex-col gap-2'>
            <label >Password:</label>
            <input type='password' className='border-2 rounded-lg border-mist-200 text-lg p-1' placeholder=''></input>
        </div>
        <button className='w-full h-10 p-1 bg-brand-primary rounded-lg text-white'>Login</button>
        
        <p>Not a user ? <span className='text-blue-500' onClick={()=>handleToggle('register')}>Register Here</span></p>
        
    </div>
  )
}

export default Login
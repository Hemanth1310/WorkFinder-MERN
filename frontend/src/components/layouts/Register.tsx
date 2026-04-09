import React from 'react'

type Props = {
    handleToggle:(tab:string)=>void
}

const Register = ({handleToggle}: Props) => {
  return (
    <div>
        Register
        <button onClick={()=>handleToggle('login')}>Login</button>
    </div>
  )
}

export default Register
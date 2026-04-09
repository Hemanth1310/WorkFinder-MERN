import React,{useState} from 'react'
import Model from './Model';
import Login from './Login';
import Register from './Register';

type Props = {
    isOpen:boolean;
    onClose:()=>void;
}

const AuthLayout = ({isOpen, onClose}: Props) => {
    const [toggle,setToggle] = useState('login')
    const ActiveTab = toggle==='login'?Login:Register
    const title = toggle==='login'?"Login":"Register"

    const handleToggle = (tab:string) =>{
        setToggle(tab)
    }
    
  return (
   <Model isOpen={isOpen} onClose={onClose} title={title}>
        <ActiveTab handleToggle={handleToggle}/>
   </Model>
  )
}

export default AuthLayout
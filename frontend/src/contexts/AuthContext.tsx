import { useEffect, useState, type ReactNode } from "react"
import type { User } from "../types"
import { AuthContext } from "./authContextValue"
import axios from '../utils/authMiddleware'
import { AxiosError } from "axios"
type AuthContextProviderType = {
    children: ReactNode
}

const BASE_API_URL = import.meta.env.VITE_API_URL

const AuthContextProvider = ({children}:AuthContextProviderType)=>{
    const [userData,setUserData] = useState<User|null>(null)
    const [isLoading,setIsLoding] = useState(true)

    const updateUser=(data:User)=>{
        console.log(data)
        setUserData(data)
        setIsLoding(false)
    }

    useEffect(()=>{
        const tokenValidetor =async ()=>{
            try{
                const {data} = await axios.post(`${BASE_API_URL}/api/private/user-details`)
                if(data){
                    updateUser(data as User)
                }
            }catch(err){
                if(err instanceof AxiosError){
                    console.log(err.response.data.error)
                }else{
                    console.log("Unexpected Error occured")
                }
                setIsLoding(false)
            }
        }
        tokenValidetor()
    },[])
    return(
    <AuthContext.Provider value={{userData,updateUser,isLoading}}>
        {children}
    </AuthContext.Provider>)
}

export default AuthContextProvider


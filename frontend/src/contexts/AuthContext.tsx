import { useEffect, useState, type ReactNode } from "react"
import type { User } from "../types"
import { AuthContext } from "./authContextValue"
import axios from '../utils/authMiddleware'
import { AxiosError } from "axios"
type AuthContextProviderType = {
    children: ReactNode
}

const BASE_API_URL = import.meta.env.VITE_API_URL
const hasAuthCookie = () =>
    document.cookie
        .split(';')
        .some((cookie) => cookie.trim().startsWith('hasAuth='))

const AuthContextProvider = ({children}:AuthContextProviderType)=>{
    const [userData,setUserData] = useState<User|null>(null)
    const [isLoading,setIsLoding] = useState(hasAuthCookie)

    const updateUser=(data:User | null)=>{
        console.log(data)
        setUserData(data)
        setIsLoding(false)
    }

    useEffect(()=>{
        if (!hasAuthCookie()) {
            return
        }

        const tokenValidetor =async ()=>{
            try{
                const {data} = await axios.post(`${BASE_API_URL}/api/private/user-details`)
                if(data?.payload){
                    updateUser(data.payload as User)
                } else {
                    setIsLoding(false)
                }
            }catch(err){
                if(err instanceof AxiosError){
                    console.log(err.response?.data?.error)
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


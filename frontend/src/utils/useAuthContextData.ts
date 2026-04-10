import { useContext } from "react"
import { AuthContext } from "../contexts/authContextValue"

export const useAuthContextData = ()=>{
    const authContext = useContext(AuthContext)

    if (!authContext) {
        throw new Error("useAuthContextData must be used within AuthContextProvider")
    }

    return authContext
}
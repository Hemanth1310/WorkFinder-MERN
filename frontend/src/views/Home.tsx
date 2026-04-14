import Loading from "../components/layouts/Loading"
import { useAuthContextData } from "../utils/useAuthContextData"
import EmployerDashboard from "./admin/EmployerDashboard"
import CandidateDashboard from "./candidate/CandidateDashboard"

const Home = () => {

    const {userData} = useAuthContextData()

    if(!userData){
        return 
    }

    if(userData.role==='CANDIDATE'){
        return <CandidateDashboard/>
    }

    if(userData.role==='EMPLOYER'){
        return <EmployerDashboard/>
    }
    
  return (
    <Loading/>
  )
}

export default Home
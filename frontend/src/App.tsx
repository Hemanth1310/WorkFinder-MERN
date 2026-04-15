import { BrowserRouter, Route } from "react-router"
import Header from "./components/layouts/Header"
import { Routes } from "react-router"
import Home from "./views/Home"
import { ToastContainer } from 'react-toastify';
import ProtectedRoutes from "./components/middleware/ProtectedRoutes"
import MakeAPost from "./views/admin/MakeAPost"
import Opening from "./views/admin/Opening"

function App() {


  return (
    <BrowserRouter>
    <div className='min-w-screen min-h-screen flex flex-col items-center bg-indigo-50 p-5 font-mono'>
        <Header/>
        <div className="p-5 flex-1 w-full flex gap-5 bg-mist-50 border border-mist-200 rounded-2xl">
          <div className="flex-5 min-h-full rounded-2xl p-5 box-border">
            <Routes>
              <Route path="/" element={<Home/>}></Route>
              <Route element={<ProtectedRoutes/>}>
                <Route path='/admin/make-a-post' element={<MakeAPost/>}></Route>
                <Route path='/admin/opening/:id' element={<Opening/>}></Route>
                {/* <Route path='/candidate/openings' element={<Opening/>}></Route> */}
              </Route>
            </Routes>
          </div> 
        </div>
        <ToastContainer/>
      </div>
    </BrowserRouter>
    
  )
    
}

export default App

import { BrowserRouter, Route } from "react-router"
import Header from "./components/layouts/Header"
import { Routes } from "react-router"
import Home from "./views/Home"
import Sidebar from "./components/layouts/Sidebar"

function App() {


  return (
    <BrowserRouter>
    <div className='min-w-screen min-h-screen flex flex-col items-center bg-indigo-50 p-5 font-mono'>
        <Header/>
        <div className="pl-5 pr-5 pb-5 flex-1 w-full flex gap-5 bg-mist-50 border border-mist-200 rounded-2xl p-5">
          <Sidebar/>
          <div className="flex-5 min-h-full rounded-2xl p-5 box-border">
            <Routes>
              <Route path="/" element={<Home/>}></Route>
            </Routes>
          </div> 
        </div>
      </div>
    </BrowserRouter>
    
  )
    
}

export default App

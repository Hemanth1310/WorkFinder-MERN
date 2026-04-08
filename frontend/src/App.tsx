import { BrowserRouter, Route } from "react-router"
import Header from "./components/layouts/Header"
import { Routes } from "react-router"
import Home from "./views/Home"

function App() {


  return (<div className='min-w-screen min-h-screen'>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
      </Routes>
    </BrowserRouter>
  </div>)
    
}

export default App

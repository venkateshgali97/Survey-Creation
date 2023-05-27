import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./Components/Home/Home"
import UserHome from "./Components/User/UserHome/UserHome"
import AdminHome from "./Components/Admin/AdminHome/AdminHome"


const App = () =>{
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Home />}></Route>
        <Route path = "/admin/*" element= {<AdminHome />}></Route>
        <Route path="/user/*" element = {<UserHome />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
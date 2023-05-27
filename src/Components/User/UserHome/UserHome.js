import {Link, Route,Routes} from "react-router-dom";
import "./UserHome.css"
import Surveys from "./Surveys/Surveys"
import UserDetails from "./UserDetails/UserDetails";
const UserHome = () => {
  const logoutHandler = () =>{
    localStorage.removeItem("userDetails")
  }
    return (
      <div className="user-home">
        <div className="user-home-sideNav">
            <ul>
                <li><Link to = "">Details</Link></li>
                <li><Link to = "surveys">Surveys</Link></li>
                <li onClick={logoutHandler}><Link to = "/">Logout</Link></li>
            </ul>
        </div>
        <Routes >
          <Route path="surveys" element= {<Surveys />}></Route>
          <Route path="" element  = {<UserDetails />}></Route>
        </Routes>
      </div>
    );
};

export default UserHome;

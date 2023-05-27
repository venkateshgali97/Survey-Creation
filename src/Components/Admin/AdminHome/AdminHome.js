import "./AdminHome.css"
import {Link,Routes,Route} from "react-router-dom"
import PublishedSurveys from "../PublishedSurveys/PublishedSurveys"
import Responses from "../Responses/Responses"
import DraftedSurveys from "../DraftedSurveys/DraftedSurveys"
import CreateSurveys from "../CreateSurvey/CreateSurvey"
import AdminDetails from "./AdminDetails/AdminDetails"

const AdminHome = () =>{
        return (
          <div className="admin-home">
            <div className="admin-home-sideNav">
                <ul>
                    <li><Link to = "">Details</Link></li>
                    <li><Link to = "createSurvey">Create Survey</Link></li>
                    <li><Link to = "responses">Responses</Link></li>
                    <li><Link to = "publishedSurveys">Published Surveys</Link></li>
                    <li><Link to = "draftedSurveys">Drafted Surveys</Link></li>
                    <li><Link to = "/">Logout</Link></li>
                    
                </ul>
            </div>
            
            <Routes>
            <Route path="" element = {<AdminDetails />}></Route>
              <Route path="createSurvey" element = {<CreateSurveys />}></Route>
              <Route path="responses" element = {<Responses />}></Route>
              <Route path="draftedSurveys" element = {<DraftedSurveys />}></Route>
              <Route path = "publishedSurveys" element = {<PublishedSurveys />}></Route>
            </Routes>
          </div>
        );
}

export default AdminHome
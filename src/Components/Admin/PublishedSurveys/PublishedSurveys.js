import "./PublishedSurveys.css"
import { useEffect, useState } from "react"
const PublishedSurveys = () => {
    const data = localStorage.getItem("userDetails")
    const { email } = JSON.parse(data)
    const [publishSureyData, setPublishSurveyData] = useState([])

    useEffect(() => {
        const data = {
            email: email
        }
        const options = {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(data)
        }
        fetch("http://localhost:8000/adminPublish", options)
            .then((res) => res.json())
            .then((resData) => setPublishSurveyData(resData))
            .catch((err) => console.log(err))

    }, [email])

    return (
        <div className="published-survey-container">
            
            <ol className="published-survey-nav">
                <li>Users</li>
                <li>Survey Name</li>
                <li>Status</li>
            </ol>
            <div>
                {publishSureyData.length === 0 ? (
                    <h5 className="text-center">No survey Published</h5>
                ) : (
                    <ul>
                        {publishSureyData.map((data) =>
                            data.users.map((user) =>{
                                return(
                                    <div className="published-survey-users-list">
                                    <li>{user}</li>
                                    <p>{data.data[0].title}</p>
                                   
                                    <p className="text-warning">Published</p> 
                                    </div>
                                    
                                    
                                )
                             
                            })
                        )}
                    </ul>
                )}

            </div>
        </div>

    )
}

export default PublishedSurveys
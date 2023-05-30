import "./Responses.css"
import {  useEffect, useState } from "react"
const Responses = () => {
    const data = localStorage.getItem("userDetails")
    const [totalResponses, setTotalResponses] = useState([])
    const [responseSurveyName, setResponseSurveyName] = useState("")
    const [wantToSeeResponse, setWantToSeeResponses] = useState(false)
    const [userResponseData, setUserResponseData] = useState([])
    const [responseUserName, serResponseUserName] = useState("")
    const { email } = JSON.parse(data)
    console.log(email)

    const userResponseDataHandler = (id) => {
        const filteredData = totalResponses.filter((ele) => ele._id === id)
        console.log(filteredData)
        setResponseSurveyName(filteredData[0].surveyName)
        setWantToSeeResponses(true)
        setUserResponseData(filteredData[0].responses)
        serResponseUserName(filteredData[0].userEmail)
    }
    useEffect(() => {
        const data = {
            adminEmail: email
        }
        const options = {
            method: "post",
            headers: {
                "Content-Type": "Application/json",
                "accept": "Application/json"
            },
            body: JSON.stringify(data)
        }

        fetch("http://localhost:8000/userResponses", options).then((res) => res.json())
            .then((resData) => setTotalResponses(resData))
            .catch((err) => console.log(err))
    }, [email])
    return (
        <div className="admin-response-page">
            <div>
                <ul className="admin-response-headers">

                    <li>Survey Name</li>
                    <li>User</li>
                    <li>Response</li>
                    <li>status</li>

                </ul>
            </div>
            {(totalResponses.length === 0) ? <h5 className="text-center">No Responses</h5> :
                <div >
                    {totalResponses.map((ele) => {
                        return (
                            <ul className="response-details" key={ele._id}>
                                <li>{ele.surveyName}</li>
                                <li>{ele.userEmail}</li>
                                <li id={ele._id} onClick={() => userResponseDataHandler(ele._id)}><span >Click Here</span></li>
                                <li>{ele.status ? "Responded" : "Not Responded "}</li>
                            </ul>
                        )
                    })}
                </div>
            }
            {wantToSeeResponse && (
                <div className="response-answers-container">
                    <h5 className="text-center text-light py-2">{responseUserName}</h5>
                    <h6 className="text-center text-light py-2 ">({responseSurveyName})</h6>
                    <ol>
                        {Object.keys(userResponseData).map((question) => {
                            const answer = userResponseData[question];
                            return (
                                <li key={question} className="response-answers-list-item">
                                    {question}: <span className="text-danger mx-5"> {Array.isArray(answer) ? answer.join(', ') : answer}</span>
                                </li>
                            );
                        })}
                    </ol>

                </div>
            )
            }
            {console.log(userResponseData)}
        </div>
    )
}

export default Responses
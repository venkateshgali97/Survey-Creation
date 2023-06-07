import "./PublishedSurveys.css"
import { useEffect, useState } from "react"
const PublishedSurveys = () => {
    const data = localStorage.getItem("userDetails")
    const { email } = JSON.parse(data)
    const [publishSureyData, setPublishSurveyData] = useState([])
    const [view, setView] = useState(false)
    const [title, setTitle] = useState("")
    const [surveyData, setSurveyData] = useState([])
    const [questions,setQuestions] = useState([])
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
        fetch("http://localhost:8000/adminSurveys", options)
            .then((res) => res.json())
            .then((resData) => setSurveyData(resData))
            .catch((err) => console.log(err))

    },[email])

    const renderBasedOnInput = (ele) => {
        const { type, _id, options } = ele

        if (type === "text") {
            return <input type="text" className="text-question-inputField" name={ele.question} />
        }
        else if (type === "range") {
            return (<>
                <label htmlFor={ele._id} className="range-question-label">Range (between 0 and 100):</label>
                <input type="range" id={ele._id} min="0" max="100" name={ele.question} />
            </>
            )
        }
        else if (type === 'yes/no') {
            return (
                <div className="yes-no-questoins">
                    <input type="radio" id={_id} value="yes" name={ele.question} />
                    <label htmlFor={_id} className="yes-no-questions-label">Yes</label>
                    <input type="radio" id={_id} value="no" name={ele.question} />
                    <label htmlFor={_id} className="yes-no-questions-label">No</label>
                </div>

            )
        }
        else if (type === "checkbox") {
            return (
                <div>
                    {options.map((option) => {
                        return (
                            <div key={`${_id} + ${option}`}>
                                <input type="checkbox" id={`${_id} + ${option}`} value={option} name={ele.question} />
                                <label htmlFor={`${_id} + ${option}`} className="check-box-label">{option}</label>

                            </div>
                        )
                    })}
                </div>
            )

        }
        else if (type === "radio") {
            return (
                <div>
                    {options.map((option) => {
                        return (
                            <div key={`${_id} + ${option}`}>
                                <input type="radio" id={`${_id} + ${option}`} value={option} name={ele.question} />
                                <label htmlFor={`${_id} + ${option}`} className="radio-questions-label">{option}</label>
                            </div>
                        )
                    })}
                </div>
            )

        }

    }
    const previewDataHandler = (title,id) => {
        setTitle(title)
        setView(true)
        console.log(title,id)
        console.log(surveyData)
        const filteredData = surveyData.filter((ele) => ele._id === id)
        console.log(filteredData)
        setQuestions(filteredData[0].data[0].questions)
    }
    return (
        <div className="published-survey-container">

            <ol className="published-survey-nav">
                <li>Survey Name</li>
                <li>Users</li>
                <li>Status</li>
                <li>View</li>
            </ol>
            <div>
                {publishSureyData.length === 0 ? (
                    <h5 className="text-center">No survey Published</h5>
                ) : (
                    <ul>
                        {publishSureyData.map((data) => {
                            return (
                                <div className="published-survey-users-list">
                                    <p>{data.title}</p>

                                    <table>
                                        <tbody>
                                            {data.users.length === 0 ? (
                                                <tr>
                                                    <td>None</td>
                                                </tr>
                                            ) : (
                                                data.users.map((user) => (
                                                    <tr key={user}>
                                                        <td>{user}</td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>

                                    <p className="text-warning">{data.status}</p>
                                    <p className="text-primary text-decoration-underline" onClick={() => previewDataHandler(data.title,data._id)}>Click here</p>
                                </div>
                            )

                        }
                        )}
                    </ul>
                )}
                {view && (
                    
                    <div className="survey-questions-container">
                        
                        <h6 className="text-center survey-heading">{title}</h6>
                        <h6 className="text-center text-light">(Preview)</h6>
                        <ol className="ordered-list">
                            {questions.map((ele) => {
                                return (
                                    <li className="user-survey-question" key={ele._id}>
                                        <div>
                                            <h5>{ele.question} </h5>
                                            {renderBasedOnInput(ele)}
                                        </div>
                                    </li>
                                )
                            })}
                        </ol>

                    </div>
                )}
            </div>
        </div>

    )
}

export default PublishedSurveys
import "./Surveys.css"
import { useEffect, useState } from "react"


const Surveys = () => {
    const [totalSurveys, setTotalSurveys] = useState([])
    const data = localStorage.getItem("userDetails")
    const [surveyQuestions, setSurveyQuestions] = useState([])
    const [surveyName, setSurveyName] = useState("")
    const [wantToRespond, setWantToRespond] = useState(false)
    const [responseData,setResponseData] = useState({})
    
    const { email } = JSON.parse(data)

    const surveyHandler = (id) => {
        const filteredData = totalSurveys.filter((ele) => ele._id === id)
        setSurveyName(filteredData[0].data[0].title, "surveyName")
        setSurveyQuestions(filteredData[0].data[0].questions)
        setWantToRespond(true)
       
    }
const submitResponseHandler = () =>{
    console.log(responseData)
    alert(responseData)
}
const responseCancelHandler = () =>{
    setWantToRespond(false)
}
const responseDataHandler = (e) => {
    const { name, value, type } = e.target;
  
    if (type === "checkbox") {
      setResponseData((prevState) => ({
        ...prevState,
        [name]: prevState[name] ? [...prevState[name], value] : [value]
      }));
    } else {
      setResponseData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
    console.log(responseData)
  };
  
    const renderBasedOnInput = (ele) => {
        const { type, _id, options } = ele

        if (type === "text") {
            return <input type="text" className="text-question-inputField" name={ele.question} onChange={responseDataHandler}/>
        }
        else if (type === "range") {
            return (<>
                <label htmlFor={ele._id} className="range-question-label">Range (between 0 and 100):</label>
                <input type="range" id={ele._id}  min="0" max="100" onChange={responseDataHandler} name={ele.question}/>
            </>
            )
        }
        else if (type === 'yes/no') {
            return (
                <div className="yes-no-questoins">
                    <input type="radio" id={_id} value="yes" name={ele.question} onChange={responseDataHandler}/>
                    <label htmlFor={_id} className="yes-no-questions-label">Yes</label>
                    <input type="radio" id={_id} value="no" name={ele.question} onChange={responseDataHandler} />
                    <label htmlFor={_id} className="yes-no-questions-label">No</label>
                </div>

            )
        }
        else if (type === "checkbox") {
            return (
                <div>
                    {options.map((option) => {
                        return (
                            <div key = {`${_id} + ${option}`}>
                                <input type="checkbox" id={`${_id} + ${option}`} value={option} name={ele.question} onChange={responseDataHandler} />
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
                            <div key = {`${_id} + ${option}`}>
                                <input type="radio" id={`${_id} + ${option}`} value={option} name={ele.question} onChange={responseDataHandler} />
                                <label htmlFor={`${_id} + ${option}`} className="radio-questions-label">{option}</label>

                            </div>
                        )
                    })}
                </div>
            )

        }

    }

useEffect(() =>{
    const data = {
        email : email
    }
    const options = {
        method : "post",
        headers : {
            "Content-Type" : "application/json",
            "accept" : "applications/json"
        },
        body : JSON.stringify(data)
    }
    fetch("http://localhost:8000/surveys",options)
    .then((res) => res.json())
    .then((resData) => setTotalSurveys(resData))
    .catch((err) => console.log(err))

})
    return (
        <>
            <div className="survey-page">
                <div>
                    <ul className="survey-headers">
                        <li>Published By</li>
                        <li>Survey Name</li>
                        <li>Respond</li>
                        <li>Status</li>
                    </ul>
                </div>

                {(totalSurveys.length === 0) ? <h5 className="text-center">No surveys</h5> :
                    <div >
                        {totalSurveys.map((ele) => {
                            return (
                                <ul className="survey-details" key={ele._id}>
                                    <li>{ele.email}</li>
                                    <li>{ele.data[0].title}</li>
                                    <li id={ele._id} onClick={() => surveyHandler(ele._id)}><span >Click Here</span></li>
                                    <li>Not Responded</li>
                                </ul>
                            )
                        })}
                    </div>
                }
                {wantToRespond && (
                    <div className="survey-questions-container">
                        <h5 className="text-center survey-heading">{surveyName}</h5>
                        <ol className="ordered-list">
                            {surveyQuestions.map((ele) => {
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
                        <div className="user-survey-button">
                            <button className="btn btn-primary" onClick={submitResponseHandler}>Submit</button>
                            <button className="btn btn-warning" onClick={responseCancelHandler}>Cancel</button>
                        </div>
                    </div>
                )}

            </div>

        </>
    )
}

export default Surveys;

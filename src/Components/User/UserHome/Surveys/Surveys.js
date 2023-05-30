import "./Surveys.css"
import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';


const Surveys = () => {
    const [totalSurveys, setTotalSurveys] = useState([])
    const [surveyQuestions, setSurveyQuestions] = useState([])
    const [surveyName, setSurveyName] = useState("")
    const [wantToRespond, setWantToRespond] = useState(false)
    const [responseData,setResponseData] = useState([])
    const [adminEmail,setAdminEmail] = useState([])
    const data = localStorage.getItem("userDetails")
    const { email } = JSON.parse(data)

    const surveyHandler = (id,email) => {
        const filteredData = totalSurveys.filter((ele) => ele._id === id)
        // setSurveyName(filteredData[0].data[0].title, "surveyName")
        setSurveyName(filteredData[0].data[0].title)
        setSurveyQuestions(filteredData[0].data[0].questions)
        setWantToRespond(true)
        setAdminEmail(email)
       
    }
const submitResponseHandler = () =>{
    const data = {
    userEmail : email,
    status : true,
    responses : responseData,
    surveyName : surveyName,
    adminEmail : adminEmail
    }
   const options = {
    method : "post",
    headers :{
        "Content-Type" : "application/json",
        "accept" : "application/json"

    },
    body : JSON.stringify(data)
   }

   fetch("http://localhost:8000/responses",options).then((res) => res.json())
   .then((resData) => {
    setWantToRespond(false)
    toast.success(resData)
   })
   .catch((err) => console.log(err))
}
const responseCancelHandler = () =>{
    setWantToRespond(false)
}
const responseDataHandler = (e) => {
    const { name, value, type } = e.target;
    // if (type === "checkbox") {
    //     setResponseData((prevState) => {
    //       if (prevState[name]) {
    //         const updatedArray = prevState[name].filter(item => item !== value);
    //         return {
    //           ...prevState,
    //           [name]: updatedArray.length ? updatedArray : null
    //         };
    //       } else {
    //         return {
    //           ...prevState,
    //           [name]: [value]
    //         };
    //       }
    //     });
    //   }else {
    //       setResponseData((prevState) => ({
    //         ...prevState,
    //         [name]: value
    //       }));
    //     }
    if (type === "checkbox") {
        setResponseData((prevState) => {
          const updatedArray = prevState[name] ? [...prevState[name]] : [];
          if (updatedArray.includes(value)) {
            // Remove the value if it already exists
            const filteredArray = updatedArray.filter(item => item !== value);
            return {
              ...prevState,
              [name]: filteredArray.length ? filteredArray : null
            };
          } else {
            // Add the value to the array
            updatedArray.push(value);
            return {
              ...prevState,
              [name]: updatedArray
            };
          }
        });
      } else {
        setResponseData((prevState) => ({
          ...prevState,
          [name]: value
        }));
      }
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
            "accept" : "application/json"
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
                       
                    </ul>
                </div>

                {(totalSurveys.length === 0) ? <h5 className="text-center">No surveys</h5> :
                    <div >
                        {totalSurveys.map((ele) => {
                            return (
                                <ul className="survey-details" key={ele._id}>
                                    <li>{ele.email}</li>
                                    <li>{ele.data[0].title}</li>
                                    <li id={ele._id} onClick={() => surveyHandler(ele._id,ele.email)}><span >Click Here</span></li>
                                    
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
            <ToastContainer />
            </div>

        </>
    )
}

export default Surveys;

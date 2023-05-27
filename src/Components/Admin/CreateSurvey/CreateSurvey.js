
import "./CreateSurvey.css";
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid";
import { toast, ToastContainer } from "react-toastify";


const CreateSurveys = () => {
  const [optionsRequired, setOptionsRequired] = useState(false) //for questions like radio/checkboxes
  const [publishStatus, setPublishStatus] = useState(false)    // For asking select users whom to send the survey
  const [usersData, setUsersData] = useState([])  //selected usersData to send the survey
  const [registeredUsersData, setRegisteredUsersData] = useState([]) //Number of users in the database
  const [surveyQuestionsData, setSurveyQuestionsData] = useState([])
  const [surveyQuestions, setSurveyQuestions] = useState({
    "id": uuidv4(),
    "title": "",
    "question": "",
    "type": "",
    "options": []
  }) //Main object to publish the survey in the database

  //For getting number of registered Users
  useEffect(() => {
    const options = {
      method: "get"
    }
    fetch("http://localhost:8000/usersData", options).then((res) => res.json()).then((resData) => setRegisteredUsersData(resData)).catch((err) => console.log(err))
  }, [])

  

  //For updating users question and type
  const surveyQuestionsHandler = (e) => {
    const { name, value } = e.target
    setSurveyQuestions((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }


  //Fot Handling Survey questions
  const surveyQuestionsDataHandler = () => {
    const { title, question, type, options } = surveyQuestions
    if (title === "") {
      toast.error("Title can't be empty")
    }
    else if (question === "") {
      toast.error("Question cannot be left blank")
    }
    else if (type === "") {
      toast.warning("Please Choose Question Type")
    } else {
      if (type !== "text" && type !== "yes/no" && type !== "radio") {
        setOptionsRequired(true)
        if (options.length < 2) {
          toast.warning("Enter your options separated by comma")
        }
        else { // If options provided we can add the question in Question Data
          setSurveyQuestionsData((prevState) => [...prevState, surveyQuestions])
          setOptionsRequired(false)
          setSurveyQuestions({
            "question": "",
            "type": "",
            "id": uuidv4(),
            "options": []
          })
          toast.success("Question added successfully")
        }
      }
      else { //For type == Text
        setSurveyQuestionsData((prevState) => [...prevState, surveyQuestions])
        setOptionsRequired(false)
        setSurveyQuestions({
          "question": "",
          "type": "",
          "id": uuidv4(),
          "options": []
        })
        toast.success("Question added successfully")
      }


    }
  }

  //For deleting survey Questions
  const deleteHandler = (id) => {
    const filteredData = surveyQuestionsData.filter((ele) => ele.id !== id)
    toast.warning("Question Deleted Successfully")
    setSurveyQuestionsData(filteredData)
  }

  //For accessing who is login 
  const data = localStorage.getItem("userDetails")
  const { email } = JSON.parse(data)

  // For Drafting the survey
  const draftSurveyHandler = () => {
    const {title} = surveyQuestionsData[0]
    const details = {
      data : [{title:title,questions : surveyQuestionsData}],
      users : usersData,
      email : email 
    }   
    const options = {
      method :"post",
      headers :{
        "Content-Type" : 'application/json',
        "accept" : "application/json"
      },
      body : JSON.stringify(details)
    }

    fetch("http://localhost:8000/draftSurvey",options).then((res) => res.json()).then((resData) => 
    {
      
      setSurveyQuestionsData([])
      setPublishStatus(false)
      toast.success(resData)
      setUsersData([])
      setSurveyQuestions((prevState) => ({
        ...prevState,
        title : ""
      }))
    }
      ).catch((err) => (toast.error("Survey didn't Draft")
    ))
  }

  //For Handling Options for Check box/ Input type Questions
  const optionsHandler = (e) => {
    const rawData = e.target.value
    const optionsData = rawData.split(",")
    setSurveyQuestions((prevState) => ({
      ...prevState,
      "options": optionsData
    }))

    // Here is Final Publish Survey Api Handler
  }
  const publishSurveyFinalHandler = () => {
    if (usersData.length === 0) {
      toast.warning("Please select atleast 1 User")
    }
    else {
      const {title} = surveyQuestionsData[0]
      const details = {
        data : [{title:title,questions : surveyQuestionsData}],
        users : usersData,
        email : email 
      }
     
      
      const options = {
        method :"post",
        headers :{
          "Content-Type" : 'application/json',
          "accept" : "application/json"
        },
        body : JSON.stringify(details)
      }

      fetch("http://localhost:8000/publishedSurvey",options).then((res) => res.json()).then((resData) => 
      {
        
        setSurveyQuestionsData([])
        setPublishStatus(false)
        toast.success(resData)
        setUsersData([])
        setSurveyQuestions((prevState) => ({
          ...prevState,
          title : ""
        }))
      }
        ).catch((err) => (toast.error("Survey didn't published")
      ))
    }
  }
  const publishSurveyCancelHandler = () => {
    setSurveyQuestionsData([])
    setSurveyQuestions((prevState) => ({
      ...prevState,
      "title": ""
    }))
    setPublishStatus(false)
    toast.warning("Cancelled")
  }



  //For selecting users to publish the survey
  const handleCheckBoxChange = (e) => {
    const { checked, name } = e.target
    if (checked) {
      setUsersData([...usersData,name])
    }
    else{
      setUsersData((prevState) => prevState.filter((item) => item !== name))
    }
console.log(usersData)
  }
  return (

    <div className="create-survey">
      <div className=" create-survey-title">
        <label htmlFor="surveyTitle">Title : </label>
        <input type="text" placeholder="Please Enter Title Name" id="surveyTitle" name="title" onChange={surveyQuestionsHandler} value={surveyQuestions.title}></input>
      </div>
      <div className="survey-questions-form">
        <div className="survey-question">
          <label htmlFor="survey-question">Question </label>
          <input type="text" name="question" value={surveyQuestions.question} id="survey-question" onChange={surveyQuestionsHandler}></input>
        </div>
        <div className="survey-question-type">
          <label htmlFor="question-type">Type</label>
          <select id="question-type" name="type" value={surveyQuestions.type} onChange={surveyQuestionsHandler}>
            <option hidden>Choose here</option>
            <option value="text">Text</option>
            <option value="checkbox">Check Box</option>
            <option value="radio">Radio</option>
            <option value="yes/no">Yes/ No</option>
            <option value="range">Range</option>
          </select>
          {(optionsRequired) && (
            <>
              <label>Options</label>
              <input type="text" placeholder="Enter Options separated by comma" onChange={optionsHandler}></input>
            </>
          )}
        </div>
        <div className="survey-addButton">
          <button onClick={surveyQuestionsDataHandler}>Add Question</button>
        </div>
      </div>
      <div className="questions-preview">
        <ul className="questionw-preview-list-background">

          {surveyQuestionsData.map((ele) => {
            return (
              <div className="question-preview-container" key={ele.id}>
                <li>{ele.question}</li>
                <button className="btn btn-danger" onClick={() => deleteHandler(ele.id)}>Delete</button>
              </div>
            )
          })}

        </ul>

      </div>

      {surveyQuestionsData.length >= 1 && (
        <div className="create-survey-buttons">
          <button className="btn btn-primary" onClick={draftSurveyHandler}>Draft</button>
          <button className="btn btn-success" onClick={() => setPublishStatus(true)}>Publish</button>
        </div>
      )}

      {publishStatus && (
        <div className="users-selections">
          <h5>Select users to whom you want to send the survey:</h5>
          <div>
            {registeredUsersData.map((ele) => (
              <div key={ele._id}>
                <input type="checkbox" id={ele._id} name={ele.email} value={ele.email} onChange={handleCheckBoxChange} />
                <label htmlFor={ele._id}>{ele.email}</label>
              </div>
            ))}
          </div>

          <div>
            <button className="btn btn-success m-3" onClick={publishSurveyFinalHandler}>Send</button>
            <button className="btn btn-danger m-3" onClick={publishSurveyCancelHandler}>Cancel</button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>

  );
};

export default CreateSurveys;

import "./DraftedSurveys.css"
import { useState, useEffect } from "react"

const DraftedSurveys = () => {
    
    //For accessing who is login 
    const data = localStorage.getItem("userDetails")
    const { email } = JSON.parse(data)
    const [draftedSurveyData, setDraftedSurveyData] = useState([])
   
    const [draftedQuestionData, setDraftedQuestionData] = useState([])

    useEffect(() => {
        const data = {
            email: email
        }
        const options = {
            method: "post",
            headers: {
                "Content-Type": "Application/json",
                "accept": "Application/json"
            },
            body: JSON.stringify(data)
        }

        fetch("http://localhost:8000/userDraftedSurveys", options)
            .then((res) => res.json())
            .then((resData) => {
                setDraftedSurveyData(resData)
                setDraftedQuestionData(resData[0].data)
            })
            .catch((err) => console.log(err))
    }, [email])
    return (
        <div>
            <div className="drafted-survey-container">
                {(draftedSurveyData.length === 0) ? <h5 className="text-center">No Drafted Surveys is available</h5> : (
                    <>

                        <div className="questions-preview">
                            <ul className="questionw-preview-list-background">
                                {draftedQuestionData.map((ele) => (
                                    <div key={ele._id}>
                                        <h5 className=" text-success my-4">Title : {ele.title}</h5>
                                        {ele.questions.map((question) => (
                                            <div className="question-preview-container" key={question._id}>
                                                <li>{question.question}</li>
                                                  <button className="btn btn-danger">
                                                    Delete
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </ul>
                        </div>

                    </>
                )}


            </div>


        </div>

       

    );


}

export default DraftedSurveys

import "./Home.css"
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Navigate} from "react-router-dom"


const Home = () => {
    const [loginStatus,setLoginStatus] = useState({
        status : false,
        userType : ""
    })
    //sign in details
    const [signInDetails,setSignInDetails] = useState({
        "email" : "",
        "password" : "",
        "userType": ""
    })

    //sign up details
    const [signUpDetails,setSignUpDetails] = useState({
        "name" : "",
        "email" : "",
        "password" : "",
        "userType": ""
    })

    const [signInpage,setSignInPage] = useState(false)
    const [signUpPage,setSignUpPage] = useState(true)
// sign In input Handle Funtion 
const signInInputHandler = (event) =>{
 const {value,name} = event.target
 setSignInDetails((prevState) => ({
    ...prevState,
    [name] : value
 }))
}

// sign up input handle function 
const signUpInputHandler = (event) =>{
    const {value,name} = event.target
    setSignUpDetails((prevState) => ({
        ...prevState,
        [name] : value
    }))
}
    //sign up data handler function
    const signUpHandler = (e) =>{
        e.preventDefault()
        const {name,email,password,userType} = signUpDetails
        if (name === ""){
            toast.error("Name is required")
        }
        else if (email === ""){
            toast.error("Email is required")
        }
        else if (password === ""){
            toast.error("Password is required")
        }
        else if(password.length <8){
            toast.error("Your Password must be atleast 8 Characters long")
        }
        else if (userType === ""){
            toast.warning("Please select whether you want to register as a user or admin.")
        }
        else{
            //Here is the Registration Api call
            const options = {
                method : "post",
                headers : {
                    'Content-Type' : "application/json",
                    'accept': 'application/json'
                },
                body :  JSON.stringify(signUpDetails)   
            }

        fetch("http://localhost:8000/registration",options).then((res) =>{
            if (res.status === 200){
            toast.success("Registration Successful")
            setTimeout(() => toast.success(`Dear ${name} thank you for registering`),1000)
            setTimeout(() => toast.success("please Login"),2000)
            setSignUpDetails((prevState) => (
                {...prevState,
                "name" : "",
                "email" : "",
                "password" : "",
                "userType": ""
                }
            ))
            
            }
            else{
                toast.error("Email  is already Existed")
            }  
        } ).catch((err) =>{
            console.log(err)
        })
    }     
    }


    //sign in data
    const signInHandler = (e) =>{
        e.preventDefault()
    const {email,password,userType} = signInDetails
     if (email === "") {
        toast.error("Email is required")
     }
     else if (password === ""){
        toast.error("Password is required")
     }
     else if (userType === ""){
        toast.error("Please select whether you want to Login as a user or admin.")
     }
     else{
        //Sign In Api Call
        const options = {
            method : "post",
            headers : {
                "Content-Type" : "application/json",
                "accept" : "application/json"
            },
            body :  JSON.stringify(signInDetails)
        }

        fetch("http://localhost:8000/login",options).then((res) => res.json()).then((resData) => {
            if (resData === "Login Successful" ){
                toast.success(resData)
                let data = {email :email,userType:userType}
                localStorage.setItem("userDetails",JSON.stringify(data))

                setTimeout(() =>setLoginStatus({status :true,userType:userType}),1000 )
            }
            else{
                toast.error(resData)
            }
        })
     }
    }

    return (
        <>
        <div className="home-container">
         <div className="home-sub-container shadow-lg rounded">
            <div className="p-3">
               <div className="home-buttons">
               <button className={`${signInpage ? 'active' : ''}`} onClick={() => {setSignInPage(true) ;setSignUpPage(false)}}>Login</button>
               <button className={`${signUpPage ? 'active' : ''}`} onClick={() => {setSignInPage(false) ;setSignUpPage(true)}}>Signup</button>
               </div>

               {signInpage &&
               <form className="Login">
                    <h5>Login Form</h5>
                        <div>
                            <label htmlFor="login-email">Email : </label>
                            <input type="email" placeholder="Enter your email" id="login-email" name = "email" value = {signInDetails.email} onChange={signInInputHandler} required></input>
                        </div>
                        <div>
                            <label htmlFor="login-password">password: </label>
                            <input type="password" placeholder="Enter your password" id="login-password" name = "password" value = {signInDetails.password} onChange={signInInputHandler} required></input>
                        </div>
                        <div>
                            <label htmlFor="login-userType">Choose : </label>
                            <select id="login-userType" onChange={signInInputHandler} name="userType" value={signInDetails["userType"]}>
                                <option value="" disabled hidden required>Choose here</option>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div  className="buttons-singIn-signUp">
                        <button className="btn btn-primary" onClick={signInHandler}>Sign In</button>
                        </div>
                    </form> 
}
                

            {signUpPage &&
                    <form className="Registration" onSubmit={signUpHandler}>
                    <h5 >Registration Form</h5>
                    <div>
                        <label htmlFor="registration-name">Name : </label>
                        <input type="text" placeholder="Enter your Name" id="registration-name" name="name" value={signUpDetails.name} onChange={signUpInputHandler} required></input>
                    </div>
                    <div>
                        <label htmlFor="registration-email">Email : </label>
                        <input type="email" placeholder="Enter your Email" id="registration-email" name="email" value={signUpDetails.email} onChange={signUpInputHandler} required></input>
                    </div>
                    <div>
                        <label htmlFor="registration-password">Password : </label>
                        <input type="password" placeholder="Enter your password" id="registration-password" name="password" value={signUpDetails.password} onChange={signUpInputHandler} required></input>
                    </div>
                    <div>
                        <label htmlFor="registration-userType">Choose : </label>
                        <select id="registration-userType" onChange={signUpInputHandler} name="userType" value={signUpDetails["userType"]} >
                            <option value="" disabled hidden required>Choose here</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="buttons-singIn-signUp">
                    <button  className="btn btn-primary" onClick={signUpHandler}>Sign up</button>
                    </div>
                </form>
}
            <ToastContainer />
            {(loginStatus.status) && <Navigate to= {`/${loginStatus.userType}`}/>}
            
         </div>
         </div>
        </div>
        
                    
        
        </>
    )
}

export default Home
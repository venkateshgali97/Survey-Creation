import "./userDetails.css"
const UserDetails = () =>{
    const data = localStorage.getItem("userDetails")
    const {email,userType} = JSON.parse(data)
   
    
    return(
        <div className="user-details">
            <i className="fa-regular fa-user fa-xl p-4"></i>
            <p>{email}</p>
            <p>({userType})</p>
        </div>
    )
}

export default UserDetails
import "./AdminDetails.css"
const AdminDetails = () =>{
    const data = localStorage.getItem("userDetails")
    const {email,userType} = JSON.parse(data)
    return(
        <div className="admin-details">
            <i className="fa-regular fa-user fa-xl p-4"></i>
            <p>{email}</p>
            <p>({userType})</p>
        </div>
    )
}

export default AdminDetails
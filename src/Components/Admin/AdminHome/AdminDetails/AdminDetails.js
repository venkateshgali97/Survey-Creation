import "./AdminDetails.css"
const AdminDetails = () =>{
    const data = localStorage.getItem("userDetails")
    const {email,userType} = JSON.parse(data)
    return(
        <div className="admin-details">
            <p>{email}</p>
            <p>({userType})</p>
        </div>
    )
}

export default AdminDetails
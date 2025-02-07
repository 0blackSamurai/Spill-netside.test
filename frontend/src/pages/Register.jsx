import "../css/compoents/Form.css"
import { useState } from "react"
import axios from "axios"


export default function Register() {
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [repeatPassword, setRepeatPassword] = useState("");
     const [msg, setMsg] = useState("");

    
    function handelsubmit(e){
        e.preventDefault()
        // console.log(email,"email,",password, " password", confirmPassword,"confirm password")
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/register`,
            {email,password,repeatPassword}, {withCredentials: true}).then((response) => {
                console.log(response.data, "response")
                setMsg(response.data.msg)
            })
    }
    return (
        <div className="register"> 
            <h1>Register</h1>
            <form onSubmit={handelsubmit}>
               <input type="text" placeholder="username" onChange={(e) => setEmail(e.target.value)}/>
               <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
               <input type="password" placeholder="repeatPassword" onChange={(e) => setRepeatPassword(e.target.value)}/>
               <button type="sumbit" >register user</button>
           </form>
           {msg?
           <div><p>{msg}</p></div>
           :
           <div></div>}
        </div>
    )
}
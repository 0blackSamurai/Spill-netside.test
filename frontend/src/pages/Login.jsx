import "../css/compoents/Form.css"
import { useContext, useState } from "react"
import axios from "axios"
import {AuthContext} from "../auth/Authcontext"


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const {user} = useContext(AuthContext)

    if(user)window.location.href="/profile"
    

    function handelsubmit(e){
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`,{email,password},{withCredentials: true})
        .then((response) => {
            console.log(response.data, "response")
            setMsg(response.data.msg)
        })
    }
    return (
        <div className="login">
            <h1>logg inn</h1>
           <form onSubmit={handelsubmit}>
               <input type="text" placeholder="username" onChange={(e) => setEmail(e.target.value)}/>
               <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
               <button type="sumbit" >login</button>
           </form>
           {msg?
           <div><p>{msg}</p></div>
           :
           <div></div>}
        </div>
    );
}
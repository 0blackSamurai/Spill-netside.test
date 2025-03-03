import "../css/compoents/Form.css"
import { useState, useContext, useEffect } from "react"
import axios from "axios"
import { AuthContext } from "../auth/Authcontext"
import { useNavigate } from "react-router-dom"

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [msg, setMsg] = useState("");
    const { user, loading, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    // Only redirect after the authentication check is complete
    useEffect(() => {
        if (!loading && user) {
            navigate("/profile");
        }
    }, [loading, user, navigate]);

    function handleSubmit(e) {
        e.preventDefault();
        setMsg(""); // Clear any previous messages
        
        axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
            { email, password, repeatPassword },
            { withCredentials: true }
        )
        .then((response) => {
            console.log(response.data, "response");
            setMsg(response.data.msg);
            // Update user context with the newly registered user
            setUser(response.data.user);
            // Navigate to profile
            navigate("/profile");
        })
        .catch((error) => {
            console.error("Registration error:", error);
            setMsg(error.response?.data?.msg || "An error occurred during registration");
        });
    }
    
    // Don't render anything while checking authentication
    if (loading) {
        return <div className="register">
            <h1>Loading...</h1>
        </div>;
    }

    return (
        <div className="register"> 
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <input 
                    type="password" 
                    placeholder="Repeat Password" 
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    value={repeatPassword}
                />
                <button type="submit">Register User</button>
            </form>
            {msg ? <div><p>{msg}</p></div> : <div></div>}
        </div>
    );
}
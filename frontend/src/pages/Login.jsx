import "../css/compoents/Form.css"
import { useContext, useState, useEffect } from "react"
import axios from "axios"
import { AuthContext } from "../auth/Authcontext"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const { user, loading, setUser } = useContext(AuthContext);
    const navigate = useNavigate();


    useEffect(() => {
        if (!loading && user) {
            navigate("/profile");
        }
    }, [loading, user, navigate]);

    function handleSubmit(e) {
        e.preventDefault();
        setMsg(""); // Clear any previous messages
        
        axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
            { email, password },
            { withCredentials: true }
        )
        .then((response) => {
            console.log(response.data, "response");
            setMsg(response.data.msg);
            // Update user context with the logged in user
            setUser(response.data.user);
            // Navigate to profile
            navigate("/profile");
        })
        .catch((error) => {
            console.error("Login error:", error);
            setMsg(error.response?.data?.msg || "An error occurred during login");
        });
    }
    
    // Don't render anything while checking authentication
    if (loading) {
        return <div className="login">
            <h1>Loading...</h1>
        </div>;
    }

    return (
        <div className="login">
            <h1>Logg inn</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Username/Email" 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <button type="submit">Login</button>
            </form>
            {msg ? <div><p>{msg}</p></div> : <div></div>}
        </div>
    );
}
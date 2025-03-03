import "../css/compoents/NavBar.css";
import { useContext } from "react";
import { AuthContext } from "../auth/Authcontext";


export default function NavBar() {
    const { user, loading } = useContext(AuthContext);

    return (
        <div>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    {!loading && (
                        user ? (
                            <li><a href="/Profile">Profile</a></li>
                        ) : (
                            <>
                                <li><a href="/Login">Login</a></li>
                                <li><a href="/Register">Register</a></li>
                            </>
                        )
                    )}

                    <li><a href="#">About</a></li>
                </ul>
                </nav>
        </div>
    )
};
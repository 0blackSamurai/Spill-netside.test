import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/Authcontext';
import axios from 'axios';

export default function Profile() {
    const { user, loading, setUser, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate("/login");
        }
    }, [loading, user, navigate]);

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };


    if (loading) {
        return <div>
            <h1>Loading...</h1>
        </div>;
    }

    return (
        <div>
            <h1>Welcome, {user.email}</h1>
            {user && (
                <div>
                    <p></p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
}
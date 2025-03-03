import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/Authcontext';
import axios from 'axios';

export default function Profile() {
    const { user, loading, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    // Redirect to login if user is not authenticated
    useEffect(() => {
        if (!loading && !user) {
            navigate("/login");
        }
    }, [loading, user, navigate]);

    

    // Show loading state while checking authentication
    if (loading) {
        return <div>
            <h1>Loading...</h1>
        </div>;
    }

    return (
        <div>
            <h1>Profile Page</h1>
            {user && (
                <div>
                    <p>Welcome, {user.email}</p>
                    
                </div>
            )}
        </div>
    );
}
// Suggested improvement for your AuthContext.jsx
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Start with loading true

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/auth/user`, 
                    { withCredentials: true }
                );
                // Only set the user if we get a valid response
                if (response.data && response.data.user) {
                    setUser(response.data.user);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.log("Auth check error:", error);
                setUser(null);
            } finally {
            
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const logout = async () => {
      try {
          const response = await axios.get(
              `${process.env.REACT_APP_BACKEND_URL}/auth/logout`, 
              { withCredentials: true }
          );
          console.log("Logout response:", response.data);
          setUser(null);
          return true;
      } catch (error) {
          console.error("Logout error:", error);
          return false;
      }
  };

    return (
        <AuthContext.Provider value={{ user, loading, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
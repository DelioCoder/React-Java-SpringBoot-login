import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuthContext = () =>{
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    function login(email, password)
    {
        if(email === 'souldeath' && password === '123')
        {
            setIsAuthenticated(true);
            return true;
      
        }else {
            setIsAuthenticated(false);
            return false;
        }
    }

    function logout()
    {
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={ { isAuthenticated, login, logout } }>
            { children }
        </AuthContext.Provider>
    )
}

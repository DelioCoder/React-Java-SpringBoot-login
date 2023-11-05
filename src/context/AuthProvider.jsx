import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuthContext = () =>{
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [username, setUsername] = useState(null);

    function login(username, password)
    {
        if(username === 'souldeath' && password === '123')
        {
            setIsAuthenticated(true);
            setUsername(username);
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
        <AuthContext.Provider value={ { isAuthenticated, login, logout, username } }>
            { children }
        </AuthContext.Provider>
    )
}

import { createContext, useState } from "react";


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    // const [auth, setAuth] = useState({});
    const [auth, setAuth] = useState(() => {
        // Load authentication data from local storage or a default value
        const storedAuth = localStorage.getItem("3319173716");
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return storedAuth ? JSON.parse(storedAuth) : {};
    });
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
import {createContext, useState} from "react";


const AuthContext = createContext({});


interface UserInfo {
    // ... define user properties here
    name?: number;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    province?: string;
    city?: string;
    address?: string;
    // add other properties as needed
}

interface AuthState {
    userInfo: UserInfo | null;
    accessToken: string | null;
}

// If you have a default state, define it
// const defaultAuthState: AuthState = {
//     userInfo: null,
//     accessToken: null
// };


export const AuthProvider = ({children}) => {
    // const [auth, setAuth] = useState({});
    const [auth, setAuth] = useState<AuthState>(() => {
        // Load authentication data from local storage or a default value
        const storedAuth = localStorage.getItem("3319173716");
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return storedAuth ? JSON.parse(storedAuth) : {};
    });
    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
import { createContext,useState,useEffect } from "react";

export const UserContext = createContext();

const UserProvider = ({children}) => {
    const [curruentUser, setCurruentUser] = useState(JSON.parse(localStorage.getItem("user")));

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(curruentUser));
    },[curruentUser])


    return (
        <UserContext.Provider value={{curruentUser, setCurruentUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;
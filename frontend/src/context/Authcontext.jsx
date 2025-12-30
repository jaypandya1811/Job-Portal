import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const Authcontext = createContext();

export const Authuser = ({ children }) => {
    const [user,setuser] = useState(null);
    const [loading,setloading] = useState(true);

    const fetchuser = () => {
        try {
            axios.get("http://localhost:3000/user/auth",
            { withCredentials: true })
            .then((res) => {
                console.log("user fetched");
                setuser(res.data);
            })
        } catch (error) {
            setuser(null);
        } finally {
            setloading(false);
        }
    };

    useEffect(() => {
        fetchuser();
    }, []);

    return(
        <Authcontext.Provider value={{ user, setuser, fetchuser, loading }} >
            {children}
        </Authcontext.Provider >
    );
};

export const useauth = () => {
    const context = useContext(Authcontext);
    return context;
};
import { ReactNode, createContext, useContext, useState } from "react"
import Cliente from "../models/cliente"
import { useLocalStorage } from "../hooks/useLocalStorage"

type LoggedUserProviderProps = {
    children: ReactNode
}

type LoggedUserContextType = {
    isLoggedIn: boolean,
    setIsLoggedIn: (value: boolean) => void,
    isLoggedUser: () => boolean,
    setUserAsLogged: (cliente: Cliente) => void,
    deleteLoggedUser: () => void,
    getLoggedUser: () => Cliente,
    setNewUserAsLogged: (cliente: Cliente, id:number) => void
}
  
const LoggedUserContext = createContext({} as LoggedUserContextType);
  
export function useLoggedUser() {
    return useContext(LoggedUserContext);
}

export function LoggedUserProvider({children} : LoggedUserProviderProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedUser, setLoggedUser] = useLocalStorage<Cliente>(
        'loggedUser',
        {
            id: 0,
            nombre: "",
            apellido: "",
            ciudad: "",
            domicilio: "",
            email: ""
        }
    );

    function isLoggedUser() {
        return loggedUser.id !== 0;
    }

    function setUserAsLogged(cliente: Cliente) {
        if(cliente !== undefined)
            setLoggedUser(cliente);
        else 
            setLoggedUser({
                id: 0,
                nombre: "",
                apellido: "",
                ciudad: "",
                domicilio: "",
                email: ""
            });
    }

    function deleteLoggedUser() {
        setLoggedUser({
            id: 0,
            nombre: "",
            apellido: "",
            ciudad: "",
            domicilio: "",
            email: ""
        });
    }

    function getLoggedUser() {
        return loggedUser;
    }

    function setNewUserAsLogged(cliente: Cliente, id: number) {
        setLoggedUser({
            id: id,
            nombre: cliente.nombre,
            apellido: cliente.apellido,
            ciudad: cliente.ciudad,
            domicilio: cliente.domicilio,
            email: cliente.email
        });
    }


    return (
        <LoggedUserContext.Provider 
        value={{
            isLoggedIn,
            setIsLoggedIn,
            isLoggedUser,
            setUserAsLogged,
            deleteLoggedUser,
            getLoggedUser,
            setNewUserAsLogged
        }}>
            {children}
        </LoggedUserContext.Provider>
    )
}
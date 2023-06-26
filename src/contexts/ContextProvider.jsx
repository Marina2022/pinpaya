import {createContext, useContext, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import cookies from 'js-cookie'

const StateContext = createContext({
    user: null,
    token: null,
    type: null,
    setUser: () => {},
    setToken: () => {},
    setType: () => {},
});



export const ContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [cookie, setCookie] = useState('en');
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [type, _setType] = useState(localStorage.getItem('TYPE'));

    const setToken = (token) => {
        _setToken(token)
        if(token){
            localStorage.setItem('ACCESS_TOKEN', token);
        }else{
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }

    const setType = (type) => {
        _setType(type)
        if(type){
            localStorage.setItem('TYPE', type);
        }else{
            localStorage.removeItem('TYPE')
        }
    }


    const {i18n} = useTranslation();

    return(
        <StateContext.Provider value={{
            user,
            token,
            type,
            setUser,
            setToken,
            setType
        }}>

            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => {
    return useContext(StateContext);
}

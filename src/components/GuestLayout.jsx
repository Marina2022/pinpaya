import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import '../index.scss'
export default function GuestLayout(){
    const {token, type} = useStateContext();

    if(token){
        if(type == 'student'){
            return <Navigate to={'/student'}/>
        }else if(type == 'tutor'){
            return <Navigate to={'/tutor'}/>
        }else{
            return <Navigate to={'/'}/>
        }
    }

    return(
        <div>
            <Outlet/>
        </div>
    )
}

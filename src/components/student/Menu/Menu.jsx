import {Navigate, Outlet, useLocation, useNavigate} from "react-router-dom";
import '../student.css'
import AxiosClient from "../../../axios-client";
import {useStateContext} from "../../../contexts/ContextProvider";
import {useEffect, useState} from "react";
import MyLessons from "../MyLessons";
import {signOut} from "firebase/auth";
import { auth } from '../../../firebase'
import {useTranslation} from "react-i18next";
import UserMenu from "../../CommonComponents/UserMenu/UserMenu";

import s from './Menu.module.scss'
import cn from "classnames";
import PleaseVerify from "../../CommonComponents/PleaseVerify/PleaseVerify";


export default function Menu(){
    const {setUser, setToken, token, type,user} = useStateContext()
    const location = useLocation();
    const navigate = useNavigate();
    const [msg, setMsg] = useState(false);
    const {t, i18n} = useTranslation();

    useEffect(()=>{
        window.scrollTo(0, 0)
    }, [])

    if(!token || type !== "student"){
        return <Navigate to={'/login'}/>
    }else{
        <Navigate to={'/student'}/>
    }
    const onLogout = (e) => {
        e.preventDefault();
        signOut(auth);
        AxiosClient.post('/logout').then(() => {
            setUser(null);
            setToken(null);
            navigate('/login');
        })
    }

    const resendLink = () => {
        AxiosClient.post('student/resend-email').then((data) => {
            setMsg(true);
        })
    }

    return(

            <div className={cn("container-1312", s.globalWrapper)}>
                <div className={s.menuPart}>
                  <UserMenu classname={s.menu} />
                </div>

                <div className={s.contentPart}>
                    {user && user.email_verified_at == null &&
                      <PleaseVerify resendLink={resendLink} />
                    }

                    {msg &&
                        <div className="alert alert-success mb-3" role="alert" style={{ backgroundColor: '#d4edda'}}>
                            <h4 className="text-dark">{t('email_sended')}</h4>
                        </div>
                    }
                    { location.pathname == '/student' ? <MyLessons/> : '' }
                    <Outlet/>
                </div>
            </div>

    )
}

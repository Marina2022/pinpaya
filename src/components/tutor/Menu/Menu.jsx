import {Navigate, Outlet, useLocation} from "react-router-dom";

import {useStateContext} from "../../../contexts/ContextProvider";
import AxiosClient from "../../../axios-client";
import MyLessons from "../MyLessons/MyLessons";

import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import UserMenu from "../../CommonComponents/UserMenu/UserMenu";

import s from './Menu.module.scss'
import cn from "classnames";
import PleaseVerify from "../../CommonComponents/PleaseVerify/PleaseVerify";

export default function Menu() {
  const {token, type, user} = useStateContext()
  const location = useLocation();
  const [msg, setMsg] = useState(false);
  const {t, i18n} = useTranslation();

  useEffect(()=>{
    window.scrollTo(0, 0)
  }, [])

  if (!token || type !== "tutor") {
    return <Navigate to={'/login'}/>
  } else {
    <Navigate to={'/tutor'}/>
  }

  const resendLink = () => {
    AxiosClient.post('tutor/resend-email').then((data) => {
      setMsg(true);
    })
  }

  return (
      <div className={cn("container-1312", s.globalWrapper)}>
        <div className={s.menuPart}>
          <UserMenu classname={s.menu}/>
        </div>

        <div className={s.contentPart} >
          {user && user.email_verified_at === null &&
           <PleaseVerify resendLink={resendLink} />
          }

          {msg &&
            <div className="alert alert-success mb-3" role="alert" style={{backgroundColor: '#d4edda'}}>
              <h4 className="text-dark">{t('email_sended')}</h4>
            </div>
          }
          {location.pathname == '/tutor' ? <MyLessons/> : ''}
          <Outlet/>
        </div>
      </div>

  )
}

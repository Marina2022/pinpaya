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
import StudentDontSee from "../../CommonComponents/StudentDontSee/StudentDontSee";
import OurRegularPopup from "../../CommonComponents/OurRegularPopup/OurRegularPopup";

export default function Menu() {
  const {token, type, user} = useStateContext()
  const location = useLocation();
  const [msg, setMsg] = useState(false);
  const {t, i18n} = useTranslation();

  useEffect(()=>{
    window.scrollTo(0, 0)
  }, [])

  const [profileFilled, setProfileFilled] = useState(true)

  useEffect(()=>{
    if (user) setProfileFilled(!!user.about && user.avatar!==null)
  }, [user])

  const [isSending, setIsSending] = useState(false)

  if (!token || type !== "tutor") {
    return <Navigate to={'/login'}/>
  } else {
     <Navigate to={'/tutor'}/>
  }

  const resendLink = () => {
    setIsSending(true)
    AxiosClient.post('tutor/resend-email').then((data) => {
      setMsg(true);
      setIsSending(false)
    })
  }

  return (
      <div className={cn("container-1312", s.globalWrapper)}>
        <div className={s.menuPart}>
          <UserMenu classname={s.menu}/>
        </div>

        <div className={s.contentPart} >
          {user && user.email_verified_at === null &&
           <PleaseVerify resendLink={resendLink} isSending={isSending} />
          }

          {type === 'tutor' && !profileFilled &&
            <StudentDontSee />
          }

          {msg &&
            <div className="alert alert-success mb-3" role="alert" style={{backgroundColor: '#d4edda'}}>
              <h4 className="text-dark" >{t('email_sended')}</h4>
            </div>
          }
          {location.pathname === '/tutor' ? <MyLessons/> : ''}
          <Outlet context={{setProfileFilled: setProfileFilled}} />

          <OurRegularPopup>
            <div style={{display: 'flex', justifyContent: 'center', margin: 20}}>
              <h4>Все окей</h4>
            </div>
          </OurRegularPopup>

        </div>
      </div>

  )
}

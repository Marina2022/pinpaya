import s from './Header.module.scss'

import {Link, NavLink, useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useStateContext} from "../../../contexts/ContextProvider";
import {useTranslation} from "react-i18next";
import {Spinner} from "react-bootstrap";

import logo from '../../../assets/header/pinpaya-logo.svg'
import userIcon from '../../../assets/header/user.svg'
import coinsIcon from '../../../assets/header/coins.svg'
import chat from '../../../assets/header/chat.svg'

import LangSelect from "./LangSelect/LangSelect";
import BigOrangeBtn from "../../CommonComponents/BigOrangeBtn/BigOrangeBtn";
import cn from "classnames";
import MobileMenu from "./MobileMenu/MobileMenu";
import cookies from "js-cookie";

const Header = ({triggerMessage, showLoader}) => {

  const [currentCode, setCurrentCode] = useState(localStorage.getItem('i18next') || 'en')
  const {user, type, setUser} = useStateContext()
  const {t, i18n} = useTranslation();


  useEffect(()=>{
    // const currentLanguageCode = cookies.get('i18nextLng') || 'en'
    const currentLanguageCode = localStorage.getItem('i18next') || 'en';
    setCurrentCode(currentLanguageCode)
  },[])


  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem('i18next') || 'en')
  }, [])

  useEffect(()=>{
    const root = document.querySelector(':root');
    function calcHeight() {
      const heightWindow = window.innerHeight;
      root.style.setProperty('--myVh', heightWindow/100 + 'px');
    }

    calcHeight();
  }, [])


  const [isMobileOpen, setMobileIsOpen] = useState(false)

  return (
    <>
      <header className={s.header}>
        <nav className={s.mainNav}>
          <Link className={s.logo} to="/"><img src={logo} alt="logo"/></Link>
          <NavLink to="/find-tutor" className={({isActive}) => isActive ? s.activeNavLink : s.navLink}>
            {t('find_private_tutor')}
          </NavLink>

          <NavLink to="/become-tutor" className={({isActive}) => isActive ? s.activeNavLink : s.navLink}>
            {t('become_private_tutor')}
          </NavLink>

          <NavLink to="/faq" className={({isActive}) => isActive ? s.activeNavLink : s.navLink}>
            FAQ
          </NavLink>
        </nav>

        <div className={s.userNav}>
          {showLoader ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (

            user ?
              <>
                <Link className={s.walletLink} to={type === 'tutor' ? '/tutor/my-earnings' : '/student/my-wallet'}>

                  <div className={s.wallet}>
                    <img src={coinsIcon} alt='coins icon'/>
                    <div style={{marginLeft: '7px'}}>
                      <div className={s.amountBlock}>{user?.wallet} €</div>
                      <div className={s.textSuccess}>{user?.cashback ? `+ ${user?.cashback}€ cashback` : ''}</div>
                    </div>
                  </div>

                </Link>

                <button className={cn('normalBtn', s.chatBtn)} onClick={() => triggerMessage()}>
                  <img src={chat} alt="chat icon"/>
                  {user?.notif === 1 &&
                    <div className={s.unread}></div>
                  }
                </button>

                <Link to={`/${type}`}>
                  <div className="p-2 fw-bold">
                    {user?.avatar ?
                      <img className={s.userAvatar} src={'https://web.pinpaya.com/storage/' + user.avatar}
                           alt="avatar"/> :
                      <img className={s.userAvatar} src='https://app.pinpaya.com/no-image.png' alt="avatar"/>
                    }
                  </div>
                </Link>

              </>
              :
              <>
                <div className={s.langSelect}>
                  <LangSelect currentCode={currentCode} setCurrentCode={setCurrentCode} />
                </div>
                <BigOrangeBtn to="/login" classname={s.loginBtn}>
                  <img className={s.orangeBtnIcon} src={userIcon} alt="user icon"/>
                  <span className={s.btnText}>{t('login')}</span>
                </BigOrangeBtn>
              </>
          )
          }
          <MobileMenu currentCode={currentCode} setCurrentCode={setCurrentCode}/>
        </div>
      </header>
    </>
  );
};


export default Header;

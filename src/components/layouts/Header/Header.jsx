import s from './Header.module.scss'

import {Link, NavLink} from "react-router-dom";
import React, {useEffect} from "react";
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


const Header = ({triggerMessage, showLoader}) => {

  const {user, type, setUser} = useStateContext()
  const {t, i18n} = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem('i18next') || 'en')
  }, [])

  const languages = [
    {
      code: 'en',
      name: 'English',
      country_code: 'en',
    },
    {
      code: 'ru',
      name: 'Russian',
      country_code: 'ru',
    },
    {
      code: 'et',
      name: 'Estonian',
      country_code: 'et',
    },
  ]

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
                <LangSelect/>
                <BigOrangeBtn to="/login" classname={s.loginBtn}>
                  <img src={userIcon} alt="user icon"/>
                  <span className={s.btnText}>{t('login')}</span>
                </BigOrangeBtn>
              </>
            )
          }

          <div className={s.hamburger}><span></span></div>
        </div>

      </header>

    </>
  );
};

export default Header;

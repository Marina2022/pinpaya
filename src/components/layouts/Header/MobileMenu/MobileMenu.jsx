import s from './MobileMenu.module.scss';

import {motion, AnimatePresence} from 'framer-motion';
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useStateContext} from "../../../../contexts/ContextProvider";
import SearchField from "../../../CommonComponents/SearchField/SearchField";
import LangSelect from "../LangSelect/LangSelect";


const MobileMenu = () => {
  const [isMobileOpen, setMobileIsOpen] = useState(false)
  const {user, type} = useStateContext()
  const {t, i18n} = useTranslation();

  const body = document.querySelector('body')

  const onMenuBtnClick = () => {
    setMobileIsOpen(true)
    body.style.overflow = 'hidden'
  }

  const onClose = () => {
    setMobileIsOpen(false)
    body.style.overflow = 'unset'
  }

  return (
    <div>
      <div className={s.hamburger} onClick={onMenuBtnClick}>
        <span></span>
      </div>
      <AnimatePresence>
        {
          isMobileOpen && <motion.div
            key={1}
            className={s.menuWrapper}
            initial={{width: 0}}
            animate={{maxWidth: 340, width: '95%'}}
            exit={{width: 0}}

            transition={{
              duration: .2
            }}
          >
            <button className={s.closeBtn} onClick={onClose}>&times;</button>
            <div className={s.menuContent}>
              <LangSelect classname={s.langSelect}/>
              <SearchField setMobileIsOpen={setMobileIsOpen} autoComplete="off" placeholder={t('search')}/>

              {user &&
                <>
                    {type === 'tutor' &&
                      <ul className={s.mobileNav}>
                        <li className="menu-item">
                          <Link to="tutor/my-lessons" onClick={() => setMobileIsOpen(false)}>{t('my_lessons')}</Link>
                        </li>
                        <li className="menu-item">
                          <Link onClick={() => setMobileIsOpen(false)
                          } to="tutor/my-tutor-profile">  {t('my_tutor_profile')}</Link>
                        </li>
                        <li className="menu-item">
                          <Link onClick={() => setMobileIsOpen(false)}
                                to="tutor/my-schedule">  {t('my_schedule')}</Link>
                        </li>
                        <li className="menu-item">
                          <Link onClick={() => setMobileIsOpen(false)} to="tutor/my-earnings">{t('my_earnings')}</Link>
                        </li>
                        <li className="menu-item">
                          <Link onClick={() => setMobileIsOpen(false)}
                                to="tutor/account-settings">{t('account_settings')}</Link>
                        </li>
                        <li className="menu-item">
                          <span className={s.logoutItem}>Logout</span>

                          {/*<div className="logout-block" style={{color: '#dc3545'}}*/}
                          {/*     onClick={onLogout}>{t('logout')} </div>*/}
                        </li>
                      </ul>
                    }

                    {
                      type === "student" &&
                      <ul className={s.mobileNav}>
                        <li className="menu-item">
                          <Link onClick={() => setMobileIsOpen(false)} to="student/my-lessons">{t('my_lessons')}</Link>
                        </li>
                        <li className="menu-item">
                          <Link onClick={() => setMobileIsOpen(false)}
                                to="student/order-history">{t('order_history')}</Link></li>
                        <li className="menu-item">
                          <Link onClick={() => setMobileIsOpen(false)} to="student/my-wallet">{t('my_wallet')}</Link>
                        </li>
                        <li className="menu-item">
                          <Link onClick={() => setMobileIsOpen(false)}
                                to="student/payment-methods">{t('payment_methods')}</Link>
                        </li>
                        <li className="menu-item">
                          <Link onClick={() => setMobileIsOpen(false)}
                                to="student/account-settings">{t('account_settings')}</Link>
                        </li>
                        <li className="menu-item">
                          <span className={s.logoutItem}>Logout</span>
                          {/*<div className="logout-block" style={{color: '#dc3545'}}*/}
                          {/*     onClick={onLogout}>{t('logout')} </div>*/}
                        </li>
                      </ul>
                    }
                </>
              }


                <ul className={s.mobileNav}>
                  <li id="menu-item-5548"
                      className="menu-item mt-2 menu-item-type-post_type menu-item-object-page menu-item-5548"
                  >
                    <Link onClick={() => setMobileIsOpen(false)} to="about">{t('about_pinpaya')}</Link>
                  </li>
                  <li id="menu-item-6339"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6339">
                    <Link onClick={() => setMobileIsOpen(false)} to="become-tutor">{t('become_private_tutor')}</Link>
                  </li>
                  <li id="menu-item-3757"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3757">
                    <Link onClick={() => setMobileIsOpen(false)} to="find-tutor">{t('find_private_tutor')}</Link></li>
                  <li id="menu-item-3755"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3755">
                    <Link onClick={() => setMobileIsOpen(false)} to="faq">FAQ</Link></li>
                  <li id="menu-item-5581"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-5581">
                    <Link onClick={() => setMobileIsOpen(false)} to="support">{t('support')}</Link></li>
                  <li id="menu-item-14537"
                      className="menu-item menu-item-type-custom menu-item-object-custom menu-item-14537">
                    <Link onClick={() => setMobileIsOpen(false)} to="blog">{t('blog')}</Link></li>
                </ul>

            </div>
          </motion.div>
        }

        {
          isMobileOpen && <motion.div
            key={2}
            className='overlay'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{
              duration: .2
            }}

            onClick={onClose}
          >

          </motion.div>
        }
      </AnimatePresence>

    </div>

  )
}
export default MobileMenu;

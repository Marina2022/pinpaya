import s from './UserMenu.module.scss'
import {Col} from "react-bootstrap";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {signOut} from "firebase/auth";
import {auth} from "../../../firebase";
import AxiosClient from "../../../axios-client";
import {useStateContext} from "../../../contexts/ContextProvider";
import React from "react";

import menu1 from '../../../assets/userMenu/menu1.svg'
import menu2 from '../../../assets/userMenu/menu2.svg'
import menu3 from '../../../assets/userMenu/menu3.svg'
import menu5 from '../../../assets/userMenu/menu5.svg'
import menu6 from '../../../assets/userMenu/menulogout.svg'
import menu7 from '../../../assets/userMenu/tprofile.svg'
import menu8 from '../../../assets/userMenu/tschedule.svg'


const UserMenu = ({classname}) => {
  const {setUser, setToken, user, type} = useStateContext()

  const navigate = useNavigate();
  const {t, i18n} = useTranslation();

  const onLogout = (e) => {
    e.preventDefault();

    signOut(auth);

    AxiosClient.post('/logout').then(() => {
      setUser(null);
      setToken(null);
      navigate('/login');
    })
  }

  const navLinkFunction = ({isActive}) => {
    return {
      fontWeight: isActive ? "bold" : "",
      color: '#242424',
    };
  }

  return (
    <>
      {
        user && <div>

          {type === 'tutor' &&
            <Col lg="3" className={s.userMenu}>
              <div className="p-4 bg-white user-left-menu">
                <div className="m-2"><NavLink style={navLinkFunction} to="my-lessons"> <img src={menu1}
                                                                                            alt='icon'/>{t('my_lessons')}
                </NavLink>
                </div>

                <div className="m-2"><NavLink
                  style={navLinkFunction}
                  to="my-tutor-profile">
                  <img src={menu7} alt='icon'/>

                  {t('my_tutor_profile')}
                </NavLink></div>

                <div className="m-2"><NavLink style={navLinkFunction} to="my-schedule"> <img
                  src={menu8}
                  alt='icon'/>{t('my_schedule')}
                </NavLink>
                </div>

                <div className="m-2"><NavLink style={navLinkFunction} to="order-history"><img src={menu2}
                                                                                              alt='icon'/>{t('order_history')}
                </NavLink>
                </div>
                <div className="m-2"><NavLink style={navLinkFunction} to="my-earnings"> <img src={menu3}
                                                                                             alt='icon'/>{t('my_earnings')}
                </NavLink>
                </div>
                <div className="m-2"><NavLink style={navLinkFunction} to="account-settings"> <img src={menu5}
                                                                                                  alt='icon'/>{t('account_settings')}
                </NavLink></div>
                <div className="m-2 logout-menu" style={{color: '#dc3545'}} onClick={onLogout}><img src={menu6}
                                                                                                        alt='icon'/>{t('logout')}
                </div>
              </div>
            </Col>
          }

          {
            type === "student" &&
            <Col lg="3" className={s.userMenu}>
              <div className="border p-4 bg-white user-left-menu">
                <div className="m-2"><Link style={navLinkFunction} to="my-lessons"> <img src={menu1} alt='icon'/>{t('my_lessons')}</Link>
                </div>

                <div className="m-2"><Link style={navLinkFunction} to="order-history"><img src={menu2} alt='icon'/>{t('order_history')}</Link>
                </div>

                <div className="m-2"><Link style={navLinkFunction} to="my-wallet"><img src={menu3} alt='icon'/>{t('my_wallet')}</Link></div>

                <div className="m-2"><Link style={navLinkFunction} to="account-settings"><img src={menu5} alt='icon'/>{t('account_settings')}
                </Link></div>
                <div className="m-2 logout-menu" style={{color: '#dc3545'}} onClick={onLogout}><img src={menu6}
                                                                                                    alt='icon'/>{t('logout')}
                </div>
              </div>
            </Col>
          }
        </div>
      }
    </>


  );
};

export default UserMenu;

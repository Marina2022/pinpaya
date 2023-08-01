import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Link, Navigate, Outlet, useLocation, useNavigate} from "react-router-dom";
import {isMobile, isTablet} from 'react-device-detect';
import {useStateContext} from "../../../contexts/ContextProvider";
import AxiosClient from "../../../axios-client";
import MyLessons from "../MyLessons";

import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import axiosClient from "../../../axios-client";
import UserMenu from "../../CommonComponents/UserMenu/UserMenu";

import s from './Menu.module.scss'

export default function Menu() {
  const {token, type, user} = useStateContext()


  const location = useLocation();
  const [msg, setMsg] = useState(false);
  const {t, i18n} = useTranslation();

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
    <Container>

      <Row className="my-5">

        <>
          <UserMenu classname={s.menu}/>
        </>


        <Col lg="9">
          {user && user.email_verified_at === null &&
            <div className="p-4 border mb-4" role="alert" style={{background: 'white'}}>
              <h4 className="text-dark">{t('verif_account')}</h4>
              <h6>
                <button style={{background: 'black'}} onClick={resendLink}
                        className="btn mt-4">{t('resend_link')}</button>
              </h6>
            </div>
          }

          {msg &&
            <div className="alert alert-success mb-3" role="alert" style={{backgroundColor: '#d4edda'}}>
              <h4 className="text-dark">{t('email_sended')}</h4>
            </div>
          }
          {location.pathname == '/tutor' ? <MyLessons/> : ''}
          <Outlet/>
        </Col>
      </Row>
    </Container>
  )
}

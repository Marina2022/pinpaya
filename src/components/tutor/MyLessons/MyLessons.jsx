import React, {useContext, useEffect, useState} from "react";
import axiosClient from "../../../axios-client";
import {Col, Row} from "react-bootstrap";
import {CalendarDate, ChatSquare, Check2, CircleFill, InfoCircle, Trash} from "react-bootstrap-icons";
import Dropdown from 'react-bootstrap/Dropdown';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {Link, useNavigate} from "react-router-dom";
import firebaseCreateChat from "../../../hooks/firebaseCreateChat";
import {AuthContext} from "../../../contexts/AuthContext";
import {useStateContext} from "../../../contexts/ContextProvider";
import moment from "moment";
import chatNotif from "../../../hooks/chatNotif";
import {useTranslation} from "react-i18next";
import LessonsEmpty from "../../CommonComponents/LessonsEmpty/LessonsEmpty";
import LessonCard from "../../CommonComponents/LessonCard/LessonCard";

import s from './MyLessons.module.scss'

export default function MyLessons() {
  const [lessons, setLessons] = useState([]);
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const {currentUser} = useContext(AuthContext);
  const {type, user} = useStateContext();
  const {t, i18n} = useTranslation();
  useEffect(() => {
    const interval = setInterval(() => {
      getLessons()
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  const getLessons = () => {
    axiosClient.post('tutor/my-lessons').then(({data}) => {
      setLessons(data.lessons);
    }).catch(err => {
    })
  }

  useEffect(()=>{
    window.scrollTo(0, 0)
  }, [])


  useEffect(() => {
    getLessons();
  }, [])

  const confirmLesson = (id, time) => {

    MySwal.fire({
      title: `${t('confirm_modal_1')} <b className="text-danger"> ${moment(time).format('DD.MM.Y HH:mm:ss')} </b> ${t('confirm_modal_2')}`,
      text: t('confirm_modal_3'),
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: t('yes'),
      denyButtonText: t('no'),
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient.post('tutor/confirm-lesson', {id}).then(({data}) => {
          getLessons();
          if (data.notif != false) {
            chatNotif(data.notif, currentUser, data.student_id);
          }

        }).catch(err => {
        })
      }
    })

  }

  const message = (item) => {
    firebaseCreateChat(currentUser, item, user);
    document.getElementsByClassName('messageTrigger')[0].click();
  }

  const quit = (id, count) => {
    MySwal.fire({
      title: t('popup2_title'),
      html: `<b>${t('popup2_body1')}</b><br> ${t('popup2_body2')}`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: t('quit_l'),
      denyButtonText: t('cancel'),
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient.post('tutor/quit-tutoring', {id}).then(({data}) => {
          getLessons();
          if (data.notif != false) {
            chatNotif(data.notif, currentUser, data.student_id);
          }
        }).catch(err => {
        })
      }
    })
  }

  return (
    <div>
      <h1 className="myLessonsTitle">{t('my_lessons')}</h1>
      <div>
        {
          lessons?.length > 0 &&
          lessons.map((item, index) =>
            <LessonCard item={item} message={message} quit={quit} confirmLesson={confirmLesson} key={index}/>
          )}
        {lessons?.length === 0 &&
          <LessonsEmpty/>
        }
      </div>

    </div>
  )

}

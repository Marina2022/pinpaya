import {Col, Row,} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import axiosClient from "../../axios-client";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Dropdown from "react-bootstrap/Dropdown";
import {
  ArrowDown,
  CalendarDate,
  CaretRight,
  CaretRightSquareFill,
  ChatSquare,
  Check2, Circle, CircleFill, Exclamation, ExclamationCircle, InfoCircle,
  Square,
  SquareFill,
  Trash
} from "react-bootstrap-icons";
import {Link, useNavigate} from "react-router-dom";
import firebaseCreateChat from "../../hooks/firebaseCreateChat";
import {AuthContext} from "../../contexts/AuthContext";
import {useStateContext} from "../../contexts/ContextProvider";
import moment from "moment/moment";
import chatNotif from "../../hooks/chatNotif";
import {useTranslation} from "react-i18next";
import LessonsEmpty from "../CommonComponents/LessonsEmpty/LessonsEmpty";
import LessonCard from "../CommonComponents/LessonCard/LessonCard";

export default function MyLessons() {

  useEffect(()=>{
    window.scrollTo(0, 0)
  }, [])

  const [lessons, setLessons] = useState([]);
  const [reschedule, setReschedule] = useState([]);
  const MySwal = withReactContent(Swal)
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
    axiosClient.post('student/my-lessons').then(({data}) => {
      setLessons(data.lessons);
      setReschedule(data.reschedule);
    }).catch(err => {
    })
  }

  useEffect(() => {
    getLessons();
  }, [])

  const confirmLesson = (id, time) => {

    MySwal.fire({
      title: `${t('confirm_modal_1')}  <b className="text-danger"> ${moment(time).format('DD.MM.Y HH:mm:ss')} </b> ${t('confirm_modal_2')}  `,
      text: t('confirm_modal_3'),
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: t('yes'),
      denyButtonText: t('no'),
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient.post('student/confirm-lesson', {id}).then(({data}) => {
          getLessons();
          if (data.notif != false) {
            chatNotif(data.notif, currentUser, data.tutor_id);
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
      title: t('popup1_title'),
      html: ` <b>${t('popup1_body1')}</b> <br> ${t('popup1_body2')} ${count} ${t('multi_lessons')}.`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: t('quit_l'),
      denyButtonText: t('cancel'),
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient.post('student/quit-learning', {id}).then(({data}) => {
          getLessons();
          if (data.notif != false) {
            chatNotif(data.notif, currentUser, data.tutor_id);
          }
        }).catch(err => {
        })
      }
    })
  }

  return (

    <div>
      <h1 className="profilePageTitle">{t('my_lessons')}</h1>
      <div>
        {
          reschedule?.tutor_id &&
          <div className="text-danger align-items-center fw-bold mb-sm-1"><ExclamationCircle size={20}/> Tutor canceled
            one or more lessons, please reschedule <Link style={{paddingLeft: '5px'}}
                                                         to={`/student/reschedule/${reschedule.tutor_id}`}> here. </Link>
          </div>
        }

        {
          lessons?.length > 0 &&
          lessons.map(item =>
            <LessonCard item={item} confirmLesson={confirmLesson} message={message} quit={quit}/>
          )}
        {lessons?.length === 0 &&
          <LessonsEmpty/>
        }

        {/*<Link to="find-tutor"><Button className="mt-4" variant="danger">ORDER LESSONS</Button></Link>*/}
      </div>

    </div>
  )
}

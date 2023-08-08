import s from './LessonCard.module.scss';
import moment from "moment/moment";
import Dropdown from "react-bootstrap/Dropdown";
import {CalendarDate, ChatSquare, Check2, CircleFill, Trash} from "react-bootstrap-icons";
import {Link} from "react-router-dom";
import React from "react";
import {useTranslation} from "react-i18next";
import {useStateContext} from "../../../contexts/ContextProvider";
import BigOrangeBtn from "../BigOrangeBtn/BigOrangeBtn";

import videocam from '../../../assets/profile/videocam.svg'
import cn from "classnames";

const LessonCard = ({item, message, confirmLesson, quit}) => {
  const {type} = useStateContext()
  const {t, i18n} = useTranslation();


  return (

    <div key={item.id} className={s.lessonCard}>
      <div className={s.globalWrapper}>
        <div className={s.mainInfo}>
          <div className={s.avatar}>

            {
              type === 'tutor' && <div>
                {item.avatar ?
                  <img className={s.ava} src={'https://web.pinpaya.com/storage/' + item.avatar} alt="avatar"/>
                  : <img className="avatar-wrap" src="https://app.pinpaya.com/no-image.png" alt="avatar"/>
                }
              </div>
            }

            {
              type === 'student' && <div>
                {item.avatar ?
                  <Link to={'/tutor/' + item.id}>
                    <img className="avatar-wrap"
                         src={'https://web.pinpaya.com/storage/' + item.avatar}
                         alt="avatar"/></Link>
                  : <Link to={'/tutor/' + item.id}>
                    <img className="avatar-wrap"
                         src="https://app.pinpaya.com/no-image.png"/></Link>
                }
              </div>
            }


          </div>
          <div className={s.desc}>
            <div>
              {
                type === 'tutor' && <h3 className={s.name}>{item.name}</h3>
              }

              {
                type === 'student' && <h3 className={s.name}><Link to={'/tutor/' + item.id}>{item.name}</Link></h3>
              }

              <div className={s.order}>{t('order')} #{item?.orderId}</div>
            </div>

            <div className={s.lessonDescRow}>
              <span className={s.lessonLabel}><b>{t('next_lesson')}:</b></span>
              <span><b
                className="text-danger">{item.last ? moment(item.last.start_time).format('DD.MM.Y HH:mm:ss') : '-'}</b></span>
            </div>

            <div className={cn(s.lessonDescRow, "my-lessons-dropdown")}>
              <span className={s.lessonLabel}>
                {t('lessons_left')}:
              </span>
              <div className={s.dropdownWrapper}>
                <span>{item.count}</span>
                <Dropdown size="xs">
                  <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    {t('show_schedule')}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {
                      item.calendars?.length > 0 &&
                      item.calendars.map((item_calendar, index) => (<Dropdown.Item key={index}
                                                                                   style={{position: 'relative'}}>{item.last && item.last.start_time === item_calendar.start_time ?
                        <CircleFill color="red" style={{
                          position: 'absolute',
                          left: '1px',
                          top: '9px',
                          fontSize: '14px',
                          zIndex: '9'
                        }}/> : ''}
                        <div style={{
                          width: '2px',
                          height: '45px',
                          background: 'black',
                          position: 'absolute',
                          left: '7px'
                        }}></div>
                        <div
                          style={{margin: '0 10px'}}>{moment(item_calendar.start_time).format('DD.MM.Y HH:mm:ss')}</div>
                        {item_calendar.confirm === 2 ? <Check2 color="green"/> : ''}</Dropdown.Item>))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>

            <div className={s.lessonDescRow}>
              <span className={s.lessonLabel}>
                {t('phone')}
              </span>
              <span>{item.email}</span>
            </div>

            <div className={s.lessonDescRow}>
              <span className={s.lessonLabel}>
                {t('email')}:
              </span>
              <span>{item.phone}</span>
            </div>
          </div>
        </div>

        <div className={s.lessonButtons}>
          {item.last &&
            <>
              <BigOrangeBtn classname={s.orangeButton}
                            disabled={type === 'tutor' ? item.last.first_confirmed === 'tutor' : item.last.first_confirmed === 'student'}

                            onClick={() => confirmLesson(item.last ? item.last.id : 0, item.last.start_time)}>
                {

                  type === 'tutor' ?
                    (
                      item.last.first_confirmed === 'tutor' ?
                        t('waiting_student_confirmation') :
                        t('confirm_last_lesson')
                    )
                    :
                    (
                      item.last.first_confirmed === 'student' ? 'YOU CONFIRMED THE LAST LESSON' : item.last.first_confirmed === 'tutor' ? `WAITING CONFIRMATION ${moment(item.last.start_time).format('DD.MM.Y HH:mm:ss')}` : t('confirm_last_lesson')
                    )
                }
              </BigOrangeBtn>

              {item.last['room_id'] !== null && item.last['room_id'] !== 'null' ?
                <a href={`/lesson/${item.last.id}?roomID=${item.last['room_id']}`}>
                  <BigOrangeBtn classname={s.yellowBtn}>
                    <img className={s.videocamIcon} src={videocam} alt="icon"/> {t('start_lesson')}
                  </BigOrangeBtn>
                </a>
                :
                <a href={`/lesson/${item.last.id}`}>
                  <button style={{
                    fontSize: '14px',
                    borderRadius: '3px',
                    height: '53px',
                    background: '#FFE33C',
                    color: 'black'
                  }} className="btn d-block w-100 btn7">
                    <img src="/public/videocam.svg" style={{width: '24px'}} alt=""/> {t('start_lesson')}
                  </button>
                </a>
              }
            </>
          }

          {
             type === 'student' && !item.last &&

            <Link style={{color: 'white'}} to={`/tutor/${item.id}`}>
              <BigOrangeBtn classname={s.bookBtn}>Book new lessons</BigOrangeBtn>
            </Link>
          }

        </div>
      </div>


      <div className="d-flex mt-4 my-lesson-activity text-center text-sm-start">

        <div style={{cursor: 'pointer', marginRight: '25px', color: '#666666'}}
             onClick={() => quit(item.id, item.count_done)}>
          <Trash color="#666666"
                 size={20}/> {t('quit_tutoring')}
        </div>

        <div style={{cursor: 'pointer', marginRight: '25px'}}>
          <Link style={{color: '#666666'}}
                to={
                  type === 'tutor' ?
                    '/tutor/reschedule/' + item.id
                    :
                    '/student/reschedule/' + item.id
                }>
            <CalendarDate
              color="#666666" size={20}/> {t('change_lesson_dates')}
          </Link>
        </div>

        <div style={{cursor: 'pointer', marginRight: '25px', color: '#666666'}} onClick={() => message(item)}>
          <ChatSquare color="#666666" size={20}/> {t('chat')}
        </div>
      </div>

    </div>

  );
};

export default LessonCard;

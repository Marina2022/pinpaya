import s from './LessonCard.module.scss';
import {Col, Row} from "react-bootstrap";
import moment from "moment/moment";
import Dropdown from "react-bootstrap/Dropdown";
import {CalendarDate, ChatSquare, Check2, CircleFill, Trash} from "react-bootstrap-icons";
import {Link} from "react-router-dom";
import React from "react";
import {useTranslation} from "react-i18next";
import {useStateContext} from "../../../contexts/ContextProvider";

const LessonCard = ({item, message, confirmLesson, quit}) => {
  const {type} = useStateContext()
  const {t, i18n} = useTranslation();


  return (

    <div key={item.id} className="m-1 mb-3 p-4 bg-white" style={{borderRadius: '3px', marginBottom: '5px'}}>
      <Row>
        <Col md={12} lg={2} style={{display: 'flex', alignItems: 'center'}}>

          {
            type === 'tutor' && <div>
              {item.avatar ?
                <img className="avatar-wrap" src={'https://web.pinpaya.com/storage/' + item.avatar} alt="avatar"/>
                : <img className="avatar-wrap" src="https://app.pinpaya.com/no-image.png"/>
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


        </Col>
        <Col md={12} lg={6} className="my-lessons-area">
          <div>
            {
              type === 'tutor' && <h5>{item.name}</h5>
            }

            {
              type === 'student' && <h5><Link to={'/tutor/' + item.id}>{item.name}</Link></h5>
            }


            <div className="mb-2">{t('order')} #{item?.orderId}</div>
          </div>

          <div style={{display: 'flex', justifyContent: 'space-between'}}><b>{t('next_lesson')}:</b> <b
            className="text-danger">{item.last ? moment(item.last.start_time).format('DD.MM.Y HH:mm:ss') : '-'}</b>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between'}} className="my-lessons-dropdown">
            <div><b>{t('lessons_left')}:</b> {item.count}</div>
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
                    {item_calendar.confirm == 2 ? <Check2 color="green"/> : ''}</Dropdown.Item>))}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <b>{t('email')}:</b> {item.email}
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}><b>{t('phone')}:</b> {item.phone}
          </div>

        </Col>

        {/*-------------*/}

        <Col md={12} lg={4}>
          {item.last &&
            <>
              <button style={{fontSize: '14px', borderRadius: '3px', height: '53px'}}
                      className="btn d-block w-100 mb-2"

                      disabled={type === 'tutor' ? item.last.first_confirmed === 'tutor' : item.last.first_confirmed === 'student'}

                      onClick={() => confirmLesson(item.last ? item.last.id : 0, item.last.start_time)}>
                {

                  type === 'tutor' ?
                    (
                      item.last.first_confirmed == 'tutor' ?
                        t('waiting_student_confirmation') :
                        t('confirm_last_lesson')
                    )
                    :
                    (
                      item.last.first_confirmed === 'student' ? 'YOU CONFIRMED THE LAST LESSON' : item.last.first_confirmed === 'tutor' ? `WAITING CONFIRMATION ${moment(item.last.start_time).format('DD.MM.Y HH:mm:ss')}` : t('confirm_last_lesson')
                    )
                }
              </button>

              {item.last['room_id'] != null && item.last['room_id'] != 'null' ?
                <a href={`/lesson/${item.last.id}?roomID=${item.last['room_id']}`}>
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
            type === 'student' && !item.last && <Link style={{color: 'white'}} to={`/tutor/${item.id}`}>
              <button className="btn d-block w-100">Book new lessons</button>
            </Link>
          }

        </Col>

        {/*-------------*/}

        <div className="d-flex mt-4 my-lesson-activity">
          <div style={{cursor: 'pointer', marginRight: '25px', color: '#666666'}}
               onClick={() => quit(item.id, item.count_done)}>
            <Trash color="#666666"
                   size={20}/> {t('quit_tutoring')}</div>
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
            </Link></div>
          <div style={{cursor: 'pointer', marginRight: '25px', color: '#666666'}} onClick={() => message(item)}>
            <ChatSquare color="#666666" size={20}/> {t('chat')}</div>
        </div>
      </Row>
    </div>

  );
};

export default LessonCard;

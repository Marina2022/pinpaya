import {Col, Row, } from "react-bootstrap";
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

export default function MyLessons(){
    const [lessons, setLessons] = useState([]);
    const [reschedule, setReschedule] = useState([]);
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
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
        }).catch(err => {})
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
                axiosClient.post('student/confirm-lesson',{id}).then(({data}) => {
                    getLessons();
                    if(data.notif != false){
                        chatNotif(data.notif, currentUser, data.tutor_id);
                    }
                }).catch(err => {})
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
                axiosClient.post('student/quit-learning',{id}).then(({data}) => {
                    getLessons();
                    if(data.notif != false){
                        chatNotif(data.notif, currentUser, data.tutor_id);
                    }
                }).catch(err => {})
            }
        })
    }

    return(
        <div>
            <h2 className="mb-4"><b>{t('my_lessons')}</b></h2>
            <div>
                {
                    reschedule?.tutor_id &&
                    <div className="text-danger d-flex align-items-center fw-bold"><ExclamationCircle size={20} /> Tutor canceled one or more lessons, please reschedule <Link style={{paddingLeft: '5px'}} to={`/student/reschedule/${reschedule.tutor_id}`}> here. </Link></div>
                }
                {
                    lessons?.length > 0 &&
                    lessons.map(item =>
                            <div key={item.id} className="m-1 mb-3 p-4 bg-white" style={{borderRadius:'3px',marginBottom:'5px'}}>
                                <Row>
                                    <Col  lg="2" style={{display:'flex',alignItems:'center'}}>
                                        <div>
                                            { item.avatar ?
                                                <Link to={'/tutor/'+ item.id }><img className="avatar-wrap" src={'https://web.pinpaya.com/storage/'+item.avatar} alt="avatar"/></Link>
                                                : <Link to={'/tutor/'+ item.id }><img className="avatar-wrap" src="https://app.pinpaya.com/no-image.png" /></Link>
                                            }
                                        </div>

                                    </Col>
                                    <Col  lg="6" className="my-lessons-area">
                                        <div>
                                            <h5 ><Link to={'/tutor/'+ item.id }>{item.name}</Link></h5>
                                            <div className="mb-2">{t('order')} #{item?.orderId}</div>
                                        </div>

                                        <div style={{display:'flex', justifyContent:'space-between'}}><b>{t('next_lesson')}:</b> <b className="text-danger">{item.last ? moment(item.last.start_time).format('DD.MM.Y HH:mm:ss') : '-'}</b></div>
                                        <div style={{display:'flex', justifyContent:'space-between'}} className="my-lessons-dropdown">
                                            <div><b>{t('lessons_left')}:</b> {item.count}</div>
                                            <Dropdown size="xs">
                                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                    {t('show_schedule')}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {
                                                        item.calendars?.length > 0  &&
                                                        item.calendars.map((item_calendar, index) => (<Dropdown.Item key={index} style={{position:'relative'}}>{item.last && item.last.start_time === item_calendar.start_time ? <CircleFill color="red" style={{position:'absolute', left:'1px',top:'9px', fontSize: '14px', zIndex:'9'}} /> : ''  } <div style={{width:'2px',height:'45px',background:'black', position:'absolute', left:'7px'}}></div> <div style={{margin:'0 10px'}}>{moment(item_calendar.start_time).format('DD.MM.Y HH:mm:ss')}</div> {item_calendar.confirm == 2 ? <Check2 color="green" /> : ''}</Dropdown.Item>))}
                                                </Dropdown.Menu>
                                            </Dropdown>

                                        </div>
                                        <div style={{display:'flex', justifyContent:'space-between'}}><b>{t('email')}:</b> {item.email}</div>
                                        <div style={{display:'flex', justifyContent:'space-between'}}><b>{t('phone')}:</b> {item.phone}</div>
                                        {/*{*/}
                                        {/*    item.last &&*/}
                                        {/*    <div style={{display:'flex', justifyContent:'space-between'}}><b>Subject:</b> {item.last?.subject ? item.last.subject.name : '-'}</div>*/}
                                        {/*}*/}

                                    </Col>
                                    <Col  lg="4">
                                        {item.last ? (
                                            <>
                                                <button style={{fontSize:'14px', borderRadius:'3px', height:'53px'}} className="btn d-block w-100 mb-2" disabled={item.last.first_confirmed =='student' ? true : false}   onClick={() => confirmLesson(item.last ? item.last.id : 0, item.last.start_time)}>{item.last.first_confirmed =='student' ? 'YOU CONFIRMED THE LAST LESSON' : item.last.first_confirmed == 'tutor' ? `WAITING CONFIRMATION ${moment(item.last.start_time).format('DD.MM.Y HH:mm:ss')}` : t('confirm_last_lesson')} </button>
                                                {
                                                    item.last['room_id'] != null &&  item.last['room_id'] != 'null' ?
                                                        <a href={`/lesson/${item.last.id}?roomID=${item.last['room_id']}`}>
                                                            <button style={{fontSize:'14px', borderRadius:'3px', height:'53px', background:'#FFE33C',color:'black'}} className="btn d-block w-100 btn7"><img src="/public/videocam.svg" style={{width:'24px'}} alt=""/>{t('start_lesson')}</button>
                                                        </a> :
                                                        <button style={{fontSize:'14px', borderRadius:'3px', height:'53px', background:'#FFE33C',color:'black'}} className="btn d-block w-100 btn7"><img src="/public/videocam.svg" style={{width:'24px'}} alt=""/>{t('start_lesson')}</button>

                                                }
                                            </>
                                            ) : (
                                                <Link style={{color:'white'}} to={`/tutor/${item.id}`}> <button className="btn d-block w-100">Book new lessons</button> </Link>
                                        )}
                                    </Col>
                                    <div className="d-flex mt-4 my-lesson-activity">
                                        <div style={{cursor:'pointer', marginRight:'25px',color:'#666666'}} onClick={() => quit(item.id, item.count_done)}><Trash color="#666666" size={20}/> {t('quit_learning')}</div>
                                        <div style={{cursor:'pointer', marginRight:'25px'}}><Link style={{color:'#666666'}} to={'/student/reschedule/'+item.id}><CalendarDate color="#666666" size={20}/> {t('change_lesson_dates')}</Link></div>
                                        <div style={{cursor:'pointer', marginRight:'25px', color:'#666666'}} onClick={() => message(item)}><ChatSquare color="#666666" size={20}/> {t('chat')}</div>
                                    </div>
                                </Row>
                            </div>
                    )}
                {lessons?.length == 0 &&
                    <h4 className="d-flex align-items-center text-danger"><InfoCircle/>{t('lessons_empty')}</h4>
                }

                {/*<Link to="find-tutor"><Button className="mt-4" variant="danger">ORDER LESSONS</Button></Link>*/}
            </div>

        </div>
    )
}

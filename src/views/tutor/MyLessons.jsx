import React, {useContext, useEffect, useState} from "react";
import axiosClient from "../../axios-client";
import {Col, Row} from "react-bootstrap";
import {CalendarDate, ChatSquare, Check2, CircleFill, InfoCircle, Trash} from "react-bootstrap-icons";
import Dropdown from 'react-bootstrap/Dropdown';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {Link, useNavigate} from "react-router-dom";
import firebaseCreateChat from "../../hooks/firebaseCreateChat";
import {AuthContext} from "../../contexts/AuthContext";
import {useStateContext} from "../../contexts/ContextProvider";
import moment from "moment";
import chatNotif from "../../hooks/chatNotif";
import {useTranslation} from "react-i18next";

export default function MyLessons(){
    const [lessons, setLessons] = useState([]);
    const MySwal = withReactContent(Swal);
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
        axiosClient.post('tutor/my-lessons').then(({data}) => {
            setLessons(data.lessons);
        }).catch(err => {})
    }

    useEffect(() => {
        getLessons();
    }, [])

    const confirmLesson = (id, time) => {

        MySwal.fire({
            title: `${t('confirm_modal_1')} <b class="text-danger"> ${moment(time).format('DD.MM.Y HH:mm:ss')} </b> ${t('confirm_modal_2')}`,
            text: t('confirm_modal_3'),
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: t('yes'),
            denyButtonText: t('no'),
        }).then((result) => {
            if (result.isConfirmed) {
                axiosClient.post('tutor/confirm-lesson',{id}).then(({data}) => {
                    getLessons();
                    if(data.notif != false){
                        chatNotif(data.notif, currentUser, data.student_id);
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
            title: t('popup2_title'),
            html: `<b>${t('popup2_body1')}</b><br> ${t('popup2_body2')}`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: t('quit_l'),
            denyButtonText: t('cancel'),
        }).then((result) => {
            if (result.isConfirmed) {
                axiosClient.post('tutor/quit-tutoring',{id}).then(({data}) => {
                    getLessons();
                    if(data.notif != false){
                        chatNotif(data.notif, currentUser, data.student_id);
                    }
                }).catch(err => {})
            }
        })
    }


    return(
        <div>
            <h2 className="mb-4"><b>{t('my_lessons')}</b></h2>
            <div >
                    {
                        lessons?.length > 0 &&
                        lessons.map(item =>
                                <div key={item.id} className="m-1 mb-3 p-4 bg-white" style={{borderRadius:'3px',marginBottom:'5px'}}>
                                    <Row>
                                        <Col md={12} lg={2} style={{display:'flex',alignItems:'center'}}>
                                            <div>
                                                { item.avatar ?
                                                    <img className="avatar-wrap" src={'https://web.pinpaya.com/storage/'+item.avatar} alt="avatar"/>
                                                    : <img className="avatar-wrap" src="https://app.pinpaya.com/no-image.png" />
                                                }
                                            </div>

                                        </Col>
                                        <Col md={12} lg={6} className="my-lessons-area">
                                            <div>
                                                <h5 >{item.name}</h5>
                                                <div className="mb-2">{t('order')} #{item?.orderId}</div>
                                            </div>

                                            <div style={{display:'flex', justifyContent:'space-between'}}><b>{t('next_lesson')}:</b> <b className="text-danger">{item.last ? moment(item.last.start_time).format('DD.MM.Y HH:mm:ss') : '-'}</b></div>
                                            <div style={{display:'flex', justifyContent:'space-between'}} className="my-lessons-dropdown">
                                                <div><b>{t('lessons_left')}:</b> {item.count}</div>
                                                <Dropdown size="xs" >
                                                    <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                                        {t('show_schedule')}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        {
                                                            item.calendars?.length > 0  &&
                                                            item.calendars.map((item_calendar, index) => (<Dropdown.Item style={{position:'relative'}}>{item.last && item.last.start_time === item_calendar.start_time ? <CircleFill color="red" style={{position:'absolute', left:'1px',top:'9px', fontSize: '14px', zIndex:'9'}} /> : ''  } <div style={{width:'2px',height:'45px',background:'black', position:'absolute', left:'7px'}}></div> <div style={{margin:'0 10px'}}>{moment(item_calendar.start_time).format('DD.MM.Y HH:mm:ss')}</div> {item_calendar.confirm == 2 ? <Check2 color="green" /> : ''}</Dropdown.Item>))}
                                                    </Dropdown.Menu>
                                                </Dropdown>

                                            </div>

                                            <div style={{display:'flex', justifyContent:'space-between'}}><b>{t('email')}:</b> {item.email}</div>
                                            <div style={{display:'flex', justifyContent:'space-between'}}><b>{t('phone')}:</b> {item.phone}</div>
                                            {/*<div style={{display:'flex', justifyContent:'space-between'}}><b>Subject:</b> {item.last?.subject ? item.last.subject.name : '-'}</div>*/}

                                        </Col>
                                        <Col md={12} lg={4}>
                                            {item.last &&
                                                <>
                                                    <button style={{fontSize:'14px', borderRadius:'3px',height:'53px'}} className="btn d-block w-100 mb-2" disabled={item.last.first_confirmed =='tutor' ? true : false}    onClick={() => confirmLesson(item.last ? item.last.id : 0, item.last.start_time)}>{item.last.first_confirmed =='tutor' ? t('waiting_student_confirmation') : t('confirm_last_lesson') } </button>
                                                    <button style={{fontSize:'14px', borderRadius:'3px',height:'53px', background:'#FFE33C', color:'black'}} className="btn d-block w-100 btn7"><img src="/videocam.svg" style={{width:'24px'}} alt=""/> {t('start_lesson')}</button>
                                                </>
                                            }
                                        </Col>
                                        <div className="d-flex mt-4 my-lesson-activity">
                                            <div style={{cursor:'pointer', marginRight:'25px',color:'#666666'}} onClick={() => quit(item.id, item.count_done)}><Trash color="#666666" size={20}/> {t('quit_tutoring')}</div>
                                            <div style={{cursor:'pointer', marginRight:'25px'}}><Link style={{color:'#666666'}} to={'/tutor/reschedule/'+item.id}><CalendarDate color="#666666" size={20}/> {t('change_lesson_dates')}</Link></div>
                                            <div style={{cursor:'pointer', marginRight:'25px',color:'#666666'}} onClick={() => message(item)}><ChatSquare color="#666666" size={20}/> {t('chat')}</div>
                                        </div>
                                    </Row>
                                </div>
                            // <tr>
                            //     <td>{item.subject ? item.subject.name : '-'}</td>
                            //     <td>{item.start_time}</td>
                            //     <td>{item.student.name}</td>
                            //     <td>{item.status == 1 ? 'in process' : 'done'}</td>
                            // </tr>
                        )}
                {lessons?.length == 0 &&
                    <h4 className="d-flex align-items-center text-danger"><InfoCircle/>{t('lessons_empty')}</h4>
                }
                {/*<Table bordered hover className="mt-3 bg-white">*/}
                {/*    <thead>*/}
                {/*    <tr>*/}
                {/*        <th>Subject</th>*/}
                {/*        <th>Start</th>*/}
                {/*        <th>Student</th>*/}
                {/*        <th>Status</th>*/}
                {/*    </tr>*/}
                {/*    </thead>*/}
                {/*    <tbody>*/}
                {/*    {*/}
                {/*        lessons?.length > 0 &&*/}
                {/*        lessons.map(item =>*/}
                {/*            <tr>*/}
                {/*                <td>{item.subject ? item.subject.name : '-'}</td>*/}
                {/*                <td>{item.start_time}</td>*/}
                {/*                <td>{item.student.name}</td>*/}
                {/*                <td>{item.status == 1 ? 'in process' : 'done'}</td>*/}
                {/*            </tr>*/}
                {/*        )}*/}
                {/*    </tbody>*/}
                {/*</Table>*/}
                {/*<Link to="find-tutor"><Button className="mt-4" variant="danger">ORDER LESSONS</Button></Link>*/}
            </div>

        </div>
    )
    // return(
    //     <>
    //         <h2 className="mb-4">My lessons</h2>
    //         <div className="bg-white p-4">
    //             <div className="mb-3">Teil pole veel õpilasi.</div>
    //             <div className="mb-3">Kui õpilased tellivad teilt tunde, kuvatakse siin õpilaste nimekiri.</div>
    //         </div>
    //
    //     </>
    // )
}
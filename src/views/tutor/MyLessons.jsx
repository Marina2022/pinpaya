import {useContext, useEffect, useState} from "react";
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

export default function MyLessons(){
    const [lessons, setLessons] = useState([]);
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const {type, user} = useStateContext();
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
            title: `Has the lesson <b class="text-danger"> ${time} </b> already taken place? `,
            text: 'Please confirm the lessons only after they have taken place.',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
        }).then((result) => {
            if (result.isConfirmed) {
                axiosClient.post('tutor/confirm-lesson',{id}).then(({data}) => {
                    getLessons();
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
            title: 'Termination of tutoring with student',
            html: `<b>Are you sure to quit tutoring for this student?</b><br> The student may not order new lessons from you due to a unpleasant experience.`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Quit learning & refund',
            denyButtonText: `Cancel`,
        }).then((result) => {
            if (result.isConfirmed) {
                axiosClient.post('tutor/quit-tutoring',{id}).then(({data}) => {
                    getLessons();
                }).catch(err => {})
            }
        })
    }


    return(
        <>
            <h2 className="mb-4">My lessons</h2>
            <div className="bg-white p-4">
                    {
                        lessons?.length > 0 &&
                        lessons.map(item =>
                            <div key={item.id} className="m-4 border p-3">
                                <Row>
                                    <Col md={12} lg={2} className="">
                                       <div>
                                           { item.avatar ?
                                               <img className="avatar-wrap" src={'https://web.pinpaya.com/storage/'+item.avatar} alt="avatar"/>
                                               : <img className="avatar-wrap" src="https://app.pinpaya.com/no-image.png" />
                                           }
                                       </div>

                                    </Col>
                                    <Col md={12} lg={6}>
                                        <div><h5 className="mb-2">{item.name}</h5></div>
                                        <div><b>Order</b> #14256</div>
                                        <div><b>Next Lesson:</b> <b className="text-danger">{item.last ? item.last.start_time : '-'}</b></div>
                                        <div><b>Subject:</b> {item.last.subject ? item.last.subject.name : '-'}</div>
                                        <div><b>Email:</b> {item.email}</div>
                                        <div className="my-lessons-dropdown">
                                            <div><b>Lessons left:</b> {item.count}</div>
                                            <Dropdown size="xs" className="mt-2" >
                                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                    Show Schedule
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {
                                                        item.calendars?.length > 0  &&
                                                        item.calendars.map((item_calendar, index) => (<Dropdown.Item style={{position:'relative'}}>{item.last && item.last.start_time === item_calendar.start_time ? <CircleFill color="red" style={{position:'absolute', left:'1px',top:'9px', fontSize: '14px', zIndex:'9'}} /> : ''  } <div style={{width:'2px',height:'45px',background:'black', position:'absolute', left:'7px'}}></div> <div style={{margin:'0 10px'}}>{item_calendar.start_time}</div> {item_calendar.confirm == 2 ? <Check2 color="green" /> : ''}</Dropdown.Item>))}
                                                </Dropdown.Menu>
                                            </Dropdown>

                                        </div>
                                    </Col>
                                    <Col md={12} lg={4}>
                                        {item.last &&
                                            <>
                                                <button className="btn d-block w-100 mb-2" disabled={item.last.first_confirmed =='tutor' ? true : false}    onClick={() => confirmLesson(item.last ? item.last.id : 0, item.last.start_time)}>{item.last.first_confirmed =='tutor' ? 'WAITING STUDENT TO CONFIRM' : 'CONFIRM LAST LESSON' } </button>
                                                <button className="btn d-block w-100">START LESSON</button>
                                            </>
                                        }
                                    </Col>
                                    <div className="d-flex justify-content-between mt-4">
                                        <div style={{cursor:'pointer'}} onClick={() => quit(item.id, item.count_done)}><Trash size={20}/> Quit tutoring</div>
                                        <div style={{cursor:'pointer'}}><Link to={'/tutor/reschedule/'+item.id}><CalendarDate size={20}/> Change lessons dates</Link></div>
                                        <div style={{cursor:'pointer'}} onClick={() => message(item)}><ChatSquare size={20}/> Chat with student</div>
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
                    <h4 className="d-flex align-items-center text-primary"><InfoCircle/> Lessons are empty</h4>
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

        </>
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
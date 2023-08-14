import {useContext, useEffect, useState} from "react";
import axiosClient from "../../axios-client";
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {InfoCircle} from "react-bootstrap-icons";
import moment from "moment/moment";
import chatNotif from "../../hooks/chatNotif";
import {AuthContext} from "../../contexts/AuthContext";
import {useTranslation} from "react-i18next";
export default function Reschedule(){
    const [lessons, setLessons] = useState([]);
    let { id } = useParams();
    const MySwal = withReactContent(Swal)
    const { currentUser } = useContext(AuthContext);
    const {t, i18n} = useTranslation();
    useEffect(() => {
        getItems();
    }, [])

    useEffect(()=>{
        window.scrollTo(0, 0)
    }, [])

    const getItems = () => {
        axiosClient.get('tutor/get-reschedule/'+id).then(({data}) => {
            setLessons(data.lessons);
        }).catch(err => {})
    }
    const reschedule = (id) => {
        MySwal.fire({
            title: 'Request time reschedule from student?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: t('yes'),
            denyButtonText: t('no'),
        }).then((result) => {
            if (result.isConfirmed) {
                axiosClient.post('tutor/reschedule',{id}).then(({data}) => {
                    getItems();

                    chatNotif(data.notif, currentUser, data.student_id);
                    MySwal.fire({
                        icon: 'success',
                        text: t('sended'),
                    })
                }).catch(err => {
                    MySwal.fire({
                        icon: 'error',
                        text: t('something_wrong'),
                    })
                })
            }
        })
    }

    return(
        <>
            <Container>
                <div className="mb-5">
                    <h2 className="mb-2">{t('reschedule')}</h2>
                        {
                            lessons?.length > 0 ? (
                                    lessons.map(item =>
                                        <div className="my-3 border p-3 bg-white" >
                                            <Row>
                                                <Col md={4}><div><b>{moment(item.start_time).format('DD.MM.Y HH:mm:ss')}</b></div></Col>
                                                <Col md={4}><div>{t('student')}: <b>{item.student.name}</b></div></Col>
                                                <Col md={4}>  <button className="btn btn-danger" onClick={() => reschedule(item.id)}>{t('request_reschedule')}</button></Col>
                                            </Row>
                                        </div>
                                    )
                                ) : (
                                <h4 className="d-flex align-items-center text-danger"><InfoCircle/> {t('appointments_empty')}</h4>
                            )}
                </div>
            </Container>
        </>
    )
}

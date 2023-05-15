import {useEffect, useState} from "react";
import axiosClient from "../../axios-client";
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {InfoCircle} from "react-bootstrap-icons";
export default function Reschedule(){
    const [lessons, setLessons] = useState([]);
    let { id } = useParams();
    const MySwal = withReactContent(Swal)

    useEffect(() => {
        getItems();
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
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
        }).then((result) => {
            if (result.isConfirmed) {
                axiosClient.post('tutor/reschedule',{id}).then(({data}) => {
                    getItems();
                    MySwal.fire({
                        icon: 'success',
                        text: 'Sended',
                    })
                }).catch(err => {
                    MySwal.fire({
                        icon: 'error',
                        text: 'Something went wrong!',
                    })
                })
            }
        })

    }

    return(
        <>
            <Container>
                <div className="mb-5">
                    <h2 className="mb-2">Reschedule</h2>
                        {
                            lessons?.length > 0 ? (
                                    lessons.map(item =>
                                        <div className="my-3 border p-3" >
                                            <Row>
                                                <Col md={4}><div><b>{item.start_time}</b></div></Col>
                                                <Col md={4}><div>Student: <b>{item.student.name}</b></div></Col>
                                                <Col md={4}>  <button className="btn btn-danger" onClick={() => reschedule(item.id)}>REQUEST RESCHEDULE</button></Col>
                                            </Row>
                                        </div>
                                    )
                                ) : (
                                <h4 className="d-flex align-items-center text-primary"><InfoCircle/> Appointments are empty</h4>
                            )}
                </div>
            </Container>
        </>
    )
}
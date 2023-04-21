import {useEffect, useState} from "react";
import axiosClient from "../axios-client";
import Container from "react-bootstrap/Container";
import {Col, Row, Toast} from "react-bootstrap";

export default function Faq(){
    const [faq, setFaq] = useState([]);

    useEffect(() => {
        axiosClient.get('faq').then(({data}) => {
            setFaq(data.faq);
        }).catch(err => {})
    }, [])

    return(
        <>
            <Container>
                <Row>
                    <Col md={12} className="mt-5 mb-2"><h1>FAQ</h1></Col>
                    {
                        faq?.length > 0 &&
                        faq.map(item =>
                            <Col md={12} >
                                <Toast className="my-3 w-100" style={{minHeight: '120px'}}>
                                    <Toast.Body>
                                        <h5 className="fw-bold mb-2">{item.question}</h5>
                                        <p>{item.answer}</p>
                                    </Toast.Body>
                                </Toast>
                            </Col>
                        )}
                    <Col md={12}><h5 className="fw-bold mt-4 mb-5">Do you still have questions? Email us support@pinpaya.com</h5></Col>
                </Row>
            </Container>
        </>
    )
}
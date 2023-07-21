import Container from "react-bootstrap/Container";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useState} from "react";

export default function Support(){
    const [data, setData] = useState({
        name:'',
        email: '',
        message: ''
    });
    const send = () => {

    }
    return(
        <>
            <Container>
                <Row>
                    <Col></Col>
                    <Col md={6}>
                        <div className="bg-white p-4 my-5">
                            <h3 className="mb-1">Welcome to the Support Center</h3>
                            <h6 className="mb-5">If you have any questions, you want to do a refund or just thank us, write to us by mail. We try to respond within 24 hours.</h6>
                            <Form onSubmit={send}>
                                <Row className="d-flex align-items-end">
                                    <Col md={12}>
                                        <Form.Group className="mb-3" controlId="11">
                                            <Form.Label className="fw-bold">Name</Form.Label>
                                            <Form.Control  type="text"
                                                           value={data?.name}
                                                           onChange={ev => setData({...data, name : ev.target.value})}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Group className="mb-3" controlId="12">
                                            <Form.Label className="fw-bold">Email</Form.Label>
                                            <Form.Control  type="email"
                                                           value={data?.email}
                                                           onChange={ev => setData({...data, email : ev.target.value})}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Group className="mb-3" controlId="13">
                                            <Form.Label className="fw-bold">Message</Form.Label>
                                            <Form.Control as="textarea" rows={3}
                                                          value={data?.message}
                                                          onChange={ev => setData({...data, message : ev.target.value})}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col className="pb-3 pt-4 w-100" >
                                        <Button className="w-100 py-2 fw-bold" variant="danger" type="submit" >
                                            SEND
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>

        </>
    )
}
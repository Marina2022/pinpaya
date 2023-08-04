import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import {useEffect} from "react";
export default function About(){

    useEffect(()=>{
        window.scrollTo(0, 0)
    }, [])


    return(
        <>
            <Container>
                <Row>
                    <Col className="my-4">
                        <h2 className="fw-bold mt-4 mb-2">About Pinpaya Group</h2>
                        <h5>
                            <b>Pinpaya.com</b> is a global online education platform developed in Estonia. Our mission is to help the people grow by learning online from the comfort of your own home, and to help talented people find jobs.
                        </h5>

                        <h3 className="fw-bold mt-4 mb-2">Our Team</h3>
                        <h5>
                            Pinpaya is led by a strong, diligent team of experts who have closely studied trends, markets, societies and the strength that lies in the predictability of a fast-advancing technology. Our team is dedicated to enhance the opportunities for people to teach and learn online.
                        </h5>
                        <h3 className="fw-bold mt-4 mb-2">Benefits for Investors</h3>
                        <h5>
                            &#x2022; High investment returns <br/>
                            &#x2022; An in-house team that comprises of developers, designers and marketers at our office which is situated in the heart of Tallinn, Estonia <br/>
                            &#x2022; An increasingly expanding global online education market <br/>
                            &#x2022; A unique set of ideas for expanding <br/>
                            &#x2022; MVP ready product that already works <br/>
                        </h5>
                        <div className="my-5 text-center"><img className="img-fluid" src="/public/about.webp" alt=""/></div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

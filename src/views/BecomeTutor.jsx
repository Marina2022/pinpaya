import Container from "react-bootstrap/Container";
import {Button, Col, Form, Row} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
    Check,
    CurrencyEuro, Globe2, ShieldFillCheck
} from "react-bootstrap-icons";
import {useRef, useState} from "react";
import {useStateContext} from "../contexts/ContextProvider";
import AxiosClient from "../axios-client";
import {countries} from "../data";
import firebaseChat from "../hooks/firebaseChat";
import {useTranslation} from "react-i18next";

export default function BecomeTutor(){
    const nameRef = useRef();
    const emailRef = useRef();
    const lastNameRef = useRef();
    const phoneRef = useRef();
    const ageRef = useRef();
    const locationRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const {setUser, setToken, setType} = useStateContext();
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();
    const {t, i18n} = useTranslation();
    const onSubmit = (e) => {
        e.preventDefault()

        const payload = {
            name: nameRef.current.value,
            lastname: lastNameRef.current.value,
            phone: phoneRef.current.value,
            age: ageRef.current.value,
            location: locationRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
            type: 'tutor'
        }

        setErrors(null);

        AxiosClient.post('/signup', payload).then(({data}) => {
            setUser(data.user);
            setToken(data.token);
            setType(data.type);
            firebaseChat(data.user.email, data.user.password, data.user.name);
            navigate('/');
        }).catch(err => {
            const response = err.response;

            if(response && response.status === 422){
                setErrors(response.data.errors);
            }

        })
    }
    return(
        <>
            <div className="become-header my-3">
                <Container>
                    <Row>
                        {errors &&
                            <div className='alert mt-4'>
                                {Object.keys(errors).map(key => (
                                    <p key={key}>{errors[key][0]}</p>
                                ))}
                            </div>
                        }
                        <Col md={5} className="py-5">
                            <div className="bg-white p-4">
                                <h3 className="mb-1">{t('register_as')}</h3>
                                <h6 className="mb-5">{t('earn_money')}</h6>
                                <Form onSubmit={onSubmit}>
                                    <Row className="d-flex align-items-end">
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="11">
                                                <Form.Label className="fw-bold">{t('first_name')}</Form.Label>
                                                <Form.Control  type="text" required
                                                               ref={nameRef}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="12">
                                                <Form.Label className="fw-bold">{t('last_name')}</Form.Label>
                                                <Form.Control  type="text" required
                                                               ref={lastNameRef}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Group className="mb-3 pb-0" controlId="13">
                                                <Form.Label className="fw-bold">{t('phone')}</Form.Label>
                                                <Form.Control  type="text" className="mb-1" required
                                                               ref={phoneRef}
                                                />
                                                <small className="text-secondary">{t('phone_notice')}</small>
                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Group className="mb-3 pb-0" controlId="14">
                                                <Form.Label className="fw-bold">{t('email')}</Form.Label>
                                                <Form.Control  type="email" className="mb-1" required
                                                               ref={emailRef}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="13">
                                                <Form.Label className="fw-bold">{t('location')}</Form.Label>
                                                <Form.Select required style={{height: '54px'}}
                                                             ref={locationRef}
                                                >
                                                    <option value="">{t('all')}</option>
                                                    {
                                                        countries &&
                                                        countries.map((item, index) => (<option key={index} value={item}>{item}</option>))}
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="11">
                                                <Form.Label className="fw-bold">{t('age')}</Form.Label>
                                                <Form.Control  type="number" required
                                                               ref={ageRef}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="11">
                                                <Form.Label className="fw-bold">{t('password')}</Form.Label>
                                                <Form.Control  type="password" required
                                                               ref={passwordRef}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="12">
                                                <Form.Label className="fw-bold">{t('repeat_password')}</Form.Label>
                                                <Form.Control  type="password" required
                                                               ref={passwordConfirmationRef}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col className="pb-3 pt-4 w-100" >
                                            <Button className="w-100 py-2 fw-bold" variant="danger" type="submit" >
                                                {t('create_account')}
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </Col>
                        <Col md={5} className="py-5 px-4">
                            <div className="become-right">
                                <div className="d-flex my-3 justify-content-center align-items-center parent-info-item">
                                    <div>
                                        <CurrencyEuro className="mr-2" color="black" size={42}/>
                                    </div>
                                    <div className="become-info-item">
                                        <div className="fw-bold ml-3 fz-18">{t('become1')}</div>
                                        <div>{t('become2')}</div>
                                    </div>
                                </div>
                                <div className="d-flex my-3 justify-content-center align-items-center parent-info-item">
                                    <div>
                                        <Globe2 className="mr-2" color="black" size={40}/>
                                    </div>
                                    <div className="become-info-item">
                                        <div className="fw-bold ml-3 fz-18">{t('become3')}</div>
                                        <div>{t('become4')}</div>
                                    </div>
                                </div>
                                <div className="d-flex my-3 justify-content-center align-items-center parent-info-item">
                                    <div>
                                        <ShieldFillCheck className="mr-2"  color="black" size={40}/>
                                    </div>
                                    <div className="become-info-item">
                                        <div className="fw-bold ml-3 fz-18">{t('become5')}</div>
                                        <div>{t('become6')}</div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>

                </Container>
            </div>
            <Container>
                <div className="student-section">
                    <Row>
                        <Col md="6">
                            <div>
                                <div className="student-block">
                                    <h2 className="mb-5 mt-3 fw-bold">{t('our_benefits')}</h2>
                                    <div className="m-4"> <Check size="20" color="red" /> {t('become7')} </div>
                                    <div className="m-4"> <Check size="20" color="red" className="pr-4" />  {t('become8')} </div>
                                    <div className="m-4"> <Check size="20" color="red" className="pr-4"/> {t('become9')} </div>
                                    <div className="m-4"> <Check size="20" color="red" className="pr-4" /> {t('become10')} </div>
                                </div>
                            </div>
                        </Col>
                        <Col md="6">
                            <div>
                                <img className="main-img img-fluid" src="/how3.webp" alt="student"/>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
            <Container>
                <div className="tutor-section">
                    <Row>
                        <Col md="6">
                            <div>
                                <img className="main-img img-fluid "  src="/become2.webp" alt="student"/>
                            </div>
                        </Col>
                        <Col md="6">
                            <div>
                                <div className="tutor-block">
                                    <h2 className="mb-5 mt-3 fw-bold">{t('teach_student_from')}</h2>
                                    <div className="m-4"> <Check size="20" color="red" className="mr-4"  /> Teach online anytime, anywhere </div>
                                    <div className="m-4"> <Check size="20" color="red" className="mr-4" />  Make your own schedule/calendar </div>
                                    <div className="m-4"> <Check size="20" color="red" className="mr-4"/> Set your own rate and earn money </div>
                                    <div className="m-4"> <Check size="20" color="red" className="mr-4" /> Grow professionally </div>
                                    <div className="m-4"> <Check size="20" color="red" className="mr-4" /> Low commission </div>
                                    <div className="m-4"> <Check size="20" color="red" className="mr-4" /> Get paid securely </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>

            <div className="become-block">
                <div className="info pt-5">
                    <Container>
                        <div >
                            <h3 className="text-white fw-bold mb-1">{t('get_paid_to')}</h3>
                            <h6 className="text-white fw-bold">{t('earn_money')}</h6>
                            <Button variant="outline-danger" className="mt-4 mb-3 fw-bold">{t('register_as')}</Button>
                        </div>
                    </Container>
                </div>
            </div>


            {/*<Container>*/}
            {/*    <div className="how mb-4 mt-5">*/}
            {/*        <Row>*/}
            {/*            <Col md="4">*/}
            {/*                <div className="text-center mb-3">*/}
            {/*                    <div><b>*/}
            {/*                        How can I become an online private tutor for Math or English Language?</b></div>*/}
            {/*                    <div>*/}
            {/*                        To become a home tutor, you don’t need teaching experience or additional qualifications. But it is important to have a great amount of knowledge in the subject area you are planning to teach; ideally, it would be better if you have done graduation in the particular subject area. Ultimately, it is up to the student’s parents or your rich and glorious career that makes you qualified enough to become one of the renowned teachers of the online platform.*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </Col>*/}
            {/*            <Col md="4">*/}
            {/*                <div className="text-center mb-3">*/}
            {/*                    <div><b>How does an online tutor assist students?</b></div>*/}
            {/*                    <div>An online tutor help students by reviewing the class material, helping solve the problem or going over the student's assignment. Some tutors are responsible for scheduling instructional activities depending on the flexibility of their schedule and online platform. Monitoring the performance of students and evaluating their work.</div>*/}
            {/*                </div>*/}
            {/*            </Col>*/}
            {/*            <Col md="4">*/}
            {/*                <div className="text-center mb-3">*/}
            {/*                    <div><b>Can you easily make your living as a private tutor</b></div>*/}
            {/*                    <div>Yes, you can easily make your living as a private tutor, as at Pinpaya.com, teachers are free to set up their rates and earn money. On average, an English tutor at our global learning platform charges up to $15-$25 per hour.</div>*/}
            {/*                </div>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*    </div>*/}
            {/*</Container>*/}

        </>
    )
}
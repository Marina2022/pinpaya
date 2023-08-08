import {Form, Button, Row, Col} from "react-bootstrap";
import AxiosClient from "../../axios-client";
import {useEffect, useRef, useState} from "react";
import {countries} from '../../data'
import {useStateContext} from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";
import Avatar from "react-avatar-edit";
import {useTranslation} from "react-i18next";
export default function AccountSettings_backup(){
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const {t, i18n} = useTranslation();
    const [errors, setErrors] = useState(null);
    const [success, setSuccess] = useState(null);
    const [data, setData] = useState({
        email: '',
        name: '',
        lastname: '',
        age: '',
        phone: '',
        location: '',
        preview:''
    });
    const {user, setUser} = useStateContext()

    useEffect(()=>{
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        axiosClient.get('/user').then(({data}) => {
            setUser(data);
            setData(data);
        })
    }, [])






    const onSubmit = (e) => {
        e.preventDefault()

        setErrors(null);
        setSuccess(null);
        //////********************** и все?
        AxiosClient.post('student/change-info', data).then(({data}) => {
            setSuccess(true);
        }).catch(err => {
            const response = err.response;

            if(response && response.status === 422){
                if(response.data.errors){
                    setErrors(response.data.errors);
                }else{
                    setErrors({
                        email: [response.data.message]
                    });
                }
            }
        })
    }

    const onSubmitPassword = (e) => {
        e.preventDefault()

        const payload = {
            new_password: passwordRef.current.value,
            confirm_new_password: confirmPasswordRef.current.value
        }
        setErrors(null);
        setSuccess(null);
        //////////  еще здесь
        AxiosClient.post('student/change-password', payload).then(({data}) => {
            setSuccess(true);

        }).catch(err => {
            const response = err.response;

            if(response && response.status === 422){
                if(response.data.errors){
                    setErrors(response.data.errors);
                }else{
                    setErrors({
                        email: [response.data.message]
                    });
                }
            }
        })
    }

    const [preview, setPreview] = useState(null);
    const [src, setSrc] = useState();


    const onClose = () => {
        setPreview(null);
    }

    const onCrop = (preview) => {
        setPreview(preview);
    }

    return(
        <div className="bg-white p-4">
            <h1 className="profilePageTitle">
                <span >{t('account_settings')}</span>
            </h1>
            {errors &&
                <div className='alert mt-3'>
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
            }
            {success &&
                <div className='success-block mt-3'>
                    <p>{t('update_done')}</p>
                </div>
            }
            <div className="mt-3">
                <Form onSubmit={onSubmit}>
                    <Row>
                        <Col md="6" className="uploadAvatar my-2">
                            { user?.avatar &&
                                <img className="float-right mb-2" width="80px" src={'https://web.pinpaya.com/storage/'+user.avatar} />
                            }
                            <Avatar
                                width={390}
                                height={295}
                                onCrop={onCrop}
                                onClose={onClose}
                                src={src}
                            />
                        </Col>
                        <Col md="6" className="my-2">
                            {preview &&
                                <img src={preview} alt="Preview" />
                            }

                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <Form.Group className="mb-3" controlId="formBasicFirstName">
                                <Form.Label>{t('first_name')}</Form.Label>
                                <Form.Control type="text" value={data?.name} onChange={ev => setData({...data, name : ev.target.value})}/>
                            </Form.Group>
                        </Col>
                        <Col md="6">
                            <Form.Group className="mb-3" controlId="formBasicLastName">
                                <Form.Label>{t('last_name')}</Form.Label>
                                <Form.Control type="text" value={data?.lastname} onChange={ev => setData({...data, lastname : ev.target.value})}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>{t('email')}</Form.Label>
                                <Form.Control type="email" value={data?.email} onChange={ev => setData({...data, email : ev.target.value})}/>
                            </Form.Group>
                        </Col>
                        <Col md="6">
                            <Form.Group className="mb-3" controlId="formBasicPhone">
                                <Form.Label>{t('phone')}</Form.Label>
                                <Form.Control type="text" value={data?.phone} onChange={ev => setData({...data, phone : ev.target.value})}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <Form.Group className="mb-3" controlId="formBasicAge">
                                <Form.Label>{t('age')}</Form.Label>
                                <Form.Control type="number" value={data?.age} onChange={ev => setData({...data, age : ev.target.value})}/>
                            </Form.Group>
                        </Col>
                        <Col md="6">
                            <Form.Group className="mb-3" controlId="formBasicLocation">
                                <Form.Label >{t('location')}</Form.Label>
                                <Form.Select style={{height:'55px'}} value={data?.location} onChange={ev => setData({...data, location : ev.target.value})}>
                                    {countries.map((item, index) => (<option selected={user?.location === item ? 'selected' : ''} key={index} value={item}>{item}</option>))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Button variant="primary" type="submit">
                        {t('update')}
                    </Button>
                </Form>

                <h3 className="my-3 mt-5">{t('change_password')}</h3>
                <Form className="mt-3" onSubmit={onSubmitPassword}>
                    <Row>
                        <Col md="6">
                            <Form.Group className="mb-3" controlId="formBasicNewPassword">
                                <Form.Label>{t('new_password')}</Form.Label>
                                <Form.Control type="password" ref={passwordRef} />
                            </Form.Group>
                        </Col>
                        <Col md="6">
                            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                <Form.Label>{t('repeat_password')}</Form.Label>
                                <Form.Control type="password" ref={confirmPasswordRef} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Button variant="primary" type="submit">
                        {t('update')}
                    </Button>
                </Form>
            </div>
        </div>
    )
}

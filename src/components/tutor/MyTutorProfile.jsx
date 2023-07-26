import {useEffect, useState} from "react";
import axiosClient from "../../axios-client";
import { MultiSelect } from 'primereact/multiselect';
import {InputSwitch} from "primereact/inputswitch";
import {Button, Col, Form, Row} from "react-bootstrap";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import './tutor.css'
import {FloatingLabel} from "react-bootstrap";
import {useTranslation} from "react-i18next";

export default function MyTutorProfile(){
    const [file, setFile] = useState()
    const [subjects, setSubjects] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [mySubjects, setMySubjects] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [myLanguages, setMyLanguages] = useState([]);
    const [errors, setErrors] = useState(null);
    const [success, setSuccess] = useState(null);
    const [checkedTeach, setCheckedTeach] = useState(false);
    const [checkTrial, setCheckTrial] = useState(false);
    const {t, i18n} = useTranslation();
    const [data, setData] = useState({
        status: '1',
        education: '',
        experience: '',
        about: '',
        description: '',
        price: '',
        video_url:'',
    });

    const send = (e) => {
        e.preventDefault();
        const payload = {
            languages: myLanguages,
            subjects: mySubjects,
            checkTeach:checkedTeach,
            checkTrial:checkTrial,
            data: data
        }

        axiosClient.post('tutor/set-additional', payload).then(({data}) => {
            setSuccess(true);
        }).catch(err => {
            const response = err.response;
            if(response && response.status === 422){
                setErrors(response.data.errors);
            }

        })

    }
    useEffect(() => {
        axiosClient.get('/user').then(({data}) => {
            setData(data);
        })
    }, [])
    useEffect(() => {
        axiosClient.get('tutor/get-additional').then(({data}) => {
            setSubjects(data.data.subjects);
            setCertificates(data.certificates);
            setMySubjects(data.data.my_subjects);
            setLanguages(data.data.languages);
            setMyLanguages(data.data.my_languages);
            setCheckedTeach(data.data.checkTeach == 1 ? true : false);
            setCheckTrial(data.data.checkTrial == 1 ? true : false)
        })
    }, [])



    function handleChange(event) {
        setFile(event.target.files[0])
    }

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);

        axiosClient.post('tutor/upload-file', formData).then(({data}) => {
            setSuccess(true);
            setFile(null);
            axiosClient.get('tutor/get-additional').then(({data}) => {
                setCertificates(data.certificates);
            })
        }).catch(err => {
            let responseData = err.response;
            if(responseData && responseData.status === 422){
                setErrors(responseData.data.errors);
            }
        })

    }


    return(
        <div className="bg-white p-3">
            <h2 >{t('my_tutor_profile')}</h2>
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
            <div className="mt-5 ">
                <Form onSubmit={send}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicStatus">
                            <Form.Label >{t('status')}</Form.Label>
                            <Form.Select style={{height:'55px'}} required value={data?.status} onChange={ev => setData({...data, status : ev.target.value})}>
                                <option  value="1">{t('accept_lessons')}</option>
                                <option  value="0">{t('no_accept_lessons')}</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicLastName">
                            <Form.Label className="fw-bold">{t('my_education')}</Form.Label>
                            <Form.Control required value={data?.education} onChange={ev => setData({...data, education : ev.target.value})} type="text" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="my-3">
                    <Col md="6">
                        <>
                            <div className="fw-bold mb-2">{t('i_learn')}</div>
                            <MultiSelect  maxSelectedLabels={10} display="chip" value={mySubjects} onChange={(e) => setMySubjects(e.value)} options={subjects} optionLabel="name" optionValue="id"
                                         placeholder="Select Subject" className="w-full md:w-20rem" />
                            <small className="text-secondary">{t('tutor_profile_notice')}</small>
                        </>
                    </Col>
                    <Col md="6">
                            <>
                                <div className="fw-bold mb-2">{t('i_speak')}</div>
                                <MultiSelect display="chip" value={myLanguages} onChange={(e) => setMyLanguages(e.value)} options={languages} optionLabel="name" optionValue="id"
                                             placeholder="Select Language" className="w-full md:w-20rem" />
                                <small className="text-secondary">{t('tutor_profile_notice')}</small>
                            </>
                    </Col>
                </Row>
                <Row className="my-3">
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicExperience">
                            <Form.Label className="fw-bold">{t('experience_in_years')} </Form.Label>
                            <Form.Control required type="number" value={data?.experience} onChange={ev => setData({...data, experience : ev.target.value})}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="my-3">
                    <Col>
                        <div className="fw-bold mb-2">{t('about_me')} (min 150 characters) </div>
                        <FloatingLabel controlId="floatingTextarea2" >
                            <Form.Control required
                                as="textarea"
                                style={{ height: '100px' }}
                                value={data?.about}
                                onChange={ev => setData({...data, about : ev.target.value})}
                            />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className="my-3">
                    <Col>
                        <div className="fw-bold mb-2">{t('teach_style')} </div>
                        <FloatingLabel controlId="floatingTextarea3" >
                            <Form.Control required
                                as="textarea"
                                style={{ height: '100px' }}
                                value={data?.description}
                                onChange={ev => setData({...data, description : ev.target.value})}
                            />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className="my-3">
                    <Col>
                        <Form.Group  controlId="formBasicPrice">
                            <Form.Label className="fw-bold">{t('lesson_price')} </Form.Label>
                            <Form.Control required value={data?.price} onChange={ev => setData({...data, price : ev.target.value})} style={{marginBottom: '0'}}  type="number" />
                            <small className="text-secondary">{t('lesson_price_notice')}</small>
                        </Form.Group>

                    </Col>
                </Row>
                <Row className="my-3">
                    <Col >
                        <Form.Group  controlId="formBasicVideo">
                            <Form.Label className="fw-bold">{t('introduction_video')}</Form.Label>
                            <Form.Control value={data?.video_url} onChange={ev => setData({...data, video_url : ev.target.value})} style={{marginBottom: '0'}} type="url" />
                            <small className="text-secondary">{t('introduction_video_notice')}</small>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3 mt-5">
                    <Col >
                        <Form.Group  controlId="formBasicVideo">
                            <Form.Label className="fw-bold">{t('i_provide')} </Form.Label>
                            <div>
                                <InputSwitch checked={checkTrial} onChange={(e) => setCheckTrial(e.value)} />
                            </div>
                            <small className="text-secondary">{t('i_provide_notice')}
                            </small>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="my-3">
                    <Col >
                        <Form.Group  controlId="formBasicVideo">
                            <Form.Label className="fw-bold">{t('i_teach')}</Form.Label>
                                <div>
                                    <InputSwitch checked={checkedTeach} onChange={(e) => setCheckedTeach(e.value)} />
                                </div>
                            <small className="text-secondary">{t('i_teach_notice')}
                            </small>
                        </Form.Group>
                    </Col>
                </Row>
                <Button className="mt-4 btn-sm" type="submit">{t('update')}</Button>
                </Form>
            </div>
            <div className="mt-5">
                <form onSubmit={handleSubmit}>
                    <h4 className="mb-3">{t('certificates')}</h4>
                    <div className="my-3 ">
                        {
                            certificates?.length > 0 &&
                            certificates.map(item =>
                            <img className="img-fluid mx-2" key={item.id} src={'https://web.pinpaya.com/storage/'+item.images} width="150" alt=""/>
                        )}

                    </div>
                    <input type="file" onChange={handleChange}/>
                    <button className="btn btn-secondary" type="submit">{t('upload')}</button>
                </form>
            </div>
        </div>
    )
}
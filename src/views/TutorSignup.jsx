import {Link} from "react-router-dom";
import React, {useRef, useState} from "react";
import AxiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import { countries } from "../data";
import firebaseChat from "../hooks/firebaseChat";
import {useTranslation} from "react-i18next";
export default function TutorSignup(){
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
    const file = '';
    const {t, i18n} = useTranslation();
    const onSubmit = async (e) => {
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

        }).catch(err => {
            const response = err.response;
            if(response && response.status === 422){
                setErrors(response.data.errors);
            }
        })
    }



    return(
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <div className="text-center my-4">
                    <Link to="/"><img src="/pinpaya-logo.svg" alt="logo"/></Link>
                </div>
                <form onSubmit={onSubmit}>
                    <h1 className="title">
                        {t('tutor_signup')}
                    </h1>
                    {errors &&
                        <div className='alert'>
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    }
                    <input required ref={nameRef} placeholder={t('first_name')} type="text"/>
                    <input required ref={lastNameRef} placeholder={t('last_name')} type="text"/>
                    <input required ref={emailRef} placeholder={t('email')} type="email"/>
                    <select required ref={locationRef}>
                        <option value="">{t('select_location')}</option>
                        {countries.map((item, index) => (<option key={index} value={item}>{item}</option>))}
                    </select>
                    <input required ref={phoneRef} placeholder={t('phone')} type="text"/>
                    <input required ref={ageRef} placeholder={t('age')} type="number"/>
                    <input required ref={passwordRef} placeholder={t('password')} type="password"/>
                    <input required ref={passwordConfirmationRef} placeholder={t('password_confirmation')} type="password"/>
                    <button className="btn btn-block">{t('signup')}</button>
                    <p className="message">
                        {t('already_registered')} <Link to="/login">{t('signin')}</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

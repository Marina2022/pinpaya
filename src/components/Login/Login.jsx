import {Link} from "react-router-dom";
import React, {useRef, useState} from "react";
import AxiosClient from "../../axios-client.js";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import '../../index.scss';
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../firebase";
import firebaseChat from "../../hooks/firebaseChat";
import {useTranslation} from "react-i18next";
import BigOrangeBtn from "../CommonComponents/BigOrangeBtn/BigOrangeBtn";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import s from './Login.module.scss'


import logo from '../../assets/pinpaya-logo.svg'
import TextField from "../CommonComponents/TextField/TextField";

export default function Login() {
  const {setUser, setToken, setType} = useStateContext();
  const [errors, setErrors] = useState(null);
  const {t, i18n} = useTranslation();
  const firebase = async (email, password, name) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      if (err.code == 'auth/user-not-found') {
        firebaseChat(email, password, name);
      }
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().required('Required').email('Wrong email format'),
    password: Yup.string().required("Password required").min(8, 'Minimum 8 characters'),
  })


  const onSubmit = async (values) => {
    const payload = {
      email: values.email,
      password: values.password
    }

    setErrors(null);
    await AxiosClient.post('/login', payload).then(({data}) => {
      setUser(data.user);
      setToken(data.token);
      setType(data.type);
      firebase(values.email, values.password, data.user.name);

    }).catch(err => {
      const response = err.response;

      if (response && response.status === 422) {
        if (response.data.errors) {
          setErrors(response.data.errors);
        } else {
          setErrors({
            email: [response.data.message]
          });
        }
      }
    })
  }

  const initialValues = {
    email: '',
    password: ''
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <div className={s.logo}>
          <Link to="/"><img src={logo} alt="logo"/></Link>
        </div>


        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}
                validateOnChange={false} validateOnBlur={false}>
          {
            ({isSubmitting}) => {
              return <Form noValidate={true} >

                <h1 className="title">
                  {t('login_text')}
                </h1>
                {errors &&
                  <div className='alert'>
                    {Object.keys(errors).map(key => (
                      <p key={key}>{errors[key][0]}</p>
                    ))}
                  </div>
                }

                <TextField name='email' placeholder={t('email')} type="email" />
                <TextField name='password' placeholder={t('password')} type="password" />

                <BigOrangeBtn disabled={isSubmitting} >{t('login')}</BigOrangeBtn>
                <p className="message">
                  {t('not_registered')} <Link to="/signup">{t('create_account')}</Link>
                </p>
              </Form>
            }
          }
        </Formik>
      </div>
    </div>
  )
}

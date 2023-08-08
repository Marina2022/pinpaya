import {Link} from "react-router-dom";
import React, {useRef, useState} from "react";
import AxiosClient from "../../axios-client.js";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import {countries} from "../../data";
import firebaseChat from "../../hooks/firebaseChat";
import {useTranslation} from "react-i18next";

import logo from '../../assets/pinpaya-logo.svg'
import {Form, Formik} from "formik";
import * as Yup from "yup";
import TextField from "../CommonComponents/form/TextField/TextField";
import s from './SignupAll.module.scss'
import SelectField from "../CommonComponents/form/SelectField/SelectField";
import BigOrangeBtn from "../CommonComponents/BigOrangeBtn/BigOrangeBtn";


export default function SignupAll({type}) {
  const {setUser, setToken, setType} = useStateContext();
  const [fromServerErrors, setFromServerErrors] = useState(null);
  const {t, i18n} = useTranslation();
  const onFormikSubmit = (values) => {
    const payload = {...values, location: values.location.value, type: type}

    setFromServerErrors(null);

    AxiosClient.post('/signup', payload).then(({data}) => {
      setUser(data.user);
      setToken(data.token);
      setType(data.type);
      firebaseChat(data.user.email, data.user.password, data.user.name);

    }).catch(err => {
      const response = err.response;
      if (response && response.status === 422) {
        setFromServerErrors(response.data.errors);
      }
    })
  }


  const countryOptions =
    [
      ...countries.map((item) => ({
        value: item, label: item
      }))
    ]

  const phoneRegExp = /^[0-9+\- ]{8,18}$/

  const initialValues = {
    name: '',
    lastname: '',
    email: '',
    phone: '',
    location: null,
    age: '',
    password: '',
    password_confirmation: ''
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    lastname: Yup.string().required('Required'),
    phone: Yup.string().required('Required').matches(phoneRegExp, {message: "Phone number is invalid"}),
    location: Yup.object().required('Required'),
    email: Yup.string().required('Required').email('Wrong email format'),
    age: Yup.number().typeError('Age must be a number').required('Required').min(16, 'min 16').max(100, 'max 100'),
    password: Yup.string().required("Required").min(8, 'Min 8 symbols'),
    password_confirmation: Yup.string().required("Required").oneOf([Yup.ref("password"), null], "Passwords don't match")
  })


  return (
    <div className="login-signup-form animated fadeInDown">


      <Formik initialValues={initialValues} onSubmit={onFormikSubmit} validationSchema={validationSchema}
              validateOnChange={false} validateOnBlur={false} enableReinitialize={true}>
        {
          ({isSubmitting, errors, values}) => {
            return <Form noValidate={true}>

              <div className="form">
                <div className="text-center mb-4">
                  <Link to="/"><img src={logo} alt="logo"/></Link>
                </div>


                {/*<form onSubmit={onSubmit}>*/}
                <h1 className="title mb-4">
                  {
                    type === 'tutor' ?
                      t('tutor_signup') :
                      t('student_signup')
                  }
                </h1>

                {fromServerErrors &&
                  <div className='alert'>
                    {Object.keys(fromServerErrors).map(key => {
                        console.log(key)
                        return <p key={key}>{fromServerErrors[key][0]}</p>
                      }
                    )}
                  </div>
                }

                <div className={s.formControl}>
                  <TextField name='name' placeholder={t('first_name')} classname={s.input}/>
                </div>

                <div className={s.formControl}>
                  <TextField name='lastname' placeholder={t('last_name')} classname={s.input}/>
                </div>

                <div className={s.formControl}>
                  <TextField name='email' placeholder={t('email')} classname={s.input}/>
                </div>


                <div className={s.formControl}>
                  <SelectField name='location' options={countryOptions}
                               classname={s.input} fontSize={14}
                  />
                </div>


                <div className={s.formControl}>
                  <TextField name='phone' placeholder={t('phone')} classname={s.input}/>
                </div>


                <div className={s.formControl}>
                  <TextField name='age' placeholder={t('age')} classname={s.input}/>
                </div>

                <div className={s.formControl}>
                  <TextField name='password' placeholder={t('password')} classname={s.input} type="password"/>
                </div>

                <div className={s.formControl}>
                  <TextField name='password_confirmation' placeholder={t('password_confirmation')} classname={s.input}
                             type="password"/>
                </div>

                <BigOrangeBtn type='submit'>{t('signup')}</BigOrangeBtn>
                {
                  Object.keys(errors).length > 0 && <div className={s.submitError}>*{t('fill_fields')}</div>
                }

                <p className="message">
                  {t('already_registered')} <Link to="/login">{t('signin')}</Link>
                </p>
                {/*</form>*/}
              </div>
            </Form>
          }
        }
      </Formik>
    </div>
  )
}

import s from './BecomeTutorForm.module.scss';
import {useTranslation} from "react-i18next";
import {Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import cn from "classnames";

import {countries} from "../../../../../data";
import Select from "../../../../CommonComponents/form/Select/Select";
import React, {useState} from "react";
import BigOrangeBtn from "../../../../CommonComponents/BigOrangeBtn/BigOrangeBtn";
import BecomeTutorFormField from "./BecomeTutorFormField/BecomeTutorFormField";
import {useStateContext} from "../../../../../contexts/ContextProvider";
import firebaseChat from "../../../../../hooks/firebaseChat";
import {useNavigate} from "react-router-dom";
import AxiosClient from "../../../../../axios-client";

const BecomeTutorForm = () => {

  const navigate = useNavigate()
  const [errors, setErrors] = useState(null);
  const {t, i18n} = useTranslation();
  const {setUser, setToken, setType} = useStateContext();

  const countryOptions =
    [
      {
        value: '',
        label: t('all')
      },
      ...countries.map((item) => ({
        value: item, label: item
      }))
    ]

  const initialValues = {
    name: '',
    lastname: '',
    phone: '',
    location: null,
    email: '',
    age: '',
    password: '',
    password_confirmation: '',
    type: 'tutor'
  }

  const phoneRegExp = /^[0-9+\- ]{8,18}$/

  const onSubmit = (values, {setSubmitting}) => {
    const payload = {...values, location: values.location.value}

    setErrors(null);  // ошибки с сервера

    AxiosClient.post('/signup', payload).then(({data}) => {
      setUser(data.user);
      setToken(data.token);
      setType(data.type);
      firebaseChat(data.user.email, data.user.password, data.user.name);
      navigate('/');
      setSubmitting(false)
    }).catch(err => {
      const response = err.response;

      if (response && response.status === 422) {
        setErrors(response.data.errors);
      }
      setSubmitting(false)
    })
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    lastname: Yup.string().required('Required'),
    phone: Yup.string().required('Required').matches(phoneRegExp, {message: "Phone number is invalid"}),
    location: Yup.object().required('Required'),
    email: Yup.string().required('Required').email('Wrong email format'),
    age: Yup.number().typeError('Age must be a number').required('Required').min(16, 'min 16').max(100, 'max 100'),
    password: Yup.string().required("Required").min(8, 'min 8 symbols'),
    password_confirmation: Yup.string().required("Required").oneOf([Yup.ref("password"), null], "Passwords don't match")
  })

  return (
    <>
      {/* модалка на ошибки, пришедшие с сервера после отправки формы*/}
      {errors &&
        <div className={s.serverErrors}>
          {Object.keys(errors).map(key => (
            <p key={key}>{errors[key][0]}</p>
          ))}
        </div>
      }

      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} validateOnChange={false} validateOnBlur={false}>
        {
          ({isSubmitting}) => {
            return <Form>

              <div className={s.form}>
                <h1 className={s.formTitle}>{t('register_as')}</h1>
                <h3 className={s.formSubtitle}>{t('earn_money')}</h3>

                <div className={s.halfInput}>
                  <BecomeTutorFormField name='name' label={`${t('first_name')} *`} id='name'/>
                </div>

                <div className={s.halfInput}>
                  <BecomeTutorFormField name='lastname' label={`${t('last_name')} *`} id='lastname'/>
                </div>

                <div>
                  <BecomeTutorFormField name='phone' label={`${t('phone')} *`} id='phone'/>
                  <p className={s.underMessage}>{t('phone_notice')}</p>
                </div>

                <div>
                  <BecomeTutorFormField name='email' label={`${t('email')} *`} id='email'/>
                </div>

                <div className={s.halfInput}>

                  <Field name='location'>
                    {
                      ({field, form, meta}) => {
                        const onChange = (value) => form.setFieldValue('location', value)
                        return <>
                          <label className={s.formLabel}>{`${t('location')} *`}
                            <Select options={countryOptions}
                                    {...field}
                                    onChange={onChange}
                                    error={meta.error}
                                    classname={s.select}
                            />
                            <div className={s.errorMessage}>{meta.error}</div>
                          </label>
                        </>
                      }
                    }
                  </Field>
                </div>

                <div className={s.halfInput}>
                  <BecomeTutorFormField name='age' label={`${t('age')} *`} id='age'/>
                </div>

                <div className={s.halfInput}>
                  <BecomeTutorFormField name='password' label={`${t('password')} *`} id='password' type='password'/>
                </div>

                <div className={s.halfInput}>
                  <BecomeTutorFormField
                    name='password_confirmation'
                    label={`${t('repeat_password')} *`}
                    id='password_confirmation'
                    type='password'
                  />
                </div>

                <BigOrangeBtn classname={s.btn} type="submit" disabled={isSubmitting}>
                  {t('create_account')}
                </BigOrangeBtn>
              </div>
            </Form>
          }
        }
      </Formik>
    </>
  );
};

export default BecomeTutorForm;




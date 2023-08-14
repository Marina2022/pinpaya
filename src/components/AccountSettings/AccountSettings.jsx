import AxiosClient from "../../axios-client";
import React, {useEffect, useRef, useState} from "react";
import {countries} from '../../data'
import {useStateContext} from "../../contexts/ContextProvider";
import {useTranslation} from "react-i18next";
import * as Yup from "yup";
import {Form, Formik} from "formik";

import s from './AccountSettings.module.scss'
import Label from "../CommonComponents/form/Label/Label";
import SelectField from "../CommonComponents/form/SelectField/SelectField";
import TextField from "../CommonComponents/form/TextField/TextField";
import BigOrangeBtn from "../CommonComponents/BigOrangeBtn/BigOrangeBtn";

export default function AccountSettings() {
  const {type} = useStateContext()
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
    preview: ''
  });
  const {user, setUser} = useStateContext()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    AxiosClient.get('/user').then(({data}) => {
      setUser(data);
      setData(data);
    })
  }, [])

  const countryOptions =
    [
      ...countries.map((item) => ({
        value: item, label: item
      }))
    ]

  const [preview, setPreview] = useState(null);
  const phoneRegExp = /^[0-9+\- ]{8,18}$/

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    lastname: Yup.string().required('Required'),
    phone: Yup.string().required('Required').matches(phoneRegExp, {message: "Phone number is invalid"}),
    location: Yup.object().required('Required'),
    email: Yup.string().required('Required').email('Wrong email format'),
    age: Yup.number().typeError('Age must be a number').required('Required').min(16, 'min 16').max(100, 'max 100'),

  })

  const initialValues = {
    name: data?.name,
    lastname: data?.lastname,
    email: data?.email,
    phone: data?.phone,
    location: {
      value: data?.location,
      label: data?.location
    },
    age: data?.age,
  }

  const onFormikSubmit = (values, {setSubmitting}) => {
    const payload = {...values, location: values.location.value, preview: preview}
    setErrors(null);
    setSuccess(null);
    AxiosClient.post(`${type}/change-info`, payload).then(({data}) => {
      setSuccess(true);
      window.location.reload()
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
      .finally(() => setSubmitting(false))
  }

  const initialValuesPass = {
    new_password: '',
    confirm_new_password: ''
  }

  const onFormikSubmitPass = (values, {setSubmitting, resetForm}) => {
    const payload = {...values}
    setErrors(null);
    setSuccess(null);
    AxiosClient.post(`${type}/change-password`, payload).then(({data}) => {
      setSuccess(true);
      setSubmitting(false)
      resetForm();
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

  const validationSchemaPass = Yup.object({
    new_password: Yup.string().required("Required").min(8, 'Min 8 symbols'),
    confirm_new_password: Yup.string().required("Required").oneOf([Yup.ref("new_password"), null], "Passwords don't match")
  })

  const previewRef = useRef()

  function handleChange(event) {
    const reader = new FileReader
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = function (e) { // Как только картинка загрузится
      previewRef.current.style.backgroundImage = `url(${e.target.result})`;
      setPreview(e.target.result)
    }
  }

  return (
    <div className={s.accountSettings}>
      <h1 className="profilePageTitle">
        {user?.avatar &&
          <img style={{marginRight: '20px', 'borderRadius': 3}} className="float-right mb-2" width="80px"
               src={'https://web.pinpaya.com/storage/' + user.avatar}/>
        }
        <span>{t('account_settings')}</span>
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

      <Formik initialValues={initialValues} onSubmit={onFormikSubmit} validationSchema={validationSchema}
              validateOnChange={false} validateOnBlur={false} enableReinitialize={true}>
        {
          ({isSubmitting, errors}) => {
            return <Form noValidate={true}>

              <label htmlFor="file" className={s.fileInputLabel}>
                {preview &&
                  <img src={preview} alt="Preview" className={s.imgPreview}/>
                }

                {
                  !preview && <span className={s.previewText}> Add profile picture</span>
                }
                <div className={s.preview} ref={previewRef}>Add profile picture</div>
                <input id="file" type="file" onChange={handleChange} className={s.fileInput}/>
              </label>

              <div>
                <div className={s.twoInputsWrapper}>
                  <div>
                    <Label classname={s.label} htmlFor='name'>{t('first_name')}</Label>
                    <TextField name='name' id='name'/>
                  </div>
                  <div>
                    <Label classname={s.label} htmlFor='lastname'>{t('last_name')}</Label>
                    <TextField name='lastname' id='lastname'/>
                  </div>
                </div>


                <div className={s.twoInputsWrapper}>
                  <div>
                    <Label classname={s.label} htmlFor='email'>{t('email')}</Label>
                    <TextField name='email' id='email'/>
                  </div>
                  <div>
                    <Label classname={s.label} htmlFor='phone'>{t('phone')}</Label>
                    <TextField name='phone' id='phone'/>
                  </div>
                </div>


                <div className={s.twoInputsWrapper}>
                  <div>
                    <Label classname={s.label} htmlFor='age'>{t('age')}</Label>
                    <TextField name='age' id='age'/>
                  </div>
                  <div>
                    <Label classname={s.label} htmlFor='location'>{t('location')}</Label>
                    <SelectField name='location' id='location' options={countryOptions} />
                  </div>
                </div>


                <BigOrangeBtn classname={s.btn} type="submit" disabled={isSubmitting}>
                  {t('update')}
                </BigOrangeBtn>
                {
                  Object.keys(errors).length > 0 && <div className={s.submitError}>*{t('fill_fields')}</div>
                }

              </div>
            </Form>
          }
        }
      </Formik>


      <Formik initialValues={initialValuesPass} onSubmit={onFormikSubmitPass} validationSchema={validationSchemaPass}
              validateOnChange={false} validateOnBlur={false} enableReinitialize={true}>
        {
          ({isSubmitting, errors}) => {
            return <Form noValidate={true}>
              <h3 className={s.subtitle}>{t('change_password')}</h3>
              <div className={s.twoInputsWrapper}>
                <div>
                  <Label classname={s.label} htmlFor='new_password'>{t('new_password')}</Label>
                  <TextField name='new_password' id='new_password' type='password'/>
                </div>
                <div>
                  <Label classname={s.label} htmlFor='confirm_new_password'>{t('repeat_password')}</Label>
                  <TextField name='confirm_new_password' id='confirm_new_password' type='password'/>
                </div>
              </div>
              <BigOrangeBtn classname={s.btn} type="submit" disabled={isSubmitting}>
                {t('update')}
              </BigOrangeBtn>
              {
                Object.keys(errors).length > 0 && <div className={s.submitError}>*{t('fill_fields')}</div>
              }
            </Form>
          }
        }
      </Formik>
    </div>
  )
}

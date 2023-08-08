import {useEffect, useRef, useState} from "react";
import axiosClient from "../../../axios-client";
import {MultiSelect} from 'primereact/multiselect';
import {InputSwitch} from "primereact/inputswitch";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import '../tutor.css'
import {useTranslation} from "react-i18next";
import TextField from "../../CommonComponents/form/TextField/TextField";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import s from './MyTutorProfile.module.scss'
import Label from "../../CommonComponents/form/Label/Label";
import FieldNotice from "../../CommonComponents/form/FieldNotice/FieldNotice";
import SelectField from "../../CommonComponents/form/SelectField/SelectField";
import TextareaField from "../../CommonComponents/form/TextareaField/TextareaField";
import BigOrangeBtn from "../../CommonComponents/BigOrangeBtn/BigOrangeBtn";

export default function MyTutorProfile() {
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
    video_url: '',
  });

  const send = (e) => {
    e.preventDefault();
    const payload = {
      languages: myLanguages,
      subjects: mySubjects,
      checkTeach: checkedTeach,
      checkTrial: checkTrial,
      data: data
    }

  }
  useEffect(() => {
    axiosClient.get('/user').then(({data}) => {
      setData(data);
    })
  }, [])

  const previewRef = useRef()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  useEffect(() => {
    axiosClient.get('tutor/get-additional').then(({data}) => {
      setSubjects(data.data.subjects);
      setCertificates(data.certificates);
      setMySubjects(data.data.my_subjects);
      setLanguages(data.data.languages);
      setMyLanguages(data.data.my_languages);
      setCheckedTeach(data.data.checkTeach === 1);
      setCheckTrial(data.data.checkTrial === 1)
    })
  }, [])


  function handleChange(event) {
    setFile(event.target.files[0])

    const reader = new FileReader

    reader.readAsDataURL(event.target.files[0]);
    reader.onload = function (e) { // Как только картинка загрузится
      previewRef.current.style.backgroundImage = `url(${e.target.result})`;
    }
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
      if (responseData && responseData.status === 422) {
        setErrors(responseData.data.errors);
      }
    }).finally(() => previewRef.current.style.backgroundImage = 'none')
  }


  const validationSchema = Yup.object({
    education: Yup.string().required("Required"),
    experience: Yup.number().required("Required").typeError('Must be a number'),
    price: Yup.number().required("Required").typeError('Must be a number'),
    status: Yup.object().required("Required"),
    about: Yup.string().required("Required").min(150, 'Min 150 characters'),
    description: Yup.string().required("Required"),
    subjects: Yup.array().min(1, 'Please, add at least one subject'),
    languages: Yup.array().min(1, 'Please, add at least one subject')
  })

  const onSubmit = async (values) => {

    const payload = {
      languages: values.languages,
      subjects: values.subjects,
      checkTeach: checkedTeach,
      checkTrial: checkTrial,
      data: {
        education: values.education,
        experience: values.experience,
        price: values.price,
        video_url: values.video_url,
        status: values.status.value,
        about: values.about,
        description: values.description,
      }
    }

    axiosClient.post('tutor/set-additional', payload).then(({data}) => {
      setSuccess(true);
    }).catch(err => {
      const response = err.response;
      if (response && response.status === 422) {
        setErrors(response.data.errors);
      }
    })
  }

  const initialValues = {
    education: data?.education,
    experience: data?.experience,
    price: data?.price,
    video_url: data?.video_url,
    status: {
      value: '1',
      label: t('accept_lessons')
    },
    about: data?.about,
    description: data?.description,
    subjects: mySubjects,
    languages: myLanguages
  }

  const statusOptions =
    [
      {
        value: '1',
        label: t('accept_lessons')
      },
      {
        value: '0',
        label: t('no_accept_lessons')
      },

    ]


  return (
    <div className={s.globalWrapper}>
      <h1 className={s.title}>{t('my_tutor_profile')}</h1>
      {errors &&
        <div className='alert mt-3' style={{borderRadius: 3}}>
          {Object.keys(errors).map(key => (
            <p style={{fontSize: 16}} key={key}>{errors[key][0]}</p>
          ))}
        </div>
      }
      {success &&
        <div className='success-block mt-3' style={{borderRadius: 3}}>
          <p style={{fontSize: 16}}>{t('update_done')}</p>
        </div>
      }

      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}
              validateOnChange={false} validateOnBlur={false} enableReinitialize={true}>
        {
          ({isSubmitting, errors}) => {
            return <Form noValidate={true}>
              <div className={s.twoInputsWrapper}>
                <div>
                  <Label htmlFor='status'>{t('status')}</Label>
                  <SelectField name='status' options={statusOptions} id='status'/>
                </div>
                <div>
                  <Label htmlFor='education'>{t('my_education')}</Label>
                  <TextField name='education' id='education'/>
                </div>
              </div>
              <div className={s.twoInputsWrapper}>
                <div>
                  <Label classname={s.label}>{t('i_learn')} </Label>
                  <Field name='subjects'>
                    {
                      ({field, meta, form}) => {
                        return (
                          <>
                            <MultiSelect maxSelectedLabels={10} display="chip" value={field.value}
                                         onChange={(e) => {
                                           // setMySubjects(e.value)
                                           form.setFieldValue('subjects', e.value)
                                         }}
                                         options={subjects}
                                         optionLabel="name"
                                         optionValue="id"
                                         placeholder="Select Subject" className="w-full md:w-20rem"/>
                            <div className={s.errorMessage}>{meta.error}</div>
                          </>
                        )
                      }
                    }
                  </Field>
                  <FieldNotice>{t('tutor_profile_notice')}</FieldNotice>
                </div>


                <div>

                  <Label classname={s.speakLabel}>{t('i_speak')}</Label>

                  <Field name='languages'>
                    {
                      ({field, meta, form}) => {
                        return (
                          <>
                            <MultiSelect display="chip" value={field.value}
                                         onChange={(e) => {
                                           form.setFieldValue('languages', e.value)
                                         }}

                                         options={languages} optionLabel="name" optionValue="id"
                                         placeholder="Select Language" className="w-full md:w-20rem"/>
                            <div className={s.errorMessage}>{meta.error}</div>
                          </>
                        )
                      }
                    }
                  </Field>
                  <FieldNotice className="text-secondary">{t('tutor_profile_notice')}</FieldNotice>
                </div>
              </div>

              <div>
                <Label classname={s.label}>{t('experience_in_years')}</Label>
                <TextField name='experience'/>
              </div>

              <div>
                <Label htmlFor='about' classname={s.label}>{t('about_me')} (min 150 characters)</Label>
                <TextareaField name='about' id='about'/>
              </div>

              <div>
                <Label htmlFor='description' classname={s.label}>{t('teach_style')}</Label>
                <TextareaField name='description' id='description'/>
              </div>

              <div>
                <Label classname={s.label}>{t('lesson_price')}</Label>
                <TextField name='price'/>
                <FieldNotice>{t('lesson_price_notice')}</FieldNotice>
              </div>

              <div>
                <Label classname={s.label}>{t('introduction_video')}</Label>
                <TextField name='video_url'/>
                <FieldNotice>{t('introduction_video_notice')}</FieldNotice>
              </div>

              <div>
                <Label classname={s.label}>{t('i_provide')} </Label>
                <InputSwitch checked={checkTrial} onChange={(e) => setCheckTrial(e.value)}/>
                <FieldNotice>{t('i_provide_notice')}</FieldNotice>
              </div>

              <div>
                <Label classname={s.label}>{t('i_teach')}</Label>
                <InputSwitch checked={checkedTeach} onChange={(e) => setCheckedTeach(e.value)}/>
                <FieldNotice className="text-secondary">{t('i_teach_notice')}</FieldNotice>
              </div>

              <BigOrangeBtn type="submit" classname={s.btn} disabled={isSubmitting}>{t('update')}</BigOrangeBtn>
              {
                Object.keys(errors).length > 0 && <div className={s.submitError}>*{t('fill_fields')}</div>
              }
            </Form>
          }
        }
      </Formik>

      <div className="mt-5">
        <form onSubmit={handleSubmit}>
          <h4 className="mb-3">{t('certificates')}</h4>
          <div className="my-3 ">
            {
              certificates?.length > 0 &&
              certificates.map(item =>
                <img className={s.certImg} key={item.id}
                     src={'https://web.pinpaya.com/storage/' + item.images} width="150" alt=""/>
              )}
          </div>

          <label htmlFor="file">
            <div className={s.preview} ref={previewRef}>Choose a file</div>
            <input id="file" type="file" onChange={handleChange} className={s.fileInput}/>
          </label>
          <BigOrangeBtn type="submit" classname={s.uploadBtn}>{t('upload')}</BigOrangeBtn>
        </form>
      </div>
    </div>
  )
}

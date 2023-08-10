import {Wallet2} from "react-bootstrap-icons";
import {Table} from "react-bootstrap";
import {useStateContext} from "../../contexts/ContextProvider";
import React, {useEffect, useRef, useState} from "react";
import axiosClient from "../../axios-client";
import moment from "moment";
import AxiosClient from "../../axios-client";
import {useTranslation} from "react-i18next";
import BigOrangeBtn from "../CommonComponents/BigOrangeBtn/BigOrangeBtn";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import TextField from "../CommonComponents/form/TextField/TextField";

export default function MyEarnings() {

  const {user} = useStateContext();
  const [wallet, setWallet] = useState([]);
  const [withdraw, setWithdraw] = useState(false);

  const [flag, setFlag] = useState(false)

   const {t, i18n} = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {

    axiosClient.get('tutor/wallet').then(({data}) => {
      setWallet(data.wallet);
      setWithdraw(data.withdraw);
    }).catch(err => {
    })
  }, [flag])

  const initialValues = {
    number: '',
  }

  const validationSchema = Yup.object({
    number: Yup.string().required('Required'),
  })

  const onSubmit = (values, {resetForm}) => {
    const payload = {...values}

    AxiosClient.post('/tutor/withdraw', payload).then(({data}) => {
      // window.location.reload();
      console.log('done');
      setFlag(prev => !prev)
      resetForm()
    }).catch(err => {
    })
  };

  return (
    <div className="bg-white p-4">
      <h1 className='profilePageTitle'>{t('my_earnings')}</h1>
      <div className="mt-3">
        <div>
          <h5>
            <b>{t('accumulated_funds')}:</b>
            <span style={{fontSize: 20, marginLeft: '10px'}}>{user?.wallet} €</span>
          </h5>
          <div className="mt-2">{t('minimum_withdrawal')}</div>

          {!withdraw &&
            <div className="mt-2 text-danger">{t('withdraw_pending')}</div>
          }

        </div>

        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}
                validateOnChange={false} validateOnBlur={false} enableReinitialize={true}>
          {
            ({isSubmitting, errors, values}) => {
              return <Form noValidate={true}>

                {/*<Form onSubmit={onSubmit}>*/}
                <div className="mt-3 mb-4">

                  <TextField name='number' placeholder={t('your_iban')} style={{'marginBottom': 16}}/>

                  {/*<input*/}
                  {/*  type="text"*/}
                  {/*  placeholder={t('your_iban')}*/}
                  {/*  ref={ibanRef}*/}
                  {/*  required={true}*/}
                  {/*  // onChange={(e) => setUsername(e.target.value)}*/}
                  {/*  // value={username}*/}
                  {/*/>*/}

                  {/*<button disabled={user?.wallet > 25 && withdraw ? false : true}*/}
                  <BigOrangeBtn style={{'maxWidth': 250}}
                                // disabled={user?.wallet > 25 && withdraw ? false : true}
                  >
                    {t('request_withdrawal')}</BigOrangeBtn>
                </div>
              </Form>
            }
          }
        </Formik>
        {/*</Form>*/}

        <div>
          <div className='innerPageScroll'>
            <Table striped hover className="mt-3 bg-white">
              <thead>
              <tr>
                <th>{t('date')}</th>
                <th>{t('status')}</th>
                <th>{t('student')}</th>
              </tr>
              </thead>
              <tbody>
              {
                wallet?.length > 0 &&
                wallet.map(item =>
                  <tr>
                    <td>{moment(item.created_at).format('DD.MM.Y')}</td>
                    <td>{item.text}</td>
                    <td>{item.student.name}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

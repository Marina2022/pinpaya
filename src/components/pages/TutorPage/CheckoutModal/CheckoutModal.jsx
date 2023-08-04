import AxiosClient from "../../../../axios-client";
import chatNotif from "../../../../hooks/chatNotif";
import {Badge, Button, Col, Form, Modal, Row, Spinner} from "react-bootstrap";
import {CreditCardFill} from "react-bootstrap-icons";
import InputMask from "react-input-mask";
import React, {useContext, useState} from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {useStateContext} from "../../../../contexts/ContextProvider";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import {AuthContext} from "../../../../contexts/AuthContext";
import $ from "jquery";
const MySwal = withReactContent(Swal);

const CheckoutModal = ({show, setShow, tutor, getData, selected, setSelected}) => {

  function setZindex() {
    setTimeout(function () {
      $('.holiday').parent().css("z-index", 20);
      $('.holiday').parent().css("width", '100%');
    });
  }

  const {type, user} = useStateContext();
  const {currentUser} = useContext(AuthContext);
  let {id} = useParams();
  const [data, setData] = useState({
    useWallet: 0,
    subject: '',
    note: '',
    card: '',
    exp: '',
    cvc: ''
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const bookLessons = () => {
    setShow(true);
  }

  const handleClose = () => setShow(false);

  const onSubmitCheckout = (e) =>{
    e.preventDefault();
    setLoading(true);

    const payload = {
      selected: selected,
      subject_id: data.subject,
      tutor_id: id,
      data: data,
      amount: selected.length > 0 ? tutor.price * selected.length + 1 : tutor.price + 1,
      price: tutor.price
    }

    if(user && type == 'student' && selected.length > 0){
      AxiosClient.post('/student/schedule', payload).then(({data}) => {
        getData();
        setZindex();
        setSelected([]);
        handleClose();
        MySwal.fire({
          icon: 'success',
          text: t('done'),
        })


        chatNotif(data.notif, currentUser, tutor.email);

        setLoading(false);
      }).catch(err => {

        setError(err.response.data.error);
        setLoading(false);
      })
    }
  }

  const {t, i18n} = useTranslation();

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={onSubmitCheckout}>
          <Modal.Header closeButton>
            <Modal.Title>{t('secure_checkout')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="d-flex justify-content-center align-items-center my-3">
                { tutor.avatar ?
                  <img className="avatar-wrap" src={'https://web.pinpaya.com/storage/'+tutor.avatar} alt="avatar"/>
                  : <img className="avatar-wrap" src="https://app.pinpaya.com/no-image.png" />
                }

              </div>
              <div className="mb-4 text-center fw-bold">{selected.length > 0 ? selected.length : 1} lesson with {tutor.name} {tutor.lastname}</div>
              <div className="my-4">
                <div className="d-flex justify-content-between">
                  <div className="fz-15">
                    <div className="fw-bold mb-2">{t('service_detail')}</div>
                    <div>{t('trial_lesson_price')}</div>
                    <div>{t('processing_fee')}</div>
                    <div className="mt-2 fz-18 fw-bold">{t('total')}</div>
                  </div>
                  <div className="fz-15">
                    <div className="fw-bold m-2">{t('price')}</div>
                    <div>{tutor.price} €</div>
                    <div>1.00 €</div>
                    <div className="mt-2 fz-18 fw-bold">{selected.length > 0 ? tutor.price * selected.length + 1 : tutor.price + 1} €</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <Row>
                <Col md={10}>
                  <Form.Group className="mb-3" controlId="13">
                    <Form.Label className="fw-bold">{t('you_have')} <Badge style={{color:'black'}} bg="warning">{user?.wallet} €</Badge> {t('in_your_wallet')}</Form.Label>
                    <Form.Control type="number"
                                  value={data?.useWallet}
                                  onChange={ev => setData({...data, useWallet : ev.target.value})}
                    />
                  </Form.Group>
                </Col>
                <Col md={2} className="align-items-center d-flex"><Button className="btn btn-sm">{t('use')}</Button></Col>
              </Row>
            </div>
            <div className="p-2 mb-4 mt-1" style={{background:'#dfdcde'}}>
              <div className="mb-4 text-dark"><CreditCardFill size={26}/>{t('paypal_info')} </div>
              <div className="row">
                <div className="col-md-12 mb-3">
                  <label htmlFor="cc-number" className="text-dark">{t('card_number')} *</label>
                  <InputMask
                    mask='9999 9999 9999 9999'
                    placeholder='XXXX XXXX XXXX XXXX'
                    required
                    onChange={ev => setData({...data, card : ev.target.value})}
                  >
                  </InputMask>
                  <div className="invalid-feedback">
                    Credit card number is required
                  </div>

                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="cc-expiration" className="text-dark">{t('expiry_date')} *</label>
                  <InputMask
                    mask='99/99'
                    onChange={ev => setData({...data, exp : ev.target.value})}
                    required
                    placeholder='MM/YY'>
                  </InputMask>
                  <div className="invalid-feedback">
                    Expiration date required
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="cc-expiration" className="text-dark">{t('card_code')} *</label>
                  <InputMask
                    mask='999'
                    onChange={ev => setData({...data, cvc : ev.target.value})}
                    required
                    placeholder='XXX'>
                  </InputMask>
                  <div className="invalid-feedback">
                    Security code required
                  </div>
                </div>
              </div>
              <div className="custom-control custom-checkbox d-flex justify-content-around">
                <input type="checkbox" className="custom-control-input" style={{marginRight: '10px'}} id="same-address1" />
                <label className="custom-control-label text-dark" htmlFor="same-address1"><b>{t('card_info_1')}</b></label>
              </div>
            </div>
            <div className="custom-control custom-checkbox d-flex justify-content-around">
              <input type="checkbox" className="custom-control-input" style={{marginRight: '10px'}} id="same-address2" />
              <label className="custom-control-label" htmlFor="same-address2"><b>{t('card_info_2')} *</b></label>
            </div>
            <Form.Group className="mb-3 mt-3" controlId="12">
              <Form.Label className="fw-bold">{t('what_study')}</Form.Label>
              <Form.Select required
                           value={data?.subject}
                           onChange={ev => setData({...data, subject : ev.target.value})}
              >
                <option value="">{t('select_subject')}</option>
                {   tutor.subject &&
                  tutor.subject.map(({ id, name }) => (
                    <option value={id}>{name}</option>
                  ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="13">
              <Form.Label className="fw-bold">{t('note_private_teacher')}</Form.Label>
              <Form.Control as="textarea" rows={3}
                            value={data?.note}
                            onChange={ev => setData({...data, note : ev.target.value})}
                            placeholder={t('note_private_teacher_placeholder')}
              />
            </Form.Group>
            {error &&
              <div className="text-danger"><b>{error}</b></div>
            }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">{t('loading')}...</span>
                </Spinner>
              ) : t('confirm')
              }

            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default CheckoutModal;




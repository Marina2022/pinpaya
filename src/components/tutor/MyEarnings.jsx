import {Wallet2} from "react-bootstrap-icons";
import {Form, Table} from "react-bootstrap";
import {useStateContext} from "../../contexts/ContextProvider";
import React, {useEffect, useRef, useState} from "react";
import axiosClient from "../../axios-client";
import moment from "moment";
import AxiosClient from "../../axios-client";
import {useTranslation} from "react-i18next";

export default function MyEarnings(){
    const {user} = useStateContext();
    const [wallet, setWallet] = useState([]);
    const [withdraw, setWithdraw] = useState(false);
    const ibanRef = useRef();
    const {t, i18n} = useTranslation();
    useEffect(() => {
        axiosClient.get('tutor/wallet').then(({data}) => {
            setWallet(data.wallet);
            setWithdraw(data.withdraw);
        }).catch(err => {})
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();

        const payload = {
            number: ibanRef.current.value
        }

        AxiosClient.post('/tutor/withdraw', payload).then(({data}) => {
            console.log('done');
        }).catch(err => {})
    };

    return(
        <div className="bg-white p-4">
            <h2>{t('my_earnings')}</h2>
            <div className="mt-3">
                <div>
                    <h5>
                        <b>{t('accumulated_funds')}:</b>
                        <span style={{fontSize: 20, marginLeft:'10px'}}>{user?.wallet} €</span>
                    </h5>
                    <div className="mt-2">{t('minimum_withdrawal')}</div>
                    { !withdraw &&
                    <div className="mt-2 text-danger">{t('withdraw_pending')}</div>
                     }

                </div>
                <Form onSubmit={onSubmit}>
                    <div className="mt-3 mb-4">
                        <input
                            type="text"
                            placeholder={t('your_iban')}
                            ref={ibanRef}
                            required={true}
                            // onChange={(e) => setUsername(e.target.value)}
                            // value={username}
                        />
                        <button disabled={user?.wallet > 25 && withdraw ? false : true} className="btn">{t('request_withdrawal')}</button>
                    </div>
                </Form>

                <div>
                    <Table responsive striped hover className="mt-3 bg-white">
                        <thead>
                        <tr>
                            <th>{t('date')}</th>
                            <th>{t('status')}</th>
                            <th>{t('student')}</th>
                            {/*<th>Earning</th>*/}
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
                                    {/*<td>{item.price}</td>*/}
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
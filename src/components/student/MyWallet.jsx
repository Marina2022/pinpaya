import {Wallet2} from "react-bootstrap-icons";
import {Form, Table} from "react-bootstrap";
import {useStateContext} from "../../contexts/ContextProvider";
import React, {useEffect, useRef, useState} from "react";
import axiosClient from "../../axios-client";
import moment from "moment/moment";
import AxiosClient from "../../axios-client";
import {useTranslation} from "react-i18next";

export default function MyWallet(){
    const {user} = useStateContext();
    const [wallet, setWallet] = useState([]);
    const ibanRef = useRef();
    const [withdraw, setWithdraw] = useState(false);
    const {t, i18n} = useTranslation();
    useEffect(() => {
        axiosClient.get('student/wallet').then(({data}) => {
            setWallet(data.wallet);
            setWithdraw(data.withdraw)
        }).catch(err => {})
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();

        const payload = {
            number: ibanRef.current.value
        }

        AxiosClient.post('/student/withdraw', payload).then(({data}) => {
            console.log('done');
        }).catch(err => {})
    };

    return(
        <div className="bg-white p-4">
            <h2>{t('my_wallet')}</h2>
            <div className="mt-3">
                <div>
                    <img src="/public/coin.svg" style={{width:'34px'}} /> <span style={{fontSize: 20}}>{user?.wallet} €</span>
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
                            <th>{t('type')}</th>
                            <th>{t('amount')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            wallet?.length > 0 &&
                            wallet.map(item =>
                                <tr>
                                    <td>{moment(item.created_at).format('DD.MM.Y')}</td>
                                    <td>{item.text}</td>
                                    <td>{item.amount}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

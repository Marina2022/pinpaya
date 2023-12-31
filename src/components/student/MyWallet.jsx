import {Wallet2} from "react-bootstrap-icons";
import {Form, Table} from "react-bootstrap";
import {useStateContext} from "../../contexts/ContextProvider";
import React, {useEffect, useRef, useState} from "react";
import axiosClient from "../../axios-client";
import moment from "moment/moment";
import AxiosClient from "../../axios-client";
import {useTranslation} from "react-i18next";

import coin from '../../assets/coin.svg'

export default function MyWallet() {
  const {user} = useStateContext();
  const [wallet, setWallet] = useState([]);
  const ibanRef = useRef();
  const [withdraw, setWithdraw] = useState(false);
  const {t, i18n} = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    axiosClient.get('student/wallet').then(({data}) => {
      setWallet(data.wallet);
      setWithdraw(data.withdraw)
    }).catch(err => {
    })
  }, [])

  return (
    <div className="bg-white p-4">
      <h1 className='profilePageTitle'>{t('my_wallet')}</h1>
      <div className="mt-3">
        <div>
          <img src={coin} style={{width: '34px'}}/> <span style={{fontSize: 20}}>{user?.wallet} €</span>
        </div>
        <div>
          <div className='innerPageScroll'>
            <Table striped hover className="mt-3 bg-white">
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
                    <td>{moment(item.created_at).format('DD.MM.Y HH:mm')}</td>
                    <td>{item.text}</td>
                    <td>{item.amount}</td>
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

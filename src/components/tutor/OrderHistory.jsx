import {Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import axiosClient from "../../axios-client";
import moment from "moment";
import {useTranslation} from "react-i18next";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const {t, i18n} = useTranslation();
  useEffect(() => {
    axiosClient.get('tutor/order-history').then(({data}) => {
      setOrders(data.orders);
    }).catch(err => {
    })
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <div className="bg-white p-4">
        <h1 className='titleOrderHistory'>{t('order_history')}</h1>

        <div className='innerPageScroll'>
            <Table striped hover className="mt-3 bg-white ">
              <thead>
              <tr>
                <td><b>#{t('order')}</b></td>
                <td><b>{t('date')}</b></td>
                <td><b>{t('status')}</b></td>
                <td><b>{t('tutor')}</b></td>
                <td><b>{t('lessons')}</b></td>
              </tr>
              </thead>
              <tbody>
              {
                orders?.length > 0 &&
                orders.map(item =>
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{moment(item.created_at).format('DD.MM.Y HH:mm')}</td>
                    <td>{item.status}</td>
                    <td>{item?.student?.name}</td>
                    <td>{item.lessons_count} {item.lessons_count == 1 ? 'lesson' : 'lessons'}</td>
                  </tr>
                )}
              </tbody>
            </Table>
        </div>
      </div>
    </>
  )
}

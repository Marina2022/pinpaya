import {Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import axiosClient from "../../axios-client";
import moment from "moment";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import BigOrangeBtn from "../CommonComponents/BigOrangeBtn/BigOrangeBtn";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const {t, i18n} = useTranslation();
  useEffect(() => {
    axiosClient.get('student/order-history').then(({data}) => {
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
        <h1 className='titleOrderHistory'
        >{t('order_history')}</h1>
        <div style={{'overflowX': 'scroll'}}>
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
                  <td>{moment(item.created_at).format('DD.MM.Y')}</td>
                  <td>{item.status}</td>
                  <td>{item?.tutor?.name}</td>
                  <td>{item.lessons_count} {item.lessons_count == 1 ? 'lesson' : 'lessons'}</td>
                  <td className="text-center">
                    <BigOrangeBtn >
                      <Link className="text-white" to={'/tutor/' + item?.tutor?.id}>{t('schedule_lessons')}</Link>
                    </BigOrangeBtn>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  )
}

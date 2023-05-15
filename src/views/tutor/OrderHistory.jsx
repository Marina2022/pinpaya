import {Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import axiosClient from "../../axios-client";
import moment from "moment";

export default function OrderHistory(){
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axiosClient.get('tutor/order-history').then(({data}) => {
            setOrders(data.orders);
        }).catch(err => {})
    }, [])

    return(
        <>
            <h2>Order History</h2>
            <div>
                <Table bordered hover className="mt-3 bg-white">
                    <tbody>
                    {
                        orders?.length > 0 &&
                        orders.map(item =>
                            <tr>
                                <td>{item.id}</td>
                                <td>{moment(item.created_at).format('Y.MM.DD')}</td>
                                <td>{item.status}</td>
                                <td>{item.student.name}</td>
                                <td>{item.lessons_count} {item.lessons_count == 1 ? 'lesson' : 'lessons'}</td>
                            </tr>
                        )}

                    </tbody>
                </Table>
            </div>
        </>
    )
}
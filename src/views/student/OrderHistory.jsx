import {Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import axiosClient from "../../axios-client";
import moment from "moment";
import {Link} from "react-router-dom";

export default function OrderHistory(){
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axiosClient.get('student/order-history').then(({data}) => {
            setOrders(data.orders);
        }).catch(err => {})
    }, [])

    return(
        <>
            <div className="bg-white p-4">
                <h2>Order History</h2>
                <Table responsive striped hover className="mt-3 bg-white ">
                    <thead>
                        <tr>
                            <td><b>#Order</b></td>
                            <td><b>Date</b></td>
                            <td><b>Status</b></td>
                            <td><b>Tutor</b></td>
                            <td><b>Lessons</b></td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        orders?.length > 0 &&
                        orders.map(item =>
                            <tr>
                                <td>{item.id}</td>
                                <td>{moment(item.created_at).format('DD.MM.Y')}</td>
                                <td>{item.status}</td>
                                <td>{item?.tutor?.name}</td>
                                <td>{item.lessons_count} {item.lessons_count == 1 ? 'lesson' : 'lessons'}</td>
                                <td className="text-center"><button className="btn text-white"><Link className="text-white" to={'/tutor/'+ item?.tutor?.id }>SCHEDULE LESSONS</Link></button></td>
                            </tr>
                        )}

                    </tbody>
                </Table>
            </div>
        </>
    )
}
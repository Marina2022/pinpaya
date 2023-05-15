import {Wallet2} from "react-bootstrap-icons";
import {Table} from "react-bootstrap";
import {useStateContext} from "../../contexts/ContextProvider";
import {useEffect, useState} from "react";
import axiosClient from "../../axios-client";
import moment from "moment";

export default function MyEarnings(){
    const {user} = useStateContext();
    const [wallet, setWallet] = useState([]);

    useEffect(() => {
        axiosClient.get('tutor/wallet').then(({data}) => {
            setWallet(data.wallet);
        }).catch(err => {})
    }, [])
    return(
        <>
            <h2>My Earnings</h2>
            <div className="mt-3">
                <div><Wallet2 size="30"/> <span style={{fontSize: 20}}>{user?.wallet} €</span> </div>
                <div>
                    <Table bordered hover className="mt-3 bg-white">
                        {/*<thead>*/}
                        {/*<tr>*/}
                        {/*    <th>Date</th>*/}
                        {/*    <th>Type</th>*/}
                        {/*</tr>*/}
                        {/*</thead>*/}
                        <tbody>
                        {
                            wallet?.length > 0 &&
                            wallet.map(item =>
                                <tr>
                                    <td>{moment(item.created_at).format('Y.MM.DD')}</td>
                                    <td>{item.text}</td>
                                    <td>{item.student.name}</td>
                                    {/*<td>{item.amount}</td>*/}
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    )
}
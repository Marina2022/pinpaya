import {Wallet2} from "react-bootstrap-icons";
import {Table} from "react-bootstrap";
import {useStateContext} from "../../contexts/ContextProvider";

export default function MyWallet(){
    const {user} = useStateContext();

    return(
        <>
            <h2>My Wallet</h2>
            <div className="mt-3">
                <div><Wallet2 size="30"/> <span style={{fontSize: 20}}>{user?.wallet} €</span> </div>
                <div>
                    <Table bordered hover className="mt-3 bg-white">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>26.08.2022 19:36</td>
                            <td>Bonus</td>
                            <td>+5.00 €</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    )
}
import {Table} from "react-bootstrap";

export default function PaymentMethods(){
    return(
        <>
            <h2>Payment Methods</h2>
            <div>
                <Table bordered hover className="mt-3 bg-white">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Card</th>
                        <th>Method</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        {/*<td>1</td>*/}
                        {/*<td>20</td>*/}
                        {/*<td>Card</td>*/}
                        {/*<td>10.08.2023</td>*/}
                    <div className="p-2">No saved methods found.</div>
                    </tr>
                    </tbody>
                </Table>
            </div>
        </>
    )
}
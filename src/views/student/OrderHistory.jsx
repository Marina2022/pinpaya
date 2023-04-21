import {Table} from "react-bootstrap";

export default function OrderHistory(){
    return(
        <>
            <h2>Order History</h2>
            <div>
                <Table bordered hover className="mt-3 bg-white">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Price</th>
                        <th>Method</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>20</td>
                        <td>Card</td>
                        <td>10.08.2023</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>15</td>
                        <td>Card</td>
                        <td>10.08.2023</td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        </>
    )
}
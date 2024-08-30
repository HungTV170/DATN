import {Table} from 'react-bootstrap'
const ListFood = ({localApiData}) =>{
    return<>
        {
        localApiData.orderItems.length === 0  
        ? "đơn hàng chưa có sản phẩm nào cả" 
        : 
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>itemId</th>
                    <th>itemName</th>
                    <th>quantity</th>
                    <th>price</th>
                </tr>
            </thead>
            <tbody>
            {localApiData.orderItems.map((item, index) => (
                <tr key={index}>
                <td>{item.orderItemId}</td>
                <td>{item.itemId}</td>
                <td>{item.menuItem}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    }
    </>
}
export default ListFood
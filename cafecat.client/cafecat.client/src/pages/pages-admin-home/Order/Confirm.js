import { Table, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import '../../../assets/css/customerStyle.css';
import { useAlert } from '../../../services/AlertContext';
const Confirm = ({ order, orderItem }) => {
    const navigate = useNavigate(); 
    const token = localStorage.getItem('jwt');
    const addAlert = useAlert();
    function sendData() {
        addAlert(`đang thực hiện yêu cầu `, '4');
        var orderTable = [];
        if(order.tableId !== ''){
            orderTable = order.tableId.split(',').map( e =>({
                tableId: e
            }))
        }

        const ListItem = orderItem.map(e => ({
            itemId: e.id,
            quantity: e.value,
            price: 0
        }));
        var data = {
            "order": order,
            "orderItems": ListItem,
            "orderTables": orderTable
          }

        fetch(`${process.env.REACT_APP_API_PATH}${process.env.REACT_APP_COMPONENT_ORDER}/Full`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((response) => {
            if(response.ok){
                return response.json()
            }else{
                throw new Error("Có lỗi");
            }
        })        
        .then((Data) => {
                console.log('Success:', Data);
                alert("Tạo Thành công");
                navigate(`${process.env.REACT_APP_PATH_HOME}/${process.env.REACT_APP_COMPONENT_ORDER}/${process.env.REACT_APP_COMPONENT_DETAIL}/${Data.orderId}`); 
            })
            .catch((error) => {
                console.error('Error:', error);
                alert("Tạo Thất bại");
            });
        
        // fetch(`${process.env.REACT_APP_API_PATH}${process.env.REACT_APP_COMPONENT_ORDER}`, {
        //     method: 'POST',
        //     headers: {
        //         'Authorization': `Bearer ${token}`, 
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(order),
        // })
        // .then((response) => {
        //     if(response.ok){
        //         return response.json()
        //     }else{
        //         throw new Error("Có lỗi");
        //     }
        // })
        // .then((data) => {
        //     const ListItem = orderItem.map(e => ({
        //         orderId: data.orderId,
        //         itemId: e.id,
        //         quantity: e.value,
        //         price: 0
        //     }));
    
        //     return fetch(`${process.env.REACT_APP_API_PATH}${process.env.REACT_APP_COMPONENT_ORDERITEM}`, {
        //         method: 'POST',
        //         headers: {
        //             'Authorization': `Bearer ${token}`, 
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(ListItem),
        //     });
        // })
        // .then((response) => {
        //     if(response.ok){
        //         return response.json()
        //     }else{
        //         throw new Error("Có lỗi");
        //     }
        // })
        // .then((data) => {
        //     console.log('Success:', data);
        //     alert("Tạo Thành công");
        //     navigate(`${process.env.REACT_APP_PATH_HOME}/${process.env.REACT_APP_COMPONENT_ORDER}/${process.env.REACT_APP_COMPONENT_DETAIL}/${data[0].orderId}`); 
        // })
        // .catch((error) => {
        //     console.error('Error:', error);
        //     alert("Tạo Thất bại");
        // });
    }
    

    return (
        <div>
            <h4>Order Details</h4>
            <div className ="overflowX">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Customer ID</th>
                        <th>Table</th>
                        <th>Employee ID</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{order.customerId}</td>
                        <td>{order.tableId}</td>
                        <td>{order.employeeId}</td>
                        <td>{order.statusId}</td>
                    </tr>
                </tbody>
            </Table>
            </div>

            <hr />
            <h4>Menu Items</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Số lượng</th>
                    </tr>
                </thead>
                <tbody>
                    {orderItem.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.label}</td>
                            <td>{item.value}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button variant="primary" onClick={sendData}>
                Tạo
            </Button>
        </div>
    );
};

export default Confirm;

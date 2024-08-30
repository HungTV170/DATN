import { Table, Button } from 'react-bootstrap';
import React, { useState } from 'react';


const Confirm = ({ order, orderItem ,handleApiDataChange,localApiData}) => {
    const token = localStorage.getItem('jwt');


    function sendData() {
        const ListDel = localApiData.orderItems.map(e => e.orderItemId);
        console.log(ListDel);
        fetch(`${process.env.REACT_APP_API_PATH}${process.env.REACT_APP_COMPONENT_ORDERITEM}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ListDel),
        })
    .then((response) => {
        if(response.ok){
            
        }else{
            throw new Error("Có lỗi");
        }
    })    .catch((error) => {
        console.error('Error:', error);
        alert("Tạo Thất bại");
    });

        const ListItem = orderItem.map(e => ({
            orderId: localApiData.Id,
            itemId: e.id,
            quantity: e.value,
            price: 0
        }));
        fetch(`${process.env.REACT_APP_API_PATH}${process.env.REACT_APP_COMPONENT_ORDERITEM}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ListItem),
        })
    .then((response) => {
        if(response.ok){
            return response.json()
        }else{
            throw new Error("Có lỗi");
        }
    })
    .then((data) => {
        console.log('Success:', data);
        alert("Tạo Thành công");
        let tmp = {...localApiData};
        tmp.orderItems = data;
        handleApiDataChange(tmp);
    })
    .catch((error) => {
        console.error('Error:', error);
        alert("Tạo Thất bại");
    });
    }
    

    return (
        <div>
            <h4>Menu Items</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Label</th>
                        <th>Value</th>
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

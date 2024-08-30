import { useState, useEffect } from 'react';

export default function GetTime({ dateTime }) {
    const [listTime, setTimes] = useState([]);
    console.log(`${process.env.REACT_APP_API_PATH}${process.env.REACT_APP_COMPONENT_TABLE}/index?date=${dateTime}`)
    useEffect(() => {
        const token = localStorage.getItem('jwt');
        fetch(`${process.env.REACT_APP_API_PATH}${process.env.REACT_APP_COMPONENT_TABLE}/index?date=${dateTime}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Có lỗi");
            }
        })
        .then((data) => {
            setTimes(data);
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("Lấy Thất bại");
        });
    }, [dateTime]); // Chỉ fetch dữ liệu khi `dateTime` thay đổi
    
    return listTime;
}



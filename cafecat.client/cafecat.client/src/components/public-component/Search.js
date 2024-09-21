import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [lgShow, setLgShow] = useState(false);
    const [res, setRes] = useState(null);
    const token = localStorage.getItem('jwt');

    const resolveError = (errorData)=>{
        console.log(errorData);
        if (errorData && errorData.errors) {
          const errorMessages = Object.keys(errorData.errors).map(field => {
            return `${field}: ${errorData.errors[field].join(', ')}`;
          }).join('\n');
          return `Validation Errors:\n${errorMessages}`;
        }
        return errorData.message || 'Bad Request: Please check your input and try again.';
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const apiResponse = await fetch(`https://localhost:7249/api/FindCustomer/${query}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!apiResponse.ok) {
                if(apiResponse.status === 401){
                    throw new Error(`You need to log in to access this resource ...`)
                  }
                  if(apiResponse.status === 403){
                    throw new Error(`you don't have enough permissions to access this resource ...`)
                  }
                  if (apiResponse.status === 400) {
                    return apiResponse.json().then(errorData => {
                      const errorMessage = resolveError(errorData);
                      alert(errorMessage);
                    });  
                  }

                throw new Error('Network response was not ok');
            }

            const data = await apiResponse.json();
            setRes(data);
            setLgShow(true);
        } catch (error) {
            alert(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Thông tin khách hàng
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>{console.log(res)}
                    {res ? (
                        <div>
                            <h5>{`${res.firstName} ${res.lastName}`}</h5>
                            <h6>{`ID khách hàng ${res.id}`}</h6>
                            <p>Danh sách đặt bàn ngày hôm nay: {res.reservations ? res.reservations.length : 0}</p>
                            {res.reservations && res.reservations.length > 0 ? (
                                <ul>
                                    {res.reservations.map((reservation, index) => (
                                        <li key={index}>
                                            <p>Bàn: {reservation.tableId}, Thời gian: {reservation.reservationTime}, Ngày & Giờ: {reservation.reservationDate}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No reservations available.</p>
                            )}
                        </div>
                    ) : (
                        <p>No customer data available</p>
                    )}
                </Modal.Body>
            </Modal>
            <div className="search-bar">
                <form className="search-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="query"
                        placeholder="Tìm kiếm khách hàng"
                        title="Enter search keyword"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit" title="Search">
                        <i className="bi bi-search"></i>
                    </button>
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error}</p>}
                </form>
            </div>
        </>
    );
};

export default SearchBar;

 const DetailOrder = ({localApiData}) =>{
    return<>
        <div>
            <p>ID: {localApiData.Id}</p>
            <p>orderDate: {localApiData.orderDate}</p>
            <p>status: {localApiData.status}</p>
            <p>customer: {localApiData.customer}</p>
            <p>employee: {localApiData.employee}</p>
            {/* <p>Orders: {localApiData.orders}</p> */}
            {/* <p>Reservations: {localApiData.reservations}</p> */}
        </div>
    </>
}
export default DetailOrder